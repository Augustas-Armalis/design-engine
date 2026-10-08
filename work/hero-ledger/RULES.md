# Rule slate: hero-ledger

Brief: Tally: B2B spend management for mid-size finance teams; cards, approvals, self-reconciling month-end close; one action book a demo; proof is a real reconciliation UI resolving, sample data  
Page type: hero. Generated 2026-10-08 from 3586 indexed rules.

Trim this to the 20-50 rules that apply. Rules are defaults: break one only with `override: <id> because <reason>` in DIRECTION.md.


## core

- **systems-research.tailwind-catalyst#4** [T1] Show the focus indicator only for keyboard focus: a 2px outline at 2px offset in one accent (Catalyst blue-500) on every interactive control. (One consistent ring is learnable; hiding it for pointer clicks removes the main reason teams delete focus styles.)
- **AH-MO-25** [T1] Do not swap a spinner for a bar (or the reverse) mid-task; the swap changes size and shape. (layout and attention disruption.)
- **WCSS-39** [T1] Show focus with an `outline` (colour with contrast, `outline-offset` for breathing room); never `outline: none` without a replacement; use `:focus-visible` to avoid mouse-click rings. The course teaches `:focus` first and `:focus-visible` in the pseudo-classes (`box-shadow` replacements vanish in forced-colors; positive `tabindex` breaks the source-order tab sequence.)
- **systems-research.magic-ui#5** [T1] Run marquees slowly (>= 30s per loop), pause on hover/focus, and only for real logos or real quotes. (Fast marquees are unreadable; fake logos break the never-invent-proof rule.)
- **LDP-16** [T2] [team research] For SaaS and AI sites show a believable workflow, state transition, input/output pair, data trace or result with accurate copy, realistic data and visible interaction consequences. A screenshot floating in a glass panel is not proof. Do not inv (Proof is what reduces the visitor's objection; decoration does not.)
- **web-sources.a11y-project-checklist#54** [T1] Icon buttons and links (hamburger menus, social icons, gallery controls) are large enough to activate with ease for a range of hand and stylus sizes. (WCAG 2.5.5 Target Size per the checklist (the 2.2 AA criterion is 2.5.8, 24 px minimum).)
- **systems-research.magic-ui#1** [T1] Use at most one ambient or edge-light effect per page, and none from the cliché column without an override in DIRECTION.md. (Beams, shimmer, aurora text and grid backgrounds now signal "AI template" and spend attention on decoration instead of proof.)
- **web.courses-and-curricula#62** [T2] One `h1` per page, no skipped heading levels, unique `<title>` and `lang` on `<html>`, landmarks (`nav`, `main`), `alt` on every image (empty for decorative). (Navigation by structure for AT and SEO.)
- **ui-pedia.20-cards#3** [T2] Make cards self-contained and reorderable. A card must make sense when moved, filtered or resized. (Modular design is built from independent pieces that can be rearranged or altered.)
- **systems-research.uswds#3** [T1] Make the mid grade (50) pass AA against both pure white and pure black. (One "base" colour works for text or icon on either extreme, simplifying dark sections.)
- **ui-pedia.12-typography#29** [T2] Use contrast of size and weight plus enough spacing for hierarchy: a big, bold, short title states the service quickly, followed by small body text that explains in detail (example: "All in one solution to your Finance problems" large and bold, small body para (Catches the eye quickly, then explains; the two work together as a clear layout.)
- **AH-TY-01** [T1] Body text defaults to 17 px on touch-first app UI (iOS default) and 13 px on dense desktop/Mac-style UI; never ship body or label text below the platform minimum: 11 px (touch) / 10 px (desktop), and treat 12 px as the practical floor for anything other than c (Apple's default/minimum pair is the legibility floor Apple tests against; footnote/caption styles bottom out at 12 and 11.)
- **PT-SZ-08** [T2] Keep average line length at 45-90 characters including spaces (or 2-3 lowercase alphabets, i.e. about 52-78 characters) at every viewport width; measure it in characters per line, not in inches, ems or pixels. (Longer lines make the eye's return to the next line harder; characters per line works at any size, while physical width does not.)
- **web-sources.a11y-project-checklist#27** [T1] Skip links work in Webkit: if the target is not natively focusable, add `tabindex="-1"` to it (older Webkit builds failed to move focus). (Focus must actually land at the target.)
- **PT-SZ-11** [T2] Do not trust the CSS `ch` unit as a proxy for "characters per line": it is the advance width of the digit zero, which is wider than the average letter in running text, so a `65ch` box fits more than 65 average characters. (The author warns that `ch` is not a useful stand-in for average characters per line.)
- **web.color-and-surfaces#15** [T2] Gate text on WCAG 2.2 AND APCA: body/secondary text >= 4.5:1 (7:1 for ink-2 targets) **and** |Lc| >= 60 (75 for the primary reading colour). Large text (>= 18pt = 24px, or >= 14pt bold = ~18.7px) may use 3:1 under WCAG. (WCAG's formula treats light-on-dark mid-greys too generously; APCA models polarity (Lc 32 for the 4.5:1 grey on `#0f0f0f`) [computed]. Mynde)

## founder

- **LHS-20** [L] [founder] Take and Mise were "materially better received than Baton and Linecheck". The lesson is not their layout but that brand field, material, interface vocabulary, image, type and action reinforce one premise. Future work must exceed them rather than rest (Ledger positive evidence; relative rating, not an unqualified accept.)
- **LHS-04** [L] [founder] No floating pill navigation and no rounded CTA capsules by default. (Rejected defaults; nav becomes a product demo instead of information architecture.)
- **LHS-19** [L] [founder] Reject Baton-class output: sterile monochrome product proof with the publisher identity imposed on the fictional subject. Reject Linecheck-class output: industrial photograph + giant headline + right-side inspection panel + familiar blue CTA, because (Founder rejected both; both folders are kept as negative evidence and must not be placed in a positive reference set.)
- **LHS-08** [L] [founder] A nice generated image with one UI panel placed over it, treated as the complete concept, is rejected. Integrate the product UI into the composition; generated imagery is a material, not the concept. (Rejected default; Linecheck's industrial photograph + right-side inspection panel "still formed a familiar template".)
- **LHS-10** [L] [founder] Product panels must read as a workflow, not a decorative dashboard. (Rejected default.)
- **LHS-06** [L] [founder] Do not use the automatic left-copy / right-dashboard layout. (Rejected default skeleton; also listed again in the 2026-09-01 divergence note.)
- **LHS-09** [L] [founder] Do not add random cards, steps, side labels, charts or visual fragments only to make the frame feel busy. (Rejected default.)
- **LHS-05** [L] [founder] No weak or generic CTA styling: a plain bright rectangle plus arrow with no relationship to the product identity is rejected. Give the CTA a subject-specific detail (shape, icon behaviour, motion, material or placement). (Rejected default; the Linecheck blue CTA with arrow was named in the rejection assessment.)
- **LHS-15** [L] [founder] Accepted direction Borne: calm full-bleed photography, restrained navigation, refined serif typography, quiet booking control, coherent premium atmosphere. Accepted direction Nacre: sculptural central product, spacious composition, restrained palette (Founder feedback "accepted as good" on the R1 collection (2026-08-30); positive evidence, not templates.)
- **LHS-16** [L] [founder] Avoid the Phase, Ridge 47 and Vanta failure modes: loud poster palette, oversized record graphic and novelty typography ("too experimental for the desired quality"); side rail + giant numeric device + route overlay + ticket graphic ("forced design ge (Founder rejected these in R1.)

## color

- **AH-CO-19** [T1] Do not offer an app-specific light/dark setting that overrides the system; follow `prefers-color-scheme` and handle automatic mid-session switches. (extra setting means people must change two things and may think the app is broken.)
- **AH-CO-28** [T1] Use glass (blurred translucent material) only for the controls and navigation layer floating over content (tab bars, toolbars, sidebars, sheets, popovers), not for content cards. (glass in the content layer confuses the control/content hierarchy.)
- **AH-CO-02** [T1] Define every colour token in three variants: light, dark, and increased-contrast (`@media (prefers-contrast: more)`), even if you only ship one theme. (Apple wants all three so adaptive materials and accessibility settings do not break the palette.)
- **web.color-and-surfaces#12** [T2] Dark mode accent: raise L (0.70-0.82), lower C by ~0-25% versus light, and flip the on-fill colour to dark ink if the fill is now light. (saturated mid-tone accents vibrate on dark surfaces; M3 moves primary from tone 40 to tone 80 for the same reason [verified].)
- **systems-research.stripe#6** [T1] Pick one ink, one body grey, one accent and one button grammar per site and assert it across every template; Stripe's inconsistency (#061b31 vs #0a2540 ink, #533afd vs #635bff purple, 4px vs pill buttons) is a defect to avoid. (Template drift is visible to the eye and costs trust, especially in finance.)

## copy

- **LW-15** [T2] For an early-stage developer product use the skeleton hero, trust block, feature block, social-proof block, optional supporting blocks (comparison, pricing, FAQ, changelog preview), final CTA. Lead with clean type, layout and breathing room; defer flashy inter (Early teams need to validate quickly; across the sample the winning rules were no salesy copy and clever, simple execution.)

## cta

- **web.landing-page-anatomy#7** [T2] One primary action per page, repeated, not varied. Same label and destination at hero, mid-page and final CTA. Secondary action (watch demo, view pricing) is visually weaker (ghost/outline/link). (Choice overload; Shapiro structure repeats the same CTA after features; HubSpot MOFU result shows removing competing exits helps most where )
- **ui-pedia.13-buttons#45** [T2] CTA button: urges the user to take a certain action; can technically be any button type that carries call-to-action text; must stand out from all other buttons. See hierarchy rules above for size and exclusivity. Example (p.308 figure): header "Login" as small (Turns passive into active user.)
- **LAI-73** [T2] [team research] Use a button for an action on the current page or application state and a link for navigation to another destination; a link may be styled as the primary call to action but its semantics must match its behaviour. (Semantics.)
- **dos-and-donts.dos-and-donts#49** [T2] [T28] Fill the CTA with the primary colour (white label) so it stands out: pricing card "Get Pro" filled primary, not a pale grey button with coloured text. (A dull CTA gets less attention and is harder to find.)
- **dos-and-donts.dos-and-donts#84** [T2] [T85] Limit links in a card: one link or a limited set of actions. Good: plain body text, a filled "Primary Action" and an underlined "Secondary Action"; bad: also two inline blue underlined links in the paragraph. (Too many inline links look awful and give a negative impression.)

## hero

- **LHS-11** [L] [founder] Thin neutral monochrome UI that disappears at social-feed scale is rejected. (Baton's thin neutral UI lost hierarchy at feed size.)
- **ui-pedia.20-cards#21** [T2] Vary card size to direct attention. Arrange equal cards for content focus, or make some larger than others to highlight them. (Card size is a customisation tool. In the figure the large product tile on the right, and the large first tile on the left, dominate the sma)
- **LHS-07** [L] [founder] Do not use the automatic big-copy-above / photo-below layout (giant headline over a wide image or product crop). (Rejected default skeleton.)
- **ui-pedia.20-cards#18** [T2] Use high-resolution images in cards, so that they do not pixelate when a card resizes. (Cards respond to screen size, and low-resolution images blur or pixelate when scaled.)
- **LHS-01** [L] [founder] Do not set the headline as an oversized generic grotesk that dominates most of the frame. (Rejected default in the 2026-08-29/30 hero exercises; scale became the idea and crowded the product.)

## mobile

- **ui-pedia.20-cards#25** [T2] Use different card forms per device: square or portrait cards on mobile, rectangular (landscape) cards on web. Use fewer columns on mobile. (Mobile screens are narrow, so fewer columns. In the figure the mobile card is a narrow vertical card (image on top, text and buttons below);)

## motion

- **SYS-CARBON-15** [T1] Match motion to mode: productive easing (`0.2,0,0.38,0.9`) for tasks, expressive (`0.4,0.14,0.3,1`) for rare significant moments; use entrance easing for appearing, exit easing for removed, standard easing when the element stays visible or leaves but stays nea (Distance and significance should drive duration; an element that stays on screen should not use exit curves.)
- **web.motion-and-animation#23** [T2] Destructive/irreversible commits wait for release (pointer up); lightweight reversible ones may fire mid-gesture. (Change-of-mind costs.)
- **web-sources.craft-emil-kowalski#5** [T2] Scale duration with the distance and size of the moving object: larger elements slower, longer travel longer. Exit animations can be about 20% faster than the entrance. (Perceived velocity should stay constant; a short duration on a full-screen panel feels jarring.)
- **AH-MO-03** [T1] Make feedback motion physically consistent with the gesture and the entrance: it exits the way it came in, and a drag moves content with the finger. (inconsistent paths disorient.)
- **web-sources.craft-emil-kowalski#6** [T2] Bounce is a brand-personality dial: default to zero; add only a small value (demo compared bounce 0.4 vs 0) when the brand is explicitly playful (learning app yes, finance app no). (Bounce reads as playful; zero reads as professional and safe.)

## navigation

- **NNG-23** [T1] Show prices, or representative prices, ranges or typical scenarios, for B2B and B2C offers; prefer a few worked scenarios over a complex calculator; do not make "contact sales" the only way to learn cost. (Price is the top information need: it fixes product category, enables comparison and budget planning, and hiding it reads as evasive.)
- **NNG-14** [T1] Avoid false floors: make sure something visibly continues below the viewport (cut-off text, next card peeking, a cropped image); a lone arrow is a weak substitute for real content continuity. (A fully self-contained first screen looks finished, so people do not scroll.)
- **AR-07** [T2] There is no native toast. Map messages to ARIA live roles: `status` (polite, atomic) for FYI, `log` for ordered additions, `alert` (assertive, interrupts) for urgent, time-sensitive messages. The region must exist at page render. None of these roles supports r (Live regions announce raw text; interrupting alerts strand the user mid-sentence.)

## product

- **LDP-02** [T2] [team research] Choose layout from the strongest evidence: interface proves value -> product dominates; transformation is emotional/physical -> art direction or photography; idea is unfamiliar -> explanatory diagram/sequence; trust is the barrier -> proof besi (The arrangement is right only when the content creates that hierarchy, not because a starter template used it.)

## spacing

- **MCB-14** [T2] Group by proximity and rhythm: close spacing links related items (image and caption), larger spacing separates unrelated items, similar elements share identical spacing and size, leading elements (thumbnails, avatars, icons) align, and key actions and titles a (Spacing is the first grouping tool; consistent focal points make a product recognisable.)
- **ui-pedia.06-whitespace#11** [T2] When choosing font, size, colour, style, leading, kerning and tracking, account for the whitespace they create. (Micro whitespace is critical to legibility; changing the whitespace arrangement significantly changes reading performance and user experienc)
- **ui-pedia.07-proximity#2** [T2] Use different amounts of whitespace to express group membership, including within one row. Example: put the Search field on the same line as the primary navigation but with extra whitespace to its left, so it reads as a different function even though it shares (Spacing alone can differentiate functions when type styling is identical.)

## typography

- **ui-pedia.12-typography#13** [T2] Start line-height at 1.5 x font size (for body copy at the base size) and derive the rest from it. (It is a workable default and gives a base for a baseline grid.)
- **AH-TY-10** [T1] Use loose leading for wide columns and long passages; use tight leading only where height is constrained (list rows), and never tight leading on three or more lines. (loose leading keeps the eye on the right line in long measures; tight three-line blocks read as a grey slab.)
- **AH-TY-05** [T1] Define named text roles (Large Title, Title 1-3, Headline, Body, Callout, Subhead, Footnote, Caption 1-2) as tokens that each carry size, weight and line-height together, and use roles instead of ad-hoc sizes. (one token per role keeps the scale consistent and lets the whole scale shift as a unit.)
- **ui-pedia.12-typography#17** [T2] Establish a size for all fonts/typefaces from the start in a type scale and share it with the team for every platform (Android, iOS, Web), stating which platform/context each scale applies to. (Scalable type across screen sizes requires one agreed scale.)
- **ui-pedia.12-typography#18** [T2] Worked scale shown: H1 Heavy, H2 Bold, H3 Bold, Subtitle Regular, Body 1 Regular, Button Medium (sizes decrease down the list; no px values given). Replicate that structure: weight steps down from Heavy to Regular as size steps down, with Medium reserved for b (Weight plus size together make the levels distinct.)
