"use client"
import { useState, useEffect } from 'react'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import { FileText, Download, Sparkles, ArrowRight, Github, Mail } from 'lucide-react'
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
    <section id="hero" className="relative min-h-screen w-full flex items-center justify-center overflow-hidden pt-20 pb-16">
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
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-purple-500/40 text-purple-300 text-xs sm:text-sm mb-6 glass">
          <Sparkles className="size-3.5 text-purple-400" />
          <span>AI/ML Engineer &middot; Production AI Systems</span>
        </div>

        <h1 className="text-5xl md:text-7xl font-bold mb-3 leading-tight tracking-tight">
          <span className="gradient-text">{OWNER.name}</span>
        </h1>

        <div className="text-xl md:text-2xl font-semibold text-slate-200 mb-4 h-10 flex items-center justify-center">
          <TypeAnimation
            sequence={[
              'Building useful AI products & intelligent interfaces', 2500,
              'Designing resilient full-stack architectures', 2500,
              'Engineering realtime voice & vision pipelines', 2500,
              'Training deep learning classification models', 2500,
            ]}
            repeat={Infinity}
            wrapper="span"
          />
        </div>

        <p className="text-slate-300 text-base md:text-lg max-w-2xl mx-auto mb-8 leading-relaxed font-normal">
          I design and ship AI applications, ML systems, and high-performance web experiences.
        </p>

        <div className="flex flex-wrap gap-3.5 justify-center items-center">
          <a
            href="#projects"
            onClick={() => trackEvent('contact_click', { button: 'view_projects_hero' })}
            className="px-7 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-rose-500 text-white font-semibold hover:opacity-90 transition-all glow-purple cursor-pointer focus-visible:ring-2 focus-visible:ring-purple-400 shadow-lg shadow-purple-500/20 text-sm sm:text-base inline-flex items-center gap-2"
          >
            <span>View Featured Work</span>
            <ArrowRight className="size-4" />
          </a>

          {/* Active Direct PDF Download */}
          <a
            href="/resume.pdf"
            download="Durgesh_Dutt_Sinha_Resume.pdf"
            onClick={() => trackEvent('theme_toggle', { action: 'download_pdf_hero' })}
            className="px-6 py-3 rounded-xl bg-white/10 hover:bg-white/15 border border-white/20 text-white font-semibold transition-all inline-flex items-center gap-2 shadow-md shadow-black/20 cursor-pointer text-sm sm:text-base focus-visible:ring-2 focus-visible:ring-rose-400"
            title="Download Official Verified PDF Resume"
          >
            <Download className="size-4 text-rose-400" />
            <span>Download Résumé</span>
          </a>

          {/* Active Primary Resume CTA */}
          <Link
            href="/resume"
            onClick={() => trackEvent('theme_toggle', { action: 'view_resume_hero' })}
            className="px-5 py-3 rounded-xl glass border border-purple-500/40 text-purple-200 font-semibold hover:bg-purple-500/15 hover:border-purple-400/70 transition-all inline-flex items-center gap-2 shadow-lg shadow-purple-500/10 cursor-pointer text-sm sm:text-base focus-visible:ring-2 focus-visible:ring-purple-400"
            title="View Official HTML Resume (ATS-friendly, 0 WebGL)"
          >
            <FileText className="size-4 text-purple-400" />
            <span>ATS HTML View</span>
          </Link>

          <a
            href="#contact"
            onClick={() => trackEvent('contact_click', { button: 'contact_me_hero' })}
            className="px-5 py-3 rounded-xl glass border border-slate-700 text-slate-300 font-semibold hover:bg-white/5 hover:border-slate-500 transition-all cursor-pointer text-sm sm:text-base focus-visible:ring-2 focus-visible:ring-purple-400 inline-flex items-center gap-1.5"
          >
            <Mail className="size-4 text-slate-400" />
            <span>Contact</span>
          </a>

          <a
            href={OWNER.github}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackEvent('github_click', { source: 'hero_cta' })}
            className="px-4 py-3 rounded-xl glass border border-slate-700 text-slate-300 font-semibold hover:border-slate-400 transition-all cursor-pointer text-sm sm:text-base focus-visible:ring-2 focus-visible:ring-slate-300 inline-flex items-center gap-1.5"
          >
            <Github className="size-4 text-slate-400" />
            <span>GitHub</span>
          </a>
        </div>
      </div>
    </section>
  )
}