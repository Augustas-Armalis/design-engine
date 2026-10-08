---
source: ui-pedia
chapter: Shadows and Blurs
pages: 557-574
topic_tags: [shadows, blur, depth, elevation, z-axis, neumorphism, inner-shadow, drop-shadow, backdrop-blur, legibility, interactivity, hierarchy]
status: studied
---

# Shadows and Blurs

Chapter of "UI Pedia" (Design Basics). Anatomy of a shadow (offset, blur, spread, colour, opacity), shadow types, neumorphism, jobs shadows do, then blurs and six tips for better shadows. Unlike the gradient chapter this one has concrete parameter values in its figures. All page numbers are PDF pages.

## 1. Core ideas

1. A shadow is controlled by colour, opacity, spread, blur, X and Y offset, and inner vs outer; changing one property can change the whole effect (p.557).
2. The z-axis (front to back) lets you stack items; the higher an element sits on z, the wider and more diffuse its shadow should be, controlled by spread and blur (p.558).
3. X and Y offsets must follow one direction everywhere so all shadows agree with a single light source (p.558-559).
4. Spread expands (positive) or contracts (negative) the shadow from the element's edge; blur 0 = sharp edge, bigger blur = larger and more diffuse (p.559).
5. X, Y and blur are the most crucial values (p.560).
6. Outer (drop) shadows are the norm; inner shadows are rare because UI is a stack of layers; an inner shadow reads as a hole (p.560-562).
7. Neumorphism = element colour equals background colour, a light shadow upper-left plus a dark shadow lower-right, so elements seem to extrude from the surface instead of floating (p.563-564).
8. Shadows do four jobs: signal interactivity, create visual depth, create hierarchy, and (via colour/softness) set mood (p.564-566, p.571).
9. Blur works on the element itself (unlike shadows, which must start at the edge): background blur or layer blur; used to focus attention, improve text legibility, or decorate (p.567-570).
10. Default shadows from design tools are terrible; make them soft (low opacity, high blur), tinted, and possibly built as a separate blurred layer (p.571-574).

## 2. Rules

### Anatomy and geometry

- **RULE** Pick one light direction for the whole interface and keep it; every shadow's X/Y offset points the same way.
  **Why** Mixed directions break the illusion of a single light source.
  **Applies to** all. **Check** compare sign of offset-x/offset-y across all `box-shadow` values in the stylesheet; they must agree. **Source** (p.558-559)

- **RULE** The higher an element is on the z-axis, the wider and more diffuse its shadow: raise blur and spread (and offset) with elevation.
  **Why** Mimics real life: lifted objects cast larger, softer shadows.
  **Applies to** all. **Check** shadow blur radius increases monotonically with layer level (card < dropdown < modal). **Source** (p.558)

- **RULE** Treat X, Y and Blur as the three values that matter most; spread is a refinement. A negative spread makes the shadow look cast by a smaller piece (e.g. Y 20, Blur 0, Spread -10 shows a thinner crescent than Spread 0).
  **Why** These three drive the look and are the first to tune.
  **Applies to** all. **Check** visual. **Source** (p.560)

- **RULE** Blur 0 gives a hard edge; N blur spreads N pixels in and out from the shadow's edge, and higher values give larger and more diffuse shadows.
  **Why** Definition of the blur property.
  **Applies to** all. **Check** `box-shadow` blur-radius value. **Source** (p.559)

- **RULE** Hard offset-only shadows (blur 0) are an available style: offsets of 2 in each axis produce an edge/outline-like shadow on one or two sides; the six combinations are (0,2), (2,0), (2,2), (0,-2), (-2,0), (-2,-2). Multiple shadows can be stacked on one object, e.g. three hard shadows at Y 4, 8 and 12 in progressively darker tones (blue, light blue, orange in the figure) for a layered, extruded look.
  **Why** "Very intriguing effects" via stacking.
  **Applies to** landing page | mobile. **Check** `box-shadow` list with several layers. **Source** (p.561)

### Types

