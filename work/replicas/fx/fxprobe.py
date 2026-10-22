"""Probe a reference crop for effect numbers (CSS px coords, crop at --scale native px per CSS px).

    fxprobe.py <img> px x,y [x,y ...] [--r 2]        mean colour in a (2r+1)^2 native window
    fxprobe.py <img> row y [x0 x1 step] [--r 2]      colour + L* along a row
    fxprobe.py <img> col x [y0 y1 step] [--r 2]      colour + L* down a column
    fxprobe.py <img> peak x0,y0,x1,y1                brightest pixel (L*) and its colour inside a rect
    fxprobe.py <img> hist x0,y0,x1,y1                L* percentiles and the mean colour of the top 5%
"""
import sys, warnings
import numpy as np
from PIL import Image
warnings.filterwarnings('ignore', category=RuntimeWarning)

a = sys.argv[1:]
def opt(n, d):
    if f'--{n}' in a:
        i = a.index(f'--{n}'); v = a[i + 1]; del a[i:i + 2]; return v
    return d
S = float(opt('scale', 2)); r = int(opt('r', 2))
img, mode, *rest = a
A = np.asarray(Image.open(img).convert('RGB'), dtype=np.float64)
H, W = A.shape[:2]

def L(c):
    c = c / 255.0
    c = np.where(c <= 0.04045, c / 12.92, ((c + 0.055) / 1.055) ** 2.4)
    y = c @ np.array([0.2126, 0.7152, 0.0722])
    return np.where(y > 0.008856, 116 * np.cbrt(y) - 16, 903.3 * y)

def at(x, y):
    xi, yi = int(round(x * S)), int(round(y * S))
    w = A[max(0, yi - r):yi + r + 1, max(0, xi - r):xi + r + 1].reshape(-1, 3).mean(0)
    return w
hx = lambda c: '#%02x%02x%02x' % tuple(int(round(v)) for v in c)

if mode == 'px':
    for s in rest:
        x, y = map(float, s.split(',')); c = at(x, y)
        print(f'{x:g},{y:g} {hx(c)} L{float(L(c)):.1f}')
elif mode in ('row', 'col'):
    at0 = float(rest[0]); n = [float(v) for v in rest[1:]]
    lim = W / S if mode == 'row' else H / S
    s0, s1, st = (n + [0, lim, 10][len(n):])[:3]
    for k in np.arange(s0, s1, st):
        c = at(k, at0) if mode == 'row' else at(at0, k)
        print(f'{k:7.1f} {hx(c)} L{float(L(c)):5.1f}')
elif mode == 'peak':
    x0, y0, x1, y1 = (int(float(v) * S) for v in rest[0].split(','))
    sub = A[y0:y1, x0:x1]; l = L(sub)
    j, i = np.unravel_index(np.argmax(l), l.shape)
    print(f'peak at {(x0 + i) / S:.1f},{(y0 + j) / S:.1f} {hx(sub[j, i])} L{l[j, i]:.1f}')
elif mode == 'hist':
    x0, y0, x1, y1 = (int(float(v) * S) for v in rest[0].split(','))
    sub = A[y0:y1, x0:x1].reshape(-1, 3); l = L(sub)
    print('L* p5/25/50/75/95:', ' '.join(f'{np.percentile(l, p):.1f}' for p in (5, 25, 50, 75, 95)))
    top = sub[l >= np.percentile(l, 95)].mean(0); print('top5% mean', hx(top), 'all mean', hx(sub.mean(0)))
