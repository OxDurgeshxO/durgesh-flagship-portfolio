def lin(c):
    c=c/255.0
    return c/12.92 if c<=0.03928 else ((c+0.055)/1.055)**2.4
def lum(h):
    h=h.lstrip('#'); r,g,b=int(h[0:2],16),int(h[2:4],16),int(h[4:6],16)
    return 0.2126*lin(r)+0.7152*lin(g)+0.0722*lin(b)
def ratio(a,b):
    la,lb=lum(a),lum(b); return (max(la,lb)+0.05)/(min(la,lb)+0.05)
for c in ['#4a4266','#5a5279','#6b6288','#7a7295','#8b83a6','#9a93b3']:
    print(f'{c}  vs card #161124 = {ratio(c,"#161124"):5.2f}   vs page #0b0914 = {ratio(c,"#0b0914"):5.2f}')
