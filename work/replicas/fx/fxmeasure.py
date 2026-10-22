"""Measure an effect replica against its reference crop (both at the same native pixel grid).

    .venv/bin/python work/replicas/fx/fxmeasure.py <ref.png> <ours.png> [--scale 2] [--blur 3]
        [--only x,y,w,h ...] [--exclude x,y,w,h ...] [--heat out.png] [--tiles 4x4]
    .venv/bin/python work/replicas/fx/fxmeasure.py <ref.png> <ours.png> row <y> [x0 x1 step]   (CSS px)
    .venv/bin/python work/replicas/fx/fxmeasure.py <ref.png> <ours.png> col <x> [y0 y1 step]

Reports, over the measured region:
  shift   phase-correlation offset of ours vs ref (CSS px): the registration error of the whole layer
  dE      CIE76 delta-E on both images box-blurred by --blur native px (effects are low-frequency; blur
          removes grain/dither phase so we compare tone, falloff and hue, not noise phase)
  dE raw  the same without blur (includes grain/dither phase, so always higher)
  dL      mean signed L* difference (positive = ours brighter)
  tiles   mean dE per tile, to find where the falloff drifts
Rects are CSS px in the crop's own frame.
"""
import sys
import warnings
import numpy as np
warnings.filterwarnings("ignore", category=RuntimeWarning)
from PIL import Image

a = sys.argv[1:]
def opt(name, default=None, multi=False):
    vals = []
    while f'--{name}' in a:
        i = a.index(f'--{name}'); vals.append(a[i + 1]); del a[i:i + 2]
    if multi: return vals
    return vals[-1] if vals else default

scale = float(opt('scale', 2)); blur = int(opt('blur', 3)); heat = opt('heat'); tiles = opt('tiles', '4x4')
only = opt('only', multi=True); excl = opt('exclude', multi=True)
ref_p, our_p, *mode = a
R = np.asarray(Image.open(ref_p).convert('RGB'), dtype=np.float64)
O = np.asarray(Image.open(our_p).convert('RGB'), dtype=np.float64)
if R.shape != O.shape:
    h, w = min(R.shape[0], O.shape[0]), min(R.shape[1], O.shape[1])
    print(f'note: size differs ref {R.shape[1]}x{R.shape[0]} ours {O.shape[1]}x{O.shape[0]}; cropping to {w}x{h}')
    R, O = R[:h, :w], O[:h, :w]
H, W = R.shape[:2]

def lab(rgb):
    c = rgb / 255.0
    c = np.where(c <= 0.04045, c / 12.92, ((c + 0.055) / 1.055) ** 2.4)
    M = np.array([[0.4124, 0.3576, 0.1805], [0.2126, 0.7152, 0.0722], [0.0193, 0.1192, 0.9505]])
    xyz = c @ M.T / np.array([0.95047, 1.0, 1.08883])
    f = np.where(xyz > 0.008856, np.cbrt(xyz), 7.787 * xyz + 16 / 116)
    return np.stack([116 * f[..., 1] - 16, 500 * (f[..., 0] - f[..., 1]), 200 * (f[..., 1] - f[..., 2])], -1)

def boxblur(img, r):
    if r <= 0: return img
    k = 2 * r + 1
    p = np.pad(img, ((r, r), (r, r), (0, 0)), mode='edge')
    c = np.cumsum(np.cumsum(p, 0), 1)
    c = np.pad(c, ((1, 0), (1, 0), (0, 0)))
    return (c[k:, k:] - c[:-k, k:] - c[k:, :-k] + c[:-k, :-k]) / (k * k)

