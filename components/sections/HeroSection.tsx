"use client"
import { useState, useEffect } from 'react'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import { FileText, Download } from 'lucide-react'
import { TypeAnimation } from 'react-type-animation'
import { OWNER } from '@/lib/data'
import { trackEvent } from '@/lib/analytics'
import { getSavedPerformanceMode, PerformanceMode } from '@/lib/performance'
import StaticHeroFallback from '@/components/StaticHeroFallback'

const AICoreScene = dynamic(() => import('@/components/3d/AICoreScene'), {
  ssr: false,
  loading: () => <StaticHeroFallback />,
})

export default function HeroSection() {
  const [perfMode, setPerfMode] = useState<PerformanceMode>('immersive')

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

  return (
    <section id="hero" className="relative h-screen w-full flex items-center justify-center overflow-hidden">
      {/* 3D Holographic AI Neural Core Scene with CSS/SVG Fallback */}
      <div className="pointer-events-none absolute inset-0 z-0">
        {isLowBandwidth ? <StaticHeroFallback /> : <AICoreScene />}
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
        <div className="flex flex-wrap gap-3.5 justify-center items-center">
          <a
            href="#projects"
            onClick={() => trackEvent('contact_click', { button: 'view_projects_hero' })}
            className="px-7 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-rose-500 text-white font-semibold hover:opacity-90 transition-all glow-purple cursor-pointer focus-visible:ring-2 focus-visible:ring-purple-400 shadow-lg shadow-purple-500/20 text-sm sm:text-base"
          >
            View Projects
          </a>

          {/* Active Primary Resume CTA */}
          <Link
            href="/resume"
            onClick={() => trackEvent('theme_toggle', { action: 'view_resume_hero' })}
            className="px-6 py-3 rounded-xl glass border border-purple-500/40 text-purple-200 font-semibold hover:bg-purple-500/15 hover:border-purple-400/70 transition-all inline-flex items-center gap-2 shadow-lg shadow-purple-500/10 cursor-pointer text-sm sm:text-base focus-visible:ring-2 focus-visible:ring-purple-400"
            title="View Official HTML Resume (ATS-friendly, 0 WebGL)"
          >
            <FileText className="size-4 text-purple-400" />
            <span>View Resume</span>
          </Link>

          {/* Active Direct PDF Download */}
          <a
            href="/resume.pdf"
            download="Durgesh_Dutt_Sinha_Resume.pdf"
            onClick={() => trackEvent('theme_toggle', { action: 'download_pdf_hero' })}
            className="px-5 py-3 rounded-xl glass border border-rose-500/30 text-rose-300 font-semibold hover:bg-rose-500/15 hover:border-rose-400/60 transition-all inline-flex items-center gap-1.5 shadow-md shadow-rose-500/10 cursor-pointer text-sm sm:text-base focus-visible:ring-2 focus-visible:ring-rose-400"
            title="Download Official Verified PDF (534 KB)"
          >
            <Download className="size-4 text-rose-400" />
            <span>Download PDF</span>
          </a>

          <a
            href="#contact"
            onClick={() => trackEvent('contact_click', { button: 'contact_me_hero' })}
            className="px-6 py-3 rounded-xl glass border border-slate-700 text-slate-300 font-semibold hover:bg-white/5 hover:border-slate-500 transition-all cursor-pointer text-sm sm:text-base focus-visible:ring-2 focus-visible:ring-purple-400"
          >
            Contact Me
          </a>
          <a
            href={OWNER.github}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackEvent('github_click', { source: 'hero_cta' })}
            className="px-5 py-3 rounded-xl glass border border-slate-700 text-slate-300 font-semibold hover:border-slate-400 transition-all cursor-pointer text-sm sm:text-base focus-visible:ring-2 focus-visible:ring-slate-300"
          >
            GitHub ↗
          </a>
        </div>

        {/* Scroll indicator - hidden on compact mobile screens to prevent button overlap */}
        <div className="pointer-events-none absolute bottom-6 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center gap-2 text-slate-500">
          <span className="text-xs">Scroll to explore</span>
          <div className="w-px h-12 bg-gradient-to-b from-purple-500 to-transparent animate-pulse" />
        </div>
      </div>
    </section>
  )
}
