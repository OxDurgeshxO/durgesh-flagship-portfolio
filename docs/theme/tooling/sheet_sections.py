"""Verify the scrolled section captures contain real content, then compose sheets."""
import os
import subprocess
import sys

from PIL import Image, ImageStat

PREV = 'previews'
THEMES = [
    ('aurora', 'Aurora Obsidian', 3.27, 3.36),
    ('graphite', 'Graphite Ledger', 3.28, 3.45),
    ('cobalt', 'Cobalt Blueprint', 3.66, 3.12),
    ('ember', 'Ember Titanium', 3.39, 3.38),
    ('sage', 'Midnight Sage', 3.71, 3.42),
    ('noir', 'Noir Gallery', 3.43, 3.37),
]

print('=== scrolled section captures: content check ===')
print(f"{'theme':10s} {'mode':6s} {'mean luma':>10s} {'stddev':>8s}  verdict")
ok_all = True
files = {'dark': [], 'light': []}
labels = {'dark': [], 'light': []}
for tid, name, fd, fl in THEMES:
    for mode in ('dark', 'light'):
        f = os.path.join(PREV, f'section-{tid}-{mode}.png')
        im = Image.open(f).convert('L')
        st = ImageStat.Stat(im)
        mean, sd = st.mean[0], st.stddev[0]
        # a flat/blank band has near-zero variance
        content = sd > 8
        mode_ok = (mean > 128) == (mode == 'light')
        verdict = ('content' if content else 'BLANK') + ('' if mode_ok else ' / MODE MISMATCH')
        if not (content and mode_ok):
            ok_all = False
        print(f'{tid:10s} {mode:6s} {mean:10.1f} {sd:8.1f}  {verdict}')
        files[mode].append(f)
        floor = (fd, fl)[mode == 'light']
        labels[mode].append(f'{name} | {mode} · projects section · lowest passing ratio {floor:.2f}:1')

print()
print('all section captures contain content and match their mode:', ok_all)

for mode in ('dark', 'light'):
    subprocess.run([
        sys.executable, 'make_contact_sheet.py',
        '--files', *files[mode], '--labels', *labels[mode],
        '--out', os.path.join(PREV, f'sheet-{mode}-sections.png'),
        '--title', f'{mode.capitalize()} mode — real page sections (scrolled, reveals triggered)',
        '--cols', '2', '--scale', '0.33',
    ], check=True)

if not ok_all:
    sys.exit(1)
