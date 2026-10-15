---
source: ui-pedia
chapter: Navigation (Design Basics)
pages: 433-456
topic_tags: [navigation, menus, mega-menu, dropdown, breadcrumbs, tabs, hamburger, vertical-nav, labels, orientation, testing, ia]
status: studied
---

# Navigation

PDF page = printed page + 1. All citations are PDF pages. Images: `corpus/ui-pedia/pages/p-<PDF page>.jpg`. The chapter is mostly prose with eight numbered "key points" (p.442-455); its figures are small mock navbars in one visual language (dark slate-blue bar, `Pixselacademy` wordmark left, small white labels, a lilac-blue `Login` button, a white rounded hamburger tile at the right). The book never gives px sizes, spacing or type values for navigation; every rule below is qualitative unless a number is stated.

## 1. Core ideas

1. Navigation is the route that lets a user go "from point A to point B, and even point C" with the least frustration. It is built from a combination of patterns, links, labels and other UI elements (p.433).
2. Good navigation improves comprehension, gives users a reason to trust the product, and supports credibility. Poor navigation means fewer people use the product (p.435).
3. A pattern is a generic reusable solution to a problem. No pattern is superior to another; each must be planned and tested against the product it goes into (p.435).
4. Navigation should be nearly invisible: "as transparent as feasible" (Alan Cooper quote); users who can't find things leave and may not return (p.436-437). Getting it right "usually means it goes unnoticed" (p.455-456).
5. Navigation also reflects company image, tells users where they currently are, and gives access to information (p.437).
6. Different patterns suit different circumstances, so most products blend several (breadcrumbs for a store with many hierarchical sub-categories; a tag cloud does not fit there, and the author doubts tag clouds are ever appropriate) (p.437-438).
7. Content comes first: create the content, then shape navigation to it, not the reverse. Navigation reveals content (Krug) (p.442-443).
8. Menu position follows reading behaviour: the most visible locations are across the top or down the left side (p.444).
9. Clarity and convention beat novelty: familiar, specific labels, and any deviation from a learnt routine "might lead to user errors" (p.446-447).
10. Orientation cues beyond the menu (logo, tab title, URL, breadcrumbs, visual changes, dates/tags) anchor the user and give a sense of place (p.451-453).
11. Never trust a navigation guess; prototype and test it with 3-5 users (p.453-455).

## 2. Rules

### Planning

- **RULE** Write the content before wireframing navigation; derive the nav structure from the content, and match the structure to the flow/shape of the content. Do not bend content to a pre-made menu.
  **Why** Even perfect navigation won't keep someone on a page whose content is poor; "navigation reveals content".
  **Applies to** all. **Check** visual / process: nav items map 1:1 to existing content sections or pages. **Source** (p.442-443)

- **RULE** Pick the navigation pattern per context and combine them; never claim one pattern is universally better. Evaluate each against the product before implementing.
  **Why** Patterns perform differently by circumstance (p.435, p.437, p.447).
  **Applies to** all. **Check** visual. **Source** (p.435, p.437)

- **RULE** Align navigation with the goals of identified user groups (personas). Derive the nav by asking what these users need, e.g. (Kalbach): How can I locate certain information or a product quickly? How can I be sure the information is current? Is the information reliable? How do I contact the site owner? How can I send information I find to people I know?
  **Why** Nav "reverse engineering": knowing needs tells you what the nav must support.
  **Applies to** all. **Check** visual: each persona goal has a reachable path. **Source** (p.449-451)

### Patterns and placement

- **RULE** Put the primary menu horizontally across the top or vertically down the left side; those are the most visible locations.
  **Why** Users read pages in an F-shaped pattern (a few horizontal scans across the top, then a vertical scan from top to bottom) (Nielsen).
  **Applies to** all. **Check** nav bounding box in top band or left rail. **Source** (p.444)

- **RULE** Use a horizontal navigation bar as the default for websites.
  **Why** It is easy to scan because we read across the page; users know it and expect it.
  **Applies to** landing page, marketing sites. **Check** visual. **Source** (p.444)

