"use client";

import { useEffect, useRef } from "react";

interface TypingAreaProps {
  text: string;
  typedText: string;
  isFinished: boolean;
}

export default function TypingArea({ text, typedText, isFinished }: TypingAreaProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const cursorRef = useRef<HTMLSpanElement>(null);

  // Auto-scroll to keep cursor in view
  useEffect(() => {
    if (cursorRef.current && containerRef.current) {
      const cursor = cursorRef.current;
      const container = containerRef.current;
      const cursorRect = cursor.getBoundingClientRect();
      const containerRect = container.getBoundingClientRect();
      
      if (cursorRect.bottom > containerRect.bottom - 20) {
        container.scrollTop += cursorRect.bottom - containerRect.bottom + 40;
      }
    }
  }, [typedText]);

  const renderCharacters = () => {
    const chars = text.split("");
    const typedChars = typedText.split("");

    return chars.map((char, index) => {
      let className = "text-zinc-500"; // Untyped characters
      let isCursor = false;

      if (index < typedChars.length) {
        // Already typed
        if (typedChars[index] === char) {
          className = "text-emerald-400"; // Correct
        } else {
          className = "text-red-400 bg-red-900/30"; // Incorrect
        }
      } else if (index === typedChars.length) {
        // Current character
        isCursor = true;
        className = "text-zinc-300 border-b-2 border-amber-400";
      }

      return (
        <span
          key={index}
          ref={isCursor ? cursorRef : null}
          className={`${className} transition-colors duration-75`}
        >
          {char}
        </span>
      );
    });
  };

  return (
    <div
      ref={containerRef}
      className={`relative max-h-48 overflow-hidden rounded-lg bg-zinc-900/50 p-6 font-mono text-xl leading-relaxed tracking-wide md:text-2xl ${
        isFinished ? "opacity-50" : ""
      }`}
    >
      <div className="whitespace-pre-wrap break-words">
        {renderCharacters()}
      </div>
      {!isFinished && typedText.length === 0 && (
        <div className="absolute inset-0 flex items-center justify-center bg-zinc-900/90">
          <p className="text-zinc-400 text-lg">Start typing to begin...</p>
        </div>
      )}
    </div>
  );
}
