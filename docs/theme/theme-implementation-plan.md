# Implementation Plan — Six Selectable Themes with Day/Night Modes

**Repository:** `OxDurgeshxO/durgesh-flagship-portfolio`
**Local working copy:** `durgesh-portfolio-v6/` — branch `v6` @ `b2b3310` (`feat(resume): remake ATS-friendly resume typography, contrast, and PDF asset`), working tree clean
**Status:** PLAN ONLY. **No source file has been modified.** Nothing in this document has been implemented.
**Related:** [`theme-options.md`](theme-options.md) (the six palettes + measured ratios) · [`theme-redesign-plan.md`](theme-redesign-plan.md) (full audit + defect list)

---

## 0. Scope of this document

The six theme directions were delivered as *palettes and specifications*. This document is the engineering plan for turning them into **six simultaneously available, manually selectable themes, each with a dark and a light mode** — without breaking the ten-route axe gate the repository already enforces.

The target state:

| Axis | Values | Count |
|---|---|---|
| Theme | Aurora Obsidian · Graphite Ledger · Cobalt Blueprint · Ember Titanium · Midnight Sage · Noir Gallery | 6 |
| Mode | dark · light | 2 |
| **Palettes to author and verify** | | **12** |

All 12 palettes are already contrast-verified (see §5.2 for the automated gate that keeps them that way).

---

## 1. Theme architecture and organization

### 1.1 Two orthogonal attributes on `<html>`

```
<html data-theme="ember" data-mode="dark" style="color-scheme: dark">
```

- `data-theme` selects the brand palette (6 values), `data-mode` selects day/night (2 values).
- Orthogonality is the core decision: a theme never contains mode logic, and a mode never contains brand logic. That gives 6 + 2 units of maintenance instead of 12, and it is what makes "add a seventh theme later" a single-file job.
- `color-scheme` is set in the same step so native form controls, scrollbars, autofill and the browser's own UI follow the mode.

### 1.2 File organization

```
styles/
  globals.css                 base, resets, a11y utilities, legacy --bg-primary aliases (kept)
  themes/
    contract.css              the required token contract (documentation + fallback defaults)
    aurora.css                [data-theme='aurora']            (dark values)
                              [data-theme='aurora'][data-mode='light']
    graphite.css
    cobalt.css
    ember.css
    sage.css
    noir.css
lib/
  themes/
    registry.ts               typed source of truth for the six themes (§1.3)
    provider.tsx              ThemeProvider context + DOM/localStorage sync (§2)
    resolve.ts                pure functions: resolveInitial(), isModeAllowed(), etc.
```

**Critical selector decision:** theme blocks are written as `[data-theme='x']`, **not** `:root[data-theme='x']`.

This is deliberate and load-bearing. It means a theme can be scoped to *any* element, which enables:

- the side-by-side comparison harness (`/theme-lab`, §5.3) where 12 palettes render on one page;
- an embedded `<iframe>`/panel preview of another theme without a document reload;
- Playwright visual-regression tiles that capture several themes in one screenshot.

Only the truly root-bound pieces (`color-scheme`, `::selection`, scrollbar theming, `theme-color`) are handled as root-only adjustments.

**Cascade safety.** `[data-theme='ember']` and `[data-theme='ember'][data-mode='light']` both select on the same element; the two-attribute selector has higher specificity, so light always wins inside a theme regardless of import order. Two different themes can never match the same element, so file order is irrelevant between themes. Import order in `app/layout.tsx` therefore needs no babysitting — a property worth preserving because it removes a whole class of "why is this colour wrong" bugs.

### 1.3 The theme registry (`lib/themes/registry.ts`)

A single typed source of truth, consumed by *everything* that needs to enumerate themes:

