---
source: ui-pedia
chapter: Cards
pages: 501-524
topic_tags: [cards, layout, components, lists, tables, hierarchy, actions, responsive, hover, imagery]
status: studied
---

# Cards

Page numbering: all (p.NN) are PDF pages (printed page = PDF page - 1). Measurements are almost absent in this chapter. The only hard numbers are "less than 100 characters or two short sentences" (p.520), "2 short sentences" for summaries, and a few counts. Where a figure's proportions are described below, they are visual estimates from the page image and labelled as such. The figures are one repeated stock card (image with rounded corners, title, subtitle "Snower Wall", two-line description, a filled periwinkle "Submit" and an outlined "Cancel") shown in good and bad pairs, with a red cross badge on the bad one and a green tick on the good one.

## 1. Core ideas

1. **A card is a content container for one idea.** It usually has an image, title, description, call to action, and subheadings or icons. What binds cards together is that each card symbolises one idea, item or piece of content. Nielsen Norman Group definition: a design pattern that bundles similar information in a flexible-size container that visually resembles a playing card (p.502).
2. **Cards are modular and self-contained.** They can be rearranged or altered, which is why card layouts are so common (p.503).
3. **Why they work:** colourful image, small bits of information and easy-to-click CTAs draw attention; a higher scroll rate and a greater impact than lists (claim, no data given); highly responsive because of the rectangular shape; easy to understand; familiar and intuitive; clickable and shareable; attractive and modern (p.503-504).
4. **Cards are not a universal solution.** Lists are more hierarchical, and better for browsing than searching. Cards take more space, so lists scan titles faster. Cards are better for exploring than for data where order and search are vital (p.505-506, p.516).
5. **Best domains:** SaaS (items as cards, e.g. Tenders), media/posts (Twitter, Instagram, BBC), entertainment (Netflix), e-commerce/delivery, task/activity managers, ed-tech (courses, teacher profiles), dashboards, real estate, profile-led apps (dating, healthcare, consultancy, pet) (p.506-511).
6. **Whitespace between cards helps focus in dashboards.** It "prevents users from becoming overwhelmed by the dashboard's intricacy" (p.510).
7. **Imagery carries a card.** Images are the primary attention-grabbers. Use high-resolution images, round the edges, and use either ample space or none at all with big photos (p.512-513).
8. **Keep a card simple but never boring.** Make the entire card clickable, and use effects, motion, colour, shading and space to entice engagement (p.516-517).
9. **Eight rules at the end (p.517-521):** differentiate actions, add visual hierarchy, resist excessive borders, limit links, one idea per card, limit content, know when to use a list, know when to use a table. Plus extra considerations: orientation, separation from surroundings, hover actions (p.523-524).

## 2. Rules

### 2a. Structure and anatomy

- **RULE** Build a card from, in order, four parts: rich media (image), primary text (title), supporting text (short description), actions. Add subheadings or icons only when needed.
  **Why** This is the book's anatomy diagram. Media on top, a small title right under it, supporting text, then the action row.
  **Applies to** all. **Check** DOM order: media, heading, paragraph, action row. **Source** (p.502)

- **RULE** One card = one idea, item or piece of content. If two concepts appear, split them into two cards. Navigation (Prev/Next) belongs outside the card, between cards.
  **Why** Presenting numerous ideas on a single card is not a good idea. In the good figure, the inner card holds one concept and the Prev/Next arrows sit outside it; in the bad figure the arrows are inside a single large card.
  **Applies to** all. **Check** count of distinct headings per card = 1. **Source** (p.519-520)

- **RULE** Make cards self-contained and reorderable. A card must make sense when moved, filtered or resized.
  **Why** Modular design is built from independent pieces that can be rearranged or altered.
  **Applies to** all. **Check** each card has its own title, media and action, with no dependency on a neighbour. **Source** (p.503)

- **RULE** Make the entire card clickable, not just a small link inside it.
  **Why** It gives a big target and a clear invitation to engage; the book names this in its closing summary.
  **Applies to** all. **Check** the link or button wrapping covers the card's full bounding box. **Source** (p.517)

### 2b. Card versus list versus table

