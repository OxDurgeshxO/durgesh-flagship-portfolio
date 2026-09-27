"use client"
import React, { useState, useEffect } from 'react'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import { FileText, Download, Sparkles, ArrowRight, Github, Mail, Zap } from 'lucide-react'
import { TypeAnimation } from 'react-type-animation'
import { OWNER } from '@/lib/data'
import { trackEvent } from '@/lib/analytics'
import { getSavedPerformanceMode, savePerformanceMode, PerformanceMode } from '@/lib/performance'
import StaticHeroFallback from '@/components/StaticHeroFallback'
import CyberRoninBackground from '@/components/cyber-ronin/CyberRoninBackground'

class WebGLErrorBoundary extends React.Component<{ children: React.ReactNode; fallback: React.ReactNode }, { hasError: boolean }> {
  constructor(props: any) {
    super(props)
    this.state = { hasError: false }
  }
  static getDerivedStateFromError() {
    return { hasError: true }
  }
  componentDidCatch(err: any) {
    console.warn('WebGL initialization failed, falling back to static visual:', err?.message || err)
  }
  render() {
    if (this.state.hasError) return this.props.fallback
    return this.props.children
  }
}

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

  const togglePerformanceMode = () => {
    const nextMode: PerformanceMode = isLowBandwidth ? 'immersive' : 'low-bandwidth'
    setPerfMode(nextMode)
    savePerformanceMode(nextMode)
    trackEvent('theme_toggle', { action: 'toggle_perf_mode_hero', mode: nextMode })
  }

  return (
    <section
      id="hero"
      data-surface="hero"
      className="relative min-h-screen w-full flex items-center justify-center overflow-hidden pt-20 pb-16"
    >
      {/* data-surface="hero" re-declares the palette for the hero subtree
          (see styles/theme.css). Rationale: the WebGL rig is lit for a
          near-black canvas and the Cyber Ronin plate is warm dark photography,
          so the band is kept on those values rather than re-authored. Page-level
          tokens (canvas, hero fade, grid) are deliberately NOT re-declared, so the
          band still fades into the page below. */}

      {/* Cyber Ronin // Neural Edges animated background.
          Base plate renders at z-0 (under the 3D core + existing gradients),
          spotlight reveal + spec panel at z-15 (above them, below the content).
          Switched off in low-bandwidth performance mode. */}
      <CyberRoninBackground active={!isLowBandwidth} />

      {/* 3D Holographic AI Neural Core Scene with CSS/SVG Fallback */}
      <div className="pointer-events-none absolute inset-0 z-0">
        {isLowBandwidth ? <StaticHeroFallback /> : <WebGLErrorBoundary fallback={<StaticHeroFallback />}><AICoreScene /></WebGLErrorBoundary>}
      </div>

      {/* Gradient overlays with pointer-events-none */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-[var(--hero-fade)] to-[var(--bg-primary)] z-10" />
      <div className="pointer-events-none absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/15 rounded-full blur-[120px] z-10" />
      <div className="pointer-events-none absolute top-1/2 left-1/4 w-[300px] h-[300px] bg-secondary/15 rounded-full blur-[100px] z-10" />

      {/* Interactive Content */}
      <div className="relative z-20 text-center px-6 max-w-4xl mx-auto pointer-events-auto">
        <div
          className="flex flex-wrap items-center justify-center gap-2.5 mb-6 ronin-fade-up"
          style={{ animationDelay: '0.15s' }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/40 text-primary text-xs sm:text-sm glass">
            <Sparkles className="size-3.5 text-primary" />
            <span>AI/ML Engineer &middot; Production AI Systems</span>
          </div>
          <button
            type="button"
            onClick={togglePerformanceMode}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border border-border hover:border-primary/50 text-body hover:text-ink text-xs glass transition-all focus-visible:ring-2 focus-visible:ring-purple-400 cursor-pointer"
            title={isLowBandwidth ? 'Switch to Full 3D Visual Mode' : 'Switch to Lite Performance Mode'}
            aria-label={isLowBandwidth ? 'Enable 3D visual mode' : 'Enable lite performance mode'}
          >
            <Zap className={`size-3.5 ${isLowBandwidth ? 'text-muted-foreground' : 'text-secondary'}`} />
            <span>Visual: {isLowBandwidth ? 'Lite' : '3D Active'}</span>
          </button>
        </div>

        {/* Same name, same gradient — each word is wrapped so it can stagger in
            individually once the entrance gate opens. */}
        <h1 className="text-5xl md:text-7xl font-bold mb-3 leading-tight tracking-tight">
          <span className="gradient-text">
            {OWNER.name.split(' ').map((word, index) => (
              <span key={`${word}-${index}`}>
                {index > 0 ? ' ' : null}
                <span className="ronin-word" style={{ animationDelay: `${0.3 + index * 0.12}s` }}>
                  {word}
                </span>
              </span>
            ))}
          </span>
        </h1>

        <div
          className="text-xl md:text-2xl font-semibold text-ink mb-4 h-10 flex items-center justify-center ronin-fade-up"
          style={{ animationDelay: '0.62s' }}
        >
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

        <p
          className="text-body text-base md:text-lg max-w-2xl mx-auto mb-6 leading-relaxed font-normal ronin-fade-up"
          style={{ animationDelay: '0.72s' }}
        >
          I build fast, accessible web applications and practical AI prototypes.
        </p>

        {/* 10-Second Recruiter Proof Strip (V4 Improvement Plan Phase 1) */}
        <div
          className="grid grid-cols-1 sm:grid-cols-3 gap-3 max-w-2xl mx-auto mb-8 text-left ronin-fade-up"
          style={{ animationDelay: '0.77s' }}
        >
          <div className="glass rounded-xl p-3 border border-border/60 bg-muted/60">
            <div className="text-[10px] font-mono text-primary uppercase tracking-wider mb-0.5">Architecture</div>
            <div className="text-xs font-semibold text-ink">Next.js &amp; TypeScript</div>
            <div className="text-[11px] text-muted-foreground mt-0.5 leading-tight">100% typed App Router, static export, 0 WebGL on ATS routes.</div>
          </div>
          <div className="glass rounded-xl p-3 border border-border/60 bg-muted/60">
            <div className="text-[10px] font-mono text-secondary uppercase tracking-wider mb-0.5">Intelligence</div>
            <div className="text-xs font-semibold text-ink">Applied AI &amp; ML</div>
            <div className="text-[11px] text-muted-foreground mt-0.5 leading-tight">Realtime voice/vision agents, PyTorch models, structured prompt chains.</div>
          </div>
          <div className="glass rounded-xl p-3 border border-border/60 bg-muted/60">
            <div className="text-[10px] font-mono text-[var(--accent-signal)] uppercase tracking-wider mb-0.5">Reliability</div>
            <div className="text-xs font-semibold text-ink">Cloudflare Edge &amp; A11y</div>
            <div className="text-[11px] text-muted-foreground mt-0.5 leading-tight">WCAG AA compliance across 10 routes, hardened security headers.</div>
          </div>
        </div>

        <div
          className="flex flex-wrap gap-3.5 justify-center items-center ronin-fade-up"
          style={{ animationDelay: '0.82s' }}
        >
          <a
            href="#projects"
            onClick={() => trackEvent('contact_click', { button: 'view_projects_hero' })}
            className="px-7 py-3 rounded-xl bg-gradient-to-r from-[var(--gradient-start)] to-[var(--gradient-end)] text-white font-semibold hover:opacity-90 transition-all glow-purple cursor-pointer focus-visible:ring-2 focus-visible:ring-purple-400 shadow-lg shadow-black/20 text-sm sm:text-base inline-flex items-center gap-2"
          >
            <span>View Selected Work</span>
            <ArrowRight className="size-4" />
          </a>

          {/* Active Direct PDF Download */}
          <a
            href="/resume.pdf"
            download="Durgesh_Dutt_Sinha_Resume.pdf"
            onClick={() => trackEvent('theme_toggle', { action: 'download_pdf_hero' })}
            className="px-6 py-3 rounded-xl bg-accent hover:bg-accent border border-border-strong text-ink font-semibold transition-all inline-flex items-center gap-2 shadow-md shadow-black/20 cursor-pointer text-sm sm:text-base focus-visible:ring-2 focus-visible:ring-rose-400"
            title="Download Official Verified PDF Resume"
          >
            <Download className="size-4 text-secondary" />
            <span>Download Resume</span>
          </a>

          {/* Active Primary Resume CTA */}
          <Link
            href="/resume"
            onClick={() => trackEvent('theme_toggle', { action: 'view_resume_hero' })}
            className="px-5 py-3 rounded-xl glass border border-primary/40 text-primary font-semibold hover:bg-primary/10 hover:border-primary/70 transition-all inline-flex items-center gap-2 shadow-lg shadow-black/10 cursor-pointer text-sm sm:text-base focus-visible:ring-2 focus-visible:ring-purple-400"
            title="View Official HTML Resume (ATS-friendly, 0 WebGL)"
          >
            <FileText className="size-4 text-primary" />
            <span>ATS HTML View</span>
          </Link>

          <a
            href="#contact"
            onClick={() => trackEvent('contact_click', { button: 'contact_me_hero' })}
            className="px-5 py-3 rounded-xl glass border border-border-strong text-body font-semibold hover:bg-muted hover:border-slate-500 transition-all cursor-pointer text-sm sm:text-base focus-visible:ring-2 focus-visible:ring-purple-400 inline-flex items-center gap-1.5"
          >
            <Mail className="size-4 text-muted-foreground" />
            <span>Contact</span>
          </a>

          <a
            href={OWNER.github}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackEvent('github_click', { source: 'hero_cta' })}
            className="px-4 py-3 rounded-xl glass border border-border-strong text-body font-semibold hover:border-slate-400 transition-all cursor-pointer text-sm sm:text-base focus-visible:ring-2 focus-visible:ring-slate-300 inline-flex items-center gap-1.5"
          >
            <Github className="size-4 text-muted-foreground" />
            <span>GitHub</span>
          </a>
        </div>
      </div>
    </section>
  )
}