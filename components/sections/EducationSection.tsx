"use client"

import { motion } from 'framer-motion'
import { EDUCATION, CERTIFICATIONS, VOLUNTEERING } from '@/lib/data'

export default function EducationSection() {
  const mca = EDUCATION[0] // Master's Degree
  const bca = EDUCATION[1] // Bachelor's Degree

  return (
    <section id="education" className="section-padding max-w-6xl mx-auto px-4 sm:px-6">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="text-center mb-16"
      >
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-semibold bg-purple-500/10 text-purple-300 border border-purple-500/25 mb-4">
          <span>🎓 Academic Pedigree & Credentials</span>
        </div>
        <h2 className="text-3xl md:text-5xl font-bold mb-3 tracking-tight">
          Education & <span className="gradient-text">Academic Specialization</span>
        </h2>
        <div className="w-24 h-1 bg-gradient-to-r from-purple-500 via-cyan-400 to-emerald-400 rounded mx-auto mb-4" />
        <p className="text-slate-400 max-w-2xl mx-auto text-sm md:text-base">
          Formal graduate and undergraduate computer science education combining rigorous Artificial Intelligence theory with production engineering.
        </p>
      </motion.div>

      {/* HIGHLIGHTED HERO CARD: Master of Computer Applications (AIML) */}
      <motion.div
        initial={{ opacity: 0, y: 35 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="glass rounded-3xl p-6 sm:p-8 md:p-10 border-2 border-purple-500/40 relative overflow-hidden mb-8 shadow-2xl shadow-purple-500/15 bg-gradient-to-br from-purple-950/25 via-slate-900/80 to-slate-950"
      >
        {/* Background Ambient Glow */}
        <div className="absolute -top-24 -right-24 w-72 h-72 bg-purple-500/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-72 h-72 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10">
          {/* Header Row: Degree Status + Duration */}
          <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
              <span className="px-3 py-1 rounded-full text-xs font-mono font-semibold bg-emerald-500/10 text-emerald-300 border border-emerald-500/30">
                Current Graduate Degree • Active In Progress
              </span>
            </div>
            <span className="px-3.5 py-1 rounded-full text-xs font-mono font-bold bg-white/5 text-purple-300 border border-purple-500/30">
              {mca.period}
            </span>
          </div>

          {/* Institution & Degree Title */}
          <div className="flex flex-col md:flex-row md:items-start gap-4 mb-6">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-purple-600 to-indigo-700 flex items-center justify-center text-3xl shadow-lg shadow-purple-500/30 shrink-0">
              🎓
            </div>
            <div>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-white mb-1.5 tracking-tight">
                {mca.degree}
              </h3>
              <p className="text-cyan-300 font-semibold text-base flex items-center gap-2">
                <span>{mca.institution}</span>
                <span className="text-slate-500">•</span>
                <span className="text-slate-300 font-normal">School of Computer Studies</span>
              </p>
            </div>
          </div>

          <p className="text-slate-300 text-sm md:text-base leading-relaxed mb-6 max-w-4xl">
            Specialized Master&apos;s curriculum focused on engineering scalable AI systems, neural network modeling, and enterprise distributed computing. Applied coursework directly supports research and deployment of autonomous agent pipelines and deep learning web applications.
          </p>

          {/* Academic Pillars & Competencies */}
          <div className="pt-6 border-t border-white/10">
            <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">
              Core Graduate Specialization Pillars
            </div>
            <div className="flex flex-wrap gap-2">
              {[
                '🤖 Autonomous AI Agents',
                '🧠 Deep Learning & CNNs',
                '🏗️ System Architecture',
                '⚡ Prompt Engineering & LLMs',
                '☁️ Cloud ML Pipelines (AWS)',
                '📊 Advanced Predictive Analytics',
                '💻 Distributed Systems',
              ].map((pill) => (
                <span
                  key={pill}
                  className="px-3 py-1.5 rounded-xl text-xs font-medium bg-purple-500/10 text-purple-200 border border-purple-500/20 hover:border-purple-400/40 transition-colors"
                >
                  {pill}
                </span>
              ))}
            </div>
          </div>
        </div>
      </motion.div>

      {/* SECONDARY ROW: Bachelor's Foundation & AWS Cloud Credentials */}
      <div className="grid md:grid-cols-2 gap-8">
        {/* Bachelor of Computer Applications */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="glass rounded-3xl p-6 sm:p-8 border border-white/10 hover:border-cyan-500/40 transition-all flex flex-col justify-between group"
        >
          <div>
            <div className="flex items-center justify-between gap-2 mb-4">
              <span className="px-3 py-0.5 rounded-full text-xs font-mono font-semibold bg-cyan-500/10 text-cyan-300 border border-cyan-500/20">
                {bca.period}
              </span>
              <span className="text-xs text-slate-400 font-medium">Undergraduate Degree</span>
            </div>

            <div className="flex items-start gap-3.5 mb-3">
              <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-xl text-cyan-300 shrink-0">
                🏛️
              </div>
              <div>
                <h4 className="text-xl font-bold text-white group-hover:text-cyan-300 transition-colors">
                  {bca.degree}
                </h4>
                <p className="text-slate-300 text-sm font-medium">{bca.institution}</p>
              </div>
            </div>

            <p className="text-slate-400 text-sm leading-relaxed mb-6">
              Comprehensive undergraduate foundation in computer science principles, object-oriented design, algorithmic complexity, relational database management, and full-stack software development.
            </p>
          </div>

          <div className="pt-4 border-t border-white/5 flex flex-wrap gap-1.5">
            {['Data Structures', 'Algorithms', 'Full-Stack Dev', 'Python', 'TypeScript', 'SQL'].map((t) => (
              <span key={t} className="px-2.5 py-1 rounded-lg text-[11px] font-medium bg-white/5 text-slate-300 border border-white/10">
                {t}
              </span>
            ))}
          </div>
        </motion.div>

        {/* AWS Machine Learning Certifications & Leadership */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="space-y-4 flex flex-col justify-between"
        >
          {/* AWS Certifications Card */}
          <div className="glass rounded-3xl p-6 sm:p-7 border border-white/10 hover:border-amber-500/40 transition-all group">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-xl">🏅</span>
              <h4 className="text-xs font-semibold text-amber-400 uppercase tracking-wider">
                Industry Cloud & ML Credentials
              </h4>
            </div>

            <div className="space-y-3">
              {CERTIFICATIONS.map((cert, idx) => (
                <div key={idx} className="p-3 rounded-2xl bg-white/5 border border-white/5 flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-300 text-sm shrink-0">
                    ☁️
                  </div>
                  <div>
                    <h5 className="text-sm font-bold text-white group-hover:text-amber-300 transition-colors">
                      {cert.name}
                    </h5>
                    <p className="text-slate-400 text-xs mt-0.5">{cert.issuer}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Social Good / Volunteering Leadership */}
          <div className="glass rounded-3xl p-6 sm:p-7 border border-white/10 hover:border-purple-500/40 transition-all">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-xl">🤝</span>
              <h4 className="text-xs font-semibold text-purple-400 uppercase tracking-wider">
                Leadership & Volunteering
              </h4>
            </div>

            {VOLUNTEERING.map((vol, idx) => (
              <div key={idx} className="mb-2">
                <div className="text-sm font-bold text-white">{vol.role}</div>
                <div className="text-xs font-semibold text-purple-300 mb-1">{vol.org}</div>
                <p className="text-slate-400 text-xs leading-relaxed">{vol.description}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
