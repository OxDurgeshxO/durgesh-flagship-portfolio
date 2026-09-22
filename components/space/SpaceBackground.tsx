"use client";

import React, { useEffect, useState } from "react";

const READY_EVENT = "portfolio-ready";
const READY_TIMEOUT_MS = 4000;

export interface SpaceBackgroundProps {
  active?: boolean;
  className?: string;
}

type PlanetKey = "earth" | "venus" | "mars";

interface PlanetData {
  name: string;
  icon: string;
  video: string;
  still: string;
}

const PLANETS: Record<PlanetKey, PlanetData> = {
  earth: {
    name: "Earth",
    icon: "🌍",
    video:
      "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260827_202422_3ffb4889-c520-432d-8458-038009eb40df.mp4",
    still:
      "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260827_202133_508c64b8-a31e-4290-bdfc-1187df70e0a6.png",
  },
  venus: {
    name: "Venus",
    icon: "🪐",
    video:
      "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260827_202422_b211cd74-013b-4dd3-bfd0-64491d8696fa.mp4",
    still:
      "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260827_202133_cf55d1d8-7b59-4a64-80da-d72052ae974e.png",
  },
  mars: {
    name: "Mars",
    icon: "🔴",
    video:
      "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260827_202422_51eae59a-2459-4c84-907c-cc5edfe5fea7.mp4",
    still:
      "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260827_202133_0ba6de7c-285d-43dc-b7ab-8c54c73707cb.png",
  },
};

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
  const [selectedPlanet, setSelectedPlanet] = useState<PlanetKey>("earth");

  useEffect(() => {
    return armEntranceGate();
  }, []);

  if (!active) {
    return null;
  }

  return (
    <div className={`space-bg-root ${className}`.trim()} aria-hidden="true">
      <div
        className="space-bg-sky"
        style={{ backgroundImage: `url('${PLANETS[selectedPlanet].still}')` }}
      >
        {(Object.keys(PLANETS) as PlanetKey[]).map((p) => (
          <video
            key={p}
            className={`space-bg-video ${selectedPlanet === p ? "is-active" : ""}`}
            autoPlay
            muted
            loop
            playsInline
            preload={p === "earth" ? "auto" : "none"}
            src={PLANETS[p].video}
            poster={PLANETS[p].still}
            aria-hidden="true"
          />
        ))}
      </div>

      <div className="space-stars" />
      <div className="space-bg-overlay" />

      <aside
        className="space-dock"
        role="region"
        aria-label="Celestial Planetary Background Control"
      >
        {(Object.keys(PLANETS) as PlanetKey[]).map((p) => (
          <button
            key={p}
            type="button"
            className={`space-dock-btn ${selectedPlanet === p ? "is-active" : ""}`}
            onClick={() => setSelectedPlanet(p)}
            aria-pressed={selectedPlanet === p}
          >
            <span>{PLANETS[p].icon}</span>
            <span>{PLANETS[p].name}</span>
          </button>
        ))}
        <a
          href="/spaceedu.html"
          className="space-dock-link"
          target="_blank"
          rel="noopener noreferrer"
          title="Open Full SpaceEdu Interactive Hero Page"
        >
          Full SpaceEdu &rarr;
        </a>
      </aside>
    </div>
  );
}
