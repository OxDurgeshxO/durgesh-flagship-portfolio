# Six Visual Themes for the Flagship Portfolio — Dual-Mode Options

**Repository:** `OxDurgeshxO/durgesh-flagship-portfolio` · audited at branch `v6` @ `b2b3310`
**Status:** options only. **No repository files were modified.**
**Related:** [`theme-redesign-plan.md`](theme-redesign-plan.md) — the full audit and the implementation plan for whichever option is chosen.

---

## 0. Constraints every option must satisfy

These come from the codebase as it actually is, and they are what separate a theme that ships from one that stalls in a mockup:

1. **A WebGL hero exists** — `AICoreScene` + a roaming 3D companion, with emissive intensities tuned against `#0b0914`. Any theme must say what happens to that scene in light mode.
2. **A photographic hero plate exists** — the Cyber Ronin WebP pair, warm amber/brown, with hand-tuned scrims and a legibility guard.
3. **Glassmorphism is structural** — one `.glass` class powers nav, cards, drawers, toasts and dialogs.
4. **Gradient text is the brand headline treatment** (`.gradient-text` on the `h1`).
5. **Ten routes must pass axe with `color-contrast` enabled** — including `/resume` (ATS-critical, already light-on-dark "paper"), `/lab`, `/github-health`, `/performance`.
6. **The stack is fixed**: Next.js 14 static export, Tailwind with CSS-variable tokens, `next/font/google`, Framer Motion + GSAP, lucide-react. All typefaces below load through the existing `next/font` setup.
7. **The toggle itself is shared plumbing** — `data-theme` on `<html>`, an anti-FOUC inline script, a real `role="switch"` control. That work is identical for all six options (see §9 of the plan).

**Verification note.** Every ratio in this document was computed with the WCAG 2.1 relative-luminance formula against the actual surfaces — including a full ramp sweep for gradient text (`t = 0.00 → 1.00`, step 0.02) so the *worst point* of a gradient is reported, not the friendly midpoint. Scripts: `theme_catalogue_check.py`, `gradient_check.py`, `gradient_ramp_sweep.py`.

**How to read each entry.** Token table gives the palette with its measured floor; the "floor" is the lowest passing ratio produced by that palette across ink, body, muted, accent, secondary, label-on-fill and control borders.

---

## Theme 1 — Aurora Obsidian / Porcelain Daylight

> **Direction:** keep the brand, formalise the system. Cinematic violet-black in dark mode; warm porcelain with ink text in light mode. The brand hue is identical in both — only lightness, elevation and glow behaviour change, which is what stops a dual-mode site from feeling like two different products.

**Dark tokens**

| Token | Value | Measured |
|---|---|---|
| canvas | `#0b0914` | — |
| card | `#161124` | — |
| ink | `#f4f1fa` | 17.69:1 |
| body | `#b6c2d1` | 10.20:1 |
| muted | `#8fa0b4` | 6.89:1 |
| accent | `#c084fc` | 6.97:1 |
| accent fill / label | `#7e22ce` / `#ffffff` | 6.98:1 |
| secondary | `#fb7185` | 6.85:1 |
| control border | `#6b6288` | 3.27:1 |
| gradient | `#c084fc → #fb7185` | worst point 7.18:1 |

**Light tokens**

| Token | Value | Measured |
|---|---|---|
| canvas | `#faf9fc` | — |
| card | `#ffffff` | — |
| ink | `#1c1726` | 16.69:1 |
| body | `#4b4459` | 9.25:1 |
| muted | `#635d70` | 6.31:1 |
| accent | `#6d28d9` | 7.10:1 |
| accent fill / label | `#6d28d9` / `#ffffff` | 7.10:1 |
| secondary | `#be123c` | 6.29:1 |
| control border | `#8f89a0` | 3.36:1 |
| gradient | `#6d28d9 → #be123c` | worst point 5.99:1 |

