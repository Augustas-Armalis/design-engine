# Rule slate: hero-polar

Brief: Delta: product analytics that explains why a metric moved, with the responsible segment, for SaaS PMs and growth teams; one action: start free; proof is a real chart with an AI explanation tied to a point  
Page type: hero. Generated 2026-10-08 from 3586 indexed rules.

Trim this to the 20-50 rules that apply. Rules are defaults: break one only with `override: <id> because <reason>` in DIRECTION.md.


## core

- **WCSS-39** [T1] Show focus with an `outline` (colour with contrast, `outline-offset` for breathing room); never `outline: none` without a replacement; use `:focus-visible` to avoid mouse-click rings. The course teaches `:focus` first and `:focus-visible` in the pseudo-classes (`box-shadow` replacements vanish in forced-colors; positive `tabindex` breaks the source-order tab sequence.)
- **WDA-14** [T1] Provide a skip link as the first focusable element, with text that says where it goes ("Skip to main content"), visible (or revealed) on focus, targeting the `main` id. (Repeated header navigation is expensive to tab through.)
- **AH-MO-29** [T1] Pull-to-refresh is an addition to, not a replacement for, automatic refresh; add a title only if it informs (e.g. last updated). (people should not be responsible for every update.)
- **LDP-16** [T2] [team research] For SaaS and AI sites show a believable workflow, state transition, input/output pair, data trace or result with accurate copy, realistic data and visible interaction consequences. A screenshot floating in a glass panel is not proof. Do not inv (Proof is what reduces the visitor's objection; decoration does not.)
- **AH-MO-28** [T1] Put a spinner inside a button to show a delayed action, and change the label to the in-progress form ("Checkout" becomes "Checking out..."). (saves space and explains the delay.)
- **systems-research.magic-ui#5** [T1] Run marquees slowly (>= 30s per loop), pause on hover/focus, and only for real logos or real quotes. (Fast marquees are unreadable; fake logos break the never-invent-proof rule.)
- **WDA-01** [T1] Use the native element whenever one exists (button, a, input+label, ul/ol, table, details, dialog, nav, main, headings). Add ARIA only for behaviour HTML cannot express (tabs, tree, live announcements, menus that really are application menus). (ARIA adds no behaviour; every role you assign makes you responsible for keyboard handling, focus and state. Correlation data: pages with ARI)
- **ui-pedia.12-typography#29** [T2] Use contrast of size and weight plus enough spacing for hierarchy: a big, bold, short title states the service quickly, followed by small body text that explains in detail (example: "All in one solution to your Finance problems" large and bold, small body para (Catches the eye quickly, then explains; the two work together as a clear layout.)
- **web-sources.a11y-project-checklist#54** [T1] Icon buttons and links (hamburger menus, social icons, gallery controls) are large enough to activate with ease for a range of hand and stylus sizes. (WCAG 2.5.5 Target Size per the checklist (the 2.2 AA criterion is 2.5.8, 24 px minimum).)
- **ui-pedia.20-cards#3** [T2] Make cards self-contained and reorderable. A card must make sense when moved, filtered or resized. (Modular design is built from independent pieces that can be rearranged or altered.)
- **web.courses-and-curricula#62** [T2] One `h1` per page, no skipped heading levels, unique `<title>` and `lang` on `<html>`, landmarks (`nav`, `main`), `alt` on every image (empty for decorative). (Navigation by structure for AT and SEO.)
- **web-sources.a11y-project-checklist#30** [T1] Associate every input with a `label` using a `for`/`id` pair (highest support). (Name and larger click target (the checklist maps this to 3.2.2; 1.3.1 and 4.1.2 are the usual criteria [unverified mapping]).)
- **PT-SZ-08** [T2] Keep average line length at 45-90 characters including spaces (or 2-3 lowercase alphabets, i.e. about 52-78 characters) at every viewport width; measure it in characters per line, not in inches, ems or pixels. (Longer lines make the eye's return to the next line harder; characters per line works at any size, while physical width does not.)
- **PT-SZ-11** [T2] Do not trust the CSS `ch` unit as a proxy for "characters per line": it is the advance width of the digit zero, which is wider than the average letter in running text, so a `65ch` box fits more than 65 average characters. (The author warns that `ch` is not a useful stand-in for average characters per line.)
- **AH-TY-01** [T1] Body text defaults to 17 px on touch-first app UI (iOS default) and 13 px on dense desktop/Mac-style UI; never ship body or label text below the platform minimum: 11 px (touch) / 10 px (desktop), and treat 12 px as the practical floor for anything other than c (Apple's default/minimum pair is the legibility floor Apple tests against; footnote/caption styles bottom out at 12 and 11.)
- **SYS-PRIMER-14** [T1] Provide `inactive` as a distinct state from `disabled`: inactive looks muted for every variant but stays focusable, keeps compliant contrast, and must open a dialog or tooltip that explains why. (Disabled controls are unreachable and silent; a blocked-but-explainable action needs an accessible alternative.)

## founder

- **LHS-20** [L] [founder] Take and Mise were "materially better received than Baton and Linecheck". The lesson is not their layout but that brand field, material, interface vocabulary, image, type and action reinforce one premise. Future work must exceed them rather than rest (Ledger positive evidence; relative rating, not an unqualified accept.)
- **LHS-13** [L] [founder] When the brief is one desktop X screenshot, do not do mobile work, extra sections or elaborate interaction QA. (Rejected as scope creep; Baton spent effort on mobile and extra QA although the deliverable was one still.)
- **LHS-05** [L] [founder] No weak or generic CTA styling: a plain bright rectangle plus arrow with no relationship to the product identity is rejected. Give the CTA a subject-specific detail (shape, icon behaviour, motion, material or placement). (Rejected default; the Linecheck blue CTA with arrow was named in the rejection assessment.)
- **LHS-02** [L] [founder] Do not use lowercase-everything branding in a fictional product's navigation and CTAs. Use normal capitalisation, readable size. (Rejected default; lowercase-everything is Larpo's own publisher voice, not a subject voice (see LBC-06).)
- **LHS-18** [L] [founder] Prefer a beautiful still to implementation complexity; hero concept exercises may be static. Prioritise screenshot composition, fonts, buttons, imagery and overall atmosphere. Do not add interaction merely to prove the page works. (Stated founder preference (2026-08-30).)
- **LHS-08** [L] [founder] A nice generated image with one UI panel placed over it, treated as the complete concept, is rejected. Integrate the product UI into the composition; generated imagery is a material, not the concept. (Rejected default; Linecheck's industrial photograph + right-side inspection panel "still formed a familiar template".)
- **LHS-17** [L] [founder] Explore a wider range of polished default-modern website styles alongside image-first concepts: restrained product sites, monochrome social-platform clarity, Linear-like product hierarchy, refined editorial SaaS, subtle dark software surfaces. (Updated preference after R1 (2026-08-30): the founder rejected experimental extremes and asked for polished, modern defaults too.)
- **LHS-10** [L] [founder] Product panels must read as a workflow, not a decorative dashboard. (Rejected default.)
- **LHS-14** [L] [founder] Before building, compare the proposed skeleton with the rejected-defaults list (LHS-01..LHS-13). If it matches one, change the structure before changing colours. After rendering ask: "does this look like a designer built a product-specific campaign f (The ledger is "a guardrail against relearning the wrong preferences".)
- **LHS-12** [L] [founder] No generic dark-neon, glow, orb, grid, grain or shader styling that has no product meaning. (Rejected default.)

## color

- **systems-research.antd#3** [T1] Define neutral text and fills as one base colour at fixed alphas (text 88 / 65 / 45 / 25 %, fill 15 / 6 / 4 / 2 %) and derive borders from the container colour by a fixed lightness delta. (The same four steps work on any surface and in dark mode with the base flipped.)
- **AH-CO-39** [T1] Do not tint page-indicator dots or badges with custom colours; keep the badge as a red oval with white text for critical counts only. (custom colours reduce the contrast that identifies the current page or an unread count.)
- **AH-CO-01** [T1] Each colour has one meaning across the product (one colour for "interactive", one for each status). Do not give static text the link/accent colour. (inconsistent colour meaning makes people guess what is clickable.)
- **AH-CO-40** [T1] A switch/toggle's on colour (default green) must contrast with its off state; change it to the accent only if the new colour stays perceptible. (state must be visible without reading.)
- **AH-CO-02** [T1] Define every colour token in three variants: light, dark, and increased-contrast (`@media (prefers-contrast: more)`), even if you only ship one theme. (Apple wants all three so adaptive materials and accessibility settings do not break the palette.)

## cta

- **LAI-08** [T2] [team research] Do not build a "designed-to-look-designed" CTA (wide rounded rectangle with inner arrow chip, liquid fill, magnetic hover, rotating arrow). Keep inner structure only if it communicates a real state or split action, motion explains direction/pro (Too many parts for a simple action; it performs "premium" instead of building confidence.)
- **ui-pedia.13-buttons#46** [T2] Ghost (outlined) button: increases the attention and complexity of a text button; denotes crucial actions that are not the page's main action; outline only, no surrounding text indicating an action. Figure: filled "Allow" next to outlined "Don't Allow", with a (Secondary prominence.)
- **LAI-78** [T2] [team research] Every primary action needs default; hover where applicable; visible keyboard focus; active/pressed; disabled only when necessary and explained; loading/pending if not immediate; success/error if state changes. Animation must not move the click  (State and proximity.)
- **ui-pedia.13-buttons#45** [T2] CTA button: urges the user to take a certain action; can technically be any button type that carries call-to-action text; must stand out from all other buttons. See hierarchy rules above for size and exclusivity. Example (p.308 figure): header "Login" as small (Turns passive into active user.)
- **LAI-73** [T2] [team research] Use a button for an action on the current page or application state and a link for navigation to another destination; a link may be styled as the primary call to action but its semantics must match its behaviour. (Semantics.)

## hero

- **LHS-01** [L] [founder] Do not set the headline as an oversized generic grotesk that dominates most of the frame. (Rejected default in the 2026-08-29/30 hero exercises; scale became the idea and crowded the product.)
- **LHS-11** [L] [founder] Thin neutral monochrome UI that disappears at social-feed scale is rejected. (Baton's thin neutral UI lost hierarchy at feed size.)
- **LHS-07** [L] [founder] Do not use the automatic big-copy-above / photo-below layout (giant headline over a wide image or product crop). (Rejected default skeleton.)
- **LHS-19** [L] [founder] Reject Baton-class output: sterile monochrome product proof with the publisher identity imposed on the fictional subject. Reject Linecheck-class output: industrial photograph + giant headline + right-side inspection panel + familiar blue CTA, because (Founder rejected both; both folders are kept as negative evidence and must not be placed in a positive reference set.)
- **LHS-58** [T2] [team research] Classify hero motion before building: essential (explains the product or interaction continuity), supportive (guides reading), ambient (atmosphere only). Implement in that order; ambient must pause offscreen, degrade cleanly and vanish under re (Motion budget.)

## motion

- **AH-MO-03** [T1] Make feedback motion physically consistent with the gesture and the entrance: it exits the way it came in, and a drag moves content with the finger. (inconsistent paths disorient.)
- **web-sources.craft-emil-kowalski#42** [T2] Ship documentation that lets people touch the component: interactive examples with copy-ready code, built before launch. (Lowers the barrier; part of why Sonner won.)
- **SYS-CARBON-15** [T1] Match motion to mode: productive easing (`0.2,0,0.38,0.9`) for tasks, expressive (`0.4,0.14,0.3,1`) for rare significant moments; use entrance easing for appearing, exit easing for removed, standard easing when the element stays visible or leaves but stays nea (Distance and significance should drive duration; an element that stays on screen should not use exit curves.)
- **web-sources.craft-emil-kowalski#38** [T2] Turn each taste decision into a written rule with the reason, numbers, and a decision table or flowchart; keep it strict so an agent does not invent its own rules. Package per aspect (animation, typography, layout, icons, colour) as skill files. ("That's the why. There's no magic." Strict rules transfer taste to agents.)
- **web-sources.craft-emil-kowalski#40** [T2] Train judgement with paired comparisons: view A and B, pick, write the reason in words, then compare to a reference breakdown. Cover size, easing, entry, intent, frequency, scale, removal, interruption, popover origin, stagger, layering. (Writing why builds the skill of articulating judgement; AI-generated motion "works but feels mediocre".)

## navigation

- **GOV-68** [T1] Include a skip link immediately after the opening `<body>` (or after the cookie banner); it is visually hidden until keyboard focus and must not be wrapped in `nav` or moved into the header. Include a back link before `<main>`, use "Back" by default or "Go bac (Order of bypass; one wayfinding aid at a time.)
- **GOV-67** [T1] Banner copy names the service, stays short and accurate, and is the same whether or not JavaScript is enabled; with progressive enhancement, ship all possible messages hidden with the `hidden` attribute and focus the confirmation (`tabindex="-1"`, `role="alert (Transparency and no re-consent loops.)
- **LHS-04** [L] [founder] No floating pill navigation and no rounded CTA capsules by default. (Rejected defaults; nav becomes a product demo instead of information architecture.)

## product

- **LDP-02** [T2] [team research] Choose layout from the strongest evidence: interface proves value -> product dominates; transformation is emotional/physical -> art direction or photography; idea is unfamiliar -> explanatory diagram/sequence; trust is the barrier -> proof besi (The arrangement is right only when the content creates that hierarchy, not because a starter template used it.)

## spacing

- **ui-pedia.07-proximity#3** [T2] If the separating gap cannot be preserved at a smaller viewport, move the item out of the group instead of letting it merge. TfL-style example: on smaller screens the Search was moved up and away from the main nav; on tablet it was shifted up and grouped with  (Cramped space would make Search look like part of the main navigation.)
- **ui-pedia.07-proximity#8** [T2] Keep a top-aligned label very close to its own field and put a bigger gap before the next label-field pair. (Minimal spacing label-to-field makes that relationship obvious; the bigger gap after separates pairs.)
- **ui-pedia.07-proximity#2** [T2] Use different amounts of whitespace to express group membership, including within one row. Example: put the Search field on the same line as the primary navigation but with extra whitespace to its left, so it reads as a different function even though it shares (Spacing alone can differentiate functions when type styling is identical.)
- **MCB-14** [T2] Group by proximity and rhythm: close spacing links related items (image and caption), larger spacing separates unrelated items, similar elements share identical spacing and size, leading elements (thumbnails, avatars, icons) align, and key actions and titles a (Spacing is the first grouping tool; consistent focal points make a product recognisable.)
- **ui-pedia.07-proximity#10** [T2] Group controls that belong together (Previous and Next are connected: grouping them would improve usability). (The book's suggested fix for the EDD page.)

## typography

- **AH-TY-05** [T1] Define named text roles (Large Title, Title 1-3, Headline, Body, Callout, Subhead, Footnote, Caption 1-2) as tokens that each carry size, weight and line-height together, and use roles instead of ad-hoc sizes. (one token per role keeps the scale consistent and lets the whole scale shift as a unit.)
- **ui-pedia.12-typography#17** [T2] Establish a size for all fonts/typefaces from the start in a type scale and share it with the team for every platform (Android, iOS, Web), stating which platform/context each scale applies to. (Scalable type across screen sizes requires one agreed scale.)
- **AH-TY-10** [T1] Use loose leading for wide columns and long passages; use tight leading only where height is constrained (list rows), and never tight leading on three or more lines. (loose leading keeps the eye on the right line in long measures; tight three-line blocks read as a grey slab.)
- **ui-pedia.12-typography#13** [T2] Start line-height at 1.5 x font size (for body copy at the base size) and derive the rest from it. (It is a workable default and gives a base for a baseline grid.)
- **ui-pedia.12-typography#25** [T2] Take x-height into account when setting leading: a lower x-height relative to cap height leaves more white space between lines; a larger x-height relative to cap height makes the leading look more balanced and orderly. (Perceived line gap depends on x-height, not only line-height number.)