- **RULE** Default to outer (drop) shadows for elevation; a standard one uses an offset (x, y or both from the centre), a blur and an opacity.
  **Why** It is the most frequent UI effect and matches stacked layers.
  **Applies to** all. **Check** `box-shadow` without `inset`. **Source** (p.559-560)

- **RULE** Use inner shadows only for form inputs (fields, checkboxes, radio buttons) and for extruded objects in neumorphism, and sparingly.
  **Why** Most interfaces are layers piled on one another, so an outer shadow makes sense; an inner shadow breaks the structure of the stack by suggesting a hole.
  **Applies to** forms | SaaS app UI. **Check** `box-shadow: inset` appears only on input-like components. **Source** (p.560-562)

### Jobs shadows do

- **RULE** Use shadows to show interactivity: on hover a button gets a shadow to stand out from the background; on press/tap the shadow gets smaller (the element "pushes down"), the way a real button's height falls and its shadow shrinks.
  **Why** Feedback that the action was carried out.
  **Applies to** all. **Check** `:hover` has a larger/stronger shadow; `:active` has a smaller shadow than default state. **Source** (p.564-565)

- **RULE** When stacking components on top of each other (flat style excepted), separate them with shadows on the z-axis: dropdowns and modals appear "above" page content while remaining distinct from inputs under them.
  **Why** Layering by depth.
  **Applies to** all. **Check** overlays (menu, popover, modal) have a shadow; page layer doesn't. **Source** (p.565)

- **RULE** Use stacking order plus shadow to set visual hierarchy: decide what the user should focus on first and put it on top, with a shadow per layer; especially for menus appearing above content in mobile apps, and for items you want engaged with such as cookie or privacy notices.
  **Why** Users attend to objects in the order depth presents them.
  **Applies to** mobile | landing page. **Check** the topmost layer has the strongest shadow. **Source** (p.566)

### Style: making shadows look good

