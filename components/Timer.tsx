"use client";

import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";

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
  const progressValue = (timeLeft / duration) * 100;

  return (
    <div className="flex flex-col items-center gap-6 w-full max-w-md">
      <div className="flex items-center gap-2 rounded-full bg-[#121212] p-1 border border-white/5 shadow-lg">
        {durations.map((d) => (
          <Button
            key={d}
            onClick={() => onDurationChange(d)}
            disabled={isActive || isFinished}
            variant={duration === d ? "pill" : "ghost"}
            size="sm"
            className={`pixel-text text-[10px] ${
              duration === d ? "bg-zinc-800 text-zinc-100" : "text-zinc-500"
            }`}
          >
            {d}s
          </Button>
        ))}
      </div>
      
      <div className="w-full space-y-2">
        <div className="flex items-center justify-between px-1">
          <span className="pixel-text text-[10px] text-zinc-600 tracking-widest">Process Active</span>
          <span className={`pixel-text text-sm font-bold ${timeLeft <= 5 ? "text-red-500 animate-pulse" : "text-zinc-400"}`}>
            {timeLeft}s
          </span>
        </div>
        <Progress value={progressValue} className="h-1.5" />
      </div>
    </div>
  );
}
