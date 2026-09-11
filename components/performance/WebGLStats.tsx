"use client";

import React, { useState, useEffect } from "react";
import { Cpu, Eye, Gauge, Shield } from "lucide-react";

export default function WebGLStats() {
  const [glInfo, setGlInfo] = useState<{
    renderer: string;
    vendor: string;
    maxTextureSize: number;
    supported: boolean;
  }>({
    renderer: "Probing client GPU...",
    vendor: "Generic WebGL",
    maxTextureSize: 4096,
    supported: true,
  });

  useEffect(() => {
    try {
      const canvas = document.createElement("canvas");
      const gl =
        canvas.getContext("webgl2") ||
        canvas.getContext("webgl") ||
        (canvas.getContext("experimental-webgl") as WebGLRenderingContext | null);

      if (gl) {
        const debugInfo = gl.getExtension("WEBGL_debug_renderer_info");
        const renderer = debugInfo
          ? gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL)
          : gl.getParameter(gl.RENDERER);
        const vendor = debugInfo
          ? gl.getParameter(debugInfo.UNMASKED_VENDOR_WEBGL)
          : gl.getParameter(gl.VENDOR);
        const maxTextureSize = gl.getParameter(gl.MAX_TEXTURE_SIZE);

        setGlInfo({
          renderer: String(renderer || "Standard Hardware Accelerator"),
          vendor: String(vendor || "WebGL Engine"),
          maxTextureSize: Number(maxTextureSize || 4096),
          supported: true,
        });
      } else {
        setGlInfo((prev) => ({ ...prev, supported: false, renderer: "WebGL Hardware acceleration disabled" }));
      }
    } catch {
      // Fallback
    }
  }, []);

  return (
    <section className="glass rounded-2xl p-6 border border-white/10 mb-10 bg-white/[0.02]">
      <div className="flex items-center gap-2 mb-4 text-purple-400">
        <Cpu className="size-4" />
        <h3 className="text-xs font-mono uppercase tracking-wider text-white font-bold">
          Live Client Hardware & WebGL Runtime Diagnostics
        </h3>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 font-mono text-xs">
        <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/5">
          <div className="text-[10px] text-slate-500 uppercase">GPU Device / Renderer</div>
          <div className="text-slate-200 font-semibold truncate mt-1" title={glInfo.renderer}>
            {glInfo.renderer}
          </div>
        </div>

        <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/5">
          <div className="text-[10px] text-slate-500 uppercase">Graphics Vendor</div>
          <div className="text-slate-200 font-semibold truncate mt-1">
            {glInfo.vendor}
          </div>
        </div>

        <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/5">
          <div className="text-[10px] text-slate-500 uppercase">Max Texture Texture Dimension</div>
          <div className="text-slate-200 font-semibold truncate mt-1">
            {glInfo.maxTextureSize} × {glInfo.maxTextureSize} px
          </div>
        </div>
      </div>
    </section>
  );
}
