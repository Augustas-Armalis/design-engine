---
source: UI Pedia (knowledge/ui-pedia/14-objects-and-shapes.md, 07-proximity.md, 06-whitespace.md, 20-cards.md, 23-shadows-and-blurs.md) + measured studies (product-ui-deep.md, flohoeller-craft.md, consistency-mechanics.md, effects-materials.md, kargul-crm-teardown.md) + founder verdicts (founder-taste.md)
chapter: Borders, edges and nesting: border width and colour, ring vs border vs fill vs shadow, nested radius, inner vs outer spacing, inset tiles
pages: UI Pedia p.334-347 (box model, radius), proximity and whitespace chapters, p.517-524 (cards: borders, separation tools)
topic_tags: [borders, hairline, ring, nesting, concentric-radius, padding, gap, proximity, cards, dark-mode, consistency, squircle]
status: studied
---

# Borders and nesting: why professional UI looks professional

The founder asked (2026-10-12): "have you learned about borders, the gap between, and what border size gets that professionalism? Apply it in action and understand why, from UI Pedia." This note joins UI Pedia's principles (the why) with the numbers we measured on Linear, Vercel/Geist, Attio, Flo Hoeller, Marcel Kargul and Rico (the what). UI Pedia gives no pixel values for borders; every number below is measured, and every principle is the book's.

## 1. The principles (UI Pedia)

1. **Every object is a box: fill, border, inner margin (padding), outer margin.** Each of the four is designed on purpose; a border is never a default (p.334-335). Professional UI uses the fewest of the four that still separates the object.
2. **Separate with the gentlest tool that works.** The book's three separation tools are stroke, shadow and background (p.523-524), and you may need none of them if content and whitespace already group the object. Order of preference: space, then a fill step, then a 1px ring, then a shadow; stack two only when one is not enough (a floating layer).
3. **Proximity: things that belong together sit closer than things that do not.** So the space inside a group is always smaller than the space around it: padding inside a card < gap between cards < gap between sections.
4. **Resist excessive borders** (p.518-519): no dividers between the title, body and actions of a card; spacing does that. A list of small homogeneous items is one container with dividers, not a stack of bordered cards (p.521).
5. **Consistent roundness, derived from the grid unit; nested elements must blend** (p.346-347). Blending means concentric corners: the inner radius follows the outer one.

## 2. The numbers (measured)

| decision | professional value | amateur tell | measured on |
|---|---|---|---|
| border width | **1px**, always, for containers and controls | 2px outlines on cards, mixed widths | Linear, Geist, Attio, Flo, Kargul |
| border colour (light) | ink at **6-10% alpha** (`rgba(0,0,0,.06-.10)`, Flo `#ececec`, Geist 8%) | solid mid-grey `#ccc`/`#ddd`, coloured borders | Geist, Flo, Attio |
| border colour (dark) | white at **6-12% alpha** (Linear 5 / 8 / 12% for three levels) | grey borders that glow, borders darker than the surface | Linear, Rico, Kargul |
| how it is drawn | **ring via box-shadow** (`0 0 0 1px`) or `inset 0 0 0 1px`, so it never shifts layout and stacks with a soft drop | `border` on an element whose size matters, then the inner icon is off-centre | Geist, Flo, Tandem |
| one edge per box | ring **or** border **or** fill step, plus at most a soft drop for floating layers | ring + border + shadow on one card (the muddy edge) | founder rule (one shadow language) |
| dark surfaces | separate by a **lighter fill step** + a top highlight (`inset 0 1px 0 rgba(255,255,255,.04-.08)`), border optional | a dark card with a black drop shadow and no lift | Linear, Rico, effects study |
| nested radius | **inner = outer - inset** (Flo: 14-6=8, 20-4=16, 32-8=24); at large padding or when the math gives < 4px, step **one rung down** the ladder instead (Kargul measured: 16->14 at 20px padding, 12->10 at 5px, 8->6 at 4px); circles and pills inside are exempt | equal radii inside and out (pinched corners), or a bigger inner radius | Flo, Attio, Tandem |
| inner vs outer spacing | space **between items inside** a card (rows, label-value pairs: 4-12px) < gap between cards (12-20px) < gap between sections (32px in apps, 64-128px on sites). Card padding sits close to the card gap: Kargul measures gap slightly below padding (14 vs 16, 16 vs 20) | 32px padding with 8px gaps (cards read as one blob), or items inside spaced as wide as the cards | product-ui-deep, section-anatomy, kargul-saas-playbook (borders census) |
| tray / card (card in card) | tray inset **4-8px**, tray radius = card radius + inset | 16px tray padding (reads as a second card) | Flo, Halyard |
| leading tile (icon box, avatar) | left inset = top = bottom, exactly; size with `box-sizing: border-box` | 6px left, 12px top (height inflated by padding) | founder 2026-10-12, `shape.inset-tile` probe |
| dividers in lists | 1px at **~6%** ink, full-bleed inside the container, rows 36-44px | dividers inset unevenly, darker than the container ring | Attio, Linear, Geist |
| focus | 2px ring, 2px offset, brand colour | browser default glow or none | Geist, a11y |
| corner shape | Apple continuous corner (`corner-shape: superellipse(1.32)`, radius x1.2) on every rounded non-circular box | plain circular-arc corners on large cards and windows | founder 2026-10-12, effects-materials.md |

