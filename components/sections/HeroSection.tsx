'use client'

import React, { useRef, useEffect } from 'react'
import Link from 'next/link'
import { FileText, Download, Sparkles, ArrowRight, Github, Mail, Zap } from 'lucide-react'
import { TypeAnimation } from 'react-type-animation'
import { OWNER } from '@/lib/data'
import { trackEvent } from '@/lib/analytics'
import { getSavedPerformanceMode, savePerformanceMode, PerformanceMode } from '@/lib/performance'
import { useSwissStudio } from '@/components/3d/swiss-hero/SwissUniversalBackground'
import { SwissTypography } from '@/components/3d/swiss-hero/SwissTypography'
import { SwissTelemetryHUD } from '@/components/3d/swiss-hero/SwissTelemetryHUD'
import { SwissStudioControls } from '@/components/3d/swiss-hero/SwissStudioControls'
import { TimelineScrubber } from '@/components/3d/swiss-hero/TimelineScrubber'
import { ProjectedCallouts } from '@/components/3d/swiss-hero/ProjectedCallouts'
import { useExplodedChoreography } from '@/components/3d/swiss-hero/useExplodedChoreography'

export default function HeroSection() {
  const heroRef = useRef<HTMLElement>(null)
  const [perfMode, setPerfMode] = React.useState<PerformanceMode>('immersive')
  const {
    studioTheme,
    setStudioTheme,
    isXRay,
    setIsXRay,
    setExplodeProgress: setGlobalExplodeProgress,
  } = useSwissStudio()

  const { progress, onScrubChange } = useExplodedChoreography(heroRef)

  // Sync local choreography progress with global studio background
  useEffect(() => {
    setGlobalExplodeProgress(progress)
  }, [progress, setGlobalExplodeProgress])

  useEffect(() => {
    setPerfMode(getSavedPerformanceMode())
    const handleModeChange = (e: Event) => {
      const customEvent = e as CustomEvent<PerformanceMode>
      if (customEvent.detail) {
        setPerfMode(customEvent.detail)
      }
    }
    window.addEventListener('performance-mode-change', handleModeChange)
    return () => {
      window.removeEventListener('performance-mode-change', handleModeChange)
    }
  }, [])

  const isLowBandwidth = perfMode === 'low-bandwidth'

  const togglePerformanceMode = () => {
    const nextMode: PerformanceMode = isLowBandwidth ? 'immersive' : 'low-bandwidth'
    setPerfMode(nextMode)
    savePerformanceMode(nextMode)
    trackEvent('theme_toggle', { action: 'toggle_perf_mode_hero', mode: nextMode })
  }

  const isCream = studioTheme === 'cream'
  const textColor = isCream ? 'text-[#121316]' : 'text-[#EDEDED]'
  const subtextColor = isCream ? 'text-[#121316]/70' : 'text-[#EDEDED]/70'

  return (
    <section
      ref={heroRef}
      id="hero"
      data-surface="hero"
      className="relative min-h-screen w-full flex flex-col justify-between overflow-hidden pt-16 pb-12 select-none"
    >
      {/* Swiss Editorial Display Typography (DURGESH / PORTFOLIO) */}
      <SwissTypography explodeProgress={progress} studioTheme={studioTheme} />

      {/* 2D Projected SVG Leader Lines & Component Spec Cards */}
      <ProjectedCallouts explodeProgress={progress} studioTheme={studioTheme} />

      {/* Micro-Monospace Corner Telemetry HUD */}
      <SwissTelemetryHUD
        explodeProgress={progress}
        studioTheme={studioTheme}
        isXRay={isXRay}
      />

      {/* Swiss Studio Controls Pill Bar */}
      <SwissStudioControls
        studioTheme={studioTheme}
        onThemeChange={setStudioTheme}
        isXRay={isXRay}
        onXRayToggle={setIsXRay}
      />

      {/* Center Hero Card & Information Layer */}
      <div
        className="relative z-10 text-center px-4 max-w-3xl mx-auto my-auto pointer-events-auto transition-opacity duration-300"
        style={{
          opacity: Math.max(0, 1 - progress * 1.6),
          transform: `translateY(${progress * -40}px)`,
        }}
      >
        <div className="flex flex-wrap items-center justify-center gap-2 mb-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-current/20 text-xs font-mono tracking-wider backdrop-blur-md">
            <Sparkles className="size-3 text-amber-500" />
            <span className={textColor}>AI/ML Engineer &middot; Production AI Systems</span>
          </div>
          <button
            type="button"
            onClick={togglePerformanceMode}
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-current/20 text-xs font-mono tracking-wider backdrop-blur-md transition-all cursor-pointer"
            title={isLowBandwidth ? 'Switch to Full 3D Visual Mode' : 'Switch to Lite Performance Mode'}
            aria-label={isLowBandwidth ? 'Enable 3D visual mode' : 'Enable lite performance mode'}
          >
            <Zap className={`size-3 ${isLowBandwidth ? 'text-neutral-400' : 'text-amber-500'}`} />
            <span className={subtextColor}>Visual: {isLowBandwidth ? 'Lite' : '3D Active'}</span>
          </button>
        </div>

        {/* Central Display Title */}
        <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold mb-3 tracking-tight font-display">
          <span className={textColor}>{OWNER.name}</span>
        </h1>

        <div className="text-lg sm:text-xl font-medium mb-4 h-8 flex items-center justify-center font-mono">
          <TypeAnimation
            sequence={[
              'Building useful AI products & intelligent interfaces', 2500,
              'Designing resilient full-stack architectures', 2500,
              'Engineering realtime voice & vision pipelines', 2500,
              'Training deep learning classification models', 2500,
            ]}
            repeat={Infinity}
            wrapper="span"
            className={subtextColor}
          />
        </div>

        <p className={`text-sm sm:text-base max-w-xl mx-auto mb-6 leading-relaxed ${subtextColor}`}>
          Minimalist Swiss-Editorial aesthetic with interactive 3D PBR kinetic sculpture.
          I build fast, accessible web applications and production-grade AI prototypes.
        </p>

        {/* 10-Second Recruiter Proof Strip */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 max-w-2xl mx-auto mb-6 text-left">
          <div className="rounded-lg p-2.5 border border-current/15 backdrop-blur-md bg-current/[0.03]">
            <div className="text-[9px] font-mono uppercase tracking-wider text-amber-500 font-semibold mb-0.5">Architecture</div>
            <div className={`text-xs font-semibold ${textColor}`}>Next.js &amp; TypeScript</div>
            <div className={`text-[10px] ${subtextColor} mt-0.5 leading-tight`}>100% typed App Router, static export, 0 WebGL on ATS routes.</div>
          </div>
          <div className="rounded-lg p-2.5 border border-current/15 backdrop-blur-md bg-current/[0.03]">
            <div className="text-[9px] font-mono uppercase tracking-wider text-amber-500 font-semibold mb-0.5">Intelligence</div>
            <div className={`text-xs font-semibold ${textColor}`}>Applied AI &amp; ML</div>
            <div className={`text-[10px] ${subtextColor} mt-0.5 leading-tight`}>Realtime voice/vision agents, PyTorch models, structured prompt chains.</div>
          </div>
          <div className="rounded-lg p-2.5 border border-current/15 backdrop-blur-md bg-current/[0.03]">
            <div className="text-[9px] font-mono uppercase tracking-wider text-amber-500 font-semibold mb-0.5">Reliability</div>
            <div className={`text-xs font-semibold ${textColor}`}>Cloudflare Edge &amp; A11y</div>
            <div className={`text-[10px] ${subtextColor} mt-0.5 leading-tight`}>WCAG AA compliance across 10 routes, hardened security headers.</div>
          </div>
        </div>

        {/* Action CTAs */}
        <div className="flex flex-wrap gap-2.5 justify-center items-center">
          <a
            href="#projects"
            onClick={() => trackEvent('contact_click', { button: 'view_projects_hero' })}
            className={`px-5 py-2.5 rounded-lg font-semibold transition-all shadow-md text-xs sm:text-sm inline-flex items-center gap-1.5 ${
              isCream
                ? 'bg-[#121316] text-[#F4F0E8] hover:bg-[#202227]'
                : 'bg-[#EDEDED] text-[#121316] hover:bg-white'
            }`}
          >
            <span>View Selected Work</span>
            <ArrowRight className="size-3.5" />
          </a>

          {/* Active Direct PDF Download */}
          <a
            href="/resume.pdf"
            download="Durgesh_Dutt_Sinha_Resume.pdf"
            onClick={() => trackEvent('theme_toggle', { action: 'download_pdf_hero' })}
            className="px-4 py-2.5 rounded-lg border border-current/20 backdrop-blur-md font-semibold transition-all inline-flex items-center gap-1.5 text-xs sm:text-sm hover:bg-current/10"
            title="Download Official Verified PDF Resume"
          >
            <Download className="size-3.5 text-amber-500" />
            <span className={textColor}>Download Resume</span>
          </a>

          {/* Active Primary Resume CTA */}
          <Link
            href="/resume"
            onClick={() => trackEvent('theme_toggle', { action: 'view_resume_hero' })}
            className="px-4 py-2.5 rounded-lg border border-current/20 backdrop-blur-md font-semibold transition-all inline-flex items-center gap-1.5 text-xs sm:text-sm hover:bg-current/10"
            title="View Official HTML Resume (ATS-friendly, 0 WebGL)"
          >
            <FileText className="size-3.5 text-amber-500" />
            <span className={textColor}>ATS HTML View</span>
          </Link>

          <a
            href="#contact"
            onClick={() => trackEvent('contact_click', { button: 'contact_me_hero' })}
            className="px-3.5 py-2.5 rounded-lg border border-current/15 backdrop-blur-md font-medium transition-all text-xs sm:text-sm hover:bg-current/10 inline-flex items-center gap-1.5"
          >
            <Mail className="size-3.5 text-neutral-400" />
            <span className={textColor}>Contact</span>
          </a>

          <a
            href={OWNER.github}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackEvent('github_click', { source: 'hero_cta' })}
            className="px-3.5 py-2.5 rounded-lg border border-current/15 backdrop-blur-md font-medium transition-all text-xs sm:text-sm hover:bg-current/10 inline-flex items-center gap-1.5"
          >
            <Github className="size-3.5 text-neutral-400" />
            <span className={textColor}>GitHub</span>
          </a>
        </div>
      </div>

      {/* Fallback Synced Timeline Scrubber */}
      <TimelineScrubber
        progress={progress}
        onScrubChange={onScrubChange}
        studioTheme={studioTheme}
      />
    </section>
  )
}
