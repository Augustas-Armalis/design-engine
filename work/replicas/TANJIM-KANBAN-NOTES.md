# Tanjim (gr8r studio) Tasks kanban: replica notes

Study only, never published. Reference: `knowledge/benchmarks/tanjim-x/img/2074140966265725057-0.jpg`, his most-liked post (414 likes, "peek product design"). It is 3200x2400, so a 1600x1200 CSS design at 2x.
Replica: `work/replicas/app/src/TanjimKanban.tsx`, route `#/tkanban`. Overlay: `work/replicas/cmp-tkanban-overlay.png` and `-side.png`.
Method: `tools/probe.mjs` semantics, batched into one Chromium per run. The same ink, row and column boxes were run on the reference and on our 2x render, and the numbers compared. Colours and materials come from his open-source code (`corpus/tanjim-src/gr8r-studio/src/styles/`); geometry comes from the image.

## What registered
- **Frame, panel, sidebar controls, toolbar, tabs, column wells, add bars and card edges:** exact to the device pixel (0 px) after the hairline fix described below.
- **Text boxes:** about 55 measured text and icon boxes. The text boxes are within 0-1 device px (at most 0.5 CSS px) in position and width. Icons are within 1-2 device px.
- **Not exact:** the sidebar and footer icon shapes. The post uses a rounded icon set; we use the nearest lucide icons plus small custom SVGs (flag, comment, clip, sort, board, Trello, Figma). Their boxes and centres match; their glyphs do not. The "45" comment count sits about 1 CSS px left. The line-face avatars are our own neutral placeholders: their size, pitch and pill match, but not the drawings.

## Font: the post is Manrope, not his app's Geist
- His code sets `--font: 'Geist'` (tokens.css:72). The post was not set in Geist.
- We solved the font size from 13 measured ink widths for each candidate (canvas `measureText`, ink = actualBoundingBoxLeft + Right):
  - **Manrope 400:** every string lands on an integer size, spread <= 0.16 px (16.03 / 16.06 / 15.98 / 16.03 / 15.94 / 16.10 ...).
  - **Geist:** spread 15.68-16.56.
  - **Inter:** spread 16.39-17.44.
- Installed `@fontsource-variable/manrope`. This is the actual post face, not a substitute. Weight 400 everywhere; there is no medium or bold in the whole frame.
- Manrope metrics: ascent 1.07, descent 0.30, cap 0.72, x-height 0.54. We place type by cap top, with box top = cap - lh/2 + 0.335*fs.

## Measured anatomy (CSS px)
**Canvas and surfaces**
| Element | Box | Fill | Edge | Radius |
|---|---|---|---|---|
| Canvas | 1600x1200 | #f5f5f5 | - | - |
| App frame | 80,88 1440x1024 | #f3f2f0 (= his `--bg-side` #f4f3f0, tokens.css:8) | none | 16 |
| Main panel | 344,104 1160x992 | #fff (`--surface`) | 0.5 px ring #d5d4d2 (about `--border-strong` #dad7d0, tokens.css:16) | 8 |

The frame is inset 16 on every side of the panel: 16 above, 16 below, 16 on the right. The sidebar sits in the same 16 gutter: x 96..328, so it is 232 wide.

**Sidebar**
- Every control is 232x34 with a 0.5 ring, radius 8.
- **Workspace card:** 96,104 232x48. White, ring #cccbc9. Logo 32x32 at an 8 inset, radius 8.
  - Name: 13/400 ink #1d1c1a at x 144.
  - Company: 10/400 grey.
  - Collapse icon: 18 px, centred at 309.75,127.75.
- **Search:** 96,176 232x34. Fill #e7e6e4 (darker than the frame: a sunken well), ring #d2d1cf. Icon 18 px. "Search" 14 grey at x 130. "⌘ F" 14 #868583, right-aligned with a 10 px inset.
- **"Essentials":** 13 ink, cap top 235.5, x 96.
- **Nav rows:**
  - Pitch 38: a 34-tall box plus a 4 gap (centres at 277 + 38k).
  - Icon 18 px centred at x 112.75. Text 14/400 at x 130, grey #5a5e5d; the active row is ink.
  - The active row is a white raised tab with a #cccbc9 ring and no shadow.
