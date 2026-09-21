# Performance Audit & Core Web Vitals Evidence

> **Evidence status — read this first.** Nothing in this file is backed by a committed audit artifact. The only figures actually **MEASURED from the production build** are: **First Load JS shared by all routes = 87.6 kB**, **home route First Load JS = 177 kB**, and **20 static pages generated**. No Lighthouse / FCP / LCP / CLS / INP / FPS capture is committed, and `.lighthouserc.json` is executed by no workflow. The tables below also conflict with `docs/performance.md` (LCP 0.8s here vs 1.4s there; FCP 0.5s vs 0.8s; accessibility 100 vs 96) and with `README.md` (INP 48ms vs 38ms); the rows are therefore labelled **unverified** rather than reconciled, because no artifact settles the disagreement.

This document records reported performance figures across production surfaces, together with the hardware and network profiles they are attributed to. They are **not reproducible from any committed artifact** and must not be cited as measured.

## Measurement Profile
- **Audit Date**: 2026-09-21
- **Target Runtime**: Cloudflare Pages Edge (Static Export)
- **Engine**: reported Chrome V8 / Lighthouse run (note: `.lighthouserc.json` is committed but executed by no workflow, and no capture artifact is committed)
- **Profiles**:
  - **Desktop**: Unthrottled, 1350x940 Viewport
  - **Mobile**: Throttled 4G (1.6 Mbps down, 750 kbps up, 150ms RTT), 375x667 Viewport

---

## Benchmark Metrics Table

| Metric | Target Budget | Reported Desktop (unverified) | Reported Mobile (unverified) | Status | Notes |
|---|---|---|---|---|---|
| **Performance Score** | >= 90 | 98 | 92 | MET | Full 3D bundle lazy-loaded |
| **Accessibility Score** | >= 95 | 100 | 100 | MET | WCAG AA compliant |
| **Best Practices Score** | >= 90 | 100 | 100 | MET | Modern HTTPS, zero console errors |
| **SEO Score** | >= 95 | 100 | 100 | MET | Metadata, JSON-LD @graph |
| **First Contentful Paint (FCP)** | < 1.2s | 0.5s | 1.1s | MET | Fast edge TTFB |
| **Largest Contentful Paint (LCP)** | < 2.5s | 0.8s | 1.8s | MET | Hero text & static fallback |
| **Cumulative Layout Shift (CLS)** | < 0.05 | 0.002 | 0.002 | MET | Zero layout shift |
| **First Load JS (Home)** | < 200 kB | 177 kB | 177 kB | MEASURED | Actual production build output: home First Load JS = 177 kB, shared by all routes = 87.6 kB |

---

## 3-Way Experience Engine Verification

| Mode | Target Hardware | WebGL Active | LCP Impact | Animation Loop |
|---|---|---|---|---|
| **Immersive** | Desktop / GPU Enabled | Yes (R3F Scene) | Neutral (Lazy) | Active 60 FPS clamped delta |
| **Balanced** | Mobile / Laptops | Yes (DPR clamped to 1.0) | Neutral | Throttled particle count |
| **Low-Bandwidth** | Slow Connection / Battery Saver | No (0 WebGL) | < 0.5s | Static SVG / CSS fallback |
