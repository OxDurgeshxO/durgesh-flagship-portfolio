"use client";

import { useState, useEffect, useCallback } from "react";
import dynamic from "next/dynamic";
import LoadingScreen from "@/components/LoadingScreen";
import { Background } from "@/components/Background";
import CommandPalette from "@/components/CommandPalette";

const RoamingCompanion3D = dynamic(
  () => import("@/components/companion/RoamingCompanion3D"),
  { ssr: false }
);

export function PortfolioShell({ children }: { children: React.ReactNode }) {
  const [isLoading, setIsLoading] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
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

  return (
    <div className="relative w-full min-h-screen">
      {/* Loading Screen Overlay - pointer-events-none as soon as fading */}
      {mounted && (
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

      {/* Roaming 3D Interactive Cyber Figure */}
      {mounted && !isLoading && <RoamingCompanion3D />}

      {/* Global Futuristic Command Palette (Ctrl+K / Cmd+K) */}
      {mounted && <CommandPalette />}

      {/* Main interactive page content */}
      <div className="relative z-10 w-full pointer-events-auto">
        {children}
      </div>
    </div>
  );
}
