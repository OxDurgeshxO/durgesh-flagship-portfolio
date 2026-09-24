# Theme Switcher Restored — Six Dark Themes, Cobalt Still the Default

**Repository:** `OxDurgeshxO/durgesh-flagship-portfolio` (local working copy only)
**Local copy:** `durgesh-portfolio-v6/` · branch `v6` @ `b2b3310`
**Status:** applied, rebuilt, verified. **No GitHub interaction. Nothing committed or pushed.**
**Supersedes:** `single-theme-change-report.md` (single fixed theme) — which itself superseded `theme-implementation-report.md` (six themes + light mode).

---

## 1. The interpretation that shaped this change

Your instruction had two halves that could pull in different directions, so here is the reading I applied:

- *"re-enable manual switching between all available portfolio themes"* → restore all six themes.
- *"Do not remove or alter the existing dark-only appearance"* + the previous turn's explicit *"remove light-mode support entirely"* → **the site stays dark-only. No light mode returns.**

So: **six themes, each one a dark appearance.** Every theme is selectable; none has a day/night counterpart. Cobalt Blueprint remains the default and its appearance is unchanged.

If you wanted the light variants back as well, that is a contained follow-up: each theme would gain a second palette block and a mode control, with the existing `[data-surface='hero']` scope already in place to handle the hero band.

---

## 2. What was restored, and what stayed removed

| Restored | Detail |
|---|---|
| Five theme palettes | aurora, graphite, ember, sage (dark) + cobalt (default, on `:root`) |
| Theme registry | `lib/themes/registry.ts` — six entries, each with swatch, display font, measured AA floor |
| Boot script | `lib/themes/boot.ts` — applies the stored/URL theme before first paint |
| Provider | `lib/themes/provider.tsx` — theme-only state, persistence, cross-tab sync |
| Selection panel | `components/ThemeControl.tsx` — dialog + radiogroup, roving tabindex, arrow keys, Escape, live-region announcements |
| Accessibility panel row | `Alt+A` now carries a Theme `<select>` again |
| Per-theme typography | Newsreader (Graphite), Instrument Sans (Ember), Archivo (Noir) reloaded; Space Grotesk/Inter remain the others |

| Still removed | Why |
|---|---|
| All `[data-mode]` selectors and light palettes | The site is dark-only by instruction |
| Day/night toggle | Nothing to toggle |
| `/theme-lab` route | Not requested; the panel is the review surface |

---

## 3. Verification — 57 checks, all passing

### 3.1 Served bytes (28 checks) — `verify-themes.py`
- Nine routes return 200.
- Compiled CSS (108,668 bytes across 3 assets) contains a scoped block for each of the five non-default themes plus the Cobalt palette on `:root`, **zero** `[data-mode]` selectors, **zero** `prefers-color-scheme: light`, and none of the light canvas hexes.
- Font tokens appear in **6 `body` blocks** (base + 5 themes) and in **zero `:root` blocks** — the scoping bug from the previous turn stays fixed.
- Six hero scope blocks, one per theme.
- Delivered HTML: boot script present, static `data-theme="cobalt"`, panel trigger present, **no** day/night wording, no `data-mode` attribute.

### 3.2 Runtime (29 checks)
| Group | Result |
|---|---|
| Default with empty storage | cobalt, `color-scheme: dark`, **no** preference written on first visit |
| Panel accessibility | trigger visible, `aria-expanded`, `aria-haspopup="dialog"`, opens as a dialog, lists exactly 6 options, names match the registry |
| Selection | applies, persists, announced ("Theme changed to Noir Gallery."), survives reload with no flash of default |
| All six render distinctly | six distinct `--canvas` tokens: `#07131f`, `#0b0914`, `#111214`, `#14100e`, `#0c1411`, `#0a0a0a` |
| URL override | applies, does **not** persist |
| No day/night control | zero `role="switch"`, no light/day-night wording in page text |
| Accessibility panel | theme `<select>` present and functional (selecting Sage applied it) |
| Storage hygiene | obsolete `portfolio-mode` key **deleted by the boot script**; legacy `portfolio-theme='dark'` ignored → falls back to cobalt |
| Cross-tab sync | a change in one tab propagates (`tab1=ember tab2=ember`) |

### 3.3 Visual
Each theme captured on a real scrolled page section. Pixel measurement confirms **6/6 distinct canvas colours** sampled from the bottom-right corner of the rendered output, all dark (mean luma 22.7–29.7) and all containing content (stddev 32.4–40.5). Sheet: `previews/sheet-themes-restored.png`.

---

## 4. Metrics

| | Original v6 | Single theme | **Now (switcher restored)** |
|---|---|---|---|
| Static pages | 20 | 20 | 20 |
| Homepage First Load JS | 181 kB | 179 kB | **183 kB** |
| Shared JS | 87.6 kB | 87.6 kB | 87.6 kB |
| Compiled CSS | — | 80 KB | **106 KB** |

The picker, provider, boot script and five extra palettes cost **4 kB** of runtime JS and 26 KB of CSS over the single-theme build — and 2 kB over the untouched original v6.

---

## 5. Notes

1. **Cobalt's appearance is byte-identical to the previous turn.** Its palette is emitted on `:root` exactly as before; nothing about the default look changed.
2. **Font loading is conditional in effect, not in bytes.** The three extra display families use `preload: false`, so only the active theme's font is fetched — but all seven families are declared, so the CSS references them.
3. **Re-introducing light mode** would need: a second palette per theme, a mode attribute, a mode control, and per-theme `[data-surface='hero']` light overrides (the scope selector is already emitted per theme, so the hook exists).
4. **`a11y-high-contrast` remains dark-only** and was not visually re-verified in this pass.
5. **Two pre-existing bugs remain untouched** (present at `HEAD`): `HeroSection.tsx` fires `trackEvent('theme_toggle', …)` for the PDF/resume buttons instead of `resume_download`, and the `cyan` scale in `tailwind.config.ts` is mislabelled as rose values.

---

## 6. Preview

```
http://127.0.0.1:3100
```

Served from `durgesh-portfolio-v6/out` by a detached Python static server. The panel is the palette button at the right of the navbar (and the Theme row in `Alt+A`).
