"use client"

import React, { useState, useEffect, useRef, useCallback, Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import CyberBotModel from './CyberBotModel'
import SpeechBubble from './SpeechBubble'
import CyberBotQuickDial from './CyberBotQuickDial'
import CyberBotTelemetryOverlay from './CyberBotTelemetryOverlay'
import { trackEvent } from '@/lib/analytics'
import { CyberBotSpeechEngine, stripEmojis } from '@/lib/companion/speech'
import { searchKnowledge, SUGGESTED_QUESTION_CHIPS } from '@/lib/companion/knowledge'
import { CyberBotVoiceListener, VoiceCommandResult } from '@/lib/companion/voice-recognition'
import { CyberBotSkinId, CYBERBOT_SKINS, getNextSkinId } from '@/lib/companion/skins'

function getTimeBasedGreeting(): string {
  const hour = new Date().getHours()
  if (hour >= 5 && hour < 12) return "Good morning! ☀️ I'm Durgesh's 3D AI companion. Welcome to the portfolio!"
  if (hour >= 12 && hour < 17) return "Good afternoon! ⚡ Exploring Durgesh's production AI architectures?"
  if (hour >= 17 && hour < 22) return "Good evening! 🌆 Check out the interactive 3D Neural Core & case studies!"
  return "Burning the midnight oil with AI? 🌙 Durgesh builds systems 24/7!"
}

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
  "🚀 Check out RoleRadar — an enterprise AI career intelligence platform evaluating 16 roles with multi-model scoring!",
  "🏋️ The AI Fitness Platform runs real-time MediaPipe pose detection under 50ms with live audio feedback!",
  "📊 MarketMatch-AI uses K-Means & DBSCAN clustering for customer segmentation & predictive retail intelligence.",
  "🎓 Durgesh is pursuing an MCA in AIML at Sri Balaji University, Pune (2025–2027)!",
  "☁️ Certified AWS Machine Learning Foundations & UNLOX® AI Fellow.",
  "🏆 Lead engineer in AI hackathons & developer of autonomous agent pipelines.",
  "⚡ 360° acrobatic ion flip! Click me again for another stunt!",
  "💡 Tip: You can drag me anywhere, or use the badge below to toggle Roam mode!",
  "🧪 CyberBot is an interactive 3D companion built with Three.js and React Three Fiber!",
]

