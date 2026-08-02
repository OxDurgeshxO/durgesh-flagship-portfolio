"use client"
import { useState, useEffect } from 'react'
import { OWNER } from '@/lib/data'

const NAV_LINKS = ['About','Skills','Experience','Projects','Education','Contact']

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handler)
    return () => window.removeEventListener('scroll', handler)
  }, [])

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'glass shadow-lg shadow-purple-500/10' : 'bg-transparent'}`}>
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <a href="#" className="text-xl font-bold gradient-text font-mono">DDS<span className="text-purple-400">.</span></a>
        <div className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map(link => (
            <a key={link} href={`#${link.toLowerCase()}`}
              className="text-sm text-slate-400 hover:text-white transition-colors hover:text-purple-300">
              {link}
            </a>
          ))}
          <a href={OWNER.github} target="_blank" rel="noopener noreferrer"
            className="px-4 py-2 rounded-lg border border-purple-500/50 text-purple-300 text-sm hover:bg-purple-500/10 transition-all">
            GitHub
          </a>
          <a href={OWNER.linkedin} target="_blank" rel="noopener noreferrer"
            className="px-4 py-2 rounded-lg bg-[#0A66C2] text-white text-sm hover:bg-[#004182] transition-all">
            LinkedIn
          </a>
        </div>
        <button onClick={() => setOpen(!open)} className="md:hidden text-slate-300 text-2xl">☰</button>
      </div>
      {open && (
        <div className="md:hidden glass px-6 pb-4 flex flex-col gap-4">
          {NAV_LINKS.map(link => (
            <a key={link} href={`#${link.toLowerCase()}`} onClick={() => setOpen(false)}
              className="text-slate-300 hover:text-purple-300 transition-colors">{link}</a>
          ))}
          <div className="flex gap-3 pt-2">
            <a href={OWNER.github} target="_blank" rel="noopener noreferrer" className="flex-1 text-center py-2 border border-purple-500/50 text-purple-300 rounded-lg text-sm">GitHub</a>
            <a href={OWNER.linkedin} target="_blank" rel="noopener noreferrer" className="flex-1 text-center py-2 bg-[#0A66C2] text-white rounded-lg text-sm">LinkedIn</a>
          </div>
        </div>
      )}
    </nav>
  )
}
