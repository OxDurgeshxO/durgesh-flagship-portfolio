# Modern Craft Design Tokens & Anti-Slop Guidelines

**Governing Skills**: `taste-skill`, `ui-motion-primitives`, `awesome-design-md`  
**Targets**: `durgesh-portfolio-2026`, `GYM-PROJ-TRIAL-1`

## Typography Rhythms (Anti-Slop)
- **Primary Display**: Inter Variable or Geist Sans with deliberate tracking (`tracking-tight` for headings, `leading-relaxed` for prose).
- **Code & Metrics**: JetBrains Mono or Fira Code (`font-mono text-xs`).
- **Hierarchy Standard**:
  - Hero Header: `text-5xl font-semibold tracking-tight md:text-7xl`
  - Section Header: `text-2xl font-medium tracking-tight md:text-3xl`
  - Body: `text-sm text-zinc-400 leading-relaxed font-normal`

## Color Palette Tokens
- **Background Base**: `#09090b` (Deep Obsidian Zinc-950)
- **Card Surface**: `rgba(255, 255, 255, 0.03)` with `backdrop-blur-2xl`
- **Border Default**: `rgba(255, 255, 255, 0.08)`
- **Border Hover**: `rgba(255, 255, 255, 0.18)`
- **Accents**:
  - Cyan: `#06b6d4` (Tech telemetry, active connection)
  - Violet: `#8b5cf6` (AI synthesis, models)
  - Emerald: `#10b981` (Nominal status, nominal health)

## Spring Motion Physics
- **Hover Transitions**: `stiffness: 150, damping: 20`
- **Modal / Overlay Transitions**: `stiffness: 300, damping: 30`
- **Orb Ambient Breathing**: `duration: 3s, ease: easeInOut, repeat: Infinity`
