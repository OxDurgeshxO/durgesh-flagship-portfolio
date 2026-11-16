'use client'

import React, { useEffect, useState } from 'react'
import { ASSEMBLY_SPECS } from './constants'
import type { StudioTheme } from './types'

interface ProjectedCalloutsProps {
  explodeProgress: number // 0 -> 1
  studioTheme: StudioTheme
}

interface CalloutAnchor {
  id: string
  // 3D relative coordinates (in sculpture local space)
  x3d: number
  y3d: number
  z3d: number
  side: 'left' | 'right'
  targetYPercent: number // 0 to 100 for side card vertical position
}

const ANCHORS: CalloutAnchor[] = [
  { id: 'shells', x3d: -2.2, y3d: 0.6, z3d: 0.2, side: 'left', targetYPercent: 24 },
  { id: 'gimbal', x3d: -1.4, y3d: 1.6, z3d: -0.3, side: 'left', targetYPercent: 44 },
  { id: 'plinth', x3d: -0.6, y3d: -2.0, z3d: 0.1, side: 'left', targetYPercent: 72 },
  { id: 'aperture', x3d: 1.5, y3d: 1.4, z3d: 1.8, side: 'right', targetYPercent: 24 },
  { id: 'louvers', x3d: 1.8, y3d: 0.2, z3d: -0.5, side: 'right', targetYPercent: 44 },
  { id: 'core', x3d: 0.5, y3d: -0.8, z3d: 0.4, side: 'right', targetYPercent: 72 },
]

export const ProjectedCallouts: React.FC<ProjectedCalloutsProps> = ({
  explodeProgress,
  studioTheme,
}) => {
  const [viewport, setViewport] = useState({ width: 1200, height: 800 })

  useEffect(() => {
    const handleResize = () => {
      setViewport({ width: window.innerWidth, height: window.innerHeight })
    }
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  // Callouts only reveal once explosion has started
  const opacity = Math.max(0, Math.min(1, (explodeProgress - 0.22) / 0.35))
  if (opacity <= 0) return null

  const isCream = studioTheme === 'cream'
  const strokeColor = isCream ? 'rgba(18, 19, 22, 0.45)' : 'rgba(237, 237, 237, 0.45)'
  const dotColor = isCream ? '#121316' : '#EDEDED'
  const cardBg = isCream
    ? 'bg-[#F4F0E8]/90 border-[#121316]/15 text-[#121316]'
    : 'bg-[#0D0E11]/90 border-white/15 text-[#EDEDED]'
  const subtextColor = isCream ? 'text-[#121316]/65' : 'text-[#EDEDED]/65'
  const badgeBorder = isCream ? 'border-[#121316]/20' : 'border-white/20'

  const { width: W, height: H } = viewport
  const centerX = W / 2
  const centerY = H / 2

  // Projected 3D coordinates based on turntable angle and explosion distance
  const rotAngle = explodeProgress * Math.PI * 2
  const camDist = 6.0 + explodeProgress * 4.2
  // Perspective focal multiplier
  const focalLength = Math.min(W, H) * 0.95

  const projectedItems = ANCHORS.map((anchor) => {
    const spec = ASSEMBLY_SPECS.find((s) => s.id === anchor.id)
    if (!spec) return null

    // Rotate anchor around Y axis
    const cosA = Math.cos(rotAngle)
    const sinA = Math.sin(rotAngle)
    const rx = anchor.x3d * cosA - anchor.z3d * sinA
    const rz = anchor.x3d * sinA + anchor.z3d * cosA
    const ry = anchor.y3d

    // Scale by explode progress
    const ex = rx * (0.8 + explodeProgress * 0.5)
    const ey = ry * (0.8 + explodeProgress * 0.5)
    const ez = rz * (0.8 + explodeProgress * 0.5)

    // Perspective projection
    const zTotal = camDist - ez
    const projScale = focalLength / Math.max(1, zTotal)
    const screenX = centerX + ex * projScale
    const screenY = centerY - ey * projScale

    // Target card position along margin
    const isLeft = anchor.side === 'left'
    const cardX = isLeft ? Math.max(20, W * 0.05) : Math.min(W - 240, W * 0.76)
    const cardY = (H * anchor.targetYPercent) / 100

    // Elbow joint position
    const elbowX = isLeft ? cardX + 180 : cardX - 20
    const elbowY = cardY + 20

    return {
      spec,
      screenX,
      screenY,
      cardX,
      cardY,
      elbowX,
      elbowY,
      isLeft,
    }
  }).filter(Boolean)

  return (
    <div
      className="pointer-events-none absolute inset-0 z-20 overflow-hidden select-none transition-opacity duration-300"
      style={{ opacity }}
      aria-hidden="true"
    >
      {/* Crisp 1px SVG Leader Lines */}
      <svg className="absolute inset-0 w-full h-full" style={{ pointerEvents: 'none' }}>
        {projectedItems.map((item, idx) => {
          if (!item) return null
          const { screenX, screenY, cardX, cardY, elbowX, elbowY, isLeft } = item
          const endX = isLeft ? cardX + 175 : cardX
          const endY = cardY + 16

          return (
            <g key={`leader-${item.spec.id}-${idx}`}>
              {/* Leader Path: Screen anchor -> Elbow -> Card margin */}
              <path
                d={`M ${screenX.toFixed(1)} ${screenY.toFixed(1)} L ${elbowX.toFixed(1)} ${elbowY.toFixed(1)} L ${endX.toFixed(1)} ${endY.toFixed(1)}`}
                fill="none"
                stroke={strokeColor}
                strokeWidth="1"
                strokeDasharray="3 3"
              />
              {/* 3D Anchor terminal dot */}
              <circle
                cx={screenX}
                cy={screenY}
                r="3"
                fill={dotColor}
                stroke={strokeColor}
                strokeWidth="1"
              />
              {/* Card terminus tick */}
              <circle cx={endX} cy={endY} r="2" fill={dotColor} />
            </g>
          )
        })}
      </svg>

      {/* 2D Minimalist Technical Spec Cards */}
      {projectedItems.map((item) => {
        if (!item) return null
        const { spec, cardX, cardY } = item

        return (
          <div
            key={`card-${spec.id}`}
            className={`absolute w-52 sm:w-56 p-2.5 rounded-lg border backdrop-blur-md shadow-sm font-mono text-[9px] sm:text-[10px] leading-tight ${cardBg}`}
            style={{
              left: `${cardX}px`,
              top: `${cardY}px`,
              transition: 'left 0.15s ease-out, top 0.15s ease-out',
            }}
          >
            <div className="flex items-center justify-between border-b pb-1 mb-1.5 border-current/15">
              <span className="font-bold tracking-wider">
                {`${spec.index} // ${spec.name}`}
              </span>
              <span
                className={`px-1 py-0.2 rounded border ${badgeBorder} text-[8px] uppercase font-semibold`}
              >
                {spec.specCode}
              </span>
            </div>
            <p className="font-sans font-medium text-[11px] mb-1 opacity-90">
              {spec.material}
            </p>
            <p className={`${subtextColor} text-[8.5px] leading-normal font-sans`}>
              {spec.detail}
            </p>
          </div>
        )
      })}
    </div>
  )
}
