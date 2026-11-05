"use client"

import React, { useState, useRef, Suspense, useEffect, useCallback } from 'react'
import Link from 'next/link'
import { Canvas } from '@react-three/fiber'
import {
  ArrowLeft,
  Sparkles,
  Volume2,
  VolumeX,
  RotateCw,
  Lightbulb,
  Mic,
  Palette,
  Activity,
  Music,
} from 'lucide-react'
import CyberBotModel from '@/components/companion/CyberBotModel'
import SpeechBubble from '@/components/companion/SpeechBubble'
import CyberBotTelemetryOverlay from '@/components/companion/CyberBotTelemetryOverlay'
import { CyberBotSpeechEngine, stripEmojis } from '@/lib/companion/speech'
import { searchKnowledge, SUGGESTED_QUESTION_CHIPS } from '@/lib/companion/knowledge'
import { CyberBotVoiceListener, VoiceCommandResult } from '@/lib/companion/voice-recognition'
import { CyberBotSkinId, CYBERBOT_SKINS, ALL_SKIN_IDS, getNextSkinId } from '@/lib/companion/skins'

function safeGetItem(key: string): string | null {
  if (typeof window === 'undefined') return null
  try {
    return localStorage.getItem(key)
  } catch {
    return null
  }
}

function safeSetItem(key: string, value: string): void {
  if (typeof window === 'undefined') return
  try {
    localStorage.setItem(key, value)
  } catch {}
}

