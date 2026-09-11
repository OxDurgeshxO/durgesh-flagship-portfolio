"use client";

import React, { useEffect, useState, useRef } from "react";
import { Moon, Sparkles } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { trackEvent } from "@/lib/analytics";

export default function ThemeToggle() {
  const [showTooltip, setShowTooltip] = useState(false);
  const [mounted, setMounted] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    setMounted(true);
    // Enforce dark mode: clean up any legacy light mode preference
    document.documentElement.classList.remove("light");
    localStorage.setItem("portfolio-theme", "dark");

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  const handleAttempt = () => {
    setShowTooltip(true);
    trackEvent("theme_toggle", { status: "disabled_upcoming_feature" });
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => setShowTooltip(false), 3200);
  };

  if (!mounted) {
    return (
      <div className="h-8 px-3 rounded-full border border-white/10 glass flex items-center gap-1.5 opacity-50" />
    );
  }

  return (
    <div className="relative inline-block">
      <button
        onClick={handleAttempt}
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
        aria-label="Light mode is an upcoming feature (Currently locked in Dark Mode)"
        title="Light mode is an upcoming feature"
        className="group relative h-8 px-2.5 sm:px-3 rounded-full glass border border-purple-500/30 hover:border-rose-400/50 bg-slate-950/60 flex items-center gap-1.5 sm:gap-2 transition-all shadow-inner hover:shadow-purple-500/20 active:scale-95 cursor-pointer select-none"
      >
        {/* Glowing Moon Icon */}
        <div className="w-5 h-5 rounded-full bg-gradient-to-tr from-purple-600 to-rose-500 text-white flex items-center justify-center shadow-md shadow-purple-500/40 group-hover:rotate-12 transition-transform">
          <Moon className="size-3" />
        </div>

        {/* Status Label */}
        <span className="text-[11px] font-mono text-slate-300 font-medium hidden sm:inline">
          Dark
        </span>

        {/* Upcoming Badge */}
        <span className="text-[9px] px-1.5 py-0.5 rounded-full bg-purple-500/20 text-rose-300 border border-purple-500/30 font-semibold tracking-wider uppercase flex items-center gap-1">
          <Sparkles className="size-2 animate-pulse text-rose-400" />
          <span>Upcoming</span>
        </span>
      </button>

      {/* Floating Tooltip Callout */}
      <AnimatePresence>
        {showTooltip && (
          <motion.div
            initial={{ opacity: 0, y: 6, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 4, scale: 0.95 }}
            transition={{ duration: 0.18 }}
            className="absolute top-10 right-0 z-50 w-56 p-2.5 rounded-xl glass border border-purple-500/40 bg-slate-950/95 shadow-xl shadow-purple-500/25 text-left pointer-events-none"
          >
            <div className="flex items-center gap-1.5 mb-1">
              <Sparkles className="size-3 text-rose-400" />
              <span className="text-[10px] font-mono font-bold tracking-wider text-rose-300 uppercase">
                Upcoming Feature
              </span>
            </div>
            <p className="text-[11px] text-slate-200 leading-tight">
              Adaptive Light Mode is coming in v2.0! Currently optimized for Neo-Tokyo Dark Mode.
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
