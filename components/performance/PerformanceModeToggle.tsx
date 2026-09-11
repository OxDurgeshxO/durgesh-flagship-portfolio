"use client";

import React, { useState, useEffect } from "react";
import { Sparkles, Gauge, Zap, Check } from "lucide-react";
import {
  PerformanceMode,
  getSavedPerformanceMode,
  savePerformanceMode,
} from "@/lib/performance";

export default function PerformanceModeToggle() {
  const [mode, setMode] = useState<PerformanceMode>("immersive");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setMode(getSavedPerformanceMode());
  }, []);

  const handleSelect = (selected: PerformanceMode) => {
    setMode(selected);
    savePerformanceMode(selected);
  };

  const modes: {
    id: PerformanceMode;
    label: string;
    description: string;
    icon: typeof Sparkles;
    badge: string;
  }[] = [
    {
      id: "immersive",
      label: "Immersive 3D",
      description: "Full Three.js WebGL canvas (5,001 particles), 3D CyberBot, dynamic audio, and ambient glows.",
      icon: Sparkles,
      badge: "Full GPU",
    },
    {
      id: "balanced",
      label: "Balanced",
      description: "Optimized particle density (1,200), DPR clamped to 1.0, audio muted by default, battery saver.",
      icon: Gauge,
      badge: "Laptops & Tablets",
    },
    {
      id: "low-bandwidth",
      label: "Low-Bandwidth",
      description: "All 3D WebGL canvases unmounted. Zero audio overhead. Fast content-first layout with zero layout shift.",
      icon: Zap,
      badge: "Instant < 80 KB",
    },
  ];

  return (
    <div className="glass rounded-2xl p-6 md:p-8 border border-white/10 mb-10 bg-white/[0.02]">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
        <div>
          <h2 className="text-xl font-bold text-white tracking-tight">
            Runtime Experience & Performance Selector
          </h2>
          <p className="text-xs text-slate-400">
            Control GPU acceleration and data usage across the entire portfolio in real time.
          </p>
        </div>
        <span className="text-xs font-mono px-3 py-1 rounded-full border border-purple-500/30 bg-purple-500/10 text-purple-300 w-fit">
          Active: {mode.toUpperCase()}
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {modes.map((m) => {
          const Icon = m.icon;
          const isActive = mode === m.id;
          return (
            <button
              key={m.id}
              onClick={() => handleSelect(m.id)}
              className={`p-5 rounded-xl text-left border transition-all cursor-pointer relative ${
                isActive
                  ? "bg-purple-950/40 border-purple-400/80 shadow-lg shadow-purple-500/20"
                  : "bg-white/[0.02] border-white/10 hover:border-white/20"
              }`}
              aria-pressed={isActive}
            >
              {isActive && (
                <div className="absolute top-3 right-3 p-1 rounded-full bg-purple-500 text-white">
                  <Check className="size-3" />
                </div>
              )}
              <div className="flex items-center gap-2 mb-2">
                <Icon className={`size-4 ${isActive ? "text-purple-300" : "text-slate-400"}`} />
                <span className="font-bold text-sm text-white">{m.label}</span>
              </div>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/5 text-purple-300 mb-2 inline-block">
                {m.badge}
              </span>
              <p className="text-xs text-slate-400 leading-relaxed">
                {m.description}
              </p>
            </button>
          );
        })}
      </div>
    </div>
  );
}
