---
source: ui-pedia
chapter: Gradients
pages: 536-556
topic_tags: [gradients, color, depth, emphasis, branding, linear, radial, reflected, overlays, color-theory]
status: studied
---

# Gradients

Chapter of "UI Pedia" (Design Basics). Mostly qualitative and trend-driven (2018 gradient revival). It gives no numeric stops, angles or opacities, so the rules below are the book's guidance in its own terms, with every example described from the figures. Where the prose and the figure disagree it is flagged in section 7.

## 1. Core ideas

1. A gradient is a gradual transition from one colour to another (or several); it effectively creates a "brand-new hue", adds depth/dimension and makes a product stand out (p.537).
2. Gradients can blend similar colours (shades of blue, mild orange to dark red) or opposed ones (purple and red, blue and yellow) (p.538).
3. They can be the overt centrepiece or an understated supporting element (p.538).
4. Why they work again (since 2018, e.g. Instagram): they are captivating, intense, and help brands stand out in a flood of content; modern ones feel "more upscale and polished", with bright vivid hues and a clean aesthetic, not retro (p.539-540).
5. Three fundamental types are taught: linear, radial, reflected (p.541-543).
6. Gradients do jobs, not just decoration: direct attention (the eye flows bright to dark), elevate a simple concept, and create depth via light and shadow (p.543-544).
7. Shadows and highlights are themselves gradients: "there is no such thing as a completely 'flat' colour" (p.544).
8. Usable across logos, packaging, web, apps, print (p.545-550).
9. Five-plus working tips: choose the right colours, respect colour theory and brand, use sparingly, spend time smoothing transitions, know your audience (p.550-555).
10. The tone of the gradient must match the audience and brand (Aston Martin vs Honda Civic) (p.553).

## 2. Rules

- **RULE** Build a gradient from colours that work together by colour theory: complementary (opposite on the wheel), analogous (neighbours), triadic, or other theory-sound combinations; the mash-gradient hero card (p.536) instead mixes colours "far away from each other on the colour wheel", so distance on the wheel is a style choice, not a rule, provided the result looks designed.
  **Why** A badly matched gradient looks "unprofessional and uninspired" (p.553).
  **Applies to** all. **Check** visual; hue difference between stops (compute in OKLCH/HSL) and review. **Source** (p.536, p.550-551, p.553)

- **RULE** Choose gradient hues for the emotion you want: gentle green to blue for peace and tranquillity; striking red or orange when you want consumers ready to buy; bold colours for an energising feel, pastels for a peaceful one.
  **Why** Colour psychology is "a strong tool" in the gradient.
  **Applies to** landing page | mobile | SaaS app UI. **Check** visual / compare chosen hues to the brief's intended emotion. **Source** (p.548-549, p.551)

- **RULE** Gradient colours must be compatible with the existing brand palette. Example of failure: a red-and-blue brand with a lime-green-to-bright-yellow gradient "is definitely not going to look great".
  **Why** Gradient is an extension of the brand, not a separate palette.
  **Applies to** all. **Check** each gradient stop is within or harmonious with brand tokens; flag stops whose hue is >60 degrees from every brand colour (threshold is an [engine note]). **Source** (p.552)

- **RULE** Match gradient character to the audience: vibrant pink-and-yellow is "perhaps not the ideal choice" for established entrepreneurs; yellows and blues read youthful (Honda Civic, millennials/young professionals); a radial greyscale gradient (white to black from the rear of the car) reads luxury and mature (Aston Martin).
  **Why** Gradient style signals audience and tone (loud vs subtle).
  **Applies to** landing page | mobile. **Check** visual vs brief. **Source** (p.553-555)

- **RULE** Use gradients sparingly: "Less is (possibly) more." Don't complicate the design, don't go too far.
  **Why** Versatility is not a mandate; overuse becomes the trend instead of the design.
  **Applies to** all. **Check** count gradient-filled surfaces per viewport; visual. **Source** (p.536, p.554)

- **RULE** A gradient may serve as: overlay, depth for a flat design, interest for a single-hue backdrop, texture for a backdrop, a way to give a photo "new life", or an accent on a UI element. Pick the role deliberately.
  **Why** Each role is a distinct hierarchy tool.
  **Applies to** all. **Check** visual. **Source** (p.539, p.554)

