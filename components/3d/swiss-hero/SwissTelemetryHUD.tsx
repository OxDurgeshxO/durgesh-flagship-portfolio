'use client'

import React, { useEffect, useState, useRef } from 'react'
import { HERO_CONSTANTS } from './constants'
import type { StudioTheme } from './types'

interface SwissTelemetryHUDProps {
  explodeProgress: number
  studioTheme: StudioTheme
  isXRay: boolean
}

export const SwissTelemetryHUD: React.FC<SwissTelemetryHUDProps> = ({
  explodeProgress,
  studioTheme,
  isXRay,
}) => {
  const [frame, setFrame] = useState(1280)
  const [fps, setFps] = useState(60)
  const [cursor, setCursor] = useState({ x: 0, y: 0, vel: 0 })
  const lastPos = useRef({ x: 0, y: 0, time: Date.now() })
  const frameCount = useRef(0)
  const lastFpsTime = useRef(Date.now())

  useEffect(() => {
    let animId: number

    const handleMouseMove = (e: MouseEvent) => {
      const now = Date.now()
      const dt = Math.max(1, now - lastPos.current.time)
      const nx = (e.clientX / window.innerWidth) * 2 - 1
      const ny = -(e.clientY / window.innerHeight) * 2 + 1

      const dx = nx - lastPos.current.x
      const dy = ny - lastPos.current.y
      const dist = Math.sqrt(dx * dx + dy * dy)
      const vel = Math.min(9.99, (dist / dt) * 100)

      lastPos.current = { x: nx, y: ny, time: now }
      setCursor({
        x: parseFloat(nx.toFixed(2)),
        y: parseFloat(ny.toFixed(2)),
        vel: parseFloat(vel.toFixed(3)),
      })
    }

    window.addEventListener('mousemove', handleMouseMove, { passive: true })

    const updateLoop = () => {
      frameCount.current += 1
      const now = Date.now()
      if (now - lastFpsTime.current >= 500) {
        const measuredFps = Math.round(
          (frameCount.current * 1000) / (now - lastFpsTime.current)
        )
        setFps(Math.min(60, Math.max(30, measuredFps)))
        frameCount.current = 0
        lastFpsTime.current = now
      }
      setFrame((prev) => (prev + 1) % 999999)
      animId = requestAnimationFrame(updateLoop)
    }

    animId = requestAnimationFrame(updateLoop)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      cancelAnimationFrame(animId)
    }
  }, [])

  const isCream = studioTheme === 'cream'
  const textClass = isCream ? 'text-[#121316]' : 'text-[#EDEDED]'
  const subtextClass = isCream ? 'text-[#121316]/60' : 'text-[#EDEDED]/60'
  const borderClass = isCream ? 'border-[#121316]/20' : 'border-[#EDEDED]/20'
  const badgeBg = isCream ? 'bg-[#121316]/5' : 'bg-white/5'

  // Computed state label
  const stateLabel =
    explodeProgress > 0.1
      ? HERO_CONSTANTS.STATUS_EXPLODED
      : HERO_CONSTANTS.STATUS_HOLD

  // Dynamic camera approximation
  const camZ = (6.0 + explodeProgress * 4.2).toFixed(2)
  const turntableAngle = (explodeProgress * 360).toFixed(0)

  return (
    <div
      className="pointer-events-none absolute inset-0 z-20 overflow-hidden font-mono text-[10px] sm:text-[11px] tracking-wider select-none"
      aria-hidden="true"
    >
      {/* Corner Registration Crosshairs */}
      <div className={`absolute top-4 left-4 ${subtextClass}`}>+</div>
      <div className={`absolute top-4 right-4 ${subtextClass}`}>+</div>
      <div className={`absolute bottom-4 left-4 ${subtextClass}`}>+</div>
      <div className={`absolute bottom-4 right-4 ${subtextClass}`}>+</div>

      {/* TOP LEFT: State, Tagline & Architecture Code */}
      <div className="absolute top-6 left-6 max-w-xs space-y-1">
        <div className="flex items-center gap-2">
          <span
            className={`inline-block px-1.5 py-0.5 rounded border ${borderClass} ${badgeBg} ${textClass} font-semibold`}
          >
            {stateLabel}
          </span>
          {isXRay && (
            <span className="inline-block px-1.5 py-0.5 rounded border border-amber-500/40 bg-amber-500/10 text-amber-500 font-semibold animate-pulse">
              [CAD_WIREFRAME]
            </span>
          )}
        </div>
        <p className={`${subtextClass} uppercase text-[9px] sm:text-[10px]`}>
          {HERO_CONSTANTS.TAGLINE}
        </p>
        <p className={`${subtextClass} text-[9px]`}>{HERO_CONSTANTS.BUILD}</p>
      </div>

      {/* TOP RIGHT: Camera Coordinates & Optics Telemetry */}
      <div className="absolute top-6 right-6 text-right space-y-1">
        <div className="flex items-center justify-end gap-2">
          <span className={subtextClass}>OPTICS:</span>
          <span className={`${textClass} font-semibold`}>50mm F/1.8 PBR</span>
        </div>
        <div className="flex items-center justify-end gap-2">
          <span className={subtextClass}>CAM_VEC:</span>
          <span className={`${textClass}`}>
            [0.0, 0.4, {camZ}]
          </span>
        </div>
        <div className="flex items-center justify-end gap-2">
          <span className={subtextClass}>AZIMUTH:</span>
          <span className={`${textClass}`}>{turntableAngle}° ROT</span>
        </div>
      </div>

      {/* BOTTOM LEFT: Frame Counter & Live FPS */}
      <div className="absolute bottom-6 left-6 space-y-1">
        <div className="flex items-center gap-3">
          <span className={`${textClass} font-bold`}>
            FPS {fps.toString().padStart(2, '0')}
          </span>
          <span className={subtextClass}>|</span>
          <span className={subtextClass}>
            FRM #{frame.toString().padStart(6, '0')}
          </span>
        </div>
        <div className={`flex items-center gap-2 ${subtextClass} text-[9px]`}>
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block" />
          <span>{'PCF_SOFT_SHADOWS // PMREM_ACTIVE'}</span>
        </div>
      </div>

      {/* BOTTOM RIGHT: Cursor Dynamics & Assembly Matrix */}
      <div className="absolute bottom-6 right-6 text-right space-y-1">
        <div className="flex items-center justify-end gap-2">
          <span className={subtextClass}>CRS:</span>
          <span className={textClass}>
            X:{cursor.x >= 0 ? `+${cursor.x.toFixed(2)}` : cursor.x.toFixed(2)}{' '}
            Y:{cursor.y >= 0 ? `+${cursor.y.toFixed(2)}` : cursor.y.toFixed(2)}
          </span>
          <span className={subtextClass}>V:{cursor.vel.toFixed(2)}</span>
        </div>
        <div className={`flex items-center justify-end gap-2 ${subtextClass} text-[9px]`}>
          <span>ASSEMBLIES: 6/6 COUPLED</span>
          <span className="w-1.5 h-1.5 rounded-sm bg-neutral-400 inline-block" />
        </div>
      </div>
    </div>
  )
}
