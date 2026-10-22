# Preflight: one command before every delivery

Founder, 2026-10-22: "sometimes complete magic, sometimes complete bullshit... buttons not centred, missing a background blur... build algorithms/rules for yourself to check everything every time."

```bash
nice -n 19 node tools/preflight.mjs <url> --kind <kind> --name <name> --w <W> --h <H> [--direction work/<name>/DIRECTION.md] [--anchor all|tl|tr|bl|br] [--png a.png,b.png --format <id>] [--seams 464,928] [--artboard]
```

It prints one PASS/FAIL table, writes `reports/<name>/preflight.md` and `preflight.json`, and exits 1 on any FAIL. The router requires 0 FAIL in every mode. Run it at the work's real size: a product shot at its canvas (cprodb 1392x932), a hero at its frame (h4a 1440x1035), an X crop at the crop size. `--artboard` (automatic for product, bento and post kinds) runs `check.mjs` at that one size instead of desktop + 390px mobile.

## What it runs, by kind

| Step | Kinds | What fails |
|---|---|---|
| `gate.mjs` | all | the canon censuses: correctness (overflow, one h1, AA contrast, 24px targets), edges and shadows, radius ladder, type tuple, accent hues, button grammar (one primary recipe, CTA height and radius), hero composition (nothing between nav and h1, subtitle lines, CTA-to-product gap, product share), box-model centring of every control, text crossing a crop edge (DE-07), text half-faded by a mask (DE-01), scope and motion against DIRECTION |
| `design_view.mjs` | hero-light, hero-dark, post-component | format, export size, solid canvas, crop share, feed legibility at 514px; writes the side-by-side with the rated references |
| `check.mjs` | all (one viewport for artboards) | overflow, semantics, axe serious issues, contrast. Contrast findings become WARN when the gate ran, because the gate's census separates page text (FAIL) from product text drawn as a picture (WARN) |
| `clipscan.cjs` | all | text wider than its clip box, SVG shapes outside their viewBox, children cut by an `overflow:hidden` parent |
| probes | all | the table below |
| exports (`--png`) | X renders | long side >= 2000px (XP-11), ratio matches the format in `system/x/formats.json`, <= 5 MB (X API image limit) |

## The probes (new, cheap, low false positives)