```ts
export type ThemeId = 'aurora' | 'graphite' | 'cobalt' | 'ember' | 'sage' | 'noir'
export type ModeId = 'dark' | 'light'

export interface ThemeMeta {
  id: ThemeId
  name: string                    // 'Ember Titanium'
  tagline: string                 // one line, shown in the picker
  lightLabel: string              // 'Sandstone' — the light mode's own name
  swatch: { dark: [string, string, string]; light: [string, string, string] }  // canvas, accent, ink
  usesGradient: boolean           // whether display text may use --gradient-*
  heroTreatment: 'bounded-panel' | 'contained' | 'native' | 'regraded' | 'monochrome'
  notes: string[]                 // theme-specific a11y caveats surfaced in the picker
}

export const THEMES: readonly ThemeMeta[] = [ /* six entries */ ]
export const DEFAULT_THEME: ThemeId = 'aurora'
export const DEFAULT_MODE: ModeId = 'dark'
export const THEME_IDS = THEMES.map(t => t.id)
```

Why a registry rather than six CSS files alone:

| Consumer | Uses the registry for |
|---|---|
| Picker UI (nav + panel) | labels, taglines, swatches — renders instantly, no CSS load, no JS colour guessing |
| `/theme-lab` gallery | tile enumeration |
| Contrast unit gate | which palettes must exist and be verified |
| Axe matrix | the parametrisation list |
| Visual regression | snapshot naming (`theme-mode-surface.png`) |
| Validation test | registry ↔ CSS parity (no orphan file, no missing file) |

Swatches live in the registry as raw hex on purpose: the picker must draw a faithful preview chip of a theme *the visitor has not activated*, which is impossible from CSS custom properties that only exist once that theme is applied.

### 1.4 Token contract

`_contract.css` declares every required token with a neutral fallback, and documents the contract. Each theme must redefine all of them for both modes. Two layers:

**Layer 1 — primitives (per theme, per mode):** raw values. Free-form; themes may differ structurally (Noir has no gradient ramp, Graphite has a single accent).

**Layer 2 — semantics (the only names components may use):**

```
Surface      --canvas  --card  --card-elevated  --muted  --accent-tint  --overlay-scrim
Text         --ink  --body  --muted-foreground  --ink-inverse
Brand        --primary  --primary-foreground  --secondary  --ring
             --gradient-start  --gradient-end
Structure    --border  --border-strong  --input  --radius-sm|md|lg
Depth        --shadow-1  --shadow-2  --shadow-3  --glow
Glass        --glass-bg  --glass-blur  --glass-border
Status       --accent-lab  --accent-work  --accent-signal  --accent-warm  --accent-critical
Hero         --hero-plate  --hero-scrim  --hero-guard  --hero-blend  --hero-ink
3D scene     --scene-emissive  --scene-light  --scene-ambient  --scene-accent-a  --scene-accent-b
Type         --font-display  --font-ui  --font-mono
Motion       --motion-fast  --motion-base  --motion-slow
```

Three rules, enforced by tests rather than convention:

1. Components reference **semantics only** — never a raw hex, never a `slate-*`/`white/*` utility.
2. Every token in the contract exists in **all six themes × both modes** (asserted at test time — a missing `--border-strong` would silently fall back to an invisible border, which is exactly defect D7 in the current code).
3. Theme-specific behaviour is expressed through tokens, not through component branches. `--glass-blur: 0px` is how Graphite says "no glass"; there is no `if (theme === 'graphite')` anywhere in a component.

### 1.5 What stays and what changes vs today

| Kept | Changed |
|---|---|
| Directory layout, section components, page structure | `tailwind.config.ts` token map gains the new semantic tokens; `cyan` mislabel fixed |
| `rgb(var(--x) / <alpha-value>)` bridge (correct already) | `styles/globals.css` splits its single `:root` into contract + six theme files |
| `a11y-*` classes, skip link, focus ring, print stylesheet | `a11y-high-contrast` re-pointed at the semantic layer (otherwise it silently no-ops) |
| Performance modes, GSAP/Framer motion vocabulary | Hardcoded dark utilities replaced with semantic utilities (§4.1) |
| All 10 routes and their content | `ThemeToggle` becomes a real control; nav gains a theme picker |
| Static export + Cloudflare deployment model | `app/manifest.ts` / `theme-color` become mode-aware |

