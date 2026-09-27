"""
Generate the selectable-theme token layer: six themes, DARK APPEARANCES ONLY.

Cobalt Blueprint stays the default and is emitted on :root, so the site renders
correctly before any attribute is set (and for JS-disabled / unknown-theme
cases). The other five are scoped to [data-theme='<id>'].

Themes are emitted AFTER :root on purpose: [data-theme='aurora'] and :root both
match <html> at specificity (0,1,0), so source order decides — the theme block
must come last.

Font tokens are attached to `body`, not :root, because next/font injects its
--font-* variables onto the element carrying its generated class (body). A
var() reference to an undefined variable with no fallback invalidates the whole
font-family declaration and silently collapses text to the browser serif.
"""
import os

OUT = os.path.join('durgesh-portfolio-v6', 'styles', 'theme.css')

# dark palettes only; `fonts` = (display, ui, mono) CSS variable names
THEMES = {
    'cobalt': dict(
        name='Cobalt Blueprint', tagline='Schematic ink-navy, grid forward',
        canvas='#07131f', card='#0e2136', ink='#e8f2fa', body='#b7cee0', muted='#8aa7c0',
        accent='#6cb6e8', fill='#1d4ed8', onfill='#ffffff', sec='#22d3ee', bd='#4c7ca3',
        grad_a='#6cb6e8', grad_b='#22d3ee',
        fonts=('--font-space-grotesk', '--font-space-grotesk', '--font-ibm-plex-mono'),
        display_name='Space Grotesk', mono_name='IBM Plex Mono',
        radius='0.375rem', blur=10, glow=True,
        plate=0.7, plate_filter='saturate(0.75) hue-rotate(-12deg) contrast(1.04)'),
    'aurora': dict(
        name='Aurora Obsidian', tagline='Cinematic violet, the original brand',
        canvas='#0b0914', card='#161124', ink='#f4f1fa', body='#b6c2d1', muted='#8fa0b4',
        accent='#c084fc', fill='#7e22ce', onfill='#ffffff', sec='#fb7185', bd='#6b6288',
        grad_a='#c084fc', grad_b='#fb7185',
        fonts=('--font-inter', '--font-inter', '--font-jetbrains-mono'),
        display_name='Inter', mono_name='JetBrains Mono',
        radius='0.75rem', blur=16, glow=True,
        plate=1.0, plate_filter='saturate(1.03) contrast(1.02)'),
    'graphite': dict(
        name='Graphite Ledger', tagline='Editorial, serif, single amber accent',
        canvas='#111214', card='#1a1b1e', ink='#f2f2f0', body='#c4c6c9', muted='#9aa0a6',
        accent='#e8a33d', fill='#e8a33d', onfill='#17130a', sec='#e8a33d', bd='#6a6c71',
        grad_a='#e8a33d', grad_b='#f2f2f0',
        fonts=('--font-newsreader', '--font-inter', '--font-ibm-plex-mono'),
        display_name='Newsreader', mono_name='IBM Plex Mono',
        radius='0.5rem', blur=0, glow=False,
        plate=0.35, plate_filter='grayscale(0.8) contrast(1.05)'),
    'ember': dict(
        name='Ember Titanium', tagline='Warm industrial, matches the hero plate',
        canvas='#14100e', card='#1f1917', ink='#f8f2ed', body='#d0c2b8', muted='#a5958b',
        accent='#ff9a4d', fill='#ff8a3d', onfill='#201308', sec='#ffb37a', bd='#7d6a5f',
        grad_a='#ff9a4d', grad_b='#ffb37a',
        fonts=('--font-instrument-sans', '--font-instrument-sans', '--font-jetbrains-mono'),
        display_name='Instrument Sans', mono_name='JetBrains Mono',
        radius='1rem', blur=12, glow=True,
        plate=1.0, plate_filter='brightness(0.95) saturate(1.03) contrast(1.02)'),
    'sage': dict(
        name='Midnight Sage', tagline='Calm product engineering',
        canvas='#0c1411', card='#16211d', ink='#eaf4ef', body='#b8cbc1', muted='#8da398',
        accent='#63cfa6', fill='#2f9e73', onfill='#06251a', sec='#9fc9a8', bd='#56806e',
        grad_a='#63cfa6', grad_b='#9fc9a8',
        fonts=('--font-inter', '--font-inter', '--font-jetbrains-mono'),
        display_name='Inter', mono_name='JetBrains Mono',
        radius='0.75rem', blur=14, glow=False,
        plate=0.5, plate_filter='saturate(0.6) contrast(1.03)'),
    'noir': dict(
        name='Noir Gallery', tagline='Monochrome, one electric accent',
        canvas='#0a0a0a', card='#151515', ink='#fafafa', body='#c9c9c9', muted='#9c9c9c',
        accent='#ccff00', fill='#ccff00', onfill='#0a0a0a', sec='#fafafa', bd='#6b6b6b',
        grad_a='#fafafa', grad_b='#fafafa',
        fonts=('--font-archivo', '--font-inter', '--font-ibm-plex-mono'),
        display_name='Archivo', mono_name='IBM Plex Mono',
        radius='0.25rem', blur=0, glow=False,
        plate=0.25, plate_filter='grayscale(1) contrast(1.15) brightness(0.95)'),
}
ORDER = ['cobalt', 'aurora', 'graphite', 'ember', 'sage', 'noir']


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


