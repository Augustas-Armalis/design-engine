---
source: web:https://developer.apple.com/design/human-interface-guidelines/icons (also sf-symbols, images, image-views, app-icons, page-controls, right-to-left; fetched 2026-10-08)
chapter: Apple HIG - Icons, SF Symbols, images, app icons
pages: n/a (web source)
topic_tags: [icons, sf-symbols, images, svg, resolution, formats, app-icon, favicon, optical-alignment, stroke-weight, apple-hig]
status: studied
---

# Apple HIG - Icons and Images

Raw text: `corpus/web/apple-hig/{icons,sf-symbols,images,image-views,app-icons,page-controls}.txt` (private). Written in my own words. Unit note: "px" in Apple's icon/image tables is raster pixels; "pt" is a logical point (= CSS px in Safari).

## 1. Core ideas
1. An interface icon expresses one idea in a way people recognise instantly: highly simplified, familiar metaphor, tied to the action.
2. All icons in a product share size, detail level, stroke thickness and perspective; adjust visual weight, not just dimensions, so they look equal.
3. Icon weight should match adjacent text weight unless you intend emphasis (SF Symbols automate this with nine weights that mirror the font).
4. Optical centring beats geometric centring for asymmetric glyphs; adjustments are small and baked into padding.
5. Prefer vector formats for flat icons (SVG/PDF); rasters need multiple scale factors.
6. Text inside icons hurts localisation and accessibility; use only if essential and localise it.
7. A selected state is automatic in system components; supply it manually only when you build your own.
8. Outline vs fill is a signal: outline beside text in toolbars and lists; fill for tab bars, swipe actions and selection.
9. Rendering modes (monochrome, hierarchical, palette, multicolor) trade richness for legibility; always check small sizes and low-contrast backgrounds.
10. Images need a colour profile, appropriate formats, correct scale factors and testing on real devices.

## 2. Rules

### Interface icons

- **RULE [AH-IC-01]** Design icons as a recognisable, highly simplified single concept using familiar metaphors directly related to the action.
  **Why** detail reduces recognition and clarity. **Applies to** web: all icon sets. **Check** icon has <= ~5 primitive shapes at 24 px; passes a 16 px legibility look; visual. **Source** https://developer.apple.com/design/human-interface-guidelines/icons

- **RULE [AH-IC-02]** Keep all icons in one product consistent: the same size grid, level of detail, stroke thickness and perspective; adjust each shape's dimensions for equal optical weight.
  **Why** mixed styles look unplanned. **Applies to** web: one icon family only (matches the anti-slop rule against emoji-as-icons). **Check** one `data-icon-set`; stroke-width identical across SVGs; icon bbox within the grid. **Source** https://developer.apple.com/design/human-interface-guidelines/icons

- **RULE [AH-IC-03]** Match icon weight to the text next to it; change only when you want to shift emphasis.
  **Why** equal stroke and glyph weight reads as one unit. **Applies to** web: inline icons next to labels (stroke 1.5 px beside weight 400, 2 px beside 500-600 `[engine note]`). **Check** icon stroke / font-size ratio consistent across the UI. **Source** https://developer.apple.com/design/human-interface-guidelines/icons

- **RULE [AH-IC-04]** Size icons relative to adjacent text: SF Symbols offer three scales (small, medium default, large) defined from the font's cap height, so emphasis changes without breaking weight matching.
  **Why** icon size tied to the text. **Applies to** web: icon width 1.0-1.35x text font-size (existing engine rule); use `1em`/`1.14em`. **Check** icon width in [1.0, 1.35] x adjacent font-size. **Source** https://developer.apple.com/design/human-interface-guidelines/sf-symbols

- **RULE [AH-IC-05]** Optically centre asymmetric icons (for example a download arrow) by adding a small amount of padding to the asset, not by shifting the box.
  **Why** geometric centre looks wrong when weight is uneven. **Applies to** web: icon buttons. **Check** visual with 3x zoom; icon centre in its 24 px viewBox is off geometric centre by <= 1 px where intentional. **Source** https://developer.apple.com/design/human-interface-guidelines/icons

- **RULE [AH-IC-06]** Supply a separate selected-state icon only when you build the component yourself; system tab bars, toolbars and buttons derive it.
  **Why** duplicates are unnecessary maintenance. **Applies to** web: custom tab bars (outline -> filled). **Check** icon library has both variants for custom nav. **Source** https://developer.apple.com/design/human-interface-guidelines/icons

