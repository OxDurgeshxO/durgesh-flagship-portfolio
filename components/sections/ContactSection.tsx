"use client"

import { useState } from 'react'
import { motion } from 'framer-motion'
import { OWNER } from '@/lib/data'

const SUBJECT_OPTIONS = [
  '💼 Job Opportunity',
  '🤝 Project Collaboration',
  '🤖 AI / ML Architecture',
  '☕ Casual Tech Chat',
]

export default function ContactSection() {
  const [form, setForm] = useState({ name: '', email: '', subject: SUBJECT_OPTIONS[0], message: '' })
  const [gotcha, setGotcha] = useState('')
  const [copied, setCopied] = useState(false)
  const [draftCopied, setDraftCopied] = useState(false)
  const [status, setStatus] = useState<'idle' | 'sent'>('idle')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(OWNER.email)
    setCopied(true)
    setTimeout(() => setCopied(false), 2500)
  }

  const handleCopyDraft = () => {
    const draftText = `To: ${OWNER.email}\nSubject: [${form.subject}] Message from ${form.name || 'Anonymous'}\nFrom: ${form.name || 'Anonymous'} <${form.email || 'not provided'}>\n\nMessage:\n${form.message || '(No message content)'}`
    navigator.clipboard.writeText(draftText)
    setDraftCopied(true)
    setTimeout(() => setDraftCopied(false), 3000)
  }

  const handleMailtoFallback = () => {
    const mailtoUrl = `mailto:${OWNER.email}?subject=${encodeURIComponent(
      `[${form.subject}] Message from ${form.name}`
    )}&body=${encodeURIComponent(
      `Name: ${form.name}\nEmail: ${form.email}\nTopic: ${form.subject}\n\nMessage:\n${form.message}`
    )}`
    window.location.href = mailtoUrl
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          subject: form.subject,
          message: form.message,
          _gotcha: gotcha,
        }),
      })
      let data: any = null
      try {
        data = await res.json()
      } catch {
        // Non-JSON response
      }

      if (!res.ok) {
        throw new Error(
          data?.error || `Unable to deliver message (HTTP ${res.status}). Please use the email client button below.`
        )
      }
      setStatus('sent')
    } catch (err: any) {
      setError(err.message || 'Transmission failed. You can copy the draft or use your email client directly.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <section id="contact" className="section-padding max-w-6xl mx-auto px-4 sm:px-6">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="text-center mb-16"
      >
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-semibold bg-rose-500/10 text-rose-300 border border-rose-500/25 mb-4 shadow-sm shadow-rose-500/10">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span>Available for AIML & Full-Stack Engineering Roles</span>
        </div>
        <h2 className="text-3xl md:text-5xl font-bold mb-3 tracking-tight">
          Get In <span className="gradient-text">Touch</span>
        </h2>
        <div className="w-24 h-1 bg-gradient-to-r from-purple-500 via-rose-400 to-purple-500 rounded mx-auto mb-4" />
        <p className="text-slate-400 max-w-xl mx-auto text-sm md:text-base">
          Whether you have an opportunity, an AI architecture question, or want to collaborate on cutting-edge models, I&apos;d love to connect.
        </p>
      </motion.div>

      <div className="grid lg:grid-cols-5 gap-8 items-start">
        {/* Left 2 Cols: Connect Info & Direct Links */}
        <motion.div
          initial={{ opacity: 0, x: -35 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="lg:col-span-2 space-y-4"
        >
          {/* Quick Copy Email Card */}
          <div className="glass rounded-2xl p-5 border border-white/10 hover:border-purple-500/40 transition-all group relative overflow-hidden">
            <div className="flex items-start justify-between gap-3 mb-2">
              <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-xl text-purple-300">
                ✉️
              </div>
              <button
                onClick={handleCopyEmail}
                className="px-2.5 py-1 rounded-lg text-xs font-semibold bg-white/5 hover:bg-purple-500/20 text-purple-300 border border-white/10 hover:border-purple-500/30 transition-all active:scale-95 cursor-pointer"
              >
                {copied ? '✓ Copied!' : 'Copy'}
              </button>
            </div>
            <div className="text-xs text-slate-400 font-medium">Direct Email</div>
            <div className="text-sm md:text-base font-semibold text-white group-hover:text-purple-300 transition-colors truncate">
              {OWNER.email}
            </div>
          </div>

          {/* Location Card */}
          <div className="glass rounded-2xl p-5 border border-white/10">
            <div className="flex items-center gap-3 mb-1">
              <div className="w-10 h-10 rounded-xl bg-rose-500/10 border border-rose-500/20 flex items-center justify-center text-xl text-rose-300">
                📍
              </div>
              <div>
                <div className="text-xs text-slate-400 font-medium">Location</div>
                <div className="text-sm font-semibold text-white">{OWNER.location}</div>
              </div>
            </div>
            <p className="text-xs text-slate-400 mt-2 pl-1">Timezone: IST (UTC+5:30) • Open to Remote & Hybrid</p>
          </div>

          {/* Social Profiles Card */}
          <div className="glass rounded-2xl p-5 border border-white/10 space-y-3">
            <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Professional Profiles</div>
            <div className="grid grid-cols-2 gap-3">
              <a
                href={OWNER.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-[#0A66C2]/15 text-[#38bdf8] border border-[#0A66C2]/30 hover:bg-[#0A66C2] hover:text-white transition-all text-xs font-semibold"
              >
                <span>LinkedIn</span>
                <span>↗</span>
              </a>
              <a
                href={OWNER.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl glass border border-white/15 text-slate-200 hover:border-purple-400/50 hover:text-purple-300 transition-all text-xs font-semibold"
              >
                <span>GitHub</span>
                <span>↗</span>
              </a>
            </div>
          </div>
        </motion.div>

        {/* Right 3 Cols: Restructured Form */}
        <motion.div
          initial={{ opacity: 0, x: 35 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="lg:col-span-3"
        >
          <form
            onSubmit={handleSubmit}
            className="glass rounded-3xl p-6 sm:p-8 border border-white/10 shadow-2xl relative overflow-hidden space-y-5"
          >
            {status === 'sent' ? (
              <div className="text-center py-12">
                <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 flex items-center justify-center text-3xl mx-auto mb-4">
                  ✓
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Message Dispatched!</h3>
                <p className="text-slate-300 text-sm max-w-md mx-auto mb-4">
                  Your email client has been prepared with your message. Thank you for reaching out!
                </p>
                <div className="flex flex-wrap items-center justify-center gap-3">
                  <button
                    type="button"
                    onClick={handleCopyDraft}
                    className="px-5 py-2.5 rounded-xl bg-purple-500/20 text-purple-300 border border-purple-500/30 text-xs font-semibold hover:bg-purple-500/30 transition-all cursor-pointer"
                  >
                    {draftCopied ? '✓ Copied to Clipboard!' : '📋 Copy Draft Backup'}
                  </button>
                  <button
                    type="button"
                    onClick={() => setStatus('idle')}
                    className="px-5 py-2.5 rounded-xl glass border border-white/20 text-xs text-slate-300 hover:text-white cursor-pointer"
                  >
                    Send Another Message
                  </button>
                </div>
              </div>
            ) : (
              <>
                {/* Beta Mode Notice */}
                <div className="flex items-center justify-between border-b border-white/10 pb-2.5 mb-1 text-[11px] font-mono">
                  <span className="text-slate-400 flex items-center gap-1.5">
                    <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                    Direct Message Dispatch
                  </span>
                  <span className="px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/40 text-[10px] font-bold uppercase tracking-wider">
                    Beta Feature · To be improvised soon
                  </span>
                </div>

                {/* Subject Selector */}
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-2">What would you like to discuss?</label>
                  <div className="flex flex-wrap gap-2">
                    {SUBJECT_OPTIONS.map((sub) => (
                      <button
                        key={sub}
                        type="button"
                        onClick={() => setForm({ ...form, subject: sub })}
                        className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all cursor-pointer ${
                          form.subject === sub
                            ? 'bg-gradient-to-r from-purple-600 to-rose-500 text-white shadow-md shadow-purple-500/20'
                            : 'bg-white/5 text-slate-400 hover:text-white border border-white/5 hover:border-white/20'
                        }`}
                      >
                        {sub}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Name & Email Row */}
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1.5">Your Name</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Alex Morgan"
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-rose-400 focus:ring-1 focus:ring-rose-400 transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1.5">Your Email</label>
                    <input
                      type="email"
                      required
                      placeholder="alex@company.com"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-rose-400 focus:ring-1 focus:ring-rose-400 transition-all"
                    />
                  </div>
                </div>

                {/* Honeypot hidden input for spam bots */}
                <input
                  type="text"
                  name="_gotcha"
                  tabIndex={-1}
                  autoComplete="off"
                  value={gotcha}
                  onChange={(e) => setGotcha(e.target.value)}
                  style={{ display: 'none', position: 'absolute', left: '-9999px' }}
                />

                {/* Message Box */}
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1.5">Message</label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Tell me about your project, team, or ideas..."
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-rose-400 focus:ring-1 focus:ring-rose-400 transition-all resize-none"
                  />
                </div>

                {error && (
                  <div className="rounded-xl border border-rose-500/30 bg-rose-500/10 p-3 text-xs text-rose-300 flex flex-col gap-2">
                    <p>{error}</p>
                    <button
                      type="button"
                      onClick={handleMailtoFallback}
                      className="self-start text-[11px] font-semibold text-rose-200 underline hover:text-white"
                    >
                      Open Email Client →
                    </button>
                  </div>
                )}

                {/* Dual Submit Buttons */}
                <div className="flex flex-col sm:flex-row gap-3 pt-2">
                  <button
                    type="submit"
                    disabled={loading}
                    className="flex-1 py-3.5 rounded-xl bg-gradient-to-r from-purple-600 via-indigo-600 to-rose-500 text-white font-semibold hover:opacity-95 active:scale-[0.99] transition-all shadow-lg shadow-purple-500/25 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                  >
                    <span>{loading ? 'Sending...' : 'Send Message'}</span>
                    <span>✉️</span>
                  </button>
                  <button
                    type="button"
                    onClick={handleCopyDraft}
                    className="py-3.5 px-5 rounded-xl glass border border-purple-500/30 hover:border-rose-400/60 text-purple-200 hover:text-white text-xs font-semibold transition-all active:scale-[0.99] flex items-center justify-center gap-2 cursor-pointer shadow-md"
                    title="Copy formatted message draft to paste into Gmail, Outlook, or LinkedIn"
                  >
                    <span>{draftCopied ? '✓ Draft Copied!' : '📋 Copy Draft to Clipboard'}</span>
                  </button>
                </div>
              </>
            )}
          </form>
        </motion.div>
      </div>
    </section>
  )
}
