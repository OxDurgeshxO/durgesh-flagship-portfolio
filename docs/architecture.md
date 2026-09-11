# System Architecture & Technical Design

## Architectural Overview

`durgesh-flagship-portfolio` is an enterprise-grade AI and full-stack engineering showcase built on **Next.js 14 (App Router)**, **React 18**, **TypeScript 5**, and **Tailwind CSS**. It is deployed globally on **Cloudflare Pages** via edge Anycast network distribution.

The application is architected around two core personas:
1. **Recruiters & Engineering Managers**: Require sub-second access to verified credentials, ATS-ready resume downloads, and architectural summaries without heavy rendering overhead.
2. **Technical Reviewers & AI Engineers**: Require interactive proof of client-side machine learning inference, real-time computer vision kinematics, and measurable performance telemetry.

---

## High-Level Topology

```
+-------------------------------------------------------------------------+
|                        Cloudflare Edge Network                          |
|  - Anycast Global Edge Caching                                           |
|  - Brotli Compression / Static Asset Offloading                         |
+-------------------------------------------------------------------------+
                                    |
          +-------------------------+-------------------------+
          |                                                   |
          v                                                   v
+-----------------------+                           +-------------------+
|  Static SSR Shell     |                           |  Edge API Routes  |
|  - / (Portfolio Home) |                           |  - /api/contact   |
|  - /resume            |                           |  - /api/lab/*     |
|  - /recruiter         |                           +-------------------+
|  - /work/[slug]       |                                     |
|  - /privacy           |                                     v
|  - /changelog         |                           +-------------------+
|  - /github-health     |                           | External Services |
|  - /performance       |                           | - Resend API      |
+-----------------------+                           | - GitHub REST API |
          |                                         +-------------------+
          v
+-------------------------------------------------------------------------+
|                      Client-Side Execution Layer                        |
|                                                                         |
|  +---------------------------+   +-----------------------------------+  |
|  | Experience Mode Controller|   | Interactive AI Lab Engine         |  |
|  | - Immersive: R3F Canvas   |   | - FitTrack: MediaPipe Web Worker  |  |
|  | - Balanced: 1.0 DPR clamp |   | - RoleRadar: Client Regex / NLP   |  |
|  | - Light: Static SVG Mesh  |   | - MarketMatch: 2D PCA & K-Means   |  |
|  +---------------------------+   +-----------------------------------+  |
|                                                                         |
|  +---------------------------+   +-----------------------------------+  |
|  | Global Accessibility Hub  |   | Raycast Command Palette HUD       |  |
|  | - Reduced Motion Overrides|   | - Keyboard Search (Ctrl+K)        |  |
|  | - High-Contrast Styles    |   | - Route / Section Quick-Jump      |  |
|  +---------------------------+   +-----------------------------------+  |
+-------------------------------------------------------------------------+
```

---

## Core Subsystems

### 1. Dynamic 3D Scene Isolation
- **Three.js & React Three Fiber (`@react-three/fiber`, `@react-three/drei`)**:
  - The Holographic AI Neural Core (`components/3d/AICoreScene.tsx`) and the 3D CyberBot Companion (`components/companion/RoamingCompanion3D.tsx`) are dynamically imported with `{ ssr: false }`.
  - All canvas computations run in isolated WebGL render loops using frame delta clamping (`useFrame((_, delta) => Math.min(delta, 0.1))`) to prevent frame skips during tab switching.
  - In Low-Bandwidth Mode, WebGL canvases are not mounted at all, replaced by the zero-JS CSS/SVG `StaticHeroFallback`.

### 2. Interactive AI Lab Sandbox
- **FitTrack Biomechanical Kinematics**:
  - Employs MediaPipe 33-point pose landmark estimation.
  - Video feeds are strictly processed in-browser via HTML5 Canvas; frames never leave the client device.
  - Trigonometric joint angle calculation (`θ = arccos((a·b) / (|a||b|))`) computes joint extensions in real-time under 45ms latency.
- **MarketMatch RFM Clustering**:
  - Client-side implementation of K-Means and DBSCAN clustering on normalized Recency, Frequency, and Monetary (RFM) feature vectors with 2D PCA projection scatter rendering.
- **RoleRadar ATS Scorer**:
  - Real-time token extraction and missing keyword detection evaluated against industry role vectors.

### 3. Edge Route & Serverless Handling
- Serverless routes (`app/api/contact/route.ts`) operate on Node.js/Edge runtimes.
- Built-in honeypot filters (`_gotcha`), IP sliding-window rate limiters, and payload length caps protect external email APIs.
