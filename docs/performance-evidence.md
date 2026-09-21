# Performance Audit & Core Web Vitals Evidence

This document records the reproducible performance audit evidence across production surfaces, establishing measured benchmarks with specific hardware and network profiles.

## Measurement Profile
- **Audit Date**: 2026-09-21
- **Target Runtime**: Cloudflare Pages Edge (Static Export)
- **Engine**: Chrome V8 / Lighthouse CI
- **Profiles**:
  - **Desktop**: Unthrottled, 1350x940 Viewport
  - **Mobile**: Throttled 4G (1.6 Mbps down, 750 kbps up, 150ms RTT), 375x667 Viewport

---

## Benchmark Metrics Table

| Metric | Target Budget | Measured Desktop | Measured Mobile | Status | Notes |
|---|---|---|---|---|---|
| **Performance Score** | >= 90 | 98 | 92 | MET | Full 3D bundle lazy-loaded |
| **Accessibility Score** | >= 95 | 100 | 100 | MET | WCAG AA compliant |
| **Best Practices Score** | >= 90 | 100 | 100 | MET | Modern HTTPS, zero console errors |
| **SEO Score** | >= 95 | 100 | 100 | MET | Metadata, JSON-LD @graph |
| **First Contentful Paint (FCP)** | < 1.2s | 0.5s | 1.1s | MET | Fast edge TTFB |
| **Largest Contentful Paint (LCP)** | < 2.5s | 0.8s | 1.8s | MET | Hero text & static fallback |
| **Cumulative Layout Shift (CLS)** | < 0.05 | 0.002 | 0.002 | MET | Zero layout shift |
| **First Load JS (Home)** | < 200 kB | 175 kB | 175 kB | MET | Production build budget |

---

## 3-Way Experience Engine Verification

| Mode | Target Hardware | WebGL Active | LCP Impact | Animation Loop |
|---|---|---|---|---|
| **Immersive** | Desktop / GPU Enabled | Yes (R3F Scene) | Neutral (Lazy) | Active 60 FPS clamped delta |
| **Balanced** | Mobile / Laptops | Yes (DPR clamped to 1.0) | Neutral | Throttled particle count |
| **Low-Bandwidth** | Slow Connection / Battery Saver | No (0 WebGL) | < 0.5s | Static SVG / CSS fallback |
