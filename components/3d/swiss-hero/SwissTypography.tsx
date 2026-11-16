'use client'

import React from 'react'
import { HERO_CONSTANTS } from './constants'
import type { StudioTheme } from './types'

interface SwissTypographyProps {
  explodeProgress: number // 0 (assembled) -> 1 (fully exploded)
  studioTheme: StudioTheme
}

/**
 * Standard cubic-bezier(0.76, 0, 0.24, 1) approximation for inertial slide
 */
function cubicBezierEasing(t: number): number {
  const clamped = Math.max(0, Math.min(1, t))
  // Hermite / cubic approximation of (0.76, 0, 0.24, 1)
  return clamped < 0.5
    ? 4 * clamped * clamped * clamped
    : 1 - Math.pow(-2 * clamped + 2, 3) / 2
}

export const SwissTypography: React.FC<SwissTypographyProps> = ({
  explodeProgress,
  studioTheme,
}) => {
  const eased = cubicBezierEasing(explodeProgress)
  // Distance to slide outward off-screen (in percent or vw)
  const leftTranslateX = -eased * 120
  const rightTranslateX = eased * 120
  const opacity = Math.max(0, 1 - eased * 1.25)

  const isCream = studioTheme === 'cream'
  const textColor = isCream ? 'text-[#111215]' : 'text-[#F4F0E8]'
  const subtextColor = isCream ? 'text-[#111215]/60' : 'text-[#F4F0E8]/60'

  return (
    <div
      className="pointer-events-none absolute inset-0 z-10 overflow-hidden"
      aria-hidden="true"
    >
      {/* Left Flanking Typography: DURGESH */}
      <div
        className="absolute left-2 sm:left-6 md:left-10 top-1/2 -translate-y-1/2 flex items-center will-change-transform"
        style={{
          transform: `translate3d(${leftTranslateX}%, -50%, 0)`,
          opacity,
          transition: 'transform 0.1s linear, opacity 0.1s linear',
        }}
      >
        <div className="flex flex-col items-start select-none">
          <div className="flex items-center gap-2 mb-2 font-mono text-[10px] tracking-widest uppercase opacity-75">
            <span className="inline-block w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
            <span className={subtextColor}>{'SEC 01 // ID'}</span>
          </div>
          <h1
            className={`font-black text-[13vw] md:text-[11vw] lg:text-[10vw] leading-[0.82] tracking-tighter uppercase font-display ${textColor}`}
            style={{
              textRendering: 'geometricPrecision',
            }}
          >
            {HERO_CONSTANTS.LEFT_TITLE}
          </h1>
        </div>
      </div>

      {/* Right Flanking Typography: PORTFOLIO */}
      <div
        className="absolute right-2 sm:right-6 md:right-10 top-1/2 -translate-y-1/2 flex items-center will-change-transform"
        style={{
          transform: `translate3d(${rightTranslateX}%, -50%, 0)`,
          opacity,
          transition: 'transform 0.1s linear, opacity 0.1s linear',
        }}
      >
        <div className="flex flex-col items-end select-none text-right">
          <div className="flex items-center gap-2 mb-2 font-mono text-[10px] tracking-widest uppercase opacity-75">
            <span className={subtextColor}>{'ARCH // EDITION'}</span>
            <span className="inline-block w-1.5 h-1.5 rounded-sm bg-neutral-400" />
          </div>
          <h2
            className={`font-black text-[13vw] md:text-[11vw] lg:text-[10vw] leading-[0.82] tracking-tighter uppercase font-display ${textColor}`}
            style={{
              textRendering: 'geometricPrecision',
            }}
          >
            {HERO_CONSTANTS.RIGHT_TITLE}
          </h2>
        </div>
      </div>
    </div>
  )
}
