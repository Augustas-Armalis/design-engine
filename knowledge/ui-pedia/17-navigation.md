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
- Coverage: p.433-456 all read; images viewed for p.433, 434, 438-441, 444-447, 449, 452. Remaining pages (435-437, 442-443, 448, 450-451, 453-456) are text-only.
