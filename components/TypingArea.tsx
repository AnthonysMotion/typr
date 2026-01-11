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

  useEffect(() => {
    if (cursorRef.current && containerRef.current) {
      const cursor = cursorRef.current;
      const container = containerRef.current;
      const cursorRect = cursor.getBoundingClientRect();
      const containerRect = container.getBoundingClientRect();
      
      if (cursorRect.bottom > containerRect.bottom - 40) {
        container.scrollTop += cursorRect.bottom - containerRect.bottom + 60;
      }
    }
  }, [typedText]);

  const renderCharacters = () => {
    const chars = text.split("");
    const typedChars = typedText.split("");

    return chars.map((char, index) => {
      let className = "text-zinc-700";
      let isCursor = false;

      if (index < typedChars.length) {
        if (typedChars[index] === char) {
          className = "text-zinc-200";
        } else {
          className = "text-red-500 bg-red-500/10";
        }
      } else if (index === typedChars.length) {
        isCursor = true;
        className = "text-zinc-100 border-b-2 border-white animate-pulse";
      }

      return (
        <span
          key={index}
          ref={isCursor ? cursorRef : null}
          className={`${className} transition-all duration-100`}
        >
          {char}
        </span>
      );
    });
  };

  return (
    <div className="skeuo-card w-full max-w-4xl p-1">
      <div className="rounded-2xl bg-[#0d0d0d] p-8">
        <div
          ref={containerRef}
          className={`relative max-h-56 overflow-y-auto font-mono text-2xl leading-[1.6] tracking-wide md:text-3xl ${
            isFinished ? "opacity-30" : ""
          } hide-scrollbar`}
          style={{ scrollBehavior: "smooth" }}
        >
          <div className="whitespace-pre-wrap break-words">
            {renderCharacters()}
          </div>
          {!isFinished && typedText.length === 0 && (
            <div className="absolute inset-0 flex items-center justify-center bg-[#0d0d0d]/40 backdrop-blur-[2px]">
              <div className="inset-box px-6 py-2">
                <p className="pixel-text text-xs text-zinc-500">Awaiting Input...</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
