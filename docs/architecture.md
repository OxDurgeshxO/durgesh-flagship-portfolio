# System Architecture & Technical Design

## Architectural Overview

`durgesh-flagship-portfolio` is an enterprise-grade AI and full-stack engineering showcase built on **Next.js 14 (App Router)**, **React 18**, **TypeScript 5**, and **Tailwind CSS**. It is deployed globally on **Cloudflare Pages** via edge Anycast network distribution.

The application serves two core personas:
1. **Recruiters & Engineering Managers**: Sub-second access to verified credentials, ATS-ready resume downloads, and architectural summaries without heavy rendering overhead.
2. **Technical Reviewers & AI Engineers**: Interactive proof of client-side machine learning inference, real-time computer vision kinematics, and measurable performance telemetry.

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
|  - /cyberbot          |                           |  - /api/lab/*     |
|  - /resume            |                           +-------------------+
|  - /recruiter         |                                     |
|  - /work/[slug]       |                                     v
|  - /privacy           |                           +-------------------+
|  - /changelog         |                           | External Services |
|  - /github-health     |                           | - Resend API      |
|  - /performance       |                           | - GitHub REST API |
+-----------------------+                           +-------------------+
          |
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
|  | CyberBot 3D Companion Hub |   | Raycast Command Palette HUD       |  |
|  | - Procedural Three.js R3F |   | - Keyboard Search (Ctrl+K)        |  |
|  | - Semantic Knowledge Q&A  |   | - Route / Section Quick-Jump      |  |
|  | - Multi-Chassis Skins     |   |                                   |  |
|  | - Voice Synthesis & Rec   |   +-----------------------------------+  |
|  +---------------------------+                                          |
+-------------------------------------------------------------------------+
```

---

## CyberBot 3D Subsystem (V10)

The companion system runs procedural Three.js rendering via `@react-three/fiber` and `@react-three/drei`:
1. **Procedural Geometry**: Custom meshes (head, visor, antenna loops, chest arc reactor, ion jetpack thrusters) with zero external 3D asset download penalty.
2. **Kinematic Controller**: Look-at mouse tracking, idle bobbing, spring damping, acrobatic 360 ion flip stunt animations.
3. **Semantic Knowledge Base**: In-memory token scoring across 7 flagship domains with instant suggestions and direct URL action routing.
4. **Speech & Audio**: Web Speech Synthesis API abstraction with emoji-stripping, pitch modulation, voice detection, and user-gesture safety gates.
5. **Chassis Skin Engine**: 4 reactive palettes (`cobalt-prime`, `emerald-core`, `amethyst-void`, `solar-flare`) saved to `localStorage`.
