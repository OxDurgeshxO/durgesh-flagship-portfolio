"use client";

import React, { useState } from "react";
import { Mail, Github, Linkedin, Phone, ArrowUpRight, Copy, Check, Clock, Globe } from "lucide-react";
import { OWNER } from "@/lib/data";
import { copyToClipboard } from "@/lib/clipboard";

export default function RecruiterContact() {
  const [copiedField, setCopiedField] = useState<string | null>(null);

  const handleCopy = async (text: string, field: string) => {
    const ok = await copyToClipboard(text);
    if (ok) {
      setCopiedField(field);
      setTimeout(() => setCopiedField(null), 2200);
    }
  };

  return (
    <section className="glass rounded-2xl p-6 md:p-8 border border-white/10 bg-white/[0.02]">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <div>
          <h2 className="text-xl font-bold text-white tracking-tight mb-1.5">
            Initiate Interview or Connect Directly
          </h2>
          <p className="text-xs text-slate-400">
            Direct verified contact channels for technical recruiters and engineering leaders.
          </p>
        </div>

        {/* Timezone and Availability Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 text-xs font-mono">
          <Clock className="size-3.5" />
          <span>IST (UTC+5:30) &bull; US / EU Timezone Overlap</span>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 mb-4">
        {/* Email */}
        <div className="p-4 rounded-xl bg-white/5 border border-white/5 hover:border-purple-500/40 transition-all flex flex-col justify-between group">
          <div className="flex items-center justify-between text-purple-400 mb-3">
            <a href={`mailto:${OWNER.email}`} className="hover:opacity-80 transition-opacity" aria-label="Send email to Durgesh Dutt Sinha">
              <Mail className="size-5" />
            </a>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => handleCopy(OWNER.email, 'email')}
                className="p-1 rounded bg-white/5 hover:bg-purple-500/20 text-slate-400 hover:text-purple-300 transition-all cursor-pointer"
                title="Copy email address"
                aria-label="Copy email address"
              >
                {copiedField === 'email' ? <Check className="size-3.5 text-emerald-400" /> : <Copy className="size-3.5" />}
              </button>
              <a href={`mailto:${OWNER.email}`} aria-label="Open mail client">
                <ArrowUpRight className="size-3.5 text-slate-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </a>
            </div>
          </div>
          <div>
            <div className="text-[10px] font-mono uppercase text-slate-400">Email Address</div>
            <div className="text-xs font-semibold text-white truncate">{OWNER.email}</div>
          </div>
        </div>

        {/* LinkedIn */}
        <a
          href={OWNER.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="p-4 rounded-xl bg-white/5 hover:bg-white/10 border border-white/5 hover:border-blue-500/40 transition-all group flex flex-col justify-between"
        >
          <div className="flex items-center justify-between text-blue-400 mb-3">
            <Linkedin className="size-5" />
            <ArrowUpRight className="size-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </div>
          <div>
            <div className="text-[10px] font-mono uppercase text-slate-400">LinkedIn Profile</div>
            <div className="text-xs font-semibold text-white truncate">durgesh-dutt-s-4ba74924b</div>
          </div>
        </a>

        {/* GitHub */}
        <a
          href={OWNER.github}
          target="_blank"
          rel="noopener noreferrer"
          className="p-4 rounded-xl bg-white/5 hover:bg-white/10 border border-white/5 hover:border-purple-500/40 transition-all group flex flex-col justify-between"
        >
          <div className="flex items-center justify-between text-purple-300 mb-3">
            <Github className="size-5" />
            <ArrowUpRight className="size-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </div>
          <div>
            <div className="text-[10px] font-mono uppercase text-slate-400">GitHub Profile</div>
            <div className="text-xs font-semibold text-white truncate">@OxDurgeshxO</div>
          </div>
        </a>

        {/* Phone */}
        <div className="p-4 rounded-xl bg-white/5 border border-white/5 hover:border-emerald-500/40 transition-all flex flex-col justify-between group">
          <div className="flex items-center justify-between text-emerald-400 mb-3">
            {OWNER.phone ? (
              <a href={`tel:${OWNER.phone}`} className="hover:opacity-80 transition-opacity">
                <Phone className="size-5" />
              </a>
            ) : (
              <Phone className="size-5 text-slate-500" />
            )}
            <div className="flex items-center gap-2">
              {OWNER.phone && (
                <button
                  type="button"
                  onClick={() => handleCopy(OWNER.phone, 'phone')}
                  className="p-1 rounded bg-white/5 hover:bg-emerald-500/20 text-slate-400 hover:text-emerald-300 transition-all cursor-pointer"
                  title="Copy phone number"
                  aria-label="Copy phone number"
                >
                  {copiedField === 'phone' ? <Check className="size-3.5 text-emerald-400" /> : <Copy className="size-3.5" />}
                </button>
              )}
              {OWNER.phone && (
                <a href={`tel:${OWNER.phone}`} aria-label="Call direct phone">
                  <ArrowUpRight className="size-3.5 text-slate-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </a>
              )}
            </div>
          </div>
          <div>
            <div className="text-[10px] font-mono uppercase text-slate-400">Direct Phone</div>
            <div className="text-xs font-semibold text-white truncate">{OWNER.phone || "Available via Email Request"}</div>
          </div>
        </div>
      </div>
    </section>
  );
}
