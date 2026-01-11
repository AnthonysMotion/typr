"use client";

import { useEffect, useState } from "react";
import { getHighScore, HighScoreData } from "@/utils/localStorage";
import { Trophy } from "lucide-react";

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
    return (
      <div className="skeuo-card dotted-bg flex h-24 w-64 items-center justify-center border-dashed opacity-50">
        <p className="pixel-text text-zinc-600">No high score yet</p>
      </div>
    );
  }

  return (
    <div className="skeuo-card dotted-bg w-64 overflow-hidden">
      <div className="flex flex-col p-4">
        <div className="flex items-center justify-between border-b border-white/5 pb-2">
          <span className="pixel-text text-xs text-zinc-500">Global Record</span>
          <Trophy className="h-4 w-4 text-amber-500 shadow-sm" />
        </div>
        
        <div className="mt-4 flex items-baseline gap-2">
          <span className="pixel-text text-3xl font-bold tracking-tighter text-zinc-100">
            {highScore.wpm}
          </span>
          <span className="pixel-text text-sm text-zinc-500">WPM</span>
        </div>
        
        <div className="mt-1 flex items-center justify-between text-[10px] text-zinc-600">
          <span className="uppercase tracking-widest">Accuracy</span>
          <span className="font-mono">{highScore.accuracy.toFixed(1)}%</span>
        </div>
      </div>
    </div>
  );
}
