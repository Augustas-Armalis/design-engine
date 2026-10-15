---
source: ui-pedia
chapter: Object and Shapes (Design Basics)
pages: 329-356
topic_tags: [shape, visual-weight, attention, hierarchy, box-model, border-radius, color, contrast, geometry, curves, circles, diagonals, triangles, squares]
status: studied
---

# Object and Shapes

All page numbers are PDF pages (printed = PDF - 1). The chapter is two halves: (A) pp.329-347, what an "object" is in a design tool (box model, size, position, angle) and which properties give an object visual weight; (B) pp.348-356, a taxonomy of shape families (curves, lines, circles, diagonals, triangles, squares) with the mood each carries. The book is light on numbers and heavy on qualitative claims; labelled `(opinion)` where the book is a taste statement with no evidence.

## 1. Core ideas

1. **Shape is a design lever alongside colour, type and graphics, and is "often overlooked".** Any visual object can be analysed as geometric primitives (a house = rectangle + triangle; the sun = circle + lines). (p.329)
2. **Attention is the scarce resource; visual weight is the tool to direct it.** Visual weight = the force that draws a viewer's attention. Every object has some; the heavier, the more attention. You create focal points ("visual magnets", "points of attraction") by making one thing heavier than the rest. (p.330)
3. **Visual weight cannot be quantified but can be tested: the "close your eyes" recall test.** Look at a screen for a few seconds, close eyes, note what you still remember; those items carry the most weight. (p.331)
4. **UI design is mostly moving rectangles.** Rectangles are the most common shape in interfaces (the book says "right after ellipses", p.332, an odd claim); the skill is knowing HOW to move them, WHERE and above all WHY (p.332-333).
5. **Every UI object is a box: Fill, Border, Outer margin, Inner margin (padding).** It is the fundamental model in both design and code. (p.334-335)
6. **An object is described by five numbers: size (W, H), position (X, Y of bounding box), angle, shape, border radius.** Irregular shapes are measured by their smallest enclosing rectangle (bounding box). (p.336-339, 346-347)
7. **Twelve things add visual weight**: size, shape regularity, orientation, hue, saturation, colour splash in neutral, contrast, texture, z-depth, personal interest, human faces, movement. Each is a knob for hierarchy. (p.336-346)
8. **Rounded = friendlier; consistent radius = better; derive radius from the grid base unit.** (p.346-347)
9. **Each shape family has a connotation**: curves = new/fresh/welcoming (use sparingly); lines and points = serenity, minimalism; circles = harmony, trust, completeness; diagonals = movement, dynamism, speed, gridless feel (danger of overuse); triangles = direction/progress (like diagonals, but fixed angle); squares/rectangles = security, order, corporate seriousness, fade into the background. (p.348-355)
10. **Shape has no formal standards in UI** (unlike type and colour); the book tells you to experiment, alone or combined with established patterns. (p.356)

## 2. Rules

### 2.1 Visual weight and attention

- **RULE** To make an element a focal point, make it heavier than everything around it on at least one weight dimension (size, colour intensity/saturation, contrast, texture, depth, orientation, face, movement). A focal point exists only by relative difference.
  **Why** Weight is the attention-drawing force; "the more weight an object carries, the more attention it attracts" (p.330).
  **Applies to** all. **Check** visual (blur/squint test or the recall test below); for a script: compare the candidate element's contrast, area and saturation against the page median. **Source** (p.330)

- **RULE** Verify hierarchy with the recall test: view the design for a few seconds, close eyes, list what you remember; the remembered items are the heavy ones and must match the intended priorities.
  **Why** Visual weight cannot be measured numerically, only observed. (opinion/heuristic)
  **Applies to** all. **Check** visual (reviewer step in render-and-critique). **Source** (p.331)

- **RULE** Use few strong focal points, not many. If two or more objects carry high weight, they compete (inference: "focal points" are defined as things with more weight than others). 
  **Why** Weight is relative; boosting everything flattens the hierarchy. (This is implied by "things with more visual weight than others", p.330; see engine note in section 5.)
  **Applies to** all. **Check** visual: count of elements that are simultaneously large + saturated + high-contrast above the fold. **Source** (p.330)

### 2.2 Weight-giving properties (each is a rule: more of it = heavier)

- **RULE** Larger width x height = heavier. Size is always measured on the smallest rectangle (bounding box) that holds the object, even for irregular shapes. (Size)
  **Why** Bigger area claims more of the visual field. **Applies to** all. **Check** element bounding-box area (`getBoundingClientRect`). **Source** (p.336-337)

- **RULE** Regular shapes (circle, square) look heavier than irregular shapes (star). (Shape regularity)
  **Why** Irregular shapes read as if parts of the object had been removed, so they feel lighter. **Applies to** all (icon/illustration choice). **Check** visual. **Source** (p.340-341; figure: solid dark circle vs solid dark star, same colour, similar bounding size)

