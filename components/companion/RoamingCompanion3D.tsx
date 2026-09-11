"use client"

import React, { useState, useEffect, useRef, useCallback, Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import CyberBotModel from './CyberBotModel'
import SpeechBubble from './SpeechBubble'
import { trackEvent } from '@/lib/analytics'

function getTimeBasedGreeting(): string {
  const hour = new Date().getHours()
  if (hour >= 5 && hour < 12) return "Good morning! ☀️ I'm Durgesh's 3D AI companion. Welcome to the portfolio!"
  if (hour >= 12 && hour < 17) return "Good afternoon! ⚡ Exploring Durgesh's production AI architectures?"
  if (hour >= 17 && hour < 22) return "Good evening! 🌆 Check out the interactive 3D Neural Core & case studies!"
  return "Burning the midnight oil with AI? 🌙 Durgesh builds systems 24/7!"
}

const CYBERBOT_VOICELINES = [
  "🚀 Check out RoleRadar — an enterprise AI career intelligence platform evaluating 16 roles with multi-model scoring!",
  "🏋️ The AI Fitness Platform runs real-time MediaPipe pose detection under 50ms with live audio feedback!",
  "📊 MarketMatch-AI uses K-Means & DBSCAN clustering for customer segmentation & predictive retail intelligence.",
  "🎓 Durgesh is pursuing an MCA in AIML at Sri Balaji University, Pune (2025–2027)!",
  "☁️ Certified AWS Machine Learning Foundations & UNLOX® AI Fellow.",
  "🏆 Lead engineer in AI hackathons & developer of autonomous agent pipelines.",
  "⚡ 360° acrobatic ion flip! Click me again for another stunt!",
  "💡 Tip: You can drag me anywhere, or use the badge below to toggle Roam mode!",
  "🧪 CyberBot is an interactive 3D Beta feature on the v2 architecture and will be continuously improvised soon!",
]

type MotionMode = 'dock' | 'roam' | 'follow'

export default function RoamingCompanion3D() {
  const [mounted, setMounted] = useState(false)
  const [isHovered, setIsHovered] = useState(false)
  const [isSpinning, setIsSpinning] = useState(false)
  const [spinProgress, setSpinProgress] = useState(0)
  const [mood, setMood] = useState<'normal' | 'happy' | 'stunt'>('normal')
  const [activeMessage, setActiveMessage] = useState<string>("Greetings human! 🤖")
  const [voiceIndex, setVoiceIndex] = useState(0)
  const [bubbleVisible, setBubbleVisible] = useState(true)
  const [mode, setMode] = useState<MotionMode>('dock')
  const [isDragging, setIsDragging] = useState(false)
  const [bubbleAlign, setBubbleAlign] = useState<'left' | 'right' | 'center'>('left')
  const [isMuted, setIsMuted] = useState(false)
  const isMutedRef = useRef(false)
  isMutedRef.current = isMuted

  // Position in viewport pixels
  const posRef = useRef({ x: 0, y: 0 })
  const targetRef = useRef({ x: 0, y: 0 })
  const mouseScreenRef = useRef({ x: 0, y: 0 })
  const containerRef = useRef<HTMLDivElement>(null)
  const animFrameRef = useRef<number | null>(null)
  const dragOffsetRef = useRef({ x: 0, y: 0 })

  // Audio synthesis helper for futuristic chimes
  const playCyberChirp = useCallback((freq = 520, freq2 = 880) => {
    if (isMutedRef.current) return
    try {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext
      if (!AudioCtx) return
      const ctx = new AudioCtx()
      if (ctx.state === 'suspended') {
        ctx.resume().catch(() => {})
      }
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
      const isMobile = window.innerWidth < 768
      if (isMobile) {
        setBubbleVisible(false)
      }
      // Set dynamic time-of-day greeting (Priority 3)
      setActiveMessage(getTimeBasedGreeting())

      // Start docked in bottom-right corner with ample safety margin
      const startX = isMobile ? Math.max(16, window.innerWidth - 150) : Math.max(80, window.innerWidth - 220)
      const startY = isMobile ? Math.max(30, window.innerHeight - 190) : Math.max(80, window.innerHeight - 260)
      posRef.current = { x: startX, y: startY }
      targetRef.current = { x: startX, y: startY }
      setBubbleAlign('left')

      const savedMute = localStorage.getItem('cyberbot_muted') === 'true'
      setIsMuted(savedMute)
      isMutedRef.current = savedMute
    }

    // Keep initial greeting visible on desktop
    const isMobileViewport = typeof window !== 'undefined' && window.innerWidth < 768
    const welcomeTimer = setTimeout(() => {
      setBubbleVisible(false)
    }, isMobileViewport ? 0 : 9000)

    // Priority 3: Robust Real-Time Section Scroll Spy
    const SECTION_PROMPTS: { id: string; msg: string }[] = [
      { id: 'contact', msg: "📬 Ready to build next-gen AI? Send Durgesh a message or grab his resume above!" },
      { id: 'github-projects', msg: "💻 Real-time GitHub sync! Check out his open-source repositories and live stars." },
      { id: 'projects', msg: "🚀 Featured: RoleRadar AI Career Platform, AI Fitness MediaPipe & MarketMatch-AI!" },
      { id: 'education', msg: "🏛️ MCA in AIML (2025–2027) & BCA (8.9 CGPA) with AWS & UNLOX certifications!" },
      { id: 'experience', msg: "💼 Enterprise GenAI, LLM agents, and cloud architectures built for production scale!" },
      { id: 'about', msg: "🎓 Durgesh is an MCA (AIML) candidate with expertise in autonomous AI & deep learning!" },
      { id: 'hero', msg: "👋 Welcome! I'm Durgesh's CyberBot AI. I'll guide you through his work & achievements!" },
    ]

    let lastDetectedSection = ''
    let dismissTimer: NodeJS.Timeout | null = null
    let ticking = false

    const handleSectionScroll = () => {
      if (ticking) return
      ticking = true

      requestAnimationFrame(() => {
        ticking = false
        const scrollCheckY = window.scrollY + window.innerHeight * 0.45

        for (const { id, msg } of SECTION_PROMPTS) {
          const el = document.getElementById(id)
          if (el) {
            const rect = el.getBoundingClientRect()
            const elemTop = rect.top + window.scrollY
            const elemBottom = elemTop + rect.height
            if (scrollCheckY >= elemTop && scrollCheckY <= elemBottom) {
              if (lastDetectedSection !== id) {
                lastDetectedSection = id
                setActiveMessage(msg)
                setBubbleVisible(true)
                playCyberChirp(580, 850)
                if (dismissTimer) clearTimeout(dismissTimer)
                dismissTimer = setTimeout(() => {
                  setBubbleVisible(false)
                }, 8500)
              }
              break
            }
          }
        }
      })
    }

    window.addEventListener('scroll', handleSectionScroll, { passive: true })

    const handleMuteToggle = (e: Event) => {
      const custom = e as CustomEvent<{ muted: boolean }>
      if (custom.detail && typeof custom.detail.muted === 'boolean') {
        setIsMuted(custom.detail.muted)
        isMutedRef.current = custom.detail.muted
      } else {
        const saved = localStorage.getItem('cyberbot_muted') === 'true'
        setIsMuted(saved)
        isMutedRef.current = saved
      }
    }
    window.addEventListener('cyberbot-mute-toggle', handleMuteToggle)

    return () => {
      clearTimeout(welcomeTimer)
      if (dismissTimer) clearTimeout(dismissTimer)
      window.removeEventListener('scroll', handleSectionScroll)
      window.removeEventListener('cyberbot-mute-toggle', handleMuteToggle)
    }
  }, [playCyberChirp])

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

    const nextIndex = (voiceIndex + 1) % CYBERBOT_VOICELINES.length
    setVoiceIndex(nextIndex)
    setActiveMessage(CYBERBOT_VOICELINES[nextIndex])
    setBubbleVisible(true)
    trackEvent('cyberbot_interact', { action: 'stunt_spin', line_index: nextIndex })

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
      setMood('stunt')
      playCyberChirp(650, 1300)
      setTimeout(() => setMood('happy'), 950)
    } else if (action === 'projects') {
      const el = document.getElementById('projects') || document.getElementById('featured-projects')
      if (el) el.scrollIntoView({ behavior: 'smooth' })
      setBubbleVisible(false)
    } else if (action === 'next') {
      const nextIndex = (voiceIndex + 1) % CYBERBOT_VOICELINES.length
      setVoiceIndex(nextIndex)
      setActiveMessage(CYBERBOT_VOICELINES[nextIndex])
      playCyberChirp(520, 980)
    }
  }

  if (!mounted) return null

  // Relative mouse for 3D look-at
  const relativeMouse = {
    x: (mouseScreenRef.current.x - posRef.current.x) / window.innerWidth,
    y: (mouseScreenRef.current.y - posRef.current.y) / window.innerHeight,
  }

  return (
    <div className="fixed inset-0 pointer-events-none z-40 hidden sm:block">
      {/* 3D CyberBot Floating Anchor */}
      <div
        ref={containerRef}
        className="absolute top-0 left-0 w-44 h-56 select-none will-change-transform"
        style={{ touchAction: 'none' }}
      >
        {/* Quick Chat Callout Badge (visible when bubble is dismissed) */}
        {!bubbleVisible && (
          <div className="absolute -top-7 left-1/2 -translate-x-1/2 whitespace-nowrap pointer-events-auto">
            <button
              onClick={(e) => {
                e.stopPropagation()
                setBubbleVisible(true)
                playCyberChirp(600, 1000)
              }}
              className="px-2.5 py-1 rounded-full text-[10px] font-mono font-bold bg-slate-950/90 border border-purple-500/50 text-purple-300 hover:border-amber-400 hover:text-white backdrop-blur-xl shadow-lg shadow-purple-500/25 transition-all flex items-center gap-1.5 active:scale-95"
              title="CyberBot AI Companion (Beta Feature • To be improvised soon)"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-ping" />
              <span>💬 CyberBot AI</span>
              <span className="text-[8px] font-mono font-bold px-1.5 py-0.2 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40">
                BETA
              </span>
            </button>
          </div>
        )}

        {/* Adaptive Speech Bubble */}
        <SpeechBubble
          message={activeMessage}
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
              ? 'drop-shadow-[0_0_35px_rgba(244,63,94,0.7)] scale-105'
              : 'drop-shadow-[0_0_20px_rgba(168,85,247,0.4)]'
          }`}
          title="Click to interact! Drag to toss! 🤖"
        >
          {/* Holographic Pulse Aura on Hover */}
          {isHovered && (
            <div className="absolute inset-x-2 bottom-0 h-16 rounded-full border border-purple-400/50 animate-ping pointer-events-none opacity-40" />
          )}

          <Canvas
            camera={{ position: [0, 0, 3.2], fov: 45 }}
            dpr={[1, 1.5]}
            gl={{ alpha: true, antialias: true, powerPreference: 'high-performance' }}
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

          {/* Mini Interactive Mode & Audio Controls Pill */}
          <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 whitespace-nowrap pointer-events-auto flex items-center gap-1.5">
            <button
              onClick={(e) => {
                e.stopPropagation()
                setMode((m) => (m === 'dock' ? 'roam' : m === 'roam' ? 'follow' : 'dock'))
                playCyberChirp(550, 750)
              }}
              className="px-2.5 py-1 rounded-full text-[10px] font-mono font-bold bg-slate-950/90 border border-purple-500/40 text-purple-300 hover:border-rose-300 hover:bg-purple-500/20 backdrop-blur-xl transition-all shadow-xl shadow-purple-500/20 flex items-center gap-1.5 cursor-pointer"
            >
              {mode === 'dock' && (
                <>
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span>💤 Docked</span>
                </>
              )}
              {mode === 'roam' && (
                <>
                  <span className="w-1.5 h-1.5 rounded-full bg-rose-400 animate-ping" />
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

            {/* Audio Mute / Unmute Toggle */}
            <button
              onClick={(e) => {
                e.stopPropagation()
                const next = !isMuted
                setIsMuted(next)
                isMutedRef.current = next
                localStorage.setItem('cyberbot_muted', String(next))
                if (!next) {
                  playCyberChirp(600, 950)
                }
              }}
              className={`px-2 py-1 rounded-full text-[10px] font-mono font-bold bg-slate-950/90 border backdrop-blur-xl transition-all shadow-xl flex items-center gap-1 cursor-pointer ${
                isMuted
                  ? 'border-slate-700 text-slate-500 hover:text-slate-300'
                  : 'border-rose-500/40 text-rose-300 hover:border-rose-400 shadow-rose-500/20'
              }`}
              title={isMuted ? "CyberBot Audio Muted (Click to enable futuristic chimes)" : "CyberBot Audio Active (Click to mute)"}
            >
              <span>{isMuted ? '🔇' : '🔊'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
