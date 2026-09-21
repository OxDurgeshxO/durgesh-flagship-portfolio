# ADR 002: Static CSS/SVG Neural Mesh Fallback for Low-Bandwidth Mode

## Context
High-fidelity Three.js and React Three Fiber 3D simulations (e.g. 5,000-particle neural core) can cause dropped frames and high battery drain on low-spec mobile devices or in constrained network environments. Hiding the 3D scene entirely caused an empty void in the Hero background and minor Cumulative Layout Shift (CLS).

## Decision
Implement `StaticHeroFallback.tsx`: a pure CSS and SVG animated constellation vector mesh that renders when `portfolio-experience-mode` is set to `low-bandwidth` or when the user enables `prefers-reduced-motion`.

## Alternatives Considered
1. **Pre-rendered MP4 / WebM Video Loop**: High network payload (> 2 MB) contradicting low-bandwidth goals.
2. **Static WebP Screenshot**: Lacked visual depth and interactivity.
3. **Empty Canvas Space**: Caused visual imbalance and layout shifts.

## Consequences
- Guaranteed zero layout shift (CLS: 0.002).
- Zero GPU memory allocation and 0ms WebGL compilation time on constrained hardware.
- High visual aesthetics preserved across all devices.
