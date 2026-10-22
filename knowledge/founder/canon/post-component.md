# Canon: component post (X / social)

Decided defaults, 2026-10-21. Evidence: `founder-taste L<n>`, the accepted Tandem component (ledger `2026-10-09-tandem--component`, "the approval request [is] kinda cool"), the Expense/Weft rejects, `knowledge/web/x-design-posts.md` (XP-xx). Gate numbers: `system/canon/post-component.json`; format checks also live in `tools/design_view.mjs --kind post-component`.

## Floor references
- **Accepted:** Tandem approval request, `work/tandem/tandem-component-4k.png` (Flo grammar: grey tray, status strip, white card).
- **Format recipes (measured, 95 posts):** `knowledge/web/kargul-corpus-2026-10.md` §6, with the per-type table in `knowledge/benchmarks/kargul-corpus/measure/x-formats-summary.tsv`. An X post starts from one of these, replicated, per the cxslices verdict below.
- **Rated benchmarks:** `system/design-view/refs.json` "post-component" (Marcel `kargul-x/kx-036-0-*.jpg`, Flo `x-posts/flohoeller-2up-7x8-chatbox.png`, Kuleszo `kz-172-0-*.jpg`) and `knowledge/benchmarks/flohoeller/affectui-blocks-*`.
- Expense v3 has no recorded verdict; it is not a floor.

## Reading set (5 files)
1. this page
2. `knowledge/web/x-design-posts.md` section 2 (XP-01..28)
3. `knowledge/web/flohoeller-craft.md` (tray, card-in-card, believable content)
4. `system/design-view/refs.json` "post-component" refs (open 2 of the images)
5. the last 5 ledger rounds

## Decided numbers

| Part | Default | Source |
|---|---|---|
| Subject | one component doing one job, alone, mid-interaction (a cursor, a drag, a running step), never a static form | XP-01; L343, L503 |
| Format | still. Use one slot of X's own table, as given in Marcel's cheat-sheet post (KC-24): 1 image 1080x1350 (4:5), 1080x1080 or 1080x608 (16:9); 2 images 1050x1200 (7:8) each; 3 images 1080x1215 left plus 1080x608 pairs; 4 images 1080x608 each. Export at 2-4x (>= 2000px wide). Judged at X's 514px feed tile | XP-07, XP-04, XP-11, XP-28; KC-24 |
| Product-screen post (a whole screen, not one component) | use a measured Marcel format, never a bare screenshot (plain 13.8k vs format 17.9k median views); recipes in "Product-screen formats" below; the 6.5px feed gate does not apply (KC-27) | KC-20..27 |
| Crop | close: component at ~1.5x inside its grey tray, 50-70% of a square frame (35-75% gate band); smallest component text >= 6.5px in the 514px feed | L343, L503; XP-09, XP-28 |
| Canvas | solid near-white `#fbfbfb` (corners std <= 5, chroma <= 14 on 0-255); a soft spotlight centred over the component is allowed if the corners stay solid; dark work on `#0a`-`#111` | L509, L515; XP-08 |
| Tray and greys | tray `#f6f6f6` (never `#f0f0f0`), rings at 6-6.5% ink, tiles `#f8f8f8`; tray strip narrates the state; card-in-tray inset 4-8px, tray radius = card radius + inset | L509; BN-08 |
| Crafted object | at least one tactile object (date tile, raised accent button: ring + inner top highlight + contact + soft drop) | L515 |
| Copy | one short line where a paragraph would go; no headline text in the media; caption carries the words (3-8 words, sentence case) | L509; XP-12, XP-13 |
| Content | believable, coherent names and numbers; labelled sample where it could be mistaken | XP-20 |
| Cursor | real Lucide `MousePointer2`, travels with intent, presses and releases in sync with the component's phases | L343; XP-10 |
| Type and edges | one family (Inter display cut), one edge per box, <= 3 shadow recipes, concentric radii, squircles | L373, L452, L467 |
| Motion | a still by default. When the founder asks for motion: an 8-12s loop of one complete state cycle at 60fps, first frame = money frame, recorded with `tools/record.mjs` (4K60 + `--preset x`) | L512; L509, L343; XP-02, XP-03 |

