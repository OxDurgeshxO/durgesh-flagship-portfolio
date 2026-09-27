import json

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

# theme -> mode -> tokens
T = {
 'A Aurora Obsidian': {
   'dark': dict(bg='#0b0914', card='#161124', ink='#f4f1fa', body='#b6c2d1', muted='#8fa0b4',
                acc='#c084fc', fill='#7e22ce', onfill='#ffffff', sec='#fb7185', bd='#6b6288'),
   'light': dict(bg='#faf9fc', card='#ffffff', ink='#1c1726', body='#4b4459', muted='#635d70',
                 acc='#6d28d9', fill='#6d28d9', onfill='#ffffff', sec='#be123c', bd='#8f89a0')},
 'B Graphite Ledger': {
   'dark': dict(bg='#111214', card='#1a1b1e', ink='#f2f2f0', body='#c4c6c9', muted='#9aa0a6',
                acc='#e8a33d', fill='#e8a33d', onfill='#17130a', sec='#e8a33d', bd='#6a6c71'),
   'light': dict(bg='#faf8f4', card='#ffffff', ink='#17181a', body='#4a4c50', muted='#6b6e73',
                 acc='#8a5200', fill='#8a5200', onfill='#ffffff', sec='#8a5200', bd='#8c8a86')},
 'C Cobalt Blueprint': {
   'dark': dict(bg='#07131f', card='#0e2136', ink='#e8f2fa', body='#b7cee0', muted='#8aa7c0',
                acc='#6cb6e8', fill='#1d4ed8', onfill='#ffffff', sec='#22d3ee', bd='#4c7ca3'),
   'light': dict(bg='#f3f8fc', card='#ffffff', ink='#0b1a26', body='#3b5162', muted='#566e80',
                 acc='#0b5f96', fill='#0b5f96', onfill='#ffffff', sec='#0a5f78', bd='#7d95a6')},
 'D Ember Titanium': {
   'dark': dict(bg='#14100e', card='#1f1917', ink='#f8f2ed', body='#d0c2b8', muted='#a5958b',
                acc='#ff9a4d', fill='#ff8a3d', onfill='#201308', sec='#ffb37a', bd='#7d6a5f'),
   'light': dict(bg='#f8f3ed', card='#ffffff', ink='#231a14', body='#52453b', muted='#6f6055',
                 acc='#a8400a', fill='#a8400a', onfill='#ffffff', sec='#8f3f10', bd='#9c8878')},
 'E Midnight Sage': {
   'dark': dict(bg='#0c1411', card='#16211d', ink='#eaf4ef', body='#b8cbc1', muted='#8da398',
                acc='#63cfa6', fill='#2f9e73', onfill='#06251a', sec='#9fc9a8', bd='#56806e'),
   'light': dict(bg='#f6f8f4', card='#ffffff', ink='#141b17', body='#414d47', muted='#5f6d66',
                 acc='#1f6f4e', fill='#1f6f4e', onfill='#ffffff', sec='#2f6f52', bd='#7d8f85')},
 'F Noir Gallery': {
   'dark': dict(bg='#0a0a0a', card='#151515', ink='#fafafa', body='#c9c9c9', muted='#9c9c9c',
                acc='#ccff00', fill='#ccff00', onfill='#0a0a0a', sec='#fafafa', bd='#6b6b6b'),
   'light': dict(bg='#ffffff', card='#f6f6f6', ink='#0a0a0a', body='#3c3c3c', muted='#666666',
                 acc='#3f6212', fill='#3f6212', onfill='#ffffff', sec='#0a0a0a', bd='#868686')},
}

def blend(fg, bg, a):
    """alpha-composite fg over bg -> hex"""
    out = []
    for i in (0, 2, 4):
        f = int(fg.lstrip('#')[i:i+2], 16)
        b = int(bg.lstrip('#')[i:i+2], 16)
        out.append(int(round(a * f + (1 - a) * b)))
    return '#%02x%02x%02x' % tuple(out)

rows = []
for name, modes in T.items():
    for mode, t in modes.items():
        checks = [
            ('ink/bg',        t['ink'],  t['bg'],   4.5),
            ('ink/card',      t['ink'],  t['card'], 4.5),
            ('body/card',     t['body'], t['card'], 4.5),
            ('muted/card',    t['muted'],t['card'], 4.5),
            ('accent/card',   t['acc'],  t['card'], 4.5),
            ('accent/bg',     t['acc'],  t['bg'],   4.5),
            ('label/fill',    t['onfill'],t['fill'],4.5),
            ('secondary/card',t['sec'],  t['card'], 4.5),
            ('border/card',   t['bd'],   t['card'], 3.0),
            ('accent/badge-tint', t['acc'], blend(t['acc'], t['card'], 0.14), 4.5),
            ('secondary/badge-tint', t['sec'], blend(t['sec'], t['card'], 0.14), 4.5),
        ]
        fails = []
        mins = {}
        for label, fg, bg, need in checks:
            r = ratio(fg, bg)
            mins[label] = round(r, 2)
            if r < need:
                fails.append(f"{label}={r:.2f}(need {need})")
        rows.append((name, mode, mins, fails))

print(f"{'theme':22s} {'mode':6s} {'ink':>5s} {'body':>5s} {'mute':>5s} {'acc':>5s} {'accbg':>6s} {'lbl':>5s} {'sec':>5s} {'bdr':>5s}  verdict")
for name, mode, m, fails in rows:
    v = 'OK' if not fails else 'FAIL: ' + '; '.join(fails)
    print(f"{name:22s} {mode:6s} {m['ink/bg']:5.2f} {m['body/card']:5.2f} {m['muted/card']:5.2f} "
          f"{m['accent/card']:5.2f} {m['accent/bg']:6.2f} {m['label/fill']:5.2f} {m['secondary/card']:5.2f} {m['border/card']:5.2f}  {v}")