if mode and mode[0] in ('row', 'col'):
    at = float(mode[1]); n = [float(v) for v in mode[2:]]
    LR, LO = lab(boxblur(R, blur)), lab(boxblur(O, blur))
    if mode[0] == 'row':
        x0, x1, st = (n + [0, W / scale, 10][len(n):])[:3]
        y = int(at * scale)
        for x in np.arange(x0, x1, st):
            xi = min(int(x * scale), W - 1)
            r, o = R[y, xi].astype(int), O[y, xi].astype(int)
            print(f'x {x:7.1f}  ref #{r[0]:02x}{r[1]:02x}{r[2]:02x} L{LR[y, xi, 0]:5.1f}  ours #{o[0]:02x}{o[1]:02x}{o[2]:02x} L{LO[y, xi, 0]:5.1f}  dE {np.linalg.norm(LR[y, xi] - LO[y, xi]):5.1f}')
    else:
        y0, y1, st = (n + [0, H / scale, 10][len(n):])[:3]
        x = int(at * scale)
        for y in np.arange(y0, y1, st):
            yi = min(int(y * scale), H - 1)
            r, o = R[yi, x].astype(int), O[yi, x].astype(int)
            print(f'y {y:7.1f}  ref #{r[0]:02x}{r[1]:02x}{r[2]:02x} L{LR[yi, x, 0]:5.1f}  ours #{o[0]:02x}{o[1]:02x}{o[2]:02x} L{LO[yi, x, 0]:5.1f}  dE {np.linalg.norm(LR[yi, x] - LO[yi, x]):5.1f}')
    sys.exit(0)

mask = np.ones((H, W), bool) if not only else np.zeros((H, W), bool)
def rect(s):
    x, y, w, h = (float(v) * scale for v in s.split(','))
    return slice(max(0, int(y)), int(y + h)), slice(max(0, int(x)), int(x + w))
for s in only: mask[rect(s)] = True
for s in excl: mask[rect(s)] = False

LR, LO = lab(boxblur(R, blur)), lab(boxblur(O, blur))
dE = np.linalg.norm(LR - LO, axis=-1)
dEraw = np.linalg.norm(lab(R) - lab(O), axis=-1)
dL = LO[..., 0] - LR[..., 0]

# phase correlation on blurred luminance inside the mask's bounding box
ys, xs = np.where(mask)
sl = (slice(ys.min(), ys.max() + 1), slice(xs.min(), xs.max() + 1))
a1, a2 = LR[..., 0][sl], LO[..., 0][sl]
a1, a2 = a1 - a1.mean(), a2 - a2.mean()
wy, wx = np.hanning(a1.shape[0])[:, None], np.hanning(a1.shape[1])[None, :]
F = np.fft.fft2(a1 * wy * wx) * np.conj(np.fft.fft2(a2 * wy * wx))
cc = np.fft.ifft2(F / (np.abs(F) + 1e-9)).real
py, px = np.unravel_index(np.argmax(cc), cc.shape)
if py > cc.shape[0] // 2: py -= cc.shape[0]
if px > cc.shape[1] // 2: px -= cc.shape[1]

m = mask
print(f'region {W / scale:g}x{H / scale:g} css, measured {m.sum() / (scale * scale):.0f} css px^2')
print(f'shift   ours vs ref dx {-px / scale:+.1f} dy {-py / scale:+.1f} css px (phase correlation, blurred L*)')
print(f'dE      mean {dE[m].mean():.2f}  median {np.median(dE[m]):.2f}  p90 {np.percentile(dE[m], 90):.2f}  (blur {blur} native px)')
print(f'dE raw  mean {dEraw[m].mean():.2f}  median {np.median(dEraw[m]):.2f}')
print(f'dL      mean {dL[m].mean():+.2f} (positive = ours brighter)')
tx, ty = map(int, tiles.split('x'))
rows = []
for j in range(ty):
    row = []
    for i in range(tx):
        s = (slice(j * H // ty, (j + 1) * H // ty), slice(i * W // tx, (i + 1) * W // tx))
        mm = m[s]
        row.append(f'{dE[s][mm].mean():5.1f}' if mm.any() else '   --')
    rows.append(' '.join(row))
print('tiles   (mean dE per tile, top-left first)\n        ' + '\n        '.join(rows))
if heat:
    hm = np.clip(dE / 20.0, 0, 1)
    img = np.stack([hm * 255, (1 - np.abs(hm - 0.5) * 2) * 160, (1 - hm) * 60], -1)
    img[~m] = [40, 40, 40]
    Image.fromarray(img.astype(np.uint8)).save(heat)
    print('heat   ', heat)
