#!/usr/bin/env python3
"""Pixel probe for Kargul hero originals (numpy, no Chromium). Coordinates in and out are IMAGE px unless --s is given,
in which case every number printed is also divided by s (CSS px).

  kh.py <img> bands  x0 y0 x1 y1 [--tol 28] [--gap 3]   text/ink bands down a region: y-range, x-extent, height, ink colour
  kh.py <img> box    x0 y0 x1 y1 [--tol 28]             ink bbox in a region (bg = region top-left pixel)
  kh.py <img> px     x,y [x,y ...]                       colours
  kh.py <img> row    y x0 x1 [--tol 6]                   colour runs along a row (edges, fills)
  kh.py <img> col    x y0 y1 [--tol 6]                   colour runs down a column
  kh.py <img> words  x0 y0 x1 y1 [--tol 28] [--wgap 9]  word boxes in ONE text line (split on empty columns >= wgap)
  kh.py <img> hair   x y0 y1                             thickness of thin lines crossing column x (scale check)
Run with: .venv/bin/python knowledge/benchmarks/kargul-heroes/_scripts/kh.py ...
"""
import sys
import numpy as np
from PIL import Image

a = sys.argv[1:]
def opt(n, d):
    if '--' + n in a:
        i = a.index('--' + n); v = a[i + 1]; del a[i:i + 2]; return float(v)
    return d
S = opt('s', 1.0); ROWBG = opt('rowbg', 0); tol = opt('tol', 28); gap = int(opt('gap', 3)); wgap = int(opt('wgap', 9))
img, mode, *r = a
im = np.asarray(Image.open(img).convert('RGB')).astype(np.int16)
H, W, _ = im.shape
hx = lambda c: '#%02x%02x%02x' % tuple(int(v) for v in c)
f = lambda v: f'{v / S:.1f}' if S != 1 else str(v)
print(f'{W}x{H}' + (f' (css {W / S:.0f}x{H / S:.0f} at s={S})' if S != 1 else ''))

def ink(x0, y0, x1, y1):
    reg = im[y0:y1, x0:x1]
    bg = reg[0, 0]
    if ROWBG:  # per-row background = row median (handles vertical gradients)
        med = np.median(reg, axis=1).astype(np.int16)[:, None, :]
        return reg, np.abs(reg - med).max(axis=2) > tol, bg
    return reg, np.abs(reg - bg).max(axis=2) > tol, bg

if mode == 'split':
    # split x0 y0 x1 y1 n: split one merged text band into n lines at the n-1 lowest ink-density rows (between lines)
    x0, y0, x1, y1, n = map(int, r[:5])
    reg, m, bg = ink(x0, y0, x1, y1)
    dens = m.sum(axis=1).astype(float)
    ys = np.nonzero(dens)[0]; t, b = ys.min(), ys.max() + 1
    cuts = []
    for k in range(1, n):
        c0 = t + (b - t) * k // n; lo, hi = c0 - (b - t) // (2 * n), c0 + (b - t) // (2 * n)
        cuts.append(lo + int(np.argmin(dens[lo:hi])))
    edges = [t] + cuts + [b]
    for k in range(n):
        sub = m[edges[k]:edges[k + 1]]; yy = np.nonzero(sub.any(axis=1))[0]; xx = np.nonzero(sub.any(axis=0))[0]
        print(f'line {k + 1}: y {f(y0 + edges[k] + yy.min())}..{f(y0 + edges[k] + yy.max() + 1)} h {f(yy.max() - yy.min() + 1)}  x {f(x0 + xx.min())}..{f(x0 + xx.max() + 1)} w {f(xx.max() - xx.min() + 1)}  (cut row density {int(dens[edges[k + 1] - 1]) if k < n - 1 else 0})')
    sys.exit()
if mode in ('bands', 'box', 'words'):
    x0, y0, x1, y1 = map(int, r[:4])
    reg, m, bg = ink(x0, y0, x1, y1)
    if mode == 'box':
        ys, xs = np.nonzero(m)
        if len(ys) == 0: print('empty'); sys.exit()
        print(f'bg {hx(bg)} box x {f(x0 + xs.min())}..{f(x0 + xs.max() + 1)} y {f(y0 + ys.min())}..{f(y0 + ys.max() + 1)} ({f(xs.max() - xs.min() + 1)}x{f(ys.max() - ys.min() + 1)})')
    elif mode == 'bands':
        rows = m.any(axis=1); out = []; i = 0
        while i < len(rows):
            if rows[i]:
                j = i
                while j < len(rows) and (rows[j] or (j + gap < len(rows) and rows[j:j + gap + 1].any())): j += 1
                out.append((i, j)); i = j
            else: i += 1
        print(f'bg {hx(bg)}')
        prev = None
        for i, j in out:
            sub = m[i:j]; xs = np.nonzero(sub.any(axis=0))[0]
            pix = reg[i:j][sub]
            d = np.abs(pix - bg).sum(axis=1); c = pix[d.argmax()] if len(pix) else bg
            g = '' if prev is None else f' gap {f(i - prev)}'
            print(f'y {f(y0 + i)}..{f(y0 + j)} h {f(j - i)}  x {f(x0 + xs.min())}..{f(x0 + xs.max() + 1)} w {f(xs.max() - xs.min() + 1)}  ink {hx(c)}{g}')
            prev = j
    else:
        cols = m.any(axis=0); xs = np.nonzero(cols)[0]; words = []; s = xs[0]; p = xs[0]
        for x in xs[1:]:
            if x - p > wgap: words.append((s, p + 1)); s = x
            p = x
        words.append((s, p + 1))
        ys = np.nonzero(m.any(axis=1))[0]
        print(f'line y {f(y0 + ys.min())}..{f(y0 + ys.max() + 1)} x {f(x0 + xs.min())}..{f(x0 + xs.max() + 1)} w {f(xs.max() - xs.min() + 1)}')
        print(' '.join(f'[{f(x0 + s)}..{f(x0 + e)} w{f(e - s)}]' for s, e in words))
