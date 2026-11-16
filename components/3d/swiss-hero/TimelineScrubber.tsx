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
  const textColor = isCream ? 'text-[#121316]' : 'text-[#EDEDED]'
  const subtextColor = isCream ? 'text-[#121316]/60' : 'text-[#EDEDED]/60'
  const trackBg = isCream ? 'bg-[#121316]/15' : 'bg-white/15'
  const fillBg = isCream ? 'bg-[#121316]' : 'bg-white'
  const containerBg = isCream
    ? 'bg-[#F4F0E8]/85 border-[#121316]/15'
    : 'bg-[#0D0E11]/85 border-white/15'

  const pct = Math.round(progress * 100)

  return (
    <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30 pointer-events-auto w-[90%] max-w-md">
      <div
        className={`px-4 py-2.5 rounded-xl border backdrop-blur-md shadow-lg ${containerBg} transition-colors`}
      >
        {/* Header row */}
        <div className="flex items-center justify-between font-mono text-[9px] sm:text-[10px] tracking-widest uppercase mb-1.5 select-none">
          <div className="flex items-center gap-2">
            <span className={`font-semibold ${textColor}`}>TIMELINE CHOREOGRAPHY</span>
            <span className={subtextColor}>{'//'}</span>
            <span className={subtextColor}>
              {progress < 0.1 ? 'HOLD' : progress > 0.85 ? 'ZERO-G' : 'EXPLODING'}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => onScrubChange(0)}
              className={`hover:underline transition-opacity ${
                progress === 0 ? 'opacity-100 font-bold' : 'opacity-60'
              } ${textColor}`}
            >
              [RESET]
            </button>
            <span className={subtextColor}>|</span>
            <button
              type="button"
              onClick={() => onScrubChange(1)}
              className={`hover:underline transition-opacity ${
                progress === 1 ? 'opacity-100 font-bold' : 'opacity-60'
              } ${textColor}`}
            >
              [EXPLODE]
            </button>
            <span className={`ml-1 font-bold ${textColor}`}>{pct}%</span>
          </div>
        </div>

        {/* Scrubber slider track */}
        <div className="relative flex items-center h-4">
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
          className={`flex justify-between items-center font-mono text-[8px] tracking-wider uppercase select-none ${subtextColor} mt-1`}
        >
          <span>{'00 // ASSEMBLED'}</span>
          <span>{'50 // TURNTABLE'}</span>
          <span>{'100 // 6-AXIS CAD'}</span>
        </div>
      </div>
    </div>
  )
}
