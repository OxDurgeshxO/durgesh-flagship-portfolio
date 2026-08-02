"use client"
import { motion } from 'framer-motion'
import { EDUCATION } from '@/lib/data'

export default function EducationSection() {
  return (
    <section id="education" className="section-padding max-w-4xl mx-auto">
      <motion.div initial={{ opacity:0, y:30 }} whileInView={{ opacity:1, y:0 }}
        viewport={{ once:true }} transition={{ duration:0.5 }} className="text-center mb-14">
        <h2 className="text-3xl md:text-4xl font-bold mb-2">My <span className="gradient-text">Education</span></h2>
        <div className="w-20 h-1 bg-gradient-to-r from-purple-500 to-cyan-400 rounded mx-auto" />
      </motion.div>
      <div className="space-y-6">
        {EDUCATION.map((edu, i) => (
          <motion.div key={i} initial={{ opacity:0, y:30 }} whileInView={{ opacity:1, y:0 }}
            viewport={{ once:true }} transition={{ delay:i*0.15, duration:0.5 }}
            className="glass rounded-2xl p-6 border border-white/5 hover:border-cyan-500/30 transition-all flex flex-col md:flex-row gap-4 items-start">
            <div className="text-4xl">🎓</div>
            <div>
              <h3 className="text-lg font-bold text-white mb-1">{edu.degree}</h3>
              <p className="text-cyan-300 font-medium mb-1">{edu.institution}</p>
              <p className="text-slate-400 text-sm mb-2">{edu.period}</p>
              <span className="glass px-3 py-1 rounded-full text-xs text-slate-300 border border-white/10">{edu.grade}</span>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
