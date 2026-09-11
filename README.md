# Durgesh Dutt Sinha — Flagship AI & Full-Stack Digital Portfolio

[![Live Production](https://img.shields.io/badge/Live-durgesh--portfolio--v2.pages.dev-F38020?style=for-the-badge&logo=cloudflarepages&logoColor=white)](https://durgesh-portfolio-v2.pages.dev/)
[![Next.js](https://img.shields.io/badge/Next.js-14.2.35-black?style=for-the-badge&logo=next.js)](https://nextjs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org)
[![Three.js](https://img.shields.io/badge/Three.js-WebGL-000000?style=for-the-badge&logo=three.js)](https://threejs.org)
[![Tests Passing](https://img.shields.io/badge/Tests-24%2F24%20Passing-emerald?style=for-the-badge&logo=githubactions&logoColor=white)](tests/)

> 🚀 **Live Production Deployment**: **[https://durgesh-portfolio-v2.pages.dev](https://durgesh-portfolio-v2.pages.dev/)**  
> ⚡ Powered by **Cloudflare Pages Anycast CDN** with sub-second global latency, interactive 3D WebGL dynamics, client-side computer vision kinematics, and 0-WebGL fallbacks.

A unified, production-oriented engineering showcase communicating:
> **Durgesh Dutt Sinha is an AIML engineer and full-stack developer who builds production-oriented AI systems, computer-vision tools, and modern web platforms.**

---

## 🧭 Application Routes & Navigation

| Route | Description | Tech Highlights |
| :--- | :--- | :--- |
| **[`/`](app/page.tsx)** | Cinematic 3D Flagship Home | 5,001-particle R3F neural core, 3D CyberBot, Raycast HUD (`Ctrl+K`) |
| **[`/resume`](app/resume/page.tsx)** | Official HTML Resume | ATS-optimized typography, print CSS, 534 KB verified PDF download |
| **[`/recruiter`](app/recruiter/page.tsx)** | Recruiter Fast-Track Profile | 0 WebGL overhead, executive summary, verified project benchmarks |
| **[`/lab`](app/lab/page.tsx)** | Interactive AI Engineering Lab | Live MediaPipe pose estimation (<45ms), ATS NLP scoring, 2D PCA |
| **[`/work/roleradar`](app/work/[slug]/page.tsx)** | RoleRadar Deep Dive Case Study | Next.js 16, Drizzle ORM, dual-mode fallback, Google XYZ optimizer |
| **[`/work/fittrack`](app/work/[slug]/page.tsx)** | FitTrack AI Pose Architecture | 33-point skeletal vector kinematics, Web Workers, <50ms inference |
| **[`/work/marketmatch-ai`](app/work/[slug]/page.tsx)** | MarketMatch AI ML Study | RFM customer segmentation, K-Means & DBSCAN clustering, PCA scatter |
| **[`/github-health`](app/github-health/page.tsx)** | GitHub Repository Telemetry | Real-time CI health, test coverage audits, deterministic fallbacks |
| **[`/changelog`](app/changelog/page.tsx)** | Public Engineering Changelog | Problem-Implementation-Result records across all versions |
| **[`/performance`](app/performance/page.tsx)** | Performance Telemetry Center | Core Web Vitals telemetry (LCP, CLS, INP) and FPS metrics |
| **[`/privacy`](app/privacy/page.tsx)** | Privacy & Zero-Persistence Center | Local-only camera processing and zero server persistence disclosure |

---

## ⚡ Adaptive Experience Modes

Users can seamlessly switch performance modes via the **Command Palette (`Ctrl+K`)**, the **Accessibility Panel (`Alt+A`)**, or the **Performance Center**:

1. **Immersive (Default on Capable Desktops)**:
   - Full 3D Holographic Neural Core (`components/3d/AICoreScene.tsx`) with 5,001 active particles.
   - 3D CyberBot companion with cursor gaze tracking and Web Audio sound synthesis.
2. **Balanced (Default on Mobile & Battery Saver)**:
   - Clamped DPR (1.0), reduced particle count (1,200), and audio muted by default.
3. **Low-Bandwidth (0 WebGL Overhead)**:
   - WebGL components are completely unmounted.
   - Zero layout shift (CLS: 0.002) achieved via `components/StaticHeroFallback.tsx` (pure CSS/SVG vector mesh).
   - Instant first contentful paint (0.8s) on low-power devices and 3G networks.

---

## 🛠️ Verification & Quality Gates

```bash
# Run linting verification
npm run lint

# Run TypeScript strict type check
npm run typecheck

# Run production Next.js build
npm run build

# Run automated test suite (routes, assets, content hygiene, security)
npm test

# Run full unified verification pipeline
npm run verify
```

---

## 📚 Technical Documentation & Architecture Decisions

In-depth technical architecture documentation and Architectural Decision Records (ADRs) are maintained in `docs/`:

- **[System Architecture](docs/architecture.md)**
- **[Deployment Architecture & Rollback Protocol](docs/deployment.md)**
- **[Performance Telemetry & WebGL Optimization](docs/performance.md)**
- **[Security Threat Model & Rate Limiting](docs/security.md)**
- **[Testing Strategy & Verification Commands](docs/testing.md)**
- **[ADR 001: Cloudflare Pages Standardization](docs/decisions/001-cloudflare-pages.md)**
- **[ADR 002: Static CSS/SVG Neural Mesh Fallback](docs/decisions/002-webgl-fallback.md)**
- **[ADR 003: Deterministic GitHub Telemetry Caching](docs/decisions/003-github-fallback.md)**
- **[Evolutionary Feature History](docs/development/local-feature-history.md)**

---

## 👤 Author & Leadership

**Durgesh Dutt Sinha**
- **Title**: AIML Engineer & Full-Stack Developer
- **Education**: MCA in Artificial Intelligence & Machine Learning, Sri Balaji University Pune (2025–2027)
- **Fellowships**: UNLOXr AI Program Fellow • Be10x AI Cohort Member
- **GitHub**: [@OxDurgeshxO](https://github.com/OxDurgeshxO)
- **LinkedIn**: [Durgesh Dutt Sinha](https://www.linkedin.com/in/durgesh-dutt-s-4ba74924b)
- **Email**: [durgeshdsinha@gmail.com](mailto:durgeshdsinha@gmail.com)
- **Security Policy**: [SECURITY.md](SECURITY.md)
