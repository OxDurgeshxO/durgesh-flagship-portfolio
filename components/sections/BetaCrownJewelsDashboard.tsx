'use client';

import React from 'react';
import Link from 'next/link';
import {
  Sparkles,
  Layers,
  Cpu,
  Activity,
  Compass,
  FileText,
  Image as ImageIcon,
  BookOpen,
  ArrowUpRight,
  GitBranch,
  CheckCircle2,
  ExternalLink,
} from 'lucide-react';

interface CrownJewelItem {
  id: string;
  title: string;
  subtitle: string;
  origin: string;
  badge: string;
  badgeColor: string;
  icon: React.ComponentType<{ className?: string }>;
  href: string;
  isExternal?: boolean;
  specs: string[];
}

const CROWN_JEWELS: CrownJewelItem[] = [
  {
    id: 'liquid-glass',
    title: 'Liquid Glass 3D Card',
    subtitle: 'Hardware-accelerated Framer Motion spring physics with specular light highlight',
    origin: 'archive/v2',
    badge: 'BETA • 3D SHADER',
    badgeColor: 'border-cyan-500/40 bg-cyan-500/10 text-cyan-300',
    icon: Layers,
    href: '/lab#craft',
    specs: ['Spring stiffness: 150, damping: 20', '±12° Dynamic mouse tilt', '600px Radial specular sheen'],
  },
  {
    id: 'thinking-orb',
    title: 'Harmonic Thinking Orb',
    subtitle: 'Autonomous AI reactive visualizer with multi-state particle aura telemetry',
    origin: 'archive/v2',
    badge: 'BETA • AI VISUALIZER',
    badgeColor: 'border-purple-500/40 bg-purple-500/10 text-purple-300',
    icon: Cpu,
    href: '/lab#craft',
    specs: ['4 Telemetry states (Think/Listen/Speak/Idle)', '3s Ambient aura breathing', '8s Particle rotation'],
  },
  {
    id: 'vector-sandbox',
    title: '2D Vector Embedding Lab',
    subtitle: 'Real-time in-browser NLP token space with cosine similarity and Euclidean distance',
    origin: 'archive/V10',
    badge: 'BETA • VECTOR LAB',
    badgeColor: 'border-emerald-500/40 bg-emerald-500/10 text-emerald-300',
    icon: Compass,
    href: '/lab#vectors',
    specs: ['Sub-5ms Ephemeral calculation', 'Angular separation (θ) meter', 'Custom & Preset vocabulary'],
  },
  {
    id: 'fittrack-kinematics',
    title: 'FitTrack Kinematics Mirror',
    subtitle: 'Computer vision pose trigonometry with real-time joint kinematic correction alerts',
    origin: 'archive/V10',
    badge: 'BETA • KINEMATICS',
    badgeColor: 'border-cyan-500/40 bg-cyan-500/10 text-cyan-300',
    icon: Activity,
    href: '/lab#fittrack',
    specs: ['60 FPS Synthetic pose engine', 'Squat & Curl angular trigonometry', 'Real-time form breakdown HUD'],
  },
  {
    id: 'design-tokens',
    title: 'Design Tokens & Craft Spec',
    subtitle: 'Obsidian Zinc-950 color system, specular glass tokens, and spring physics',
    origin: 'archive/v2',
    badge: 'BETA • DESIGN SYSTEM',
    badgeColor: 'border-amber-500/40 bg-amber-500/10 text-amber-300',
    icon: BookOpen,
    href: '/docs/DESIGN_TOKENS.md',
    specs: ['Obsidian #09090b base palette', 'Backdrop-blur-2xl glass surfaces', 'WCAG AA typography rhythms'],
  },
  {
    id: 'vector-math',
    title: 'Pure Vector Math Engine',
    subtitle: 'Zero-dependency TypeScript vector mathematics for client-side dot products',
    origin: 'archive/V10',
    badge: 'BETA • MATH ENGINE',
    badgeColor: 'border-emerald-500/40 bg-emerald-500/10 text-emerald-300',
    icon: Sparkles,
    href: '/lab#vectors',
    specs: ['Zero npm runtime dependencies', 'Bag-of-Words token frequency', 'Sub-50ms Edge target'],
  },
  {
    id: 'og-card-generator',
    title: 'Dynamic OpenGraph Engine',
    subtitle: 'Automated 1200x630 SVG social sharing cards with glowing ambient radial gradients',
    origin: 'archive/V10',
    badge: 'BETA • DYNAMIC OG',
    badgeColor: 'border-blue-500/40 bg-blue-500/10 text-blue-300',
    icon: ImageIcon,
    href: '/images/og/roleradar.svg',
    isExternal: true,
    specs: ['1200x630 Crisp SVG format', 'Case study customized palettes', 'Twitter & LinkedIn verified'],
  },
  {
    id: 'resume-compiler',
    title: 'Automated Resume Compiler',
    subtitle: 'Headless Chromium print pipeline compiling the 1-page ATS resume to A4 PDF',
    origin: 'commit a694965',
    badge: 'BETA • PDF COMPILER',
    badgeColor: 'border-rose-500/40 bg-rose-500/10 text-rose-300',
    icon: FileText,
    href: '/resume',
    specs: ['174.5 KB Clean A4 print PDF', 'Zero visual degradation', 'ATS-friendly 1-click download'],
  },
];

