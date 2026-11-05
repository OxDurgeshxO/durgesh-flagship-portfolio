"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowLeft, ExternalLink, Sparkles } from "lucide-react";

export default function SpaceEduPage() {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <main
      id="main-content"
      className="flex flex-col h-screen w-screen overflow-hidden bg-[#04101f] text-white selection:bg-cyan-500/30"
    >
      <title>SpaceEdu 3D | Interactive Planetary Simulation — Durgesh Dutt Sinha</title>
      <meta
        name="description"
        content="Interactive 3D celestial physics and planetary education simulation built with Three.js and WebGL."
      />

      {/* SpaceEdu Header Bar */}
      <header className="h-14 border-b border-white/10 bg-[#04101f]/95 backdrop-blur-md px-4 sm:px-6 flex items-center justify-between z-20 shrink-0">
        <h1 className="sr-only">SpaceEdu 3D Planetary Simulation</h1>
        <div className="flex items-center gap-3">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white text-xs sm:text-sm font-medium transition-colors border border-white/15 focus:outline-none focus:ring-2 focus:ring-cyan-400"
            aria-label="Return to portfolio homepage"
          >
            <ArrowLeft className="size-4" />
            <span>Portfolio</span>
          </Link>
          <div className="h-4 w-px bg-white/20 hidden sm:block" />
          <div className="flex items-center gap-2">
            <span className="font-semibold text-xs sm:text-sm tracking-wide text-white flex items-center gap-1.5">
              <Sparkles className="size-4 text-cyan-400" />
              <span>SpaceEdu 3D</span>
            </span>
            <span className="hidden md:inline-block px-2 py-0.5 rounded-full text-[10px] font-mono bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
              Interactive Solar System
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <a
            href="/spaceedu.html"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-200 text-xs sm:text-sm font-medium transition-colors border border-cyan-500/40 focus:outline-none focus:ring-2 focus:ring-cyan-400"
            title="Open SpaceEdu simulation in standalone window"
          >
            <span>Open Standalone</span>
            <ExternalLink className="size-3.5" />
          </a>
        </div>
      </header>

      {/* Responsive Full-Bleed Embedded Simulation */}
      <div className="relative flex-1 w-full h-full overflow-hidden bg-[#04101f]">
        {isLoading && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#04101f] z-10 transition-opacity duration-300">
            <div className="size-10 rounded-full border-2 border-cyan-400/30 border-t-cyan-400 animate-spin mb-3" />
            <p className="text-xs font-mono text-cyan-200 tracking-wider">
              Initializing SpaceEdu 3D Simulation...
            </p>
          </div>
        )}
        <iframe
          src="/spaceedu.html"
          title="SpaceEdu 3D Planetary Simulation"
          className="w-full h-full border-0 block"
          allow="fullscreen; accelerometer; gyroscope"
          onLoad={() => setIsLoading(false)}
        />
        {/* Accessible fallback for non-iframe or text-only user agents */}
        <div className="sr-only">
          <p className="mb-4">Your browser does not support inline frames.</p>
          <a
            href="/spaceedu.html"
            className="text-cyan-400 underline font-medium hover:text-cyan-300"
          >
            Click here to view SpaceEdu directly
          </a>
        </div>
      </div>
    </main>
  );
}
