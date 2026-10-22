# Cadence app: revision checklist (UI Pedia rules + Tanjim TG + founder)

Each revision pass ticks these by measurement, then runs gate.mjs (incl. centring), check.mjs and a side-by-side against the Tanjim kanban replica.

## 04-alignment
- [ ] Align elements to shared edges or center-lines; every element should line up with something else on the page.
- [ ] Connect related items by aligning them in the same row or column, as a table does; use this to make information scannable.
- [ ] When a list repeats a pattern (marker + title + description), start every row's marker on one x and every row's text on one x.
- [ ] Elements that belong to one brand/identity block (logo + slogan, heading + subheading) should share one alignment edge (both left-aligned) and sit close together.
- [ ] Align a row of items on a common top, bottom or center line; you need not align all three.
- [ ] If the items' heights differ dramatically, align by top (or bottom).
- [ ] If heights differ only somewhat, align by center.
- [ ] Align items on a common left, right or center vertical line; again one of the three suffices.
- [ ] Set a max-width on all content from the start; content then aligns to the same left and right edges regardless of push left/right.

## 06-whitespace
- [ ] Treat whitespace as a content-bearing design element, not leftover. Do not fill empty areas just because they are empty; defend it against "use the space for more information" requests.
- [ ] Use macro whitespace to organise material in the layout and guide the user through content blocks: page margins to the left and right of the content, and the space between content blocks.
- [ ] Use micro whitespace inside design elements: between text lines, between paragraphs, between grid pictures, between menu links, between the image, label, heading and body of a card.
- [ ] Give card contents room: the book's "good" card has visible padding on all sides and distinct gaps between category label ("Travelling"), headline ("Why Travel the World this year?") and body text; the "bad" card h
- [ ] As content volume rises, macro whitespace shrinks and micro whitespace must grow; keep the balance so pages are not "solid slabs of data".
- [ ] Choose the macro/micro mix from four factors: content, design (the style the designer chooses), user (demographics, audience research), brand message.
- [ ] Do not apply one "ideal" whitespace ratio across audiences; test with the target users.
- [ ] Use generous whitespace when the brand should signal quality or high budget (the book cites Apple, Mercedes-Benz, IKEA). (opinion)
- [ ] Pick the macro amount by tone: large macro whitespace for minimalism and elegance; smaller macro whitespace for sites meant to look informative (news).

