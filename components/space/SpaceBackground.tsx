"use client";

import React, { useEffect } from "react";

const READY_EVENT = "portfolio-ready";
const READY_TIMEOUT_MS = 4000;

export interface SpaceBackgroundProps {
  active?: boolean;
  className?: string;
}

const EARTH_VIDEO = "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260827_202422_3ffb4889-c520-432d-8458-038009eb40df.mp4";
const EARTH_STILL = "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260827_202133_508c64b8-a31e-4290-bdfc-1187df70e0a6.png";

function armEntranceGate() {
  if (typeof document === "undefined") return () => {};
  const root = document.documentElement;
  let done = false;
  let timer = 0;

  const release = () => {
    if (done) return;
    done = true;
    window.clearTimeout(timer);
    root.dataset.roninReady = "true";
    root.dataset.spaceReady = "true";
  };

  window.addEventListener(READY_EVENT, release, { once: true });

  if (
    root.dataset.roninReady === "true" ||
    root.dataset.spaceReady === "true" ||
    performance.now() > READY_TIMEOUT_MS
  ) {
    release();
  } else {
    timer = window.setTimeout(release, READY_TIMEOUT_MS);
  }

  return () => {
    window.clearTimeout(timer);
    window.removeEventListener(READY_EVENT, release);
  };
}

export default function SpaceBackground({
  active = true,
  className = "",
}: SpaceBackgroundProps) {
  useEffect(() => {
    return armEntranceGate();
  }, []);

  if (!active) {
    return null;
  }

  return (
    <div className={`space-bg-root ${className}`.trim()}>
      {/* Top transition mask blending from Hero into Deep Space */}
      <div className="space-transition-mask" />

      <div
        className="space-bg-sky"
        style={{ backgroundImage: `url('${EARTH_STILL}')` }}
      >
        <video
          className="space-bg-video is-active"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          src={EARTH_VIDEO}
          poster={EARTH_STILL}
          aria-hidden="true"
        />
      </div>

      <div className="space-stars" />
      <div className="space-bg-overlay" />
    </div>
  );
}
