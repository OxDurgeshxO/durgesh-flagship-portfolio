"use client";

import React, { useState } from "react";
import ResumeHeader from "@/components/resume/ResumeHeader";
import ResumeSection from "@/components/resume/ResumeSection";
import ResumeActions, { ResumeTheme } from "@/components/resume/ResumeActions";
import { EDUCATION, CERTIFICATIONS } from "@/lib/data";

export default function ResumeView() {
  const [theme, setTheme] = useState<ResumeTheme>("pure-white");

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

      {/* Main Resume Sheet - Real Developer Data & ATS-Optimized 1-Page Format */}
      <article
        aria-label="Official Resume of Durgesh Dutt Sinha"
        className={`resume-container resume-page ${current.container} border rounded-xl p-5 sm:p-7 transition-colors duration-200 text-left font-sans antialiased`}
      >
        <ResumeHeader />

        {/* Professional Summary */}
        <ResumeSection title="Professional Summary">
          <p className="leading-snug text-xs sm:text-[12px] text-slate-800">
            Results-driven <strong className="font-semibold text-slate-950">AI/ML Engineer & Full-Stack Developer</strong> with practical experience building and deploying intelligent web applications, computer vision tools, and machine learning pipelines. Creator of open-source projects including real-time multimodal voice assistants, e-commerce customer segmentation systems, and deep learning image classifiers. Proficient in Python, TypeScript, React, Next.js, FastAPI, and PyTorch, with a track record of delivering clean architectures from concept to live production.
          </p>
        </ResumeSection>

        {/* Technical Skills */}
        <ResumeSection title="Technical Skills">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-1 text-xs sm:text-[11.5px] leading-tight">
            <div>
              <span className="font-bold text-slate-950">Languages: </span>
              <span className="text-slate-800">Python, TypeScript, JavaScript, SQL, HTML5, CSS3, C/C++</span>
            </div>
            <div>
              <span className="font-bold text-slate-950">AI & Machine Learning: </span>
              <span className="text-slate-800">PyTorch, Scikit-Learn, Computer Vision (MediaPipe, CNN), Whisper STT, Gemini API, Pandas, NumPy, K-Means, DBSCAN</span>
            </div>
            <div>
              <span className="font-bold text-slate-950">Full-Stack & Backend: </span>
              <span className="text-slate-800">Next.js, React, FastAPI, Streamlit, WebSockets, Node.js, RESTful APIs, Tailwind CSS</span>
            </div>
            <div>
              <span className="font-bold text-slate-950">Cloud, Database & Tools: </span>
              <span className="text-slate-800">PostgreSQL (Neon), Drizzle ORM, Docker, Cloudflare Pages, Git & GitHub, AWS Educate</span>
            </div>
          </div>
        </ResumeSection>

        {/* Featured Engineering Projects */}
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
                <span className="font-semibold text-slate-900">Tech Stack:</span> FastAPI • Python • WebSockets • React • TypeScript • Whisper STT • Gemini 2.0 Flash • Edge-TTS
              </div>
              <ul className="list-disc ml-4 space-y-0.5 text-xs sm:text-[11.5px] text-slate-800 leading-tight mt-0.5">
                <li>Engineered a full-duplex voice assistant streaming 16kHz audio over bi-directional WebSockets between React and FastAPI backend.</li>
                <li>Integrated Voice Activity Detection (VAD) with Whisper STT and Gemini 2.0 Flash streaming API, paired with Edge-TTS for low-latency voice playback.</li>
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
                <span className="font-semibold text-slate-900">Tech Stack:</span> Next.js • React • TypeScript • Drizzle ORM • PostgreSQL (Neon) • Tailwind CSS • pdf-parse
              </div>
              <ul className="list-disc ml-4 space-y-0.5 text-xs sm:text-[11.5px] text-slate-800 leading-tight mt-0.5">
                <li>Developed full-stack platform parsing candidate resumes (.pdf/.docx) to evaluate alignment against 16 canonical tech role benchmarks.</li>
                <li>Implemented ATS compatibility scoring, keyword density extraction, and structured recommendations with Drizzle ORM persistence.</li>
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
                <span className="font-semibold text-slate-900">Tech Stack:</span> Python 3.11 • Scikit-Learn • Streamlit • Plotly 3D • Pandas & NumPy • Joblib
              </div>
              <ul className="list-disc ml-4 space-y-0.5 text-xs sm:text-[11.5px] text-slate-800 leading-tight mt-0.5">
                <li>Built an end-to-end unsupervised ML pipeline processing 4,000+ retail records using RFM (Recency, Frequency, Monetary) feature extraction.</li>
                <li>Applied K-Means (K=5) and DBSCAN anomaly detection with log-scaling; built an interactive Streamlit UI with 3D Plotly visual projections.</li>
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
                <span className="font-semibold text-slate-900">Tech Stack:</span> PyTorch • Python • Streamlit • Computer Vision • NumPy
              </div>
              <ul className="list-disc ml-4 space-y-0.5 text-xs sm:text-[11.5px] text-slate-800 leading-tight mt-0.5">
                <li>Trained a custom multi-layer CNN in PyTorch on Fashion-MNIST dataset, achieving ~91.4% test accuracy with dropout regularization.</li>
                <li>Deployed an interactive Streamlit web app enabling users to upload clothing images and receive real-time classification predictions.</li>
              </ul>
            </div>
          </div>
        </ResumeSection>

        {/* Experience & Fellowships */}
        <ResumeSection title="Experience & Fellowships">
          <div className="space-y-1.5">
            <div className="experience-item avoid-break">
              <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-0.5">
                <h3 className="font-bold text-xs sm:text-[12.5px] text-slate-950">
                  AI Program Fellow <span className="font-medium text-slate-600">— UNLOX®</span>
                </h3>
                <span className="text-[11px] sm:text-xs font-medium text-slate-600 shrink-0">Remote</span>
              </div>
              <ul className="list-disc ml-4 space-y-0.5 text-xs sm:text-[11.5px] text-slate-800 leading-tight mt-0.5">
                <li>Constructed and tested containerized AI deployment pipelines; evaluated autonomous agent workflows and machine learning models under technical mentorship.</li>
              </ul>
            </div>

            <div className="experience-item avoid-break">
              <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-0.5">
                <h3 className="font-bold text-xs sm:text-[12.5px] text-slate-950">
                  AI Cohort Member <span className="font-medium text-slate-600">— Be10x</span>
                </h3>
                <span className="text-[11px] sm:text-xs font-medium text-slate-600 shrink-0">India</span>
              </div>
              <ul className="list-disc ml-4 space-y-0.5 text-xs sm:text-[11.5px] text-slate-800 leading-tight mt-0.5">
                <li>Built prompt-chaining architectures and full-stack AI concept prototypes, demonstrating practical AI productivity automations.</li>
              </ul>
            </div>

            <div className="experience-item avoid-break">
              <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-0.5">
                <h3 className="font-bold text-xs sm:text-[12.5px] text-slate-950">
                  Web Development Intern <span className="font-medium text-slate-600">— InAmigos Foundation (IAF)</span>
                </h3>
                <span className="text-[11px] sm:text-xs font-medium text-slate-600 shrink-0">Remote</span>
              </div>
              <ul className="list-disc ml-4 space-y-0.5 text-xs sm:text-[11.5px] text-slate-800 leading-tight mt-0.5">
                <li>Developed and maintained responsive web pages and components for non-profit social initiatives, ensuring mobile responsiveness and accessibility.</li>
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
                    <span className="text-[11px] font-medium text-slate-500 shrink-0">{edu.period}</span>
                  </div>
                  <div className="text-slate-700 font-medium">{edu.institution}</div>
                  <div className="text-[11px] text-slate-600">{edu.grade}</div>
                </div>
              ))}
            </div>
          </ResumeSection>

          {/* Credentials & Certifications */}
          <ResumeSection title="Certifications & Community" className="mb-0">
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
