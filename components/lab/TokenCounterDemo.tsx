"use client";

import { copyToClipboard } from "@/lib/clipboard";

import React, { useState, useMemo } from "react";
import { Cpu, Sparkles, Hash, Layers, ShieldCheck, DollarSign, RefreshCw, Copy, Check } from "lucide-react";

const SAMPLE_PROMPTS = {
  system: `You are an expert AI software architect assisting in production Next.js 14 applications. You reason through state machines, edge rate-limits, and WCAG AA contrast guidelines before producing code.`,
  code: `export async function handleInference(prompt: string, maxTokens = 1024): Promise<{ tokens: number; latencyMs: number }> {
  const start = performance.now();
  const res = await fetch("/api/v1/generate", { method: "POST", body: JSON.stringify({ prompt }) });
  return { tokens: 42, latencyMs: performance.now() - start };
}`,
  rag: `Document chunk [ID: 8492]: Retrieval-Augmented Generation bridges pre-trained parametric memory with dynamic external vector indices, mitigating hallucination via dense embeddings and cross-attention reranking.`,
};

// Byte-pair-like subword heuristic tokenizer
function tokenizeText(text: string): string[] {
  if (!text) return [];
  // Tokenize words, digits, punctuation, and whitespaces
  const regex = /\s+|[A-Z]?[a-z]+|[A-Z]+(?=[A-Z][a-z]|\b)|\d+|[^\s\w]/g;
  const tokens: string[] = [];
  let match;
  while ((match = regex.exec(text)) !== null) {
    tokens.push(match[0]);
  }
  return tokens;
}

const TOKEN_COLORS = [
  "bg-purple-500/20 text-purple-200 border-purple-500/40 hover:bg-purple-500/30",
  "bg-rose-500/20 text-rose-200 border-rose-500/40 hover:bg-rose-500/30",
  "bg-sky-500/20 text-sky-200 border-sky-500/40 hover:bg-sky-500/30",
  "bg-emerald-500/20 text-emerald-200 border-emerald-500/40 hover:bg-emerald-500/30",
  "bg-amber-500/20 text-amber-200 border-amber-500/40 hover:bg-amber-500/30",
];