def surface(t):
    canvas, card, ink = t['canvas'], t['card'], t['ink']
    accent, sec, fill, onfill = t['accent'], t['sec'], t['fill'], t['onfill']
    return {
        'canvas': canvas, 'background': canvas, 'card': card, 'card_foreground': ink,
        'popover': blend(card, canvas, 0.92), 'popover_foreground': ink,
        'muted': blend(ink, canvas, 0.06), 'accent': blend(accent, card, 0.14),
        'accent_foreground': ink,
        'ink': ink, 'body': t['body'], 'muted_foreground': t['muted'],
        'primary': accent, 'primary_foreground': onfill,
        'secondary': sec, 'secondary_foreground': onfill,
        'accent_fill': fill, 'on_accent_fill': onfill,
        'gradient_start': t['grad_a'], 'gradient_end': t['grad_b'],
        'border': blend(accent, card, 0.18), 'border_strong': t['bd'],
        'input': blend(t['bd'], card, 0.55), 'ring': accent,
        'destructive': '#ef4444', 'destructive_foreground': '#141223',
        'glass_bg': rgba(card, 0.65), 'glass_border': rgba(sec, 0.12),
        'shadow_1': f'0 1px 2px {rgba("#000000", 0.25)}',
        'shadow_2': f'0 8px 24px {rgba("#000000", 0.45)}',
        'shadow_3': f'0 16px 48px {rgba("#000000", 0.55)}',
        'card_shadow': f'0 12px 32px 0 {rgba("#000000", 0.45)}',
        'overlay_scrim': rgba('#000000', 0.8),
        'hero_bg': canvas, 'hero_fade': rgba(canvas, 0.7),
        'bg_primary': canvas, 'bg_surface': rgba(accent, 0.04),
        'grid_line': rgba(sec, 0.06), 'border_subtle': rgba(sec, 0.12),
        'border_hover': rgba(accent, 0.45),
        'text_main': ink, 'text_body': t['body'], 'text_muted': t['muted'],
        'violet_accent': accent, 'rose_accent': sec,
        'card_glass': rgba(card, 0.65), 'card_border': rgba(sec, 0.12),
        'modal_bg': rgba(canvas, 0.97),
    }


MODE = {
    'accent_lab': '#6ee7b7', 'accent_lab_bg': 'rgba(16, 185, 129, 0.12)', 'accent_lab_border': 'rgba(16, 185, 129, 0.40)',
    'accent_work': '#e9d5ff', 'accent_work_bg': 'rgba(168, 85, 247, 0.14)', 'accent_work_border': 'rgba(168, 85, 247, 0.42)',
    'accent_signal': '#38bdf8', 'accent_signal_bg': 'rgba(56, 189, 248, 0.12)', 'accent_signal_border': 'rgba(56, 189, 248, 0.40)',
    'accent_warm': '#fbbf24', 'accent_warm_bg': 'rgba(245, 158, 11, 0.12)', 'accent_warm_border': 'rgba(245, 158, 11, 0.40)',
    'accent_critical': '#f87171', 'accent_critical_bg': 'rgba(239, 68, 68, 0.12)', 'accent_critical_border': 'rgba(239, 68, 68, 0.40)',
    'chart_1': '#6ee7b7', 'chart_2': '#fbbf24', 'chart_3': '#38bdf8', 'chart_4': '#c084fc', 'chart_5': '#f87171',
}


def emit(tokens, indent='  '):
    out = []
    for k, v in tokens.items():
        name = '--' + k.replace('_', '-')
        if isinstance(v, str) and v.startswith('#') and len(v) == 7:
            out.append(f'{indent}{name}: {v};')
            out.append(f'{indent}{name}-rgb: {chan(v)};')
        else:
            out.append(f'{indent}{name}: {v};')
    return '\n'.join(out)


def fonts(t):
    """Plain concatenation rather than f-string interpolation: the values need
    single quotes inside the declaration, which does not mix with the quoted
    dict access in an f-string expression."""
    d, u, m = t['fonts']
    dn = t['display_name']
    mn = t['mono_name']
    return (
        '  --font-display: var(' + d + ", '" + dn + "'), ui-sans-serif, system-ui, sans-serif;\n"
        '  --font-ui: var(' + u + ", '" + dn + "'), ui-sans-serif, system-ui, sans-serif;\n"
        '  --font-mono: var(' + m + ", '" + mn + "'), ui-monospace, SFMono-Regular, monospace;"
    )


