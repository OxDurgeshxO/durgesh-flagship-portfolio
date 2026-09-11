import Link from 'next/link'
import { OWNER } from '@/lib/data'

const PORTFOLIO_REPO = 'https://github.com/OxDurgeshxO/durgesh-flagship-portfolio'
const PORTFOLIO_LIVE = 'https://durgesh-portfolio-v2.pages.dev'

export default function Footer() {
  return (
    <footer className="border-t border-white/5 py-10 text-center text-slate-500 text-sm">
      <div className="flex flex-wrap justify-center items-center gap-3 mb-4 text-xs font-mono">
        <Link href="/recruiter" className="text-purple-400 hover:underline flex items-center gap-1" title="Recruiter Fast Track (Beta · To be improvised soon)">
          <span>👔 Recruiter Fast Track</span>
          <span className="text-[8px] font-mono font-bold px-1 py-0.2 rounded bg-amber-500/20 text-amber-300 border border-amber-500/40">BETA</span>
        </Link>
        <span>·</span>
        <Link href="/resume" className="text-slate-400 hover:text-white hover:underline">
          📄 ATS Resume
        </Link>
        <span>·</span>
        <Link href="/lab" className="text-emerald-400 hover:underline flex items-center gap-1" title="AI Engineering Lab (Beta · To be improvised soon)">
          <span>🔬 AI Engineering Lab</span>
          <span className="text-[8px] font-mono font-bold px-1 py-0.2 rounded bg-amber-500/20 text-amber-300 border border-amber-500/40">BETA</span>
        </Link>
        <span>·</span>
        <Link href="/github-health" className="text-blue-400 hover:underline flex items-center gap-1" title="Code Health (Beta · To be improvised soon)">
          <span>📊 Code Health</span>
          <span className="text-[8px] font-mono font-bold px-1 py-0.2 rounded bg-amber-500/20 text-amber-300 border border-amber-500/40">BETA</span>
        </Link>
        <span>·</span>
        <Link href="/changelog" className="text-purple-300 hover:underline flex items-center gap-1" title="Changelog (Beta · To be improvised soon)">
          <span>📜 Changelog</span>
          <span className="text-[8px] font-mono font-bold px-1 py-0.2 rounded bg-amber-500/20 text-amber-300 border border-amber-500/40">BETA</span>
        </Link>
        <span>·</span>
        <Link href="/performance" className="text-rose-400 hover:underline flex items-center gap-1" title="Performance Center (Beta · To be improvised soon)">
          <span>⚡ Performance Center</span>
          <span className="text-[8px] font-mono font-bold px-1 py-0.2 rounded bg-amber-500/20 text-amber-300 border border-amber-500/40">BETA</span>
        </Link>
      </div>

      <p className="mb-2">
        Built with{' '}
        <span className="text-purple-400">Next.js 14</span> ·{' '}
        <span className="text-rose-400">Three.js</span> ·{' '}
        <span className="text-purple-400">Framer Motion</span>
        {' '}·{' '}
        <a
          href={PORTFOLIO_REPO}
          target="_blank"
          rel="noopener noreferrer"
          className="text-slate-400 hover:text-purple-400 transition-colors underline underline-offset-2"
        >
          View Source ↗
        </a>
        {' '}·{' '}
        <a
          href={PORTFOLIO_LIVE}
          target="_blank"
          rel="noopener noreferrer"
          className="text-slate-400 hover:text-rose-400 transition-colors underline underline-offset-2"
        >
          Live Site ↗
        </a>
      </p>
      <p>© {new Date().getFullYear()} {OWNER.name} · All rights reserved</p>
      <div className="flex justify-center gap-6 mt-4">
        <a href={OWNER.github} target="_blank" rel="noopener noreferrer" className="hover:text-purple-400 transition-colors">GitHub</a>
        <a href={OWNER.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-rose-400 transition-colors">LinkedIn</a>
        <a href={`mailto:${OWNER.email}`} className="hover:text-white transition-colors">Email</a>
      </div>
    </footer>
  )
}