- **RULE** Use a list, not cards, for homogeneous content where each item is smaller than a few lines (title plus one or two lines). Show items as rows in one shared container separated by dividers, not as separate bordered boxes.
  **Why** Promotes speedier scanning. Cards take more space and a list is more efficient for scanning titles quickly. In the figure the bad version draws each row as its own rounded bordered card; the good version is one outer container with hairline dividers.
  **Applies to** all. **Check** rows with at most about 2 lines of text of identical structure render as list rows. **Source** (p.505, p.521)

- **RULE** Use a table, not cards, for large data sets with many similar variables that need to be scanned, sorted and/or filtered.
  **Why** A table aligns attributes in columns so rows can be compared. The bad figure shows two cards each with avatar, title, description, date and full-size Edit/Delete buttons; the good figure shows one table with columns "SL.No", "Profile", "Title Name", "Upload Date", "More Options" and compact Edit and Delete buttons per row.
  **Applies to** SaaS app UI. **Check** if items have more than a few attributes and the user must sort or filter, render a table. **Source** (p.521)

- **RULE** If order and search are vital (data work), use a list or grid, not cards. Cards are for exploring.
  **Why** List layouts are more hierarchical; they suit searching and ordered data.
  **Applies to** SaaS app UI. **Check** visual. **Source** (p.505, p.516)

- **RULE** If titles matter more than graphics, or the user must wade through a lot of repeated data, use a different layout.
  **Why** Cards are less efficient for scanning titles.
  **Applies to** all. **Check** visual. **Source** (p.505-506)

- **RULE** Use cards for a bounded number of rectangular pieces. For showing goods "in a more grandiose way", consider another design option.
  **Why** The number of rectangular pieces is the deciding factor in the end.
  **Applies to** landing page | e-commerce. **Check** visual. **Source** (p.506)

- **RULE** Use cards on a dashboard and keep clear white space between them.
  **Why** The space between cards aids focus and prevents overwhelm. The figure shows a 3-column grid of white cards with soft shadows and equal gutters, mixing KPI numbers, progress bars, notification lists, a profile card and toggle settings.
  **Applies to** SaaS app UI. **Check** uniform gutter between all card edges. **Source** (p.510)

### 2c. Content

- **RULE** Limit the card summary to fewer than 100 characters or two short sentences. The card holds just enough for the user to decide whether to engage further.
  **Why** Cards are for exploring. Long descriptions turn them into articles. The bad figure shows a five-line description that pushes the buttons down; the good one shows two lines.
  **Applies to** all. **Check** description text length < 100 characters, at most 2 sentences. **Source** (p.520)

- **RULE** Do not overcrowd a card with buttons and content. Show only the most important data and reveal more through a drop-down or a flip.
  **Why** "Less is more." Cards conserve attention.
  **Applies to** all. **Check** count of buttons per card at most 2 (the figures show 2). **Source** (p.516, p.520)

- **RULE** Avoid inline links inside card text. Give the card a single link or a limited set of actions.
  **Why** Inline links compete with the card actions and make the click target ambiguous. The bad figure has blue underlined links on "UI design", "status" and "design" in the description; the good figure has plain text.
  **Applies to** all. **Check** no `a` inside the card description paragraph. **Source** (p.519)

### 2d. Hierarchy, actions and visual weight

- **RULE** Make multiple actions graphically different. One primary (filled) and one secondary (outlined or link style). Never give two equal-looking buttons.
  **Why** The user needs to tell the main action from the alternative. In the bad figure Submit is filled and Cancel is a pale filled button with white-ish label (equal weight, low contrast). In the good figure Cancel is outlined with a dark label and a light-blue stroke.
  **Applies to** all. **Check** the primary and secondary buttons differ in fill or border and are not both solid. **Source** (p.517-518)

- **RULE** Build a visual hierarchy inside the card: title strongest, subtitle smaller, body smaller and lighter (grey), primary action filled, secondary action outlined.
  **Why** Text, buttons and other elements need a visual hierarchy so the user is not confused. In the bad figure the title, subtitle "Snower Wall" and body are nearly the same size and darkness, and both buttons are outlined. In the good figure the subtitle is smaller, the description is lighter grey, and Submit is filled.
  **Applies to** all. **Check** computed font-size title > subtitle >= body, and the body colour lighter than the title. **Source** (p.518)

