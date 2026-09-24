> **SUPERSEDED (2026-09-25).** The six-theme / dual-mode system described below was replaced at
> the user's request by a single theme: **Cobalt Blueprint, dark only**. Light mode, the theme
> picker, the provider, the boot script and `/theme-lab` have all been removed. See
> `single-theme-change-report.md` for the current state, and note that the claim below about
> per-theme display faces rendering was incorrect (see that report, section 4).
> The verification and bug-fix record in this document remains accurate as history.

# Dual-Mode Theme System — Implementation Report

**Repository:** `OxDurgeshxO/durgesh-flagship-portfolio` (local working copy only)
**Local copy:** `durgesh-portfolio-v6/` — branch `v6` @ `b2b3310`
**Status:** implemented, built, and verified locally. **No GitHub interaction of any kind. Nothing committed or pushed.**
**Date:** 2026-09-25

---

## 1. What was actually built

Six selectable themes × two modes = **12 palettes**, switchable at runtime, with a real day/night toggle.

| Area | File(s) | Notes |
|---|---|---|
| Theme token layer | `styles/themes/_contract.css` + `aurora/graphite/cobalt/ember/sage/noir.css` | Mode-level tokens (status, chart, motion) once; brand/surface/depth per theme per mode |
| Registry | `lib/themes/registry.ts` | Single source of truth consumed by the picker, lab, and tooling |
| Boot script | `lib/themes/boot.ts` | Inline, synchronous, in `<head>` — sets `data-theme`/`data-mode` before first paint |
| State | `lib/themes/provider.tsx` | Resolution order, persistence, cross-tab sync, OS following, theme-change event |
| Control | `components/ThemeControl.tsx` | `role="switch"` day/night + radiogroup theme picker; replaces `components/ThemeToggle.tsx` (deleted) |
| Wiring | `app/layout.tsx`, `tailwind.config.ts`, `styles/globals.css` | Root provider, theme imports, new semantic colour/font tokens, mode-aware globals, elevation + high-contrast re-point |
| Surfaces | `components/sections/HeroSection.tsx` | `data-surface="hero"` scope (see §3) |
| A11y panel | `components/accessibility/AccessibilityPanel.tsx` | Theme + day/night rows added |
| Comparison | `app/theme-lab/page.tsx` | All 12 palettes on one page; `noindex` |
| Migration | 55 source files | Codemod: **1260 replacements** |

Codemod split: `text-muted-foreground` ×152, `text-primary` ×134, `border-border` ×96, `text-ink` ×83 (from `text-white`), `border-primary/40` ×73, `text-body` ×61, `bg-muted` ×60, `border-border/60` ×58, plus 30 smaller mappings.

---

## 2. Verification performed

### 2.1 Build and types
- `npx tsc --noEmit` — clean, no errors.
- `npm run build` — **21 static pages** generated (20 before; `+ /theme-lab`). Shared First Load JS unchanged at **87.6 kB**; the homepage route grew 181 → 185 kB (+4 kB) for the provider, registry and picker. That is the entire runtime cost of the theme system.

### 2.2 Interaction harness — 29 assertions, all passing

Driven with Playwright against the production build (script deleted after the run):

| Group | Result |
|---|---|
| First visit: attributes set, `color-scheme` mirrors mode | 3 pass |
| First visit writes **no** preference (OS preference respected) | 1 pass |
| Day/night switch: present, flips mode, action-stating `aria-label`, persists, live-region announcement | 5 pass |
| Persistence across reload | 1 pass |
| Theme picker: 6 options listed, Ember selectable, applied, persisted | 4 pass |
| URL override applies but does **not** persist | 3 pass |
| Legacy key migration (`portfolio-theme` held a mode value) | 3 pass |
| Cross-tab sync | 2 pass |
| JS-disabled baseline (server HTML carries the attributes) | 2 pass |
| Pixel/token proof (canvas + ink differ by mode and by theme; hero scope present; hero stays dark in light mode) | 5 pass |

### 2.3 Visual verification — computed, not eyeballed

- **12/12 mode agreement.** Measured page-band luminance: dark themes **19.4–28.4**, light themes **243.8–248.5**. Every capture's lightness matches its declared mode.
- **12/12 content check.** Scrolled section captures have pixel stddev 30.7–36.8, confirming real content rather than blank bands.
- Light-mode section sheet confirms: distinct canvases per theme, legible headings, visible card borders/badges/buttons, and **per-theme display faces actually rendering** (Newsreader serif in Graphite, Space Grotesk in Cobalt, Instrument Sans in Ember, Archivo in Noir).

---

## 3. The one significant design decision

