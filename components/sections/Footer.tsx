"use client";
import React, { useEffect } from 'react';
import Link from 'next/link'
import { OWNER } from '@/lib/data'

const PORTFOLIO_REPO = 'https://github.com/OxDurgeshxO/durgesh-flagship-portfolio'
const PORTFOLIO_LIVE = 'https://durgesh-portfolio.pages.dev'

export default function Footer() {
  useEffect(() => {
    console.log(
      "%c CYBER RONIN // NEURAL CORE %c\n%cDurgesh Dutt Sinha - AI/ML Engineer & Full-Stack Architect\nInterested in production architectures or collaborating? Email: durgeshdsinha@gmail.com\nPress Cmd+K for command palette navigation.",
      "background: #7c3aed; color: #fff; font-weight: bold; font-size: 13px; padding: 4px 8px; border-radius: 4px;",
      "",
      "color: #a855f7; font-family: monospace; font-size: 11px; font-weight: normal;"
    );
  }, []);
  return (
    <footer className="border-t border-border/60 py-10 text-center text-muted-foreground text-sm">
      <div className="flex flex-wrap justify-center items-center gap-3 mb-4 text-xs font-mono">
        <Link href="/recruiter" className="text-primary hover:underline flex items-center gap-1" title="Recruiter Fast Track">
          <span>👔 Recruiter Fast Track</span>
        </Link>
        <span>·</span>
        <Link href="/resume" className="text-muted-foreground hover:text-ink hover:underline">
          📄 ATS Resume
        </Link>
        <span>·</span>
        <Link href="/lab" className="text-[var(--accent-lab)] hover:underline flex items-center gap-1" title="AI Engineering Lab">
          <span>🔬 AI Engineering Lab</span>
        </Link>
        <span>·</span>
        <Link href="/github-health" className="text-[var(--accent-signal)] hover:underline flex items-center gap-1" title="Code Health">
          <span>📊 Code Health</span>
        </Link>
        <span>·</span>
        <Link href="/changelog" className="text-primary hover:underline flex items-center gap-1" title="Changelog">
          <span>📜 Changelog</span>
        </Link>
        <span>·</span>
        <Link href="/performance" className="text-secondary hover:underline flex items-center gap-1" title="Performance Center">
          <span>⚡ Performance Center</span>
        </Link>
      </div>

      <p className="mb-2">
        Built with{' '}
        <span className="text-primary">Next.js 14</span> ·{' '}
        <span className="text-secondary">Three.js</span> ·{' '}
        <span className="text-primary">Framer Motion</span>
        {' '}·{' '}
        <a
          href={PORTFOLIO_REPO}
          target="_blank"
          rel="noopener noreferrer"
          className="text-muted-foreground hover:text-primary transition-colors underline underline-offset-2"
        >
          View Source ↗
        </a>
        {' '}·{' '}
        <a
          href={PORTFOLIO_LIVE}
          target="_blank"
          rel="noopener noreferrer"
          className="text-muted-foreground hover:text-secondary transition-colors underline underline-offset-2"
        >
          Live Site ↗
        </a>
      </p>
      <p>© {new Date().getFullYear()} {OWNER.name} · All rights reserved</p>
      <div className="flex justify-center gap-6 mt-4">
        <a href={OWNER.github} target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">GitHub</a>
        <a href={OWNER.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-secondary transition-colors">LinkedIn</a>
        <a href={`mailto:${OWNER.email}`} className="hover:text-ink transition-colors">Email</a>
      </div>
    </footer>
  )
}