- **RULE** Remember direction semantics: in Western convention right means progress, left means back/regressive (Bowles quote). Order and direction nav and progress cues accordingly.
  **Why** Number-line / text-direction convention.
  **Applies to** LTR locales. **Check** visual (back/previous left, next/forward right). **Source** (p.444)

- **RULE** Use vertical navigation (left rail) when you need a long global list with primary, secondary and tertiary levels; accept that it takes a lot of room. A collapsible variant shows an icon-only rail (avatar + icons, settings and logout at the bottom) that expands to icon + label with nested sub-items.
  **Why** Vertical lists scale to many levels.
  **Applies to** SaaS app UI. **Check** visual. **Source** (p.440; figure p.439)

- **RULE** Use vertical (right-hand) page navigation on long single-page storytelling sites to show where the user is on a linear scroll (Skullcandy "Supreme Sound" example, parallax story).
  **Why** Linear content suits a long vertical page; the side nav orients position and gives access to related information.
  **Applies to** landing page (narrative). **Check** visual. **Source** (p.445)

- **RULE** On mobile put the few most important destinations in tabs at the bottom (or top) of the screen. Bottom space only holds a few tabs, so put only the most crucial panels there.
  **Why** Limited bottom width.
  **Applies to** mobile. **Check** count of tab-bar items (book gives no number; its figures show a 5-icon tab bar on p.465 and p.477, and a 4-item bar on p.438 where the active Home item is a white pill with label). **Source** (p.439)

- **RULE** A hamburger menu (three-line icon, click/press to reveal more choices) is acceptable on mobile and increasingly desktop. The pattern shown: icon top-left of the header; opens a white full-height drawer over the dimmed app with avatar + name + email at top, a list of text items each with a chevron (My Orders, My Wishlist, Saved Cards, Notifications, Gift Cards, My Rewards, Address, Help), and Settings and Logout separated at the bottom.
  **Why** Reveals secondary navigation without spending screen room.
  **Applies to** mobile, desktop. **Check** visual. **Source** (p.438-439; figure p.438)

- **RULE** Use breadcrumbs as a supplementary trail showing where the user is, e.g. on an e-commerce product page with many hierarchical sub-categories. They are like chapter titles: they provide context, and matter because many users do not arrive at the homepage.
  **Why** Orientation for deep-linked arrivals.
  **Applies to** e-commerce, content sites. **Check** breadcrumb present on pages deeper than level 1. In the figure the trail sits as a pill directly under the header, over the product image: `Grocers / Grocers Category / Snacks & Drink / Jenuin Red...` (long last item is truncated with an ellipsis). **Source** (p.441-442; figure p.441)

- **RULE** Use filters to manage information-heavy sites and links to connect disparate pieces of information; use the menu as the first place visitors look to learn what is on the site.
  **Why** Each is a navigation support for content.
  **Applies to** all. **Check** visual. **Source** (p.442-443)

- **RULE** A call-to-action button in the navigation/hero must be easily identifiable and given top billing; its job is to convince, motivate and move the audience to act (sign up, purchase, download). In the figures it is a solid lilac-blue `Login` button in the navbar, a dark slate `Watch More` button under the hero headline.
  **Why** Conversion actions need to stand apart from nav links.
  **Applies to** landing page. **Check** CTA has a filled background distinct from nav link text. **Source** (p.440-441; figures p.433, p.440)

### Labels and consistency

- **RULE** Use relevant, familiar copy for navigation elements and keep it consistent across the design. Name the nav link after what the page is: a museum landing page about Collections is labelled "Collections".
  **Why** Consistency and clarity make navigation easier to understand; users know what to expect before clicking.
  **Applies to** all. **Check** visual / copy audit: label == page H1 or obvious synonym. **Source** (p.445-446)

- **RULE** Keep navigation simple and conventional. Breaking rules is possible but "it's best to keep things simple".
  **Why** "Past experiences and repeated practices inform user experience"; "any variation from a learnt routine might lead to user errors" (A. Harley, NN/g).
  **Applies to** all. **Check** visual. **Source** (p.447)

