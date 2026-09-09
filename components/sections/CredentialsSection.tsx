"use client"

import { useState } from 'react'
import { motion } from 'framer-motion'
import { EDUCATION, CERTIFICATIONS, VOLUNTEERING } from '@/lib/data'

type TabKey = 'all' | 'education' | 'certifications' | 'volunteering'

export default function CredentialsSection() {
  const [activeTab, setActiveTab] = useState<TabKey>('all')

  return (
    <section id="credentials" className="section-padding max-w-7xl mx-auto px-4 sm:px-6">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="text-center mb-12"
      >
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-semibold bg-indigo-500/10 text-indigo-300 border border-indigo-500/25 mb-4">
          <span>🎓 Academic & Professional Credentials</span>
        </div>
        <h2 className="text-3xl md:text-5xl font-bold mb-3 tracking-tight">
          Education & <span className="gradient-text">Certifications</span>
        </h2>
        <div className="w-24 h-1 bg-gradient-to-r from-purple-500 via-cyan-400 to-emerald-400 rounded mx-auto mb-4" />
        <p className="text-slate-400 max-w-xl mx-auto text-sm md:text-base">
          Formal academic foundation in AIML combined with verified industry certifications and social-good leadership.
        </p>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 mt-8">
          {[
            { id: 'all', label: 'All Credentials' },
            { id: 'education', label: '🎓 Education' },
            { id: 'certifications', label: '🏅 AWS Certifications' },
            { id: 'volunteering', label: '🤝 Volunteering' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as TabKey)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                activeTab === tab.id
                  ? 'bg-gradient-to-r from-purple-600 to-cyan-500 text-white shadow-lg shadow-purple-500/20'
                  : 'glass text-slate-400 hover:text-white border border-white/5 hover:border-white/20'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </motion.div>

      {/* Structured 3-Column Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Education Column */}
        {(activeTab === 'all' || activeTab === 'education') && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xl">🎓</span>
              <h3 className="text-base font-bold text-white uppercase tracking-wider text-xs">Education</h3>
            </div>
            {EDUCATION.map((edu, i) => (
              <div
                key={i}
                className="glass rounded-2xl p-6 border border-white/10 hover:border-cyan-500/40 transition-all flex flex-col justify-between group"
              >
                <div>
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-semibold bg-cyan-500/10 text-cyan-300 border border-cyan-500/20 mb-3 inline-block">
                    {edu.period}
                  </span>
                  <h4 className="text-base font-bold text-white mb-1 group-hover:text-cyan-300 transition-colors">
                    {edu.degree}
                  </h4>
                  <p className="text-slate-300 text-sm font-medium mb-3">{edu.institution}</p>
                </div>
                <div className="pt-3 border-t border-white/5 text-xs text-slate-400">
                  {edu.grade}
                </div>
              </div>
            ))}
          </motion.div>
        )}

        {/* Certifications Column */}
        {(activeTab === 'all' || activeTab === 'certifications') && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xl">🏅</span>
              <h3 className="text-base font-bold text-white uppercase tracking-wider text-xs">Verified Certifications</h3>
            </div>
            {CERTIFICATIONS.map((cert, i) => (
              <div
                key={i}
                className="glass rounded-2xl p-6 border border-white/10 hover:border-amber-500/40 transition-all group"
              >
                <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-xl mb-4">
                  ☁️
                </div>
                <h4 className="text-base font-bold text-white mb-1.5 group-hover:text-amber-300 transition-colors">
                  {cert.name}
                </h4>
                <div className="flex items-center gap-2 text-xs text-slate-400 mt-2">
                  <span className="w-2 h-2 rounded-full" style={{ background: cert.color }} />
                  <span>{cert.issuer}</span>
                </div>
              </div>
            ))}
          </motion.div>
        )}

        {/* Volunteering & Leadership Column */}
        {(activeTab === 'all' || activeTab === 'volunteering') && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xl">🤝</span>
              <h3 className="text-base font-bold text-white uppercase tracking-wider text-xs">Leadership & Impact</h3>
            </div>
            {VOLUNTEERING.map((vol, i) => (
              <div
                key={i}
                className="glass rounded-2xl p-6 border border-white/10 hover:border-purple-500/40 transition-all group"
              >
                <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-xl mb-4">
                  🌍
                </div>
                <h4 className="text-base font-bold text-white mb-1 group-hover:text-purple-300 transition-colors">
                  {vol.role}
                </h4>
                <p className="text-purple-300 text-xs font-semibold mb-3">{vol.org}</p>
                <p className="text-slate-400 text-xs leading-relaxed">{vol.description}</p>
              </div>
            ))}

            {/* University Coordination Highlight */}
            <div className="glass rounded-2xl p-5 border border-white/5 text-xs text-slate-400">
              <div className="font-semibold text-white mb-1">🏛️ School of Computer Studies – SBUP</div>
              <p>Volunteered on the Central Coordination Team for university flagship orientation and technical events.</p>
            </div>
          </motion.div>
        )}
      </div>
    </section>
  )
}
