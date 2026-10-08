# Rule slate: eval-t0-hero-ai-devtool

Brief: AI code review tool catches bugs before merge, engineering leads, start free trial  
Page type: hero. Generated 2026-10-08 from 1486 indexed rules.

Trim this to the 20-50 rules that apply. Rules are defaults: break one only with `override: <id> because <reason>` in DIRECTION.md.


## core

- **LDP-16** [T2] [team research] For SaaS and AI sites show a believable workflow, state transition, input/output pair, data trace or result with accurate copy, realistic data and visible interaction consequences. A screenshot floating in a glass panel is not proof. Do not inv (Proof is what reduces the visitor's objection; decoration does not.)
- **dos-and-donts.dos-and-donts#67** [T2] [T59] Keep forms short and clear: fewer fields (merge First/Last Name into "Name"; 4 fields became 3). (Every additional field lowers conversion and loses leads.)
- **web.anti-ai-slop-process#7** [T2] Pre-build plan = 4-6 named colours, type roles, one-sentence layout concept + ASCII wireframe, "what makes it unique"; a review step compares it with the default look for that category and logs what changed. (Catches convergence before code exists, when changing is free.)
- **web.courses-and-curricula#62** [T2] One `h1` per page, no skipped heading levels, unique `<title>` and `lang` on `<html>`, landmarks (`nav`, `main`), `alt` on every image (empty for decorative). (Navigation by structure for AT and SEO.)
- **ui-pedia.12-typography#32** [T2] Combine uppercase and lowercase for contrast: the example sets a mixed-case tagline, then a wide-tracked all-caps heading "WE LOVE AND BREATHE CODE ." in the brand slate, then mixed-case body text. (Case change signals a different role without a new font.)
- **web.implementation-craft#34** [T1] Use `motion-safe:` / `motion-reduce:`, `contrast-more:`, `forced-colors:`, `pointer-coarse:`, `focus-visible:`, `user-invalid:`, `has-*`, `group-has-*`, `in-*`, `not-*`, `starting:`, `inert:`, `rtl:` variants for the corresponding assertions [verified]. Replac
- **web.courses-and-curricula#61** [T2] Keep a visible `:focus-visible` ring on every focusable element (never `outline: none` without replacement); focus order matches visual order; no positive `tabindex`; provide a skip link; trap, move and return focus for dialogs. (Keyboard users must see where they are.)
- **web.motion-library-react#12** [T2] `layoutId` for shared elements (tab underline, selected pill, card->modal). The `transition` of the element being animated *to* wins. Wrap in `AnimatePresence` if the shared element must animate out before unmount.
- **LDP-20** [T2] [team research] Accept a design only after checking: real copy and data; desktop, intermediate, mobile and zoomed widths; long and short headings; keyboard and focus order; hover, active, disabled, loading, error, empty, success states; overlays and scroll loc ("A design is not finished because the code compiles or a desktop screenshot looks good.")
- **AH-TY-01** [T1] Body text defaults to 17 px on touch-first app UI (iOS default) and 13 px on dense desktop/Mac-style UI; never ship body or label text below the platform minimum: 11 px (touch) / 10 px (desktop), and treat 12 px as the practical floor for anything other than c (Apple's default/minimum pair is the legibility floor Apple tests against; footnote/caption styles bottom out at 12 and 11.)
- **dos-and-donts.dos-and-donts#4** [T2] [T94] Keep paragraph line length in check: stick to 45-75 characters per line "if you want to play it safe". The good example is labelled 55-65 characters per line; the bad example is labelled ~120 characters per line. (Too-long lines make text harder to read.)
- **ui-pedia.13-buttons#21** [T2] For all interactive elements on mobile start from 44 x 44 points; for smartphone buttons the sweet spot is roughly 50 in height. Width may be any value >= height (including the double-W minimum horizontal padding). (Minimum comfortable tap size.)
- **web.color-and-surfaces#15** [T2] Gate text on WCAG 2.2 AND APCA: body/secondary text >= 4.5:1 (7:1 for ink-2 targets) **and** |Lc| >= 60 (75 for the primary reading colour). Large text (>= 18pt = 24px, or >= 14pt bold = ~18.7px) may use 3:1 under WCAG. (WCAG's formula treats light-on-dark mid-greys too generously; APCA models polarity (Lc 32 for the 4.5:1 grey on `#0f0f0f`) [computed]. Mynde)
- **web.courses-and-curricula#9** [T2] Body text: 15-25 px on the web; line spacing 120-145% of font size; line length 45-90 characters (Every Layout caps the measure at 60ch as its single axiom). (Longer lines need more leading; the eye loses its place past ~90 characters.)
- **web.funnels-and-conversion#10** [T2] Put proof beside the form: one named quote (outcome) + 4-6 logos + a short "what happens in the demo" list (3 bullets, 20-30 minutes). Add a secondary "Prefer to try it? Start free" path if self-serve exists. (Reduces fear of a sales ambush; offers an alternative for the self-serve buyer.)
- **web.anti-ai-slop-process#9** [T2] Use image-first exploration only when the comp is treated as a spatial contract and the code is verified against it; otherwise the code drifts back to template. (Taste-skill `image-to-code` (one image per section, extract layout/type/spacing/colour values, build, compare in a real browser) and Impecca)

## founder

- **LHS-01** [L] [founder] Do not set the headline as an oversized generic grotesk that dominates most of the frame. (Rejected default in the 2026-08-29/30 hero exercises; scale became the idea and crowded the product.)
- **LHS-13** [L] [founder] When the brief is one desktop X screenshot, do not do mobile work, extra sections or elaborate interaction QA. (Rejected as scope creep; Baton spent effort on mobile and extra QA although the deliverable was one still.)
- **LHS-20** [L] [founder] Take and Mise were "materially better received than Baton and Linecheck". The lesson is not their layout but that brand field, material, interface vocabulary, image, type and action reinforce one premise. Future work must exceed them rather than rest (Ledger positive evidence; relative rating, not an unqualified accept.)
- **LHS-19** [L] [founder] Reject Baton-class output: sterile monochrome product proof with the publisher identity imposed on the fictional subject. Reject Linecheck-class output: industrial photograph + giant headline + right-side inspection panel + familiar blue CTA, because (Founder rejected both; both folders are kept as negative evidence and must not be placed in a positive reference set.)
- **LHS-04** [L] [founder] No floating pill navigation and no rounded CTA capsules by default. (Rejected defaults; nav becomes a product demo instead of information architecture.)
- **LHS-02** [L] [founder] Do not use lowercase-everything branding in a fictional product's navigation and CTAs. Use normal capitalisation, readable size. (Rejected default; lowercase-everything is Larpo's own publisher voice, not a subject voice (see LBC-06).)
- **LHS-06** [L] [founder] Do not use the automatic left-copy / right-dashboard layout. (Rejected default skeleton; also listed again in the 2026-09-01 divergence note.)
- **LHS-18** [L] [founder] Prefer a beautiful still to implementation complexity; hero concept exercises may be static. Prioritise screenshot composition, fonts, buttons, imagery and overall atmosphere. Do not add interaction merely to prove the page works. (Stated founder preference (2026-08-30).)
- **LHS-15** [L] [founder] Accepted direction Borne: calm full-bleed photography, restrained navigation, refined serif typography, quiet booking control, coherent premium atmosphere. Accepted direction Nacre: sculptural central product, spacious composition, restrained palette (Founder feedback "accepted as good" on the R1 collection (2026-08-30); positive evidence, not templates.)
- **LHS-10** [L] [founder] Product panels must read as a workflow, not a decorative dashboard. (Rejected default.)

## color

- **web.anti-ai-slop#3** [T2] Treat the cream ground, italic/high-contrast serif display, and terracotta/coral accent as ONE combined tell, and near-black + single neon accent as a second. Allowed only if the brief pins it; otherwise the free axis must not be spent on them. (Named by Anthropic's own skill, Impeccable ("cream-palette" rule + "calibration" paragraph), and press coverage of "Claudian sameness".)
- **AH-CO-09** [T1] Do not hard-code the documented system colour values; reference the colour by name/token because the actual values change between releases and environments. (Apple says documented values are for design-time reference only.)
- **AH-CO-24** [T1] Accessibility Inspector thresholds for text: up to 17 pt (px) text needs 4.5:1; 18 pt and larger needs 3:1; any bold text needs 3:1; when the default scheme does not reach these, supply a higher-contrast scheme under Increase Contrast. (Apple's WCAG AA mapping for its audit tool.)
- **web.color-and-surfaces#10** [T2] Separate *fill* accent from *text* accent. `accent` (fill) and `accent-text` (accent as text/icon on surfaces) are different tokens; `accent-text` is solved for contrast, `accent` is solved for the label on top of it. (lime, orange and amber fills have 1.2-2:1 against white; as link text they must be darkened by 0.3-0.4 L. One token cannot do both (chalk-ch)
- **AH-CO-02** [T1] Define every colour token in three variants: light, dark, and increased-contrast (`@media (prefers-contrast: more)`), even if you only ship one theme. (Apple wants all three so adaptive materials and accessibility settings do not break the palette.)

## cta

- **ui-pedia.13-buttons#1** [T2] Use a button (real action control) for actions that change data or state: "submit", "merge", "make new", "upload". Use a link for navigation to another location ("see all" page, a person's profile) and for anything that does not affect the site. (Users and assistive tech read the two as different promises; buttons act, links go.)
- **ui-pedia.13-buttons#11** [T2] For a CTA, make it the only element on the screen with a distinct colour or design; no other button should compete with it visually or draw attention to it. Keep enough contrast with the background so it does not merge in. (A CTA converts a passive user into an active one; competition dilutes it.)
- **ui-pedia.13-buttons#45** [T2] CTA button: urges the user to take a certain action; can technically be any button type that carries call-to-action text; must stand out from all other buttons. See hierarchy rules above for size and exclusivity. Example (p.308 figure): header "Login" as small (Turns passive into active user.)
- **ui-pedia.13-buttons#8** [T2] Create a hierarchy of actions: usually one conspicuous primary button, multiple medium secondary, and low-importance tertiary actions. Figure (p.293): primary = filled gradient button; secondary = outlined button (blue border, blue text, transparent/white fill (Style distinguishes more essential from less important behaviours and guides users through many options.)

## hero

- **LHS-73** [T2] [team research] Reject a batch before export when: more than two concepts share a headline family category; more than two share a header architecture; more than two share a CTA silhouette; an accent hue leads in more than two; a proof card could be moved to an (Macro sameness is invisible to per-element critique.)
- **LHS-11** [L] [founder] Thin neutral monochrome UI that disappears at social-feed scale is rejected. (Baton's thin neutral UI lost hierarchy at feed size.)
- **web.landing-page-anatomy#2** [T2] H1 must be fully descriptive: a reader who reads only the H1 knows what you sell. Name the category noun or the outcome plus the mechanism. No slogans, no self-congratulation. (Shapiro: "a visitor who reads only the header should know exactly what you sell"; Highrise: moving the plain offer (30-day free trial) into )
- **LHS-07** [L] [founder] Do not use the automatic big-copy-above / photo-below layout (giant headline over a wide image or product crop). (Rejected default skeleton.)
- **web.landing-page-anatomy#8** [T2] CTA label = verb + what they get (+ cost/risk reducer adjacent): "Start free trial", "Book a 20-min demo", "Get the benchmark report". Avoid "Submit", "Learn more" as primary. Put the friction reducer ("No credit card", "Free for 14 days", "Takes 2 min") withi (Vague CTA copy that does not clarify the product is weak (Shapiro). The first-person ("Start my…") wording test shows +90% on one page and -)

## mobile

- **ui-pedia.21-screens#1** [T2] Start every design by choosing a platform-specific base canvas before drawing anything. (Users expect the product to fit their screen perfectly; the canvas fixes every later measurement.)
- **web.implementation-craft#4** [T1] Use `:has()` for parent/state styling (form field with invalid input, card with image, nav with open details) instead of JS class toggles. (Removes state-sync bugs; universal since Firefox 121 (Dec 2023) [verified].)

## motion

- **ui-pedia.18-animation-and-microinteraction#28** [T2] Learn easing types in depth in your design tool (Figma, Adobe XD); advanced interactions need more tools and are "an unique field". (Linear, ease in and ease out are the most popular and widely supported.)
- **web.motion-and-animation#21** [T2] Never `scale(0)`; start at 0.9-0.97 + opacity 0. (Nothing real appears from nowhere.)
- **web.motion-and-animation#14** [T2] Prefer duration-like spring params (`visualDuration` + `bounce`) over raw stiffness/damping/mass in product code; keep raw physics only when matching a reference. (Designer-legible; `visualDuration` states when the bulk of motion is done. Note raw `stiffness`/`damping`/`mass` override `bounce`/`duration)
- **web.motion-library-react#16** [T2] Gate hero entrance so content is visible without JS and LCP is not delayed (see `motion-a11y-perf-loading.md` section 2.4).
- **web.motion-and-animation#2** [T2] Run the frequency table before writing any animation: 100+/day = none; tens/day = remove or <=100ms opacity/color only; occasional = standard tokens; rare = may add delight. (The "initial delight fades and the animation slows users down".)

## navigation

- **ui-pedia.17-navigation#3** [T2] Align navigation with the goals of identified user groups (personas). Derive the nav by asking what these users need, e.g. (Kalbach): How can I locate certain information or a product quickly? How can I be sure the information is current? Is the information re (Nav "reverse engineering": knowing needs tells you what the nav must support.)
- **ui-pedia.17-navigation#19** [T2] Prototype and test the navigation flow (registration, finding a specific item, purchase patterns, the whole product's nav) before committing. Use a tool with built-in user testing if possible (CrazyEgg, UserTesting, Hotjar). Test with 3-5 people (Laura Klein). (An unprototyped guess (e.g. "a breadcrumb will help") is still a guess; data reduces risk. Prototyping also clarifies the product, its direc)
- **ui-pedia.07-proximity#3** [T2] If the separating gap cannot be preserved at a smaller viewport, move the item out of the group instead of letting it merge. TfL-style example: on smaller screens the Search was moved up and away from the main nav; on tablet it was shifted up and grouped with  (Cramped space would make Search look like part of the main navigation.)

## product

- **LDP-02** [T2] [team research] Choose layout from the strongest evidence: interface proves value -> product dominates; transformation is emotional/physical -> art direction or photography; idea is unfamiliar -> explanatory diagram/sequence; trust is the barrier -> proof besi (The arrangement is right only when the content creates that hierarchy, not because a starter template used it.)

## spacing

- **ui-pedia.06-whitespace#10** [T2] Add active whitespace on top of passive: use gaps, indents, sidebars/pull-outs and pull quotes to guide the reader through a long text, turning the "wall of text" into a navigable layout. (Active whitespace improves page structure and leads the user through the information.)
- **ui-pedia.07-proximity#8** [T2] Keep a top-aligned label very close to its own field and put a bigger gap before the next label-field pair. (Minimal spacing label-to-field makes that relationship obvious; the bigger gap after separates pairs.)
- **ui-pedia.07-proximity#1** [T2] Place related elements near each other; separate unrelated elements with clearly larger gaps. Gap *between* groups must be visibly larger than gap *within* a group. (Closeness is read as relatedness before any text is read.)
- **ui-pedia.07-proximity#2** [T2] Use different amounts of whitespace to express group membership, including within one row. Example: put the Search field on the same line as the primary navigation but with extra whitespace to its left, so it reads as a different function even though it shares (Spacing alone can differentiate functions when type styling is identical.)

## typography

- **ui-pedia.12-typography#15** [T2] Decide up front how many type sizes you need and which sizes pair with which weights/styles; cover helper text, form labels, body, subheads and headlines. (An undefined size set leads to ad-hoc sizes and inconsistency.)
- **ui-pedia.12-typography#13** [T2] Start line-height at 1.5 x font size (for body copy at the base size) and derive the rest from it. (It is a workable default and gives a base for a baseline grid.)
- **ui-pedia.12-typography#17** [T2] Establish a size for all fonts/typefaces from the start in a type scale and share it with the team for every platform (Android, iOS, Web), stating which platform/context each scale applies to. (Scalable type across screen sizes requires one agreed scale.)
- **ui-pedia.12-typography#37** [T2] Prototype and test type before production. In the prototype: (1) check type scales on a variety of devices, (2) check animations and interactions work as expected, (3) experiment with colours, white spaces and sizes for the desired result. If possible, invite  (Saves time and money; catches typographic problems early.)
- **ui-pedia.12-typography#8** [T2] Before adding a weight, check whether the hierarchy can be achieved by raising type size instead. (Size alone can separate levels without adding a font file.)
