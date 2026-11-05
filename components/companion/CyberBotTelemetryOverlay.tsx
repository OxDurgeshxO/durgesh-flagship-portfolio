"use client"

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Activity, Cpu, Wifi, Battery, X } from 'lucide-react'

interface CyberBotTelemetryOverlayProps {
  visible: boolean
  onClose: () => void
}

export default function CyberBotTelemetryOverlay({
  visible,
  onClose,
}: CyberBotTelemetryOverlayProps) {
  const [fps, setFps] = useState(60)
  const [gpuInfo, setGpuInfo] = useState<string>('Standard WebGL 2.0')
  const [networkInfo, setNetworkInfo] = useState<{ rtt?: number; downlink?: number }>({})
  const [batteryLevel, setBatteryLevel] = useState<number | null>(null)

  useEffect(() => {
    if (!visible || typeof window === 'undefined') return

    // 1. Detect WebGL Renderer
    try {
      const canvas = document.createElement('canvas')
      const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl')
      if (gl) {
        const debugInfo = (gl as any).getExtension('WEBGL_debug_renderer_info')
        if (debugInfo) {
          const renderer = (gl as any).getParameter(debugInfo.UNMASKED_RENDERER_WEBGL)
          if (renderer) {
            setGpuInfo(renderer.replace(/ANGLE \(|, Direct3D.*|\)/g, '').trim())
          }
        }
      }
    } catch {}

    // 2. Network Telemetry
    try {
      const conn = (navigator as any).connection
      if (conn) {
        setNetworkInfo({
          rtt: conn.rtt,
          downlink: conn.downlink,
        })
      }
    } catch {}

    // 3. Battery Telemetry
    try {
      if ('getBattery' in navigator) {
        ;(navigator as any).getBattery().then((batt: any) => {
          setBatteryLevel(Math.round(batt.level * 100))
        }).catch(() => {})
      }
    } catch {}

    // 4. Live FPS Counter
    let frameCount = 0
    let lastTime = performance.now()
    let animId: number

    const measureFps = (now: number) => {
      frameCount++
      if (now - lastTime >= 1000) {
        setFps(Math.round((frameCount * 1000) / (now - lastTime)))
        frameCount = 0
        lastTime = now
      }
      animId = requestAnimationFrame(measureFps)
    }

    animId = requestAnimationFrame(measureFps)
    return () => cancelAnimationFrame(animId)
  }, [visible])

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, scale: 0.88, y: 14 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 10 }}
          transition={{ type: 'spring', stiffness: 450, damping: 28 }}
          className="absolute bottom-[104%] right-0 w-72 pointer-events-auto select-none z-50 mb-2 font-mono"
        >
          <div className="glass rounded-2xl p-3.5 border border-cyan-500/40 shadow-2xl shadow-cyan-500/20 backdrop-blur-2xl bg-slate-950/95 text-slate-200">
            {/* Header */}
            <div className="flex items-center justify-between pb-2 mb-2 border-b border-white/10 text-xs">
              <div className="flex items-center gap-1.5 text-cyan-400 font-bold">
                <Activity className="size-3.5 animate-pulse" />
                <span>CyberBot Telemetry HUD</span>
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  onClose()
                }}
                className="text-slate-400 hover:text-white p-1 rounded hover:bg-white/10 transition-colors"
                title="Close Telemetry"
                aria-label="Close Telemetry"
              >
                <X className="size-3.5" />
              </button>
            </div>

            {/* Metrics List */}
            <div className="space-y-2 text-[11px]">
              {/* FPS & Graphics Loop */}
              <div className="flex items-center justify-between px-2.5 py-1.5 rounded-lg bg-white/5 border border-white/5">
                <span className="text-slate-400 flex items-center gap-1.5">
                  <Activity className="size-3 text-emerald-400" />
                  Framerate:
                </span>
                <span className={`font-bold ${fps >= 50 ? 'text-emerald-400' : 'text-amber-400'}`}>
                  {fps} FPS
                </span>
              </div>

              {/* GPU Renderer */}
              <div className="flex flex-col px-2.5 py-1.5 rounded-lg bg-white/5 border border-white/5 gap-0.5">
                <span className="text-slate-400 flex items-center gap-1.5">
                  <Cpu className="size-3 text-purple-400" />
                  Active GPU:
                </span>
                <span className="text-[10px] text-slate-300 truncate" title={gpuInfo}>
                  {gpuInfo}
                </span>
              </div>

              {/* Network RTT */}
              <div className="flex items-center justify-between px-2.5 py-1.5 rounded-lg bg-white/5 border border-white/5">
                <span className="text-slate-400 flex items-center gap-1.5">
                  <Wifi className="size-3 text-cyan-400" />
                  Latency:
                </span>
                <span className="text-slate-200">
                  {networkInfo.rtt ? `${networkInfo.rtt}ms RTT` : 'Direct Edge (0ms)'}
                </span>
              </div>

              {/* Battery if available */}
              {batteryLevel !== null && (
                <div className="flex items-center justify-between px-2.5 py-1.5 rounded-lg bg-white/5 border border-white/5">
                  <span className="text-slate-400 flex items-center gap-1.5">
                    <Battery className="size-3 text-amber-400" />
                    Device Battery:
                  </span>
                  <span className="text-slate-200">{batteryLevel}%</span>
                </div>
              )}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
