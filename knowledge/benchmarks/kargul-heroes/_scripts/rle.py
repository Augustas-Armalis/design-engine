#!/usr/bin/env python3
"""Trace a flat-colour mark (logo, glyph, icon) from a reference image into an SVG path of 1-device-pixel row runs,
in CSS px. Used by the hero replicas to place marks exactly where the original has them (study only).
  rle.py <img> <s> x0,y0,x1,y1(css) <#hex | dark | light> [tol] -> prints a path 'd' string
"""
import sys, numpy as np
from PIL import Image
img, S = sys.argv[1], float(sys.argv[2]); x0, y0, x1, y1 = map(float, sys.argv[3].split(',')); tgt = sys.argv[4]; tol = float(sys.argv[5]) if len(sys.argv) > 5 else 40
im = np.asarray(Image.open(img).convert('RGB')).astype(int)
X0, Y0, X1, Y1 = int(x0 * S), int(y0 * S), int(x1 * S), int(y1 * S)
reg = im[Y0:Y1, X0:X1]
if tgt == 'light': m = reg.mean(axis=2) > 255 - tol
elif tgt == 'dark': m = reg.mean(axis=2) < tol
else:
    c = np.array([int(tgt[i:i + 2], 16) for i in (1, 3, 5)]); m = np.abs(reg - c).max(axis=2) <= tol
d = []
f = lambda v: f'{v / S:.2f}'.rstrip('0').rstrip('.')
for j in range(m.shape[0]):
    row = m[j]; k = 0
    while k < len(row):
        if row[k]:
            e = k
            while e < len(row) and row[e]: e += 1
            d.append(f'M{f(X0 + k)} {f(Y0 + j)}h{f(e - k)}v{f(1)}h-{f(e - k)}z'); k = e
        else: k += 1
print(''.join(d))
