"use client"

import React, { useState, useRef, Suspense, useEffect, useCallback } from 'react'
import Link from 'next/link'
import { Canvas } from '@react-three/fiber'
import { ArrowLeft, Sparkles, Volume2, VolumeX, RotateCw, Lightbulb, Compass, ShieldCheck } from 'lucide-react'
import CyberBotModel from '@/components/companion/CyberBotModel'
import SpeechBubble from '@/components/companion/SpeechBubble'

const CYBERBOT_VOICELINES = [
  "🚀 Welcome to my interactive 3D studio! I'm CyberBot AI, built with Three.js & React Three Fiber.",
  "⚡ Check out RoleRadar — an enterprise AI career intelligence platform evaluating 16 roles with multi-model scoring!",
  "🏋️ The AI Fitness Platform runs real-time MediaPipe pose detection under 50ms with live audio feedback!",
  "📊 MarketMatch-AI uses K-Means & DBSCAN clustering for customer segmentation & predictive retail intelligence.",
  "🎓 Durgesh is pursuing an MCA in AIML at Sri Balaji University, Pune (2025–2027)!",
  "☁️ Certified AWS Machine Learning Foundations & UNLOX® AI Fellow.",
  "🏆 Lead engineer in AI hackathons & developer of autonomous agent pipelines.",
  "🧪 My chassis is rendered with 3-point studio lighting, neon dual antenna loops, and procedural jetpack thrusters!",
  "💡 Tip: Drag me across the canvas or click the flip button for an acrobatic ion stunt!",
]

