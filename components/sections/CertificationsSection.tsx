"use client"
import { motion } from 'framer-motion'
import { CERTIFICATIONS } from '@/lib/data'

export default function CertificationsSection() {
  return (
    <section id="certifications" className="section-padding max-w-4xl mx-auto">
      <motion.div initial={{ opacity:0, y:30 }} whileInView={{ opacity:1, y:0 }}
        viewport={{ once:true }} transition={{ duration:0.5 }} className="text-center mb-14">
        <h2 className="text-3xl md:text-4xl font-bold mb-2"><span className="gradient-text">Certifications</span></h2>
        <div className="w-20 h-1 bg-gradient-to-r from-purple-500 to-cyan-400 rounded mx-auto" />
      </motion.div>
      <div className="grid sm:grid-cols-2 gap-6">
        {CERTIFICATIONS.map((cert, i) => (
          <motion.div key={i} initial={{ opacity:0, scale:0.9 }} whileInView={{ opacity:1, scale:1 }}
            viewport={{ once:true }} transition={{ delay:i*0.12, duration:0.5 }}
            className="glass rounded-2xl p-6 border border-white/5 hover:border-orange-400/30 transition-all"
            style={{ boxShadow:`0 0 20px ${cert.color}15` }}>
            <div className="text-3xl mb-4">🏅</div>
            <h3 className="font-bold text-white mb-2">{cert.name}</h3>
            <p className="text-slate-400 text-sm flex items-center gap-2">
              <span className="w-2 h-2 rounded-full" style={{ background:cert.color }} />
              {cert.issuer}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
