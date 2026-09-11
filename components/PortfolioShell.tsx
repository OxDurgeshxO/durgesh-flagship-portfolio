"use client";

import { useState, useEffect, useCallback } from "react";
import dynamic from "next/dynamic";
import LoadingScreen from "@/components/LoadingScreen";
import { Background } from "@/components/Background";
import CommandPalette from "@/components/CommandPalette";
import AccessibilityPanel from "@/components/accessibility/AccessibilityPanel";
import { getSavedPerformanceMode, PerformanceMode } from "@/lib/performance";

const RoamingCompanion3D = dynamic(
  () => import("@/components/companion/RoamingCompanion3D"),
  { ssr: false }
);

export function PortfolioShell({ children }: { children: React.ReactNode }) {
  const [isLoading, setIsLoading] = useState(true);
  const [mounted, setMounted] = useState(false);
  const [perfMode, setPerfMode] = useState<PerformanceMode>("immersive");

  useEffect(() => {
    setMounted(true);
    const initialMode = getSavedPerformanceMode();
    setPerfMode(initialMode);
    if (initialMode === "low-bandwidth") {
      setIsLoading(false);
    }

    const handleModeChange = (e: Event) => {
      const customEvent = e as CustomEvent<PerformanceMode>;
      if (customEvent.detail) {
        setPerfMode(customEvent.detail);
      }
    };

    window.addEventListener("performance-mode-change", handleModeChange);
    return () => window.removeEventListener("performance-mode-change", handleModeChange);
  }, []);

  const handleComplete = useCallback(() => {
    setIsLoading(false);
    document.body.style.overflow = "";
  }, []);

  // Safety fallback: guaranteed to release screen after max 2.5 seconds no matter what
  useEffect(() => {
    const safetyTimer = setTimeout(() => {
      setIsLoading(false);
      document.body.style.overflow = "";
    }, 2500);
    return () => clearTimeout(safetyTimer);
  }, []);

  const isLowBandwidth = perfMode === "low-bandwidth";

  return (
    <div className="relative w-full min-h-screen">
      {/* Loading Screen Overlay - suppressed in low-bandwidth mode */}
      {mounted && !isLowBandwidth && (
        <div
          className={`fixed inset-0 z-[9999] transition-opacity duration-700 ${
            isLoading ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
          }`}
        >
          <LoadingScreen onComplete={handleComplete} />
        </div>
      )}

      {/* Background with zero pointer event interference */}
      <Background />

      {/* Roaming 3D Interactive Cyber Figure - unmounted in low-bandwidth mode */}
      {mounted && !isLoading && !isLowBandwidth && <RoamingCompanion3D />}

      {/* Global Accessibility Control Panel (Alt + A) */}
      {mounted && <AccessibilityPanel />}

      {/* Global Futuristic Command Palette (Ctrl+K / Cmd+K) */}
      {mounted && <CommandPalette />}

      {/* Main interactive page content */}
      <div className="relative z-10 w-full pointer-events-auto">
        {children}
      </div>
    </div>
  );
}
