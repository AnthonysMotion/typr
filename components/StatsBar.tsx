"use client";

import { Activity, Target, Zap, Hash } from "lucide-react";

interface StatsBarProps {
  wpm: number;
  accuracy: number;
  rawSpeed: number;
  correctChars: number;
  incorrectChars: number;
  isFinished: boolean;
}

export default function StatsBar({
  wpm,
  accuracy,
  rawSpeed,
  correctChars,
  incorrectChars,
  isFinished,
}: StatsBarProps) {
  const statItems = [
    { label: "WPM", value: wpm, icon: Activity, color: "text-zinc-100" },
    { label: "Accuracy", value: `${accuracy.toFixed(0)}%`, icon: Target, color: accuracy >= 95 ? "text-emerald-500" : "text-amber-500" },
    { label: "Raw", value: rawSpeed, icon: Zap, color: "text-zinc-500" },
    { label: "Chars", value: `${correctChars}/${incorrectChars}`, icon: Hash, color: "text-zinc-500" },
  ];

  return (
    <div className="grid grid-cols-2 gap-4 w-full md:grid-cols-4">
      {statItems.map((stat) => (
        <div 
          key={stat.label}
          className={`inset-box group flex flex-col items-center justify-center p-4 transition-all duration-300 ${
            isFinished ? "ring-1 ring-amber-500/20 bg-[#151515]" : ""
          }`}
        >
          <div className="flex items-center gap-1.5 mb-1 opacity-40 group-hover:opacity-100 transition-opacity">
            <stat.icon className="h-3 w-3" />
            <span className="pixel-text text-[10px] tracking-tighter">{stat.label}</span>
          </div>
          <div className={`pixel-text text-xl font-bold tracking-tighter ${stat.color}`}>
            {stat.value}
          </div>
        </div>
      ))}
    </div>
  );
}
