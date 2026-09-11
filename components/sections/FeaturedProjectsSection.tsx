"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  ExternalLink,
  Github,
  Sparkles,
  Trophy,
  Activity,
  ShoppingBag,
  ArrowUpRight,
  BookOpen,
  X,
  CheckCircle2,
  Cpu,
  Layers,
} from "lucide-react";
import CardTilt3D from "@/components/3d/CardTilt3D";
import { trackEvent } from "@/lib/analytics";

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
  challenge: string;
  architecture: string[];
  impact: string[];
}

const FEATURED_PROJECTS: FeaturedProject[] = [
  {
    id: "roleradar",
    title: "RoleRadar — AI Career Intelligence Platform",
    category: "Full Stack AI & Career Tech",
    badge: "Production Showcase",
    description:
      "Enterprise AI resume analyzer and career platform evaluating candidate resumes against 16 industry roles. Features an 8-point ATS audit, custom job description matching, Google XYZ bullet optimizer, and week-by-week learning roadmaps with zero-crash dual-mode storage.",
    metrics: "16 Curated Roles • 0-Crash Dual Mode • 100% In-Memory Fallback",
    tags: ["Next.js 16", "TypeScript", "Drizzle ORM", "Tailwind CSS v4", "PostgreSQL", "Turbopack"],
    accent: "#a78bfa",
    icon: Trophy,
    githubUrl: "https://github.com/OxDurgeshxO/RoleRadar",
    demoUrl: "https://rolefit-2.vercel.app",
    challenge:
      "Job seekers face opaque ATS parsing algorithms and poorly formatted resume bullets that lead to automatic rejections before recruiter review. Remote database downtime can also cause catastrophic app crashes during critical candidate interviews.",
    architecture: [
      "Zero-Crash Dual Mode: Implemented an automatic in-memory fallback layer that takes over seamlessly if PostgreSQL/Drizzle encounters connection timeouts.",
      "8-Point ATS Evaluation Matrix: Tokenizes and scores resumes on quantifiability, role relevance, section balance, action-verb density, and grammar formatting.",
      "Google XYZ Bullet Optimizer: Real-time LLM prompt chain that restructures passive bullet points into 'Accomplished [X], as measured by [Y], by doing [Z]'.",
    ],
    impact: [
      "16 Curated Industry Profiles with tailored keyword extraction and scoring heuristics.",
      "100% Zero-Crash Resiliency verified under simulated database drops and network failure.",
      "Week-by-week customized career skill roadmaps with curated documentation resources.",
    ],
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
    accent: "#fb7185",
    icon: Activity,
    githubUrl: "https://github.com/OxDurgeshxO/fitness-platform-architecture",
    challenge:
      "Executing real-time machine learning pose estimation inside browser runtimes often blocks the main JavaScript UI thread, causing dropped video frames, sluggish rep counting, and device battery drain.",
    architecture: [
      "Web Worker Offloading: Shifted Google MediaPipe 33-point body landmark inference into background web workers to keep UI rendering at 60 FPS.",
      "Joint Angle Kinematics Engine: Implemented trigonometric dot-product vector tracking across hip-knee-ankle joint angles for form validation and rep detection.",
      "WebSocket Telemetry Hub: Real-time bi-directional streaming between client sensors, wearable feeds, and autonomous AI coaching agents.",
    ],
    impact: [
      "Sub-50ms Pose Inference latency achieved across standard laptop webcams.",
      "9 Comprehensive Architecture Pages spanning workouts, analytics, nutrition, and telemetry.",
      "Multi-Agent AI coaching with contextual posture feedback and form correction tips.",
    ],
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
    accent: "#f43f5e",
    icon: ShoppingBag,
    githubUrl: "https://github.com/OxDurgeshxO/MarketMatch-AI",
    challenge:
      "Retail customer transaction datasets contain high-dimensional noise, non-linear purchase patterns, and outliers that distort conventional customer persona segmentation.",
    architecture: [
      "Dual Unsupervised Pipeline: Employs K-Means with Elbow & Silhouette optimization for cluster density alongside DBSCAN for outlier anomaly removal.",
      "PCA Dimensionality Projection: Compresses multi-variable transaction records down to 2D/3D visual coordinates for real-time exploratory scatter plots.",
      "Nearest Neighbors Recommendation Engine: High-speed cosine distance similarity queries recommending targeted promotional campaigns per customer cluster.",
    ],
    impact: [
      "High Silhouette Score validation confirming distinct, actionable customer personas.",
      "End-to-end interactive Streamlit dashboard supporting on-the-fly CSV ingestion.",
      "Instant recommendation inference per segmented customer profile.",
    ],
  },
];

const CATEGORIES = ["All", "Full Stack AI", "Computer Vision", "Machine Learning"];

