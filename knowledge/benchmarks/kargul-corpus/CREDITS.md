# Kargul corpus, 2026-10-22: credits, capture and how to use it

**Study evidence only.** Every image here belongs to Marcel Kargul / Kargul Studio (kargul.studio, @marcelkargul, @kargulstudio). Client screens also belong to the named clients. Rules for use:
- Never repost, trace, publish, show to a client, or present any of it as engine or Larpo work.
- Never copy his logos, brand names, client names, copy, scenes or images into a deliverable. The founder: "NEVER EVER COPY THE SAME LOGO OR LIKE COPY OR EVEN NAME... that's plagiatory".
- The engine learns his grammar and numbers from this folder. It never takes his content.

The study that uses it is `knowledge/web/kargul-corpus-2026-10.md` (KC-01..).

## What is here

| Folder | Source | Files | Unique after de-dup | Date range |
|---|---|---|---|---|
| `x-marcelkargul/` | @marcelkargul, every media post the public FixTweet mirror serves | 1004 media (899 photos + 105 video posters) from 850 posts; `posts.json` holds 956 posts | 527 | 4 Jun 2026 - 22 Oct 2026 |
| `x-kargulstudio/` | @kargulstudio media timeline | 67 media from 67 posts | 15 | Aug 2025 - Oct 2026 |
| `swipe-file/` | kargul.studio/swipe-file, all 632 manifest items (web 158, brand 161, product 313) | 632 | 398 (234 duplicate a case image) | not dated (numbered `project-N`) |
| `cases/` | the 32 case studies at kargul.studio/work; 299 gallery originals, referenced in place (see `cases/CREDITS.md`) | 299 | 295 | not dated |
| `portfolios/` | Dribbble, Layers, Behance, Contra, Figma Community, read.cv | 0 (none reachable or none his; see `portfolios/CREDITS.md`) | - | - |

**Total:** 2002 files, 1236 unique images.

## Files

- `manifest.tsv`: one row per file, with these columns:
  - `id`, `source`, `date` (X only), `url`: the original URL (CDN or `pbs.twimg.com ...?name=orig`) for media, and the post URL for X;
  - `local_file`: the full-resolution original;
  - `study_file`: an 800-px JPG, committed;
  - `width`, `height` of the original;
  - `mean_L`, `dark_share`;
  - `dup_of`: the canonical id when the image is the same as an earlier one. Matching is by 32x24 luminance signature with a mean abs diff <= 3. Priority order: case originals, then swipe, then X.
- `classification.tsv`: every file, with these columns:
  - `kind`: one of hero, landing section, bento, product app screen, dashboard, mobile, component, brand or logo, X post format, illustration, other;
  - `theme`: light or dark;
  - `layout_family`: F1..F10 from `knowledge/web/kargul-heroes.md`, heroes only;
  - a one-line note;
  - `dup_of`.

  Duplicates inherit the canonical's class. Every unique image was read by eye on contact sheets (`_scripts/sheet.py`, 30 per sheet). Case images reuse the earlier `kargul-x/gallery-classification.tsv` classes, mapped to these kinds. Measurement passes corrected 15 labels (`_scripts/cls/zz-overrides.map`).
- `census.tsv`: automatic numbers per unique image, from `_scripts/census.py` on the originals:
  - canvas colour from the four corners, and whether it is solid;
  - content insets and bleed sides;
  - saturated-pixel share;
  - hue bins;
  - top neutral greys.
- `measure/`: hand-probed measurements, 255 rows in all:
  - `heroes.tsv`: 42 rows;
  - `product-ui.tsv`: 58;
  - `bento-section.tsv`: 38;
  - `x-posts.tsv`: 116 images from 77 posts;
  - `x-formats-summary.tsv`: per X format type, the posts, median views and bookmarks, and the recipe.

  The `sample-*.txt` files are the stratified samples (seeded random per kind). Each row carries its scale and precision: P = hairline-verified, E = estimated, crop = presentation crop (ratios only), V = video poster.
- `sheets/<kind>-NN.jpg`: contact sheets per kind, 48 per sheet, sorted by theme and then family.
- `_scripts/`: the harvest and analysis code:
  - `xpager.py`: FixTweet pager;
  - `build_x.py`: merges timelines and builds the download lists;
  - `dl.py`: sequential downloader;
  - `derive.py`: manifest, study JPGs and de-dup;
  - `census.py`;
  - `sheet.py`;
  - `merge_cls.py`;
  - `cls/*.map`: the hand classifications.

  Run Python with `-I`.
- `_originals/` (gitignored, 613 MB): the full-resolution originals. To rebuild them, run `python3 -I _scripts/dl.py _scripts/<list>.tsv 0.7` for each of `swipe-list.tsv`, `xm-list.tsv` and `xs-list.tsv`. Case originals live in `../kargul-studio-2026-10/` and `../kargul-deep/gallery/`.

## How it was captured (2026-10-22, read-only)

- **No accounts.** No login and no account of ours. Nothing was liked, followed, replied to, posted or submitted.
- **Quiet capture.** Every heavy command ran under `nice -n 19`, one download stream at a time, with 0.7 s between files and 3 s between API pages. No browser was used.
- **X.** `https://api.fxtwitter.com/2/profile/<handle>/media`, paged with the returned cursor until it came back empty:
  - @marcelkargul: 86 pages, back to 4 Jun 2026;
  - @kargulstudio: 8 pages.

  This media endpoint reaches two months further back than the `/statuses` endpoint, which stops at 12 Aug 2026 (`../kargul-heroes/x/`). It still does not reach his whole history: the profile reports 3611 media items, and the mirror serves 1004. Merged with the earlier timelines in `../kargul-heroes/x/` and `../kargul-x/new-2026-10-22/`. Photos came at `?name=orig`. Videos were not downloaded; only their poster frame (`-vthumb`) was kept.
- **Swipe file.** The page was fetched on 2026-10-22 and lists the same 632 `/assets/images/swipe-file/showcase/{web,brand,product}/project-N.png` as `../kargul-heroes/x/swipe-file-manifest.json`. All 632 were downloaded.
- **Cases.** `/work` still lists the same 32 cases as `../kargul-studio-2026-10/cases.json`. All 299 gallery originals were already local (281 as 1800-px copies in `kargul-deep/gallery`, 18 as 2880 originals), so nothing new was downloaded.
- **Portfolios.** See `portfolios/CREDITS.md`.

## Scale and precision

- **Case originals:** 2880x2070, an exact 2x of 1440x1035.
- **Swipe exports:** these are not one scale. The hero pass measured DefendLab at 1.104 px/CSS, Allo 1.150, Opero/Lemon/Gopher 1.20, Ostium 1.345, Supermetal 1.401 and Tessa 1.441. Many product exports are zoomed crops. Always verify the scale on a hairline.
- **X originals:** these vary. Typical frames:
  - 2880x2070 and 3180x2550 (2x and 2.2x of a 1440 frame);
  - 4096x2660 (a desktop composite);
  - 2048x4096 and 960x2048 (strips);
  - 1024x2048.
- **De-dup caveat:** the signature can merge two different designs that share a layout. One false match was found and fixed (the AI-vs-studio pair, `xm-2082028854441292041-1`).

## Removed or labelled as not his design work (kept as `other` for completeness, never used as evidence)

112 unique `other` images:
- personal photos (watch, desk, PC);
- screenshots of X, LinkedIn, DMs, GitHub, App Store and analytics;
- third-party sites (mindcloud, an AlignUI component page, minimal-site and bento directories, AWS);
- blank video posters.
