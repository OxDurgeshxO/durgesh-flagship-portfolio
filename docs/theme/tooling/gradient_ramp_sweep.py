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

def blend(fg, bg, a):
    o = []
    for i in (0, 2, 4):
        f = int(fg.lstrip('#')[i:i+2], 16)
        b = int(bg.lstrip('#')[i:i+2], 16)
        o.append(int(round(a * f + (1 - a) * b)))
    return '#%02x%02x%02x' % tuple(o)

G = [
    ('A dark',  '#c084fc', '#fb7185', '#0b0914'),
    ('A light', '#6d28d9', '#be123c', '#faf9fc'),
    ('B dark',  '#e8a33d', '#f2f2f0', '#111214'),
    ('B light', '#8a5200', '#17181a', '#faf8f4'),
    ('C dark',  '#6cb6e8', '#22d3ee', '#07131f'),
    ('C light', '#0b5f96', '#0a5f78', '#f3f8fc'),
    ('D dark',  '#ff9a4d', '#ffb37a', '#14100e'),
    ('D light', '#a8400a', '#8f3f10', '#f8f3ed'),
    ('E dark',  '#63cfa6', '#9fc9a8', '#0c1411'),
    ('E light', '#1f6f4e', '#2f6f52', '#f6f8f4'),
    ('F dark',  '#ccff00', '#fafafa', '#0a0a0a'),
    ('F light', '#3f6212', '#0a0a0a', '#ffffff'),
]

print("Full-ramp sweep (t = 0.00 -> 1.00, step 0.02) vs canvas — finds the true worst point of a gradient:")
print(f"{'theme':10s} {'min':>6s} {'at t':>5s} {'hex at min':>11s}   verdict")
for n, a, b, bg in G:
    best = None
    for i in range(51):
        t = i / 50.0
        c = blend(a, b, t)
        r = ratio(c, bg)
        if best is None or r < best[0]:
            best = (r, t, c)
    r, t, c = best
    v = 'AA ok' if r >= 4.5 else ('AA-large only' if r >= 3.0 else 'FAIL')
    print(f'{n:10s} {r:6.2f} {t:5.2f} {c:>11s}   {v}')
