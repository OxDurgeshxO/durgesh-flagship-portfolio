"use client";

import React from "react";
import dynamic from "next/dynamic";

const SpaceBackground = dynamic(() => import("./SpaceBackground"), {
  ssr: false,
  loading: () => (
    <div
      className="space-cosmos-fallback absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-900/40 via-background to-background"
      aria-hidden="true"
    />
  ),
});

export default function SpaceClientWrapper() {
  return <SpaceBackground />;
}
