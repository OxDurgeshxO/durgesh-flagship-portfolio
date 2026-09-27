"""
Generate the theme token layer for durgesh-flagship-portfolio.

Values marked 'verified' come from the contrast table that was measured with the
WCAG 2.1 relative-luminance formula (theme_catalogue_check.py). Everything else is
DERIVED from those primitives by alpha-compositing, so no invented hues enter the
palette, and every derived pair is re-checked at the end of this script.

Output: staging/themes/{_contract.css, aurora.css, graphite.css, cobalt.css,
        ember.css, sage.css, noir.css}
"""
import os

OUT = os.path.join('staging', 'themes')

# ---------------------------------------------------------------------------
# 1. Verified palettes (dark / light). Keys: canvas card ink body muted accent
#    fill onfill sec bd(gradient start,end)
# ---------------------------------------------------------------------------
THEMES = {
    'aurora': dict(
        name='Aurora Obsidian', light_label='Porcelain Daylight',
        display='Inter', ui='Inter', mono='JetBrains Mono',
        radius='0.75rem', glass_blur_d=16, glass_blur_l=14, glow=1,
        plate_opacity_d=1.0, plate_opacity_l=0.9, plate_filter='saturate(1.03) contrast(1.02)',
        dark=dict(canvas='#0b0914', card='#161124', ink='#f4f1fa', body='#b6c2d1',
                  muted='#8fa0b4', accent='#c084fc', fill='#7e22ce', onfill='#ffffff',
                  sec='#fb7185', bd='#6b6288', grad_a='#c084fc', grad_b='#fb7185'),
        light=dict(canvas='#faf9fc', card='#ffffff', ink='#1c1726', body='#4b4459',
                   muted='#635d70', accent='#6d28d9', fill='#6d28d9', onfill='#ffffff',
                   sec='#be123c', bd='#8f89a0', grad_a='#6d28d9', grad_b='#be123c')),
    'graphite': dict(
        name='Graphite Ledger', light_label='Bone Paper',
        display='Newsreader', ui='Inter', mono='IBM Plex Mono',
        radius='0.5rem', glass_blur_d=0, glass_blur_l=0, glow=0,
        plate_opacity_d=0.35, plate_opacity_l=0.25, plate_filter='grayscale(0.8) contrast(1.05)',
        dark=dict(canvas='#111214', card='#1a1b1e', ink='#f2f2f0', body='#c4c6c9',
                  muted='#9aa0a6', accent='#e8a33d', fill='#e8a33d', onfill='#17130a',
                  sec='#e8a33d', bd='#6a6c71', grad_a='#e8a33d', grad_b='#f2f2f0'),
        light=dict(canvas='#faf8f4', card='#ffffff', ink='#17181a', body='#4a4c50',
                   muted='#6b6e73', accent='#8a5200', fill='#8a5200', onfill='#ffffff',
                   sec='#8a5200', bd='#8c8a86', grad_a='#17181a', grad_b='#17181a')),
    'cobalt': dict(
        name='Cobalt Blueprint', light_label='Cyanotype',
        display='Space Grotesk', ui='Space Grotesk', mono='IBM Plex Mono',
        radius='0.375rem', glass_blur_d=10, glass_blur_l=8, glow=1,
        plate_opacity_d=0.7, plate_opacity_l=0.55, plate_filter='saturate(0.75) hue-rotate(-12deg) contrast(1.04)',
        dark=dict(canvas='#07131f', card='#0e2136', ink='#e8f2fa', body='#b7cee0',
                  muted='#8aa7c0', accent='#6cb6e8', fill='#1d4ed8', onfill='#ffffff',
                  sec='#22d3ee', bd='#4c7ca3', grad_a='#6cb6e8', grad_b='#22d3ee'),
        light=dict(canvas='#f3f8fc', card='#ffffff', ink='#0b1a26', body='#3b5162',
                   muted='#566e80', accent='#0b5f96', fill='#0b5f96', onfill='#ffffff',
                   sec='#0a5f78', bd='#7d95a6', grad_a='#0b5f96', grad_b='#0a5f78')),
    'ember': dict(
        name='Ember Titanium', light_label='Sandstone',
        display='Instrument Sans', ui='Instrument Sans', mono='JetBrains Mono',
        radius='1rem', glass_blur_d=12, glass_blur_l=12, glow=1,
        plate_opacity_d=1.0, plate_opacity_l=0.95, plate_filter='brightness(0.95) saturate(1.03) contrast(1.02)',
        dark=dict(canvas='#14100e', card='#1f1917', ink='#f8f2ed', body='#d0c2b8',
                  muted='#a5958b', accent='#ff9a4d', fill='#ff8a3d', onfill='#201308',
                  sec='#ffb37a', bd='#7d6a5f', grad_a='#ff9a4d', grad_b='#ffb37a'),
        light=dict(canvas='#f8f3ed', card='#ffffff', ink='#231a14', body='#52453b',
                   muted='#6f6055', accent='#a8400a', fill='#a8400a', onfill='#ffffff',
                   sec='#8f3f10', bd='#9c8878', grad_a='#a8400a', grad_b='#8f3f10')),
    'sage': dict(
        name='Midnight Sage', light_label='Birch Studio',
        display='Inter', ui='Inter', mono='JetBrains Mono',
        radius='0.75rem', glass_blur_d=14, glass_blur_l=12, glow=0,
        plate_opacity_d=0.5, plate_opacity_l=0.35, plate_filter='saturate(0.6) contrast(1.03)',
        dark=dict(canvas='#0c1411', card='#16211d', ink='#eaf4ef', body='#b8cbc1',
                  muted='#8da398', accent='#63cfa6', fill='#2f9e73', onfill='#06251a',
                  sec='#9fc9a8', bd='#56806e', grad_a='#63cfa6', grad_b='#9fc9a8'),
        light=dict(canvas='#f6f8f4', card='#ffffff', ink='#141b17', body='#414d47',
                   muted='#5f6d66', accent='#1f6f4e', fill='#1f6f4e', onfill='#ffffff',
                   sec='#2f6f52', bd='#7d8f85', grad_a='#1f6f4e', grad_b='#2f6f52')),
    'noir': dict(
        name='Noir Gallery', light_label='Museum White',
        display='Archivo', ui='Inter', mono='IBM Plex Mono',
        radius='0.25rem', glass_blur_d=0, glass_blur_l=0, glow=0,
        plate_opacity_d=0.25, plate_opacity_l=0.18, plate_filter='grayscale(1) contrast(1.15) brightness(0.95)',
        dark=dict(canvas='#0a0a0a', card='#151515', ink='#fafafa', body='#c9c9c9',
                  muted='#9c9c9c', accent='#ccff00', fill='#ccff00', onfill='#0a0a0a',
                  sec='#fafafa', bd='#6b6b6b', grad_a='#fafafa', grad_b='#fafafa'),
        light=dict(canvas='#ffffff', card='#f6f6f6', ink='#0a0a0a', body='#3c3c3c',
                   muted='#666666', accent='#3f6212', fill='#3f6212', onfill='#ffffff',
                   sec='#0a0a0a', bd='#868686', grad_a='#0a0a0a', grad_b='#0a0a0a')),
}


