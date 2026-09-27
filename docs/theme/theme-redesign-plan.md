
---

## 5. Typography recommendations

The current pairing (Inter + JetBrains Mono) is correct and should be kept — it is the right register for both an engineering portfolio and an editorial light mode. The problems are **scale discipline** and **metadata legibility**, not the faces.

1. **Publish a type scale and bind it to tokens.** Replace ad-hoc `text-[10px]` / `text-[11px]` / `text-sm` picks with a documented ramp: `2xs 11px · xs 12px · sm 14px · base 16px · lg 18px · xl 20px · 2xl 24px · 3xl 30px · 4xl 36px · 5xl 48px · display 64/72px`. The hero `text-5xl md:text-7xl` stays, but becomes `text-display` so one token tunes it.
2. **Set a 12px floor for metadata.** Roughly a dozen surfaces currently sit at 10–11px (nav `kbd`, hero proof strip labels, panel descriptions). 11px mono uppercase is legible; 10px on a translucent surface is not. Move the floor to 11px and reserve 10px for non-essential decoration only.
3. **Constrain the measure.** Body copy should cap at **62–72 characters** (`max-w-[68ch]`). The hero already uses `max-w-2xl`, which is right; long-form routes (`/privacy`, case studies) should share one container token.
4. **Raise body line-height in light mode.** Dark-on-light text at 1.5 reads denser than light-on-dark. Use `leading-relaxed` (1.625) as the light-mode default for prose and keep 1.5 for dark — this is a genuine perceptual difference, not a stylistic whim.
5. **Give the two modes the same optical weight, not the same value.** On light surfaces, `font-weight: 600` can render slightly heavy. Keep weights identical but reduce the *shadowing* language (no `text-shadow` glow, no gradient on small text) — gradient text should only ever be applied to display-size type (≥30px), where the `#6d28d9 → #be123c` gradient clears AA at every point on the ramp (worst 5.99:1, at the rose end, per full-ramp sweep).
6. **Use `font-optical-sizing` and only the weights you need.** Inter is loaded as a variable face via `next/font`; constrain the used weight range (400/500/600/700) to keep the font payload honest, and keep `display: 'swap'` (already set).
7. **Mono is a signal, not decoration.** Reserve JetBrains Mono for: eyebrows/labels, numeric data (`MetricCard`, percentages), `kbd` hints, and the monogram. In light mode, mono at `#635d70` on `#f4f2f8` is 5.68:1 — safe.

---

## 6. Layout & component styling

**Keep the layout.** The section order, 100vh hero, sticky nav, and scroll-spy architecture are sound. What needs work is the *surface vocabulary* — today there is effectively one treatment (`.glass`) used for everything from the nav bar to modal dialogs, which flattens the depth hierarchy.

1. **Introduce three explicit elevations instead of one glass class.**
   - `surface-1` — page-attached cards: solid `--card`, 1px `--border`, no blur.
   - `surface-2` — floating panels (nav, command palette, accessibility dialog): glass fill + blur + `--shadow-md`.
   - `surface-3` — overlays/modals: `--surface-2` + stronger scrim (`black/80` dark, `ink/40` light) + `--shadow-lg`.
   In dark mode the differentiator is glow; in light mode it is shadow and border. Same three levels, two expressions.
