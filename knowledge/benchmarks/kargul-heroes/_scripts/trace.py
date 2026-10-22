import sys, json, numpy as np
from PIL import Image
img, S = sys.argv[1], float(sys.argv[2]); starts = json.loads(sys.argv[3]); xend = float(sys.argv[4]); step = int(sys.argv[5]) if len(sys.argv) > 5 else 1
im = np.asarray(Image.open(img).convert('L')).astype(float)
def rdp(p, e):
    if len(p) < 3: return p
    a, b = np.array(p[0]), np.array(p[-1]); d = b - a; n = np.hypot(*d) or 1
    dist = [abs(d[0] * (a[1] - q[1]) - d[1] * (a[0] - q[0])) / n for q in p]
    i = int(np.argmax(dist))
    return rdp(p[:i + 1], e)[:-1] + rdp(p[i:], e) if dist[i] > e else [p[0], p[-1]]
out = []
for x0, y0 in starts:
    pts = []; y = y0 * S; x = x0 * S; d = step if xend > x0 else -step; lost = 0
    while (x < xend * S) if d > 0 else (x > xend * S):
        lo, hi = int(y - 5 * S), int(y + 5 * S)
        col = im[lo:hi, int(x)]; bg = np.median(im[lo - 20:hi + 20, int(x)])
        k = int(np.argmax(col)); v = col[k] - bg
        if v > 6: y = lo + k; pts.append((round(x / S, 1), round(y / S, 1))); lost = 0
        else:
            lost += 1
            if lost > 12 * S: break
        x += d
    out.append([[float(a), float(b)] for a, b in rdp(pts, 0.6)])
print(json.dumps(out))
