"use client";

import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

const WORDS = ["Design", "Engineer", "Innovate", "Create"];
const DURATION = 1800; // ms

export default function LoadingScreen({ onComplete }: { onComplete: () => void }) {
  const [count, setCount] = useState(0);
  const [wordIndex, setWordIndex] = useState(0);
  const onCompleteRef = useRef(onComplete);
  onCompleteRef.current = onComplete;
  const completedRef = useRef(false);

  useEffect(() => {
    const wordInterval = setInterval(() => {
      setWordIndex((prev) => (prev + 1) % WORDS.length);
    }, 450);

    const start = performance.now();
    let raf = 0;

    const tick = (now: number) => {
      const progress = Math.min((now - start) / DURATION, 1);
      const currentCount = Math.round(progress * 100);
      setCount(currentCount);

      if (progress < 1) {
        raf = requestAnimationFrame(tick);
      } else if (!completedRef.current) {
        completedRef.current = true;
        setTimeout(() => {
          onCompleteRef.current();
        }, 200);
      }
    };

    raf = requestAnimationFrame(tick);

    return () => {
      clearInterval(wordInterval);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div className="relative flex h-full w-full flex-col items-center justify-center bg-[#0a0a0f] text-white">
      {/* Background glow */}
      <div className="pointer-events-none absolute h-96 w-96 rounded-full bg-[#6c63ff]/15 blur-[120px]" />

      {/* Skip button */}
      <button
        onClick={() => onCompleteRef.current()}
        className="absolute top-6 right-6 z-20 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-mono text-slate-400 hover:text-white hover:border-white/30 transition-colors"
      >
        Skip ➔
      </button>

      <div className="relative z-10 flex flex-col items-center gap-5">
        {/* Animated word cycler */}
        <div className="h-7 overflow-hidden text-center font-mono text-xs md:text-sm tracking-[0.3em] uppercase text-[#00d4ff]">
          <motion.div
            key={wordIndex}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.25 }}
          >
            {WORDS[wordIndex]}
          </motion.div>
        </div>

        {/* Counter */}
        <div className="font-mono text-6xl md:text-7xl font-bold tracking-tight text-white select-none">
          <span>{count}</span>
          <span className="text-xl text-[#6c63ff] font-normal ml-1">%</span>
        </div>

        {/* Minimalist Progress Bar */}
        <div className="h-1 w-48 overflow-hidden rounded-full bg-white/10">
          <div
            className="h-full bg-gradient-to-r from-[#6c63ff] to-[#00d4ff] transition-all duration-75 ease-out"
            style={{ width: `${count}%` }}
          />
        </div>

        <p className="text-[10.5px] font-mono text-slate-500 uppercase tracking-widest mt-1">
          Loading 3D Portfolio
        </p>
      </div>
    </div>
  );
}
