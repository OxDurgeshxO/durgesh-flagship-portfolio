"use client";

import React, { useState, useEffect } from "react";

const READY_EVENT = "portfolio-ready";
const READY_TIMEOUT_MS = 4000;

export interface SpaceBackgroundProps {
  active?: boolean;
  className?: string;
}

const EARTH_VIDEO = "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260827_202422_3ffb4889-c520-432d-8458-038009eb40df.mp4";
// Optimized local WebP asset (144.7 KB, reduced by 97.3% from 5.4 MB remote CloudFront PNG)
const EARTH_STILL = "/images/earth-still.webp";

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
  const [shouldLoadVideo, setShouldLoadVideo] = useState(false);

  useEffect(() => {
    const unarm = armEntranceGate();
    if (typeof window === "undefined") return unarm;

    const isMobile = window.innerWidth < 768;
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // Respect reduced motion by keeping static poster image only
    if (prefersReducedMotion) {
      return unarm;
    }

    if (isMobile) {
      // Defer video on mobile devices to protect LCP and prevent initial payload congestion
      if ("requestIdleCallback" in window) {
        const handle = (window as any).requestIdleCallback(
          () => setShouldLoadVideo(true),
          { timeout: 3500 }
        );
        return () => {
          unarm();
          if ("cancelIdleCallback" in window) {
            (window as any).cancelIdleCallback(handle);
          }
        };
      } else {
        const timer = setTimeout(() => setShouldLoadVideo(true), 2500);
        return () => {
          unarm();
          clearTimeout(timer);
        };
      }
    } else {
      setShouldLoadVideo(true);
    }

    return unarm;
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
        {shouldLoadVideo && (
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
        )}
      </div>

      <div className="space-stars" />
      <div className="space-bg-overlay" />
    </div>
  );
}
