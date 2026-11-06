"use client"

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FileDown, Copy, Check, ShieldCheck, Compass, Sparkles, X, Target, Mail, RotateCcw } from 'lucide-react'
import { trackEvent } from '@/lib/analytics'

interface CyberBotQuickDialProps {
  visible: boolean
  onClose: () => void
  onStartTour: () => void
  onPlayChime?: (f1?: number, f2?: number) => void
}

type RoleType = 'aiml' | 'fullstack' | 'founding'
type PriorityType = 'agents' | 'vision' | 'edge'

export default function CyberBotQuickDial({
  visible,
  onClose,
  onStartTour,
  onPlayChime,
}: CyberBotQuickDialProps) {
  const [copied, setCopied] = useState(false)
  const [tab, setTab] = useState<'actions' | 'screener'>('actions')
  const [screenStep, setScreenStep] = useState<1 | 2 | 3>(1)
  const [selectedRole, setSelectedRole] = useState<RoleType | null>(null)
  const [selectedPriority, setSelectedPriority] = useState<PriorityType | null>(null)

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
    link.rel = 'noopener noreferrer'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const resetScreener = () => {
    setScreenStep(1)
    setSelectedRole(null)
    setSelectedPriority(null)
  }

  const getRoleTitle = (r: RoleType | null) => {
    if (r === 'aiml') return 'AI/ML Systems Engineer'
    if (r === 'fullstack') return 'Full-Stack & Edge Architect'
    return 'Founding Engineer'
  }

  const getRecommendation = () => {
    if (selectedRole === 'aiml' || selectedPriority === 'agents') {
      return {
        flagship: 'RoleRadar AI + Jarvis Realtime Voice',
        tag: 'Agentic AI & Evaluation',
        metrics: '16 evaluation dimensions • Multi-model LLM scoring • Sub-200ms voice pipeline',
        link: 'https://rolefit-2.vercel.app',
        linkLabel: 'Inspect RoleRadar Demo'
      }
    }
    if (selectedPriority === 'vision') {
      return {
        flagship: 'AI Fitness Platform (FitTrack) + CNN Deep Learning',
        tag: 'Computer Vision & Kinematics',
        metrics: 'Sub-50ms MediaPipe pose landmarks • Real-time audio correction • PyTorch CNN',
        link: '/work/fittrack',
        linkLabel: 'Read FitTrack Study'
      }
    }
    return {
      flagship: 'Full-Stack Portfolio + SpaceEdu Orbital Engine',
      tag: 'Next.js & Cloudflare Edge',
      metrics: '754ms LCP • Zero server attack surface • 92 automated tests • Kepler physics',
      link: '/work/spaceedu',
      linkLabel: 'Explore 3D Simulation'
    }
  }

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, scale: 0.88, y: 14 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 10 }}
          transition={{ type: 'spring', stiffness: 450, damping: 28 }}
          className="absolute bottom-[104%] right-0 w-80 sm:w-84 pointer-events-auto select-none z-50 mb-2 font-sans"
        >
          <div className="rounded-2xl p-4 border border-purple-500/40 shadow-[0_16px_48px_rgba(0,0,0,0.85)] backdrop-blur-2xl relative bg-[#0b0f17]/96 text-slate-100">
            {/* Header */}
            <div className="flex items-center justify-between pb-2 mb-2 border-b border-white/10">
              <div className="flex items-center gap-1.5 text-xs font-mono font-bold text-purple-300">
                <Sparkles className="size-3.5 text-amber-400" />
                <span>CyberBot Recruiter Hub</span>
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  onClose()
                }}
                className="text-slate-400 hover:text-white text-xs min-w-[44px] min-h-[44px] flex items-center justify-center rounded-lg hover:bg-white/10 transition-colors"
                title="Close Quick-Dial (Esc)"
                aria-label="Close Quick Dial"
              >
                <X className="size-4" />
              </button>
            </div>

            {/* Mode Switcher Tabs */}
            <div className="grid grid-cols-2 gap-1 p-1 bg-white/5 rounded-xl mb-3 text-[11px] font-mono">
              <button
                onClick={() => setTab('actions')}
                className={`py-1.5 rounded-lg font-semibold transition-all flex items-center justify-center gap-1 ${
                  tab === 'actions'
                    ? 'bg-purple-600 text-white shadow-md'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <span>⚡ Quick Actions</span>
              </button>
              <button
                onClick={() => setTab('screener')}
                className={`py-1.5 rounded-lg font-semibold transition-all flex items-center justify-center gap-1 ${
                  tab === 'screener'
                    ? 'bg-purple-600 text-white shadow-md'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <Target className="size-3 text-amber-300" />
                <span>Candidate Screen</span>
              </button>
            </div>

            {tab === 'actions' ? (
              /* TAB 1: QUICK ACTIONS */
              <div className="space-y-2">
                {/* 1. Download Resume PDF */}
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    downloadResume()
                  }}
                  className="w-full px-3 py-2 min-h-[44px] rounded-xl text-xs font-semibold bg-emerald-500/15 hover:bg-emerald-500/25 text-emerald-300 border border-emerald-500/40 flex items-center justify-between transition-all active:scale-95"
                >
                  <div className="flex items-center gap-2">
                    <FileDown className="size-3.5 text-emerald-400" />
                    <span>Download Resume PDF</span>
                  </div>
                  <span className="text-[10px] font-mono opacity-80 bg-emerald-950/60 px-1.5 py-0.5 rounded border border-emerald-500/30">1-Page</span>
                </button>

                {/* 2. One-Click Copy Email */}
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    copyEmail()
                  }}
                  className="w-full px-3 py-2 min-h-[44px] rounded-xl text-xs font-semibold bg-purple-500/15 hover:bg-purple-500/25 text-purple-200 border border-purple-500/40 flex items-center justify-between transition-all active:scale-95"
                >
                  <div className="flex items-center gap-2">
                    {copied ? (
                      <Check className="size-3.5 text-emerald-400" />
                    ) : (
                      <Copy className="size-3.5 text-purple-400" />
                    )}
                    <span>{copied ? 'Email Copied!' : 'Copy Direct Email'}</span>
                  </div>
                  <span className="text-[10px] font-mono opacity-80 bg-purple-950/60 px-1.5 py-0.5 rounded border border-purple-500/30">
                    {copied ? '✓ In Clipboard' : 'Gmail'}
                  </span>
                </button>

                {/* 3. Verified Audit PDF */}
                <a
                  href="/V10_Audit_Hardening_Report.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => {
                    e.stopPropagation()
                    onPlayChime?.(600, 950)
                  }}
                  className="w-full px-3 py-2 min-h-[44px] rounded-xl text-xs font-semibold bg-amber-500/15 hover:bg-amber-500/25 text-amber-300 border border-amber-500/40 flex items-center justify-between transition-all active:scale-95 block"
                >
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="size-3.5 text-amber-400" />
                    <span>Audit Report PDF</span>
                  </div>
                  <span className="text-[10px] font-mono opacity-80 bg-amber-950/60 px-1.5 py-0.5 rounded border border-amber-500/30">A4 Verified</span>
                </a>

                {/* 4. Recruiter Tour */}
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    onClose()
                    onStartTour()
                  }}
                  className="w-full px-3 py-2 min-h-[44px] rounded-xl text-xs font-semibold bg-sky-500/15 hover:bg-sky-500/25 text-sky-300 border border-sky-500/40 flex items-center justify-between transition-all active:scale-95"
                >
                  <div className="flex items-center gap-2">
                    <Compass className="size-3.5 text-sky-400" />
                    <span>Guided Recruiter Tour</span>
                  </div>
                  <span className="text-[10px] font-mono opacity-80 bg-sky-950/60 px-1.5 py-0.5 rounded border border-sky-500/30">5 Stops</span>
                </button>
              </div>
            ) : (
              /* TAB 2: INTERACTIVE CANDIDATE SCREENER WIZARD */
              <div className="space-y-2.5">
                {screenStep === 1 && (
                  <div>
                    <div className="flex items-center justify-between text-[11px] font-mono text-purple-300 mb-2">
                      <span>Step 1 of 3: Target Role</span>
                      <span className="text-slate-400">33%</span>
                    </div>
                    <p className="text-xs text-slate-200 mb-2 font-medium">Which profile is your team seeking?</p>
                    <div className="space-y-1.5">
                      <button
                        onClick={() => {
                          setSelectedRole('aiml')
                          setScreenStep(2)
                          onPlayChime?.(550, 850)
                        }}
                        className="w-full text-left px-3 py-2 rounded-xl text-xs font-semibold bg-white/5 hover:bg-purple-500/20 text-slate-200 hover:text-white border border-white/10 hover:border-purple-500/40 transition-all min-h-[44px] flex items-center justify-between"
                      >
                        <span>🤖 AI/ML Systems Engineer</span>
                        <span className="text-[10px] font-mono text-purple-400">GenAI & Vision</span>
                      </button>
                      <button
                        onClick={() => {
                          setSelectedRole('fullstack')
                          setScreenStep(2)
                          onPlayChime?.(550, 850)
                        }}
                        className="w-full text-left px-3 py-2 rounded-xl text-xs font-semibold bg-white/5 hover:bg-purple-500/20 text-slate-200 hover:text-white border border-white/10 hover:border-purple-500/40 transition-all min-h-[44px] flex items-center justify-between"
                      >
                        <span>🌐 Full-Stack & Edge Architect</span>
                        <span className="text-[10px] font-mono text-cyan-400">Next.js & Cloud</span>
                      </button>
                      <button
                        onClick={() => {
                          setSelectedRole('founding')
                          setScreenStep(2)
                          onPlayChime?.(550, 850)
                        }}
                        className="w-full text-left px-3 py-2 rounded-xl text-xs font-semibold bg-white/5 hover:bg-purple-500/20 text-slate-200 hover:text-white border border-white/10 hover:border-purple-500/40 transition-all min-h-[44px] flex items-center justify-between"
                      >
                        <span>⚡ Founding AI Engineer</span>
                        <span className="text-[10px] font-mono text-amber-400">0 to 1 Builder</span>
                      </button>
                    </div>
                  </div>
                )}

                {screenStep === 2 && (
                  <div>
                    <div className="flex items-center justify-between text-[11px] font-mono text-purple-300 mb-2">
                      <span>Step 2 of 3: Core Competency</span>
                      <span className="text-slate-400">66%</span>
                    </div>
                    <p className="text-xs text-slate-200 mb-2 font-medium">What is your top technical priority?</p>
                    <div className="space-y-1.5">
                      <button
                        onClick={() => {
                          setSelectedPriority('agents')
                          setScreenStep(3)
                          onPlayChime?.(600, 1000)
                        }}
                        className="w-full text-left px-3 py-2 rounded-xl text-xs font-semibold bg-white/5 hover:bg-purple-500/20 text-slate-200 hover:text-white border border-white/10 hover:border-purple-500/40 transition-all min-h-[44px] flex items-center justify-between"
                      >
                        <span>🧠 Agentic Swarms & LLMs</span>
                        <span className="text-[10px] font-mono text-purple-400">RoleRadar</span>
                      </button>
                      <button
                        onClick={() => {
                          setSelectedPriority('vision')
                          setScreenStep(3)
                          onPlayChime?.(600, 1000)
                        }}
                        className="w-full text-left px-3 py-2 rounded-xl text-xs font-semibold bg-white/5 hover:bg-purple-500/20 text-slate-200 hover:text-white border border-white/10 hover:border-purple-500/40 transition-all min-h-[44px] flex items-center justify-between"
                      >
                        <span>🏋️ Computer Vision & Pose</span>
                        <span className="text-[10px] font-mono text-emerald-400">MediaPipe</span>
                      </button>
                      <button
                        onClick={() => {
                          setSelectedPriority('edge')
                          setScreenStep(3)
                          onPlayChime?.(600, 1000)
                        }}
                        className="w-full text-left px-3 py-2 rounded-xl text-xs font-semibold bg-white/5 hover:bg-purple-500/20 text-slate-200 hover:text-white border border-white/10 hover:border-purple-500/40 transition-all min-h-[44px] flex items-center justify-between"
                      >
                        <span>🚀 Next.js & Sub-Second Latency</span>
                        <span className="text-[10px] font-mono text-sky-400">754ms LCP</span>
                      </button>
                    </div>
                    <button
                      onClick={() => setScreenStep(1)}
                      className="mt-2 text-[10px] font-mono text-slate-400 hover:text-slate-200 flex items-center gap-1"
                    >
                      <RotateCcw className="size-3" /> Back
                    </button>
                  </div>
                )}

                {screenStep === 3 && (
                  <div>
                    <div className="flex items-center justify-between text-[11px] font-mono text-emerald-400 mb-1.5">
                      <span>✓ Candidate Match Found</span>
                      <span className="bg-emerald-950/70 border border-emerald-500/40 px-1.5 py-0.5 rounded text-[10px]">98% Fit</span>
                    </div>

                    {/* Matched Details */}
                    {(() => {
                      const rec = getRecommendation()
                      const subject = encodeURIComponent(`Interview Screen: ${getRoleTitle(selectedRole)} - Durgesh Sinha`)
                      const body = encodeURIComponent(`Hi Durgesh,\n\nI reviewed your portfolio and CyberBot recommendation (${rec.flagship}). We would like to connect with you regarding a ${getRoleTitle(selectedRole)} role.\n\nBest regards,`)
                      const mailtoUrl = `mailto:durgeshsinha1234567@gmail.com?subject=${subject}&body=${body}`

                      return (
                        <div className="p-2.5 rounded-xl bg-purple-950/40 border border-purple-500/40 space-y-2 mb-2">
                          <div className="text-[11px] font-mono text-amber-300 font-bold">
                            {rec.tag}
                          </div>
                          <div className="text-xs font-semibold text-white">
                            {rec.flagship}
                          </div>
                          <p className="text-[11px] text-slate-300 leading-snug">
                            {rec.metrics}
                          </p>
                          <div className="pt-1 flex flex-col gap-1.5">
                            <a
                              href={mailtoUrl}
                              className="w-full px-3 py-2 min-h-[44px] rounded-xl text-xs font-bold bg-emerald-500 hover:bg-emerald-400 text-slate-950 flex items-center justify-center gap-1.5 transition-all shadow-lg active:scale-95"
                              onClick={() => {
                                trackEvent('schedule_interview_click', { role: selectedRole, priority: selectedPriority })
                                onPlayChime?.(600, 1200)
                              }}
                            >
                              <Mail className="size-3.5" />
                              <span>Schedule 15-Min Screen</span>
                            </a>
                            <div className="flex gap-1.5">
                              <button
                                onClick={downloadResume}
                                className="flex-1 px-2 py-1.5 min-h-[36px] rounded-lg text-[11px] font-medium bg-white/10 hover:bg-white/15 text-slate-200 border border-white/10 transition-all flex items-center justify-center gap-1"
                              >
                                <FileDown className="size-3" /> Resume PDF
                              </button>
                              <button
                                onClick={resetScreener}
                                className="px-2 py-1.5 min-h-[36px] rounded-lg text-[11px] font-mono text-slate-400 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 transition-all flex items-center justify-center gap-1"
                                title="Restart Screener"
                              >
                                <RotateCcw className="size-3" />
                              </button>
                            </div>
                          </div>
                        </div>
                      )
                    })()}
                  </div>
                )}
              </div>
            )}

            {/* Directional Tail Pointer with matching dark solid background */}
            <div className="absolute -bottom-2 right-12 w-3.5 h-3.5 bg-[#0b0f17] border-r border-b border-purple-500/40 rotate-45" />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