- **RULE** Vertical objects look heavier than horizontal ones; diagonal orientation is heavier than both vertical and horizontal. (Orientation)
  **Why** Book states it as an observation; no mechanism given. **Applies to** all. **Check** visual; for a script, the rotation transform on the element (non-0/90 multiple = diagonal). **Source** (p.341; figure: same-size rounded rect, tall vertical vs wide horizontal, then tall vertical vs a diagonal copy rotated roughly 40-45 degrees)

- **RULE** Hues differ in intensity. Book order "from darkest to lightest": red, blue, green, orange, yellow. Reds and blues pull more than yellows and oranges at comparable saturation. (Hue)
  **Why** Perceived intensity. **Applies to** all. **Check** compute relative luminance / lightness of the CTA colour versus neighbours; swatches below. **Source** (p.342)

- **RULE** More saturated colour attracts more attention than a desaturated version of the same hue. (Saturation)
  **Why** Intensity of stimulus. **Applies to** all. **Check** HSL/OKLCH chroma of candidate vs surroundings. **Source** (p.342; figure pairs, pastel on top and saturated below)

- **RULE** One splash of colour in an otherwise neutral layout adds weight to that object. (Colour splash)
  **Why** The neutral field makes the single chromatic item the outlier. **Applies to** all (this is the classic single-accent-CTA move). **Check** count of distinct chromatic hues/accent elements vs neutral elements. **Source** (p.343)

