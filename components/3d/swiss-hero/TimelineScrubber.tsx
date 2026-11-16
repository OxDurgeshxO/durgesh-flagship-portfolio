'use client'

import React from 'react'
import type { StudioTheme } from './types'

interface TimelineScrubberProps {
  progress: number // 0 to 1
  onScrubChange: (val: number) => void
  studioTheme: StudioTheme
}

export const TimelineScrubber: React.FC<TimelineScrubberProps> = ({
  progress,
  onScrubChange,
  studioTheme,
}) => {
  const isCream = studioTheme === 'cream'
  const textColor = isCream ? 'text-[#111215]' : 'text-[#EDEDED]'
  const subtextColor = isCream ? 'text-[#111215]/60' : 'text-[#EDEDED]/60'
  const trackBg = isCream ? 'bg-black/10' : 'bg-white/15'
  const fillBg = isCream ? 'bg-[#111215]' : 'bg-white'
  const containerBg = isCream
    ? 'bg-white/90 border-black/15 shadow-xl shadow-black/5'
    : 'bg-[#14161D]/90 border-white/20 shadow-2xl shadow-black/40'

  const pct = Math.round(progress * 100)

  return (
    <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30 pointer-events-auto w-[90%] max-w-sm sm:max-w-md">
      <div
        className={`px-4 py-2 rounded-xl border backdrop-blur-xl ${containerBg} transition-all`}
      >
        {/* Header row */}
        <div className="flex items-center justify-between font-mono text-[9px] sm:text-[10px] tracking-widest uppercase mb-1.5 select-none">
          <div className="flex items-center gap-1.5">
            <span className={`font-bold ${textColor}`}>CHOREOGRAPHY</span>
            <span className={subtextColor}>{'//'}</span>
            <span className="font-semibold text-amber-500">
              {progress < 0.1 ? 'HOLD' : progress > 0.85 ? 'ZERO-G' : 'EXPLODING'}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => onScrubChange(0)}
              className={`hover:opacity-100 transition-opacity ${
                progress === 0 ? 'opacity-100 font-bold' : 'opacity-50'
              } ${textColor}`}
            >
              [ASSEMBLE]
            </button>
            <span className={subtextColor}>|</span>
            <button
              type="button"
              onClick={() => onScrubChange(1)}
              className={`hover:opacity-100 transition-opacity ${
                progress === 1 ? 'opacity-100 font-bold' : 'opacity-50'
              } ${textColor}`}
            >
              [EXPLODE]
            </button>
            <span className={`ml-1 font-bold ${textColor}`}>{pct}%</span>
          </div>
        </div>

        {/* Scrubber slider track */}
        <div className="relative flex items-center h-3.5">
          <input
            type="range"
            min={0}
            max={1}
            step={0.005}
            value={progress}
            onChange={(e) => onScrubChange(parseFloat(e.target.value))}
            aria-label="Exploded view scrubber"
            className="w-full h-1 appearance-none cursor-pointer rounded-full bg-transparent z-10 accent-amber-500 focus:outline-none focus-visible:ring-1 focus-visible:ring-amber-500"
          />

          {/* Custom Visual Track */}
          <div
            className={`absolute inset-x-0 h-1 rounded-full overflow-hidden pointer-events-none ${trackBg}`}
          >
            <div
              className={`h-full transition-all duration-75 ${fillBg}`}
              style={{ width: `${progress * 100}%` }}
            />
          </div>
        </div>

        {/* Milestone ticks */}
        <div
          className={`flex justify-between items-center font-mono text-[7.5px] sm:text-[8.5px] tracking-wider uppercase select-none ${subtextColor} mt-1`}
        >
          <span>{'00 // ASSEMBLED'}</span>
          <span>{'50 // TURNTABLE'}</span>
          <span>{'100 // 6-AXIS CAD'}</span>
        </div>
      </div>
    </div>
  )
}
