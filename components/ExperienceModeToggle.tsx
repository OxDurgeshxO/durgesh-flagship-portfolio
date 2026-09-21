"use client";

import React, { useState, useEffect } from "react";
import { Sparkles, Gauge, Zap } from "lucide-react";
import { ExperienceMode, getSavedExperienceMode, saveExperienceMode } from "@/lib/experience-mode";

interface Props {
  compact?: boolean;
}

export function ExperienceModeToggle({ compact = false }: Props) {
  const [mode, setMode] = useState<ExperienceMode>("immersive");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setMode(getSavedExperienceMode());

    const handleModeChange = (e: Event) => {
      const customEvent = e as CustomEvent<ExperienceMode>;
      if (customEvent.detail) {
        setMode(customEvent.detail);
      }
    };

    window.addEventListener("experience-mode-change", handleModeChange);
    window.addEventListener("performance-mode-change", handleModeChange);
    return () => {
      window.removeEventListener("experience-mode-change", handleModeChange);
      window.removeEventListener("performance-mode-change", handleModeChange);
    };
  }, []);

  if (!mounted) return null;

  const modes: { id: ExperienceMode; label: string; icon: React.ElementType }[] = [
    { id: "immersive", label: "Immersive", icon: Sparkles },
    { id: "balanced", label: "Balanced", icon: Gauge },
    { id: "low-bandwidth", label: "Light", icon: Zap },
  ];

  return (
    <div
      role="group"
      aria-label="Experience Mode Selector"
      className={`inline-flex items-center gap-1 rounded-xl bg-slate-900/90 border border-white/10 p-1 backdrop-blur-md shadow-lg ${
        compact ? "scale-90" : ""
      }`}
    >
      {modes.map((m) => {
        const Icon = m.icon;
        const isActive = mode === m.id;
        return (
          <button
            key={m.id}
            type="button"
            onClick={() => {
              setMode(m.id);
              saveExperienceMode(m.id);
            }}
            aria-pressed={isActive}
            title={`Switch to ${m.label} Mode`}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
              isActive
                ? "bg-gradient-to-r from-purple-600 to-rose-500 text-white shadow-md shadow-purple-500/25"
                : "text-slate-400 hover:text-white hover:bg-white/5"
            }`}
          >
            <Icon className="size-3.5" />
            <span>{m.label}</span>
          </button>
        );
      })}
    </div>
  );
}

export default ExperienceModeToggle;