## 3. Why it reads as professional

- **A 1px ring at 6-10% is the lowest contrast that still defines an edge.** Anything stronger competes with the content; anything weaker disappears on cheap screens. It lets the fill, type and data be the loudest thing in the box.
- **Alpha borders adapt.** The same `rgba(0,0,0,.08)` ring reads correctly on white, on `#fafafa` and on a tinted tray; a solid `#e5e5e5` looks too dark on grey and too light on white. Premium systems never hard-code grey borders.
- **Concentric corners are what the eye expects from a physical object** (a phone's screen inside its body). Equal radii inside and out make the gap look thicker at the corners than along the sides, which reads as cheap even when nobody can say why.
- **Continuous (squircle) corners remove the visible kink** where a straight edge meets a circular arc; curvature ramps up gradually, so large cards and windows look moulded rather than cut. That is the Apple look.
- **Inside < outside is how the eye groups things without lines.** When spacing does the grouping, borders become optional, and fewer borders is the strongest single signal of a mature interface.
- **Equal insets around a leading tile** make the tile look placed, not dropped in. Unequal insets are the detail the founder catches first.

## 4. Rules (BN-01 to BN-12)

**RULE BN-01** Containers and controls use a 1px edge only; no 2px borders except focus rings and selected-state indicators.
**Why** 1px is the lowest-contrast edge that still defines a box; heavier edges compete with content.
**Applies to** all. **Check** computed border/ring widths on cards, inputs, menus are 1px. **Source** product-ui-deep.md, flohoeller-craft.md

**RULE BN-02** Edge colour is ink at an alpha, never a solid grey: light 6-10% black, dark 6-12% white, in at most three levels (subtle / default / strong).
**Why** Alpha edges adapt to every surface they sit on; solid greys look wrong on tinted or nested surfaces.
**Applies to** all. **Check** border/ring colours are rgba with alpha 0.05-0.12. **Source** Geist 8%, Linear 5/8/12%, Flo #ececec

**RULE BN-03** Draw edges as a box-shadow ring (`0 0 0 1px` or `inset 0 0 0 1px`) unless a real border is needed for layout; never let a border change a control's size.
**Why** Rings stack with soft shadows and never push contents off-centre.
**Applies to** all. **Check** controls with a leading icon or tile pass `shape.icon-centring` and `shape.inset-tile`. **Source** Geist, Flo, founder 2026-10-12

**RULE BN-04** One edge treatment per box: a ring, a border or a fill step, plus at most one soft drop for floating layers.
**Why** Stacked edges read as muddy.
**Applies to** all. **Check** no element has both a visible border and a ring of a different colour. **Source** founder-taste (one shadow language), UI Pedia p.523-524

**RULE BN-05** Separate with space first, then a fill step, then a 1px ring, then a shadow; use dividers only between rows of one list, never between the parts of a card.
**Why** UI Pedia: resist excessive borders; spacing groups without clutter.
**Applies to** all. **Check** no border-top/bottom between title, body and actions inside a card. **Source** UI Pedia p.518-521

**RULE BN-06** Nested radius is concentric: inner = outer - inset when the inset is small (<= 8px). At larger padding, or when outer - inset < 4px, step the inner radius one rung down the ladder (16->14, 12->10, 8->6). Round avatars and pills inside are exempt.
**Why** Equal radii make the gap look thicker at the corners; concentric corners read as one physical object.
**Applies to** nested boxes (card in tray, tile in button, input in panel, window in frame). **Check** `shape.inset-tile` concentric check; manual for cards. **Source** UI Pedia p.346-347, Flo measured, kargul-saas-playbook borders census

**RULE BN-07** Inside < outside: the space between items inside a card (4-12px) is smaller than the gap between cards (12-20px), which is smaller than the gap between sections (32px in apps, 64-128px on sites). Card padding stays close to the card gap (gap 0.8-1x padding, Kargul 14/16 and 16/20).
**Why** Proximity is how the eye groups without lines; a card's padding is its frame, not a grouping gap.
**Applies to** all layouts. **Check** item spacing inside cards < card gap; card gap between 0.8x and 1x card padding; section gap >= 2x card gap. **Source** UI Pedia proximity/whitespace, section-anatomy.md, kargul-saas-playbook (borders census)

**RULE BN-08** A card-in-tray uses a 4-8px tray inset with tray radius = card radius + inset; secondary info sits on the tray, not in the card.
**Why** A small inset reads as one object with a frame; a large one reads as two cards.
**Applies to** components, showcases. **Check** tray padding 4-8px; radius difference equals the padding. **Source** flohoeller-craft.md

**RULE BN-09** A leading tile's left inset equals its top and bottom insets; size controls with `box-sizing: border-box`.
**Why** Founder: "it should be the same as top and bottom paddings".
**Applies to** buttons, rows, chips, cards with a leading tile. **Check** `shape.inset-tile` (FAIL). **Source** founder 2026-10-12

**RULE BN-10** In dark mode, lift surfaces with a lighter fill step and a 1px top highlight (white 4-8%); a border is optional and never darker than the surface.
**Why** Black shadows vanish on dark canvases; light reads as elevation in the dark.
**Applies to** dark UI. **Check** raised surfaces are lighter than their parent; top inset highlight on floating layers. **Source** Linear, effects-materials.md

**RULE BN-11** List dividers are 1px at about 6% ink, full width inside their container, and never darker than the container's own ring.
**Why** Dividers are the quietest line on the page; a divider darker than the frame inverts the hierarchy.
**Applies to** tables, lists, menus. **Check** divider alpha <= container ring alpha. **Source** Attio, Linear, Geist

**RULE BN-12** Corners follow a short ladder from the 4px grid (e.g. 6 / 8 / 12 / 16 / 20 / pill), assigned by element height, and every rounded non-circular box uses Apple continuous corners (`corner-shape: superellipse(1.32)` where supported, radius x1.2; SVG squircle path for hero objects).
**Why** UI Pedia: consistent radius from the grid unit; founder 2026-10-12: squircles make everything look more premium.
**Applies to** all. **Check** `shape.radius-ladder` <= 2 radii per height band; `shape.squircle` reports corner-shape active. **Source** UI Pedia p.346-347, effects-materials.md, founder 2026-10-12
