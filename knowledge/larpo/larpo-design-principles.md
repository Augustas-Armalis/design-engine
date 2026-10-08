---
source: larpo-knowledge-base (inbox/design-intelligence-2026-08-28, playbooks/visual-deliverable-preflight.md)
chapter: Larpo design principles - the team's own operating doctrine for non-generic sites
pages: n/a (internal team research; status in source = "research capture, not yet canonical")
topic_tags: [larpo, principles, thesis, composition, typography, spacing, color, motion, proof, originality, qa]
status: studied
---

# Larpo design principles (team doctrine)

Provenance tags on every rule: **[founder]** = recorded as direct founder feedback or a founder decision; **[team research]** = Larpo's own accumulated research/doctrine (written by the team's agents and reviewed in their KB, still `inbox/` status). All paths are relative to `/Users/augustas/dev/larpo/larpo-knowledge-base/`. Numbers are copied exactly. Where a rule conflicts with an existing engine note, see `overlap-and-conflicts.md`.

## 1. Core ideas

1. A design begins with a one-sentence **thesis**, not a style word ("minimal", "premium", "futuristic" are not concepts until translated into composition, material, type, imagery, motion, restraint).
2. **Content determines composition.** Text-left / screenshot-right is valid only when the content creates that hierarchy.
3. **One dominant move per viewport.** Squint test: primary, secondary, tertiary order must survive blur.
4. **Typography is architecture**; spacing expresses relationship (tight in-group, visibly larger between groups); color has jobs; depth describes physics; motion explains change; effects need a narrative job.
5. **Proof beats decoration.** SaaS visuals show a believable workflow, state transition or input/output pair, never invented logos, testimonials or metrics.
6. **Originality is synthesis**: decompose references into transferable principles, keep a reference ledger, never clone a signature composition.
7. The AI-look defaults are "not forbidden; they become weak when they appear by reflex rather than necessity".
8. Acceptance is **rendered behaviour** (real copy, real widths, states, reduced motion), not "the code compiles".
9. The final question is not "does it look modern?" but "does every decision make this specific offer clearer, more credible, more memorable, and easier to act on?"

## 2. Rules

- **RULE [LDP-01]** [team research] Before choosing any font, gradient, shader or component library, write one thesis sentence naming the audience, the change the product creates, and the visual behaviour that supports the claim. Weak: "modern AI SaaS, dark with gradients." Strong: "Make operational complexity feel inspectable: a calm editorial shell around one live product workflow that progressively reveals cause and effect."
  **Why** A style word is not a concept; without a thesis every later choice is drawn from the statistical default.
  **Applies to** all. **Check** `DIRECTION.md` contains a thesis sentence with audience + change + visual behaviour. **Source** `inbox/design-intelligence-2026-08-28/01-design-principles.md` s1.

- **RULE [LDP-02]** [team research] Choose layout from the strongest evidence: interface proves value -> product dominates; transformation is emotional/physical -> art direction or photography; idea is unfamiliar -> explanatory diagram/sequence; trust is the barrier -> proof beside the promise; product already known -> less explanation, more immediacy. Never force text-left / screenshot-right by default.
  **Why** The arrangement is right only when the content creates that hierarchy, not because a starter template used it.
  **Applies to** landing page. **Check** `visual`; record the evidence type in `DIRECTION.md`. **Source** `01-design-principles.md` s2.

- **RULE [LDP-03]** [team research] Make one decision lead in every viewport (scale, type, image, product artifact, spatial reveal, grid break, or material contrast). Do not let headline, glow, 3D object, logo cloud, floating cards and animated background compete for first place. Use the squint test.
  **Why** A page reads as designed when one decision leads and the others support it.
  **Applies to** all. **Check** blur the screenshot; primary/secondary/tertiary order must remain obvious. **Source** `01-design-principles.md` s3.

- **RULE [LDP-04]** [team research] Choose type by voice and content, not trend; use the fewest families and roles that make hierarchy unmistakable; pair for meaningful contrast (texture, width, construction, historical character); tune the actual face (optical size, weight, tracking, line height, measure are not interchangeable presets).
  **Why** "A strong type system can carry an entire site. Decorative effects cannot rescue weak typesetting."
  **Applies to** all. **Check** count families and roles in `getComputedStyle`; `visual` for voice fit. **Source** `01-design-principles.md` s4.

- **RULE [LDP-05]** [team research] Keep body copy around 45-75 characters per line (short marketing copy may be narrower). Prevent accidental six-line hero headings by editing copy, changing measure, or choosing another composition. Use fluid display sizing with controlled minima and maxima and inspect every breakpoint rather than trusting one `clamp()`.
  **Why** Long measures lose the eye; a six-line H1 means copy and composition were not matched.
  **Applies to** landing page. **Check** `ch` count of `p` between 45 and 75; H1 line count <= 4 at 320, 375, 768, 1024, 1440. **Source** `01-design-principles.md` s4.

