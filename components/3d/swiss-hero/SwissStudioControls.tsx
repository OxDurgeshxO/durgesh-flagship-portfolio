'use client'

import React from 'react'
import type { StudioTheme } from './types'

interface SwissStudioControlsProps {
  studioTheme: StudioTheme
  onThemeChange: (theme: StudioTheme) => void
  isXRay: boolean
  onXRayToggle: (xray: boolean) => void
}

export const SwissStudioControls: React.FC<SwissStudioControlsProps> = ({
  studioTheme,
  onThemeChange,
  isXRay,
  onXRayToggle,
}) => {
  const isCream = studioTheme === 'cream'

  // Outer pill container styling
  const pillBg = isCream
    ? 'bg-[#121316]/8 border-[#121316]/15 text-[#121316]'
    : 'bg-[#181A20]/80 border-white/15 text-[#F4F0E8]'

  const activeSegmentBg = isCream
    ? 'bg-white shadow-sm text-[#111215] font-semibold'
    : 'bg-white/15 text-white font-semibold'

  const inactiveSegmentText = isCream
    ? 'text-[#111215]/60 hover:text-[#111215]'
    : 'text-[#F4F0E8]/60 hover:text-[#F4F0E8]'

  return (
    <div className="absolute top-6 left-1/2 -translate-x-1/2 z-30 pointer-events-auto">
      <div
        className={`flex items-center gap-1 p-1 rounded-full border backdrop-blur-md transition-colors ${pillBg}`}
        role="toolbar"
        aria-label="Studio lighting and inspection controls"
      >
        {/* Warm Cream Studio */}
        <button
          type="button"
          onClick={() => onThemeChange('cream')}
          className={`flex items-center gap-1.5 px-3 py-1 rounded-full font-mono text-[10px] tracking-wider uppercase transition-all ${
            studioTheme === 'cream' ? activeSegmentBg : inactiveSegmentText
          }`}
          aria-pressed={studioTheme === 'cream'}
        >
          <span className="w-2 h-2 rounded-full bg-[#E8DEC8] border border-black/20" />
          <span>{'STUDIO // CREAM'}</span>
        </button>

        {/* Obsidian Darkroom */}
        <button
          type="button"
          onClick={() => onThemeChange('darkroom')}
          className={`flex items-center gap-1.5 px-3 py-1 rounded-full font-mono text-[10px] tracking-wider uppercase transition-all ${
            studioTheme === 'darkroom' ? activeSegmentBg : inactiveSegmentText
          }`}
          aria-pressed={studioTheme === 'darkroom'}
        >
          <span className="w-2 h-2 rounded-full bg-[#0D0E11] border border-white/30" />
          <span>{'DARKROOM // OBSIDIAN'}</span>
        </button>

        <span
          className={`w-[1px] h-3 mx-0.5 ${
            isCream ? 'bg-[#121316]/15' : 'bg-white/15'
          }`}
        />

        {/* CAD Wireframe / X-Ray Toggle */}
        <button
          type="button"
          onClick={() => onXRayToggle(!isXRay)}
          className={`flex items-center gap-1.5 px-3 py-1 rounded-full font-mono text-[10px] tracking-wider uppercase transition-all ${
            isXRay
              ? 'bg-amber-500/20 text-amber-500 border border-amber-500/40 font-bold'
              : inactiveSegmentText
          }`}
          aria-pressed={isXRay}
        >
          <span
            className={`w-1.5 h-1.5 rounded-sm ${
              isXRay ? 'bg-amber-500 animate-pulse' : 'bg-current opacity-40'
            }`}
          />
          <span>[X-RAY]</span>
        </button>
      </div>
    </div>
  )
}
