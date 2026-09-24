def lin(c):
    c = c / 255.0
    return c / 12.92 if c <= 0.03928 else ((c + 0.055) / 1.055) ** 2.4

def lum(hexs):
    h = hexs.lstrip('#')
    r, g, b = int(h[0:2], 16), int(h[2:4], 16), int(h[4:6], 16)
    return 0.2126 * lin(r) + 0.7152 * lin(g) + 0.0722 * lin(b)

def ratio(a, b):
    la, lb = lum(a), lum(b)
    hi, lo = max(la, lb), min(la, lb)
    return (hi + 0.05) / (lo + 0.05)

def check(label, fg, bg):
    r = ratio(fg, bg)
    verdict = 'AA' if r >= 4.5 else ('AA-large' if r >= 3.0 else 'FAIL')
    print(f"{r:6.2f}  {verdict:9s} {label:44s} {fg} on {bg}")

print("=== CURRENT DARK (v6) ===")
D_BG = '#0b0914'; D_CARD = '#161124'; D_ACC = '#1a1430'
check('foreground / page bg', '#fdf4ff', D_BG)
check('body --text-body / page bg', '#94a3b8', D_BG)
check('body / card', '#94a3b8', D_CARD)
check('muted --text-muted / page bg', '#64748b', D_BG)
check('muted / card', '#64748b', D_CARD)
check('slate-500 override / card', '#7b8a9e', D_CARD)
check('slate-400 / card', '#94a3b8', D_CARD)
check('primary violet-400 / page bg', '#c084fc', D_BG)
check('primary violet-400 / accent tint', '#c084fc', D_ACC)
check('secondary rose-500 / page bg', '#f43f5e', D_BG)
check('white / violet-500 (CTA gradient)', '#ffffff', '#a855f7')
check('ink / violet-500', '#141223', '#a855f7')
check('emerald-300 (AI Lab chip) / page bg', '#6ee7b7', D_BG)
check('purple-200 (Recruiter chip) / page bg', '#e9d5ff', D_BG)
check('sky-400 / page bg', '#38bdf8', D_BG)

print()
print("=== PROPOSED LIGHT (new) ===")
L_BG = '#faf9fc'; L_CARD = '#ffffff'; L_TINT = '#f3eefe'
check('ink / page bg', '#1c1726', L_BG)
check('body / page bg', '#4b4459', L_BG)
check('body / card', '#4b4459', L_CARD)
check('muted / page bg', '#635d70', L_BG)
check('muted / card', '#635d70', L_CARD)
check('muted / tint', '#635d70', L_TINT)
check('primary violet-700 / card', '#6d28d9', L_CARD)
check('primary violet-700 / page bg', '#6d28d9', L_BG)
check('primary violet-700 / tint', '#6d28d9', L_TINT)
check('primary violet-600 / card', '#7c3aed', L_CARD)
check('secondary rose-700 / card', '#be123c', L_CARD)
check('secondary rose-600 / card', '#e11d48', L_CARD)
check('emerald-700 / card', '#047857', L_CARD)
check('sky-700 / card', '#0369a1', L_CARD)
check('white / violet-700 (button)', '#ffffff', '#6d28d9')
check('white / rose-700 (button)', '#ffffff', '#be123c')
check('non-text border / card (3:1 UI)', '#c9c2d9', L_CARD)
check('non-text border vs page bg', '#c9c2d9', L_BG)
check('focus ring violet-600 / page bg', '#7c3aed', L_BG)