- **RULE** Do not use borders or dividers to separate the parts of a card (media, title, description, actions). Let spacing do it.
  **Why** New designers over-divide with borders. They add visual clutter to the page, detracting from the content. The bad figure draws hairline rules between title, subtitle, description and above the buttons; the good one has none.
  **Applies to** all. **Check** no border-top or border-bottom, and no `hr`, between parts inside a card. **Source** (p.518-519)

### 2e. Imagery, shape, spacing, size

- **RULE** Treat the image as the main attention-grabber. Without a distinct visual style the card will be unappealing. Use images with transparent backgrounds (opinion of the authors).
  **Why** Images draw attention first. (Transparent background so that a product sits on the card colour.)
  **Applies to** e-commerce | landing page. **Check** visual. **Source** (p.512)

- **RULE** Use high-resolution images in cards, so that they do not pixelate when a card resizes.
  **Why** Cards respond to screen size, and low-resolution images blur or pixelate when scaled.
  **Applies to** all. **Check** image natural width >= rendered width x device pixel ratio. **Source** (p.512)

- **RULE** Round the corners of cards and their images.
  **Why** The designers recommend it for more aesthetically attractive cards and for calming consumers (opinion). Every card figure in the chapter shows a rounded card, rounded image and rounded buttons.
  **Applies to** all. **Check** `border-radius` > 0 on card and media. **Source** (p.512, p.502)

- **RULE** Choose the card spacing deliberately: either ample space around each card, or no gap at all with large, spacious photos (a tight mosaic).
  **Why** Spacing changes the overall appearance. The book's Pixsel example is an edge-to-edge image mosaic with no gutters (one tile spanning two rows on the right, text overlaid bottom-left, price chips top-right).
  **Applies to** all. **Check** gap is either generous or exactly 0, not an awkward small value (this last sentence is an engine observation, see 5). **Source** (p.513)

- **RULE** Vary card size to direct attention. Arrange equal cards for content focus, or make some larger than others to highlight them.
  **Why** Card size is a customisation tool. In the figure the large product tile on the right, and the large first tile on the left, dominate the small tiles.
  **Applies to** landing page | e-commerce. **Check** visual. **Source** (p.513)

### 2f. Colour, motion, effects

- **RULE** Use colour, shading and effects so cards are not dull. Use motion sparingly, and prefer an animated element or a video in place of the main image over animating many parts.
  **Why** Too many animated elements make the design look cluttered.
  **Applies to** all. **Check** at most one animated element per card. **Source** (p.514)

- **RULE** Flip is a natural card interaction (derived from playing cards). Use it on small cards.
  **Why** "It appears better on smaller cards." Flip also serves the "expose more on flip" rule.
  **Applies to** mobile | dashboard. **Check** visual. **Source** (p.514, p.516)

- **RULE** Scroll a deck of cards, but never scroll inside a single card.
  **Why** Text inside a scrolling card "may appear to be quite unclear."
  **Applies to** all. **Check** no `overflow: auto` or `scroll` on the card body. **Source** (p.514)

### 2g. Responsive and device

- **RULE** Use different card forms per device: square or portrait cards on mobile, rectangular (landscape) cards on web. Use fewer columns on mobile.
  **Why** Mobile screens are narrow, so fewer columns. In the figure the mobile card is a narrow vertical card (image on top, text and buttons below); the desktop card is a wide horizontal card (image left, text and buttons right).
  **Applies to** mobile | all. **Check** column count at mobile widths is fewer than at desktop (e.g. 1 versus 3). **Source** (p.515)

- **RULE** Orientation is a choice: vertical (media on top) or horizontal (media beside the text). A card can also be text only.
  **Why** Cards can be oriented vertically or horizontally, with a media asset or just structured text.
  **Applies to** all. **Check** visual. **Source** (p.523)

### 2h. Separation and interaction

- **RULE** Set the card apart from its surroundings with at least one of: a border (stroke), a shadow, or a different background colour/value. You may need none of them if content and whitespace are combined well.
  **Why** To create a grouping. Figure shows stroke (thin dark outline, white fill), shadow (soft drop shadow, no outline), and background (tinted gradient behind the text).
  **Applies to** all. **Check** card boundary distinguishable from the page: border, box-shadow or background differs from parent. **Source** (p.523-524)

