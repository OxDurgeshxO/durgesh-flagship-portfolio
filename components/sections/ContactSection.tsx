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
  const [copied, setCopied] = useState(false)
  const [status, setStatus] = useState<'idle' | 'sent'>('idle')

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(OWNER.email)
    setCopied(true)
    setTimeout(() => setCopied(false), 2500)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const mailtoUrl = `mailto:${OWNER.email}?subject=${encodeURIComponent(
      `[${form.subject}] Message from ${form.name}`
    )}&body=${encodeURIComponent(
      `Name: ${form.name}\nEmail: ${form.email}\nTopic: ${form.subject}\n\nMessage:\n${form.message}`
    )}`
    window.location.href = mailtoUrl
    setStatus('sent')
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
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-semibold bg-cyan-500/10 text-cyan-300 border border-cyan-500/25 mb-4">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span>Available for AIML & Full-Stack Engineering Roles</span>
        </div>
        <h2 className="text-3xl md:text-5xl font-bold mb-3 tracking-tight">
          Get In <span className="gradient-text">Touch</span>
        </h2>
        <div className="w-24 h-1 bg-gradient-to-r from-purple-500 via-cyan-400 to-emerald-400 rounded mx-auto mb-4" />
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
                className="px-2.5 py-1 rounded-lg text-xs font-semibold bg-white/5 hover:bg-purple-500/20 text-purple-300 border border-white/10 hover:border-purple-500/30 transition-all active:scale-95"
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
              <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-xl text-cyan-300">
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
                <p className="text-slate-300 text-sm max-w-md mx-auto mb-6">
                  Your email client has been prepared with your message. Thank you for reaching out!
                </p>
                <button
                  type="button"
                  onClick={() => setStatus('idle')}
                  className="px-6 py-2.5 rounded-xl glass border border-white/20 text-sm text-slate-300 hover:text-white"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <>
                {/* Subject Selector */}
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-2">What would you like to discuss?</label>
                  <div className="flex flex-wrap gap-2">
                    {SUBJECT_OPTIONS.map((sub) => (
                      <button
                        key={sub}
                        type="button"
                        onClick={() => setForm({ ...form, subject: sub })}
                        className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all ${
                          form.subject === sub
                            ? 'bg-gradient-to-r from-purple-600 to-cyan-500 text-white shadow-md shadow-purple-500/20'
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
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-all"
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
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-all"
                    />
                  </div>
                </div>

                {/* Message Box */}
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1.5">Message</label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Tell me about your project, team, or ideas..."
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-all resize-none"
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="w-full py-3.5 rounded-xl bg-gradient-to-r from-purple-600 via-indigo-600 to-cyan-500 text-white font-semibold hover:opacity-95 active:scale-[0.99] transition-all shadow-lg shadow-purple-500/25 flex items-center justify-center gap-2"
                >
                  <span>Send Message</span>
                  <span>✉️</span>
                </button>
              </>
            )}
          </form>
        </motion.div>
      </div>
    </section>
  )
}