---

## 2. Theme-switching mechanism and persistence

### 2.1 Resolution order

```
1. URL override  (?theme=ember&mode=light)   → preview only, does NOT persist
2. Stored choice (localStorage)              → the visitor's explicit selection
3. OS preference (prefers-color-scheme)      → mode only; theme falls back to default
4. Defaults (aurora / dark)
```

Two deliberate properties:

- **URL overrides never persist.** A shared preview link (`?theme=noir&mode=light`) must not hijack a visitor's saved preference. This is also how every evaluation screenshot in §6 will be generated.
- **We stop writing a preference on first visit.** Today `ThemeToggle.tsx:17` writes `localStorage.setItem('portfolio-theme','dark')` on mount, which permanently overrides the OS setting. That behaviour is removed, not ported.

### 2.2 Storage keys and migration

| Key | Value | Notes |
|---|---|---|
| `portfolio-theme` | `aurora` \| `graphite` \| `cobalt` \| `ember` \| `sage` \| `noir` | new meaning: a theme id |
| `portfolio-mode` | `dark` \| `light` | new key |

**Migration is required, not optional.** The existing key `portfolio-theme` already exists in the wild and holds `"dark"` — a *mode* value, not a theme id. On boot:

```
read portfolio-theme
  if value ∈ {'dark','light'}  → treat as legacy MODE, write it to portfolio-mode,
                                 delete portfolio-theme, continue
  if value ∈ THEME_IDS         → treat as theme id
  otherwise                    → ignore (corrupt/unknown)
```

Without this, returning visitors would boot with an unrecognised `data-theme` and fall through to the contract defaults. All storage access stays wrapped in try/catch (the codebase already does this for private-browsing/blocked-storage cases).

### 2.3 Anti-FOUC boot script

A small blocking inline script in `<head>`, before any stylesheet that paints, sets both attributes plus `color-scheme`. It must be synchronous and parser-blocking — a deferred or `async` script reintroduces the flash.

```
try {
  // migration + resolution order from §2.1
  document.documentElement.dataset.theme = theme
  document.documentElement.dataset.mode  = mode
  document.documentElement.style.colorScheme = mode
} catch (e) {}
```

**CSP:** verified in `public/_headers:7` — `script-src 'self' 'unsafe-inline' https://cdn.jsdelivr.net` — so this works with **no header change**. A hash-based allowance (`'sha256-…'` alongside `'self'`) is the cleaner end state and is a small follow-up, not a blocker. The script is exercised by a JS-disabled test (§5.6).

### 2.4 React layer

`ThemeProvider` (client component, mounted once in `PortfolioShell`):

- Reads initial state from `document.documentElement.dataset` — never from `localStorage` directly during render, which would cause a hydration mismatch. `suppressHydrationWarning` on `<html>` is already present.
- Exposes `{ theme, mode, setTheme, setMode, toggleMode }` plus `themes` from the registry.
- Writes attributes + storage, then dispatches a custom browser event (`theme-change`, detail `{theme, mode}`) for non-React consumers.
- Mirrors the existing `performance-mode-change` pattern — the 3D scenes, GSAP timelines and the Cyber Ronin spotlight layer already listen that way, so no new mechanism is invented.
- Cross-tab sync via the `storage` event.
- Applies `.theme-transitioning` for ~400 ms during a switch (§3.4).

### 2.5 Manual selection surfaces (four, one shared state)

| Surface | Interaction | Why |
|---|---|---|
| Nav control | compact icon button → popover with a mode switch (`role="switch"`) and a 6-item theme radio-list | primary path, visible on every route |
| `Alt + A` accessibility panel | theme + mode rows added beside reduced-motion / contrast / text size | the natural home for display preferences; already a focus-trapped dialog |
| `Ctrl/Cmd + K` command palette | "Theme: Ember Titanium", "Toggle light mode" entries | power-user path; palette already exists |
| URL params `?theme=&mode=` | read-only override | shareable previews and screenshot automation (§6) |