const TOUR_LANDMARKS = [
  { id: 'hero', title: 'Mission Briefing', msg: "👋 Welcome! I'm CyberBot AI. Let me give you a quick guided tour of Durgesh's production portfolio!" },
  { id: 'featured-projects', title: 'Flagship Systems', msg: "🚀 Flagship: RoleRadar AI career intelligence platform evaluating 16 engineering roles with multi-model scoring!" },
  { id: 'projects', title: 'Engineering Catalog', msg: "📊 Real-time MediaPipe pose detection under 50ms, MarketMatch-AI clustering, and interactive 3D demos." },
  { id: 'experience', title: 'Track Record', msg: "💼 Proven experience in enterprise GenAI, autonomous agent swarms, and high-performance full-stack architectures." },
  { id: 'contact', title: 'Collaboration Portal', msg: "📬 You've completed the tour! Grab Durgesh's verified audit report or send a direct message below." }
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
  const [isIdle, setIsIdle] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const [voiceEnabled, setVoiceEnabled] = useState(false)
  const [isSpeaking, setIsSpeaking] = useState(false)
  const [tourActive, setTourActive] = useState(false)
  const [tourStep, setTourStep] = useState(0)

  // Ultimate features states
  const [skin, setSkin] = useState<CyberBotSkinId>('cobalt-prime')
  const [isDancing, setIsDancing] = useState(false)
  const [isListening, setIsListening] = useState(false)
  const [quickDialOpen, setQuickDialOpen] = useState(false)
  const [telemetryOpen, setTelemetryOpen] = useState(false)
  const [knowledgeAction, setKnowledgeAction] = useState<{ url: string; label: string } | null>(null)
  const [isBubbleHovered, setIsBubbleHovered] = useState(false)
  const [isInputFocused, setIsInputFocused] = useState(false)

  const isMutedRef = useRef(false)
  isMutedRef.current = isMuted
  const voiceEnabledRef = useRef(false)
  voiceEnabledRef.current = voiceEnabled
  const tourActiveRef = useRef(false)
  tourActiveRef.current = tourActive
  const tourStepRef = useRef(0)
  tourStepRef.current = tourStep
  const skinRef = useRef<CyberBotSkinId>('cobalt-prime')
  skinRef.current = skin
  const isHoveredRef = useRef(false)
  isHoveredRef.current = isHovered
  const isBubbleHoveredRef = useRef(false)
  isBubbleHoveredRef.current = isBubbleHovered
  const isInputFocusedRef = useRef(false)
  isInputFocusedRef.current = isInputFocused
  const quickDialOpenRef = useRef(false)
  quickDialOpenRef.current = quickDialOpen
  const telemetryOpenRef = useRef(false)
  telemetryOpenRef.current = telemetryOpen
  const dismissTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  const cancelDismissTimer = useCallback(() => {
    if (dismissTimeoutRef.current) {
      clearTimeout(dismissTimeoutRef.current)
      dismissTimeoutRef.current = null
    }
  }, [])

  const startDismissTimer = useCallback((delayMs = 8000) => {
    cancelDismissTimer()
    if (
      isHoveredRef.current ||
      isBubbleHoveredRef.current ||
      isInputFocusedRef.current ||
      tourActiveRef.current ||
      quickDialOpenRef.current ||
      telemetryOpenRef.current
    ) {
      return
    }
    dismissTimeoutRef.current = setTimeout(() => {
      if (
        !isHoveredRef.current &&
        !isBubbleHoveredRef.current &&
        !isInputFocusedRef.current &&
        !tourActiveRef.current &&
        !quickDialOpenRef.current &&
        !telemetryOpenRef.current
      ) {
        setBubbleVisible(false)
      }
    }, delayMs)
  }, [cancelDismissTimer])

  // Position in viewport pixels
  const posRef = useRef({ x: 0, y: 0 })
  const targetRef = useRef({ x: 0, y: 0 })
  const mouseScreenRef = useRef({ x: 0, y: 0 })
  const containerRef = useRef<HTMLDivElement>(null)
  const animFrameRef = useRef<number | null>(null)
  const dragOffsetRef = useRef({ x: 0, y: 0 })
  const audioCtxRef = useRef<AudioContext | null>(null)

  // Audio synthesis helper with singleton AudioContext
  const getAudioContext = useCallback((): AudioContext | null => {
    try {
      if (!audioCtxRef.current) {
        const AudioCtx = window.AudioContext || (window as any).webkitAudioContext
        if (AudioCtx) {
          audioCtxRef.current = new AudioCtx()
        }
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

  // Acrobatic Ion Flip 800ms procedural sine sweep (520Hz -> 880Hz -> 1300Hz)
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

  // Procedural 8-bit chip dance groove melody
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

  // Synthetic Voice Output with Jarvis Mode Synchronization
  const speakVoiceLine = useCallback((text: string) => {
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

  // Execute stunt flip
  const triggerFlip = useCallback(() => {
    setIsSpinning(true)
    setMood('stunt')
    playStuntChirp()
    setTimeout(() => {
      setMood('happy')
    }, 950)
  }, [playStuntChirp])

  // Execute beat dance
  const triggerDance = useCallback(() => {
    setIsDancing(true)
    setMood('happy')
    playDanceGroove()
    const danceMsg = "Let's groove! 🎶 Engineering is precision, art, and rhythm!"
    setActiveMessage(danceMsg)
    setBubbleVisible(true)
    speakVoiceLine(danceMsg)
    setTimeout(() => {
      setIsDancing(false)
    }, 8500)
  }, [playDanceGroove, speakVoiceLine])

  // Cycle chassis skin
  const cycleSkin = useCallback(() => {
    const next = getNextSkinId(skinRef.current)
    setSkin(next)
    skinRef.current = next
    safeSetItem('cyberbot_skin', next)
    playCyberChirp(600, 1050)
    const skinName = CYBERBOT_SKINS[next].name
    setActiveMessage(`Chassis skin switched to ${skinName}! ✨`)
    setBubbleVisible(true)
    speakVoiceLine(`Skin switched to ${skinName}`)
  }, [playCyberChirp, speakVoiceLine])

  // Recruiter Guided Tour Step Advancement
  const advanceTour = useCallback((stepIdx?: number) => {
    const currentStep = stepIdx ?? (tourStepRef.current + 1)
    if (currentStep >= TOUR_LANDMARKS.length) {
      setTourActive(false)
      tourActiveRef.current = false
      setTourStep(0)
      tourStepRef.current = 0
      setActiveMessage("🎉 Tour complete! Feel free to explore freely or grab Durgesh's resume.")
      setBubbleVisible(true)
      playCyberChirp(600, 1100)
      speakVoiceLine("Tour complete! Feel free to explore freely.")
      trackEvent('cyberbot_tour', { action: 'complete' })
      return
    }

    setTourActive(true)
    tourActiveRef.current = true
    setTourStep(currentStep)
    tourStepRef.current = currentStep

    const landmark = TOUR_LANDMARKS[currentStep]
    const targetEl = document.getElementById(landmark.id)
    if (targetEl) {
      targetEl.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }

    setActiveMessage(landmark.msg)
    setBubbleVisible(true)
    triggerFlip()
    speakVoiceLine(landmark.msg)
    trackEvent('cyberbot_tour', { action: 'step', landmark: landmark.id, step: currentStep })
  }, [playCyberChirp, speakVoiceLine, triggerFlip])

  const stopTour = useCallback(() => {
    if (!tourActiveRef.current) return
    setTourActive(false)
    tourActiveRef.current = false
    setTourStep(0)
    tourStepRef.current = 0
    CyberBotSpeechEngine.getInstance().cancel()
    setIsSpeaking(false)
    setActiveMessage("Tour paused. Let me know if you need anything! 🤖")
    playCyberChirp(480, 600)
  }, [playCyberChirp])

  // Semantic Q&A Search Handler
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
      speakVoiceLine(result.answer)
      playCyberChirp(600, 1000)
    } else {
      const fallback = "I couldn't find an exact match, but Durgesh specializes in AI/ML, autonomous agents, and Next.js! Check out RoleRadar or his resume below."
      setActiveMessage(fallback)
      setKnowledgeAction({ url: '/resume', label: 'View Verified Resume 📄' })
      setBubbleVisible(true)
      speakVoiceLine(fallback)
      playCyberChirp(480, 650)
    }
  }, [playCyberChirp, speakVoiceLine, triggerFlip])

  // Voice Command Handler
  const handleVoiceCommand = useCallback((result: VoiceCommandResult) => {
    playCyberChirp(550, 950)
    switch (result.action) {
      case 'flip':
        triggerFlip()
        break
      case 'projects':
        const el = document.getElementById('projects') || document.getElementById('featured-projects')
        if (el) el.scrollIntoView({ behavior: 'smooth' })
        setActiveMessage("Navigating to flagship production projects! 🚀")
        setBubbleVisible(true)
        speakVoiceLine("Navigating to projects")
        break
      case 'tour':
        advanceTour(0)
        break
      case 'resume':
        const link = document.createElement('a')
        link.href = '/resume.pdf'
        link.download = 'Durgesh_Sinha_Resume_2026.pdf'
        link.target = '_blank'
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
        setActiveMessage("Downloading Durgesh's 1-page verified resume! 📄")
        setBubbleVisible(true)
        speakVoiceLine("Downloading verified resume")
        break
      case 'contact':
        const contactEl = document.getElementById('contact')
        if (contactEl) contactEl.scrollIntoView({ behavior: 'smooth' })
        setActiveMessage("Opening contact portal. Send Durgesh a direct message! 📬")
        setBubbleVisible(true)
        speakVoiceLine("Opening contact portal")
        break
      case 'mute':
        const nextMute = !isMutedRef.current
        setIsMuted(nextMute)
        isMutedRef.current = nextMute
        safeSetItem('cyberbot_muted', String(nextMute))
        setActiveMessage(nextMute ? "Audio muted 🔕" : "Audio active 🔊")
        setBubbleVisible(true)
        break
      case 'voice':
        const nextVoice = !voiceEnabledRef.current
        setVoiceEnabled(nextVoice)
        voiceEnabledRef.current = nextVoice
        safeSetItem('cyberbot_voice_enabled', String(nextVoice))
        setActiveMessage(nextVoice ? "Voice synthesis active 🎙️" : "Voice synthesis off 🔇")
        setBubbleVisible(true)
        break
      case 'skin':
        cycleSkin()
        break
      case 'dance':
        triggerDance()
        break
      case 'query':
        if (result.matchedQuery) {
          handleAskQuestion(result.matchedQuery)
        }
        break
    }
  }, [advanceTour, cycleSkin, handleAskQuestion, playCyberChirp, speakVoiceLine, triggerDance, triggerFlip])

  // Center summon
  const summonBotToCenter = useCallback(() => {
    setMode('roam')
    setBubbleVisible(true)
    triggerFlip()
    const greeting = "Hey there! 🤖 I'm CyberBot AI. I'm right here with you! Press Alt+T for a tour, ask me anything, or press B to dance!"
    setActiveMessage(greeting)
    speakVoiceLine(greeting)

    const width = window.innerWidth
    const height = window.innerHeight
    const botW = width < 768 ? 150 : 176
    const botH = width < 768 ? 190 : 224
    const centerX = Math.max(16, (width - botW) / 2)
    const centerY = Math.max(80, (height - botH) / 2)
    posRef.current = { x: centerX, y: centerY }
    targetRef.current = { x: centerX, y: centerY }
    if (containerRef.current) {
      containerRef.current.style.transform = `translate3d(${centerX}px, ${centerY}px, 0)`
      containerRef.current.focus()
    }
  }, [speakVoiceLine, triggerFlip])

  useEffect(() => {
    setMounted(true)
    if (typeof window !== 'undefined') {
      const isMobile = window.innerWidth < 768
      if (isMobile) {
        setBubbleVisible(false)
      }
      // Set dynamic time-of-day greeting
      const greeting = getTimeBasedGreeting()
      setActiveMessage(greeting)

      // Start docked in bottom-right corner with safe responsive margins
      const botW = isMobile ? 150 : 176
      const botH = isMobile ? 190 : 224
      const startX = Math.max(16, window.innerWidth - botW - 16)
      const startY = Math.max(70, window.innerHeight - botH - (isMobile ? 70 : 30))
      posRef.current = { x: startX, y: startY }
      targetRef.current = { x: startX, y: startY }
      if (containerRef.current) {
        containerRef.current.style.transform = `translate3d(${startX}px, ${startY}px, 0)`
      }
      setBubbleAlign('left')

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
    }

    // Global listener for summon button in Hero or Navbar
    const handleSummon = () => {
      summonBotToCenter()
    }
    window.addEventListener('summon-cyberbot', handleSummon)

    // Keep initial greeting visible on desktop
    const isMobileViewport = typeof window !== 'undefined' && window.innerWidth < 768
    if (!isMobileViewport) {
      startDismissTimer(10000)
    }

    // Real-Time Section Scroll Spy
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
    let ticking = false

    const handleSectionScroll = () => {
      if (tourActiveRef.current) return
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
                setKnowledgeAction(null)
                setBubbleVisible(true)
                playCyberChirp(580, 850)
                speakVoiceLine(msg)
                startDismissTimer(8500)
              }
              break
            }
          }
        }
      })
    }

    window.addEventListener('scroll', handleSectionScroll, { passive: true })

    // Global Hotkey Suite
    const handleGlobalKeyDown = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement | null
      const isInput = target && (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.isContentEditable)

      if (e.altKey && (e.key === 'c' || e.key === 'C')) {
        e.preventDefault()
        summonBotToCenter()
        return
      }

      if (e.altKey && (e.key === 't' || e.key === 'T')) {
        e.preventDefault()
        advanceTour(tourActiveRef.current ? tourStepRef.current + 1 : 0)
        return
      }

      if (e.key === 'Escape') {
        if (quickDialOpen) setQuickDialOpen(false)
        if (telemetryOpen) setTelemetryOpen(false)
        if (tourActiveRef.current) stopTour()
        else {
          setBubbleVisible(false)
          CyberBotSpeechEngine.getInstance().cancel()
          setIsSpeaking(false)
        }
      }

      if (!isInput && containerRef.current && document.activeElement === containerRef.current) {
        if (e.key === ' ' || e.key === 'Enter') {
          e.preventDefault()
          triggerFlip()
          const nextIndex = (voiceIndex + 1) % CYBERBOT_VOICELINES.length
          setVoiceIndex(nextIndex)
          setActiveMessage(CYBERBOT_VOICELINES[nextIndex])
          setKnowledgeAction(null)
          setBubbleVisible(true)
          speakVoiceLine(CYBERBOT_VOICELINES[nextIndex])
        } else if (e.key === 'b' || e.key === 'B') {
          e.preventDefault()
          triggerDance()
        } else if (e.key === 'q' || e.key === 'Q') {
          e.preventDefault()
          setQuickDialOpen((v) => !v)
        } else if (e.key === 'h' || e.key === 'H') {
          e.preventDefault()
          setTelemetryOpen((v) => !v)
        } else if (e.key === 's' || e.key === 'S') {
          e.preventDefault()
          cycleSkin()
        } else if (e.key === 'd' || e.key === 'D') {
          e.preventDefault()
          setMode((m) => (m === 'dock' ? 'roam' : m === 'roam' ? 'follow' : 'dock'))
          playCyberChirp(550, 750)
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
          } else {
            setActiveMessage("Voice recognition is not supported in this browser. Try Chrome, Edge, or Safari, or use the search bar!")
            setBubbleVisible(true)
            playCyberChirp(480, 650)
          }
        } else if (e.key === 't' || e.key === 'T') {
          e.preventDefault()
          advanceTour(tourActiveRef.current ? tourStepRef.current + 1 : 0)
        }
      }
    }

    window.addEventListener('keydown', handleGlobalKeyDown)

    // Tap / Click outside to dismiss bubble, quick-dial, or telemetry
    const handleGlobalPointerDown = (e: PointerEvent) => {
      if (!containerRef.current) return
      const target = e.target as Node | null
      if (target && !containerRef.current.contains(target)) {
        if (!tourActiveRef.current) {
          setBubbleVisible(false)
          setQuickDialOpen(false)
          setTelemetryOpen(false)
          cancelDismissTimer()
        }
      }
    }

    window.addEventListener('pointerdown', handleGlobalPointerDown)

    return () => {
      cancelDismissTimer()
      window.removeEventListener('pointerdown', handleGlobalPointerDown)
      window.removeEventListener('scroll', handleSectionScroll)
      window.removeEventListener('summon-cyberbot', handleSummon)
      window.removeEventListener('keydown', handleGlobalKeyDown)
      CyberBotSpeechEngine.getInstance().cancel()
      CyberBotVoiceListener.getInstance().stop()
      if (audioCtxRef.current) {
        audioCtxRef.current.close().catch(() => {})
        audioCtxRef.current = null
      }
    }
  }, [
    advanceTour,
    cancelDismissTimer,
    cycleSkin,
    handleVoiceCommand,
    playCyberChirp,
    quickDialOpen,
    speakVoiceLine,
    startDismissTimer,
    stopTour,
    summonBotToCenter,
    telemetryOpen,
    triggerDance,
    triggerFlip,
    voiceIndex,
  ])

  // Global mouse tracking
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseScreenRef.current = { x: e.clientX, y: e.clientY }

      if (isDragging) {
        if (tourActiveRef.current) stopTour()
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
  }, [isDragging, playCyberChirp, stopTour])

  // Inactivity tracking
  useEffect(() => {
    let idleTimer: NodeJS.Timeout | null = null

    const resetIdleTimer = () => {
      setIsIdle(false)
      if (idleTimer) clearTimeout(idleTimer)
      idleTimer = setTimeout(() => {
        setIsIdle(true)
      }, 5000)
    }

    resetIdleTimer()
    const events = ['pointermove', 'pointerdown', 'wheel', 'keydown', 'scroll', 'touchstart']
    events.forEach((ev) => window.addEventListener(ev, resetIdleTimer, { passive: true }))

    return () => {
      if (idleTimer) clearTimeout(idleTimer)
      events.forEach((ev) => window.removeEventListener(ev, resetIdleTimer))
    }
  }, [])

  // Physics & Roaming Loop
  useEffect(() => {
    if (!mounted) return

    let lastWaypointTime = performance.now()
    let spinStart: number | null = null
    let isSleeping = false

    const wakeUp = () => {
      if (isSleeping) {
        isSleeping = false
        if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current)
        animFrameRef.current = requestAnimationFrame(updateMotion)
      }
    }

    const wakeEvents = ['pointermove', 'pointerdown', 'wheel', 'keydown', 'scroll', 'touchstart']
    wakeEvents.forEach((ev) => window.addEventListener(ev, wakeUp, { passive: true }))

    const updateMotion = (now: number) => {
      const width = window.innerWidth
      const height = window.innerHeight
      const isMobile = width < 768
      const botW = isMobile ? 150 : 176
      const botH = isMobile ? 190 : 224
      const safeMinX = 16
      const safeMaxX = Math.max(safeMinX, width - botW - 16)
      const safeMinY = 70
      const safeMaxY = Math.max(safeMinY, height - botH - (isMobile ? 70 : 30))

      if (!isDragging) {
        if (mode === 'dock') {
          const targetX = safeMaxX
          const targetY = safeMaxY
          posRef.current.x += (targetX - posRef.current.x) * 0.12
          posRef.current.y += (targetY - posRef.current.y) * 0.12
        } else if (mode === 'roam' && !isHovered) {
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
          const targetX = Math.max(safeMinX, Math.min(safeMaxX, mouseScreenRef.current.x + 60))
          const targetY = Math.max(safeMinY, Math.min(safeMaxY, mouseScreenRef.current.y - 120))
          posRef.current.x += (targetX - posRef.current.x) * 0.04
          posRef.current.y += (targetY - posRef.current.y) * 0.04
        }
      }

      if (posRef.current.x > width - 360) {
        setBubbleAlign('left')
      } else if (posRef.current.x < 320) {
        setBubbleAlign('right')
      } else {
        setBubbleAlign('center')
      }

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

      if (containerRef.current) {
        containerRef.current.style.transform = `translate3d(${posRef.current.x}px, ${posRef.current.y}px, 0)`
      }

      if (!isHovered && !isSpinning && !isDragging && !isDancing) {
        const settled =
          Math.abs(safeMaxX - posRef.current.x) < 0.2 && Math.abs(safeMaxY - posRef.current.y) < 0.2
        if ((mode === 'dock' && settled) || isIdle) {
          isSleeping = true
          return
        }
      }

      animFrameRef.current = requestAnimationFrame(updateMotion)
    }

    animFrameRef.current = requestAnimationFrame(updateMotion)
    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current)
      wakeEvents.forEach((ev) => window.removeEventListener(ev, wakeUp))
    }
  }, [mounted, isHovered, isSpinning, mode, isDragging, isIdle, isDancing])

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation()
    triggerFlip()

    const nextIndex = (voiceIndex + 1) % CYBERBOT_VOICELINES.length
    setVoiceIndex(nextIndex)
    setActiveMessage(CYBERBOT_VOICELINES[nextIndex])
    setKnowledgeAction(null)
    setBubbleVisible(true)
    speakVoiceLine(CYBERBOT_VOICELINES[nextIndex])
    trackEvent('cyberbot_interact', { action: 'stunt_spin', line_index: nextIndex })
  }

  const handleMouseEnter = () => {
    setIsHovered(true)
    isHoveredRef.current = true
    setMood('happy')
    setBubbleVisible(true)
    cancelDismissTimer()
    playCyberChirp(700, 950)
  }

  const handleMouseLeave = () => {
    if (!isDragging) {
      setIsHovered(false)
      isHoveredRef.current = false
      setMood('normal')
      startDismissTimer(8000)
    }
  }

  const handleBubbleMouseEnter = useCallback(() => {
    setIsBubbleHovered(true)
    isBubbleHoveredRef.current = true
    cancelDismissTimer()
  }, [cancelDismissTimer])

  const handleBubbleMouseLeave = useCallback(() => {
    setIsBubbleHovered(false)
    isBubbleHoveredRef.current = false
    startDismissTimer(8000)
  }, [startDismissTimer])

  const handleInputFocusChange = useCallback((focused: boolean) => {
    setIsInputFocused(focused)
    isInputFocusedRef.current = focused
    if (focused) {
      cancelDismissTimer()
    } else {
      startDismissTimer(8000)
    }
  }, [cancelDismissTimer, startDismissTimer])

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
      triggerFlip()
    } else if (action === 'quick-dial') {
      setQuickDialOpen((v) => !v)
    } else if (action === 'tour-start' || action === 'tour-next') {
      advanceTour(tourActive ? tourStep + 1 : 0)
    } else if (action === 'tour-stop') {
      stopTour()
    } else if (action === 'dance') {
      triggerDance()
    }
  }

  if (!mounted) return null

  const relativeMouse = {
    x: (mouseScreenRef.current.x - posRef.current.x) / window.innerWidth,
    y: (mouseScreenRef.current.y - posRef.current.y) / window.innerHeight,
  }

  const currentTourStatus = tourActive
    ? {
        current: tourStep + 1,
        total: TOUR_LANDMARKS.length,
        title: TOUR_LANDMARKS[tourStep]?.title ?? 'Recruiter Tour',
      }
    : null

  const activeSkinObj = CYBERBOT_SKINS[skin]

  return (
    <div className="fixed inset-0 pointer-events-none z-40 block">
      {/* 3D CyberBot Floating Anchor */}
      <div
        ref={containerRef}
        tabIndex={0}
        role="region"
        aria-label="CyberBot 3D AI Companion. Hotkeys: Space to flip, B to dance, Q for quick-dial, H for telemetry, S to change skin, V to speak, Escape to close."
        className="absolute top-0 left-0 w-44 h-56 select-none will-change-transform rounded-3xl outline-none focus-visible:ring-2 focus-visible:ring-[#f59e0b] focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
        style={{ touchAction: 'none' }}
      >
        {/* Quick Chat Callout Badge (visible when bubble is dismissed) */}
        {!bubbleVisible && !quickDialOpen && !telemetryOpen && (
          <div className="absolute -top-7 left-1/2 -translate-x-1/2 whitespace-nowrap pointer-events-auto">
            <button
              onClick={(e) => {
                e.stopPropagation()
                setBubbleVisible(true)
                playCyberChirp(600, 1000)
                speakVoiceLine(activeMessage)
              }}
              className={`px-3 py-1 rounded-full text-[11px] font-mono font-semibold ${activeSkinObj.badgeBg} border ${activeSkinObj.accentBorder} ${activeSkinObj.badgeText} shadow-[0_0_15px_rgba(245,158,11,0.3)] backdrop-blur-xl transition-all flex items-center gap-2 active:scale-95`}
              title="CyberBot AI Companion (Press Alt+C to summon)"
            >
              <span className="w-2 h-2 rounded-full bg-[#c084fc] shadow-[0_0_8px_#c084fc] animate-pulse" />
              <span>💬 CyberBot AI</span>
            </button>
          </div>
        )}

        {/* Quick Dial Drawer */}
        <CyberBotQuickDial
          visible={quickDialOpen}
          onClose={() => setQuickDialOpen(false)}
          onStartTour={() => advanceTour(0)}
          onPlayChime={playCyberChirp}
        />

        {/* Telemetry Overlay */}
        <CyberBotTelemetryOverlay
          visible={telemetryOpen}
          onClose={() => setTelemetryOpen(false)}
        />

        {/* Adaptive Speech Bubble with Q&A and Voice Recognition */}
        <SpeechBubble
          message={activeMessage}
          visible={bubbleVisible && !quickDialOpen && !telemetryOpen}
          align={bubbleAlign}
          tourStatus={currentTourStatus}
          knowledgeAction={knowledgeAction}
          isListening={isListening}
          suggestedChips={SUGGESTED_QUESTION_CHIPS}
          onSelectChip={(chip) => handleAskQuestion(chip)}
          onAskQuestion={(q) => handleAskQuestion(q)}
          onAction={handleBubbleAction}
          onMouseEnter={handleBubbleMouseEnter}
          onMouseLeave={handleBubbleMouseLeave}
          onInputFocusChange={handleInputFocusChange}
          onDismiss={() => {
            if (tourActive) stopTour()
            cancelDismissTimer()
            setBubbleVisible(false)
            CyberBotSpeechEngine.getInstance().cancel()
            setIsSpeaking(false)
          }}
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
              : isSpeaking || isDancing
              ? 'drop-shadow-[0_0_30px_rgba(245,158,11,0.6)] scale-102'
              : 'drop-shadow-[0_0_20px_rgba(168,85,247,0.4)]'
          }`}
          title="Click to flip! Double-click or press B to dance! Drag to move."
        >
          {/* Holographic Pulse Aura on Hover or Speaking */}
          {(isHovered || isSpeaking || isDancing) && (
            <div
              className={`absolute inset-x-2 bottom-0 h-16 rounded-full border ${
                isDancing
                  ? 'border-emerald-400/70'
                  : isSpeaking
                  ? 'border-amber-400/60'
                  : 'border-purple-400/50'
              } animate-ping pointer-events-none opacity-40`}
            />
          )}

          <Canvas
            aria-hidden="true"
            camera={{ position: [0, 0, 3.2], fov: 45 }}
            dpr={[1, 1.5]}
            gl={{ alpha: true, antialias: true, powerPreference: 'high-performance' }}
            frameloop={
              isIdle && !isHovered && !isSpinning && !isDragging && !isSpeaking && !isDancing
                ? 'demand'
                : 'always'
            }
            className="w-full h-full"
          >
            <Suspense fallback={null}>
              <CyberBotModel
                isHovered={isHovered}
                isSpinning={isSpinning}
                spinProgress={spinProgress}
                mousePos={relativeMouse}
                mood={mood}
                isSpeaking={isSpeaking}
                isDancing={isDancing}
                skin={skin}
              />
            </Suspense>
          </Canvas>

          {/* Mini Interactive Mode & Audio Controls Pill */}
          <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 whitespace-nowrap pointer-events-auto flex items-center gap-1">
            {/* Quick-Dial Drawer Trigger */}
            <button
              onClick={(e) => {
                e.stopPropagation()
                setQuickDialOpen((v) => !v)
                playCyberChirp(650, 950)
              }}
              className={`px-2 py-1 rounded-full text-[10px] font-mono font-bold backdrop-blur-xl transition-all shadow-xl flex items-center gap-1 cursor-pointer ${
                quickDialOpen
                  ? 'bg-emerald-500/25 border border-emerald-400 text-emerald-300'
                  : 'bg-slate-950/90 border border-white/10 text-slate-300 hover:text-emerald-300'
              }`}
              title="Recruiter Quick-Dial (Key Q)"
            >
              <span>⚡</span>
            </button>

            {/* Voice Recognition Push-to-Talk */}
            <button
              onClick={(e) => {
                e.stopPropagation()
                const listener = CyberBotVoiceListener.getInstance()
                if (listener.isSupported()) {
                  listener.listen(
                    handleVoiceCommand,
                    (active) => setIsListening(active)
                  )
                } else {
                  setActiveMessage("Voice recognition is not supported in this browser. Try Chrome, Edge, or Safari, or use the search bar!")
                  setBubbleVisible(true)
                  playCyberChirp(480, 650)
                }
              }}
              className={`px-2 py-1 rounded-full text-[10px] font-mono font-bold backdrop-blur-xl transition-all shadow-xl flex items-center gap-1 cursor-pointer ${
                isListening
                  ? 'bg-rose-500/25 border border-rose-400 text-rose-300 animate-pulse'
                  : 'bg-slate-950/90 border border-white/10 text-slate-300 hover:text-rose-300'
              }`}
              title="Voice Commands (Key V)"
            >
              <span>🎤</span>
            </button>

            {/* Recruiter Guided Tour Button */}
            <button
              onClick={(e) => {
                e.stopPropagation()
                advanceTour(tourActive ? tourStep + 1 : 0)
              }}
              className={`px-2 py-1 rounded-full text-[10px] font-mono font-bold backdrop-blur-xl transition-all shadow-xl flex items-center gap-1 cursor-pointer ${
                tourActive
                  ? 'bg-amber-500/20 border border-amber-400 text-amber-300 shadow-[0_0_10px_rgba(245,158,11,0.4)]'
                  : 'bg-slate-950/90 border border-border-strong text-muted-foreground hover:text-amber-300'
              }`}
              title="Recruiter Guided Tour (Alt+T or Key T)"
            >
              <span>🧭</span>
              <span className="hidden sm:inline">
                {tourActive ? `${tourStep + 1}/${TOUR_LANDMARKS.length}` : 'Tour'}
              </span>
            </button>

            {/* Skin Cycle Button */}
            <button
              onClick={(e) => {
                e.stopPropagation()
                cycleSkin()
              }}
              className="px-2 py-1 rounded-full text-[10px] font-mono font-bold bg-slate-950/90 border border-white/10 text-slate-300 hover:text-purple-300 backdrop-blur-xl transition-all shadow-xl flex items-center gap-1 cursor-pointer"
              title="Change Chassis Skin (Key S)"
            >
              <span>🎨</span>
            </button>

            {/* Telemetry HUD Toggle */}
            <button
              onClick={(e) => {
                e.stopPropagation()
                setTelemetryOpen((v) => !v)
              }}
              className={`px-2 py-1 rounded-full text-[10px] font-mono font-bold backdrop-blur-xl transition-all shadow-xl flex items-center gap-1 cursor-pointer ${
                telemetryOpen
                  ? 'bg-cyan-500/25 border border-cyan-400 text-cyan-300'
                  : 'bg-slate-950/90 border border-white/10 text-slate-300 hover:text-cyan-300'
              }`}
              title="Hardware Telemetry (Key H)"
            >
              <span>📊</span>
            </button>

            {/* Audio Mute / Unmute Toggle */}
            <button
              onClick={(e) => {
                e.stopPropagation()
                const next = !isMuted
                setIsMuted(next)
                isMutedRef.current = next
                safeSetItem('cyberbot_muted', String(next))
                if (!next) {
                  playCyberChirp(600, 950)
                }
              }}
              className={`px-2 py-1 rounded-full text-[10px] font-mono font-bold bg-slate-950/90 border backdrop-blur-xl transition-all shadow-xl flex items-center gap-1 cursor-pointer ${
                isMuted
                  ? 'border-border-strong text-muted-foreground hover:text-body'
                  : 'border-rose-500/40 text-secondary hover:border-rose-400 shadow-black/20'
              }`}
              title={isMuted ? 'CyberBot Audio Muted (Key M)' : 'CyberBot Audio Active (Key M)'}
            >
              <span>{isMuted ? '🔕' : '🔊'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
