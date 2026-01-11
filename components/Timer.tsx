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
    <div className="flex flex-col items-center gap-8 w-full max-w-lg">
      <div className="glass-morphism rounded-full p-1.5 flex gap-1">
        {durations.map((d) => (
          <Button
            key={d}
            onClick={() => onDurationChange(d)}
            disabled={isActive || isFinished}
            variant="ghost"
            size="sm"
            className={`rounded-full px-6 transition-all duration-300 ${
              duration === d 
                ? "bg-white/80 text-blue-600 shadow-sm" 
                : "text-slate-400 hover:text-slate-600"
            }`}
          >
            {d}s
          </Button>
        ))}
      </div>
      
      <div className="w-full space-y-3">
        <div className="flex items-end justify-between px-2">
          <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-300">Remaining</span>
          <span className={`text-3xl font-bold tabular-nums ${timeLeft <= 5 ? "text-red-500 animate-pulse" : "text-slate-800"}`}>
            {timeLeft}s
          </span>
        </div>
        <div className="glass-inset rounded-full h-3 p-1 flex items-center">
          <div 
            className="h-full bg-gradient-to-r from-blue-400 to-cyan-300 rounded-full transition-all duration-1000 ease-linear shadow-[0_0_10px_rgba(59,130,246,0.3)]"
            style={{ width: `${progressValue}%` }}
          />
        </div>
      </div>
    </div>
  );
}