All four read and write the same provider state, so the active theme is always consistent across surfaces.

### 2.6 Toggle semantics and announcements

- Mode control = `role="switch"` with `aria-checked`, or a `<button aria-pressed>`; accessible name states the **action** ("Switch to light theme"), not the state.
- Theme picker = a radiogroup (`role="radiogroup"` + `role="radio"` with `aria-checked`), arrow-key navigation, `Home`/`End` support, Escape closes and restores focus to the trigger.
- Every change is announced through a polite live region: *"Light mode, Ember Titanium."* The tooltip that currently explains the toggle is retained but is never the only affordance.

---

## 3. Day/night behaviour within each theme

### 3.1 Mode is a token override, never a component branch

Each theme file contains exactly two blocks: the dark values and the light values. No component ever asks "am I in light mode?" — it asks for `--card` and gets the right answer. This is the same discipline as §1.4 rule 3, and it is why 12 palettes do not mean 12× the conditional logic.

### 3.2 What changes between modes, and what does not

| Changes with mode | Does not change |
|---|---|
| Canvas, surface, ink and border lightness | Brand hue and its *meaning* (violet/amber/cobalt/etc. signal the same roles) |
| Depth strategy: neon glow (dark) ⇄ soft shadow + hairline (light) | Layout, section order, spacing scale, radii |
| Glass parameters (`--glass-bg`, `--glass-blur`, `--glass-border`) | Component anatomy and interaction model |
| Gradient endpoints (darkened to AA in light) | Motion vocabulary and durations |
| Hero photographic treatment and `.ronin-guard` legibility scrim | Content and information hierarchy |
| Scrollbar, `::selection`, `theme-color`, `color-scheme` | Print stylesheet and the `/resume` paper surface (see §3.5) |
| 3D scene lighting rig (emissive/light intensities, canvas backdrop) | The scene's geometry, animation and interaction |

### 3.3 Per-theme hero and 3D treatment

This is the highest-effort, highest-judgement part of the work, because the existing WebGL rig is tuned against `#0b0914` and the Cyber Ronin plate is warm amber photography with hand-derived scrims. Each theme declares its treatment in the registry (`heroTreatment`), and each is implemented through hero/scene tokens rather than component branches:

| Theme | 3D neural core in light mode | Hero plate |
|---|---|---|
| Aurora Obsidian | WebGL canvas kept as a **bounded dark panel** inside the light layout — preserves the tuned rig, reads as an intentional "viewport" motif | treated reuse: reduced opacity + re-derived guard |
| Graphite Ledger | contained panel, desaturated; core de-emphasised in favour of type | monochrome treatment or dropped for a typographic hero |
| Cobalt Blueprint | **native** — the scene reads as an instrument on this palette; light-mode rig needs only ambient lift | keep, re-grade scrim to a cool tint, promote the blueprint grid |
| Ember Titanium | kept; emissive shifted toward the ember ramp | **strongest fit** — existing plate and amber spotlight become the brand; likely only a scrim re-grade |
| Midnight Sage | tuned **down** (lower emissive, fewer particles) to match the restrained tone | cool-graded, lower contrast |
| Noir Gallery | rendered **monochrome**, accent used only for the active interaction state | high-contrast black-and-white treatment |

Scene values are exposed as CSS variables (`--scene-*`) and read by the R3F components through a small subscription to `theme-change`, so a theme switch re-lights the scene without a remount. If a theme cannot be made to look right cheaply, the fallback is the existing `StaticHeroFallback` path — which already exists and is already wired to the `WebGL error boundary`.

### 3.4 Mode-switch transition