- **RULE** Hover actions are acceptable to shrink the card and tidy its look (actions appear on hover), but provide another path for touch devices.
  **Why** Hover does not exist on touch screens. In the figure, the default card shows media and text; the hover state dims and blurs the card to a dark overlay with only the Submit and Cancel buttons centred.
  **Applies to** web app (not mobile). **Check** every action reachable without hover on touch. **Source** (p.524)

### Audit additions (audit 2026-10-15)

- **RULE** Inset the media by one small, equal gutter on its top, left and right edges, then put the title, description and button row on one shared left edge with a larger inner padding. In every stock card the text edge sits about 3x the media inset from the card edge (visual estimate: media inset about 9-12px, text edge about 28-35px at figure scale).
  **Why** The image reads as a framed plate inside the card and the text, body and actions read as one aligned column. This construction repeats on every rule page.
  **Applies to** all. **Check** media top inset ≈ left inset ≈ right inset; title, description and first button share the same left x. **Source** (p.502, p.517-520) (audit 2026-10-15)

- **RULE** Set the card's two actions side by side at the bottom, left-aligned to the text edge. Each button hugs its label (not full width), both share the same width and height, and the primary goes first, on the left. In the figures each button is about 2.6x as wide as it is tall, with a gap of about a quarter of the button height between them (visual estimate).
  **Why** One aligned action row, with the primary first in reading order, makes the main action the first one the eye finds.
  **Applies to** all. **Check** button widths and heights equal; button row left x = text left x; gap < button height; the primary is the first DOM child. **Source** (p.502, p.517-520) (audit 2026-10-15)

- **RULE** When a card carries more than two actions, use three visibly different tiers: a filled primary placed next to the item it acts on ("Choose", right-aligned beside the date and price row), an outlined secondary below a hairline divider ("Show More Dates", wide and centred), and a tertiary as an icon + text link ("Gift This Experience" with a gift icon). A minor option sits as a small underlined text link under the headline ("Show All Prices").
  **Why** The booking card holds four actions without competition because each tier has a different weight: fill, outline, icon-text link, small underlined link.
  **Applies to** all | e-commerce. **Check** count of filled buttons per card = 1; extra actions are outline or link style. **Source** (p.515) (audit 2026-10-15)

- **RULE** Show a price as a prefix, a large bold amount and a smaller regular unit: "From $2 / Person". Repeat the same amount-plus-unit format on each option row ("$2 / Person").
  **Why** The amount is the decision number and the unit qualifies it, so the unit is set smaller and lighter.
  **Applies to** e-commerce | landing page. **Check** the unit font-size is smaller than the amount and its weight is lighter. **Source** (p.515) (audit 2026-10-15)

- **RULE** Group a card's paired input selectors into one filled bar split by a vertical divider. Each half shows a small label ("Date :", "Guest :") above its value ("Jan 03 - Jan 05", "2 Members") with a chevron on the right.
  **Why** One bar reads as one query (when + who). The label/value stack keeps each half scannable in a small space.
  **Applies to** e-commerce | forms. **Check** visual. **Source** (p.515) (audit 2026-10-15)

- **RULE** Give dashboard cards a consistent header: a small muted label top-left ("Total Users", "My Goals", "Website Traffic", "Revenue") and a "..." overflow menu top-right. Show KPIs as a large number with a small coloured delta beside or under it (green up-arrow "+3.49%", red down-arrow "-0.42%").
  **Why** In every dashboard card the label names the metric quietly, the number dominates, and the delta tells direction by colour and arrow.
  **Applies to** SaaS app UI. **Check** every dashboard card has a label element and an overflow button in the same position; deltas carry both an arrow and a colour. **Source** (p.510) (audit 2026-10-15)

- **RULE** Cards in a grid may differ in height (masonry) as long as the column width and the gutter stay identical. The dashboard grid stacks three columns of mixed-height cards, and the Pinterest example shows the same masonry with variable-height tiles under a row of filter chips.
  **Why** Each card's height follows its content; the shared gutter and column rhythm keep the grid ordered.
  **Applies to** SaaS app UI | landing page. **Check** all horizontal and vertical gaps between cards are equal; column widths are equal. **Source** (p.510, p.512) (audit 2026-10-15)

