"""Verify the per-theme captures hold real content, then compose one sheet."""
import os
import subprocess
import sys

from PIL import Image, ImageStat

PREV = 'previews'
THEMES = [
    ('cobalt', 'Cobalt Blueprint', 3.66, 'default'),
    ('aurora', 'Aurora Obsidian', 3.27, ''),
    ('graphite', 'Graphite Ledger', 3.28, 'serif display'),
    ('ember', 'Ember Titanium', 3.39, ''),
    ('sage', 'Midnight Sage', 3.71, ''),
    ('noir', 'Noir Gallery', 3.43, 'monochrome'),
]

print('=== per-theme captures: content + palette check ===')
print(f"{'theme':10s} {'mean luma':>10s} {'stddev':>8s} {'corner px':>18s}  verdict")
files, labels, canvases = [], [], {}
ok_all = True
for tid, name, floor, note in THEMES:
    f = os.path.join(PREV, f'theme-{tid}.png')
    im = Image.open(f).convert('RGB')
    g = im.convert('L')
    st = ImageStat.Stat(g)
    corner = im.getpixel((im.width - 8, im.height - 8))
    canvases[tid] = '#%02x%02x%02x' % corner
    content = st.stddev[0] > 8
    dark = st.mean[0] < 100
    if not (content and dark):
        ok_all = False
    print(f'{tid:10s} {st.mean[0]:10.1f} {st.stddev[0]:8.1f} {canvases[tid]:>18s}  '
          + ('ok' if content and dark else ('BLANK' if not content else 'NOT DARK')))
    files.append(f)
    labels.append(f'{name} | dark · lowest passing ratio {floor:.2f}:1' + (f' · {note}' if note else ''))

print()
print('distinct canvas colours across the six captures:', len(set(canvases.values())), '/ 6')
print('all captures contain content and are dark:', ok_all)
print('canvas map:', canvases)

subprocess.run([
    sys.executable, 'make_contact_sheet.py',
    '--files', *files, '--labels', *labels,
    '--out', os.path.join(PREV, 'sheet-themes-restored.png'),
    '--title', 'Six selectable themes — dark appearances only · Cobalt Blueprint is the default',
    '--cols', '2', '--scale', '0.33',
], check=True)

if not ok_all or len(set(canvases.values())) != 6:
    sys.exit(1)
