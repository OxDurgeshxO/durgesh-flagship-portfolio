"use client"
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { OWNER } from '@/lib/data'
import { Search, Briefcase, FileText, FlaskConical, Activity, History } from 'lucide-react'
import ThemeControl from '@/components/ThemeControl'

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

  useEffect(() => {
    if (!open) return
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false)
      }
    }
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [open])

  const triggerPalette = () => {
    window.dispatchEvent(new CustomEvent('open-command-palette'))
  }

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'glass shadow-lg shadow-black/10 backdrop-blur-xl' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3.5 flex items-center justify-between">
        {/* Brand Monogram */}
        <a href="/" className="text-xl font-bold gradient-text font-mono tracking-tight flex items-center gap-1">
          <span>DDS</span>
          <span className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-pulse" />
        </a>

        {/* Desktop Navigation Links */}
        <div className="hidden md:flex items-center gap-4">
          <div className="flex items-center gap-1 glass px-2 py-1 rounded-xl border border-border/60 bg-card/60">
            {NAV_LINKS.map((link) => {
              const isActive = activeSection === link.toLowerCase()
              return (
                <a
                  key={link}
                  // Absolute path + hash, not a bare `#section`. The Navbar also renders on
                  // /404.html and the error page, where a bare hash has no matching id and
                  // clicking a nav item did nothing. `/#section` resolves from any route.
                  href={`/#${link.toLowerCase()}`}
                  className={`text-xs sm:text-sm font-medium transition-all px-3 py-1 rounded-lg ${
                    isActive
                      ? 'text-white font-semibold bg-gradient-to-r from-[var(--gradient-start)]/40 to-[var(--gradient-end)]/40 border border-primary/40 shadow-sm shadow-black/20'
                      : 'text-muted-foreground hover:text-ink hover:bg-muted'
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
            className="px-3 py-1.5 rounded-xl border border-[var(--accent-lab-border)] bg-[var(--accent-lab-bg)] hover:bg-emerald-500/20 text-[var(--accent-lab)] text-xs font-semibold flex items-center gap-1.5 transition-all shadow-sm shadow-black/5"
            title="Interactive AI Engineering Lab"
          >
            <FlaskConical className="size-3 text-[var(--accent-lab)]" />
            <span>AI Lab</span>
          </Link>

          <Link
            href="/recruiter"
            className="px-3 py-1.5 rounded-xl border border-primary/40 bg-primary/10 hover:bg-primary/10 text-primary text-xs font-semibold flex items-center gap-1.5 transition-all shadow-sm shadow-black/10"
            title="Recruiter Fast-Track"
          >
            <Briefcase className="size-3 text-secondary" />
            <span>Recruiter Mode</span>
          </Link>

          <Link
            href="/resume"
            className="px-2.5 py-1.5 rounded-xl border border-border hover:border-border-strong bg-muted text-body hover:text-ink text-xs font-medium flex items-center gap-1.5 transition-all"
          >
            <FileText className="size-3" />
            <span>Resume</span>
          </Link>

          {/* Quick Search Palette Trigger */}
          <button
            onClick={triggerPalette}
            className="px-2.5 py-1.5 rounded-xl border border-primary/40 hover:border-rose-400/50 bg-muted hover:bg-primary/10 text-xs text-body hover:text-ink transition-all flex items-center gap-1.5 cursor-pointer font-mono"
            title="Open Command Palette (Ctrl+K / Cmd+K)"
            aria-label="Search Command Palette"
          >
            <Search className="size-3.5 text-secondary" />
            <span className="text-xs">Search</span>
            <kbd className="text-[10px] bg-accent px-1 py-0.5 rounded border border-border text-muted-foreground">
              Ctrl+K
            </kbd>
          </button>

          <a
            href={OWNER.github}
            target="_blank"
            rel="noopener noreferrer"
            className="px-3 py-1.5 rounded-xl border border-primary/40 text-primary text-xs font-semibold hover:bg-primary/10 transition-all"
          >
            GitHub
          </a>

          <ThemeControl />
          
        </div>

        {/* Mobile Header Controls */}
        <div className="md:hidden flex items-center gap-2.5">
          <button
            onClick={triggerPalette}
            aria-label="Open search command palette"
            className="p-1.5 rounded-lg border border-primary/40 text-secondary bg-muted"
          >
            <Search className="size-4" />
          </button>

          <ThemeControl />
          
          <button
            onClick={() => setOpen(!open)}
            aria-label="Toggle navigation menu"
            aria-expanded={open}
            aria-controls={open ? 'mobile-nav-menu' : undefined}
            className="text-body text-xl p-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-400 rounded-lg"
          >
            ☰
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {open && (
        <div id="mobile-nav-menu" className="md:hidden glass px-6 pb-5 pt-2 flex flex-col gap-2.5 border-b border-primary/30">
          <div className="grid grid-cols-2 gap-2 pb-2 border-b border-border/60">
            <Link
              href="/lab"
              onClick={() => setOpen(false)}
              className="flex items-center justify-between text-xs font-semibold p-2 rounded-lg bg-[var(--accent-lab-bg)] text-[var(--accent-lab)] border border-[var(--accent-lab-border)]"
            >
              <div className="flex items-center gap-1.5">
                <FlaskConical className="size-3.5 text-[var(--accent-lab)]" />
                <span>AI Lab</span>
              </div>
            </Link>
            <Link
              href="/recruiter"
              onClick={() => setOpen(false)}
              className="flex items-center justify-between text-xs font-semibold p-2 rounded-lg bg-primary/10 text-primary border border-primary/40"
            >
              <div className="flex items-center gap-1.5">
                <Briefcase className="size-3.5 text-secondary" />
                <span>Recruiter</span>
              </div>
            </Link>
            <Link
              href="/resume"
              onClick={() => setOpen(false)}
              className="flex items-center gap-1.5 text-xs font-semibold p-2 rounded-lg bg-muted text-ink border border-border"
            >
              <FileText className="size-3.5" />
              <span>ATS Resume</span>
            </Link>
            <Link
              href="/github-health"
              onClick={() => setOpen(false)}
              className="flex items-center justify-between text-xs font-semibold p-2 rounded-lg bg-[var(--accent-signal-bg)] text-[var(--accent-signal)] border border-[var(--accent-signal-border)]"
            >
              <div className="flex items-center gap-1.5">
                <Activity className="size-3.5" />
                <span>Code Health</span>
              </div>
            </Link>
          </div>

          {NAV_LINKS.map((link) => {
            const isActive = activeSection === link.toLowerCase()
            return (
              <a
                key={link}
                href={`/#${link.toLowerCase()}`}
                onClick={() => setOpen(false)}
                className={`text-sm py-1.5 px-3 rounded-lg transition-colors ${
                  isActive
                    ? 'text-white font-semibold bg-primary/10 border border-primary/40'
                    : 'text-body hover:text-primary'
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
              className="flex-1 text-center py-2.5 border border-primary/40 text-primary rounded-xl text-xs font-semibold"
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
