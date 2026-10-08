# Rule slate: hero-halftone

Brief: Reshoot: AI turns rough phone product photos into studio ad creatives in every format, for ecommerce marketers and DTC teams; one action: try free with your own photo  
Page type: hero. Generated 2026-10-08 from 3586 indexed rules.

Trim this to the 20-50 rules that apply. Rules are defaults: break one only with `override: <id> because <reason>` in DIRECTION.md.


## core

- **WCSS-39** [T1] Show focus with an `outline` (colour with contrast, `outline-offset` for breathing room); never `outline: none` without a replacement; use `:focus-visible` to avoid mouse-click rings. The course teaches `:focus` first and `:focus-visible` in the pseudo-classes (`box-shadow` replacements vanish in forced-colors; positive `tabindex` breaks the source-order tab sequence.)
- **LDP-16** [T2] [team research] For SaaS and AI sites show a believable workflow, state transition, input/output pair, data trace or result with accurate copy, realistic data and visible interaction consequences. A screenshot floating in a glass panel is not proof. Do not inv (Proof is what reduces the visitor's objection; decoration does not.)
- **systems-research.magic-ui#5** [T1] Run marquees slowly (>= 30s per loop), pause on hover/focus, and only for real logos or real quotes. (Fast marquees are unreadable; fake logos break the never-invent-proof rule.)
- **VWI-04** [T2] Never write `outline: none` (or `outline: 0`) unless a visible replacement focus style is present on the same selector. (It silently removes the only focus cue.)
- **SYS-POLARIS-09** [T1] Use shadows and bevels only on important interactive objects, in one consistent style, with few layers per screen; darken on press, brighten when raised or active; do not use layering as the first emphasis tool and do not invent unique inset styles for footers (Overused depth turns the page into clutter; consistent lighting is what makes depth read as physical.)
- **LBC-09** [T2] [team research] Never describe larpo as a product design studio. (HARD self-description constraint.)
- **web.courses-and-curricula#24** [T2] Spacing comes from a single tokenised ladder; choose spacing by layout and component, not ad hoc pixels. (Consistency is what makes a UI feel systematic (Refactoring UI, web.dev Spacing, GOV.UK).)
- **web.courses-and-curricula#62** [T2] One `h1` per page, no skipped heading levels, unique `<title>` and `lang` on `<html>`, landmarks (`nav`, `main`), `alt` on every image (empty for decorative). (Navigation by structure for AT and SEO.)
- **web.color-and-surfaces#13** [T2] Re-verify *every* pair in dark mode; do not assume the light verification carries over. (the same WCAG ratio is a weaker APCA contrast on dark (section 3 divergence table).)
- **web-sources.a11y-project-checklist#27** [T1] Skip links work in Webkit: if the target is not natively focusable, add `tabindex="-1"` to it (older Webkit builds failed to move focus). (Focus must actually land at the target.)
- **AH-AX-36** [T1] Flip controls that show progress or order (sliders, progress bars, back/next, ordered thumbnails, forward/back icons); do not flip controls that mean an absolute direction ("right"), logos, universal marks (checkmark), real-world object icons (clock), or photo (meaning depends on direction.)
- **web-sources.a11y-project-checklist#54** [T1] Icon buttons and links (hamburger menus, social icons, gallery controls) are large enough to activate with ease for a range of hand and stylus sizes. (WCAG 2.5.5 Target Size per the checklist (the 2.2 AA criterion is 2.5.8, 24 px minimum).)
- **PT-SZ-08** [T2] Keep average line length at 45-90 characters including spaces (or 2-3 lowercase alphabets, i.e. about 52-78 characters) at every viewport width; measure it in characters per line, not in inches, ems or pixels. (Longer lines make the eye's return to the next line harder; characters per line works at any size, while physical width does not.)
- **AH-TY-01** [T1] Body text defaults to 17 px on touch-first app UI (iOS default) and 13 px on dense desktop/Mac-style UI; never ship body or label text below the platform minimum: 11 px (touch) / 10 px (desktop), and treat 12 px as the practical floor for anything other than c (Apple's default/minimum pair is the legibility floor Apple tests against; footnote/caption styles bottom out at 12 and 11.)
- **AH-TY-05** [T1] Define named text roles (Large Title, Title 1-3, Headline, Body, Callout, Subhead, Footnote, Caption 1-2) as tokens that each carry size, weight and line-height together, and use roles instead of ad-hoc sizes. (one token per role keeps the scale consistent and lets the whole scale shift as a unit.)
- **PT-SZ-11** [T2] Do not trust the CSS `ch` unit as a proxy for "characters per line": it is the advance width of the digit zero, which is wider than the average letter in running text, so a `65ch` box fits more than 65 average characters. (The author warns that `ch` is not a useful stand-in for average characters per line.)

## founder

- **LHS-20** [L] [founder] Take and Mise were "materially better received than Baton and Linecheck". The lesson is not their layout but that brand field, material, interface vocabulary, image, type and action reinforce one premise. Future work must exceed them rather than rest (Ledger positive evidence; relative rating, not an unqualified accept.)
- **LHS-06** [L] [founder] Do not use the automatic left-copy / right-dashboard layout. (Rejected default skeleton; also listed again in the 2026-09-01 divergence note.)
- **LHS-05** [L] [founder] No weak or generic CTA styling: a plain bright rectangle plus arrow with no relationship to the product identity is rejected. Give the CTA a subject-specific detail (shape, icon behaviour, motion, material or placement). (Rejected default; the Linecheck blue CTA with arrow was named in the rejection assessment.)
- **LHS-18** [L] [founder] Prefer a beautiful still to implementation complexity; hero concept exercises may be static. Prioritise screenshot composition, fonts, buttons, imagery and overall atmosphere. Do not add interaction merely to prove the page works. (Stated founder preference (2026-08-30).)
- **LHS-10** [L] [founder] Product panels must read as a workflow, not a decorative dashboard. (Rejected default.)
- **LHS-15** [L] [founder] Accepted direction Borne: calm full-bleed photography, restrained navigation, refined serif typography, quiet booking control, coherent premium atmosphere. Accepted direction Nacre: sculptural central product, spacious composition, restrained palette (Founder feedback "accepted as good" on the R1 collection (2026-08-30); positive evidence, not templates.)
- **LHS-12** [L] [founder] No generic dark-neon, glow, orb, grid, grain or shader styling that has no product meaning. (Rejected default.)
- **LHS-16** [L] [founder] Avoid the Phase, Ridge 47 and Vanta failure modes: loud poster palette, oversized record graphic and novelty typography ("too experimental for the desired quality"); side rail + giant numeric device + route overlay + ticket graphic ("forced design ge (Founder rejected these in R1.)
- **LHS-17** [L] [founder] Explore a wider range of polished default-modern website styles alongside image-first concepts: restrained product sites, monochrome social-platform clarity, Linear-like product hierarchy, refined editorial SaaS, subtle dark software surfaces. (Updated preference after R1 (2026-08-30): the founder rejected experimental extremes and asked for polished, modern defaults too.)
- **LHS-09** [L] [founder] Do not add random cards, steps, side labels, charts or visual fragments only to make the frame feel busy. (Rejected default.)

## color

- **AH-CO-02** [T1] Define every colour token in three variants: light, dark, and increased-contrast (`@media (prefers-contrast: more)`), even if you only ship one theme. (Apple wants all three so adaptive materials and accessibility settings do not break the palette.)
- **AH-CO-11** [T1] Use sRGB as the baseline and add wide-gamut Display P3 only where it improves meaning (status indicators, rich photos); provide sRGB fallbacks for near-identical P3 colours and for P3 gradients that clip. (P3 colours that differ slightly can look identical on sRGB, and gradients can band or clip.)
- **AH-CO-03** [T1] Even if the product is single-theme, keep a dark (or light) twin of every colour in the token file. (glass and system surfaces adapt automatically; missing twins cause wrong fallbacks.)
- **AH-CO-01** [T1] Each colour has one meaning across the product (one colour for "interactive", one for each status). Do not give static text the link/accent colour. (inconsistent colour meaning makes people guess what is clickable.)
- **web.color-and-surfaces#37** [T2] Colour-glow shadows (accent-coloured blur around buttons/cards) are only for light emitting objects (a LED, a "live" dot, a lit card in a game UI); never as default hover decoration. (neon glow on black is the default "cool" AI look [verified: Impeccable].)

## copy

- **AH-WR-04** [T1] Order content by importance on each screen and break multiple ideas into multiple screens or sections. (people read the first line.)

## cta

- **ui-pedia.13-buttons#45** [T2] CTA button: urges the user to take a certain action; can technically be any button type that carries call-to-action text; must stand out from all other buttons. See hierarchy rules above for size and exclusivity. Example (p.308 figure): header "Login" as small (Turns passive into active user.)
- **web.landing-page-anatomy#4** [T2] Show the product (real UI, real output) in the first viewport or peeking within it. Abstract gradients, stock photos or 3D blobs do not count. (Software feature imagery should "show the product in action" (Shapiro); proof beats description.)
- **LAI-73** [T2] [team research] Use a button for an action on the current page or application state and a link for navigation to another destination; a link may be styled as the primary call to action but its semantics must match its behaviour. (Semantics.)
- **LAI-44** [T2] [team research] Critique in precise, correctable statements ("The 142px H1 covers the photographic subject and forces the action into the bottom margin"; "The accent is used for five different roles, so it no longer identifies the primary action"). Avoid "make (Specific diagnosis prevents the next revision becoming a different pile of trends.)
- **LAI-39** [T2] [team research] CTA proof: label names the action and likely outcome; commitment understandable; only one primary; button/link semantics match behaviour; geometry belongs to the brand system; hover does not move the target; pressed, focus, loading and result s (Gate 9.)

## hero

- **LHS-01** [L] [founder] Do not set the headline as an oversized generic grotesk that dominates most of the frame. (Rejected default in the 2026-08-29/30 hero exercises; scale became the idea and crowded the product.)
- **LHS-07** [L] [founder] Do not use the automatic big-copy-above / photo-below layout (giant headline over a wide image or product crop). (Rejected default skeleton.)
- **LHS-11** [L] [founder] Thin neutral monochrome UI that disappears at social-feed scale is rejected. (Baton's thin neutral UI lost hierarchy at feed size.)
- **LHS-19** [L] [founder] Reject Baton-class output: sterile monochrome product proof with the publisher identity imposed on the fictional subject. Reject Linecheck-class output: industrial photograph + giant headline + right-side inspection panel + familiar blue CTA, because (Founder rejected both; both folders are kept as negative evidence and must not be placed in a positive reference set.)
- **LHS-02** [L] [founder] Do not use lowercase-everything branding in a fictional product's navigation and CTAs. Use normal capitalisation, readable size. (Rejected default; lowercase-everything is Larpo's own publisher voice, not a subject voice (see LBC-06).)

## mobile

- **web.implementation-craft#45** [T1] Serve AVIF with WebP and JPEG/PNG fallback via `<picture>` (or an image CDN with format negotiation). Photographs: AVIF/WebP; flat graphics/logos/icons: SVG; no PNG for photos. Budget: hero image <= 150 KB mobile / 250 KB desktop [engine note budget]; HTTP Arc

## motion

- **AH-MO-03** [T1] Make feedback motion physically consistent with the gesture and the entrance: it exits the way it came in, and a drag moves content with the finger. (inconsistent paths disorient.)
- **SYS-PRIMER-15** [T1] Ship the system spec as an LLM-readable guide: RFC 2119 keywords (MUST, SHOULD, NEVER), decision trees (easing choice), a golden example, and a hallucination guard that makes an unrecognised token name carry a `/* check-token */` marker. (Agents invent plausible token names; explicit guard text turns silent failure into a greppable one.)
- **web-sources.craft-emil-kowalski#21** [T2] Toast enters from translateY(100%) via a mounted-state flip and a CSS transition (`transform 400ms ease`), not a keyframe; the exit leaves in the same direction as the entrance. (Spatial consistency makes swipe-down-to-dismiss feel natural; transitions survive rapid additions.)

## navigation

- **NNG-16** [T1] Do not style real content like advertising or place it in ad zones (top banner, right rail) or next to ads; avoid small bordered promotional rectangles, text-in-image, animated or coloured promo boxes for important messages. (People learn to skip ad-like content and the skip spreads to neighbouring items (banner blindness).)
- **GOV-68** [T1] Include a skip link immediately after the opening `<body>` (or after the cookie banner); it is visually hidden until keyboard focus and must not be wrapped in `nav` or moved into the header. Include a back link before `<main>`, use "Back" by default or "Go bac (Order of bypass; one wayfinding aid at a time.)
- **GOV-03** [T1] Iterate: release small, test with real users, add what works, delete what does not, and be willing to scrap a failing prototype. (Iteration reduces risk and turns failures into lessons.)
- **LHS-04** [L] [founder] No floating pill navigation and no rounded CTA capsules by default. (Rejected defaults; nav becomes a product demo instead of information architecture.)

## product

- **LDP-02** [T2] [team research] Choose layout from the strongest evidence: interface proves value -> product dominates; transformation is emotional/physical -> art direction or photography; idea is unfamiliar -> explanatory diagram/sequence; trust is the barrier -> proof besi (The arrangement is right only when the content creates that hierarchy, not because a starter template used it.)

## spacing

- **ui-pedia.07-proximity#5** [T2] In text, group sentences into paragraphs divided above and below by whitespace; put a heading closer to the text beneath it than to the preceding section's text. (The spacing around headings tells you which paragraphs they belong to; groupings are discernible even without reading (the grey-bar version )
- **benchmarks.marcel-kargul-profile#2** [T2] Express section vertical padding as 3-4 named tokens (sm/md/lg/page) plus one global gutter token; every section uses a token. (Section rhythm becomes auditable; measured kargul.studio has `--padding-section-sm 2rem / md 3.5rem / lg 3.5rem / page 7.375rem`, `--padding)
- **MCB-14** [T2] Group by proximity and rhythm: close spacing links related items (image and caption), larger spacing separates unrelated items, similar elements share identical spacing and size, leading elements (thumbnails, avatars, icons) align, and key actions and titles a (Spacing is the first grouping tool; consistent focal points make a product recognisable.)
- **benchmarks.marcel-kargul-profile#5** [T2] If the shell is neutral, put colour and personality in the work shown (screenshots, illustration, imagery) and make that work per-client distinctive. (Neutral frame + distinctive content is how a studio looks consistent and not templated. (This does not make a neutral shell a good brand sit)

## typography

- **ui-pedia.12-typography#15** [T2] Decide up front how many type sizes you need and which sizes pair with which weights/styles; cover helper text, form labels, body, subheads and headlines. (An undefined size set leads to ad-hoc sizes and inconsistency.)
- **ui-pedia.12-typography#25** [T2] Take x-height into account when setting leading: a lower x-height relative to cap height leaves more white space between lines; a larger x-height relative to cap height makes the leading look more balanced and orderly. (Perceived line gap depends on x-height, not only line-height number.)
- **ui-pedia.12-typography#20** [T2] Tracking: adjust the spacing of all letters in a run to fit more letters into a short space, to open up letters that are too close, or to make a block of words look evenly bordered/justified. (One global control for density.)
- **AH-TY-10** [T1] Use loose leading for wide columns and long passages; use tight leading only where height is constrained (list rows), and never tight leading on three or more lines. (loose leading keeps the eye on the right line in long measures; tight three-line blocks read as a grey slab.)
- **ui-pedia.12-typography#17** [T2] Establish a size for all fonts/typefaces from the start in a type scale and share it with the team for every platform (Android, iOS, Web), stating which platform/context each scale applies to. (Scalable type across screen sizes requires one agreed scale.)
