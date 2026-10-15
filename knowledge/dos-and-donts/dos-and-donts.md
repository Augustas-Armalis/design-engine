---
source: dos-and-donts
chapter: 101 Dos & Don'ts of UI Design (pixsel academy), all tips
pages: 1-106
topic_tags: [typography, microcopy, color, contrast, dark-mode, elevation, shadow, layout, spacing, grid, buttons, cta, affordance, forms, navigation, cards, lists, icons, imagery, feedback, loading, states, ux-laws]
status: studied
---

# 101 Dos & Don'ts of UI Design

Numbering: Tip N sits on PDF page N+4 (Tip 1 = p.5 ... Tip 101 = p.105). Printed page = PDF page - 1. Every rule below is tagged `[T<n>]` with the book's tip number. Every page image 1-106 was opened. The book is mostly paired good/bad mini-mockups with one caption each; where a measurement is given on the page it is quoted, otherwise the rule is described from what the picture shows. `(opinion)` = the book states a claim with no evidence. `[engine note]` = my own judgement, not on the page.

## 1. Core ideas

1. **Hierarchy comes from contrast of treatment, not from more decoration.** One primary action is filled in the brand colour; secondary actions get outline or plain text; inactive nav is softened so the active item pops (p.34, p.87, p.96, p.38).
2. **Consistency is the cheapest quality signal.** Same icon style, same stroke weight, same corner shape, same typeface, same illustration palette, same gaps, same shadow direction. Any "strange difference" between elements reads as error (p.11, p.27, p.35, p.70, p.75, p.65, p.71).
3. **Space does the separating job that lines and boxes do badly.** More padding and margin, extra gap between groups instead of divider lines, tonal row/section fills instead of borders (p.24, p.25, p.26, p.45, p.60, p.93, p.97).
4. **Dark mode is its own design, not an inversion.** Desaturated tones (steps 200-500), a separate palette from light mode, no pure black, elevation shown by lighter greys instead of shadows (p.6, p.7, p.19, p.81).
5. **Forms are won by clarity and shortness.** Fewer fields, one column, visible labels (never placeholder-as-label), boxed fields, grouped sections with titles, a visible focus state, masks for phone/date, rules shown inline not in tooltips (p.18, p.63, p.78, p.68, p.94, p.95, p.42, p.67).
6. **State must always be visible.** Progress in a flow, where/why an error is, selected items, active nav, loading structure, offline recovery (p.13, p.14, p.56, p.96, p.66, p.64).
7. **Clickable must look clickable and be easy to hit.** Colour/underline or a button for text actions, an action button on tappable cards, hit area covers label + icon + padding, CTA big and in thumb reach (p.69, p.37, p.52, p.15).
8. **Cognitive-load laws are the book's explicit rationale.** Fitts (big, near CTA), Hick (fewer options, "Other"), Serial Position (key nav at the ends), Gutenberg Z-path (CTA at the end), 2-4 option rule (show side by side) (p.15, p.40, p.41, p.53, p.43).
9. **Copy is part of the UI.** Human wording, explicit button verbs ("Create account", not "Next"), exciting words for opt-ins, labels without redundant verbs, dialog buttons that restate the consequence (p.5, p.61, p.51, p.33, p.12).
10. **Reading comfort has numbers.** Body text no smaller than 14pt (examples 12pt bad / 16pt good), 45-75 characters per line, no continuous all-caps, one typeface, few font sizes (p.90, p.98, p.91, p.35, p.17).
11. **Imagery must be sharp, relevant, consistent and legible under text.** High-res, overlay on bright photos, illustration palette locked to brand, mosaic layouts with lead images instead of uniform grids (p.73, p.82, p.70, p.29, p.76, p.77).

## 2. Rules

### 2.1 Typography and reading

- **RULE** [T13] Use as few font sizes as possible in a form; differentiate size only between sections (labels/placeholders at one small size) and actions (the button label larger). The good mock uses 12 for both label and placeholder and 32 for the button label; the bad mock mixes 16 (label), 12 (placeholder), 32 (button).
  **Why** Every extra size is another thing to decode, so the form takes longer to process.
  **Applies to** forms, all
  **Check** count distinct computed `font-size` values inside one `form`; label and input/placeholder sizes should match.
  **Source** (p.17)
- **RULE** [T31] Use one typeface across a card/page. The bad mock sets heading and body in a serif next to a sans eyebrow; the good mock sets everything in one sans.
  **Why** Mixing faces creates confusion and hurts readability; a single face lets users learn the pattern.
  **Applies to** all
  **Check** set of distinct `font-family` primary families on page (expect 1, at most 2 with a clear role split) `[engine note on the "at most 2"]`.
  **Source** (p.35)
- **RULE** [T35] Limit line width by characters per line, not by pixel width; wide full-width text lines bore users and hurt readability. Good mock: text column narrower with larger side padding than the card edge.
  **Why** Long measures lose the reader's eye at line return.
  **Applies to** all
  **Check** measure chars per line of paragraphs (`ch`-based `max-width`); see T94 for the numeric range.
  **Source** (p.39)
- **RULE** [T94] Keep paragraph line length in check: stick to 45-75 characters per line "if you want to play it safe". The good example is labelled 55-65 characters per line; the bad example is labelled ~120 characters per line.
  **Why** Too-long lines make text harder to read.
  **Applies to** all
  **Check** `ch` count of rendered lines on `p`: 45-75, target 55-65.
  **Source** (p.98)
- **RULE** [T86] Body text must be no smaller than 14pt. The page shows 12pt as the bad body and 16pt as the good body (the 16pt example also has visibly more leading than the 12pt one).
  **Why** Small text is hard to read clearly.
  **Applies to** all
  **Check** computed `font-size` of body copy >= 14 (pt as the book uses it; read as px-equivalent 14+ in CSS) `[engine note: book says pt, web sizes are px; treat 14 as floor, 16 as default]`.
  **Source** (p.90)
