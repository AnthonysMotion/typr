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

  if (!mounted || !highScore) return null;

  return (
    <div className="glass-morphism rounded-full px-5 py-2 flex items-center gap-3 animate-float">
      <div className="bg-amber-100 rounded-full p-1.5 shadow-sm">
        <Trophy className="h-4 w-4 text-amber-500" />
      </div>
      <div className="flex items-baseline gap-1.5">
        <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">Best</span>
        <span className="text-xl font-bold text-slate-800">{highScore.wpm}</span>
        <span className="text-xs font-medium text-slate-400">WPM</span>
      </div>
    </div>
  );
}
