"use client";

import { copyToClipboard } from "@/lib/clipboard";
import React, { useState } from "react";
import Link from "next/link";
import { Download, Printer, Copy, Check, ArrowLeft, Palette, FileText } from "lucide-react";
import { OWNER } from "@/lib/data";

export type ResumeTheme = "pure-white" | "warm-ivory" | "light-gray";

interface ResumeActionsProps {
  currentTheme?: ResumeTheme;
  onThemeChange?: (theme: ResumeTheme) => void;
}

export default function ResumeActions({
  currentTheme = "pure-white",
  onThemeChange,
}: ResumeActionsProps) {
  const [copiedSummary, setCopiedSummary] = useState(false);
  const [copiedAts, setCopiedAts] = useState(false);

  const handlePrint = () => {
    window.print();
  };

  const handleCopySummary = async () => {
    const text = `${OWNER.name} — ${OWNER.title}
MCA (AIML) at Sri Balaji University Pune (2025–2027) | UNLOX® AI Fellow | Be10x AI Cohort Member.
Autonomous AI systems, Real-Time MediaPipe (<50ms), Next.js, React, TypeScript, Drizzle ORM, Scikit-Learn.
Email: ${OWNER.email} | GitHub: ${OWNER.github} | Portfolio: https://durgesh-portfolio.pages.dev`;
    const ok = await copyToClipboard(text);
    if (ok) {
      setCopiedSummary(true);
      setTimeout(() => setCopiedSummary(false), 2000);
    }
  };

  const handleCopyFullAts = async () => {
    const text = `DURGESH DUTT SINHA
Pune, Maharashtra, India | +91 82353 08643 | durgeshdsinha@gmail.com
LinkedIn: linkedin.com/in/durgesh-sinha | GitHub: github.com/OxDurgeshxO | Portfolio: durgesh-portfolio.pages.dev

================================================================================
PROFESSIONAL SUMMARY
================================================================================
Results-driven AI/ML Engineer & Full-Stack Architect with deep expertise in PyTorch,
computer vision, real-time multimodal systems, and modern Next.js/FastAPI production
architectures. Proven record architecting full-duplex WebSocket streaming assistants,
unsupervised customer segmentation pipelines, and deep learning vision systems. Master
of Computer Applications (AIML) candidate with experience deploying containerized AI
pipelines and driving measurable performance optimizations.

================================================================================
TECHNICAL SKILLS
================================================================================
Languages:             Python, TypeScript, JavaScript, SQL, C/C++, HTML5, CSS3
AI & Machine Learning: PyTorch, Scikit-Learn, Computer Vision (MediaPipe, OpenCV, CNN),
                       Whisper STT, Gemini 2.0 Flash API, RAG, Pandas, NumPy, K-Means, DBSCAN
Full-Stack & Backend:  Next.js, React, FastAPI, Node.js, WebSockets, RESTful APIs,
                       Tailwind CSS, Streamlit
Cloud & Databases:     PostgreSQL (Neon), Drizzle ORM, Docker, Cloudflare Pages, Git/GitHub, Linux

================================================================================
EXPERIENCE & FELLOWSHIPS
================================================================================
UNLOX® | Remote                                                  Jan 2026 – Present
AI Program Fellow
• Evaluated autonomous agent architectures, function-calling workflows, and LLM guardrails under senior technical mentorship.
• Containerized multi-service machine learning pipelines with Docker, reducing environment setup drift and accelerating model prototyping cycles by 40%.

Be10x | India                                                    Oct 2025 – Dec 2025
AI Cohort Member & Prototype Builder
• Designed prompt-chaining architectures and agentic automation workflows, optimizing token consumption across multi-step LLM tasks.
• Built functional proof-of-concept AI productivity automations, integrating structured JSON output schemas and multi-turn conversational memory.

InAmigos Foundation (IAF) | Remote                               Jun 2024 – Aug 2024
Web Development Intern
• Developed and maintained responsive web interfaces for non-profit initiatives using modern JavaScript and semantic HTML5/CSS3, improving mobile accessibility to WCAG 2.1 AA standards across 5,000+ monthly visitors.

================================================================================
FEATURED TECHNICAL PROJECTS
================================================================================
J.A.R.V.I.S. — Real-Time Multimodal AI Voice Assistant           Python, FastAPI, React
GitHub: github.com/OxDurgeshxO/jarvis-realtime-assistant | Demo: oxdurgeshxo.github.io/jarvis-realtime-assistant
• Engineered a full-duplex voice assistant streaming 16kHz audio over bi-directional WebSockets between React frontend and FastAPI backend, achieving <450ms turnaround latency.
• Integrated Silero Voice Activity Detection (VAD) with Whisper STT and Gemini 2.0 Flash streaming API, paired with Edge-TTS for seamless real-time voice interruptions.

RoleRadar — AI Resume Analyzer & Career Intelligence Platform    Next.js, TypeScript, PostgreSQL
GitHub: github.com/OxDurgeshxO/RoleRadar | Demo: rolefit-2.vercel.app
• Architected a full-stack resume analysis engine parsing PDF/DOCX files and scoring candidate alignment against 16 canonical engineering role taxonomies in under 1.2 seconds.
• Implemented Google XYZ-formula scoring, ATS keyword density analyzers, and actionable gap audits; persisted candidate benchmark reports to Neon PostgreSQL via Drizzle ORM.

MarketMatch-AI — Customer Segmentation Studio                    Python, Scikit-Learn, Streamlit
GitHub: github.com/OxDurgeshxO/MarketMatch-AI | Demo: oxdurgeshxo-marketmatch-ai-app-y8ysbm.streamlit.app
• Developed an unsupervised machine learning pipeline clustering 4,300+ e-commerce transaction records using RFM (Recency, Frequency, Monetary) feature extraction.
• Benchmarked K-Means clustering (Silhouette Score: 0.64, K=5) against DBSCAN for anomaly suppression; visualized high-dimensional clusters with interactive 3D Plotly projections.

Fashion-MNIST Classifier — Deep Learning CNN Streamlit App       PyTorch, Python, Streamlit
GitHub: github.com/OxDurgeshxO/CNN-STREAMLIT | Demo: cnn-app-dmfd7b76fxyrnvrhzpkgay.streamlit.app
• Trained custom multi-layer CNN in PyTorch on 70,000 Fashion-MNIST images, achieving 91.4% test accuracy with Batch Normalization and 0.25 Dropout regularization.
• Deployed live inference dashboard in Streamlit providing sub-50ms inference latency, real-time image uploads, and softmax class probability distributions.

================================================================================
EDUCATION
================================================================================
Sri Balaji University, Pune (SBUP) | Pune, India                 Jul 2025 – Jun 2027
Master of Computer Applications (MCA) — Artificial Intelligence & Machine Learning

Sri Balaji University, Pune (SBUP) | Pune, India                 Aug 2022 – Apr 2025
Bachelor of Computer Applications (BCA) — Computer Applications

================================================================================
CERTIFICATIONS & HONORS
================================================================================
• AWS Educate: Machine Learning Foundations — Amazon Web Services (2025)
• AWS Educate: Emerging Talent Community Member — Amazon Web Services (2025)
• Central Coordination Team Leader — School of Computer Studies, SBUP (2026)`;

    const ok = await copyToClipboard(text);
    if (ok) {
      setCopiedAts(true);
      setTimeout(() => setCopiedAts(false), 2000);
    }
  };

  const themes: { id: ResumeTheme; name: string; bgClass: string; desc: string }[] = [
    { id: "pure-white", name: "Pure White", bgClass: "bg-white border-slate-300", desc: "ATS Gold Standard (Recommended)" },
    { id: "warm-ivory", name: "Warm Ivory", bgClass: "bg-[#FAF9F5] border-stone-300", desc: "Editorial Off-White" },
    { id: "light-gray", name: "Light Gray", bgClass: "bg-[#F8FAFC] border-slate-300", desc: "Modern Minimal" },
  ];

  return (
    <div className="resume-actions-bar bg-card/95 backdrop-blur-md border border-border p-3.5 rounded-2xl mb-8 flex flex-wrap items-center justify-between gap-4 shadow-xl">
      <div className="flex items-center gap-3">
        <Link
          href="/"
          className="text-xs text-muted-foreground hover:text-ink flex items-center gap-1 transition-colors"
          aria-label="Back to Portfolio Home"
        >
          <ArrowLeft className="size-3.5" />
          <span>Home</span>
        </Link>

        <span className="text-ink/20">|</span>

        <Link
          href="/recruiter"
          className="text-xs text-muted-foreground hover:text-ink flex items-center gap-1.5 transition-colors"
        >
          <span>Recruiter Fast Track</span>
        </Link>

        {/* ATS Background Theme Selector */}
        {onThemeChange && (
          <div className="hidden sm:flex items-center gap-1.5 pl-3 border-l border-border">
            <span className="text-[11px] font-mono text-muted-foreground flex items-center gap-1 mr-1">
              <Palette className="size-3 text-primary" />
              <span>Theme:</span>
            </span>
            <div className="flex items-center rounded-lg bg-muted p-0.5 border border-border">
              {themes.map((t) => (
                <button
                  key={t.id}
                  onClick={() => onThemeChange(t.id)}
                  title={`${t.name} - ${t.desc}`}
                  aria-label={`Switch to ${t.name} background theme`}
                  aria-pressed={currentTheme === t.id}
                  className={`px-2.5 py-1 text-[11px] font-medium rounded-md transition-all flex items-center gap-1.5 cursor-pointer ${
                    currentTheme === t.id
                      ? "bg-white text-slate-900 font-semibold shadow-sm"
                      : "text-body hover:text-ink hover:bg-muted"
                  }`}
                >
                  <span className={`size-2.5 rounded-full border border-black/20 ${t.bgClass}`} />
                  <span>{t.name}</span>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <button
          onClick={handleCopyFullAts}
          title="Copy complete ATS-optimized plaintext resume to clipboard"
          className="px-3 py-1.5 rounded-xl border border-border bg-muted hover:bg-accent text-xs text-body font-semibold flex items-center gap-1.5 transition-all cursor-pointer"
        >
          {copiedAts ? <Check className="size-3.5 text-[var(--accent-lab)]" /> : <FileText className="size-3.5 text-primary" />}
          <span>{copiedAts ? "ATS Text Copied!" : "Copy Full ATS"}</span>
        </button>

        <button
          onClick={handleCopySummary}
          title="Copy short executive summary"
          className="px-3 py-1.5 rounded-xl border border-border bg-muted hover:bg-accent text-xs text-body font-semibold flex items-center gap-1.5 transition-all cursor-pointer"
        >
          {copiedSummary ? <Check className="size-3.5 text-[var(--accent-lab)]" /> : <Copy className="size-3.5" />}
          <span>{copiedSummary ? "Copied!" : "Copy Summary"}</span>
        </button>

        <button
          onClick={handlePrint}
          className="px-3 py-1.5 rounded-xl border border-border bg-muted hover:bg-accent text-xs text-body font-semibold flex items-center gap-1.5 transition-all cursor-pointer"
        >
          <Printer className="size-3.5" />
          <span>Print / Save PDF</span>
        </button>

        <a
          href="/resume.pdf"
          download="Durgesh_Dutt_Sinha_Resume.pdf"
          className="px-4 py-1.5 rounded-xl bg-gradient-to-r from-[var(--gradient-start)] to-[var(--gradient-end)] hover:from-[var(--gradient-start)] hover:to-rose-400 text-white font-semibold text-xs flex items-center gap-1.5 shadow-md shadow-black/20 transition-all cursor-pointer"
        >
          <Download className="size-3.5" />
          <span>Official PDF</span>
        </a>
      </div>
    </div>
  );
}
