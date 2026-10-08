---
source: ui-pedia
chapter: Icons (Design Basics)
pages: 175-214
topic_tags: [icons, iconography, grids, keylines, optical-alignment, consistency, visual-weight, legibility, icon-sets]
status: studied
---

# Icons

PDF page = printed page + 1. All citations are PDF pages. Image files are `corpus/ui-pedia/pages/p-<PDF page>.jpg`.

## 1. Core ideas

1. An icon represents an object or action the user can act on (or reinforces essential information, e.g. a warning symbol in a dialog). Its primary goal is to communicate a concept quickly (p.175, p.194). The book spends two pages on history (pictographs, alphabets) only to say that picture-communication is old and that screens revived it (p.175-177).
2. There are seven icon types the designer must tell apart: glyph, colored, duotone, outlined, universal, unique, conflicting (p.178-183). Each has a stated strength and a stated cost (see section 3 table).
3. Universal actions get universal symbols; innovation on a universal metaphor only costs the user comprehension (p.181, figure p.180).
4. Unique icons (logos, feature-specific symbols) are meaningless to first-time users, so they need text labels (p.181-182).
5. Where several icons mean the same thing (like = thumb, heart, star), pick one and use it consistently; the same icon can also mean different things in different products (heart = like / favourite), so use with caution (p.182-183).
6. Every icon set sits on a master grid with a container, padding, keylines (square, circle, portrait and landscape rectangle) and a consistent corner radius, so that icons of different shapes look the same size (p.183-186). The grid is a recommendation, not a restriction: optical balance beats the metric grid (p.187-189), and a grid should be reviewed and dropped or revised when it stops helping (p.187, p.193-194).
7. Grids are not enough; pair them with written principles and technical rules (Phosphor example: Clarity, Brevity, Character; 48px canvas, 1.5px stroke, ...) (p.191-193).
8. Seven principles of icon design: Clarity, Readability, Alignment, Brevity, Consistency, Personality, Ease of use (p.194-212).
9. Test icons in their real context (real screen, real sizes, next to siblings, light and dark), not only in the design tool (p.190, p.212).
10. Closing claim: poor icons make products harder to use, irritate users and reduce brand loyalty; good icons help users sort the noise and decide (p.214).

## 2. Rules

### Choosing an icon style / type

- **RULE** Use glyph (solid) icons when icons must work at small sizes; accept that they can lack visual interest at larger sizes.
  **Why** Solid fills stay legible when small; large solid shapes look heavy/flat.
  **Applies to** SaaS app UI, mobile. **Check** icon rendered size vs style: filled style at <= UI-size (e.g. 16-24px) fine; flag large (hero-size) glyph-only icons for visual interest. **Source** (p.178)

- **RULE** Use colored icons (solid or gradient) sparingly; excessive use is bad for UX.
  **Why** They are hard to fit into a product's style and can distract users from important content; they feel less official and more fanciful.
  **Applies to** all. **Check** count of multi-colour icons per viewport; icon colours not drawn from the palette tokens. **Source** (p.179)

- **RULE** Use duotone icons (two related-but-different colours, built by splitting the icon into two layers e.g. outline + fill and tuning layer opacity) when you want a little more visual appeal without overwhelming the design; avoid them at very small sizes.
  **Why** The second tone adds appeal but becomes unreadable when tiny.
  **Applies to** landing page, SaaS app UI. **Check** icons with two tones are not rendered below the size where both layers remain distinguishable (visual). **Source** (p.179-180)

- **RULE** Outlined icons (vector strokes, empty inside) suit simple, minimalist, professional looks; know that they may take users longer to process and recognise than solid icons.
  **Why** Less mass means slower recognition.
  **Applies to** all. **Check** visual; for critical/primary actions consider filled or labelled. **Source** (p.180)

- **RULE** Represent universal operations (home, print, search, share, delete, menu, settings) with the universal symbol (e.g. search = magnifying glass). You may restyle the icon but keep the core form and concept.
  **Why** Users recognise these instantly; substituting a novel metaphor (binoculars for search) only confuses.
  **Applies to** all. **Check** an icon-name -> glyph map: search must be a magnifier, home a house, etc.; flag any non-standard glyph on a universal action. **Source** (p.180-181)

- **RULE** Whenever a unique (non-universal) icon is used, add a text label next to it.
  **Why** First-time users cannot decode logo/feature-specific symbols (the Sketch diamond means nothing to a newcomer).
  **Applies to** all. **Check** every non-universal icon has adjacent visible text. **Source** (p.181-182)

