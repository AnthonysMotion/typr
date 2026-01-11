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
      let className = "text-slate-300";
      let isCursor = false;

      if (index < typedChars.length) {
        if (typedChars[index] === char) {
          className = "text-slate-900";
        } else {
          className = "text-red-400 bg-red-50 rounded-[4px]";
        }
      } else if (index === typedChars.length) {
        isCursor = true;
        className = "text-blue-600 relative after:absolute after:bottom-0 after:left-0 after:h-1 after:w-full after:bg-blue-600 after:rounded-full after:animate-pulse";
      }

      return (
        <span
          key={index}
          ref={isCursor ? cursorRef : null}
          className={`${className} transition-all duration-150`}
        >
          {char}
        </span>
      );
    });
  };

  return (
    <div className="w-full max-w-5xl group relative">
      <div className="glass-morphism rounded-[3rem] p-1 shadow-2xl transition-transform duration-500 hover:scale-[1.01]">
        <div className="bg-white/40 rounded-[2.8rem] p-10 md:p-14 relative">
          <div
            ref={containerRef}
            className={`relative max-h-64 overflow-y-auto font-sans text-3xl leading-[1.6] tracking-tight md:text-4xl transition-all duration-300 ${
              isFinished ? "opacity-30 grayscale" : ""
            } ${!isFinished && typedText.length === 0 ? "blur-[1px]" : ""} hide-scrollbar`}
            style={{ scrollBehavior: "smooth" }}
          >
            <div className="whitespace-pre-wrap break-words">
              {renderCharacters()}
            </div>
          </div>
          {!isFinished && typedText.length === 0 && (
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="bg-blue-50/50 backdrop-blur-md px-8 py-3 rounded-full border border-blue-100 shadow-sm pointer-events-auto">
                <p className="text-sm uppercase tracking-[0.2em] text-blue-500">Focus to Begin</p>
              </div>
            </div>
          )}
        </div>
      </div>
      
      {/* Subtle decorative elements matching images */}
      <div className="absolute -top-6 -right-6 h-24 w-24 bg-blue-400/10 blur-3xl rounded-full" />
      <div className="absolute -bottom-6 -left-6 h-32 w-32 bg-purple-400/10 blur-3xl rounded-full" />
    </div>
  );
}