- **RULE** In a zero-gap image mosaic, round only the outer container corners and keep the inner tile corners square. Put white text bottom-left on each tile (a title plus a one-line caption) and small translucent dark chips top-right for the price or category ("$ 43.09", "Sony Cam", "New Product"). Use a dark bottom fade where the photo is light.
  **Why** The tiles read as one rounded slab cut into pieces. Text and chips sit in fixed corners so the photos stay readable.
  **Applies to** landing page | e-commerce. **Check** tile border-radius = 0 inside a container with radius > 0; overlay text has a scrim or a dark photo region behind it. **Source** (p.513) (audit 2026-10-15)

- **RULE** For a carousel deck, put circular arrow buttons outside the cards, vertically centred on the deck and overlapping the frame edge. Tiles inside the deck may mix fills (slate, green, black, a photo) and sizes.
  **Why** The arrows are deck controls, not card content, so they sit outside the cards (the same logic as "one idea per card").
  **Applies to** landing page | mobile. **Check** arrow buttons are siblings of the card list, not children of a card. **Source** (p.514) (audit 2026-10-15)

- **RULE** A hover "pop-up" card may grow above its row, overlapping its neighbours, and reveal a control row and a progress bar. Netflix shows a filled play circle first, then outlined circular add, like and dislike buttons, an expand chevron right-aligned, a progress bar with "90 of 98m", and a tooltip label ("I like this") above the hovered icon button.
  **Why** The book points to Netflix's pop-up effects as the model. Icon-only circular buttons get a text tooltip because the icon alone is ambiguous.
  **Applies to** web app | landing page. **Check** the hovered card has a higher z-index and a scale > 1; every icon-only button has a tooltip or an aria-label. **Source** (p.508) (audit 2026-10-15)

- **RULE** For a horizontal listing card (real estate), put the image on the left at full card height. Put the title and a "By ..." subtitle top-left, the price range top-right with a small secondary line under it in an accent colour, then key/value detail rows ("Details :", "Status :"), an amenity icon row bottom-left, and bottom-right an outlined favourite (heart) icon button beside a filled "Contact" CTA.
  **Why** Price and CTA sit on the right edge where the eye ends each row, so a stack of listings scans as a column of prices and actions.
  **Applies to** landing page | e-commerce. **Check** the CTA and price share the right edge across all listing cards. **Source** (p.511) (audit 2026-10-15)

- **RULE** When cards represent work items with a status, group them in columns named by status, with a count next to each column title (the Tenders board: "Saved 45", "Invited", "Active", "History"). Each card has a logo/owner row with a kebab menu, a 2-line title, tag chips and a footer meta row (date, counts).
  **Why** This is the book's SaaS example: tenders as cards inside status columns.
  **Applies to** SaaS app UI. **Check** each column header shows its item count. **Source** (p.507) (audit 2026-10-15)

- **RULE** In a hover-reveal card, leave the action row out of the default state entirely and use the freed space for a longer description (4 lines in the figure). On hover, lay a dark translucent, blurred scrim over the whole card and centre the buttons on it: the primary stays filled, and the secondary becomes a light (white) outline on the dark scrim.
  **Why** This is the source of the "shrink the card's size" claim: the actions take no space until hover. The secondary has to flip to a light outline to stay visible on dark.
  **Applies to** web app (not mobile). **Check** the default state has no visible buttons; on hover, the button contrast against the scrim is >= 3:1. **Source** (p.524) (audit 2026-10-15)

- **RULE** In a table that replaces cards, give each row compact action buttons that are told apart by colour: a periwinkle "Edit" and a red "Delete", both smaller than the card-version buttons. Put the column headers in one header row (the figure appends colons: "SL.No :", "Profile :") and separate rows with hairlines.
  **Why** In a dense row, size must shrink, and red marks the destructive action.
  **Applies to** SaaS app UI. **Check** the destructive row action uses the danger colour; row action height < the card button height. **Source** (p.521) (audit 2026-10-15)

