/**
 * Theme registry — single source of truth for the six selectable themes.
 *
 * Every theme is a DARK appearance. There is no light mode and no mode axis:
 * `color-scheme: dark` is unconditional in styles/theme.css and no [data-mode]
 * selector exists anywhere in the codebase.
 *
 * Cobalt Blueprint is the default. It is declared on `:root` in the stylesheet
 * (not behind an attribute), so the site renders correctly before JS runs, with
 * JS disabled, and for any unrecognised stored value.
 *
 * `swatch` holds raw hex on purpose: the picker must draw a faithful preview
 * chip for a theme the visitor has not activated, which is impossible from CSS
 * custom properties that only exist once that theme is applied.
 *
 * `contrastFloor` is the measured lowest passing ratio of that palette against
 * its card surface (WCAG 2.1). Every theme clears 3:1 for UI boundaries and
 * 4.5:1 for all text; the floor is always the control border.
 */

export type ThemeId = 'cobalt' | 'aurora' | 'graphite' | 'ember' | 'sage' | 'noir'

export interface ThemeMeta {
  id: ThemeId
  name: string
  tagline: string
  /** canvas, accent, ink — for the picker chip */
  swatch: [string, string, string]
  displayFont: string
  monoFont: string
  usesGradient: boolean
  contrastFloor: number
  notes: string[]
}

export const THEMES: readonly ThemeMeta[] = [
  {
    id: 'cobalt',
    name: 'Cobalt Blueprint',
    tagline: 'Schematic ink-navy, grid forward',
    swatch: ['#07131f', '#1d4ed8', '#e8f2fa'],
    displayFont: 'Space Grotesk',
    monoFont: 'IBM Plex Mono',
    usesGradient: true,
    contrastFloor: 3.66,
    notes: ['Blue/cyan distinctions collapse for deuteranopia — status always carries a label.'],
  },
  {
    id: 'aurora',
    name: 'Aurora Obsidian',
    tagline: 'Cinematic violet, the original brand',
    swatch: ['#0b0914', '#7e22ce', '#f4f1fa'],
    displayFont: 'Inter',
    monoFont: 'JetBrains Mono',
    usesGradient: true,
    contrastFloor: 3.27,
    notes: [],
  },
  {
    id: 'graphite',
    name: 'Graphite Ledger',
    tagline: 'Editorial, serif, single amber accent',
    swatch: ['#111214', '#e8a33d', '#f2f2f0'],
    displayFont: 'Newsreader',
    monoFont: 'IBM Plex Mono',
    usesGradient: false,
    contrastFloor: 3.28,
    notes: ['Amber is never used as small text on a mid-tone surface.'],
  },
  {
    id: 'ember',
    name: 'Ember Titanium',
    tagline: 'Warm industrial, matches the hero plate',
    swatch: ['#14100e', '#ff8a3d', '#f8f2ed'],
    displayFont: 'Instrument Sans',
    monoFont: 'JetBrains Mono',
    usesGradient: true,
    contrastFloor: 3.39,
    notes: ['Amber is never used as small text on a mid-tone surface.'],
  },
  {
    id: 'sage',
    name: 'Midnight Sage',
    tagline: 'Calm product engineering',
    swatch: ['#0c1411', '#2f9e73', '#eaf4ef'],
    displayFont: 'Inter',
    monoFont: 'JetBrains Mono',
    usesGradient: true,
    contrastFloor: 3.71,
    notes: ['Green status colours always pair with an icon or label.'],
  },
  {
    id: 'noir',
    name: 'Noir Gallery',
    tagline: 'Monochrome, one electric accent',
    swatch: ['#0a0a0a', '#ccff00', '#fafafa'],
    displayFont: 'Archivo',
    monoFont: 'IBM Plex Mono',
    usesGradient: false,
    contrastFloor: 3.43,
    notes: ['High-contrast extremes; disabled and placeholder states are explicitly designed.'],
  },
] as const

export const THEME_IDS: readonly ThemeId[] = THEMES.map((t) => t.id)

/** The theme the portfolio ships with, and the fallback for anything invalid. */
export const DEFAULT_THEME: ThemeId = 'cobalt'

export const THEME_STORAGE_KEY = 'portfolio-theme'

/**
 * Keys written by the earlier dual-mode build. Nothing reads them any more, so
 * the boot script deletes them to keep client state honest.
 */
export const OBSOLETE_STORAGE_KEYS: readonly string[] = ['portfolio-mode']

/** Left over from the very first build, which stored a MODE in the theme key. */
export const LEGACY_MODE_VALUES: readonly string[] = ['dark', 'light']

export function isThemeId(value: unknown): value is ThemeId {
  return typeof value === 'string' && (THEME_IDS as readonly string[]).includes(value)
}

export function getTheme(id: ThemeId): ThemeMeta {
  return THEMES.find((t) => t.id === id) ?? THEMES[0]
}
