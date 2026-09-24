"""Remove the theme/mode switching UI and the light-mode CSS branch.

Every replacement reports whether it actually matched, so a silent no-op (string
drifted, already removed) is visible instead of assumed.
"""
import os
import re

REPO = os.path.join('durgesh-portfolio-v6')


def edit(rel, pairs, regex_pairs=()):
    p = os.path.join(REPO, rel)
    with open(p, 'r', encoding='utf-8', newline='') as f:
        src = f.read()
    before = src
    for old, new in pairs:
        n = src.count(old)
        if n == 0:
            print(f'  MISS  {rel}: pattern not found -> {old[:60]!r}')
        else:
            src = src.replace(old, new)
            print(f'  ok x{n}  {rel}: {old[:52]!r}')
    for pat, new, label in regex_pairs:
        src, n = re.subn(pat, new, src, flags=re.DOTALL)
        print(f'  {"ok" if n else "MISS"} x{n}  {rel}: {label}')
    if src != before:
        with open(p, 'w', encoding='utf-8', newline='') as f:
            f.write(src)
        print(f'  WROTE {rel}')
    else:
        print(f'  UNCHANGED {rel}')


print('--- Navbar: drop the theme control ---')
edit('components/sections/Navbar.tsx', [
    ("import ThemeControl from '@/components/ThemeControl'\r\n", ''),
    ('<ThemeControl />', ''),
])

print('--- AccessibilityPanel: drop theme + day/night rows ---')
edit('components/accessibility/AccessibilityPanel.tsx', [
    ('import { useTheme } from "@/lib/themes/provider";\r\n'
     'import { THEMES, ThemeId, getTheme } from "@/lib/themes/registry";\r\n', ''),
    ('  const [announcement, setAnnouncement] = useState("");\r\n'
     '  const { theme, mode, setTheme, toggleMode, urlPinned } = useTheme();\r\n'
     '  const activeMeta = getTheme(theme);\r\n', ''),
    ('  Sun,\r\n  Moon,\r\n  Palette,\r\n', ''),
], regex_pairs=[
    (r'\s*\{/\* Theme \*/\}.*?\{/\* 3D WebGL Toggle \*/\}',
     '{/* 3D WebGL Toggle */}', 'theme + day/night row block'),
])

print('--- globals.css: drop the light-mode high-contrast branch ---')
edit('styles/globals.css', [
    ('/* High-contrast mode, re-pointed at the SEMANTIC layer.\r\n'
     '   Previously this only redefined the legacy --bg-primary-style primitives, so\r\n'
     '   it silently stopped working as soon as a component consumed a semantic token\r\n'
     '   instead. Both layers are set now, in both modes. */',
     '/* High-contrast mode, re-pointed at the SEMANTIC layer.\r\n'
     '   Previously this only redefined the legacy --bg-primary-style primitives, so it\r\n'
     '   silently stopped working as soon as a component consumed a semantic token\r\n'
     '   instead. The light branch that used to live here was removed with light mode. */'),
], regex_pairs=[
    (r'\r?\nhtml\.a11y-high-contrast\[data-mode=.light.\] \{.*?\r?\n\}',
     '', 'light high-contrast block'),
])