**The hero band stays dark in both modes.** The WebGL rig is lit for a near-black canvas and the Cyber Ronin plate is warm dark photography; re-authoring either for six themes was the plan's stated cost centre.

Implementation: the palette is re-declared inside `[data-surface="hero"]` at specificity (0,3,0), which beats the `[data-theme][data-mode='light']` block at (0,2,0). The hero subtree therefore resolves to the dark palette in **both** modes, with zero component conditionals, while page-level tokens (`--canvas`, `--hero-fade`, `--grid-line`) stay mode-aware so the band still fades into a light page.

Verified at runtime: `light-hero-ink === dark ink (#f4f1fa)`. Result — **no 3D re-lighting was needed for any theme.**

---

## 4. Bugs found and fixed during implementation

| # | Bug | Cause | Fix |
|---|---|---|---|
| 1 | Build failed: `Failed to find font override values for font 'Newsreader'` | Next 14.2 has no bundled metric data for that face | `adjustFontFallback: false` on the 5 per-theme display faces |
| 2 | `/_not-found` failed to prerender: `useTheme must be used inside <ThemeProvider>` | I put the provider in `PortfolioShell`, which only wraps the homepage — every secondary route and the 404 render the root layout + `<Navbar />` and would have crashed at runtime too | Moved the provider to `app/layout.tsx` |
| 3 | Cross-tab sync silently did nothing | The `storage` listener re-read **its own DOM**; a storage event fires in the tab that did *not* change, so its attributes were still stale | Read from `localStorage` instead |
| 4 | 7 of 12 screenshots were of the **pre-theme** build | An orphaned `serve` process held a stale view of `out/`; the two modes came out byte-identical | Re-captured everything against a self-contained Python static server |

Bug 4 is worth noting as a process lesson: the stale captures were only detectable because the pipeline *measures* pixels per mode. Purely visual review would likely have shipped them.

---

## 5. Known limitations and follow-ups

1. **34 `text-white` occurrences were deliberately left.** The codemod's brand-fill heuristic kept white text where the parent is a filled brand button — correct in both modes, since the fill carries the contrast. Replacing these would be a regression.
2. **~20 `bg-white/[0.03]`-style translucent utilities remain** in lower-traffic components (`RoamingCompanion3D`, `SpeechBubble` with `bg-slate-950`, a few lab demos). They read acceptably in light mode but are not token-pure. Worth a second codemod pass.
3. **Per-theme 3D scene tuning was not done** — deliberately, per §3. Cobalt/Ember/Noir could each gain a scene treatment later.
4. **`a11y-high-contrast` was re-pointed at the semantic layer but not visually verified per theme.** The four-state matrix (theme × mode × high-contrast) needs a pass.
5. **The axe matrix was not run for all 12 combinations.** The repo's `tests/e2e/a11y.spec.ts` still runs only the default theme. Extending it is Phase 5 work.
6. **Mixed line endings:** 55 migrated files are CRLF (matching the repo); my 5 new files are LF.
7. **Two pre-existing bugs left untouched** (present at `HEAD`, not introduced here): `HeroSection.tsx` fires `trackEvent('theme_toggle', { action: 'download_pdf_hero' })` and `{ action: 'view_resume_hero' }` — both should be `resume_download`. The `cyan` scale in `tailwind.config.ts` is still mislabelled as rose values.

---

## 6. How to run the result

```bash
cd durgesh-portfolio-v6
npm run dev                 # http://localhost:3000
# or serve the exported build:
npm run build && python ../serve_static.py 3100   # http://127.0.0.1:3100
```

Review surfaces:

- `/?theme=ember&mode=light` — any of the 12 combinations (URL overrides never persist)
- `/theme-lab` — all 12 palettes on one page
- `Alt + A` — accessibility panel now carries theme + day/night rows
- The navbar carries the day/night switch and the theme picker

---

## 7. Preview artefacts

All in `previews/`, prefixed `proposed-` for the new implementation and `current-` for the untouched v6 baseline captured before any edit.

| File | Shows |
|---|---|
| `sheet-light-sections.png` | **primary proof** — all 6 light themes on real scrolled page sections |
| `sheet-dark-sections.png` | the same for dark mode |
| `sheet-light-hero.png` / `sheet-dark-hero.png` | hero band per theme (held dark by design) |
| `proposed-theme-lab-all.png` | all 12 palettes on one page |
| `proposed-aurora-light-mobile.png`, `proposed-ember-dark-mobile.png` | responsive behaviour at 375 px |
| `proposed-graphite-light-resume.png` | secondary route; the resume paper surface stays light in both modes |
| `current-v6-*.png` | the **unmodified** v6 baseline for comparison |
