"use client"
import { motion } from 'framer-motion'
import { VOLUNTEERING } from '@/lib/data'

export default function VolunteeringSection() {
  return (
    <section id="volunteering" className="section-padding max-w-4xl mx-auto">
      <motion.div initial={{ opacity:0, y:30 }} whileInView={{ opacity:1, y:0 }}
        viewport={{ once:true }} transition={{ duration:0.5 }} className="text-center mb-14">
        <h2 className="text-3xl md:text-4xl font-bold mb-2">Giving <span className="gradient-text">Back</span></h2>
        <div className="w-20 h-1 bg-gradient-to-r from-purple-500 to-cyan-400 rounded mx-auto" />
      </motion.div>
      {VOLUNTEERING.map((v, i) => (
        <motion.div key={i} initial={{ opacity:0, x:-30 }} whileInView={{ opacity:1, x:0 }}
          viewport={{ once:true }} transition={{ duration:0.5 }}
          className="glass rounded-2xl p-6 border border-white/5 hover:border-purple-500/30 transition-all flex gap-4 items-start">
          <div className="text-3xl">🤝</div>
          <div>
            <h3 className="font-bold text-white mb-1">{v.role}</h3>
            <p className="text-purple-300 text-sm mb-2">{v.org}</p>
            <p className="text-slate-400 text-sm">{v.description}</p>
          </div>
        </motion.div>
      ))}
    </section>
  )
}