- **RULE [AH-IC-07]** Use outline icons beside text in toolbars and lists, filled icons in tab bars and for selection or swipe actions; use enclosed variants to improve legibility at very small sizes; use the slash variant for unavailable.
  **Why** variants carry meaning. **Applies to** web: icon system with `fill`/`outline` variants. **Check** nav tab icons use `fill` variant when active. **Source** https://developer.apple.com/design/human-interface-guidelines/sf-symbols

- **RULE [AH-IC-08]** Use inclusive imagery: prefer gender-neutral figures and avoid images that depend on culture-specific metaphors.
  **Why** recognisability across cultures. **Applies to** web: icons and illustration. **Check** editorial review. **Source** https://developer.apple.com/design/human-interface-guidelines/icons

- **RULE [AH-IC-09]** Include text in an icon only if essential (a letter for bold/italic); localise it; for text-like abstractions use bars and keep an RTL-flipped version.
  **Why** letters do not localise. **Applies to** web: icon sets. **Check** SVGs with `<text>` flagged. **Source** https://developer.apple.com/design/human-interface-guidelines/icons

- **RULE [AH-IC-10]** Ship flat icons as SVG (or PDF); use PNG only for effects-heavy artwork, and then provide multiple scale factors.
  **Why** vectors scale; raster does not. **Applies to** web: SVG sprites/inline, `fill="currentColor"`. **Check** icon files are `.svg`; inline SVG uses `currentColor`. **Source** https://developer.apple.com/design/human-interface-guidelines/icons

- **RULE [AH-IC-11]** Provide an accessible name for every custom icon (alternative text) unless purely decorative.
  **Why** assistive technologies. **Applies to** web: `aria-label`/`<title>`, decorative `aria-hidden`. **Check** axe passes; decorative SVG has `aria-hidden="true"`. **Source** https://developer.apple.com/design/human-interface-guidelines/icons

- **RULE [AH-IC-12]** Use the established icon for common actions rather than inventing one: Cut = scissors, Copy = overlapping documents, Paste = clipboard, Done = checkmark, Cancel/Close/Deselect = x, Delete = trash, Undo/Redo = curved back/forward arrow, Compose = square with pencil, Duplicate = plus on overlapping squares, Rename = pencil, Move = folder, Attach = paperclip, Add = plus, More = ellipsis, Select = checkmark in circle, Search = magnifier, Filter = three decreasing horizontal lines, Share = square with up arrow, Print = printer, Account = person in circle, Like/Dislike = thumbs up/down, Archive = box, Calendar = calendar, Alarm = alarm; text formatting (bold, italic, underline, superscript, subscript, align left/center/justify/right).
  **Why** familiar symbols need no learning. **Applies to** web: choose the nearest glyph in the icon set (see section 3). **Check** icon-to-action mapping table; no divergent icon for a standard action. **Source** https://developer.apple.com/design/human-interface-guidelines/icons

- **RULE [AH-IC-13]** Do not draw replicas of Apple hardware or use Apple trademarks or copyrighted symbols in your icons.
  **Why** hardware changes often and is copyrighted. **Applies to** web: avoid iPhone mockup glyphs as icons. **Check** review. **Source** https://developer.apple.com/design/human-interface-guidelines/icons

### SF Symbols and custom symbols

- **RULE [AH-IC-14]** Pick the rendering mode for legibility at the actual size and background: monochrome (one colour), hierarchical (one colour at several opacities), palette (two or more colours), multicolor (intrinsic colours); verify automatic choices.
  **Why** rich modes lose detail when small or low-contrast. **Applies to** web: duotone icons (`opacity` layers) mimic hierarchical; keep text-adjacent icons monochrome. **Check** icons next to text use `currentColor`; multicolor only for large standalone icons. **Source** https://developer.apple.com/design/human-interface-guidelines/sf-symbols

- **RULE [AH-IC-15]** Use variable colour only to show a changing value (volume, signal, capacity); use hierarchical layers for depth, not variable colour.
  **Why** differentiates change from depth. **Applies to** web: signal/volume icons with `data-level`. **Check** n/a. **Source** https://developer.apple.com/design/human-interface-guidelines/sf-symbols

