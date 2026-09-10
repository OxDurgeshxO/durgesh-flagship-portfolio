"use client"
import { motion } from 'framer-motion'
import { EXPERIENCE } from '@/lib/data'

export default function ExperienceSection() {
  return (
    <section id="experience" className="section-padding max-w-5xl mx-auto">
      <motion.div initial={{ opacity:0, y:30 }} whileInView={{ opacity:1, y:0 }}
        viewport={{ once:true }} transition={{ duration:0.5 }} className="text-center mb-14">
        <h2 className="text-3xl md:text-4xl font-bold mb-2">Work <span className="gradient-text">Experience</span></h2>
        <div className="w-20 h-1 bg-gradient-to-r from-purple-500 to-rose-500 rounded mx-auto" />
      </motion.div>

      <div className="relative pl-8 border-l border-purple-500/20">
        {EXPERIENCE.map((exp, i) => (
          <motion.div key={i}
            initial={{ opacity:0, x:40 }} whileInView={{ opacity:1, x:0 }}
            viewport={{ once:true }} transition={{ delay: i*0.15, duration:0.6 }}
            className="relative mb-10 last:mb-0">
            {/* Timeline dot */}
            <div className="absolute -left-[2.6rem] top-1 w-5 h-5 rounded-full border-2 flex items-center justify-center"
              style={{ borderColor: exp.color, background: 'var(--bg-primary)', boxShadow: `0 0 12px ${exp.color}88` }}>
              <div className="w-2 h-2 rounded-full" style={{ background: exp.color }} />
            </div>

            <div className="glass rounded-2xl p-6 border border-white/5 hover:border-purple-500/20 transition-all">
              <div className="flex flex-wrap items-start justify-between gap-3 mb-3">
                <div>
                  <h3 className="text-lg font-bold text-white">{exp.role}</h3>
                  <p className="font-semibold" style={{ color: exp.color }}>{exp.company}</p>
                </div>
                <div className="text-right">
                  <div className="glass px-3 py-1 rounded-full text-xs text-slate-300 border border-white/10">{exp.period}</div>
                  <div className="text-slate-500 text-xs mt-1">{exp.location}</div>
                </div>
              </div>
              <ul className="space-y-2">
                {exp.points.map((pt, j) => (
                  <li key={j} className="flex gap-2 text-slate-400 text-sm">
                    <span style={{ color: exp.color }} className="mt-1 shrink-0">▸</span> {pt}
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