export default function BetaCrownJewelsDashboard() {
  return (
    <section aria-labelledby="beta-dashboard-title" className="relative z-20 py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Container Box */}
      <div className="rounded-3xl border border-white/10 bg-black/40 backdrop-blur-2xl p-6 sm:p-10 shadow-2xl relative overflow-hidden">
        {/* Subtle Ambient Glow */}
        <div className="absolute top-0 right-1/4 -z-10 h-64 w-96 rounded-full bg-cyan-500/10 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/4 -z-10 h-64 w-96 rounded-full bg-purple-500/10 blur-3xl pointer-events-none" />

        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/10 pb-6 mb-8">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-3.5 py-1 text-xs font-mono font-semibold text-cyan-300">
              <Sparkles className="size-3.5 text-cyan-400" />
              <span>PRESERVED ARCHIVE CROWN JEWELS</span>
              <span className="size-1.5 rounded-full bg-cyan-400 animate-pulse" />
            </div>
            <h2 id="beta-dashboard-title" className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
              Beta Features & Branch Jewels Shortcut Dashboard
            </h2>
            <p className="text-sm sm:text-base text-zinc-400 max-w-3xl leading-relaxed">
              Direct access shortcuts to all 8 crown jewels preserved from historical branches (<code className="text-cyan-300">archive/v2</code>, <code className="text-purple-300">archive/V10</code>, and <code className="text-zinc-200">a694965</code>). Click any card to launch and inspect the exact component live.
            </p>
          </div>

          <div className="flex items-center gap-3 self-start md:self-auto shrink-0 font-mono text-xs">
            <div className="flex items-center gap-1.5 rounded-xl border border-emerald-500/30 bg-emerald-500/10 px-3 py-2 text-emerald-300">
              <CheckCircle2 className="size-4" />
              <span>8 / 8 Preserved</span>
            </div>
            <div className="flex items-center gap-1.5 rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-zinc-300">
              <GitBranch className="size-4 text-purple-400" />
              <span>Merged in main</span>
            </div>
          </div>
        </div>

        {/* 8 Shortcut Tiles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {CROWN_JEWELS.map((jewel) => {
            const Icon = jewel.icon;
            const CardWrapper = jewel.isExternal ? 'a' : Link;
            const extraProps = jewel.isExternal ? { target: '_blank', rel: 'noopener noreferrer' } : {};

            return (
              <CardWrapper
                key={jewel.id}
                href={jewel.href}
                {...extraProps}
                className="group relative flex flex-col justify-between rounded-2xl border border-white/10 bg-white/[0.02] p-5 hover:bg-white/[0.06] hover:border-cyan-500/40 transition-all duration-300 hover:shadow-xl hover:shadow-cyan-500/10 cursor-pointer"
              >
                <div>
                  {/* Top row: Icon + Beta Badge */}
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <div className="rounded-xl border border-white/10 bg-white/5 p-2.5 text-white group-hover:scale-110 group-hover:border-cyan-500/40 group-hover:text-cyan-300 transition-all">
                      <Icon className="size-5" />
                    </div>

                    <span className={`inline-flex items-center gap-1 rounded-full border px-2.5 py-0.5 text-[10px] font-mono font-bold tracking-wider ${jewel.badgeColor}`}>
                      <span className="size-1.5 rounded-full bg-current animate-pulse" />
                      {jewel.badge}
                    </span>
                  </div>

                  {/* Title & Origin */}
                  <div className="space-y-1">
                    <div className="flex items-center justify-between">
                      <h3 className="text-base font-bold text-white group-hover:text-cyan-300 transition-colors">
                        {jewel.title}
                      </h3>
                      <ArrowUpRight className="size-4 text-zinc-500 group-hover:text-cyan-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                    </div>
                    <div className="text-[11px] font-mono text-zinc-500 flex items-center gap-1">
                      <GitBranch className="size-3 text-zinc-600" />
                      <span>Origin: {jewel.origin}</span>
                    </div>
                  </div>

                  {/* Subtitle */}
                  <p className="text-xs text-zinc-400 mt-2.5 leading-relaxed">
                    {jewel.subtitle}
                  </p>
                </div>

                {/* Specs list */}
                <div className="mt-5 pt-3.5 border-t border-white/5 space-y-1">
                  {jewel.specs.map((spec, i) => (
                    <div key={i} className="text-[10px] font-mono text-zinc-400 flex items-center gap-1.5">
                      <span className="size-1 rounded-full bg-cyan-400/60" />
                      <span className="truncate">{spec}</span>
                    </div>
                  ))}
                </div>
              </CardWrapper>
            );
          })}
        </div>

        {/* Bottom Navigation Hint */}
        <div className="mt-8 pt-5 border-t border-white/10 flex flex-wrap items-center justify-between gap-4 text-xs font-mono text-zinc-400">
          <div className="flex items-center gap-2">
            <span className="size-2 rounded-full bg-emerald-400" />
            <span>Click any tile to navigate directly to its active section in the portfolio.</span>
          </div>

          <div className="flex items-center gap-4">
            <Link href="/lab" className="hover:text-cyan-300 underline underline-offset-4 transition-colors">
              Open Full AI Lab →
            </Link>
            <Link href="/resume" className="hover:text-cyan-300 underline underline-offset-4 transition-colors">
              View Official Resume →
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