- **RULE** Use brightness change in a gradient to move the eye: "the eye flows from bright to dark naturally", so put the bright end where attention should start/land and the dark end toward the exit.
  **Why** Directs attention between areas without text or scroll tricks.
  **Applies to** landing page. **Check** visual: luminance of gradient stops ordered toward the focal element. **Source** (p.543)

- **RULE** Elevate simple flat concepts (logo, icon, plain card) with a multi-stop gradient while keeping the original shape simple. Example: Instagram logo is just a circle in a square inside a bigger square; the pink-purple-yellow gradient supplies the personality.
  **Why** Gradient adds personality without adding structure.
  **Applies to** landing page | mobile. **Check** visual. **Source** (p.543-544)

- **RULE** Model light and shadow as gradients to give depth: even a single colour can have depth by correctly manipulating light and shadow.
  **Why** Flat UI colour is a trend that "is progressively losing favor"; depth via shading is the alternative.
  **Applies to** all. **Check** visual. **Source** (p.544, p.556)

- **RULE** On text-heavy print/web pieces, a soft-colour gradient background keeps text readable ("will make your text stand out"); a gradient accent in artwork or a gradient logo are other safe uses.
  **Why** A soft, low-contrast-variation background protects legibility.
  **Applies to** landing page. **Check** contrast ratio of text against the lightest and darkest gradient stops under the text (min 4.5:1 is an [engine note]). **Source** (p.549-550)

- **RULE** Use a gradient with striking colours on design elements (buttons, cards, accents) for a significant effect without overpowering; use gentle hues for a delicate full-page background; use a gradient picture overlay for a colourful, jazzy composition.
  **Why** Scale the gradient's intensity to the surface it covers.
  **Applies to** landing page | SaaS app UI. **Check** visual. **Source** (p.547-548)

- **RULE** For packaging-style hero art, make the gradient complement the brand: bright, risky neon overlays for a new extreme-sports product; single-colour gradient or pastel palette for a delicate understated product (e.g. face wash). "Bold or understated" are equal if authentic to brand and product.
  **Why** Authenticity beats loudness.
  **Applies to** landing page. **Check** visual. **Source** (p.546-547)

- **RULE** Spend time smoothing the gradient: expect not to get it right first try; adjust colour stops, add/remove gradient stages, change the palette.
  **Why** Banding, dull midpoints and harsh transitions are fixed by iteration.
  **Applies to** all. **Check** visual at 100% zoom; no visible banding/muddy middle. **Source** (p.554)

- **RULE** Long transitions are not always best: for shading tiny parts, short (quick) transitions emphasise motion more effectively. Try three-step gradients, which may work well with subdued tones.
  **Why** Transition length controls perceived form/motion; three stops add a mid-tone without chaos.
  **Applies to** all. **Check** visual; count stops. **Source** (p.554-555)

- **RULE** Test colour combinations before committing; the book suggests a Codepen-style colour/gradient experimenting tool and "testing your concepts before moving on to final designs".
  **Why** Cheap iteration avoids a weak final gradient.
  **Applies to** all. **Check** n/a (process). **Source** (p.553)

- **RULE** Use one of the three fundamental gradient types deliberately: linear (straight axis, one colour fading into another, horizontal, vertical or diagonal; builds momentum, e.g. Apple Music logo ring pink to blue on a diagonal), radial (starts at a point and fans out, or the reverse; frequent in logos; good for structurally or chromatically simple designs), reflected (a conventional gradient mirrored across an axis so it seems enclosed; middle has a dash of a different shade, same colour at start and end; used by premium brands such as the Audi emblem).
  **Why** The type determines the visual effect: direction, focal glow, or enclosure.
  **Applies to** all. **Check** CSS `linear-gradient` / `radial-gradient`; reflected = symmetrical stops (A, B, A). **Source** (p.541-543)

### Audit additions (audit 2026-10-15)

