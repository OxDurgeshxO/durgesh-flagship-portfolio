'use client'

import React, { useState, useEffect, useRef } from 'react'
import dynamic from 'next/dynamic'
import type { StudioTheme } from './types'
import { SwissTypography } from './SwissTypography'
import { SwissTelemetryHUD } from './SwissTelemetryHUD'
import { SwissStudioControls } from './SwissStudioControls'
import { TimelineScrubber } from './TimelineScrubber'
import { ProjectedCallouts } from './ProjectedCallouts'
import { useExplodedChoreography } from './useExplodedChoreography'

// Dynamic import of Three.js canvas to ensure strictly client-side WebGL initialization
const SwissStudioCanvas = dynamic(() => import('./SwissStudioCanvas'), {
  ssr: false,
  loading: () => (
    <div className="absolute inset-0 bg-[#F4F0E8] flex items-center justify-center font-mono text-[11px] tracking-widest text-neutral-500 uppercase select-none">
      INITIALIZING SWISS 3D STUDIO...
    </div>
  ),
})

interface SwissHeroContainerProps {
  className?: string
  initialTheme?: StudioTheme
}

export const SwissHeroContainer: React.FC<SwissHeroContainerProps> = ({
  className = '',
  initialTheme = 'cream',
}) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const [studioTheme, setStudioTheme] = useState<StudioTheme>(initialTheme)
  const [isXRay, setIsXRay] = useState(false)
  const [isMounted, setIsMounted] = useState(false)

  const { progress, onScrubChange } = useExplodedChoreography(containerRef)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  return (
    <section
      ref={containerRef}
      className={`relative w-full h-screen min-h-[700px] overflow-hidden select-none ${
        studioTheme === 'cream' ? 'bg-[#F4F0E8]' : 'bg-[#0D0E11]'
      } ${className}`}
      aria-label="Swiss Editorial 3D Kinetic Sculpture Hero"
    >
      {/* 3D WebGL Canvas Layer */}
      {isMounted && (
        <div className="absolute inset-0 z-0">
          <SwissStudioCanvas
            explodeProgress={progress}
            isXRay={isXRay}
            studioTheme={studioTheme}
          />
        </div>
      )}

      {/* Layer 1: Massive Flanking Display Typography */}
      <SwissTypography
        explodeProgress={progress}
        studioTheme={studioTheme}
      />

      {/* Layer 2: 2D Projected SVG Leader Lines & Component Spec Cards */}
      <ProjectedCallouts
        explodeProgress={progress}
        studioTheme={studioTheme}
      />

      {/* Layer 3: Corner Micro-Monospace Telemetry HUD */}
      <SwissTelemetryHUD
        explodeProgress={progress}
        studioTheme={studioTheme}
        isXRay={isXRay}
      />

      {/* Layer 4: Minimal Swiss Studio Pill Toolbar */}
      <SwissStudioControls
        studioTheme={studioTheme}
        onThemeChange={setStudioTheme}
        isXRay={isXRay}
        onXRayToggle={setIsXRay}
      />

      {/* Layer 5: Fallback Synced Timeline Scrubber */}
      <TimelineScrubber
        progress={progress}
        onScrubChange={onScrubChange}
        studioTheme={studioTheme}
      />
    </section>
  )
}

export default SwissHeroContainer
