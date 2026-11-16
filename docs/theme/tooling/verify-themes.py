"""Byte-level verification of the 10 portfolio theme trials (dark appearances only)."""
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

print('\n=== 2. compiled CSS: 10 theme trials, dark only ===')
_, html = get('/')
css_urls = sorted(set(re.findall(r'/_next/static/css/[A-Za-z0-9._-]+\.css', html)))
css = ''.join(get(u)[1] for u in css_urls)
print(f'  (css assets: {len(css_urls)}, {len(css)} bytes)')

trial_ids = [
    'neural-signal', 'quantum-indigo', 'solar-forge', 'obsidian-emerald',
    'cyber-violet', 'terminal-lime', 'arctic-steel', 'carbon-rose',
    'deep-ocean', 'monolith'
]
for tid in trial_ids:
    n = len(re.findall(r"\[data-theme=[\x22']?" + tid, css))
    check(f'scoped block present: {tid}', n >= 1, f'{n}')
check('default theme on :root (neural-signal canvas #08090c)', bool(re.search(r':root\s*\{[^}]*#08090c', css)))
check('color-scheme: dark', 'color-scheme:dark' in css.replace(' ', ''))
check('no [data-mode] selector', len(re.findall(r'\[data-mode', css)) == 0)
check('no prefers-color-scheme light', len(re.findall(r'prefers-color-scheme:\s*light', css)) == 0)

font_blocks = len(re.findall(r'body\s*\{[^}]*--font-display', css))
check('font tokens declared on body (11: base + 10 themes)', font_blocks >= 10, f'{font_blocks}')

print(f'\nTotal: {passes} passed, {fails} failed')
sys.exit(0 if fails == 0 else 1)
