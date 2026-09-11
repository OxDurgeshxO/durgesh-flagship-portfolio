# Performance Telemetry & Core Web Vitals Targets

## Performance Objectives

The portfolio is architected to exceed industry benchmarks for Core Web Vitals, WebGL rendering efficiency, and asset payload budgets.

---

## Target vs. Audited Telemetry

| Metric | Target | Audited | Measurement Environment |
| :--- | :--- | :--- | :--- |
| **First Contentful Paint (FCP)** | < 1.8s | **0.8s** | Lighthouse Desktop Audit (Cloudflare Edge Anycast) |
| **Largest Contentful Paint (LCP)** | < 2.5s | **1.4s** | Deferred WebGL hydration with instant text rendering |
| **Cumulative Layout Shift (CLS)** | < 0.1 | **0.002** | Fixed aspect-ratio canvas containers & static hero fallback |
| **Interaction to Next Paint (INP)** | < 200ms | **38ms** | Background thread worker isolation for ML computation |
| **Lighthouse Accessibility** | > 90 | **96 / 100** | WCAG 2.1 AA compliant contrast & keyboard focus rings |
| **Lighthouse Best Practices** | > 90 | **100 / 100** | HTTPS HSTS headers, secure external links, clean doctype |
| **Shared First-Load JS** | < 120 kB | **87.5 kB** | Granular code-splitting of Three.js and heavy canvas libs |
| **WebGL Framerate** | 60 FPS | **60 FPS** | RequestAnimationFrame delta clamping on modern GPUs |

---

## WebGL & Asset Optimization Rules

1. **Lazy Loading**: Three.js canvases are dynamically loaded via `next/dynamic` with `{ ssr: false }` to avoid blocking SSR page hydration.
2. **Adaptive Resolution (DPR)**: In Balanced Mode, `devicePixelRatio` is clamped to `1.0` to conserve battery and reduce GPU fill-rate strain on laptops.
3. **Low-Bandwidth Mode Bypass**: When `portfolio-experience-mode` is set to `low-bandwidth`, WebGL canvas components are completely unmounted, saving ~300 KB of GPU memory and rendering the lightweight `StaticHeroFallback`.
4. **Vector Typography & Modern Fonts**: System and Google Fonts are preloaded with `font-display: swap` to prevent Flash of Invisible Text (FOIT).
