"""
Crop the full-page captures into surfaces and compose comparison contact sheets.

Two jobs:
  1. CLASSIFY each capture by measured luminance, so "light mode is actually
     light" is a computed fact rather than an impression. The hero band is
     deliberately dark in both modes, so classification samples the PAGE band
     (below the hero), not the top of the image.
  2. Crop hero + page bands and compose sheets for review.
"""
import os
import subprocess
import sys

from PIL import Image

PREV = 'previews'
THEMES = [
    ('aurora', 'Aurora Obsidian', 3.27, 3.36),
    ('graphite', 'Graphite Ledger', 3.28, 3.45),
    ('cobalt', 'Cobalt Blueprint', 3.66, 3.12),
    ('ember', 'Ember Titanium', 3.39, 3.38),
    ('sage', 'Midnight Sage', 3.71, 3.42),
    ('noir', 'Noir Gallery', 3.43, 3.37),
]


def luma(px):
    r, g, b = px[:3]
    return 0.2126 * r + 0.7152 * g + 0.0722 * b


def band_mean(im, y0, y1):
    crop = im.crop((0, y0, im.width, y1)).resize((60, 20))
    px = list(crop.getdata())
    return sum(luma(p) for p in px) / len(px)


print('=== measured luminance per capture (page band, below the hero) ===')
print(f"{'theme':10s} {'mode':6s} {'size':>12s} {'hero luma':>10s} {'page luma':>10s}  verdict")
results = {}
for tid, name, _, _ in THEMES:
    for mode in ('dark', 'light'):
        f = os.path.join(PREV, f'proposed-{tid}-{mode}-home.png')
        im = Image.open(f).convert('RGB')
        h = im.height
        hero_luma = band_mean(im, int(h * 0.04), int(h * 0.10))
        page_luma = band_mean(im, int(h * 0.55), int(h * 0.60))
        verdict = 'light page' if page_luma > 128 else 'dark page'
        ok = (mode == 'light') == (page_luma > 128)
        results[(tid, mode)] = (hero_luma, page_luma, ok)
        print(f'{tid:10s} {mode:6s} {im.width}x{h:<7d} {hero_luma:10.1f} {page_luma:10.1f}  '
              f'{verdict}{"" if ok else "   <-- MISMATCH"}')

bad = [k for k, v in results.items() if not v[2]]
print()
print('mode/lightness agreement: %d/%d' % (len(results) - len(bad), len(results)))
if bad:
    print('  MISMATCHES:', bad)
    sys.exit(1)

heroc = {'dark': [], 'light': []}
pagec = {'dark': [], 'light': []}
hd = {'dark': [], 'light': []}
pd = {'dark': [], 'light': []}

for tid, name, fd, fl in THEMES:
    for mode in ('dark', 'light'):
        im = Image.open(os.path.join(PREV, f'proposed-{tid}-{mode}-home.png')).convert('RGB')
        h = im.height
        hero = im.crop((0, 0, im.width, min(900, h)))
        # the page band: first 760px below the hero fold
        page = im.crop((0, min(1300, h - 760), im.width, min(1300, h - 760) + 760))
        hp = os.path.join(PREV, f'crop-{tid}-{mode}-hero.png')
        pp = os.path.join(PREV, f'crop-{tid}-{mode}-page.png')
        hero.save(hp)
        page.save(pp)
        floor = (fd, fl)[mode == 'light']
        label = f'{name} · {"Porcelain" if False else mode}'
        heroc[mode].append(hp)
        pagec[mode].append(pp)
        hd[mode].append(f'{name} | {mode} · hero · lowest passing ratio {floor:.2f}:1')
        pd[mode].append(f'{name} | {mode} · page sections · lowest passing ratio {floor:.2f}:1')

for mode in ('dark', 'light'):
    subprocess.run([
        sys.executable, 'make_contact_sheet.py',
        '--files', *heroc[mode], '--labels', *hd[mode],
        '--out', os.path.join(PREV, f'sheet-{mode}-hero.png'),
        '--title', f'{mode.capitalize()} mode — hero — six themes (WebGL + plate held dark by design)',
        '--cols', '2', '--scale', '0.33',
    ], check=True)
    subprocess.run([
        sys.executable, 'make_contact_sheet.py',
        '--files', *pagec[mode], '--labels', *pd[mode],
        '--out', os.path.join(PREV, f'sheet-{mode}-page.png'),
        '--title', f'{mode.capitalize()} mode — page sections below the hero (canvas + surfaces must adapt)',
        '--cols', '2', '--scale', '0.33',
    ], check=True)
print('sheets written')
