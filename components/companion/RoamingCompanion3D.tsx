"use client"

import React, { useState, useEffect, useRef, useCallback, Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import CyberBotModel from './CyberBotModel'
import SpeechBubble from './SpeechBubble'

const CYBERBOT_VOICELINES = [
  "Greetings human! 🤖 I'm Durgesh's 3D AI companion. Welcome to the portfolio!",
  "🚀 Check out ROLEFIT2 — an enterprise AI career intelligence platform with 16 roles!",
  "🏋️ The AI Fitness Platform runs real-time MediaPipe pose detection under 50ms!",
  "📊 MarketMatch-AI uses K-Means & DBSCAN clustering for retail analytics.",
  "🎓 Durgesh is pursuing MCA in AIML at Sri Balaji University, Pune (2025–2027)!",
  "☁️ Certified AWS Machine Learning Foundations & UNLOX® AI Fellow.",
  "⚡ 360° acrobatic ion spin! Click me again for another stunt!",
  "💡 Tip: You can drag me anywhere, or click below to switch to Roam mode!",
]

type MotionMode = 'dock' | 'roam' | 'follow'

export default function RoamingCompanion3D() {
  const [mounted, setMounted] = useState(false)
  const [isHovered, setIsHovered] = useState(false)
  const [isSpinning, setIsSpinning] = useState(false)
  const [spinProgress, setSpinProgress] = useState(0)
  const [mood, setMood] = useState<'normal' | 'happy' | 'stunt'>('normal')
  const [messageIndex, setMessageIndex] = useState(0)
  const [bubbleVisible, setBubbleVisible] = useState(true)
  const [mode, setMode] = useState<MotionMode>('dock')
  const [isDragging, setIsDragging] = useState(false)
  const [bubbleAlign, setBubbleAlign] = useState<'left' | 'right' | 'center'>('left')

  // Position in viewport pixels
  const posRef = useRef({ x: 0, y: 0 })
  const targetRef = useRef({ x: 0, y: 0 })
  const mouseScreenRef = useRef({ x: 0, y: 0 })
  const containerRef = useRef<HTMLDivElement>(null)
  const animFrameRef = useRef<number | null>(null)
  const dragOffsetRef = useRef({ x: 0, y: 0 })

  // Audio synthesis helper for futuristic chimes
  const playCyberChirp = useCallback((freq = 520, freq2 = 880) => {
    try {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext
      if (!AudioCtx) return
      const ctx = new AudioCtx()
      const osc = ctx.createOscillator()
      const gain = ctx.createGain()

      osc.type = 'sine'
      osc.frequency.setValueAtTime(freq, ctx.currentTime)
      osc.frequency.exponentialRampToValueAtTime(freq2, ctx.currentTime + 0.12)

      gain.gain.setValueAtTime(0.08, ctx.currentTime)
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.22)

      osc.connect(gain)
      gain.connect(ctx.destination)

      osc.start()
      osc.stop(ctx.currentTime + 0.22)
    } catch {
      // Audio playback silently catches if blocked by browser autoplay policy
    }
  }, [])

  useEffect(() => {
    setMounted(true)
    if (typeof window !== 'undefined') {
      // Start docked in bottom-right corner with ample safety margin
      const startX = Math.max(80, window.innerWidth - 220)
      const startY = Math.max(80, window.innerHeight - 260)
      posRef.current = { x: startX, y: startY }
      targetRef.current = { x: startX, y: startY }
      setBubbleAlign('left')
    }

    // Auto dismiss initial message after 6.5 seconds
    const welcomeTimer = setTimeout(() => {
      setBubbleVisible(false)
    }, 6500)
    return () => clearTimeout(welcomeTimer)
  }, [])

  // Global mouse tracking
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseScreenRef.current = { x: e.clientX, y: e.clientY }

      if (isDragging) {
        const maxX = window.innerWidth - 180
        const maxY = window.innerHeight - 250
        posRef.current = {
          x: Math.max(40, Math.min(maxX, e.clientX - dragOffsetRef.current.x)),
          y: Math.max(40, Math.min(maxY, e.clientY - dragOffsetRef.current.y)),
        }
      }
    }

    const handleMouseUp = () => {
      if (isDragging) {
        setIsDragging(false)
        playCyberChirp(440, 660)
      }
    }

    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('mouseup', handleMouseUp)
    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mouseup', handleMouseUp)
    }
  }, [isDragging, playCyberChirp])

  // Physics & Roaming Loop
  useEffect(() => {
    if (!mounted) return

    let lastWaypointTime = performance.now()
    let spinStart: number | null = null

    const updateMotion = (now: number) => {
      const width = window.innerWidth
      const height = window.innerHeight
      const safeMinX = 60
      const safeMaxX = width - 220
      const safeMinY = 80
      const safeMaxY = height - 260

      if (!isDragging) {
        if (mode === 'dock') {
          // Park gracefully at bottom right
          const targetX = Math.max(safeMinX, width - 210)
          const targetY = Math.max(safeMinY, height - 260)
          posRef.current.x += (targetX - posRef.current.x) * 0.08
          posRef.current.y += (targetY - posRef.current.y) * 0.08
        } else if (mode === 'roam' && !isHovered) {
          // Smooth waypoint navigation across screen
          if (now - lastWaypointTime > 5000) {
            targetRef.current = {
              x: safeMinX + Math.random() * (safeMaxX - safeMinX),
              y: safeMinY + Math.random() * (safeMaxY - safeMinY),
            }
            lastWaypointTime = now
          }

          const dx = targetRef.current.x - posRef.current.x
          const dy = targetRef.current.y - posRef.current.y
          posRef.current.x += dx * 0.016
          posRef.current.y += dy * 0.016
        } else if (mode === 'follow' && !isHovered) {
          // Accompany cursor with friendly offset
          const targetX = Math.max(safeMinX, Math.min(safeMaxX, mouseScreenRef.current.x + 60))
          const targetY = Math.max(safeMinY, Math.min(safeMaxY, mouseScreenRef.current.y - 120))
          posRef.current.x += (targetX - posRef.current.x) * 0.04
          posRef.current.y += (targetY - posRef.current.y) * 0.04
        }
      }

      // Dynamic adaptive alignment for speech bubble
      if (posRef.current.x > width - 360) {
        setBubbleAlign('left')
      } else if (posRef.current.x < 320) {
        setBubbleAlign('right')
      } else {
        setBubbleAlign('center')
      }

      // Handle 360° jump spin stunt
      if (isSpinning) {
        if (spinStart === null) spinStart = now
        const elapsed = (now - spinStart) / 800
        if (elapsed >= 1) {
          setIsSpinning(false)
          setSpinProgress(0)
          setMood('happy')
          spinStart = null
        } else {
          setSpinProgress(elapsed)
        }
      }

      // Direct transform update
      if (containerRef.current) {
        containerRef.current.style.transform = `translate3d(${posRef.current.x}px, ${posRef.current.y}px, 0)`
      }

      animFrameRef.current = requestAnimationFrame(updateMotion)
    }

    animFrameRef.current = requestAnimationFrame(updateMotion)
    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current)
    }
  }, [mounted, isHovered, isSpinning, mode, isDragging])

  // Handle Click Interaction
  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation()
    setIsSpinning(true)
    setMood('stunt')
    playCyberChirp(600, 1200)

    setMessageIndex((prev) => (prev + 1) % CYBERBOT_VOICELINES.length)
    setBubbleVisible(true)

    setTimeout(() => {
      setMood('happy')
    }, 950)
  }

  // Handle Hover Interaction
  const handleMouseEnter = () => {
    setIsHovered(true)
    setMood('happy')
    setBubbleVisible(true)
    playCyberChirp(700, 950)
  }

  const handleMouseLeave = () => {
    if (!isDragging) {
      setIsHovered(false)
      setMood('normal')
      setTimeout(() => {
        setBubbleVisible(false)
      }, 5000)
    }
  }

  // Handle Dragging
  const handleMouseDown = (e: React.MouseEvent) => {
    if (e.button !== 0) return
    setIsDragging(true)
    dragOffsetRef.current = {
      x: e.clientX - posRef.current.x,
      y: e.clientY - posRef.current.y,
    }
  }

  const handleBubbleAction = (action: string) => {
    if (action === 'flip') {
      setIsSpinning(true)
      playCyberChirp(650, 1300)
    } else if (action === 'projects') {
      const el = document.getElementById('projects') || document.getElementById('featured-projects')
      if (el) el.scrollIntoView({ behavior: 'smooth' })
      setBubbleVisible(false)
    }
  }

  if (!mounted) return null

  // Relative mouse for 3D look-at
  const relativeMouse = {
    x: (mouseScreenRef.current.x - posRef.current.x) / window.innerWidth,
    y: (mouseScreenRef.current.y - posRef.current.y) / window.innerHeight,
  }

  return (
    <div className="fixed inset-0 pointer-events-none z-40 overflow-hidden">
      {/* 3D CyberBot Floating Anchor */}
      <div
        ref={containerRef}
        className="absolute top-0 left-0 w-44 h-56 select-none will-change-transform"
        style={{ touchAction: 'none' }}
      >
        {/* Adaptive Speech Bubble */}
        <SpeechBubble
          message={CYBERBOT_VOICELINES[messageIndex]}
          visible={bubbleVisible}
          align={bubbleAlign}
          onAction={handleBubbleAction}
          onDismiss={() => setBubbleVisible(false)}
        />

        {/* 3D Model Canvas Container */}
        <div
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          onClick={handleClick}
          onMouseDown={handleMouseDown}
          className={`w-full h-full relative cursor-grab active:cursor-grabbing pointer-events-auto rounded-3xl transition-all duration-300 ${
            isHovered
              ? 'drop-shadow-[0_0_35px_rgba(0,240,255,0.7)] scale-105'
              : 'drop-shadow-[0_0_20px_rgba(168,85,247,0.4)]'
          }`}
          title="Click to interact! Drag to toss! 🤖"
        >
          {/* Holographic Pulse Aura on Hover */}
          {isHovered && (
            <div className="absolute inset-x-2 bottom-0 h-16 rounded-full border border-cyan-400/50 animate-ping pointer-events-none opacity-40" />
          )}

          <Canvas
            camera={{ position: [0, 0, 3.2], fov: 45 }}
            gl={{ alpha: true, antialias: true }}
            className="w-full h-full"
          >
            <Suspense fallback={null}>
              <CyberBotModel
                isHovered={isHovered}
                isSpinning={isSpinning}
                spinProgress={spinProgress}
                mousePos={relativeMouse}
                mood={mood}
              />
            </Suspense>
          </Canvas>

          {/* Mini Interactive Mode Control Pill */}
          <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 whitespace-nowrap pointer-events-auto">
            <button
              onClick={(e) => {
                e.stopPropagation()
                setMode((m) => (m === 'dock' ? 'roam' : m === 'roam' ? 'follow' : 'dock'))
                playCyberChirp(550, 750)
              }}
              className="px-2.5 py-1 rounded-full text-[10px] font-mono font-bold bg-slate-950/90 border border-cyan-500/40 text-cyan-300 hover:border-cyan-300 hover:bg-cyan-500/20 backdrop-blur-xl transition-all shadow-xl shadow-cyan-500/20 flex items-center gap-1.5"
            >
              {mode === 'dock' && (
                <>
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span>💤 Docked</span>
                </>
              )}
              {mode === 'roam' && (
                <>
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
                  <span>🟢 Roaming</span>
                </>
              )}
              {mode === 'follow' && (
                <>
                  <span className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-bounce" />
                  <span>🧲 Following</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
