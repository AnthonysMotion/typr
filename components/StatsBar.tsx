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
    { label: "WPM", value: wpm, icon: Activity, color: "text-blue-600", bg: "bg-blue-50" },
    { label: "Accuracy", value: `${accuracy.toFixed(0)}%`, icon: Target, color: "text-emerald-600", bg: "bg-emerald-50" },
    { label: "Raw", value: rawSpeed, icon: Zap, color: "text-purple-600", bg: "bg-purple-50" },
    { label: "Chars", value: `${correctChars}/${incorrectChars}`, icon: Hash, color: "text-slate-600", bg: "bg-slate-50" },
  ];

  return (
    <div className="grid grid-cols-2 gap-5 w-full md:grid-cols-4">
      {statItems.map((stat) => (
        <div 
          key={stat.label}
          className={`glass-morphism group flex flex-col items-center justify-center p-6 transition-all duration-300 rounded-[2.5rem] ${
            isFinished ? "scale-105 shadow-xl ring-2 ring-white/60" : ""
          }`}
        >
          <div className={`mb-3 rounded-2xl p-2.5 ${stat.bg} ${stat.color} shadow-sm transition-transform group-hover:rotate-12`}>
            <stat.icon className="h-5 w-5" />
          </div>
          <div className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-1">
            {stat.label}
          </div>
          <div className={`text-3xl font-black tracking-tight ${stat.color}`}>
            {stat.value}
          </div>
        </div>
      ))}
    </div>
  );
}