- **Typography:** Inter (UI + body) + JetBrains Mono (eyebrows, `kbd`, metrics) — **no font migration**. Add Fraunces at `display` only if the headline needs a warmer editorial voice in light mode.
- **UI elements:** keep `.glass`, but split into three elevations (page card / floating panel / overlay); glow becomes a soft shadow in light mode; radius collapses to 8 / 12 / 16px; borders split into decorative hairline and 3:1 control border.
- **Accessibility:** the only theme that needs **zero** new contrast decisions — it exists to fix the four measured defects (`#64748b` muted text, the CTA gradient, invisible control borders, the mislabelled `cyan` scale). Highest safety margin of the six.
- **Fit for this repo:** the 3D scene and the Cyber Ronin plate stay exactly as tuned; light mode wraps the WebGL hero in a bounded dark panel. **Lowest risk, highest brand continuity.** Best if the priority is shipping a real toggle without a repaint.

---

## Theme 2 — Graphite Ledger / Bone Paper

> **Direction:** an engineering notebook. Neutral graphite in dark mode; warm bone paper with a *single* amber accent in light mode, and almost no colour anywhere else. This is the theme that says "writes maintainable systems" rather than "ships flashy demos" — typography and rules do the work instead of glow.

**Dark tokens**

| Token | Value | Measured |
|---|---|---|
| canvas | `#111214` | — |
| card | `#1a1b1e` | — |
| ink | `#f2f2f0` | 16.72:1 |
| body | `#c4c6c9` | 10.06:1 |
| muted | `#9aa0a6` | 6.52:1 |
| accent | `#e8a33d` | 7.99:1 |
| accent fill / label | `#e8a33d` / `#17130a` | 8.59:1 |
| secondary | `#e8a33d` (single-accent system) | 7.99:1 |
| control border | `#6a6c71` | 3.28:1 |
| gradient | `#e8a33d → #f2f2f0` (near-monochrome) | worst point 8.69:1 |

**Light tokens**

| Token | Value | Measured |
|---|---|---|
| canvas | `#faf8f4` | — |
| card | `#ffffff` | — |
| ink | `#17181a` | 16.75:1 |
| body | `#4a4c50` | 8.60:1 |
| muted | `#6b6e73` | 5.12:1 |
| accent | `#8a5200` | 6.39:1 |
| accent fill / label | `#8a5200` / `#ffffff` | 6.39:1 |
| control border | `#8c8a86` | 3.45:1 |
| gradient | none recommended — use solid ink | — |

- **Typography:** **Newsreader** (editorial serif) for display headings ≥30px, Inter for UI/body, **IBM Plex Mono** for data and metadata. The serif/sans/mono trio is the whole identity — it reads as *documentation*, which suits a portfolio full of architecture case studies.
- **UI elements:** **no glass** — flat surfaces, 1px hairlines, generous whitespace, near-zero shadow, `radius 6–10px` (tighter than the current pills). Buttons are outlined, not filled, except one primary action. Section headers get a hairline rule and a mono eyebrow — the existing structure already supports this without layout changes.
- **Accessibility:** the light mode is the strong mode here (ink on bone at 16.75:1, no translucency to fight). The amber accent must never be used for small text on bone without using the darkened `#8a5200`; amber-on-white is the classic failure in this family, and the palette above is pre-corrected for it.
- **Fit for this repo:** excellent for `/resume`, `/recruiter`, `/changelog` and case studies — it is the natural extension of the resume's existing "paper card" idiom. **Weakest fit for the 3D hero**, which will read as off-brand unless it is contained in a panel. Choose this if the portfolio's centre of gravity should be *hiring/credibility* rather than spectacle. Effort: moderate (a real repaint, no new mechanics).

---

## Theme 3 — Cobalt Blueprint / Cyanotype

> **Direction:** systems engineering. Deep ink-navy canvas with cobalt and cyan, grid-forward composition, mono-dominant labels — a schematic/datasheet aesthetic. Reads as "infrastructure and ML pipelines" and makes the telemetry routes (`/github-health`, `/performance`, `/lab`) feel native rather than bolted on.

**Dark tokens**