- **Group headers** (Projects, Management, Support, Apps):
  - Text: 13/400 at x 126. Ink when open, grey when collapsed (Management).
  - Chevron: 18 px at x 105.
  - Plus: 19.5 px at x 288.75.
  - Grip: 2x3 dots, r 1.15, at x 318.75.
- **Dividers:** 0.5 px #dedddb at y 543.5, 765.5, 827.5, 973.5.
- **Projects:**
  - Icon: a 19x19 square, radius 5, saturated fill with a white glyph. Fills: green #7fcf21, orange #f6732c, blue #3188e7, rose #f64e6f.
  - Text: 14 grey at x 130.
  - Rows at 613/651/689/727.

**Header**
- **Breadcrumb "Tasks":** 16/400 grey, cap top 124.5, x 360.
- **h1 "Tasks":** 40/400, tracking 0, ink. Cap top 163, x 360. The h1 is 40 px at weight 400 with no negative tracking: the size alone carries the hierarchy.
- **Toolbar:** right-aligned to x 1488, gap 8 between boxes, each 34 tall with a 0.5 ring #cdcdcd and radius 8. All five share the same height and ring, so the row reads as one control group.

| Control | x | Width | Content |
|---|---|---|---|
| Search | 979 | 231 | 18 px icon, text at x 1013 |
| Status | 1218 | 108 | "Status:" grey + "All" ink, 18 px chevron |
| Sort | 1334 | 70 | 16 px custom sort icon |
| Board icon button | 1412 | 34 | 18 px glyph |
| Dashed-circle icon button | 1454 | 34 | 18 px glyph |

- **Tabs:**
  - 14/400. Words start at x 360, 440.4, 491, 548.9, 624, with roughly 20 px between words. Inactive tabs are grey; Board is ink.
  - Rule: 1 px #e6e6e4 at y 262 across 360..1489.
  - Active underline: 1 px #1b1b1b at y 262, x 476..526. It is not centred under "Board" (ink 492..527.5); it is drawn as in the source.

**Columns**
- **Wells:** x = 360 + 286k, y 279, size 271x800.5, fill #fafaf8, 1 px border #f2f2f0, radius 12.
  - Column pitch 286: a 270 column plus a 16 gap, with the stroke outside.
  - The bottom is clipped at y 1079.5, 16 above the panel edge; cards are cut flat by the well's overflow.
- **Column header:**
  - Name: 16/400 ink at well x + 7.8, cap top 299.6.
  - Count: 12/400 grey, cap top 321.2 ("1 cards" kept as in the source).
  - Ellipsis: 20 px, stroke 2, ink, centred at x + 250.75, 306.75.
- **Add bar:** x + 8, y 345, 255x30, fill #f6f6f4, ring 0.5 #e4e4e2, radius 6. Plus icon 19 px stroke 1.2, centred at x + 132, 360 (3.5 px left of the bar's centre, as in the source).

**Card** (border-box 257x244 at well x + 7, y 387 + 252k; card gap 8)
- **Shell:** white, 1 px #e7e7e5 border (his `--border` #e9e7e2, tokens.css:15), radius 7, shadow 0 1px 2px rgba(28,25,20,.04) (his `--shadow-card` tint, tokens.css:52). Padding 12.
- Offsets below are from the card's outer top:

| Offset | Element | Tuple |
|---|---|---|
| +14 | Priority chip | 20 tall pill, padding 0 6, 10/400. High: #fff1f1 / ring #f1d9da / text #c8385a. Medium: #fffbe8 / #efe6c6 / #cf7c10. Low: #fff1fe / #efd8ee / #d24bd0 |
| +23.75 | Card ellipsis | 20 px, stroke 1.5, ink |
| +44 | Tags | 20 tall pills, gap 4.5, padding 0 6.25, fill #f8f8f6, 0.5 ring #e4e4e2, 10/400 grey |
| +85 | Title (cap top) | 16/400/lh 20, ink, max 2 lines |
| +108.6 + 20*(lines-1) | Description (cap top) | 10/400/lh 12, grey, 2-3 lines; follows the title |
| +157.5 | Hairline | 0.5 px #e6e6e6 at a FIXED offset. The third description line runs into it ("scalability", "..."), as in the source |
| +165.5 | Avatar pill | 28 tall, #f7f7f6, 0.5 inner ring #ebebe9, padding 3.5. Avatars 20 px, pitch 14.6 (5.4 overlap). "+2" bubble 20 px #e8e7e3, 8/400 |
| +179.75 | Plus | 16 px, at the right inset |
| +201.5 | Hairline | 0.5 px |
| +209.5 | Footer pills | 26.5 tall, #f7f7f6, no ring, 12/400 grey. Date pill: flag icon 11x13 + 8 gap. Right group: comment pill + clip pill, gap 6.25, anchored 11.75 from the right |

- **Card bottom padding:** 8 (footer pill bottom 623, card bottom 631).

## Icon sizes and strokes
- **Nav, search and toolbar glyphs:** 18 px boxes. The ink measures 14.5-16 px with a visual stroke of about 1.1-1.3 CSS px (lucide strokeWidth 1.4-1.5 at 18 px).
- **His app:** Lucide at stroke-width 1.8 on 16 px glyphs (core/icons.js:11). The post is a hair lighter.
- **Ellipsis glyphs:** the only heavy icons (stroke 1.5-2). They read as solid dots.
- **Card footer icons:** 11-14 px, stroke about 1.1.

## Radius ladder (rendered, measured from the corner profile, not guessed)
| Element | Radius (px) |
|---|---|
| App frame | 16 |
| Column well | 12 (circle fit, about 24 device px) |
| Panel and 34 px controls | 8 |
| Card | 7 (profile 0/1/2.8/4.5/6.8 device px at dy 12/9/6/4/2, which is a 14 device-px circle) |
| Add bar | 6 |
| Project icon (19 px) | 5 |
| All chips, pills and avatars | full |

## Borders and shadows
- **Hairlines are 0.5 CSS px (1 device px):** panel, sidebar controls, toolbar, add bar, chips, card dividers, sidebar dividers.
- **1 px edges:** card border, well border, tab rule.
- **Shadows:** a 0 1px 1-2px warm-tinted drop on cards and toolbar controls only. Panels, wells and sidebar boxes are flat.
- **Lesson (engine-wide):** Chrome snaps a `border: 0.5px` to a whole CSS px when the box sits on a half pixel. Our first pass drew every hairline 2 device px wide, 1 device px off. Drawing them as outset `box-shadow: 0 0 0 .5px` on integer boxes registered every edge exactly.

## Type tuples (Manrope, all weight 400)
| Size / line-height | Colour | Roles |
|---|---|---|
| 40 / 48 | ink | h1 |
| 16 / 20 | ink | Card title, column name |
| 16 | grey | Breadcrumb |
| 14 | ink or grey | Nav, tabs, toolbar, project names |
| 13 | ink | Workspace name, group headers |
| 12 | grey | Column count, footer meta |
| 10 / 12 | grey | Description, chips, tags, workspace company |
| 8 | grey | "+2" |

Colours: ink #1d1c1a (his `--text`, tokens.css:19), grey about #5a5e5d.