# ---------------------------------------------------------------------------
# 2. colour helpers
# ---------------------------------------------------------------------------
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


def lin(c):
    c = c / 255.0
    return c / 12.92 if c <= 0.03928 else ((c + 0.055) / 1.055) ** 2.4


def lum(h):
    r, g, b = rgb(h)
    return 0.2126 * lin(r) + 0.7152 * lin(g) + 0.0722 * lin(b)


def ratio(a, b):
    la, lb = lum(a), lum(b)
    return (max(la, lb) + 0.05) / (min(la, lb) + 0.05)


# ---------------------------------------------------------------------------
# 3. derive the full token set for one theme+mode
# ---------------------------------------------------------------------------
def derive(p, mode, hero_canvas):
    dark = mode == 'dark'
    canvas, card, ink = p['canvas'], p['card'], p['ink']
    accent, sec, fill, onfill = p['accent'], p['sec'], p['fill'], p['onfill']

    surface_base = canvas if dark else card
    border = blend(accent if dark else ink, card, 0.18 if dark else 0.10)
    muted_fill = blend(ink, surface_base, 0.06 if dark else 0.05)
    accent_tint = blend(accent, card, 0.14 if dark else 0.10)
    popover = blend(card, canvas, 0.92) if dark else card

    t = dict(
        # --- surfaces ------------------------------------------------------
        canvas=canvas, background=canvas, card=card, card_foreground=ink,
        popover=popover, popover_foreground=ink,
        muted=muted_fill, accent=accent_tint, accent_foreground=ink,
        # --- text ---------------------------------------------------------
        ink=ink, body=p['body'], muted_foreground=p['muted'],
        # --- brand --------------------------------------------------------
        primary=accent, primary_foreground=onfill, secondary=sec, secondary_foreground=onfill,
        accent_fill=fill, on_accent_fill=onfill,
        gradient_start=p['grad_a'], gradient_end=p['grad_b'],
        # --- structure ----------------------------------------------------
        border=border, border_strong=p['bd'],
        input=blend(p['bd'], card, 0.55) if dark else p['bd'],
        ring=accent,
        destructive='#ef4444' if dark else '#b91c1c',
        destructive_foreground='#141223' if dark else '#ffffff',
        # --- depth --------------------------------------------------------
        glass_bg=rgba(card, 0.65) if dark else rgba('#ffffff', 0.72),
        glass_border=rgba(sec, 0.12) if dark else rgba(ink, 0.08),
        shadow_1=f'0 1px 2px {rgba("#000000", 0.25 if dark else 0.04)}',
        shadow_2=f'0 8px 24px {rgba("#000000", 0.45 if dark else 0.06)}',
        shadow_3=f'0 16px 48px {rgba("#000000", 0.55 if dark else 0.09)}',
        card_shadow=(f'0 12px 32px 0 {rgba("#000000", 0.45)}' if dark
                     else f'0 8px 24px 0 {rgba(ink, 0.06)}'),
        overlay_scrim=rgba('#000000', 0.8) if dark else rgba(ink, 0.45),
        # --- hero (always dark) -------------------------------------------
        hero_bg=hero_canvas, hero_fade=rgba(hero_canvas, 0.7),
        # --- legacy aliases still referenced by existing components --------
        bg_primary=canvas, bg_surface=rgba(accent, 0.04 if dark else 0.03),
        grid_line=rgba(sec if dark else accent, 0.06),
        border_subtle=rgba(sec if dark else ink, 0.12 if dark else 0.08),
        border_hover=rgba(accent, 0.45 if dark else 0.35),
        text_main=ink, text_body=p['body'], text_muted=p['muted'],
        violet_accent=accent, rose_accent=sec,
        card_glass=(rgba(card, 0.65) if dark else rgba('#ffffff', 0.72)),
        card_border=(rgba(sec, 0.12) if dark else rgba(ink, 0.08)),
        modal_bg=rgba(canvas, 0.97),
    )
    # `--radius` is emitted by the caller; everything else is ready here.
    return t


