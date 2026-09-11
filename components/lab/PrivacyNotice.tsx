import React from "react";
import { ShieldCheck, Lock, EyeOff } from "lucide-react";

export default function PrivacyNotice() {
  return (
    <div className="glass rounded-xl p-4 border border-purple-500/20 bg-purple-950/20 mb-8 text-xs text-slate-300 flex items-start gap-3">
      <ShieldCheck className="size-5 text-emerald-400 shrink-0 mt-0.5" />
      <div>
        <div className="font-semibold text-white mb-0.5 flex items-center gap-2">
          <span>AI Lab Privacy & Ethical Data Disclosure</span>
          <span className="text-[10px] font-mono px-2 py-0.2 rounded bg-emerald-500/10 text-emerald-300 border border-emerald-500/20">
            Ephemeral Memory
          </span>
        </div>
        <p className="text-slate-400 leading-relaxed">
          All inputs processed in this AI Lab execute strictly in ephemeral edge memory. No user-submitted resume text, camera streams, or telemetry data are persisted to disk or databases. Zero third-party API keys are exposed to client bundles.
        </p>
      </div>
    </div>
  );
}
