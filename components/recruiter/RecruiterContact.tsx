import React from "react";
import { Mail, Github, Linkedin, Calendar, Phone, ArrowUpRight } from "lucide-react";
import { OWNER } from "@/lib/data";

export default function RecruiterContact() {
  return (
    <section className="glass rounded-2xl p-6 md:p-8 border border-white/10 bg-white/[0.02]">
      <h2 className="text-xl font-bold text-white tracking-tight mb-2">
        Initiate Interview or Connect Directly
      </h2>
      <p className="text-xs text-slate-400 mb-6">
        Direct verified contact channels for technical recruiters and engineering leaders.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
        <a
          href={`mailto:${OWNER.email}`}
          className="p-4 rounded-xl bg-white/5 hover:bg-white/10 border border-white/5 hover:border-purple-500/40 transition-all group flex flex-col justify-between"
        >
          <div className="flex items-center justify-between text-purple-400 mb-3">
            <Mail className="size-5" />
            <ArrowUpRight className="size-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </div>
          <div>
            <div className="text-[10px] font-mono uppercase text-slate-500">Email Address</div>
            <div className="text-xs font-semibold text-white truncate">{OWNER.email}</div>
          </div>
        </a>

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
            <div className="text-[10px] font-mono uppercase text-slate-500">LinkedIn Profile</div>
            <div className="text-xs font-semibold text-white truncate">durgesh-dutt-s-4ba74924b</div>
          </div>
        </a>

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
            <div className="text-[10px] font-mono uppercase text-slate-500">GitHub Profile</div>
            <div className="text-xs font-semibold text-white truncate">@OxDurgeshxO</div>
          </div>
        </a>

        <a
          href={`tel:${OWNER.phone}`}
          className="p-4 rounded-xl bg-white/5 hover:bg-white/10 border border-white/5 hover:border-emerald-500/40 transition-all group flex flex-col justify-between"
        >
          <div className="flex items-center justify-between text-emerald-400 mb-3">
            <Phone className="size-5" />
            <ArrowUpRight className="size-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </div>
          <div>
            <div className="text-[10px] font-mono uppercase text-slate-500">Direct Phone</div>
            <div className="text-xs font-semibold text-white truncate">{OWNER.phone}</div>
          </div>
        </a>
      </div>
    </section>
  );
}
