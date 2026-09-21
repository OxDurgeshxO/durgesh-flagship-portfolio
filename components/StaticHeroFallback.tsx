"use client";

import React from "react";

export function StaticHeroFallback() {
  return (
    <div
      className="absolute inset-0 w-full h-full overflow-hidden flex items-center justify-center pointer-events-none select-none"
      aria-hidden="true"
    >
      {/* Deep Space Background Mesh */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_40%,rgba(168,85,247,0.12),rgba(15,23,42,0))]" />

      {/* Cybernetic Neural Core Static Illustration */}
      <div className="relative w-[340px] h-[340px] sm:w-[480px] sm:h-[480px] flex items-center justify-center opacity-85">
        {/* Outer Concentric Pulse Rings */}
        <div className="absolute inset-0 rounded-full border border-purple-500/20 animate-[spin_40s_linear_infinite]" />
        <div className="absolute inset-6 rounded-full border border-dashed border-rose-500/25 animate-[spin_28s_linear_infinite_reverse]" />
        <div className="absolute inset-16 rounded-full border border-purple-400/20" />

        {/* Central Core Ambient Glow */}
        <div className="absolute w-36 h-36 rounded-full bg-gradient-to-tr from-purple-600/30 to-rose-500/30 blur-2xl animate-pulse" />

        {/* Geometric Hexagonal Lattice SVG */}
        <svg
          className="w-full h-full text-purple-400/30"
          viewBox="0 0 400 400"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Constellation Nodes and Synaptic Vectors */}
          <circle cx="200" cy="200" r="4" fill="#a855f7" className="animate-ping" />
          <circle cx="200" cy="200" r="7" fill="#f43f5e" fillOpacity="0.7" />
          
          <line x1="200" y1="200" x2="140" y2="120" stroke="#a855f7" strokeWidth="1" strokeDasharray="3 3" />
          <line x1="200" y1="200" x2="260" y2="120" stroke="#f43f5e" strokeWidth="1" strokeDasharray="3 3" />
          <line x1="200" y1="200" x2="130" y2="270" stroke="#a855f7" strokeWidth="1" strokeDasharray="3 3" />
          <line x1="200" y1="200" x2="270" y2="270" stroke="#f43f5e" strokeWidth="1" strokeDasharray="3 3" />
          <line x1="200" y1="200" x2="70" y2="200" stroke="#a855f7" strokeWidth="1" strokeDasharray="3 3" />
          <line x1="200" y1="200" x2="330" y2="200" stroke="#f43f5e" strokeWidth="1" strokeDasharray="3 3" />

          <circle cx="140" cy="120" r="4" fill="#c084fc" />
          <circle cx="260" cy="120" r="4" fill="#fb7185" />
          <circle cx="130" cy="270" r="4" fill="#c084fc" />
          <circle cx="270" cy="270" r="4" fill="#fb7185" />
          <circle cx="70" cy="200" r="3.5" fill="#a855f7" />
          <circle cx="330" cy="200" r="3.5" fill="#f43f5e" />

          {/* Hexagon Frame */}
          <polygon
            points="200,90 295,145 295,255 200,310 105,255 105,145"
            stroke="url(#core-poly-grad)"
            strokeWidth="1.2"
            strokeOpacity="0.4"
          />

          <defs>
            <linearGradient id="core-poly-grad" x1="105" y1="90" x2="295" y2="310" gradientUnits="userSpaceOnUse">
              <stop stopColor="#a855f7" />
              <stop offset="1" stopColor="#f43f5e" />
            </linearGradient>
          </defs>
        </svg>
      </div>
    </div>
  );
}

export default StaticHeroFallback;
