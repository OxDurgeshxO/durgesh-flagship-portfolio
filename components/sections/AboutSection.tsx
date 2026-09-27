"use client"
import { STATS } from '@/lib/stats';
import Image from 'next/image'
import { GitHubProfile } from '@/lib/github'
import { OWNER } from '@/lib/data'
import { motion } from 'framer-motion'

interface Props { profile: GitHubProfile | null }

export default function AboutSection({ profile }: Props) {
  const avatar = profile?.avatar_url || `https://avatars.githubusercontent.com/u/146377023?v=4`
  // NOTE: a hardcoded `public_repos ?? 18` fallback used to live here. It rendered a fabricated
  // repository count whenever the GitHub fetch failed, and both variables were unused by the JSX
  // below (the stat grid reads STATS). Removed rather than corrected, so no unverified number can
  // be displayed. Live counts come from `profile` where a component actually needs them.

  const stats = [
    { label: 'Public Repos', value: STATS.publicRepos },
    { label: 'Live Deployments', value: STATS.verifiedDeployments },
    { label: 'Years Coding', value: STATS.yearsCoding },
    { label: 'AI Projects', value: STATS.aiProjects },
  ]

  return (
    <section id="about" className="section-padding max-w-7xl mx-auto">
      <div className="grid md:grid-cols-2 gap-12 items-center">
        {/* Avatar */}
        <motion.div initial={{ opacity:0, x:-50 }} whileInView={{ opacity:1, x:0 }}
          viewport={{ once:true }} transition={{ duration:0.7 }} className="flex justify-center">
          <div className="relative">
            <div className="w-64 h-64 rounded-full overflow-hidden border-2 border-primary/40 glow-purple animate-float">
              <Image src={avatar} alt={OWNER.name} width={256} height={256} priority className="w-full h-full object-cover" />
            </div>
            <div className="absolute -bottom-4 -right-4 glass px-4 py-2 rounded-xl border border-rose-500/30 text-secondary text-sm shadow-lg shadow-rose-500/10">
              ✅ Open to Opportunities
            </div>
          </div>
        </motion.div>

        {/* Info */}
        <motion.div initial={{ opacity:0, x:50 }} whileInView={{ opacity:1, x:0 }}
          viewport={{ once:true }} transition={{ duration:0.7 }}>
          <h2 className="text-3xl md:text-4xl font-bold mb-2">About <span className="gradient-text">Me</span></h2>
          <div className="w-20 h-1 bg-gradient-to-r from-[var(--gradient-start)] to-[var(--gradient-end)] rounded mb-6" />
          <p className="text-body leading-relaxed mb-6">
            I am an AIML Engineer and Full-Stack Architect completing my Master of Computer Applications (AIML) at Sri Balaji University, Pune. As an AI Program Fellow at UNLOXr and Be10x AI Cohort Member, I specialize in building autonomous agents, sub-50ms computer vision pipelines, and resilient full-stack platforms with failover architecture.
          </p>
          <div className="flex flex-wrap gap-3 mb-8">
            {['🤖 AI Engineering', '⚡ Prompt Engineering', '🏗️ System Architecture', '☁️ AWS ML', '💻 Full-Stack Dev'].map(tag => (
              <span key={tag} className="glass px-3 py-1 rounded-full text-sm text-body border border-border">{tag}</span>
            ))}
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            {stats.map(s => (
              <div key={s.label} className="glass rounded-xl p-4 text-center border border-border/60">
                <div className="text-2xl font-bold gradient-text">{s.value}+</div>
                <div className="text-muted-foreground text-xs mt-1">{s.label}</div>
              </div>
            ))}
          </div>
          <div className="flex gap-4">
            <a href={OWNER.linkedin} target="_blank" rel="noopener noreferrer"
              className="flex-1 text-center py-3 bg-[#0A66C2] text-white rounded-xl text-sm font-semibold hover:bg-[#004182] transition-all">
              LinkedIn ↗
            </a>
            <a href={OWNER.github} target="_blank" rel="noopener noreferrer"
              className="flex-1 text-center py-3 glass border border-primary/40 text-primary rounded-xl text-sm font-semibold hover:bg-primary/10 transition-all">
              GitHub ↗
            </a>
            <a href={`mailto:${OWNER.email}`}
              className="flex-1 text-center py-3 glass border border-rose-500/40 text-secondary rounded-xl text-sm font-semibold hover:bg-secondary/10 transition-all">
              Email ↗
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