- **RULE** An element that appears visibly heavier (darker/lighter) than its surroundings is "in contrast" and pulls attention. Use contrast as the natural way to point at one element. (Contrast)
  **Why** Difference from surroundings is what the eye detects. **Applies to** all. **Check** contrast ratio of element vs its local background and neighbours. **Source** (p.343; figure: light grey-blue #ACB4C6 swatch next to dark slate #495A7C swatch)

- **RULE** Textured elements look heavier than flat/untextured ones. (Texture)
  **Why** Texture gives a pseudo-3D impression, which reads heavier. **Applies to** all. **Check** visual. **Source** (p.343; figure: flat slate square next to black-and-white checkerboard square, same size and corner radius)

- **RULE** Foreground objects are heavier than background objects; elevation (shadow, overlap) adds weight. (Z-depth)
  **Why** Nearer things command attention. **Applies to** all. **Check** presence of shadow/overlap/z-index on the intended focal element. **Source** (p.344; figure: a flat dark card with a blue circle vs the same card drawn in perspective with the blue circle lifted by a drop shadow)

- **RULE** Do not assume everyone looks at the same thing; subject matter the viewer cares about (the book's example: trains vs cars) wins attention for that viewer. Choose imagery matching the target audience's interests. (Personal interest)
  **Why** Interest modulates attention; two people viewing the same page can fixate differently. **Applies to** landing page (imagery selection). **Check** visual / audience review. **Source** (p.344-345; figure: a car vs a train illustration)

- **RULE** Eyes and faces are visually heavy; an image with a human face wins attention over text. Place a face image where you want the first fixation, and expect the headline to be read second. (Faces)
  **Why** Faces are privileged stimuli. **Applies to** landing page hero, cards. **Check** visual. **Source** (p.345-346; figure: "YOUR SUCCESS IS OUR BUSINESS." headline block at left, photo of a smiling woman on a phone at right; the book says the eye goes to the photo first, the message second; credited to BestBuy)

- **RULE** Moving things naturally draw attention and can direct visitors to the next place to look; use motion deliberately to lead the eye. The book cites Google's sustainability site (yourplanyourplanet.sustainability.google) as the example (not reproduced in the book). (Movement)
  **Why** Motion is a strong attention capture. **Applies to** landing page. **Check** presence of animated elements and where they point. **Source** (p.346)

### 2.3 Box model

- **RULE** Model every UI object as four parts: Fill (background: solid, gradient, image or a combination), Border, Outer margin ("margin": space outside, used to place the object safely relative to neighbours), Inner margin ("padding" when talking to developers: safe area inside the object).
  **Why** It is the common language of design tools and CSS. **Applies to** all. **Check** computed `background`, `border`, `margin`, `padding` all explicitly designed per component. **Source** (p.334-335; figure p.334: dark slate rounded rectangle with dark border and soft shadow; dashed inner rectangle marks the padding box, dashed outer rectangle marks the margin box; callouts Fill, Outer Margin, Inner Margin, Border)

- **RULE** The larger the inner margin (safe area) inside an object, the "safer" it feels; treat padding as a deliberate quantity, not a leftover.
  **Why** Book: "the larger the safe area inside the thing is, the safer it is". (opinion, vague) **Applies to** all. **Check** computed padding vs content. **Source** (p.335)

### 2.4 Size, position, angle

- **RULE** Specify size as W x H on the horizontal and vertical axes in points (the book's example rectangle: W 120p, H 80p). For irregular shapes, W and H are those of the smallest rectangle that contains them.
  **Why** One uniform measurement model across shapes. **Applies to** all (design handoff). **Check** n/a. **Source** (p.336-337; figure p.337: an 80x80 circle and an 80x80 heart, each inside a dotted bounding square)

- **RULE** Points are not pixels. A point is a vector unit; on pixel-dense displays one point can be as large as four pixels or more (book wording: "four pixels or more"). Design in points, expect denser rendering.
  **Why** Elements must be large yet sharp and precise on dense screens. **Applies to** all. **Check** compare design units to device pixel ratio. **Source** (p.337) [see section 7: the "4 pixels" phrasing is loose; 1 point = 2x2 = 4 px at @2x]

- **RULE** Position is the X, Y coordinates of the object's bounding box relative to the artboard (origin 0,0 at top-left, X to the right, Y downward). Circles and blobs are positioned by their bounding box, not their centre.
  **Why** Single positioning rule for every shape. **Applies to** all. **Check** n/a (tool convention). **Source** (p.338-339; figure p.338: an 80x80p rectangle at X=0,Y=0 and another 80x80p at X=70,Y=160 on a ruler grid; a circle "ellipse 80x80p" at (0,0) sits in its square bounding box. Note the second rectangle in the figure is labelled 70,160 but plotted near x~130 on the ruler: see section 7)

- **RULE** Rotation is a number in degrees; 0 is default; negative values allowed; -15 degrees = 360 - 15 = 345 degrees. Type the exact angle from the keyboard rather than rotating by hand.
  **Why** Hand rotation is imprecise and produces inconsistent interfaces. **Applies to** all. **Check** computed `transform: rotate()` values should be clean numbers (e.g. 15, 45, 90). **Source** (p.339; figure: four squares 0 degrees, 15 degrees, -15 degrees, -45 degrees with equivalents -345, 345, 315)

- **RULE** Flattening a rotated object resets its angle to 0 while the object stays visually rotated; the new orientation becomes the new rotation base.
  **Why** Tool behaviour; relevant when re-rotating or exporting. **Applies to** design tools. **Check** n/a. **Source** (p.339)

- **RULE** Rotating a circle changes nothing visible unless it has a gradient or photo fill.
  **Why** Rotational symmetry. **Applies to** all. **Check** n/a. **Source** (p.340)

### 2.5 Border radius

- **RULE** Prefer slightly rounded corners over sharp ones: even a radius of 2 to 6 points is read as friendlier than 0.
  **Why** Rounded shapes are perceived as more welcoming than pointy ones (book cites "numerous studies", no citation given). **Applies to** all (buttons, cards, inputs). **Check** computed `border-radius` on cards/buttons/inputs >= 2px unless a deliberate brutalist/corporate stance. **Source** (p.346-347)

- **RULE** Keep roundness consistent across the UI, define the radius from the grid base unit (e.g. multiples of the base unit such as 4/8), and make it blend with its surroundings (nested elements should look concentric to their containers; inference).
  **Why** Consistent radius reads as one system; random radii read as noise. **Applies to** all. **Check** set of distinct `border-radius` values across the page is small (<= 3-4 tokens) and each is a multiple of the base unit. **Source** (p.347). Note: "multiples of base unit" is my concretisation of "defined by the grid base unit"; the book gives no numbers beyond the 2-6p note.

- **RULE** Different radii on different corners of one object are allowed (they can make a distinctive button) only if they follow the brand rules (e.g. the logo has the same pattern) and are identical on every screen/display.
  **Why** Asymmetric corners are a brand signature, but inconsistent use breaks it. **Applies to** brand-led landing pages. **Check** all instances of the component share the same per-corner radii. **Source** (p.347; figure: one wide dark rectangle labelled "Corner radius at 60" on the top-left and "at 02" on the top-right, with the lower corners also differing)

### 2.6 Shape families

- **RULE** Use curves (circles, ellipses, arcs, waves, blobs) on modern, user-friendly sites to signal new, fresh, welcoming, but "use them with caution" and do not overdo them. (Curves)
  **Why** Curves feel friendly (wavy graphics signal "everything is new, fresh, and welcoming here"). **Applies to** landing page. **Check** visual; count of decorative wave/blob graphics per page (suggest <= 1-2, my number). **Source** (p.348-349; figure p.349: hero with nav "Pixsel / Home / About / Your Books / Help", headline "A Problem well Stated Half Solved..?" in black with the last words in blue, a small light-blue "Read More" button, 3D bell and papers illustration at the right, and two overlapping sine waves in lavender and dark slate forming the bottom third)

- **RULE** Lines and points are the most fundamental shapes and convey serenity and minimalism; they work best in a clean, well-balanced arrangement. Line weight and style carry meaning: thin vs thick differ, curved vs straight differ, solid/dotted/dashed differ. (Lines and points)
  **Why** Each line property is a different signal. **Applies to** charts, dividers, minimal layouts. **Check** visual. **Source** (p.349-350; figure p.350: a line chart with two series, one blue and one dark slate, with ring-shaped point markers, dashed axes with tick labels 0-50 and 0-130)

- **RULE** Use circles/ovals for: backdrop decoration, introducing features, and isolating buttons (play buttons, avatars). Circles read as trustworthy, complete, harmonious, in motion (wheels, balls); they "clean up your hierarchy" if used correctly. (Circles)
  **Why** A circle is a perfect shape, same from every angle. **Applies to** all. **Check** visual; avatar and icon-button elements use `border-radius: 50%`. **Source** (p.351-352; figure p.352: a dark slate profile card with a circular avatar ringed in blue, name "Oliver's Jon Son", role "UI/UX Designer"; next to it a video card with a "Circle Use Play" circular blue play button at bottom-right over the title "The Polis Mask Short Film")

- **RULE** Use diagonal backdrops and slanted lines to create an off-center, dynamic, gridless feel, natural "breaks" in the page content, a sense of speed; pair with photos or graphics that move. Offer tags (e.g. "10% OFF") are a good diagonal use. Use sparingly: excessive diagonals turn a design from amazing to "unworkable". (Diagonals)
  **Why** Diagonal = motion; it also breaks the monotony of the rectilinear grid. **Applies to** landing page hero/section dividers, promo tags. **Check** visual; count of skewed/rotated blocks per viewport. **Source** (p.352-353; figure p.353: "pixselacademy" mock with headline "The line of life is a Ragged DIAGONAL Between duty and Desire." (DIAGONAL in blue), a parallelogram-shaped image panel pair (orange plant and a burger photo) skewed, and a rotated dark "10 % OFF" tag overlapping the panel)

- **RULE** Thin triangles can replace arrows or pointers. Small triangles can form mosaic/interlocking collages. Large triangles stand out, so analyse their significance before using them big. Triangles sitting on a base, or with the point facing right (message of progress), are "always the finest choice". Ideal for modern and abstract interfaces. (Triangles)
  **Why** A triangle conveys direction like a diagonal but with a fixed angle, so it fits specific contexts better. **Applies to** landing page, abstract/modern brands. **Check** visual. **Source** (p.353-354; figure p.354: two downward-pointing triangles (dog on blue, headphones on yellow) with an upward-pointing triangle (pancakes) between them interlock as a mosaic under the line "There is a very good saying that if triangles invented a god, they would make him three-sided" with a "May I Help...!" speech bubble)

- **RULE** Use squares/rectangles as the foundation or frame of a design. They signal security and confinement; they are familiar, fade into the background quickly, and their emotional effect is mostly subliminal. They form the grid layout of every webpage and hold most text because the eye comprehends them easily. Squares fit corporate and serious interfaces while staying modern; play with stroke and fill to get strong results. (Squares and rectangles)
  **Why** Familiar, easily parsed. **Applies to** all (default container). **Check** visual. **Source** (p.355-356; figure p.356: three square video thumbnails ("Lions Day Out", "Butterfly Mom", "GENE") with a two-line caption under each, separated by thin vertical dividers)

- **RULE** Shape has no well-defined standards in UI (unlike type and colour): test shape alone or combined with established UI patterns to find what works for your users. (Experiment)
  **Why** No codified system exists. **Applies to** all. **Check** n/a. **Source** (p.356)

### Audit additions (audit 2026-10-15)

- **RULE** When an object uses different radii per corner, pair them diagonally: top-left and bottom-right large (figure: 60), top-right and bottom-left near-sharp (figure: 02), giving a leaf/tab silhouette that reads as one deliberate shape.
  **Why** Figure p.347 (zoomed): TL and BR carry the large curve, TR and BL the tiny one; a diagonal pairing keeps the shape rotationally balanced, which is what makes the "wonderful button" the text promises (the pairing is shown, not stated).
  **Applies to** brand-led buttons, tags, cards. **Check** `border-radius` with 4 values where value1 == value3 and value2 == value4 (CSS order TL TR BR BL). **Source** (p.347) (audit 2026-10-15)

- **RULE** To get a pill/stadium end, set the radius to half the box's short side: in the radius demo the radius-40 box (drawn about 80 units high) has full semicircular ends, while radius 10 and 15 on the same box only soften the corners.
  **Why** Figure p.346: the four boxes are drawn roughly 1.85:1 wide (not the 100 x 100 the caption says); 40 is about half the drawn height, so its ends close into semicircles.
  **Applies to** buttons, chips, tags, toggles. **Check** pill elements: computed `border-radius` >= `height / 2`; non-pill elements: radius clearly below `height / 2`, not hovering just under it. **Source** (p.346) (audit 2026-10-15)

- **RULE** Isolate a circular avatar or circular play button with a thin (about 1-2 px) concentric accent ring separated from the circle by a gap of roughly 9% of the inner circle's diameter.
  **Why** Figure p.352 (measured): avatar about 93 px with its ring at about 110 px (gap about 8.5 px), play button about 58 px with ring at about 68 px (gap about 5 px): the same proportion on both, so the ring reads as one system; the gap is what "isolates" the button the text talks about (proportion measured from the figure, not stated).
  **Applies to** avatars, play/record buttons, selected states of circular controls. **Check** ring element (outline or box-shadow) diameter minus inner diameter about 0.18 x inner diameter; `outline-offset` > 0 with a 1-2 px outline. **Source** (p.351, p.352) (audit 2026-10-15)

- **RULE** Media that sits flush against a card's top and sides takes the card's corner radius on those corners; give sibling cards in one row the same corner radius.
  **Why** Figure p.352: the film still runs edge to edge at the top of the video card and its top corners follow the card's curve; the profile card beside it uses the same radius, so the two read as one family.
  **Applies to** cards with media, video tiles, product cards. **Check** flush child's top radii == parent radii (or parent `overflow: hidden` clips it); sibling cards share one `border-radius` value. **Source** (p.352) (audit 2026-10-15)

- **RULE** Give every diagonal element in a composition one shared slant: skewed image panels, their offset outline frame and the offer tag (including its text) all run at the same angle, about 20 degrees in the figure.
  **Why** Figure p.353 (measured): the panels' top edge and the "10 % OFF" tag text both rise at roughly 20-21 degrees, and the tag overlaps the panel edge to link text and image; one angle keeps the "dynamic" look ordered instead of crooked everywhere.
  **Applies to** landing page sections with diagonal treatments, promo tags. **Check** all `skew()` / `rotate()` values on diagonal elements in a section are equal (within 1 degree). **Source** (p.352, p.353) (audit 2026-10-15)

- **RULE** Build a triangle mosaic by alternating orientation (down / up / down) so the slanted edges interlock, with one equal narrow gutter between every pair of pieces.
  **Why** Figure p.354: dog (pointing down), pancakes (pointing up), headphones (pointing down), each a photo masked to a triangle, separated by equal light gutters; alternating is what makes the pieces "interlocking" rather than a row of loose triangles.
  **Applies to** landing page image collages, editorial sections. **Check** visual; perpendicular gap between adjacent triangle edges constant. **Source** (p.353, p.354) (audit 2026-10-15)

- **RULE** In a row of square media thumbnails, keep every thumb the same size and radius, left-align a two-line caption under each (truncate with an ellipsis rather than growing a third line), and separate columns with full-height 1 px dividers.
  **Why** Figure p.356: three equal square posters with small rounded corners, captions such as "Watch The Movie For / Lions Day Out..." clipped at two lines, left edge of caption == left edge of thumb, thin vertical rules between columns; the square repeats calmly and "fades into the background", leaving the content to speak.
  **Applies to** media grids, course/video libraries. **Check** thumbnails equal width == height; caption `-webkit-line-clamp: 2`; caption `left` == thumb `left`. **Source** (p.355, p.356) (audit 2026-10-15)

- **RULE** Draw UI shapes and icons as vectors (defined by numbers) so they can be enlarged without losing quality; never ship rasterised shapes that will be scaled.
  **Why** Every current UI tool uses vector shapes: scaling only changes the numbers and redraws the object (p.331-332, p.348).
  **Applies to** all. **Check** icons and decorative shapes are SVG/CSS, not PNG/JPG; no raster asset rendered above its intrinsic size. **Source** (p.331, p.332, p.348) (audit 2026-10-15)

- **RULE** Use a short centred hairline divider, lighter than the text, to separate a name from its role in a compact profile card, instead of extra spacing or a full-width rule.
  **Why** Figure p.352: "Oliver's Jon Son" and "UI/UX Designer" are split by a thin divider about 40% of the card width, which groups the two lines while keeping the card quiet.
  **Applies to** profile cards, team cards, testimonial attributions. **Check** divider width < 50% of card content width, 1 px, low-contrast colour. **Source** (p.352) (audit 2026-10-15)

## 3. Numbers & scales

| Item | Value (as given) | Source |
|---|---|---|
| Example rectangle | W 120p x H 80p | p.336 |
| Example square / circle / heart | 80 x 80 p each | p.337-338 |
| Position examples | (0,0) and (70,160) | p.338 |
| Rotation equivalence | -15 deg = 360 - 15 = 345 deg; 15 deg = -345 deg; -45 deg = 315 deg | p.339 |
| Point vs pixel | one point can be as large as four pixels or more on dense displays | p.337 |
| "Slightly softened" corner range | 2 to 6 p (vs 0 p = sharp) | p.347 |
| Border radius demo | four 100 x 100 rectangles with corner radius 0, 10, 15, 40 (40 gives a pill/stadium end on a wide-ish box) | p.346 |
| Asymmetric radius demo | corner radii labelled 60 and 02 on one wide rectangle | p.347 |
| Hue weight order (darkest to lightest) | red #FC474B, blue #7CC5EC, green #CCFD8E, orange #FEC06B, yellow #FFF5AA | p.342 |
| Saturation pairs (pale / saturated) | red #FEC0C1 / #FC111E; orange #FED489 / #FD9827; green #ADF79B / #2BFD2F; blue #9DDBFD / #1CA5FC | p.342 |
| Contrast demo | #ACB4C6 (light) vs #495A7C (dark) | p.343 |
| Recall test | look "a few seconds", close eyes | p.331 |
| Radius demo, as drawn | boxes drawn about 1.85:1 (about 150 x 80 units) despite the "100 x 100" caption; radius 40 = half the height = full pill; 10 and 15 = about 12% and 19% of the height (audit 2026-10-15) | p.346 |
| Per-corner pattern | TL 60 and BR large; TR 02 and BL near-sharp (diagonal pairing, read from zoomed figure) (audit 2026-10-15) | p.347 |
| Ring around circular controls (measured) | avatar about 93 px, ring about 110 px; play button about 58 px, ring about 68 px; gap about 9% of inner diameter; ring about 1-2 px (audit 2026-10-15) | p.352 |
| Diagonal slant (measured) | panels, frame and "10 % OFF" tag all about 20-21 degrees (audit 2026-10-15) | p.353 |
| Box model figure (measured) | outer margin == inner margin, about 42 px on all four sides at page scale; margin and padding drawn as rounded dashed boxes concentric with the object (audit 2026-10-15) | p.334 |
| Orientation demo (measured) | vertical bar about 83 x 240 page px; diagonal copy rotated about 40 degrees clockwise (audit 2026-10-15) | p.341 |
| Card radius in circle figure (measured) | profile and video cards share one radius, about 18 page px (audit 2026-10-15) | p.352 |

Visual-weight property table (higher = heavier):

| Property | Heavier | Lighter | Source |
|---|---|---|---|
| Size | larger bounding box | smaller | p.336 |
| Shape | regular (circle, square) | irregular (star) | p.340-341 |
| Orientation | diagonal > vertical > horizontal | | p.341 |
| Hue | red, blue | green, orange, yellow (in that darkness order) | p.342 |
| Saturation | saturated | desaturated | p.342 |
| Colour context | coloured splash in neutral field | uniform | p.343 |
| Contrast | high vs surroundings | low | p.343 |
| Texture | textured | flat | p.343 |
| Z-depth | foreground | background | p.344 |
| Subject | face/eyes; audience's interest | other | p.344-345 |
| Motion | moving | static | p.346 |

Shape-to-meaning table:

| Shape | Meaning / use | Caution | Source |
|---|---|---|---|
| Curve / wave | new, fresh, welcoming; modern user-friendly sites | do not overdo | p.348-349 |
| Line, point | serenity, minimalism, clean balanced layouts; weight and style change meaning | | p.349-350 |
| Circle, oval | harmony, equilibrium, trust, perfection, strength/vitality; backdrop decoration, feature intro, isolated buttons | | p.351 |
| Diagonal | movement, dynamism, speed, off-center, gridless, content breaks | excess = unworkable | p.352-353 |
| Triangle | direction, progress (point right), stability (on a base); arrows, pointers, mosaics | large ones dominate | p.353-354 |
| Square / rectangle | security, confinement, corporate/serious, grid, text containers | fade into background | p.355 |

## 4. Dos and Don'ts

The chapter has no explicit good/bad pairs; the figures are paired comparisons that illustrate one variable at a time. Precise descriptions so they can be reproduced:

- **Size / bounding box (p.336-337):** a dark slate (#495A7C-like) rounded rectangle with soft shadow dimensioned 120 wide x 80 high; beside it an 80x80 circle and 80x80 heart, each shown with a dotted square bounding box. Lesson: measure every shape by its bounding box.
- **Shape (p.340):** two solid dark navy forms of similar extent, a circle and a five-point star. Circle is heavier.
- **Orientation (p.341):** top figure: one tall narrow rounded rectangle (about 85 wide x 240 tall) and one wide short one (about 245 x 85). Tall is heavier. Bottom figure: the tall one vs a copy of the wide one rotated roughly 40 degrees clockwise; diagonal is heavier than both.
- **Hue (p.342):** five rounded swatches in a row, left to right: red, blue, green, orange, yellow, hex labelled under each; reads as heavy to light.
- **Saturation (p.342):** four columns, each a pale tint on top of a full-chroma version (red, orange, green, blue). The bottom (saturated) half pulls more.
- **Contrast (p.343):** two rounded square chips with a thin vertical divider: pale grey-blue vs deep slate with white labels.
- **Texture (p.343):** flat slate chip vs black/white checkerboard chip.
- **Z-depth (p.344):** left, flat card with a blue circle; right, same card turned in perspective (isometric parallelogram) with the blue disc lifted by a shadow. The lifted one is heavier.
- **Faces (p.345):** a two-column card: left a small block with headline "YOUR SUCCESS" (blue-slate caps), "IS OUR BUSINESS." (black bold) and 5 lines of small body copy; right a square photo of a woman talking on a phone. Eye goes photo first, then the headline.
- **Border radius (p.346):** four 100 x 100 boxes (rendered wider than tall) with radii 0, 10, 15, 40: square, softly rounded, more rounded, nearly pill.
- **Per-corner radius (p.347):** a wide slate rectangle with different radii top-left (large, 60) and top-right (small, 02) and the bottom corners also differing. Valid only when it matches the brand.
- **Curves in a hero (p.349):** wave background used as a graphic base with the headline above and the CTA on the wave's edge. (Observation: the "Read More" button overlaps the wave edge; the book presents it as a good example, not as a collision.)
- **Circles in UI (p.352):** avatars and play buttons as circles, reading as isolated, tappable, friendly objects.
- **Diagonals (p.353):** skewed image panels plus a rotated discount tag. Rotated text and tags carry energy.
- **Triangles (p.354):** triangle image masks alternating down / up / down, forming an interlocking strip.
- **Squares (p.356):** uniform square thumbnails in a row, captions underneath.
- **Per-corner radius, full reading (p.347) (audit 2026-10-15):** do pair large radii on opposite corners (TL + BR) and small on the other two (TR + BL); don't mix one large corner with three random ones, which reads as a rendering error rather than a brand shape.
- **Avatar ring (p.352) (audit 2026-10-15):** do separate the ring from the photo with a visible gap (about 9% of the diameter); a ring touching the photo reads as a thick border and loses the "isolated" effect the book attributes to circles.
- **Diagonal treatment (p.353) (audit 2026-10-15):** do run every slanted element at one angle (about 20 degrees); don't mix slants, which turns "dynamic" into the "unworkable" the book warns about.
- **Triangle mosaic (p.354) (audit 2026-10-15):** do alternate down / up / down with equal gutters; don't line up same-direction triangles with uneven gaps (no interlock).
- **Drag/target placeholder (p.332) (audit 2026-10-15):** the "This > Goes > Here" figure shows the object as a solid slate rounded rectangle with a soft shadow and the destination as the same shape in a pale fill with a dashed outline and pale label: a ready visual grammar for drop targets and empty slots (figure only, no rule stated).

## 5. Exceptions & judgement calls

- **Weight is relative and multi-dimensional.** The book never says how to trade dimensions off (does a small saturated button beat a large grey one? no guidance). Judge by the recall test.
- **Rectangles-vs-ellipses claim.** "Rectangles are the most common shape (right after ellipses)" (p.332) is contradicted by the surrounding text that UI design is mostly pushing rectangles. Treat rectangles as the default container.
- **Rounded vs sharp.** The book prefers 2-6p softening as friendlier, but also says squares suit corporate/serious interfaces (p.355). Sharp corners are a deliberate stance for serious/corporate/editorial brands; the friendliness claim is a general tendency, not a requirement. (opinion/context)
- **Per-corner radii** only if the brand logo has the same pattern (p.347); otherwise keep uniform.
- **Curves and diagonals are both "use with caution"**; no numeric limit is given.
- **Orientation claims** (vertical heavier than horizontal; diagonal heavier still) are asserted with no mechanism; conflicts with the common reading-direction view that horizontal text lines are the default flow. Do not apply to text blocks.
- **Hue order** ("red, blue, green, orange, yellow" darkest to lightest) mixes darkness with intensity; the pastel-ish swatches shown are not the hues' pure forms. Use it only as a tendency.
- **Triangle direction**: "point looking to the right" = progress; a base-down triangle = stable. Left/RTL contexts invert the progress reading (engine note below).

**[engine note]** The following are my additions, not from the book:
- Focal-point discipline: for a given section keep 1 dominant focal point and at most 1-2 secondary ones; if more than that carry large + saturated + contrasting weight, the hierarchy collapses. Mechanical proxy: ratio of the top-weight element's area x chroma x contrast to the second.
- Single accent colour in a neutral field (p.343) maps onto one primary CTA per viewport.
- Nested radius: inner radius = outer radius - padding, to keep concentric corners (standard UI craft; the book only says "blend with surroundings").
- For RTL locales mirror "pointing right = progress".
- Faces: use a real face looking toward the headline/CTA to carry gaze (gaze cueing), a common eye-tracking finding not in the book.
- Treat the rotated "diagonal" tag and parallelogram image panels as decoration with accessibility cost: keep text legible (rotation <= about 15 degrees for text) and do not clip content on small viewports.

## 6. Figures worth keeping

All copied to `examples/ui-pedia/objects-and-shapes/`:
- p.334: box model diagram (fill, border, inner margin = padding, outer margin = margin).
- p.336: size W x H (120p x 80p) with measurement guides.
- p.337: bounding box of a circle and a heart (80 x 80 each).
- p.338: position on X/Y ruler (two 80x80 rectangles plus ellipse at 0,0).
- p.339: rotation 0, 15, -15, -45 degrees with equivalents.
- p.341: orientation: vertical vs horizontal, then vertical vs diagonal.
- p.342: hue order swatches and saturated vs pastel pairs, with hex.
- p.343: contrast pair and texture pair.
- p.344: z-depth, flat card vs raised disc with shadow.
- p.345: face photo beats headline (BestBuy example).
- p.346: border radius 0, 10, 15, 40 on 100 x 100 boxes.
- p.347: asymmetric per-corner radius (60 / 02).
- p.349: wave hero example (curves, with caution).
- p.352: circle usage (avatar profile card, circular play button).
- p.353: diagonals (skewed image panels, rotated offer tag).
- p.354: triangles (inverted-triangle image mosaic).
- p.356: square video thumbnails.
- p.332 (audit 2026-10-15): solid object vs dashed ghost target ("This > Goes > Here").
- p.352 zoomed (audit 2026-10-15): ring-with-gap on both a 93 px avatar and a 58 px play button, and flush media taking the card's top radii.

## 7. Open questions

- **p.337 point vs pixel:** "one point can be as large as four pixels or more": likely refers to 2x2 = 4 device pixels at @2x; "or more" for @3x (9 px). The book's wording is loose; the figure does not show it. Do not read as a hard rule.
- **p.338 position figure:** the second rectangle is labelled X=70, Y=160 but is plotted visually near x ~ 130-160 on the horizontal ruler, and its Y position on the ruler reads ~35-70; the figure's labels and ruler appear inconsistent (the ruler may use different units than the caption). Take the caption values as the intent only.
- **p.339 rotation direction:** the text says angle is clockwise rotation, but the figure shows the 15 degrees chip with a counter-clockwise arrow and labels it "Or -345 degrees" while the -15 degrees chip has a clockwise arrow; OCR text of the 15 degrees label ("Or 345") is wrong. Sign convention is ambiguous (tool-dependent: Figma positive = counter-clockwise, CSS positive = clockwise). Do not rely on this page for direction.
- **p.346-347 border radius figures:** the figure says "4 Rectangle of 100 x 100 Pxls" but the shapes are drawn wider than tall; units are "points" in the text but "Pxls" in the label. The p.347 per-corner figure is labelled "At 60" and "At 02" only; which of the lower corners get which radii cannot be read.
- **p.347 "2 and 6p":** checked in the image; the OCR "op" was "6p".
- **p.331 / p.332 / p.344 etc.:** "shapes ... carry meaning" claims (trustworthiness of circles, etc.) are asserted without sources (opinion).
- **p.343 contrast demo:** only two chips; no ratio given. Contrast here is about visual weight, not WCAG; do not conflate with text contrast rules (see colour/accessibility notes).
- **p.346 Movement:** relies on an external Google URL that is not visible in the book; no specifics on motion type or duration.
- **Pages with no rule content:** p.333 (pull quote only: "UI design is about moving rectangles around. And the skill is all in knowing HOW to move them, WHERE and most importantly WHY."); p.332 (rectangle statement plus a decorative "This > Goes > Here" figure: a solid slate rounded rectangle, a squiggle arrow, a dashed ghost rectangle; illustrates moving rectangles, no rule); p.329 (chapter title, intro, hero art of four gradient shapes: square, circle, triangle, pentagon); p.330 (definition text already captured in rules); p.331 (vector shapes remark: UI tools use vector shapes defined by numbers, scale without quality loss; no rule beyond that); p.348 (how-to-use-shapes preamble, vector/curve definitions; the only actionable line is "use curves with caution").
- **Coverage:** all pages 329-356 reviewed in text and image; none skipped.
- (audit 2026-10-15) corrected: p.354 triangle mosaic, was "three downward-pointing inverted triangles", page shows two downward-pointing triangles (dog, headphones) with an upward-pointing one (pancakes) between them (p.354).
- (audit 2026-10-15) p.347 lower corners are readable on a zoomed crop: bottom-right is large (matches top-left), bottom-left is near-sharp (matches top-right). The exact values of the lower corners are not labelled; only "60" and "02" are.
- (audit 2026-10-15) p.338 position figure: the "(70,160)" label sits at the second rectangle's bottom-right corner, which is at ruler x=160, y=70; the caption appears to swap X and Y and to reference the far corner instead of the origin corner. Do not use this figure to learn the coordinate convention.
- (audit 2026-10-15) p.335 text says the outer margin is "the blue space" and the inner margin "the darker area inside our colorful rectangle", but the p.334 figure is slate with dashed outlines and no blue or darker band: the text describes a different illustration.
- (audit 2026-10-15) p.331: "use Keynote or PowerPoint to familiarise yourself with forms and their relationships before moving on to Sketch, Figma, Adobe XD": learning advice, no design rule.
- (audit 2026-10-15) p.350 chart: hollow ring point markers (white fill, coloured stroke) on both series; the y-axis "0" label sits above the x-axis line, a figure error, not a rule.
- (audit 2026-10-15) coverage: all 28 page images p.329-356 viewed (p.346, p.347, p.352, p.354 also zoomed). Pages with no rule content beyond what is captured: p.329 (title/intro/hero art), p.330 (definitions), p.333 (pull quote), p.348 (curve definition preamble), p.350-351 (shape-meaning prose; the p.350 chart only illustrates lines). Measured values added above are labelled as measured; the book itself gives no radius, ring, gap or angle numbers beyond 2-6p, 0/10/15/40 and 60/02.
- (audit 2026-10-15) Format fix: rules written as `**RULE (qualifier)**` were invisible to `tools/build_index.py` (its opener regex does not accept a parenthesised qualifier inside the bold), so they never reached `system/rules/index.json`. Normalised to `**RULE** <text> (qualifier)`; wording unchanged.