- **RULE** When icons "conflict" (same meaning, several accepted glyphs: thumbs-up, heart, star for "like"), choose the one that suits the interface best and use only that one everywhere in the interface.
  **Why** Consistency within a product matters more than which glyph is chosen.
  **Applies to** all. **Check** one glyph per concept across the whole UI. **Source** (p.182)

- **RULE** Use ambiguous symbols such as the heart with caution: the same heart means "like" on Instagram and Facebook but "favourite/add to list" on Spotify-like sites.
  **Why** Meaning depends on the product context; users carry assumptions from other apps.
  **Applies to** all. **Check** visual/copy: pair ambiguous glyph with label or tooltip. **Source** (p.183)

- **RULE** Consider the audience: icons at their best are simple for a certain group and universal across cultures, ages and backgrounds; choose metaphors and colours that will appeal to your actual users.
  **Why** Abstract symbols are learned; the audience determines what is already learned.
  **Applies to** all. **Check** visual/judgement. **Source** (p.198)

### Icon anatomy: container, grid, padding, keylines

- **RULE** Put every icon in a standard-size container, and make every icon the same size within the container in at least one dimension.
  **Why** Icons differ in size and shape; a standard container makes life easier for developers and stops icons looking like different sizes.
  **Applies to** all. **Check** all icon SVGs share one viewBox (e.g. 24x24) and each icon's bounding box touches the live area in at least one axis. **Source** (p.183-184)

- **RULE** Draw icons on a grid and treat padding as the space between the icon and the container border; tweak padding per icon so that all icons look the same size.
  **Why** The grid is a blank canvas with guidelines that keep elements in sync, so fewer mistakes and less time fitting icons together.
  **Applies to** all (icon design). **Check** per-icon padding differs on purpose (circles get less inset than squares); visual. **Source** (p.183-184)

- **RULE** Use keylines: a starter kit of basic shapes (square, circle, portrait rectangle, landscape rectangle) that keeps proportions aesthetically consistent while leaving room for expression. Draw circular icons to the circle keyshape, square icons to the square keyshape, etc.
  **Why** The shapes are sized by area calculation so different silhouettes appear equally large (circle is larger than square in px, rectangle short side smaller).
  **Applies to** all (icon design). **Check** icon outer bounds fit the keyshape of its silhouette class (see numbers in section 3). **Source** (p.185-186)

- **RULE** Keep corner radius consistent across a set: if one icon has crisp, sharp corners, all others must too.
  **Why** Border radius is a style parameter that the eye compares between icons.
  **Applies to** all. **Check** the same corner radius / join style in all icons of a set. **Source** (p.185)

