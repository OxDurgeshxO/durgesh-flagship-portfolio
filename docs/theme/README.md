# Theme System — Design Record

This folder is the working record of the portfolio's theme work: the audit that
started it, the palettes that were designed and measured, the three architecture
changes of direction, and the tooling that generated and verified everything.

## Final state

The portfolio ships **six selectable themes, each a dark appearance only**.
Cobalt Blueprint is the default.

```css
/* styles/theme.css — the entire theme layer */
:root                 { color-scheme: dark; /* status + chart + Cobalt palette (default) */ }
[data-theme='aurora'] { /* … */ }   /* + graphite, ember, sage, noir */
body                  { /* font tokens — see the note below */ }
[data-surface='hero'] { /* hero palette scope, per theme */ }
```

There is **no light mode**. `color-scheme: dark` is unconditional and no
`[data-mode]` selector exists anywhere in the codebase.

Three decisions in that file are load-bearing and easy to break:

1. **Cobalt is declared on `:root`, not behind an attribute**, so the site
   renders correctly before JS runs, with JS disabled, and for any unrecognised
   stored value. The other five themes are emitted *after* `:root`, because
   `[data-theme='x']` and `:root` both match `<html>` at specificity (0,1,0) and
   source order decides the winner.
2. **Font tokens live on `body`, never on `:root`.** `next/font` injects its
   `--font-*` variables onto the element carrying its generated class — that is
   `<body>`. Referencing an undefined `var()` with no fallback invalidates the
   whole `font-family` declaration at computed-value time, silently collapsing
   text to the browser serif.
3. **Each theme re-declares its palette inside `[data-surface='hero']`**, so the
   hero band stays on values the WebGL rig and the warm Cyber Ronin plate were
   lit for. Page-level tokens (`canvas`, `hero fade`, `grid`) stay out of that
   scope so the band still fades into the page below.

## Documents, in chronological order

| Document | Covers | Status |
|---|---|---|
| `theme-redesign-plan.md` | Full repository audit, 16 findings with file/line evidence, dual-mode token plan, phased effort model | Historical. The audit is still accurate; the dual-mode plan was superseded |
| `theme-options.md` | Six candidate themes with measured WCAG tables, comparison matrix, recommendation | **Current** — the palette source of truth |
| `theme-implementation-plan.md` | Engineering plan for six selectable themes with day/night | Historical |
| `theme-implementation-report.md` | Six-theme + light-mode implementation, verification harness, bugs fixed | Superseded (banner at top) |
| `single-theme-change-report.md` | Collapse to one fixed theme; the `:root`/`body` font-scoping fix | Superseded (banner at top) |
| `theme-switcher-restored.md` | Switcher restored; six dark themes; 57 verification checks | **Current** |

## Previews

`previews/` holds 14 captures of the real building site — never mockups.

| File | Shows |
|---|---|
| `panel-open.png` | The theme panel open in the navbar — six options, active one checked |
| `panel-applied-sage.png` | Midnight Sage applied from the panel |
| `panel-a11y.png` | Accessibility panel with its Theme row |
| `sheet-themes-restored.png` | All six themes on a real scrolled page section |
| `theme-<id>.png` | One capture per theme (cobalt, aurora, graphite, ember, sage, noir) |
| `current-v6-*.png` | The **unmodified** baseline captured before any edit, for comparison |

Screenshots from the removed light-mode and `/theme-lab` work, and the derived
crop intermediates used to assemble the contact sheets, are deliberately not
included here — they document features that no longer exist and would mislead.

## Tooling

`tooling/` preserves the pipeline that produced and verified the palettes.

> **Working directory caveat.** These scripts were authored to run from a
> workspace that held the repository clone as a sibling folder named
> `durgesh-portfolio-v6/`, using paths such as
> `os.path.join('durgesh-portfolio-v6', 'styles', 'theme.css')`. They are kept
> here as an auditable record, not as a turnkey pipeline: running them in place
> requires that same layout, or adjusting the path constants at the top of each
> file.

| Script | Purpose |
|---|---|
| `gen_themes.py` | Generated the original six-theme + light token layer (superseded) |
| `gen_single_theme.py` | Generated the single-theme sheet (superseded) |
| `gen_themes_dark.py` | **Generates the current `styles/theme.css`** |
| `codemod_theme.py` | Moved ~1260 hardcoded dark utilities onto semantic tokens, with the brand-fill heuristic that leaves `text-white` on filled surfaces |
| `strip_switching.py`, `fix_comments.py`, `prepend_banner*.py` | Editing passes from the intermediate architecture changes |
| `contrast_check*.py`, `dark_borders.py` | WCAG ratio tables used to design every palette |
| `theme_catalogue_check.py` | 12 palettes × 11 contrast pairs, including alpha-tinted badge pairs |
| `gradient_check.py`, `gradient_ramp_sweep.py` | Gradient endpoints and the true worst point across the full ramp |
| `verify-themes.py` | **Current** served-byte verification (28 checks) |
| `verify_single_theme.py` | Served-byte verification for the intermediate single-theme state |
| `check_artifacts.py`, `check_and_sheet.py`, `make_contact_sheet.py`, `build_sheets.py`, `sheet_sections.py` | Screenshot content/luminance checks and contact-sheet composition |
| `serve_static.py` | Static server for the export. Resolves extensionless routes and **URL-decodes** paths before lookup — without that, dynamic-route chunks under `work/[slug]/` arrive as `%5Bslug%5D` and 404 |
| `codemod_applied.txt`, `codemod_report.txt` | Records of the migration scope and its replacements |

The browser-driven verification harnesses used during development were temporary
and are not kept in the repository.

## Measured contrast floors

Every theme's lowest passing ratio, against its own card surface (WCAG 2.1). All
text pairs clear 4.5:1; the floor is always the control border, which clears 3:1.

| Theme | Floor |
|---|---|
| Cobalt Blueprint (default) | 3.66:1 |
| Aurora Obsidian | 3.27:1 |
| Graphite Ledger | 3.28:1 |
| Ember Titanium | 3.39:1 |
| Midnight Sage | 3.71:1 |
| Noir Gallery | 3.43:1 |

## Verification summary

- Served bytes: 28 checks — compiled CSS holds a scoped block per theme plus
  Cobalt on `:root`, with zero `[data-mode]` selectors and zero light canvas
  hexes; font tokens appear in six `body` blocks and no `:root` block.
- Runtime: 29 checks — default theme, panel accessibility (`aria-expanded`,
  `aria-haspopup`, dialog + radiogroup, live-region announcements), selection
  and persistence, six distinct `--canvas` tokens, cross-tab sync, legacy
  storage keys ignored or cleaned, and no `role="switch"` anywhere.
- Visual: pixel sampling of all six themes yields six distinct canvas colours,
  all dark, each capture verified to contain content.
- Build: 20 static routes; typecheck clean; homepage First Load JS 183 kB,
  shared 87.6 kB.

## Known, unfixed items

Two defects predate this work and were left alone:

- `components/sections/HeroSection.tsx` fires
  `trackEvent('theme_toggle', { action: 'download_pdf_hero' })` and
  `{ action: 'view_resume_hero' }` — both should be `resume_download`.
- The `cyan` scale in `tailwind.config.ts` maps to rose values, so any
  `text-cyan-*` silently renders rose.

`a11y-high-contrast` was re-pointed at the semantic token layer but has not been
visually verified per theme.
