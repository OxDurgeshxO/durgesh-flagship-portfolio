"use client";

import React from "react";

export function Background() {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-[var(--bg-primary)] transition-colors duration-500"
    >
      {/* Linear-style Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,var(--grid-line)_1px,transparent_1px),linear-gradient(to_bottom,var(--grid-line)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_40%,#000_70%,transparent_100%)] opacity-70" />

      {/* Floating ambient glow orbs - Sunset Violet & Rose Quartz */}
      <div className="absolute -top-40 left-[15%] h-[34rem] w-[34rem] rounded-full bg-[#a855f7]/14 blur-[130px] animate-float" />
      <div
        className="absolute top-[35%] right-[8%] h-[30rem] w-[30rem] rounded-full bg-[#f43f5e]/12 blur-[130px] animate-float"
        style={{ animationDelay: "-3s" }}
      />
      <div
        className="absolute bottom-[-10%] left-[30%] h-[32rem] w-[32rem] rounded-full bg-[#ec4899]/12 blur-[140px] animate-float"
        style={{ animationDelay: "-1.5s" }}
      />

      {/* Radial vignette blending into dynamic page background */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_55%_at_50%_38%,transparent_25%,var(--bg-primary)_92%)] transition-colors duration-500" />
    </div>
  );
}