- **RULE [LDP-06]** [team research] Load only used font weights and formats; prefer WOFF2, set fallbacks, prevent layout shift; use optical alignment for icons, punctuation, caps and buttons instead of assuming mathematical centering looks centred.
  **Why** Mathematically centred glyphs and symbols look off-centre; unneeded weights cost payload.
  **Applies to** all. **Check** network panel font list; CLS from font swap. **Source** `01-design-principles.md` s4.

- **RULE [LDP-07]** [team research] Space by relationship: at least a 2:1 difference between intra-group and inter-group gaps as a practical starting rule. Build a small scale then assign semantic roles: micro (icon-to-label), control (internal padding, adjacent controls), group, region (between modules), section (page pacing), stage (intentional empty space around a dominant composition).
  **Why** Spacing is not a uniform blanket; grouping must be legible before containers are added.
  **Applies to** all. **Check** measure gap between sibling items vs gap between groups; ratio >= 2.0. **Source** `01-design-principles.md` s5.

- **RULE [LDP-08]** [team research] Use alignment and whitespace before adding containers. If every idea needs a card, the grouping logic is probably weak. Do not use a three-card grid for content with a clear hierarchy; repeated equal cards communicate equal importance.
  **Why** Containers add objects the visitor must perceive; equal cards flatten priority.
  **Applies to** landing page. **Check** count of bordered/filled boxes vs groups; `visual`. **Source** `01-design-principles.md` s5, s6.

- **RULE [LDP-09]** [team research] Define content grid, gutters, max measures and full-bleed rules; let some elements escape the grid only when the concept earns it. Design reusable sections for their container (container queries), not only the viewport.
  **Why** Grids guide, they must not flatten; container-relative responsiveness keeps modules reusable.
  **Applies to** all. **Check** presence of `@container` on reusable modules; `visual`. **Source** `01-design-principles.md` s6.

- **RULE [LDP-10]** [team research] Separate primitive colors from semantic roles (text, surface, border, accent, positive, warning, destructive). A disciplined palette: background family, text hierarchy, surface hierarchy, one primary signal colour, semantic status colours, optional expressive colours reserved for illustration or data. Do not apply the brand accent to every button, icon, heading fragment, glow, badge and selection state.
  **Why** An accent used everywhere stops directing attention.
  **Applies to** all. **Check** number of distinct elements carrying the accent hue; accent confined to <= 2 roles. **Source** `01-design-principles.md` s7.

- **RULE [LDP-11]** [team research] Verify contrast on the actual rendered background, including alpha and imagery. Do not use light-gray text to manufacture hierarchy at the cost of readability.
  **Why** Alpha and photographic backgrounds change the real pair.
  **Applies to** all. **Check** contrast >= 4.5:1 body, 3:1 large, sampled from the render. **Source** `01-design-principles.md` s7, s13.

- **RULE [LDP-12]** [team research] Use borders for separation, tonal shifts for grouping, shadows for elevation; do not stack all three automatically. Good shadows are layered and low-opacity (tight contact shadow plus broader soft layers); match softness to element size and distance; avoid coloured glow unless light emission is part of the concept. Nested radii should be optically concentric when insets are visible.
  **Why** Random radii and stacked edge treatments read as components from unrelated kits.
  **Applies to** all. **Check** per element: edge defined by at most 2 of {border, tonal fill, shadow}; radius inner = outer - inset. **Source** `01-design-principles.md` s8.

- **RULE [LDP-13]** [team research] Motion must clarify origin, destination, hierarchy, continuity or causality. Use transform and opacity for most transitions; short responsive feedback and slower composed page entrances; stagger by reading order, not every DOM child; springs for interruptible/physical interactions, easing for time and sequence; scroll-driven motion reversible and tied to a narrative; pause offscreen animation, cap ambient frame rates, honour reduced motion; never hide essential content behind an animation that can fail.
  **Why** Decorative ambient motion competes with reading and can fail.
  **Applies to** all. **Check** `prefers-reduced-motion` media query present; animated properties limited to transform/opacity. **Source** `01-design-principles.md` s9.

- **RULE [LDP-14]** [team research] A static screenshot must still communicate the core design.
  **Why** Heroes are posted as stills; animation cannot carry the idea.
  **Applies to** all. **Check** render with animations disabled and compare with the intended frame. **Source** `01-design-principles.md` s9.

