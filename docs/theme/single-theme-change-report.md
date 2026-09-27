> **SUPERSEDED (2026-09-25).** The single fixed theme described below has been replaced by a
> restored theme switcher: all six themes are selectable again, each still a DARK appearance
> only, with Cobalt Blueprint remaining the default. See `theme-switcher-restored.md`.
> Light mode remains removed. The record below stays accurate as history.

# Single-Theme Migration — Cobalt Blueprint, Dark Only

**Repository:** `OxDurgeshxO/durgesh-flagship-portfolio` (local working copy only)
**Local copy:** `durgesh-portfolio-v6/` · branch `v6` @ `b2b3310`
**Status:** applied, rebuilt, verified. **No GitHub interaction. Nothing committed or pushed.**
**Supersedes:** the six-theme / dual-mode implementation described in `theme-implementation-report.md`.

---

## 1. What was asked, and what was assumed

You asked to make the currently approved theme the default and remove light-mode support entirely.

**The theme used: Cobalt Blueprint.** The screenshot you attached showed Cobalt Blueprint selected in the picker (checked, with its 3.66:1 dark floor showing in the footer). If a different theme was intended, only `gen_single_theme.py`'s palette table and `styles/theme.css` need to change.

---

## 2. End state

One palette. One appearance. No switching.

```css
/* styles/theme.css — the ENTIRE theme */
:root          { color-scheme: dark; /* status + chart + Cobalt brand/surface/depth */ }
body           { /* font tokens — see §4 */ }
[data-surface='hero'] { /* hero palette re-declaration */ }
```

### Removed

| Removed | Why |
|---|---|
| `styles/themes/` — `_contract.css` + 6 theme sheets | Replaced by one flat `styles/theme.css` |
| All `[data-mode='light']` blocks | Light mode gone entirely |
| `html.a11y-high-contrast[data-mode='light']` | Its light branch removed; dark branch kept |
| `lib/themes/` — registry, boot script, provider | No state to resolve, persist or sync |
| `components/ThemeControl.tsx` | No UI to switch anything |
| `app/theme-lab/` | Comparison harness for palettes that no longer exist |
| Theme + day/night rows in the accessibility panel | Nothing to control |
| Fonts: Newsreader, Instrument Sans, Archivo | Only needed by removed themes |

### Added / changed

| File | Change |
|---|---|
| `styles/theme.css` | **New.** Flat token sheet scoped to `:root`; no attributes, no modes |
| `app/layout.tsx` | One stylesheet import; no boot script; no provider; `<html data-theme="cobalt">`; single dark `theme-color`; two font families |
| `components/sections/Navbar.tsx` | Theme control removed from both navbar slots |
| `components/accessibility/AccessibilityPanel.tsx` | Theme + day/night rows removed; other preferences untouched |
| `styles/globals.css`, `tailwind.config.ts`, `HeroSection.tsx` | Comments re-pointed at `styles/theme.css`; no stale references remain |

Deliberately kept: the semantic token names (`bg-card`, `text-ink`, `border-border-strong`, …) and the legacy aliases (`--bg-primary`, `--card-glass`, …). All 55 migrated components continue to work unchanged, and re-introducing a second palette later would mean adding one stylesheet, not re-running the migration.

---

## 3. Verification — 60 checks, all passing

### 3.1 Served bytes (36 checks) — `verify_single_theme.py`
- **10 routes** respond: `/`, `/resume`, `/recruiter`, `/github-health`, `/lab`, `/performance`, `/privacy`, `/changelog`, `/work/roleradar` → all 200. `/theme-lab` → **404**, correctly gone.
- **Compiled CSS contains zero**: light-mode selectors, dark-mode selectors, `prefers-color-scheme: light`, and any of the five removed themes (aurora/graphite/ember/sage/noir) or their light canvas hexes.
- **Compiled CSS contains**: `#07131f` (Cobalt canvas), `#6cb6e8` (Cobalt accent), `color-scheme: dark`, the hero surface scope, status tokens, and `--canvas` under `:root`.
- **HTML contains zero**: `Choose theme`, `Switch to light theme`, `Switch to dark theme`, `radiogroup`, `AA floor`, `portfolio-theme`, `portfolio-mode`. `data-mode` is absent entirely.

