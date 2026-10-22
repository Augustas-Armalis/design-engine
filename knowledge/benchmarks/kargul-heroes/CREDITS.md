# Kargul heroes, 2026-10-22: credits and capture notes

Study evidence only. Every image here is Kargul Studio's (kargul.studio, Marcel Kargul, @marcelkargul) work for the named clients or for unnamed concepts. Never repost, trace into a deliverable, show to a client or present as engine or Larpo work. Client names, logos and copy stay theirs. The note that uses this evidence is `knowledge/web/kargul-heroes.md` (KH-01..). The replicas are `work/replicas/app/src/KargulHeroA..D.tsx`, documented in `work/replicas/KARGUL-HEROES-NOTES.md`.

## What is here

- `originals/`: 53 files, one hero fold each (6 of them are crops of one X post).
  - `case-*.png`: 26 case-study originals. 25 come from `cdn.sanity.io/images/bd8i35vk/production/<id>-2880x2070.png` (exact 2x of a 1440x1035 frame; Breez is a 2732x1964 export at 1.897). The URLs are listed in `index.tsv`. They were picked from `kargul-studio-2026-10/cases.json`, using every gallery image that `kargul-x/gallery-classification.tsv` classes `landing-hero`, plus `am-trades-00` and `rork-04`, whose cases were never classified.
  - `swipe-*.png`: 14 web folds from the studio's public swipe file. The manifest `kargul.studio/swipe-file` lists 632 images (158 web, 161 brand, 313 product), saved in `x/swipe-file-manifest.json`. All 158 web images were downloaded from `kargul.studio/assets/images/swipe-file/showcase/web/project-N.png` to a scratch folder and read on contact sheets. 14 are hero folds that are not already a case original; the other web images are sections, CTAs, footers, product screens or duplicates of the case images. Exports are 1590x1275 (a 2880x2308 frame at 0.552, i.e. 1.1042 device px per CSS px) unless noted.
  - `brand-expenses-26.png`: a brand-sheet hero from the swipe file's brand set (project-26). The brand set was read as 384px thumbnails: 161 images, almost all logos, posters, stationery and type specimens.
  - `x-*.jpg|png`: X originals (`pbs.twimg.com/media/<id>?name=orig`):
    - the "a simple gradient is sometimes all you need" grid (post 2087115320418811976, 2880x2688), cut into six 1440x896 folds (`x-grid-*`);
    - the RebelAudio rejected concepts (2089432182653677912);
    - the Hunt.io full folds (2089371829492203776, 2089404418504429611);
    - BugScout before/after (2109982963362631884);
    - a RunInfra video still (2087640047323336875).
- `live/`: live client sites captured at 1440x900 @2x on 2026-10-22: 43.io, ecom.jobs, heylemon.ai, uniops.app, volcano.dev. `live-dom.jsonl` holds the computed h1, subtitle and button styles. These were dropped:
  - txtcart.com: Cloudflare 1014;
  - boomtax.com: challenge page;
  - gopher.xyz: domain for sale;
  - agentarcade.com: lander;
  - opsispartners.com: private;
  - chatsheet.ai: no response;
  - withallo.com: the live site no longer shows the Kargul fold that `swipe-allo-p29` holds.
  Earlier live captures of 16 Kargul client sites are in `../x-heroes-2026-10/` with `measure/*.json`; `measured.tsv` reuses them.
- `x/`: the deeper X timeline refresh, through the same public FixTweet endpoint as `../kargul-x/CREDITS.md`. No login; nothing liked, followed or posted.
  - `marcelkargul-timeline-2026-08-12..10-21.json`: 636 statuses with 663 media. The cursor ends at 12 Aug 2026, so the mirror serves nothing older.
  - `kargulstudio-timeline-*.json`: 73 statuses from Aug 2025 to Oct 2026.
  - All 663 media were read as `name=small` thumbnails on contact sheets. The design posts are overwhelmingly product UI. The hero folds found are listed above, and every other hero in the timeline is already a case original.
- Portfolios: `dribbble.com/marcelkargul`, `dribbble.com/kargulstudio` and `behance.net/marcelkargul` return 404 or 400. No other public portfolio was found, which matches `../marcel-kargul-profile.md`.
- `measured.tsv`: one row per hero with layout family, h1 tuple, gaps, CTA, nav, background, signature visual, colour and precision. `index.tsv` gives file, project, source URL, mode and family.
- `sheets/`: contact sheets per layout family.
- `replica-data/`: vectorised data that the replicas draw from:
  - the Gopher dot lattice and constellation graph;
  - the Volcano pixel cells;
  - the DefendLab background mesh.
- `_scripts/`: the probes used (numpy and PIL, run with `.venv/bin/python`; one Chromium only for `fontsolve.mjs`):
  - `kh.py`: bands, words, box, row, col, btn, cta, split, hair;
  - `hero.py`;
  - `fontsolve.mjs`: family, weight, size and tracking from line and word ink widths;
  - `rle.py`: flat marks to SVG runs;
  - `dots.py`, `graph.py`, `cells2.py`, `linetrace.py`, `trace.py`;
  - `build_tsv.py`: builds `measured.tsv`, `index.tsv` and the census.

## Scale checks

- Case originals: a 1px hairline reads as 2 identical device px (for example the Gopher grid `#e3e3d7`, the Supermetal rails `#1b1b1b` and the DefendLab nav rule). They are exact 2x.
- Swipe exports at 1590 wide: the Volcano pixel grid fits a 17.75 device px cell to within 0.8 px over 25 edges, a whole 16.075 CSS px. Live type sizes match at 1.1042.
- `measured.tsv` marks presentation crops (zoomed or framed case images) and video stills `crop` or `V`. They are kept for the census of families and signature visuals but excluded from the numeric medians.
