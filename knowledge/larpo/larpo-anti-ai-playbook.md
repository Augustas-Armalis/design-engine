---
source: larpo-knowledge-base (inbox/anti-ai-design-playbook-2026-08-28/01-07 + sources.md, playbooks/visual-deliverable-preflight.md)
chapter: Larpo anti-AI design playbook - tells, perception, type/layout, colour, nav/CTA, Tidehouse audit, gates
pages: n/a (internal team research; preflight playbook is the team's canonical entry point)
topic_tags: [larpo, anti-ai, tells, eyebrow, pill-nav, cta, lowercase, perception, typography, color, preflight, transplant-test]
status: studied
---

# Larpo anti-AI design playbook

Provenance tags: **[team research]** unless marked **[founder]**. The eyebrow finding in the Tidehouse audit is explicitly "the exact decorative taxonomy pattern the user identified" (founder-origin, cross-listed in `larpo-hero-system.md` LHS-03). Source paths relative to `/Users/augustas/dev/larpo/larpo-knowledge-base/`. The engine already holds an extended treatment of the same ground in `knowledge/web/anti-ai-slop*.md` (it cites this playbook explicitly); this file records Larpo's own wording and numbers so conflicts can be seen.

## 1. Core ideas

1. AI-looking design is not caused by one font, colour, radius or effect: it appears when too many decisions come from the same statistical default instead of brand, audience, content and action.
2. The failure pattern: empty prompt; fashionable mood instead of brand premise; assemble familiar quality signals; give all equal importance; polish before testing specificity.
3. A choice is suspicious when several hold: pasteable into another company unchanged; a generated-page default; no information, state, action, hierarchy or brand job; removing it improves clarity; it competes with product/image/offer/action; it imitates sophistication through formatting; it repeats another element's job.
4. "Familiar frame, authored deviation": first-impression research (Lindgaard, Tuch et al.) supports clarity, restrained complexity and recognisable structure, not minimalism everywhere nor a universal H1 size.
5. Do not replace one AI trope with the next trend; remove first, then identify the lost job, then solve it by copy/hierarchy/proximity/evidence before adding a component.
6. When a hero feels generic, remove eyebrow, secondary action, ornamental container, decorative labels and redundant effects first; if the remainder still does not express a real company, the missing layer is strategy or art direction, not polish.

## 2. Rules

### 2a. Tell taxonomy and replacement logic

- **RULE [LAI-01]** [team research] Count the high-signal cluster: centred or bottom-left hero stack; tiny uppercase or mono eyebrow; oversized tightly tracked sentence headline; vague support sentence; large rounded primary button + text-link secondary; floating rounded glass navigation; dark photographic or gradient background; acid, blue or purple accent; decorative grain/grid/radial light/cursor effect; later sections of equal cards or list rows; repeated reveal animation and dramatic microcopy. Any single item can be appropriate; five or more without a brand-specific reason create the tell.
  **Why** The tell is the cluster, not one component.
  **Applies to** landing page. **Check** count items in the first viewport (threshold in LAI-35). **Source** `inbox/anti-ai-design-playbook-2026-08-28/01-ai-tells-and-replacement-logic.md` "The high-signal cluster".

- **RULE [LAI-02]** [team research] Treat a choice as suspicious when several of the seven conditions (core idea 3) are true; the definition is contextual: a centred hero, pill, serif, glass layer, lowercase wordmark or giant headline can be right; the problem is reflexive combination and missing product reasoning.
  **Why** Avoids banning techniques; bans reflex.
  **Applies to** all. **Check** `visual`. **Source** `README.md` (anti-AI) "Working definition".

- **RULE [LAI-03]** [team research] Before drawing a hero write: audience; offer; change (concrete before/after); objection; proof; action (verb + object); brand premise (three traits + one productive contradiction, e.g. "disciplined, nocturnal, restorative - but not mystical"); visual thesis; familiar frame; authored deviation.
  **Why** Required design sequence.
  **Applies to** all. **Check** `DIRECTION.md` has all ten. **Source** `README.md` (anti-AI) "Required design sequence".

- **RULE [LAI-04]** [team research] When a hero feels generic do not add a new fashionable object; first remove the eyebrow, secondary action, ornamental container, decorative labels and redundant effects.
  **Why** Default posture.
  **Applies to** landing page. **Check** n/a (process). **Source** `README.md` (anti-AI) "Default posture".

- **RULE [LAI-05]** [team research] Keep a tracked uppercase/mono eyebrow only when it identifies a real taxonomy, status, date, edition, location or sequence, that information would be useful without the styling, and the same label system is used consistently. Otherwise remove it and let the heading establish hierarchy, write a natural-language context line, integrate the category into the headline, or use placement/scale instead.
  **Why** It creates the appearance of hierarchy after the fact and adds reading friction.
  **Applies to** landing page, hero concept stills. **Check** uppercase element <= 13px above the H1. **Source** `01-ai-tells-and-replacement-logic.md` s1.

- **RULE [LAI-06]** [team research] Do not enlarge a sentence headline until it fills most of the viewport with extreme tracking and forced breaks. Keep it only when language is the brand artifact, the words deserve the stage, letterforms and breaks were composed, and the hero stays balanced at intermediate and narrow widths. Better: medium display scale with image/grid/whitespace leading; one word or typographic detail carrying emphasis; a compact editorial title tied to evidence; reveal scale later.
  **Why** Scale becomes the idea; it competes with the image and pushes support and action into the margins.
  **Applies to** landing page, hero concept stills. **Check** H1 size vs viewport (LAI-52). **Source** `01-ai-tells-and-replacement-logic.md` s2.

- **RULE [LAI-07]** [team research] Do not default to a floating pill dock (centred glass capsule with logo, segmented nav, white or accent CTA). Keep it only when floating solves a real spatial/persistent-tool need, the site has few destinations and the geometry belongs to the identity, the background makes translucency meaningful, and mobile stays clear. Better: edge-aligned header on the page grid; brand-specific masthead; quiet transparent header with no outer shell; conventional header distinguished by type, spacing or content.
  **Why** The nav becomes a visual product demo; stacked edge treatments say nothing about the brand.
  **Applies to** landing page, hero concept stills. **Check** header container `border-radius` >= 999px or position detached with blur. **Source** `01-ai-tells-and-replacement-logic.md` s3.

- **RULE [LAI-08]** [team research] Do not build a "designed-to-look-designed" CTA (wide rounded rectangle with inner arrow chip, liquid fill, magnetic hover, rotating arrow). Keep inner structure only if it communicates a real state or split action, motion explains direction/progress, and the target stays stable. Better: a plain well-proportioned solid control with specific copy; a typographic link for low commitment; a brand-derived shape used consistently; a familiar button with a distinctive pressed/focus/material response.
  **Why** Too many parts for a simple action; it performs "premium" instead of building confidence.
  **Applies to** landing page, hero concept stills. **Check** count of decorative behaviours on CTA <= 1; target does not move on hover. **Source** `01-ai-tells-and-replacement-logic.md` s4.

- **RULE [LAI-09]** [team research] Lowercase as borrowed personality: when wordmark, nav, buttons, headings and body are all lowercase there is no contrast between brand voice and functional language. Keep it only when the wordmark is intentionally drawn that way, the tone supports intimacy, and functional labels still follow coherent casing; otherwise preserve sentence/title case in nav and actions, reserve lowercase for the wordmark or one expressive role, use wording not casing for warmth. (Note: this is the exact voice Larpo's own site uses; see `larpo-brand-and-constraints.md` LBC-06 and conflict C2.)
  **Why** All-lowercase can feel affected on a serious or physical service.
  **Applies to** subject-layer concepts and client work. **Check** lowercase-initial share of nav/button labels (D-TYPE-6-style). **Source** `01-ai-tells-and-replacement-logic.md` s5; `05-navigation-buttons-and-actions.md` "Casing and tone".

- **RULE [LAI-10]** [team research] Do not add decorative technicality (mono labels, coordinates, rotated side notes, indices, temperature readouts, grids, status dots) to imply precision. Keep only when the data is real and decision-relevant, comes from the product's operating environment, and the user can act on or interpret it.
  **Why** Borrows credibility from measurement systems without supplying measurement.
  **Applies to** landing page, hero concept stills. **Check** each label maps to a data field. **Source** `01-ai-tells-and-replacement-logic.md` s6.

- **RULE [LAI-11]** [team research] Atmosphere stacking: allow one primary atmospheric device and at most one quiet supporting material. If the photograph already establishes the world, effects should mostly protect legibility and motion continuity.
  **Why** Photograph + dark grade + noise + glow + blend + parallax + cursor lens + loader means every layer says "mood" and none has a job.
  **Applies to** landing page. **Check** count of atmospheric layers <= 2. **Source** `01-ai-tells-and-replacement-logic.md` s7.

- **RULE [LAI-12]** [team research] Do not default to the template waterfall (hero, logo strip, three features, product card, metrics, testimonials, pricing, FAQ, final CTA). Map the page to six visitor questions: what is this? is it for my situation? how does it work? why should I believe it? what does it cost or require? what happens if I act? Include only the sections needed.
  **Why** Sequence should resolve uncertainty, not mirror a theme demo.
  **Applies to** landing page. **Check** section list mapped to questions. **Source** `01-ai-tells-and-replacement-logic.md` s8.

- **RULE [LAI-13]** [team research] Replacement order: remove the suspect element; identify the lost job if any; try to solve it via copy, hierarchy, proximity or real evidence; add a component or effect only if a job remains; adapt to the brand's type, shape, material and motion language. Removing a pill eyebrow and adding a handwritten annotation is not authorship; removing an orb and adding a WebGL blob is not originality.
  **Why** The replacement trap.
  **Applies to** all. **Check** n/a (process). **Source** `01-ai-tells-and-replacement-logic.md` "The replacement trap".

### 2b. Perception and hero psychology

- **RULE [LAI-14]** [team research] First viewport = familiar frame (recognisable logo position, usable navigation, readable message, obvious action) + one authored deviation (brand-specific break in composition, visual evidence, type, material or interaction). If everything deviates the visitor decodes the interface; if nothing does the page is forgettable.
  **Why** Low complexity and high prototypicality scored well in first-impression studies.
  **Applies to** landing page. **Check** `visual`. **Source** `02-perception-and-hero-psychology.md`.

- **RULE [LAI-15]** [team research] Decide the single preattentive focal point (product state, human/physical subject, headline, result/proof, or interactive utility); every other high-contrast object must support or yield. A giant headline, bright CTA, acid eyebrow, luminous nav and moving cursor effect cannot all be primary.
  **Why** Contrast, scale, position, colour, edge and movement register before reading.
  **Applies to** all. **Check** squint test. **Source** `02-perception-and-hero-psychology.md` "One preattentive focal point".

- **RULE [LAI-16]** [team research] Group in this order: proximity; alignment; shared type or colour; divider; container.
  **Why** Generated pages jump to containers and pills because they are easy to code.
  **Applies to** all. **Check** n/a (process). **Source** `02-perception-and-hero-psychology.md` "Hierarchy should reduce reading".

- **RULE [LAI-17]** [team research] Ask three separate questions of any CTA or hero: can they see it? can they understand it? do they have a reason to believe and act? Do not solve the third by increasing the answer to the first (attention is not persuasion).
  **Why** Scale, motion, saturation attract attention but do not create trust.
  **Applies to** landing page. **Check** `visual`. **Source** `02-perception-and-hero-psychology.md` "Attention is not persuasion".

- **RULE [LAI-18]** [team research] Integrate message, evidence and image into one composition; do not make the real offer look like a banner pasted over a background or isolate important information inside flashy ornamental treatments.
  **Why** Banner blindness.
  **Applies to** landing page. **Check** `visual`. **Source** `02-perception-and-hero-psychology.md`.

- **RULE [LAI-19]** [team research] Present one dominant next step; a secondary path only for a meaningfully different visitor state (e.g. "Book a visit" vs "View the space"); keep the action close to the promise or object it affects.
  **Why** Two equally styled buttons expose an unresolved priority.
  **Applies to** landing page. **Check** primary CTA count 1; secondary visually weaker. **Source** `02-perception-and-hero-psychology.md` "Choice and action".

- **RULE [LAI-20]** [team research] A hero reduces to: identity; specific promise or proposition; one line of mechanism or scope; one action; one piece of visual or factual evidence. Eyebrows, secondary actions, side labels, social proof, scroll cues and atmospheric effects begin absent.
  **Why** Minimum truthful argument.
  **Applies to** landing page. **Check** element count. **Source** `02-perception-and-hero-psychology.md`.

- **RULE [LAI-21]** [team research] Emotion without theatre: write the specific desire with a credible service and time ("Swim, sauna, and recover after the last public session") instead of performative fragments ("Keep the night. Meet us after dark."). Emotion comes from subject, stakes, language, rhythm, cultural association and sensory specificity, not poetic fragments, glows or slow reveals.
  **Why** The first performs a mood; the second gives the mood a service.
  **Applies to** copy. **Check** copy contains a concrete noun, time or number; `visual`. **Source** `02-perception-and-hero-psychology.md`; `06-tidehouse-audit.md`.

### 2c. Preflight and critique gates (Larpo's canonical `visual-deliverable-preflight`)

- **RULE [LAI-30]** [team research] No blank-prompt design: do not open an editor until audience, offer, action, objection, proof, brand premise, visual thesis, actual copy and asset plan are written. A fictional product still needs coherent operating facts first.
  **Why** The 2026-08-29 miss was a fictional SaaS hero built in one pass with no file in the KB opened first.
  **Applies to** all visual deliverables. **Check** `DIRECTION.md` complete before code. **Source** `playbooks/visual-deliverable-preflight.md` Gate 1; `07-preflight-and-critique.md` Gate 1.

- **RULE [LAI-31]** [team research] Default-free first sketch: the first structural sketch contains no eyebrow, pill nav, secondary CTA, glass, gradient/glow, card grid, grain, entrance animation, cursor effect or decorative mono label; add any back only with a written reason. Sketch three different dominant geometries before coding.
  **Why** Defaults enter through the first sketch.
  **Applies to** all visual deliverables. **Check** first render lacks the listed items. **Source** `playbooks/visual-deliverable-preflight.md` Gate 2; `07-preflight-and-critique.md` Gate 2.

- **RULE [LAI-32]** [team research] Name one authored deviation in a sentence specific enough that a different product could not reuse it unchanged. Weak: "Large type over immersive photography." Strong: "Availability and temperature are composed like the club's physical lane board, crossing the underwater photograph at the pool's real horizon." "Large type on a dark gradient" is not a move.
  **Why** Gate 3.
  **Applies to** all visual deliverables. **Check** sentence in `DIRECTION.md`. **Source** `playbooks/visual-deliverable-preflight.md` Gate 3.

- **RULE [LAI-33]** [team research] Removal test: for each decorative or unusual element name its job, remove it mentally, identify what meaning/hierarchy/state/action/identity is lost; if nothing is lost remove it; if something is lost solve the job with the smallest existing means.
  **Why** Gate 6 of the 14-gate critique.
  **Applies to** all. **Check** list of elements with jobs. **Source** `07-preflight-and-critique.md` Gate 6.

- **RULE [LAI-34]** [team research] Transplant test: replace the company name and hero copy with an unrelated startup; circle every element that still works perfectly; those are infrastructure or defaults, not identity. The design needs at least one coherent system of choices that fails this transplant. If every choice still makes equal sense, the design carries no identity (it may remain as infrastructure but cannot count as the authored idea).
  **Why** Gate 5 (canonical) / Gate 12 (research).
  **Applies to** all. **Check** DOM-mutation screenshot comparison. **Source** `playbooks/visual-deliverable-preflight.md` Gate 5; `01-ai-tells-and-replacement-logic.md` "The transplant test"; `07-preflight-and-critique.md` Gate 12.

- **RULE [LAI-35]** [team research] AI-cluster count in the first viewport: tracked uppercase eyebrow; oversized sentence headline; extreme negative tracking; lowercase-everything voice; floating pill dock; nested rounded nav group; white or accent CTA capsule; arrow chip inside CTA; dark plus neon palette; photo + heavy grade + grain; rotated side label; decorative mono metadata; two CTAs by reflex; cursor lens or blob; loader before a simple page; generic poetic fragments (16 items). Three demand review; five or more require a structural reset unless the brief explicitly justifies the cluster. Diagnostic only, never a number to publish.
  **Why** Gate 4 (canonical preflight) / Gate 5 (research).
  **Applies to** all visual deliverables. **Check** count <= 2 to pass; 3-4 review; >= 5 reset. **Source** `playbooks/visual-deliverable-preflight.md` Gate 4; `07-preflight-and-critique.md` Gate 5.

- **RULE [LAI-36]** [team research] Focal competition: list every high-salience element (largest type, brightest colour, highest-contrast surface, face or human subject, moving object, primary action, nav shell, glow/reflection); choose one first and one second focal point and reduce the rest until the squint test gives that order.
  **Why** Gate 4 of the research list.
  **Applies to** all. **Check** squint/grayscale. **Source** `07-preflight-and-critique.md` Gate 4.

- **RULE [LAI-37]** [team research] Typography proof: typeface matches the written brand voice; headline shape composed at all target widths; H1 does not win over evidence accidentally; body and action copy comfortably readable; casing has semantic rules; tracking is optical not a trendy preset; line heights accommodate diacritics and zoom; font loading does not shift disruptively.
  **Why** Gate 7.
  **Applies to** all. **Check** `check.mjs` type section. **Source** `07-preflight-and-critique.md` Gate 7.

- **RULE [LAI-38]** [team research] Navigation proof: labels predict destinations; header aligns to the page system; current state exists where needed; primary service action distinct but not ornamental theatre; no nested shell without a real grouping job; mobile nav deliberately composed; focus visible across every background.
  **Why** Gate 8.
  **Applies to** landing page. **Check** DOM audit. **Source** `07-preflight-and-critique.md` Gate 8.

- **RULE [LAI-39]** [team research] CTA proof: label names the action and likely outcome; commitment understandable; only one primary; button/link semantics match behaviour; geometry belongs to the brand system; hover does not move the target; pressed, focus, loading and result states exist when relevant.
  **Why** Gate 9.
  **Applies to** landing page. **Check** DOM + state audit. **Source** `07-preflight-and-critique.md` Gate 9.

- **RULE [LAI-40]** [team research] Colour proof: palette explained through brand, category, material and context; accent has a limited job; text and controls meet contrast; state not encoded by colour alone; dark mode has tonal hierarchy beyond black plus neon; photography and UI colours coexist intentionally.
  **Why** Gate 10.
  **Applies to** all. **Check** contrast + role table. **Source** `07-preflight-and-critique.md` Gate 10.

- **RULE [LAI-41]** [team research] Effect budget: classify every effect as evidence, hierarchy, state, spatial continuity or atmosphere; allow one dominant atmospheric technique per viewport; if several effects occupy one class keep the strongest.
  **Why** Gate 11.
  **Applies to** landing page. **Check** list classified. **Source** `07-preflight-and-critique.md` Gate 11.

- **RULE [LAI-42]** [team research] Ten-second critique: show the screenshot without explanation for ten seconds and ask what company/category it is, what you can do, what you remember visually, what felt generic or performative, what looked clickable; do not defend the concept before hearing the answers.
  **Why** Gate 13.
  **Applies to** all. **Check** n/a (process). **Source** `07-preflight-and-critique.md` Gate 13.

- **RULE [LAI-43]** [team research] Rendered acceptance: inspect real output at desktop, tablet, mobile widths: first paint before animation, image and font loading, heading wrapping, browser chrome and safe areas, keyboard order and focus, touch targets, hover/active, reduced motion, 200% zoom and text spacing, slow device/network, contrast across changing imagery, actual destinations. Inspect at 100 percent for craft and 25 percent for social-feed hierarchy; confirm the idea survives platform cropping and read every number back against sample-data coherence.
  **Why** Gate 14 / canonical Gate 7.
  **Applies to** all. **Check** screenshots at the listed widths. **Source** `07-preflight-and-critique.md` Gate 14; `playbooks/visual-deliverable-preflight.md` Gate 7.

- **RULE [LAI-44]** [team research] Critique in precise, correctable statements ("The 142px H1 covers the photographic subject and forces the action into the bottom margin"; "The accent is used for five different roles, so it no longer identifies the primary action"). Avoid "make it pop", "more premium", "more modern", "it needs wow", "the font is bad".
  **Why** Specific diagnosis prevents the next revision becoming a different pile of trends.
  **Applies to** process. **Check** n/a. **Source** `07-preflight-and-critique.md` "Critique language".

- **RULE [LAI-45]** [team research] Sample-data coherence (canonical Gate 6): names belong to one organisation; dates run in a plausible sequence; totals add up; statuses agree across views; IDs use one format; the visual answers what is this, what changed, what action is available, how it supports the claim; label `sample workflow` or `demo data` when not a real environment.
  **Why** The 2026-08-29 mock claimed 47 alerts collapsed into one incident while listing 49 silenced items.
  **Applies to** hero concept stills. **Check** reconcile totals. **Source** `playbooks/visual-deliverable-preflight.md` Gate 6.

- **RULE [LAI-46]** [team research] Handover must state plainly: (1) which constraints the piece follows and which it knowingly departs from; (2) every invented number, logo or endorsement in the frame; (3) the Gate 4 cluster count and the Gate 3 authored move; (4) what has not been verified. Handing over a visual without this list is incomplete delivery.
  **Why** Escalation checklist.
  **Applies to** all deliverables. **Check** present in delivery message. **Source** `playbooks/visual-deliverable-preflight.md` "Escalation checklist".

- **RULE [LAI-47]** [team research] Gate 0: before styling read `context/constraints.md`, decide for each layer whether it belongs to the publisher or the subject, and read `context/brand.md` for the visual direction, motion budget and reference set ("ingredients, not templates"). The playbook may read, draft, render, critique and propose directions; it must escalate any departure from `context/constraints.md`, publishing/posting to a Larpo surface, and invented numbers/logos/endorsements.
  **Why** The playbook triggers on any visual or public-facing output (page, hero, section, mockup, wireframe, component, social image, banner, screenshot, concept piece, copy for a larpo surface; any edit to .html .css .svg .jsx .tsx .astro .vue).
  **Applies to** all visual deliverables. **Check** n/a (process). **Source** `playbooks/visual-deliverable-preflight.md` Trigger, Gate 0.

### 2d. Typography, spacing and layout

- **RULE [LAI-50]** [team research] Write the desired voice before browsing fonts (institutional or personal; engineered or crafted; contemporary or historical; restrained or expressive; warm or severe; familiar or specialist), then evaluate letterform personality, readability at real sizes, display behaviour at real headline size, family breadth/axes, italics/numerals/special characters, Lithuanian and required language coverage, licensing, performance, and whether the face is already a default signal in the category. Research supports typeface-personality associations but no universal "proper font".
  **Why** Brand congruence.
  **Applies to** all. **Check** voice sentence in `DIRECTION.md`. **Source** `03-typography-spacing-and-layout.md`.

- **RULE [LAI-51]** [team research] Do not let one trendy family be the whole identity (wordmark, display, body, labels, metadata and buttons all the same popular face with only size changes). Create voice via intentional width/optical size/grade/weight; contrast through scale and measure not extreme tracking; one specialist role (display cut or editorial serif); custom lettering for the wordmark with familiar interface text; numerals/punctuation/capitalisation as signature.
  **Why** A neutral grotesk is excellent infrastructure but generic when it is everything.
  **Applies to** all. **Check** role/family table. **Source** `03-typography-spacing-and-layout.md` "Do not use one trendy family".

- **RULE [LAI-52]** [team research] Headline size is relational (no magic `vw` value): the H1 should not overpower the main evidence unless language is the evidence; support text and action stay comfortably visible; the title keeps a stable shape across common widths; forced breaks are intentional and tested with real copy; tight tracking must not deform the face or cause collisions; never six mobile lines merely because desktop scale was fluid. For a photographic lifestyle hero start with a medium display range; for an editorial statement hero the title can dominate if wording and typesetting are unusually strong.
  **Why** Gates for headline size.
  **Applies to** landing page. **Check** H1 box vs evidence box area; H1 lines at 390 px <= 5. **Source** `03-typography-spacing-and-layout.md` "Headline size is relational".

- **RULE [LAI-53]** [team research] Define type roles (display, page title, section title, lead, body, functional label, metadata), each with family, weight, size range, line height, tracking, measure, casing and allowed contexts; a visible difference between roles should come from at least two properties, not a two-pixel size change.
  **Why** Role system.
  **Applies to** all. **Check** role table. **Source** `03-typography-spacing-and-layout.md` "A practical type system".

- **RULE [LAI-54]** [team research] Casing: sentence case for most actions and navigation unless the brand has a reason; reserve all caps for short real metadata whose shape benefits scanning; never combine all caps + mono + tiny size + wide tracking as a universal "premium" label; reserve lowercase for a deliberate verbal or identity role; keep capitalisation grammatically consistent.
  **Why** Casing carries hierarchy.
  **Applies to** all (but see LBC-06 for Larpo's own surfaces). **Check** casing class per label group. **Source** `03-typography-spacing-and-layout.md` "Casing rules".

- **RULE [LAI-55]** [team research] Text measure and rhythm: roughly 45-75 characters for sustained Latin text; short hero support may be narrower. Avoid long centred paragraphs, `text-wrap: balance` on every paragraph, aggressive negative tracking on text fonts, body text made faint to look refined, line heights chosen without checking ascenders/descenders/diacritics, fixed heights that break under increased text spacing.
  **Why** Readability.
  **Applies to** all. **Check** ch count; fixed-height containers with text. **Source** `03-typography-spacing-and-layout.md` "Text measure and rhythm".

- **RULE [LAI-56]** [team research] Assign spacing values to relationships (glyph/icon detail; control interior; label-to-value; heading-to-support; support-to-action; module-to-module; section transition; compositional stage); between-group space at least about twice within-group space. A base-unit grid (Carbon-style) provides rhythm and consistency, not "every margin divisible by eight": use a small coherent scale, distinguish component from layout spacing, keep keylines, make deliberate optical exceptions, change scale steps responsively rather than shrinking proportionally.
  **Why** Spacing is relational grammar.
  **Applies to** all. **Check** gap ratios. **Source** `03-typography-spacing-and-layout.md`.

- **RULE [LAI-57]** [team research] Layout: define page grid and gutters, content measure, image safe area, focal object, reading path, alignment anchors, overlap rules and mobile recomposition first, then component styling; add surfaces only where a boundary communicates something. Asymmetry needs a counterweight (image mass, whitespace, colour, text density, alignment) and a clear reading start.
  **Why** Generated pages choose cards, pills and shadows first.
  **Applies to** all. **Check** `visual`. **Source** `03-typography-spacing-and-layout.md` "Layout", "Asymmetry with responsibility".

- **RULE [LAI-58]** [team research] Mobile is a new composition: decide the focal point, whether the image crop still contains the subject, whether nav becomes a menu/short list/contextual action, whether the headline needs new breaks or a smaller role, which secondary elements disappear, and how the first action stays reachable without covering content. Optical QA at 320, 375, 768, 1024, 1440, a wide desktop and 200% text zoom: cap/baseline alignment, mathematically-but-not-optically centred icons, widows and weak final headline lines, over-tight rounded letters, nav weight consistency, text measure over changing imagery, vertical rhythm after font load.
  **Why** Do not stack the desktop DOM.
  **Applies to** landing page, mobile. **Check** screenshots at the listed widths. **Source** `03-typography-spacing-and-layout.md` "Mobile is a new composition", "Optical QA".

### 2e. Colour without folklore

- **RULE [LAI-60]** [team research] Reject one-word colour recipes ("blue means trust", "red means urgency", "green means growth", "black means luxury"). Choose colour through five questions: category expectation; brand stance (align or contrast); functional hierarchy; environment (light, display, photography, print, materials); culture and audience.
  **Why** Meaning depends on context, culture, category, object, surrounding colours, lightness, chroma and learned associations.
  **Applies to** all. **Check** rationale in `DIRECTION.md`. **Source** `04-color-psychology-without-folklore.md`.

- **RULE [LAI-61]** [team research] Ensure contrast before emotion: readable text, identifiable controls, distinguishable states, usable focus indicators; check the actual rendered combination (weight, size, alpha compositing, gradient position, image variation, hover/focus/active/disabled, light/dark); do not use colour as the only state cue.
  **Why** Nuance cannot compensate for faint text.
  **Applies to** all. **Check** sampled contrast >= 4.5:1 / 3:1. **Source** `04-color-psychology-without-folklore.md`.

- **RULE [LAI-62]** [team research] Build a job-based palette: primitives then semantic roles (canvas; raised and inset surfaces; primary and secondary text; subtle and strong borders; primary action; interactive text; focus; selected; success, warning, destructive, information; expressive image/illustration colours). The brand accent need not fill every interactive role.
  **Why** An accent on everything stops directing attention.
  **Applies to** all. **Check** accent-hue element count. **Source** `04-color-psychology-without-folklore.md`.

- **RULE [LAI-63]** [team research] Treat chroma as an attention budget: allocate saturation to the most important state or action and keep surrounding chroma lower; the same saturated accent across many objects flattens priority and yields a generic "dark plus neon" scheme.
  **Why** Highly saturated colour is preattentive.
  **Applies to** all. **Check** share of saturated pixels near non-primary elements. **Source** `04-color-psychology-without-folklore.md`.

- **RULE [LAI-64]** [team research] A convincing dark palette needs tonal separation between canvas and surfaces, a readable text hierarchy, borders/shadows appropriate to dark adaptation, image grades that preserve subject detail, a focus colour that survives varied backgrounds, accents whose chroma does not vibrate against near-black, and tested disabled/secondary states; for hospitality, culture or wellness neon-on-black suggests nightlife, gaming, crypto or futuristic software unless the physical brand earns it.
  **Why** Dark mode is not black plus acid.
  **Applies to** all. **Check** contrast of tiers. **Source** `04-color-psychology-without-folklore.md`.

- **RULE [LAI-65]** [team research] Get palette distinctiveness from relationships, not rare hex values: unusual dominant-to-accent proportion; subject-tied temperature contrast; material-derived neutrals; photography and UI sharing a controlled grade; one signature interaction colour used sparingly; a palette that changes meaningfully across sections or states. A better brief: "The audience knows public pools through turquoise tile and clinical blue. Use mineral gray and off-white for institutional calm, then reserve a muted copper for heat and booking states."
  **Why** Distinctiveness through relationships.
  **Applies to** all. **Check** `visual`. **Source** `04-color-psychology-without-folklore.md`.

- **RULE [LAI-66]** [team research] When colour may affect action, test meaningful systems (hierarchy, label, placement, surrounding contrast, perceived commitment) rather than isolated button hues; a different CTA colour may win because it is more visible in that composition, not because of a universal effect.
  **Why** Test, do not mythologise.
  **Applies to** landing page. **Check** n/a. **Source** `04-color-psychology-without-folklore.md`.

### 2f. Navigation, buttons and actions

- **RULE [LAI-70]** [team research] The primary navigation answers: where am I; what major destinations exist; which matters now; how do I reach the main action. Use descriptive labels with strong information scent; avoid "Explore", "Discover", poetic nouns when a concrete destination exists.
  **Why** Navigation is information architecture, not hero decoration.
  **Applies to** landing page. **Check** labels predict destinations. **Source** `05-navigation-buttons-and-actions.md`.

- **RULE [LAI-71]** [team research] Header composition: align to the hero grid unless a deliberate full-bleed masthead is the concept; wordmark, destinations and action have visibly different roles; do not wrap the nav in a capsule by default; no segmented-control shell inside another nav shell unless links behave as a stateful local control; stable active state; translucency only if the header crosses changing content; clear focus, contrast and target size on every background.
  **Why** Header rules.
  **Applies to** landing page. **Check** DOM audit. **Source** `05-navigation-buttons-and-actions.md`.

- **RULE [LAI-72]** [team research] Functional navigation usually uses sentence or title case; all-lowercase nav combined with lowercase logo, lowercase CTA and soft rounded containers becomes a familiar generated-brand package.
  **Why** Casing and tone.
  **Applies to** nav. **Check** casing class. **Source** `05-navigation-buttons-and-actions.md` "Casing and tone".

- **RULE [LAI-73]** [team research] Use a button for an action on the current page or application state and a link for navigation to another destination; a link may be styled as the primary call to action but its semantics must match its behaviour.
  **Why** Semantics.
  **Applies to** all. **Check** `a` vs `button` audit. **Source** `05-navigation-buttons-and-actions.md`.

- **RULE [LAI-74]** [team research] CTA copy: concrete verb + object ("View availability", "Book a night swim", "See the session timetable", "Request membership details", "Watch the workflow", "Compare plans"); avoid "Get started", "Learn more", "Explore", "Continue", "Join now" when the commitment is specific; short only when it stays predictive.
  **Why** Predictability of outcome.
  **Applies to** landing page. **Check** label not in generic list. **Source** `05-navigation-buttons-and-actions.md` "CTA copy".

- **RULE [LAI-75]** [team research] CTA hierarchy: one control represents the expected action; secondary actions are lower emphasis and serve a different need; do not give every nav item, hero action, sticky action and card action the same accent.
  **Why** Similar appearance communicates similar importance.
  **Applies to** landing page. **Check** accent-filled controls per viewport <= 1. **Source** `05-navigation-buttons-and-actions.md` "CTA hierarchy".

- **RULE [LAI-76]** [team research] Button geometry belongs to the system: corner logic related to fields, cards, imagery and physical artifacts; padding that centres the label; icon scale and gap suited to the font; expands for longer copy; touch targets met without looking inflated; border, fill and shadow do not all define the same edge. A pill suits a compact action, filter or strongly rounded identity, not as the automatic premium shape.
  **Why** Geometry coherence.
  **Applies to** all. **Check** radius family; target size >= 24 px desktop / 44 px mobile. **Source** `05-navigation-buttons-and-actions.md` "Button geometry".

- **RULE [LAI-77]** [team research] An arrow should clarify direction, external navigation, progression or motion; do not add an arrow chip only to look designed; keep icons stable on hover (small translation/material response may reinforce direction; rotation and magnetic movement only if physical behaviour supports the brand).
  **Why** Ornamental icons.
  **Applies to** all. **Check** icon + label redundancy; hover transform. **Source** `05-navigation-buttons-and-actions.md` "Icons and arrows".

- **RULE [LAI-78]** [team research] Every primary action needs default; hover where applicable; visible keyboard focus; active/pressed; disabled only when necessary and explained; loading/pending if not immediate; success/error if state changes. Animation must not move the click target away from the pointer; the static control must already look usable. Place the CTA close to the promise, product state, form or content it affects. Hero-action test: cover styling and read only label, destination and nearby copy; can the visitor predict what happens, commitment level, whether money/signup/booking/contact is involved, and why it follows from the promise?
  **Why** State and proximity.
  **Applies to** all. **Check** state audit. **Source** `05-navigation-buttons-and-actions.md`.

### 2g. Tidehouse audit (worked example, headline numbers)

- **RULE [LAI-80]** [team research] When the headline reaches 142 px (`9.4vw`, line-height .82, tracking -.083em) and occupies most of the lower-left, it overpowers the photographic subject: reduce to a medium display role so the subject leads. The audit's single highest-impact correction: delete the fashionable UI wrapper around the photograph and rebuild the first viewport from real venue facts; rebuild order: define venue facts and service model; rewrite hero and CTA with specific language; remove eyebrow, side note, dock shell, secondary CTA, cursor lens and liquid button; reduce H1 until the swimmer is first or co-equal focal point; redesign header as venue IA; establish a physical material and signage system; add at most one authored interaction; test desktop, intermediate, mobile, keyboard, reduced motion.
  **Why** Tidehouse audit P1 findings (H1 142 px; nested pill nav; 11 px mono uppercase eyebrow tracked .15em; weak action language "Book a night" vs "Request access" vs "Try a single night").
  **Applies to** landing page. **Check** H1 height vs subject. **Source** `06-tidehouse-audit.md`.

## 3. Numbers & scales

| Item | Value | Source |
|---|---|---|
| AI-cluster threshold | 3 matches demand review; 5+ structural reset (16-item list) | preflight Gate 4 |
| Tidehouse H1 | 142 px, `9.4vw`, line-height .82, tracking -.083em | 06-tidehouse-audit |
| Tidehouse eyebrow | 11 px mono uppercase, tracking .15em, accent `#c7ff36` | 06-tidehouse-audit |
| Tidehouse CTA | 210 x 62 px glass control with arrow chip, radial fill, rotating arrow, magnetic motion | 06-tidehouse-audit |
| Measure | 45-75 characters (sustained Latin text) | 03 |
| Spacing contrast | between-group at least about 2x within-group | 03 |
| Optical QA widths | 320, 375, 768, 1024, 1440, wide desktop, 200% text zoom | 03 |
| Feed review | 100 percent and 25 percent | preflight Gate 7 |
| Critique gates | 14 (research list) / 8 (canonical preflight, Gates 0-7) | 07 / playbook |
| First-impression research | Lindgaard et al. "50 milliseconds"; Tuch et al. (visual complexity, prototypicality); Reinecke et al. single fixation | 02, sources.md |

## 4. Dos and Don'ts

| Don't | Do |
|---|---|
| "NOCTURNAL BATHING CLUB" in 11 px accent mono | "useful natural language such as location and public hours" |
| "The city sleeps. We swim." | "specify session times, pool length, temperature sequence, neighborhood, or membership model" |
| nested rounded dock + white CTA capsule | grid-aligned masthead; brand-specific booking action |
| accent on kicker, active rows, selection, focus and effects | reserve chroma for booking or a meaningful temperature/state |
| "Large type over immersive photography" | the lane-board authored move (LAI-32) |

## 5. Exceptions & judgement calls

- The playbook says "These patterns are not forbidden. They become weak when they appear by reflex"; the founder ledger (LHS-01..LHS-14) turns several of them into outright rejections for fictional hero concepts.
- LAI-09 / LAI-72 call lowercase-everything a tell while Larpo's own brand mandates lowercase for its own public copy (LBC-06). The resolution Larpo itself records is the publisher/subject split: lowercase is a house voice on larpo-owned surfaces, not a subject voice. [engine note]
- Gate numbering differs between the research list (14 gates, `07-preflight-and-critique.md`) and the canonical preflight playbook (Gates 0-7); the canonical playbook merges and reorders them. [engine note]
- Source acknowledges that color/first-impression research "does not determine a universal H1 size, conversion layout, font pairing, or CTA color".

## 6. Figures worth keeping

None in the source (the audited `hero-post-tidehouse-r1/` artifact is not in the Larpo KB).

## 7. Open questions

- The Tidehouse artifact files named in the audit are absent from the KB, so the numbers (142 px etc.) cannot be re-verified.
- `sources.md` lists NN/g, Baymard, W3C, Carbon and academic sources; not re-read here.
