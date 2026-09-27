"""
Emit the single-theme token layer: Cobalt Blueprint, dark only.

Replaces the six-theme + two-mode layer with one flat stylesheet scoped to
:root. No attributes, no [data-mode] blocks, no light palette. Hexes are the
same verified Cobalt values used before (dark floor 3.66:1).
"""
import os

OUT = os.path.join('durgesh-portfolio-v6', 'styles', 'theme.css')

# verified Cobalt Blueprint dark palette
P = dict(canvas='#07131f', card='#0e2136', ink='#e8f2fa', body='#b7cee0',
         muted='#8aa7c0', accent='#6cb6e8', fill='#1d4ed8', onfill='#ffffff',
         sec='#22d3ee', bd='#4c7ca3', grad_a='#6cb6e8', grad_b='#22d3ee',
         hero_canvas='#07131f')


def rgb(h):
    h = h.lstrip('#')
    return tuple(int(h[i:i + 2], 16) for i in (0, 2, 4))


def hexs(t):
    return '#%02x%02x%02x' % tuple(max(0, min(255, round(c))) for c in t)


def blend(fg, bg, a):
    f, b = rgb(fg), rgb(bg)
    return hexs(tuple(a * f[i] + (1 - a) * b[i] for i in range(3)))


def rgba(h, a):
    r, g, b = rgb(h)
    return f'rgba({r}, {g}, {b}, {a})'


def chan(h):
    r, g, b = rgb(h)
    return f'{r} {g} {b}'


def emit(tokens):
    out = []
    for k, v in tokens.items():
        name = '--' + k.replace('_', '-')
        if isinstance(v, str) and v.startswith('#') and len(v) == 7:
            out.append(f'  {name}: {v};')
            out.append(f'  {name}-rgb: {chan(v)};')
        else:
            out.append(f'  {name}: {v};')
    return '\n'.join(out)


canvas, card, ink = P['canvas'], P['card'], P['ink']
accent, sec, fill, onfill = P['accent'], P['sec'], P['fill'], P['onfill']

surface = dict(
    canvas=canvas, background=canvas, card=card, card_foreground=ink,
    popover=blend(card, canvas, 0.92), popover_foreground=ink,
    muted=blend(ink, canvas, 0.06), accent=blend(accent, card, 0.14), accent_foreground=ink,
    ink=ink, body=P['body'], muted_foreground=P['muted'],
    primary=accent, primary_foreground=onfill, secondary=sec, secondary_foreground=onfill,
    accent_fill=fill, on_accent_fill=onfill,
    gradient_start=P['grad_a'], gradient_end=P['grad_b'],
    border=blend(accent, card, 0.18), border_strong=P['bd'],
    input=blend(P['bd'], card, 0.55), ring=accent,
    destructive='#ef4444', destructive_foreground='#141223',
    glass_bg=rgba(card, 0.65), glass_border=rgba(sec, 0.12),
    shadow_1=f'0 1px 2px {rgba("#000000", 0.25)}',
    shadow_2=f'0 8px 24px {rgba("#000000", 0.45)}',
    shadow_3=f'0 16px 48px {rgba("#000000", 0.55)}',
    card_shadow=f'0 12px 32px 0 {rgba("#000000", 0.45)}',
    overlay_scrim=rgba('#000000', 0.8),
    hero_bg=P['hero_canvas'], hero_fade=rgba(P['hero_canvas'], 0.7),
    bg_primary=canvas, bg_surface=rgba(accent, 0.04),
    grid_line=rgba(sec, 0.06), border_subtle=rgba(sec, 0.12),
    border_hover=rgba(accent, 0.45),
    text_main=ink, text_body=P['body'], text_muted=P['muted'],
    violet_accent=accent, rose_accent=sec,
    card_glass=rgba(card, 0.65), card_border=rgba(sec, 0.12),
    modal_bg=rgba(canvas, 0.97),
)

mode = dict(
    accent_lab='#6ee7b7', accent_lab_bg='rgba(16, 185, 129, 0.12)', accent_lab_border='rgba(16, 185, 129, 0.40)',
    accent_work='#e9d5ff', accent_work_bg='rgba(168, 85, 247, 0.14)', accent_work_border='rgba(168, 85, 247, 0.42)',
    accent_signal='#38bdf8', accent_signal_bg='rgba(56, 189, 248, 0.12)', accent_signal_border='rgba(56, 189, 248, 0.40)',
    accent_warm='#fbbf24', accent_warm_bg='rgba(245, 158, 11, 0.12)', accent_warm_border='rgba(245, 158, 11, 0.40)',
    accent_critical='#f87171', accent_critical_bg='rgba(239, 68, 68, 0.12)', accent_critical_border='rgba(239, 68, 68, 0.40)',
    chart_1='#6ee7b7', chart_2='#fbbf24', chart_3='#38bdf8', chart_4='#c084fc', chart_5='#f87171',
)