export default function CyberBotStudioShell() {
  const [mounted, setMounted] = useState(false)
  const [isHovered, setIsHovered] = useState(false)
  const [isSpinning, setIsSpinning] = useState(false)
  const [spinProgress, setSpinProgress] = useState(0)
  const [mood, setMood] = useState<'normal' | 'happy' | 'stunt'>('normal')
  const [voiceIndex, setVoiceIndex] = useState(0)
  const [activeMessage, setActiveMessage] = useState<string>(CYBERBOT_VOICELINES[0])
  const [bubbleVisible, setBubbleVisible] = useState(true)
  const [mode, setMode] = useState<'dock' | 'roam' | 'follow'>('dock')
  const [isMuted, setIsMuted] = useState(false)
  const isMutedRef = useRef(false)
  isMutedRef.current = isMuted

  const mousePosRef = useRef({ x: 0.5, y: 0.5 })
  const [mousePos, setMousePos] = useState({ x: 0.5, y: 0.5 })
  const audioCtxRef = useRef<AudioContext | null>(null)

  // Audio chirp generator with cached AudioContext
  const getAudioContext = useCallback((): AudioContext | null => {
    try {
      if (!audioCtxRef.current) {
        const AudioCtx = window.AudioContext || (window as any).webkitAudioContext
        if (AudioCtx) audioCtxRef.current = new AudioCtx()
      }
      if (audioCtxRef.current && audioCtxRef.current.state === 'suspended') {
        audioCtxRef.current.resume().catch(() => {})
      }
      return audioCtxRef.current
    } catch {
      return null
    }
  }, [])

  const playCyberChirp = useCallback((freq = 520, freq2 = 880) => {
    if (isMutedRef.current) return
    try {
      const ctx = getAudioContext()
      if (!ctx) return
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
    } catch {}
  }, [getAudioContext])

  useEffect(() => {
    setMounted(true)
    const saved = localStorage.getItem('cyberbot_muted') === 'true'
    setIsMuted(saved)
    isMutedRef.current = saved

    const handleMouseMove = (e: MouseEvent) => {
      const x = e.clientX / window.innerWidth
      const y = e.clientY / window.innerHeight
      mousePosRef.current = { x, y }
      setMousePos({ x, y })
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  const triggerFlip = () => {
    setIsSpinning(true)
    setMood('stunt')
    playCyberChirp(600, 1300)
    let start: number | null = null
    const duration = 800
    const animate = (now: number) => {
      if (!start) start = now
      const elapsed = (now - start) / duration
      if (elapsed >= 1) {
        setIsSpinning(false)
        setSpinProgress(0)
        setMood('happy')
      } else {
        setSpinProgress(elapsed)
        requestAnimationFrame(animate)
      }
    }
    requestAnimationFrame(animate)
  }

  const nextVoiceLine = () => {
    const nextIdx = (voiceIndex + 1) % CYBERBOT_VOICELINES.length
    setVoiceIndex(nextIdx)
    setActiveMessage(CYBERBOT_VOICELINES[nextIdx])
    setBubbleVisible(true)
    playCyberChirp(520, 950)
  }

  if (!mounted) {
    return (
      <div className="min-h-screen bg-[#07050e] flex items-center justify-center text-slate-400 font-mono text-sm">
        Initializing 3D CyberBot Studio...
      </div>
    )
  }

  return (
    <div className="relative min-h-screen bg-[#07050e] text-slate-100 flex flex-col justify-between overflow-hidden selection:bg-purple-500/30">
      {/* Cosmic Nebula Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-purple-600/10 blur-[140px] pointer-events-none" />
      <div className="absolute bottom-1/4 left-1/2 -translate-x-1/2 w-[500px] h-[400px] rounded-full bg-rose-600/10 blur-[120px] pointer-events-none" />

      {/* Top Header Bar */}
      <header className="relative z-30 max-w-6xl w-full mx-auto px-4 sm:px-6 py-6 flex items-center justify-between">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs sm:text-sm font-medium text-slate-400 hover:text-white transition-colors group px-3 py-1.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-md"
        >
          <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
          <span>Back to Portfolio</span>
        </Link>

        {/* Reference Image Matching Pill Badge */}
        <div className="px-4 py-1.5 rounded-full text-xs font-mono font-semibold bg-[#120f1d]/90 border border-[#f59e0b]/70 text-[#f59e0b] shadow-[0_0_20px_rgba(245,158,11,0.35)] backdrop-blur-xl flex items-center gap-2.5">
          <span className="w-2.5 h-2.5 rounded-full bg-[#c084fc] shadow-[0_0_10px_#c084fc] animate-pulse" />
          <span className="tracking-wide">💬 CyberBot AI</span>
        </div>

        <div className="flex items-center gap-2">
          <Link
            href="/lab"
            className="hidden sm:inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full border border-emerald-500/40 bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20 transition-all"
          >
            <Sparkles className="size-3.5" />
            <span>AI Lab</span>
          </Link>
        </div>
      </header>

      {/* Main Showcase Stage */}
      <main className="relative z-20 flex-1 flex flex-col items-center justify-center px-4 max-w-4xl mx-auto w-full my-auto">
        {/* Floating Speech Bubble Above Bot */}
        <div className="relative w-full max-w-md flex justify-center mb-4">
          <SpeechBubble
            message={activeMessage}
            visible={bubbleVisible}
            align="center"
            onAction={(action) => {
              if (action === 'flip') triggerFlip()
              else if (action === 'next') nextVoiceLine()
              else setBubbleVisible(false)
            }}
            onDismiss={() => setBubbleVisible(false)}
          />
        </div>

        {/* 3D Canvas Viewport */}
        <div
          onMouseEnter={() => {
            setIsHovered(true)
            setMood('happy')
          }}
          onMouseLeave={() => {
            setIsHovered(false)
            setMood('normal')
          }}
          onClick={triggerFlip}
          className="relative w-72 h-80 sm:w-96 sm:h-[420px] cursor-pointer select-none transition-transform duration-300 hover:scale-105"
          title="Click to perform 360° acrobatic stunt flip! 🤖"
        >
          {/* Subtle Ambient Radial Glow */}
          <div className="absolute inset-0 rounded-full bg-gradient-to-b from-purple-500/10 via-transparent to-rose-500/10 blur-xl pointer-events-none" />

          <Canvas
            aria-hidden="true"
            camera={{ position: [0, 0, 3.2], fov: 45 }}
            dpr={[1, 2]}
            gl={{ alpha: true, antialias: true, powerPreference: 'high-performance' }}
            className="w-full h-full"
          >
            <Suspense fallback={null}>
              <CyberBotModel
                isHovered={isHovered}
                isSpinning={isSpinning}
                spinProgress={spinProgress}
                mousePos={mousePos}
                mood={mood}
              />
            </Suspense>
          </Canvas>
        </div>

        {/* Bottom Interactive Controls Strip (Matching Reference Image) */}
        <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
          {/* Dock / Roam Pill */}
          <button
            onClick={() => {
              setMode((m) => (m === 'dock' ? 'roam' : m === 'roam' ? 'follow' : 'dock'))
              playCyberChirp(550, 750)
            }}
            className="px-4 py-1.5 rounded-full text-xs font-mono font-semibold bg-[#120f1d]/90 border border-[#f59e0b]/60 text-[#f59e0b] shadow-[0_0_15px_rgba(245,158,11,0.25)] backdrop-blur-xl transition-all flex items-center gap-2 cursor-pointer hover:border-[#f59e0b] active:scale-95"
          >
            {mode === 'dock' && (
              <>
                <span className="w-2 h-2 rounded-full bg-[#10b981] shadow-[0_0_8px_#10b981] animate-pulse" />
                <span>💤 Docked</span>
              </>
            )}
            {mode === 'roam' && (
              <>
                <span className="w-2 h-2 rounded-full bg-rose-400 animate-ping" />
                <span>🟢 Roaming</span>
              </>
            )}
            {mode === 'follow' && (
              <>
                <span className="w-2 h-2 rounded-full bg-purple-400 animate-bounce" />
                <span>🧲 Following</span>
              </>
            )}
          </button>

          {/* Sound Toggle */}
          <button
            onClick={() => {
              const next = !isMuted
              setIsMuted(next)
              isMutedRef.current = next
              localStorage.setItem('cyberbot_muted', String(next))
              if (!next) playCyberChirp(600, 950)
            }}
            className={`px-3 py-1.5 rounded-full text-xs font-mono font-bold bg-[#120f1d]/90 border backdrop-blur-xl transition-all shadow-xl flex items-center gap-1.5 cursor-pointer ${
              isMuted
                ? 'border-white/10 text-slate-400 hover:text-white'
                : 'border-rose-500/40 text-rose-300 hover:border-rose-400'
            }`}
            title={isMuted ? 'Unmute Audio' : 'Mute Audio'}
          >
            {isMuted ? <VolumeX className="size-3.5" /> : <Volume2 className="size-3.5" />}
            <span>{isMuted ? 'Muted' : 'Audio On'}</span>
          </button>

          {/* Stunt Flip Button */}
          <button
            onClick={triggerFlip}
            className="px-3.5 py-1.5 rounded-full text-xs font-mono font-semibold bg-white/5 border border-white/15 text-slate-200 hover:text-white hover:border-purple-400/50 backdrop-blur-md transition-all flex items-center gap-1.5 cursor-pointer active:scale-95"
          >
            <RotateCw className="size-3.5 text-purple-400" />
            <span>360° Ion Flip</span>
          </button>

          {/* Next Tip Button */}
          <button
            onClick={nextVoiceLine}
            className="px-3.5 py-1.5 rounded-full text-xs font-mono font-semibold bg-white/5 border border-white/15 text-slate-200 hover:text-white hover:border-amber-400/50 backdrop-blur-md transition-all flex items-center gap-1.5 cursor-pointer active:scale-95"
          >
            <Lightbulb className="size-3.5 text-amber-400" />
            <span>Next Tip</span>
          </button>
        </div>
      </main>

      {/* Footer Specs Strip */}
      <footer className="relative z-30 max-w-5xl w-full mx-auto px-4 py-6 border-t border-white/5 text-center sm:flex sm:items-center sm:justify-between text-xs text-slate-500 font-mono">
        <div>
          Three.js WebGL &middot; React Three Fiber &middot; Procedural 3D Mesh Animation
        </div>
        <div className="mt-2 sm:mt-0 flex items-center justify-center gap-4">
          <span className="flex items-center gap-1">
            <ShieldCheck className="size-3.5 text-emerald-400" />
            Zero Server Persistence
          </span>
          <span>&middot;</span>
          <span>Sub-50ms Reactivity</span>
        </div>
      </footer>
    </div>
  )
}

