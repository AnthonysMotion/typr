"use client";

import { Button } from "@/components/ui/button";
import { RefreshCw } from "lucide-react";

interface RestartButtonProps {
  onRestart: () => void;
}

export default function RestartButton({ onRestart }: RestartButtonProps) {
  return (
    <Button
      variant="skeuo"
      onClick={onRestart}
      className="group px-8 h-12"
    >
      <RefreshCw className="mr-2 h-4 w-4 transition-transform group-hover:rotate-180" />
      <span className="pixel-text text-xs">Reset System</span>
      <span className="ml-3 text-[10px] text-zinc-600 opacity-0 group-hover:opacity-100 transition-opacity">TAB</span>
    </Button>
  );
}