- Transition only: `background-color`, `color`, `border-color`, `box-shadow`, `fill` — over `--motion-base`.
- **Never transition** `backdrop-filter`, `filter` or gradients: they repaint per frame on mobile Safari and make the switch stutter. Glass panels cross-fade their two states instead.
- Apply `.theme-transitioning` for ~400 ms to suppress hover transforms and entrance animations, so the switch reads as one deliberate event.
- Under `prefers-reduced-motion: reduce` or `a11y-reduced-motion`, the switch is instant (no transition, no suppression window).
- Optional upgrade, explicitly gated: a View-Transitions radial reveal originating at the toggle, feature-detected and skipped under reduced motion. The instant cross-fade is the default path, not the fallback.

### 3.5 Mode-invariant zones (where "always light" or "always dark" is correct)

1. **`/resume` paper card** — stays light in both modes. It is an ATS artefact; a dark resume is a worse resume.
2. **Print stylesheet** — unchanged, already light-only by design in `styles/resume.css`.
3. **Brand fills** — `text-white` on a filled brand button remains correct in both modes; the fill carries the contrast (this is the case that must survive the codemod in §4.1).
4. **Third-party brand colours** — LinkedIn `#0A66C2`, GitHub marks: not themable.
5. **Status semantics** — the `--accent-*` roles keep their meaning across modes, but each mode uses its own lightness step (dark: 300–400 step, light: 700 step).
6. **Open decision — social/OG image:** recommend the OG image stays dark-branded always (social cards are viewed on mixed backgrounds and a dark card is the stronger thumbnail). Flagged in §7.

---

## 4. Responsive and accessible UI

### 4.1 The hardcoded-utility migration (the bulk of the work)

The reason a light mode cannot be produced by swapping tokens alone: `text-white` ×160, `border-white/*` ×171, `bg-white/*` ×129, `text-slate-400` ×130, `bg-slate-950/*` ×16, `bg-slate-900/*` ×7. The migration is a scoped codemod with a dry-run diff, reviewed **per route**, using this mapping:

| Legacy | Semantic | Rule |
|---|---|---|
| `text-white` | `text-ink` on surfaces; **left alone on brand fills** | classify by parent context — ~20–25% are legitimate |
| `text-slate-400` / `text-slate-500` | `text-muted-foreground` | fixes the 4.15:1 / 3.87:1 defect |
| `text-slate-300` | `text-body` | |
| `border-white/10` `/5` | `border-border` | decorative hairline |
| `border-white/20`+ on controls | `border-border-strong` | 3:1 UI boundary |
| `bg-white/5` `/10` | `bg-muted` / `bg-accent-tint` | **not** inverted to `bg-black/5` — that is what the tokens express |
| `bg-slate-950/*` `bg-slate-900/*` | `bg-card` / `bg-canvas` | |
| `bg-slate-800` `border-slate-700` (`kbd`) | `bg-muted border-border-strong` | |

Each hit gets one of three dispositions: **token-map** (most), **mode-branch** (rare — hero plate only), **mode-invariant** (brand fills, LinkedIn blue, status colours).

### 4.2 Responsive behaviour

| Viewport | Theme/mode control |
|---|---|
| < 768 px | compact icon trigger in the mobile header (beside search + a11y, matching the existing pattern) → full-width bottom sheet with 6 theme rows + mode switch; the nav drawer already establishes this idiom |
| 768–1023 px | icon trigger → anchored popover |
| ≥ 1024 px | inline segmented mode switch + theme popover in the desktop nav |

Constraints applied to every breakpoint:

- Tap targets ≥ 44 × 44 px (WCAG 2.5.5 / 2.5.8), including the swatch chips.
- The picker must never cause the nav to wrap into two rows; it is a popover, not a 6-item inline list.
- No horizontal overflow at 320 px; the swatch row reflows rather than scrolls.
- Type scale, spacing and radii are mode- and theme-invariant, so a theme change can never reflow the page (no CLS).
- The hero's `--hero-*` tokens must be verified at 3 viewport widths, because the spotlight's `--ronin-x/y` defaults place the bright region behind the headline at some widths.

