"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import TypingArea from "@/components/TypingArea";
import Timer from "@/components/Timer";
import StatsBar from "@/components/StatsBar";
import RestartButton from "@/components/RestartButton";
import HighScore from "@/components/HighScore";
import { generateText } from "@/utils/words";
import { saveHighScore } from "@/utils/localStorage";
import { Terminal } from "lucide-react";

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
      if (char === targetChars[index]) {
        correctChars++;
      } else {
        incorrectChars++;
      }
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
        setTypedText((prev) => {
          if (prev.length === 0) return prev;
          const targetChars = text.split("");
          let lastCorrectIndex = -1;
          for (let i = 0; i < prev.length; i++) {
            if (prev[i] === targetChars[i]) lastCorrectIndex = i;
            else break;
          }
          const charToDelete = prev.length - 1;
          return prev.slice(0, -1);
        });
        return;
      }
      if (e.key.length === 1) {
        e.preventDefault();
        setTypedText((prev) => {
          if (prev.length >= text.length) return prev;
          return prev + e.key;
        });
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
    <main className="min-h-screen p-4 md:p-8">
      <div className="mx-auto flex max-w-4xl flex-col items-center justify-center gap-12 pt-12">
        
        {/* Header Section */}
        <div className="flex w-full flex-col items-center justify-between gap-8 md:flex-row md:items-start">
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <div className="rounded bg-zinc-100 p-1">
                <Terminal className="h-5 w-5 text-zinc-950" />
              </div>
              <h1 className="pixel-text text-3xl font-bold tracking-widest text-zinc-100">
                typr_v1.0
              </h1>
            </div>
            <p className="pixel-text text-[10px] text-zinc-600 tracking-tight">
              NEURAL INTERFACE: ACTIVE // SECURE_CHANNEL: ESTABLISHED
            </p>
          </div>
          
          <HighScore refreshTrigger={highScoreRefresh} />
        </div>

        {/* Timer & Controls */}
        <Timer
          timeLeft={timeLeft}
          duration={duration}
          onDurationChange={handleDurationChange}
          isActive={gameState === "running"}
          isFinished={gameState === "finished"}
        />

        {/* Main Typing Engine */}
        <div className="w-full space-y-8 animate-fade-in">
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

        {/* Global Notifications */}
        <div className="h-12">
          {newHighScore && (
            <div className="pixel-text flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-500/10 px-6 py-2 text-xs text-amber-500 animate-bounce">
              <span className="h-2 w-2 rounded-full bg-amber-500 animate-pulse" />
              CRITICAL: NEW PERFORMANCE PEAK DETECTED
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="flex flex-col items-center gap-6">
          <RestartButton onRestart={initGame} />
          
          <div className="flex items-center gap-4 opacity-20">
            <div className="h-px w-12 bg-zinc-700" />
            <span className="pixel-text text-[8px] tracking-[0.4em] text-zinc-500">SYSTEM_ID: ANTH-01</span>
            <div className="h-px w-12 bg-zinc-700" />
          </div>
        </div>
      </div>
    </main>
  );
}