- **RULE** For a gradient logo, build it from the brand palette and choose intensity by intent: strong colours for an overt impression, softer hues for a subdued one. Keep the gradient in the mark and set the wordmark in a flat solid colour (the MASHEL example: violet-to-lavender gradient glyph over a solid dark-slate wordmark).
  **Why** The logo is "the public face of your business", so it is the most visible place to carry the brand palette; a solid wordmark keeps the name legible.
  **Applies to** landing page (brand). **Check** visual: gradient only on the mark; wordmark is one solid fill. **Source** (p.545) (audit 2026-10-15)

- **RULE** For UI surfaces (cards, buttons, panels), put the light end of a gradient at the top or top-left (or the centre, for radial) and the dark end at the bottom or bottom-right. All of the book's own type-demonstration swatches follow this: linear light periwinkle top-left to dark slate bottom-right (p.538, p.540, p.541), radial light centre to dark edges (p.540, p.542), reflected light top to dark bottom (p.542). Brand marks are free to differ: the Instagram logo figure is warmest and lightest at the bottom-left (orange) and darkest at the top (purple) (p.539).
  **Why** It matches a light source from above, which is how the chapter frames gradients as light and shadow giving depth (p.544). The orientation is a consistent pattern in the figures; the text does not state it.
  **Applies to** all. **Check** for each `linear-gradient`, the first (top/top-left) stop has the higher OKLCH L; radial centre stop is lightest. **Source** (p.538, p.540-542, p.544) (audit 2026-10-15)

- **RULE** In product UI, confine gradients to small accent surfaces (content cards, chart lines, one upgrade CTA) and keep the shell flat. The p.548 dashboard uses a solid dark-navy sidebar and a flat white canvas; gradients appear only on three illustrated "Word Sets" cards, the two chart lines (cyan and magenta) and the "Try now" upgrade button.
  **Why** Striking gradients on design elements make "a significant effect without being overpowering visually" (p.547).
  **Applies to** SaaS app UI. **Check** sidebar, header and page background have no gradient fill; count gradient surfaces per screen. **Source** (p.547-548) (audit 2026-10-15)

- **RULE** On a full-bleed gradient page background, keep what sits on it calm: a translucent frosted card with a faint lighter edge, outlined inputs, and a solid (non-gradient) primary button. The p.547 login keeps the "Login" button solid dark slate on a teal-green-yellow diagonal gradient.
  **Why** One gradient surface per composition keeps the controls readable and the gradient as the mood layer.
  **Applies to** landing page | forms. **Check** the CTA on a gradient background has a solid fill; card uses translucency, not a second gradient. **Source** (p.547) (audit 2026-10-15)

## 3. Numbers & scales

The chapter has no measured values (no angles, stop positions, opacities, hex values for gradients). The only quantities:

| Item | Value | Source |
|---|---|---|
| Fundamental gradient types taught | 3 (linear, radial, reflected) | p.541 |
| "Dozens" of gradient types exist | not enumerated | p.541 |
| Gradient revival | 2018 | p.539 |
| Triadic / analogous | analogous = "three colours next to each other"; triadic = three colours equally spaced on the wheel | p.551 |
| Suggested stop count for subdued tones | three-step | p.555 |
| Tips numbered | 1 colours, 2 colour choices, 3 wisely, 4 smoothing, 5 audience, 5(sic) fun | p.550-556 |

