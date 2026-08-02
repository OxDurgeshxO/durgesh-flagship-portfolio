# Durgesh Dutt Sinha — 3D Digital Portfolio

A professional 3D portfolio website built with **Next.js 14**, **React Three Fiber**, **Framer Motion**, and **Tailwind CSS**.

[![Next.js](https://img.shields.io/badge/Next.js-14.2.35-black)](https://nextjs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6)](https://www.typescriptlang.org)

---

## 🚀 Quick Start

```bash
npm install       # Install dependencies
npm run dev       # Dev server → http://localhost:3000
npm run build     # Production build (verify)
```

## ⚙️ Environment Variables

Edit `.env.local` (pre-filled):

```env
NEXT_PUBLIC_GITHUB_USERNAME=OxDurgeshxO
NEXT_PUBLIC_LINKEDIN_URL=https://www.linkedin.com/in/durgesh-dutt-s-4ba74924b
NEXT_PUBLIC_EMAIL=durgeshdsinha@gmail.com
```

## 🌐 Deploy to Vercel

```bash
npm i -g vercel && vercel
```

Or: push to GitHub → connect at vercel.com → auto-deploy on every push.

## 📁 Architecture

```
app/
  layout.tsx          # Root layout, metadata, Open Graph
  page.tsx            # Server component — fetches GitHub data, renders sections
components/sections/
  Navbar.tsx          # Glassmorphism nav, scroll-aware, mobile hamburger
  HeroSection.tsx     # R3F 3D starfield + TypeAnimation — loaded client-only (ssr:false)
  AboutSection.tsx    # Live GitHub avatar/stats + bio
  SkillsSection.tsx   # Animated progress bars by category
  ExperienceSection.tsx  # Glowing timeline cards
  ProjectsSection.tsx    # Live GitHub repos grid (ISR, 1hr cache)
  EducationSection.tsx   # Degree cards with stagger animation
  CertificationsSection.tsx  # AWS cert cards with glow
  VolunteeringSection.tsx    # Volunteering history
  ContactSection.tsx  # mailto form + contact links
  Footer.tsx          # Links and copyright
lib/
  data.ts             # ALL personal data — edit this to customise
  github.ts           # GitHub REST API helpers (ISR revalidate: 3600s)
styles/
  globals.css         # Tailwind base + glass / gradient-text / glow utilities
```

## 🧩 Key Components

### HeroSection
- **3D StarField**: 5,001-point sphere via `@react-three/fiber`, rotated in `useFrame`. Positions cached in `useMemo` (prevents per-render GC).
- **SSR Safety**: Loaded via `dynamic(..., { ssr: false })` — prevents R3F Canvas from crashing Next.js static prerender.
- **TypeAnimation**: Cycles through role titles every 2 seconds.

### ProjectsSection
- Fetches live repos from GitHub API server-side (Next.js ISR, revalidates every hour).
- Gracefully falls back to 3 hardcoded sample repos if API is unavailable or rate-limited.

### ContactSection
- Controlled mailto form with both `subject` and `body` fully `encodeURIComponent`-escaped (prevents URI injection).

## 🔧 API Functions (`lib/github.ts`)

| Function | Description |
|---|---|
| `fetchGitHubProfile()` | Fetches user profile; ISR 1hr cache; throws on error |
| `fetchGitHubRepos()` | Fetches up to 9 public repos sorted by updated; `Array.isArray` guard against rate-limit error objects |

## 🛡️ Security & Bug Fixes

| # | File | Issue | Fix |
|---|---|---|---|
| 1 | `lib/github.ts` | `.filter()` crash on GitHub rate-limit response object | `Array.isArray(data)` guard added |
| 2 | `HeroSection.tsx` | `new Float32Array(15003)` on every render (GC leak) + unused `maath/random` import | `useMemo([], [])` + import removed |
| 3 | `ContactSection.tsx` | `form.name` unescaped in mailto subject → URI corruption | Full subject wrapped in `encodeURIComponent()` |
| 4 | `app/page.tsx` | R3F Canvas crashed SSR prerender (`Element type: undefined`) | `dynamic(() => import(...), { ssr: false })` |
| 5 | `package.json` | `next@14.2.5` — 34 CVEs incl. SSRF, auth bypass, cache poisoning | Upgraded to `next@14.2.35` |

## ✏️ Customise

Edit **`lib/data.ts`** to update all personal info:

```ts
export const OWNER = { name, title, email, phone, location, github, linkedin, bio }
export const SKILLS = [{ name, level, category }]          // category: ai | dev | cloud | data | core
export const EXPERIENCE = [{ role, company, period, location, points, color }]
export const EDUCATION = [{ degree, institution, period, grade }]
export const CERTIFICATIONS = [{ name, issuer, color }]
export const VOLUNTEERING = [{ role, org, description }]
```

GitHub repos **auto-fetch live** — no manual update needed.

## 🎨 Tech Stack

| Layer | Tech |
|---|---|
| Framework | Next.js 14 App Router |
| 3D | React Three Fiber + Drei |
| Animation | Framer Motion + GSAP |
| Styling | Tailwind CSS |
| Data | GitHub REST API (ISR live) |
| Deploy | Vercel |

## 📊 Build Output

```
Route (app)                    Size     First Load JS
┌ ○ /                          257 kB          344 kB
└ ○ /_not-found                873 B          88.2 kB
○  (Static) prerendered as static content
```

---
*Built by Durgesh Dutt Sinha — AIML Engineer & Full-Stack Developer*
