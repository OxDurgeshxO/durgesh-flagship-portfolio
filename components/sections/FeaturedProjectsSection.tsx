"use client";

import { motion } from "framer-motion";
import { ExternalLink, Github, Sparkles, Trophy, Cpu, Activity, ShoppingBag, ArrowUpRight } from "lucide-react";

interface FeaturedProject {
  id: string;
  title: string;
  category: string;
  badge: string;
  description: string;
  metrics: string;
  tags: string[];
  accent: string;
  icon: typeof Sparkles;
  githubUrl: string;
  demoUrl?: string;
}

const FEATURED_PROJECTS: FeaturedProject[] = [
  {
    id: "rolefit2",
    title: "RoleFit 2.0 — AI Career Intelligence Platform",
    category: "Full Stack AI & Career Tech",
    badge: "Production Showcase",
    description:
      "Enterprise AI resume analyzer and career platform evaluating candidate resumes against 16 industry roles. Features an 8-point ATS audit, custom job description matching, Google XYZ bullet optimizer, and week-by-week learning roadmaps with zero-crash dual-mode storage.",
    metrics: "16 Curated Roles • 0-Crash Dual Mode • 100% In-Memory Fallback",
    tags: ["Next.js 16", "TypeScript", "Drizzle ORM", "Tailwind CSS v4", "PostgreSQL", "Turbopack"],
    accent: "#a78bfa",
    icon: Trophy,
    githubUrl: "https://github.com/OxDurgeshxO/ROLEFIT2",
  },
  {
    id: "fitness-platform",
    title: "AI Fitness & Computer Vision Ecosystem",
    category: "Computer Vision & Wearable IoT",
    badge: "9-Page Architecture",
    description:
      "Production-grade 9-page fitness platform with real-time pose estimation, exercise repetition counting, dietary intelligence, AI coach agent, wearable sensor telemetry, and workout analytics.",
    metrics: "9 Core Modules • Sub-50ms Pose Inference • Multi-Agent AI Coach",
    tags: ["React 19", "Vite", "TypeScript", "Tailwind CSS", "MediaPipe Pose", "WebSockets"],
    accent: "#00d4ff",
    icon: Activity,
    githubUrl: "https://github.com/OxDurgeshxO/fitness-platform-architecture",
  },
  {
    id: "marketmatch-ai",
    title: "MarketMatch AI — Customer Segmentation & Recommender",
    category: "Machine Learning & Advanced Analytics",
    badge: "Unsupervised ML",
    description:
      "End-to-end machine learning pipeline clustering retail consumer behaviors using K-Means and DBSCAN with PCA dimensionality reduction, paired with a Nearest Neighbors recommendation engine for hyper-targeted marketing campaigns.",
    metrics: "High Silhouette Clustering • PCA Visualization • Instant Inference",
    tags: ["Python", "Scikit-Learn", "K-Means", "DBSCAN", "Streamlit", "Pandas"],
    accent: "#34d399",
    icon: ShoppingBag,
    githubUrl: "https://github.com/OxDurgeshxO/MarketMatch-AI",
  },
];

export default function FeaturedProjectsSection() {
  return (
    <section id="projects" className="section-padding max-w-7xl mx-auto relative z-10">
      <div id="featured-projects" className="-top-24 relative" />
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="text-center mb-16"
      >
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-[#6c63ff]/30 bg-[#6c63ff]/10 text-xs font-mono text-[#00d4ff] uppercase tracking-widest mb-4">
          <Sparkles className="size-3.5" /> Flagship Creations
        </div>
        <h2 className="text-3xl md:text-5xl font-bold mb-4 tracking-tight">
          Featured <span className="gradient-text">Platforms</span>
        </h2>
        <div className="w-20 h-1 bg-gradient-to-r from-[#6c63ff] to-[#00d4ff] rounded mx-auto mb-4" />
        <p className="text-slate-400 max-w-2xl mx-auto text-sm md:text-base leading-relaxed">
          Production-tested full-stack platforms and machine learning systems engineered with modern architecture, real-time streaming, and high visual standards.
        </p>
      </motion.div>

      <div className="space-y-8">
        {FEATURED_PROJECTS.map((proj, idx) => {
          const Icon = proj.icon;
          return (
            <motion.div
              key={proj.id}
              initial={{ opacity: 0, y: 35 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, duration: 0.6 }}
              className="glass rounded-2xl p-7 md:p-9 border border-white/10 hover:border-[#6c63ff]/50 transition-all duration-300 relative overflow-hidden group"
            >
              {/* Top ambient glow line */}
              <div
                className="absolute top-0 left-0 right-0 h-1 opacity-70 group-hover:opacity-100 transition-opacity"
                style={{ background: `linear-gradient(90deg, transparent, ${proj.accent}, transparent)` }}
              />

              <div className="grid lg:grid-cols-[1.5fr_1fr] gap-8 items-center">
                <div>
                  <div className="flex flex-wrap items-center gap-3 mb-3">
                    <span
                      className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full font-mono text-[11px] font-semibold uppercase tracking-wider"
                      style={{ backgroundColor: `${proj.accent}18`, color: proj.accent, border: `1px solid ${proj.accent}40` }}
                    >
                      <Icon className="size-3" />
                      {proj.badge}
                    </span>
                    <span className="text-xs font-mono text-slate-400">{proj.category}</span>
                  </div>

                  <h3 className="text-2xl md:text-3xl font-bold text-white mb-3 group-hover:text-[#00d4ff] transition-colors">
                    {proj.title}
                  </h3>

                  <p className="text-slate-300 text-sm md:text-[14.5px] leading-relaxed mb-5">
                    {proj.description}
                  </p>

                  <div className="rounded-xl border border-white/5 bg-white/[0.02] px-4 py-2.5 mb-6 inline-block font-mono text-xs text-slate-300">
                    <span className="text-[#00d4ff] font-semibold">Key Metrics:</span> {proj.metrics}
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {proj.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-lg border border-white/10 bg-white/[0.04] px-3 py-1 text-xs font-mono text-slate-300"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row lg:flex-col gap-3 justify-center lg:items-end">
                  <a
                    href={proj.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 rounded-xl bg-white/10 hover:bg-white/20 border border-white/10 px-5 py-3 text-sm font-semibold text-white transition-all w-full sm:w-auto"
                  >
                    <Github className="size-4" />
                    View Repository
                    <ArrowUpRight className="size-4" />
                  </a>

                  {proj.demoUrl && (
                    <a
                      href={proj.demoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#6c63ff] to-[#00d4ff] hover:opacity-90 px-5 py-3 text-sm font-semibold text-white transition-all shadow-[0_10px_25px_-10px_rgba(108,99,255,0.6)] w-full sm:w-auto"
                    >
                      <ExternalLink className="size-4" />
                      Live Demo Preview
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
