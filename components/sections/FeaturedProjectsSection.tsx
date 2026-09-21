"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  ExternalLink,
  Github,
  Sparkles,
  Trophy,
  Activity,
  ShoppingBag,
  Mic,
  Eye,
  BookOpen,
  X,
  CheckCircle2,
  Cpu,
  Layers,
  AlertTriangle,
  UserCheck,
} from "lucide-react";
import CardTilt3D from "@/components/3d/CardTilt3D";
import { trackEvent } from "@/lib/analytics";

interface FeaturedProject {
  id: string;
  title: string;
  category: string;
  badge: string;
  role: string;
  description: string;
  challenge: string;
  metrics: string;
  tags: string[];
  accent: string;
  icon: typeof Sparkles;
  githubUrl: string;
  demoUrl?: string;
  architecture: string[];
  impact: string[];
  limitation: string;
}

const FEATURED_PROJECTS: FeaturedProject[] = [
  {
    id: "roleradar",
    title: "RoleRadar — AI Career Intelligence Platform",
    category: "Full Stack AI",
    badge: "Flagship Production SaaS",
    role: "Lead Architect & Full-Stack Engineer",
    description:
      "Full-stack AI resume analyzer and career platform evaluating candidate resumes against 16 industry roles with an 8-point ATS scanner, Google XYZ bullet optimizer, and resilient dual-mode failover storage.",
    challenge:
      "Job seekers face opaque ATS filtering algorithms discarding 75% of resumes. Database pool timeouts also cause catastrophic application crashes during live candidate interviews.",
    metrics: "16 Curated Roles · Sub-180ms Latency · 100% Zero-Crash Resiliency",
    tags: ["Next.js 16", "TypeScript", "Drizzle ORM", "Tailwind CSS v4", "PostgreSQL", "pdf-parse"],
    accent: "#a78bfa",
    icon: Trophy,
    githubUrl: "https://github.com/OxDurgeshxO/RoleRadar",
    demoUrl: "https://rolefit-2.vercel.app",
    limitation: "Scanned image resumes require external OCR preprocessing before evaluation.",
    architecture: [
      "Dual-Storage Architecture: Transparent in-memory session cache fallback takes over if PostgreSQL connection pools time out.",
      "8-Point ATS Evaluation Matrix: Tokenizes and scores resumes on quantifiability, role relevance, section balance, and action-verb density.",
      "Google XYZ Bullet Optimizer: Prompt chain restructures passive bullets into 'Accomplished [X] by [Y] as measured by [Z]'.",
    ],
    impact: [
      "16 Curated Industry Profiles with weighted keyword taxonomies.",
      "In-Memory State Resiliency verified under simulated database connection timeout tests.",
      "Hundreds of candidate analyses processed on live production Vercel deployment.",
    ],
  },
  {
    id: "jarvis-realtime-assistant",
    title: "jarvis-realtime-assistant — Realtime Voice AI & Iron Man HUD",
    category: "Realtime AI",
    badge: "Sub-350ms Latency",
    role: "Creator & Realtime Systems Engineer",
    description:
      "Full-stack conversational voice AI system with a futuristic Iron Man HUD. Orchestrates browser Web Audio chunking, Whisper STT, Gemini 2.0 Flash streaming, and edge-synthesized speech with sub-350ms response latency.",
    challenge:
      "Standard REST HTTP cycles introduce 2-4 second pauses that break natural human conversational cadence and destroy voice interactivity.",
    metrics: "< 350ms Roundtrip · Full-Duplex WebSockets · Gemini 2.0 Flash",
    tags: ["FastAPI", "Python 3.11", "WebSockets", "Gemini 2.0 Flash", "Whisper STT", "Edge-TTS", "React"],
    accent: "#38bdf8",
    icon: Mic,
    githubUrl: "https://github.com/OxDurgeshxO/jarvis-realtime-assistant",
    demoUrl: "https://oxdurgeshxo.github.io/jarvis-realtime-assistant/",
    limitation: "High ambient background noise can occasionally trigger premature Voice Activity Detection interrupts.",
    architecture: [
      "Browser Audio Worklet: Captures 16kHz 16-bit PCM audio chunks continuously off the main UI rendering thread.",
      "FastAPI WebSocket Hub: Handles bi-directional streaming, heartbeat signals, and automatic client reconnection.",
      "Sentence-Level Audio Streaming: Parallelizes Edge-TTS audio synthesis as Gemini streams token sentences.",
    ],
    impact: [
      "Sub-350ms end-to-end voice loop latency achieved in production tests.",
      "Interactive visual HUD responding to dynamic audio frequencies in real-time.",
      "Published open-source repository with full architecture documentation.",
    ],
  },
  {
    id: "marketmatch-ai",
    title: "MarketMatch-AI — Customer Segmentation & Recommender",
    category: "Machine Learning",
    badge: "Unsupervised ML",
    role: "Lead ML Engineer",
    description:
      "End-to-end machine learning pipeline clustering retail consumer behaviors using K-Means and DBSCAN with PCA dimensionality reduction, paired with a Nearest Neighbors recommendation engine for hyper-targeted campaigns.",
    challenge:
      "Retail customer transaction datasets contain high-dimensional noise and outliers; blasting generic promotions burns ad budget with low conversion.",
    metrics: "High Silhouette Clustering · 2D/3D PCA Visuals · Instant CSV Inference",
    tags: ["Python 3.10", "Scikit-Learn", "K-Means", "DBSCAN", "Streamlit", "Pandas", "Plotly"],
    accent: "#f43f5e",
    icon: ShoppingBag,
    githubUrl: "https://github.com/OxDurgeshxO/MarketMatch-AI",
    demoUrl: "https://oxdurgeshxo-marketmatch-ai-app-y8ysbm.streamlit.app/",
    limitation: "Very large datasets (>100,000 rows) can experience memory slowdowns on free cloud tiers.",
    architecture: [
      "Dual Unsupervised Pipeline: Employs K-Means with Silhouette scoring alongside DBSCAN for noise anomaly removal.",
      "PCA Dimensionality Projection: Compresses multi-variable transaction records down to 2D/3D visual coordinates.",
      "Nearest Neighbors Engine: Instant cosine distance similarity queries recommending targeted promotional campaigns.",
    ],
    impact: [
      "Validated 4 distinct high-converting customer personas on retail benchmark data.",
      "Interactive cloud dashboard live with zero infrastructure hosting cost on Streamlit Cloud.",
      "Real-time ingestion and instant clustering upon CSV file upload.",
    ],
  },
  {
    id: "cnn-streamlit",
    title: "CNN-STREAMLIT — Deep Learning Computer Vision Classifier",
    category: "Computer Vision",
    badge: "89.3% Test Accuracy",
    role: "Deep Learning Engineer",
    description:
      "End-to-end Deep Learning Convolutional Neural Network trained on Fashion-MNIST with 89.3% accuracy, featuring an interactive real-time Streamlit image classifier with sketch canvas and photo upload.",
    challenge:
      "Traditional machine learning classifiers fail on visual pixel data due to lack of spatial invariance; vision models often remain locked in notebooks without accessible test tools.",
    metrics: "89.3% Test Accuracy · 10 Classes · < 45ms CPU Inference",
    tags: ["PyTorch", "Python", "Torchvision", "Streamlit", "PIL", "Computer Vision"],
    accent: "#ec4899",
    icon: Eye,
    githubUrl: "https://github.com/OxDurgeshxO/CNN-STREAMLIT",
    demoUrl: undefined,
    limitation: "Input images must be tightly cropped to garment to match Fashion-MNIST distribution.",
    architecture: [
      "Conv2D Feature Extractor: 2 convolutional blocks (32 & 64 filters) with BatchNorm and ReLU activations.",
      "Regularization Layer: Dropout (0.25 and 0.5) prevents overfitting across 60,000 training images.",
      "Interactive Canvas: Allows real-time drawing and upload with automatic 28x28 grayscale normalization.",
    ],
    impact: [
      "89.3% test accuracy on test set of 10,000 unseen apparel images.",
      "Interactive UI enabling real-time verification of custom user images.",
      "Lightweight deployment executing forward passes in < 45ms on CPU.",
    ],
  },
  {
    id: "fittrack",
    title: "FitTrack AI — Computer Vision Fitness Platform",
    category: "Computer Vision",
    badge: "9-Page Architecture",
    role: "Lead Full-Stack & Computer Vision Engineer",
    description:
      "Production-grade 9-page fitness engineering platform featuring real-time MediaPipe pose estimation, kinematic joint angle tracking, exercise rep counting, wearable sensor telemetry, and workout analytics.",
    challenge:
      "Executing computer vision pose estimation inside browser runtimes blocks the main JavaScript thread, causing dropped video frames and erratic rep counting.",
    metrics: "Sub-50ms Pose Inference · 60 FPS UI Thread · 9 Core Platform Modules",
    tags: ["React 19", "TypeScript", "Vite", "Tailwind CSS", "MediaPipe Pose", "Web Workers", "WebSockets"],
    accent: "#fb7185",
    icon: Activity,
    githubUrl: "https://github.com/OxDurgeshxO/fitness-platform-architecture",
    demoUrl: undefined,
    limitation: "Loose or baggy clothing can occasionally distort precise knee angle kinematics.",
    architecture: [
      "Web Worker Offloading: MediaPipe 33-point body landmark inference executes in background workers to keep UI at 60 FPS.",
      "Kinematics Math Engine: Calculates hip-knee-ankle vector dot products for exercise form scoring.",
      "WebSocket Telemetry Hub: Real-time bi-directional streaming between wearable sensors and coaching UI.",
    ],
    impact: [
      "Sub-50ms pose inference latency achieved across standard laptop webcams.",
      "9 Comprehensive Architecture Pages spanning workouts, analytics, nutrition, and telemetry.",
      "Multi-Agent coaching with contextual posture feedback and form correction tips.",
    ],
  },
];