elif mode == 'px':
    for s in r:
        x, y = map(int, s.split(',')); print(f'{s} {hx(im[y, x])}')
elif mode in ('row', 'col'):
    t = tol if '--tol' in sys.argv else 6
    at, a0, a1 = map(int, r[:3])
    line = im[at, a0:a1] if mode == 'row' else im[a0:a1, at]
    s = 0
    for k in range(1, len(line) + 1):
        if k == len(line) or np.abs(line[k] - line[s]).max() > t:
            print(f'{f(a0 + s)}..{f(a0 + k - 1)} ({f(k - s)}) {hx(line[s])}'); s = k
def btn_at(sd):
        sx, sy = map(int, sd.split(','))
        R = int(260 * S / 2 + 200); wx0, wy0 = max(0, sx - R), max(0, sy - int(R / 2)); wx1, wy1 = min(W, sx + R), min(H, sy + int(R / 2))
        win = im[wy0:wy1, wx0:wx1]; seed = im[sy, sx]
        # adaptive: accept pixels near the seed or near their vertical neighbours (gradient fills) via 2-step tolerance
        sim = np.abs(win - seed).max(axis=2) <= max(tol, 14) if '--tol' in sys.argv else np.abs(win - seed).max(axis=2) <= 22
        cc = np.zeros_like(sim); cc[sy - wy0, sx - wx0] = True
        for _ in range(4000):
            g = cc.copy(); g[1:] |= cc[:-1]; g[:-1] |= cc[1:]; g[:, 1:] |= cc[:, :-1]; g[:, :-1] |= cc[:, 1:]; g &= sim
            if (g == cc).all(): break
            cc = g
        ys, xs = np.nonzero(cc); bx0, bx1, by0, by1 = xs.min(), xs.max() + 1, ys.min(), ys.max() + 1
        # fill holes (text) row-wise: corner profile = first filled x per row near the top
        ins = []
        for k in range(0, (by1 - by0) // 2):
            row = np.nonzero(cc[by0 + k])[0]
            ins.append(row.min() - bx0 if len(row) else None)
        # radius fit: inset(k) = r - sqrt(r^2 - (r - k - .5)^2) for k < r
        best = (1e9, 0)
        for rr in np.arange(0, (by1 - by0) / 2 + 0.5, 0.5):
            e = 0; n = 0
            for k, v in enumerate(ins[:max(2, int(rr) + 1)]):
                if v is None: continue
                pred = rr - np.sqrt(max(rr * rr - (rr - k - 0.5) ** 2, 0)) if k < rr else 0
                e += (pred - v) ** 2; n += 1
            if n and e / n < best[0]: best = (e / n, rr)
        cxm = (bx0 + bx1) // 2
        top = im[wy0 + by0 + 1, wx0 + cxm]; bot = im[wy0 + by1 - 2, wx0 + cxm]
        et = im[wy0 + by0 - 1, wx0 + cxm]; eb = im[wy0 + by1, wx0 + cxm]
        print(f'{sd}: box x {f(wx0 + bx0)}..{f(wx0 + bx1)} y {f(wy0 + by0)}..{f(wy0 + by1)}  w {f(bx1 - bx0)} h {f(by1 - by0)}  r~{f(best[1])}  fill top {hx(top)} bot {hx(bot)}  edge above {hx(et)} below {hx(eb)}  insets {[int(v) if v is not None else None for v in ins[:6]]}')
if mode == 'btn':
    # btn x,y [x,y ...]: seed points inside button fills (padding, no text) -> flood box, h, radius fit, fills, edges
    for sd in r: btn_at(sd)
elif mode == 'cta':
    # cta x0 y0 x1 y1: CTA row (image px). Scans the row at 22% height for fills that differ from the page, floods each.
    x0, y0, x1, y1 = map(int, r[:4]); yy = y0 + int((y1 - y0) * 0.22); line = im[yy, x0:x1]; page = im[yy, x0]
    s0 = 0; runs = []
    for k in range(1, len(line) + 1):
        if k == len(line) or np.abs(line[k] - line[s0]).max() > 12: runs.append((s0, k, line[s0])); s0 = k
    for a0, a1, col in runs:
        if (a1 - a0) < 20 * S / 2 or np.abs(col - page).max() < 6: continue
        print(f'run x {f(x0 + a0)}..{f(x0 + a1)} {hx(col)}'); btn_at(f'{x0 + (a0 + a1) // 2},{yy}')
elif mode == 'hair':
    x, y0, y1 = map(int, r[:3])
    colv = im[y0:y1, x]; base = np.median(colv, axis=0)
    d = np.abs(colv - base).max(axis=1) > 6; k = 0
    while k < len(d):
        if d[k]:
            j = k
            while j < len(d) and d[j]: j += 1
            print(f'line y {y0 + k}..{y0 + j - 1} thickness {j - k}px  {[hx(c) for c in colv[k:j]]}'); k = j
        else: k += 1
