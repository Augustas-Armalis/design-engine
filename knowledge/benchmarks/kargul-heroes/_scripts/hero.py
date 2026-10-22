#!/usr/bin/env python3
"""Hero structure extractor (numpy). For one hero image and a manual band map, prints CSS-px measurements:
h1 lines (ink boxes), gaps, sub lines, CTA buttons (box, radius, fill, edge), the element above the h1.

  hero.py <img> --s S --region x0,y0,x1,y1 --map "nav,pill,h1,h1,sub,sub,cta" [--tol 40] [--rowbg] [--btn x0,x1]

--map labels the ink bands found top-down in the region (same bands `kh.py bands` prints); '-' skips a band.
Button detection: in each 'cta' band the row through its middle is split into runs; a run of >= 40 css px whose colour
differs from the page is a button fill (or, for outline buttons, the span between two edge pixels). Height comes from a
column scan through the run's centre; radius from the first fully-filled row inset at the left edge.
"""
import sys, json
import numpy as np
from PIL import Image

a = sys.argv[1:]
def opt(n, d=None, flag=False):
    if '--' + n in a:
        i = a.index('--' + n)
        if flag: del a[i]; return True
        v = a[i + 1]; del a[i:i + 2]; return v
    return d
S = float(opt('s', 2)); tol = float(opt('tol', 40)); rowbg = opt('rowbg', flag=True)
x0, y0, x1, y1 = map(int, opt('region').split(',')); labels = opt('map', '').split(',')
img = a[0]
im = np.asarray(Image.open(img).convert('RGB')).astype(np.int16)
reg = im[y0:y1, x0:x1]; bg = reg[0, 0]
if rowbg: m = np.abs(reg - np.median(reg, axis=1).astype(np.int16)[:, None, :]).max(axis=2) > tol
else: m = np.abs(reg - bg).max(axis=2) > tol
hx = lambda c: '#%02x%02x%02x' % tuple(int(v) for v in c)
c = lambda v: round(v / S, 1)

rows = m.any(axis=1); bands = []; i = 0
while i < len(rows):
    if rows[i]:
        j = i
        while j < len(rows) and (rows[j] or (j + 3 < len(rows) and rows[j:j + 4].any())): j += 1
        xs = np.nonzero(m[i:j].any(axis=0))[0]
        pix = reg[i:j][m[i:j]]; d = np.abs(pix - bg).sum(axis=1)
        bands.append(dict(y0=y0 + i, y1=y0 + j, x0=x0 + xs.min(), x1=x0 + xs.max() + 1, ink=hx(pix[d.argmax()])))
        i = j
    else: i += 1

def button(b):
    """Find button boxes in a band: scan the middle row for runs of uniform colour that differ from bg."""
    ym = b['y0'] + max(3, int((b['y1'] - b['y0']) * 0.16))
    line = im[ym, b['x0'] - 4:b['x1'] + 4]; out = []; s = 0
    page = im[ym, b['x0'] - 8]
    runs = []
    for k in range(1, len(line) + 1):
        if k == len(line) or np.abs(line[k] - line[s]).max() > 10:
            runs.append((s, k, line[s])); s = k
    for s0, s1, col in runs:
        if (s1 - s0) / S < 24 or np.abs(col - page).max() < 12: continue
        cx = b['x0'] - 4 + (s0 + s1) // 2
        colv = im[b['y0'] - 30:b['y1'] + 30, cx]
        same = np.abs(colv - col).max(axis=1) <= 14
        # extend from the middle
        mid = ym - (b['y0'] - 30); t = mid; u = mid
        while t > 0 and same[t - 1]: t -= 1
        while u < len(same) - 1 and same[u + 1]: u += 1
        top = b['y0'] - 30 + t; bot = b['y0'] - 30 + u + 1
        # radius: walk down from top along the left edge until the edge pixel is fill-coloured
        lx = b['x0'] - 4 + s0; r = 0
        for dy in range(0, (bot - top) // 2):
            if np.abs(im[top + dy, lx + 1] - col).max() <= 18: r = dy; break
        out.append(dict(x=c(lx), w=c(s1 - s0), y=c(top), h=c(bot - top), fill=hx(col), r_est=c(r)))
    return out

res = dict(file=img, s=S, bg=hx(bg), bands=[])
prev = None
for k, b in enumerate(bands):
    lab = labels[k] if k < len(labels) else '?'
    e = dict(label=lab, y=c(b['y0']), y1=c(b['y1']), h=c(b['y1'] - b['y0']), x=c(b['x0']), x1=c(b['x1']), w=c(b['x1'] - b['x0']), ink=b['ink'])
    if prev is not None: e['gap'] = c(b['y0'] - prev['y1'])
    if lab == 'cta': e['buttons'] = button(b)
    res['bands'].append(e); prev = b
for e in res['bands']:
    extra = '' if 'buttons' not in e else '  BTN ' + ' | '.join(f"x{q['x']} w{q['w']} y{q['y']} h{q['h']} r~{q['r_est']} {q['fill']}" for q in e['buttons'])
    print(f"{e['label']:>5} y {e['y']}..{e['y1']} h {e['h']} x {e['x']}..{e['x1']} w {e['w']} {e['ink']}" + (f" gap {e['gap']}" if 'gap' in e else '') + extra)