- **RULE** In a horizontal (desktop) card, the media fills the card's full height on the left (inset by the same gutter) at a near-square ratio, and the text block with its buttons sits vertically centred beside it. In the vertical (mobile) card, the media becomes a landscape banner on top and the buttons are drawn smaller.
  **Why** The card keeps the same parts but re-proportions them to the device: wide screens put the media beside the text, narrow screens stack them.
  **Applies to** mobile | all. **Check** horizontal card: media height = card height minus 2x gutter; the text column is centred vertically (align-items: center). **Source** (p.515, p.523) (audit 2026-10-15)

## 3. Numbers & scales

| Item | Value | Page |
|---|---|---|
| Card summary length | < 100 characters or two short sentences | p.520 |
| Anatomy parts | 4 (rich media, primary text, supporting text, actions) | p.502 |
| Actions shown in every figure | 2 (one filled primary, one secondary) | p.502-524 |
| Separation tools | 3 (stroke, shadow, background) | p.524 |
| Rules in the "better card" section | 8 titled rules (differentiate actions, hierarchy, borders, links, one idea, limit content, list, table) | p.517-521 |
| Card orientations | 2 (vertical, horizontal) | p.523 |
| Table columns in the good table figure | 5 (SL.No, Profile, Title Name, Upload Date, More Options), 5 rows | p.521 |
| Booking card figure content | "From $2 / Person", date and guest selectors, "Choose" primary, "Show More Dates" outline, "Gift This Experience" text link | p.515 |

Visual estimates from the stock-card figures (not stated in the text): image fills the card width minus roughly 10px of padding on every side, at a landscape ratio of about 2:1; rounded corner on the image of roughly 16px; filled periwinkle primary button and outlined secondary button of equal height and equal width, with the primary on the left; subtitle and description in small type (about 12-13px at figure scale) under a title of about 15px. Treat as illustrations of proportion, not specs.

Audit additions, measured on the page images (figure scale, ratios only, not specs):

- Stock card (p.502): media inset 12px top/left and 13px right, text edge 35px from the card edge (about 3x the inset), media ratio about 2.17:1 (384 x 177), buttons 137 x 53 each with a 15px gap, bottom padding 20px. (audit 2026-10-15)
- Stock card (p.517): media inset 9-11px, text edge 28px (about 3x), buttons 110 x 42 with an 11px gap. Button width/height ≈ 2.6 and gap/height ≈ 0.26-0.28 on both pages. (audit 2026-10-15)
- Dashboard grid (p.510): 3 columns x 3 rows = 9 cards of mixed height with equal gutters. KPI deltas "+3.49%" (green, up) and "-0.42%" (red, down). (audit 2026-10-15)
- Booking card (p.515): 4 action tiers (1 filled "Choose", 1 outlined "Show More Dates", 1 icon + text link "Gift This Experience", 1 small underlined link "Show All Prices"), 1 hairline divider, 2 selectors (Date, Guest) in one bar. (audit 2026-10-15)
- Tenders board (p.507): 4 status columns (Saved 45, Invited, Active, History), 3 cards visible per column. (audit 2026-10-15)
- Carousel (p.514): 4 tiles in a 2 x 2 arrangement with mixed sizes, 2 circular arrow buttons outside the deck. (audit 2026-10-15)
- Hover reveal (p.524): default state 0 buttons and a 4-line description; hover state 2 centred buttons on a dark blurred scrim. (audit 2026-10-15)
- Netflix hover card (p.508): 1 filled play circle, 3 outlined circles (add, like, dislike), 1 expand chevron, progress "90 of 98m". (audit 2026-10-15)

## 4. Dos and Don'ts

| Topic | Bad (red cross) | Good (green tick) | Page |
|---|---|---|---|
| Differentiate actions | Submit filled, Cancel a pale-blue filled button with white label (two filled buttons, weak contrast) | Submit filled periwinkle, Cancel outlined with light-blue border and dark label | p.517 |
| Visual hierarchy | Title and subtitle ("Snower Wall") and body all similar size and darkness; both buttons outlined | Subtitle smaller, body lighter grey, Submit filled, Cancel outlined | p.518 |
| Borders | Hairline dividers between title, subtitle, body, and above the buttons | No dividers, spacing only | p.519 |
| Links | Blue underlined inline links inside the description ("UI design", "status", "design") | Plain description text, actions only in the buttons | p.519 |
| One idea per card | Prev/Next arrows sit inside a single full-size card | Inner card is inset in its frame, with Prev/Next outside it, one concept on the card | p.520 |
| Content length | Five-line description repeating "The card should contain just enough information..." | Two-line description | p.520 |
| List | Each item is its own bordered rounded card (avatar, title, two lines) | Same rows in one container separated by dividers | p.521 |
| Table | Two big cards with avatar, title, description, date and Edit (blue) / Delete (red) buttons | Table with 5 columns and compact Edit/Delete per row | p.521 |

