# Durgesh Dutt Sinha — Flagship 3D Digital Portfolio

[![Live Portfolio](https://img.shields.io/badge/Live-Flagship_Portfolio-8b5cf6?style=for-the-badge&logo=vercel&logoColor=white)](https://github.com/OxDurgeshxO/durgesh-flagship-portfolio)
[![Next.js](https://img.shields.io/badge/Next.js-14.2.35-black?style=for-the-badge&logo=next.js)](https://nextjs.org)
[![Three.js](https://img.shields.io/badge/Three.js-WebGL-000000?style=for-the-badge&logo=three.js)](https://threejs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com)

A high-performance, unified **Flagship 3D Digital Portfolio** for **Durgesh Dutt Sinha** — AIML Engineer, UNLOX® AI Fellow, and MCA (AIML) scholar at Sri Balaji University Pune. Featuring real-time Three.js WebGL graphics, an interactive 3D CyberBot companion, highlighted academic specializations, and curated production platforms.

---

## 🌟 Architectural Highlights

### 1. 🪐 3D WebGL Canvas & Particle Dynamics
- **Starfield Galaxy**: 5,001 individual rotating WebGL particles rendered via `@react-three/fiber` and `@react-three/drei`.
- **SSR Isolation**: Client-only dynamic hydration with zero hydration mismatch or server-side memory leaks.
- **Micro-Interactions**: Ambient gradient glow, smooth scroll spy, and real-time type animation headline.

### 2. 🤖 Interactive 3D CyberBot Companion
- **Native 3D Geometry**: Chrome chassis, counter-rotating holographic gyro rings, glowing expressive visor eyes, dynamic ion thruster flames, and floating magnetic hands.
- **Physics & Motion**: Real-time cursor gaze tracking, 360° acrobatic ion spin stunts, tossing/dragging mechanics, and dock/roam/follow modes.
- **Personalized Speech Engine**: Contextual voicelines with sound synthesis powered by the Web Audio API.

### 3. 🎓 Highlighted MCA (AIML) Academic Spotlight
- Located directly beneath Work Experience for maximum recruiter impact.
- **Sri Balaji University Pune (2025–2027 In Progress)**: Core specialization pillars in *Autonomous AI Agents*, *Deep Learning & CNNs*, *System Architecture*, *Cloud ML Pipelines (AWS)*, and *Prompt Engineering*.
- **Official Credentials**: AWS Educate Machine Learning Foundations, AWS Emerging Talent Community, and BCA foundation.

### 4. 🚀 Featured Production Showcases & Curated Top 5
- **ROLEFIT 2.0**: Enterprise AI Career Intelligence Platform (Next.js 16, Drizzle ORM, multi-role ATS resume matching).
- **AI Fitness Platform**: Computer Vision & IoT ecosystem with MediaPipe Pose Detection (<50ms latency).
- **MarketMatch AI**: Customer Segmentation & Recommender Engine with K-Means & DBSCAN clustering.
- **Curated Top 5 GitHub Repos**: Automated real-time GitHub REST API feed with ISR caching.

---

## 📁 Repository Structure

```
durgesh-flagship-portfolio/
├── app/
│   ├── layout.tsx              # Root HTML layout, SEO metadata, Open Graph
│   └── page.tsx                # Server component orchestrating sections
├── components/
│   ├── Background.tsx          # Floating ambient mesh gradient orbs
│   ├── LoadingScreen.tsx       # 0-100% animated cyber loading screen
│   ├── PortfolioShell.tsx      # Main layout wrapper & companion loader
│   ├── companion/
│   │   ├── CyberBotModel.tsx   # 3D Three.js robotic companion
│   │   ├── RoamingCompanion3D.tsx # Physics, roaming loop & speech bubble
│   │   └── SpeechBubble.tsx    # Responsive floating speech bubble
│   └── sections/
│       ├── Navbar.tsx          # Glassmorphism navigation with mobile menu
│       ├── HeroSection.tsx     # 3D Starfield & live typing headline
│       ├── AboutSection.tsx    # Bio, core competencies & social connectivity
│       ├── ExperienceSection.tsx # UNLOX® & Be10x fellowship timelines
│       ├── EducationSection.tsx# SBUP MCA AIML & AWS credentials spotlight
│       ├── FeaturedProjectsSection.tsx # Deep production showcases
│       ├── ProjectsSection.tsx # Curated Top 5 GitHub repositories
│       ├── ContactSection.tsx  # Topic-based inquiry suite & quick copy
│       └── Footer.tsx          # Copyright & live status indicators
├── lib/
│   ├── data.ts                 # Personal information, timeline, and education
│   └── github.ts               # GitHub API client with error boundaries & ISR
└── styles/
    └── globals.css             # Tailwind design tokens, glassmorphism & glow
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ or 20+
- npm, pnpm, or yarn

### Installation
```bash
# Clone the repository
git clone https://github.com/OxDurgeshxO/durgesh-flagship-portfolio.git
cd durgesh-flagship-portfolio

# Install dependencies
npm install

# Run development server
npm run dev
```

Visit `http://localhost:3000` in your browser.

### Production Build
```bash
# Compile and validate production bundle
npm run build

# Start production server
npm start
```

---

## 🌐 Deployment

Ready for one-click deployment to **Vercel** or **Netlify**:

```bash
# Deploy to Vercel
npx vercel
```

---

## 👤 Author

**Durgesh Dutt Sinha**
- **GitHub:** [@OxDurgeshxO](https://github.com/OxDurgeshxO)
- **LinkedIn:** [durgesh-dutt-s](https://www.linkedin.com/in/durgesh-dutt-s-4ba74924b)
- **Email:** [durgeshdsinha@gmail.com](mailto:durgeshdsinha@gmail.com)

---
*Crafted with Next.js 14, React Three Fiber, Three.js, and Tailwind CSS.*
