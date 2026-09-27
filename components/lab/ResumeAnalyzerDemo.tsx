"use client";

import React, { useState } from "react";
import { Sparkles, ArrowRight, CheckCircle2, AlertCircle, RefreshCw, FileText } from "lucide-react";

const SAMPLE_RESUMES = {
  aiml: `AI Engineer with experience building deep learning computer vision models in PyTorch. Trained convolutional neural networks on medical imagery with 89% accuracy. Designed machine learning data preprocessing pipelines in Python. Deployed model inference APIs on AWS EC2.`,
  fullstack: `Full-Stack Developer building scalable web applications with Next.js, React, and TypeScript. Implemented relational database schemas using PostgreSQL and Drizzle ORM. Designed REST APIs and styled responsive UI interfaces using Tailwind CSS.`,
};

export default function ResumeAnalyzerDemo() {
  const [role, setRole] = useState("AIML Engineer");
  const [resumeText, setResumeText] = useState(SAMPLE_RESUMES.aiml);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const handleAnalyze = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/lab/resume", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: resumeText, role }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Analysis failed.");
      setResult(data);
    } catch (err: any) {
      setError(err.message || "Failed to analyze resume excerpt.");
    } finally {
      setLoading(false);
    }
  };

  const loadPreset = (type: "aiml" | "fullstack") => {
    if (type === "aiml") {
      setRole("AIML Engineer");
      setResumeText(SAMPLE_RESUMES.aiml);
    } else {
      setRole("Full-Stack Architect");
      setResumeText(SAMPLE_RESUMES.fullstack);
    }
  };

  return (
    <div className="glass rounded-2xl p-6 md:p-8 border border-border mb-8 bg-muted/60">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6 border-b border-border pb-4">
        <div>
          <h3 className="text-lg md:text-xl font-bold text-ink tracking-tight flex items-center gap-2">
            <FileText className="size-5 text-primary" />
            <span>Interactive Resume & ATS Intelligence Demo</span>
          </h3>
          <p className="text-xs text-muted-foreground">
            Simulates RoleRadar&apos;s 8-point parser, skill gap extractor, and Google XYZ transformer
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => loadPreset("aiml")}
            className="text-[11px] font-mono px-2.5 py-1 rounded-lg border border-primary/40 bg-primary/10 text-primary hover:bg-primary/10 transition-all cursor-pointer"
          >
            Load AI Sample
          </button>
          <button
            onClick={() => loadPreset("fullstack")}
            className="text-[11px] font-mono px-2.5 py-1 rounded-lg border border-[var(--accent-signal-border)] bg-[var(--accent-signal-bg)] text-[var(--accent-signal)] hover:bg-blue-500/20 transition-all cursor-pointer"
          >
            Load Web Sample
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Input Column */}
        <div>
          <div className="mb-3">
            <label htmlFor="resume-analyzer-role" className="block text-xs font-mono text-muted-foreground mb-1">
              Target Technical Benchmark:
            </label>
            <select
              id="resume-analyzer-role"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full text-xs font-mono bg-[var(--overlay-scrim)] border border-border rounded-xl px-3 py-2 text-ink focus:outline-none focus:border-purple-500"
            >
              <option value="AIML Engineer">AIML Engineer (Deep Learning, PyTorch, MLOps)</option>
              <option value="Full-Stack Architect">Full-Stack Architect (Next.js, React, Postgres)</option>
              <option value="GenAI / LLM Engineer">GenAI / LLM Engineer (Agents, RAG, Prompting)</option>
            </select>
          </div>

          <div className="mb-4">
            <label htmlFor="resume-analyzer-text" className="block text-xs font-mono text-muted-foreground mb-1">
              Resume Excerpt / Experience Bullets:
            </label>
            <textarea
              id="resume-analyzer-text"
              value={resumeText}
              onChange={(e) => setResumeText(e.target.value)}
              rows={6}
              className="w-full text-xs font-mono bg-[var(--overlay-scrim)] border border-border rounded-xl p-3 text-ink focus:outline-none focus:border-purple-500 leading-relaxed resize-none"
              placeholder="Paste 1-2 work experience paragraphs or bullet points..."
            />
          </div>

          {error && (
            <div className="p-3 rounded-lg bg-secondary/10 border border-rose-500/20 text-secondary text-xs mb-4 flex items-center gap-2">
              <AlertCircle className="size-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <button
            onClick={handleAnalyze}
            disabled={loading}
            className="w-full py-2.5 rounded-xl bg-gradient-to-r from-[var(--gradient-start)] to-[var(--gradient-end)] hover:from-[var(--gradient-start)] hover:to-rose-400 text-white font-semibold text-xs md:text-sm flex items-center justify-center gap-2 shadow-lg shadow-black/20 transition-all cursor-pointer disabled:opacity-50"
          >
            {loading ? <RefreshCw className="size-4 animate-spin" /> : <Sparkles className="size-4" />}
            <span>{loading ? "Evaluating ATS Vectors..." : "Analyze Resume Match"}</span>
          </button>
        </div>

        {/* Right Output Results Column */}
        <div className="rounded-xl bg-black/40 border border-border/60 p-5 flex flex-col justify-between">
          {result ? (
            <div className="space-y-4 text-xs">
              <div className="flex items-center justify-between border-b border-border pb-3">
                <div>
                  <span className="text-[10px] font-mono uppercase text-muted-foreground">ATS Match Readiness</span>
                  <div className="text-2xl font-black text-ink flex items-center gap-2">
                    <span className="text-primary">{result.atsScore}%</span>
                    <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-primary/10 text-primary border border-primary/40">
                      {result.rating}
                    </span>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-[10px] font-mono uppercase text-muted-foreground">Metric Density</span>
                  <div className="text-sm font-bold text-ink">{result.metricDensityScore}% Quantified</div>
                </div>
              </div>

              {/* Skills Extracted */}
              <div>
                <div className="text-[10px] font-mono uppercase text-[var(--accent-lab)] mb-1.5 flex items-center gap-1">
                  <CheckCircle2 className="size-3" /> Extracted Match Skills
                </div>
                <div className="flex flex-wrap gap-1">
                  {result.extractedSkills.map((s: string) => (
                    <span key={s} className="px-2 py-0.5 rounded bg-[var(--accent-lab-bg)] text-[var(--accent-lab)] border border-emerald-500/20 font-mono text-[10px]">
                      {s}
                    </span>
                  ))}
                </div>
              </div>

              {/* Missing Skills */}
              {result.missingKeywords.length > 0 && (
                <div>
                  <div className="text-[10px] font-mono uppercase text-secondary mb-1.5 flex items-center gap-1">
                    <AlertCircle className="size-3" /> Target Role Skill Gaps
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {result.missingKeywords.map((s: string) => (
                      <span key={s} className="px-2 py-0.5 rounded bg-secondary/10 text-secondary border border-rose-500/20 font-mono text-[10px]">
                        + {s}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Google XYZ Formula Transformation */}
              <div className="p-3.5 rounded-xl bg-purple-950/30 border border-primary/40">
                <div className="text-[10px] font-mono uppercase text-primary font-bold mb-1 flex items-center gap-1.5">
                  <Sparkles className="size-3" /> Google XYZ Formula Restructuring
                </div>
                <p className="text-[11px] text-purple-100 leading-relaxed font-mono">
                  &ldquo;{result.bulletAudit.suggestedRewrite}&rdquo;
                </p>
              </div>

              <div className="text-[10px] font-mono text-muted-foreground border-t border-border/60 pt-2">
                {result.engine || "Deterministic Rule Engine (Demonstration)"}
              </div>
            </div>
          ) : (
            <div className="h-full flex flex-col items-center justify-center text-center p-6 text-muted-foreground">
              <Sparkles className="size-8 text-purple-500/40 mb-2" />
              <p className="text-xs font-mono">Click &quot;Analyze Resume Match&quot; to test the deterministic ATS and Google XYZ rewrite pipeline.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
