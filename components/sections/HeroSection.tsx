"use client"
import { useState, useRef, useEffect } from 'react'
import dynamic from 'next/dynamic'
import { motion, AnimatePresence } from 'framer-motion'
import { Sparkles } from 'lucide-react'
import { TypeAnimation } from 'react-type-animation'
import { OWNER } from '@/lib/data'
import { trackEvent } from '@/lib/analytics'

const AICoreScene = dynamic(() => import('@/components/3d/AICoreScene'), {
  ssr: false,
  loading: () => null,
})

export default function HeroSection() {
  const [showResumeTooltip, setShowResumeTooltip] = useState(false)
  const resumeTimerRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    return () => {
      if (resumeTimerRef.current) clearTimeout(resumeTimerRef.current)
    }
  }, [])

  return (
    <section id="hero" className="relative h-screen w-full flex items-center justify-center overflow-hidden">
      {/* 3D Holographic AI Neural Core Scene */}
      <div className="pointer-events-none absolute inset-0 z-0">
        <AICoreScene />
      </div>

      {/* Gradient overlays with pointer-events-none */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-[var(--hero-fade)] to-[var(--bg-primary)] z-10" />
      <div className="pointer-events-none absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#a855f7]/15 rounded-full blur-[120px] z-10" />
      <div className="pointer-events-none absolute top-1/2 left-1/4 w-[300px] h-[300px] bg-[#f43f5e]/15 rounded-full blur-[100px] z-10" />

      {/* Interactive Content */}
      <div className="relative z-20 text-center px-6 max-w-4xl mx-auto pointer-events-auto">
        <div className="inline-block px-4 py-1.5 rounded-full border border-purple-500/40 text-purple-300 text-sm mb-6 glass">
          👋 Welcome to my portfolio
        </div>
        <h1 className="text-5xl md:text-7xl font-bold mb-4 leading-tight">
          <span className="gradient-text">{OWNER.name}</span>
        </h1>
        <div className="text-xl md:text-2xl text-slate-300 mb-8 h-10">
          <TypeAnimation
            sequence={[
              'AIML Engineer 🤖', 2000,
              'Full-Stack Developer 💻', 2000,
              'AI Automation Builder ⚡', 2000,
              'Prompt Engineer 🧠', 2000,
              'Autonomous Systems Dev 🚀', 2000,
            ]}
            repeat={Infinity}
            wrapper="span"
          />
        </div>
        <p className="text-slate-400 text-lg max-w-2xl mx-auto mb-10 leading-relaxed">{OWNER.bio}</p>
        <div className="flex flex-wrap gap-4 justify-center">
          <a
            href="#projects"
            onClick={() => trackEvent('contact_click', { button: 'view_projects_hero' })}
            className="px-8 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-rose-500 text-white font-semibold hover:opacity-90 transition-all glow-purple cursor-pointer focus-visible:ring-2 focus-visible:ring-purple-400 shadow-lg shadow-purple-500/20"
          >
            View Projects
          </a>
          {/* Disabled Resume CTA - Marked as Upcoming Feature */}
          <div className="relative inline-block">
            <button
              type="button"
              onClick={() => {
                setShowResumeTooltip(true)
                trackEvent('theme_toggle', { status: 'resume_upcoming_feature' })
                if (resumeTimerRef.current) clearTimeout(resumeTimerRef.current)
                resumeTimerRef.current = setTimeout(() => setShowResumeTooltip(false), 3200)
              }}
              onMouseEnter={() => setShowResumeTooltip(true)}
              onMouseLeave={() => setShowResumeTooltip(false)}
              className="px-6 sm:px-8 py-3 rounded-xl glass border border-rose-500/30 text-rose-300/80 font-semibold transition-all inline-flex items-center gap-2 shadow-lg shadow-rose-500/10 cursor-not-allowed opacity-85 hover:border-rose-400/50"
              title="Interactive Resume Viewer is an upcoming feature"
            >
              <span>Resume</span>
              <span className="text-[10px] font-mono bg-purple-500/20 text-rose-300 px-2 py-0.5 rounded-full border border-purple-500/30 flex items-center gap-1 uppercase tracking-wider font-bold">
                <Sparkles className="size-2.5 text-rose-400 animate-pulse" />
                Upcoming
              </span>
            </button>

            <AnimatePresence>
              {showResumeTooltip && (
                <motion.div
                  initial={{ opacity: 0, y: 6, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 4, scale: 0.95 }}
                  transition={{ duration: 0.18 }}
                  className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 z-50 w-64 p-2.5 rounded-xl glass border border-purple-500/40 bg-slate-950/95 shadow-xl shadow-purple-500/25 text-center pointer-events-none"
                >
                  <div className="flex items-center justify-center gap-1.5 mb-1">
                    <Sparkles className="size-3 text-rose-400" />
                    <span className="text-[10px] font-mono font-bold tracking-wider text-rose-300 uppercase">
                      Upcoming Feature
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-200 leading-tight">
                    Interactive 3D Resume Viewer &amp; live ATS matrix coming in v2.0!
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          <a
            href="#contact"
            onClick={() => trackEvent('contact_click', { button: 'contact_me_hero' })}
            className="px-8 py-3 rounded-xl glass border border-purple-500/40 text-purple-300 font-semibold hover:bg-purple-500/10 transition-all cursor-pointer focus-visible:ring-2 focus-visible:ring-purple-400"
          >
            Contact Me
          </a>
          <a
            href={OWNER.github}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackEvent('github_click', { source: 'hero_cta' })}
            className="px-8 py-3 rounded-xl glass border border-slate-500/40 text-slate-300 font-semibold hover:border-purple-400/50 transition-all cursor-pointer focus-visible:ring-2 focus-visible:ring-slate-300"
          >
            GitHub ↗
          </a>
        </div>

        {/* Scroll indicator */}
        <div className="pointer-events-none absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-slate-500">
          <span className="text-xs">Scroll to explore</span>
          <div className="w-px h-12 bg-gradient-to-b from-purple-500 to-transparent animate-pulse" />
        </div>
      </div>
    </section>
  )
}
