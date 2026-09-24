"""Point the three stale comments at the new single stylesheet (and stop
describing a dual-mode layer that no longer exists)."""
import os

REPO = os.path.join('durgesh-portfolio-v6')

EDITS = [
    ('components/sections/HeroSection.tsx', [
        ('      {/* data-surface="hero" scopes the palette to the DARK values in BOTH modes\r\n'
         '          (see styles/themes/*.css). Rationale: the WebGL rig is lit for a\r\n'
         '          near-black canvas and the Cyber Ronin plate is warm dark photography,\r\n'
         '          so keeping the band dark avoids re-authoring either one. Page-level\r\n'
         '          tokens (canvas, hero fade, grid) stay mode-aware, so the band still\r\n'
         '          fades into a light page below. */}',
         '      {/* data-surface="hero" re-declares the palette for the hero subtree\r\n'
         '          (see styles/theme.css). Rationale: the WebGL rig is lit for a\r\n'
         '          near-black canvas and the Cyber Ronin plate is warm dark photography,\r\n'
         '          so the band is kept on those values rather than re-authored. Page-level\r\n'
         '          tokens (canvas, hero fade, grid) are deliberately NOT re-declared, so the\r\n'
         '          band still fades into the page below. */}'),
    ]),
    ('styles/globals.css', [
        ('   DUAL-MODE THEME LAYER\r\n'
         '   --------------------------------------------------------------------------\r\n'
         '   Declarations here are mode/theme aware through the tokens defined in\r\n'
         '   styles/themes/*.css. Nothing here hardcodes a colour.',
         '   THEME LAYER (Cobalt Blueprint, dark only)\r\n'
         '   --------------------------------------------------------------------------\r\n'
         '   Declarations here read the tokens defined in styles/theme.css.\r\n'
         '   Nothing here hardcodes a colour.'),
    ]),
    ('tailwind.config.ts', [
        ('        /* --- Dual-mode theme tokens (styles/themes/*.css) -------------------\r\n'
         '           The only colour names components should use. Every theme defines all\r\n'
         '           of them in BOTH modes, so bg-card / text-ink / border-border-strong\r\n'
         '           resolve correctly in dark and light. Declared as channel triples so\r\n'
         '           opacity modifiers (`bg-card/50`, `border-border/80`) still compile. */',
         '        /* --- Theme tokens (styles/theme.css) --------------------------------\r\n'
         '           The only colour names components should use. They are declared as\r\n'
         '           channel triples so opacity modifiers (`bg-card/50`,\r\n'
         '           `border-border/80`) still compile. */'),
    ]),
]

for rel, pairs in EDITS:
    p = os.path.join(REPO, rel)
    with open(p, 'r', encoding='utf-8', newline='') as f:
        src = f.read()
    for old, new in pairs:
        n = src.count(old)
        print(('  ok x%d  ' % n if n else '  MISS    ') + rel)
        src = src.replace(old, new)
    with open(p, 'w', encoding='utf-8', newline='') as f:
        f.write(src)

# final sweep
import subprocess
hits = []
for root, dirs, files in os.walk(REPO):
    dirs[:] = [d for d in dirs if d not in ('node_modules', '.next', 'out', '.git')]
    for fn in files:
        if not fn.endswith(('.tsx', '.ts', '.css')):
            continue
        fp = os.path.join(root, fn)
        with open(fp, 'r', encoding='utf-8', errors='ignore') as f:
            for i, line in enumerate(f, 1):
                if 'styles/themes' in line or 'DUAL-MODE' in line or 'BOTH modes' in line:
                    hits.append(f'{os.path.relpath(fp, REPO)}:{i}: {line.strip()[:80]}')
print('\nremaining stale references:', len(hits))
for h in hits:
    print(' ', h)
