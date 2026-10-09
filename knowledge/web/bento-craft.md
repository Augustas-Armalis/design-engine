---
source: web:linear.app, vercel.com, raycast.com, resend.com, clerk.com, attio.com, framer.com, cal.com, dub.co, supabase.com, mintlify.com, cursor.com, kargul.studio, alignui.com, untitledui.com (measured 2026-10-09 with Playwright, 1440x900, DOM + computed-style inspection per tile)
chapter: Bento section craft (grid patterns, tile anatomy, visual construction, recipes)
pages: n/a (24 element screenshots at @2x in knowledge/benchmarks/bento/)
topic_tags: [bento, feature-grid, tiles, product-ui, illustration, masks, depth, lighting, hover, micro-animation, grid, landing-page, founder-reference]
status: studied
---

# Bento section craft

Why this chapter exists: the founder called the engine's bentos "pretty ass" and asked for "visual creation... without randomly making ketchup bottles from divs... actually reaching Marcel-level quality, truly well-built bento visuals". The engine's Margin `Bento` and Strata `UseCases` follow the old rules in `product-site-anatomy.md` section 2.5 (tile count, radius, padding, surface) and still read as cheap, because those rules describe the box and say nothing about how the visual inside it is built. This chapter measures how 15 shipped sites build the inside. Every number below was read from a computed style, a bounding box or a screenshot; anything synthesised is tagged `[engine note]`. Screenshots live in `knowledge/benchmarks/bento/` (index in section 6).

## 1. Core ideas

1. **The visual is a layer, not a panel.** In Supabase, Clerk, Raycast, Framer and Cal the artwork is an absolutely positioned layer (`figure`/`div` at `inset: 0`, z-index 0 or 10) and the title and body sit above it at z 10-20, on the same surface. There is no hairline between "picture" and "caption". The engine's tiles are two stacked boxes (dotted visual panel, hairline, white text box); that split is the first tell.
2. **The visual is bigger than the room it has, and the tile edge crops it.** Cal's form fragment is 470x412 starting 155px down a 450px tile (117px, 28%, cut off). Framer's CMS panel is 945px wide in an 800px tile (195px, 21%, cut off). Raycast's chat window is 972x595 in a 1020x477 tile and even pokes 40px above the tile top. A cropped, oversized fragment says "this is a bigger real thing"; a small complete object centred in a field says "this is an icon".
3. **Real product UI is built at true app scale.** Text inside bento visuals is 10-14px (Framer 12px, Clerk 10-11px, Raycast 13px, Linear 13px, Cal 14px, Attio 14px), controls are 28-40px high. It is never scaled up to look good at tile size. The engine's rows (44-48px, 12.5px mono) look like a settings page, not a believable slice of an app.
4. **Fades do the finishing.** Every fragment that is cut by a tile edge is masked with a `linear-gradient` mask (Framer black 56.7% to transparent 91.4%; Raycast black 55% to transparent; Attio black 82% to transparent) or an overlay that fades to the exact tile colour (Clerk `radial-gradient(... transparent 42%, tileBG 90%)`). Hard cuts do not appear in any measured tile except at the tile's own rounded edge.
5. **A bento mixes visual types, but speaks one language.** Raycast's three bottom tiles are a rendered 3D glass image plus live UI, a raster crop of a palette, and DOM keycaps. Clerk's nine tiles are nine different constructions. What unifies them is surface, radius, padding, one text style, one light direction, one accent, not one construction trick. The engine's Margin uses one recipe four times (stack of white rows).
6. **Depth comes from layers with offsets and a single light.** Ghost cards offset 12px behind the main card (Cal), glass buttons with `backdrop-filter: blur(24px) saturate(1.5)` (Raycast), top-lit shadow stacks (Clerk `0 -10px 16px -4px rgba(255,255,255,0.04)` over `0 10px 19px 4px rgba(0,0,0,0.16)`), `inset 0 1px 0 rgba(255,255,255,0.10)` on dark tiles (Raycast). The engine uses one flat 1px ring on everything.
7. **Authored illustration is a file, not CSS.** Supabase ships light and dark SVGs per tile (`database-light.svg`, `edge-functions-light.svg`, `vector-light.svg`); Kargul renders Rive artboards into a `<canvas>` (826x603 for a 344x101 slot) with an AVIF poster frame that crossfades (0.5s). Concentric border circles around a dark disc (Strata Operations) is the "ketchup bottle": an object drawn from divs that no designer would have exported.
8. **Interaction lives inside the visual.** Measured motion is local to the artwork: opacity swaps at 0.15s (Supabase), a spectrum glow at 0.2s (Vercel passport), cursors travelling 0.75-1s (Supabase Realtime), icon columns on a 35s linear marquee, a sequenced reveal of rows with `blur(8px)` text and 0.8-scale icons (Clerk). Tiles themselves do not lift.
9. **Copy is cut to the visual's one claim.** Titles are 1-4 words (Performance, CMS, Realtime, Quicklinks, Passport), bodies 1-3 lines at 288-372px width, left aligned at 24px padding.
10. **The grid itself is dull on purpose.** Equal heights, spans that add up exactly (Clerk tall 528 = 2x260+8; Vercel tall 580 = 2x280+20), 2-3 repeating row heights. The craft is inside the tiles, not in clever tile shapes.

## 2. Rules

### 2.1 Grid skeletons, tile count, gaps

- **RULE** Pick one of six measured skeletons instead of inventing a layout: (a) 12-col lead plus small, 7 tiles (Supabase: 538x400 lead beside two 263x400, then four 263x400); (b) 3-col with tall tiles spanning 2 rows, 9 tiles (Clerk dark: 395x260 and 395x528, gap 8); (c) 2x2 equal, 4 tiles (Cal: 518x450 over 518x355, gap 12); (d) 2-col with a full-width lead, 3 tiles (Raycast: 1020x477 over two 495x513, gap 30; or 1204x218 over two 582x341, gap 40); (e) 6-col 3+2, 5 tiles (Kargul: three span-2 tiles 392x436 over two span-3 tiles 600x388, gap 24); (f) hairline-divided 3x3 with 800px spans, 7 tiles (Framer: 400x480 cells, gap 0, 1200x1440 frame radius 25).
  **Why** Each skeleton gives the eye one entry tile and a repeating rhythm; the tile count and the gap are tied (more tiles, tighter gap).
  **Applies to** landing page. **Check** the grid's column count, tile count and spans match one of (a)-(f); every row sums to the container width. **Source** Supabase, Clerk, Cal, Raycast, Kargul, Framer

- **RULE** A feature bento has 3-7 tiles; reserve 8-12 tiles for one catalogue section per page. Clerk's 9-tile and Framer's 7-tile grids sit after a short intro and each tile has one claim.
  **Why** Above 7 tiles the grid reads as a list and each visual shrinks; below 3 it is not a bento.
  **Applies to** landing page. **Check** count direct tile children of the grid: 3-7 for the main feature section, at most one grid with more than 7. **Source** Raycast 3, Cal 4, Kargul 5, Supabase 7, Framer 7, Clerk 9

- **RULE** Make the lead tile 2x the small tile in one dimension, plus the gap: Supabase lead 538 vs small 263 (2.05x wide), Raycast lead 1020 vs 495 (2.06x), Vercel lead 685x580 vs 685x280 (2.07x tall), Clerk tall 528 vs short 260 (2x+8). Kargul's 600 vs 392 (1.5x) is the loosest measured.
  **Why** An exact 2x lets spans line up on the grid and gives a clear hierarchy; 1.2-1.4x reads as a mistake.
  **Applies to** landing page. **Check** lead tile width or height divided by small tile equals 2.0-2.1 (or exactly 2x plus gap when stacked). **Source** Supabase, Raycast, Vercel, Clerk

- **RULE** Give tall tiles a height of exactly two short tiles plus the gap, and keep every row on the same top edge; use 2-3 row heights per grid in total.
  **Why** Orphan 1px steps destroy the grid more than any style choice; measured grids never have them.
  **Applies to** landing page. **Check** tall.h == 2*short.h + gap in px; tiles in a row share the same top. **Source** Clerk (528 = 2x260+8), Vercel (580 = 2x280+20), Cal (450 and 355 rows)

- **RULE** Scale the gap with the tile count and the surface: 2-3 large tiles 30-40px (Raycast 30 and 40), 4-5 tiles 12-24px (Cal 12, Kargul 24, Untitled UI 24), 7-9 dense tiles 8-12px (Supabase 12, Clerk 8), or 0 with hairline dividers inside a framed outer box (Framer). Linear's agent cards use 12.
  **Why** Dense grids need tight gaps so the surface reads as one object; sparse grids need air around each hero visual. [engine note: the inverse relation between tile count and gap is read from these sites, not stated by any of them]
  **Applies to** landing page. **Check** measured gap vs tile count falls in the bands above. **Source** Raycast, Cal, Kargul, Supabase, Clerk, Framer