- **RULE [LDP-15]** [team research] Before adding a shader, particle, blur, glass, noise, dither, 3D, marquee, mask or cursor effect, finish the sentence "This effect helps the visitor understand or feel ___ because ___." Reject it if the answer is "it looks cool". Provide a fallback image or CSS treatment and set a performance budget first.
  **Why** Effects are materials, not concepts.
  **Applies to** all. **Check** `DIRECTION.md` has the completed sentence for every effect. **Source** `01-design-principles.md` s10.

- **RULE [LDP-16]** [team research] For SaaS and AI sites show a believable workflow, state transition, input/output pair, data trace or result with accurate copy, realistic data and visible interaction consequences. A screenshot floating in a glass panel is not proof. Do not invent customer logos, testimonials, metrics, awards, dashboards or capabilities to fill a layout.
  **Why** Proof is what reduces the visitor's objection; decoration does not.
  **Applies to** landing page. **Check** `visual`; every number traces to a labelled sample dataset. **Source** `01-design-principles.md` s11.

- **RULE [LDP-17]** [team research] Study references by decomposing them into transferable principles (hierarchy, pacing, framing, type contrast, material, motion grammar, proof strategy) and combine several; do not copy distinctive copy, assets, branded colour combinations, signature illustrations or near-identical compositions. Keep a reference ledger recording what was borrowed at the level of principle; if one reference dominates, the synthesis is too narrow.
  **Why** Originality comes from synthesis.
  **Applies to** all. **Check** `DIRECTION.md` reference ledger lists borrowed principle per source, >= 3 sources. **Source** `01-design-principles.md` s12.

- **RULE [LDP-18]** [team research] Treat these as weak when reflexive (not forbidden): purple-on-black gradient blobs without brand logic; centred badge + huge gradient headline + two CTAs + floating dashboard + logo strip + three equal feature cards as automatic skeleton; glass inside glass; rounded rectangles around every sentence; random sparkle/dot-grid/beam/orb; "supercharge", "revolutionize", "seamless", "unlock the power"; many tiny uppercase mono labels; uniform section rhythm; mixed icon families or stroke weights; placeholder charts and fake terminal windows; scroll animation on every element; a trendy font not checked for Lithuanian characters, numerals, italics, licensing.
  **Why** Each is a statistical default.
  **Applies to** landing page. **Check** `tools/check.mjs` AI-tell list plus `visual`. **Source** `01-design-principles.md` s13.

- **RULE [LDP-19]** [team research] Build the system in seven layers: brand and content constraints; primitive scales (colour, type, spacing, radius, border, shadow, motion); semantic tokens (text, surface, action, state, focus, overlay); component contracts (anatomy, states, behaviour, responsive, a11y); section patterns (hero, proof, features, workflow, case study, pricing, FAQ, CTA); page composition rules (pacing, alternation, narrative, transitions); QA harnesses (realistic content, narrow widths, zoom, themes, reduced motion, keyboard, loading/error states).
  **Why** Coherent work becomes easier without making every page identical.
  **Applies to** all. **Check** `visual`; tokens file exists before components. **Source** `01-design-principles.md` s14.

- **RULE [LDP-20]** [team research] Accept a design only after checking: real copy and data; desktop, intermediate, mobile and zoomed widths; long and short headings; keyboard and focus order; hover, active, disabled, loading, error, empty, success states; overlays and scroll locking; light/dark when supported; reduced motion and touch; image and font loading; Core Web Vitals risks; originality against the reference set.
  **Why** "A design is not finished because the code compiles or a desktop screenshot looks good."
  **Applies to** all. **Check** `tools/check.mjs` plus manual list. **Source** `01-design-principles.md` s15.

- **RULE [LDP-21]** [team research] When a brief asks for one desktop social still, scope-limit the checklist in LDP-20 to what the deliverable actually shows; the full checklist applies to real pages.
  **Why** The team measured the cost of over-scoping (see LHS-13, LHS-30).
  **Applies to** hero concept stills. **Check** delivery contract in `DIRECTION.md` names what is out of scope. **Source** `inbox/design-generation-refresh-2026-08-30/06-design-generation-runbook.md` "Scope lock".

- **RULE [LDP-22]** [team research] Use the nine-step study loop for any new craft area: observe strong and weak examples; describe without aesthetic adjectives; extract rules; recompose for a different brief; implement a narrow specimen; render with realistic content and stress states; critique against the thesis; record what survived and failed; convert repeatable wins into tokens/components/skills. Promote only repeated, verified patterns into the design system.
  **Why** Reading builds vocabulary; repeated decomposition, reconstruction, critique and browser verification build judgment.
  **Applies to** all (process). **Check** n/a (process). **Source** `inbox/design-intelligence-2026-08-28/05-learning-curriculum.md` "Operating loop", "Ongoing Larpo practice".

