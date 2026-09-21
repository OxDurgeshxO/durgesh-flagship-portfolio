# Durgesh Dutt Sinha — Flagship AI & Full-Stack Digital Portfolio

[![Live Production](https://img.shields.io/badge/Live-durgesh--portfolio.pages.dev-F38020?style=for-the-badge&logo=cloudflarepages&logoColor=white)](https://durgesh-portfolio.pages.dev/)
[![Version](https://img.shields.io/badge/Version-2.0.0-purple?style=for-the-badge)](CHANGELOG.md)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg?style=for-the-badge)](LICENSE)
[![Next.js](https://img.shields.io/badge/Next.js-14.2.35-black?style=for-the-badge&logo=next.js)](https://nextjs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org)
[![A11y: WCAG 2.1 AA](https://img.shields.io/badge/A11y-WCAG%202.1%20AA-success?style=for-the-badge&logo=w3c&logoColor=white)](docs/testing.md)
[![Tests Passing](https://img.shields.io/badge/Tests-42%20Unit%20%7C%2074%20Playwright-emerald?style=for-the-badge&logo=githubactions&logoColor=white)](docs/testing.md)

> 🚀 **Live Production Deployment**: **[https://durgesh-portfolio.pages.dev](https://durgesh-portfolio.pages.dev/)**  
> ⚡ Engineered for **Cloudflare Pages Anycast CDN** with sub-second global edge delivery, interactive WebGL shaders, client-side computer vision kinematics, and 0-WebGL graceful fallbacks.

A production-grade engineering showcase communicating:
> **Durgesh Dutt Sinha is an AI/ML engineer and full-stack developer who builds production-oriented AI systems, computer-vision tools, and modern web platforms.**

---

## 🏛️ System Architecture

The portfolio is structured as a decoupled, zero-persistence static export served over Cloudflare's global edge network with serverless functions for dynamic telemetry:

```
┌────────────────────────────────────────────────────────────────────────┐
│                          User Browser Session                          │
│                                                                        │
│   ┌─────────────────────┐   ┌──────────────────┐   ┌────────────────┐  │
│   │  Three.js Canvas    │   │ Next.js 14 SSG   │   │  AI Lab Kinema │  │
│   │  (WebGL / Shaders)  │   │ (App Router HTML)│   │  (MediaPipe CV)│  │
│   └──────────┬──────────┘   └────────┬─────────┘   └────────┬───────┘  │
│              │                       │                      │          │
│              │        WebGLErrorBoundary Fallback           │          │
│              └───────────────────────┼──────────────────────┘          │
└──────────────────────────────────────┼─────────────────────────────────┘
                                       │ HTTPS Anycast
                                       ▼
┌────────────────────────────────────────────────────────────────────────┐
│                       Cloudflare Pages Edge CDN                        │
│                                                                        │
│   ┌─────────────────────────────┐    ┌─────────────────────────────┐   │
│   │   Static Pre-rendered HTML  │    │  Cloudflare Edge Functions  │   │
│   │   (20 Prerendered Pages)    │    │  (/functions/api/contact)   │   │
│   └─────────────────────────────┘    └──────────────┬──────────────┘   │
│                                                     │                  │
│                                      Rate Limiting  ▼                  │
│                                      ┌─────────────────────────────┐   │
│                                      │ Cloudflare KV Namespace     │   │
│                                      │ (RATE_LIMIT_KV)             │   │
│                                      └─────────────────────────────┘   │
└────────────────────────────────────────────────────────────────────────┘
```

---

## 🌟 Flagship Projects & Case Studies

| Flagship Platform | Category | Primary Challenge Solved | Production Stack | Case Study |
| :--- | :--- | :--- | :--- | :--- |
| **RoleRadar** | Career Intelligence AI | Multi-role ATS keyword scoring with Google XYZ formula recommendations | Next.js 16, TypeScript, Tailwind, Drizzle ORM | [Deep Dive](app/work/[slug]/page.tsx) |
| **FitTrack AI** | Real-Time Computer Vision | 33-point skeletal landmark tracking with client-side joint angle kinematics (<45ms) | MediaPipe, Web Workers, HTML5 Canvas | [Deep Dive](app/work/[slug]/page.tsx) |
| **MarketMatch AI** | Unsupervised ML | RFM customer segmentation and behavioral clustering with 2D PCA projections | Python, FastAPI, Scikit-learn, React | [Deep Dive](app/work/[slug]/page.tsx) |
| **Jarvis Voice Assistant** | Multimodal Voice AI | Low-latency bidirectional voice assistant with Iron Man HUD visual feedback | Gemini 2.0 Flash, WebSockets, Three.js | [Deep Dive](app/work/[slug]/page.tsx) |
| **CNN Kidney Tumor Classifier** | Deep Learning Diagnostics | Robust classification of CT kidney scans with automated DVC/MLflow pipelines | PyTorch, MLflow, DVC, Streamlit, Docker | [Deep Dive](app/work/[slug]/page.tsx) |

---

## 🧭 Application Routes & Navigation

| Route | Description | Technical Highlights |
| :--- | :--- | :--- |
| **[`/`](app/page.tsx)** | Cinematic 3D Flagship Home | Three.js neural core, WebGLErrorBoundary, Command HUD (`Ctrl+K`) |
| **[`/resume`](app/resume/page.tsx)** | Official HTML Resume | ATS-optimized typography, print CSS, verified PDF download |
| **[`/recruiter`](app/recruiter/page.tsx)** | Recruiter Fast-Track Profile | 0 WebGL overhead, executive summary, verified metrics |
| **[`/lab`](app/lab/page.tsx)** | Interactive AI Engineering Lab | Live MediaPipe pose kinematics (<45ms), ATS NLP scoring, RFM PCA |
| **[`/github-health`](app/github-health/page.tsx)** | GitHub Repository Telemetry | Real-time ecosystem health snapshot, commit activity, CI status |
| **[`/changelog`](app/changelog/page.tsx)** | Public Engineering Changelog | Problem-Implementation-Result records across all versions |
| **[`/performance`](app/performance/page.tsx)** | Performance Telemetry Center | Core Web Vitals telemetry (LCP, CLS, INP) and frame budget metrics |
| **[`/privacy`](app/privacy/page.tsx)** | Privacy & Zero-Persistence Center | Local-only camera processing and zero server persistence disclosure |

---

## 🛠️ Tech Stack Breakdown

- **Core Framework**: [Next.js 14 (App Router)](https://nextjs.org) with static HTML pre-rendering (`output: "export"`).
- **Languages & Types**: [TypeScript 5](https://www.typescriptlang.org) under strict mode.
- **Typography**: Self-hosted [Google Fonts](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) (`next/font/google` with Inter & JetBrains Mono).
- **Styling & Design System**: [Tailwind CSS 3](https://tailwindcss.com), curated HSL tokens, glassmorphism, responsive OLED dark default.
- **3D Graphics & Visuals**: [Three.js](https://threejs.org), [@react-three/fiber](https://docs.pmnd.rs/react-three-fiber), [@react-three/drei](https://github.com/pmndrs/drei).
- **Animation & Motion**: [Framer Motion 11](https://www.framer.com/motion/) with `html.a11y-reduced-motion` instant-rendering suppressors.
- **Edge Functions**: [Cloudflare Pages Functions](https://developers.cloudflare.com/pages/functions/) with Cloudflare KV rate limiting.
- **Testing & Quality**: Node.js native test runner, [Playwright](https://playwright.dev), [@axe-core/playwright](https://github.com/dequelabs/axe-core-npm), Lighthouse CI.

---

## 💻 Local Development & Setup

### Prerequisites
- **Node.js**: `>= 20.0.0` (verified on Node v20/v22/v24)
- **npm**: `>= 10.0.0`
- **Git**: Modern Git client

### Step-by-Step Installation

```bash
# 1. Clone repository
git clone https://github.com/OxDurgeshxO/durgesh-flagship-portfolio.git
cd durgesh-flagship-portfolio

# 2. Check out v2 release branch
git checkout v2

# 3. Install dependencies
npm install

# 4. Configure local environment variables
cp .env.example .env.local

# 5. Start local development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

---

## 🔑 Environment Variables Specification

Configure the following variables in `.env.local` (local dev) or Cloudflare Pages Dashboard (production):

| Variable Name | Required | Default / Example | Purpose |
| :--- | :--- | :--- | :--- |
| `NEXT_PUBLIC_SITE_URL` | Yes | `https://durgesh-portfolio.pages.dev` | Canonical URL for sitemaps, open-graph metadata, and schema.org |
| `NEXT_PUBLIC_GITHUB_USERNAME` | Yes | `OxDurgeshxO` | Target GitHub user for public repository telemetry |
| `GITHUB_TOKEN` | No | `ghp_...` (optional) | Increases GitHub API rate limit from 60 to 5,000 req/hr |
| `CONTACT_EMAIL_RECIPIENT` | No | `durgeshdsinha@gmail.com` | Destination address for contact API submissions |
| `RESEND_API_KEY` | No | `re_...` (optional) | Used by edge contact handler for transactional email delivery |
| `NEXT_PUBLIC_ANALYTICS_ID` | No | `portfolio` (optional) | Optional privacy-friendly analytics identifier |
| `NEXT_PUBLIC_PHONE` | No | `""` | Optional phone contact; left blank by default for privacy |

---

## ⚡ Development & Quality Commands

| Command | Action |
| :--- | :--- |
| `npm run dev` | Launches local development server on port 3000 with hot reloading |
| `npm run build` | Compiles TypeScript and exports 20 pre-rendered static HTML routes to `out/` |
| `npm run start` / `npm run preview` | Serves production build locally using static HTTP server (`npx serve out -l 3000`) |
| `npm run lint` | Executes ESLint against all components, pages, and scripts |
| `npm run typecheck` | Runs strict TypeScript compiler check (`tsc --noEmit`) |
| `npm test` | Runs 42 automated tests (assets, content hygiene, route integrity, security) |
| `npm run check:links` | Crawls all rendered HTML files to verify zero broken internal links |
| `npm run test:e2e` | Executes full Playwright end-to-end test suite across desktop and mobile |
| `npm run test:a11y` | Executes automated Axe-core WCAG 2.1 AA accessibility audits |
| `npm run verify` | Unified quality gate: runs `lint` -> `typecheck` -> `build` -> `test` sequentially |
| `npm run audit` | Audits dependencies and verifies security policy compliance |

---

## 🧪 Automated Testing & Verification Layer

The project employs four automated testing layers ensuring zero regressions:

1. **Unit & Content Hygiene Suite (`npm test`)**:
   - 42 passing assertions verifying asset byte integrity, non-empty `resume.pdf`, valid SVG icons, route completeness, and CSP compliance.
   - Grounded anti-regression scan checking that 0 personal Windows paths, 0 unverified claims, and 0 disputed 404 repository slugs exist in source code.
2. **End-to-End Suite (`npm run test:e2e`)**:
   - 74 passing tests executed with Playwright across Chromium and Mobile Chrome.
   - Tests user journeys: Hero CTA traversal, Command Palette HUD (`Ctrl+K`), PDF downloads, custom 404 handling, keyboard navigation, and WebGL error resilience.
3. **Accessibility Audits (`npm run test:a11y`)**:
   - Automated Axe-core scanning asserting zero critical or serious WCAG 2.1 AA violations on all routes.
4. **Lighthouse CI**:
   - Enforced through `.lighthouserc.json`: Performance, Accessibility (>=95), Best Practices, and SEO.

See [docs/testing.md](docs/testing.md) for the complete verification architecture and the 13 verified keyboard/screen-reader interaction flows.

---

## 🚀 Cloudflare Pages Deployment Runbook

The application is deployed using Cloudflare Pages with Git integration on branch `v2`:

- **Framework Preset**: `Next.js (Static Export)`
- **Build Command**: `npm run build`
- **Build Output Directory**: `out`
- **Node.js Version**: `20` (configured via `NODE_VERSION=20`)
- **KV Namespace Binding**:
  - Variable Name: `RATE_LIMIT_KV`
  - Provisioning: `wrangler kv:namespace create RATE_LIMIT_KV`
- **Security Headers**: Automatically served from `public/_headers` (enforcing strict CSP, HSTS, `X-Frame-Options: DENY`, `X-Content-Type-Options: nosniff`).

See [docs/deployment.md](docs/deployment.md) for step-by-step provisioning and zero-downtime rollback procedures.

---

## 📊 Performance Evidence & Benchmarks

Validated through Lighthouse CI and local serving benchmarks:

- **Cumulative Layout Shift (CLS)**: `0.002` (target `< 0.1`) — achieved via static aspect ratios and font pre-allocation.
- **Largest Contentful Paint (LCP)**: `0.85s` on fast networks, `< 1.8s` on throttled mobile profiles.
- **Interaction to Next Paint (INP)**: `< 48ms` — achieved through decoupled WebGL animation loops and pointer debouncing.
- **Bundle Footprint**: First load JS shared by all routes is `87.6 kB`.

See [docs/performance-evidence.md](docs/performance-evidence.md) for raw audit logs and metric captures.

---

## 🛡️ Truth, Integrity & Security Disclosure

- **Claims Integrity**: All stated metrics, project roles, and technical achievements are formally recorded with supporting evidence in [docs/claims.md](docs/claims.md).
- **Security Policy & Risk Acceptance**: Documented in [SECURITY.md](SECURITY.md), including the formal risk acceptance for Next.js CVEs justified by static pre-rendering (`output: "export"`) and unoptimized image pipelines.

---

## 📄 License

This repository and its contents are released under the [MIT License](LICENSE).  
Copyright © 2026 Durgesh Dutt Sinha.