| Check | Fails when | Why it exists |
|---|---|---|
| `load.fonts` | a named font family is not available, so the text renders in a fallback face | caught on its first run: this worktree's dev server returned 403 for Inter's latin subset (symlinked `node_modules` outside Vite's allowed root), and every page silently rendered in SF |
| `load.images`, `load.page-errors` | a broken `<img>`, an uncaught page error | console errors are WARN |
| `optical.label-centre` | a one-line control label's cap box is not centred: top gap minus bottom gap outside [-2.5, +0.6] px (positive = sits low) | founder h4a r5: "the sign up button visually the top padding looks bigger than the bottom". Measured with the font's real metrics (canvas `measureText` on the computed font): before the 1px lift "Sign up" read +0.81, after it -0.19; every label in the accepted hero sits at -1.96..-0.07. Lowercase mass sits below the cap middle, so a cap box half a pixel low already reads low |
| `optical.icon-centre` | an icon-only control's painted glyph (fill and stroke geometry, not the svg box) is more than 1.25px off the box centre | "buttons not centred" |
| `grey.fill-twins` | two neutral fills, each >= 0.2% of the frame, within OKLCH dL 0.008 of each other | DE-05; cproda r1: "that gray box... is not the same gray as the sidebar" |
| `grey.edge-twins` (WARN) | two neutral 1px edges within dL 0.006 after compositing on their surface | the same drift on rings and borders |
| `primary.per-view` | more than one heavy filled text control (fill >= 3:1 off the surface under it: ink on light, white on dark) on the page, or inside any one `[data-product]` | DE-06, "one ink primary per view" |
| `edge.small-cut` | a chip, avatar, button, icon or row (short side < 120, long side < 60% of the frame) cut by the left, right or top frame edge, unless masked or faded, or cut first by its own card | DE-02: one cut thing on an edge is an accident |
| `fold.end` | the bottom edge cuts an unfaded text line or a small box. PASS modes: margin (nothing crosses), fade (a backdrop blur, a mask, or a linear gradient to transparent covers the edge; found by geometry because blur layers are `pointer-events: none`), deliberate cut (only big boxes, >= 120px and cut >= 25%) | "the fold ends on a progressive blur or a deliberate cut"; h4a r1 "no fade bottom or if not then proper cut off" |
| `post.insets` (`--anchor`) | an X crop's canvas insets are not equal on its anchored corner (+-2px, >= 8px), or the window does not bleed off the other two edges by >= 5%; `all` = equal on four sides | cadence-xpost r1: "why not equal gaps from the left and top... and why a gap from bottom it should cut off" |
| `post.seams` (WARN, `--seams`) | text crosses an internal cut of a strip carousel | the thirds are swiped, so a split label is joined again, but a seam in a gutter is better |
| `alpha.over-pattern` (WARN) | a translucent fill without a backdrop blur sits over a pattern, line or svg layer | DE-04 |
| `copy.reference-names` | visible text contains a name from a studied reference (`system/canon/no-copy-names.json`: Kargul cases, the studios) | the hard no-copy rule |
| `copy.placeholder` | Acme, Northwind, Contoso, Lorem ipsum, TODO and the like | the canon bans stock sample brands |

## Calibration (2026-10-22, replica app on the worktree server :4396)

| Page | Size | Result | Notes |
|---|---|---|---|
| Tempra hero `#/h4a` | 1440x1035 (its frame) | 0 FAIL, 7 WARN | fold.end = fade (the progressive blur), 41 labels centred; WARNs are product-internal (contrast 3.9-4.5 on 11.5px chips, shadow levels, radius ladder inside the product) and four edge greys within dL 0.006 |
| Tempra hero `#/h4a` | 1440x900 (not its frame) | 1 FAIL: `fold.end` | correct: h4a's progressive blur sits at its own 1035px frame, so a 900px cut slices the event cards with no fade. Run every piece at its real frame |
| Tempra product `#/cprodb` | 1392x932, `--anchor all` | 0 FAIL, 6 WARN | insets 56/56/56/56; one real defect fixed during calibration: the Next-up card's Join label sat 1.2px high (the gate's box census and the optical probe both flagged it), now `padding: 1px 10px 0 8px` |
| Tempra dark bento `#/cbentol` | 1440x1200 | 0 FAIL, 1 WARN | three real defects fixed: Friday's time labels cut by the hero cell's edge (now 30-min title-only blocks like Standup), a third answer row peeking 13-20% at the Ask cell's bottom, a "London" value peeking 14% at the calendars cell's bottom. WARN = the radius exception its DIRECTION justifies |
| Tempra Ask close-up `#/xframe?src=cprodb&x=1017&y=16` | 359x427, `--anchor tr` | 0 FAIL, 5 WARN | insets top 40 / right 40, bleeds left and bottom, cut on the row divider |
| Panelry product `#/panelry` (new for @rokasrem) | 1392x932, `--anchor all` | 0 FAIL, 7 WARN after fixes | first run: 6 FAIL. Eight labels 1.1-2.6px high (the shared 1px lift over-corrects on 22px chips and icon buttons: removed there), 9.5px avatar initials (now 10), `aria-label` on plain spans (now `role="img"`) |
| Panelry debrief close-up | 431x455, `--anchor tr` | 0 FAIL, 4 WARN | insets 40/40, bleeds left and bottom, cut under the four signal bars |
| Negative control `#/pfneg` | 1200x800 | 8 planted defects, 8 FAIL | label 1.5px low, two ink buttons, glyph 3px off, #F4F5F7 vs #F2F3F5 fills, a chip cut at the right edge, a card and its text cut by the bottom edge, "Chatsheet" in the copy, an unloaded font. Each passing control next to a planted defect passes (label 1/5, icon 1/2) |
| Kestrel hero (accepted 10-08), Quorum hero (accepted 10-15) | 1440x900 | 9 FAIL each | mostly canon drift since they were accepted (h1 72/550 and 58/550 against today's 50-60 / 400-500 band; Kestrel's 54px CTA gap predates the >= 64 rule) plus real items: the stock name "Northwind" in both products, Kestrel's three heavy primaries, Quorum's two half-faded lines. They stay in the library as accepted references, not postable until a fix pass. Quorum's clipscan "svg cut" (bbox 100.0x58.9 in a 100x58.92 viewBox) is a float artefact in clipscan's test |

## Rules for changing a threshold

- Prove both sides: the accepted pages pass and `#/pfneg` still fails exactly its planted defects. Add a planted defect for any new probe.
- When a probe fails on accepted work, look first: four of the calibration "failures" on the Tempra pages were real defects, fixed at the source.
- Note the change and the numbers in this file in the same commit.
