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

  // Calculate stats
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

    // Calculate elapsed time
    const elapsedSeconds = startTimeRef.current
      ? (Date.now() - startTimeRef.current) / 1000
      : 0;
    const elapsedMinutes = elapsedSeconds / 60;

    // WPM = (correct characters / 5) / minutes
    const wpm =
      elapsedMinutes > 0 ? Math.round(correctChars / 5 / elapsedMinutes) : 0;

    // Raw WPM = all typed characters / 5 / minutes (includes errors)
    const rawSpeed =
      elapsedMinutes > 0 ? Math.round(totalTyped / 5 / elapsedMinutes) : 0;

    return { wpm, accuracy, rawSpeed, correctChars, incorrectChars };
  }, [typedText, text]);

  const stats = calculateStats();

  // Initialize game
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

  // Start the game
  const startGame = useCallback(() => {
    setGameState("running");
    startTimeRef.current = Date.now();

    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          if (timerRef.current) {
            clearInterval(timerRef.current);
            timerRef.current = null;
          }
          setGameState("finished");
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  }, []);

  // End game and check high score
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

  // Handle keyboard input
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Tab to restart
      if (e.key === "Tab") {
        e.preventDefault();
        initGame();
        return;
      }

      // Ignore if finished
      if (gameState === "finished") return;

      // Ignore modifier keys and special keys
      if (e.ctrlKey || e.altKey || e.metaKey) return;
      if (["Shift", "Control", "Alt", "Meta", "Escape", "CapsLock"].includes(e.key)) return;

      // Start game on first keystroke
      if (gameState === "idle" && e.key.length === 1) {
        startGame();
      }

      // Handle backspace
      if (e.key === "Backspace") {
        e.preventDefault();
        setTypedText((prev) => {
          if (prev.length === 0) return prev;

          // Find the last correct position
          const targetChars = text.split("");
          let lastCorrectIndex = -1;

          for (let i = 0; i < prev.length; i++) {
            if (prev[i] === targetChars[i]) {
              lastCorrectIndex = i;
            } else {
              break;
            }
          }

          // Can only backspace if we're past correct characters
          // Or if the character we're deleting is wrong
          const charToDelete = prev.length - 1;
          if (charToDelete > lastCorrectIndex) {
            return prev.slice(0, -1);
          }

          // If deleting would go into correct territory, allow it
          // but only one character at a time
          return prev.slice(0, -1);
        });
        return;
      }

      // Handle regular character input
      if (e.key.length === 1) {
        e.preventDefault();
        setTypedText((prev) => {
          // Don't allow typing beyond the text length
          if (prev.length >= text.length) return prev;
          return prev + e.key;
        });
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [gameState, text, initGame, startGame]);

  // Initialize on mount and when duration changes
  useEffect(() => {
    initGame();
  }, [initGame]);

  // Handle duration change
  const handleDurationChange = (newDuration: number) => {
    setDuration(newDuration);
    setTimeLeft(newDuration);
    initGame();
  };

  // Cleanup timer on unmount
  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, []);

  return (
    <main className="min-h-screen bg-zinc-950 text-zinc-100">
      <div className="mx-auto flex min-h-screen max-w-4xl flex-col items-center justify-center gap-8 px-4 py-8">
        {/* Header */}
        <div className="flex flex-col items-center gap-4">
          <h1 className="text-4xl font-bold tracking-tight text-amber-400 md:text-5xl">
            typr
          </h1>
          <HighScore refreshTrigger={highScoreRefresh} />
        </div>

        {/* Timer */}
        <Timer
          timeLeft={timeLeft}
          duration={duration}
          onDurationChange={handleDurationChange}
          isActive={gameState === "running"}
          isFinished={gameState === "finished"}
        />

        {/* Typing Area */}
        <div className="w-full">
          <TypingArea
            text={text}
            typedText={typedText}
            isFinished={gameState === "finished"}
          />
        </div>

        {/* Stats */}
        <StatsBar
          wpm={stats.wpm}
          accuracy={stats.accuracy}
          rawSpeed={stats.rawSpeed}
          correctChars={stats.correctChars}
          incorrectChars={stats.incorrectChars}
          isFinished={gameState === "finished"}
        />

        {/* New High Score Banner */}
        {newHighScore && (
          <div className="animate-pulse rounded-lg bg-amber-500/20 px-6 py-3 text-center ring-2 ring-amber-500/50">
            <span className="text-lg font-bold text-amber-400">
              🎉 New High Score!
            </span>
          </div>
        )}

        {/* Restart Button */}
        <RestartButton onRestart={initGame} />

        {/* Footer hint */}
        <p className="text-center text-sm text-zinc-600">
          Press <kbd className="rounded bg-zinc-800 px-2 py-0.5 text-zinc-400">Tab</kbd> to restart
        </p>
      </div>
    </main>
  );
}
