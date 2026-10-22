"""Overlay a labelled CSS-px grid on a crop so coordinates can be read off by eye.

    fxgrid.py <img> <out.png> [--step 20] [--scale 2] [--zoom 1] [--clip x,y,w,h]
"""
import sys
from PIL import Image, ImageDraw

a = sys.argv[1:]
def opt(n, d):
    if f'--{n}' in a:
        i = a.index(f'--{n}'); v = a[i + 1]; del a[i:i + 2]; return v
    return d
step = float(opt('step', 20)); S = float(opt('scale', 2)); Z = float(opt('zoom', 1)); clip = opt('clip', None)
src, out = a
im = Image.open(src).convert('RGB')
ox = oy = 0
if clip:
    x, y, w, h = map(float, clip.split(','))
    im = im.crop((int(x * S), int(y * S), int((x + w) * S), int((y + h) * S))); ox, oy = x, y
im = im.resize((int(im.width * Z), int(im.height * Z)), Image.NEAREST)
d = ImageDraw.Draw(im, 'RGBA')
k = S * Z
import math
gx = math.ceil(ox / step) * step
while (gx - ox) * k < im.width:
    X = (gx - ox) * k; major = round(gx / step) % 5 == 0
    d.line([(X, 0), (X, im.height)], fill=(0, 255, 120, 150 if major else 70))
    if major: d.text((X + 2, 2), f'{gx:g}', fill=(0, 255, 120, 255))
    gx += step
gy = math.ceil(oy / step) * step
while (gy - oy) * k < im.height:
    Y = (gy - oy) * k; major = round(gy / step) % 5 == 0
    d.line([(0, Y), (im.width, Y)], fill=(255, 220, 0, 150 if major else 70))
    if major: d.text((2, Y + 2), f'{gy:g}', fill=(255, 220, 0, 255))
    gy += step
im.save(out)
print(out, im.size)