Further do/don't statements:

- **Do** use transparent-background, high-resolution product images, round the edges, and spread either generous space or none (p.512-513).
- **Do** keep a card deck scrollable, flip small cards, and animate sparingly (p.514).
- **Don't** scroll text inside one card (p.514).
- **Don't** overload a card with buttons and text (p.516).
- **Don't** rely on hover alone for actions on touch devices (p.524).

Audit additions:

- **Limit content, side effect (p.520):** the bad card's five-line description also makes it taller than the good card beside it, so a row of such cards would have uneven heights and misaligned button rows. (audit 2026-10-15)
- **Hover reveal (p.524):** the default card shows no buttons and a 4-line description. The hover state darkens and blurs the whole card, including the image and the text, and centres a filled "Submit" and a white-outlined "Cancle" over it. Good as a desktop pattern; the text flags touch as the failure case. (audit 2026-10-15)
- **Mobile vs desktop (p.515):** the mobile card stacks a landscape media banner, title, two-line text and small buttons; the desktop card puts a near-square media on the left at full card height, with the title (wrapping to 2 lines), text and normal-size buttons on the right. (audit 2026-10-15)
- **Cover card (p.501):** a horizontal card with an eyebrow/category label ("UI Cards") above a 2-line title, a 3-line description and a single filled "Learn More" CTA. The near-square media is inset with an equal gutter, and the card has a 1px light border on a lightly tinted surface. A single-action card is shown as valid. (audit 2026-10-15)
- **Table vs card (p.521):** the bad card version uses full-size Edit/Delete buttons in every card, which repeats heavy controls down the page. The good table shrinks them to compact chips in a "More Options" column. (audit 2026-10-15)

## 5. Exceptions & judgement calls

- **Spacing:** the book says leave "ample space around the cards" and also that "no space at all" can look wonderful with large photos. Both are valid. Choose per layout: a media mosaic (no gap) or a utility grid such as a dashboard (generous gap) (p.513, p.510).
- **Hover versus touch:** the book recommends hover reveal and flags that it will not work on touch (p.524). It does not say what the fallback is.
- **Action styling inconsistency:** the text on p.518 says the example uses "a link style instead of a button style to make the next action less obvious", but the good figure on p.517 actually shows an outlined button, not a text link. The intent (secondary action less prominent than primary) is clear; the exact form (outline versus link) is the designer's choice.
- **Card versus list:** claims that cards have a "higher scroll rate and greater impact than lists" (p.503) sit next to claims that lists scan faster (p.505, p.521). Both are asserted without data. Decide by task: exploring/browsing -> cards; scanning/search/order -> list or table.
- **Transparent-background images:** the book gives no reason and every figure shows a photo or placeholder fill (p.512). Treat as opinion.
- **Card is saturated and common:** the book admits that because cards are so widespread, standing out is difficult, and that card design "is never dull when the proper visuals are used" (p.505).
- **Gradient background card (p.524):** the figure's third example puts light text on an orange/blue gradient and the description text has weak contrast. [engine note] It shows the background option but not a good contrast outcome; verify 4.5:1 text contrast when using tinted card backgrounds.
- [engine note] "Square cards on mobile" in text (p.515) does not match the figure, which shows a narrow portrait card. Do not enforce a strict 1:1 ratio.
- [engine note] "Limit to 100 characters" is a good default for a card description but is not a hard ceiling for e.g. article cards with an excerpt.
- [engine note] The book offers no spacing numbers. The engine should take padding and gap values from its own spacing scale, not from this chapter.