Figure colour observations (approximate, from the images, not stated in text):
- p.538 swatch: diagonal periwinkle-blue (#758EFE-like, matches the #758EFE used on p.573) at top-left, through a teal-blue, to dark slate (#495A7C, matches p.573) bottom-right.
- p.573 gradient spec card: #758EFE 100% opacity to #495A7C 100% opacity (this appears in the shadows chapter but is the same gradient as the Linear example).

- p.538 swatch is a three-stop diagonal: periwinkle (top-left), a lighter, more saturated sky/teal-blue band placed nearer the light end, dark slate (bottom-right). The middle stop is not a muddy average of the two ends (figure observation, positions approximate) (audit 2026-10-15)
- p.547 login background: diagonal from dark teal-blue (bottom-left) through green (middle) to warm yellow (top-right) (audit 2026-10-15)
- Gradient types figure p.540 has 4 swatches in this order: linear, radial, a near-flat mid-blue (reflected or flat mid-tone), flat dark slate reference (audit 2026-10-15)

## 4. Dos and Don'ts

- DO (p.536): "Mash gradient" hero card: pale cyan/white at top-left blending into saturated blue with violet/lilac glow at lower-right, soft film-grain texture, outlined display title; caption "Mix colors that are far away from each other on the color wheel", tagged "092". Shows an organic multi-blob (mesh) style rather than a straight linear fade.
- DO (p.537): blurry bar mixing grey-violet, rose, green and blue light blobs; "make a brand-new hue".
- DO (p.538): linear diagonal blue gradient card with rounded corners as the plain illustration of "similar colours".
- DO (p.539): Instagram logo, orange (bottom-left) to magenta-pink to purple (top), white glyph on top. Prose says pink to purple to yellow.
- DO (p.540): row of four rounded squares: linear (top-left light periwinkle to bottom-right dark slate), radial (light centre to dark edges), a nearly flat mid-blue swatch (probably the reflected type, very subtle), and a flat dark slate square for comparison.
- DO (p.541): Linear gradient card with centred white label; same two colours as above diagonal.
- DO (p.542): Radial card (periwinkle glow in centre, dark slate edges). Reflected card: periwinkle top, lighter lavender-grey band in the middle, dark slate bottom (the mid band is "a dash of a different shade").
- DO (p.545): logo comparison: flat Pixsel "P" mark (periwinkle square, slate and grey blocks) versus the "MASHEL" mark with a violet-to-lavender gradient glyph and a flat slate wordmark. Gradient in the glyph, solid in the text.
- DO (p.546): packaging: purple-to-pink glossy cosmetic dropper bottle; amber-to-clear gold bottle; green matcha bag (gradient lime-to-white); blue gradient snack bags. Gradient makes packaging "pop off the shelf".
- DO (p.547): login screen on a full-bleed gradient (blue bottom-left, green middle, warm yellow top-right) with a translucent frosted glass form card (labels, fields, Remember me, Login button in slate). Left: "Welcome To Pixselacademy" in white. Shows gradient as page background with a glass card on top.
- DO (p.548): dashboard: dark navy sidebar, white content, purple-to-blue gradient cards with illustrations ("Word Sets"), a two-colour gradient line chart (cyan to magenta); a "Try now" gradient button. App screens: shoe-store tiles with distinct bright gradient fills (cyan, red, yellow, pink) and a saturated blue hero.
- DO (p.549): pink-lilac-cyan mesh gradients as full-screen app background (welcome / sign-in; rocket onboarding page with a circular gradient badge). Print: dark teal business cards with a gold/bronze gradient foil logo and a hexagon badge.
- DO (p.550): magazine mock-up with a blue-to-light-blue gradient cover and bold white "MOCK-UP" type.
- DO (p.552): colour wheel figure for choosing complementary/analogous/triadic stops; labelled "SUBTRACTIVE" alongside overlapping black/grey circles (subtractive colour mixing icon).
- DON'T: lime green plus bright yellow gradient on a red-and-blue brand (p.552).
- DON'T: vibrant pink and yellow gradient for established-entrepreneur audiences (p.555).
- DON'T: gradients "used improperly" look unprofessional and uninspired (p.553).
- DON'T: complicate the design, go too far (p.554).

- **Do** (p.548 apps) Shoe-store grid: each product tile gets its own vivid gradient tied to the shoe's colour name label (Black on blue-cyan, Red on cyan, Blue on yellow, White on pink-violet); the detail screen uses a solid saturated blue hero with a white bottom sheet and a solid blue "Add to cart" button. Gradient as per-item colour coding; solid colour on the decision screen. (audit 2026-10-15)
- **Do** (p.536) the mash gradient carries visible fine grain/noise over the blend and uses an outline (stroke-only) display title so the type does not compete with the colour field. (audit 2026-10-15)
- **Do** (p.549 print) dark teal card with a gold-to-bronze gradient used only on the logo mark and a hexagon badge: gradient as a metallic accent on an otherwise flat dark surface. (audit 2026-10-15)

## 5. Exceptions & judgement calls

- The chapter is trend writing: "less is more" (p.536, p.554) sits uneasily next to "go crazy since the options are unlimited" (p.550) and "make it fun, don't take it too seriously" (p.555-556). The honest read: the mandatory rules are colour harmony, brand fit, audience fit and restraint; the rest is permission to experiment.
- "Mix colours far apart on the colour wheel" (p.536 mash gradient) versus "choose complementary/analogous/triadic" (p.550-551): both appear. Distant hues work in mesh/blob gradients with soft blends; direct linear fades between distant hues risk a muddy midpoint. [engine note]
- Reflected gradients are tied to "premium businesses" (Audi emblem), so they read formal; radial greyscale = luxury, bright radial/linear yellows-blues = youthful (p.542-543, p.553). Use that mapping as a tone dial, not a law.
- A gradient overlay on photography can keep imagery from overpowering text, but the book does not give an opacity; see Shadows and Blurs chapter for readability rules.
- [engine note] Banding and muddy midpoints in sRGB gradients between complementary hues are best avoided with an intermediate stop or interpolation in OKLCH; the book only says "add or remove gradient stages".
- [engine note] Overuse test: the book's "less is more" can be mechanised as a cap on distinct gradient surfaces per screen and a ban on stacking gradient on gradient; the numeric caps are engine choices, not the book's.

## 6. Figures worth keeping

- p.537: blurry multi-hue bar, "gradient makes a new hue".
- p.540: four swatches: linear, radial, reflected, flat comparison.
- p.541: linear gradient card with label.
- p.542: radial and reflected gradient cards with label (best direct comparison of the three types).
- p.547: login page on gradient with frosted glass form card.
- p.548: dashboard and app tiles with gradient accents (UI usage in context).
- p.552: colour wheel and subtractive-mix icon (colour theory reference).

Copied to examples/ui-pedia/gradients/.

## 7. Open questions

- p.536: no rule content beyond the "mash gradient" figure and an intro. The sentence "Less is more is one of the UI philosophies that we uphold at One thing" is garbled by the original text (company name missing).
- p.538: the figure caption "otherwise flat fox graphic" refers to an image not present on the page.
- p.539 prose says the Instagram logo goes "pink to purple to yellow"; the figure shows orange at the bottom-left, magenta, purple at top. Minor mismatch, figure is more reliable.
- p.551: "a gradient that fades from light blue to dark blue (three colours spaced equally apart on the colour wheel)" is internally inconsistent (light-to-dark blue is monochromatic, not triadic). Probably a editing slip; do not use as a triadic example.
- p.550-551 OCR errors fixed from the image: "andlogous" = analogous, "tridic" = triadic, "peace and tranquilly" is the book's wording.
- p.553: the Codepen colour/gradient tool is referred to but not named by URL.
- p.555: two tips are numbered "5" (Know your audience; Make it fun).
- p.556: conclusion sentence "unlike other throwbacks from the." is truncated in the source.
- Pages with little or no extractable rule content: p.536 and p.537 (intro and definitions only, restated in section 1), p.538-540 (descriptive and trend history, no rules beyond section 1), p.544 (logo/light-and-shadow prose, covered), p.545-550 (use-case showcases, covered in rules and section 4), p.556 (conclusion; restates "don't be scared of gradients", gradients are one more tool, shading/highlights give dimension as flat UI declines).
- The book gives no numeric guidance for stops, angles, opacity or overlay strength.

- (audit 2026-10-15) Reflected gradient text vs figure: p.542-543 text says a reflected gradient has "the same colour at its beginning and conclusion" with a different shade in the middle, but the p.542 figure runs periwinkle (top) -> lavender-grey band (middle) -> dark slate (bottom), so its two ends differ. The rule above keeps the text definition (A, B, A); the figure is not a clean example of it.
- (audit 2026-10-15) Linear text vs figure: p.541 text says the classic linear gradient runs "horizontally or vertically", while its own figure and the Apple Music example are diagonal (top-left to bottom-right).
- (audit 2026-10-15) Pages viewed as images: p.536, 537, 538, 539, 540, 541, 542, 545, 546, 547, 548, 549, 550, 552. Text-only (prose, no figures): p.543, 544, 551, 553, 554, 555, 556.
