import sys, json, numpy as np
from PIL import Image
im = np.asarray(Image.open(sys.argv[1]).convert('RGB')).astype(int)
S, P, OY = 1.1042, 17.75, 6.25
H, W, _ = im.shape; cells = []
def sample(x0, y0):
    cx, cy = int(x0 + P / 2), int(y0 + P / 2)
    return np.median(im[max(0, cy - 4):cy + 5, max(0, cx - 4):cx + 5].reshape(-1, 3), axis=0).astype(int)
for j in range(0, int(H / P) + 1):
    y0 = OY + j * P
    if y0 > 1040 or y0 / S < 62: continue
    hz = y0 >= 1000
    for OX in ((0.5, 15.25) if hz else (15.25,)):
        for i in range(-1, int(W / P) + 1):
            x0 = OX + i * P
            if hz and ((OX == 0.5 and x0 >= 900) or (OX == 15.25 and x0 < 900)): continue
            if not (0 <= x0 + P / 2 < W): continue
            c = sample(x0, y0); X, Y = x0 / S, y0 / S
            if not hz:
                if c.max() < 14 or X < 600 or (X < 760 and Y > 530): continue
            cells.append([round(X, 2), round(Y, 2), '#%02x%02x%02x' % tuple(c)])
print(json.dumps({'pitch': round(P / S, 4), 'cells': cells}))
