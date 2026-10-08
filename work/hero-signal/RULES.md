# Rule slate: hero-signal

Brief: Pager: AI on-call agent that triages production incidents and drafts the fix PR; for eng leads/SREs at 50-1000 person companies; one action: start 14-day trial; proof: real incident triage UI with labelled sample data  
Page type: hero. Generated 2026-10-08 from 3586 indexed rules.

Trim this to the 20-50 rules that apply. Rules are defaults: break one only with `override: <id> because <reason>` in DIRECTION.md.


## core

- **systems-research.magic-ui#5** [T1] Run marquees slowly (>= 30s per loop), pause on hover/focus, and only for real logos or real quotes. (Fast marquees are unreadable; fake logos break the never-invent-proof rule.)
- **VWI-04** [T2] Never write `outline: none` (or `outline: 0`) unless a visible replacement focus style is present on the same selector. (It silently removes the only focus cue.)
- **WCSS-39** [T1] Show focus with an `outline` (colour with contrast, `outline-offset` for breathing room); never `outline: none` without a replacement; use `:focus-visible` to avoid mouse-click rings. The course teaches `:focus` first and `:focus-visible` in the pseudo-classes (`box-shadow` replacements vanish in forced-colors; positive `tabindex` breaks the source-order tab sequence.)
- **LDP-16** [T2] [team research] For SaaS and AI sites show a believable workflow, state transition, input/output pair, data trace or result with accurate copy, realistic data and visible interaction consequences. A screenshot floating in a glass panel is not proof. Do not inv (Proof is what reduces the visitor's objection; decoration does not.)
- **LBC-40** [L] [founder] Plain description is the default caption: say what the thing is, add nothing, let the image carry it (e.g. "simple hero section page with vibrant colors"; `hero section concept`; `landing page designs`; `recent identity work`; `collection of ui eleme (Rokas, 2026-08-31, after rejecting two agent drafts.)
- **LBC-43** [L] [founder] Do not reach for a clever angle by default; naming the one strange detail you made (post-12 style) is an option, not the rule, and only works when something genuinely strange was made. If nothing is strange, describing the work plainly is the correct (Two agent drafts failed by treating the post-12 move as a rule.)
- **web.courses-and-curricula#62** [T2] One `h1` per page, no skipped heading levels, unique `<title>` and `lang` on `<html>`, landmarks (`nav`, `main`), `alt` on every image (empty for decorative). (Navigation by structure for AT and SEO.)
- **web.color-and-surfaces#13** [T2] Re-verify *every* pair in dark mode; do not assume the light verification carries over. (the same WCAG ratio is a weaker APCA contrast on dark (section 3 divergence table).)
- **web-sources.a11y-project-checklist#54** [T1] Icon buttons and links (hamburger menus, social icons, gallery controls) are large enough to activate with ease for a range of hand and stylus sizes. (WCAG 2.5.5 Target Size per the checklist (the 2.2 AA criterion is 2.5.8, 24 px minimum).)
- **WDA-24** [T1] Keep alt text short and meaningful: aim under about 150 characters, no "image of / photo of" prefix, no keyword stuffing, proper punctuation, descriptive file names as a fallback. When in doubt about a decorative-vs-informative call, add the description becaus (Long alt text causes fatigue; screen readers already announce "image".)
- **web-sources.a11y-project-checklist#27** [T1] Skip links work in Webkit: if the target is not natively focusable, add `tabindex="-1"` to it (older Webkit builds failed to move focus). (Focus must actually land at the target.)
- **web.courses-and-curricula#27** [T2] Give truncating flex children `min-width: 0`, handle empty, short, average and very long user content, and always design empty/sparse/dense/error states. (Most production layout bugs come from content extremes.)
- **AH-TY-01** [T1] Body text defaults to 17 px on touch-first app UI (iOS default) and 13 px on dense desktop/Mac-style UI; never ship body or label text below the platform minimum: 11 px (touch) / 10 px (desktop), and treat 12 px as the practical floor for anything other than c (Apple's default/minimum pair is the legibility floor Apple tests against; footnote/caption styles bottom out at 12 and 11.)
- **PT-SZ-08** [T2] Keep average line length at 45-90 characters including spaces (or 2-3 lowercase alphabets, i.e. about 52-78 characters) at every viewport width; measure it in characters per line, not in inches, ems or pixels. (Longer lines make the eye's return to the next line harder; characters per line works at any size, while physical width does not.)
- **PT-SZ-11** [T2] Do not trust the CSS `ch` unit as a proxy for "characters per line": it is the advance width of the digit zero, which is wider than the average letter in running text, so a `65ch` box fits more than 65 average characters. (The author warns that `ch` is not a useful stand-in for average characters per line.)
- **web.color-and-surfaces#15** [T2] Gate text on WCAG 2.2 AND APCA: body/secondary text >= 4.5:1 (7:1 for ink-2 targets) **and** |Lc| >= 60 (75 for the primary reading colour). Large text (>= 18pt = 24px, or >= 14pt bold = ~18.7px) may use 3:1 under WCAG. (WCAG's formula treats light-on-dark mid-greys too generously; APCA models polarity (Lc 32 for the 4.5:1 grey on `#0f0f0f`) [computed]. Mynde)

## founder

- **LHS-19** [L] [founder] Reject Baton-class output: sterile monochrome product proof with the publisher identity imposed on the fictional subject. Reject Linecheck-class output: industrial photograph + giant headline + right-side inspection panel + familiar blue CTA, because (Founder rejected both; both folders are kept as negative evidence and must not be placed in a positive reference set.)
- **LHS-04** [L] [founder] No floating pill navigation and no rounded CTA capsules by default. (Rejected defaults; nav becomes a product demo instead of information architecture.)
- **LHS-06** [L] [founder] Do not use the automatic left-copy / right-dashboard layout. (Rejected default skeleton; also listed again in the 2026-09-01 divergence note.)
- **LHS-08** [L] [founder] A nice generated image with one UI panel placed over it, treated as the complete concept, is rejected. Integrate the product UI into the composition; generated imagery is a material, not the concept. (Rejected default; Linecheck's industrial photograph + right-side inspection panel "still formed a familiar template".)
- **LHS-18** [L] [founder] Prefer a beautiful still to implementation complexity; hero concept exercises may be static. Prioritise screenshot composition, fonts, buttons, imagery and overall atmosphere. Do not add interaction merely to prove the page works. (Stated founder preference (2026-08-30).)
- **LHS-12** [L] [founder] No generic dark-neon, glow, orb, grid, grain or shader styling that has no product meaning. (Rejected default.)
- **LHS-16** [L] [founder] Avoid the Phase, Ridge 47 and Vanta failure modes: loud poster palette, oversized record graphic and novelty typography ("too experimental for the desired quality"); side rail + giant numeric device + route overlay + ticket graphic ("forced design ge (Founder rejected these in R1.)
- **LHS-02** [L] [founder] Do not use lowercase-everything branding in a fictional product's navigation and CTAs. Use normal capitalisation, readable size. (Rejected default; lowercase-everything is Larpo's own publisher voice, not a subject voice (see LBC-06).)
- **LHS-15** [L] [founder] Accepted direction Borne: calm full-bleed photography, restrained navigation, refined serif typography, quiet booking control, coherent premium atmosphere. Accepted direction Nacre: sculptural central product, spacious composition, restrained palette (Founder feedback "accepted as good" on the R1 collection (2026-08-30); positive evidence, not templates.)
- **LHS-14** [L] [founder] Before building, compare the proposed skeleton with the rejected-defaults list (LHS-01..LHS-13). If it matches one, change the structure before changing colours. After rendering ask: "does this look like a designer built a product-specific campaign f (The ledger is "a guardrail against relearning the wrong preferences".)

## color

- **web.color-and-surfaces#10** [T2] Separate *fill* accent from *text* accent. `accent` (fill) and `accent-text` (accent as text/icon on surfaces) are different tokens; `accent-text` is solved for contrast, `accent` is solved for the label on top of it. (lime, orange and amber fills have 1.2-2:1 against white; as link text they must be darkened by 0.3-0.4 L. One token cannot do both (chalk-ch)
- **web.color-and-surfaces#25** [T2] Greys that carry text stay low-chroma and share the surface hue; do not put a pure grey (`#888`) on a tinted surface. (chroma mismatch makes text look "dirty"; Impeccable lists "gray text on coloured background" as a tell and prescribes a darker tint of the s)
- **AH-CO-30** [T1] Use glass effects sparingly on custom controls and limit them to the most important functional elements. (overuse distracts from the content that glass is meant to reveal.)
- **AH-CO-02** [T1] Define every colour token in three variants: light, dark, and increased-contrast (`@media (prefers-contrast: more)`), even if you only ship one theme. (Apple wants all three so adaptive materials and accessibility settings do not break the palette.)
- **web.anti-ai-slop#3** [T2] Treat the cream ground, italic/high-contrast serif display, and terracotta/coral accent as ONE combined tell, and near-black + single neon accent as a second. Allowed only if the brief pins it; otherwise the free axis must not be spent on them. (Named by Anthropic's own skill, Impeccable ("cream-palette" rule + "calibration" paragraph), and press coverage of "Claudian sameness".)

## copy

- **AH-WR-40** [T1] Build forgiveness in: undo, cancel, back, drafts, confirmations only where loss is real. (exploring is safe when mistakes are cheap.)
- **AH-WR-24** [T1] Prefer passkeys (or platform sign-in) over passwords; if passwords stay, add two-factor; name the method on the button ("Sign in with Face ID" or "Continue with passkey"), never reference a method that is unavailable on the device; do not call it "passcode". (accurate labels prevent confusion.)
- **AH-WR-10** [T1] Use gesture verbs that match the device (tap on touch, click on pointer); adjust length for screen size and who might see the screen. (wrong verbs confuse; TVs and phones differ in distance and audience.)
- **AH-WR-33** [T1] Set expectations about capabilities and limits; provide curated example prompts; communicate that outputs may contain errors; avoid asking models for facts they cannot verify; request confirmation before significant or irreversible actions taken on someone's b (hallucinations are plausible-looking.)

## cta

- **LAI-73** [T2] [team research] Use a button for an action on the current page or application state and a link for navigation to another destination; a link may be styled as the primary call to action but its semantics must match its behaviour. (Semantics.)
- **web.landing-page-anatomy#11** [T2] On mobile pages longer than ~3 screens, use a sticky bottom CTA bar that appears after the hero CTA scrolls out of view, hides while the on-page form is in view, and respects `env(safe-area-inset-bottom)`. (Keeps the one action reachable (thumb zone) after the first CTA is gone; GoodUI lists Sticky Call To Action as a tested pattern (644 tests i)
- **LAI-39** [T2] [team research] CTA proof: label names the action and likely outcome; commitment understandable; only one primary; button/link semantics match behaviour; geometry belongs to the brand system; hover does not move the target; pressed, focus, loading and result s (Gate 9.)
- **LAI-62** [T2] [team research] Build a job-based palette: primitives then semantic roles (canvas; raised and inset surfaces; primary and secondary text; subtle and strong borders; primary action; interactive text; focus; selected; success, warning, destructive, information;  (An accent on everything stops directing attention.)
- **LAI-66** [T2] [team research] When colour may affect action, test meaningful systems (hierarchy, label, placement, surrounding contrast, perceived commitment) rather than isolated button hues; a different CTA colour may win because it is more visible in that composition, no (Test, do not mythologise.)

## hero

- **LHS-11** [L] [founder] Thin neutral monochrome UI that disappears at social-feed scale is rejected. (Baton's thin neutral UI lost hierarchy at feed size.)
- **LHS-01** [L] [founder] Do not set the headline as an oversized generic grotesk that dominates most of the frame. (Rejected default in the 2026-08-29/30 hero exercises; scale became the idea and crowded the product.)
- **ui-pedia.13-buttons#45** [T2] CTA button: urges the user to take a certain action; can technically be any button type that carries call-to-action text; must stand out from all other buttons. See hierarchy rules above for size and exclusivity. Example (p.308 figure): header "Login" as small (Turns passive into active user.)

## mobile

- **web.implementation-craft#58** [T1] Targets >= 24x24 CSS px, or smaller targets with a 24 px diameter circle (centred on target) that intersects no other target/circle; exceptions: inline in text, equivalent control exists, user-agent control, essential [verified].

## motion

- **web-sources.craft-emil-kowalski#5** [T2] Scale duration with the distance and size of the moving object: larger elements slower, longer travel longer. Exit animations can be about 20% faster than the entrance. (Perceived velocity should stay constant; a short duration on a full-screen panel feels jarring.)
- **web-sources.craft-emil-kowalski#17** [T2] Sequence the layered pieces of an entrance by importance, not uniformly: the least important element (a pill badge) only fades, the headline moves most. Stagger delays must differ per tier; uniform delays flatten hierarchy. (Motion encodes importance; uniform stagger looks artificial.)
- **web-sources.craft-emil-kowalski#21** [T2] Toast enters from translateY(100%) via a mounted-state flip and a CSS transition (`transform 400ms ease`), not a keyframe; the exit leaves in the same direction as the entrance. (Spatial consistency makes swipe-down-to-dismiss feel natural; transitions survive rapid additions.)
- **SYS-CARBON-15** [T1] Match motion to mode: productive easing (`0.2,0,0.38,0.9`) for tasks, expressive (`0.4,0.14,0.3,1`) for rare significant moments; use entrance easing for appearing, exit easing for removed, standard easing when the element stays visible or leaves but stays nea (Distance and significance should drive duration; an element that stays on screen should not use exit curves.)
- **web-sources.craft-emil-kowalski#18** [T2] Do not layer entrance animations on a panel and its children (panel slides in with a 0.28s delay, children then stagger at 0.05s steps after a 0.3s delayed start). Prefer the single-step version. (Layering adds time before the content is usable; the exercise's right answer is the one without layers.)

## product

- **LDP-02** [T2] [team research] Choose layout from the strongest evidence: interface proves value -> product dominates; transformation is emotional/physical -> art direction or photography; idea is unfamiliar -> explanatory diagram/sequence; trust is the barrier -> proof besi (The arrangement is right only when the content creates that hierarchy, not because a starter template used it.)

## spacing

- **ui-pedia.06-whitespace#1** [T2] Treat whitespace as a content-bearing design element, not leftover. Do not fill empty areas just because they are empty; defend it against "use the space for more information" requests. (Whitespace balances design features, organises content and prevents cluttered pages; under information overload users get irritated and bail)
- **ui-pedia.07-proximity#2** [T2] Use different amounts of whitespace to express group membership, including within one row. Example: put the Search field on the same line as the primary navigation but with extra whitespace to its left, so it reads as a different function even though it shares (Spacing alone can differentiate functions when type styling is identical.)
- **ui-pedia.07-proximity#8** [T2] Keep a top-aligned label very close to its own field and put a bigger gap before the next label-field pair. (Minimal spacing label-to-field makes that relationship obvious; the bigger gap after separates pairs.)
- **ui-pedia.07-proximity#12** [T2] Do not put the "skip" or opt-out option far from the main call to action. Mobile example: Kayak puts "Skip" at top-left of a dark screen while the CTA (Sign in with Apple) and "View other sign in options" sit near the bottom; users think they must sign in. (Far-away options look unrelated and invisible.)
- **ui-pedia.07-proximity#10** [T2] Group controls that belong together (Previous and Next are connected: grouping them would improve usability). (The book's suggested fix for the EDD page.)

## typography

- **AH-TY-05** [T1] Define named text roles (Large Title, Title 1-3, Headline, Body, Callout, Subhead, Footnote, Caption 1-2) as tokens that each carry size, weight and line-height together, and use roles instead of ad-hoc sizes. (one token per role keeps the scale consistent and lets the whole scale shift as a unit.)
- **AH-TY-10** [T1] Use loose leading for wide columns and long passages; use tight leading only where height is constrained (list rows), and never tight leading on three or more lines. (loose leading keeps the eye on the right line in long measures; tight three-line blocks read as a grey slab.)
- **ui-pedia.12-typography#37** [T2] Prototype and test type before production. In the prototype: (1) check type scales on a variety of devices, (2) check animations and interactions work as expected, (3) experiment with colours, white spaces and sizes for the desired result. If possible, invite  (Saves time and money; catches typographic problems early.)
- **ui-pedia.12-typography#25** [T2] Take x-height into account when setting leading: a lower x-height relative to cap height leaves more white space between lines; a larger x-height relative to cap height makes the leading look more balanced and orderly. (Perceived line gap depends on x-height, not only line-height number.)
- **ui-pedia.12-typography#22** [T2] Tighten letter spacing on larger type (headings, banners, titles). (Large type looks too loose at default spacing.)