| Token | Value | Measured |
|---|---|---|
| canvas | `#07131f` | — |
| card | `#0e2136` | — |
| ink | `#e8f2fa` | 16.50:1 |
| body | `#b7cee0` | 10.02:1 |
| muted | `#8aa7c0` | 6.49:1 |
| accent | `#6cb6e8` | 7.36:1 |
| accent fill / label | `#1d4ed8` / `#ffffff` | 6.70:1 |
| secondary | `#22d3ee` | 9.01:1 |
| control border | `#4c7ca3` | 3.66:1 |
| gradient | `#6cb6e8 → #22d3ee` | worst point 8.46:1 |

**Light tokens**

| Token | Value | Measured |
|---|---|---|
| canvas | `#f3f8fc` | — |
| card | `#ffffff` | — |
| ink | `#0b1a26` | 16.51:1 |
| body | `#3b5162` | 8.27:1 |
| muted | `#566e80` | 5.33:1 |
| accent | `#0b5f96` | 6.79:1 |
| accent fill / label | `#0b5f96` / `#ffffff` | 6.79:1 |
| secondary | `#0a5f78` | 7.19:1 |
| control border | `#7d95a6` | 3.12:1 |
| gradient | `#0b5f96 → #0a5f78` | worst point 6.35:1 |

- **Typography:** **Space Grotesk** for headings/UI (geometric, technical, distinctive at display sizes) + **IBM Plex Mono** for labels, coordinates, telemetry. Space Grotesk's slightly quirky letterforms keep this from reading as generic developer-blue.
- **UI elements:** blueprint grid retained and *promoted* — the grid becomes a visible design element in light mode (cyanotype blueprint), not a whisper. Sharp corners (`radius 4–8px`), 1px borders, dotted dividers, bracket-corner accents on cards, mono `kbd` chips. Glass reduced to a light tint; the WebGL core reads naturally as a technical instrument on this palette.
- **Accessibility:** all three blue-ish accents need to be watched for **blue-on-blue** fatigue and for deuteranopia (blue/cyan distinctions vanish); pair every status accent with an icon or label, never hue alone. Verified floors are comfortable (min 6.35:1 for gradient text, 3.12:1 for control borders).
- **Fit for this repo:** strongest structural fit for the 3D hero and the data routes; the cyanotype light mode is genuinely appealing and unusual. **Risk:** cobalt/cyan is the most common developer-portfolio palette — the blueprint grid and Space Grotesk are what keep it distinct, and if those are dropped it becomes forgettable. Effort: moderate.

---

## Theme 4 — Ember Titanium / Sandstone

> **Direction:** warm industrial. Basalt-and-ember in dark mode, sandstone with burnt sienna in light mode. The distinguishing move: it **makes the existing Cyber Ronin amber a brand colour instead of an accident** — the current hero photography and its `rgba(255,176,84)` spotlight stop clashing with the violet UI and become the centre of the identity.

**Dark tokens**

| Token | Value | Measured |
|---|---|---|
| canvas | `#14100e` | — |
| card | `#1f1917` | — |
| ink | `#f8f2ed` | 17.04:1 |
| body | `#d0c2b8` | 10.00:1 |
| muted | `#a5958b` | 6.01:1 |
| accent | `#ff9a4d` | 8.25:1 |
| accent fill / label | `#ff8a3d` / `#201308` | 7.73:1 |
| secondary | `#ffb37a` | 9.90:1 |
| control border | `#7d6a5f` | 3.39:1 |
| gradient | `#ff9a4d → #ffb37a` | worst point 8.99:1 |

**Light tokens**

| Token | Value | Measured |
|---|---|---|
| canvas | `#f8f3ed` | — |
| card | `#ffffff` | — |
| ink | `#231a14` | 15.48:1 |
| body | `#52453b` | 9.24:1 |
| muted | `#6f6055` | 6.03:1 |
| accent | `#a8400a` | 6.17:1 |
| accent fill / label | `#a8400a` / `#ffffff` | 6.17:1 |
| secondary | `#8f3f10` | 7.28:1 |
| control border | `#9c8878` | 3.38:1 |
| gradient | `#a8400a → #8f3f10` | worst point 5.59:1 |

