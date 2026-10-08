# Rule slate: hero-vellum

Brief: Marlowe: AI research analyst that writes a sourced client-meeting brief for independent wealth advisors; one action: request access; proof: sourced brief UI  
Page type: hero. Generated 2026-10-08 from 3586 indexed rules.

Trim this to the 20-50 rules that apply. Rules are defaults: break one only with `override: <id> because <reason>` in DIRECTION.md.


## core

- **systems-research.magic-ui#4** [T1] Animate numbers only when the number is real, sourced and final; never tick to placeholder metrics. (Counting motion draws the eye to the claim; an invented number becomes a highlighted lie.)
- **LDP-16** [T2] [team research] For SaaS and AI sites show a believable workflow, state transition, input/output pair, data trace or result with accurate copy, realistic data and visible interaction consequences. A screenshot floating in a glass panel is not proof. Do not inv (Proof is what reduces the visitor's objection; decoration does not.)
- **WCSS-39** [T1] Show focus with an `outline` (colour with contrast, `outline-offset` for breathing room); never `outline: none` without a replacement; use `:focus-visible` to avoid mouse-click rings. The course teaches `:focus` first and `:focus-visible` in the pseudo-classes (`box-shadow` replacements vanish in forced-colors; positive `tabindex` breaks the source-order tab sequence.)
- **systems-research.magic-ui#5** [T1] Run marquees slowly (>= 30s per loop), pause on hover/focus, and only for real logos or real quotes. (Fast marquees are unreadable; fake logos break the never-invent-proof rule.)
- **VWI-04** [T2] Never write `outline: none` (or `outline: 0`) unless a visible replacement focus style is present on the same selector. (It silently removes the only focus cue.)
- **web.courses-and-curricula#62** [T2] One `h1` per page, no skipped heading levels, unique `<title>` and `lang` on `<html>`, landmarks (`nav`, `main`), `alt` on every image (empty for decorative). (Navigation by structure for AT and SEO.)
- **LBC-23** [T2] [team research] A logo appears only where the client has approved it; a prospect is never displayed; nothing unsigned goes in a trusted-by row; ending an engagement does not withdraw the logo, a client asking to be removed does. Current trusted-by row: acquisi (Proof handling.)
- **web-sources.a11y-project-checklist#54** [T1] Icon buttons and links (hamburger menus, social icons, gallery controls) are large enough to activate with ease for a range of hand and stylus sizes. (WCAG 2.5.5 Target Size per the checklist (the 2.2 AA criterion is 2.5.8, 24 px minimum).)
- **web.color-and-surfaces#53** [T2] Sequential: single hue, lightness carries the value (light = low), L from ~0.95 down to ~0.35 in >= 5 steps; diverging: two hues meeting at a neutral mid, equal L at both ends. Never rainbow for ordered data. (lightness ordering is the one thing the eye reads reliably as magnitude [ColorBrewer summary, secondary].)
- **ui-pedia.02-color#10** [T2] Distribute colour 60% / 30% / 10%: 60% a neutral ("any justifying neutral color"), 30% the secondary brand colour, 10% the main brand colour. The book writes it as 6:3:1 and calls it the Golden Rule / Golden Ratio of Colors. (Produces a neat, harmonious interface, soothes the eye, and lets the viewer flow from one place to the next naturally (p.59, p.60).)
- **LBC-42** [L] [founder] Do not write the caption from inside the fiction (a concept post is not an ad for the fake company; "i made the meeting bot knock before it joins" sells a feature of a company that does not exist). (Rokas, 2026-08-31.)
- **PT-SZ-11** [T2] Do not trust the CSS `ch` unit as a proxy for "characters per line": it is the advance width of the digit zero, which is wider than the average letter in running text, so a `65ch` box fits more than 65 average characters. (The author warns that `ch` is not a useful stand-in for average characters per line.)
- **AH-TY-01** [T1] Body text defaults to 17 px on touch-first app UI (iOS default) and 13 px on dense desktop/Mac-style UI; never ship body or label text below the platform minimum: 11 px (touch) / 10 px (desktop), and treat 12 px as the practical floor for anything other than c (Apple's default/minimum pair is the legibility floor Apple tests against; footnote/caption styles bottom out at 12 and 11.)
- **ui-pedia.12-typography#18** [T2] Worked scale shown: H1 Heavy, H2 Bold, H3 Bold, Subtitle Regular, Body 1 Regular, Button Medium (sizes decrease down the list; no px values given). Replicate that structure: weight steps down from Heavy to Regular as size steps down, with Medium reserved for b (Weight plus size together make the levels distinct.)
- **PT-SZ-08** [T2] Keep average line length at 45-90 characters including spaces (or 2-3 lowercase alphabets, i.e. about 52-78 characters) at every viewport width; measure it in characters per line, not in inches, ems or pixels. (Longer lines make the eye's return to the next line harder; characters per line works at any size, while physical width does not.)
- **what-to-do-next.brief-scope-and-delivery-process#17** [T2] Before the first working session write answers to: your process; why you take the work; which projects you will/won't take (and that "no" is allowed); your role in the client meeting; what success means to you AND the customer; what makes you stand out. (Undefined process/success criteria cause drift; this is the book's #1 recurring theme ("Define").)

## founder

- **LHS-13** [L] [founder] When the brief is one desktop X screenshot, do not do mobile work, extra sections or elaborate interaction QA. (Rejected as scope creep; Baton spent effort on mobile and extra QA although the deliverable was one still.)
- **LHS-20** [L] [founder] Take and Mise were "materially better received than Baton and Linecheck". The lesson is not their layout but that brand field, material, interface vocabulary, image, type and action reinforce one premise. Future work must exceed them rather than rest (Ledger positive evidence; relative rating, not an unqualified accept.)
- **LHS-19** [L] [founder] Reject Baton-class output: sterile monochrome product proof with the publisher identity imposed on the fictional subject. Reject Linecheck-class output: industrial photograph + giant headline + right-side inspection panel + familiar blue CTA, because (Founder rejected both; both folders are kept as negative evidence and must not be placed in a positive reference set.)
- **LHS-02** [L] [founder] Do not use lowercase-everything branding in a fictional product's navigation and CTAs. Use normal capitalisation, readable size. (Rejected default; lowercase-everything is Larpo's own publisher voice, not a subject voice (see LBC-06).)
- **LHS-12** [L] [founder] No generic dark-neon, glow, orb, grid, grain or shader styling that has no product meaning. (Rejected default.)
- **LHS-18** [L] [founder] Prefer a beautiful still to implementation complexity; hero concept exercises may be static. Prioritise screenshot composition, fonts, buttons, imagery and overall atmosphere. Do not add interaction merely to prove the page works. (Stated founder preference (2026-08-30).)
- **LHS-06** [L] [founder] Do not use the automatic left-copy / right-dashboard layout. (Rejected default skeleton; also listed again in the 2026-09-01 divergence note.)
- **LHS-16** [L] [founder] Avoid the Phase, Ridge 47 and Vanta failure modes: loud poster palette, oversized record graphic and novelty typography ("too experimental for the desired quality"); side rail + giant numeric device + route overlay + ticket graphic ("forced design ge (Founder rejected these in R1.)
- **LHS-10** [L] [founder] Product panels must read as a workflow, not a decorative dashboard. (Rejected default.)
- **LHS-08** [L] [founder] A nice generated image with one UI panel placed over it, treated as the complete concept, is rejected. Integrate the product UI into the composition; generated imagery is a material, not the concept. (Rejected default; Linecheck's industrial photograph + right-side inspection panel "still formed a familiar template".)

## color

- **LAI-65** [T2] [team research] Get palette distinctiveness from relationships, not rare hex values: unusual dominant-to-accent proportion; subject-tied temperature contrast; material-derived neutrals; photography and UI sharing a controlled grade; one signature interaction c (Distinctiveness through relationships.)
- **web.anti-ai-slop#3** [T2] Treat the cream ground, italic/high-contrast serif display, and terracotta/coral accent as ONE combined tell, and near-black + single neon accent as a second. Allowed only if the brief pins it; otherwise the free axis must not be spent on them. (Named by Anthropic's own skill, Impeccable ("cream-palette" rule + "calibration" paragraph), and press coverage of "Claudian sameness".)
- **systems-research.blueprint#7** [T1] Scope the dark theme to a container class so dark and light regions can coexist (e.g. dark navbar or dark side panel inside a light app). (Analyst tools mix map/graph canvases (dark) with forms (light).)
- **web.color-and-surfaces#24** [T2] Tint neutrals. Surface chroma budget: light surfaces C 0.003-0.016, dark surfaces C 0.004-0.022, mid/ink greys C 0.004-0.04; C < 0.003 reads as dead grey unless the brief is deliberately mono/Swiss. Use the accent hue +-30 degrees, or a deliberate complement ( (Radix "natural" pairing and Tailwind's slate/stone/mauve/olive; Linear limited blue in its neutrals for a "more neutral, timeless look". Ove)
- **web.color-and-surfaces#10** [T2] Separate *fill* accent from *text* accent. `accent` (fill) and `accent-text` (accent as text/icon on surfaces) are different tokens; `accent-text` is solved for contrast, `accent` is solved for the label on top of it. (lime, orange and amber fills have 1.2-2:1 against white; as link text they must be darkened by 0.3-0.4 L. One token cannot do both (chalk-ch)

## copy

- **AH-WR-17** [T1] Keep onboarding about your product, not about the device or browser; keep it brief and enjoyable so people finish it. (teaching too much overwhelms.)
- **web.anti-ai-slop#9** [T2] Numbers must be sourced or labelled sample. "Fake-perfect" stats (`99.99%`, `4.1x`, `10K+ users` rows) are tells. (taste-skill bans fake-precise numbers; slop-cop `stat_banner_row` (3-6 sibling cards, number font >=22px, text <=10 chars, row >=300px wide))

## cta

- **LAI-73** [T2] [team research] Use a button for an action on the current page or application state and a link for navigation to another destination; a link may be styled as the primary call to action but its semantics must match its behaviour. (Semantics.)
- **LAI-39** [T2] [team research] CTA proof: label names the action and likely outcome; commitment understandable; only one primary; button/link semantics match behaviour; geometry belongs to the brand system; hover does not move the target; pressed, focus, loading and result s (Gate 9.)
- **LAI-66** [T2] [team research] When colour may affect action, test meaningful systems (hierarchy, label, placement, surrounding contrast, perceived commitment) rather than isolated button hues; a different CTA colour may win because it is more visible in that composition, no (Test, do not mythologise.)
- **LAI-36** [T2] [team research] Focal competition: list every high-salience element (largest type, brightest colour, highest-contrast surface, face or human subject, moving object, primary action, nav shell, glow/reflection); choose one first and one second focal point and re (Gate 4 of the research list.)
- **LAI-62** [T2] [team research] Build a job-based palette: primitives then semantic roles (canvas; raised and inset surfaces; primary and secondary text; subtle and strong borders; primary action; interactive text; focus; selected; success, warning, destructive, information;  (An accent on everything stops directing attention.)

## hero

- **LW-13** [T2] Write the CTA as the next step of the hero's promise ("Find food", "Start learning"), not a context-free ask such as "Request a meeting". (A CTA that continues the narrative feels natural to click; a vague one raises the "why would I?" question.)
- **LHS-11** [L] [founder] Thin neutral monochrome UI that disappears at social-feed scale is rejected. (Baton's thin neutral UI lost hierarchy at feed size.)
- **LHS-01** [L] [founder] Do not set the headline as an oversized generic grotesk that dominates most of the frame. (Rejected default in the 2026-08-29/30 hero exercises; scale became the idea and crowded the product.)
- **LHS-52** [T2] [team research] Use only hero elements that carry a job (context cue, headline, support, action, proof, visual evidence, orientation); every extra item taxes comprehension; a decorative badge is not context; a row of logos is not proof unless true and relevant (Minimal truthful argument.)
- **LHS-07** [L] [founder] Do not use the automatic big-copy-above / photo-below layout (giant headline over a wide image or product crop). (Rejected default skeleton.)

## motion

- **SYS-CARBON-15** [T1] Match motion to mode: productive easing (`0.2,0,0.38,0.9`) for tasks, expressive (`0.4,0.14,0.3,1`) for rare significant moments; use entrance easing for appearing, exit easing for removed, standard easing when the element stays visible or leaves but stays nea (Distance and significance should drive duration; an element that stays on screen should not use exit curves.)
- **LBC-15** [T2] [team research] Motion feels premium but disappears into use: short, smooth opacity and small vertical entrance transitions with a gentle custom ease; reveal late enough to be noticed and early enough to avoid empty space; respect reduced motion; no blur-fly-i (Canonical motion budget.)
- **AH-MO-03** [T1] Make feedback motion physically consistent with the gesture and the entrance: it exits the way it came in, and a drag moves content with the finger. (inconsistent paths disorient.)
- **web-sources.craft-emil-kowalski#17** [T2] Sequence the layered pieces of an entrance by importance, not uniformly: the least important element (a pill badge) only fades, the headline moves most. Stagger delays must differ per tier; uniform delays flatten hierarchy. (Motion encodes importance; uniform stagger looks artificial.)
- **LDP-13** [T2] [team research] Motion must clarify origin, destination, hierarchy, continuity or causality. Use transform and opacity for most transitions; short responsive feedback and slower composed page entrances; stagger by reading order, not every DOM child; springs fo (Decorative ambient motion competes with reading and can fail.)

## navigation

- **GOV-26** [T1] Do not use HTML5 validation: add `novalidate` to forms and do not put `required` on inputs; implement server-side validation always, and add client-side validation only when research shows a need. (Browser bubbles cannot be styled or placed consistently or proven accessible; client rules can be bypassed or fail.)

## product

- **LDP-02** [T2] [team research] Choose layout from the strongest evidence: interface proves value -> product dominates; transformation is emotional/physical -> art direction or photography; idea is unfamiliar -> explanatory diagram/sequence; trust is the barrier -> proof besi (The arrangement is right only when the content creates that hierarchy, not because a starter template used it.)
- **LDP-14** [T2] [team research] A static screenshot must still communicate the core design. (Heroes are posted as stills; animation cannot carry the idea.)
- **LDP-01** [T2] [team research] Before choosing any font, gradient, shader or component library, write one thesis sentence naming the audience, the change the product creates, and the visual behaviour that supports the claim. Weak: "modern AI SaaS, dark with gradients." Stron (A style word is not a concept; without a thesis every later choice is drawn from the statistical default.)

## spacing

- **ui-pedia.07-proximity#8** [T2] Keep a top-aligned label very close to its own field and put a bigger gap before the next label-field pair. (Minimal spacing label-to-field makes that relationship obvious; the bigger gap after separates pairs.)
- **ui-pedia.07-proximity#10** [T2] Group controls that belong together (Previous and Next are connected: grouping them would improve usability). (The book's suggested fix for the EDD page.)
- **ui-pedia.07-proximity#2** [T2] Use different amounts of whitespace to express group membership, including within one row. Example: put the Search field on the same line as the primary navigation but with extra whitespace to its left, so it reads as a different function even though it shares (Spacing alone can differentiate functions when type styling is identical.)

## typography

- **AH-TY-05** [T1] Define named text roles (Large Title, Title 1-3, Headline, Body, Callout, Subhead, Footnote, Caption 1-2) as tokens that each carry size, weight and line-height together, and use roles instead of ad-hoc sizes. (one token per role keeps the scale consistent and lets the whole scale shift as a unit.)
- **ui-pedia.12-typography#13** [T2] Start line-height at 1.5 x font size (for body copy at the base size) and derive the rest from it. (It is a workable default and gives a base for a baseline grid.)
- **ui-pedia.12-typography#17** [T2] Establish a size for all fonts/typefaces from the start in a type scale and share it with the team for every platform (Android, iOS, Web), stating which platform/context each scale applies to. (Scalable type across screen sizes requires one agreed scale.)
- **AH-TY-10** [T1] Use loose leading for wide columns and long passages; use tight leading only where height is constrained (list rows), and never tight leading on three or more lines. (loose leading keeps the eye on the right line in long measures; tight three-line blocks read as a grey slab.)
- **ui-pedia.12-typography#34** [T2] Keep UI text as simple and brief as possible, informative but concise ("never make your users think"); but do not go so short or basic that users get confused. (Short copy supports scanning; over-short copy confuses and produces a negative outcome.)
