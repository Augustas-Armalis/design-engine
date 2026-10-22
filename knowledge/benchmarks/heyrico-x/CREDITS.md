# Rico (@_heyrico) X + acedesign.io study: credits and capture notes

Study evidence only. Every post, image and page here belongs to rico (@_heyrico), founder of Ace Studio (acedesign.io), and, for client screens, to his clients (Alpaca, Aster, Scout, Langdock, Twin, Marketer and the brands shown inside his mock-ups). Nothing is to be copied, traced, reposted or presented as engine or Larpo work. The notes that use this evidence: `knowledge/web/heyrico-deep-2026-10.md` (RD-01..), `work/replicas/RICO-REPLICAS-NOTES.md`, and the two older studies `knowledge/web/heyrico-product-design.md` and `heyrico-recreation-lessons.md`.

## How it was captured (2026-10-22)

- **Timeline** (`posts.json`): `https://api.fxtwitter.com/2/profile/_heyrico/statuses?cursor=<bottom>`, the public FixTweet mirror (same method as `kargul-x/CREDITS.md`), 46 pages with the returned bottom cursor and exponential backoff on errors, until three empty pages in a row. No login, nothing liked, followed or posted. Python `urllib` gets a 404 from the mirror; `curl` with a browser UA works.
  - 590 statuses: 575 by @_heyrico (326 originals, 249 replies) plus quoted posts. The mirror reaches back to 12 Jun 2026 (same limit the 2026-10-09 study hit) plus his pinned post from 25 Sep 2025.
  - Fields kept: id, url, ts, text, likes, reposts, bookmarks, replies, views, replying, author, quote id/author, media (type, w, h, url; video variants), links. Quoted @_heyrico posts are merged with `via_quote`.
- **Photos** (`img/<postId>-<n>.<ext>`, 700 files, 233 MB): every photo of his own posts at `?name=orig` from `pbs.twimg.com`. These are X recompressions (JPEG, some PNG); prefer the case originals below for measuring.
- **Videos** (`video-urls.tsv`): 3 video posts, URLs only (best mp4 variant + thumbnail), not downloaded.
- **Classification** (`img-classification.tsv`): all 700 images with post id, likes, views, bookmarks, kind, light/dark/mid (mean luminance of a 96px thumbnail), size, a near-duplicate cluster id (16x16 dHash, Hamming <= 28 and same aspect) and whether the image is a repost, plus a one-line note. 492 unique images; 142 clusters were posted more than once (up to 7 times).
- **Contact sheets** (`sheets/`): `top60-by-likes.jpg` (best 60 unique images by likes), `all-unique-00..07.jpg` (all 492 unique, labelled U000..U491 = the `cluster` column), `acedesign-case-originals.jpg` (the 92 case CDN originals).
- **acedesign.io live** (`live/<page>/`): home, notes and the six case pages (alpaca, aster, scout, langdock, twin, marketer) captured with Playwright Chromium at 1440x900 @2x: `fold-1440@2x.png`, `full-1440@2x.png`, `dom.json` (text type tuples with counts, backgrounds, radii by height, borders, shadows, every image with natural/CSS size, loaded fonts). `home/fold-dom.txt` lists every decorated element of the home fold with its box and computed style.
- **Case originals** (`live/<case>/cdn/NN-<id>.png`, 92 files): the Framer CDN originals of every case-page image (the `framerusercontent.com/images/<id>.png` URL without the `scale-down-to` query). They are 8-bit palette PNGs (lossless geometry, colours quantised to 256 entries, light dithering on near-white fills) at 3x to 10x of the Figma frame. `live/cdn-list.tsv` maps each file to its page and scroll position. Crops used by replicas are saved next to the case files (e.g. `work-scout/crop-04-growth-card-x1770-y1155-1380x900.png`).

## Export scales of the case originals (solved, not assumed)

The scale of each original is read from a hairline: a 1 CSS px stroke is exactly S image px.
- Aster 6400x4000: grid lines 4 px -> 4x, frame 1600x1000.
- Alpaca onboarding / Scout 5160x3000: window border 3 px -> 3x, frame 1720x1000.
- Alpaca composer 7200x4060: card stroke 10 px -> 10x, frame 720x406.
- Twin sidebar zoom 4200x2380: rows 196 px on a 210 pitch (his 28/30 spec), CTA 168 (24) -> 7x, frame 600x340.
