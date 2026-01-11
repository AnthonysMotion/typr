"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import TypingArea from "@/components/TypingArea";
import Timer from "@/components/Timer";
import StatsBar from "@/components/StatsBar";
import RestartButton from "@/components/RestartButton";
import HighScore from "@/components/HighScore";
import { generateText } from "@/utils/words";
import { saveHighScore } from "@/utils/localStorage";

type GameState = "idle" | "running" | "finished";

export default function Home() {
  const [text, setText] = useState("");
  const [typedText, setTypedText] = useState("");
  const [gameState, setGameState] = useState<GameState>("idle");
  const [duration, setDuration] = useState(30);
  const [timeLeft, setTimeLeft] = useState(30);
  const [highScoreRefresh, setHighScoreRefresh] = useState(0);
  const [newHighScore, setNewHighScore] = useState(false);

  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const startTimeRef = useRef<number | null>(null);

  const calculateStats = useCallback(() => {
    const typedChars = typedText.split("");
    const targetChars = text.split("");
    let correctChars = 0;
    let incorrectChars = 0;

    typedChars.forEach((char, index) => {
      if (char === targetChars[index]) correctChars++;
      else incorrectChars++;
    });

    const totalTyped = typedChars.length;
    const accuracy = totalTyped > 0 ? (correctChars / totalTyped) * 100 : 100;
    const elapsedSeconds = startTimeRef.current ? (Date.now() - startTimeRef.current) / 1000 : 0;
    const elapsedMinutes = elapsedSeconds / 60;
    const wpm = elapsedMinutes > 0 ? Math.round(correctChars / 5 / elapsedMinutes) : 0;
    const rawSpeed = elapsedMinutes > 0 ? Math.round(totalTyped / 5 / elapsedMinutes) : 0;

    return { wpm, accuracy, rawSpeed, correctChars, incorrectChars };
  }, [typedText, text]);

  const stats = calculateStats();

  const initGame = useCallback(() => {
    setText(generateText(100));
    setTypedText("");
    setGameState("idle");
    setTimeLeft(duration);
    setNewHighScore(false);
    startTimeRef.current = null;
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  }, [duration]);

  const startGame = useCallback(() => {
    setGameState("running");
    startTimeRef.current = Date.now();
    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          if (timerRef.current) clearInterval(timerRef.current);
          setGameState("finished");
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  }, []);

  useEffect(() => {
    if (gameState === "finished") {
      const { wpm, accuracy } = calculateStats();
      const isNewHighScore = saveHighScore(wpm, accuracy);
      if (isNewHighScore) {
        setNewHighScore(true);
        setHighScoreRefresh((prev) => prev + 1);
      }
    }
  }, [gameState, calculateStats]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Tab") {
        e.preventDefault();
        initGame();
        return;
      }
      if (gameState === "finished") return;
      if (e.ctrlKey || e.altKey || e.metaKey) return;
      if (["Shift", "Control", "Alt", "Meta", "Escape", "CapsLock"].includes(e.key)) return;
      if (gameState === "idle" && e.key.length === 1) startGame();
      if (e.key === "Backspace") {
        e.preventDefault();
        setTypedText((prev) => prev.slice(0, -1));
        return;
      }
      if (e.key.length === 1) {
        e.preventDefault();
        setTypedText((prev) => (prev.length >= text.length ? prev : prev + e.key));
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [gameState, text, initGame, startGame]);

  useEffect(() => {
    initGame();
  }, [initGame]);

  const handleDurationChange = (newDuration: number) => {
    setDuration(newDuration);
    setTimeLeft(newDuration);
    initGame();
  };

  return (
    <main className="min-h-screen relative overflow-hidden px-6 py-12">
      {/* Background blobs matching image styles */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-200/30 blur-[120px] rounded-full animate-float" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-200/30 blur-[120px] rounded-full" />
      <div className="absolute top-[20%] right-[10%] w-[20%] h-[20%] bg-orange-100/30 blur-[100px] rounded-full" />

      <div className="relative mx-auto flex max-w-6xl flex-col items-center justify-center gap-16">
        
        {/* Header Section */}
        <div className="flex w-full items-center justify-between">
          <div className="flex flex-col">
            <h1 className="text-4xl font-black tracking-tighter text-slate-900 md:text-5xl">
              typr<span className="text-blue-500">.</span>
            </h1>
            <div className="flex items-center gap-2 mt-1">
              <span className="h-1.5 w-1.5 rounded-full bg-blue-500 animate-pulse" />
              <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-slate-400">
                Precision Engine v2
              </span>
            </div>
          </div>
          
          <HighScore refreshTrigger={highScoreRefresh} />
        </div>

        {/* Timer & Setup */}
        <Timer
          timeLeft={timeLeft}
          duration={duration}
          onDurationChange={handleDurationChange}
          isActive={gameState === "running"}
          isFinished={gameState === "finished"}
        />

        {/* Main Interface */}
        <div className="w-full space-y-12 animate-fade-in">
          <TypingArea
            text={text}
            typedText={typedText}
            isFinished={gameState === "finished"}
          />
          
          <StatsBar
            wpm={stats.wpm}
            accuracy={stats.accuracy}
            rawSpeed={stats.rawSpeed}
            correctChars={stats.correctChars}
            incorrectChars={stats.incorrectChars}
            isFinished={gameState === "finished"}
          />
        </div>

        {/* Success Banner */}
        <div className="h-16">
          {newHighScore && (
            <div className="glass-pill px-10 py-4 bg-emerald-500/10 border-emerald-500/30">
              <span className="text-sm font-black uppercase tracking-[0.2em] text-emerald-600">
                Performance Record Updated
              </span>
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="flex flex-col items-center gap-10">
          <RestartButton onRestart={initGame} />
          
          <div className="flex items-center gap-8 opacity-40">
            <span className="text-[10px] font-bold tracking-[0.5em] text-slate-300">
              OPTIMIZED FOR HUMAN INPUT
            </span>
          </div>
        </div>
      </div>
    </main>
  );
}