const CATEGORIES = ["All", "Full Stack AI", "Realtime AI", "Computer Vision", "Machine Learning"];

export default function FeaturedProjectsSection() {
  const [selectedProject, setSelectedProject] = useState<FeaturedProject | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const previousFocusRef = useRef<HTMLElement | null>(null);
  const modalRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelectedProject(null);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  useEffect(() => {
    if (selectedProject) {
      previousFocusRef.current = document.activeElement as HTMLElement;
      setTimeout(() => {
        const closeBtn = modalRef.current?.querySelector<HTMLElement>('button');
        closeBtn?.focus();
      }, 50);
    } else if (previousFocusRef.current) {
      previousFocusRef.current.focus?.();
      previousFocusRef.current = null;
    }
  }, [selectedProject]);

  const handleKeyDownTrap = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key !== "Tab" || !modalRef.current) return;
    const focusables = modalRef.current.querySelectorAll<HTMLElement>(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    if (focusables.length === 0) return;
    const first = focusables[0];
    const last = focusables[focusables.length - 1];
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  };

  const filteredProjects =
    activeCategory === "All"
      ? FEATURED_PROJECTS
      : FEATURED_PROJECTS.filter((p) => p.category.toLowerCase().includes(activeCategory.toLowerCase()));

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
          5 Featured <span className="gradient-text">Platforms</span>
        </h2>
        <div className="w-20 h-1 bg-gradient-to-r from-purple-500 to-rose-500 rounded mx-auto mb-4" />
        <p className="text-slate-400 max-w-2xl mx-auto text-sm md:text-base leading-relaxed">
          Curated full-stack AI applications, realtime voice systems, and machine learning pipelines engineered with verified architecture, observable metrics, and production discipline.
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
              {cat === "All" ? "All Flagship Platforms" : cat}
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

                        <h3 className="text-2xl md:text-3xl font-bold text-white mb-2 group-hover:text-rose-300 transition-colors">
                          {proj.title}
                        </h3>

                        <div className="flex items-center gap-2 text-xs font-mono text-purple-300 mb-4">
                          <UserCheck className="size-3.5 text-purple-400 shrink-0" />
                          <span>Role: {proj.role}</span>
                        </div>

                        <p className="text-slate-300 text-sm md:text-[14.5px] leading-relaxed mb-4">
                          {proj.description}
                        </p>

                        {/* Problem Solved */}
                        <div className="p-3 rounded-xl bg-white/[0.03] border border-white/5 text-xs text-slate-300 mb-3 leading-relaxed">
                          <span className="font-semibold text-rose-300 font-mono uppercase text-[11px]">Problem Solved: </span>
                          {proj.challenge}
                        </div>

                        {/* Measurable Metric */}
                        <div className="rounded-xl border border-white/5 bg-white/[0.02] px-4 py-2.5 mb-3 inline-block font-mono text-xs text-slate-300">
                          <span className="text-emerald-300 font-semibold">Measurable Result:</span> {proj.metrics}
                        </div>

                        {/* Known Limitation Callout */}
                        <div className="flex items-start gap-2 p-2.5 rounded-lg bg-amber-500/10 border border-amber-500/20 text-amber-200 text-xs mb-5">
                          <AlertTriangle className="size-3.5 text-amber-400 shrink-0 mt-0.5" />
                          <div>
                            <span className="font-semibold font-mono uppercase text-[11px]">Known Limitation: </span>
                            <span>{proj.limitation}</span>
                          </div>
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
                          className="inline-flex items-center justify-center gap-2 rounded-xl bg-purple-600/20 hover:bg-purple-600/30 border border-purple-500/40 px-4 py-3 text-xs md:text-sm font-semibold text-purple-200 transition-all cursor-pointer w-full sm:w-auto shadow-md shadow-purple-500/10"
                        >
                          <BookOpen className="size-4 text-purple-400" />
                          Architecture Deep Dive
                          <span className="text-[11px] font-mono bg-purple-500/30 px-1.5 py-0.5 rounded text-purple-200 ml-1">
                            /work
                          </span>
                        </Link>

                        <button
                          onClick={() => setSelectedProject(proj)}
                          className="inline-flex items-center justify-center gap-2 rounded-xl glass hover:bg-white/10 border border-white/15 px-4 py-3 text-xs md:text-sm font-semibold text-slate-200 transition-all cursor-pointer w-full sm:w-auto"
                        >
                          <Sparkles className="size-4 text-rose-400" />
                          Quick Architecture Spec
                        </button>

                        <a
                          href={proj.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={() => trackEvent("github_click", { project_id: proj.id, url: proj.githubUrl })}
                          className="inline-flex items-center justify-center gap-2 rounded-xl bg-white/10 hover:bg-white/20 border border-white/10 px-5 py-3 text-xs md:text-sm font-semibold text-white transition-all w-full sm:w-auto focus-visible:ring-2 focus-visible:ring-white/50"
                        >
                          <Github className="size-4" />
                          Source Code
                        </a>

                        {proj.demoUrl && (
                          <a
                            href={proj.demoUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={() => trackEvent("project_view", { project_id: proj.id, url: proj.demoUrl })}
                            className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-purple-600 to-rose-500 px-5 py-3 text-xs md:text-sm font-semibold text-white shadow-lg shadow-purple-500/20 hover:opacity-90 transition-all w-full sm:w-auto cursor-pointer focus-visible:ring-2 focus-visible:ring-rose-400"
                          >
                            <ExternalLink className="size-4" />
                            Live Demo
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
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto"
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedProject(null)}
              className="fixed inset-0 bg-black/80 backdrop-blur-md"
            />

            <motion.div
              ref={modalRef}
              onKeyDown={handleKeyDownTrap}
              initial={{ opacity: 0, scale: 0.92, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 20 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="relative w-full max-w-3xl glass border border-purple-500/30 rounded-3xl p-6 sm:p-8 md:p-10 shadow-2xl shadow-purple-500/20 max-h-[90vh] overflow-y-auto z-10 bg-[#0c0c14]/95"
            >
              <div
                className="absolute top-0 left-0 right-0 h-1.5 rounded-t-3xl"
                style={{ background: `linear-gradient(90deg, transparent, ${selectedProject.accent}, transparent)` }}
              />

              <button
                onClick={() => setSelectedProject(null)}
                aria-label="Close Case Study Modal"
                className="absolute top-5 right-5 w-10 h-10 rounded-full glass border border-white/10 flex items-center justify-center text-slate-400 hover:text-white hover:border-white/30 transition-all cursor-pointer"
              >
                <X className="size-5" />
              </button>

              <div className="mb-8 pr-12">
                <div
                  className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-semibold uppercase tracking-wider mb-3"
                  style={{ backgroundColor: `${selectedProject.accent}20`, color: selectedProject.accent, border: `1px solid ${selectedProject.accent}40` }}
                >
                  <Sparkles className="size-3.5" />
                  Flagship Overview
                </div>
                <h3 id="modal-title" className="text-2xl sm:text-3xl font-extrabold text-white mb-2">
                  {selectedProject.title}
                </h3>
                <p className="text-purple-300 text-xs font-mono mb-1">
                  Role: {selectedProject.role}
                </p>
                <p className="text-slate-400 text-xs font-mono">
                  Category: {selectedProject.category}
                </p>
              </div>

              {/* Problem Solved */}
              <div className="mb-5 p-5 rounded-2xl bg-white/[0.03] border border-white/5">
                <div className="flex items-center gap-2 text-rose-300 text-xs font-mono font-semibold uppercase tracking-wider mb-2">
                  <Cpu className="size-4 text-rose-400" />
                  Problem Solved
                </div>
                <p className="text-slate-300 text-sm leading-relaxed">
                  {selectedProject.challenge}
                </p>
              </div>

              {/* Architecture Decisions */}
              <div className="mb-5 p-5 rounded-2xl bg-white/[0.03] border border-white/5">
                <div className="flex items-center gap-2 text-purple-300 text-xs font-mono font-semibold uppercase tracking-wider mb-3">
                  <Layers className="size-4 text-purple-400" />
                  System Architecture & Approach
                </div>
                <ul className="space-y-2">
                  {selectedProject.architecture.map((arch, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-xs text-slate-300 leading-relaxed">
                      <span className="w-1.5 h-1.5 rounded-full bg-purple-400 mt-1.5 shrink-0" />
                      <span>{arch}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Measurable Results */}
              <div className="mb-5 p-5 rounded-2xl bg-white/[0.03] border border-white/5">
                <div className="flex items-center gap-2 text-emerald-300 text-xs font-mono font-semibold uppercase tracking-wider mb-3">
                  <CheckCircle2 className="size-4 text-emerald-400" />
                  Measurable Production Results
                </div>
                <ul className="space-y-2">
                  {selectedProject.impact.map((item, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-xs text-slate-300 leading-relaxed">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-1.5 shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Known Limitation */}
              <div className="mb-6 p-4 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-200 text-xs">
                <div className="flex items-center gap-1.5 font-mono uppercase tracking-wider text-amber-300 font-semibold mb-1">
                  <AlertTriangle className="size-3.5 text-amber-400" /> Known Limitation
                </div>
                <p>{selectedProject.limitation}</p>
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
                    Full Architecture Route
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
                      Live Demo
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