- **Typography:** **Instrument Sans** (Google Fonts; neutral but with a warmth that suits the palette) + JetBrains Mono. Optional **Bricolage Grotesque** at display size for a more authored headline in the hero only.
- **UI elements:** surfaces are opaque and material — stone/paper, not glass. Shadows are warm-tinted rather than black (`rgba(60,35,20,0.10)`), borders are visible but soft, radius stays generous (12–16px) so panels read as tiles. The embossed/inset hero proof-strip cards already present in `HeroSection` fit this direction natively.
- **Accessibility:** the safest warm palette available — every amber/sienna value here is pre-darkened for text duty, and the dark-mode accent uses a *bright* fill with a near-black label (7.73:1) rather than white on amber, which is the failure mode of most "orange" themes. Watch only that amber is never used on a mid-tone surface where it flattens.
- **Fit for this repo:** **the best fit for the existing assets** — the Cyber Ronin photograph, its warm spotlight, and the amber `accent-warm` role all become intentional. Distinctive without being loud, and equally strong in both modes. Effort: moderate; the hero plate may not even need a light variant, only a re-graded scrim.

---

## Theme 5 — Midnight Sage / Birch Studio

> **Direction:** calm product engineering. Desaturated green-teal in a near-black forest canvas; the light mode is **birch** — pale, airy, editorial — and is the mode this theme is actually designed around. Signals maturity and product thinking rather than spectacle.

**Dark tokens**

| Token | Value | Measured |
|---|---|---|
| canvas | `#0c1411` | — |
| card | `#16211d` | — |
| ink | `#eaf4ef` | 16.63:1 |
| body | `#b8cbc1` | 9.73:1 |
| muted | `#8da398` | 6.16:1 |
| accent | `#63cfa6` | 8.67:1 |
| accent fill / label | `#2f9e73` / `#06251a` | 4.86:1 |
| secondary | `#9fc9a8` | 8.98:1 |
| control border | `#56806e` | 3.71:1 |
| gradient | `#63cfa6 → #9fc9a8` | worst point 9.77:1 |

**Light tokens**

| Token | Value | Measured |
|---|---|---|
| canvas | `#f6f8f4` | — |
| card | `#ffffff` | — |
| ink | `#141b17` | 16.39:1 |
| body | `#414d47` | 8.83:1 |
| muted | `#5f6d66` | 5.43:1 |
| accent | `#1f6f4e` | 6.10:1 |
| accent fill / label | `#1f6f4e` / `#ffffff` | 6.10:1 |
| secondary | `#2f6f52` | 5.97:1 |
| control border | `#7d8f85` | 3.42:1 |
| gradient | `#1f6f4e → #2f6f52` | worst point 5.59:1 |

- **Typography:** **Geist Sans** (npm `geist`, already Next-native) + **Geist Mono**; falls back to Inter + JetBrains Mono with no layout change. Optionally a serif (Newsreader) for the light-mode display headline to give birch mode an editorial voice.
- **UI elements:** soft, rounded, quiet — `radius 12px`, low-contrast borders, minimal shadow, no glow, glass used sparingly and only in dark mode. Data presentation is where the accent lives: charts, progress bars, health badges. The 3D core is tuned *down* (lower emissive, fewer particles) to match the restrained tone.
- **Accessibility:** the least risky palette after Theme 1 — all floors comfortable (min 4.86:1 for label-on-fill, the tightest single value in the whole catalogue). Green accents are the standard deuteranopia risk, so status must always pair colour with icon/text.
- **Fit for this repo:** the light mode is the most *suitable light mode* of the six for a professional portfolio, and the dark mode is calm rather than cinematic. The cost is that it under-uses the flashy 3D investment, and "green SaaS" is a crowded look. Choose this if the goal is to read as a senior product engineer first. Effort: moderate.

---

## Theme 6 — Noir Gallery / Museum White

> **Direction:** art-directed monochrome. True achromatic in both modes with a **single electric accent** (chartreuse in dark, deep olive in light) reserved for interaction and current state. The most confident, most typographic option — and unforgiving: nothing hides behind colour, so spacing and type must be right.

