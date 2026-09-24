def lin(c):
    c = c / 255.0
    return c / 12.92 if c <= 0.03928 else ((c + 0.055) / 1.055) ** 2.4

def lum(h):
    h = h.lstrip('#')
    r, g, b = int(h[0:2], 16), int(h[2:4], 16), int(h[4:6], 16)
    return 0.2126 * lin(r) + 0.7152 * lin(g) + 0.0722 * lin(b)

def ratio(a, b):
    la, lb = lum(a), lum(b)
    return (max(la, lb) + 0.05) / (min(la, lb) + 0.05)

def check(label, fg, bg):
    r = ratio(fg, bg)
    v = 'AA' if r >= 4.5 else ('AA-large' if r >= 3.0 else 'FAIL')
    print(f"{r:6.2f}  {v:9s} {label:46s} {fg} on {bg}")

print("=== dark: white text on the CTA gradient endpoints ===")
check('white / purple-600', '#ffffff', '#9333ea')
check('white / rose-500', '#ffffff', '#f43f5e')

print()
print("=== light: candidate borders (need >=3:1 for control boundaries) ===")
for c in ['#c9c2d9', '#b3adc2', '#a09aae', '#8f89a0', '#7d7889']:
    check('border / white', c, '#ffffff')

print()
print("=== light: badge text on 10% tints over page bg ===")
check('violet-700 / violet tint', '#6d28d9', '#f1ebfc')
check('rose-700 / rose tint', '#be123c', '#fceef1')
check('emerald-700 / emerald tint', '#047857', '#eaf5f0')
check('sky-700 / sky tint', '#0369a1', '#e9f2f8')
check('amber-700 / amber tint', '#b45309', '#fbf3e6')

print()
print("=== light: accent used as large display text / gradient text ===")
check('violet-700 / page bg', '#6d28d9', '#faf9fc')
check('rose-700 / page bg', '#be123c', '#faf9fc')
check('gradient mid (both ends) / page bg', '#b23ba0', '#faf9fc')

print()
print("=== dark: proposed fixes ===")
check('proposed muted #8fa0b4 / card', '#8fa0b4', '#161124')
check('proposed muted #8fa0b4 / page bg', '#8fa0b4', '#0b0914')
check('white / violet-600 button', '#ffffff', '#7e22ce')
check('white / rose-600 button', '#ffffff', '#e11d48')
