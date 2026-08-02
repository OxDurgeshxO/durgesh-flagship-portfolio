"use client"
import { motion } from 'framer-motion'
import { SKILLS } from '@/lib/data'

const CATEGORY_COLOR: Record<string,string> = {
  ai: 'from-purple-500 to-purple-700',
  dev: 'from-cyan-500 to-cyan-700',
  core: 'from-violet-500 to-violet-700',
  cloud: 'from-orange-400 to-orange-600',
  data: 'from-green-400 to-green-600',
}

export default function SkillsSection() {
  return (
    <section id="skills" className="section-padding max-w-7xl mx-auto">
      <motion.div initial={{ opacity:0, y:30 }} whileInView={{ opacity:1, y:0 }}
        viewport={{ once:true }} transition={{ duration:0.5 }} className="text-center mb-14">
        <h2 className="text-3xl md:text-4xl font-bold mb-2">Technical <span className="gradient-text">Skills</span></h2>
        <div className="w-20 h-1 bg-gradient-to-r from-purple-500 to-cyan-400 rounded mx-auto mb-4" />
        <p className="text-slate-400 max-w-xl mx-auto">A snapshot of technologies and domains I work with daily.</p>
      </motion.div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {SKILLS.map((skill, i) => (
          <motion.div key={skill.name}
            initial={{ opacity:0, y:30 }} whileInView={{ opacity:1, y:0 }}
            viewport={{ once:true }} transition={{ delay: i * 0.07, duration:0.5 }}
            className="glass rounded-2xl p-5 border border-white/5 hover:border-purple-500/30 transition-all group">
            <div className="flex justify-between items-center mb-3">
              <span className="text-slate-200 font-medium text-sm group-hover:text-white transition-colors">{skill.name}</span>
              <span className="text-slate-400 text-xs font-mono">{skill.level}%</span>
            </div>
            <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
              <motion.div
                initial={{ width:0 }} whileInView={{ width: `${skill.level}%` }}
                viewport={{ once:true }} transition={{ duration:1, delay:i*0.07+0.3 }}
                className={`h-full bg-gradient-to-r ${CATEGORY_COLOR[skill.category]} rounded-full`}
              />
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
