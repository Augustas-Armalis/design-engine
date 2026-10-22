"""Crop an effect region from a reference at its native resolution.

    .venv/bin/python work/replicas/fx/fxcrop.py <src> <x> <y> <w> <h> <out.png> [--scale 2]

x y w h are CSS px; the crop is taken at native resolution (CSS * scale) and saved losslessly,
so the reference crop and our 2x render share one pixel grid.
"""
import sys
from PIL import Image

a = sys.argv[1:]
scale = 2.0
if '--scale' in a:
    i = a.index('--scale'); scale = float(a[i + 1]); del a[i:i + 2]
src, x, y, w, h, out = a[0], *map(float, a[1:5]), a[5]
im = Image.open(src).convert('RGB')
box = tuple(round(v * scale) for v in (x, y, x + w, y + h))
c = im.crop(box)
c.save(out)
print(f'{src} {im.size} -> {out} {c.size} (css {w:g}x{h:g} at {x:g},{y:g}, scale {scale:g})')
