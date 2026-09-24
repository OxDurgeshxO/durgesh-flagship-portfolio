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
    print(f"{r:6.2f}  {v:9s} {label:48s} {fg} on {bg}")

print("=== dark: proposed text ramp ===")
check('heading #f4f1fa / card', '#f4f1fa', '#161124')
check('body #b6c2d1 / card', '#b6c2d1', '#161124')
check('body #b6c2d1 / page bg', '#b6c2d1', '#0b0914')
check('muted #8fa0b4 / card', '#8fa0b4', '#161124')
check('muted #8fa0b4 / page bg', '#8fa0b4', '#0b0914')
check('body #b6c2d1 / glass approx', '#b6c2d1', '#100d1a')
check('muted #8fa0b4 / glass approx', '#8fa0b4', '#100d1a')
check('body #b6c2d1 / accent tint', '#b6c2d1', '#1a1430')
check('border #2a2440 vs card (UI 3:1)', '#2a2440', '#161124')
check('border-strong #4a4266 vs card (UI 3:1)', '#4a4266', '#161124')

print()
print("=== light: proposed surfaces ===")
check('heading #1c1726 / card', '#1c1726', '#ffffff')
check('body #4b4459 / muted surface', '#4b4459', '#f4f2f8')
check('muted #635d70 / muted surface', '#635d70', '#f4f2f8')
check('primary #6d28d9 / muted surface', '#6d28d9', '#f4f2f8')
check('body / glass approx', '#4b4459', '#fdfcfe')
check('muted / glass approx', '#635d70', '#fdfcfe')
check('decorative border #e2dced vs white (informational)', '#e2dced', '#ffffff')
check('control border #8f89a0 vs card (UI 3:1)', '#8f89a0', '#ffffff')
check('input bg #ffffff vs page bg #faf9fc (control fill)', '#ffffff', '#faf9fc')
check('selection violet-700 bg + white text', '#ffffff', '#6d28d9')
check('gradient end rose-700 / page bg', '#be123c', '#faf9fc')