- **RULE** Let context decide which parts of the grid you need: where icons are displayed, how they are masked, and which shapes act as templates.
  **Why** An app-icon grid with masks needs different parts than a UI-toolbar grid (Phosphor's grid evolved from 116x116 with keylines only, to 154x154 with a trim area, to 154x154 with the trim area highlighted and keylines adjusted).
  **Applies to** all (icon design). **Check** visual. **Source** (p.185, p.187)

- **RULE** Use grids as recommendations; use the mould directly in some cases and as general guidance in others; delete the grid or parts of it when no longer useful, and review it periodically for obsolescence or misunderstanding.
  **Why** Rules were refined as the family took shape; grids become outdated or misread.
  **Applies to** all (icon design). **Check** process rule: grid reviewed when set is revised. **Source** (p.187, p.193-194)

### Optical balance and testing

- **RULE** Check optical balance, do not rely on the metric grid. If a glyph filling the keyshape exactly looks too large next to its siblings (the "G" in the 90px circle keyshape in the figure), scale it down until it feels balanced with the set.
  **Why** Equal metric size does not give equal perceived size.
  **Applies to** all (icon design). **Check** visual: render the whole set in a grid at actual size and squint; also compare filled ink area. **Source** (p.187-189)

- **RULE** Test icons in context before accepting them: on the real home screen / folder / notification / settings view / store listing, in natural settings and not only in design software.
  **Why** Context reveals clarity, readability and stylistic-fit problems that the artboard hides.
  **Applies to** all. **Check** a screenshot at real device size. **Source** (p.190)

- **RULE** Use test sheets: place each new icon next to its sibling icons in various sizes and colours (light and dark backgrounds in the Phosphor sheets) and proof for clarity, readability and stylistic fit directly on a phone.
  **Why** Side-by-side comparison exposes outliers in weight, size and detail.
  **Applies to** all. **Check** sheet exists per new icon; visual. **Source** (p.190, p.212)

### Documentation, principles and technical rules

- **RULE** Combine the icon grid with concise written principles and technical rules for the family.
  **Why** Grids give a visual start but do not convey the technical regulations and principles each icon must follow.
  **Applies to** all. **Check** a short icon spec exists (canvas, stroke, caps, keylines, trim). **Source** (p.191)

- **RULE** Phosphor example principles (adopt as model): Clarity (be clear first; never sacrifice clarity of what the icon represents), Brevity (as few details as possible; reductive; be intentional with every stroke), Character (be quirky; add unique details sparingly to bring warmth and play to an otherwise austere set).
  **Why** They rank the goals so conflicts (detail vs clarity) are decided in advance.
  **Applies to** all. **Check** visual. **Source** (p.191-192)

- **RULE** Phosphor example technical rules (adopt as a concrete template for a stroke icon set): 48 x 48px canvas; 1.5px centred stroke; rounded end caps; contiguous strokes unless broken segments help comprehension; straight segments, perfect arcs and 15 degree angle increments where possible; adjust curves when necessary to maintain the principles; whole, even-number measurements where possible, folding down to 1px and 0.5px if necessary; start with keylines 28x28px circles, 25x25px squares, 28x22px landscape rectangles, 22x28px portrait rectangles; keep a 6px thick trim area.
  **Why** Hard numbers make the family reproducible by many contributors.
  **Applies to** all (icon design). **Check** stroke-width attr == 1.5 in a 48 viewBox (== 0.03125 of canvas); stroke-linecap round; path coordinates on even integers; outer bounds within 36px (48 - 2x6) live area. **Source** (p.192-193)

### The seven principles

**1. Clarity**
- **RULE** The icon must communicate its concept quickly; prefer an expected metaphor to an unexpected one.
  **Why** An unexpected metaphor makes users reach for a guidebook (the car-dashboard symbols p.195 are learned over time and many are not obvious).
  **Applies to** all. **Check** 5-second test: can a new user name the icon without a label (visual/usability test). **Source** (p.195-196)
- **RULE** Judge confusion by its cost: a confusing nav icon in a low-risk app costs a few taps (VSCO's Feed, Discover, Studio, Profile, Members icons); costly contexts such as driving cost far more. Keep the cost of confusion minimal.
  **Why** Cost of misreading scales with the stakes of the task.
  **Applies to** all. **Check** judgement; higher-stakes actions get labels. **Source** (p.196)
- **RULE** Abstract symbols can become familiar through continuous use and standardisation (Apple's Command key symbol, designed by Susan Kare in 1984, taken from a Nordic place-of-interest sign; the heart, caution/exclamation, music note and up arrow). Use such established symbols; the arrow is a simple, powerful wayfinding symbol.
  **Why** Shared understanding is built by standardisation and repetition.
  **Applies to** all. **Check** visual. **Source** (p.197-198)

**2. Readability**
- **RULE** Once the symbol is understandable, make it readable: avoid fine details that vanish at the display size (the Amtrak "Station" icon with very fine details is hard to make out).
  **Why** Detail below the pixel budget turns to noise.
  **Applies to** all. **Check** render at the real size (e.g. 16-24px) and inspect; minimum gap between strokes must remain visible. **Source** (p.198-199)
- **RULE** Leave enough gap between parts: the Transit app's clipboard icon read as a blob because the space between board and clip was too short; a slight adjustment (widen the gap) fixed it.
  **Why** Narrow gaps fill in at small sizes.
  **Applies to** all. **Check** gap between adjacent strokes >= about one stroke width at render size (engine inference; the book gives no number). **Source** (p.199)
- **RULE** Allow ample space between shapes when an icon has multiple shapes; the icon gets busier and harder to read as strokes get thinner and more numerous. Model: Google Maps transit icons (car, train, walking person, bicycle) stay readable at small sizes beside "01 hr 12 m"-style text.
  **Why** Strokes plus count increase density.
  **Applies to** all. **Check** visual at actual size. **Source** (p.200)

**3. Alignment**
- **RULE** Align the parts of each icon optically, not only metrically. The play icon with the triangle exactly centred in the circle looks off-kilter, because the triangle's wide edge feels heavier than the point and tips it to the left; shift the triangle slightly to the right.
  **Why** Visual mass is not geometric centre; typographers do the same (off-centre dots on "i" and "j", overshoot on round "O" vs "H").
  **Applies to** all. **Check** visual; compare centroid of ink, not bbox. **Source** (p.200-202)
- **RULE** Do not only trust the figures; double-check with your eyes.
  **Why** Numbers and perception disagree.
  **Applies to** all. **Check** visual. **Source** (p.202)

**4. Brevity**
- **RULE** Express the idea in as few shapes as possible: simplify an icon to just the proper amount of detail. Because canvases are small, brevity is ideal. Material's example: replace a detailed sailboat (two sails, hull with inner detail) with a simple front-view ship silhouette with two waves. Telegram's menu icons (p.204: New Group, Calls, New Secret Chat, Saved Messages, New Channel, Settings, Contacts, Invite Friends) are simple, reductive line icons.
  **Why** A reductive design gets the point across and leaves room for the material (content).
  **Applies to** all. **Check** node/path count and stroke count per icon; visual. **Source** (p.201-204)
- **RULE** Illustrative multi-tone icons are acceptable when the context calls for it (Yelp cuisine icons: ice-cream, cake, burger and drink, taco, pizza); app icons (mobile, tablet, desktop applications on home screens, docks, app stores) can carry more depth, colour and brand expression because viewers already understand their meaning.
  **Why** Appropriate detail depends on role; app-launch icons are learned brand marks, UI glyphs are not.
  **Applies to** landing page, mobile. **Check** visual. **Source** (p.204-205)

**5. Consistency**
- **RULE** Keep the same artistic guidelines across the whole icon family.
  **Why** Harmony: set members that differ look like they come from different products.
  **Applies to** all. **Check** one stroke width, one fill style, one corner radius, one size system per set (computed from SVGs). **Source** (p.205)
- **RULE** Control visual weight: weight is affected by fill, stroke thickness, size and shape; keep these parameters consistent across a set. Squint test: if some icons look more powerful than others, the set is inconsistent. Figure on weight: a heart drawn at 75% size, lighter stroke, original, filled, rounder shape runs from lighter to heavier.
  **Why** Heavier icons grab attention unevenly.
  **Applies to** all. **Check** squint/blur test; ratio of ink area per icon within tight band; same stroke width. **Source** (p.206)
- **RULE** Keep fill and outline variants of the same icon consistent with each other (SF Symbols: 9 weights, 3 scales, more consistent between icons and between fill and outline variants than Apple's pre-iOS 13 set, which mixed strokes, fills and sizes). Keep a set of guidelines and norms to follow (and bend) when many authors contribute.
  **Why** Continuity across a large family with many writers is hard and needs explicit norms.
  **Applies to** all. **Check** each icon has paired .fill variant of same geometry (design-system process). **Source** (p.205-208)

**6. Personality**
- **RULE** Decide what the icon set says about the brand: what distinguishes it, what image it conveys, what atmosphere it creates. Examples in the book: Waze = quirky, bright, chunky; Twitter = smooth, light, crisp; Sketch = delicate and airy; Freemojis = cute and lovable; Android home-screen icon packs = abstract, pixel, bubbly, neon.
  **Why** An icon set is a visible expression of the brand; it should be chosen, not defaulted.
  **Applies to** landing page, mobile. **Check** visual. **Source** (p.208-210)
- **RULE** Keep personality in proportion to function: Phosphor adds character only through sparing unique details (see Character rule). Source (p.192)
  **Why** Austere sets get warmth without losing clarity.
  **Applies to** all. **Check** visual. **Source** (p.192)

**7. Ease of use**
- **RULE** A complete icon set must be easy for contributors to extend, for designers to use (screen, print, other media) and for engineers to ship; it should be well-organised, well-documented and field-tested, ideally with custom tools.
  **Why** An unusable set will be bypassed and fragment.
  **Applies to** all. **Check** repo has icon naming convention, master file, usage doc, export pipeline. **Source** (p.211)
- **RULE** Organised: keep a clean master file, give assets meaningful names, store in a convenient location, pick the categorisation (alphabetical? by size? by type?).
  **Why** Findability. **Applies to** all. **Check** file/layer naming. **Source** (p.211)
- **RULE** Tested: check icons work in context and at the proper sizes, and that they are in sync with the rest of the visual system; place icons close together to proof for clarity, readability, alignment, brevity, consistency and personality (arrow set figure p.212 shows 66 arrow/chevron/refresh icons side by side as a proofing sheet).
  **Why** Proximity makes violations visible. **Applies to** all. **Check** visual proof sheet. **Source** (p.212)
- **RULE** Custom tools: if resources allow, provide tooling that makes icons easy to find and export (Material's icon library lets you pick an icon and download different styles/themes, colours and sizes in your preferred file format).
  **Why** Lowers friction for designers and engineers. **Applies to** all. **Check** n/a. **Source** (p.213-214)

## 3. Numbers & scales

### Icon types (p.178-183)

| Type | What | Strength | Cost |
|---|---|---|---|
| Glyph | Solid graphical symbol (Greek "carving"); can take colour, shadow, any size | Works well at small sizes | Lacks visual interest at larger sizes |
| Colored | Solid or gradient colour | Less official, more fanciful | Hard to integrate into product style; distracts; overuse bad for UX |
| Duotone | Two related colours; two layers (outline + fill), tune layer opacity | Visual appeal without overwhelming | Hard to read at very small sizes |
| Outlined | Vector strokes, hollow | Simple, minimalist, professional | Slower to process and recognise |
| Universal | Instantly identifiable (home, print, search) | Zero learning | Do not replace the metaphor |
| Unique | Specific function/feature, logos | Brand/feature specific | Needs text labels for first-time users |
| Conflicting | Several glyphs for one idea (thumb/heart/star = like) | Any can work | Pick one, stay consistent; same glyph can mean different things per product |

### Phosphor icon grid, diagram (p.186)

| Item | Value (px on 154 x 154 canvas) |
|---|---|
| Canvas | 154 x 154 |
| Trim area (thickness) | 18 |
| Circle keyshape | 90 |
| Square keyshape | 81 |
| Rectangle keyshape, short side | 71 |
| Earlier grid stages | 116 x 116 (keylines only) -> 154 x 154 (with trim) -> 154 x 154 (trim highlighted, keylines adjusted) (p.187) |

Keyshape usage examples (p.186): circle = Daylio, New York Times; square = LinkedIn, calculator; portrait rectangle = Google Docs, Microsoft Word; landscape rectangle = AliExpress, NBC. The Phosphor figure demonstrates icons drawn in the keyshape (second row) and loosely guided by it (third row).

### Phosphor technical rules at 48px canvas (p.192-193)

| Item | Value |
|---|---|
| Canvas | 48 x 48px |
| Stroke | 1.5px, centred |
| End caps | rounded |
| Angles | 15 degree increments where possible |
| Measurements | whole, even numbers; fold down to 1px and 0.5px |
| Circle keyline | 28 x 28px |
| Square keyline | 25 x 25px |
| Landscape rectangle | 28 x 22px |
| Portrait rectangle | 22 x 28px |
| Trim area | 6px thick |

[engine note] The 154px diagram numbers scale to the 48px rules (90 -> 28, 81 -> 25.2 ~ 25, 71 -> 22, 18 -> 5.6 ~ 6), so the two pages describe the same grid at different canvas sizes; this is my arithmetic, the book does not state it.

### SF Symbols (p.207)
9 weights and three scales; fill and outline variants consistent.

### History numbers (p.175-177; background, no design rule)
Pictographs/ideographs about 100,000 years ago; Chinese writing around 6000 B.C.; Egyptian hieroglyphics around 3000 B.C.; cuneiform about 1900 B.C.; Chinese vocabulary about 50,000 characters around 1500 B.C.; Phoenician 22-sign alphabet 1000 B.C.; Greeks adopted it 800-600 B.C.; Romans 23-character alphabet around 400 B.C.; Marcus (1984) icon classification; Susan Kare designed Apple's command-key icon in 1984.

## 4. Dos and Don'ts

| Do | Don't | Why |
|---|---|---|
| Home (house), search (magnifier), share (nodes), delete (bin), menu (3 lines), settings (gear) in one consistent outline style, dark panel, happy emoji (p.180) | Binoculars for search, blank rounded rectangle, odd people/wrench/doc glyphs for common actions, sad emoji (p.180) | Universal actions need universal symbols |
| Clipboard icon with a clearly visible gap between board and clip (p.199, "slight adjustment" figure) | Clipboard where clip nearly touches board and fills in as a blob (p.199, red-circled icon in a purple row beside "03 Dec 2002, Your Birthday") | Narrow gaps clog at small size |
| Play icon with the triangle nudged right of metric centre, so it looks centred (p.201, green tick) | Triangle exactly at geometric centre of circle, reads left-heavy (p.200, red x; guide lines "x" measure equal distances) | Optical alignment beats metric alignment |
| "G" scaled down so it matches neighbouring crypto/brand icons at the same keyshape (p.189, green tick, "Balance") | "G" filling the 90px circle keyshape, visibly bigger than the other icons in the 4x3 sheet (p.188, red x, "Not Balanced") | Same keyshape does not mean same optical size |
| Simple front-view ship silhouette with waves (Material) (p.203, lower figure) | Detailed sailboat with two sails and layered hull (p.203, upper figure) | Brevity on small canvases |
| One consistent weight family (SF Symbols) (p.207) | A mixed set with filled and outline, large and small glyphs (pre-iOS 13 Apple set, p.206: Add, Contact, Mail, Alarm, Date, Location, Audio, Favourite, Message, Bookmark, Home, Pause, Capture Photo, Invitation, Play, Capture Video, Search, Cloud, Share, Love) | Squint test: some icons look stronger |
| Icon + visible label when icon is unique (logo of Mailchimp, Sketch, Snapchat) (p.181) | Unique icon with no label | First-timers cannot decode it |
| Lighter/heavier visual weight comparisons controlled (heart: 75% size, lighter stroke, original, filled, rounder) (p.206) | Mixing those variations within one set | Weight depends on fill, stroke, size, shape |
| Car dashboard "clear to hazy" ordering: clear = seat-belt reminder; hazy = electric power steering (steering wheel in a circle) per the book's opinion (p.195-196) | Symbols built on unexpected metaphors | Hazy symbols need a guidebook |

## 5. Exceptions & judgement calls

- Glyph vs outlined vs duotone vs colored is taste, balanced against size: the book gives qualitative trade-offs only (no pixel thresholds). (opinion)
- Universal icons vs innovation: the book allows changing the exact style but not the core form/concept (p.181). Conflicting-icon choice (heart/star/thumb) is a context decision, "the one that suits it best".
- "Optics > Grids" explicitly overrides the grid; the same page set also says to build grids. Resolution: grid first, then eyeball and deviate. Also "when they're no longer useful, get rid of them" (p.187).
- Brevity vs personality: Phosphor ranks Clarity > Brevity > Character; character is added "sparingly" (p.191-192).
- Colored/illustrative icons are bad in UI chrome (p.179) yet good for app icons and for illustrative contexts like Yelp cuisine search (p.204-205).
- The clarity ordering of car symbols is explicitly "in my opinion" (p.195).
- Cost-of-confusion framing (p.196): low in a navigation row where a couple of taps reveal the meaning, high in driving; the book does not say nav icons can skip labels, only that VSCO's cost is minimal. Do not generalise to "icon-only nav is fine".
- [engine note] Common practice (not in this book): pair icon-only buttons with accessible names/tooltips; stroke width should match adjacent text weight; icons sit on the same optical size as the text cap height. Kept out of the rules above because the book does not state them.

## 6. Figures worth keeping

Copied to `examples/ui-pedia/icons/` (file name = PDF page).

- p.178: glyph (solid) set vs coloured set, same 12 UI icons in two treatments (search, chat, mail/Gmail, card, play-arrow, add-file, bar chart, location, no-bell, apps grid, cup/trash, file).
- p.179: duotone set (same 12 icons, two tones, low-contrast second tone).
- p.180: outlined set (same 12 icons as strokes) and the universal good/bad comparison (happy standard glyphs on dark panel vs sad odd metaphors incl. binoculars for search).
- p.181: unique icons (Mailchimp chimp, Sketch diamond, Snapchat ghost).
- p.182: conflicting icons (thumbs-up/heart/star all labelled "Like").
- p.183: "Anatomy of Icon" diagram: square grid, pink padding band, inner live area for square icons, dashed circle for circular icons, keylines through the centre.
- p.184: "Grids and Guides -> Padding -> Final Icon" for a circle-chevron icon (cyan keyshape, pink padding, yellow selection handles).
- p.185: keyline starter kit mapped to icons: square->4-square grid icon, landscape rectangle->mail, circle->check circle, portrait rectangle->cup.
- p.186: Phosphor grid with annotated sizes (canvas 154, circle 90, square 81, rectangle short side 71, trim 18) and the four keyshapes used to draw real brand glyphs.
- p.187: grid evolution 116x116 -> 154x154 -> 154x154 with trim area; start of Optics > Grids.
- p.188: Not Balanced: "G" at full 90px circle keyshape in a 4x3 sheet of coin/brand icons.
- p.189: Balanced: the same "G" scaled slightly down, sheet now even.
- p.190: test sheets: six pale pink/slate panels showing the Curiosity icon beside siblings at several sizes on light/dark.
- p.195: car dashboard symbol flurry and a Clear <-> Hazy scale of eight warning icons.
- p.196: VSCO nav icons (Feed, Discover, Studio, Profile, Members): perplexing metaphors.
- p.199: Transit-app clipboard: blob (bad) vs adjusted gap (good).
- p.200: Google Maps transit mode icons (readable small) and play-icon bad alignment case.
- p.201: optical alignment: "i"/"j" dots, "O" overshoot, corrected play icon.
- p.206: pre-iOS 13 Apple set (20 labelled icons) and the heart visual-weight ladder.
- p.207: SF Symbols grid (Command, Option, Alt, Delete, Shift, Capslock, Power, Globe, Sun, Keyboard, Eject, Control...) in fill/outline pairs.

Not copied (still instructive, text covers them): p.194 (principles diagram on three sample icons), p.198 (Amtrak Station/Train Number/date rows, fine-detail icons), p.203 (detailed sailboat vs simple ship), p.204 (Telegram menu, Yelp cuisine icons), p.205 (Safari/Netflix/Firefox app icons), p.208-210 (personality collections), p.212 (66-icon arrow proofing sheet).

## 7. Open questions

- Pages 175-177: history of pictographs/alphabets and Marcus (1984) categories: no design rule content (p.175, p.176, p.177); the "Marcus categories" figure promised on p.177 is not present (the text goes straight to "types in simple language").
- p.176 contains the OCR/translation oddity "after 2500 years of erasing classic shapes": kept as theory, no rule.
- p.186 grid numbers (154 canvas, 90/81/71, trim 18) vs p.192-193 rules (48 canvas, 28/25/22x28, trim 6): consistent when scaled (see engine note) but the book does not say which grid is current; treat the 48px set as the rule template.
- p.195-196: the "Clear/Hazy" ordering and the claim that the seatbelt light is "3rd from the left" and electric power steering "far right" do not match the figure order exactly (the figure shows eight icons; the third icon looks like an engine/battery symbol, the seat-heat icon is first). Flagged: treat only the general lesson (unexpected metaphor = hazy) as reliable.
- p.207: the doc captions in the SF Symbols grid are garbled in OCR ("Delete.R", "Capslock.F", "Keyboard. Chevron. com"): not meaningful.
- p.208-210: figure/caption order in the personality section looks shifted (Waze caption sits under the 3x3 pastel-circle emoji grid on p.208; the white-on-slate set on p.209 is captioned Twitter then Sketch, and the 3D-style icon grid under the "Sketch" caption looks more like Freemojis). Treat the adjectives (quirky, smooth/light/crisp, delicate/airy, cute) as the lesson, not the brand-to-image mapping.
- p.213-214: both pages head "Custom Tools"; p.214 is actually the chapter conclusion, not about tools.
- No numeric icon sizes for UI use (16/20/24/32px), no touch-target size and no icon-to-text spacing rules appear in this chapter. Those belong elsewhere or to engine notes.

Page coverage (all 40 pages accounted for): 175 intro; 176 history (no rule content); 177 types preface; 178 glyph/colored; 179 colored/duotone; 180 duotone/outlined/universal; 181 universal/unique; 182 unique/conflicting; 183 conflicting/anatomy; 184 container/grid/padding; 185 keylines/radius; 186 Phosphor grid; 187 grid evolution/optics; 188 not balanced; 189 balanced/testing; 190 test sheets; 191-193 principles and technical rules; 194 principles intro/clarity; 195-197 clarity; 198 clarity/readability; 199-200 readability/alignment; 201-202 alignment/brevity; 203-205 brevity/consistency; 206-208 consistency/personality; 209-211 personality/ease of use; 212 tested/custom tools; 213 custom tools; 214 conclusion.
