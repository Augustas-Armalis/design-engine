import sys, json, numpy as np
from PIL import Image
img, S = sys.argv[1], float(sys.argv[2]); x0, y0, x1, y1 = map(int, sys.argv[3].split(',')); excl = json.loads(sys.argv[4]); tol = int(sys.argv[5]) if len(sys.argv) > 5 else 12
im = np.asarray(Image.open(img).convert('RGB')).astype(int)
X0, Y0, X1, Y1 = int(x0 * S), int(y0 * S), int(x1 * S), int(y1 * S)
reg = im[Y0:Y1, X0:X1]; bg = np.array([0xfb, 0xf7, 0xeb]) if len(sys.argv) < 7 else np.array([int(sys.argv[6][i:i+2], 16) for i in (1, 3, 5)])
m = np.abs(reg - bg).max(axis=2) > tol
for ex in excl:
    a, b, c, d = [int(v * S) for v in ex]; m[max(0, b - Y0):max(0, d - Y0), max(0, a - X0):max(0, c - X0)] = False
H, W = m.shape; lab = np.zeros((H, W), int); out = []; n = 0
ys, xs = np.nonzero(m)
for y, x in zip(ys, xs):
    if lab[y, x]: continue
    n += 1; st = [(y, x)]; lab[y, x] = n; pts = []
    while st:
        cy, cx = st.pop(); pts.append((cy, cx))
        for dy, dx in ((1, 0), (-1, 0), (0, 1), (0, -1)):
            ny, nx = cy + dy, cx + dx
            if 0 <= ny < H and 0 <= nx < W and m[ny, nx] and not lab[ny, nx]: lab[ny, nx] = n; st.append((ny, nx))
    if len(pts) > 400: continue  # not a dot
    p = np.array(pts); w = np.abs(reg[p[:, 0], p[:, 1]] - bg).max(axis=1).astype(float)
    cy = (p[:, 0] * w).sum() / w.sum(); cx = (p[:, 1] * w).sum() / w.sum()
    # radius from coverage: area = sum(alpha) where alpha = diff/maxdiff of the darkest pixel
    core = reg[p[:, 0], p[:, 1]][w.argmax()]
    alpha = np.clip(w / max(w.max(), 1), 0, 1); r = np.sqrt(alpha.sum() / np.pi)
    out.append([round((X0 + cx + 0.5) / S, 2), round((Y0 + cy + 0.5) / S, 2), round(r / S, 2), '#%02x%02x%02x' % tuple(core)])
print(json.dumps(out))
