/**
 * Theme registry — single source of truth for the 10 theme trials.
 *
 * Every theme is a DARK appearance. There is no light mode and no mode axis:
 * `color-scheme: dark` is unconditional in styles/theme.css and no [data-mode]
 * selector exists anywhere in the codebase.
 *
 * Neural Signal is the recommended default. It is declared on `:root` in the stylesheet
 * (not behind an attribute), so the site renders correctly before JS runs, with
 * JS disabled, and for any unrecognised stored value.
 *
 * `swatch` holds raw hex: [canvas, primary_accent, ink] for the 3-dot preview chip.
 */

export type ThemeId =
  | 'neural-signal'
  | 'quantum-indigo'
  | 'solar-forge'
  | 'obsidian-emerald'
  | 'cyber-violet'
  | 'terminal-lime'
  | 'arctic-steel'
  | 'carbon-rose'
  | 'deep-ocean'
  | 'monolith'

export interface ThemeMeta {
  id: ThemeId
  name: string
  tagline: string
  /** canvas, primary_accent, ink — for the 3-dot preview chip */
  swatch: [string, string, string]
  displayFont: string
  monoFont: string
  usesGradient: boolean
  contrastFloor: number
  notes: string[]
}

export const THEMES: readonly ThemeMeta[] = [
  {
    id: 'neural-signal',
    name: 'Neural Signal',
    tagline: 'Technical AI command-center identity',
    swatch: ['#08090c', '#5eead4', '#f2f5f7'],
    displayFont: 'Space Grotesk',
    monoFont: 'JetBrains Mono',
    usesGradient: true,
    contrastFloor: 3.5,
    notes: ['Recommended default direction; electric teal/mint signal with cool cyan support.'],
  },
  {
    id: 'quantum-indigo',
    name: 'Quantum Indigo',
    tagline: 'Premium AI systems identity',
    swatch: ['#070a16', '#818cf8', '#eef2ff'],
    displayFont: 'Space Grotesk',
    monoFont: 'JetBrains Mono',
    usesGradient: true,
    contrastFloor: 3.5,
    notes: ['Deep indigo surfaces with violet-blue accents.'],
  },
  {
    id: 'solar-forge',
    name: 'Solar Forge',
    tagline: 'Warm industrial energy',
    swatch: ['#0d0b09', '#ff9f45', '#fdf6ec'],
    displayFont: 'Instrument Sans',
    monoFont: 'JetBrains Mono',
    usesGradient: true,
    contrastFloor: 3.5,
    notes: ['Warm industrial charcoal surfaces with amber-orange accents.'],
  },
  {
    id: 'obsidian-emerald',
    name: 'Obsidian Emerald',
    tagline: 'Premium engineering identity',
    swatch: ['#070d0b', '#34d399', '#eafaf1'],
    displayFont: 'Inter',
    monoFont: 'IBM Plex Mono',
    usesGradient: true,
    contrastFloor: 3.5,
    notes: ['Green-black surfaces and emerald accents.'],
  },
  {
    id: 'cyber-violet',
    name: 'Cyber Violet',
    tagline: 'Immersive AI lab identity',
    swatch: ['#0a0714', '#a78bfa', '#f5f2ff'],
    displayFont: 'Space Grotesk',
    monoFont: 'JetBrains Mono',
    usesGradient: true,
    contrastFloor: 3.5,
    notes: ['Futuristic identity built around violet and magenta accents.'],
  },
  {
    id: 'terminal-lime',
    name: 'Terminal Lime',
    tagline: 'Developer-native terminal identity',
    swatch: ['#070807', '#a3e635', '#f4fee9'],
    displayFont: 'Archivo',
    monoFont: 'IBM Plex Mono',
    usesGradient: true,
    contrastFloor: 3.5,
    notes: ['Near-black surfaces and lime-green accents.'],
  },
  {
    id: 'arctic-steel',
    name: 'Arctic Steel',
    tagline: 'Clean professional identity',
    swatch: ['#0a0f14', '#7dd3fc', '#eef6fb'],
    displayFont: 'Inter',
    monoFont: 'IBM Plex Mono',
    usesGradient: true,
    contrastFloor: 3.5,
    notes: ['Dark blue-gray surfaces and ice-blue accents.'],
  },
  {
    id: 'carbon-rose',
    name: 'Carbon Rose',
    tagline: 'Modern creative identity',
    swatch: ['#0b0a0d', '#fb7185', '#fdf2f6'],
    displayFont: 'Inter',
    monoFont: 'JetBrains Mono',
    usesGradient: true,
    contrastFloor: 3.5,
    notes: ['Charcoal surfaces and rose accents.'],
  },
  {
    id: 'deep-ocean',
    name: 'Deep Ocean',
    tagline: 'Refined immersive 3D identity',
    swatch: ['#050b12', '#22d3ee', '#e9f6fd'],
    displayFont: 'Space Grotesk',
    monoFont: 'JetBrains Mono',
    usesGradient: true,
    contrastFloor: 3.5,
    notes: ['Deep navy-black surfaces and aqua accents.'],
  },
  {
    id: 'monolith',
    name: 'Monolith',
    tagline: 'Minimal brutalist gallery identity',
    swatch: ['#060606', '#facc15', '#fafafa'],
    displayFont: 'Archivo',
    monoFont: 'IBM Plex Mono',
    usesGradient: false,
    contrastFloor: 3.5,
    notes: ['Pure near-black surfaces, white text, and electric yellow accent.'],
  },
] as const

export const THEME_IDS: readonly ThemeId[] = THEMES.map((t) => t.id)

/** The theme the portfolio ships with, and the fallback for anything invalid. */
export const DEFAULT_THEME: ThemeId = 'neural-signal'

export const THEME_STORAGE_KEY = 'portfolio-theme'

/**
 * Keys written by earlier builds or legacy mode keys.
 */
export const OBSOLETE_STORAGE_KEYS: readonly string[] = [
  'portfolio-mode',
]

/** Legacy theme IDs that should be discarded if present in storage. */
export const LEGACY_THEME_VALUES: readonly string[] = [
  'cobalt',
  'aurora',
  'graphite',
  'ember',
  'sage',
  'noir',
  'dark',
  'light',
]

export function isThemeId(value: unknown): value is ThemeId {
  return typeof value === 'string' && (THEME_IDS as readonly string[]).includes(value)
}

export function getTheme(id: ThemeId): ThemeMeta {
  return THEMES.find((t) => t.id === id) ?? THEMES[0]
}