- **RULE** Use meaningful, specific labels ("analogue watches", "smart watches"), not generic format words ("products", "items"). Give each such label its own page where possible rather than one page with everything.
  **Why** "Products" tells a user nothing; people search for specific things, so specific labels are clearer and also help SEO.
  **Applies to** all (esp. e-commerce). **Check** flag nav labels in a stop-list (products, items, stuff, solutions, resources) as generic. **Source** (p.447-448)

### Menus

- **RULE** Prefer mega menus to plain dropdown menus for sites with many sub-items. A mega menu is bigger, divided into contextual groups, and visible at once; it removes scrolling inside the menu.
  **Why** Dropdowns have poor usability despite ubiquity: (1) crawling dropdown menus can be tough for search engines; (2) users are more likely to skip key pages when using dropdowns (A. Crestodina). Users dislike scrolling.
  **Applies to** all, content-heavy sites. **Check** menu panel shows all groups at once without an inner scrollbar and has group headings. **Source** (p.448-450; figures p.447, p.449)

### Orientation cues ("You-Are-Here")

- **RULE** Provide navigation cues in addition to the menu: logo and branding, the browser-tab title, visual design changes, the URL, breadcrumbs, and date/time/icons/tags. Highlight the current nav item.
  **Why** They anchor the user and give a sense of place; together they keep the user calm. The browser back button ("lifeline of the online user", "second-most used navigation tool" - Nielsen) is not the whole of navigation.
  **Applies to** all. **Check** current page item has a distinct active state; `<title>` reflects the page; breadcrumb or section label present. **Source** (p.451-453; figure p.452)

### Testing

