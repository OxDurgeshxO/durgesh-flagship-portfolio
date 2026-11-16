"use client";

import React from "react";

export function Background() {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-transparent transition-colors duration-500"
    >
      {/* Subtle radial vignette that does not obscure the 3D studio cyclorama */}
      <div className="absolute inset-0 bg-transparent transition-colors duration-500" />
    </div>
  );
}