## Rules: what makes it read premium
1. **One weight, many sizes.** Every string is Manrope 400: 40/16/14/13/12/10, with no bold anywhere. Hierarchy comes from size and ink-versus-grey only. Evidence: 13 width solves land on integers at 400; at 500 they are all off by 0.2-0.3 px.
2. **The h1 is huge and quiet:** 40/400 with tracking 0, over a 16 px grey breadcrumb that repeats the same word. A light weight at a large size reads more expensive than a bold h1 at 23 px (his app: 23/600, shell.css:386-393).
3. **A half-pixel hairline system.** Every container edge inside the frame is 0.5 px at about #ccc-#e6. Only the card and the well get a full 1 px. Evidence: probe rows show a single device px at 687, 3008, 1957, 2420, 2435 and others.
4. **Warm neutrals, never pure grey.** Frame #f3f2f0, well #fafaf8, add bar #f6f6f4, sunken search #e7e6e4, and shadows tinted rgba(28,25,20) (tokens.css:7-17, 51-54). The canvas outside is the only neutral #f5f5f5, so the app reads as a warm object on a cool sheet.
5. **The sunken-well ladder:** frame #f3f2f0 -> white panel -> #fafaf8 well -> white card. Each surface is one step from its neighbour, and the card is the only raised layer with a shadow (board.css:23-24 for well = `--sunken`, `.kcard` = surface + shadow-card).
6. **One gutter everywhere: 16.** The frame inset, panel inset, well gap and board bottom margin are all 16. Columns are 270 + 16 (pitch 286). Card padding is 12 and the well inner padding is 6; inside is always smaller than outside.
7. **The radius ladder follows nesting:** 16 frame -> 12 well -> 8 panel and controls -> 7 card -> 6 add bar -> 5 icon -> full chips. Each child is smaller than its parent, so nothing looks pasted.
8. **All controls are 34 tall:** search, filter, sort, icon buttons, sidebar search and nav tab. One height means one row, and the toolbar reads as a single instrument (probe: every box spans device rows 331..400).
9. **The selected state is a raised white tab, not a colour.** The active nav row is the same white plus a 0.5 ring as the workspace card, with no accent. Tabs get a 1 px ink underline, not a pill (shell.css:132-149 does the same in his app).
10. **Colour only where it means something:** priority chips (tinted fill, a same-hue 0.5 ring, saturated text) and project icons. Everything else is ink or grey. The coloured pixels are a tiny share of the frame.
11. **The card has a fixed grid, not flowing content.** The dividers sit at +157.5 and +201.5 on every card whatever the copy length, so the avatar row and footer rows align across all columns (probe: the dividers at y 544.5 and 588.5 are identical in all four columns).
12. **Footer metadata lives in soft pills** (26.5 tall, #f7f7f6, no ring): date on the left; comments and attachments as a right-anchored pair. Numbers are 12 grey next to 11-14 px icons, quiet enough to scan.
13. **Avatars sit in a container.** Overlapping 20 px faces (5.4 overlap) live inside a 28 px soft pill with a "+N" bubble, which turns a ragged stack into one object.
14. **Icon boxes are larger than text, strokes lighter than text.** The glyph box is 18 px for 14 px text, with a stroke of about 1.2 px (his app uses 1.8 at 16, core/icons.js:11). Ellipses are the only heavy glyphs, and they read as dots.
15. **The board is cropped by the frame.** The wells stop 16 above the panel edge and the last card is cut flat, which tells the viewer the board scrolls without showing a scrollbar (his app hides the bar too, board.css:236-240).
16. **Raw sizes over a token scale.** The post uses 34 / 30 / 20 / 26.5 / 7 / 4.5 where they fit the content, not a 4 pt ladder. His code does the same: the scale is declared but components hard-code 10/12/14 (gr8r-tokens.json `spacing.real_usage_note`).

## Engine takeaways
- **Hairlines:** for 0.5 px hairlines in replicas, use `box-shadow: 0 0 0 .5px` on integer-positioned boxes, never `border: .5px` on half-pixel boxes.
- **Fonts:** solve the font by width spread across candidate fonts before trusting a codebase's font token. A designer's post can use a different face from the shipped app.
