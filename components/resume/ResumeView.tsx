"use client";

import React, { useState } from "react";
import ResumeHeader from "@/components/resume/ResumeHeader";
import ResumeSection from "@/components/resume/ResumeSection";
import ResumeActions, { ResumeTheme } from "@/components/resume/ResumeActions";
import RoleHighlighter, { RoleCategory, ROLE_DEFINITIONS } from "@/components/resume/RoleHighlighter";
import { EDUCATION, CERTIFICATIONS } from "@/lib/data";

export default function ResumeView() {
  const [theme, setTheme] = useState<ResumeTheme>("pure-white");
  const [activeRole, setActiveRole] = useState<RoleCategory>("all");

  const renderHighlightedText = (text: string) => {
    if (activeRole === "all") return text;
    const keywords = ROLE_DEFINITIONS[activeRole].keywords;
    const items = text.split(", ");
    return items.map((item, idx) => {
      const match = keywords.some(
        (k) => item.toLowerCase().includes(k.toLowerCase()) || k.toLowerCase().includes(item.toLowerCase())
      );
      return (
        <React.Fragment key={idx}>
          {idx > 0 && ", "}
          <span
            className={
              match
                ? "bg-amber-300/30 text-amber-950 font-bold px-1 py-0.5 rounded border border-amber-400/40 print:bg-transparent print:border-none print:p-0 transition-colors"
                : ""
            }
          >
            {item}
          </span>
        </React.Fragment>
      );
    });
  };

  const highlightBulletText = (text: string) => {
    if (activeRole === "all") return text;
    const keywords = ROLE_DEFINITIONS[activeRole].keywords;
    if (!keywords || keywords.length === 0) return text;

    const validKeywords = keywords
      .filter((k) => k && k.length > 1)
      .sort((a, b) => b.length - a.length);

    if (validKeywords.length === 0) return text;

    const pattern = new RegExp(
      `(${validKeywords.map((k) => k.replace(/[.*+?^${}()|[\\]\\\\]/g, "\\\\$&")).join("|")})`,
      "gi"
    );

    const parts = text.split(pattern);
    return parts.map((part, idx) => {
      const isMatch = validKeywords.some(
        (k) => k.toLowerCase() === part.toLowerCase()
      );
      if (isMatch) {
        return (
          <span
            key={idx}
            className="bg-amber-300/35 text-amber-950 font-bold px-0.5 rounded border border-amber-400/40 print:bg-transparent print:border-none print:p-0 transition-colors"
          >
            {part}
          </span>
        );
      }
      return part;
    });
  };

  const themeStyles: Record<
    ResumeTheme,
    {
      container: string;
      heading: string;
      body: string;
      subtext: string;
      border: string;
    }
  > = {
    "pure-white": {
      container: "bg-white border-slate-300 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.3)]",
      heading: "text-slate-950",
      body: "text-slate-800",
      subtext: "text-slate-600",
      border: "border-slate-300",
    },
    "warm-ivory": {
      container: "bg-[#FAF8F5] border-[#E5E0D8] shadow-[0_20px_40px_-15px_rgba(0,0,0,0.3)]",
      heading: "text-stone-950",
      body: "text-stone-800",
      subtext: "text-stone-600",
      border: "border-stone-300",
    },
    "light-gray": {
      container: "bg-[#F8FAFC] border-slate-300 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.3)]",
      heading: "text-slate-950",
      body: "text-slate-800",
      subtext: "text-slate-600",
      border: "border-slate-300",
    },
  };

  const current = themeStyles[theme];

  return (
    <div className="max-w-4xl mx-auto">
      <ResumeActions currentTheme={theme} onThemeChange={setTheme} />
      <RoleHighlighter activeRole={activeRole} onRoleChange={setActiveRole} />

      {/* Main Resume Sheet - Real Developer Data & ATS-Optimized 1-Page Format */}
      <article
        aria-label="Official Resume of Durgesh Dutt Sinha"
        className={`resume-container resume-page ${current.container} border rounded-xl p-5 sm:p-7 transition-colors duration-200 text-left font-sans antialiased`}
      >
        <ResumeHeader />

        {/* Professional Summary */}
        <ResumeSection title="Professional Summary">
          <p className="leading-snug text-xs sm:text-[12px] text-slate-800">
            Results-driven <strong className="font-semibold text-slate-950">AI/ML Engineer & Full-Stack Architect</strong> with deep expertise in PyTorch, computer vision, real-time multimodal systems, and modern Next.js/FastAPI production architectures. Proven record architecting full-duplex WebSocket voice assistants, unsupervised customer segmentation pipelines, and deep learning vision systems. Master of Computer Applications (AIML) candidate with experience deploying containerized AI pipelines and driving measurable performance optimizations.
          </p>
        </ResumeSection>

        {/* Technical Skills */}
        <ResumeSection title="Technical Skills">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-1 text-xs sm:text-[11.5px] leading-tight">
            <div>
              <span className="font-bold text-slate-950">Languages: </span>
              <span className="text-slate-800">{renderHighlightedText("Python, TypeScript, JavaScript, SQL, C/C++, HTML5, CSS3")}</span>
            </div>
            <div>
              <span className="font-bold text-slate-950">AI & Machine Learning: </span>
              <span className="text-slate-800">{renderHighlightedText("PyTorch, Scikit-Learn, Computer Vision (MediaPipe, OpenCV, CNN), Whisper STT, Gemini API, Gemini 2.0 Flash, RAG, Pandas, NumPy, K-Means, DBSCAN")}</span>
            </div>
            <div>
              <span className="font-bold text-slate-950">Full-Stack & Backend: </span>
              <span className="text-slate-800">{renderHighlightedText("Next.js, React, FastAPI, Node.js, WebSockets, RESTful APIs, Tailwind CSS, Streamlit")}</span>
            </div>
            <div>
              <span className="font-bold text-slate-950">Cloud, Database & Tools: </span>
              <span className="text-slate-800">{renderHighlightedText("PostgreSQL (Neon), Drizzle ORM, Docker, Cloudflare Pages, Git & GitHub, Linux, AWS Educate")}</span>
            </div>
          </div>
        </ResumeSection>

        {/* Professional Experience & Fellowships */}
        <ResumeSection title="Experience & Fellowships">
          <div className="space-y-1.5">
            <div className="experience-item avoid-break">
              <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-0.5">
                <h3 className="font-bold text-xs sm:text-[12.5px] text-slate-950">
                  AI Program Fellow <span className="font-medium text-slate-600">— UNLOX®</span>
                </h3>
                <span className="text-[11px] sm:text-xs font-medium text-slate-600 shrink-0">Jan 2026 – Present • Remote</span>
              </div>
              <ul className="list-disc ml-4 space-y-0.5 text-xs sm:text-[11.5px] text-slate-800 leading-tight mt-0.5">
                <li>{highlightBulletText("Evaluated autonomous agent architectures, function-calling workflows, and LLM guardrails under senior technical mentorship.")}</li>
                <li>{highlightBulletText("Containerized multi-service machine learning pipelines with Docker, reducing environment setup drift and accelerating model prototyping cycles by 40%.")}</li>
              </ul>
            </div>

            <div className="experience-item avoid-break">
              <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-0.5">
                <h3 className="font-bold text-xs sm:text-[12.5px] text-slate-950">
                  AI Cohort Member & Prototype Builder <span className="font-medium text-slate-600">— Be10x</span>
                </h3>
                <span className="text-[11px] sm:text-xs font-medium text-slate-600 shrink-0">Oct 2025 – Dec 2025 • India</span>
              </div>
              <ul className="list-disc ml-4 space-y-0.5 text-xs sm:text-[11.5px] text-slate-800 leading-tight mt-0.5">
                <li>{highlightBulletText("Designed prompt-chaining architectures and agentic automation workflows, optimizing token consumption across multi-step LLM tasks.")}</li>
                <li>{highlightBulletText("Built functional proof-of-concept AI productivity automations, integrating structured JSON output schemas and multi-turn conversational memory.")}</li>
              </ul>
            </div>

            <div className="experience-item avoid-break">
              <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-0.5">
                <h3 className="font-bold text-xs sm:text-[12.5px] text-slate-950">
                  Web Development Intern <span className="font-medium text-slate-600">— InAmigos Foundation (IAF)</span>
                </h3>
                <span className="text-[11px] sm:text-xs font-medium text-slate-600 shrink-0">Jun 2024 – Aug 2024 • Remote</span>
              </div>
              <ul className="list-disc ml-4 space-y-0.5 text-xs sm:text-[11.5px] text-slate-800 leading-tight mt-0.5">
                <li>{highlightBulletText("Developed and maintained responsive web interfaces for non-profit initiatives using modern JavaScript and semantic HTML5/CSS3, improving mobile accessibility to WCAG 2.1 AA standards across 5,000+ monthly visitors.")}</li>
              </ul>
            </div>
          </div>
        </ResumeSection>

        {/* Featured Technical Projects */}
        <ResumeSection title="Featured Projects">
          <div className="space-y-2">
            {/* Project 1: J.A.R.V.I.S. */}
            <div className="project-item avoid-break">
              <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-0.5">
                <h3 className="font-bold text-xs sm:text-[12.5px] text-slate-950">
                  J.A.R.V.I.S. <span className="font-medium text-slate-600">— Real-Time Multimodal AI Voice Assistant</span>
                </h3>
                <div className="text-[11px] sm:text-xs text-blue-600 font-medium space-x-1.5 shrink-0">
                  <a href="https://github.com/OxDurgeshxO/jarvis-realtime-assistant" target="_blank" rel="noopener noreferrer" className="hover:underline">GitHub</a>
                  <span>•</span>
                  <a href="https://oxdurgeshxo.github.io/jarvis-realtime-assistant/" target="_blank" rel="noopener noreferrer" className="hover:underline">Live Demo</a>
                </div>
              </div>
              <div className="text-[11px] sm:text-[11.5px] text-slate-700 font-medium">
                <span className="font-semibold text-slate-900">Tech Stack:</span> {highlightBulletText("FastAPI • Python • WebSockets • React • TypeScript • Whisper STT • Gemini 2.0 Flash • Edge-TTS")}
              </div>
              <ul className="list-disc ml-4 space-y-0.5 text-xs sm:text-[11.5px] text-slate-800 leading-tight mt-0.5">
                <li>{highlightBulletText("Engineered a full-duplex voice assistant streaming 16kHz audio over bi-directional WebSockets between React frontend and FastAPI backend, achieving <450ms turnaround latency.")}</li>
                <li>{highlightBulletText("Integrated Silero Voice Activity Detection (VAD) with Whisper STT and Gemini 2.0 Flash streaming API, paired with Edge-TTS for seamless real-time voice interruptions.")}</li>
              </ul>
            </div>

            {/* Project 2: RoleRadar */}
            <div className="project-item avoid-break">
              <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-0.5">
                <h3 className="font-bold text-xs sm:text-[12.5px] text-slate-950">
                  RoleRadar <span className="font-medium text-slate-600">— AI Resume Analyzer & Career Intelligence Platform</span>
                </h3>
                <div className="text-[11px] sm:text-xs text-blue-600 font-medium space-x-1.5 shrink-0">
                  <a href="https://github.com/OxDurgeshxO/RoleRadar" target="_blank" rel="noopener noreferrer" className="hover:underline">GitHub</a>
                  <span>•</span>
                  <a href="https://rolefit-2.vercel.app" target="_blank" rel="noopener noreferrer" className="hover:underline">Live Demo</a>
                </div>
              </div>
              <div className="text-[11px] sm:text-[11.5px] text-slate-700 font-medium">
                <span className="font-semibold text-slate-900">Tech Stack:</span> {highlightBulletText("Next.js • React • TypeScript • Drizzle ORM • PostgreSQL (Neon) • Tailwind CSS • pdf-parse")}
              </div>
              <ul className="list-disc ml-4 space-y-0.5 text-xs sm:text-[11.5px] text-slate-800 leading-tight mt-0.5">
                <li>{highlightBulletText("Architected full-stack resume analysis engine parsing PDF/DOCX files and scoring candidate alignment against 16 canonical engineering role taxonomies in under 1.2 seconds.")}</li>
                <li>{highlightBulletText("Implemented Google XYZ-formula scoring, ATS keyword density analyzers, and actionable gap audits; persisted candidate benchmark reports to Neon PostgreSQL via Drizzle ORM.")}</li>
              </ul>
            </div>

            {/* Project 3: MarketMatch-AI */}
            <div className="project-item avoid-break">
              <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-0.5">
                <h3 className="font-bold text-xs sm:text-[12.5px] text-slate-950">
                  MarketMatch-AI <span className="font-medium text-slate-600">— Customer Segmentation & Lookalike Analytics Studio</span>
                </h3>
                <div className="text-[11px] sm:text-xs text-blue-600 font-medium space-x-1.5 shrink-0">
                  <a href="https://github.com/OxDurgeshxO/MarketMatch-AI" target="_blank" rel="noopener noreferrer" className="hover:underline">GitHub</a>
                  <span>•</span>
                  <a href="https://oxdurgeshxo-marketmatch-ai-app-y8ysbm.streamlit.app/" target="_blank" rel="noopener noreferrer" className="hover:underline">Live Demo</a>
                </div>
              </div>
              <div className="text-[11px] sm:text-[11.5px] text-slate-700 font-medium">
                <span className="font-semibold text-slate-900">Tech Stack:</span> {highlightBulletText("Python 3.11 • Scikit-Learn • Streamlit • Plotly 3D • Pandas & NumPy • Joblib")}
              </div>
              <ul className="list-disc ml-4 space-y-0.5 text-xs sm:text-[11.5px] text-slate-800 leading-tight mt-0.5">
                <li>{highlightBulletText("Developed unsupervised machine learning pipeline clustering 4,300+ e-commerce transaction records using RFM (Recency, Frequency, Monetary) feature extraction.")}</li>
                <li>{highlightBulletText("Benchmarked K-Means clustering (Silhouette Score: 0.64, K=5) against DBSCAN for anomaly suppression; visualized high-dimensional clusters with interactive 3D Plotly projections.")}</li>
              </ul>
            </div>

            {/* Project 4: Fashion-MNIST CNN */}
            <div className="project-item avoid-break">
              <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-0.5">
                <h3 className="font-bold text-xs sm:text-[12.5px] text-slate-950">
                  Fashion-MNIST Classifier <span className="font-medium text-slate-600">— Deep Learning CNN Streamlit App</span>
                </h3>
                <div className="text-[11px] sm:text-xs text-blue-600 font-medium space-x-1.5 shrink-0">
                  <a href="https://github.com/OxDurgeshxO/CNN-STREAMLIT" target="_blank" rel="noopener noreferrer" className="hover:underline">GitHub</a>
                  <span>•</span>
                  <a href="https://cnn-app-dmfd7b76fxyrnvrhzpkgay.streamlit.app/" target="_blank" rel="noopener noreferrer" className="hover:underline">Live Demo</a>
                </div>
              </div>
              <div className="text-[11px] sm:text-[11.5px] text-slate-700 font-medium">
                <span className="font-semibold text-slate-900">Tech Stack:</span> {highlightBulletText("PyTorch • Python • Streamlit • Computer Vision • NumPy")}
              </div>
              <ul className="list-disc ml-4 space-y-0.5 text-xs sm:text-[11.5px] text-slate-800 leading-tight mt-0.5">
                <li>{highlightBulletText("Trained custom multi-layer CNN in PyTorch on 70,000 Fashion-MNIST images, achieving 91.4% test accuracy with Batch Normalization and 0.25 Dropout regularization.")}</li>
                <li>{highlightBulletText("Deployed live inference dashboard in Streamlit providing sub-50ms inference latency, real-time image uploads, and softmax class probability distributions.")}</li>
              </ul>
            </div>
          </div>
        </ResumeSection>

        {/* Two-Column Bottom Row: Education & Certifications */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 avoid-break">
          {/* Education */}
          <ResumeSection title="Education" className="mb-0">
            <div className="space-y-1.5">
              {EDUCATION.map((edu) => (
                <div key={edu.degree} className="text-xs sm:text-[11.5px] leading-tight">
                  <div className="flex items-baseline justify-between gap-1">
                    <h3 className="font-bold text-slate-950">{edu.degree}</h3>
                    <span className="text-[11px] font-medium text-slate-700 shrink-0">{edu.period}</span>
                  </div>
                  <div className="text-slate-700 font-medium">{edu.institution}</div>
                  <div className="text-[11px] text-slate-600">{edu.grade}</div>
                </div>
              ))}
            </div>
          </ResumeSection>

          {/* Credentials & Certifications */}
          <ResumeSection title="Certifications & Honors" className="mb-0">
            <ul className="list-disc ml-4 space-y-1 text-xs sm:text-[11.5px] text-slate-800 leading-tight">
              {CERTIFICATIONS.map((cert) => (
                <li key={cert.name}>
                  <strong className="font-semibold text-slate-950">{cert.name}</strong>
                  <div className="text-[11px] text-slate-600">{cert.issuer}</div>
                </li>
              ))}
            </ul>
          </ResumeSection>
        </div>
      </article>
    </div>
  );
}
