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

  const pillBg = isCream
    ? 'bg-white/90 border-black/15 text-[#111215] shadow-lg shadow-black/5'
    : 'bg-[#14161D]/90 border-white/20 text-[#EDEDED] shadow-xl shadow-black/40'

  const activeSegmentBg = isCream
    ? 'bg-[#111215] text-[#F4F0E8] font-bold shadow-sm'
    : 'bg-white text-[#111215] font-bold shadow-sm'

  const inactiveSegmentText = isCream
    ? 'text-[#111215]/65 hover:text-[#111215] hover:bg-black/5'
    : 'text-[#EDEDED]/65 hover:text-[#EDEDED] hover:bg-white/10'

  return (
    <div className="absolute top-20 left-1/2 -translate-x-1/2 z-30 pointer-events-auto">
      <div
        className={`flex items-center gap-1 p-1 rounded-full border backdrop-blur-xl transition-all ${pillBg}`}
        role="toolbar"
        aria-label="Studio lighting and inspection controls"
      >
        {/* Warm Cream Studio */}
        <button
          type="button"
          onClick={() => onThemeChange('cream')}
          className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full font-mono text-[10px] tracking-wider uppercase transition-all ${
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
          className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full font-mono text-[10px] tracking-wider uppercase transition-all ${
            studioTheme === 'darkroom' ? activeSegmentBg : inactiveSegmentText
          }`}
          aria-pressed={studioTheme === 'darkroom'}
        >
          <span className="w-2 h-2 rounded-full bg-[#0D0E11] border border-white/30" />
          <span>{'DARKROOM // OBSIDIAN'}</span>
        </button>

        <span
          className={`w-[1px] h-3.5 mx-0.5 ${
            isCream ? 'bg-black/15' : 'bg-white/20'
          }`}
        />

        {/* CAD Wireframe / X-Ray Toggle */}
        <button
          type="button"
          onClick={() => onXRayToggle(!isXRay)}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full font-mono text-[10px] tracking-wider uppercase transition-all ${
            isXRay
              ? 'bg-amber-500 text-black font-bold shadow-sm'
              : inactiveSegmentText
          }`}
          aria-pressed={isXRay}
        >
          <span
            className={`w-1.5 h-1.5 rounded-sm ${
              isXRay ? 'bg-black' : 'bg-current opacity-50'
            }`}
          />
          <span>[X-RAY]</span>
        </button>
      </div>
    </div>
  )
}
