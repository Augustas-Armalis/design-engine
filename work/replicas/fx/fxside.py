"""Side-by-side (reference | ours | dE heat) for an effect replica.

    fxside.py <n> [--half] [--out path]     reads work/replicas/fx/refs/fxr<n>-ref.png and out/fxr<n>-ours.png
"""
import sys, os
from PIL import Image, ImageDraw
here = os.path.dirname(os.path.abspath(__file__))
a = sys.argv[1:]
n = a[0]; half = '--half' in a
out = a[a.index('--out') + 1] if '--out' in a else os.path.join(here, f'fxr{n}-side.png')
ref = Image.open(os.path.join(here, 'refs', f'fxr{n}-ref.png')).convert('RGB')
ours = Image.open(os.path.join(here, 'out', f'fxr{n}-ours.png')).convert('RGB').resize(ref.size)
hp = os.path.join(here, 'out', f'fxr{n}-heat.png')
ims = [ref, ours] + ([Image.open(hp).convert('RGB').resize(ref.size)] if os.path.exists(hp) and '--heat' in a else [])
w, h = ref.size; g = 16; top = 40
c = Image.new('RGB', (w * len(ims) + g * (len(ims) + 1), h + top + g), (233, 233, 233))
d = ImageDraw.Draw(c)
for i, (im, lab) in enumerate(zip(ims, ['Reference crop', 'Ours (FxR%s)' % n, 'dE heat (blur 3)'])):
    x = g + i * (w + g); c.paste(im, (x, top)); d.text((x + 4, 12), lab, fill=(23, 23, 23))
if half: c = c.resize((c.width // 2, c.height // 2), Image.LANCZOS)
c.save(out); print(out, c.size)
