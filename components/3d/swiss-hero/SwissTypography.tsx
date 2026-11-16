'use client'

import React from 'react'
import { HERO_CONSTANTS } from './constants'
import type { StudioTheme } from './types'

interface SwissTypographyProps {
  explodeProgress: number // 0 (assembled) -> 1 (fully exploded)
  studioTheme: StudioTheme
}

function cubicBezierEasing(t: number): number {
  const clamped = Math.max(0, Math.min(1, t))
  return clamped < 0.5
    ? 4 * clamped * clamped * clamped
    : 1 - Math.pow(-2 * clamped + 2, 3) / 2
}

export const SwissTypography: React.FC<SwissTypographyProps> = ({
  explodeProgress,
  studioTheme,
}) => {
  const eased = cubicBezierEasing(explodeProgress)
  const leftTranslateX = -eased * 160
  const rightTranslateX = eased * 160
  const opacity = Math.max(0, 1 - eased * 1.3)

  const isCream = studioTheme === 'cream'
  const textColor = isCream ? 'text-[#121316]' : 'text-[#EDEDED]'
  const subtextColor = isCream ? 'text-[#121316]/50' : 'text-[#EDEDED]/50'

  return (
    <div
      className="pointer-events-none absolute inset-0 z-10 overflow-hidden"
      aria-hidden="true"
    >
      {/* Left Flanking Vertical Typography: DURGESH */}
      <div
        className="absolute left-3 sm:left-6 md:left-8 top-1/2 -translate-y-1/2 flex items-center will-change-transform select-none"
        style={{
          transform: `translate3d(${leftTranslateX}%, -50%, 0)`,
          opacity,
          transition: 'transform 0.1s linear, opacity 0.1s linear',
        }}
      >
        <div className="flex flex-col items-center">
          <div className="flex items-center gap-2 mb-4 font-mono text-[9px] tracking-widest uppercase opacity-60">
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
            <span className={subtextColor}>{'ID // 01'}</span>
          </div>
          <div
            className={`font-black text-2xl sm:text-4xl md:text-5xl lg:text-6xl tracking-[0.28em] uppercase font-display ${textColor} opacity-85`}
            style={{
              writingMode: 'vertical-rl',
              transform: 'rotate(180deg)',
              textRendering: 'geometricPrecision',
            }}
          >
            {HERO_CONSTANTS.LEFT_TITLE}
          </div>
        </div>
      </div>

      {/* Right Flanking Vertical Typography: PORTFOLIO */}
      <div
        className="absolute right-3 sm:right-6 md:right-8 top-1/2 -translate-y-1/2 flex items-center will-change-transform select-none"
        style={{
          transform: `translate3d(${rightTranslateX}%, -50%, 0)`,
          opacity,
          transition: 'transform 0.1s linear, opacity 0.1s linear',
        }}
      >
        <div className="flex flex-col items-center">
          <div className="flex items-center gap-2 mb-4 font-mono text-[9px] tracking-widest uppercase opacity-60">
            <span className={subtextColor}>{'EDITION // 2026'}</span>
            <span className="inline-block w-1.5 h-1.5 rounded-sm bg-neutral-400" />
          </div>
          <div
            className={`font-black text-2xl sm:text-4xl md:text-5xl lg:text-6xl tracking-[0.28em] uppercase font-display ${textColor} opacity-85`}
            style={{
              writingMode: 'vertical-rl',
              textRendering: 'geometricPrecision',
            }}
          >
            {HERO_CONSTANTS.RIGHT_TITLE}
          </div>
        </div>
      </div>
    </div>
  )
}
