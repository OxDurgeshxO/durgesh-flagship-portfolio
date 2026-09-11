"use client"
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { OWNER } from '@/lib/data'
import ThemeToggle from '@/components/ThemeToggle'
import { Search, Briefcase, FileText, FlaskConical, Activity, History } from 'lucide-react'

const NAV_LINKS = ['About', 'Experience', 'Education', 'Projects', 'Contact']

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('')

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)

      // Section scroll spy
      const sections = NAV_LINKS.map((link) => link.toLowerCase())
      let current = ''
      for (const id of sections) {
        const el = document.getElementById(id)
        if (el) {
          const rect = el.getBoundingClientRect()
          if (rect.top <= 200 && rect.bottom >= 200) {
            current = id
            break
          }
        }
      }
      setActiveSection(current)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const triggerPalette = () => {
    window.dispatchEvent(new CustomEvent('open-command-palette'))
  }

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'glass shadow-lg shadow-purple-500/10 backdrop-blur-xl' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3.5 flex items-center justify-between">
        {/* Brand Monogram */}
        <a href="#" className="text-xl font-bold gradient-text font-mono tracking-tight flex items-center gap-1">
          <span>DDS</span>
          <span className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-pulse" />
        </a>

        {/* Desktop Navigation Links */}
        <div className="hidden md:flex items-center gap-4">
          <div className="flex items-center gap-1 glass px-2 py-1 rounded-xl border border-white/5 bg-slate-950/40">
            {NAV_LINKS.map((link) => {
              const isActive = activeSection === link.toLowerCase()
              return (
                <a
                  key={link}
                  href={`#${link.toLowerCase()}`}
                  className={`text-xs sm:text-sm font-medium transition-all px-3 py-1 rounded-lg ${
                    isActive
                      ? 'text-white font-semibold bg-gradient-to-r from-purple-600/40 to-rose-500/40 border border-purple-500/50 shadow-sm shadow-purple-500/20'
                      : 'text-slate-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {link}
                </a>
              )
            })}
          </div>

          {/* AI Lab & Recruiter Fast Track links */}
          <Link
            href="/lab"
            className="px-3 py-1.5 rounded-xl border border-emerald-500/40 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-300 text-xs font-semibold flex items-center gap-1.5 transition-all shadow-sm shadow-emerald-500/10"
            title="Interactive AI Engineering Lab (Beta · To be improvised soon)"
          >
            <FlaskConical className="size-3 text-emerald-400" />
            <span>AI Lab</span>
            <span className="text-[9px] font-mono font-bold px-1.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40">
              BETA
            </span>
          </Link>

          <Link
            href="/recruiter"
            className="px-3 py-1.5 rounded-xl border border-purple-500/40 bg-purple-500/10 hover:bg-purple-500/20 text-purple-200 text-xs font-semibold flex items-center gap-1.5 transition-all shadow-sm shadow-purple-500/10"
            title="Recruiter Fast-Track (Beta · To be improvised soon)"
          >
            <Briefcase className="size-3 text-rose-400" />
            <span>Recruiter Mode</span>
            <span className="text-[9px] font-mono font-bold px-1.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40">
              BETA
            </span>
          </Link>

          <Link
            href="/resume"
            className="px-2.5 py-1.5 rounded-xl border border-white/10 hover:border-white/20 bg-white/5 text-slate-300 hover:text-white text-xs font-medium flex items-center gap-1.5 transition-all"
          >
            <FileText className="size-3" />
            <span>Resume</span>
          </Link>

          {/* Quick Search Palette Trigger */}
          <button
            onClick={triggerPalette}
            className="px-2.5 py-1.5 rounded-xl border border-purple-500/30 hover:border-rose-400/50 bg-white/5 hover:bg-purple-500/10 text-xs text-slate-300 hover:text-white transition-all flex items-center gap-1.5 cursor-pointer font-mono"
            title="Open Command Palette (Ctrl+K / Cmd+K)"
            aria-label="Search Command Palette"
          >
            <Search className="size-3.5 text-rose-400" />
            <span className="text-xs">Search</span>
            <kbd className="text-[10px] bg-white/10 px-1 py-0.5 rounded border border-white/10 text-slate-400">
              ⌘K
            </kbd>
          </button>

          <a
            href={OWNER.github}
            target="_blank"
            rel="noopener noreferrer"
            className="px-3 py-1.5 rounded-xl border border-purple-500/40 text-purple-300 text-xs font-semibold hover:bg-purple-500/10 transition-all"
          >
            GitHub
          </a>
          <ThemeToggle />
        </div>

        {/* Mobile Header Controls */}
        <div className="md:hidden flex items-center gap-2.5">
          <button
            onClick={triggerPalette}
            aria-label="Open search command palette"
            className="p-1.5 rounded-lg border border-purple-500/30 text-rose-400 bg-white/5"
          >
            <Search className="size-4" />
          </button>
          <ThemeToggle />
          <button
            onClick={() => setOpen(!open)}
            aria-label="Toggle navigation menu"
            aria-expanded={open}
            className="text-slate-300 text-xl p-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-400 rounded-lg"
          >
            ☰
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {open && (
        <div className="md:hidden glass px-6 pb-5 pt-2 flex flex-col gap-2.5 border-b border-purple-500/20">
          <div className="grid grid-cols-2 gap-2 pb-2 border-b border-white/5">
            <Link
              href="/lab"
              onClick={() => setOpen(false)}
              className="flex items-center justify-between text-xs font-semibold p-2 rounded-lg bg-emerald-500/10 text-emerald-300 border border-emerald-500/30"
            >
              <div className="flex items-center gap-1.5">
                <FlaskConical className="size-3.5 text-emerald-400" />
                <span>AI Lab</span>
              </div>
              <span className="text-[8px] font-mono font-bold px-1 py-0.2 rounded bg-amber-500/20 text-amber-300 border border-amber-500/40">BETA</span>
            </Link>
            <Link
              href="/recruiter"
              onClick={() => setOpen(false)}
              className="flex items-center justify-between text-xs font-semibold p-2 rounded-lg bg-purple-500/10 text-purple-300 border border-purple-500/30"
            >
              <div className="flex items-center gap-1.5">
                <Briefcase className="size-3.5 text-rose-400" />
                <span>Recruiter</span>
              </div>
              <span className="text-[8px] font-mono font-bold px-1 py-0.2 rounded bg-amber-500/20 text-amber-300 border border-amber-500/40">BETA</span>
            </Link>
            <Link
              href="/resume"
              onClick={() => setOpen(false)}
              className="flex items-center gap-1.5 text-xs font-semibold p-2 rounded-lg bg-white/5 text-slate-200 border border-white/10"
            >
              <FileText className="size-3.5" />
              <span>ATS Resume</span>
            </Link>
            <Link
              href="/github-health"
              onClick={() => setOpen(false)}
              className="flex items-center justify-between text-xs font-semibold p-2 rounded-lg bg-blue-500/10 text-blue-300 border border-blue-500/30"
            >
              <div className="flex items-center gap-1.5">
                <Activity className="size-3.5" />
                <span>Code Health</span>
              </div>
              <span className="text-[8px] font-mono font-bold px-1 py-0.2 rounded bg-amber-500/20 text-amber-300 border border-amber-500/40">BETA</span>
            </Link>
          </div>

          {NAV_LINKS.map((link) => {
            const isActive = activeSection === link.toLowerCase()
            return (
              <a
                key={link}
                href={`#${link.toLowerCase()}`}
                onClick={() => setOpen(false)}
                className={`text-sm py-1.5 px-3 rounded-lg transition-colors ${
                  isActive
                    ? 'text-white font-semibold bg-purple-500/20 border border-purple-500/40'
                    : 'text-slate-300 hover:text-purple-300'
                }`}
              >
                {link}
              </a>
            )
          })}
          <div className="flex gap-3 pt-2">
            <a
              href={OWNER.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 text-center py-2.5 border border-purple-500/50 text-purple-300 rounded-xl text-xs font-semibold"
            >
              GitHub ↗
            </a>
            <a
              href={OWNER.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 text-center py-2.5 bg-[#0A66C2] text-white rounded-xl text-xs font-semibold"
            >
              LinkedIn ↗
            </a>
          </div>
        </div>
      )}
    </nav>
  )
}