hero = {k: v for k, v in surface.items()
        if k not in ('canvas', 'background', 'bg_primary', 'hero_bg', 'hero_fade',
                     'modal_bg', 'bg_surface', 'grid_line', 'border_subtle', 'overlay_scrim')}

doc = """/* ==========================================================================
   PORTFOLIO THEME — Cobalt Blueprint (single theme, dark only)
   --------------------------------------------------------------------------
   This file is the entire theme. There is one palette and one appearance:
   no theme switching, no [data-theme] scoping, no light mode.

   Two layers remain because they have different owners:
     * mode-invariant tokens (status + chart series) — semantic, and they would
       not change even if a second theme were introduced later
     * brand / surface / depth tokens — the Cobalt palette itself

   Contrast floors (WCAG 2.1, measured): ink 16.50:1, body 10.02:1,
   muted 6.49:1, accent 7.36:1, label-on-fill 6.70:1, control border 3.66:1.

   The legacy `--bg-primary`-style aliases are retained so components that were
   never migrated still resolve to the themed values.
   ========================================================================== */

:root {
  color-scheme: dark;

  /* ---- status roles (semantic, not brand) ---- */
"""

body = emit(mode) + '\n\n  /* ---- brand / surface / depth: Cobalt Blueprint ---- */\n' + emit(surface)
body += """

  /* ---- structure + motion + type ---- */
  --glass-blur: 10px;
  --glow: 0 0 30px rgba(108, 182, 232, 0.35);
  --glow-opacity: 0.35;
  --radius: 0.375rem;
  --motion-fast: 150ms;
  --motion-base: 350ms;
  --motion-slow: 800ms;
  --hero-plate-opacity: 0.7;
  --hero-plate-filter: saturate(0.75) hue-rotate(-12deg) contrast(1.04);
}

/* --------------------------------------------------------------------------
   Font tokens live on `body`, NOT on :root.

   next/font injects its `--font-*` variables onto the element carrying the
   generated class — that is <body>. Declaring `--font-display: var(--font-x)`
   on :root therefore referenced a variable that is undefined at the root, and
   an undefined var() with no fallback makes the whole declaration invalid at
   computed-value time: `font-family` collapsed to the browser default (serif).
   Declaring these on body — where the variables actually exist — fixes it, and
   the inner var() fallbacks mean a missing font degrades to a real stack rather
   than to serif.
   -------------------------------------------------------------------------- */
body {
  --font-display: var(--font-space-grotesk, 'Space Grotesk'), ui-sans-serif, system-ui, sans-serif;
  --font-ui: var(--font-space-grotesk, 'Space Grotesk'), ui-sans-serif, system-ui, sans-serif;
  --font-mono: var(--font-ibm-plex-mono, 'IBM Plex Mono'), ui-monospace, SFMono-Regular, monospace;
}

/* --------------------------------------------------------------------------
   Hero surface scope.
   The hero band is always dark: the WebGL rig is lit for a near-black canvas
   and the Cyber Ronin plate is warm dark photography. Re-declaring the palette
   inside [data-surface="hero"] keeps that tuned rendering intact, while the
   page-level tokens (canvas, hero fade, grid) deliberately stay out of this
   block so the band still fades into the page below.
   -------------------------------------------------------------------------- */
[data-surface='hero'] {
"""

hero_extra = """  --glass-blur: 10px;
  --glow-opacity: 0.35;
  --hero-plate-opacity: 0.7;
  --hero-plate-filter: saturate(0.75) hue-rotate(-12deg) contrast(1.04);
}
"""

os.makedirs(os.path.dirname(OUT), exist_ok=True)
with open(OUT, 'w', encoding='utf-8') as f:
    f.write(doc + body + '\n' + emit(hero) + '\n' + hero_extra)
print(f'wrote {OUT}')
print(f'  surface tokens: {len(surface)}, mode tokens: {len(mode)}, hero tokens: {len(hero)}')
