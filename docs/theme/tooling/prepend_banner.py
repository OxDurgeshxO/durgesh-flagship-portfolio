import io
p = 'theme-implementation-report.md'
with io.open(p, encoding='utf-8') as f:
    src = f.read()
banner = (
    "> **SUPERSEDED (2026-09-25).** The six-theme / dual-mode system described below was replaced at\n"
    "> the user's request by a single theme: **Cobalt Blueprint, dark only**. Light mode, the theme\n"
    "> picker, the provider, the boot script and `/theme-lab` have all been removed. See\n"
    "> `single-theme-change-report.md` for the current state, and note that the claim below about\n"
    "> per-theme display faces rendering was incorrect (see that report, section 4).\n"
    "> The verification and bug-fix record in this document remains accurate as history.\n\n"
)
if not src.startswith('> **SUPERSEDED'):
    with io.open(p, 'w', encoding='utf-8') as f:
        f.write(banner + src)
    print('banner prepended to', p)
else:
    print('banner already present')