## 07-proximity
- [ ] Place related elements near each other; separate unrelated elements with clearly larger gaps. Gap *between* groups must be visibly larger than gap *within* a group.
- [ ] Use different amounts of whitespace to express group membership, including within one row. Example: put the Search field on the same line as the primary navigation but with extra whitespace to its left, so it reads
- [ ] If the separating gap cannot be preserved at a smaller viewport, move the item out of the group instead of letting it merge. TfL-style example: on smaller screens the Search was moved up and away from the main nav;
- [ ] Group an icon with its label by proximity or shared region (the book's own criticism of the sample site: Search label and its icon are not grouped).
- [ ] In text, group sentences into paragraphs divided above and below by whitespace; put a heading closer to the text beneath it than to the preceding section's text.
- [ ] Cluster related form fields. 12 fields as one block look too difficult; the same 12 fields as three groups of four look straightforward.
- [ ] Make the groupings meaningful: shipping information in one group and billing information in another. Do not group arbitrarily just to create gaps.
- [ ] Keep a top-aligned label very close to its own field and put a bigger gap before the next label-field pair.
- [ ] Never place a button or control among unrelated controls. Group only related actions; put the primary on-page action next to the content it acts on. The EDD example: the "Add" button (adds a required employer) sits

## 10-icons
- [ ] Use glyph (solid) icons when icons must work at small sizes; accept that they can lack visual interest at larger sizes.
- [ ] Use colored icons (solid or gradient) sparingly; excessive use is bad for UX.
- [ ] Use duotone icons (two related-but-different colours, built by splitting the icon into two layers e.g. outline + fill and tuning layer opacity) when you want a little more visual appeal without overwhelming the des
- [ ] Outlined icons (vector strokes, empty inside) suit simple, minimalist, professional looks; know that they may take users longer to process and recognise than solid icons.
- [ ] Represent universal operations (home, print, search, share, delete, menu, settings) with the universal symbol (e.g. search = magnifying glass). You may restyle the icon but keep the core form and concept.
- [ ] Whenever a unique (non-universal) icon is used, add a text label next to it.
- [ ] When icons "conflict" (same meaning, several accepted glyphs: thumbs-up, heart, star for "like"), choose the one that suits the interface best and use only that one everywhere in the interface.
- [ ] Use ambiguous symbols such as the heart with caution: the same heart means "like" on Instagram and Facebook but "favourite/add to list" on Spotify-like sites.
- [ ] Consider the audience: icons at their best are simple for a certain group and universal across cultures, ages and backgrounds; choose metaphors and colours that will appeal to your actual users.

## 13-buttons
- [ ] Use a button (real action control) for actions that change data or state: "submit", "merge", "make new", "upload". Use a link for navigation to another location ("see all" page, a person's profile) and for anything
- [ ] Give any custom clickable element that acts like a button `role="button"`; prefer a native `<button>`. Designers must work with developers so screen readers announce a button control.
- [ ] Define six states for every button style: Normal (active and interactive), Focus (keyboard or other input highlighted), Hover (cursor over), Active/pressed, Progress/Loading, Disabled.
- [ ] Each state needs a distinct affordance, but state changes must not significantly modify the component or add excessive visual noise.
- [ ] Use a loading state when an action is not completed immediately.
- [ ] Avoid disabled buttons whenever possible. Leave the button enabled; if required info is missing, highlight the blank/invalid fields (red outline, error icon) or show a notification on press.
- [ ] (When a disabled button must exist) it signals a component that is currently inactive but may be enabled later; used because removing a button from its natural place and showing it later could confuse.
- [ ] Create a hierarchy of actions: usually one conspicuous primary button, multiple medium secondary, and low-importance tertiary actions. Figure (p.293): primary = filled gradient button; secondary = outlined button (
- [ ] Make the most frequently used button the default: primary style, and focus it.

## 20-cards
- [ ] Build a card from, in order, four parts: rich media (image), primary text (title), supporting text (short description), actions. Add subheadings or icons only when needed.
- [ ] One card = one idea, item or piece of content. If two concepts appear, split them into two cards. Navigation (Prev/Next) belongs outside the card, between cards.
- [ ] Make cards self-contained and reorderable. A card must make sense when moved, filtered or resized.
- [ ] Make the entire card clickable, not just a small link inside it.
- [ ] Use a list, not cards, for homogeneous content where each item is smaller than a few lines (title plus one or two lines). Show items as rows in one shared container separated by dividers, not as separate bordered b
- [ ] Use a table, not cards, for large data sets with many similar variables that need to be scanned, sorted and/or filtered.
- [ ] If order and search are vital (data work), use a list or grid, not cards. Cards are for exploring.
- [ ] If titles matter more than graphics, or the user must wade through a lot of repeated data, use a different layout.
- [ ] Use cards for a bounded number of rectangular pieces. For showing goods "in a more grandiose way", consider another design option.

## 23-shadows-and-blurs
- [ ] Pick one light direction for the whole interface and keep it; every shadow's X/Y offset points the same way.
- [ ] The higher an element is on the z-axis, the wider and more diffuse its shadow: raise blur and spread (and offset) with elevation.
- [ ] Treat X, Y and Blur as the three values that matter most; spread is a refinement. A negative spread makes the shadow look cast by a smaller piece (e.g. Y 20, Blur 0, Spread -10 shows a thinner crescent than Spread 
- [ ] Blur 0 gives a hard edge; N blur spreads N pixels in and out from the shadow's edge, and higher values give larger and more diffuse shadows.
- [ ] Hard offset-only shadows (blur 0) are an available style: offsets of 2 in each axis produce an edge/outline-like shadow on one or two sides; the six combinations are (0,2), (2,0), (2,2), (0,-2), (-2,0), (-2,-2). Mu
- [ ] Default to outer (drop) shadows for elevation; a standard one uses an offset (x, y or both from the centre), a blur and an opacity.
- [ ] Use inner shadows only for form inputs (fields, checkboxes, radio buttons) and for extruded objects in neumorphism, and sparingly.
- [ ] Use shadows to show interactivity: on hover a button gets a shadow to stand out from the background; on press/tap the shadow gets smaller (the element "pushes down"), the way a real button's height falls and its sh
- [ ] When stacking components on top of each other (flat style excepted), separate them with shadows on the z-axis: dropdowns and modals appear "above" page content while remaining distinct from inputs under them.

## 02-color
- [ ] Design the layout in grayscale first; only then choose a single brand colour, then choose the other colours that suit it.
- [ ] Choose colours that are consistent with the brand's personality; never use colours that contradict what the brand is trying to portray.
- [ ] Before committing to colour, define: brand personality, likely customers (the book names gender), tone to project, value proposition, and company age ("fresh and exciting" or "tried and true").
- [ ] Keep the goal as "a simple UI with sensible colors" rather than maximal colour.
- [ ] Match each hue's connotation to what the brand or product says (see the table in section 3): trust/security = blue, calm/regeneration = green, excitement = orange, joy = yellow, wealth/royalty = purple, energy/pass
- [ ] Keep in mind that meaning depends on culture and context; the same colour can mean opposite things (red = love and anger; black = mystery and death; warm colours = comfort or rage).
- [ ] Run colour options past potential clients/users before launching a website or a new corporate logo.
- [ ] Take colour inspiration from nature and art (e.g. the many greens of grass); natural-looking colours are chosen by people and "appear to be user-friendly".
- [ ] Use a deliberate UX palette to help readability, strengthen CTA buttons, improve navigation and meet subconscious aesthetic needs.

## 12-typography
- [ ] Pick the typeface to match the product's tone and theme; deliver page content "in the appropriate mood and tone".
- [ ] Map face character to use case as the book does: bold, fat, rounded face for attention on illustrated/cartoon-style sites (shown: heavy slab-like "APPLE / Mac Book M2 Chip" headline); pixelated face for a retro 198
- [ ] If a brand has a very distinctive typeface that is unsuitable for extended reading or small sizes, reserve it for infrequent display sizes (headlines) and pair it with a more legible typeface for the majority of lo
- [ ] Treat novelty styles (inline, ink/brush, script, whimsical, hand-drawn) as accent only; do not set sustained or functional text in them, and do not try to synthesise bold/italic on them.
- [ ] Use "cultural" faces (fake-Japanese or fake-Chinese looking letterforms, Disney-style, Coca-Cola-style logotype scripts) only with awareness; they "immediately" give the design a preconceived connotation.
- [ ] Work with brand/marketing on the typefaces; typefaces are "another way to quietly convey the correct tone and personality" and have to fit into the system.
- [ ] Keep the list of font weights/variants short; plan how many weights are needed for clear hierarchy on the most complicated screen, and load only those.
- [ ] Before adding a weight, check whether the hierarchy can be achieved by raising type size instead.
- [ ] For rare italic needs (one or two tiny uses), weigh loading an extra webfont against using browser-rendered italics.

## 15-tables-and-graphs
- [ ] Decide four things before drawing a table: cell data type (short numeric strings vs paragraphs/links/files), user task (read/compare vs edit/update/assign), target devices (mobile vs large desktop monitor), and whe
- [ ] Left-align every text column (anything made of letters: names, strings, links, paragraphs).
- [ ] Header alignment must equal the alignment of its column's data (left header over left text, right header over right numbers).
- [ ] Never centre-align table cells or column text (the book: "Don't (EVER) use center alignment").
- [ ] Do not repeat the column's word inside every cell. Put the shared word in the header and keep only the qualifier in the rows (e.g. header "Design Category", cells "UI", "Graphic", "UI & 3D" instead of "UI Design", 
- [ ] Right-align quantitative numbers (amounts: money and quantities; measures; percentages) so digits align by decimal position. Prepare data so every value in the column has the same number of decimal digits.
- [ ] Use tabular (fixed-width) digits in numeric columns. The book says "monospace typeface"; the goal is that every digit has the same width, so $1,111.11 does not look smaller than $999.99.
- [ ] Qualitative numbers may be left-aligned: dates, zip/postal codes, phone numbers. If the first column is a date written in digits, left-align it. "Otherwise, all the numbers should be oriented to the right."
- [ ] Column-management summary: textual data left; numeric data not related to size (date, zip, phone) left; numeric data related to size (count, percent) right; headers aligned according to their column data.

## Revision log (2026-10-22)
- **v1:** Tanjim code system (Geist 13.5/600). Self-review found an overflowing suggested slot, hard-cut meta, a clipped 45-min event, a wrapping guest line and a missing 8:00 label.
- **v2:** line boxes, ellipsis and labels fixed. The gate found off-ladder radii and type (declared as overrides for the bound system) and amber ink at 4.44:1 (fixed to 62% ink). The gate's centring check got three fixes: column blocks, a `place-items` bug, and ellipsis.
- **v3:** UI Pedia 07 proximity. Toolbar regrouped: 6 inside a group, 16 between groups. Min text 10px. The slot copy fits.
- **v4:** the "Protected" text removed, because the lock glyph says it.
- **v5:** side by side with his post, ours read small. UI scaled so it fills the frame like his posts.
- **v6:** full day restored, shorter titles, single initials (overlapping 2-letter initials were hidden).
- **v7:** rebuilt on his POST system, found by the kanban replica: Manrope 400 only, 0.5px rings as box-shadow, 34/r8 controls, sidebar 232 with 38 pitch and 18 icons, h1 40/400, a 16 gutter, the well ladder.
  - Grey tier darkened to clear AA.
  - Regression caught by the gate (contrast 1:1): a mid-line `//` comment had erased the accent token. Fixed.
- **v8:** the grid well fills exactly (6px inset on every side). Final: gate 0 FAIL (centring 0 off), check 0 FAIL (except the 1600-frame overflow artefact).
