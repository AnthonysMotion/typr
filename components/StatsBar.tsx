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
  return (
    <div
      className={`grid grid-cols-2 gap-4 rounded-lg bg-zinc-900/50 p-4 md:grid-cols-4 ${
        isFinished ? "ring-2 ring-amber-500/50" : ""
      }`}
    >
      <div className="text-center">
        <div className="text-xs uppercase tracking-wider text-zinc-500">WPM</div>
        <div className="text-3xl font-bold text-emerald-400">{wpm}</div>
      </div>
      
      <div className="text-center">
        <div className="text-xs uppercase tracking-wider text-zinc-500">Accuracy</div>
        <div className={`text-3xl font-bold ${accuracy >= 95 ? "text-emerald-400" : accuracy >= 80 ? "text-amber-400" : "text-red-400"}`}>
          {accuracy.toFixed(1)}%
        </div>
      </div>
      
      <div className="text-center">
        <div className="text-xs uppercase tracking-wider text-zinc-500">Raw</div>
        <div className="text-3xl font-bold text-zinc-300">{rawSpeed}</div>
      </div>
      
      <div className="text-center">
        <div className="text-xs uppercase tracking-wider text-zinc-500">Chars</div>
        <div className="text-xl font-bold">
          <span className="text-emerald-400">{correctChars}</span>
          <span className="text-zinc-600">/</span>
          <span className="text-red-400">{incorrectChars}</span>
        </div>
      </div>
    </div>
  );
}
