"use client";

import React, { useState, useEffect, useRef } from "react";
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
  Palette,
} from "lucide-react";
import { getSavedExperienceMode, saveExperienceMode, ExperienceMode } from "@/lib/experience-mode";
import { useTheme } from "@/lib/themes/provider";
import { THEMES, ThemeId, getTheme } from "@/lib/themes/registry";

function safeGetItem(key: string): string | null {
  if (typeof window === "undefined") return null;
  try {
    return localStorage.getItem(key);
  } catch {
    return null;
  }
}

function safeSetItem(key: string, value: string): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(key, value);
  } catch {
    // Graceful degradation when storage is blocked (e.g. private browsing)
  }
}

export function AccessibilityPanel() {
  const [isOpen, setIsOpen] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [highContrast, setHighContrast] = useState(false);
  const [largerText, setLargerText] = useState(false);
  const [perfMode, setPerfMode] = useState<ExperienceMode>("immersive");
  const { theme, setTheme } = useTheme();
  const meta = getTheme(theme);
  const previousFocusRef = useRef<HTMLElement | null>(null);
  const panelRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    // Initial load from storage / media queries
    const rm = safeGetItem("a11y-reduced-motion") === "true";
    const hc = safeGetItem("a11y-high-contrast") === "true";
    const lt = safeGetItem("a11y-larger-text") === "true";
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

  useEffect(() => {
    if (isOpen) {
      previousFocusRef.current = document.activeElement as HTMLElement;
      setTimeout(() => {
        const firstBtn = panelRef.current?.querySelector<HTMLElement>('button');
        firstBtn?.focus();
      }, 50);
    } else if (previousFocusRef.current) {
      previousFocusRef.current.focus?.();
      previousFocusRef.current = null;
    }
  }, [isOpen]);

  const handleKeyDownTrap = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key !== "Tab" || !panelRef.current) return;
    const focusables = panelRef.current.querySelectorAll<HTMLElement>(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    if (focusables.length === 0) return;
    const first = focusables[0];
    const last = focusables[focusables.length - 1];
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  };

  const applyClasses = (rm: boolean, hc: boolean, lt: boolean) => {
    if (typeof document === "undefined") return;
    document.documentElement.classList.toggle("a11y-reduced-motion", rm);
    document.documentElement.classList.toggle("a11y-high-contrast", hc);
    document.documentElement.classList.toggle("a11y-larger-text", lt);
  };

  const toggleReducedMotion = () => {
    const next = !reducedMotion;
    setReducedMotion(next);
    safeSetItem("a11y-reduced-motion", String(next));
    applyClasses(next, highContrast, largerText);
  };

  const toggleHighContrast = () => {
    const next = !highContrast;
    setHighContrast(next);
    safeSetItem("a11y-high-contrast", String(next));
    applyClasses(reducedMotion, next, largerText);
  };

  const toggleLargerText = () => {
    const next = !largerText;
    setLargerText(next);
    safeSetItem("a11y-larger-text", String(next));
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
        className="fixed bottom-5 left-5 z-40 p-2.5 rounded-full glass border border-primary/40 bg-popover/90 text-primary hover:text-ink hover:border-purple-400 hover:scale-105 transition-all shadow-lg shadow-black/20 cursor-pointer"
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
              className="fixed inset-0 bg-[var(--overlay-scrim)] backdrop-blur-sm"
            />

            {/* Dialog Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              role="dialog"
              aria-modal="true"
              aria-label="Accessibility & Display Preferences"
              className="relative z-10 w-full max-w-md rounded-2xl glass border border-primary/40 bg-popover p-6 text-ink shadow-2xl"
            >
              {/* Header */}
              <div className="flex items-center justify-between pb-4 border-b border-border mb-5">
                <div className="flex items-center gap-2">
                  <div className="p-2 rounded-xl bg-primary/10 text-primary border border-primary/40">
                    <Accessibility className="size-5" />
                  </div>
                  <div>
                    <h2 className="text-base font-bold text-ink">Accessibility & Display</h2>
                    <p className="text-[11px] text-muted-foreground">Custom user preferences and shortcuts</p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="p-1.5 rounded-lg text-muted-foreground hover:text-ink hover:bg-accent transition-colors"
                  aria-label="Close dialog"
                >
                  <X className="size-4" />
                </button>
              </div>

              {/* Preferences Controls */}
              <div className="space-y-3 mb-6">
                {/* Reduced Motion */}
                <div className="flex items-center justify-between p-3 rounded-xl bg-muted border border-border/60">
                  <div className="flex items-center gap-3">
                    <Zap className="size-4 text-primary" />
                    <div>
                      <div className="text-xs font-semibold text-ink">Reduced Motion</div>
                      <div className="text-[10px] text-muted-foreground">Minimize animations and smooth scroll</div>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={toggleReducedMotion}
                    role="switch"
                    aria-checked={reducedMotion}
                    className={`relative inline-flex h-5 w-10 shrink-0 cursor-pointer rounded-full transition-colors ${
                      reducedMotion ? "bg-primary" : "bg-border-strong"
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-ink transition-transform mt-0.5 ml-0.5 ${
                        reducedMotion ? "translate-x-5" : "translate-x-0"
                      }`}
                    />
                  </button>
                </div>

                {/* High Contrast */}
                <div className="flex items-center justify-between p-3 rounded-xl bg-muted border border-border/60">
                  <div className="flex items-center gap-3">
                    <Eye className="size-4 text-primary" />
                    <div>
                      <div className="text-xs font-semibold text-ink">High Contrast</div>
                      <div className="text-[10px] text-muted-foreground">Amplify border borders and text contrast</div>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={toggleHighContrast}
                    role="switch"
                    aria-checked={highContrast}
                    className={`relative inline-flex h-5 w-10 shrink-0 cursor-pointer rounded-full transition-colors ${
                      highContrast ? "bg-primary" : "bg-border-strong"
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-ink transition-transform mt-0.5 ml-0.5 ${
                        highContrast ? "translate-x-5" : "translate-x-0"
                      }`}
                    />
                  </button>
                </div>

                {/* Larger Text */}
                <div className="flex items-center justify-between p-3 rounded-xl bg-muted border border-border/60">
                  <div className="flex items-center gap-3">
                    <Type className="size-4 text-primary" />
                    <div>
                      <div className="text-xs font-semibold text-ink">Enlarged Typography</div>
                      <div className="text-[10px] text-muted-foreground">Scale base font dimensions for legibility</div>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={toggleLargerText}
                    role="switch"
                    aria-checked={largerText}
                    className={`relative inline-flex h-5 w-10 shrink-0 cursor-pointer rounded-full transition-colors ${
                      largerText ? "bg-primary" : "bg-border-strong"
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-ink transition-transform mt-0.5 ml-0.5 ${
                        largerText ? "translate-x-5" : "translate-x-0"
                      }`}
                    />
                  </button>
                </div>

                {/* Theme — every theme is a dark appearance, so there is no
                    day/night row to pair with it. */}
                <div className="flex items-center justify-between p-3 rounded-xl bg-muted border border-border/60">
                  <div className="flex items-center gap-3">
                    <Palette className="size-4 text-primary" />
                    <div>
                      <div className="text-xs font-semibold text-ink">Theme</div>
                      <div className="text-[10px] text-muted-foreground">{meta.name}</div>
                    </div>
                  </div>
                  <select
                    value={theme}
                    onChange={(e) => setTheme(e.target.value as ThemeId)}
                    aria-label="Select theme"
                    className="bg-card border border-border-strong text-ink text-xs rounded-lg px-2 py-1 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ring)]"
                  >
                    {THEMES.map((t) => (
                      <option key={t.id} value={t.id}>
                        {t.name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* 3D WebGL Toggle */}
                <div className="flex items-center justify-between p-3 rounded-xl bg-muted border border-border/60">
                  <div className="flex items-center gap-3">
                    <Box className="size-4 text-primary" />
                    <div>
                      <div className="text-xs font-semibold text-ink">3D WebGL Acceleration</div>
                      <div className="text-[10px] text-muted-foreground">
                        {perfMode === "low-bandwidth" ? "Disabled (Static CSS/SVG active)" : "Active (Full Neural Core)"}
                      </div>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={toggle3D}
                    className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
                      perfMode === "low-bandwidth"
                        ? "bg-muted text-body hover:bg-accent border border-border-strong"
                        : "bg-gradient-to-r from-[var(--gradient-start)] to-[var(--gradient-end)] text-[var(--on-accent-fill)]"
                    }`}
                  >
                    {perfMode === "low-bandwidth" ? "Enable 3D" : "Disable 3D"}
                  </button>
                </div>
              </div>

              {/* Keyboard Shortcuts Cheat Sheet */}
              <div className="rounded-xl border border-border bg-muted p-3.5">
                <div className="flex items-center gap-1.5 text-xs font-semibold text-primary mb-2">
                  <HelpCircle className="size-3.5" />
                  <span>Keyboard Navigation Shortcuts</span>
                </div>
                <div className="grid grid-cols-2 gap-2 text-[11px] font-mono text-muted-foreground">
                  <div className="flex items-center justify-between">
                    <span>Search / HUD</span>
                    <kbd className="px-1.5 py-0.5 rounded bg-muted border border-border-strong text-ink">Ctrl + K</kbd>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>A11y Panel</span>
                    <kbd className="px-1.5 py-0.5 rounded bg-muted border border-border-strong text-ink">Alt + A</kbd>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Close Modal</span>
                    <kbd className="px-1.5 py-0.5 rounded bg-muted border border-border-strong text-ink">Esc</kbd>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Select Item</span>
                    <kbd className="px-1.5 py-0.5 rounded bg-muted border border-border-strong text-ink">Enter</kbd>
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