export default function FeaturedProjectsSection() {
  const [selectedProject, setSelectedProject] = useState<FeaturedProject | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>("All");

  // Close modal on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelectedProject(null);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const filteredProjects = activeCategory === "All"
    ? FEATURED_PROJECTS
    : FEATURED_PROJECTS.filter(p => p.category.toLowerCase().includes(activeCategory.toLowerCase()));

  return (
    <section id="projects" className="section-padding max-w-7xl mx-auto relative z-10">
      <div id="featured-projects" className="-top-24 relative" />
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="text-center mb-10"
      >
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-purple-500/30 bg-purple-500/10 text-xs font-mono text-rose-300 uppercase tracking-widest mb-4">
          <Sparkles className="size-3.5 text-rose-400" /> Flagship Creations
        </div>
        <h2 className="text-3xl md:text-5xl font-bold mb-4 tracking-tight">
          Featured <span className="gradient-text">Platforms</span>
        </h2>
        <div className="w-20 h-1 bg-gradient-to-r from-purple-500 to-rose-500 rounded mx-auto mb-4" />
        <p className="text-slate-400 max-w-2xl mx-auto text-sm md:text-base leading-relaxed">
          Production-tested full-stack platforms and machine learning systems engineered with modern architecture, real-time streaming, and high visual standards.
        </p>
      </motion.div>

      {/* Interactive Category Filter Pills */}
      <div className="flex flex-wrap items-center justify-center gap-2.5 mb-12">
        {CATEGORIES.map((cat) => {
          const isActive = activeCategory === cat;
          return (
            <button
              key={cat}
              onClick={() => {
                setActiveCategory(cat);
                trackEvent("filter_category_click", { category: cat });
              }}
              className={`px-4 py-2 rounded-xl text-xs font-mono font-semibold transition-all cursor-pointer ${
                isActive
                  ? "bg-gradient-to-r from-purple-600 to-rose-500 text-white shadow-lg shadow-purple-500/25 border border-purple-400/50 scale-105"
                  : "glass text-slate-300 hover:text-white hover:border-purple-500/40 border border-white/5"
              }`}
            >
              {cat === "All" ? "✨ All Platforms" : cat}
            </button>
          );
        })}
      </div>

      <div className="space-y-8">
        <AnimatePresence mode="popLayout">
          {filteredProjects.map((proj, idx) => {
            const Icon = proj.icon;
            return (
              <motion.div
                key={proj.id}
                layout
                initial={{ opacity: 0, y: 25 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.35, delay: idx * 0.05 }}
              >
                <CardTilt3D accentColor={proj.accent}>
                  <div className="glass rounded-2xl p-7 md:p-9 border border-white/10 hover:border-purple-500/50 transition-all duration-300 relative overflow-hidden group shadow-xl shadow-purple-500/5">
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

                        <h3 className="text-2xl md:text-3xl font-bold text-white mb-3 group-hover:text-rose-300 transition-colors">
                          {proj.title}
                        </h3>

                        <p className="text-slate-300 text-sm md:text-[14.5px] leading-relaxed mb-5">
                          {proj.description}
                        </p>

                        <div className="rounded-xl border border-white/5 bg-white/[0.02] px-4 py-2.5 mb-6 inline-block font-mono text-xs text-slate-300">
                          <span className="text-rose-300 font-semibold">Key Metrics:</span> {proj.metrics}
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
                        <Link
                          href={`/work/${proj.id}`}
                          className="inline-flex items-center justify-center gap-2 rounded-xl bg-purple-600/20 hover:bg-purple-600/30 border border-purple-500/30 px-4 py-3 text-xs md:text-sm font-semibold text-purple-200 transition-all cursor-pointer w-full sm:w-auto"
                        >
                          <BookOpen className="size-4 text-purple-400" />
                          Case Study Spec
                          <span className="text-[11px] font-mono bg-purple-500/30 px-1.5 py-0.5 rounded text-purple-200 ml-1">
                            Deep Dive
                          </span>
                        </Link>

                        <a
                          href={proj.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={() => trackEvent("github_click", { project_id: proj.id, url: proj.githubUrl })}
                          className="inline-flex items-center justify-center gap-2 rounded-xl bg-white/10 hover:bg-white/20 border border-white/10 px-5 py-3 text-sm font-semibold text-white transition-all w-full sm:w-auto focus-visible:ring-2 focus-visible:ring-white/50"
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
                            className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-purple-600 to-rose-500 hover:opacity-90 px-5 py-3 text-sm font-semibold text-white transition-all shadow-[0_10px_25px_-10px_rgba(168,85,247,0.6)] w-full sm:w-auto"
                          >
                            <ExternalLink className="size-4" />
                            Live Demo Preview
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </CardTilt3D>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      {/* Case Study Detailed Modal */}
      <AnimatePresence>
        {selectedProject && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
            {/* Backdrop blur overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedProject(null)}
              className="fixed inset-0 bg-black/80 backdrop-blur-md"
            />

            {/* Modal Dialog Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.92, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 20 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="relative w-full max-w-3xl glass border border-purple-500/30 rounded-3xl p-6 sm:p-8 md:p-10 shadow-2xl shadow-purple-500/20 max-h-[90vh] overflow-y-auto z-10 bg-[#0c0c14]/95"
            >
              {/* Top ambient color bar */}
              <div
                className="absolute top-0 left-0 right-0 h-1.5 rounded-t-3xl"
                style={{ background: `linear-gradient(90deg, transparent, ${selectedProject.accent}, transparent)` }}
              />

              {/* Close Button */}
              <button
                onClick={() => setSelectedProject(null)}
                aria-label="Close Case Study Modal"
                className="absolute top-5 right-5 w-10 h-10 rounded-full glass border border-white/10 flex items-center justify-center text-slate-400 hover:text-white hover:border-white/30 transition-all cursor-pointer"
              >
                <X className="size-5" />
              </button>

              {/* Modal Header */}
              <div className="mb-8 pr-12">
                <div
                  className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-semibold uppercase tracking-wider mb-3"
                  style={{ backgroundColor: `${selectedProject.accent}20`, color: selectedProject.accent, border: `1px solid ${selectedProject.accent}40` }}
                >
                  <Sparkles className="size-3.5" />
                  Engineering Case Study
                </div>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-white mb-2">
                  {selectedProject.title}
                </h3>
                <p className="text-slate-400 text-sm font-mono">
                  Category: {selectedProject.category}
                </p>
              </div>

              {/* Section 1: The Challenge */}
              <div className="mb-6 p-5 rounded-2xl bg-white/[0.03] border border-white/5">
                <div className="flex items-center gap-2 text-purple-300 text-xs font-mono font-semibold uppercase tracking-wider mb-2">
                  <Cpu className="size-4 text-purple-400" />
                  The Problem & Engineering Challenge
                </div>
                <p className="text-slate-300 text-sm leading-relaxed">
                  {selectedProject.challenge}
                </p>
              </div>

              {/* Section 2: Architecture Decisions */}
              <div className="mb-6 p-5 rounded-2xl bg-white/[0.03] border border-white/5">
                <div className="flex items-center gap-2 text-rose-300 text-xs font-mono font-semibold uppercase tracking-wider mb-3">
                  <Layers className="size-4 text-rose-400" />
                  System Architecture & Technical Approach
                </div>
                <ul className="space-y-2.5">
                  {selectedProject.architecture.map((arch, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-sm text-slate-300 leading-relaxed">
                      <span className="w-1.5 h-1.5 rounded-full bg-rose-400 mt-2 shrink-0" />
                      <span>{arch}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Section 3: Measurable Impact & Achievements */}
              <div className="mb-8 p-5 rounded-2xl bg-white/[0.03] border border-white/5">
                <div className="flex items-center gap-2 text-purple-300 text-xs font-mono font-semibold uppercase tracking-wider mb-3">
                  <CheckCircle2 className="size-4 text-purple-400" />
                  Production Metrics & Results
                </div>
                <ul className="space-y-2.5">
                  {selectedProject.impact.map((item, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-sm text-slate-300 leading-relaxed">
                      <span className="w-1.5 h-1.5 rounded-full bg-purple-400 mt-2 shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Technology Tags */}
              <div className="mb-8">
                <div className="text-xs font-mono text-slate-400 uppercase tracking-wider mb-2.5">
                  Core Technologies
                </div>
                <div className="flex flex-wrap gap-2">
                  {selectedProject.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 rounded-lg text-xs font-mono bg-white/5 border border-white/10 text-slate-200"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Modal Actions Footer */}
              <div className="pt-6 border-t border-white/10 flex flex-wrap gap-4 items-center justify-between">
                <span className="text-xs text-slate-500 font-mono">
                  Press ESC or click outside to dismiss
                </span>
                <div className="flex flex-wrap gap-2.5">
                  <Link
                    href={`/work/${selectedProject.id}`}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-purple-600/30 hover:bg-purple-600/50 text-white text-xs font-semibold border border-purple-500/40 transition-all shadow-md shadow-purple-500/20"
                  >
                    <BookOpen className="size-3.5" />
                    Full Architecture Route ↗
                  </Link>
                  <a
                    href={selectedProject.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-xl glass border border-white/15 text-white text-xs font-semibold hover:border-purple-400 transition-all"
                  >
                    <Github className="size-3.5" />
                    GitHub Source
                  </a>
                  {selectedProject.demoUrl && (
                    <a
                      href={selectedProject.demoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-purple-600 to-rose-500 text-white text-xs font-semibold hover:opacity-90 transition-all shadow-lg shadow-purple-500/25"
                    >
                      <ExternalLink className="size-3.5" />
                      Live Demo ↗
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