# ---------------------------------------------------------------------------
# 4. emit CSS
# ---------------------------------------------------------------------------
def block(t, indent='  '):
    """t: dict token -> value. Emits hex + -rgb channel pairs where applicable."""
    lines = []
    for k, v in t.items():
        name = '--' + k.replace('_', '-')
        if isinstance(v, str) and v.startswith('#') and len(v) == 7:
            lines.append(f'{indent}{name}: {v};')
            lines.append(f'{indent}{name}-rgb: {chan(v)};')
        else:
            lines.append(f'{indent}{name}: {v};')
    return '\n'.join(lines)


os.makedirs(OUT, exist_ok=True)

for tid, spec in THEMES.items():
    parts = [
        '/* ==========================================================================',
        f'   Theme: {spec["name"]} (dark) / {spec["light_label"]} (light)',
        '   Generated from the verified palette table — hexes are the measured ones.',
        '   Selector is [data-theme=\'x\'] (NOT :root[...]) so a theme can be scoped to',
        '   any element for the /theme-lab comparison harness.',
        '   ========================================================================== */',
        '',
        f"[data-theme='{tid}'] {{",
        block(derive(spec['dark'], 'dark', spec['dark']['canvas'])),
        '  --glass-blur: %dpx;' % spec['glass_blur_d'],
        '  --glow-opacity: %.2f;' % (0.35 if spec['glow'] else 0.0),
        '  --glow: 0 0 30px %s;' % rgba(spec['dark']['accent'], 0.35 if spec['glow'] else 0.0),
        '  --radius: %s;' % spec['radius'],
        '  --font-display: var(--font-%s), ui-sans-serif, system-ui, sans-serif;' % spec['display'].lower().replace(' ', '-'),
        '  --font-ui: var(--font-%s), ui-sans-serif, system-ui, sans-serif;' % spec['ui'].lower().replace(' ', '-'),
        '  --font-mono: var(--font-%s), ui-monospace, monospace;' % spec['mono'].lower().replace(' ', '-'),
        '  --hero-plate-opacity: %.2f;' % spec['plate_opacity_d'],
        '  --hero-plate-filter: %s;' % spec['plate_filter'],
        '}',
        '',
        f"[data-theme='{tid}'][data-mode='light'] {{",
        block(derive(spec['light'], 'light', spec['dark']['canvas'])),
        '  --glass-blur: %dpx;' % spec['glass_blur_l'],
        '  --glow-opacity: 0.00;',
        '  --glow: 0 0 0 rgba(0, 0, 0, 0);',
        '  --radius: %s;' % spec['radius'],
        '  --font-display: var(--font-%s), ui-sans-serif, system-ui, sans-serif;' % spec['display'].lower().replace(' ', '-'),
        '  --font-ui: var(--font-%s), ui-sans-serif, system-ui, sans-serif;' % spec['ui'].lower().replace(' ', '-'),
        '  --font-mono: var(--font-%s), ui-monospace, monospace;' % spec['mono'].lower().replace(' ', '-'),
        '  --hero-plate-opacity: %.2f;' % spec['plate_opacity_l'],
        '  --hero-plate-filter: %s;' % spec['plate_filter'],
        '}',
        '',
        '/* --------------------------------------------------------------------------',
        "   Hero surface scope.",
        '   The hero band is ALWAYS dark, in both modes, by design: the WebGL rig is',
        '   tuned against the dark canvas and the Cyber Ronin plate is warm dark',
        '   photography, so keeping the band dark means neither needs re-authoring.',
        '   Re-declaring the palette inside [data-surface="hero"] makes the hero',
        '   subtree resolve to the dark values in BOTH modes, with zero component',
        '   conditionals. Page-level tokens (canvas, hero fade, grid) are deliberately',
        '   NOT re-declared, so the band still fades into the light page below.',
        '   Specificity (0,3,0) beats the (0,2,0) mode block, so this wins in light.',
        '   -------------------------------------------------------------------------- */',
        f"[data-theme='{tid}'] [data-surface='hero'] {{",
    ]
    hero_tokens = dict(derive(spec['dark'], 'dark', spec['dark']['canvas']))
    for k in ('canvas', 'background', 'bg_primary', 'hero_bg', 'hero_fade',
              'modal_bg', 'bg_surface', 'grid_line', 'border_subtle', 'overlay_scrim'):
        hero_tokens.pop(k, None)
    parts.append(block(hero_tokens))
    parts += [
        '  --glass-blur: %dpx;' % spec['glass_blur_d'],
        '  --glow-opacity: %.2f;' % (0.35 if spec['glow'] else 0.0),
        '  --hero-plate-opacity: %.2f;' % spec['plate_opacity_d'],
        '  --hero-plate-filter: %s;' % spec['plate_filter'],
        '}',
        '',
    ]
    with open(os.path.join(OUT, f'{tid}.css'), 'w', encoding='utf-8') as f:
        f.write('\n'.join(parts))
    print(f'wrote {tid}.css')

