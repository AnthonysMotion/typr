"use client";

import { Button } from "@/components/ui/button";
import { RefreshCw } from "lucide-react";

interface RestartButtonProps {
  onRestart: () => void;
}

export default function RestartButton({ onRestart }: RestartButtonProps) {
  return (
    <Button
      onClick={onRestart}
      className="glass-pill h-16 group relative overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-r from-blue-400/0 via-white/40 to-blue-400/0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
      <RefreshCw className="mr-3 h-5 w-5 text-blue-500 transition-transform group-hover:rotate-180" />
      <span className="text-sm uppercase tracking-[0.2em] text-slate-700">Refresh Session</span>
      <span className="ml-4 text-[10px] text-slate-300">TAB</span>
    </Button>
  );
}
