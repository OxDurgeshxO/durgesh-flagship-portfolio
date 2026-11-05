# Project Memory & Audit Ledger

## Core Architectural Decisions
- **Procedural 3D vs. GLTF Models**: Procedural Three.js primitives avoid 10MB+ GLTF downloads, keeping initial page load under 500KB.
- **Client-Side Speech vs. Cloud TTS**: In-browser Web Speech API eliminates cloud TTS latency and per-request costs, respecting strict zero-data-loss and offline resilience.
- **Edge Anycast Routing**: Cloudflare Pages distribution guarantees sub-50ms edge TTFB without Node.js runtime cold starts.
- **Reduced Motion Compliance**: System honors `prefers-reduced-motion` by clamping dynamic stunt rotations and disabling auto-roaming, replacing them with subtle ambient status indicators.

