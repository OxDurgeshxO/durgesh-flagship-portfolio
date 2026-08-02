"use client"
import { motion } from 'framer-motion'
import { GitHubRepo } from '@/lib/github'

const LANG_COLOR: Record<string,string> = {
  TypeScript:'#3178c6', JavaScript:'#f7df1e', Python:'#3572A5',
  HTML:'#e34c26', CSS:'#563d7c', Jupyter:'#DA5B0B',
}

const FALLBACK_REPOS = [
  { id:1, name:'AI-Portfolio', description:'3D Digital Portfolio built with Next.js & Three.js', stargazers_count:0, forks_count:0, language:'TypeScript', html_url:'https://github.com/OxDurgeshxO', topics:['nextjs','threejs','ai'], updated_at:'' },
  { id:2, name:'Autonomous-Agent', description:'AI agent for workflow automation', stargazers_count:0, forks_count:0, language:'Python', html_url:'https://github.com/OxDurgeshxO', topics:['ai','automation'], updated_at:'' },
  { id:3, name:'Full-Stack-AI', description:'Full-stack AI product concept', stargazers_count:0, forks_count:0, language:'TypeScript', html_url:'https://github.com/OxDurgeshxO', topics:['react','ai'], updated_at:'' },
]

interface Props { repos: GitHubRepo[] }

export default function ProjectsSection({ repos }: Props) {
  const display = repos.length > 0 ? repos : FALLBACK_REPOS

  return (
    <section id="projects" className="section-padding max-w-7xl mx-auto">
      <motion.div initial={{ opacity:0, y:30 }} whileInView={{ opacity:1, y:0 }}
        viewport={{ once:true }} transition={{ duration:0.5 }} className="text-center mb-14">
        <h2 className="text-3xl md:text-4xl font-bold mb-2">GitHub <span className="gradient-text">Projects</span></h2>
        <div className="w-20 h-1 bg-gradient-to-r from-purple-500 to-cyan-400 rounded mx-auto mb-4" />
        <p className="text-slate-400">Live-fetched from <span className="text-purple-300 font-mono">@OxDurgeshxO</span> — auto-updated every hour</p>
      </motion.div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {display.map((repo, i) => (
          <motion.a key={repo.id} href={repo.html_url} target="_blank" rel="noopener noreferrer"
            initial={{ opacity:0, y:40 }} whileInView={{ opacity:1, y:0 }}
            viewport={{ once:true }} transition={{ delay:i*0.08, duration:0.5 }}
            className="glass rounded-2xl p-6 border border-white/5 hover:border-purple-500/40 hover:glow-purple transition-all group block">
            <div className="flex items-start justify-between mb-3">
              <div className="text-2xl">📁</div>
              <svg className="w-4 h-4 text-slate-500 group-hover:text-purple-400 transition-colors" fill="currentColor" viewBox="0 0 24 24">
                <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6m4-3h6v6m-11 5L21 3"/>
              </svg>
            </div>
            <h3 className="font-bold text-white mb-2 group-hover:text-purple-300 transition-colors truncate">{repo.name}</h3>
            <p className="text-slate-400 text-sm mb-4 line-clamp-2 min-h-[2.5rem]">{repo.description || 'No description available'}</p>
            {repo.topics?.length > 0 && (
              <div className="flex flex-wrap gap-1 mb-4">
                {repo.topics.slice(0,3).map(t => (
                  <span key={t} className="px-2 py-0.5 rounded-full text-xs bg-purple-500/10 text-purple-300 border border-purple-500/20">{t}</span>
                ))}
              </div>
            )}
            <div className="flex items-center gap-4 text-xs text-slate-500">
              {repo.language && (
                <span className="flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full" style={{ background: LANG_COLOR[repo.language] || '#888' }} />
                  {repo.language}
                </span>
              )}
              <span>⭐ {repo.stargazers_count}</span>
              <span>🍴 {repo.forks_count}</span>
            </div>
          </motion.a>
        ))}
      </div>

      <motion.div initial={{ opacity:0 }} whileInView={{ opacity:1 }} viewport={{ once:true }}
        className="text-center mt-10">
        <a href="https://github.com/OxDurgeshxO" target="_blank" rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-8 py-3 glass border border-purple-500/40 text-purple-300 rounded-xl hover:bg-purple-500/10 transition-all">
          View All Repositories ↗
        </a>
      </motion.div>
    </section>
  )
}
