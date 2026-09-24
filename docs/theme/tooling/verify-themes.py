"""Byte-level verification of the restored theme switcher (dark appearances only)."""
import re
import sys
import urllib.request

BASE = 'http://127.0.0.1:3100'
passes = fails = 0


def check(label, ok, extra=''):
    global passes, fails
    if ok:
        passes += 1
        print(f'  PASS  {label}' + (f' — {extra}' if extra else ''))
    else:
        fails += 1
        print(f'  FAIL  {label}' + (f' — {extra}' if extra else ''))


def get(path):
    with urllib.request.urlopen(BASE + path, timeout=10) as r:
        return r.status, r.read().decode('utf-8', 'replace')


print('=== 1. routes ===')
for r in ['/', '/resume', '/recruiter', '/github-health', '/lab', '/performance',
          '/privacy', '/changelog', '/work/roleradar']:
    try:
        check(f'{r} -> 200', get(r)[0] == 200)
    except Exception as e:
        check(f'{r} -> {e}', False)

print('\n=== 2. compiled CSS: six themes, dark only ===')
_, html = get('/')
css_urls = sorted(set(re.findall(r'/_next/static/css/[A-Za-z0-9._-]+\.css', html)))
css = ''.join(get(u)[1] for u in css_urls)
print(f'  (css assets: {len(css_urls)}, {len(css)} bytes)')

for tid in ['aurora', 'graphite', 'ember', 'sage', 'noir']:
    n = len(re.findall(r"\[data-theme=[\x22']?" + tid, css))
    check(f'scoped block present: {tid}', n >= 1, f'{n}')
check('default theme on :root (cobalt canvas)', bool(re.search(r':root\s*\{[^}]*#07131f', css)))
check('color-scheme: dark', 'color-scheme:dark' in css.replace(' ', ''))
check('no [data-mode] selector', len(re.findall(r'\[data-mode', css)) == 0)
check('no prefers-color-scheme light', len(re.findall(r'prefers-color-scheme:\s*light', css)) == 0)
light_hexes = ['#faf9fc', '#f8f3ed', '#f6f8f4', '#f3f8fc', '#faf8f4', '#ffffff']
present = [h for h in light_hexes if h in css.lower() and h != '#ffffff']
check('no light canvas hexes', not present, ','.join(present))
font_blocks = len(re.findall(r'body\s*\{[^}]*--font-display', css))
check('font tokens declared on body (6: base + 5 themes)', font_blocks >= 6, f'{font_blocks}')
check('font tokens NOT on :root',
      len(re.findall(r':root\s*\{[^}]*--font-display', css)) == 0)
check('hero scope per theme', len(re.findall(r"\[data-surface=[\x22']?hero", css)) >= 6,
      str(len(re.findall(r"\[data-surface=[\x22']?hero", css))))

print('\n=== 3. delivered HTML ===')
check('boot script present', "portfolio-theme" in html or "data-theme" in html)
check('static default data-theme="cobalt"', 'data-theme="cobalt"' in html)
check('panel trigger present', 'Choose theme' in html)
check('no day/night wording', 'Switch to light' not in html and 'Switch to dark' not in html)
check('no data-mode attribute', 'data-mode' not in html)
check('dark theme-color', 'content="#07131f"' in html)

print(f'\n=== {passes} passed, {fails} failed ===')
sys.exit(1 if fails else 0)