- (audit 2026-10-15) [engine note] In the stock card the media corner radius looks about equal to the card's own corner radius even though the media is inset by about 10-12px, so the corners are not concentric (inner radius should be outer radius minus inset). Do not copy this; follow the engine's nested-radius rule (`knowledge/web/borders-and-nesting.md`).
- (audit 2026-10-15) [engine note] The table figure (p.521) shows two filled buttons side by side (Edit periwinkle, Delete red). This looks like it breaks "differentiate actions" (p.517), but the colour carries the difference (destructive red) and the buttons are compact row actions, not a card's primary/secondary pair. Treat colour-coded row actions in tables as an allowed exception.
- (audit 2026-10-15) [engine note] The booking card (p.515) uses a hairline divider inside the card even though p.519 says to resist borders between card parts. The divider separates the option row from the "more" actions (two different zones), not title from body. Read the borders rule as "no dividers between the parts of one content block".

## 6. Figures worth keeping

- p.502: anatomy diagram (rich media / primary text / supporting text / actions) with bracket labels.
- p.510: dashboard cards grid (KPI, progress, notification list, profile, toggles) with whitespace between cards.
- p.513: Pixsel Academy image mosaic with no gaps and different tile sizes, text over images, price chips.
- p.514: four-tile carousel with different colours and sizes plus side arrows.
- p.515: booking card, and mobile vertical card versus desktop horizontal card.
- p.517: differentiate-actions good/bad pair.
- p.518: visual hierarchy good/bad pair.
- p.519: borders good/bad and limit-links good/bad pairs.
- p.520: one-idea-per-card and limit-content good/bad pairs.
- p.521: list versus card, and table versus card good/bad pairs.
- p.523: vertical versus horizontal card orientation.
- p.524: stroke / shadow / background separation, and default versus hover state.

- p.507: Tenders board, cards grouped in status columns with counts, tag chips, upgrade modal over the board. (audit 2026-10-15)
- p.508: Netflix hover pop-up card that grows over its row, with a circular control row, tooltip and progress bar. (audit 2026-10-15)
- p.511: real-estate horizontal listing cards (image left, price top-right, favourite + Contact bottom-right). (audit 2026-10-15)
- p.512: Pinterest masonry of variable-height cards under a filter chip row. (audit 2026-10-15)

## 7. Open questions

- The OCR typos ("Cancle", "Shawdow", "H1ppy", "mainstream stotus") are in the figures, not the book's text. The figure label "Shawdow" on p.524 is misspelled in the original image.
- Unclear whether the OCR text "Tendx" on p.506 is "Tenders" (the product name used in the following caption, p.507). The captions say "Tendx" for the platform and "Tenders" for its core component.
- The chapter never states padding, radius, gap, shadow, border colour, or image aspect ratio values. Anything numeric from the figures is an estimate.
- No explicit accessibility guidance for cards (focus ring on the card link, nested interactive elements, contrast on image overlays). The Pixsel mosaic overlays white text on photos without a stated scrim rule.
- p.522: no rule content (a full-page pull quote saying there is no right or wrong way to do the work).
- p.501: no rule content beyond a statement that Salesforce, Apple, Netflix, Pinterest, Twitter, Instagram and the BBC use card-based UIs (popularity claim, cover image of one card with a "Learn More" button).
- p.504: advantages (UX-friendly, clickable, attractive) and the start of "Is card always the best solution?" were covered in rules above. No separate numeric content.
- p.508-509, p.511: example pages (Netflix, e-commerce, task apps, ed-tech, real estate, profile apps). They give domain fit only; the Netflix hover pop-up with an "I like this" tooltip, play / add / like / dislike / expand circular buttons and a progress bar "90 of 98m" is the single detailed card hover example (p.508).
- (audit 2026-10-15) Coverage: all 24 page images p.501-524 viewed. Text-only pages with no figure: p.503, p.504, p.505, p.506 (the claims there are covered in sections 1-2), p.516 (summary). p.522 is a full-page pull quote with no rule content. p.509 (task apps, ed-tech) and p.512 (Pinterest masonry) are example screenshots; their details are in the audit rules above.
- (audit 2026-10-15) p.509 OCR says "Publishi"; the image reads "PublishXi" (the ed-tech product shown on p.510).
