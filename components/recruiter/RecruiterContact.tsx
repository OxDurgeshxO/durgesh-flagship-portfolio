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
    <section className="glass rounded-2xl p-6 md:p-8 border border-border bg-muted/60">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <div>
          <h2 className="text-xl font-bold text-ink tracking-tight mb-1.5">
            Initiate Interview or Connect Directly
          </h2>
          <p className="text-xs text-muted-foreground">
            Direct verified contact channels for technical recruiters and engineering leaders.
          </p>
        </div>

        {/* Timezone and Availability Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[var(--accent-lab-bg)] border border-emerald-500/20 text-[var(--accent-lab)] text-xs font-mono">
          <Clock className="size-3.5" />
          <span>IST (UTC+5:30) &bull; US / EU Timezone Overlap</span>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 mb-4">
        {/* Email */}
        <div className="p-4 rounded-xl bg-muted border border-border/60 hover:border-primary/40 transition-all flex flex-col justify-between group">
          <div className="flex items-center justify-between text-primary mb-3">
            <a href={`mailto:${OWNER.email}`} className="hover:opacity-80 transition-opacity" aria-label="Send email to Durgesh Dutt Sinha">
              <Mail className="size-5" />
            </a>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => handleCopy(OWNER.email, 'email')}
                className="p-1 rounded bg-muted hover:bg-primary/10 text-muted-foreground hover:text-primary transition-all cursor-pointer"
                title="Copy email address"
                aria-label="Copy email address"
              >
                {copiedField === 'email' ? <Check className="size-3.5 text-[var(--accent-lab)]" /> : <Copy className="size-3.5" />}
              </button>
              <a href={`mailto:${OWNER.email}`} aria-label="Open mail client">
                <ArrowUpRight className="size-3.5 text-muted-foreground group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </a>
            </div>
          </div>
          <div>
            <div className="text-[10px] font-mono uppercase text-muted-foreground">Email Address</div>
            <div className="text-xs font-semibold text-ink truncate">{OWNER.email}</div>
          </div>
        </div>

        {/* LinkedIn */}
        <a
          href={OWNER.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="p-4 rounded-xl bg-muted hover:bg-accent border border-border/60 hover:border-[var(--accent-signal-border)] transition-all group flex flex-col justify-between"
        >
          <div className="flex items-center justify-between text-[var(--accent-signal)] mb-3">
            <Linkedin className="size-5" />
            <ArrowUpRight className="size-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </div>
          <div>
            <div className="text-[10px] font-mono uppercase text-muted-foreground">LinkedIn Profile</div>
            <div className="text-xs font-semibold text-ink truncate">durgesh-dutt-s-4ba74924b</div>
          </div>
        </a>

        {/* GitHub */}
        <a
          href={OWNER.github}
          target="_blank"
          rel="noopener noreferrer"
          className="p-4 rounded-xl bg-muted hover:bg-accent border border-border/60 hover:border-primary/40 transition-all group flex flex-col justify-between"
        >
          <div className="flex items-center justify-between text-primary mb-3">
            <Github className="size-5" />
            <ArrowUpRight className="size-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </div>
          <div>
            <div className="text-[10px] font-mono uppercase text-muted-foreground">GitHub Profile</div>
            <div className="text-xs font-semibold text-ink truncate">@OxDurgeshxO</div>
          </div>
        </a>

        {/* Phone */}
        <div className="p-4 rounded-xl bg-muted border border-border/60 hover:border-[var(--accent-lab-border)] transition-all flex flex-col justify-between group">
          <div className="flex items-center justify-between text-[var(--accent-lab)] mb-3">
            {OWNER.phone ? (
              <a href={`tel:${OWNER.phone}`} className="hover:opacity-80 transition-opacity">
                <Phone className="size-5" />
              </a>
            ) : (
              <Phone className="size-5 text-muted-foreground" />
            )}
            <div className="flex items-center gap-2">
              {OWNER.phone && (
                <button
                  type="button"
                  onClick={() => handleCopy(OWNER.phone, 'phone')}
                  className="p-1 rounded bg-muted hover:bg-emerald-500/20 text-muted-foreground hover:text-[var(--accent-lab)] transition-all cursor-pointer"
                  title="Copy phone number"
                  aria-label="Copy phone number"
                >
                  {copiedField === 'phone' ? <Check className="size-3.5 text-[var(--accent-lab)]" /> : <Copy className="size-3.5" />}
                </button>
              )}
              {OWNER.phone && (
                <a href={`tel:${OWNER.phone}`} aria-label="Call direct phone">
                  <ArrowUpRight className="size-3.5 text-muted-foreground group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </a>
              )}
            </div>
          </div>
          <div>
            <div className="text-[10px] font-mono uppercase text-muted-foreground">Direct Phone</div>
            <div className="text-xs font-semibold text-ink truncate">{OWNER.phone || "Available via Email Request"}</div>
          </div>
        </div>
      </div>
    </section>
  );
}