- **RULE** Keep the bento container 1200-1280px wide at a 1440 viewport (Supabase 1280, Clerk 1200, Framer 1200, Kargul 1224, Untitled UI 1312, Cal 1048 and Raycast 1020 are the narrow outliers), left aligned with the section heading.
  **Why** Tile visuals are authored at fixed sizes (350-540px wide); a container wider than ~1300 forces either stretched artwork or larger gaps.
  **Applies to** landing page. **Check** container width in [1020, 1312]; heading left edge equals first tile left edge. **Source** Supabase, Clerk, Framer, Kargul, Untitled UI

- **RULE** Collapse in three steps: 1 column below md, 2 columns at md, full grid from xl (Supabase `grid-cols-1 sm:grid-cols-2`, Clerk `grid-cols-1 md:grid-cols-2 xl:grid-cols-3`, Kargul `grid-cols-1 md:grid-cols-2 xl:grid-cols-6`); fixed tile heights apply to the desktop layout only.
  **Why** Visuals that are cropped on desktop must keep a sensible crop at 390px; fixed pixel heights at 1 column leave dead space.
  **Applies to** landing page. **Check** grid-template-columns at 390, 768 and 1440 differs in three steps. **Source** Supabase, Clerk, Kargul

### 2.2 Tile surface, radius, edge and lighting

- **RULE** Use tile radius 16 on light and dark grids (Supabase, Clerk, Cal, Untitled UI), 18 for a more rounded system (Kargul), 12 for a tight dark system (Raycast B, Linear). Size inner media at outer radius minus the inset when the inset is at most 4px (Supabase 16 outer and 15 inner, Untitled UI pad 4 giving 12 inner); with a 24px inset use 12 for inner cards (Cal, Linear 8-12).
  **Why** Concentric radii only hold for thin insets; a 24px gutter makes a 16px inner radius look swollen.
  **Applies to** landing page. **Check** outer tile radius in {12, 16, 18}; inner media radius per the rule; at most 4 distinct radii in the section. **Source** Supabase, Clerk, Cal, Untitled UI, Kargul, Raycast

- **RULE** On a light page draw the tile border as a 1px gradient frame or a two-layer whisper shadow: Supabase wraps the tile in a 1px-padded outer element with `linear-gradient(ink 8%, ink 4%)` (fading downward) around an inner white box at radius-1; Cal uses `0 1px 5px -4px rgba(36,36,36,0.7), 0 4px 8px rgba(36,36,36,0.05)`; Untitled UI uses a flat 1px `#e5e5e5`.
  **Why** A frame that fades or a shadow below 0.08 alpha reads as printed, not as a box; it also matches the founder's whisper-shadow rule.
  **Applies to** landing page. **Check** tile box-shadow blur <= 24px and alpha <= 0.16, or a 1px gradient frame; no 2px or 3px borders. **Source** Supabase, Cal, Untitled UI, founder-taste

- **RULE** On a dark page give the tile a lit top edge: `inset 0 1px 0 rgba(255,255,255,0.10)` plus `border: 1px solid rgba(255,255,255,0.06)` on a `linear-gradient(45deg, #0c0d0f, #070809)` fill (Raycast B); or a flat `#212126` tile with a 1px inner ring (Clerk); or `#0f1011` with `border: 1px rgba(255,255,255,0.12)` and `0 2px 32px rgba(0,0,0,0.25)` (Linear panels). Resend brightens the middle of the top hairline.
  **Why** A single top light direction makes dark tiles read as slabs under light; a uniform ring makes them read as outlines.
  **Applies to** landing page. **Check** dark tile has an inset top highlight at 6-12% white or a ring at 6-12% white, and a fill within 8 L-points of the page background. **Source** Raycast, Clerk, Linear, Resend

- **RULE** Choose the tile fill by page mode and keep it identical across the grid: light grids use white on a grey canvas (Supabase, Cal, Untitled UI), dark grids use rgba(255,255,255,0.02) over the page (Raycast A), `#212126` (Clerk) or `#313131` (Kargul).
  **Why** A tile is a window onto a surface; the nested objects (cards, windows) need a visible step in luminance against it.
  **Applies to** landing page. **Check** every tile in the grid has the same background token; nested cards differ from it by at least 4 L-points. **Source** Supabase, Raycast, Clerk, Kargul