- **RULE [AH-IC-16]** Use nine symbol weights that correspond to font weights (ultralight to black) to match surrounding text, and three scales relative to cap height.
  **Why** weight match is the feature. **Applies to** web: variable icon fonts or stroke-width tokens per text weight. **Check** icon stroke token per text weight token. **Source** https://developer.apple.com/design/human-interface-guidelines/sf-symbols

- **RULE [AH-IC-17]** Animate symbols judiciously and only to communicate; see the motion note for the effect catalogue.
  **Why** too many animated icons overwhelm. **Applies to** web. **Check** AH-MO-11. **Source** https://developer.apple.com/design/human-interface-guidelines/sf-symbols

- **RULE [AH-IC-18]** Custom symbols should follow the template for detail, optical weight, alignment, position and perspective, be simple, recognisable and inclusive, avoid baking in common variants (enclosures, badges), include layer annotations for animation, and provide an accessibility description.
  **Why** a custom glyph must sit with system ones. **Applies to** web: custom SVG icons in a family (use the family's grid). **Check** viewBox and stroke match the family. **Source** https://developer.apple.com/design/human-interface-guidelines/sf-symbols

- **RULE [AH-IC-19]** Do not customise symbols that depict Apple products or features; they are non-modifiable and not for logos or app icons.
  **Why** licensing. **Applies to** native-only / licensing. **Check** n/a. **Source** https://developer.apple.com/design/human-interface-guidelines/sf-symbols

- **RULE [AH-IC-20]** Add negative side margins to symbols that have badges so that stacks align optically.
  **Why** extra width otherwise misaligns lists. **Applies to** web: icon + badge combos (use `margin-inline` negatives). **Check** visual. **Source** https://developer.apple.com/design/human-interface-guidelines/sf-symbols

- **RULE [AH-IC-21]** Choose page-control indicator images that are simple (no inner lines, text or negative space), use at most two kinds, and leave colouring to the system.
  **Why** tiny glyphs turn to mud. **Applies to** web: carousel dots (current-location marker). **Check** unique dot types <= 2. **Source** https://developer.apple.com/design/human-interface-guidelines/page-controls

- **RULE [AH-IC-22]** Center a custom share-sheet (activity view) action icon in an area about 70 x 70 px.
  **Why** Apple's stated icon area for custom activities. **Applies to** native-only. **Check** n/a. **Source** https://developer.apple.com/design/human-interface-guidelines/activity-views

### Images

- **RULE [AH-IM-01]** Deliver bitmaps for each density: 1x, 2x and 3x as appropriate (iPhone 2x and 3x; iPad 2x; Mac and TV 1x and 2x); design at the lowest resolution and scale up; keep vector control points on whole values so they align at 1x and stay crisp at 2x/3x.
  **Why** Apple's scale-factor table and the integer relation between scales. **Applies to** web: `srcset` with `1x, 2x, 3x` descriptors or `w` descriptors, DPR cap 2-3. **Check** `img` has `srcset` and `sizes` (see implementation-craft I5/I7). **Source** https://developer.apple.com/design/human-interface-guidelines/images

- **RULE [AH-IM-02]** Choose formats by content: de-interlaced PNG for raster graphics, 8-bit palette PNG when 24-bit colour is unnecessary, JPEG or HEIC for photos (optimised), PDF/SVG for flat scalable art.
  **Why** size and quality balance. **Applies to** web: AVIF/WebP/JPEG for photos, SVG for flat art, PNG only when alpha is needed (engine rule). **Check** MIME per content type; photos not PNG. **Source** https://developer.apple.com/design/human-interface-guidelines/images

- **RULE [AH-IM-03]** Embed a colour profile in every image.
  **Why** consistent colour across displays. **Applies to** web: sRGB tag at least; ICC for P3 assets. **Check** `identify -verbose` shows profile. **Source** https://developer.apple.com/design/human-interface-guidelines/images

- **RULE [AH-IM-04]** Test images on real devices; pixelation, stretching and compression show up that desktop previews hide.
  **Why** densities and scaling differ. **Applies to** web: real phone + 2x/3x display. **Check** device QA step. **Source** https://developer.apple.com/design/human-interface-guidelines/images

- **RULE [AH-IM-05]** When showing a standalone image, use an image view; for interactive images use a real button; for icons use symbols or template icons rather than an image view.
  **Why** semantics and tinting. **Applies to** web: `<img>` for content, `<button>` wrapping icon, inline SVG for icons. **Check** clickable images are inside `<button>`/`<a>`. **Source** https://developer.apple.com/design/human-interface-guidelines/image-views

- **RULE [AH-IM-06]** Give animated image sequences a consistent size and aspect ratio for performance.
  **Why** avoids runtime scaling. **Applies to** web: GIF/APNG/Lottie frames. **Check** equal frame dimensions. **Source** https://developer.apple.com/design/human-interface-guidelines/image-views

- **RULE [AH-IM-07]** Avoid transparency where a fixed background is always present, to reduce file size, except for template images that rely on alpha for tinting.
  **Why** alpha costs bytes. **Applies to** web: PNG/WebP with alpha vs flattened JPEG. **Check** photos have no alpha channel. **Source** https://developer.apple.com/design/human-interface-guidelines/images

### App icons (web analogues: favicon, PWA icon, OG image)

- **RULE [AH-IM-08]** App icon: one simple idea, few shapes, simple background, no photos, no UI replicas, no screenshots, no hairline strokes or sharp corners that vanish when small; text only when essential.
  **Why** the icon is seen at small sizes in many contexts. **Applies to** web: favicon (SVG + 32 px PNG), PWA icons 192/512 `[engine note]`. **Check** favicon legible at 16 px. **Source** https://developer.apple.com/design/human-interface-guidelines/app-icons

- **RULE [AH-IM-09]** Supply unmasked square layers and keep the main content centred so system masking (rounded or circular) never clips it; do not pre-apply rounding, shadows, glows, bevels or blurs.
  **Why** system effects are dynamic; baked effects conflict. **Applies to** web: PWA maskable icons (`purpose: "maskable"`, safe zone ~ centre 80%) `[engine note]`. **Check** maskable icon content within centre 80%. **Source** https://developer.apple.com/design/human-interface-guidelines/app-icons

- **RULE [AH-IM-10]** Keep the icon's core features identical across appearances (default, dark, clear, tinted); a dark version is a subdued variant of the light one, not a different design; offer alternate icons only if closely related to the app.
  **Why** findability. **Applies to** web: favicon with `prefers-color-scheme` media rule in SVG. **Check** SVG favicon has dark variant that retains shape. **Source** https://developer.apple.com/design/human-interface-guidelines/app-icons

- **RULE [AH-IM-11]** Provide a single design across all platforms and sizes so the product looks like one product everywhere.
  **Why** recognition. **Applies to** web: favicon, app icon, OG image share the same mark. **Check** n/a. **Source** https://developer.apple.com/design/human-interface-guidelines/app-icons

- **RULE [AH-IM-12]** (native-only) macOS document icons: supply background fills at 512/256/128/32/16 px (1x and 2x), center images at half the canvas, keep a 10% margin (about 80% occupancy, 205 of 256 px), reduce detail in small sizes, avoid important content in the top-right corner; watchOS autoscale PDFs scale from 40/42 mm art at 2x (38 mm 90%, 41 mm 106%, 44 mm 110%, 45/49 mm 119%); tvOS layered images use 2-5 layers with an opaque back layer and a safe zone; visionOS prefers vectors and warns about spatial photos.
  **Why** recorded for completeness. **Applies to** native-only. **Check** n/a. **Source** https://developer.apple.com/design/human-interface-guidelines/images

## 3. Numbers & scales

| Item | Value |
|---|---|
| Scale factors | iOS @2x @3x; iPadOS @2x; watchOS @2x; macOS and tvOS @1x @2x; visionOS @2x or higher |
| App icon layout size | iOS/iPadOS/macOS 1024x1024 px; visionOS 1024x1024; watchOS 1088x1088; tvOS 800x480 |
| App icon appearances | iOS, iPadOS, macOS: default, dark, clear light/dark, tinted light/dark |
| App icon colour spaces | sRGB, Gray Gamma 2.2, Display P3 |
| macOS document icon backgrounds | 512@1x/1024@2x, 256/512, 128/256, 32/64, 16/32 |
| Document icon center image | half of canvas; 10% margin; about 80% occupancy (205 of 256) |
| Share-sheet custom icon area | about 70x70 px |
| watchOS image scale by case | 38 mm 90%, 40 mm 100%, 41 mm 106%, 42 mm 100%, 44 mm 110%, 45 mm 119%, 49 mm 119% |
| tvOS layered image | 2-5 layers; opaque back layer |
| visionOS app icon | background layer + 1-2 foreground layers |
| Symbol weights | 9 (ultralight to black); scales: small, medium (default), large |
| Rendering modes | 4 |
| Symbol animations | appear, disappear, bounce, scale, pulse, variable color, replace (down-up, up-up, off-up), magic replace, wiggle, breathe, rotate, draw on/off |
| Page-control indicator image types | max 2 |
| Engine reference ratio | icon width 1.0-1.35x adjacent font-size; 16 px beside 14 px |

Standard action to symbol name and nearest web icon (Lucide names `[engine note]`):

| Action | SF Symbol | Lucide |
|---|---|---|
| Cut | scissors | scissors |
| Copy | document.on.document | copy |
| Paste | document.on.clipboard | clipboard-paste |
| Done | checkmark | check |
| Cancel / Deselect | xmark | x |
| Delete | trash | trash-2 |
| Undo / Redo | arrow.uturn.backward / forward | undo-2 / redo-2 |
| Compose | square.and.pencil | square-pen |
| Duplicate | plus.square.on.square | copy-plus |
| Rename | pencil | pencil |
| Move to | folder | folder-input |
| Attach | paperclip | paperclip |
| Add | plus | plus |
| More | ellipsis | ellipsis |
| Select | checkmark.circle | circle-check |
| Search | magnifyingglass | search |
| Find | text.page.badge.magnifyingglass | file-search |
| Filter | line.3.horizontal.decrease | list-filter |
| Share | square.and.arrow.up | share |
| Print | printer | printer |
| Account | person.crop.circle | circle-user |
| Like / Dislike | hand.thumbsup / hand.thumbsdown | thumbs-up / thumbs-down |
| Archive | archivebox | archive |
| Calendar | calendar | calendar |
| Alarm | alarm | alarm-clock |
| Bold / Italic / Underline | bold / italic / underline | bold / italic / underline |
| Align left / center / justify / right | text.alignleft, aligncenter, justify, alignright | align-left, align-center, align-justify, align-right |
| Superscript / Subscript | textformat.superscript / subscript | superscript / subscript |
| Bring to front / Send to back | square.3.layers.3d.top.filled / bottom.filled | bring-to-front / send-to-back |

## 4. Dos and Don'ts
- **Do** match a 16 px icon's stroke to 400-weight 14 px text; **Don't** place a 2.5 px stroke icon next to light text.
- **Do** ship one SVG with `currentColor`; **Don't** ship 3 PNG sizes for a flat icon.
- **Do** keep the first letter in a favicon; **Don't** put "Play" or "New" inside it.
- **Do** use a filled home icon for the active tab and outline for inactive; **Don't** change the icon shape between states.
- **Do** give the trash button a name ("Delete"); **Don't** leave the SVG unlabeled.
- **Do** design dark favicon as the same mark; **Don't** swap in a different logo.

## 5. Exceptions & judgement calls
- **Format conflict.** Apple lists PNG, JPEG, HEIC, PDF, SVG. `web/implementation-craft.md` serves AVIF/WebP/JPEG for photos; HEIC is not a web format. Use the engine rules.
- **Icon size relation.** Apple expresses icon scale relative to cap height; the engine rule (`web/tokens-spacing-radius-sizing.md`, `web/design-systems.md`) uses a 1.0-1.35 ratio to font-size. Both give 16 px icons beside 14 px text. No conflict.
- **Layouts reflow, icons do not shrink** at large text (design-systems.md line 287) matches AH-TY-19: scale meaningful icons with text via `em`.
- **Outline vs fill.** The 'fill for tab bars' convention is iOS-specific; many web systems use a single outline icon with an accent colour for active. Treat as a design-system choice.
- **Stroke-to-weight mapping** (1.5 px with 400, 2 px with 500-600) is not in the HIG; it is an engine convention.
- **PWA maskable safe zone (80%)** is a W3C/Android convention used here as the analogue of Apple's centred-content rule.
- Apple's Standard icons list assumes SF Symbols' visuals; the Lucide column is a naming aid only, not a visual equivalence.

## 6. Figures worth keeping
- Icons page: optical-centring examples (download arrow) - image only.
- App icons page: Liquid Glass layering and appearance variants (default / dark / clear / tinted) - images only.

## 7. Open questions
- Exact SF Symbols grid sizes (e.g. 17 pt text -> 22 pt symbol canvas) are not stated in the text; skip.
- `foundations` index page: no rule content.