- **RULE** Never ship the design tool's default shadow (Sketch, Figma, Adobe XD alike); always alter it.
  **Why** Default presets look dated; custom ones look "sleek and contemporary".
  **Applies to** all. **Check** no `box-shadow: 0 2px 4px rgba(0,0,0,.5)`-style defaults (the book's "bad" example: X0, Y2, Blur 4, 50% opacity). **Source** (p.571)

- **RULE** Make shadows softer: opacity 10-30% and blur 16px-40px. Book example (good): X 0, Y 8, Blur 24, 25% opacity; (bad): X 0, Y 2, Blur 4, 50% opacity.
  **Why** Gentle shadows are generally the most attractive.
  **Applies to** all. **Check** parse `box-shadow`: alpha in [0.10, 0.30], blur in [16px, 40px] for card/overlay elevations. **Source** (p.572)

- **RULE** Consider building the shadow as a separate layer with a blur effect instead of a standard shadow style when you want to stand out; this gives more control over the shadow's position and size.
  **Why** Layer shadow lets you offset/scale freely beyond the shadow-style limits.
  **Applies to** landing page | mobile. **Check** visual. **Source** (p.572-573)

- **RULE** Do not use pure grey shadows (except in a pure black-white theme); tint the shadow with the neutral colour of the UI's tone. Book example on a slate card: X 0, Y 16, Blur 40, #758EFE at 20% opacity.
  **Why** Real-world shadows always carry a faint colour.
  **Applies to** all. **Check** shadow colour has chroma > 0 (not r=g=b) unless the theme is pure black/white. **Source** (p.573)

- **RULE** Take shadow colour from the object's material: semi-transparent real-world objects transfer their colour to their shadow, so use the object's own colour tones, including a gradient shadow/fill (example: #758EFE 100% to #495A7C 100%) to convey material.
  **Why** Makes the object look physical and "brand new".
  **Applies to** landing page | mobile. **Check** visual. **Source** (p.573-574)

- **RULE** Observe real materials and light: look at the hues, blurring and angles of the shadows they cast, and borrow them. Example: neumorphic pair Light shadow X -4, Y -4, Blur 10, 13% and Dark shadow X 4, Y 4, Blur 10, 10%.
  **Why** Exceptional results come from observation, not defaults.
  **Applies to** all. **Check** visual. **Source** (p.574)

- **RULE** A thin dark shadow can be swapped for a coloured diffuse one to make an interface more entertaining; experiment with settings to see how they change the mood.
  **Why** Shadow colour/softness sets tone.
  **Applies to** landing page | mobile. **Check** visual. **Source** (p.571)

### Neumorphism

- **RULE** If using neumorphism: background colour must equal element colour; apply a light shadow at upper-left and a dark shadow at lower-right (light X -4, Y -4, Blur 10, Opacity 13%; dark X 4, Y 4, Blur 10, Opacity 10%), so the light source reads as upper-left and elements seem to emerge from the surface instead of floating.
  **Why** Stacked shadows with negative X/Y create the extruded look.
  **Applies to** mobile | SaaS app UI (experimental). **Check** two `box-shadow` layers with mirrored offsets and background-color equals element background-color. **Source** (p.563-564)

### Blurs

- **RULE** Choose the right blur: background blur softens only what is behind the element (the element's own edge stays razor-sharp); layer blur blurs the whole element, including its edges and its background. Use layer blur to make a background element disappear so attention goes elsewhere, or as a decoration.
  **Why** Different effects (frosted panel vs soft/vanishing object).
  **Applies to** all. **Check** CSS `backdrop-filter: blur()` (background blur) vs `filter: blur()` (layer blur). **Source** (p.567-568)

- **RULE** Use blur to focus attention: when a modal or mobile navigation opens, blur the existing background so attention goes to the opened item (iOS Control Center is the reference: the opened item is sharp, the background is blurred).
  **Why** The most common use of blur in interface design.
  **Applies to** mobile | SaaS app UI. **Check** modal/sheet overlay has `backdrop-filter`. **Source** (p.568-569)

- **RULE** For text over images or video use either a hard background (good for subtitles) or a blurred background; a blur keeps the aesthetic without compromising accessibility, but the images behind the blur must share a similar colour palette, since text may be invisible on a blurred very dark or very light background.
  **Why** Blur reduces detail noise under text but not luminance extremes.
  **Applies to** landing page | mobile. **Check** contrast of text vs average of blurred region (4.5:1 body text is an [engine note]). **Source** (p.569-570)

- **RULE** Blur background images in hero sections so imagery doesn't steal focus from graphic elements laid on top; also valid in animations and abstract elements.
  **Why** Decorative but must not damage usability.
  **Applies to** landing page. **Check** visual. **Source** (p.570)

## 3. Numbers & scales

Values taken from the figures (X / Y / Blur / colour / opacity):

| Example | X | Y | Blur | Spread | Colour | Opacity | Page |
|---|---|---|---|---|---|---|---|
| Intro outer shadow | 5 | 6 | 15 | n/a | #000000 | 25% | 557 |
| Intro inner shadow | -7 | -8 | 13 | n/a | #FFFFFF | 25% | 557 |
| Z-axis outer shadow (isometric card) | 0 | 11 | 13 | n/a | #495A7C | 42% | 558 |
| Drop shadow, spread demo (left) | 0 | 20 | 0 | -10 | n/a | n/a | 560 |
| Drop shadow, spread demo (right) | 0 | 20 | 0 | 0 | n/a | n/a | 560 |
| Hard offsets (edge) | 0,2 / 2,0 / 2,2 / 0,-2 / -2,0 / -2,-2 | | 0 | n/a | periwinkle | n/a | 561 |
| Stacked shadows | 0 | 4, 8, 12 | 0 | n/a | blue, light blue, orange | n/a | 561 |
| Neumorphic light shadow | -4 | -4 | 10 | n/a | white-ish | 13% | 564, 574 |
| Neumorphic dark shadow | 4 | 4 | 10 | n/a | black | 10% | 564, 574 |
| BAD default | 0 | 2 | 4 | n/a | #FFFFFF (sic) | 50% | 572 |
| GOOD soft | 0 | 8 | 24 | n/a | #FFFFFF (sic) | 25% | 572 |
| Tinted shadow | 0 | 16 | 40 | n/a | #758EFE | 20% | 573 |
| Gradient fill / material | n/a | n/a | n/a | n/a | #758EFE to #495A7C | 100% / 100% | 574 |

Recommended ranges (p.572): opacity 10-30%; blur 16px-40px.

Feature sizes referenced: card colour in figures is slate #495A7C-like on a #758EFE-like accent (both appear in labels); the three-shadow stack uses +4 px steps.

Vocabulary: Z-axis = depth; X = horizontal offset, Y = vertical offset (the book's wording swaps them: "move up or down with Y and X keys, respectively"); positive spread expands; negative spread contracts (the book writes the negative range "from -1 to infinity", should read negative infinity to -1).

Other fixed items: 6 tips for stunning shadows (p.571-574); 2 blur types for UI (background, layer) (p.567-568); 3 jobs of shadow (interactivity, depth, hierarchy) (p.564-566); gaussian, motion, radial blur types are mentioned but not taught (p.567).

## 4. Dos and Don'ts

- Intro figure (p.557): two identical slate rounded rectangles with a periwinkle circle. Left has an outer drop shadow (5, 6, blur 15, black 25%); right has an inner shadow (-7, -8, blur 13, white 25%) that reads as a light inset edge on the top-left. Spec chips sit under each.
- Z-axis figure (p.558): isometric slate card with a soft, moderate shadow below on a light background, with X/Y/Z axes arrows and the spec chip (0, 11, 13, #495A7C, 42%).
- Spread demo (p.560): two circles, Y 20, Blur 0. Spread -10 leaves only a slim lilac crescent below the circle; Spread 0 shows a fuller lilac crescent with the same offset. Text says the left is blurred and the right un-blurred, but both labels say Blur = 0 (see section 7).
- Hard offset tiles (p.561): six slate rounded rectangles, each with a thin periwinkle edge appearing only on the sides implied by the offset.
- Stacked shadows (p.561): a slate card with three thin coloured bands under it (blue, light blue, orange) making a layered edge.
- Natural vs hole (p.562): left, concentric squares of lighter and lighter tone with outer shadows read as a natural layer stack rising toward the viewer; right, the same with inner shadows reads as a hole sunk into the stack. DON'T use inner shadows on stack layers; DO use outer shadows.
- Neumorphism (p.564): slate background with square, circle, triangle and pentagon in the same slate; each has a faint highlight upper-left and a faint shadow lower-right, with sun icons labelled "Light Shadow" (-4, -4, 10, 13%) and "Dark Shadow" (4, 4, 10, 10%).
- Depth diagram (p.566): exploded phone layers labelled System Status Bar, Background, Floating Button, Content Card, System Navigation; shows elevation as separate planes (flat view on the left, exploded isometric in the middle, labelled section view on the right).
- Background blur example (p.568): translucent weather panel (51 degrees, forecast table, red-brown tones) overlapping a lavender rounded bar with a soft large shadow underneath. Intended to show the background-blur concept; the exact blur effect is hard to judge on the printed page.
- iOS Control Center (p.569): left, Control Center page over a blurred colourful wallpaper; right, expanded connectivity card (Airplane Mode, Cellular Data, Wi-Fi, Bluetooth, AirDrop, Personal Hotspot) with the background strongly blurred; only the opened card is sharp.
- Credit card (p.570): frosted-glass credit card (VISA, 7648 3847 9809 8947, 08/36, CVV 098) over two violet-blue circles on a slate panel; the circles show through the glass blurred, with a thin light border and subtle gradient on the card.
- Bad vs good shadow (p.572): left card, red x badge, tight 2/4 shadow at 50%; right card, green check badge, 8/24 at 25%. The good one is visibly more diffuse and subtle.
- Shadow as style vs layer (p.573): two identical slate squares labelled "Shadow As Style" and "Shadow As Layer"; the layer version has a slightly wider, softer, more controllable glow.
- Tinted shadow (p.573): slate rounded square with a faint periwinkle glow under it (#758EFE at 20%, Y 16, Blur 40).
- Material gradient (p.574): rounded square filled with #758EFE to #495A7C diagonal, spec chip with both stops at 100%.

## 5. Exceptions & judgement calls

- The chapter treats blur direction and spread loosely. Conflicts: "negative spread pulls an element's edge spread inward" vs "inner shadows are not common"; they are different features (spread vs inset).
- Neumorphism is presented neutrally, with no accessibility caveat (low contrast against its own background, subtle edges). (opinion: book is positive). [engine note] it fails contrast guidelines for control boundaries; treat as decorative only.
- Pure grey shadows are called "never good" except in a pure black-white theme (p.573); but the book's own intro figure uses a pure black 25% shadow (p.557). The "never" is an emphasis, not a hard law.
- Inner shadow rule says "only form inputs and neumorphism", yet p.557's intro shows an inner shadow on a general card, as a demonstration of the control, not recommended usage.
- [engine note] The 10-30% opacity and 16-40px blur are the chapter's most checkable numbers; they apply to ambient, floating-card-style shadows. Small controls (buttons, inputs) typically want smaller blur (4-12px); the book's own z-axis example uses blur 13.
- [engine note] Pressed state: shrink shadow (and translate down 1-2px) as the book describes; and check that shadow animations animate `transform`/`opacity` of a pseudo-element rather than `box-shadow` for performance.
- [engine note] Backdrop blur costs GPU on large areas; use sparingly on mobile.

## 6. Figures worth keeping

- p.557: outer vs inner shadow with parameter chips.
- p.558: z-axis isometric card with axes and spec chip.
- p.560: spread demo (Y 20, Blur 0, spread -10 vs 0).
- p.561: hard-offset tiles and stacked shadows.
- p.562: natural layer stack vs "a hole in the stack" (inner shadow misuse).
- p.564: neumorphism with light/dark shadow values and sun icons.
- p.566: layered depth diagram of a mobile screen (flat, exploded, labelled).
- p.568: weather panel as background-blur illustration.
- p.569: iOS Control Center, background blur to focus attention.
- p.570: frosted glass credit card over blobs.
- p.572: bad vs good softness comparison with exact values.
- p.573: shadow as style vs as layer, and tinted shadow values.
- p.574: material gradient spec and neumorphic light/dark pair.

Copied to /Users/augustas/dev/design-engine/examples/ui-pedia/shadows-and-blurs/.

## 7. Open questions

- p.557: shadow description starts "A line-thin shadow can be as vast and dispersed as a cloud" (sic); no rule content beyond the listed shadow options.
- p.559-560: text says the shadow is "blurred on the left, and left un-blurred on the right", but both labels read Blur = 0 and the difference is Spread -10 vs 0. The figure/label should be trusted.
- p.560: "While X and Y can also be negative numbers, the latter must be a number greater than 0" is garbled; it probably means blur must be greater than 0. Not used as a rule.
- p.561: text says "three shadows that are each 3 points down", labels read Y 4, 8 and 12; trust the labels.
- p.561: colour tones of the stacked bands are read from the image (blue, light blue, orange); no hex given.
- p.564: text "negative X and Y values shown below" refers to the light shadow only; the dark shadow is positive.
- p.558 text "moved with the Y and X keys up or down, respectively" appears reversed (should be X horizontal, Y vertical).
- p.572: both the BAD and GOOD chips read #FFFFFF as shadow colour; a white shadow would be invisible on the light page, and the rendered figures show a grey/black shadow. Probably a labelling error (likely #000000). Colour value unreliable; the opacity and blur values are the usable part.
- p.568: weather-panel figure; I could not tell from the print how much blur is applied to the lavender bar behind; description above is partly inferred.
- p.567 notes gaussian, motion, radial blur types exist online; not taught.
- p.571 "6 simple steps" are numbered 1-6 across p.571-574; all captured.
- Pages with little or no rule content: p.565 (interactivity continued and depth; covered), p.567 (blur intro), p.571 (opening paragraph; covered under mood rule).