- **RULE [LDP-23]** [team research] For every shipped page save the brief, references, rejected directions and final reasoning; capture desktop and mobile results; record the techniques that worked with exact constraints and the failures with reasons.
  **Why** "Larpo's own verified work should gradually become the strongest teacher."
  **Applies to** all (process). **Check** project folder has brief + references + rejected directions. **Source** `05-learning-curriculum.md` "Ongoing Larpo practice"; `07-research-method-and-provenance.md`.

- **RULE [LDP-24]** [team research] Install or adopt a skill/repo only after reading its full contents, scripts, hooks, dependencies, update mechanism, licence and overlap. Do not stack several taste skills; use one primary skill plus at most one or two supporting skills. No external repo is adopted merely because it says "anti-slop". Verify the current licence and asset-level licences before reuse; public visibility is not permission to copy.
  **Why** Agent skills are executable instructions; stacked taste prompts conflict and produce overdesigned work; one candidate (`video-to-superprompt`) was removed after the installer marked it high risk.
  **Applies to** tooling. **Check** n/a (process). **Source** `inbox/design-intelligence-2026-08-28/06-installed-agent-skills.md` "Selection rule"; `07-research-method-and-provenance.md` "Copyright and originality"; `inbox/2026-09-01-hero-divergence-and-design-research.md`.

## 3. Numbers & scales

| Item | Value | Source |
|---|---|---|
| Body measure | 45-75 characters | 01-design-principles s4 |
| Intra-group : inter-group gap | at least 2 : 1 | 01-design-principles s5 |
| Spacing roles | micro, control, group, region, section, stage | s5 |
| Hero archetype score threshold | a hero below 22/30 does not move to final polish | 02-hero-section-system |
| Curated library size | 418 entries (`03-curated-resource-library.md`) | 07-research-method |
| GitHub atlas size | 272 retained repos from twelve search queries, captured 2026-08-28 | 07-research-method |
| Installed skills | 110 unique global skills after install on 2026-08-28; 65 newly retained (Meng To 40, Jakub Krehel 11, Addy Osmani 6, Flornkm 2, Taste 5, Swiss 1); 106 filesystem-backed skills counted on 2026-08-30 | 06-installed-agent-skills; design-generation-refresh/02 |
| Refresh cadence for source library | quarterly | 07-research-method |
| Responsive test widths | 320, 375, intermediate tablet, small laptop, wide desktop | 02-hero-section-system; 03-typography-spacing-and-layout |

## 4. Dos and Don'ts

| Don't | Do |
|---|---|
| "modern AI SaaS, dark with gradients" | one-sentence thesis naming audience, change, visual behaviour (LDP-01) |
| three equal cards for content with clear hierarchy | let one item lead; use alignment and whitespace before containers |
| effect chosen because a skill exists ("add particles") | name the product fact first; the skill is a technique source, not authorisation |
| load every installed design skill | one primary + at most two supporting |

## 5. Exceptions & judgement calls

- All AI-default patterns are explicitly "not forbidden", they fail when reflexive; the team's own later ledger (see `larpo-hero-system.md` LHS-01..LHS-12) shows the founder rejecting several of them outright for fictional hero concepts, so for hero stills treat the ledger as the stricter source.
- [engine note] Source says 3 hero archetype directions "are not different if all three keep the same DOM skeleton"; the founder later rejected Linecheck for exactly that reason, so the doctrine was validated by feedback, not just theory.
- [engine note] Rules LDP-01..20 come from research capture dated 2026-08-28 that is "not yet canonical" in the Larpo KB; the playbooks that are canonical (preflight, x-saas-hero-generation) are captured in `larpo-anti-ai-playbook.md` and `larpo-hero-system.md`.

## 6. Figures worth keeping

None (text-only sources). Reference renders are listed in `larpo-hero-system.md` section 6.

## 7. Open questions

- `03-curated-resource-library.md` (418 links) and `04-github-repository-atlas.md` (272 repos) are link indexes, not rules; deliberately not encoded here. Their categories: foundations/books/standards, design-system galleries, accessible primitives, copy-paste components, motion/scroll, WebGL/shaders/3D, textures/backgrounds, typography/colour/icons, inspiration libraries, testing/accessibility/performance tools, agent skills. Re-validate links before use (quarterly refresh protocol, LDP-24 source).
- Skill names in the Larpo environment (`product-proof-saas`, `better-typography`, ...) are Codex-environment skills; whether the engine should depend on them is undecided.