### 3.2 Runtime (19 checks)
- `data-theme="cobalt"`, **no** `data-mode` attribute, `color-scheme: dark`, `--canvas` = `#07131f`, body background `rgb(7, 19, 31)`.
- No `role="switch"`, no `role="radio"`, no picker trigger, no `<select>` anywhere on the page.
- **OS set to light → still dark.** The context reports `prefers-color-scheme: light` matching, yet `color-scheme` stays `dark` and the canvas stays `#07131f`. This is the decisive proof that no light path survives.
- **Stale storage ignored:** seeding `portfolio-mode=light` and `portfolio-theme=noir` (what a returning visitor from the previous build may still have) changes nothing.
- Accessibility panel still opens on `Alt+A`, offers its other preferences (reduced motion, high contrast), and has no theme or day/night row.

### 3.3 Fonts (5 checks)
`--font-display` resolves to `__Space_Grotesk_dd5b2f`, `<h1>` uses it, mono resolves to `__IBM_Plex_Mono_595324`. See §4 — this was broken before this run.

### 3.4 Visual
Homepage hero, a scrolled section and a 390px mobile view captured at `previews/single-cobalt-*.png`. Headings render in Space Grotesk sans with the Cobalt gradient; nav shows no theme control.

---

## 4. Bug found and fixed during this change

**Font tokens were declared on the wrong element.** `--font-display: var(--font-space-grotesk), …` was on `:root`, but next/font injects `--font-space-grotesk` onto `<body>` (the element carrying its generated class). An undefined `var()` **with no fallback** makes the entire declaration invalid *at computed-value time*, so `font-family` collapsed to the browser default — **serif**.

Symptom: headings and the hero name rendered in Times, not Space Grotesk. Fix: move the font tokens onto `body` (where the variables exist) and add inner `var(…, fallback)` guards so a missing font degrades to a real stack instead of serif.

**Correction to my earlier report.** I previously wrote that the six-theme screenshots showed "per-theme display faces actually rendering (Newsreader serif in Graphite, Space Grotesk in Cobalt…)". That was wrong — those serifs were this same fallback bug, not the intended faces. The per-theme typography never worked; it now does for the single remaining theme.

---

## 5. Metrics

| | Original v6 (`HEAD`) | Six-theme build | **Now (single theme)** |
|---|---|---|---|
| Static pages | 20 | 21 | 20 |
| Homepage First Load JS | 181 kB | 185 kB | **179 kB** |
| Shared JS | 87.6 kB | 87.6 kB | 87.6 kB |
| Combined CSS | — | 124 KB | **80 KB** |
| Font families shipped | 2 | 6 | **4** (Space Grotesk, IBM Plex Mono + Inter/JetBrains fallbacks) |

The single-theme build is **2 kB lighter than the original v6** it was branched from, despite carrying the full token layer.

---

## 6. Notes and limitations

1. **Stale localStorage is now inert.** Returning visitors may still hold `portfolio-theme` / `portfolio-mode`. Nothing reads them, so they are harmless — but they are not cleaned up. A one-line cleanup could remove them if you want a tidy client state.
2. **Recoverability.** The six-theme system is fully documented in `theme-implementation-plan.md` and `theme-implementation-report.md`, and the generators (`gen_themes.py`, `codemod_theme.py`) remain in the workspace. Restoring a second palette means recreating its stylesheet and a picker — not redoing the utility migration.
3. **`a11y-high-contrast` is preserved** for the dark palette, but was not visually verified in this pass.
4. **The axe matrix still covers only the default appearance** — which is now the only appearance, so the previous gap is closed by construction.
5. **Two pre-existing bugs remain untouched** (present at `HEAD`): `HeroSection.tsx` fires `trackEvent('theme_toggle', …)` for the PDF/resume buttons instead of `resume_download`, and the `cyan` scale in `tailwind.config.ts` is mislabelled as rose values.

---

## 7. Preview

```
http://127.0.0.1:3100
```

Served from `durgesh-portfolio-v6/out` by a detached Python static server (pid is independent of any background-exec time limit). Restart with:

```bash
cd durgesh-portfolio-v6
python ../serve_static.py 3100      # exact production build
# or
npm run dev                          # http://localhost:3000
```