**Dark tokens**

| Token | Value | Measured |
|---|---|---|
| canvas | `#0a0a0a` | — |
| card | `#151515` | — |
| ink | `#fafafa` | 18.97:1 |
| body | `#c9c9c9` | 11.03:1 |
| muted | `#9c9c9c` | 6.65:1 |
| accent | `#ccff00` | 15.54:1 |
| accent fill / label | `#ccff00` / `#0a0a0a` | 16.85:1 |
| secondary | `#fafafa` (neutral) | 17.50:1 |
| control border | `#6b6b6b` | 3.43:1 |
| gradient | none — single accent only | — |

**Light tokens**

| Token | Value | Measured |
|---|---|---|
| canvas | `#ffffff` | — |
| card | `#f6f6f6` (inverted: card *below* canvas) | — |
| ink | `#0a0a0a` | 19.80:1 |
| body | `#3c3c3c` | 10.21:1 |
| muted | `#666666` | 5.31:1 |
| accent | `#3f6212` | 6.55:1 |
| accent fill / label | `#3f6212` / `#ffffff` | 7.08:1 |
| secondary | `#0a0a0a` | 18.32:1 |
| control border | `#868686` | 3.37:1 |
| gradient | none recommended | — |

- **Typography:** **Archivo** (or Inter Tight) at display for a tight editorial grotesque + Inter for body + IBM Plex Mono. Type scale is pushed larger (`display` 72–80px) and tracking tightened — this theme lives or dies on typography.
- **UI elements:** zero glass, zero glow, hairline borders, `radius 2–6px` (near-square), enormous whitespace, a visible baseline grid. Photography is treated in high-contrast black and white; the WebGL core is rendered monochrome with the accent used only for the active interaction state.
- **Accessibility:** the numbers are the best in the catalogue, but the *method* is the riskiest: **pure `#0a0a0a` on `#ffffff` and chartreuse are both hard on the eye** — extreme contrast causes halation for astigmatic readers, and chartreuse signals nothing on its own. Softer `#111` ink on `#fdfdfd` is worth testing, and the accent must never carry meaning alone. Placeholder/disabled states also need explicit design here, since they cannot rely on colour.
- **Fit for this repo:** strongest for a *brand* statement — this is what a design-forward engineer's portfolio looks like — and it makes the case-study routes feel like an exhibition. It fights the existing asset set hardest (warm photograph, violet gradients, glass panels all have to be reworked) and reduces the hero's warmth to zero. Effort: highest of the six. Choose only if you will commit to re-authoring the hero and photography.

---

## Comparison matrix

| # | Theme | Mood | Light mode strength | Distinctiveness | A11y risk | 3D / photo fit | Relative effort |
|---|---|---|---|---|---|---|---|
| 1 | Aurora Obsidian / Porcelain Daylight | cinematic, brand-consistent | good (systematic) | medium — keeps today's look | **lowest** | native | **low** |
| 2 | Graphite Ledger / Bone Paper | editorial, credible | **excellent** | high (serif trio) | low | poor (needs containment) | medium |
| 3 | Cobalt Blueprint / Cyanotype | technical, schematic | very good (unusual) | medium — crowded category | medium (blue/cyan) | **excellent** | medium |
| 4 | Ember Titanium / Sandstone | warm, industrial | very good | **high** | low | **excellent** (assets already fit) | medium |
| 5 | Midnight Sage / Birch Studio | calm, product-led | **excellent** | low-medium (green SaaS) | low | muted (under-uses 3D) | medium |
| 6 | Noir Gallery / Museum White | art-directed, monochrome | very good | **highest** | medium (extremes) | poor (assets fight it) | **high** |

**Verified accessibility floors** (lowest passing ratio produced by each palette, across all measured pairs; higher is safer):