- **RULE** [T87] Do not set continuous running text in all caps; use sentence case and keep caps for moderate, short uses (the book's good mock sets a paragraph in normal case; bad sets the whole paragraph in caps).
  **Why** All-caps blocks are difficult to read.
  **Applies to** all
  **Check** `text-transform: uppercase` should not be on paragraphs/long strings; flag uppercase runs > a short label.
  **Source** (p.91)
- **RULE** [T17] Align description text to the title text, not to the icon. Good: icon sits in its own column, title and description share one left edge. Bad: description starts under the icon, so title and body have different left edges.
  **Why** Unaligned text makes content hard to scan; aligning cleans up the design.
  **Applies to** cards, feature lists, all
  **Check** `getBoundingClientRect().left` of title and its description are equal.
  **Source** (p.21)
- **RULE** [T95] Right-align numbers in tables so the decimal point is always in the same place; numeric column headers are right-aligned over their numbers too (good mock), text column (ticker symbols) stays left-aligned.
  **Why** Aligned decimals let you compare values at a glance; ragged decimals look cluttered.
  **Applies to** SaaS app UI, tables
  **Check** numeric `td`/`th` have `text-align: right` (`font-variant-numeric: tabular-nums` is an `[engine note]` addition).
  **Source** (p.99)
- **RULE** [T6] Break dense text into headed, scannable items: small letter-spaced uppercase grey eyebrow ("PROPERTY FEATURES"), then per feature an icon, a bold descriptive heading, and a short grey description of two lines. Do not show important features as one paragraph.
  **Why** People scan; headings plus icons let them find a feature without reading the block.
  **Applies to** landing page, cards
  **Check** no paragraph > ~3 sentences that contains multiple distinct features; visual.
  **Source** (p.10)

### 2.2 Microcopy and labels

- **RULE** [T1] Use human language that ties labels to values: "Only 7 left in stock!" instead of "In stock: 7"; "Add to Cart" instead of "Cart" on the button.
  **Why** Robotic label/value pairs confuse; natural phrasing explains what the number and the button mean.
  **Applies to** all, e-commerce
  **Check** visual / copy review; button labels on commerce actions are verb phrases.
  **Source** (p.5)
- **RULE** [T8] In confirmation dialogs make the options descriptive and consistent with the question. Bad: "Are you sure you want to cancel your upload?" answered by "OK" (grey) and "Cancel" (primary): ambiguous. Good: "Yes, Cancel" (grey) and "Don't Cancel" (primary).
  **Why** "OK/Cancel" next to a "cancel?" question forces the user to decode which one does what.
  **Applies to** dialogs, all
  **Check** dialog buttons are not generic "OK"/"Cancel" when the question itself contains "cancel".
  **Source** (p.12)
- **RULE** [T29] Drop the verb from a navigation/menu label when the noun is already clear: "My address", "Order history", "Discounts", "Payment methods" instead of "Edit my address", "View order history", "View discounts", "Edit payment methods".
  **Why** Verbs make labels long and over-detailed in a list that is already an action menu.
  **Applies to** settings lists, mobile
  **Check** list-row labels are short noun phrases; visual.
  **Source** (p.33)
- **RULE** [T47] Write opt-in button copy that makes users excited to join: "Join the Club!" instead of "Submit" on a subscribe form.
  **Why** Generic words make people less interested in the program.
  **Applies to** landing page, forms
  **Check** primary button label on sign-up/subscribe is not "Submit".
  **Source** (p.51)
- **RULE** [T57] Button labels must state what will happen: "Create account", never "OK" or "Next" for the final form action.
  **Why** Vague actions leave users unsure about the outcome.
  **Applies to** forms, all
  **Check** submit button text is not in {OK, Next, Submit, Continue} without context.
  **Source** (p.61)
- **RULE** [T42] Do not repeat the logo on the same page. When the hero shows the brand in the header and again as the hero headline, replace the hero text with a headline that conveys style and what you do (good: "MODERN STYLE"; bad: "LOOHOO FASHION" repeating the header logo).
  **Why** Repetition wastes the most prominent text slot; a headline sells the offer.
  **Applies to** landing page
  **Check** brand name occurs in nav only, not also as the `h1`.
  **Source** (p.46)

### 2.3 Color and contrast

- **RULE** [T2] On dark UI limit saturation: keep brand colours at tone levels 200-500 (a Tailwind-style 50-950 scale); do not use fully saturated colours on dark cards. Good mock: title and button are a desaturated lavender; bad: vivid saturated blue title and button on the same dark card.
  **Why** Highly saturated elements damage contrast and vibrate on dark surfaces.
  **Applies to** dark theme
  **Check** HSL/OKLCH chroma of accents in `.dark` is lower than in light; accent lightness in the 200-500 band.
  **Source** (p.6)
- **RULE** [T3] Build two colour palettes, one per theme: dark mode uses light pastel tones of each hue; light mode uses darker, deeper shades of the same hues. Do not reuse identical colours in both modes. (Good mock: lavender/mint/sky/salmon bars in dark; indigo/emerald/blue/coral-red darker versions in light.) The book adds "most people prefer light theme" (opinion).
  **Why** The same swatch has different contrast on dark vs light backgrounds.
  **Applies to** all with dark mode
  **Check** accent tokens differ between `:root` and `.dark`.
  **Source** (p.7)
- **RULE** [T15] Avoid pure black (#000000) and pure white for surfaces; use a dark grey such as #333335.
  **Why** Pure black/white can cause uneasiness in the eyes.
  **Applies to** all
  **Check** `background-color` or `color` not exactly `#000`/`#fff` on large surfaces and body text.
  **Source** (p.19)
- **RULE** [T54] Build the colour scheme from one family: pick a few tones of the same hue (good: four steps from dark navy to pale periwinkle) rather than unrelated hues (bad: black, orange-red, mustard, magenta).
  **Why** Too many inconsistent colours looks terrible.
  **Applies to** all
  **Check** palette hue spread: all brand/neutral tokens within a narrow hue range (excluding semantic colours).
  **Source** (p.58)
- **RULE** [T55] Use the primary colour only on the most crucial components. In the good mock the header becomes light neutral, the tab bar becomes white with the primary colour only on the active icon, buttons and card titles carry primary; photos have no colour overlay. The bad mock floods header, tab bar, card backgrounds and image tints with primary.
  **Why** Too much primary colour does not look nice and kills its signalling power.
  **Applies to** all
  **Check** share of page area filled with the primary colour is small (`[engine note]` rule of thumb under ~10% of viewport area); primary reserved for CTA, active, key accents.
  **Source** (p.59)
- **RULE** [T19] Keep the colours used for navigation/state to two, one of which denotes the selection: good mock keeps active icon in blue and the others grey; bad mock gives every icon its own colour (blue, orange, green, purple).
  **Why** Multiple colours in navigation add to the cognitive load.
  **Applies to** mobile, nav, icon rows
  **Check** distinct non-neutral colours among sibling icons <= 1 (the selected one).
  **Source** (p.23)
- **RULE** [T92] Emphasise by de-emphasising: give inactive nav items a softer (lighter grey) colour so the active item (indigo/darker) pops. Bad mock: all links dark, active barely different.
  **Why** The active item only stands out relative to the background of its siblings.
  **Applies to** navigation
  **Check** contrast/lightness delta between active and inactive nav link; inactive lighter but still readable `[engine note: still meet 4.5:1 for text]`.
  **Source** (p.96)
- **RULE** [T88] Use accent colours to help users categorise sections: in the pricing mock, a 3-4px coloured top rule (violet on "Start", mint-green on "Pro") differentiates two otherwise identical cards.
  **Why** Identical sections look the same and cannot be told apart at a glance.
  **Applies to** pricing, card sets
  **Check** sibling cards carry distinct accent token (rule/dot/icon); visual.
  **Source** (p.92)
- **RULE** [T75] Add colour-based distinction to highlight significant classifications: status rendered as small uppercase coloured pills (SHORTLISTED violet, REJECTED red, IN-PROCESS green) with alternating row tint, not plain grey text.
  **Why** Plain text statuses create no visual distinction between rows, so scanning is slow.
  **Applies to** SaaS app UI, lists/tables
  **Check** status cell uses a coloured badge, not default text colour.
  **Source** (p.79)
- **RULE** [T12] Use red for destructive actions: the "Yes, Delete" button is red (bad: blue), the neutral Cancel is light grey.
  **Why** Red alerts the user and acts as a warning sign; blue looks normal.
  **Applies to** dialogs, all
  **Check** destructive buttons use the destructive/red token.
  **Source** (p.16)
- **RULE** [T25] When text sits on a photo that is not dark enough, add a contrast overlay: good mock adds a darkening gradient behind the white "Hello, welcome to our academy" text; bad mock leaves white text on bright pink umbrellas, partly unreadable.
  **Why** Without contrast the text does not appear clearly on a bright image.
  **Applies to** hero, cards with image text
  **Check** contrast ratio of text vs the image pixels beneath >= 4.5:1 (`[engine note]` threshold).
  **Source** (p.29)
- **RULE** [T26] Make gradients smooth by placing the gradient handle's start and end farther away from the object (outside its bounds); handles at the corners give a direct, sharp-looking gradient.
  **Why** Close end points compress the transition and look harsh.
  **Applies to** all
  **Check** visual; the gradient's colour stops should not both be fully reached inside the element box.
  **Source** (p.30)

### 2.4 Depth, surfaces, borders, shadows, radius

- **RULE** [T21] Keep a second layer (e.g. dropdown) at least two shades or tints different from the layer behind it. Good: white dropdown over a grey page; bad: grey dropdown on grey page.
  **Why** Similar shades for different layers are uneasy to the eyes and the layers blend.
  **Applies to** menus, popovers, all
  **Check** luminance delta between popover bg and its backdrop element.
  **Source** (p.25)
- **RULE** [T77] On dark themes communicate elevation with shades of grey (nearer/higher card is lighter, deeper ones darker), not shadows alone. Bad mock: stacked cards all the same mid grey with only blurred shadows.
  **Why** Shadows are barely visible on dark surfaces and do not separate layers.
  **Applies to** dark theme
  **Check** elevated surface tokens get lighter with elevation in `.dark`.
  **Source** (p.81)
- **RULE** [T61] All shadows come from a single light source: same direction on every element. Bad mock: one button's shadow falls right, the next one's falls left.
  **Why** Random shadow directions look odd and complicate the experience.
  **Applies to** all
  **Check** `box-shadow` x/y offset sign identical across components.
  **Source** (p.65)
- **RULE** [T84] Never keep default shadows from design tools. Bad: X 0, Y 2px, blur 4px, #000000 at 50%. Good: X 0, Y 8px, blur 24px, #000000 at 15% (lower opacity, larger blur).
  **Why** Default shadows look hard and dirty.
  **Applies to** all
  **Check** shadow blur >= ~3x Y offset and alpha <= ~20%; no `rgba(0,0,0,.5)` small-blur shadows.
  **Source** (p.88)
- **RULE** [T43] Do not give inner elements the same corner radius as the container. Example: card 30pt outer, image inside 15pt (bad: 30 and 30).
  **Why** Same radius for outer and inner looks uneven.
  **Applies to** cards, all
  **Check** inner radius < outer radius (see section 5 for the 30 vs 15 vs "slightly" tension).
  **Source** (p.47)
- **RULE** [T56] Avoid too many borders. Good mock: only the search input keeps a border; list rows have no row borders; the action footer is separated by a light grey fill. Bad mock: filled search band plus a bordered box around every row.
  **Why** Too many borders complicate the experience and look cluttered.
  **Applies to** all
  **Check** count of elements with visible `border` per screen; list rows without `border-bottom` where tone/space can separate.
  **Source** (p.60)
- **RULE** [T89] Create contrast between items with colour and space instead of divider borders: good mock alternates a light grey row tint with white rows and generous row padding; bad uses hairline borders between rows.
  **Why** Borders for differentiation feel outdated.
  **Applies to** feeds, notification lists
  **Check** list items without `border-top/bottom`; zebra or tonal fill used.
  **Source** (p.93)

### 2.5 Layout, spacing, grid

- **RULE** [T22] Use more padding and margin. Good mock: card content has larger insets, smaller hero image, clear room around title and photo; bad: title and image almost touch edges.
  **Why** Too little margin/padding destroys visual hierarchy and looks cluttered.
  **Applies to** all
  **Check** card inner padding >= content-to-edge distance used elsewhere; visual.
  **Source** (p.26)
- **RULE** [T20] Separate sections with spacing, not extra divider lines. Menu mock: "Options" group and "Settings" group split by an extra gap (good) rather than a hairline rule (bad).
  **Why** Adding a new element (a line) just to create a division is not ideal.
  **Applies to** menus, lists
  **Check** group gap > intra-group gap; no `hr` between groups.
  **Source** (p.24)
- **RULE** [T41] Leave space from edges and group related elements: card text inset visibly from the card edge, title/body spacing consistent, tag-title-description grouped. Bad: text hugging the left edge and title lines packed tight.
  **Why** Less or inconsistent spacing hurts readability and grouping.
  **Applies to** cards
  **Check** padding between content and card edge consistent on all sides; heading line-height not tight.
  **Source** (p.45)
- **RULE** [T93] Avoid ambiguous spacing in forms: space between groups larger than between a label and its own input. Annotated: bad = 16px above label and 16px label-to-input; good = 16px above the label and 8px label-to-input.
  **Why** Equal gaps make it unclear which label belongs to which input.
  **Applies to** forms
  **Check** (gap between previous input and next label) > (gap between label and its input); good ratio 2:1 (16 vs 8).
  **Source** (p.97)
- **RULE** [T67] Use consistent gaps in grids: same horizontal and vertical gap between tiles (bad mock: vertical gap noticeably larger than horizontal).
  **Why** Uneven gaps give a bad experience and a sloppy grid.
  **Applies to** all grids
  **Check** `row-gap == column-gap` (or a deliberate token pair) across the grid.
  **Source** (p.71)
- **RULE** [T58] Build on a grid and test it at different screen sizes; the layout must keep the same set of items and consistent columns across breakpoints. Bad mock: 3 columns on desktop, a 2x2 on narrow with one empty (crossed) placeholder tile. Good mock: 4 columns on desktop, 2x2 filled on narrow.
  **Why** Irresponsive design has a negative impact on user experience.
  **Applies to** all
  **Check** screenshot at 375/768/1280/1440: no overflow, no empty slots, items preserved. (see section 7: image is ambiguous)
  **Source** (p.62)
- **RULE** [T72] When several images share a screen, make some lead: good mock = one full-width hero tile, two half tiles, one full-width tile; bad = a uniform 2x3 grid of equal tiles.
  **Why** With all images equal users cannot recognise the lead images.
  **Applies to** galleries, landing page
  **Check** tile area ratio between largest and smallest > 1 in a gallery.
  **Source** (p.76)
- **RULE** [T73] Add dynamism to image layouts with multiple columns and tile sizes (mosaic: one big 2/3-width tile + two small stacked, then a narrow + a wide tile). Bad: a uniform 3x4 grid of equal tiles.
  **Why** A uniform grid detracts from the appeal of the images and is boring to scroll.
  **Applies to** galleries, portfolio
  **Check** more than one tile size; visual.
  **Source** (p.77)
- **RULE** [T50] Prompt users to scroll by showing a glimpse of the next section at the fold. Bad: hero with big empty space below, so it looks finished; good: top edge of the next section peeks at the viewport bottom.
  **Why** Too much spacing between sections makes users less likely to scroll.
  **Applies to** landing page
  **Check** next section's top within the first viewport at common heights (e.g. 1440x900, 375x812).
  **Source** (p.54)
- **RULE** [T79] Overlap elements to add depth and clarity: good profile card has the avatar overlapping the cover image edge (half on photo, half on card) with the name below; bad has the avatar inline next to the name fully inside the white area.
  **Why** Keeping all elements separate gives a basic look.
  **Applies to** profile/cards
  **Check** visual.
  **Source** (p.83)
- **RULE** [T96] Scale hero images to fill the container so the visual content is visible across all display sizes. Bad: image scaled so its floating elements spill up onto the headline ("bills" collides with a coin); good: image is contained within its rounded frame, nothing overlaps the heading.
  **Why** Scaling the image to the full screen feels different on different screen sizes.
  **Applies to** mobile, landing page
  **Check** hero image bounding box does not intersect heading; `object-fit` set; test at 375/768/1280. (see section 7)
  **Source** (p.100)
- **RULE** [T49] Place the CTA at the end of the Z-shaped reading path (Gutenberg): 1 top-left logo, 2 top-right nav CTA, 3 diagonal to image/left-centre, 4 bottom-right CTA. Good mock mirrors the hero so image sits left and text + CTA sit bottom-right.
  **Why** Eyes travel a Z from top-left to bottom-right, so the last stop gets the action.
  **Applies to** landing page
  **Check** primary hero CTA position in lower-right quadrant of hero; visual.
  **Source** (p.53)
- **RULE** [T23] Maintain pattern repetition: all selectors of a kind share one shape and style. Good mock: footwear type, size and quantity controls are all pills with the same selected style (dark fill); bad: type = rounded pills, size = square boxes, quantity = pill.
  **Why** Strange differences between visual elements make users re-learn controls for each task.
  **Applies to** all
  **Check** `border-radius` equal across same-role controls.
  **Source** (p.27)

### 2.6 Buttons, CTAs and clickability

- **RULE** [T11] Keep the main CTA big and close to the thumb (Fitts' law): good mock puts a full-width tall button at the bottom of the card; bad has a small button at top right.
  **Why** A small, distant target takes more time to hit.
  **Applies to** mobile
  **Check** primary action height >= 44px `[engine note]`; sits in bottom third on mobile.
  **Source** (p.15)
- **RULE** [T28] Fill the CTA with the primary colour (white label) so it stands out: pricing card "Get Pro" filled primary, not a pale grey button with coloured text.
  **Why** A dull CTA gets less attention and is harder to find.
  **Applies to** pricing, landing page
  **Check** primary button bg is the brand token, not neutral.
  **Source** (p.32)
- **RULE** [T30] Use button hierarchy on a screen with two actions: "Log In" = filled primary; "Sign Up" = text-only primary-coloured link below. Bad: two identical filled buttons.
  **Why** No hierarchy makes decisions hard.
  **Applies to** forms, auth
  **Check** at most one filled primary per view region; secondary uses outline/ghost/text.
  **Source** (p.34)
- **RULE** [T51] Button padding: side padding = 2x the top/bottom padding (annotated x, 2x). Bad: label touches the left and right edges with ~no side padding.
  **Why** Buttons with small padding do not look good.
  **Applies to** all
  **Check** `padding-inline / padding-block` ~ 2.
  **Source** (p.55)
- **RULE** [T82] Never wrap a button label; keep it on one line and let the button grow ("Submit Form", not "Submit / Your Form" on two lines).
  **Why** Wrapped button text is not good practice and looks cramped.
  **Applies to** all
  **Check** `white-space: nowrap`; button height == single-line height.
  **Source** (p.86)
- **RULE** [T83] Differentiate button weight: neutral and negative buttons become outlined (grey border/text, red border/text), the positive action stays solid filled. Bad: neutral solid grey, negative solid red, positive solid blue, all competing.
  **Why** Buttons with similar contrast compete for attention; the positive action should read as the clear one. (The book's caption says "lighter contrast"; see section 7.)
  **Applies to** dialogs, forms
  **Check** only one solid-fill button per button group.
  **Source** (p.87)
- **RULE** [T98] On mobile make buttons full width within the system margins (good: Retry and Exit span the card minus margins; bad: ~60%-width centred buttons).
  **Why** Small-sized buttons give an incomplete feeling.
  **Applies to** mobile
  **Check** button width == container inner width on viewport < ~480.
  **Source** (p.102)
- **RULE** [T33] Make tappable cards look clickable by adding an actionable button that describes the action (good: small dark "Apply >" pill on each row; bad: bare rows).
  **Why** Plain cards fail to indicate that they are clickable.
  **Applies to** lists, cards
  **Check** interactive card has a visible control or chevron/affordance.
  **Source** (p.37)
- **RULE** [T48] Enhance the clickable area so it includes label plus icon plus padding: good mock shows the hit box around "Click Me ->" including text, around the radio including its label "I'm an option", and around the hamburger with padding; bad mock hit boxes are only the arrow, only the radio dot and a tight box on the icon.
  **Why** Small hit areas make clicking buttons and elements difficult.
  **Applies to** all
  **Check** `<label for>`/wrapping `<label>` on radios; icon buttons >= 44x44 hit area `[engine note on 44]`.
  **Source** (p.52)
- **RULE** [T65] Make text actions look clickable with colour or a button: "Read more" as a blue underlined link (bad: body-coloured plain text).
  **Why** Users cannot identify clickable elements when they look like body text.
  **Applies to** all
  **Check** `a` elements differ from surrounding text by colour and/or underline.
  **Source** (p.69)

### 2.7 Forms and inputs

- **RULE** [T4] Align forms vertically: labels left-aligned above fields, fields one edge, submit button on the same left edge. Bad: labels right-aligned beside fields at ragged offsets and the button centred, producing a zig-zag eye path.
  **Why** Consistent alignment orients the user faster; inconsistent looks unprofessional.
  **Applies to** forms
  **Check** labels, inputs and button share the same `left` coordinate.
  **Source** (p.8)
- **RULE** [T14] Use a single column on small forms (group related fields otherwise). Bad: two columns of narrow fields.
  **Why** Multiple columns disrupt vertical momentum.
  **Applies to** forms
  **Check** inputs stacked, one per row, full width of the form.
  **Source** (p.18)
- **RULE** [T16] Put social login first, then "or log in with" separator, then username/password and button, with "Don't have an account? Create here" at the bottom. Bad: registration form first, social option after.
  **Why** Users see the one-tap option first and can log in without filling the form.
  **Applies to** auth
  **Check** social buttons precede credential fields in DOM/visual order.
  **Source** (p.20)
- **RULE** [T18] Checkboxes for multiple selections, radio buttons for a single choice (good mock: skills list uses squares with Design and Marketing checked; single-choice list uses circles with one selected).
  **Why** The control shape tells the user whether one or many may be picked.
  **Applies to** forms
  **Check** `input[type=checkbox]` for multi, `radio` for exactly-one groups.
  **Source** (p.22)
- **RULE** [T24] Search fields need descriptive placeholder text that hints what can be searched: "Ebooks, audiobooks, and videos" vs bare "Search".
  **Why** Without it the user is clueless about what kinds of things can be looked up.
  **Applies to** search
  **Check** search `placeholder` is more specific than "Search".
  **Source** (p.28)
- **RULE** [T36] Fewer options for faster decisions (Hick's law): 8 radio options (bad) reduced to 3 plus "Others" which reveals a "Type Here" text field (good).
  **Why** More options create complexity and delay choice.
  **Applies to** forms
  **Check** radio group size <= ~5 with an Other/free-text escape `[engine note on 5]`.
  **Source** (p.40)
- **RULE** [T38] Use input masks for phone numbers and dates: placeholders like (___) ____-____ and DD/MM/YYYY instead of generic "Number" and "Date".
  **Why** Without a mask users are unsure about the format.
  **Applies to** forms
  **Check** phone/date inputs have mask or format hint placeholder / `inputmode`.
  **Source** (p.42)
- **RULE** [T39] When the user picks from 2-4 values, display all options side by side (radio rows), not in a dropdown. Bad: a "Light" dropdown for Light/Dark.
  **Why** It is not ideal to hide 2-3 values inside a dropdown.
  **Applies to** forms, settings
  **Check** `select` with <= 4 options is a smell.
  **Source** (p.43)
- **RULE** [T40] Avoid free typing when a control works better: price range with a dual-handle slider (value labels $47 and $150 above handles, green fill between) instead of From/To text inputs.
  **Why** A slider makes the process fast and understandable; fields everywhere are not ideal.
  **Applies to** filters
  **Check** range inputs use slider (see section 5 for precision caveat).
  **Source** (p.44)
- **RULE** [T59] Keep forms short and clear: fewer fields (merge First/Last Name into "Name"; 4 fields became 3).
  **Why** Every additional field lowers conversion and loses leads.
  **Applies to** forms
  **Check** count of required inputs; flag unnecessary ones.
  **Source** (p.63)
- **RULE** [T64] Use boxed fields: rectangles with visible borders and rounded corners, not underline-only fields.
  **Why** It takes time for underline fields to be recognised as a form.
  **Applies to** forms
  **Check** `input` has visible border on all four sides.
  **Source** (p.68)
- **RULE** [T74] Do not use placeholder text as the label. Good mock: small grey labels above each filled field (Name, Surname, Address) with the entered value inside; bad: only "Name", "Email", "Address:" inside the empty fields.
  **Why** Placeholder-as-label causes many usability issues (label disappears when typing).
  **Applies to** forms
  **Check** each input has a visible `<label>`; placeholder is not the only identifier.
  **Source** (p.78)
- **RULE** [T80] For selecting from a large multi-option list use toggle tokens (pills in a 2-column grid; selected = primary fill with white text, unselected = grey fill and grey text) instead of a long checklist.
  **Why** A long list of checkboxes can make users abandon the form.
  **Applies to** forms, onboarding
  **Check** multi-select with > ~6 options uses chips/tokens.
  **Source** (p.84)
- **RULE** [T90] Group form fields with section titles: bold "Personal Information" over First/Last Name, bold "Contact Information" over Address/City, with an extra gap between groups; do not leave one undivided list.
  **Why** Ungrouped forms lack clarity; title plus grouping separates regions.
  **Applies to** forms
  **Check** forms > ~4 fields have `fieldset/legend` or heading per group.
  **Source** (p.94)
- **RULE** [T91] Differentiate the focused field: good mock shows a dark indigo thicker border on the active input (cursor in "Last Name"); bad shows the same grey border while the cursor blinks.
  **Why** An obvious current-field state makes the form feel interactive.
  **Applies to** forms
  **Check** `:focus` style differs in border colour from default.
  **Source** (p.95)
- **RULE** [T99] Do not explain obvious fields (no "?" tooltip "Username is your user name"); when explanation is needed, put it directly below the field.
  **Why** Stating the obvious in tooltips is noise.
  **Applies to** forms
  **Check** helper text rendered inline below the field; no tooltip for self-evident labels.
  **Source** (p.103)
- **RULE** [T100] Checkboxes must be squares ("boxes"), not circles. Bad: round checkbox with check looks like a radio.
  **Why** Round checkboxes look too similar to radio buttons.
  **Applies to** forms
  **Check** checkbox `border-radius` small (square/slightly rounded), radio fully round.
  **Source** (p.104)

### 2.8 Navigation, menus, onboarding

- **RULE** [T5] Use icon + label in menus for complex or abstract functions: each item (New Tab, New Incognito, Recent Tabs, Downloads, History, Bookmark) gets a leading outline icon plus its text; bad = label only.
  **Why** Icon plus label gives rational and emotional impact.
  **Applies to** menus
  **Check** menu items carry leading icon; visual.
  **Source** (p.9)
- **RULE** [T37] Put the most important pages at the corners of the tab bar (serial position effect): good order Home, Search, Chat, Cart, Profile (Home first, Profile last); bad order Search, Home, Cart, Profile, Chat.
  **Why** People remember the first and last items in a series.
  **Applies to** mobile
  **Check** primary destinations are first/last in tab bar.
  **Source** (p.41)
- **RULE** [T81] The book recommends a hamburger menu instead of visible navigation links on the page shown ("visible navigation decreases conversion rate; hamburger increases it"). (opinion, no evidence on the page; see section 5)
  **Why** Fewer competing links keep attention on the form/CTA.
  **Applies to** conversion-focused pages (checkout, sign-up)
  **Check** visual.
  **Source** (p.85)
- **RULE** [T9] Show a progress bar for multi-step flows: 3 steps with step 1 a green check, current step 2 a green numbered node, step 3 grey, solid green connector for done and dashed for remaining, step names below.
  **Why** Without it users cannot track where they are in the flow.
  **Applies to** checkout, wizards
  **Check** stepper present in flows > 2 steps.
  **Source** (p.13)
- **RULE** [T32] In mobile onboarding let users skip at any time and put "Skip" within thumb reach: centred at the bottom under the pagination dots, over a dark gradient scrim. Bad: tiny "Skip" in the top-right corner.
  **Why** Top corners are hard to reach.
  **Applies to** mobile
  **Check** skip link in bottom half; present on every onboarding step.
  **Source** (p.36)

### 2.9 Cards, lists and content blocks

- **RULE** [T34] Highlight the best plan: filled primary gradient card with white text and an inverted white button, next to a plain white card. Bad: both plans styled identically.
  **Why** Same colour on both makes the most-used plan of no importance.
  **Applies to** pricing
  **Check** exactly one pricing card has the highlighted treatment.
  **Source** (p.38)
- **RULE** [T44] Limit card content: truncate description with an ellipsis and add an "Explore More"/"See more" button; never make a card's text scroll internally (bad shows an inner scrollbar).
  **Why** Scrolling within a card creates confusion.
  **Applies to** cards
  **Check** no `overflow: auto/scroll` on card body; `line-clamp` used.
  **Source** (p.48)
- **RULE** [T45] Use swipe actions on list rows (swipe reveals a red trash and a green star circle button) instead of a "..." menu button on every row.
  **Why** Option buttons slow the process; swipe is fast and minimal.
  **Applies to** mobile lists
  **Check** visual.
  **Source** (p.49)
- **RULE** [T53] For homogeneous content use a list (one container, hairline separators) instead of a stack of separate cards.
  **Why** Cards do not give a sense of similarity; lists speed up scanning.
  **Applies to** mobile, SaaS app UI
  **Check** repeated identical items share one container.
  **Source** (p.57)
- **RULE** [T85] Limit links in a card: one link or a limited set of actions. Good: plain body text, a filled "Primary Action" and an underlined "Secondary Action"; bad: also two inline blue underlined links in the paragraph.
  **Why** Too many inline links look awful and give a negative impression.
  **Applies to** cards
  **Check** inline `a` in card body = 0-1.
  **Source** (p.89)
- **RULE** [T76] Avoid the super-minimal look in list rows: add detail ("Episode #1" instead of "#1", a progress bar with "42%" and a cancel x, rather than a bare bar).
  **Why** Too little detail fails to describe the element and the process.
  **Applies to** lists, media
  **Check** rows show secondary descriptor and progress value; visual.
  **Source** (p.80)
- **RULE** [T68] Add a stroke (white ring) to avatars placed over photos or busy backgrounds.
  **Why** Avatars without stroke blend with the background.
  **Applies to** profile cards
  **Check** avatar over image has `border`/`ring` in surface colour.
  **Source** (p.72)

### 2.10 Icons, imagery and illustration

- **RULE** [T7] Use one consistent icon set: the page's good example shows three coherent sets in rows (A filled circle, B outline ring, C plain line) while the bad mixes filled circle plus, outline trash and outline cart.
  **Why** Inconsistent icons risk confusion and hurt brand credibility.
  **Applies to** all
  **Check** icons from one library, same fill style and size grid.
  **Source** (p.11)
- **RULE** [T46] Use simple flat icons for UI (thin dark outlines), not glossy gradient "fancy" icons.
  **Why** Fancy icons look unprofessional.
  **Applies to** nav, toolbars
  **Check** icons are single-colour line/solid glyphs.
  **Source** (p.50)
- **RULE** [T70] Keep icons front-facing, not in perspective (good: flat-on image icon; bad: tilted glossy 3D icon).
  **Why** Perspective views look complicated.
  **Applies to** icons
  **Check** visual.
  **Source** (p.74)
- **RULE** [T71] Use the same stroke weight throughout an icon set (bad pen icon mixes thick and thin strokes).
  **Why** Inconsistent stroke weight is bad practice.
  **Applies to** icons
  **Check** all SVG icons share one `stroke-width`.
  **Source** (p.75)
- **RULE** [T66] Keep illustrations consistent: lock the figures' clothing colours to the brand palette (violet, charcoal, navy) rather than random red, yellow, green, blue.
  **Why** Illustrations become part of the brand; inconsistent ones fail to define it.
  **Applies to** landing page
  **Check** illustration colours within brand palette hues.
  **Source** (p.70)
- **RULE** [T69] Use high-resolution images, particularly where text goes over them.
  **Why** Blurry or distorted images do not look appealing.
  **Applies to** all
  **Check** image natural width >= rendered width x devicePixelRatio.
  **Source** (p.73)
- **RULE** [T78] Use supportive images that reinforce the message (credit-card visual for "The simplest way to pay your bills") instead of irrelevant stock (a wallet in a hand).
  **Why** Irrelevant images fail to support the story and meaning.
  **Applies to** landing page
  **Check** visual / alt text matches the headline.
  **Source** (p.82)

### 2.11 Feedback, states, loading and errors

- **RULE** [T10] Show the user where and why an error occurred: red "!" inside the offending field and a small red message directly below it ("Username not valid!"); bad shows only a "1 error found !" summary above the form.
  **Why** Users must locate the error and know the reason to correct it.
  **Applies to** forms
  **Check** error text adjacent to its field and linked (`aria-describedby`).
  **Source** (p.14)
- **RULE** [T27] Show the steps of a procedure visually: pagination dots under the button and copy "We just have one question" instead of "We have a few questions".
  **Why** Users do not know how many steps remain.
  **Applies to** onboarding
  **Check** progress indicator present.
  **Source** (p.31)
- **RULE** [T52] Make selected items pop: selected row filled with primary gradient and white text vs unselected white rows (bad: only a tiny checkmark changes).
  **Why** Users cannot tell that something happened.
  **Applies to** forms, lists
  **Check** selected state differs by fill from default.
  **Source** (p.56)
- **RULE** [T60] Error/offline screens must name the error and suggest a solution: illustration, "You're offline" and a full-width "Retry" button with a refresh icon.
  **Why** A bare spinner looks incomplete and gives no recovery path.
  **Applies to** mobile, all
  **Check** network failure state has message + retry action.
  **Source** (p.64)
- **RULE** [T62] Use skeleton loading (grey blocks mirroring the layout with a shimmer sweep) instead of a spinner for content areas.
  **Why** Skeletons are perceived as faster; spinners make loading feel slower and show nothing.
  **Applies to** all
  **Check** loading state has skeleton matching final layout.
  **Source** (p.66)
- **RULE** [T63] Keep important guidance visible: show password rules as an inline checklist under the field ("More than 8 characters" met in green, "Include special characters or numbers" unmet) instead of a "?" tooltip.
  **Why** Required info hidden under a tooltip is missed.
  **Applies to** forms
  **Check** requirements rendered in the DOM, not in a hover-only tooltip.
  **Source** (p.67)
- **RULE** [T97] Show a glimpse of an off-screen element in horizontal carousels (the next card peeks at the edge) rather than only a slider indicator.
  **Why** Indicator alone gets ignored.
  **Applies to** mobile
  **Check** carousel item widths < container width with next item partially visible.
  **Source** (p.101)

### 2.12 Process

- **RULE** [T101] Create more than you consume: balance reading and inspiration with real designing.
  **Why** More creation means more practice and better UI skill.
  **Applies to** designer practice
  **Check** n/a. Not a UI rule.
  **Source** (p.105)

### 2.13 Extras (cross-page combinations) [engine note]

- **RULE** [X1] Dark-mode recipe: base surface a dark grey not black (T15), accents at tones 200-500 (T2), separate palette from light mode (T3), elevation by lighter greys (T77).
  **Why** These four rules together define dark theme tokens.
  **Applies to** dark theme
  **Check** token audit of `.dark`.
  **Source** (p.6, p.7, p.19, p.81)
- **RULE** [X2] Form recipe: one column (T14), left-aligned visible labels above boxed fields (T4, T64, T74), 8px label-to-input and 16px between groups (T93), titled groups (T90), focus ring (T91), errors under field (T10), rules inline (T63), masks (T38), full-width verb-labelled submit (T57, T98).
  **Why** Collates the 10+ form rules into one build order.
  **Applies to** forms
  **Check** run T-checks above.
  **Source** (p.8, p.18, p.42, p.61-p.68, p.78, p.94-p.97)
- **RULE** [X3] Pricing recipe: highlighted best plan (T34), accent top rules to distinguish (T88), filled primary CTA (T28), consistent corner shapes.
  **Why** Combines three pricing tips.
  **Applies to** pricing
  **Check** one highlighted card; visual.
  **Source** (p.32, p.38, p.92)
- **RULE** [X4] Reserve the primary colour for CTA, active state and key accents (T55, T28, T92, T19) and keep everything else neutral.
  **Why** Signal colour only works when scarce.
  **Applies to** all
  **Check** primary-coloured area share; sibling items have <= 1 coloured.
  **Source** (p.23, p.32, p.59, p.96)
- **RULE** [X5] Do not rely on the book's mock pixel values as tokens; they are artboard numbers. Use the stated ratios (side padding = 2x vertical, 8:16 label gaps, inner radius < outer, 45-75 ch, 14pt floor).
  **Why** The mocks use inconsistent sizes between good/bad (see section 7).
  **Applies to** all
  **Check** n/a
  **Source** (p.17, p.47, p.55, p.90, p.97, p.98)

### Audit additions (audit 2026-10-15)

Gap pass result: all 101 tips (T1-T101) were already present as rules; nothing was missing at tip level. The additions below are secondary conventions that every relevant mock draws consistently but no caption names, recovered by re-viewing all 106 page images.

- **RULE** In a two-button confirmation dialog, set both buttons the same size side by side, the dismissive/neutral option on the left in a light grey fill and the emphasised option on the right; the emphasised slot holds the safe recommended answer in primary colour ("Don't Cancel", T8) or the destructive answer in red ("Yes, Delete", T12). Inside an inline form the order flips: the filled primary ("Login") sits first, left-aligned under the fields, with grey "Cancel" to its right (as drawn on p.14, p.67, p.103).
  **Why** One fixed slot for the emphasised action lets users find it without reading; the colour of that slot (primary vs red) then carries the safe-vs-destructive meaning.
  **Applies to** SaaS app UI, forms. **Check** dialog footer: last button is the emphasised one and only it has a non-neutral fill; form footer: primary button's left edge equals the inputs' left edge. **Source** (p.12, p.14, p.16, p.67, p.103) (audit 2026-10-15)

- **RULE** Mark required fields with a red asterisk placed immediately after the label text ("First Name *"), the asterisk in the error/red colour and the label in normal text colour.
  **Why** Every form mock that shows required fields uses this one convention, so required state is read from the label line without extra helper text.
  **Applies to** forms. **Check** required inputs have a label ending in `*` (or `aria-required` plus visible marker) whose colour is the destructive/red token. **Source** (p.95, p.97) (audit 2026-10-15)

- **RULE** On a mobile error/offline screen stack the action pair vertically, both full width within the margins: primary on top in the brand fill, secondary below in a neutral grey fill, each with a leading icon (refresh icon on "Retry", exit icon on "Exit").
  **Why** Stacked full-width buttons keep both targets large and in thumb reach while fill colour alone ranks them.
  **Applies to** mobile. **Check** at viewport < ~480px the two buttons share the container's inner width, primary DOM-first and visually above; secondary uses a neutral fill, not outline. **Source** (p.64, p.102) (audit 2026-10-15)

- **RULE** In a multi-select list where selection must be obvious, render each option as its own bordered full-width row tile with the checkbox inside the tile; the selected tile fills with the primary colour and its label and check turn white (unselected tiles stay white with grey label).
  **Why** Filling the whole tile turns a tiny checkbox change into a large state change users cannot miss, and the tile doubles as the hit area (T48).
  **Applies to** forms, onboarding. **Check** `:checked` row container background changes to the primary token; label colour on selected row is white with >= 4.5:1 contrast. **Source** (p.56) (audit 2026-10-15)

## 3. Numbers and scales

| Value | Rule | Source |
|---|---|---|
| Tone levels 200-500 | Max colour tone range on dark UI | p.6 |
| #000000 (bad) vs #333335 "Dark Grey" (good) | Dark surface; avoid pure black/white | p.19 |
| >= 2 shades/tints difference | 2nd layer (dropdown) vs background | p.25 |
| 12pt bad, 16pt good, headline "no smaller than 14pt" | Body text floor | p.90 |
| 45-75 chars/line; 55-65 in good example; ~120 in bad example | Line length | p.98 |
| 12 (labels+placeholders), 32 (button) good; 16/12/32 bad | Form font sizes as drawn | p.17 |
| side padding = 2 x top/bottom padding (x / 2x annotation) | Button padding | p.55 |
| 8px label->own input; 16px previous input->next label (bad: 16 and 16) | Form group spacing | p.97 |
| X 0, Y 8px, blur 24px, #000000, 15% (good) vs X 0, Y 2px, blur 4px, #000000, 50% (bad) | Soft shadow | p.88 |
| outer radius 30pt, inner radius 15pt (good) vs 30/30 (bad) | Nested corner radius | p.47 |
| 2-4 options | Show side by side (radios) instead of dropdown | p.43 |
| 8 options (bad) -> 3 + "Others" (good) | Hick's law example | p.40 |
| 5-item tab bar; Home first, Profile last | Serial position | p.41 |
| 3 steps in progress bar (done/current/pending) | Stepper pattern | p.13 |
| 5 pagination dots (p.31) and 4 dots (p.36) in onboarding examples | Step indicator | p.31, p.36 |
| 4 columns desktop -> 2x2 narrow (good) | Grid example | p.62 |
| 4 form fields -> 3 fields | Fewer fields | p.63 |
| 1-2 colours in nav state: "two, with one to denote the selection" | Selection colour | p.23 |
| 4 tonal steps of one hue | Colour scheme example | p.58 |
| Gradient handles placed outside object bounds | Smooth gradient | p.30 |

## 4. Dos and Don'ts

Format: Tip / page / what the BAD mock shows / what the GOOD mock shows.

| Tip | Page | BAD (don't) | GOOD (do) |
|---|---|---|---|
| 1 | 5 | Airpods card: "In stock: 7", button "Cart" | "Only 7 left in stock!", button "Add to Cart" |
| 2 | 6 | Dark card with vivid saturated blue title and button | Same card with desaturated lavender title and button (tone 200-500) |
| 3 | 7 | Same four pastel bars on dark half and light half | Dark half keeps pastels; light half uses deeper versions of each hue |
| 4 | 8 | Form with labels at ragged right-aligned offsets, centred Submit, zig-zag arrow | Labels above fields, all left-aligned, Submit left-aligned |
| 5 | 9 | Browser menu text-only (New Tab ... Bookmark) | Same menu with leading outline icons |
| 6 | 10 | "Property Feature" with one grey paragraph | Eyebrow + three icon rows (pin, key, car), bold heading, 2-line description |
| 7 | 11 | Mixed icon styles: filled circle plus, outline trash, outline cart | Three rows A/B/C, each a consistent style |
| 8 | 12 | "Discard draft" dialog: OK (grey) / Cancel (primary) | "Yes, Cancel" (grey) / "Don't Cancel" (primary) |
| 9 | 13 | Payment form with no progress indicator | Stepper above: Shipping Details check, Payment current 2, step 3 pending (dashed) |
| 10 | 14 | "1 error found !" top-right in red above the form | Red "!" in the username field + red "Username not valid!" under it |
| 11 | 15 | Small blue CTA top-right of card | Full-width tall blue CTA at the bottom of card |
| 12 | 16 | Delete Account: blue "Yes, Delete" | Red "Yes, Delete" with grey Cancel |
| 13 | 17 | Form with label 16, placeholder 12, button 32 | Labels and placeholders both 12, button 32 |
| 14 | 18 | Two-column form of narrow fields | Single column, labels above full-width fields |
| 15 | 19 | #000000 black card | #333335 dark grey card |
| 16 | 20 | Credentials form, then "or log in with" Facebook | Facebook button first, "or log in with", then credentials |
| 17 | 21 | Title and description with different left edges beside icons | Description aligned with title (icon in own column) |
| 18 | 22 | (n/a, shows both patterns) | Checkboxes for multi-select, radios for single-select |
| 19 | 23 | Bottom icons in four colours (blue, orange, green, purple) | Active icon blue, rest grey |
| 20 | 24 | Menu groups split by a hairline | Groups split by an extra gap, no line |
| 21 | 25 | Grey dropdown on grey page | White dropdown with shadow over grey page |
| 22 | 26 | Photography Workshop card with tight padding and big camera | More inner padding, smaller camera |
| 23 | 27 | Footwear chips pill, size chips square, quantity pill | All controls pill-shaped, same selected style |
| 24 | 28 | Search field "Search" | "Ebooks, audiobooks, and videos" |
| 25 | 29 | White text on bright pink photo | Dark gradient overlay behind text |
| 26 | 30 | Gradient handles at the shape's corners | Handles pulled outside the shape, softer transition |
| 27 | 31 | "We have a few questions" with no step indicator | "We just have one question" + 5-dot pager |
| 28 | 32 | Pale grey "Get Pro" with purple text | Filled primary "Get Pro", white text |
| 29 | 33 | "Edit my address", "View order history", ... | "My address", "Order history", "Discounts", "Payment methods" |
| 30 | 34 | Log In and Sign Up identical filled buttons | Log In filled; Sign Up as text link |
| 31 | 35 | Serif heading/body with sans eyebrow | Single sans for all |
| 32 | 36 | "Skip" at top-right of onboarding photo | "Skip" bottom-centre under dots, on dark scrim |
| 33 | 37 | Four bare list rows | Same rows with "Apply >" button each |
| 34 | 38 | Two identical white plan cards | Pro card filled primary gradient with inverted button |
| 35 | 39 | Skeleton text spanning nearly full card width | Narrower measure with larger side padding |
| 36 | 40 | 8 radios | 3 radios + Others (selected) revealing "Type Here" |
| 37 | 41 | Tab bar: Search, Home, Cart, Profile, Chat | Home, Search, Chat, Cart, Profile |
| 38 | 42 | Placeholders "Number", "Date" | "(___) ____-____", "DD/MM/YYYY" |
| 39 | 43 | Dropdown "Light" for theme | Radios Light/Dark shown |
| 40 | 44 | From/To text fields $40 / $150 | Dual-handle slider $47 - $150, green range |
| 41 | 45 | Card text near edge, tight title leading | More inset, looser spacing, clear groups |
| 42 | 46 | Hero headline repeats "LOOHOO FASHION" | Hero headline "MODERN STYLE" |
| 43 | 47 | Image corner 30pt in 30pt card | Image corner 15pt in 30pt card |
| 44 | 48 | Card text with inner scrollbar | Truncated text + "Explore More" button |
| 45 | 49 | Rows with "..." buttons | Row swiped to reveal trash (red) and star (green) |
| 46 | 50 | Glossy gradient nav icons | Thin black outline icons |
| 47 | 51 | "Subscribe" form with "Submit" | Same with "Join the Club!" |
| 48 | 52 | Hit boxes only on arrow, radio dot, small icon | Hit boxes cover label+icon with padding |
| 49 | 53 | Plain wireframe, CTA bottom-left of text | Mirrored hero; numbered Z path 1-4 ends at CTA bottom-right |
| 50 | 54 | Hero with large empty gap below | Next section's edge peeks at the bottom |
| 51 | 55 | "Join Newsletter" text touching button edges | Side padding 2x top/bottom |
| 52 | 56 | Checked row differs only by a small check | Selected row filled primary with white text |
| 53 | 57 | Four separate cards | One list container with hairline dividers |
| 54 | 58 | Black, orange-red, mustard, magenta circles | Four tones of one blue hue |
| 55 | 59 | Primary on header, tab bar, card bg, image tint | Neutral header/tab bar; primary on active icon, buttons, titles; no image overlay |
| 56 | 60 | Grey search band and bordered rows | Only input bordered; footer tonal grey |
| 57 | 61 | "Next" on account creation | "Create account" |
| 58 | 62 | 3-col desktop, 2x2 with an empty slot on narrow | 4-col desktop, filled 2x2 narrow |
| 59 | 63 | First Name, Last Name, Email, Address | Name, Email, Address |
| 60 | 64 | Spinner only on empty Shop screen | Illustration, "You're offline", full-width Retry |
| 61 | 65 | Two buttons with shadows falling opposite ways | Both shadows same direction |
| 62 | 66 | Centred spinner | Skeleton blocks with shimmer |
| 63 | 67 | "?" tooltip holds password rules | Inline checklist under the field |
| 64 | 68 | Underline-only fields | Rounded boxed fields with visible borders |
| 65 | 69 | "Read more" plain black | Blue underlined "Read more" |
| 66 | 70 | Figures in green, blue, yellow, red clothes | Figures in violet/charcoal/navy palette |
| 67 | 71 | 2x3 tiles, vertical gap larger than horizontal | Equal gaps |
| 68 | 72 | Avatar flush on photo | Avatar with white ring |
| 69 | 73 | Blurry hero photo | Sharp high-res photo |
| 70 | 74 | Tilted glossy 3D icon | Front-facing icon |
| 71 | 75 | Pen icon with mixed stroke thickness | Uniform stroke |
| 72 | 76 | Uniform 2x3 image grid | Hero tile, two halves, wide tile |
| 73 | 77 | Uniform 3x4 grid | Mosaic with large tile and varied sizes |
| 74 | 78 | Names only as placeholders | Labels above filled values |
| 75 | 79 | Status in plain grey text (rows already alternate tint) | Coloured status pills; the alternating row tint is the same in both mocks |
| 76 | 80 | "#1" labels, bare progress bar, uniform "Downloaded" | "Episode #1", progress with "42%" and cancel |
| 77 | 81 | Stacked cards all same grey, shadows only | Lighter front card, darker back cards |
| 78 | 82 | Wallet photo for pay bills | Credit-card 3D artwork |
| 79 | 83 | Avatar inline beside name, inside white area | Avatar overlaps cover edge, name below |
| 80 | 84 | 8 checkboxes with 3 checked | Pill tokens (selected primary filled) in 2 columns |
| 81 | 85 | Header with 4 visible nav links | Header with hamburger icon |
| 82 | 86 | Two-line "Submit / Your Form" button | One-line "Submit Form" |
| 83 | 87 | Neutral grey, negative red, positive blue all solid | Neutral and negative outlined; positive solid |
| 84 | 88 | Y 2 / blur 4 / 50% shadow | Y 8 / blur 24 / 15% shadow |
| 85 | 89 | Inline blue links in body + secondary link | Plain body; filled primary + underlined secondary |
| 86 | 90 | 12pt body | 16pt body |
| 87 | 91 | All-caps paragraph | Sentence-case paragraph |
| 88 | 92 | Identical outline-button pricing cards | Accent top rule (violet / mint) per card |
| 89 | 93 | Notification rows split by hairlines | Alternating grey tint rows |
| 90 | 94 | Four ungrouped fields | "Personal Information" and "Contact Information" groups |
| 91 | 95 | Focused field looks like the others | Focused field dark indigo border |
| 92 | 96 | All nav links dark | Inactive softer grey, active indigo |
| 93 | 97 | 16px / 16px around labels | 16px above label, 8px label-to-input |
| 94 | 98 | ~120 characters per line | 55-65 characters per line (45-75 safe) |
| 95 | 99 | Left-aligned numeric columns | Right-aligned numeric columns and headers |
| 96 | 100 | Hero image overflows onto headline | Image fits its frame, no overlap |
| 97 | 101 | Card carousel with indicator only | Next card's edge peeks (green) |
| 98 | 102 | Narrow centred Retry/Exit buttons | Full-width Retry/Exit |
| 99 | 103 | "?" tooltip "Username is your user name" | No tooltip |
| 100 | 104 | Circular checkboxes | Square checkboxes |
| 101 | 105 | (advice page, no mock) | Create more than you consume |

## 5. Exceptions and judgement calls

- **Nested radius (T43).** The caption says "decrease it slightly" but the example goes 30pt to 15pt (half). [engine note] The geometric ideal is inner radius = outer radius minus the padding between them; use that, not a fixed ratio.
- **Body size (T86).** Headline "no smaller than 14pt", example good = 16pt, bad = 12pt. 14 is the floor, 16 the recommended default. [engine note] 14px is borderline; prefer 16px for body on web.
- **Line length (T94 vs T35).** T94 gives 45-75 (good example 55-65, bad 120); T35 gives no number. Use T94.
- **Hamburger vs visible nav (T81).** The book asserts conversion effects with no evidence (opinion). It also shows a visible bottom tab bar in T37 and T55. [engine note] Fine for single-goal pages (checkout/sign-up) but for a marketing site keep primary links visible; a hidden menu on desktop usually hurts discovery.
- **Underline vs boxed fields (T64).** T64 says boxes; the book's own T16 login mock uses underline fields. T64 is the explicit rule.
- **Borders (T56, T89) vs boxed inputs (T64).** Not a contradiction: borders are discouraged for separating content, but needed on inputs for affordance. T53's good list still uses hairline dividers inside one list container while T89 prefers tonal rows; treat dividers as acceptable when items are homogeneous and tightly packed, tonal fill when rows have richer content.
- **Selection colour limit (T19) vs status pills (T75).** T75 deliberately adds colour for classification; semantic colours (success/error/warning) are an exception to the "two colours" rule. [engine note]
- **Primary scarcity (T55) vs CTA fill (T28), highlighted plan (T34).** Consistent: primary is for the one thing that matters on a view, not for chrome.
- **Slider (T40) vs precision.** Sliders are fast and understandable but poor for exact values. [engine note] Pair with typed values, or keep fields when exact numbers matter.
- **Flat icons (T46) vs front-facing 3D (T70).** T46 is about UI glyphs (nav, toolbar); T70 and T78 show 3D-ish illustration art as acceptable for decorative/hero images as long as it is front-facing and consistent.
- **Positive button "lighter contrast" (T83).** The mock shows the positive action as the solid, highest-weight button and the others as outlines. Read the rule as: only one button per group is solid. The caption's "lighter contrast" refers to the secondary ones.
- **Spacing vs scroll hint (T22 vs T50).** Generous whitespace is good but not so much that the next section is entirely below the fold.
- **Hero logo repeat (T42).** [engine note] A nav logo is expected; the rule only targets repeating it as the hero headline.
- **Social login first (T16).** [engine note] Good for consumer sign-in; for B2B/SSO or when email is the primary route, placement may reverse.
- **Dark-mode light preference (T3).** "Most people prefer light theme" is an unsupported claim (opinion); do not use it to deprioritise dark mode.
- **Pt vs px.** The book uses pt for text sizes and radii (30pt/15pt); treat as px-equivalent on web. [engine note]

## 6. Figures worth keeping

- p.5: product card, robotic vs human copy plus button label.
- p.6: dark card, saturated vs desaturated accent (title and button).
- p.7: split dark/light swatch bars, same vs adapted palettes.
- p.8: zig-zag eye path over a misaligned form vs aligned form.
- p.13: 3-step progress bar (check / current / pending, solid vs dashed connector).
- p.14: error summary vs inline field error.
- p.17: font-size annotations (16/12/32 vs 12/32).
- p.19: black vs #333335.
- p.21 vs p.10: hanging-indent text alignment beside icons.
- p.23: colourful vs grey-except-active icon row.
- p.25: dropdown layer separation.
- p.27: shape consistency across chips.
- p.30: gradient handle placement diagram.
- p.38: pricing highlight (filled Pro card).
- p.41: tab bar order (corners).
- p.47: nested radius with 30pt/15pt annotations.
- p.52: clickable-area dashed hit boxes.
- p.53: Z-pattern numbered flow.
- p.55: button padding x / 2x annotation.
- p.59: primary-everywhere vs restrained primary (annotated "No color overlay", "Darker / Shade").
- p.60: border-heavy list vs tonal footer.
- p.65: opposing button shadow directions.
- p.66: spinner vs skeleton shimmer.
- p.67: tooltip vs inline checklist for password rules.
- p.78: floating labels vs placeholder-as-label.
- p.81: stacked elevation greys on dark.
- p.84: checklist vs toggle tokens.
- p.87: neutral/negative outlined vs solid trio.
- p.88: shadow value panels (0/2/4/50% vs 0/8/24/15%).
- p.92: accent top rules on pricing cards.
- p.97: 16px/8px spacing annotations in a form.
- p.98: 120 vs 55-65 characters per line with annotation bars.
- p.99: numeric table alignment.
- p.12 and p.16 together: dialog footer order, grey dismissive left, emphasised right (primary for the safe choice, red for the destructive one) (audit 2026-10-15).
- p.97: red asterisk required markers next to the 16px/8px spacing annotations (audit 2026-10-15).
- p.102: stacked full-width Retry/Exit pair with leading icons, primary fill over grey fill (audit 2026-10-15).

## 7. Open questions

- **No rule content:** p.1 (cover), p.2-p.3 (introduction: Pixsel Academy, "around 101 tips"; the p.3 footer says "50 UI Do's & Don'ts"), p.4 ("Let's begin" divider), p.106 ("Thank You."). p.105 (Tip 101) is process advice, not a UI rule.
- **p.62 (Tip 58, responsive):** the mock is a wireframe with no breakpoint labels; my reading (3 col + empty placeholder vs 4 col, all filled) is the most literal description but the exact intended defect is unclear.
- **p.100 (Tip 96, scale images):** caption and picture only loosely match; I describe it as "image overflows to overlap the headline vs contained". Unclear whether the book means cover-fit vs contain.
- **p.87 (Tip 83):** caption says the positive action has "much lighter contrast" while the picture shows the positive button solid and the others outlined. Interpretation recorded in section 5.
- **p.17 (Tip 13):** numbers (12/16/32) are artboard values, button label 32 is implausible as a real size; use as ratio only.
- **p.38, p.92 pricing mocks:** prices differ between bad/good (bad $12/$59, good $120/$300); ignore the numbers.
- **p.47 vs caption:** "slightly" vs 15pt (half). See section 5.
- **p.85 (T81)** and **p.7 (T3 "most people prefer light")**: unsupported claims; flagged as opinion.
- **Printed page numbers** show "103" on both p.104 and p.105 (Tip 100 and Tip 101); the page-to-tip mapping (page = tip + 4) holds throughout.
- **Typos in the source** ("Priciple" p.53, "Adress" p.63, "Untill" p.23, "Informaton" p.101) were not corrected in rules.
- (audit 2026-10-15) Tip coverage check: every tip T1-T101 has a `[T<n>]` rule in section 2; no tip number was missing. All 106 page images were re-viewed (p.1-4 and p.106 have no rule content; p.105 is process advice).
- (audit 2026-10-15) corrected: section 4 row for Tip 75 implied the alternating row tint was part of the fix, was "Coloured status pills + alternating row tint", page shows both the bad and the good table already alternate row tints; the only change is the coloured status pills (p.79). The T75 rule in 2.3 should be read the same way.
- (audit 2026-10-15) The dialog-order and required-asterisk rules in the audit additions are conventions drawn consistently in the mocks, not captioned tips; treat them as the book's house style, lower authority than the numbered tips.
- (audit 2026-10-15, spot check) 15 tip pages picked at random (seed 20261015) were re-opened as images and compared with this note: T2 (p.6), T4 (p.8), T6 (p.10), T25 (p.29), T26 (p.30), T28 (p.32), T51 (p.55), T55 (p.59), T57 (p.61), T62 (p.66), T68 (p.72), T74 (p.78), T79 (p.83), T84 (p.88), T89 (p.93). Page = tip + 4 held for all 15; every number (200-500 tone levels; x / 2x button padding; shadow 0/2/4 #000000 50% vs 0/8/24 #000000 15%) and every described visual matched. No mismatch to fix. One source detail recorded: in the T74 good mock the field labelled "Address:" contains "joegreen@gmail.com" (sample-data slip in the book; the rule is unaffected).