export default function TokenCounterDemo() {
  const [inputText, setInputText] = useState(SAMPLE_PROMPTS.system);
  const [copied, setCopied] = useState(false);

  const tokens = useMemo(() => tokenizeText(inputText), [inputText]);
  const charCount = inputText.length;
  const tokenCount = tokens.length;
  const ratio = tokenCount > 0 ? (charCount / tokenCount).toFixed(2) : "0";

  // Cost estimates per 1M tokens
  const costGpt4o = ((tokenCount / 1_000_000) * 5.0).toFixed(6);
  const costClaude35 = ((tokenCount / 1_000_000) * 3.0).toFixed(6);
  const costGeminiFlash = ((tokenCount / 1_000_000) * 0.075).toFixed(6);

  const handleCopy = async () => {
    const ok = await copyToClipboard(inputText);
    if (ok) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="glass rounded-2xl p-6 md:p-8 border border-white/10 mb-8 bg-white/[0.02]">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6 border-b border-white/10 pb-4">
        <div>
          <h3 className="text-lg md:text-xl font-bold text-white tracking-tight flex items-center gap-2">
            <Hash className="size-5 text-purple-400" />
            <span>Interactive Subword BPE Tokenizer &amp; Cost Estimator</span>
          </h3>
          <p className="text-xs text-slate-400">
            Visualizes LLM token boundaries, byte-pair segmentation, and per-model pricing in real-time
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={() => setInputText(SAMPLE_PROMPTS.system)}
            className="text-[11px] font-mono px-2.5 py-1 rounded-lg border border-purple-500/30 bg-purple-500/10 text-purple-300 hover:bg-purple-500/20 transition-all cursor-pointer"
          >
            System Prompt
          </button>
          <button
            type="button"
            onClick={() => setInputText(SAMPLE_PROMPTS.code)}
            className="text-[11px] font-mono px-2.5 py-1 rounded-lg border border-blue-500/30 bg-blue-500/10 text-blue-300 hover:bg-blue-500/20 transition-all cursor-pointer"
          >
            TypeScript Code
          </button>
          <button
            type="button"
            onClick={() => setInputText(SAMPLE_PROMPTS.rag)}
            className="text-[11px] font-mono px-2.5 py-1 rounded-lg border border-emerald-500/30 bg-emerald-500/10 text-emerald-300 hover:bg-emerald-500/20 transition-all cursor-pointer"
          >
            RAG Chunk
          </button>
        </div>
      </div>

      {/* Real-Time Metrics Bar */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
        <div className="p-3.5 rounded-xl bg-white/5 border border-white/5">
          <div className="text-[10px] font-mono uppercase text-slate-400">Total Tokens</div>
          <div className="text-xl font-bold text-purple-400">{tokenCount}</div>
        </div>
        <div className="p-3.5 rounded-xl bg-white/5 border border-white/5">
          <div className="text-[10px] font-mono uppercase text-slate-400">Characters</div>
          <div className="text-xl font-bold text-white">{charCount}</div>
        </div>
        <div className="p-3.5 rounded-xl bg-white/5 border border-white/5">
          <div className="text-[10px] font-mono uppercase text-slate-400">Chars / Token</div>
          <div className="text-xl font-bold text-sky-400">{ratio}</div>
        </div>
        <div className="p-3.5 rounded-xl bg-white/5 border border-white/5">
          <div className="text-[10px] font-mono uppercase text-slate-400">Gemini Flash Est.</div>
          <div className="text-xl font-bold text-emerald-400">${costGeminiFlash}</div>
        </div>
      </div>

      {/* Input Textarea */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <label htmlFor="token-input" className="text-xs font-mono uppercase text-slate-400">
            Input Prompt / Text
          </label>
          <button
            type="button"
            onClick={handleCopy}
            className="text-xs text-slate-400 hover:text-white flex items-center gap-1 transition-colors cursor-pointer"
          >
            {copied ? <Check className="size-3 text-emerald-400" /> : <Copy className="size-3" />}
            <span>{copied ? "Copied" : "Copy Text"}</span>
          </button>
        </div>
        <textarea
          id="token-input"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          rows={4}
          className="w-full p-3.5 rounded-xl bg-slate-900/80 border border-white/10 text-white font-mono text-xs focus:outline-none focus:border-purple-500/50 transition-colors"
          placeholder="Type or paste text to tokenize in real-time..."
        />
      </div>

      {/* Token Visualization Grid */}
      <div className="mb-6">
        <div className="text-xs font-mono uppercase text-slate-400 mb-2 flex items-center justify-between">
          <span>Segmented Subword Tokens ({tokenCount})</span>
          <span className="text-[11px] text-slate-500 lowercase">hover token to inspect</span>
        </div>
        <div className="p-4 rounded-xl bg-slate-900/90 border border-white/10 max-h-64 overflow-y-auto flex flex-wrap gap-1.5 font-mono text-xs leading-relaxed">
          {tokens.map((tok, idx) => {
            const colorClass = TOKEN_COLORS[idx % TOKEN_COLORS.length];
            const isWhitespace = /^\s+$/.test(tok);
            return (
              <span
                key={idx}
                className={`px-1.5 py-0.5 rounded border text-xs transition-all ${colorClass}`}
                title={`Token #${idx + 1} | Length: ${tok.length} chars | Byte repr: ${encodeURIComponent(tok)}`}
              >
                {isWhitespace ? (tok === "\n" ? "\u21B5" : "\u2423".repeat(tok.length)) : tok}
              </span>
            );
          })}
          {tokens.length === 0 && (
            <span className="text-slate-500 italic">Enter text above to see tokens generated live.</span>
          )}
        </div>
      </div>

      {/* Pricing Comparison Matrix */}
      <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5 flex flex-wrap items-center justify-between gap-4 text-xs font-mono text-slate-300">
        <div className="flex items-center gap-2">
          <DollarSign className="size-4 text-emerald-400" />
          <span>Cost Estimates:</span>
        </div>
        <div>GPT-4o: <span className="text-purple-300 font-bold">${costGpt4o}</span></div>
        <div>Claude 3.5: <span className="text-sky-300 font-bold">${costClaude35}</span></div>
        <div>Gemini 1.5 Flash: <span className="text-emerald-300 font-bold">${costGeminiFlash}</span></div>
      </div>
    </div>
  );
}
