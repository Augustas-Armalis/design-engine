"""List blobs (dots, nodes) in a reference crop: centre, size and mean colour, in CSS px.

    fxblobs.py <img> [--thr 12] [--scale 2] [--min 3]     thr = max-channel threshold over the background
"""
import sys
import numpy as np
from PIL import Image

a = sys.argv[1:]
def opt(n, d):
    if f'--{n}' in a:
        i = a.index(f'--{n}'); v = a[i + 1]; del a[i:i + 2]; return v
    return d
thr = float(opt('thr', 12)); S = float(opt('scale', 2)); mn = int(opt('min', 3))
A = np.asarray(Image.open(a[0]).convert('RGB')).astype(int)
H, W = A.shape[:2]
bg = np.median(A.reshape(-1, 3), 0)
m = np.abs(A - bg).max(2) > thr
lab = np.zeros((H, W), int); n = 0
for y in range(H):
    for x in range(W):
        if m[y, x] and not lab[y, x]:
            n += 1; st = [(y, x)]; lab[y, x] = n
            while st:
                cy, cx = st.pop()
                for dy, dx in ((1, 0), (-1, 0), (0, 1), (0, -1)):
                    yy, xx = cy + dy, cx + dx
                    if 0 <= yy < H and 0 <= xx < W and m[yy, xx] and not lab[yy, xx]:
                        lab[yy, xx] = n; st.append((yy, xx))
rows = []
for k in range(1, n + 1):
    ys, xs = np.where(lab == k)
    if len(ys) < mn: continue
    c = A[ys, xs].mean(0); pk = A[ys, xs].max(0)
    rows.append((xs.mean() / S, ys.mean() / S, (xs.max() - xs.min() + 1) / S, (ys.max() - ys.min() + 1) / S, c, pk))
rows.sort(key=lambda r: (round(r[0] / 8), r[1]))
print(f'{len(rows)} blobs (bg #{int(bg[0]):02x}{int(bg[1]):02x}{int(bg[2]):02x})')
for x, y, w, h, c, pk in rows:
    print(f'{x:7.1f} {y:7.1f}  {w:4.1f}x{h:4.1f}  mean #{int(c[0]):02x}{int(c[1]):02x}{int(c[2]):02x}  peak #{pk[0]:02x}{pk[1]:02x}{pk[2]:02x}')
