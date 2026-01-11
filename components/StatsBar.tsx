"use client";

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
    { label: "WPM", value: wpm, color: "text-blue-600" },
    { label: "Accuracy", value: `${accuracy.toFixed(0)}%`, color: "text-emerald-600" },
    { label: "Raw", value: rawSpeed, color: "text-purple-600" },
    { label: "Chars", value: `${correctChars}/${incorrectChars}`, color: "text-slate-600" },
  ];

  return (
    <div className="grid grid-cols-2 gap-5 w-full md:grid-cols-4">
      {statItems.map((stat) => (
        <div 
          key={stat.label}
          className={`glass-morphism flex flex-col justify-center p-6 transition-all duration-300 rounded-[2.5rem] ${
            isFinished ? "scale-105 shadow-xl ring-2 ring-white/60" : ""
          }`}
        >
          <div className="text-[10px] uppercase tracking-widest text-slate-400 mb-2">
            {stat.label}
          </div>
          <div className={`text-4xl tracking-tight ${stat.color}`}>
            {stat.value}
          </div>
        </div>
      ))}
    </div>
  );
}
