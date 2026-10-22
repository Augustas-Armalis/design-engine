"""Regenerate the eight effect reference crops (work/replicas/fx/refs/, gitignored) from the committed originals.

    .venv/bin/python work/replicas/fx/fxrefs.py

Each crop is taken at the original's native density and saved at exactly 2 device px per CSS px, so our 2x render
and the crop share one pixel grid. Originals at 2x are cropped losslessly; the 6x and 2.844x Rico exports are
downsampled with Lanczos (never upsampled).
"""
import os
from PIL import Image

here = os.path.dirname(os.path.abspath(__file__))
root = os.path.abspath(os.path.join(here, '../../..'))
K = 'knowledge/benchmarks/kargul-heroes/originals/'
R = 'knowledge/benchmarks/heyrico-x/img/'
# n: (source, native px per CSS px, x, y, w, h in CSS px)
SPECS = {
    1: (K + 'case-breez-01.png', 2, 666, 56, 700, 560),            # light shaft, rim-lit nodes, fibres
    2: (K + 'case-stardust-01.png', 2, 400, 250, 640, 510),        # emitted-light orb, glass cards
    3: (K + 'case-am-trades-00.png', 2, 150, 505, 1140, 255),      # coloured rim on a product window
    4: (K + 'case-opsis-partners-07.png', 2, 60, 505, 1320, 470),  # dithered grain ribbon
    5: (K + 'case-zeroleaks-02.png', 2, 1100, 100, 240, 420),      # polar halftone arcs
    6: (K + 'case-altrina-01.png', 2, 120, 120, 1240, 480),        # line-wave ribbon into a node
    7: (R + '2078162365141651752-3.png', 6, 200, 128, 512, 392),   # double-card material + tick meters
    8: (R + '2099121946437071193-0.jpg', 4096 / 1440, 466, 146, 510, 250),  # grainy gradient modal header
}
os.makedirs(os.path.join(here, 'refs'), exist_ok=True)
for n, (src, s, x, y, w, h) in SPECS.items():
    im = Image.open(os.path.join(root, src)).convert('RGB')
    c = im.crop((round(x * s), round(y * s), round((x + w) * s), round((y + h) * s)))
    if c.size != (w * 2, h * 2):
        c = c.resize((w * 2, h * 2), Image.LANCZOS)
    out = os.path.join(here, 'refs', f'fxr{n}-ref.png'); c.save(out); print(out, c.size)
