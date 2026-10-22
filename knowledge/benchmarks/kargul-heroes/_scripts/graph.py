# Vectorise a node-link drawing: nodes = round blobs, edges = straight segments whose pixels match a colour class.
import sys, json, numpy as np
from PIL import Image
img, S = sys.argv[1], float(sys.argv[2]); x0, y0, x1, y1 = map(float, sys.argv[3].split(',')); excl = json.loads(sys.argv[4])
im = np.asarray(Image.open(img).convert('RGB')).astype(int); bg = np.array([0xfb, 0xf7, 0xeb])
CL = {'green': np.array([0x01, 0x84, 0x40]), 'dark': np.array([0x08, 0x28, 0x1a]), 'grey': np.array([0xd0, 0xd2, 0xc6])}
X0, Y0, X1, Y1 = int(x0 * S), int(y0 * S), int(x1 * S), int(y1 * S)
reg = im[Y0:Y1, X0:X1]
def cls_mask(c, tol): return np.abs(reg - CL[c]).max(axis=2) <= tol
def inex(x, y): return any(a <= x <= c and b <= y <= d for a, b, c, d in excl)
# nodes: erode-free approach -> pixels that have a solid 3x3(css 1.5px) neighbourhood of the class = blob cores
nodes = []
for c, tol in (('green', 60), ('dark', 70)):
    m = cls_mask(c, tol); core = m.copy()
    k = int(1.5 * S)
    for dy in range(-k, k + 1):
        for dx in range(-k, k + 1): core &= np.roll(np.roll(m, dy, 0), dx, 1)
    lab = np.zeros(core.shape, int); n = 0
    for y, x in zip(*np.nonzero(core)):
        if lab[y, x]: continue
        n += 1; st = [(y, x)]; lab[y, x] = n; pts = []
        while st:
            cy, cx = st.pop(); pts.append((cy, cx))
            for dy, dx in ((1, 0), (-1, 0), (0, 1), (0, -1)):
                ny, nx = cy + dy, cx + dx
                if 0 <= ny < core.shape[0] and 0 <= nx < core.shape[1] and core[ny, nx] and not lab[ny, nx]: lab[ny, nx] = n; st.append((ny, nx))
        p = np.array(pts); cy, cx = p.mean(axis=0)
        # radius: walk right from centre while class pixel
        r = 0
        while cx + r < m.shape[1] - 1 and m[int(cy), int(cx + r)]: r += 1
        X, Y = (X0 + cx + 0.5) / S, (Y0 + cy + 0.5) / S
        if not inex(X, Y): nodes.append([round(X, 2), round(Y, 2), round((r + 0.5) / S, 2), c])
# edges: for every node pair < 260 css apart, sample the segment (excluding the node discs) and test the colour class
edges = []
for i in range(len(nodes)):
    for j in range(i + 1, len(nodes)):
        a, b = nodes[i], nodes[j]; L = np.hypot(b[0] - a[0], b[1] - a[1])
        if L > 260 or L < 8: continue
        for c, tol in (('green', 75), ('dark', 90), ('grey', 26)):
            ok = 0; tot = 0
            for t in np.linspace(0, 1, int(L * 1.5)):
                X = a[0] + (b[0] - a[0]) * t; Y = a[1] + (b[1] - a[1]) * t
                if np.hypot(X - a[0], Y - a[1]) < a[2] + 2 or np.hypot(X - b[0], Y - b[1]) < b[2] + 2: continue
                px, py = int(X * S) - X0, int(Y * S) - Y0
                win = reg[max(0, py - 1):py + 2, max(0, px - 1):px + 2].reshape(-1, 3)
                tot += 1; ok += (np.abs(win - CL[c]).max(axis=1) <= tol).any()
            if tot and ok / tot > 0.93: edges.append([i, j, c]); break
print(json.dumps({'nodes': nodes, 'edges': edges}))
