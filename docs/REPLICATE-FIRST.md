# Replicate first: how this engine works now (founder, 2026-10-20)

Founder after a run of rejects (Overlap, Weft x3, Share, Expense x2): "just try replicating a few works of theirs (in terms of style with your own touch that would be backed up by the book and your checks)... create a way to work like we used to". The builds he loved (Kestrel, Kite hero, Quorum) all got there by matching a measured reference, not by inventing from rules.

## The loop (every new piece of UI)
1. **Pick the reference** the founder rates for this kind of work: AlignUI (`knowledge/benchmarks/alignui-*`), affectUI / Flo (`knowledge/benchmarks/flohoeller/*-stage.png`), Marcel Kargul (`knowledge/benchmarks/kargul-deep/gallery/`, `kargul-x/`), Rico, Attio, Kuleszo. One reference per piece, named in DIRECTION.md.
2. **Rebuild it at the reference's pixel size** (same canvas, frame, sidebar width, row pitch, type tuple, radii, icon family). Our content and brand only; never their copy, logos or assets.
3. **Overlay until it registers:** `node tools/compare.mjs <url> <ref> work/<name>/cmp --w <W> --h <H>`. Read the onion-skin, list every drift in px (rows, gaps, paddings), fix, repeat. Done when rows, columns, dividers and frame edges overlap within ~4px.
4. **Add exactly one to three owned touches** (accent, a state, a data detail) and write them in the file header. The structure and finish stay the reference's.
5. **Gate:** `node tools/check.mjs` (correctness) and `node tools/design_view.mjs` (format, crop, rhythm, founder rules) at 0 fail.
6. **Deliver** our render beside the reference and the overlay. Build only what was asked: no animation unless asked, no extra sections.

## Done so far
- `#/search`: Kargul latest X post, two-part search modal (kxl-020-0, 1440x1024 at 2x), built from kargul-micro-details.md tokens. Own touch: matched query letters highlighted.
- `#/clokora`: Kargul Clokora overview (clokora-01.jpg, 1800x1294). Own touches: weekend bars use the legend grey, a live cap on today, one warm dot.
- `#/decision`: affectUI Decision Inbox (stage 894x520 at 2x). Own touch: a "Due Fri" chip.
- `work/replicas` #/finance: AlignUI Finance "Transactions" (finance-1.png, 1600x1200). Own touches: Harbor green accent, signed in/out amounts, an "On hold" status.

## Measuring step (2026-10-21)

Before writing any code, probe the reference: `node tools/probe.mjs <ref.png> box x y w h` gives the exact ink box of a text block (solve font size from the width, line-height from the baseline pitch), `row`/`col` give edges and fills, and `px` gives exact colours. Re-probe our render with the same boxes and compare numbers, not impressions. A narrower substitute font is fixed by matching the measured line width, not the cap height. Perspective scenes: fit each prop to its measured screen corners with an affine transform instead of forcing one iso matrix.

Replicas built 2026-10-21 (all registered):
- **Kargul Chatsheet hero:** `#/khero`, `work/replicas/KARGUL-HERO-NOTES.md`. The h1 is within 1-3px.
- **Kargul Branding bento cell:** `#/kiso`, ISO-31..38.
- **Attio home fold:** `#/attio`, `work/replicas/ATTIO-NOTES.md`. 0-0.5px marketing, 1px window.
- **Linear home fold:** `#/linear`, `work/replicas/LINEAR-NOTES.md`. The h1 is pixel-identical and the window edges are exact.
