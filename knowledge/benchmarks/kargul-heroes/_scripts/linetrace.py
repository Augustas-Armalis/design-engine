# background-subtracted line art trace: pixels darker than a blurred background by > t, emitted as row-run paths
# grouped by darkness band (rendered as black at the band's alpha). Coordinates CSS px.
import sys, json, numpy as np
from PIL import Image, ImageFilter
img, S = sys.argv[1], float(sys.argv[2]); x0, y0, x1, y1 = map(float, sys.argv[3].split(',')); excl = json.loads(sys.argv[4]); t = float(sys.argv[5])
pil = Image.open(img).convert('L')
X0, Y0, X1, Y1 = int(x0 * S), int(y0 * S), int(x1 * S), int(y1 * S)
crop = pil.crop((X0, Y0, X1, Y1))
a = np.asarray(crop).astype(float); bgimg = np.asarray(crop.filter(ImageFilter.MedianFilter(21))).astype(float)
d = bgimg - a
m = d > t
for ex in excl:
    a0, b0, c0, e0 = [int(v * S) for v in ex]; m[max(0, b0 - Y0):max(0, e0 - Y0), max(0, a0 - X0):max(0, c0 - X0)] = False
alpha = np.clip(d / np.maximum(bgimg, 1), 0, 1)
bands = [(0, 0.06), (0.06, 0.12), (0.12, 0.25), (0.25, 1.01)]
f = lambda v: f'{v / S:.2f}'.rstrip('0').rstrip('.')
out = []
for lo, hi in bands:
    mm = m & (alpha >= lo) & (alpha < hi); dd = []
    for j in range(mm.shape[0]):
        row = mm[j]; k = 0
        while k < len(row):
            if row[k]:
                e = k
                while e < len(row) and row[e]: e += 1
                dd.append(f'M{f(X0 + k)} {f(Y0 + j)}h{f(e - k)}v{f(1)}h-{f(e - k)}z'); k = e
            else: k += 1
    if dd: out.append([round(float(alpha[mm].mean()), 3), ''.join(dd)])
print(json.dumps(out))
