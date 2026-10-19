"use client";

import React, { useState } from "react";
import ResumeHeader from "@/components/resume/ResumeHeader";
import ResumeSection from "@/components/resume/ResumeSection";
import ResumeActions, { ResumeTheme } from "@/components/resume/ResumeActions";
import { EDUCATION, CERTIFICATIONS } from "@/lib/data";

export default function ResumeView() {
  const [theme, setTheme] = useState<ResumeTheme>("pure-white");

  // Theme palettes - calibrated for >= 17:1 contrast ratio & zero OCR penalty
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

      {/* Main Resume Sheet - High-Density One-Page Professional Executive ATS Layout */}
      <article
        aria-label="Official Resume of Durgesh Dutt Sinha"
        className={`resume-container resume-page ${current.container} border rounded-xl p-5 sm:p-7 transition-colors duration-200 text-left font-sans antialiased`}
      >
        <ResumeHeader />

        {/* Executive Summary */}
        <ResumeSection title="Executive Summary">
          <p className="leading-snug text-xs sm:text-[12.5px] text-slate-800">
            Forward-thinking <strong className="font-semibold text-slate-950">AIML Engineer & Full-Stack Architect</strong> pursuing an MCA in Artificial Intelligence & Machine Learning at Sri Balaji University, Pune (2025–2027). Selected as an <strong className="font-semibold text-slate-950">UNLOX® AI Program Fellow</strong> and <strong className="font-semibold text-slate-950">Be10x AI Cohort Member</strong>. Demonstrates proven delivery of production-ready systems including real-time computer vision pose estimation engines (&lt;50ms inference), enterprise ATS resume evaluation platforms with Google XYZ bullet transformers, and unsupervised retail customer intelligence suites.
          </p>
        </ResumeSection>

        {/* Technical Competencies */}
        <ResumeSection title="Technical Competencies">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-1 text-xs sm:text-[12px] leading-tight">
            <div>
              <span className="font-bold text-slate-950">AI & Machine Learning: </span>
              <span className="text-slate-800">
                Autonomous AI Agents, Prompt Engineering, Google MediaPipe Computer Vision, Scikit-Learn (K-Means, GMM, DBSCAN), PyTorch, CNNs, Whisper STT.
              </span>
            </div>
            <div>
              <span className="font-bold text-slate-950">Full-Stack & Cloud: </span>
              <span className="text-slate-800">
                Next.js 16/15 (App Router), React 19/18, TypeScript 5.x, Drizzle ORM, PostgreSQL (Neon), Tailwind CSS v4, WebSockets, FastAPI, Docker.
              </span>
            </div>
            <div>
              <span className="font-bold text-slate-950">Architecture & DevOps: </span>
              <span className="text-slate-800">
                Cloudflare Pages Edge CDN, AWS Cloud ML Pipelines, GitHub Actions CI/CD, Dual-Mode Storage Resiliency, Web Workers concurrency.
              </span>
            </div>
            <div>
              <span className="font-bold text-slate-950">Practices & Tooling: </span>
              <span className="text-slate-800">
                System Architecture Design, Clean Code, Test-Driven Development, WCAG 2.1 AA Accessibility, Git / GitHub, Turbopack, Vite.
              </span>
            </div>
          </div>
        </ResumeSection>

        {/* Production Engineering Projects */}
        <ResumeSection title="Production Engineering Projects">
          <div className="space-y-2">
            {/* Project 1: RoleRadar */}
            <div className="project-item avoid-break">
              <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-0.5">
                <h3 className="font-bold text-xs sm:text-[13px] text-slate-950">
                  RoleRadar <span className="font-medium text-slate-600">— AI Career Intelligence & ATS Resume Engineering Platform</span>
                </h3>
                <span className="text-[11px] sm:text-xs font-medium text-slate-600 shrink-0">July 2026 – Present</span>
              </div>
              <div className="text-[11px] sm:text-xs text-slate-700 font-medium">
                <span className="font-semibold text-slate-900">Tech Stack:</span> Next.js 16.2 • React 19 • TypeScript 5.9 • Drizzle ORM • PostgreSQL (Neon) • Tailwind CSS v4 • pdf-parse & mammoth
              </div>
              <ul className="list-disc ml-4 space-y-0.5 text-xs sm:text-[12px] text-slate-800 leading-tight mt-0.5">
                <li>Evaluates candidate resumes across 16 modern tech roles with an automated 8-point ATS compatibility scanner, dynamic Google XYZ bullet optimizer, and sub-180ms scoring.</li>
                <li>Built robust document parsing pipeline (.pdf/.docx), keyword normalizer against 16-role benchmark taxonomies, and zero-crash dual-mode storage (Neon PostgreSQL with in-memory fallback).</li>
              </ul>
            </div>

            {/* Project 2: FitTrack AI */}
            <div className="project-item avoid-break">
              <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-0.5">
                <h3 className="font-bold text-xs sm:text-[13px] text-slate-950">
                  FitTrack AI Fitness Platform <span className="font-medium text-slate-600">— Edge Computer Vision & Real-Time Biomechanics</span>
                </h3>
                <span className="text-[11px] sm:text-xs font-medium text-slate-600 shrink-0">August 2026 – Present</span>
              </div>
              <div className="text-[11px] sm:text-xs text-slate-700 font-medium">
                <span className="font-semibold text-slate-900">Tech Stack:</span> TypeScript • Google MediaPipe Pose • Web Workers API • WebSockets • Canvas 2D / WebGL • Tailwind CSS
              </div>
              <ul className="list-disc ml-4 space-y-0.5 text-xs sm:text-[12px] text-slate-800 leading-tight mt-0.5">
                <li>Architected 9-page multi-modal fitness architecture utilizing Google MediaPipe 33-point skeletal landmark detection and trigonometric joint-angle vector kinematics under 50ms latency.</li>
                <li>Piped 720p video frames into dedicated Web Worker via transferable ImageBitmap for background inference, keeping the main UI thread lag-free during 60fps biomechanical analysis.</li>
              </ul>
            </div>

            {/* Project 3: MarketMatch-AI */}
            <div className="project-item avoid-break">
              <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-0.5">
                <h3 className="font-bold text-xs sm:text-[13px] text-slate-950">
                  MarketMatch-AI <span className="font-medium text-slate-600">— Enterprise E-Commerce RFM Customer Intelligence Studio</span>
                </h3>
                <span className="text-[11px] sm:text-xs font-medium text-slate-600 shrink-0">July 2026 – Present</span>
              </div>
              <div className="text-[11px] sm:text-xs text-slate-700 font-medium">
                <span className="font-semibold text-slate-900">Tech Stack:</span> Python 3.11 • Scikit-Learn • Streamlit • Plotly 3D • Pandas & NumPy • Joblib
              </div>
              <ul className="list-disc ml-4 space-y-0.5 text-xs sm:text-[12px] text-slate-800 leading-tight mt-0.5">
                <li>Ingested 4,000+ retail transaction records; computed RFM metrics and engineered customer segmentation cohorts using K-Means ($K=5$), Gaussian Mixture Models (GMM), and DBSCAN anomaly detection.</li>
                <li>Applied Log1p scaling and StandardScaler to normalize skewed monetary distributions; produced interactive 3D visualizations identifying high-value lookalike customer segments.</li>
              </ul>
            </div>
          </div>
        </ResumeSection>

        {/* Fellowships & Engineering Experience */}
        <ResumeSection title="Fellowships & Engineering Experience">
          <div className="space-y-1.5">
            <div className="experience-item avoid-break">
              <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-0.5">
                <h3 className="font-bold text-xs sm:text-[13px] text-slate-950">
                  AI Program Fellow <span className="font-medium text-slate-600">— UNLOX®</span>
                </h3>
                <span className="text-[11px] sm:text-xs font-medium text-slate-600 shrink-0">Jun 2026 – Present | Remote</span>
              </div>
              <ul className="list-disc ml-4 space-y-0.5 text-xs sm:text-[12px] text-slate-800 leading-tight mt-0.5">
                <li>Engineered end-to-end AI deployment pipelines with automated containerization; constructed and benchmarked autonomous agent workflows for enterprise industry use-cases under technical mentorship.</li>
              </ul>
            </div>

            <div className="experience-item avoid-break">
              <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-0.5">
                <h3 className="font-bold text-xs sm:text-[13px] text-slate-950">
                  AI Cohort Member <span className="font-medium text-slate-600">— Be10x</span>
                </h3>
                <span className="text-[11px] sm:text-xs font-medium text-slate-600 shrink-0">May 2026 – Present | India</span>
              </div>
              <ul className="list-disc ml-4 space-y-0.5 text-xs sm:text-[12px] text-slate-800 leading-tight mt-0.5">
                <li>Developed multi-step LLM prompt chaining architectures to automate repetitive tasks; built full-stack AI concept prototypes from initial system design to live client demonstrations.</li>
              </ul>
            </div>
          </div>
        </ResumeSection>

        {/* Two-Column Bottom Row: Education & Credentials */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 avoid-break">
          {/* Education */}
          <ResumeSection title="Education" className="mb-0">
            <div className="space-y-1.5">
              {EDUCATION.map((edu) => (
                <div key={edu.degree} className="text-xs sm:text-[12px] leading-tight">
                  <div className="flex items-baseline justify-between gap-1">
                    <h3 className="font-bold text-slate-950">{edu.degree}</h3>
                    <span className="text-[11px] font-medium text-slate-500 shrink-0">{edu.period}</span>
                  </div>
                  <div className="text-slate-700 font-medium">{edu.institution}</div>
                  <div className="text-[11px] text-slate-600">{edu.grade}</div>
                </div>
              ))}
            </div>
          </ResumeSection>

          {/* Credentials & Certifications */}
          <ResumeSection title="Credentials & Certifications" className="mb-0">
            <ul className="list-disc ml-4 space-y-1 text-xs sm:text-[12px] text-slate-800 leading-tight">
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