### 4.3 Accessibility requirements (acceptance criteria)

1. **Both modes of all six themes pass axe `wcag2a` + `wcag2aa`** with `color-contrast` enabled (§5.3 for the runtime strategy).
2. **Contrast floors hold in all 12 palettes**: text ≥ 4.5:1, UI boundaries ≥ 3:1, gradient display text ≥ 4.5:1 at every point on the ramp. All 12 are already verified; the gate (§5.2) keeps them that way.
3. **The four-state matrix is covered**: theme × mode × (contrast-normal / `a11y-high-contrast`). `a11y-high-contrast` currently redefines only the legacy `--*` primitives (`globals.css:250-260`), so it must be re-pointed at the semantic layer or it silently stops working in one or both modes.
4. **Reduced motion** fully honoured: mode switch instant, entrance animations skipped, orbs static, View-Transitions skipped.
5. **Focus management**: popover and sheet trap focus, restore on close (the a11y panel already implements this — reuse the pattern), visible `:focus-visible` ring at ≥ 3:1 against every theme's surfaces.
6. **Colour is never the only signal**: every `--accent-*` status usage carries an icon or text label.
7. **Per-theme risk register** (from the theme specs) is checked per theme, not globally:
   - Cobalt: blue/cyan distinctions collapse for deuteranopia — labels mandatory.
   - Noir: `#0a0a0a` on `#ffffff` and chartreuse both risk halation; disabled/placeholder states need explicit design.
   - Graphite: amber must use the darkened `#8a5200` for small text.
   - Ember: amber never on a mid-tone surface.
   - Sage: green status needs icon + text.
   - Aurora: glass translucency over the hero needs the legibility guard re-verified per mode.
8. **Zoom and text scaling**: 200% browser zoom and `a11y-larger-text` (115% root) must not clip `kbd` chips, nav pills or swatch labels.
9. **Forced colors / `prefers-contrast: more`** degrade gracefully — decorative hero layers drop, content stays visible (the high-contrast pattern in `cyber-ronin.css:249-258` is the precedent).
10. **No flash, no shift**: `data-theme`/`data-mode` are correct at first paint with JS disabled, and the switch produces zero CLS.

---

## 5. Testing and comparison strategy

Five layers, cheapest and most deterministic first. The point of the ordering: the expensive browser matrix only ever tests things the cheap gates cannot.

### 5.1 Token contract test — `tests/theme-contract.test.mjs` (new)

Parses `lib/themes/registry.ts` and `styles/themes/*.css` and asserts:

- every theme in the registry has a CSS file, and every CSS file is in the registry (no orphans);
- every theme defines **every required contract token** in **both** modes (this is the check that catches an invisible `--border-strong` fallback);
- no raw hex appears in a theme file outside its primitives block;
- no component file contains a hardcoded `slate-*`/`white/*` surface utility any more (guards the codemod against regression).

### 5.2 Contrast unit gate — `tests/theme-contrast.test.mjs` (new)

The shipped version of the scripts already written for this audit: resolve the semantic pairs per theme/mode straight from the CSS and assert the floors (§4.3.2), **including a full gradient ramp sweep** rather than a midpoint check. Runs in milliseconds, needs no browser, and fails loudly on any palette edit that drops below AA. This is the single highest-value test in the plan.

### 5.3 Axe matrix — extends `tests/e2e/a11y.spec.ts`

Currently 10 routes in one theme. Target matrix: **6 themes × 2 modes × 10 routes = 120 runs**, plus a high-contrast cross-product on 2 representative routes.

Runtime is the real constraint (~4 s/run ⇒ ≈ 8 min serial). Strategy:

| Trigger | Scope |
|---|---|
| Every PR | smoke subset: 3 routes (`/`, `/resume`, `/lab`) × 12 combos + high-contrast on those 3 |
| Nightly / `THEME_MATRIX=full` | all 120 + contrast cross-product |
| Pre-release | full matrix on both desktop and mobile projects |

