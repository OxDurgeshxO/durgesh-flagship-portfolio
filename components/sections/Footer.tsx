import { OWNER } from '@/lib/data'

const PORTFOLIO_REPO = 'https://github.com/OxDurgeshxO/durgesh-flagship-portfolio'
const PORTFOLIO_LIVE = 'https://durgesh-portfolio.pages.dev'

export default function Footer() {
  return (
    <footer className="border-t border-white/5 py-10 text-center text-slate-500 text-sm">
      <p className="mb-2">
        Built with{' '}
        <span className="text-purple-400">Next.js 14</span> ·{' '}
        <span className="text-cyan-400">Three.js</span> ·{' '}
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
          className="text-slate-400 hover:text-cyan-400 transition-colors underline underline-offset-2"
        >
          Live Site ↗
        </a>
      </p>
      <p>© {new Date().getFullYear()} {OWNER.name} · All rights reserved</p>
      <div className="flex justify-center gap-6 mt-4">
        <a href={OWNER.github} target="_blank" rel="noopener noreferrer" className="hover:text-purple-400 transition-colors">GitHub</a>
        <a href={OWNER.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-cyan-400 transition-colors">LinkedIn</a>
        <a href={`mailto:${OWNER.email}`} className="hover:text-white transition-colors">Email</a>
      </div>
    </footer>
  )
}

