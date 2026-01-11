"use client";

import { useEffect, useState } from "react";
import { getHighScore, HighScoreData } from "@/utils/localStorage";

interface HighScoreProps {
  refreshTrigger?: number;
}

export default function HighScore({ refreshTrigger }: HighScoreProps) {
  const [highScore, setHighScore] = useState<HighScoreData | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setHighScore(getHighScore());
  }, [refreshTrigger]);

  if (!mounted || !highScore) {
    return null;
  }

  return (
    <div className="flex items-center gap-3 rounded-lg bg-amber-900/20 px-4 py-2 ring-1 ring-amber-500/30">
      <svg
        className="h-5 w-5 text-amber-400"
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path
          fillRule="evenodd"
          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
          clipRule="evenodd"
        />
      </svg>
      <div className="flex items-baseline gap-2">
        <span className="text-xs uppercase tracking-wider text-amber-500/80">Best</span>
        <span className="text-lg font-bold text-amber-400">{highScore.wpm}</span>
        <span className="text-xs text-zinc-500">WPM</span>
        <span className="text-zinc-600">·</span>
        <span className="text-sm text-zinc-400">{highScore.accuracy.toFixed(1)}%</span>
      </div>
    </div>
  );
}
