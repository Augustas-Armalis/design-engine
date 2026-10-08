---
source: web:https://www.nngroup.com/articles/
chapter: Nielsen Norman Group core articles (28 articles: heuristics, response times, hierarchy, scanning, homepage, forms, errors, navigation, pricing, mobile, trust, microcopy, deceptive patterns, scrolling, attention)
pages: n/a
topic_tags: [nngroup, usability, heuristics, response-time, visual-hierarchy, scanning, f-pattern, homepage, forms, errors, navigation, hamburger, pricing, touch-targets, trust, microcopy, deceptive-patterns, fold, banner-blindness, popups, sticky-header, progressive-disclosure]
status: studied
---

# NN/g core articles, studied in own words

Fetched 2026-10-08, one request every 62 seconds (the site's robots.txt sets a 60 s crawl delay for generic agents, stricter than the 2 s ceiling we were given). Raw HTML and extracted text are in `corpus/web/m3-nng-laws/nng/` (gitignored). NN/g content is copyrighted: everything here is paraphrase, numbers and study facts are reported as facts. No passages are reproduced.

Articles read (all returned 200), with URL slug under `https://www.nngroup.com/articles/`:
core six: `ten-usability-heuristics`, `response-times-3-important-limits`, `visual-hierarchy-ux-definition`, `f-shaped-pattern-reading-web-content`, `usability-101-introduction-to-usability`, `how-to-conduct-a-heuristic-evaluation`.
further 22: `how-people-read-online`, `top-ten-guidelines-for-homepage-usability`, `homepage-design-principles`, `web-form-design`, `errors-forms-design-guidelines`, `error-message-guidelines`, `form-design-placeholders`, `menu-design`, `hamburger-menus`, `show-price`, `touch-target-size`, `mobile-input-checklist`, `trustworthy-design`, `3-cs-microcopy`, `deceptive-patterns`, `scrolling-and-attention`, `page-fold-manifesto`, `banner-blindness-old-and-new-findings`, `progressive-disclosure`, `ecommerce-product-pages` (skimmed after its must-have list), `sticky-headers`, `popups`, plus `information-scent` (read in part).

## 1. Core ideas

1. **People scan, they rarely read.** Eye-tracking over 13 years and 500+ participants shows scanning is the default and word-by-word reading is rare. Every layout choice should assume a scanner.
2. **Attention decays steeply with depth.** About 57% of viewing time sits above the fold (80% in 2010); 74% falls in the first two screenfuls; the fold still matters because scrolling has an interaction cost. Content that signals more below keeps people moving.
3. **Interaction cost decides everything.** Hidden navigation, placeholders, popups, two-column forms and tiny targets all add cost. The research keeps finding that visible, plain, conventional choices win.
4. **Hierarchy is made from three tools:** contrast of colour and value, scale, and grouping by proximity or container. Use few levels (about three) or nothing stands out.
5. **Conventions are cheap usability.** Logo top-left linking home, nav in the header, visible labels above fields, a search box that looks like a box. Novel patterns need a reason.
6. **Errors are the designer's problem.** Prevent them, show them next to the field, say what to do, and keep the user's input.
7. **Trust is built from design quality, up-front disclosure (prices, fees, contact), comprehensive current content, and corroboration elsewhere on the web.**
8. **Heuristics are guidelines, not laws.** A violation may be the right trade (hamburger menu on a phone); verify with users before breaking one.

## 2. Rules

### Foundations: heuristics, response time, evaluation

- **RULE [NNG-01]** Review every screen against the 10 heuristics: visibility of system status; match to the real world; user control and freedom (undo, visible exit); consistency and standards; error prevention; recognition over recall; flexibility and efficiency (accelerators); aesthetic and minimalist design; help users recognise, diagnose and recover from errors; help and documentation.
  **Why** They are broad predictors of usability problems derived from a factor analysis of 249 problems and stable since 1994.
  **Applies to** all. **Check** `visual` checklist pass; mechanical sub-checks: every async action has a pending/success state, destructive actions have undo or confirm, a cancel/back exit exists in every modal and flow. **Source** https://www.nngroup.com/articles/ten-usability-heuristics/

- **RULE [NNG-02]** Respond to input within 0.1 s so it feels direct (selection highlight, button press); keep results under 1 s so flow of thought is unbroken (show a busy indication past about 0.1 s of actual wait); for waits near or beyond 10 s show a percent-done indicator and a way to cancel; use an indeterminate spinner or running log only when progress is unknowable.
  **Why** These three limits come from human perception: instantaneous, flow-preserving, attention-retaining.
  **Applies to** all. **Check** measure input-to-first-paint: at most 100 ms for press/hover/selection feedback; at most 1000 ms for navigation results; operations over 10 s expose `<progress>` or `role="progressbar"` with a cancel control. **Source** https://www.nngroup.com/articles/response-times-3-important-limits/

- **RULE [NNG-03]** For waits of 2-10 s use a small, unobtrusive progress cue rather than a loud modal bar; time UI animations by the clock, not by how fast the machine happens to run.
  **Why** A heavy indicator on a short wait causes display inertia (flashing changes the user cannot follow).
  **Applies to** SaaS app UI. **Check** `visual`; animation durations use CSS time, not frame-count loops. **Source** https://www.nngroup.com/articles/response-times-3-important-limits/

- **RULE [NNG-04]** Define usability as five measurable components (learnability, efficiency, memorability, errors, satisfaction) plus utility; test early with about five users per round, individually, observing behaviour, and iterate rather than running one large study; retest after implementation.
  **Why** Most major problems surface with five users, and structural problems are cheap to fix only early.
  **Applies to** all. **Check** `visual` (process): each design brief names tasks and a pass criterion per component. **Source** https://www.nngroup.com/articles/usability-101-introduction-to-usability/

- **RULE [NNG-05]** Run a heuristic evaluation with 3-5 independent evaluators, each timeboxed to 1-2 hours, with two passes (learn the flow, then look for violations), narrow scope (one task, one section, one user group, one device), and consolidate by clustering. Treat a violation as a flag, not a verdict, and confirm with users before deciding.
  **Why** A single evaluator misses issues; independence prevents bias; context decides whether a violation matters.
  **Applies to** all. **Check** `visual` (process): the critique step records issue, heuristic number, severity, and recommendation per evaluator. **Source** https://www.nngroup.com/articles/how-to-conduct-a-heuristic-evaluation/

### Hierarchy and scanning

- **RULE [NNG-06]** Build hierarchy from contrast, scale and grouping. Use no more than about three sizes (small/medium/large: body 14-16 px, subheads 18-22 px, headline up to 32 px in the article's web example), no more than two large elements per view, at most three contrast levels, and about two primary plus two secondary colours.
  **Why** If everything is emphasised nothing is, and too many similar colours or sizes flatten perceived hierarchy.
  **Applies to** all. **Check** count distinct computed font-size tiers in a section (target 3); count elements with font-size at or above the headline tier per viewport (at most 2); count distinct hues in UI chrome (at most about 4 plus neutrals). Note: marketing heroes often exceed 32 px, so apply the ratio between tiers rather than the cap. **Source** https://www.nngroup.com/articles/visual-hierarchy-ux-definition/

- **RULE [NNG-07]** Do not rely on colour alone to carry hierarchy or meaning; reserve warm bright colours (red) for warnings and errors.
  **Why** Colour-blind users lose colour-only differences, and a warning colour used decoratively dilutes alerts.
  **Applies to** all. **Check** each status or hierarchy colour is paired with weight, size, icon or text; red/danger tokens appear only in error/destructive contexts. **Source** https://www.nngroup.com/articles/visual-hierarchy-ux-definition/

- **RULE [NNG-08]** Group with space first, containers second: related items sit closer to each other than to other groups (heading closer to its content than to the preceding section), and add borders or backgrounds only where spacing alone fails.
  **Why** Proximity and common region create structure; extra boxes add clutter.
  **Applies to** all. **Check** heading margin-bottom smaller than section margin-top above it; fewer than two nested bordered containers per section. **Source** https://www.nngroup.com/articles/visual-hierarchy-ux-definition/

- **RULE [NNG-09]** Squint-test every layout: blur the render with a 5-10 px radius and confirm the intended order of attention survives; also test with real content, because a strongly coloured image can hijack the hierarchy (it did at a 20 px blur in the article's example).
  **Why** Blur strips text and reveals the true visual weight order.
  **Applies to** landing page | SaaS app UI. **Check** render a blurred screenshot (gaussian 5-10 px) and compute that the CTA or headline region has the highest local contrast or saliency score; `visual` fallback. **Source** https://www.nngroup.com/articles/visual-hierarchy-ux-definition/

- **RULE [NNG-10]** Put the most important points in the first two paragraphs; start headings, subheadings, bullets and links with the information-carrying words (the first two words should give the gist); use bullets, numbers, bold key phrases and visible subheads; cut filler.
  **Why** Unformatted text is scanned in an F shape: the first lines and the first words of each line get most fixations, so late or right-hand content is skipped.
  **Applies to** landing page | all content. **Check** first two words of each H2/H3/list item/link are not stopwords or the brand name; no paragraph block over about 5 lines without a break `[engine note]`; no link text that is just "click here", "more", "go". **Source** https://www.nngroup.com/articles/f-shaped-pattern-reading-web-content/

- **RULE [NNG-11]** Expect several scan patterns: F, layer cake (headings only), spotted (looking for a number or word), marking (eyes fixed while scrolling), bypassing (repeated line starts are skipped), commitment (rare full reading), and lawn mower for card or zigzag grids (left to right, then back right to left on the next row). Do not repeat the same leading words across list items.
  **Why** Layouts shape the pattern, and repeated openings are skipped.
  **Applies to** all. **Check** sibling list items/cards do not share the same first two words; grid cards put the key label at the start of each card. **Source** https://www.nngroup.com/articles/how-people-read-online/

- **RULE [NNG-12]** Pull quotes, inline promotions and in-article ads interrupt reading; readers who were reading closely often drop into light scanning after hitting one. Place them at section ends or outside the reading column.
  **Why** Eye-tracking showed attention falling after such inserts.
  **Applies to** landing page | content. **Check** no pull quote or promo block interrupts a text run shorter than about 600 words `[engine note]`. **Source** https://www.nngroup.com/articles/how-people-read-online/

### Fold, scrolling, attention

- **RULE [NNG-13]** Keep the highest-priority content and the primary CTA above the fold and in the top half of the first viewport; secondary and related material goes lower.
  **Why** About 57% of viewing time is above the fold, 65% of that in the top half of the viewport, and the 100 px just above the fold gets about twice the views of the 100 px below.
  **Applies to** landing page. **Check** at 1440x900 and 390x844 the H1 and primary CTA bottoms are within the first viewport, ideally within the top 60%. **Source** https://www.nngroup.com/articles/scrolling-and-attention/

- **RULE [NNG-14]** Avoid false floors: make sure something visibly continues below the viewport (cut-off text, next card peeking, a cropped image); a lone arrow is a weak substitute for real content continuity.
  **Why** A fully self-contained first screen looks finished, so people do not scroll.
  **Applies to** landing page. **Check** at common viewports an element straddles the fold line (starts above, ends below) or a next-section heading is visible within 120 px of the bottom edge. **Source** https://www.nngroup.com/articles/page-fold-manifesto/

- **RULE [NNG-15]** Give long pages signposts at the top (anchor links, a short overview) and a reason to scroll (a glimpse of interesting content, a clear story), because people scroll only if the top promises value; most attention ends by the third screenful.
  **Why** Scrolling is an extra action; 81% of viewing time falls in the first three screenfuls.
  **Applies to** landing page. **Check** pages over 3 screens have in-page navigation or a section index and the most important proof appears before 2160 px of scroll depth. **Source** https://www.nngroup.com/articles/scrolling-and-attention/

- **RULE [NNG-16]** Do not style real content like advertising or place it in ad zones (top banner, right rail) or next to ads; avoid small bordered promotional rectangles, text-in-image, animated or coloured promo boxes for important messages.
  **Why** People learn to skip ad-like content and the skip spreads to neighbouring items (banner blindness).
  **Applies to** all. **Check** key messages are not in a right rail card styled with a coloured rectangle plus text-in-image; headline/CTA text is live HTML, not baked into an image. **Source** https://www.nngroup.com/articles/banner-blindness-old-and-new-findings/

### Homepage and landing

- **RULE [NNG-17]** State plainly who you are and what you do in a short tagline or headline visible at first glance (no vague welcome message, no jargon, no feature slogan), and let the page's value proposition answer why choose you over others.
  **Why** If purpose is not obvious at a glance, visitors leave.
  **Applies to** landing page. **Check** H1 or the text directly beneath it names the product category and benefit; H1 does not start with "Welcome"; the tagline is visible without scrolling or animation. **Source** https://www.nngroup.com/articles/homepage-design-principles/

- **RULE [NNG-18]** Logo top-left, linking to the homepage on every page, plus an explicit Home or equivalent path; do not hide the home link inside a funnel in a way that traps users.
  **Why** Users orient from the homepage and expect the logo there.
  **Applies to** all. **Check** header `a` containing the logo has `href="/"` and sits in the leftmost 25% of the header at desktop widths. **Source** https://www.nngroup.com/articles/homepage-design-principles/

- **RULE [NNG-19]** Surface the top 1-4 user tasks as clear starting points; include a search box that looks like a box and is about 27 characters wide on sites large enough to need search; start link labels with the keyword; show real examples of content rather than only category names.
  **Why** Visitors look for a starting task, the "little box" to type in, and concrete evidence of what is inside.
  **Applies to** landing page | SaaS app UI. **Check** count of primary task links in the first viewport is between 1 and 4; search input width is at least 27ch (or about 25-27 characters) when present; hero area contains specific content examples or screenshots. **Source** https://www.nngroup.com/articles/top-ten-guidelines-for-homepage-usability/

- **RULE [NNG-20]** Do not decorate with generic stock imagery; use pictures that show real products, places, or people tied to the topic, and do not over-format critical areas such as navigation with heavy boxes and graphics.
  **Why** Decorative or frivolous images are skipped and heavy formatting makes important areas look like ads.
  **Applies to** landing page. **Check** `visual`; hero image has an alt describing product or subject, not "people smiling at laptop" `[engine note]`. **Source** https://www.nngroup.com/articles/homepage-design-principles/

- **RULE [NNG-21]** Keep homepages simple and conventional; minimise motion (do not animate just to draw attention; moving items read as ads), avoid autoplaying video, give a pause control for anything moving over 5 seconds, and let users reduce scroll effects; do not animate the logo, tagline or headline; load content immediately.
  **Why** Unconventional layouts raise cognitive load; motion harms accessibility and delays reading; bounce probability rises 32% when load time goes from 1 s to 3 s (Google figure cited by NN/g).
  **Applies to** landing page. **Check** headline and tagline have no scroll-triggered or entrance animation delaying visibility beyond 300 ms; any autoplay media over 5 s has a visible pause button; `prefers-reduced-motion` disables scroll effects. **Source** https://www.nngroup.com/articles/homepage-design-principles/

- **RULE [NNG-22]** Do not show popups or splash screens before the user has seen content, or right after login, or while a critical task is in progress; the only acceptable early overlays are legally required ones (consent, age check). Ask for feedback or an email after a meaningful action, preferably with a nonmodal overlay in a corner, and offer a static feedback link instead. Never stack overlays.
  **Why** Overlays interrupt goals and are among the most disliked patterns; value should come before a request (reciprocity).
  **Applies to** all. **Check** no `dialog`, modal or overlay opens within the first 5 s of page load or before a scroll or click event (except cookie/age); at most one overlay visible at a time. **Source** https://www.nngroup.com/articles/popups/

- **RULE [NNG-23]** Show prices, or representative prices, ranges or typical scenarios, for B2B and B2C offers; prefer a few worked scenarios over a complex calculator; do not make "contact sales" the only way to learn cost.
  **Why** Price is the top information need: it fixes product category, enables comparison and budget planning, and hiding it reads as evasive.
  **Applies to** landing page | pricing. **Check** pricing page or section contains at least one numeric price or range for each public tier; a "Contact us" only card is accompanied by a starting-from figure or sample scenario. **Source** https://www.nngroup.com/articles/show-price/

- **RULE [NNG-24]** Product pages need at least: descriptive name, recognisable images with enlarged view, price including extra charges, options with selection, availability, clear add-to-cart with visible confirmation, concise description; reviews, extra images, video and related items are expected extras; show negative reviews too.
  **Why** Missing information makes shoppers abandon or buy the wrong thing.
  **Applies to** landing page (commerce). **Check** DOM contains product name, price element, images, option controls, availability text, and a cart button; confirmation state after add exists. **Source** https://www.nngroup.com/articles/ecommerce-product-pages/

### Navigation

- **RULE [NNG-25]** Show primary navigation on desktop; do not hide it behind a hamburger. On mobile, a hamburger is an acceptable trade-off, but a combination (some key links visible plus a menu) is better than fully hidden.
  **Why** In a study of 179 participants on 6 sites, hidden navigation was used in 27% of desktop tasks versus 48% (visible) and 50% (combo); on mobile 57% hidden versus 86% combo; discoverability roughly halves, tasks take longer and feel harder.
  **Applies to** landing page | SaaS app UI. **Check** at 1280 px wide the top-level navigation links are present as visible `a` elements in the header (not only inside a menu button); on 390 px at least the primary CTA or one key link is visible next to the menu button. **Source** https://www.nngroup.com/articles/hamburger-menus/

- **RULE [NNG-26]** Put menus where people expect them: primary navigation in the header (websites) or left side (applications); utility navigation above primary and search at the top; local navigation on the left on desktop; footer menu at the bottom. Indicate the current location in the menu and with breadcrumbs on deep pages.
  **Why** Users expect these locations; missing current-location indication is the most common menu mistake.
  **Applies to** all. **Check** current page link has `aria-current="page"` and a visible style; pages deeper than two levels have breadcrumbs. **Source** https://www.nngroup.com/articles/menu-design/

- **RULE [NNG-27]** Make menu links high-contrast over any background (including carousels and images), large enough to tap or click, left-justified in vertical lists with key terms first, with a caret or arrow on items that open submenus.
  **Why** Low contrast and tiny spaced links are a major source of failure; a caret tells people an item opens a submenu rather than navigates.
  **Applies to** all. **Check** menu text contrast at least 4.5:1 against the rendered background; items with a submenu contain an icon or caret; menu link hit height at least 44 px on touch. **Source** https://www.nngroup.com/articles/menu-design/

- **RULE [NNG-28]** Use click- or tap-activated submenus, not hover-only ones; avoid cascading menus deeper than two tiers (use a mega menu of 2-3 tiers or routing pages); do not cover the whole screen with an open menu on large screens; consider sticky or partially sticky menus on long pages; put the most common dropdown items closest to the trigger.
  **Why** Hover is unavailable on touch and keyboard, deep cascades cause drop-out errors, full-screen menus feel like page changes, and distance affects acquisition time (Fitts).
  **Applies to** all. **Check** menu opens on `click` or `focus`+`Enter`, not only `:hover`; nesting depth of dropdowns at most 2. **Source** https://www.nngroup.com/articles/menu-design/

- **RULE [NNG-29]** Sticky headers: keep them as short as the readable text and tap targets allow (maximise content-to-chrome ratio), opaque with strong contrast to content (no translucent bars over text), with no animation except a shrinking logo or a partially persistent header that slides in over roughly 300-400 ms after a few pixels of upward scroll; no delayed "stalker" movement; first ask whether a sticky header is needed at all.
  **Why** A sticky bar takes space on every screen; translucent ones make content hard to read; motion distracts.
  **Applies to** landing page | SaaS app UI. **Check** computed header height at most about 64-72 px on desktop and 56 px on mobile `[engine note]`; header background alpha is 1; header transition-duration at most 400 ms. **Source** https://www.nngroup.com/articles/sticky-headers/

- **RULE [NNG-30]** Link labels carry information scent: describe the destination in the user's words; avoid "Click here", "Learn more", "Explore" as the only text; do not make the user guess what a button does.
  **Why** People decide where to click from the label plus nearby context; vague labels hide good pages and cannot be told apart by a scanner.
  **Applies to** all. **Check** no `a` or `button` text matches /^(click here|learn more|more|explore|read more|here)$/i unless an accessible name or adjacent heading disambiguates it (and prefer visible text). **Source** https://www.nngroup.com/articles/information-scent/ and https://www.nngroup.com/articles/homepage-design-principles/

- **RULE [NNG-31]** Use progressive disclosure: show the few most-needed options first, reveal advanced ones on request with an obvious, clearly labelled control; keep to two levels (three at most); use a staged (wizard) flow only for steps with little interdependence.
  **Why** It improves learnability, efficiency and error rate; the initial display signals importance.
  **Applies to** SaaS app UI | forms. **Check** advanced section sits behind a disclosure control with `aria-expanded` and a descriptive label; no more than 3 disclosure levels. **Source** https://www.nngroup.com/articles/progressive-disclosure/

### Forms and errors

- **RULE [NNG-32]** Keep forms short: drop any field that can be derived, collected later, or omitted; every cut field raises conversion. Show 1-2 optional fields at most, marked as optional.
  **Why** Less effort per form means fewer abandonments; forms that follow guidelines had 78% first-try error-free submission versus 42% for violating forms in one CHI study.
  **Applies to** forms. **Check** count visible inputs per form step (flag more than about 7 `[engine note]`); optional fields are labelled "optional". **Source** https://www.nngroup.com/articles/web-form-design/

- **RULE [NNG-33]** Use a single column, one field per row; short related fields (city/state/zip) may share a row; sequence fields in the conventional order; list the most common option values first; make Tab order follow visual order.
  **Why** Multiple columns break vertical momentum.
  **Applies to** forms. **Check** form inputs share the same left edge except for allowed short pairs; DOM order equals visual order (no positive `tabindex`). **Source** https://www.nngroup.com/articles/web-form-design/

- **RULE [NNG-34]** Put the visible label above its field (below is wrong, inside is wrong), close to its field and farther from other fields; section unrelated groups with headings or fieldsets; use real `label` elements.
  **Why** Labels above fields scan fastest on mobile and short forms, and ambiguous spacing causes misreading.
  **Applies to** forms | mobile. **Check** each `input` has an associated visible `label` positioned above it; label-to-field gap smaller than field-to-next-label gap. **Source** https://www.nngroup.com/articles/mobile-input-checklist/ and https://www.nngroup.com/articles/web-form-design/

- **RULE [NNG-35]** Do not use placeholder text as a label, and avoid it for essential hints; keep instructions and examples persistent outside the field. Floating labels are an improvement but still inferior to a label and hint outside the field when space allows.
  **Why** Disappearing text strains memory, prevents checking work, hides the hint during errors, makes filled fields less noticeable and look pre-filled, has poor default contrast and inconsistent screen reader support.
  **Applies to** forms. **Check** every `input` with a `placeholder` also has a persistent visible `label`; placeholder text is not the only description of the format. **Source** https://www.nngroup.com/articles/form-design-placeholders/

- **RULE [NNG-36]** Size fields to the expected input (a city field of about 19 characters covered 99.9% of names), use radio buttons rather than a dropdown for 2-3 options, state any format or password rules up front, accept any reasonable format, and use the right mobile keyboard, autocomplete/autofill, defaults, history and computed values; do not autocorrect names, addresses or emails; allow paste.
  **Why** Hidden rules and format policing create avoidable errors; filling fields for the user saves effort.
  **Applies to** forms | mobile. **Check** `autocomplete`, `type` or `inputmode` attributes present on email, tel, address, card fields; no `autocorrect` on name/email; password requirements text exists before the first error; no `onpaste` blocking. **Source** https://www.nngroup.com/articles/mobile-input-checklist/

- **RULE [NNG-37]** Do not add Reset or Clear buttons; if a cancel is needed for sensitive data, make it much less prominent than Submit and keep it away from the fields; the primary action should be placed near the fields it submits.
  **Why** Accidental deletion outweighs the rare wish to start over.
  **Applies to** forms. **Check** no `type="reset"` inputs/buttons; Cancel control has lower visual weight (ghost/link) than Submit. **Source** https://www.nngroup.com/articles/web-form-design/

- **RULE [NNG-38]** Validate inline once the user finishes a field (on blur or at a natural completion), not while they are still typing and not on an untouched field; confirm success only where it helps (username available, password strength); give live guidance for error-prone fields such as new passwords.
  **Why** Early errors feel hostile; immediate feedback reduces correction cost; success marks on trivial fields distract.
  **Applies to** forms. **Check** an error element does not appear until blur/submit; an empty untouched field never shows an error on focus loss unless the user has typed. **Source** https://www.nngroup.com/articles/errors-forms-design-guidelines/

- **RULE [NNG-39]** Show the error message adjacent to the field in error, in plain language, with redundant cues (red text, outline or tinted background, and an icon); a summary at the top may supplement but never replace the inline message; do not report errors only in tooltips; use modals sparingly (only for simple or optional-to-proceed cases); give extra help (support link, examples) after 3 or more repeated errors on the same form.
  **Why** Proximity cuts working-memory load; colour alone fails colour-blind users; tooltips and summaries force extra steps and memory.
  **Applies to** forms. **Check** `aria-describedby` links the input to an error element placed within about one line of the field; error state has non-colour cue (icon or text); `aria-invalid="true"` set; error text contrast at least 4.5:1. **Source** https://www.nngroup.com/articles/errors-forms-design-guidelines/

- **RULE [NNG-40]** Write error messages that are human-readable (no codes), precise about the problem, constructive about the fix, polite, and never blame the user (avoid "invalid", "illegal", "incorrect"); preserve the user's input so they can edit it; offer likely fixes as one-tap options when you can; use severity-appropriate presentation (inline or toast for minor issues, modal for blockers); avoid humour in frequent errors.
  **Why** Heuristic 9 and the efficiency principle: protect effort and recover quickly.
  **Applies to** forms | SaaS app UI. **Check** error strings do not match /invalid|illegal|incorrect|error code|\b[A-Z]{2,}-?\d{3,}\b/i; form fields retain their value after a failed submit. **Source** https://www.nngroup.com/articles/error-message-guidelines/

### Mobile, trust, microcopy, ethics

- **RULE [NNG-41]** Make touch targets at least 1 cm by 1 cm physical (about 38 CSS px at 96 dpi; use 44 px as the working minimum), leave about 2 mm between neighbouring targets and make the target big enough before adding space, enlarge primary or in-motion actions, avoid tiny map pins, dot indicators and swatches as the only tap target, and expand hit areas beyond the visible glyph.
  **Why** Small and crowded targets slow taps and cause slips; tapping a small item that is easy to see is the view-tap asymmetry trap.
  **Applies to** mobile. **Check** `getBoundingClientRect()` width and height of every interactive element on a 390 px viewport at least 44 CSS px (use 38 as the hard floor); gap between adjacent targets at least 8 CSS px. **Source** https://www.nngroup.com/articles/touch-target-size/

- **RULE [NNG-42]** Build trust with the four levers: design quality (clear organisation, appropriate colour and imagery, no typos or broken links), up-front disclosure (contact info, what the base price includes, extra fees, delivery windows), comprehensive correct current content (including photos of the process, not only the end result), and connection to the wider web (third-party reviews carry more weight than on-site testimonials).
  **Why** Users judge credibility fast from these signals; spelling errors and hidden costs lower it sharply.
  **Applies to** landing page. **Check** contact method or utility link visible in header or footer; fees and inclusions stated near the price; spell-check passes; no 4xx links in a crawl; reviews link to an external source where available. **Source** https://www.nngroup.com/articles/trustworthy-design/

- **RULE [NNG-43]** Do not gate content or demand personal details (address, email, login) before the user has seen value; avoid long quote forms as the way to learn cost.
  **Why** Asking too much too soon breaches trust and drives people away.
  **Applies to** landing page | funnels. **Check** primary informational content is reachable without a form; first-step required fields number two or fewer. **Source** https://www.nngroup.com/articles/trustworthy-design/

- **RULE [NNG-44]** Write microcopy in the order clarity, concision, character: signpost location, give information scent, say why it matters to the user, use terms the audience knows; front-load the key word ("Out of stock - notify me"); keep titles under about 60 characters and descriptions under about 160 so search results do not truncate them; add personality last and tailor it to the audience.
  **Why** Busy users read only the first words; truncated meta text loses meaning.
  **Applies to** all. **Check** `<title>` length at most 60 chars, meta description at most 160 chars; button labels start with the action or key noun; `visual` for tone. **Source** https://www.nngroup.com/articles/3-cs-microcopy/

- **RULE [NNG-45]** Do not use deceptive patterns: obstruction (hard to cancel or decline), visual or wording tricks (double negatives, moved close buttons), nagging after a decline, emotionally manipulative decline text, sneaking or preselected extras. Persuasion (social proof, anchoring, scarcity) is acceptable only when the facts are true and the user can easily choose otherwise.
  **Why** They harm users, are common (over 10% of sampled shops in a 2019 study) and are increasingly illegal; they hit vulnerable users hardest.
  **Applies to** all. **Check** decline/cancel/close controls are present, same prominence tier as accept, and not moved off the dialog; no pre-checked paid add-ons (`input[type=checkbox][checked]` near price); decline labels are neutral; cancel flow takes no more clicks than signup. **Source** https://www.nngroup.com/articles/deceptive-patterns/

## 3. Numbers & scales

| Topic | Number | Source article |
|---|---|---|
| Response-time limits | 0.1 s instantaneous; 1.0 s flow kept; 10 s attention limit; percent-done for waits over about 10 s; 2-10 s use small cue | response-times-3-important-limits |
| Scanning | 57% of viewing time above the fold (2018), 80% in 2010; 74% in first two screenfuls (to 2160 px); 81% in first three screenfuls; more than 42% of time in top 20% of page; more than 65% of above-fold time in top half of viewport | scrolling-and-attention |
| Fold effect | 100 px above fold viewed 102% more than 100 px below; Google ad viewability 73% vs 44%; average of the two estimates 84% | page-fold-manifesto |
| Eyetracking base | 500+ participants, 750+ hours, 5 studies over 13 years; fixations 130,000 from 120 participants | how-people-read-online, scrolling-and-attention |
| Hierarchy limits | 3 sizes; max 2 large elements; max 3 contrast variations; 2 primary + 2 secondary colours; body 14-16 px, subhead 18-22 px, header up to 32 px | visual-hierarchy-ux-definition |
| Squint test | blur 5 or 10 px keeps intended hierarchy; 20 px revealed an unintended one | visual-hierarchy-ux-definition |
| Homepage | 1-4 main tasks; search box 27 characters wide (25 in the older text); popups only if legally required; WCAG: pause control for autoplay over 5 s | top-ten-guidelines..., homepage-design-principles |
| Load time | bounce likelihood +32% when load goes from 1 s to 3 s (Google, cited) | homepage-design-principles |
| Hidden nav study | n = 179, 6 sites; desktop use 27% hidden vs 48% visible vs 50% combo; mobile 57% hidden vs 86% combo | hamburger-menus |
| Forms | one-try submission 78% (compliant) vs 42% (violating); 19 characters covers 99.9% of city names (n = 2,130); 3 or more repeats of an error means redesign | web-form-design, errors-forms-design-guidelines |
| Touch targets | 1 cm x 1 cm minimum; fingertip 1.6-2 cm; thumb impact area about 2.5 cm; recommended spacing about 2 mm; oversized primary targets about 2 cm | touch-target-size |
| Sticky header | content-to-chrome ratio example 13:1 good, 2:1 poor; slide-in 300-400 ms for partially persistent; about 16 pt text and 1 cm targets minimum on mobile | sticky-headers |
| Microcopy limits | page title about 60 characters; meta description about 160 | 3-cs-microcopy |
| Heuristic evaluation | 3-5 evaluators; 1-2 h each; 5 users per usability test; 10% of design budget on usability | how-to-conduct..., usability-101 |
| Deceptive patterns | over 10% of 11,000 shops (2019 study); 95% of 240 apps in another 2019 study | deceptive-patterns |
| Colour-vision deficiency | about 350 million people worldwide | error-message-guidelines |

## 4. Dos and Don'ts

- Do: error text beside the field with an icon, red text and a tinted field; Don't: a top-of-form summary alone, or a tooltip on an alert icon.
- Do: label above the field with the format example beneath it; Don't: use a grey placeholder as the label.
- Do: visible desktop nav with a caret on submenu items and an `aria-current` marker; Don't: a hamburger on a wide desktop layout, a translucent menu over a carousel, or a full-screen mega-menu.
- Do: a headline that says what the product does, with specific examples; Don't: a "Welcome" banner, stock water photo, or a full-bleed hero with nothing visible below.
- Do: a sticky header that is small, opaque, still; Don't: a translucent oversized header, a duplicate sticky bottom bar, or a delayed "follow" menu.
- Do: one overlay, after the user acts, in a corner; Don't: email lightbox on arrival, feedback modal mid-checkout, stacked popups.
- Do: stacked touch targets separated by at least 2 mm and at least 1 cm tall; Don't: thin stacked buttons or 6 mm carousel dots as the only control.
- Do: prices or a sample scenario on a B2B page; Don't: "contact us for pricing" only.

## 5. Exceptions & judgement calls

Flagged conflicts with `knowledge/` notes (grepped):

- **Hamburger menu.** `dos-and-donts/dos-and-donts.md` T81 (marked opinion, no evidence) recommends a hamburger over visible links; NN/g's quantitative study (n = 179) says hidden nav halves discoverability. `web/landing-page-anatomy.md` already cites the NN/g numbers. Resolution: visible nav on desktop; combo on mobile; hamburger only where space forces it. T81 loses.
- **Placeholders and floating labels.** NN/g prefers a persistent label outside the field. `knowledge/web-sources/material3-tokens.md` shows M3 filled and outlined fields use a floating label that shrinks to body-small. This is an exception NN/g itself ranks second-best (still has the filled-field and screen-reader problems); use labels above fields in forms where space allows. `dos-and-donts` T24 (placeholder describing what can be searched in a search box) fits NN/g, which accepts placeholder-as-hint on one-field search forms.
- **Touch target number.** NN/g gives a physical 1 cm (about 38 CSS px); `web/design-systems.md` records Apple 44 pt and coss 44 px. Use 44 px (the larger) as the check and 38 px as the floor.
- **Gated content.** `web/funnels-and-conversion.md` line 202 keeps gating for high-value B2B assets; NN/g says to avoid asking before value. Reconcile by offering a meaningful preview and gating only downloads of genuine assets.
- **Popups and email capture.** NN/g condemns early email lightboxes; any exit-intent or timed-modal rule in `funnels-and-conversion.md` must be limited to after meaningful engagement and a nonmodal presentation.
- **NN/g pricing gap closed.** `web/funnels-and-conversion.md` line 225 says NN/g pricing pages 404'd and were reached only via summaries; the `show-price` article was readable directly and is now a primary source for NNG-23.
- **Hierarchy caps versus marketing type.** The 32 px headline cap and 3-size rule come from a short web example; hero headlines routinely exceed it. Apply the ratio and the count rules, not the absolute pixel values. `web/design-systems.md` and `web/typography.md` govern sizes.
- **Hierarchy example versus motion rules.** Sticky-header slide of 300-400 ms matches the engine's modal and panel tier; the engine's own ceiling for ordinary UI is lower, so apply 300 ms.
- **Conflict with Doherty note.** NN/g response limits (0.1 s, 1 s, 10 s) and Laws of UX Doherty (400 ms) are compatible: 0.1 s for direct manipulation, 0.4 s for productive pace, 1 s before flow breaks.
- **Heuristic violations are not defects.** NN/g's own hamburger example shows a justified violation; treat NNG-01 findings as flags to verify.

## 6. Figures worth keeping

NN/g images are copyrighted; do not copy to `examples/`. Worth redrawing from our own renders: the F, layer-cake and lawn-mower scan paths overlaid on a wireframe; the three-tier hierarchy example; the blur-radius squint test series (5, 10, 20 px).

## 7. Open questions

- `ecommerce-product-pages` was skimmed only through the must-have list and its section titles; the comparison and reviews sections were not read in full.
- `information-scent` was fetched last and read only through the label and context sections.
- NN/g robots.txt asks generic agents for a 60 s delay; we honoured it (62 s). Each fetch was a single GET of the public article page.
- The 27-character search box guideline (25 in the older text) is from 2000s guidance; test on current sites before enforcing as a hard rule.
- The deceptive-pattern study figures (10% of 11,000; 95% of 240) are as reported by NN/g and were not independently verified.
- No page returned an error or was blocked.