2. **Make the nav a real surface in both modes.** Today it is transparent until `scrollY > 50`, then glass. In light mode a blurred white bar over a porcelain page loses its edge — add `--border` bottom hairline at the scrolled state for both modes so the boundary is unambiguous.
3. **Split the border tokens by job** (this is D7's fix, applied everywhere): `--border` for decorative card outlines (hairline, either mode), `--border-strong` for anything a user must perceive as a control boundary — inputs, selects, switch tracks, ghost buttons. Verify with a scripted check in CI, not by eye.
4. **Collapse the radius scale to three steps:** `--radius-sm 8px` (chips, `kbd`, small controls), `--radius-md 12px` (cards, buttons, inputs), `--radius-lg 16px` (dialogs, hero panels), plus `rounded-full` for pills. Migrate `rounded-xl`→`md`, keep `rounded-2xl`→`lg` for dialogs only. Reduces the 5-family sprawl (D12) to a documented set.
5. **Unify the chip/badge primitive.** Nav chips, hero proof-strip labels, `TechnologyTags`, and `HealthBadge` are four independent implementations of the same idea. Build one `Badge` component with `tone` (brand / lab / work / signal / warm / critical) reading from §4.3's mapping. This also kills D11 at the source.
6. **Give cards a light-mode shadow recipe, not a glow.** Dark: `0 12px 32px rgba(0,0,0,0.45)` + optional 30px violet glow. Light: `0 1px 2px rgba(28,23,38,0.04), 0 8px 24px rgba(28,23,38,0.06)` and **zero glow**. Glow on light surfaces reads as a blur artefact.
7. **Keep the grid + ambient orb background, re-tuned.** `components/Background.tsx` uses `--grid-line` and three orbs at 12–14% opacity with 130px blur. In light mode, invert the technique: grid line `rgba(109,40,217,0.06)` on porcelain, orbs at 6–8% violet/rose — atmosphere without muddying text.
8. **Fix the invisible-boundary problem for scrollbars and selection** per mode (`::selection` should be `--primary` fill + `--primary-foreground` text; dark scrollbar thumb `#a855f7`, light `#8b7ab8`).
9. **Reserve `bg-white/5`-style overlays for dark mode only** — in light mode the equivalent is `rgba(28,23,38,0.03)`, which is why the migration in §9.4 maps them onto `--muted` / `--accent` tokens rather than leaving them as raw white alpha.

---

## 7. Motion & interaction

Motion is a strength here; the goal is calibration, not restraint — with two hard requirements: everything must respect reduced-motion (the codebase already does this) and nothing may cause layout shift.

1. **Keep the vocabulary, publish durations.** Standardise on three tokens: `--motion-fast 150ms` (hover/press/focus), `--motion-base 350ms` (surface and theme transitions), `--motion-slow 800ms` (entrance). The `0.35s ease` used for body background/colour transitions is already the right value for theme switching — make it a token so every themed property shares it.
2. **Animate theme changes on a curated property list only** — `background-color`, `color`, `border-color`, `box-shadow`, `fill`. **Do not** transition `backdrop-filter`, `filter`, or gradients: on mobile Safari these repaint per frame and cause the switch to stutter. Where a glass panel must change mode, cross-fade the two states instead.
3. **Add a proper `.theme-switching` suppression window (~400ms).** While it is applied, disable hover transforms and entrance animations so the mode change reads as a single deliberate event rather than a cascade.
4. **View Transitions is the optional upgrade.** A radial `clip-path` reveal originating at the toggle button is the modern day/night idiom. Guard it: feature-detect `document.startViewTransition`, skip entirely under `prefers-reduced-motion`, and make sure the fallback (instant swap + short cross-fade) is the *default* path, not an afterthought.
5. **Hero entrance stays as-is** — `portfolio-ready` gate, staggered `ronin-word` + `fade-up`, 0.8s `cubic-bezier(0.22,0.61,0.36,1)`. It is well-built and already has a reduced-motion end state.
6. **Reduce the "everything floats" load.** Ambient orbs float on infinite 6s loops and the 3D companion roams. In light mode, drop orb float amplitude by ~50% and stop animating them entirely below `md` — on a bright canvas the same movement reads as noise rather than atmosphere.
7. **Interactive depth: keep, but make it mode-aware.** `CardTilt3D`'s cursor spotlight uses `accentColor` at 15% alpha; on light surfaces raise it to ~22% and switch the blend mode from `screen` to `multiply`, or the highlight disappears.
8. **Never remove the loading screen's skip affordance.** It already has one; in light mode the skip button needs `--border-strong` so it remains visible against porcelain.

---

## 8. Accessibility requirements (both modes)

Non-negotiable acceptance criteria for this redesign:

1. **Both modes pass axe `wcag2a`+`wcag2aa` across all 10 audited routes**, with `color-contrast` enabled. Extend `a11y.spec.ts` to parametrise the theme (D15) — a light theme that is not in the gate does not exist.
2. **Every measured pair in §4 is already ≥4.5:1** for normal text and ≥3:1 for UI boundaries. Any new pair must be measured, not eyeballed — the workspace scripts used for this audit can be lifted into the test suite.
3. **Text over imagery is the highest-risk area.** The `.ronin-guard` gradient (D10) exists precisely because the spotlight can land behind the headline. In light mode this must be re-derived, and its contrast verified at three viewport widths — not just at the default spotlight position (`--ronin-x: 68%, --ronin-y: 32%`).
4. **Toggle semantics.** The day/night control must be a real control: `role="switch"` or `<button aria-pressed>` with an accessible name that states the *action* ("Switch to light theme" / "Switch to dark theme"), not the current state. Announce the change via a polite live region. Keep the existing tooltip behaviour but do not let it be the only affordance.
5. **Persist and respect the visitor's OS preference.** Resolution order: explicit user choice (stored) → `prefers-color-scheme` → dark default. Today the app writes a preference on first visit (`ThemeToggle.tsx:17`), which **destroys the ability to honour the OS setting** — this must be removed, not ported.
6. **Preserve the existing wins:** global skip link, `:focus-visible` ring at 3px offset, `aria-expanded`/`aria-controls` on the mobile menu, focus trap + restoration in the accessibility panel, `aria-hidden` on decorative layers, print stylesheet.
7. **Re-verify the two a11y modes compose with the new theme.** Four combinations exist (dark/light × contrast-normal/high). `a11y-high-contrast` currently redefines only the legacy `--*` primitives (`globals.css:250-260`); it must be re-pointed at the new semantic layer or high-contrast will silently stop working in one mode.
8. **Colour must never be the only signal.** The accent set in §4.3 is used for status chips; each needs an icon or label, not hue alone (WCAG 1.4.1).
9. **Non-text contrast for the 3D/hero:** decorative layers may be dropped, but any *informational* graphic (charts in `/performance`, `MetricCard` values) needs 3:1 against its surface in both modes.
10. **Test at 200% zoom and with the enlarged-type mode** — the `<html>` font-size override (115%) plus the 12px metadata floor must not clip `kbd` chips or nav pills.

---

## 9. Implementation guidance

### 9.1 Architecture decision: token-first, and do **not** enable `darkMode: 'class'`

With only **2** `dark:` variants in the entire codebase, there is nothing to gain from Tailwind's dark-variant machinery — and a lot to lose, because it would lock the light mode behind `dark:` prefixes that nobody has written. Instead:

- Keep driving everything from **CSS custom properties** on `:root`, and override them under `html[data-theme='light']`.
- Add `data-theme` to `<html>` plus `color-scheme: dark | light` so native controls, scrollbars and form widgets follow the mode.
- Enable Tailwind's `darkMode` config **only** if a specific inverted element later needs it — and if so, use the attribute selector form rather than `.dark`, since `.dark` is not what the codebase toggles. Verify the exact config form against the resolved `tailwindcss` version in `package-lock.json` before relying on it.

The `rgb(var(--x) / <alpha-value>)` bridge in `tailwind.config.ts:8` is already correct and must be preserved for the new tokens — this is what keeps `bg-card/50` and `border-border/80` compiling.

### 9.2 Files that must change (and why)

| File | Change |
|---|---|
| `styles/globals.css` | **Core work.** Restructure into `:root` (dark) + `html[data-theme='light']` override; keep the legacy `--bg-primary` family as aliases so untouched components keep working; add `color-scheme`; re-point `a11y-high-contrast`. |
| `tailwind.config.ts` | Add the new semantic tokens, fix D4 (rename or repoint the `cyan` scale), add elevation/shadow + motion tokens, correct `slate.500`. |
| `components/ThemeToggle.tsx` | Replace the decorative toggle with a real switch: read stored choice → OS preference → default; write `data-theme` + `localStorage`; announce via live region; **stop force-writing `"dark"` on mount**. |
| `app/layout.tsx` | Add the anti-FOUC script (§9.3), `suppressHydrationWarning` is already present, pass `color-scheme`, and set a mode-aware `theme-color` meta. |
| `components/Background.tsx` | Mode-aware grid/orb values via the new tokens (orbs currently use raw `#a855f7/#f43f5e/#ec4899`). |
| `components/cyber-ronin/*` | Light-mode plate treatment + re-derived `.ronin-guard` + `.ronin-spark` blend mode. |
| `components/3d/AICoreScene.tsx`, `components/companion/CyberBotModel.tsx` | Accept a palette/intensity prop; scale emissive + light intensities per mode (D9). **This is the single largest code change.** |
| `components/LoadingScreen.tsx`, `accessibility/AccessibilityPanel.tsx`, `sections/Navbar.tsx`, `recommend ResumeActions`, `CommandPalette.tsx` | Replace hardcoded `slate-950/800`, `bg-white/5`, `text-white` with semantic utilities (D14). |
| `app/manifest.ts` | Align `background_color`/`theme_color` with the real tokens (currently `#0c0c14` ≠ `--bg-primary` `#0b0914` — D13). |
| `tests/e2e/a11y.spec.ts` | Parametrise over both themes (D15). |
| `styles/resume.css` | Confirm print rules still win in both modes; the resume "paper" card should stay light in dark mode by design. |

### 9.3 Preventing the flash of wrong theme (and the CSP trade-off)

The correct pattern for a statically exported Next.js app: a tiny **blocking inline script in `<head>`** that reads the stored preference and sets `data-theme` before first paint, then the React toggle hydrates against it.

```html
<!-- must run before the first paint; keep the expression minimal and dependency-free -->
<script dangerouslySetInnerHTML={{ __html:
  "try{var s=localStorage.getItem('portfolio-theme');" +
  "var t=s==='light'?'light':s==='dark'?'dark':" +
  "(matchMedia('(prefers-color-scheme: light)').matches?'light':'dark');" +
  "document.documentElement.dataset.theme=t;" +
  "document.documentElement.style.colorScheme=t;}catch(e){}" }} />
```

CSP note, verified from `public/_headers:7`: `script-src 'self' 'unsafe-inline' https://cdn.jsdelivr.net` — so this **works today with no header change** (D16). If you prefer to keep inline script off the allow-list, the alternatives are a hash (`'sha256-…'` alongside `'self'`) or moving the logic into a tiny first-party script. Do not use a `<script src>` in `<head>` that is not parser-blocking, or the flash returns.

Also add, in the same head:
- `<meta name="theme-color" content="..." media="(prefers-color-scheme: light|dark)">` so mobile browser chrome matches;
- `color-scheme` on `<html>` so native `<select>`/`<input>` chrome, autofill and scrollbars follow the mode (this is exactly the class of bug the existing token-layer comment describes at `globals.css:60-75`).

### 9.4 Migrating the hardcoded utilities (D3) — codemod strategy

This is the bulk of the mechanical work. Do it as a **scoped, reviewable codemod** rather than 400 hand edits, and importantly: **build it as a mapping script with a dry-run diff first**, then review by route.

| Legacy utility | Semantic replacement | Occurrences |
|---|---|---|
| `text-white` | `text-foreground` (headings) / `text-body` (paragraphs) | 160 |
| `text-slate-400` | `text-muted-foreground` | 130 |
| `text-slate-300` | `text-body` | 64 |
| `text-slate-500` | `text-muted-foreground` | 24 |
| `border-white/10`, `/5` | `border-border` | 171 |
| `bg-white/5`, `/10` | `bg-muted` / `bg-accent` | 129 |
| `bg-slate-950/*`, `bg-slate-900/*` | `bg-card` / `bg-background` | 23 |
| `bg-slate-800`, `border-slate-700` (`kbd`) | `bg-muted border-border-strong` | 21 |

Two rules make this safe:

1. **Never blanket-replace `text-white`.** On a filled brand button, `text-white` is *correct in both modes* (the fill carries the contrast). The mapping above applies to text on *surfaces*. Classify by parent context; ~20–25% of the `text-white` hits are legitimate and must be left alone.
2. **Do not port `bg-white/5` semantics literally.** In dark mode a 5% white overlay is a subtle lift; the equivalent in light mode is a 3% *ink* overlay. That is precisely what `--muted`/`--accent` express — which is why they must be mapped to tokens rather than inverted to `bg-black/5`.

Then, per component, decide one of three dispositions: **token-map** (most), **mode-branch** (rare — e.g. the hero plate), or **mode-invariant** (brand fills, LinkedIn's `#0A66C2`, status colours).

### 9.5 Testing & CI updates

1. **Parametrise axe over both themes** in `a11y.spec.ts` — iterate `['dark','light']` × 10 routes (20 runs), setting the theme via the same `localStorage` key + `data-theme` the app uses, then awaiting the transition window before scanning.
2. **Add a contrast unit gate.** A small node script (`tests/theme-contrast.test.mjs`) that parses `globals.css`, resolves the token pairs actually used, and asserts the §4 numbers. This is cheap, deterministic, and catches a palette edit that quietly drops below AA — a much better signal than a screenshot diff.
3. **Add visual regression snapshots** (Playwright already present) at two viewports × two themes for the highest-risk surfaces: hero, nav scrolled, a card grid, the command palette, the resume page.
4. **Verify no CLS from the theme switch** — measure Lighthouse CLS in both modes on `/` and `/resume`; the anti-FOUC script must not introduce a reflow.
5. **Keep `.github/workflows/portfolio-quality.yml` as the gate** and make the new theme checks required rather than advisory.
6. **Manual pass per mode:** keyboard-only traversal of the toggle, screen-reader announcement of the change, 200% zoom, forced-colors/high-contrast OS mode, and a real iOS Safari check of the glass/blur transition (§7.2).

### 9.6 Rollout order (low risk → high risk)

```
1. Tokens + data-theme plumbing + anti-FOUC script      → light mode exists but looks broken
2. Global surfaces: body, Background, Navbar, cards     → light mode becomes usable
3. Utility codemod across sections/* + shared primitives → coverage
4. Secondary routes: /resume, /lab, /changelog, /github-health, /performance, /privacy, /404
5. High-risk bespoke: hero (Cyber Ronin light plate), 3D scenes, LoadingScreen, CommandPalette, AccessibilityPanel
6. Tests, contrast gate, docs
```

The order matters: steps 1–3 are mechanical and reversible, step 5 is where the design judgement (and the cost) actually lives. Never ship 1–3 without 6.

---

## 10. Phased execution plan

### Phase 1 — Foundation & critical fixes
**Objective:** a real theme mechanism, plus the AA defects that exist today.
1. Restructure `styles/globals.css` into dark `:root` + `html[data-theme='light']`, keeping legacy primitives as aliases.
2. Add `data-theme` + `color-scheme` to `<html>`; add the anti-FOUC inline script and `theme-color` metas.
3. Rebuild `ThemeToggle` as a real accessible switch; remove the forced dark write; resolution order = stored → OS → default.
4. Fix D4 (`cyan` scale), D5 (muted text → `#8fa0b4` dark / `#635d70` light), D6 (CTA gradient), D7 (`--border-strong`).
5. Add the elevation + shadow + motion tokens.

**Effort:** ~2–3 engineer-days. **Exit criteria:** toggle switches modes with no flash; the 5 defects above measure AA; axe still clean in dark; light mode is structurally present but visually incomplete.

### Phase 2 — Core implementation
**Objective:** make light mode actually designed, not merely inverted.
1. Codemod the utility layer (§9.4) with dry-run diff review.
2. Migrate `Background`, `Navbar`, all `components/sections/*`, and the shared card/badge primitives to tokens; build the `Badge` tone system (§4.3, §6.5).
3. Apply the three-elevation surface vocabulary and the three-step radius scale.
4. Light-mode typography pass (measure, line-height, weight, gradient-text restriction).

**Effort:** ~4–6 engineer-days. **Exit criteria:** every primary route renders correctly in both modes; no `bg-white/5`-class hardcoding remains outside mode-invariant fills; axe clean in **both** themes on `/`, `/recruiter`, `/work/[slug]`, `/resume`.

### Phase 3 — High-risk surfaces & QA
**Objective:** the parts that cannot be solved with tokens.
1. 3D scenes: palette/intensity props for `AICoreScene` and `CyberBotModel`; decide the light-mode hero treatment (recommended: keep the WebGL canvas as a *bounded dark panel* inside the light layout — it preserves the shader's tuned lighting, avoids re-authoring materials, and reads as an intentional "viewport" motif).
2. Cyber Ronin light plate: second asset **or** treatment (reduced-opacity, luminance-tuned) + re-derived `.ronin-guard` and `spark` blend mode.
3. `LoadingScreen`, `CommandPalette`, `AccessibilityPanel`, `ResumeActions`, keyboard-hint chips.
4. Extend axe to both themes; add the contrast unit gate; add visual-regression snapshots.
5. Manual a11y pass: keyboard, live-region announcement, 200% zoom, forced-colors, iOS Safari.

**Effort:** ~3–5 engineer-days (the 3D work dominates). **Exit criteria:** both modes pass the full `npm run verify` + e2e suite; no console errors on either mode; documented contrast table matches the shipped tokens.

### Phase 4 — Polish & documentation
1. Update `README.md` / `docs/` with the theme architecture, token contract, and the "how to add a token" rule.
2. Record the decision as an ADR alongside `docs/decisions/001-cloudflare-pages.md` (e.g. `004-dual-mode-theme-tokens.md`) — the repo already uses that convention.
3. Align `app/manifest.ts`, `og-image`/social assets, and the `icon.svg` treatment if the light mode changes the brand's first impression.
4. Final performance pass: Lighthouse in both modes, font subsetting audit, blur/backdrop-filter cost check on mobile.

**Effort:** ~1–2 engineer-days.

**Total:** roughly **10–16 engineer-days** for the full dual-mode system at the quality bar this repo already holds itself to. A "light mode that only looks acceptable on the three main routes" is closer to 5–7 days — but it would break the repo's existing a11y gate on the remaining seven, so I do not recommend that route.

---

## 11. Model / effort-tier recommendation

Mapped to the work breakdown above:

| Work | Tier | Why |
|---|---|---|
| Phases 1 + 2 (tokens, toggle, codemod, section migration) | **Balanced coding tier** | High-volume, pattern-following work with clear acceptance criteria; excellent cost-per-quality. The codemod + 400-utility migration is exactly this shape. |
| Phase 3 — 3D scene re-lighting, Cyber Ronin light treatment, hero legibility | **Highest-reasoning tier** | Root-cause work across shader materials, blend modes, and contrast verification at multiple viewports. This is where a cheaper tier produces plausible-but-wrong output that fails the a11y gate. |
| Test/CI parametrisation, docs, ADR | **Fast/cheap tier** | Mechanical and fully specified by §9.5. |

Recommended split: run Phases 1–2 and the test/docs work on the balanced tier, and escalate **only** Phase 3 step 1–2 (3D + hero plate) to the highest-reasoning tier. That targets the expensive tokens at the only part of this job where correctness is genuinely hard to verify by inspection.

---

## 12. Risks, trade-offs, and decisions I need from you

**Risks**

1. **Scope creep into a rebrand.** The palette above keeps the existing violet/rose and `#0b0914`. Changing the brand hue is a different project — say so now if you want it, because it roughly doubles the work (all 3D materials, all photography, the OG image, the favicon).
2. **The 3D hero is the cost centre.** Re-lighting a three.js scene for a light background is the one task that can absorb a week. The bounded-dark-panel approach in Phase 3 exists specifically to cap that risk — it is a design decision as much as a technical one.
3. **Codemod risk.** A naive `text-white` → `text-foreground` replace will break brand-fill buttons. The dry-run diff review is not optional.
4. **Blur cost in light mode.** Glass over a bright surface can look chalky and costs GPU; §4.2 reduces blur 16px → 14px and moves the emphasis to border + shadow. Verify on a real mid-range Android before locking it.
5. **Verification gap.** There is no per-session memory of *why* the current colours were chosen beyond code comments (which are unusually good, e.g. `globals.css:60-118`). If you have external design rationale not in the repo, share it before Phase 1 so the token names match your intent.

**Decisions needed before Phase 1 starts**

| # | Decision | My recommendation |
|---|---|---|
| 1 | Default mode for a first-time visitor | **Follow OS preference**, fall back to dark. Do not write a preference on load. |
| 2 | Light-mode hero: full light WebGL scene vs. bounded dark panel | **Bounded dark panel** — preserves tuned shader lighting, far lower risk, reads intentionally. |
| 3 | Cyber Ronin plate in light mode: new asset vs. treated reuse | **Treated reuse first** (opacity + luminance + stronger guard), commission a light plate only if it fails review. |
| 4 | Inline anti-FOUC script vs. CSP hash | **Inline now** (CSP already permits it), migrate to a hash when headers are next touched. |
| 5 | Brand hue: keep violet→rose, or adopt the warm ember as co-primary | **Keep violet→rose**; demote the ember to the single `accent-warm` role (§4.3). |
| 6 | Target: both modes plus the 2 high-contrast variants, or ship light/light+HC later | **Ship §4.2 + re-point `a11y-high-contrast` in Phase 1**, or the a11y panel silently regresses. |

---

## 13. Gate

No files in the repository were changed. Everything above is analysis and proposal.

> **Awaiting your approval to proceed with the balanced-tier implementation setup and Phase 1 execution. Please confirm, or tell me which of the six open decisions in §12 you want adjusted first.**

---

### Appendix A — Verified contrast measurements

All values computed with the WCAG 2.1 relative-luminance formula. Scripts: `contrast_check.py`, `contrast_check2.py`, `contrast_check3.py`, `dark_borders.py` (workspace root).

**Current dark mode — defects confirmed**

| Pair | Ratio | Verdict |
|---|---|---|
| `#64748b` (muted) on `#0b0914` | 4.15:1 | below AA |
| `#64748b` (muted) on `#161124` | 3.87:1 | below AA |
| `#ffffff` on `#f43f5e` (CTA rose end) | 3.67:1 | below AA for 16px semibold |
| `#ffffff` on `#9333ea` (CTA violet end) | 5.38:1 | pass |
| `#2a2440` (border) on `#161124` | 1.25:1 | invisible (decorative) |
| `#2a2440` (border/input) on `#0b0914` | 2.13:1 | below 3:1 for controls |
| `#7b8a9e` (slate-500 override) on `#161124` | 5.24:1 | pass (existing fix is correct) |
| `#c084fc` (primary) on `#0b0914` | 7.47:1 | pass |
| `#141223` (ink) on `#a855f7` | 4.65:1 | pass |

**Proposed palettes — key pairs**

| Pair | Ratio | Verdict |
|---|---|---|
| Light `#1c1726` on `#ffffff` | 17.50:1 | pass |
| Light `#4b4459` on `#faf9fc` | 8.82:1 | pass |
| Light `#635d70` on `#ffffff` | 6.31:1 | pass |
| Light `#6d28d9` on `#faf9fc` | 6.77:1 | pass |
| Light `#ffffff` on `#6d28d9` | 7.10:1 | pass |
| Light `#be123c` on `#ffffff` | 6.29:1 | pass |
| Light gradient `#6d28d9 → #be123c`, worst point of full ramp | 5.99:1 | pass |
| Light `#8f89a0` (control border) on `#ffffff` | 3.36:1 | pass (UI 3:1) |
| Dark `#8fa0b4` (proposed muted) on `#161124` | 6.89:1 | pass |
| Dark `#8fa0b4` on `#0b0914` | 7.39:1 | pass |
| Dark `#b6c2d1` (proposed body) on `#161124` | 10.20:1 | pass |
| Dark `#6b6288` (proposed control border) on `#161124` | 3.27:1 | pass (UI 3:1) |

### Appendix B — Reproduction of this audit

```bash
git clone --no-single-branch https://github.com/OxDurgeshxO/durgesh-flagship-portfolio.git
git log --oneline -3 origin/v6 origin/V4 origin/main
git diff --stat origin/V4 origin/v6     # 39 files, +1318 / -2004
```
