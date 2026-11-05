"use client"

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FileDown, Copy, Check, ShieldCheck, Compass, Sparkles, X } from 'lucide-react'
import { trackEvent } from '@/lib/analytics'

interface CyberBotQuickDialProps {
  visible: boolean
  onClose: () => void
  onStartTour: () => void
  onPlayChime?: (f1?: number, f2?: number) => void
}

export default function CyberBotQuickDial({
  visible,
  onClose,
  onStartTour,
  onPlayChime,
}: CyberBotQuickDialProps) {
  const [copied, setCopied] = useState(false)

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText('durgeshsinha1234567@gmail.com')
      setCopied(true)
      onPlayChime?.(600, 1100)
      trackEvent('copy_email', { source: 'cyberbot_quick_dial' })
      setTimeout(() => setCopied(false), 2400)
    } catch {}
  }

  const downloadResume = () => {
    onPlayChime?.(520, 1200)
    trackEvent('resume_download', { source: 'cyberbot_quick_dial' })
    const link = document.createElement('a')
    link.href = '/resume.pdf'
    link.download = 'Durgesh_Sinha_Resume_2026.pdf'
    link.target = '_blank'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, scale: 0.88, y: 14 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 10 }}
          transition={{ type: 'spring', stiffness: 450, damping: 28 }}
          className="absolute bottom-[104%] right-0 w-72 pointer-events-auto select-none z-50 mb-2"
        >
          <div className="glass rounded-2xl p-3.5 border border-primary/50 shadow-2xl shadow-purple-500/30 backdrop-blur-2xl bg-popover/95">
            {/* Header */}
            <div className="flex items-center justify-between pb-2 mb-2.5 border-b border-border/80">
              <div className="flex items-center gap-1.5 text-xs font-mono font-bold text-primary">
                <Sparkles className="size-3.5 text-amber-400" />
                <span>Recruiter Quick-Dial</span>
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  onClose()
                }}
                className="text-muted-foreground hover:text-foreground text-xs p-1 rounded hover:bg-white/10 transition-colors"
                title="Close Quick-Dial"
                aria-label="Close Quick Dial"
              >
                <X className="size-3.5" />
              </button>
            </div>

            {/* Action Buttons */}
            <div className="space-y-1.5">
              {/* 1. Download Resume PDF */}
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  downloadResume()
                }}
                className="w-full px-3 py-2 rounded-xl text-xs font-medium bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 flex items-center justify-between transition-all active:scale-98"
              >
                <div className="flex items-center gap-2">
                  <FileDown className="size-3.5 text-emerald-400" />
                  <span>Download Resume PDF</span>
                </div>
                <span className="text-[10px] font-mono opacity-70">1-Page</span>
              </button>

              {/* 2. One-Click Copy Email */}
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  copyEmail()
                }}
                className="w-full px-3 py-2 rounded-xl text-xs font-medium bg-primary/10 hover:bg-primary/20 text-primary border border-primary/30 flex items-center justify-between transition-all active:scale-98"
              >
                <div className="flex items-center gap-2">
                  {copied ? (
                    <Check className="size-3.5 text-emerald-400" />
                  ) : (
                    <Copy className="size-3.5 text-purple-400" />
                  )}
                  <span>{copied ? 'Email Copied!' : 'Copy Direct Email'}</span>
                </div>
                <span className="text-[10px] font-mono opacity-70">
                  {copied ? '✓ In Clipboard' : 'Gmail'}
                </span>
              </button>

              {/* 3. Verified Audit PDF */}
              <a
                href="/technical_audit_report.pdf"
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => {
                  e.stopPropagation()
                  onPlayChime?.(600, 950)
                }}
                className="w-full px-3 py-2 rounded-xl text-xs font-medium bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 border border-amber-500/30 flex items-center justify-between transition-all active:scale-98 block"
              >
                <div className="flex items-center gap-2">
                  <ShieldCheck className="size-3.5 text-amber-400" />
                  <span>Audit Report PDF</span>
                </div>
                <span className="text-[10px] font-mono opacity-70">A4 Verified</span>
              </a>

              {/* 4. Recruiter Tour */}
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  onClose()
                  onStartTour()
                }}
                className="w-full px-3 py-2 rounded-xl text-xs font-medium bg-purple-500/10 hover:bg-purple-500/20 text-purple-300 border border-purple-500/30 flex items-center justify-between transition-all active:scale-98"
              >
                <div className="flex items-center gap-2">
                  <Compass className="size-3.5 text-purple-400" />
                  <span>Guided Recruiter Tour</span>
                </div>
                <span className="text-[10px] font-mono opacity-70">5 Stops</span>
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
