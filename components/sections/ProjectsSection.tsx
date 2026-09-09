"use client"
import { motion } from 'framer-motion'
import { GitHubRepo, FALLBACK_TOP_5_REPOS } from '@/lib/github'

const LANG_COLOR: Record<string, string> = {
  TypeScript: '#3178c6',
  JavaScript: '#f7df1e',
  Python: '#3572A5',
  HTML: '#e34c26',
  CSS: '#563d7c',
  Jupyter: '#DA5B0B',
}

const RANK_BADGES = [
  { rank: '#1', label: 'Top ML Engine', border: 'border-yellow-500/50', badge: 'bg-yellow-500/10 text-yellow-300 border-yellow-500/30' },
  { rank: '#2', label: 'Top Financial AI', border: 'border-cyan-500/50', badge: 'bg-cyan-500/10 text-cyan-300 border-cyan-500/30' },
  { rank: '#3', label: 'Top 3D WebGL', border: 'border-purple-500/50', badge: 'bg-purple-500/10 text-purple-300 border-purple-500/30' },
  { rank: '#4', label: 'Top Computer Vision', border: 'border-emerald-500/50', badge: 'bg-emerald-500/10 text-emerald-300 border-emerald-500/30' },
  { rank: '#5', label: 'Top Modern Web', border: 'border-indigo-500/50', badge: 'bg-indigo-500/10 text-indigo-300 border-indigo-500/30' },
]

interface Props {
  repos: GitHubRepo[]
}

export default function ProjectsSection({ repos }: Props) {
  // Ensure exactly top 5 are displayed
  const display = (repos && repos.length > 0 ? repos : FALLBACK_TOP_5_REPOS).slice(0, 5)

  return (
    <section id="github-projects" className="section-padding max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="text-center mb-14"
      >
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-purple-500/10 text-purple-300 border border-purple-500/20 mb-3">
          <span>✦</span>
          <span>Curated GitHub Showcase</span>
        </div>
        <h2 className="text-3xl md:text-5xl font-bold mb-3 tracking-tight">
          Top 5 GitHub <span className="gradient-text">Repositories</span>
        </h2>
        <div className="w-24 h-1 bg-gradient-to-r from-purple-500 via-cyan-400 to-emerald-400 rounded mx-auto mb-4" />
        <p className="text-slate-400 max-w-2xl mx-auto text-sm md:text-base">
          Hand-picked & scored from my public GitHub repositories based on architecture, complexity, and real-world engineering impact.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {display.map((repo, i) => {
          const badgeInfo = RANK_BADGES[i] || RANK_BADGES[4]
          return (
            <motion.div
              key={repo.name}
              initial={{ opacity: 0, y: 35 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.5 }}
              className={`glass rounded-2xl p-6 border border-white/5 hover:border-purple-500/40 hover:shadow-xl hover:shadow-purple-500/10 transition-all group flex flex-col justify-between relative overflow-hidden ${
                i === 0 ? 'lg:col-span-2 bg-gradient-to-br from-purple-950/20 via-slate-900/60 to-slate-900/80 border-purple-500/30' : ''
              }`}
            >
              {/* Subtle accent glow in the background */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/5 rounded-full blur-3xl group-hover:bg-purple-500/10 transition-all pointer-events-none" />

              <div>
                {/* Header row: Rank Badge + Rating Score */}
                <div className="flex items-center justify-between gap-2 mb-4">
                  <div className="flex items-center gap-2">
                    <span className={`px-2.5 py-0.5 rounded-full text-xs font-mono font-semibold border ${badgeInfo.badge}`}>
                      {badgeInfo.rank} {badgeInfo.label}
                    </span>
                  </div>
                  {repo.rating && (
                    <span className="flex items-center gap-1 text-xs font-semibold px-2 py-0.5 rounded-full bg-slate-800/80 text-amber-300 border border-amber-500/20">
                      ★ {repo.rating.toFixed(1)} <span className="text-slate-500 font-normal">/ 10</span>
                    </span>
                  )}
                </div>

                {/* Project Category */}
                {repo.category && (
                  <p className="text-xs font-medium uppercase tracking-wider text-cyan-400/90 mb-1">
                    {repo.category}
                  </p>
                )}

                {/* Repo Name */}
                <h3 className="text-lg md:text-xl font-bold text-white mb-2 group-hover:text-purple-300 transition-colors flex items-center gap-2">
                  <span>{repo.name}</span>
                </h3>

                {/* Description */}
                <p className="text-slate-300/80 text-sm mb-5 leading-relaxed">
                  {repo.description}
                </p>

                {/* Highlights / Tags */}
                {repo.highlights && repo.highlights.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 mb-5">
                    {repo.highlights.map(tag => (
                      <span
                        key={tag}
                        className="px-2.5 py-1 rounded-md text-xs bg-white/5 text-slate-300 border border-white/10 font-medium"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* Card Footer: Metadata + Action Links */}
              <div className="pt-4 border-t border-white/5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 mt-2">
                <div className="flex items-center gap-3 text-xs text-slate-400">
                  {repo.language && (
                    <span className="flex items-center gap-1.5 font-medium">
                      <span
                        className="w-2.5 h-2.5 rounded-full"
                        style={{ background: LANG_COLOR[repo.language] || '#a855f7' }}
                      />
                      {repo.language}
                    </span>
                  )}
                  <span>⭐ {repo.stargazers_count}</span>
                  <span>🍴 {repo.forks_count}</span>
                </div>

                <div className="flex items-center gap-2">
                  {repo.live_url && (
                    <a
                      href={repo.live_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-semibold bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 hover:bg-cyan-500/30 transition-all"
                    >
                      <span>⚡ Live Demo</span>
                      <span>↗</span>
                    </a>
                  )}
                  <a
                    href={repo.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-semibold glass border border-purple-500/30 text-purple-300 hover:bg-purple-500/20 transition-all"
                  >
                    <span>GitHub</span>
                    <span>↗</span>
                  </a>
                </div>
              </div>
            </motion.div>
          )
        })}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="text-center mt-12 flex flex-col sm:flex-row items-center justify-center gap-4"
      >
        <a
          href="https://github.com/OxDurgeshxO?tab=repositories"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-8 py-3.5 glass border border-purple-500/40 text-purple-300 rounded-xl hover:bg-purple-500/10 hover:border-purple-400 transition-all font-medium text-sm"
        >
          <span>View All 10 Repositories on GitHub</span>
          <span>↗</span>
        </a>
      </motion.div>
    </section>
  )
}
