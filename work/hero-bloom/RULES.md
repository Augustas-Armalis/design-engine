# Rule slate: hero-bloom

Brief: Evening: consumer AI journaling iPhone app; talk 2 minutes at night, get a short entry and one gentle weekly pattern; for busy adults who dropped journaling; one action download for iPhone; proof is a phone screen with sample entry + pattern  
Page type: hero. Generated 2026-10-08 from 3586 indexed rules.

Trim this to the 20-50 rules that apply. Rules are defaults: break one only with `override: <id> because <reason>` in DIRECTION.md.


## core

- **systems-research.tailwind-catalyst#4** [T1] Show the focus indicator only for keyboard focus: a 2px outline at 2px offset in one accent (Catalyst blue-500) on every interactive control. (One consistent ring is learnable; hiding it for pointer clicks removes the main reason teams delete focus styles.)
- **AH-MO-23** [T1] Report determinate progress accurately and at an even pace; do not jump to 90% in five seconds then stall for five minutes. (uneven progress feels deceptive.)
- **systems-research.magic-ui#5** [T1] Run marquees slowly (>= 30s per loop), pause on hover/focus, and only for real logos or real quotes. (Fast marquees are unreadable; fake logos break the never-invent-proof rule.)
- **LDP-16** [T2] [team research] For SaaS and AI sites show a believable workflow, state transition, input/output pair, data trace or result with accurate copy, realistic data and visible interaction consequences. A screenshot floating in a glass panel is not proof. Do not inv (Proof is what reduces the visitor's objection; decoration does not.)
- **WCSS-39** [T1] Show focus with an `outline` (colour with contrast, `outline-offset` for breathing room); never `outline: none` without a replacement; use `:focus-visible` to avoid mouse-click rings. The course teaches `:focus` first and `:focus-visible` in the pseudo-classes (`box-shadow` replacements vanish in forced-colors; positive `tabindex` breaks the source-order tab sequence.)
- **web.courses-and-curricula#62** [T2] One `h1` per page, no skipped heading levels, unique `<title>` and `lang` on `<html>`, landmarks (`nav`, `main`), `alt` on every image (empty for decorative). (Navigation by structure for AT and SEO.)
- **systems-research.gestalt#8** [T1] Disable all non-essential animation under `prefers-reduced-motion`, give any animation lasting more than 5 seconds a pause control, and never flash more than 3 times per second. (WCAG 2.2.2 and 2.3.1; motion can cause seizures, vestibular symptoms, anxiety.)
- **web-sources.a11y-project-checklist#27** [T1] Skip links work in Webkit: if the target is not natively focusable, add `tabindex="-1"` to it (older Webkit builds failed to move focus). (Focus must actually land at the target.)
- **web-sources.a11y-project-checklist#54** [T1] Icon buttons and links (hamburger menus, social icons, gallery controls) are large enough to activate with ease for a range of hand and stylus sizes. (WCAG 2.5.5 Target Size per the checklist (the 2.2 AA criterion is 2.5.8, 24 px minimum).)
- **AH-TY-01** [T1] Body text defaults to 17 px on touch-first app UI (iOS default) and 13 px on dense desktop/Mac-style UI; never ship body or label text below the platform minimum: 11 px (touch) / 10 px (desktop), and treat 12 px as the practical floor for anything other than c (Apple's default/minimum pair is the legibility floor Apple tests against; footnote/caption styles bottom out at 12 and 11.)
- **systems-research.gestalt#4** [T1] Give UI text (labels, buttons, menu items) tighter leading (~1.2) than body text at the same size (~1.4): e.g. 16px ui = 19px line, 16px body = 22px line. (Single-line controls need compact, centred text; multi-line reading needs air.)
- **web.color-and-surfaces#3** [T2] Build scales as fixed lightness ladders, not `lighten()/darken()` at runtime. 12-step UI scale (Radix semantics): 1 app bg, 2 subtle bg, 3 component bg, 4 hover, 5 pressed/selected, 6 subtle border, 7 border on interactive, 8 strong border/focus ring, 9 solid  (fixed ladders make contrast predictable (steps 11/12 are documented as at least APCA Lc 60 / Lc 90 on step 2 of the same scale), and Refacto)
- **ui-pedia.13-buttons#6** [T2] Avoid disabled buttons whenever possible. Leave the button enabled; if required info is missing, highlight the blank/invalid fields (red outline, error icon) or show a notification on press. (A disabled button gives no reason why; users get stuck "for several seconds or minutes" hunting for what to fix. Figure: bad = greyed Login )
- **PT-SZ-08** [T2] Keep average line length at 45-90 characters including spaces (or 2-3 lowercase alphabets, i.e. about 52-78 characters) at every viewport width; measure it in characters per line, not in inches, ems or pixels. (Longer lines make the eye's return to the next line harder; characters per line works at any size, while physical width does not.)
- **ui-pedia.03-balance#17** [T2] Radial balance: arrange objects, colors or textures at equal distances around a single point (usually the center, not always), like a snowflake or seesaw about a pivot. (Equal distribution about a point balances without any left-right axis.)
- **web.courses-and-curricula#9** [T2] Body text: 15-25 px on the web; line spacing 120-145% of font size; line length 45-90 characters (Every Layout caps the measure at 60ch as its single axiom). (Longer lines need more leading; the eye loses its place past ~90 characters.)

## founder

- **LHS-13** [L] [founder] When the brief is one desktop X screenshot, do not do mobile work, extra sections or elaborate interaction QA. (Rejected as scope creep; Baton spent effort on mobile and extra QA although the deliverable was one still.)
- **LHS-20** [L] [founder] Take and Mise were "materially better received than Baton and Linecheck". The lesson is not their layout but that brand field, material, interface vocabulary, image, type and action reinforce one premise. Future work must exceed them rather than rest (Ledger positive evidence; relative rating, not an unqualified accept.)
- **LHS-01** [L] [founder] Do not set the headline as an oversized generic grotesk that dominates most of the frame. (Rejected default in the 2026-08-29/30 hero exercises; scale became the idea and crowded the product.)
- **LHS-19** [L] [founder] Reject Baton-class output: sterile monochrome product proof with the publisher identity imposed on the fictional subject. Reject Linecheck-class output: industrial photograph + giant headline + right-side inspection panel + familiar blue CTA, because (Founder rejected both; both folders are kept as negative evidence and must not be placed in a positive reference set.)
- **LHS-04** [L] [founder] No floating pill navigation and no rounded CTA capsules by default. (Rejected defaults; nav becomes a product demo instead of information architecture.)
- **LHS-09** [L] [founder] Do not add random cards, steps, side labels, charts or visual fragments only to make the frame feel busy. (Rejected default.)
- **LHS-03** [L] [founder] No small all-caps eyebrow above the title by reflex. Uppercase and mono utility labels are allowed only for authentic data or machine language. (Rejected default; the Tidehouse audit calls it "the exact decorative taxonomy pattern the user identified".)
- **LHS-02** [L] [founder] Do not use lowercase-everything branding in a fictional product's navigation and CTAs. Use normal capitalisation, readable size. (Rejected default; lowercase-everything is Larpo's own publisher voice, not a subject voice (see LBC-06).)
- **LHS-08** [L] [founder] A nice generated image with one UI panel placed over it, treated as the complete concept, is rejected. Integrate the product UI into the composition; generated imagery is a material, not the concept. (Rejected default; Linecheck's industrial photograph + right-side inspection panel "still formed a familiar template".)
- **LHS-18** [L] [founder] Prefer a beautiful still to implementation complexity; hero concept exercises may be static. Prioritise screenshot composition, fonts, buttons, imagery and overall atmosphere. Do not add interaction merely to prove the page works. (Stated founder preference (2026-08-30).)

## color

- **AH-CO-19** [T1] Do not offer an app-specific light/dark setting that overrides the system; follow `prefers-color-scheme` and handle automatic mid-session switches. (extra setting means people must change two things and may think the app is broken.)
- **AH-CO-02** [T1] Define every colour token in three variants: light, dark, and increased-contrast (`@media (prefers-contrast: more)`), even if you only ship one theme. (Apple wants all three so adaptive materials and accessibility settings do not break the palette.)
- **LAI-65** [T2] [team research] Get palette distinctiveness from relationships, not rare hex values: unusual dominant-to-accent proportion; subject-tied temperature contrast; material-derived neutrals; photography and UI sharing a controlled grade; one signature interaction c (Distinctiveness through relationships.)
- **web.color-and-surfaces#10** [T2] Separate *fill* accent from *text* accent. `accent` (fill) and `accent-text` (accent as text/icon on surfaces) are different tokens; `accent-text` is solved for contrast, `accent` is solved for the label on top of it. (lime, orange and amber fills have 1.2-2:1 against white; as link text they must be darkened by 0.3-0.4 L. One token cannot do both (chalk-ch)
- **web.color-and-surfaces#9** [T2] Every UI colour is one of 29 tokens: `surface-{page,card,sunken,raised,inverse}`, `ink-{1,2,3,inverse}`, `border-{subtle,strong}`, `accent`, `accent-{on,hover,soft,text}`, `ring`, optional `accent2*`, and `{success,warning,danger,info}` each with `-soft`. No r (lets a palette swap or a dark mode change every pixel consistently; Linear's 3-input generator is the same idea.)

## copy

- **AH-WR-07** [T1] In multi-step flows use one vocabulary: start with "Get Started", move with "Continue" or "Next" (pick one), end with "Done". (consistent verbs build a flow model.)

## cta

- **LAI-74** [T2] [team research] CTA copy: concrete verb + object ("View availability", "Book a night swim", "See the session timetable", "Request membership details", "Watch the workflow", "Compare plans"); avoid "Get started", "Learn more", "Explore", "Continue", "Join now"  (Predictability of outcome.)
- **LAI-73** [T2] [team research] Use a button for an action on the current page or application state and a link for navigation to another destination; a link may be styled as the primary call to action but its semantics must match its behaviour. (Semantics.)
- **ui-pedia.13-buttons#45** [T2] CTA button: urges the user to take a certain action; can technically be any button type that carries call-to-action text; must stand out from all other buttons. See hierarchy rules above for size and exclusivity. Example (p.308 figure): header "Login" as small (Turns passive into active user.)
- **LAI-80** [T2] [team research] When the headline reaches 142 px (`9.4vw`, line-height .82, tracking -.083em) and occupies most of the lower-left, it overpowers the photographic subject: reduce to a medium display role so the subject leads. The audit's single highest-impact c (Tidehouse audit P1 findings (H1 142 px; nested pill nav; 11 px mono uppercase eyebrow tracked .15em; weak action language "Book a night" vs )
- **dos-and-donts.dos-and-donts#49** [T2] [T28] Fill the CTA with the primary colour (white label) so it stands out: pricing card "Get Pro" filled primary, not a pale grey button with coloured text. (A dull CTA gets less attention and is harder to find.)

## hero

- **LHS-11** [L] [founder] Thin neutral monochrome UI that disappears at social-feed scale is rejected. (Baton's thin neutral UI lost hierarchy at feed size.)
- **LHS-45** [T2] [team research] Acceptance at feed scale: at 25 percent size a viewer must identify (1) the company or product identity, (2) the main promise or product moment, (3) the focal visual, (4) the action if there is one. Reject if it becomes a gray block, a giant he (Quality bar, 05.)
- **web.teardown-synthesis#15** [T1] Responsive headline: size at 390px is 0.44-0.89x desktop (median 0.63x); big-type sites scale continuously (Notion 42 -> 89.7 @1024 -> 96; Granola 48 -> 68 -> 110; Darkroom 104 -> 142 -> 267) while default sites step and cap (Vercel/Linear/Stripe cap at 64/64/

## mobile

- **WDD-05** [T1] Default to a single-column, sensible DOM order that works at the smallest width, then apply grid or flex at wider widths. The source order is what small screens, screen readers and tab order get. (A mobile layout is the zero-CSS flow; wide layouts decorate it.)

## motion

- **ui-pedia.18-animation-and-microinteraction#12** [T2] Current system status: keep users informed of what the site/app is doing and how long it will take; uninformed users get irritated and leave. Even failure messages can be playful while keeping trust. (Visibility of status.)
- **AH-MO-03** [T1] Make feedback motion physically consistent with the gesture and the entrance: it exits the way it came in, and a drag moves content with the finger. (inconsistent paths disorient.)
- **systems-research.gestalt#9** [T1] Animate entrances with a strong decelerate curve (cubic-bezier(0.05,0.7,0.1,1)) and exits with an accelerate curve (cubic-bezier(0.3,0,0.8,0.15)); exits shorter than entrances (position-off 200ms vs position-on 300ms). (Things arriving should settle softly; things leaving should get out of the way.)
- **SYS-CARBON-15** [T1] Match motion to mode: productive easing (`0.2,0,0.38,0.9`) for tasks, expressive (`0.4,0.14,0.3,1`) for rare significant moments; use entrance easing for appearing, exit easing for removed, standard easing when the element stays visible or leaves but stays nea (Distance and significance should drive duration; an element that stays on screen should not use exit curves.)
- **web-sources.craft-emil-kowalski#18** [T2] Do not layer entrance animations on a panel and its children (panel slides in with a 0.28s delay, children then stagger at 0.05s steps after a 0.3s delayed start). Prefer the single-step version. (Layering adds time before the content is usable; the exercise's right answer is the one without layers.)

## navigation

- **ui-pedia.21-screens#4** [T2] iOS phone base canvas: 375 x 667 pt (iPhone 8 and below / "regular iPhone" iPhone 5 to X) and 375 x 812 (X and up, per Figma list). The chapter's own device figures label them 370 x 667 and 370 x 812. (Every regular iPhone model between iPhone 5 and iPhone X is 375x667 pt.)
- **GOV-01** [T1] Start with user needs: research, analyse data, talk to users; do not assume, and remember that what users ask for is not always what they need. (Building without needs means building the wrong thing.)
- **GOV-70** [T1] Header: keep the header simple and consistent at the top of every page; the service name and navigation live in the Service navigation component, not in the logo bar; avoid navigation links when the service is a linear journey (use a task list instead). (Wayfinding for non-linear services only.)

## product

- **LDP-02** [T2] [team research] Choose layout from the strongest evidence: interface proves value -> product dominates; transformation is emotional/physical -> art direction or photography; idea is unfamiliar -> explanatory diagram/sequence; trust is the barrier -> proof besi (The arrangement is right only when the content creates that hierarchy, not because a starter template used it.)

## spacing

- **ui-pedia.06-whitespace#1** [T2] Treat whitespace as a content-bearing design element, not leftover. Do not fill empty areas just because they are empty; defend it against "use the space for more information" requests. (Whitespace balances design features, organises content and prevents cluttered pages; under information overload users get irritated and bail)
- **ui-pedia.07-proximity#2** [T2] Use different amounts of whitespace to express group membership, including within one row. Example: put the Search field on the same line as the primary navigation but with extra whitespace to its left, so it reads as a different function even though it shares (Spacing alone can differentiate functions when type styling is identical.)
- **systems-research.spectrum#2** [T1] Group with proximity before borders: separate sections with a spacing step (e.g. items `spacing-75` 4px, section gap `spacing-400` 24px, card groups `spacing-300` 16px / `spacing-500` 32px) and a section title; add a divider or border only when spacing cannot  (Borders fill and disrupt negative space; proximity is the cheaper, calmer grouping cue.)
- **web.courses-and-curricula#5** [T2] Group by proximity first, enclosure second: more space around groups than within them; a heading sits closer to its own content than to the previous section. (Gestalt proximity (Laws of UX) and NN/g grouping guidance; boxes are used only when whitespace alone fails.)
- **ui-pedia.07-proximity#5** [T2] In text, group sentences into paragraphs divided above and below by whitespace; put a heading closer to the text beneath it than to the preceding section's text. (The spacing around headings tells you which paragraphs they belong to; groupings are discernible even without reading (the grey-bar version )

## typography

- **ui-pedia.12-typography#13** [T2] Start line-height at 1.5 x font size (for body copy at the base size) and derive the rest from it. (It is a workable default and gives a base for a baseline grid.)
- **ui-pedia.12-typography#22** [T2] Tighten letter spacing on larger type (headings, banners, titles). (Large type looks too loose at default spacing.)
- **systems-research.gestalt#5** [T1] Swap only the line-height tokens (not sizes) per writing system: taller leading for CJK, Thai, Vietnamese and other tall scripts. (Stacked diacritics and dense glyphs clip or collide at Latin leading.)
- **AH-TY-20** [T1] Custom fonts must honour the same behaviours as the system font: legible at the minimums above, scale with user text size, respond to a bold-text preference, and be supported at all weights you use. (system fonts get these for free; custom fonts silently drop them.)
- **systems-research.gestalt#6** [T1] Scale corner radius with control height (about 1/3 of height): 24px -> 8px, 32px -> 12px, 44px -> 16px. (A fixed radius looks sharp on large controls and blobby on small ones; proportional radius keeps the same shape family.)
