"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Accessibility,
  X,
  Eye,
  Type,
  VolumeX,
  Volume2,
  Box,
  Zap,
  HelpCircle,
  Sparkles,
} from "lucide-react";
import { getSavedExperienceMode, saveExperienceMode, ExperienceMode } from "@/lib/experience-mode";

export function AccessibilityPanel() {
  const [isOpen, setIsOpen] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [highContrast, setHighContrast] = useState(false);
  const [largerText, setLargerText] = useState(false);
  const [perfMode, setPerfMode] = useState<ExperienceMode>("immersive");

  useEffect(() => {
    // Initial load from storage / media queries
    const rm = localStorage.getItem("a11y-reduced-motion") === "true";
    const hc = localStorage.getItem("a11y-high-contrast") === "true";
    const lt = localStorage.getItem("a11y-larger-text") === "true";
    setReducedMotion(rm);
    setHighContrast(hc);
    setLargerText(lt);
    setPerfMode(getSavedExperienceMode());

    applyClasses(rm, hc, lt);

    // Keyboard shortcut Alt + A
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.altKey && (e.key === "a" || e.key === "A")) {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      } else if (e.key === "Escape" && isOpen) {
        setIsOpen(false);
      }
    };

    const handleCustomOpen = () => setIsOpen(true);
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("open-accessibility-panel", handleCustomOpen);

    const handleModeChange = (e: Event) => {
      const customEvent = e as CustomEvent<ExperienceMode>;
      if (customEvent.detail) setPerfMode(customEvent.detail);
    };
    window.addEventListener("experience-mode-change", handleModeChange);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("open-accessibility-panel", handleCustomOpen);
      window.removeEventListener("experience-mode-change", handleModeChange);
    };
  }, [isOpen]);

  const applyClasses = (rm: boolean, hc: boolean, lt: boolean) => {
    if (typeof document === "undefined") return;
    document.documentElement.classList.toggle("a11y-reduced-motion", rm);
    document.documentElement.classList.toggle("a11y-high-contrast", hc);
    document.documentElement.classList.toggle("a11y-larger-text", lt);
  };

  const toggleReducedMotion = () => {
    const next = !reducedMotion;
    setReducedMotion(next);
    localStorage.setItem("a11y-reduced-motion", String(next));
    applyClasses(next, highContrast, largerText);
  };

  const toggleHighContrast = () => {
    const next = !highContrast;
    setHighContrast(next);
    localStorage.setItem("a11y-high-contrast", String(next));
    applyClasses(reducedMotion, next, largerText);
  };

  const toggleLargerText = () => {
    const next = !largerText;
    setLargerText(next);
    localStorage.setItem("a11y-larger-text", String(next));
    applyClasses(reducedMotion, highContrast, next);
  };

  const toggle3D = () => {
    const nextMode: ExperienceMode = perfMode === "low-bandwidth" ? "immersive" : "low-bandwidth";
    setPerfMode(nextMode);
    saveExperienceMode(nextMode);
  };

  return (
    <>
      {/* Floating Trigger Button */}
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="fixed bottom-5 left-5 z-40 p-2.5 rounded-full glass border border-purple-500/30 bg-slate-950/80 text-purple-300 hover:text-white hover:border-purple-400 hover:scale-105 transition-all shadow-lg shadow-purple-500/20 cursor-pointer"
        aria-label="Open Accessibility Panel (Alt + A)"
        title="Accessibility & Contrast Settings (Alt + A)"
      >
        <Accessibility className="size-5" />
      </button>

      {/* Accessible Dialog Modal */}
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/80 backdrop-blur-sm"
            />

            {/* Dialog Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              role="dialog"
              aria-modal="true"
              aria-label="Accessibility & Display Preferences"
              className="relative z-10 w-full max-w-md rounded-2xl glass border border-purple-500/30 bg-slate-950/95 p-6 text-slate-100 shadow-2xl"
            >
              {/* Header */}
              <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-5">
                <div className="flex items-center gap-2">
                  <div className="p-2 rounded-xl bg-purple-500/15 text-purple-400 border border-purple-500/30">
                    <Accessibility className="size-5" />
                  </div>
                  <div>
                    <h2 className="text-base font-bold text-white">Accessibility & Display</h2>
                    <p className="text-[11px] text-slate-400">Custom user preferences and shortcuts</p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
                  aria-label="Close dialog"
                >
                  <X className="size-4" />
                </button>
              </div>

              {/* Preferences Controls */}
              <div className="space-y-3 mb-6">
                {/* Reduced Motion */}
                <div className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/5">
                  <div className="flex items-center gap-3">
                    <Zap className="size-4 text-purple-400" />
                    <div>
                      <div className="text-xs font-semibold text-white">Reduced Motion</div>
                      <div className="text-[10px] text-slate-400">Minimize animations and smooth scroll</div>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={toggleReducedMotion}
                    role="switch"
                    aria-checked={reducedMotion}
                    className={`relative inline-flex h-5 w-10 shrink-0 cursor-pointer rounded-full transition-colors ${
                      reducedMotion ? "bg-purple-600" : "bg-slate-700"
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform mt-0.5 ml-0.5 ${
                        reducedMotion ? "translate-x-5" : "translate-x-0"
                      }`}
                    />
                  </button>
                </div>

                {/* High Contrast */}
                <div className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/5">
                  <div className="flex items-center gap-3">
                    <Eye className="size-4 text-purple-400" />
                    <div>
                      <div className="text-xs font-semibold text-white">High Contrast</div>
                      <div className="text-[10px] text-slate-400">Amplify border borders and text contrast</div>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={toggleHighContrast}
                    role="switch"
                    aria-checked={highContrast}
                    className={`relative inline-flex h-5 w-10 shrink-0 cursor-pointer rounded-full transition-colors ${
                      highContrast ? "bg-purple-600" : "bg-slate-700"
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform mt-0.5 ml-0.5 ${
                        highContrast ? "translate-x-5" : "translate-x-0"
                      }`}
                    />
                  </button>
                </div>

                {/* Larger Text */}
                <div className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/5">
                  <div className="flex items-center gap-3">
                    <Type className="size-4 text-purple-400" />
                    <div>
                      <div className="text-xs font-semibold text-white">Enlarged Typography</div>
                      <div className="text-[10px] text-slate-400">Scale base font dimensions for legibility</div>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={toggleLargerText}
                    role="switch"
                    aria-checked={largerText}
                    className={`relative inline-flex h-5 w-10 shrink-0 cursor-pointer rounded-full transition-colors ${
                      largerText ? "bg-purple-600" : "bg-slate-700"
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform mt-0.5 ml-0.5 ${
                        largerText ? "translate-x-5" : "translate-x-0"
                      }`}
                    />
                  </button>
                </div>

                {/* 3D WebGL Toggle */}
                <div className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/5">
                  <div className="flex items-center gap-3">
                    <Box className="size-4 text-purple-400" />
                    <div>
                      <div className="text-xs font-semibold text-white">3D WebGL Acceleration</div>
                      <div className="text-[10px] text-slate-400">
                        {perfMode === "low-bandwidth" ? "Disabled (Static CSS/SVG active)" : "Active (Full Neural Core)"}
                      </div>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={toggle3D}
                    className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
                      perfMode === "low-bandwidth"
                        ? "bg-slate-700 text-slate-300 hover:bg-slate-600"
                        : "bg-gradient-to-r from-purple-600 to-rose-500 text-white"
                    }`}
                  >
                    {perfMode === "low-bandwidth" ? "Enable 3D" : "Disable 3D"}
                  </button>
                </div>
              </div>

              {/* Keyboard Shortcuts Cheat Sheet */}
              <div className="rounded-xl border border-white/10 bg-white/5 p-3.5">
                <div className="flex items-center gap-1.5 text-xs font-semibold text-purple-300 mb-2">
                  <HelpCircle className="size-3.5" />
                  <span>Keyboard Navigation Shortcuts</span>
                </div>
                <div className="grid grid-cols-2 gap-2 text-[11px] font-mono text-slate-400">
                  <div className="flex items-center justify-between">
                    <span>Search / HUD</span>
                    <kbd className="px-1.5 py-0.5 rounded bg-slate-800 border border-slate-700 text-white">Ctrl + K</kbd>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>A11y Panel</span>
                    <kbd className="px-1.5 py-0.5 rounded bg-slate-800 border border-slate-700 text-white">Alt + A</kbd>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Close Modal</span>
                    <kbd className="px-1.5 py-0.5 rounded bg-slate-800 border border-slate-700 text-white">Esc</kbd>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Select Item</span>
                    <kbd className="px-1.5 py-0.5 rounded bg-slate-800 border border-slate-700 text-white">Enter</kbd>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}

export default AccessibilityPanel;