Themes are applied the way the app applies them (`data-theme`/`data-mode` via `addInitScript`, or the `?theme=&mode=` override), with the transition window awaited before scanning so contrast is measured on the settled state — the existing spec already does the equivalent wait for the intro loader.

### 5.4 Visual regression — Playwright snapshots (new)

12 combos × 4 surfaces (hero, nav-scrolled, card grid, command palette) × 2 viewports (1440, 375). Baselines committed; `--update-snapshots` gated behind manual approval. This is what catches the failures unit tests cannot see: a light-mode glass panel that looks chalky, a glow that reads as a blur artefact, a border that vanishes.

### 5.5 Comparison harness — `/theme-lab` (new route, dev-focused)

One page rendering the same representative section block **12 times**, each wrapper carrying its own `data-theme`/`data-mode`, so a reviewer can compare all palettes without switching. This is the only reason §1.2's element-scoped selectors matter, and it doubles as the screenshot source for the contact sheets in §6. Recommendation: ship it to production behind the existing secondary-route pattern (like `/performance`), or exclude it from the sitemap if you prefer it dev-only — flagged in §7.

### 5.6 Behavioural tests (new, targeted)

- **FOUC test:** JS disabled → `data-theme`/`data-mode` already set on `<html>` at first paint (proves the boot script is blocking and in `<head>`).
- **Persistence + migration:** seed `portfolio-theme = "dark"` (the legacy value) → assert it is migrated to `portfolio-mode` and the theme falls back to default.
- **URL override does not persist:** visit `?theme=noir&mode=light`, assert storage is untouched.
- **Cross-tab sync:** two contexts, change theme in one, assert the other updates.
- **Zero CLS on switch:** assert no layout shift across a mode toggle on `/` and `/resume`.
- **Keyboard-only traversal** of the picker: arrow keys, Home/End, Escape, focus restoration.

### 5.7 Performance

- CSS budget: all six theme files together stay under a small gzipped ceiling (they are token blocks, not rules, so this is comfortable) — asserted in CI.
- No additional JS beyond the provider + picker (the registry is static data).
- Backdrop-filter cost re-measured per theme in light mode on a mid-range Android profile, since light glass over a bright canvas is the risky combination.
- Lighthouse in 2 representative modes (not all 12) on `/` and `/resume`.

---

## 6. How local previews will be presented for evaluation

Every preview is a **real rendered build**, not a mockup, and every artefact is clearly labelled `current-` vs `proposed-`. Nothing labelled `proposed-` will exist until you approve implementation.

| # | Artefact | What it is | When |
|---|---|---|---|
| 1 | `current-v6-*.png` | screenshots of the **current** v6 application from a local static build served at `127.0.0.1:3000` — desktop + mobile, homepage and one secondary route, dark only | **immediately on dependency install completion** (baseline, in progress) |
| 2 | `current-v6-vs-proposed-<theme>.png` | before/after pairs at identical viewport and scroll position: current v6 beside each theme in the same mode | after implementation |
| 3 | `proposed-<theme>-<mode>-<surface>.png` | one labelled tile per combination and surface (hero, nav, cards, forms) | after implementation |
| 4 | `contact-sheet-<surface>.png` | a single PNG grid of all 12 palettes for one surface, each tile captioned with theme, mode and its measured contrast floor — so all combinations can be reviewed at a glance in one image | after implementation |
| 5 | `/theme-lab` | interactive side-by-side gallery route, all 12 palettes on one page | after implementation |
| 6 | `npm run dev` on `127.0.0.1:3000` | live review of hover/focus/toggle/reduced-motion behaviour, which screenshots cannot convey | after implementation |

**Generation method:** a Playwright script that iterates the registry and captures each combination via the `?theme=&mode=` override — no per-theme manual screenshotting, and the same script produces the contact sheets. Artefacts are written **outside the source tree** (a gitignored `previews/` folder or the workspace directory) so previews never appear in a source diff.

