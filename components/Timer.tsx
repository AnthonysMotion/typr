"use client";

interface TimerProps {
  timeLeft: number;
  duration: number;
  onDurationChange: (duration: number) => void;
  isActive: boolean;
  isFinished: boolean;
}

export default function Timer({
  timeLeft,
  duration,
  onDurationChange,
  isActive,
  isFinished,
}: TimerProps) {
  const durations = [15, 30, 60, 120];
  const progress = (timeLeft / duration) * 100;

  return (
    <div className="flex flex-col items-center gap-3">
      <div className="flex items-center gap-2">
        {durations.map((d) => (
          <button
            key={d}
            onClick={() => onDurationChange(d)}
            disabled={isActive || isFinished}
            className={`rounded-md px-3 py-1 text-sm font-medium transition-all ${
              duration === d
                ? "bg-amber-500 text-zinc-900"
                : "bg-zinc-800 text-zinc-400 hover:bg-zinc-700 hover:text-zinc-200"
            } ${(isActive || isFinished) ? "cursor-not-allowed opacity-50" : ""}`}
          >
            {d}s
          </button>
        ))}
      </div>
      
      <div className="relative h-2 w-48 overflow-hidden rounded-full bg-zinc-800">
        <div
          className={`absolute left-0 top-0 h-full transition-all duration-1000 ease-linear ${
            timeLeft <= 10 ? "bg-red-500" : "bg-amber-500"
          }`}
          style={{ width: `${progress}%` }}
        />
      </div>
      
      <div
        className={`font-mono text-4xl font-bold ${
          timeLeft <= 10 ? "text-red-400" : "text-amber-400"
        }`}
      >
        {timeLeft}
      </div>
    </div>
  );
}