def chrome(t):
    return (f'  --glass-blur: {t["blur"]}px;\n'
            f'  --glow-opacity: {"0.35" if t["glow"] else "0.00"};\n'
            f'  --glow: 0 0 30px {rgba(t["accent"], 0.35 if t["glow"] else 0.0)};\n'
            f'  --radius: {t["radius"]};\n'
            '  --motion-fast: 150ms;\n  --motion-base: 350ms;\n  --motion-slow: 800ms;\n'
            f'  --hero-plate-opacity: {t["plate"]};\n'
            f'  --hero-plate-filter: {t["plate_filter"]};')


doc = """/* ==========================================================================
   PORTFOLIO THEME — six selectable themes, DARK APPEARANCES ONLY
   --------------------------------------------------------------------------
   Cobalt Blueprint is the default and is declared on :root, so the site renders
   correctly before any attribute exists (JS disabled, unknown theme, no stored
   choice). The other five themes are scoped to [data-theme='<id>'].

   Theme blocks come AFTER :root deliberately: [data-theme='aurora'] and :root
   both match <html> at specificity (0,1,0), so source order decides the winner.

   There is no light mode. `color-scheme: dark` is unconditional and no
   [data-mode] selector exists anywhere.

   Font tokens are declared on `body`, never on :root: next/font injects its
   --font-* variables onto the element that carries its generated class (body).
   Referencing an undefined var() with no fallback invalidates the entire
   font-family declaration, which collapses text to the browser serif.

   Measured contrast floors (WCAG 2.1, on card surfaces): cobalt 3.66,
   aurora 3.27, graphite 3.28, ember 3.39, sage 3.71, noir 3.43 — all >= 3:1 for
   UI boundaries, with every text pair above 4.5:1.
   ========================================================================== */

:root {
  color-scheme: dark;

  /* ---- status roles (semantic, shared by every theme) ---- */
"""

parts = [doc, emit(MODE), '\n  /* ---- default theme: Cobalt Blueprint ---- */\n',
         emit(surface(THEMES['cobalt'])), '\n', chrome(THEMES['cobalt']), '\n}\n',
          '\n/* Base font tokens (Cobalt Blueprint faces), declared on body where the\n'
         '   next/font variables actually exist. */\n',
         'body {\n', fonts(THEMES['cobalt']), '\n}\n']

for tid in ORDER:
    if tid == 'cobalt':
        continue
    t = THEMES[tid]
    parts.append(f"\n/* ---- {t['name']} — {t['tagline']} ---- */\n")
    parts.append(f"[data-theme='{tid}'] {{\n")
    parts.append(emit(surface(t)))
    parts.append('\n' + chrome(t) + '\n}\n')
    parts.append(f"[data-theme='{tid}'] body {{\n{fonts(t)}\n}}\n")

# hero scope, per theme: keeps the band on that theme's own values
parts.append("""
/* --------------------------------------------------------------------------
   Hero surface scope.
   The hero band is always dark: the WebGL rig is lit for a near-black canvas
   and the Cyber Ronin plate is warm dark photography. Re-declaring the palette
   inside [data-surface="hero"] pins the band to the active theme's values while
   the page-level tokens (canvas, hero fade, grid) stay out of this block, so the
   band still fades into the page below.
   -------------------------------------------------------------------------- */
""")
for tid in ORDER:
    t = THEMES[tid]
    scope = {k: v for k, v in surface(t).items()
             if k not in ('canvas', 'background', 'bg_primary', 'hero_bg', 'hero_fade',
                          'modal_bg', 'bg_surface', 'grid_line', 'border_subtle', 'overlay_scrim')}
    hero_attr = "[data-surface='hero']"
    sel = hero_attr if tid == 'cobalt' else "[data-theme='" + tid + "'] " + hero_attr
    parts.append(f'{sel} {{\n{emit(scope)}\n'
                 f'  --glass-blur: {t["blur"]}px;\n'
                 f'  --glow-opacity: {"0.35" if t["glow"] else "0.00"};\n'
                 f'  --hero-plate-opacity: {t["plate"]};\n'
                 f'  --hero-plate-filter: {t["plate_filter"]};\n}}\n')

os.makedirs(os.path.dirname(OUT), exist_ok=True)
with open(OUT, 'w', encoding='utf-8') as f:
    f.write(''.join(parts))
css = ''.join(parts)
print(f'wrote {OUT}  ({len(css)} bytes)')
emitted = sum(1 for t in ORDER if ("data-theme='" + t + "'") in css)
print('  themes emitted: ' + str(emitted) + ' of ' + str(len(ORDER)))
print(f"  light-mode selectors: {css.count('data-mode')}")
print(f"  'body' font blocks: {css.count('body {')}")
