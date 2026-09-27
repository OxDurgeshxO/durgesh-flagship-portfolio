"""
Verify the served build really is single-theme / dark-only.

Checks the delivered bytes, not the source: routes respond, the compiled CSS
contains no light-mode or other-theme rules, the switching UI is gone, and the
Cobalt palette is actually the one in use.
"""
import re
import sys
import urllib.request

BASE = 'http://127.0.0.1:3100'
passes = 0
fails = 0


def get(path):
    with urllib.request.urlopen(BASE + path, timeout=10) as r:
        return r.status, r.read().decode('utf-8', 'replace')


def check(label, ok, extra=''):
    global passes, fails
    if ok:
        passes += 1
        print(f'  PASS  {label}' + (f' — {extra}' if extra else ''))
    else:
        fails += 1
        print(f'  FAIL  {label}' + (f' — {extra}' if extra else ''))


print('=== 1. routes respond ===')
routes = ['/', '/resume', '/recruiter', '/github-health', '/lab', '/performance',
          '/privacy', '/changelog', '/work/roleradar', '/theme-lab']
for r in routes:
    try:
        status, _ = get(r)
        ok = status == 200
        if r == '/theme-lab':
            ok = status == 404  # the comparison harness was removed
        check(f'{r} -> {status}', ok)
    except Exception as e:
        check(f'{r} -> {e}', r == '/theme-lab')

print('\n=== 2. compiled CSS is dark-only, Cobalt-only ===')
status, html = get('/')
css_urls = sorted(set(re.findall(r'/_next/static/css/[A-Za-z0-9._-]+\.css', html)))
css = ''
for u in css_urls:
    css += get(u)[1]
print(f'  (css assets: {len(css_urls)}, {len(css)} bytes combined)')

forbidden = {
    'light-mode selector': r'data-mode=[\x22\']?light',
    'dark-mode selector': r'data-mode=[\x22\']?dark',
    'prefers-color-scheme light': r'prefers-color-scheme:\s*light',
    'aurora theme': r'data-theme=[\x22\']?aurora',
    'graphite theme': r'data-theme=[\x22\']?graphite',
    'ember theme': r'data-theme=[\x22\']?ember',
    'sage theme': r'data-theme=[\x22\']?sage',
    'noir theme': r'data-theme=[\x22\']?noir',
    'light canvas token': r'#faf9fc|#f8f3ed|#f6f8f4|#f3f8fc|#faf8f4',
}
for label, pat in forbidden.items():
    n = len(re.findall(pat, css, re.I))
    check(f'absent: {label}', n == 0, f'{n} match(es)')

required = {
    'cobalt canvas #07131f': r'#07131f',
    'cobalt accent #6cb6e8': r'#6cb6e8',
    'color-scheme: dark': r'color-scheme:\s*dark',
    'hero surface scope': r'data-surface=[\x22\']?hero',
    'status tokens': r'--accent-lab',
    'canvas is :root-scoped': r':root\s*\{[^}]*--canvas:',
}
for label, pat in required.items():
    n = len(re.findall(pat, css, re.I))
    check(f'present: {label}', n >= 1, f'{n} match(es)')

print('\n=== 3. switching UI removed ===')
gone = ['Choose theme', 'Switch to light theme', 'Switch to dark theme', 'portfolio-theme',
        'portfolio-mode', 'radiogroup', 'AA floor']
for g in gone:
    n = html.count(g)
    check(f'absent from HTML: {g!r}', n == 0, f'{n} occurrence(s)')
check('data-theme="cobalt" on <html>', 'data-theme="cobalt"' in html)
check('no data-mode attribute on <html>', 'data-mode' not in html)
check('dark theme-color meta', 'content="#07131f"' in html)
check('no boot script (nothing to resolve)', 'portfolio-theme' not in html)

print(f'\n=== {passes} passed, {fails} failed ===')
sys.exit(1 if fails else 0)