### Product-screen formats (Marcel, measured; KC-21, KC-22, KC-26)
- **Desktop composite** (43.2k median views):
  - 4096x2660 canvas with the menu bar and dock;
  - the 1440 window at ~2.1x, 74% of the width;
  - insets L=R 12.8%, T 6.1%, B 12.4%;
  - window radius 15-18 CSS, no added shadow.
- **Three 1:2 strips** cut at exact thirds, no overlap. Either:
  - on `#dddddd` (dark `#3c3c3c`), the window inset L=R 5.6% and T=B 2.6% of the composite; or
  - full-bleed 960x2048 strips of a 1440x1024 frame at 2x.
- **2x2 collage**: 4096 wide on `#aaaaaa`-`#e5e5e5`, margin = gutter = 1.5-1.8% of the width, tiles square or ~r20.

## Contradictions resolved

| Topic | Default | Alternative only when | Superseded lines |
|---|---|---|---|
| Motion (audit 4.1 "post: loop-only-if-asked") | still | loop when motion is named in the request | L509 ("ship the component as an 8-12s loop"), L343 ("animate it too" was that brief's ask, not a default) |
| Canvas | solid `#fbfbfb` (+ optional centred spotlight, corners solid) | none | L503 ("sits on a rich field": halftone/dither/grain fields fail XP-08 and the design view) |
| Greys | `#f6f6f6` tray, 6-6.5% rings | — | affectUI's measured `#f0f0f0` (L509 "grays a bit dark") |

## Never (rejected, with evidence)
- A small card on flat grey with a few big empty bars (Overlap post, L503 "too hollow").
- Marcel's palette on our content, a costume of a benchmark (Weft v3, L506).
- Animating when no one asked (Share/Expense v1, ledger `2026-10-20-weft-expense`, "I did not ask to animate").
- Off-centre forms, mixed roundness, dark greys (Expense v1/v2, L509, L512).
- Gradient blobs, wallpapers, device frames or browser chrome behind a **component** (XP-08). A full product-screen post may use the desktop-wallpaper composite (KC-21): it is Marcel's best format at a 43.2k median, and the founder's L509/L515 canvas rules concern component posts.
- Flat white cards with UI inside and no styling (Cadence event card v1, L515).

## Pre-delivery checklist
1. Scope: one component, still unless motion was asked.
2. `node tools/design_view.mjs <url> --kind post-component --name <name>`: 0 FAIL (format, export px, canvas solid, crop, feed legibility); read the PNG beside the refs.
3. Tray luminance >= `#f5f5f5`; rings 6-6.5%.
4. The component is mid-interaction; the state strip says what is happening.
5. No text in the media beyond the component's own UI.
6. Replicate-first: one rated reference rebuilt and overlaid (`compare.mjs`) before our version (L512).
7. If a loop was asked: first frame is the finished state; one full cycle; cursor target measured after the entrance settles (L343).

## Open
- No founder-accepted post since Tandem (2026-10-09). The Flo-tray floor is a benchmark, not an accept of ours.
- Dark component posts: only Marcel's reference; no verdict on ours.
- **Framing conflict, for the founder** (KC-25, `knowledge/web/kargul-corpus-2026-10.md` §9). The founder's 2026-10-22 verdict asks for equal left/top insets with bleed right and bottom. Across 77 measured posts, Marcel insets his product formats symmetrically (L = R, T = B) with no bleed. He bleeds right and bottom only in 2-page scroll pairs and zoomed detail crops (6 of 77). The founder verdict stands until he decides.
- **Teaching formats** (KC-23): annotated specs, font/tracking cards and Do/Don't pairs earn the most bookmarks (font cards 336 median). None has been built or judged by the founder yet.

## Founder verdict 2026-10-22 (cadence-xpost r1, partial: "cool")
- **Framing:** a post's crop insets are equal on the left and top, and the window bleeds off BOTH the right and bottom edges. No bottom margin.
- **Content:** "too monotonic, too little". A calm screen still needs colour accents (calendar/team colours, avatars) and enough content to read as a real product, at least one secondary object (a preview, a chart) besides the list.

## Founder verdict 2026-10-22 (cxslices r1 and the recent X-post heroes, reject)
"hero sections by random for X post - you're getting worse and just been creating bullshit straight... study more create more actually good shit". Random one-off heroes made for X posts are rejected as a practice. An X post starts from a replicated, rated reference (Marcel or Rico post, or a lunor hero). Its content must be a real product moment, not a filler composition. Volume only after one passes the founder.
