# Theme System — Design Record & Trial Plan

This folder is the working record of the portfolio's theme system and trials.

## Current State

The portfolio implements **10 theme trials, each a dark appearance only**, displayed in one unified selection panel.
**Neural Signal** is the recommended default direction.

```css
/* styles/theme.css — the entire theme layer */
:root                         { color-scheme: dark; /* status + chart + Neural Signal palette (default) */ }
[data-theme='neural-signal']   { /* … */ }
[data-theme='quantum-indigo']  { /* … */ }
[data-theme='solar-forge']     { /* … */ }
[data-theme='obsidian-emerald']{ /* … */ }
[data-theme='cyber-violet']    { /* … */ }
[data-theme='terminal-lime']   { /* … */ }
[data-theme='arctic-steel']    { /* … */ }
[data-theme='carbon-rose']     { /* … */ }
[data-theme='deep-ocean']      { /* … */ }
[data-theme='monolith']        { /* … */ }
body                           { /* base font tokens */ }
```

There is **no light mode**. `color-scheme: dark` is unconditional and no `[data-mode]` selector exists anywhere in the codebase.

## 10 Theme Trials

| Theme | Identity | Display Font | Mono Font | Primary Accent |
|---|---|---|---|---|
| **Neural Signal** | Technical AI command-center | Space Grotesk | JetBrains Mono | `#5EEAD4` (Teal) |
| **Quantum Indigo** | Premium AI systems | Space Grotesk | JetBrains Mono | `#818CF8` (Indigo) |
| **Solar Forge** | Warm industrial energy | Instrument Sans | JetBrains Mono | `#FF9F45` (Amber-orange) |
| **Obsidian Emerald** | Premium engineering | Inter | IBM Plex Mono | `#34D399` (Emerald) |
| **Cyber Violet** | Immersive AI lab | Space Grotesk | JetBrains Mono | `#A78BFA` (Violet) |
| **Terminal Lime** | Developer-native terminal | Archivo | IBM Plex Mono | `#A3E635` (Lime) |
| **Arctic Steel** | Clean professional corporate | Inter | IBM Plex Mono | `#7DD3FC` (Ice blue) |
| **Carbon Rose** | Modern creative elegance | Inter | JetBrains Mono | `#FB7185` (Rose) |
| **Deep Ocean** | Refined immersive 3D | Space Grotesk | JetBrains Mono | `#22D3EE` (Aqua) |
| **Monolith** | Minimal brutalist gallery | Archivo | IBM Plex Mono | `#FACC15` (Yellow) |

## Switcher UI Panel

The theme selection panel in `components/ThemeControl.tsx` matches the trial-plan layout:
- Top header: `THEME` (left) and `dark appearances only` (right)
- 3-dot color previews `[canvas, accent, ink]`
- Theme title and descriptive tagline with display font
- Active outline pill with checkmark icon
- Unified scrollable panel containing all 10 theme options
