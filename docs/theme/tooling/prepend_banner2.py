import io
p = 'single-theme-change-report.md'
src = io.open(p, encoding='utf-8').read()
b = ("> **SUPERSEDED (2026-09-25).** The single fixed theme described below has been replaced by a\n"
     "> restored theme switcher: all six themes are selectable again, each still a DARK appearance\n"
     "> only, with Cobalt Blueprint remaining the default. See `theme-switcher-restored.md`.\n"
     "> Light mode remains removed. The record below stays accurate as history.\n\n")
if not src.startswith('> **SUPERSEDED'):
    io.open(p, 'w', encoding='utf-8').write(b + src)
    print('banner prepended to', p)
else:
    print('banner already present')