**Distinguishing real from proposed** is enforced by three conventions: filename prefix, a caption burned into every screenshot metadata sidecar, and the rule that no `proposed-*` artefact is generated before approval.

---

## 7. Phasing, risks, and decisions needed

### Phase plan

| Phase | Work | Est. |
|---|---|---|
| 0 | Clone v6, baseline previews, this plan | this turn |
| 1 | Token contract, registry, `data-theme`/`data-mode` plumbing, boot script, `ThemeProvider`, storage migration, contract + contrast tests | 1.5–2 d |
| 2 | Author the six theme CSS files (12 palettes) + `/theme-lab` harness | 2–3 d |
| 3 | Utility codemod + per-section migration to semantic tokens (the volume work) | 3–5 d |
| 4 | Per-theme hero / 3D / plate treatments (the risk centre) | 3–5 d |
| 5 | Picker UI (nav, a11y panel, command palette), axe matrix, visual regression, docs + ADR | 2–3 d |

Total **≈ 12–18 engineer-days**. Phases 1–3 are mechanical and reversible; phase 4 is where design judgement and the real cost live. Nothing ships without phase 5.

### Risks

1. **3D re-lighting is the cost centre.** Six themes × light-mode scene tuning can absorb the whole budget. Mitigation: the bounded-dark-panel treatment (Aurora) as the default, `StaticHeroFallback` as the escape hatch, and treating per-theme scene work as progressive rather than a launch blocker.
2. **Codemod risk.** A naive `text-white` → `text-ink` replace breaks brand-fill buttons. Mitigation: context classification + dry-run diff reviewed per route (§4.1).
3. **Six themes is a maintenance surface.** Mitigation: the registry as single source of truth, the contract test, and the rule that components contain zero theme branches.
4. **Expensive a11y matrix.** 120 axe runs cannot be a per-PR gate. Mitigation: smoke subset per PR, full matrix nightly (§5.3).
5. **Cross-theme a11y regressions are subtle** — e.g. cobalt's blue/cyan collapse. Mitigation: per-theme risk register checked explicitly, not implied by "all themes pass axe".
6. **Scope pressure toward a rebrand.** These six are *palette* options on one architecture. Changing the architecture per theme would multiply everything by six; the token contract exists specifically to prevent that.

### Decisions needed before Phase 1 begins

| # | Decision | Recommendation |
|---|---|---|
| 1 | Default theme + mode for a first-time visitor | `aurora` + follow OS preference, fall back to dark; write nothing on first visit |
| 2 | Is "Match system" a third toggle state, or an initial-only behaviour? | Initial-only behaviour; a "Match system" row lives in the accessibility panel |
| 3 | Do all six themes ship together, or progressively (e.g. Aurora first, then the rest)? | Architecture for six, ship Aurora + whichever light mode you prefer first, add the rest behind the same registry |
| 4 | `/theme-lab` in production, or dev-only? | Production behind the secondary-route pattern, excluded from the sitemap |
| 5 | Per-theme hero treatment: buy the full per-theme 3D tune, or ship the bounded-dark-panel default everywhere initially? | Bounded-dark-panel default for all six initially; upgrade Cobalt/Ember/Noir scene treatments after review |
| 6 | OG/social image in light mode | Keep the dark OG card for all themes |
| 7 | Reuse `portfolio-theme` as the theme key, or introduce `portfolio-theme` + `portfolio-mode` with a one-time migration? | New two-key scheme with migration (§2.2) |

---

## 8. Approval gate

No source file has been modified. The working copy at `durgesh-portfolio-v6/` is a clean checkout of `v6` @ `b2b3310`; dependency installation and a local static build are the only operations performed, and both are excluded from the source tree.

> **Awaiting your approval to begin Phase 1 (token architecture + theme plumbing + contract/contrast tests). Please confirm, or tell me which of the seven decisions in §7 you want changed first.**
