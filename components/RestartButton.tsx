"use client";

interface RestartButtonProps {
  onRestart: () => void;
}

export default function RestartButton({ onRestart }: RestartButtonProps) {
  return (
    <button
      onClick={onRestart}
      className="group flex items-center gap-2 rounded-lg bg-zinc-800 px-6 py-3 font-medium text-zinc-300 transition-all hover:bg-zinc-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 focus:ring-offset-zinc-950"
    >
      <svg
        className="h-5 w-5 transition-transform group-hover:rotate-180"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
        />
      </svg>
      Restart
      <span className="text-xs text-zinc-500">(Tab)</span>
    </button>
  );
}