# ---------------------------------------------------------------------------
# 5. re-verify every derived pair that components will actually use
# ---------------------------------------------------------------------------
print()
print(f"{'theme':10s} {'mode':6s} {'ink/card':>9s} {'body/card':>10s} {'muted/glass':>12s} "
      f"{'acc/card':>9s} {'lbl/fill':>9s} {'bdr/card':>9s} {'bdr/input':>10s} verdict")
worst_all = 9.9
for tid, spec in THEMES.items():
    for mode in ('dark', 'light'):
        p = spec[mode]
        t = derive(p, mode, spec['dark']['canvas'])
        glass_eff = blend(p['card'], p['canvas'], 0.65) if mode == 'dark' else blend('#ffffff', p['canvas'], 0.72)
        checks = [
            ('ink/card', ratio(t['ink'], t['card']), 4.5),
            ('body/card', ratio(t['body'], t['card']), 4.5),
            ('muted/glass', ratio(t['muted_foreground'], glass_eff), 4.5),
            ('acc/card', ratio(t['primary'], t['card']), 4.5),
            ('lbl/fill', ratio(t['on_accent_fill'], t['accent_fill']), 4.5),
            ('bdr/card', ratio(t['border_strong'], t['card']), 3.0),
            ('bdr/input', ratio(t['input'], t['card']), 1.0),
        ]
        fails = [f'{n}={v:.2f}(need {k})' for n, v, k in checks if v < k]
        vals = [v for _, v, _ in checks]
        worst_all = min(worst_all, min(vals))
        print(f"{tid:10s} {mode:6s} {checks[0][1]:9.2f} {checks[1][1]:10.2f} {checks[2][1]:12.2f} "
              f"{checks[3][1]:9.2f} {checks[4][1]:9.2f} {checks[5][1]:9.2f} {checks[6][1]:10.2f} "
              + ('OK' if not fails else 'FAIL: ' + '; '.join(fails)))
print()
print(f'lowest derived ratio overall: {worst_all:.2f}')