- **RULE** Prototype and test the navigation flow (registration, finding a specific item, purchase patterns, the whole product's nav) before committing. Use a tool with built-in user testing if possible (CrazyEgg, UserTesting, Hotjar). Test with 3-5 people (Laura Klein).
  **Why** An unprototyped guess (e.g. "a breadcrumb will help") is still a guess; data reduces risk. Prototyping also clarifies the product, its direction, users, and what success and failure mean.
  **Applies to** all. **Check** process. **Source** (p.453-455)

### Audit additions (audit 2026-10-15)

- **RULE** Label and signpost the navigation so a user can answer two questions on any screen: "where am I?" and "where can I go?". If either answer needs guessing, the labels or signposts are not adequate.
  **Why** Users feel at ease exploring only when both are clear; clarity is the book's third key point.
  **Applies to** all. **Check** visual: on each page, the current section is marked and every destination has a self-describing label. **Source** (p.445) (audit 2026-10-15)

- **RULE** Decide the order in which action options appear on the page on purpose, and give the user organisation and visual cues for the choices navigation forces (scroll or click, read or watch, enter data or go back).
  **Why** The order of options changes how users respond. Users make these decisions in two-dimensional space without knowing what happens next, and the brain prioritises and filters what it sees.
  **Applies to** all. **Check** visual: primary action options come first in reading order and each choice has a visible cue. **Source** (p.443) (audit 2026-10-15)

- **RULE** Lay out the desktop top bar in the book's one grammar. Wordmark alone at the left. 4 text links grouped at the right, not centred. Then a filled accent CTA (`Login`) and a square menu tile (white, dark icon) at the far right. The CTA and the tile share one height, about 55% of the bar height, with a gap of about 0.3x that height between them. The wordmark is set about 1.8-2x the size of the link text. (These are proportions read from the figure; the book states no px.)
  **Why** The logo anchors identity at the scan start; links, CTA and menu form one right-hand action cluster; matched control heights keep the cluster on one line.
  **Applies to** landing page. **Check** CTA and menu-tile `getBoundingClientRect().height` equal; control height / bar height about 0.5-0.6; logo font-size / link font-size about 1.8-2. **Source** (p.433, p.440, p.449; figures) (audit 2026-10-15)

- **RULE** Design the narrow states of the top bar explicitly, not by squeezing it. The figure shows 2 collapsed variants. In one, the links go into the hamburger, the wordmark is shortened (`Pixselacademy` becomes `Pixsel`) and `Login` stays beside the menu tile. In the other, the full wordmark stays with only the menu tile.
  **Why** The links are the first thing to fold into the menu; the brand mark and the menu entry point always survive.
  **Applies to** landing page, mobile. **Check** visual at narrow widths: links hidden, hamburger visible, wordmark not truncated mid-word. **Source** (p.433; figure) (audit 2026-10-15)

- **RULE** Mark the active top-nav item with a shape cue anchored to the label plus the accent colour, not with colour alone. The book shows 3 treatments. (1) The bar's top edge dips into a small rounded V-notch centred over the label, with an accent dot in it (p.433). (2) A thin accent ring circles the label and overflows the bar, with a downward bump holding an accent dot under the label (p.445). (3) When the mega menu is open, the label turns accent light blue and the hairline under the bar bumps up under it (p.449). Inactive links stay plain white text: no underline, no pill.
  **Why** A positional mark tied to the label reads as "you are here" even for users who cannot tell the colour apart.
  **Applies to** landing page. **Check** active link differs from siblings in more than `color` (pseudo-element marker, ring or notch); `aria-current="page"` set. **Source** (p.433, p.445, p.449; figures) (audit 2026-10-15)

- **RULE** Show a small accent-coloured down-chevron right after the label only on top-nav items that open a submenu (`UI Books v`, `CSS Books v`). Leaf links (`UI/UX Books`, `About`) get no chevron.
  **Why** The chevron tells users before hovering which items branch and which navigate.
  **Applies to** landing page. **Check** chevron count == number of items with a submenu. **Source** (p.433; figure) (audit 2026-10-15)

- **RULE** Attach an open menu panel to its trigger. The panel opens directly under the bar, and the hairline under the bar rises into a soft bump (caret) centred under the trigger label. The plain dropdown is narrower than the bar and dims the whole page and bar behind it. The mega menu shares the bar's own container and spans its full width.
  **Why** The caret ties the panel to the item that opened it; the dim layer pushes the rest of the page back while the menu is open.
  **Applies to** landing page. **Check** visual: caret x-centre == trigger x-centre; panel top flush with the bar's bottom edge. **Source** (p.447, p.449; figures) (audit 2026-10-15)

- **RULE** Build mega menu content as titled groups of link chips. Give each group a white heading, larger than the chip text, then a wrapped set of 1px accent-outlined chips with small corner radii. Left-align headings and chips to the wordmark's left edge. Keep the gaps in a clear hierarchy: chip gap (the same horizontally and vertically, about 1/4 of the chip height) < heading-to-chips gap < group-to-group gap (each about 3x the chip gap). The figure has 2 groups of 9 links in rows of 5+4 and 4+4. (Proportions read from the figure.)
  **Why** Headings provide the "contextual groups"; the proximity steps make each group read as one unit; edge alignment with the logo keeps the panel on the page grid.
  **Applies to** landing page, content-heavy sites. **Check** each group has a heading element; heading x == logo x; row-gap == column-gap inside a group; gap between groups > gap inside a group. **Source** (p.449; figure) (audit 2026-10-15)

- **RULE** Structure a vertical sidebar as 3 zones separated by hairline dividers. (1) Identity at the top: avatar, name, and an email line with a small chevron (account switcher). (2) The primary list (7 items in the figure). (3) Utilities pinned to the bottom (Settings, Logout) after a large empty gap. The collapsed rail is about 0.44x the expanded width. It keeps the same icon order, the same dividers and the same row positions, showing only the avatar and icons.
  **Why** Fixed zones and row positions let users find the same item in either state; account actions stay apart from destinations.
  **Applies to** SaaS app UI. **Check** collapsed and expanded icon `top` values match for items above any expanded group; Settings/Logout anchored to the bottom (`margin-top:auto`). **Source** (p.439; figure) (audit 2026-10-15)

- **RULE** In a vertical sidebar, show a right-aligned down-chevron only on parent items (Dashboard, Wishlist, UI Book House). Indent an expanded parent's sub-items so that their leading thumbnail starts at the parent's label x, not at its icon x. Set sub-items in smaller text with a tighter row pitch (about 0.85x the parent rows). Put status markers (a dot on dark, a small outlined square on light) in the same right-hand column as the chevrons.
  **Why** The indent to the label column shows hierarchy without extra lines; one trailing column keeps chevrons and badges aligned.
  **Applies to** SaaS app UI. **Check** sub-item left edge == parent label left edge; chevrons and badges share one right edge. **Source** (p.439; figure) (audit 2026-10-15)

- **RULE** Write the breadcrumb from the broadest level to the current page, separated by spaced slashes (`Grocers / Grocers Category / Snacks & Drink / Jenuin Red...`), with 4 levels in the figure. Truncate only the last item, with an ellipsis. Place the trail directly under the header, left-aligned with the content column. Repeat the immediate category as a muted eyebrow above the page title (`Snacks & Drinks` over `Jenuin Red Label Juice`).
  **Why** The trail reads as the path the user took (Hansel and Gretel); the eyebrow gives the same context again at the title, where the eye lands.
  **Applies to** e-commerce, content sites. **Check** breadcrumb is an ordered list in a `nav[aria-label=breadcrumb]`; separators are decorative; only the last item has `text-overflow: ellipsis`. **Source** (p.441; figure) (audit 2026-10-15)

- **RULE** On search-led commerce sites, use a 2-tier header. The main row has the wordmark, a wide white search field in the middle (leading magnifier icon, placeholder text), then Login and the menu tile. A secondary row sits under a hairline divider and holds utility context (a delivery location with a check-circle icon, then a vertical divider). Search counts as navigation: the book lists it beside the menu patterns.
  **Why** Search is the fastest route for users who know what they want; utility context sits apart from primary navigation.
  **Applies to** e-commerce. **Check** visual: search field is in the header's main row and is the widest element there. **Source** (p.438, p.441; figure p.441) (audit 2026-10-15)

- **RULE** Use navigation cues that are not strictly navigation patterns. On an article page these are: a category tag above the headline (`Analysis`), an author card in a left side rail (name in accent, a divider, then the role), and a muted `Posted by : <date>` line between the hero image and the body text.
  **Why** Cues are general design elements that add to the navigation; they anchor the user and give a sense of place.
  **Applies to** content sites, landing page (blog). **Check** visual: article pages carry a category label, author and date. **Source** (p.451-452; figure p.452) (audit 2026-10-15)

## 3. Numbers & scales

The chapter gives almost no numbers; those it gives:

| Item | Value | Source |
|---|---|---|
| Apps in Apple + Android stores | over 5.5 million, each with its own navigation design | p.436 |
| Users for a navigation test | 3-5 people | p.455 |
| Reasons to avoid dropdowns (Crestodina) | 2 (SEO crawling, users skip pages) | p.449 |
| Mega menu properties | 3 (bigger, grouped contextually, visible at once) | p.450 |
| Visible menu positions | 2 (top horizontal, left vertical) | p.444 |
| Navigation cue types | 6 | p.453 |
| Common patterns listed | hamburger, tabs, vertical navigation, call-to-action button, breadcrumbs (+ search) | p.437-441 |
| Figure measurements | none stated | - |

Figure details (my reading of the images, unmeasured): navbar is a rounded dark slate bar (muted slate-blue), labels very small white text, a notch with a small blue dot in the bar edge marks the active item (p.433, p.445; the same notch-and-dot is used in the tab bar on p.465 and p.477); tab bar items are outlined icons.

Figure counts and proportions (read from the images at 2x crop; approximate, no px given) (audit 2026-10-15):

- Desktop top bar: 4 text links + 1 CTA + 1 menu tile (p.433, p.440, p.449, p.452); 6 links + bare 3-line icon on the photo hero (p.445). (audit 2026-10-15)
- CTA and menu tile height ≈ 0.54x bar height; menu tile is square; CTA width ≈ 2.2x its height; gap between CTA and tile ≈ 0.3x control height; gap between links ≈ 0.55x control height (p.433). (audit 2026-10-15)
- Wordmark cap height ≈ 1.8x link cap height (p.433). (audit 2026-10-15)
- Navbar states shown: 5 (default, active-notch, dropdown chevrons, compact with Login, compact logo-only) (p.433). (audit 2026-10-15)
- Vertical nav: 7 primary items + 2 bottom utilities, 3 nested sub-items, 3 dividers-delimited zones; collapsed rail ≈ 0.44x expanded width; sub-item row pitch ≈ 0.85x parent row pitch; icon-to-label gap ≈ 1 icon width (p.439). (audit 2026-10-15)
- Hamburger drawer: 9 list items (Pixselacademy, My Orders, My Wishlist, Saved Cards, Notifications, Gift Cards, My Rewards, Address, Help) + 2 bottom (Settings, Logout); drawer covers ≈ 85% of screen width; avatar ≈ 2x a list row height (p.438). (audit 2026-10-15)
- Mobile tab bar: 4 items, only the active one labelled (p.438). (audit 2026-10-15)
- Breadcrumb depth: 4 levels, last truncated (p.441). (audit 2026-10-15)
- Dropdown: 9 links in rows of 5 + 4, no heading (p.447). Mega menu: 2 groups x 9 links, rows 5+4 and 4+4 (p.449). (audit 2026-10-15)
- Mega menu gaps: chip row-gap = column-gap ≈ 0.2-0.25x chip height; heading-to-chips and group-to-group gaps ≈ 3x chip gap (p.449). (audit 2026-10-15)
- Cooper's essay "Navigating Isn't Fun": 2001 (p.436). Navigation cue types: 6 (logo/branding, tab title, visual design changes, URLs, breadcrumbs, date/time/icons/tags) (p.453). Prototyping helps you understand 4 things (product, direction, users, success/failure) and evaluate 4 flows (registration, locating an item, purchasing, the whole product's nav) (p.453-454). (audit 2026-10-15)

## 4. Dos and Don'ts

- **Do** (p.433 figure) show the navbar in 5 states: default; active item (a small notch plus blue dot above `UI Books` item); items with a down-chevron for dropdown parents (`UI Books v`, `CSS Books v`); collapsed variants (logo + Login + hamburger; logo + hamburger).
- **Do** (p.438 figure) hamburger drawer: white sheet slides over the dark app, leaving a sliver of the dimmed screen visible at the right; profile header, divider, long list with chevrons, bottom-pinned Settings/Logout.
- **Do** (p.439 figure) vertical nav in 4 variants: dark and light themes x collapsed (icons only, 7 icons + settings + logout) and expanded (avatar, name, Dashboard with chevron, Invoices, Wallets with a status dot, Wishlist expanded to show three indented sub-items with thumbnails, Notifications, Messages, UI Book House, then Settings and Logout). Shows primary and secondary (nested) levels.
- **Do** (p.449 figure) mega menu: full-width dark panel under the bar with a notch pointing at the active item `ALL Books` (highlighted in the light blue); two titled groups ("UI/UX Books", "Graphic Design Books"), each a wrapped set of outline-pill links in two rows; everything visible at once, no scrolling.
- **Don't** (p.447 figure) plain dropdown: a compact panel of two rows of outline pills under `UI/UX Books` over the dimmed page, no group headings and no indication of the other categories; the user must hover to discover each branch. The book contrasts this with the mega menu above it.
- **Don't** label a watch shop's nav item "products"; do label it "analogue watches" / "smart watches" (p.447-448).
- **Do** (p.445 figure) put a clearly named nav (Home, Branch, UI Store, Books, Service, Help) over a glass-style hero; the active item (`Books`) is ringed by a circle and a dot marker. [engine note: the white nav text over the busy gradient photo looks low contrast in this figure; the book does not comment on it.]
- **Do** (p.452 figure) article page with orientation cues: logo outlined in the nav, an "Analysis" category tag, the headline, author card (`James Hurley / User Interface Designer`), "Posted by : 03 Dec 2002" date. Caption: "Navigation cues help anchor the user and give sense of place."
- **Do** (p.440 figure) CTA: heading `It is easy to read, it is beginner-friendly, it is no-nonsense.`, then a solid dark `Watch More` button centred, with images beneath; the button is the single filled element in the hero.
- **Do** (p.433 figure) active marker detail: the notch is cut into the bar's TOP edge as a soft V with a blue dot inside it, centred over `UI Books`; the label itself stays white, the same weight as its siblings. Compact variant shortens the wordmark to `Pixsel` instead of truncating it. (audit 2026-10-15)
- **Do** (p.438 figure) mobile app header: round outlined hamburger icon top-left, avatar top-right, greeting heading, pill search field with a round filter button beside it. Floating rounded bottom bar of 4 items: the active `Home` is a white pill holding a black circular icon plus its label; the 3 inactive items are white icons only. (audit 2026-10-15)
- **Do** (p.438 figure) drawer rows: each item carries a small accent DOWN-chevron at the right (expandable rows, not right-arrows), `Settings` keeps its chevron, `Logout` has none; a hairline divider separates the profile header (large round avatar, name, muted email) from the list. (audit 2026-10-15)
- **Do** (p.439 figure) vertical nav: expanded desktop variant carries window traffic-light dots at the top; dark and light themes share the identical structure, icon set and stroke; the light theme's Wallets status marker is an outlined square where the dark theme uses a filled white dot. (audit 2026-10-15)
- **Do** (p.441 figure) breadcrumb placement: the trail sits immediately below a two-row header (search row, then a hairline, then a `Delivered At 500987` utility row), flush-left with the product image; the figure highlights the trail with a translucent lilac box and a hand-drawn arrow (annotation, not UI). (audit 2026-10-15)
- **Do** (p.445 figure) nav over imagery: the bar floats inset from the hero edges as a translucent slate glass panel; the hamburger here is a bare three-line icon with no tile; the content below uses a frosted-glass card with a solid slate `Play` button and outlined white selects. (audit 2026-10-15)
- **Do** (p.447 figure) open dropdown state: everything except the panel, including the navbar and its Login button, is washed out by a grey veil; the panel (dark slate, rounded) overlaps the bar's bottom edge and a small bump in the bar hairline points to `UI/UX Books`. (audit 2026-10-15)
- **Do** (p.449 figure) mega menu active state: the trigger renamed `ALL Books` turns light accent blue while the other links stay white; no underline, no background pill. (audit 2026-10-15)
- **Do** (p.452 figure) inverse navbar variant: pure black bar, `Login` as a white button with accent-blue text, menu as a bare two-line icon (long line over a shorter one). The blue outlines on the logo, `Analysis` tag and author card are annotations marking the navigation cues, not UI borders. (audit 2026-10-15)
- **Don't** (p.439 figure, by omission) the vertical nav figure shows no highlighted current item in any of the 4 variants; pair it with the book's own "highlight where the user is" cue rule (p.451-453) rather than copying it as-is. (audit 2026-10-15)

## 5. Exceptions & judgement calls

- The book says there are times when rules can be broken but, for navigation, simplicity wins (p.447). It does not say when breaking them is better.
- It says no pattern is superior (p.435) yet then instructs "use mega menus instead of dropdown menus" (p.447). Reconcile: the stated rule is context-dependent (the section heading is an opinion; its reasons are SEO crawlability and users skipping key pages).
- The "content first" rule (p.442) and "align with user goals" (p.449) can conflict when content is not yet user-driven; the book does not resolve it. Tested prototypes decide (p.453).
- Tag clouds: the author calls the jury "still out on whether tag clouds are ever appropriate" (p.438). (opinion)
- Hamburger menu is described as popular on mobile and growing on desktop (p.439). The book does not mention its discoverability cost; it does not compare it with visible tabs.
- Bottom tabs: "normally locate the most crucial panels" - the number of tabs is left open (p.439).
- [engine note] The book's evidence is largely quotation and anecdote (Nielsen F-pattern, NN/g, Crestodina). Treat the dropdown vs. mega-menu rule as a heuristic, not a measured law. Also the F-pattern claim is for text-heavy pages; do not apply it to sparse landing pages. Also the book never specifies touch target sizes, menu hover delay, keyboard/ARIA behaviour, or focus handling; add those from engine rules (accessibility notes), not from this source.
- [engine note] The book says people "pay more attention to the right" in LTR languages (p.442-443), while also claiming scanning starts top-left (F-pattern, p.444). These pull in different directions; it does not say which takes priority. Flag for engine: right-aligned CTA (Login) with left-aligned logo is the pattern used in every figure.

## 6. Figures worth keeping

- p.433: the five navbar states (default, active-dot notch, dropdown chevrons, compact with hamburger).
- p.438: hamburger drawer anatomy on mobile.
- p.439: vertical navigation, collapsed/expanded, dark/light, with nested sub-items.
- p.440: hero CTA placement under the navbar.
- p.441: breadcrumb trail placement over a product page.
- p.445: active nav item marker over a busy photographic hero.
- p.447: plain dropdown (the weaker pattern) for contrast with p.449.
- p.449: mega menu with grouped sections.
- p.452: orientation cues on an article page.

## 7. Open questions

- p.434: no rule content (pull-quote only: "The goal of navigation design is to create a system that allow users to engage with and use your product more effectively.").
- p.437 (printed 436) text is OCR-garbled in one place ("buried" followed by symbols); meaning is clear: Cooper's quote ends "...information and resources are buried."
- Section headings numbered 1-8 on p.442-453: 1 Content First, 2 Placement, 3 Clarity, 4 Instead of formats use meaningful labels, 5 Use mega menus instead of dropdown menus, 6 Align navigation design with user goals, 7 Navigation design isn't just a back button, 8 Testing your navigation design.
- "Format" labels in point 4 ("Instead of formats") is the book's wording; the example it gives is generic category words ("products", "items"), not file formats. Intended meaning inferred.
- The statement "people who speak languages written left to right ... pay more attention to the right" (p.442-443) is stated without evidence and sits oddly beside the F-pattern claim (p.444). [engine note] Not resolved in the book; treat as unverified.
- Pages with no rule content beyond the above: p.434 (quote), p.436 (importance preamble, stat and Cooper quote only), p.455-456 (closing summary: "navigation can determine whether the experience occurs at all, it is just as crucial as the material itself"; harmonise user goals, content strategy and navigation design).
- No sizes, spacing, timings, contrast or breakpoints are given anywhere in this chapter.
- (audit 2026-10-15) Coverage: all 24 page images p.433-456 viewed, figure pages (p.433, 438, 439, 441, 446, 447, 449, 452) also cropped and enlarged 2x. Pages with no rule content: p.434 (pull-quote), p.435-437 (importance preamble and pattern intro, covered by core ideas), p.448 and p.450-451 (prose already covered), p.453-456 (testing prose and closing summary, covered); p.456 is a short closing paragraph with an empty page.
- (audit 2026-10-15) The book never labels the p.447 dropdown figure as bad; it sits under point 4 (labels) and only the following section (point 5, p.448-450) argues for mega menus. The "Don't" reading of p.447 in section 4 is an inference from that sequence.
- (audit 2026-10-15) p.442 reads "many users do not want to arrive at the homepage"; the breadcrumb rule paraphrases it as "do not arrive at the homepage". The book's wording is probably a slip for "do not arrive"; meaning kept, wording flagged.
- (audit 2026-10-15) No hover, focus, pressed or disabled state of any nav item is shown in the chapter; only default, active and open-menu states.
- (audit 2026-10-15) All proportions in section 3 under "Figure counts and proportions" are read from 1056px page renders; treat them as ratios, not px.
- Coverage: p.433-456 all read; images viewed for p.433, 434, 438-441, 444-447, 449, 452. Remaining pages (435-437, 442-443, 448, 450-451, 453-456) are text-only.