- **RULE** Use one accent hue per bento: Supabase green only, Framer blue `#0099ff` only (LCP bar, uptime link, the lock), Clerk neutral with sky-blue glints, Raycast blue glass. Status colours (red x in Clerk's fraud rows, green Delivered chip in Resend) are the only second hue.
  **Why** Colour carries one meaning; five accents across five tiles looks like five products.
  **Applies to** landing page. **Check** saturated pixels in the tile area cluster in one hue band plus status colours. **Source** Supabase, Framer, Clerk, Raycast

### 2.3 Tile anatomy: text, padding, visual share

- **RULE** Pad text 24px from the tile edge (Supabase 24, Clerk 24, Cal 24, Raycast 24, Framer 25, Kargul 24 with 18 top, Untitled UI 24 inside a 1px border), and let the visual ignore the padding.
  **Why** Text needs a gutter; artwork that obeys the same gutter cannot bleed.
  **Applies to** landing page. **Check** title left offset in [24, 25]; the visual's bounding box extends beyond the padding box on at least one side. **Source** Supabase, Clerk, Cal, Raycast, Framer, Kargul

- **RULE** Set the title at 16-18px (Supabase 16/600, Raycast 16/500, Untitled UI 16/600, Cal 18/300, Kargul 18/700 at -0.54px, Framer 18/400 at -0.2px; Clerk compact at 13/500) with 1-4 words, and a body at 13-15px in a muted tone, 1-3 lines, max width 288-372px (Vercel 288, Raycast B 351-372). A lead tile may use 24px/450 at -1.2px (Vercel Passport).
  **Why** Type this small stays out of the visual's way; width caps keep the body in the tile's text corner.
  **Applies to** landing page. **Check** title font-size in [16, 18] (24 on one lead), words <= 4; body lines <= 3 and width <= 380px. **Source** Supabase, Raycast, Untitled UI, Cal, Kargul, Framer, Vercel

- **RULE** Put text in one corner for the whole grid: top-left (Supabase, Cal, Kargul title, Untitled UI media-first aside) or bottom-left (Raycast, Framer, Vercel, Clerk short tiles). Mixing is allowed only when tile aspect decides it (Clerk: short tiles show visual above text, tall tiles show text above visual).
  **Why** The reader learns where the words are after one tile; a mixed grid forces re-scanning.
  **Applies to** landing page. **Check** text block y-offset class (top or bottom) is identical for tiles of equal height. **Source** Supabase, Raycast, Framer, Clerk, Cal

- **RULE** Left-align tile text; centre it only when every visual is a symmetric icon-centred motif (Opero in the founder references).
  **Why** Every inspected grid with measured text (Supabase, Clerk, Cal, Raycast, Framer, Kargul, Vercel, Untitled UI) left-aligns tile text on the tile's padding edge; centred text under an off-centre visual misaligns both.
  **Applies to** landing page. **Check** title text-align left unless all visuals are centred motifs. **Source** Supabase, Clerk, Cal, Raycast, Framer, Kargul; Opero (style-refs-x-2026-10.md)

- **RULE** Share one surface between visual and text: no border-top, no separate background and no hairline between the two. Text sits above the visual layer (z 10-20), the visual is z 0 or 10 with `pointer-events: none`.
  **Why** Supabase, Clerk, Raycast, Framer and Cal draw one object per tile; the engine's two-box tile reads as a card with a thumbnail.
  **Applies to** landing page. **Check** tile has no internal border between media and copy; copy container is `position: relative` above the media layer. **Source** Supabase (figure absolute z0, text z10), Clerk (text z20, visual z10), Raycast, Framer, Cal

- **RULE** Give the visual 55-65% of the tile height: Cal's fragment region starts at y=155 of 450 (65% of the tile is visual), Clerk short tiles 164 of 260 (63%), Raycast B 207 of 341 (61%).
  **Why** Too little visual reads as a card with an icon; too much leaves the copy without a home.
  **Applies to** landing page. **Check** (visual bottom - visual top)/tile height in [0.55, 0.70]. **Source** Cal, Clerk, Raycast

- **RULE** Make the main visual at least 15% larger than the space it is given, so the tile edge crops it: Cal 28% hidden below, Framer 21% hidden right, Raycast window 95% of tile width and 125% of tile height. Overhanging the tile top by up to 40px is allowed on one lead tile with `overflow: visible` (Raycast A).
  **Why** Cropping implies a larger real surface, which is the whole point of showing a fragment.
  **Applies to** landing page. **Check** visual bounding box exceeds the tile's padding box by >= 15% of its own size on at least one edge. **Source** Cal, Framer, Raycast

- **RULE** Anchor the visual to an edge or corner (bleeding bottom, bleeding right, bleeding top) rather than centring it with equal margins on four sides; the empty margin around a centred object is the "icon on a field" look.
  **Why** In Supabase, Cal, Framer, Raycast, Vercel, Clerk and Kargul the main fragment touches or crosses at least one tile edge; Strata and Margin centre theirs.
  **Applies to** landing page. **Check** the visual's bounding box touches or crosses at least one tile edge; empty margin on all four sides is under 40px or absent. **Source** Cal, Framer, Raycast, Supabase, Vercel

- **RULE** Keep one claim per tile: the visual proves the title (Quicklinks shows a palette filtering "scratch", Branches shows a branch tree, Fraud shows rows being blocked), body at most two sentences.
  **Why** A tile that illustrates a loosely related object (rings for "Operations") makes the visual decoration.
  **Applies to** landing page. **Check** visual: remove the title, the visual still tells what the feature is. **Source** Raycast, Framer, Clerk

### 2.4 Visual construction: layering, masks, depth, lighting

- **RULE** Fade a cropped fragment with a CSS mask: start the fade at 45-80% of the fragment's height and end transparent at 91-100% (Framer 56.7%/91.4%, 44.2%/70.8%/94.8%, 59.4%/77.3%/93%; Raycast A 55%/100%; Raycast B 73.7%/91.2% at 179deg; Attio 82%/100%).
  **Why** A mask removes the cut line, keeps text legible over the tile colour and works on any background.
  **Applies to** landing page. **Check** computed `mask-image` linear-gradient on every fragment cut by the tile edge; first stop between 44% and 82%. **Source** Framer, Raycast, Attio

- **RULE** Fade the sideways overflow too: apply `mask-image: linear-gradient(270deg, transparent 25%, #000 62%)` to rows that run off the tile (Framer Site Settings form) and `linear-gradient(90deg, #fff, transparent)` to marquee ends (Clerk social icons).
  **Why** A horizontal cut mid-word is the second most common cheap tell.
  **Applies to** landing page. **Check** no text or control is clipped by the tile edge without a mask. **Source** Framer, Clerk

- **RULE** When the artwork has non-uniform content, overlay a fade to the exact tile colour instead of a mask: Clerk stacks `radial-gradient(97% 100% at 50% 0%, rgba(33,33,38,0) 42%, #212126 90%)` above the visual layer and `linear-gradient(to top, transparent 50%, #fff 85%)` is used by Supabase Realtime.
  **Why** Overlays let background texture and nested glows dissolve together, which a mask on one child cannot.
  **Applies to** landing page. **Check** overlay colour equals the tile background token; overlay sits above the visual and below the copy. **Source** Clerk, Supabase

- **RULE** Build depth with offset ghost layers behind the main card: Cal places a copy 12px higher and 12px narrower per side (446 vs 470 wide, 12px above) behind the form; Cursor stacks two app windows on a tinted plate, offset roughly 130px across and 165px down (read from the screenshot, not the DOM).
  **Why** Two or three offset layers give parallax-like depth without any blur or heavy shadow, and survive a cropped tile.
  **Applies to** landing page. **Check** at least one tile in the grid shows 2+ stacked layers with visible offsets of 8-16px. **Source** Cal, Cursor

- **RULE** Give floating windows on dark tiles a stacked shadow and a half-pixel ring: `0 16px 48px 8px rgba(0,0,0,0.2), 0 0 0 0.5px rgba(0,0,0,0.75)` plus `backdrop-filter: blur(30px)` on a `rgba(17,18,23,0.96)` surface (Raycast A); objects such as Clerk's keys use `0 10px 19px 4px rgba(0,0,0,0.16), 0 -10px 16px -4px rgba(255,255,255,0.04)` and a 1px ring at 1-2% white. Light tiles keep whisper shadows (Vercel code card `0 0 0 1px` ring plus 8% black).
  **Why** Dark surfaces need black below and a faint white above to read as objects; blur above 30px or alpha above 0.2 turns to mud.
  **Applies to** landing page. **Check** window shadow blur <= 48px alpha <= 0.2 on dark; <= 24px alpha <= 0.16 on light cards. **Source** Raycast, Clerk, Vercel, founder-taste

- **RULE** Make glass controls from three parts: `backdrop-filter: blur(24px) saturate(1.5)`, a vertical white gradient (15% to 12% to 12% to 15%), `mix-blend-mode: plus-lighter`, plus a 0.5px ring (Raycast toolbar buttons).
  **Why** The gradient and blend keep the glass lit on any content behind; plain white 10% looks grey.
  **Applies to** landing page. **Check** glass buttons use backdrop-filter and a blend mode; no flat rgba fills. **Source** Raycast

- **RULE** Use one light direction: top for dark tiles (inset top highlight, radial glow from `50% 0%`), top-left for objects (Clerk object gradients `to right bottom` from 5% white), and add colour glow only on interaction (Vercel passport spectrum strip: blurred 20px gradient, opacity 0 to 1 in 0.2s on hover).
  **Why** Mixed light directions make a grid look assembled from stock parts.
  **Applies to** landing page. **Check** visual: highlights and glows all come from the same side across tiles. **Source** Raycast, Clerk, Vercel

- **RULE** Layer behind-the-UI art for atmosphere: a rendered or generated image (Raycast `snippets-blue-glass` at 75% opacity, wider than the tile and bleeding off the top and right) with a live card on top using `backdrop-filter: blur(15px)` and a `linear-gradient(137deg, rgba(17,18,20,0.75), rgba(12,13,15,0.9))` fill.
  **Why** The image supplies colour and material; the UI card supplies meaning; blur lets them read as one.
  **Applies to** landing page. **Check** art layer opacity 60-85%, UI card has backdrop-filter and a translucent fill. **Source** Raycast, Mintlify (generated line-art posters)

- **RULE** Keep decorative guides faint and structural: dashed guides at 1px and 6-10% white with square node handles (Attio SDK diagram), corner brackets of 14-16px squares (Untitled UI), isometric grids at 8-12% white (Kargul); never at more than 15% alpha.
  **Why** Guides say "designed" and "technical" at once; if they compete with the artwork they become noise.
  **Applies to** landing page. **Check** guide line alpha <= 0.15 on dark, <= 0.12 on light. **Source** Attio, Untitled UI, Kargul

### 2.5 Visual taxonomy: choose by feature, not by habit

- **RULE** Choose the visual type from this mapping: a screen or workflow becomes real-UI-in-HTML; a hardware or shortcut idea becomes a skeuomorphic object; a data claim becomes a chart or a single large number; a platform or API becomes an authored line illustration or a code card; breadth becomes an icon marquee or logo grid; an AI interaction becomes a chat or prompt fragment with a caret.
  **Why** Each type matches how people already understand the feature; mismatches (rings for routing) force decoration.
  **Applies to** landing page. **Check** DIRECTION.md maps each tile to a type in section 3 table "Visual taxonomy". **Source** Clerk, Raycast, Framer, Supabase, Attio, Kargul

- **RULE** Use at most 2 of 5 tiles (or 3 of 7) from the same visual type; Raycast B uses three types in three tiles and Clerk nine types in nine tiles.
  **Why** Repetition of one recipe (Margin: stack of white rows in four of five tiles) is the quickest route to "template".
  **Applies to** landing page. **Check** count tiles per visual type: no type above 40% of tiles. **Source** Raycast, Clerk, Supabase

- **RULE** Ship illustrations as exported assets with light and dark variants, never as border circles and divs: SVG per tile (Supabase `*-light.svg`/`*-dark.svg`, fit `cover` or `contain`), Rive plus a poster AVIF (Kargul), or one SVG wider than the tile (Vercel lead tile 1165x367 SVG at 50% opacity with radial corner fades).
  **Why** Exported vectors carry real curves, line weights and hierarchy; CSS-built illustrations always read as diagrams.
  **Applies to** landing page. **Check** each illustration is an `img`/`svg`/`canvas` from an authored file; zero illustrations made of `border-radius: 50%` divs. **Source** Supabase, Kargul, Vercel

- **RULE** Fix one illustration language per bento: Kargul is isometric white line-art with 1px strokes and a few filled nodes on grey; Supabase is mid-grey outline strokes plus one green accent dot; Untitled UI is corner-bracket frames around ghosted UI. Do not mix outline, filled and photo styles.
  **Why** A consistent stroke weight and perspective is what makes five different drawings read as one hand.
  **Applies to** landing page. **Check** stroke widths within one tile set vary by at most 1px at display size; one projection (isometric, flat or perspective). **Source** Kargul, Supabase, Untitled UI

- **RULE** Build skeuomorphic objects from five parts: radial-gradient face (Raycast keycap `radial-gradient(75% 75% at 50% 91.9%, #121212, #0d0d0d)`), a multi-ring shadow (`0 1.5px 0.5px 2.5px rgba(0,0,0,0.4), 0 0 0.5px 1px #000, ...`), a 1px ring, a glyph, a hover or press transition (0.2-0.4s). One object family per tile at 100-140px.
  **Why** An object needs a face, a rim, a base and a response; two of four makes a button, all five makes a key.
  **Applies to** landing page. **Check** object has >= 3 shadow layers and a transition on transform or shadow of 0.2-0.4s. **Source** Raycast, Clerk, Vercel

- **RULE** Show breadth as a marquee of real marks in uniform squares: 62x62 tiles at 70px pitch with radius 10.7 and a 1px hairline moving on `marquee 35s linear infinite` (Supabase storage), 3 rows tall, cut by the tile edge. Use supplied or icon-set marks; never hand-draw brand logos.
  **Why** Uniform containers calm mixed logos; a slow linear loop reads as background, not as attention.
  **Applies to** landing page. **Check** all marks in a tile share one container size; loop duration >= 30s; marks come from an icon package or supplied files. **Source** Supabase, Attio, founder-taste

- **RULE** Use a single large figure as a visual only once per grid: 54px/500 with -2.16px tracking (Framer "99.99% uptime") over an atmospheric light image, label beneath.
  **Why** One big number gives the grid a rest beat; two give it a stat band.
  **Applies to** landing page. **Check** at most one tile whose visual is a numeral >= 48px. **Source** Framer

- **RULE** Show data tiles with the chart at product density: axis ticks, two series with soft area fills, and a tooltip card (Framer Analytics: date, two series, tick marks, fill fading to transparent), or a flow chart with three coloured stages and percentage chips (Dub funnel). Chart at least 60% of tile width.
  **Why** A line with a dot is an icon; ticks, tooltips and fills prove a real product.
  **Applies to** landing page. **Check** chart has axis labels, a tooltip or marker card and a fill; stroke is not a single anonymous curve. **Source** Framer, Dub

- **RULE** Show code, CLI and config as a card with real structure: 12px mono (Vercel deploy log: `vercel deploy`, tick lines, a production URL), line numbers at 30% alpha, one highlighted or diff line, dark or white card with a 1px ring and 8% black shadow, cropped at the tile edge.
  **Why** Developers read the specific lines; a code tile that looks like code but says nothing breaks trust.
  **Applies to** landing page. **Check** code text is realistic and parses; card is cropped on at least one side. **Source** Vercel, Cursor, AlignUI

### 2.6 Content honesty and the engine's own failures

- **RULE** Build real-UI fragments at true app scale, with 10-14px text and 28-40px controls, with selection, cursor or caret states, one status colour and realistic content (Raycast types "Block my calendar for tomorrow" with a caret; Linear shows a "Thinking..." state; Clerk shows `14:09` timestamps).
  **Why** Scale and state are what make a fragment believable; large type makes it look like a diagram.
  **Applies to** landing page. **Check** UI font-size in [10, 14] inside visuals; at least one state (focus, selected, caret, loading). **Source** Framer, Raycast, Linear, Clerk

- **RULE** Never repeat the same row recipe in more than one tile. Margin's bento uses a white 44-48px row with a 1px ring in four of five tiles (rules list, severity list, toggle list, PR rows); change layout, object, scale and density per tile.
  **Why** Identical rows are recognised as a template within three tiles.
  **Applies to** landing page. **Check** across tiles, the top-level visual structure (rows/stack/chart/object/diagram) is unique per tile. **Source** engine Margin bento (negative), Raycast, Clerk

- **RULE** Show sample-data labels once, at section level, never inside the UI: caption "Sample data" under the grid or after the section heading. Margin's `from 38 merged PRs · sample` inside every row and Strata's `124 leads · sample` pill on the chart break the believability the label was meant to protect.
  **Why** Honesty is satisfied by one visible label; repeating it in chrome makes the UI look like a prototype. [engine note, reconciles CLAUDE.md "never invent proof" with visual realism]
  **Applies to** landing page. **Check** no "sample" text inside a tile visual; one caption per section. **Source** engine Margin and Strata (negative)

- **RULE** Never place an SVG with `preserveAspectRatio="none"` in a tile; draw charts in a fixed viewBox and scale uniformly with `width: 100%; height: auto` or an exact pixel box.
  **Why** Strata's chart dot renders as an ellipse and the stroke thins unevenly because the viewBox 600x220 is stretched to the tile.
  **Applies to** landing page. **Check** `grep preserveAspectRatio="none"` returns nothing in bento components; circles in charts have equal rendered width and height. **Source** engine Strata UseCases (negative)

- **RULE** Connectors must never cross labels or terminate on text: route lines to node edges and fade them 8-12px before a label. Strata's integrations tile draws the Email-to-Docs curve through the word "DOCS".
  **Why** A line over text is the clearest "unfinished" signal at a glance.
  **Applies to** landing page. **Check** visual: line bounding boxes do not intersect any text bounding box except at designed endpoints. **Source** engine Strata integrations (negative)

- **RULE** Do not draw an object by stacking circles and borders (concentric rings around a dark disc with an icon, as in Strata Operations); either use a real routing UI (queues, items moving between lanes) or an exported illustration.
  **Why** Circles with a glyph carry no information and no craft; the clip at the panel edge makes it worse.
  **Applies to** landing page. **Check** no tile visual is composed solely of `rounded-full` and `border` divs. **Source** engine Strata (negative), Supabase, Kargul

- **RULE** Keep the visual panel from being a dotted field: texture lives at 5-8% opacity behind a full-bleed fragment, never as a framed rectangle that holds a small object (Margin and Strata use a 14px radial-dot panel at 7% ink with the object in its top third).
  **Why** The visible panel shows the visual is a thumbnail; a texture under a bleeding fragment is atmosphere.
  **Applies to** landing page. **Check** background texture has no visible edge inside the tile and alpha <= 0.08. **Source** engine Margin and Strata (negative), Mintlify, Supabase Realtime grid

### 2.7 Motion inside tiles

- **RULE** Give at least half the tiles an interaction state in their visual, using measured durations: opacity swaps 0.15s (Supabase hover overlays), glow 0.2s (Vercel), translate 0.3s (Vercel card), colour and box-shadow 0.2-0.4s (Raycast keycaps), cursors and pills 0.75-1s (Supabase Realtime), text and row reveal 0.5-1s (Clerk), poster to canvas 0.5s (Kargul).
  **Why** A bento that is only static reads as screenshots; the hover state is where the product shows itself.
  **Applies to** landing page. **Check** at least ceil(n/2) tiles have a hover, in-view or loop state with a duration in the ranges above. **Source** Supabase, Vercel, Raycast, Clerk, Kargul

- **RULE** Sequence reveals instead of showing everything: Clerk Fraud blocks four rows in order, about 0.5-0.8s apart (all four visible within 2.5s of hover), with the email text going from `blur(8px)` and `opacity: 0` to sharp and the secondary line moving `translateY(8px)` to 0 and the red icon scaling 0.8 to 1, triggered by hover or entering view; reduced motion shows the final state.
  **Why** An ordered story proves cause and effect inside 2-3 seconds without a video.
  **Applies to** landing page. **Check** filmstrip at 0/500/1500/2500ms shows items appearing one after another and complete by about 2.5s; with prefers-reduced-motion all are visible at 0ms. **Source** Clerk

- **RULE** Allow one continuous loop per tile and only while the tile is in view: marquees of 30-35s linear (Supabase storage 35s, data APIs reverse 30s), a pulse of 0.6s with `cubic-bezier(0.4, 0, 0.6, 1)` for typing dots, a blinking caret; pause off-screen and under reduced motion.
  **Why** Loops compete for attention and burn CPU; 30s+ linear drift reads as stillness.
  **Applies to** landing page. **Check** at most one infinitely animated element group per tile; loops pause via IntersectionObserver. **Source** Supabase, Raycast

- **RULE** Keep the tile body still on hover; let the artwork respond (an overlay at opacity 0 to 1 at 0.15s, a glow strip, cursors moving) and do not translate or scale the tile.
  **Why** A lifting tile competes with the animation inside it and shifts the grid; the hover captures (Clerk, Supabase, Raycast, Vercel) show a static tile with only the artwork changing. [engine note: tile-level transforms were not exhaustively tested]
  **Applies to** landing page. **Check** tile shell has no transform transition; hover changes only descendants. **Source** Supabase, Clerk, Raycast, Vercel

- **RULE** Delay the first loop until the tile has entered view, and start every looping animation at opacity 0 or from its first keyframe at rest.
  **Why** The founder already named this failure (a pulse visible before its moment); bento tiles below the fold are most at risk.
  **Applies to** landing page. **Check** no looping element is visible in the first paint of a below-fold tile; loops start inside an in-view callback. **Source** founder-taste (Margin build 1), Supabase

## 3. Numbers & scales

### Measured grids at 1440x900 (computed styles and boxes)

| Site | Grid | Tile sizes | Gap | Radius | Tile padding | Surface | Title / body |
|---|---|---|---|---|---|---|---|
| Supabase | 12-col, rows 400 | 538x400 (span 6), 263x400 (span 3) x6, 7 tiles | 12 | 16 (inner 15, 1px gradient frame ink 8% to 4%) | 24 | white | 16/600 Manrope, 14/450 Inter muted |
| Clerk (dark) | 3 cols, rows 260 | 395x260 x6, 395x528 x3, 9 tiles | 8 | 16 | 24 | `#212126`, ring shadows | 13/500 white, 13/400 `#9394a1` |
| Clerk (light, multi-tenancy) | 3 cols | 400x528 x2, 400x260 x2, 4 tiles | 8 | 16 | about 24 (screenshot) | white | not read |
| Cal | 2x2, rows 450/355 | 518x450, 518x355, 4 tiles | 12 | 16 | 24 24 0 | white, `0 1px 5px -4px rgba(36,36,36,.7), 0 4px 8px rgba(36,36,36,.05)` | 18/300 Cal Sans, 16/300 `#898989` |
| Raycast A | 2 cols | 1020x477 lead, 495x513 x2, 3 tiles | 30 | 30 | 24 | rgba(255,255,255,0.02) | 16/500, 15/400 at 40% white |
| Raycast B | 2 cols | 1204x218 lead, 582x341 x2 | 40 | 12 | 0, text inset 24 | `linear-gradient(45deg,#0c0d0f,#070809)`, border 6% white, inset top 10% white | 18/400 +0.2px, 14/500 `#9c9c9d` |
| Framer | 3 cols x 400, rows 480 | 400x480, 800x480 (span 2), 7 content tiles inside 1200x1440 frame | 0 (hairlines) | frame 25 | 25 | black | 18/400 -0.2px labels, 54/500 -2.16px stat |
| Vercel | 12-col, rows 280 | 685x580 (6 cols x 2 rows), 685x280 x2 | 20 | 6 | 20 | `#fafafa`, hairline ring shadow | 24/450 -1.2px, 14/400 `#4d4d4d` |
| Kargul | 6-col, rows 436/388 | 392x436 (span 2) x3, 600x388 (span 3) x2 | 24 | 18 | 18 24 | `#313131` (tag pills `#232323`) | 18/700 Geist -0.54px, 14/500 `#9d9d9d`, tags 10.5/700 uppercase pills |
| Linear agents | flex track | 400x560 panels | 12 | 12 | 0 | `#0f1011`, border 12% white, `0 2px 32px rgba(0,0,0,.25)` | 13/500 header, 13/400 text |
| Untitled UI | 3 cols | 421x433, 3 tiles; 2x2 of 644x318 | 24 | 16 | 4 (media) + 24 text | white, border `#e5e5e5` | 16/600 |
| Attio (kanban) | flex of columns | 272x581 columns | 16 | 12 | 8 8 0 | white 80% | 14/600 |

### Measured effects

| Effect | Value | Where |
|---|---|---|
| Fade mask, bottom | black 56.7% to transparent 91.4%; 44.2%/70.8%/94.8%; 59.4%/77.3%/93%; 55%/100%; 82%/100%; 73.7%/91.2% at 179deg | Framer, Raycast, Attio |
| Fade overlay to tile colour | `radial-gradient(97.14% 100% at 50% 0%, rgba(33,33,38,0) 42%, #212126 90%)`; `radial-gradient(50% 100% at 50% 0%, transparent, rgba(33,33,38,.68) 61.5%, #212126)` | Clerk |
| Marquee | 35s linear infinite; reverse 30s | Supabase |
| Pulse | 0.6s `cubic-bezier(0.4,0,0.6,1)` infinite | Supabase Realtime |
| Hover opacity | 0.15s; 0.2s; 0.075s | Supabase, Vercel, Supabase cursor label |
| Cursor travel | transform 0.75s and 1s | Supabase Realtime |
| Text reveal | `filter: blur(8px)`, opacity 0, translateY 8px to rest; icon scale 0.8 to 1; colour transitions 0.5s and 1s | Clerk Fraud and Session |
| Glass | blur 24px + saturate 1.5 + plus-lighter, ring 0.5px | Raycast |
| Window blur | backdrop blur 30px, surface 96% opaque | Raycast |
| Window shadow | 0 16px 48px 8px rgba(0,0,0,.2), 0 0 0 .5px rgba(0,0,0,.75) | Raycast |
| Poster crossfade | opacity 0.5s | Kargul |
| Object transitions | opacity, box-shadow, transform, colour 0.4s / 0.2s | Raycast keycaps |
| Glow | gradient blur 20px, blend color-burn, opacity 0 to 1 in 0.2s | Vercel passport |

### Visual taxonomy (how it is built, what it costs)

| Type | Built how | Example tiles | Specifics | Use when |
|---|---|---|---|---|
| Real UI fragment, HTML | nested divs at app scale, real text, mask fade, ghost layers | Clerk Fraud/Session, Framer CMS/Settings/Branches/Analytics, Cal forms, Linear chat panels, Attio kanban, Raycast chat | 10-14px text, 28-40px controls, mask 55-82% to 100% | the feature has a screen |
| Raster crop of real UI | `img` 580x207 `object-fit: fill`, mask `179deg` | Raycast Quicklinks | fade 73.7% to 91.2% | UI too dense to rebuild; ship 2x |
| Authored vector illustration | SVG `img`, light and dark variants, `cover`/`contain` | Supabase database, auth, edge, vector, realtime base; Vercel eve | 1165x367 SVG at 50% opacity; 261x398 figure | platform or infrastructure concepts |
| Rive/canvas animation + poster | `<canvas>` 826x603 positioned out of its slot, AVIF poster | Kargul five tiles | artboard 2.4x slot width; poster fades 0.5s | studio or brand-led tiles |
| Rendered or painterly image + live UI | `img` at 75% opacity, backdrop-blurred card on top | Raycast Snippets, Mintlify posters | image wider than tile, bleeding | AI, creative or material-led features |
| Skeuomorphic object | radial gradient, multi-ring shadow, 3D transform, glyph | Raycast keycaps, Vercel passport, Clerk keys, laptop (matrix3d), fingerprint dial | 100-140px objects, hover response | shortcuts, identity, security, hardware |
| Big number | 54px/500 on lit image | Framer uptime | one per grid | a single killer metric |
| Marquee / icon grid | uniform squares moving linearly | Supabase storage, Attio integrations | 62px squares, 70 pitch, 35s | breadth, integrations |
| Chart | SVG area + tooltip, or flow chart | Framer analytics, Dub funnel | ticks, tooltip, soft fills | data claims |
| Diagram / line-art | dashed guides, nodes, hatched fills | Attio SDK, Untitled UI brackets, Clerk Auto-join curves | guides <= 15% alpha | developer-platform, system claims |
| Photo or portrait grid | `img` in uniform cells | Clerk Custom roles (portraits in uniform cells, about 80x94 css px read from the screenshot) | consistent crop, soft tint | people, roles, teams |

## 4. Dos and Don'ts

- **Do** show a real fragment at true size, cropped by the tile and faded with a mask. **Don't** centre a small complete object in a dotted panel (Margin, Strata).
- **Do** put title and body on the same surface as the visual with the visual as a layer behind. **Don't** split the tile with a border-top between a visual panel and a text box (Margin `border-t border-line p-5`; Strata likewise).
- **Do** change construction per tile (UI fragment, object, chart, diagram, marquee). **Don't** reuse one white-row recipe (Margin: rules, severity, toggles, PR rows all stack 44-48px white rows with a 1px ring).
- **Do** export illustrations as SVG, Rive or image files. **Don't** compose objects from circles and borders: Strata's Operations tile is three `rounded-full` borders around a dark disc with a branch icon, clipped by the panel with no fade.
- **Do** draw charts with a fixed viewBox, ticks, tooltip and fills. **Don't** stretch an SVG with `preserveAspectRatio="none"`: Strata's Sales chart distorts its marker into an ellipse and shows one anonymous curve with a "124 leads · sample" pill.
- **Do** route connectors to node edges. **Don't** draw a curve through a label (Strata integrations: the Email-to-Docs line crosses the word DOCS), and don't fill a connector tile with six icon-plus-word chips that carry no information.
- **Do** let the visual use the whole tile and bleed. **Don't** centre a small card in a dotted field with 80+px of empty margin on all sides (Strata IT: a three-row if/else card floating mid-panel).
- **Do** use a single sample caption per section. **Don't** put "sample" in every row.
- **Do** give each visual a response (hover overlay, sequence, caret). **Don't** ship static thumbnails except in one or two tiles.

### Why the engine's bentos read cheap (concrete diagnosis)

Margin `Bento` (`work/margin/app/src/components/Sections.tsx`, grid `grid-cols-3 grid-rows-[300px_300px] gap-4`):
1. Five tiles, one skeleton: a `Tile` with a dotted `#faf9f6` visual panel (`flex-1`), a `border-t`, then `p-5` text. The visual panel is a thumbnail zone, the text a caption zone.
2. Four of five visuals are stacks of 2-3 white rows (`h-11`/`h-12`, `rounded-[12px]`, ring shadow) positioned `absolute inset-x-6 top-9`: nothing is cropped, nothing bleeds, nothing is lit, no layers overlap.
3. All UI is at one scale and density: 12-13px labels in 44-48px rows. No second scale (small chips, large figure), so no hierarchy inside the tile.
4. The data is generic (rules list, 3 severities, 3 toggles) and every row repeats "sample" or a count; the content does not prove the feature (the "Learns your conventions" tile shows three rule strings but not a rule being learnt or applied).
5. The 14px dot panel at 7% ink is visible as a rectangle with the row stack boxed inside it (36px from the top, 24px from the sides), so the tile reads as a form inside a frame.
6. Motion: one toggle `layout` spring and InView fades; no tile has a hover or sequence.

Strata `UseCases` (grid `grid-cols-[1.45fr_1fr] grid-rows-[300px_300px] gap-3`) and the integrations block:
1. Same two-box tile; text centred under a left-weighted or centred object; visual boxes of unequal height (the dotted panels end at different y in the screenshot).
2. Finance: three chips on a 1px line with a floating cursor icon, no readable data, a lot of empty panel.
3. Operations: three concentric `border` circles plus a dark disc and a branch icon, clipped at top and bottom with no fade.
4. Sales: single curve in a stretched SVG with an ellipse marker and a "sample" pill.
5. IT: a small if/else card centred in the panel with 80+px of empty dots on every side.
6. Integrations: 12 cells (6 icon-plus-mono-word chips, 6 hatched), one curve that crosses a label.

How to rebuild them (same copy, craft applied) [engine note]:
- Margin "Learns your conventions" (lead): a rules file (mono, line numbers) on the left layer and a review comment card on the right referencing the rule line, bleeding off bottom-right, masked at 57%/91%, connector drawn between rule and comment on in-view. "Asks before it guesses": a chat thread fragment at 13px with caret and a sequenced reveal (Clerk Fraud pattern), cropped at the bottom with fade. "Severity": three ghost-stacked comment cards of different heights, Blocking in front with a diff, offsets 12px (Cal ghost-stack). "Stays out of the way": a config as a code card with a highlighted line and two toggles inside the card at product scale, or a heat strip of PR activity as a chart. "Lives in the pull request": a PR timeline fragment (comment, check-runs, merge box) at true GitHub-like scale, bleeding right.
- Strata Finance: a node-canvas fragment (5 nodes at 12px type, connectors with a comet, a status chip, an inspector edge) bleeding right with a fade. Operations: queue lanes with items moving between lanes (motion recipe 10) or an exported illustration. Sales: Dub/Framer-style chart with ticks, tooltip on hover, area fill. IT: a policy editor window with an if/else block and a cursor, cropped. Integrations: a marquee of real marks (icon package) in uniform 62px squares on two counter-moving rows with masked ends, one hub node, connectors that end at node edges.

## 5. Exceptions & judgement calls

- **Founder taste vs richness.** The founder preferred a simple hero product card ("too complicated, the original one was better"). That rule is about the single hero card. In a bento, simplicity means one idea per tile, not tiny or empty visuals; keep each fragment to 3-5 meaningful elements (Framer's Branches tile is a title, a plus, four rows, one selected). [engine note]
- **Hairline-divided grids (Framer, Dub's logo wall) vs gapped tiles.** Hairline grids put the radius on the outer frame (25) and read as one object; gapped tiles carry the radius on each tile. Use hairlines for a catalogue of 6-9 on dark; gaps for a 3-5 tile feature grid.
- **Dark vs light.** 7 of the 15 sites are dark-first in their bento (Raycast, Clerk's main grid, Framer, Linear, Kargul, Attio, Resend); Cursor uses a light tinted plate. The founder's default is light AlignUI; Supabase, Cal, Untitled UI, Vercel and AlignUI show the light equivalents: tile white or `#fafafa`, hairline or whisper shadow, grey line art, one accent.
- **Raster vs HTML fragments.** Raycast ships a raster crop for Quicklinks and live HTML for chat; Framer builds everything in HTML. Rebuild in HTML when the fragment has a state to animate or a hover; use a 2x raster only for dense static UI, with the same mask.
- **Big lead vs many equal tiles.** Cal (2x2 equal) and Untitled UI (3 equal) have no lead and still work because each tile has a bleeding fragment and a title in the same corner. A lead is needed only when tiles differ in importance.
- **Overhang.** Raycast A's window pokes above the tile (overflow visible, -40px). It works because the section background is plain; do not use it where a rail or divider passes behind (founder rail rule).
- **Animation budget.** The hero already carries the load-in. For bentos, prefer in-view and hover micro-animations over staggering tiles in on scroll (the founder rejected a global load-in parade).
- **Illustrations vs product UI.** Kargul and Supabase use illustration because the studio or platform is the product; for a SaaS with a visible screen, real UI fragments win (Clerk, Framer, Cal, Raycast).

## 6. Figures worth keeping

Folder: `knowledge/benchmarks/bento/` (all 2x). Open these before building a bento.
- `supabase-bento.png`: 12-col lead plus six, gradient frame, text top-left, SVG illustrations, marquee, cursor and chat pill, grid-with-dotted APIs; the cleanest light reference.
- `clerk-bento-a.png`: dark 3x4 with tall tiles, objects with top light, radial fades, object variety (laptop, fingerprint dial, passcode keys).
- `clerk-bento-b.png`: light multi-tenancy bento with photo grid, curve connectors, dashed outlines.
- `hover-clerk-fraud.png`: filmstrip of the sequenced reveal (0 / 500 / 2500ms).
- `hover-supabase-realtime.png`: cursor and pill travel on hover.
- `hover-raycast-hotkeys.png`: keycap response (page nav overlays the crop).
- `framer-bento.png`: hairline 3x3 frame, true-scale UI fragments with fades, big-number tile, label at bottom-left with arrow.
- `raycast-bento.png`: lead window overhanging the tile, glass buttons, palette and prompt tiles.
- `raycast-bento-b.png`: painterly glass image behind UI (Snippets), palette crop (Quicklinks), keycap objects (Hotkeys), dark lit-edge tiles.
- `cal-bento-2x2.png`: light 2x2 with cropped fragments, ghost stack above the form, notification toast stack.
- `vercel-bento.png`: 12-col with 2x lead tile, passport object, CLI card cropped by the tile.
- `kargul-services-bento.png`: isometric line-art Rive tiles, 3+2 on a 6-col grid, tags.
- `alignui-bento.png`, `alignui-bento-b.png`, `untitledui-bento.png`, `untitledui-bento-b.png`: light product-UI tiles, corner-bracket frames, icon tiles with soft shadows.
- `linear-ai-track.png`: dark agent panels fading at the track edges (flex track, 400x560, 12 gap).
- `attio-sdk-bento.png`: dark diagram-and-guide tile with a marquee of icon tiles.
- `dub-bento-a.png`: funnel chart with three coloured stages and percentage chips.
- `mintlify-hero-bento.png`: generative line-art posters (poster cards, not a bento) and an enterprise wave visual.
- `cursor-features.png`: two overlapping windows on a tinted plate.
- `resend-bento-a.png`: dark tiles with a lit top edge; visuals did not load under headless capture (see section 7).
- `neg-margin-bento.png`, `neg-strata-bento.png`: the engine's own bentos, crops of `work/margin/full-page@2x.png` and `work/strata/full-page@2x.png`. Keep them beside the positives when critiquing.

## 7. Open questions

- PostHog could not be measured: the page reported a 900px document height under Playwright (scroll container), so no bento was captured. Retry with a scroll-container-aware script.
- Resend's tile visuals (editor, code, webhooks) did not render in headless capture (in-view or canvas content stayed empty), so only the shell (lit top edge, 24px radius, 600x526 tiles) was read. Re-capture with real scrolling and a longer wait before citing Resend visuals.
- Linear's current homepage has no gapped bento: the "AI and automations" block is a horizontal track of 400x560 agent panels with edge fades; the other sections are framed product screens. Treat Linear as a reference for panels and fades only.
- Mintlify and Dub were checked as feature sections; Mintlify's showpieces are generative posters (not a bento) and Dub's analytics section is a tabbed funnel visual; only the funnel and the poster style were used as references.
- The purpose of Supabase's `opacity: 0.2` absolutely positioned overlay at z 10 in each tile is unknown (noise, tint, or hover colour); not used in any rule.
- Hover and in-view states were captured for three tiles (Clerk Fraud, Supabase Realtime, Raycast Hotkeys) and read as computed transitions for the rest; JS-driven loops (Raycast typing, Vercel keycap cycle) were observed visually, not timed.
- Cal and Framer are Framer-hosted (generated `framer-xxxx` class names); their pixel specs are reliable, the DOM structure is not a guide for how to hand-build.
- The walk inspecting each tile was capped at 35-55 lines; no `<video>` or Lottie surfaced in any inspected subtree, but deeper nodes were not exhaustively listed. The only canvas found was Kargul's Rive artboards.
- Noise or grain overlays were not measured; no rule is made about them.

## 8. Implementation recipes (React, Tailwind v4, motion/react)

Sketches, not production code. Colours and numbers come from sections 2-3; swap tokens for the bound system. All recipes assume `import { motion, useInView, useReducedMotion } from "motion/react"`.

### R1 Tile shell with a visual layer (light, Supabase-style frame)

```tsx
export function Tile({ title, body, className = "", children }: TileProps) {
  return (
    // 1px gradient frame: outer padding 1px, inner radius = outer - 1
    <div className={`group/tile relative rounded-[16px] p-px
      [background:linear-gradient(oklch(0.1_0_0/.08),oklch(0.1_0_0/.04))] ${className}`}>
      <div className="relative h-full overflow-hidden rounded-[15px] bg-white">
        {/* visual layer: bleeds, never inside the padding box */}
        <figure className="pointer-events-none absolute inset-0 z-0">{children}</figure>
        {/* copy layer: same surface, no divider */}
        <div className="relative z-10 p-6">
          <h3 className="text-[16px] font-semibold">{title}</h3>
          <p className="mt-2 max-w-[288px] text-[14px] leading-[20px] text-neutral-500">{body}</p>
        </div>
      </div>
    </div>
  )
}
```

### R2 Real-UI fragment: oversized, cropped, masked, lit edge

```tsx
// Fragment is wider and taller than the room; the tile (overflow hidden) crops it.
export function Fragment({ dark = false, children }: { dark?: boolean; children: React.ReactNode }) {
  return (
    <div className="absolute left-6 top-[155px] w-[470px]">      {/* 91% of a 518 tile, starts 34% down */}
      <div
        className={[
          "h-[412px] rounded-[12px] [mask-image:linear-gradient(#000_57%,transparent_91%)]",
          dark
            ? "bg-[#0f1011] shadow-[inset_0_1px_0_rgba(255,255,255,.10),0_0_0_1px_rgba(255,255,255,.06)]"
            : "bg-white shadow-[0_1px_5px_-4px_rgba(36,36,36,.7),0_4px_8px_rgba(36,36,36,.05)]",
        ].join(" ")}
      >
        {children}   {/* build at 12-14px type, 28-40px controls */}
      </div>
    </div>
  )
}
```

### R3 Layered stack of cards with depth (Cal ghost layers)

```tsx
export function GhostStack({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative w-[470px]">
      {/* two ghosts: 12px higher per layer, 12px narrower per side, fainter */}
      {[24, 12].map((o, i) => (
        <div key={o} aria-hidden
          className="absolute rounded-[12px] bg-white shadow-[0_1px_5px_-4px_rgba(36,36,36,.7),0_4px_8px_rgba(36,36,36,.05)]"
          style={{ left: o, right: o, top: -(o === 24 ? 24 : 12), bottom: 0, opacity: 0.55 + i * 0.25, zIndex: i }} />
      ))}
      <div className="relative z-10 rounded-[12px] bg-white shadow-[0_1px_5px_-4px_rgba(36,36,36,.7),0_4px_8px_rgba(36,36,36,.05)]">
        {children}
      </div>
    </div>
  )
}
```

### R4 Chart tile with live hover (scrubber, tooltip, area fill)

```tsx
// Fixed viewBox, scaled uniformly (never preserveAspectRatio="none")
const W = 560, H = 220
export function ChartTile({ a, b, labels }: { a: number[]; b: number[]; labels: string[] }) {
  const [i, setI] = useState<number | null>(null)
  const x = (k: number) => (k / (a.length - 1)) * W
  const y = (v: number) => H - 24 - (v / Math.max(...a, ...b)) * (H - 56)
  const d = (s: number[]) => s.map((v, k) => `${k ? "L" : "M"}${x(k)} ${y(v)}`).join(" ")
  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="h-auto w-full"
      onPointerMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect()
        setI(Math.round(((e.clientX - r.left) / r.width) * (a.length - 1)))
      }} onPointerLeave={() => setI(null)}>
      <defs>
        <linearGradient id="fa" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0" stopColor="oklch(0.62 0.2 290)" stopOpacity=".28" />
          <stop offset="1" stopColor="oklch(0.62 0.2 290)" stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d={`${d(a)} L${W} ${H} L0 ${H}Z`} fill="url(#fa)" />
      <path d={d(a)} fill="none" stroke="oklch(0.62 0.2 290)" strokeWidth="1.5" />
      <path d={d(b)} fill="none" stroke="oklch(0.65 0.18 250)" strokeWidth="1.5" />
      {i !== null && (
        <g>
          <line x1={x(i)} x2={x(i)} y1="0" y2={H} stroke="currentColor" strokeOpacity=".15" />
          <circle cx={x(i)} cy={y(a[i])} r="3.5" fill="oklch(0.62 0.2 290)" />
          {/* tooltip card as foreignObject: date, two series, 12px type */}
        </g>
      )}
    </svg>
  )
}
```

### R5 Integration hub: marks in uniform squares, connectors that end at node edges

```tsx
// Use an icon package (simple-icons) or supplied marks; never hand-drawn logos.
const ICON = "grid size-[62px] place-items-center rounded-[10.7px] bg-white shadow-[0_0_0_1px_oklch(0.1_0_0/.08)]"
export function Hub({ marks }: { marks: React.ReactNode[] }) {
  return (
    <div className="relative h-[300px] [mask-image:linear-gradient(90deg,transparent,#000_12%,#000_88%,transparent)]">
      {[0, 1].map((row) => (
        <motion.div key={row} className="absolute flex gap-2" style={{ top: 24 + row * 70 }}
          animate={{ x: row ? ["-50%", "0%"] : ["0%", "-50%"] }}
          transition={{ duration: 35, ease: "linear", repeat: Infinity }}>
          {[...marks, ...marks].map((m, i) => <div key={i} className={ICON}>{m}</div>)}
        </motion.div>
      ))}
      {/* hub node + connectors drawn in a fixed-viewBox SVG; stroke ends 10px before the node edge */}
    </div>
  )
}
```

### R6 Command-palette tile (typing loop, masked results, selected row)

```tsx
export function Palette({ query = "scratch", rows }: { query?: string; rows: Row[] }) {
  const reduce = useReducedMotion()
  const ref = useRef(null); const inView = useInView(ref, { margin: "-20%" })
  const [n, setN] = useState(reduce ? query.length : 0)
  useEffect(() => {
    if (!inView || reduce) return
    const t = setInterval(() => setN((v) => (v >= query.length + 14 ? 0 : v + 1)), 140)
    return () => clearInterval(t)
  }, [inView, reduce, query])
  return (
    <div ref={ref} className="absolute left-6 top-6 w-[620px] rounded-[12px] bg-[#0b0c0e]
      shadow-[inset_0_1px_0_rgba(255,255,255,.1),0_0_0_1px_rgba(255,255,255,.06)]">
      <div className="flex h-[72px] items-center px-5 text-[18px] text-white/90">
        {query.slice(0, Math.min(n, query.length))}
        <span className="ml-px h-6 w-px animate-pulse bg-white/70" />
      </div>
      <ul className="[mask-image:linear-gradient(#000_55%,transparent)]">
        {rows.map((r, k) => (
          <li key={r.name} className={`flex h-12 items-center gap-3 px-5 text-[14px] ${k === 0 ? "bg-white/[.07]" : "text-white/50"}`}>
            {r.icon}<span className="text-white/90">{r.name}</span><span className="text-white/40">{r.url}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}
```

### R7 Map or globe tile (graticule, routes, fade)

```tsx
// d3-geo orthographic projection rendered once to static SVG paths, then CSS-masked. [engine note]
import { geoOrthographic, geoPath, geoGraticule10 } from "d3-geo"
const proj = geoOrthographic().scale(240).translate([260, 300]).rotate([-20, -30]).clipAngle(90)
const path = geoPath(proj)
export function Globe({ routes }: { routes: [number, number][][] }) {
  return (
    <svg viewBox="0 0 520 360" className="absolute inset-x-0 bottom-0 h-auto w-full
      [mask-image:linear-gradient(#000_60%,transparent)]">
      <path d={path(geoGraticule10())!} fill="none" stroke="currentColor" strokeOpacity=".12" />
      {routes.map((r, i) => (
        <motion.path key={i} d={path({ type: "LineString", coordinates: r })!} fill="none"
          stroke="currentColor" strokeOpacity=".7" strokeWidth="1"
          initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }}
          transition={{ duration: 1.2, delay: i * 0.15 }} />
      ))}
      {/* end dots at route endpoints; one pill ("$ supabase functions deploy" style) overlaps the top */}
    </svg>
  )
}
```

### R8 Code tile (true structure, highlighted line, cropped)

```tsx
// Tokenise at build time (shiki) and ship spans; no runtime highlighter.
export function CodeCard({ lines }: { lines: { n: number; html: string; hl?: "add" | "del" }[] }) {
  return (
    <div className="absolute left-8 top-10 w-[400px] rounded-[6px] bg-white p-4 font-mono text-[12px] leading-[16px]
      shadow-[0_0_0_1px_rgba(0,0,0,.06),0_8px_24px_-12px_rgba(0,0,0,.08)] [mask-image:linear-gradient(#000_70%,transparent)]">
      {lines.map((l) => (
        <div key={l.n} className={`flex gap-3 ${l.hl === "add" ? "bg-emerald-500/10" : l.hl === "del" ? "bg-red-500/10" : ""}`}>
          <span className="w-4 select-none text-right text-black/30">{l.n}</span>
          <code dangerouslySetInnerHTML={{ __html: l.html }} />
        </div>
      ))}
    </div>
  )
}
```

### R9 Before/after slider tile

```tsx
export function BeforeAfter({ before, after }: { before: React.ReactNode; after: React.ReactNode }) {
  const [p, setP] = useState(55)
  return (
    <div className="absolute inset-x-6 top-[150px] h-[360px] overflow-hidden rounded-[12px] bg-white select-none
      shadow-[0_0_0_1px_oklch(0.1_0_0/.08)]"
      onPointerMove={(e) => {
        if (e.buttons !== 1) return
        const r = e.currentTarget.getBoundingClientRect()
        setP(Math.min(100, Math.max(0, ((e.clientX - r.left) / r.width) * 100)))
      }}>
      <div className="absolute inset-0">{after}</div>
      <div className="absolute inset-0" style={{ clipPath: `inset(0 ${100 - p}% 0 0)` }}>{before}</div>
      <div className="absolute inset-y-0 w-px bg-black/20" style={{ left: `${p}%` }}>
        <span className="absolute top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white px-1.5 py-1 text-[11px] shadow-[0_0_0_1px_rgba(0,0,0,.1)]">⇆</span>
      </div>
    </div>
  )
}
```

### R10 In-view or hover sequenced reveal (Clerk Fraud pattern)

```tsx
const item = {
  hidden: { opacity: 0, y: 8, filter: "blur(8px)" },
  show: (i: number) => ({ opacity: 1, y: 0, filter: "blur(0px)",
    transition: { delay: 0.2 + i * 0.6, duration: 0.5, ease: [0.22, 1, 0.36, 1] } }),
}
export function BlockedList({ rows }: { rows: { email: string; at: string }[] }) {
  const reduce = useReducedMotion()
  return (
    <motion.ul initial={reduce ? "show" : "hidden"} whileInView="show" viewport={{ once: true, margin: "-25%" }}
      className="space-y-6 pl-6">
      {rows.map((r, i) => (
        <li key={r.email} className="flex items-start gap-3">
          <motion.span custom={i} variants={{ hidden: { scale: 0.8, opacity: 0 }, show: item.show(i) }}
            className="grid size-5 place-items-center rounded-full bg-red-500 text-white">×</motion.span>
          <div>
            <motion.div custom={i} variants={item} className="text-[10px] font-medium text-white">{r.email}</motion.div>
            <motion.div custom={i + 0.2} variants={item} className="text-[10px] text-white/45">Blocked {r.at}</motion.div>
          </div>
        </li>
      ))}
    </motion.ul>
  )
}
```

### R11 Skeuomorphic keycap object

```tsx
export function Keycap({ glyph, label, w = 110 }: { glyph?: string; label: string; w?: number }) {
  return (
    <div style={{ width: w, height: 106 }}
      className="relative rounded-[14px] p-3 text-white transition-[transform,box-shadow] duration-200 active:translate-y-px
        [background:radial-gradient(75%_75%_at_50%_91.9%,#121212_0%,#0d0d0d_100%)]
        shadow-[0_1.5px_.5px_2.5px_rgba(0,0,0,.4),0_0_.5px_1px_#000,inset_0_1px_0_rgba(255,255,255,.08),0_10px_19px_4px_rgba(0,0,0,.16)]">
      <span className="absolute right-3 top-3 text-[20px] text-white/80">{glyph}</span>
      <span className="absolute bottom-3 left-4 text-[24px] font-medium">{label}</span>
    </div>
  )
}
```

### R12 Marquee column (icon grid, masked, in-view only)

```tsx
export function Marquee({ children, duration = 35, reverse = false }: Props) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref)
  const reduce = useReducedMotion()
  return (
    <div ref={ref} className="overflow-hidden [mask-image:linear-gradient(90deg,transparent,#000_12%,#000_88%,transparent)]">
      <div className="flex w-max gap-2 will-change-transform"
        style={{ animation: `marquee ${duration}s linear infinite ${reverse ? "reverse" : ""}`,
                 animationPlayState: inView && !reduce ? "running" : "paused" }}>
        {children}{children}
      </div>
    </div>
  )
}
/* @keyframes marquee { to { transform: translateX(-50%) } } */
```

### R13 Hover glow reveal (Vercel passport)

```tsx
export function GlowObject({ children }: { children: React.ReactNode }) {
  return (
    <div className="group/glow relative">
      <div aria-hidden className="absolute -right-3 inset-y-6 w-12 opacity-0 blur-[20px] transition-opacity duration-200 group-hover/glow:opacity-100
        [background:linear-gradient(#00ff95,#ffd000_25%,#ff1744_50%,#9500ff_75%,#00e5ff)]" />
      <div className="relative">{children}</div>
    </div>
  )
}
```

## 9. Pre-ship checklist: built vs cheap

Run this on every bento before showing it. Items 1-8 are measurable, 9-14 are visual.

1. No tile contains a border or background step between visual and copy (Margin and Strata fail).
2. Every main fragment is cropped by a tile edge by >= 15% of its own size and masked or overlay-faded there.
3. UI text inside visuals is 10-14px; no visual uses 16px+ body type except a deliberate numeral.
4. No two tiles share the same top-level construction; no more than 40% of tiles share a visual type.
5. Illustrations come from exported files (SVG, Rive, image) or from real-UI fragments; none from stacked circles and borders.
6. No `preserveAspectRatio="none"`; circles are circles in the render; chart has ticks plus tooltip or marker card plus a fill.
7. At least half the tiles have a hover, in-view or loop state; at most one infinite loop per tile; reduced motion shows the final state.
8. Tile shadows <= 24px blur and 0.16 alpha (light) or the dark stacks in section 3; one accent hue plus a status colour.
9. No line crosses a label; connectors end at node edges.
10. No visible dotted or textured panel rectangle; texture, if any, runs under a bleeding visual at <= 8% alpha.
11. Title position and alignment identical across tiles of equal height; titles <= 4 words.
12. Light comes from one side; dark tiles have a lit top edge.
13. "Sample data" is a caption, not a chip inside rows.
14. Put the screenshot next to `supabase-bento.png`, `framer-bento.png`, `raycast-bento.png`, `cal-bento-2x2.png` and `kargul-services-bento.png`: would it embarrass the grid? If yes, keep building.