| Theme | Dark floor | Light floor | Binding constraint |
|---|---|---|---|
| 1 Aurora Obsidian | 3.27:1 | 3.36:1 | control borders |
| 2 Graphite Ledger | 3.28:1 | 3.45:1 | control borders |
| 3 Cobalt Blueprint | 3.66:1 | 3.12:1 | control borders |
| 4 Ember Titanium | 3.39:1 | 3.38:1 | control borders |
| 5 Midnight Sage | 3.71:1 | 3.42:1 | control borders |
| 6 Noir Gallery | 3.43:1 | 3.37:1 | control borders |

Every theme's text pairs clear 4.5:1 and every control border clears the 3:1 UI requirement — the floors above are *control borders by construction*, because that is always the tightest constraint in a dual-mode system. Theme 5's tightest **text** value is 4.86:1 (label on the emerald fill); the rest exceed 5:1.

---

## Recommendation

**If you want this shipped with the least risk: Theme 1.** It is the only option that requires no new contrast decisions, no font migration, no asset re-authoring, and no re-lighting of the WebGL scene — the entire budget goes into the toggle, the token layer, and the light-mode surface vocabulary. It also fixes four measured defects that exist in production today.

**If you want the strongest portfolio: Theme 4, or Theme 3.** Theme 4 is the highest-value *redesign* per unit of effort because the existing hero photography, warm spotlight, and amber accent become brand assets instead of a palette clash — you get a distinctive identity by making the current assets intentional rather than by adding new ones. Theme 3 is the best structural match for a 3D-and-telemetry portfolio and demos beautifully in cyanotype light mode, at the cost of playing in a more crowded visual category.

**If the goal is recruiter credibility before spectacle: Theme 2.** The serif/sans/mono trio plus paper surfaces reads as documentation and pairs perfectly with the already-light `/resume` idiom — but it requires containing the 3D hero rather than celebrating it.

**Two things I would not do:**

1. **Don't mix themes.** Each of the six defines a *meaning* for its accent; combining two accent systems produces exactly the six-competing-accents sprawl the current Navbar already suffers from (emerald + purple + blue + sky + rose on top of the violet/rose brand).
2. **Don't ship a light mode that only covers the three main routes.** The repo's axe suite audits ten routes with `color-contrast` enabled; a partial light mode will break the gate it was built to satisfy.

**A pragmatic hybrid exists:** adopt **Theme 1's token architecture and toggle plumbing** (shared by all six anyway), and choose the *palette* separately — e.g. Theme 4's warm palette on Theme 1's structure. That is a palette decision, not an architecture decision, and it can be made after the toggle ships without redoing the work.

---

## Appendix — Verification method

**What was measured.** For each of the 12 mode-palettes: ink-on-canvas, ink-on-card, body-on-card, muted-on-card, accent-on-card, accent-on-canvas, label-on-accent-fill, secondary-on-card, and control-border-on-card (3:1 threshold); plus accent and secondary as badge text on a 14% alpha tint of themselves over the card — the most demanding real-world case, and the one that catches most published palettes.

**Gradient method.** Gradient text is swept across the entire ramp (`t = 0.00 → 1.00`, step 0.02) in sRGB, reporting the **worst** point rather than the midpoint, since a gradient that passes at 50% can fail at 85%. All six themes pass AA at every point.

**Why this matters for this repo specifically.** `tests/e2e/a11y.spec.ts` runs axe across 10 routes with `color-contrast` *enabled* — a disabled rule is a blind spot, as the file's own comment states. Any palette chosen above is therefore pre-cleared against the gate that already exists, and none of the six requires weakening that gate.

**Reproduce:**

```bash
python theme_catalogue_check.py     # 12 palettes x 11 contrast pairs + badge tints
python gradient_check.py            # gradient endpoints and midpoint
python gradient_ramp_sweep.py       # true worst point of each gradient ramp
```

**Refinement to a previously reported figure:** the earlier plan document listed the Theme 1 light gradient midpoint as `#b23ba0` at 4.97:1 — a human-picked reference hue rather than the arithmetic midpoint. The corrected value from the full ramp is **5.99:1 at the rose end** (`#be123c`), so the conclusion (gradient text stays AA in light mode) is unchanged but the margin is larger than first reported. The plan document has been corrected accordingly.