const CYBERBOT_VOICELINES = [
  "🚀 Welcome to my interactive 3D studio! I'm CyberBot AI, built with Three.js & React Three Fiber.",
  "⚡ Check out RoleRadar — an enterprise AI career intelligence platform evaluating 16 roles with multi-model scoring!",
  "🏋️ The AI Fitness Platform runs real-time MediaPipe pose detection under 50ms with live audio feedback!",
  "📊 MarketMatch-AI uses K-Means & DBSCAN clustering for customer segmentation & predictive retail intelligence.",
  "🎓 Durgesh is pursuing an MCA in AIML at Sri Balaji University, Pune (2025–2027)!",
  "☁️ Certified AWS Machine Learning Foundations & UNLOX® AI Fellow.",
  "🏆 Lead engineer in AI hackathons & developer of autonomous agent pipelines.",
  "🧪 My chassis is rendered with 3-point studio lighting, neon dual antenna loops, and procedural jetpack thrusters!",
  "💡 Tip: Drag me across the canvas, click the flip button, or switch skins below!",
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
  const [voiceEnabled, setVoiceEnabled] = useState(false)
  const [isSpeaking, setIsSpeaking] = useState(false)

  // Ultimate features states
  const [skin, setSkin] = useState<CyberBotSkinId>('cobalt-prime')
  const [isDancing, setIsDancing] = useState(false)
  const [isListening, setIsListening] = useState(false)
  const [telemetryOpen, setTelemetryOpen] = useState(false)
  const [knowledgeAction, setKnowledgeAction] = useState<{ url: string; label: string } | null>(null)

  const isMutedRef = useRef(false)
  isMutedRef.current = isMuted
  const voiceEnabledRef = useRef(false)
  voiceEnabledRef.current = voiceEnabled
  const skinRef = useRef<CyberBotSkinId>('cobalt-prime')
  skinRef.current = skin

  const mousePosRef = useRef({ x: 0.5, y: 0.5 })
  const [mousePos, setMousePos] = useState({ x: 0.5, y: 0.5 })
  const audioCtxRef = useRef<AudioContext | null>(null)

  // Audio chirp generator with cached AudioContext (AUD-01 Guard)
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

  const playStuntChirp = useCallback(() => {
    if (isMutedRef.current) return
    try {
      const ctx = getAudioContext()
      if (!ctx) return
      const osc = ctx.createOscillator()
      const gain = ctx.createGain()
      osc.type = 'sine'
      osc.frequency.setValueAtTime(520, ctx.currentTime)
      osc.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.3)
      osc.frequency.exponentialRampToValueAtTime(1300, ctx.currentTime + 0.65)
      gain.gain.setValueAtTime(0.09, ctx.currentTime)
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.8)
      osc.connect(gain)
      gain.connect(ctx.destination)
      osc.start()
      osc.stop(ctx.currentTime + 0.8)
    } catch {}
  }, [getAudioContext])

  const playDanceGroove = useCallback(() => {
    if (isMutedRef.current) return
    try {
      const ctx = getAudioContext()
      if (!ctx) return
      const notes = [261.63, 329.63, 392.0, 523.25, 440.0, 349.23, 392.0, 523.25]
      notes.forEach((freq, idx) => {
        const osc = ctx.createOscillator()
        const gain = ctx.createGain()
        osc.type = 'triangle'
        osc.frequency.setValueAtTime(freq, ctx.currentTime + idx * 0.24)
        gain.gain.setValueAtTime(0.07, ctx.currentTime + idx * 0.24)
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + idx * 0.24 + 0.2)
        osc.connect(gain)
        gain.connect(ctx.destination)
        osc.start(ctx.currentTime + idx * 0.24)
        osc.stop(ctx.currentTime + idx * 0.24 + 0.2)
      })
    } catch {}
  }, [getAudioContext])

  const speakCurrentLine = useCallback((text: string) => {
    if (!voiceEnabledRef.current || isMutedRef.current) return
    const speechEngine = CyberBotSpeechEngine.getInstance()
    if (!speechEngine.isAvailable()) return

    const clean = stripEmojis(text)
    if (!clean) return

    speechEngine.speak(clean, {
      pitch: 1.12,
      rate: 1.05,
      onStart: () => setIsSpeaking(true),
      onEnd: () => setIsSpeaking(false),
    })
  }, [])

  const triggerFlip = useCallback(() => {
    setIsSpinning(true)
    setMood('stunt')
    playStuntChirp()
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
  }, [playStuntChirp])

  const triggerDance = useCallback(() => {
    setIsDancing(true)
    setMood('happy')
    playDanceGroove()
    const msg = "Studio dance groove active! Feel the cyber rhythm! 🎶"
    setActiveMessage(msg)
    setBubbleVisible(true)
    speakCurrentLine(msg)
    setTimeout(() => {
      setIsDancing(false)
    }, 8500)
  }, [playDanceGroove, speakCurrentLine])

  const cycleSkin = useCallback(() => {
    const next = getNextSkinId(skinRef.current)
    setSkin(next)
    skinRef.current = next
    safeSetItem('cyberbot_skin', next)
    playCyberChirp(600, 1050)
    const skinName = CYBERBOT_SKINS[next].name
    setActiveMessage(`Chassis skin updated to ${skinName}! ✨`)
    setBubbleVisible(true)
    speakCurrentLine(`Chassis skin updated to ${skinName}`)
  }, [playCyberChirp, speakCurrentLine])

  const nextVoiceLine = useCallback(() => {
    const nextIdx = (voiceIndex + 1) % CYBERBOT_VOICELINES.length
    setVoiceIndex(nextIdx)
    setActiveMessage(CYBERBOT_VOICELINES[nextIdx])
    setKnowledgeAction(null)
    setBubbleVisible(true)
    playCyberChirp(520, 950)
    speakCurrentLine(CYBERBOT_VOICELINES[nextIdx])
  }, [playCyberChirp, speakCurrentLine, voiceIndex])

  const handleAskQuestion = useCallback((query: string) => {
    const result = searchKnowledge(query)
    if (result) {
      setActiveMessage(result.answer)
      if (result.actionUrl && result.actionLabel) {
        setKnowledgeAction({ url: result.actionUrl, label: result.actionLabel })
      } else {
        setKnowledgeAction(null)
      }
      setBubbleVisible(true)
      triggerFlip()
      speakCurrentLine(result.answer)
      playCyberChirp(600, 1000)
    } else {
      const fallback = "Ask me anything about Durgesh's production systems, education, or skills!"
      setActiveMessage(fallback)
      setKnowledgeAction(null)
      setBubbleVisible(true)
      playCyberChirp(480, 650)
    }
  }, [playCyberChirp, speakCurrentLine, triggerFlip])

  const handleVoiceCommand = useCallback((result: VoiceCommandResult) => {
    playCyberChirp(550, 950)
    switch (result.action) {
      case 'flip':
        triggerFlip()
        break
      case 'dance':
        triggerDance()
        break
      case 'skin':
        cycleSkin()
        break
      case 'mute':
        const nextMute = !isMutedRef.current
        setIsMuted(nextMute)
        isMutedRef.current = nextMute
        safeSetItem('cyberbot_muted', String(nextMute))
        setActiveMessage(nextMute ? "Audio muted 🔕" : "Audio active 🔊")
        setBubbleVisible(true)
        break
      case 'query':
        if (result.matchedQuery) handleAskQuestion(result.matchedQuery)
        break
      default:
        nextVoiceLine()
        break
    }
  }, [cycleSkin, handleAskQuestion, nextVoiceLine, playCyberChirp, triggerDance, triggerFlip])

  useEffect(() => {
    setMounted(true)
    const savedMute = safeGetItem('cyberbot_muted') === 'true'
    setIsMuted(savedMute)
    isMutedRef.current = savedMute

    const savedVoice = safeGetItem('cyberbot_voice_enabled') === 'true'
    setVoiceEnabled(savedVoice)
    voiceEnabledRef.current = savedVoice

    const savedSkin = safeGetItem('cyberbot_skin') as CyberBotSkinId
    if (savedSkin && CYBERBOT_SKINS[savedSkin]) {
      setSkin(savedSkin)
      skinRef.current = savedSkin
    }

    const handleMouseMove = (e: MouseEvent) => {
      const x = e.clientX / window.innerWidth
      const y = e.clientY / window.innerHeight
      mousePosRef.current = { x, y }
      setMousePos({ x, y })
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement | null
      const isInput = target && (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.isContentEditable)
      if (isInput) return

      if (e.key === ' ' || e.key === 'Enter') {
        e.preventDefault()
        triggerFlip()
      } else if (e.key === 'b' || e.key === 'B') {
        e.preventDefault()
        triggerDance()
      } else if (e.key === 's' || e.key === 'S') {
        e.preventDefault()
        cycleSkin()
      } else if (e.key === 'h' || e.key === 'H') {
        e.preventDefault()
        setTelemetryOpen((v) => !v)
      } else if (e.key === 'n' || e.key === 'N') {
        e.preventDefault()
        nextVoiceLine()
      } else if (e.key === 'm' || e.key === 'M') {
        e.preventDefault()
        const next = !isMutedRef.current
        setIsMuted(next)
        isMutedRef.current = next
        safeSetItem('cyberbot_muted', String(next))
        if (!next) playCyberChirp(600, 950)
      } else if (e.key === 'v' || e.key === 'V') {
        e.preventDefault()
        const listener = CyberBotVoiceListener.getInstance()
        if (listener.isSupported()) {
          listener.listen(
            handleVoiceCommand,
            (active) => setIsListening(active)
          )
        }
      } else if (e.key === 'd' || e.key === 'D') {
        e.preventDefault()
        setMode((m) => (m === 'dock' ? 'roam' : m === 'roam' ? 'follow' : 'dock'))
        playCyberChirp(550, 750)
      } else if (e.key === 'Escape') {
        if (telemetryOpen) setTelemetryOpen(false)
        setBubbleVisible(false)
        CyberBotSpeechEngine.getInstance().cancel()
        setIsSpeaking(false)
      }
    }

    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('keydown', handleKeyDown)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('keydown', handleKeyDown)
      CyberBotSpeechEngine.getInstance().cancel()
      CyberBotVoiceListener.getInstance().stop()
      if (audioCtxRef.current) {
        audioCtxRef.current.close().catch(() => {})
        audioCtxRef.current = null
      }
    }
  }, [
    cycleSkin,
    handleVoiceCommand,
    nextVoiceLine,
    playCyberChirp,
    speakCurrentLine,
    telemetryOpen,
    triggerDance,
    triggerFlip,
  ])

  if (!mounted) {
    return (
      <div className="min-h-screen bg-[#07050e] flex items-center justify-center text-slate-400 font-mono text-sm">
        Initializing 3D CyberBot Studio...
      </div>
    )
  }

  const activeSkinObj = CYBERBOT_SKINS[skin]

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
        <div
          className={`px-4 py-1.5 rounded-full text-xs font-mono font-semibold ${activeSkinObj.badgeBg} border ${activeSkinObj.accentBorder} ${activeSkinObj.badgeText} shadow-[0_0_20px_rgba(245,158,11,0.35)] backdrop-blur-xl flex items-center gap-2.5`}
        >
          <span className="w-2.5 h-2.5 rounded-full bg-[#c084fc] shadow-[0_0_10px_#c084fc] animate-pulse" />
          <span className="tracking-wide">💬 CyberBot AI Studio ({activeSkinObj.name})</span>
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

      {/* Center 3D Stage */}
      <main id="main-content" className="relative flex-1 flex flex-col items-center justify-center p-4">
        {/* Voiceline Speech Bubble HUD with Q&A */}
        <div className="relative z-20 mb-4 max-w-md w-full flex justify-center">
          <SpeechBubble
            message={activeMessage}
            visible={bubbleVisible && !telemetryOpen}
            align="center"
            knowledgeAction={knowledgeAction}
            isListening={isListening}
            suggestedChips={SUGGESTED_QUESTION_CHIPS}
            onSelectChip={(chip) => handleAskQuestion(chip)}
            onAskQuestion={(q) => handleAskQuestion(q)}
            onAction={(action) => {
              if (action === 'flip') triggerFlip()
              else if (action === 'next') nextVoiceLine()
            }}
            onDismiss={() => {
              setBubbleVisible(false)
              CyberBotSpeechEngine.getInstance().cancel()
              setIsSpeaking(false)
            }}
          />
        </div>

        {/* Telemetry Overlay in Studio */}
        <div className="relative z-30 max-w-sm w-full flex justify-center">
          <CyberBotTelemetryOverlay
            visible={telemetryOpen}
            onClose={() => setTelemetryOpen(false)}
          />
        </div>

        {/* Interactive 3D Canvas */}
        <div
          className={`relative w-full max-w-2xl h-[400px] sm:h-[480px] cursor-grab active:cursor-grabbing transition-transform duration-300 ${
            isSpeaking || isDancing
              ? 'scale-102 drop-shadow-[0_0_35px_rgba(245,158,11,0.5)]'
              : ''
          }`}
          onMouseEnter={() => {
            setIsHovered(true)
            setMood('happy')
            playCyberChirp(680, 950)
          }}
          onMouseLeave={() => {
            setIsHovered(false)
            setMood('normal')
          }}
          onClick={triggerFlip}
          title="Click to flip! Double-click or press B to dance!"
        >
          <Canvas
            aria-hidden="true"
            camera={{ position: [0, 0, 3.8], fov: 42 }}
            gl={{ alpha: true, antialias: true, powerPreference: 'high-performance' }}
            dpr={[1, 2]}
          >
            <Suspense fallback={null}>
              <CyberBotModel
                isHovered={isHovered}
                isSpinning={isSpinning}
                spinProgress={spinProgress}
                mousePos={mousePos}
                mood={mood}
                isSpeaking={isSpeaking}
                isDancing={isDancing}
                skin={skin}
              />
            </Suspense>
          </Canvas>
        </div>

        {/* Floating Studio Control Dock */}
        <div className="relative z-20 mt-4 flex flex-wrap items-center justify-center gap-2 sm:gap-3 max-w-2xl">
          {/* Mode Pill Toggle */}
          <button
            onClick={() => {
              setMode((m) => (m === 'dock' ? 'roam' : m === 'roam' ? 'follow' : 'dock'))
              playCyberChirp(550, 750)
            }}
            className="px-3.5 py-1.5 rounded-full text-xs font-mono font-semibold bg-[#120f1d]/90 border border-[#f59e0b]/60 text-[#f59e0b] shadow-[0_0_15px_rgba(245,158,11,0.25)] backdrop-blur-xl transition-all flex items-center gap-2 cursor-pointer hover:border-[#f59e0b] active:scale-95"
            title="Toggle Mode (Key D)"
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

          {/* Skin Switcher Dropdown / Pill */}
          <button
            onClick={cycleSkin}
            className="px-3 py-1.5 rounded-full text-xs font-mono font-semibold bg-white/5 border border-white/15 text-slate-200 hover:text-white hover:border-purple-400/50 backdrop-blur-md transition-all flex items-center gap-1.5 cursor-pointer active:scale-95"
            title="Change Chassis Skin (Key S)"
          >
            <Palette className="size-3.5 text-purple-400" />
            <span>Skin: {activeSkinObj.name}</span>
          </button>

          {/* Dance Button */}
          <button
            onClick={triggerDance}
            className={`px-3 py-1.5 rounded-full text-xs font-mono font-semibold backdrop-blur-md transition-all flex items-center gap-1.5 cursor-pointer active:scale-95 ${
              isDancing
                ? 'bg-emerald-500/25 border border-emerald-400 text-emerald-300 shadow-[0_0_12px_rgba(16,185,129,0.4)]'
                : 'bg-white/5 border border-white/15 text-slate-200 hover:text-white hover:border-emerald-400/50'
            }`}
            title="Beat Dance Groove (Key B)"
          >
            <Music className="size-3.5 text-emerald-400" />
            <span>{isDancing ? 'Grooving 🎶' : 'Beat Dance'}</span>
          </button>

          {/* Voice Input STT Listen */}
          <button
            onClick={() => {
              const listener = CyberBotVoiceListener.getInstance()
              if (listener.isSupported()) {
                listener.listen(
                  handleVoiceCommand,
                  (active) => setIsListening(active)
                )
              } else {
                setActiveMessage("Speech recognition not supported in this browser.")
                setBubbleVisible(true)
              }
            }}
            className={`px-3 py-1.5 rounded-full text-xs font-mono font-semibold backdrop-blur-md transition-all flex items-center gap-1.5 cursor-pointer active:scale-95 ${
              isListening
                ? 'bg-rose-500/25 border border-rose-400 text-rose-300 animate-pulse'
                : 'bg-white/5 border border-white/15 text-slate-200 hover:text-white hover:border-rose-400/50'
            }`}
            title="Voice Commands (Key V)"
          >
            <Mic className="size-3.5 text-rose-400" />
            <span>{isListening ? 'Listening...' : 'Voice Cmd'}</span>
          </button>

          {/* Telemetry Toggle */}
          <button
            onClick={() => setTelemetryOpen((v) => !v)}
            className={`px-3 py-1.5 rounded-full text-xs font-mono font-semibold backdrop-blur-md transition-all flex items-center gap-1.5 cursor-pointer active:scale-95 ${
              telemetryOpen
                ? 'bg-cyan-500/25 border border-cyan-400 text-cyan-300'
                : 'bg-white/5 border border-white/15 text-slate-200 hover:text-white hover:border-cyan-400/50'
            }`}
            title="Hardware Telemetry (Key H)"
          >
            <Activity className="size-3.5 text-cyan-400" />
            <span>Telemetry</span>
          </button>

          {/* Sound Toggle */}
          <button
            onClick={() => {
              const next = !isMuted
              setIsMuted(next)
              isMutedRef.current = next
              safeSetItem('cyberbot_muted', String(next))
              if (!next) playCyberChirp(600, 950)
            }}
            className={`px-3 py-1.5 rounded-full text-xs font-mono font-bold bg-[#120f1d]/90 border backdrop-blur-xl transition-all shadow-xl flex items-center gap-1.5 cursor-pointer ${
              isMuted
                ? 'border-white/10 text-slate-400 hover:text-white'
                : 'border-rose-500/40 text-rose-300 hover:border-rose-400'
            }`}
            title={isMuted ? 'Unmute Audio (Key M)' : 'Mute Audio (Key M)'}
          >
            {isMuted ? <VolumeX className="size-3.5" /> : <Volume2 className="size-3.5" />}
            <span>{isMuted ? 'Muted' : 'Audio On'}</span>
          </button>

          {/* Stunt Flip Button */}
          <button
            onClick={triggerFlip}
            className="px-3.5 py-1.5 rounded-full text-xs font-mono font-semibold bg-white/5 border border-white/15 text-slate-200 hover:text-white hover:border-purple-400/50 backdrop-blur-md transition-all flex items-center gap-1.5 cursor-pointer active:scale-95"
            title="360° Flip (Space)"
          >
            <RotateCw className="size-3.5 text-purple-400" />
            <span>360° Ion Flip</span>
          </button>

          {/* Next Tip Button */}
          <button
            onClick={nextVoiceLine}
            className="px-3.5 py-1.5 rounded-full text-xs font-mono font-semibold bg-white/5 border border-white/15 text-slate-200 hover:text-white hover:border-amber-400/50 backdrop-blur-md transition-all flex items-center gap-1.5 cursor-pointer active:scale-95"
            title="Next Tip (Key N)"
          >
            <Lightbulb className="size-3.5 text-amber-400" />
            <span>Next Tip</span>
          </button>
        </div>

        {/* Hotkey Helper Strip */}
        <div className="relative z-20 mt-3 flex flex-wrap justify-center items-center gap-2 text-[11px] font-mono text-slate-500">
          <span className="hidden sm:inline">Hotkeys:</span>
          <span className="px-1.5 py-0.5 rounded bg-white/5 border border-white/10 text-slate-400">Space: Flip</span>
          <span className="px-1.5 py-0.5 rounded bg-white/5 border border-white/10 text-slate-400">B: Dance</span>
          <span className="px-1.5 py-0.5 rounded bg-white/5 border border-white/10 text-slate-400">S: Skin</span>
          <span className="px-1.5 py-0.5 rounded bg-white/5 border border-white/10 text-slate-400">H: Telemetry</span>
          <span className="px-1.5 py-0.5 rounded bg-white/5 border border-white/10 text-slate-400">V: Voice Cmd</span>
          <span className="px-1.5 py-0.5 rounded bg-white/5 border border-white/10 text-slate-400">M: Mute</span>
          <span className="px-1.5 py-0.5 rounded bg-white/5 border border-white/10 text-slate-400">Esc: Close</span>
        </div>
      </main>

      {/* Footer Specs Strip */}
      <footer className="relative z-30 max-w-5xl w-full mx-auto px-4 py-6 border-t border-white/5 text-center sm:flex sm:items-center sm:justify-between text-xs text-slate-500 font-mono">
        <div>
          Three.js WebGL &middot; React Three Fiber &middot; Procedural 3D Mesh Animation
        </div>
        <div className="mt-2 sm:mt-0 flex items-center justify-center gap-4">
          <Link href="/performance" className="text-slate-400 hover:text-slate-200 transition-colors">
            Performance Metrics
          </Link>
          <span>&middot;</span>
          <Link href="/privacy" className="text-slate-400 hover:text-slate-200 transition-colors">
            Privacy
          </Link>
        </div>
      </footer>
    </div>
  )
}
