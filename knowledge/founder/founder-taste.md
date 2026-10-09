---
source: founder
chapter: Founder taste: direct feedback on engine output (Augustas, 2026-10-08)
pages: n/a
topic_tags: [founder, taste, hero, nav, typography, copy, icons, logo, layout, product-card, background, buttons, quality-bar]
status: studied
---

# Founder taste (binding)

Every rule here is a direct founder verdict on real output. It outranks books, web research and studied systems. When it conflicts with anything else, this wins. Add to it after every round of feedback; never delete a rule without the founder saying so.

## 1. Core ideas

1. The bar is the studio's own shipped work (Kaching, Capto) and kargul.studio-grade finish, not the rulebook. A rules-perfect page that looks like a diagram was called "dogshit" (Linework).
2. Polished modern SaaS beats clever concepts: Geist-class type, tight tracking, rich believable product UI, a signature visual field, Kaching-spec controls.
3. Creative backgrounds are wanted (live halftone/dither, real data like coastlines), but they must sit in a deliberate position on the grid.
4. Simpler product UI beats denser product UI when both are believable: the founder preferred the original simple payroll card over a richer one.

## 2. Rules

- **RULE** [founder] Never hand-draw icons or logos in SVG paths; use a professional icon set (Phosphor or Lucide) or supplied/traced artwork.
  **Why** Founder: hand-made icons look amateur ("it's ass").
  **Applies to** all. **Check** icons come from an installed icon package or a supplied/traced file. **Source** founder, Tideline round 1

- **RULE** [founder] A logo is a mark plus wordmark with no rounded-rectangle container behind the mark; wordmark at 20px+ in the nav (not 17px).
  **Why** Founder rejected icon-in-a-box logos and asked for the wordmark "a few pixels bigger".
  **Applies to** all. **Check** nav wordmark font-size >= 20px; logo has no filled container. **Source** founder, Tideline rounds 1-3

- **RULE** [founder] Hero headlines use Title Case (every word capitalised) and run two lines maximum at desktop.
  **Why** Founder asked for "title has all first letters capitalized" and two lines max.
  **Applies to** landing page hero. **Check** h1 renders <= 2 lines at 1440px; each word starts uppercase. **Source** founder, Tideline round 3

- **RULE** [founder] The hero subtitle runs two lines maximum at desktop (about 100-120 characters at 18px in a ~520px measure).
  **Why** Founder: "title and subtitle two lines max".
  **Applies to** landing page hero. **Check** hero p renders <= 2 lines at 1440px. **Source** founder, Tideline round 3

- **RULE** [founder] Nav is divided: a white pill holding logo, a hairline divider and the links on the left, and the actions (Log in, primary) on the right; both aligned to the content edges, with generous spacing (40px link targets, 14px link padding, 20px around the divider).
  **Why** Founder preferred the divided nav over a single full-width bar, but wanted it "spaced out better" and aligned with the content.
  **Applies to** marketing site. **Check** nav pill left edge == content left edge; actions right edge == content right edge. **Source** founder, Tideline rounds 2-3

- **RULE** [founder] Everything in the hero shares one left edge (nav, chip, headline, body, buttons, product card) on the content gutter inside the rail.
  **Why** Founder asked for the nav "to be aligned with the other stuff".
  **Applies to** all. **Check** left x of nav, chip, h1, p, actions and first card are equal within 1px. **Source** founder, Tideline round 2

- **RULE** [founder] Rails/dividers must be continuous and deliberate: a rail that meets artwork dissolves before it instead of being cut off or crossing it.
  **Why** Founder: "fix the borders also like dividers".
  **Applies to** marketing site. **Check** visual: no rail ends abruptly mid-section or crosses the hero visual. **Source** founder, Tideline round 2

- **RULE** [founder] Place the hero visual deliberately on the grid: in the right column, pushed right and down so it bleeds off the frame edge, top roughly level with the headline, never floating mid-page.
  **Why** Founder found the globe "a bit out of place", then asked to move it right and down.
  **Applies to** landing page hero. **Check** visual: the visual's mass sits right and low and bleeds off the frame. **Source** founder, Tideline rounds 2-3

- **RULE** [founder] Keep the hero product card simple: title + status badge, one context line, one large figure, one progress element, three small stats. Do not add icon tiles, avatar stacks or extra rows.
  **Why** Founder: the richer card was "too complicated, the original one was better".
  **Applies to** hero product proof. **Check** card has <= 5 visual rows. **Source** founder, Tideline round 3

- **RULE** [founder] Buttons follow Kaching's spec: 14px radius, 18px label at -0.54px tracking, solid ink primary with #303030 hover and no lift, press scale 0.98, secondary white with 1px border and an optional 5px-inset image or icon tile.
  **Why** Founder pointed to Kaching's buttons as the standard.
  **Applies to** marketing site. **Check** computed radius 14px, font-size 18px, letter-spacing -0.54px on hero CTAs. **Source** founder; knowledge/larpo-shipped/kaching-DESIGN-SYSTEM.md

- **RULE** [founder] Every hero needs a creative signature visual field (live dither, halftone, shader, real-data map), not a flat or empty background.
  **Why** Founder asked for "a more creative bg"; the halftone globe was called "cool".
  **Applies to** landing page hero. **Check** visual: a signature visual occupies at least 30% of the fold. **Source** founder, Tideline round 1

- **RULE** [founder] Desktop first when the deliverable is an image; do not spend effort on mobile unless asked.
  **Why** Founder: "no mobile just desktop focus right now to get me an image".
  **Applies to** hero images, X posts. **Check** n/a. **Source** founder, Tideline round 1

- **RULE** [founder] Floating cards use quiet depth: a 1px hairline ring plus a faint lift (about 0 8px 20px -12px at 12% ink). Never a large, blurry, high-opacity drop shadow.
  **Why** Founder: "why so massive shadow and unprofessional stuff"; Deel/Rippling references use whisper-level shadows.
  **Applies to** all cards, chips, popovers. **Check** box-shadow blur <= 24px and alpha <= 0.16 on cards. **Source** founder, Tideline round 4

- **RULE** [founder] Side rails/dividers run the full height of the hero and pass BEHIND artwork (the artwork's empty space is transparent so the rail shows through between its marks); never fade a rail out early and never draw it on top of the visual.
  **Why** Founder: the right border "fading off too soon" looked broken, then asked for the border "to be below the globe".
  **Applies to** marketing site. **Check** both rails span the full hero height; the rail's z-index is below the hero visual. **Source** founder, Tideline rounds 4-5

- **RULE** [founder] A large hero visual that touches the frame edge dissolves softly into the page (mask fade) instead of being hard-cropped mid-shape; make it big enough to feel intentional.
  **Why** Founder: the globe needed to be "bigger or blurred out at sides where it touches".
  **Applies to** hero visuals. **Check** visual: no hard crop line on the visual at the frame edge. **Source** founder, Tideline round 4

- **RULE** [founder] Data callouts on a visual all follow one placement rule (same side of their point, short leader line), never cover their own line or another route, and are curated to the clearest three rather than five.
  **Why** Founder: the travelling points "are a bit off and need to be placed better".
  **Applies to** maps, charts, annotated visuals. **Check** visual: no callout overlaps any arc or another callout. **Source** founder, Tideline round 4

- **RULE** [founder] Money amounts in hero product UI are bold sans (Geist semibold, tight tracking, tabular) with the decimals muted; mono is for meta (times, IDs), not headline figures.
  **Why** Founder asked for the money card to be styled better; Deel's payroll card is the reference.
  **Applies to** product proof. **Check** large currency figures use the sans family. **Source** founder, Tideline round 4

- **RULE** [founder] Look at several strong real references for the same product category before redesigning a weak area (for payroll: Deel, Remote, Rippling in knowledge/references/payroll/).
  **Why** Founder: "search for more examples or what would look better and cleaner".
  **Applies to** every redesign round. **Check** DIRECTION.md cites the references opened. **Source** founder, Tideline round 4

- **RULE** [founder] Default nav (when the brand has no nav system of its own) uses Kaching's exact spec: one pill 43px tall (padding 5/5/5/16, radius 14, white 80% + 8px blur), 16px between brand and links, 2px between links, links 6/11 padding at 15px/21px and -0.45px, chevron 5px from its label with 14px left padding on that link, actions 9/16 at radius 12 on the right. Compact, never airy.
  **Why** Founder: "the first original one was best", the respaced version was "too spaced out", with no gap after the Product chevron.
  **Applies to** marketing site nav. **Check** nav pill height 43px; link padding 6px 11px; gap after chevron >= 5px. A new brand may define its own nav at the same polish (compact, aligned, no stray gaps) and should, so pages do not all look like one kit. **Source** founder, Tideline round 5 and Vigil round 1; knowledge/larpo-shipped Kaching hero.css

- **RULE** [founder] Hero headlines have no full stop at the end.
  **Why** Founder: "no dot at the end of title text please".
  **Applies to** hero h1. **Check** h1 text does not end with ".". **Source** founder, Tideline round 5

- **RULE** [founder] Break the two-line subtitle by hand so the lines are balanced (first line not much longer than the second); do not leave a long top line and a short bottom line.
  **Why** Founder asked to cut the subtitle "after every" so the top line is not so long.
  **Applies to** hero subtitle. **Check** visual: line lengths within ~20% of each other. **Source** founder, Tideline round 5

- **RULE** [founder] The "New" announcement badge keeps white text; deepen the badge colour until white passes contrast instead of switching the text to black.
  **Why** Founder: "why randomly the text there is black when it should have been white".
  **Applies to** badges, pills. **Check** badge text is white; colour bright, not burnt (Tideline uses #ea580c, ~3.6:1: the founder judged #c2410c 'a bit too dark', so brightness wins over AA on this decorative badge). **Source** founder, Tideline rounds 5-6

- **RULE** [founder] The hero product card anchors to the bottom of the hero (bottom-left on the content edge), not floating mid-column under the buttons.
  **Why** Founder: "the ticket box should be on the bottom".
  **Applies to** landing page hero. **Check** card bottom within ~40px of the hero bottom. **Source** founder, Tideline round 5

- **RULE** [founder] One depth and shape language across every floating surface: shared shadow tokens (ring for pills/secondary buttons, card shadow for cards and chips), radius 18 for cards, 14 for chips and hero buttons, 12 for nav controls and dark labels.
  **Why** Founder: "match consistency everywhere".
  **Applies to** all. **Check** floating surfaces use the shared shadow variables. **Source** founder, Tideline round 5

- **RULE** [founder] Data routes and connecting lines flow: a gradient stroke that fades in from the origin and a soft moving highlight (comet) along the line, rather than flat static strokes with a dot.
  **Why** Founder asked for "nicer strokes flowing".
  **Applies to** maps, flow diagrams, connection visuals. **Check** visual + motion: routes have a gradient and a looping highlight; reduced motion shows static gradients. **Source** founder, Tideline round 6

- **RULE** [founder] Give the hero copy block air at the top: roughly 80-90px between the nav and the announcement chip at 1440x900.
  **Why** Founder: the title "and everything should be a little bit more down".
  **Applies to** landing page hero. **Check** chip top - nav bottom ~= 80-90px. **Source** founder, Tideline round 6

- **RULE** [founder] Founder rules set the polish floor, not the style. Each new brand must explore its own effects, button style, type voice and graphics from the engine library (art-direction moves, Heckel shader recipes, Comeau button/depth recipes, Rauno/Emil craft details) instead of reusing the last project's kit; the diversity gate checks the fingerprint, and the designer must also check the components (nav, buttons, chips, cards) for sameness.
  **Why** Founder on Vigil v1: "too alike the project we just did, explore better effects, buttons, styles, shaders, graphics... use the engine".
  **Applies to** every new brand. **Check** DIRECTION.md names the moves and recipes used, and at least nav, primary button and product card differ in construction from the previous accepted project. **Source** founder, Vigil round 1

- **RULE** [founder] The default SaaS hero is centred and product-led: a two-line headline (no chip above it), a one-line subtitle and the CTA centred at the top, then a full, rich product dashboard in a window frame filling the lower half of the fold and running off the bottom edge (AlignUI Pro, Commslayer). The dashboard is the visual.
  **Why** Founder on Vigil v2 (dark mono split hero with a lens shader): "this looks ass... I need something clean centre layout and like SaaS with full dashboard visual, clean smooth and aesthetic with cool and clean visuals like Commslayer... the AlignUI aesthetic I love most".
  **Applies to** SaaS and AI-SaaS landing heroes, unless the brief asks for something else. **Check** h1 centred; the dashboard frame is >= 1000px wide, starts in the top 65% of the fold and is cut by the bottom edge; the dashboard shows a believable workflow (sidebar, KPIs, chart, table or list, an AI panel). **Source** founder, Vigil round 2; knowledge/benchmarks/alignui-shots/pro-1440.png, commslayer-shots/home-1440.png

- **RULE** [founder] The founder's favourite aesthetic is AlignUI: light, clean and smooth. Soft grey canvas, white surfaces, hairline strokes, soft layered shadows, Inter-class type at 500-550 weight with tight tracking, one confident accent, precise small UI. Effects (shaders, glows, beams, rulers) support the product and stay quiet; a dark, moody, conceptual or "techy poster" hero with an abstract effect as the main visual is a reject.
  **Why** Founder rejected Vigil v2 (dark field, glass-lens shader, mono poster headline, 3D push button): "this looks ass", "clean smooth and aesthetic".
  **Applies to** default visual direction for SaaS. **Check** light canvas by default; the largest visual element is product UI, not an effect; no more than one effect layer at low contrast. **Source** founder, Vigil round 2

- **RULE** [founder] "Explore the engine" means fresh components and details inside the clean SaaS look (new nav construction, button grammar, frame, accents, icon set, motion), not a jump to an experimental art direction. Novelty lives in the details; the overall read stays clean, premium SaaS.
  **Why** Vigil round 1 was "too alike"; Vigil round 2 overcorrected into an art-piece and was rejected as "ass".
  **Applies to** every new brand. **Check** DIRECTION.md lists the component-level differences from the last accepted project and confirms the hero class is product proof. **Source** founder, Vigil rounds 1-2

- **RULE** [founder] No announcement chip or small text above the hero headline by default; the headline opens the hero and sits ~80-90px under the nav.
  **Why** Founder on Kestrel round 1: "I'd put no little text above the title and move the title up".
  **Applies to** landing heroes. **Check** nothing between the nav and the h1. **Source** founder, Kestrel round 1

- **RULE** [founder] Nav controls are never cramped: link items at least 36px tall with ~14px side padding inside a 44px track, sign-in and primary buttons 40px tall with ~16px side padding.
  **Why** Founder on Kestrel round 1: "the nav bar would be taller like buttons, they're a bit cramped now".
  **Applies to** marketing nav. **Check** nav links >= 36px tall, nav buttons >= 40px. **Source** founder, Kestrel round 1

- **RULE** [founder] Background texture (a fine dot grid, Commslayer-style) lives only inside the rails, behind the copy and the product; outside the rails the canvas stays plain. Fade it softly behind the headline so type stays clean.
  **Why** Founder on Kestrel round 1: "dotted bg texture in the inner stuff, behind the product, but not outside the borders (same as Commslayer)".
  **Applies to** heroes with rails. **Check** the texture element's box equals the rail-to-rail area. **Source** founder, Kestrel round 1

- **RULE** [founder] Hero buttons share the product's roundness: when the product UI is soft (cards 12-16, frame 22), the CTAs are 44px tall at ~14px radius and nav buttons ~12px; never square-ish 10px buttons next to a soft product.
  **Why** Founder on Kestrel round 1: "if the product is that rounded why the Start for free or other buttons are so stiff".
  **Applies to** hero CTAs, nav buttons. **Check** CTA radius >= 0.3 x height; within ~4px of the product card radius. **Source** founder, Kestrel round 1

- **RULE** [founder] Inside a hero dashboard, keep small controls tight (sidebar items, search and switcher at ~6px radius) and do not mark a "selected" card with an accent outline ring; selection is shown by the story (chart, AI panel), not a blue border.
  **Why** Founder on Kestrel round 1: the sidebar was "a bit too rounded", and "the 3 cards, the blue outline I don't like".
  **Applies to** product UI in heroes. **Check** no accent-coloured ring on KPI cards; sidebar item radius <= 6px. **Source** founder, Kestrel round 1

- **RULE** [founder] When the founder supplies a logo image, trace it to SVG (node potrace from the root node_modules), crop to a square viewBox, fill with currentColor and use it unchanged, ink on light; reuse the mark inside the product (AI assistant tile) for brand continuity.
  **Why** Founder on Kestrel round 1 supplied the flower mark: "the logo to be same as the Kestrel logo which I found online, you could recreate".
  **Applies to** brand marks. **Check** the logo path comes from `work/<name>/brand/*-mark.svg`, not an icon-set glyph. **Source** founder, Tideline round 3, Kestrel round 1

- **RULE** [founder] Product UI inside a hero uses one soft radius ladder, measured as rendered (Kestrel round 2, loved): sidebar items, workspace switcher, search, badges, inner segments and tooltips 8; 32px header and panel controls (segmented track, icon buttons, small buttons, inputs) 12; cards, chat bubbles and the app surface 16; outer frame 22. Do not tighten it: 4/6/10 and 6/8/12 both read stiff (founder Kestrel rounds 3-4: "too little rounding", "where is the product roundness smooth as it was").
  **Why** Founder on Kestrel round 2: "the dashboard has components too rounded, not consistent and not spaced centre" (the 7d/30d/90d control vs the share button).
  **Applies to** dashboards and product UI. **Check** distinct radii inside the product <= 5 and each maps to the ladder; adjacent controls have equal heights; segment widths equal. **Source** founder, Kestrel round 2

- **RULE** [founder] Secondary hero buttons are text-only; no decorative play or arrow icon in front of the label.
  **Why** Founder on Kestrel round 2: "except the see it answer icon, please remove that".
  **Applies to** hero CTAs. **Check** the secondary CTA has no leading icon. **Source** founder, Kestrel round 2

- **RULE** [founder] Every hero loads in as one orchestrated Framer Motion timeline on Kaching's motion tokens (`ease.reveal [.26,.32,.14,1]` 1.2s travel + 0.9s fade, 70ms stagger, 6px blur on text only, stage lifts from 97%, controls 220ms `outQuint`): frame lines draw, then nav (it animates too), then headline word by word, subtitle, CTAs, then the product stage, then its contents in reading order, then decorative tiles and routes. Nothing is visible before its moment: connection dots appear only when their route lands, and only then do pulses and comets start. Hover states slide (shared `layoutId` pills in nav, segmented controls, sidebars). Reduced motion shows everything in place.
  **Why** Founder on Kestrel round 5: "the blue dots that connect, why are they always visible, no animation, plus nav bar too? make everything smooth using framer motion", "make the entire load-in smoother with stagger... check how we have Kaching".
  **Applies to** every hero build. **Check** a frame at ~0.4s shows only the frame; no element with a looping animation is visible before its entrance; all delays come from one timeline object; tokens live in one `motion.ts`. Also check the nav and tiles are clickable (no transparent layer above them). **Source** founder, Kestrel round 5; knowledge/larpo-shipped/kaching-DESIGN-SYSTEM.md "Motion defaults"

- **RULE** [founder] Looping accents (pulse rings, pings, comets) must be invisible until their moment: start every looping keyframe array at opacity 0 (`opacity: [0, 0.4, 0]`, `times: [0, 0.05, 1]`) or wrap the loop in a group that enters at that moment. Framer Motion paints the first keyframe during the delay, so `opacity: [0.4, 0]` shows a static dot from page load. Order effects as cause then effect: the note lands, its connector draws, the target line lights up and the dot lands as the connector arrives, then the pulse starts.
  **Why** Founder on Margin build 1: "the red bubble doesn't fade in, it just stays there when loading in, very distracting".
  **Applies to** every looping animation. **Check** filmstrip at 300ms steps: no looping element visible before its entrance; grep `animate={{ .*opacity: \[0\.[1-9]` for loops starting visible. **Source** founder, Margin build 1

- **RULE** [founder] Range is mandatory: no two consecutive builds may share the same page family and skeleton. Rotate between image-led heroes (engraving, painting, photo, generative scenes behind crisp product), framed pages (site as a sheet on a backdrop), left-aligned editorial heroes, mono/sharp operator styles, AI-composer heroes and the centred product-over-canvas default. Polish rules (spacing, nav comfort, radii consistency, motion discipline) carry across; the aesthetic does not.
  **Why** Founder after Kestrel and Margin: "now I see the patterns, you're a bit repetitive and we need a lot of different styles and aesthetics", with references from @1Aakib and @uisabor (knowledge/web/style-refs-x-2026-10.md).
  **Applies to** every new brand. **Check** DIRECTION.md states the family of this build and of the last two; they differ. **Source** founder 2026-10-09

- **RULE** [founder] Leave real air between the hero CTAs and the product frame: at least 64px from the bottom of the buttons to the top of the frame (Strata had 44px and read cramped). Measure it; do not eyeball it.
  **Why** Founder on Strata: "not bad, just the product is too close to the buttons".
  **Applies to** product-led heroes. **Check** frame.top - cta.bottom >= 64px at 1440x900. **Source** founder, Strata build 1

- **RULE** [founder] Generative, one-of-a-kind backgrounds are welcome when they are crafted (Strata's live engraving: "interesting style choice, really unique"); keep exploring bespoke shaders and illustrations per brand instead of stock gradients.
  **Why** Founder on Strata's engraved landscape.
  **Applies to** signature visuals. **Check** DIRECTION.md names the bespoke visual and why it fits the product. **Source** founder, Strata build 1

- **RULE** [founder] Do not ship the generic "everything loads in" parade (every word, block and row rising out of blur in sequence). Choreograph the load-in around the brand's idea with ONE conceptual reveal (dawn light sweeping across a dark product, ink developing on paper, a flow drawing itself), and keep the rest either present at first paint or arriving in at most 2-3 quick groups within ~1.2s. Word-by-word headline reveals are a deliberate choice for one brand, not the default. Vary the motion vocabulary per brand exactly like layout and type.
  **Why** Founder on Nocturne: "not up to our quality levels... everything is just loading in and it's a bit noobish". Kestrel's load-in was praised once; repeating the same kit stagger on Margin, Strata and Nocturne turned it into a template. Research agrees: 8 of 15 top heroes show the headline in the first frame and the median hero settles in ~1.5s (knowledge/web/product-motion-patterns.md).
  **Applies to** every hero load-in. **Check** filmstrip at 0/300/800/1500ms: the composed hero (headline + CTA) is readable by 300ms unless the concept needs otherwise; entrance groups <= 3; DIRECTION.md names the conceptual reveal and how it differs from the last build's. **Source** founder, Nocturne build 1

- **RULE** [founder] Every product visual on one site speaks ONE visual language: one edge treatment for white boxes (a 1px hairline OR a faint 6% ring, never both, never a borderless box with a muddy shadow), one radius ladder by element height (nested radius = outer minus inset), one grey shadow scale of at most 3 levels, type roles at 500/600 only, one accent rule (accent only for the selected/primary thing, tints at ~8%). Benchmark is Commslayer/Attio product UI. Audit computed values across ALL visuals before shipping, not one at a time.
  **Why** Founder on the Kaching app visuals (2026-10-09): "the animations are in 3 completely different styles of colours, effects, roundness... what the hell", "random box components without borders and bad shadows or double pixel stroke"; client: "I saw 3-4 different styles of borders and how things look and move". Root cause found in code: three competing box-shadow recipes in one style file.
  **Applies to** every animated product visual / bento scene / card. **Check** across all visuals: distinct box-shadow strings <= 3, no element with both a border and a 0 0 0 1px ring, distinct radii map to the ladder, font weights in {500, 600}. **Source** founder + client, Kaching round 2

- **RULE** [founder] Sibling pages built from one template keep an identical bento: same box sizes, positions and padding at every breakpoint; only the content differs. Never mirror or resize the grid for one page.
  **Why** Client on Kaching app pages: "the Bundles section size and how things work is not the same as Subscriptions".
  **Applies to** app/product pages sharing a template. **Check** bento box rects match across all sibling pages at 1440/768/375. **Source** client, Kaching round 2

- **RULE** [founder] Each product visual has its own signature build-in (rows assemble, a cursor acts, a dithered product photo develops, a number counts, a connector draws) on shared timing tokens; never the same generic "panel fades/rises in like a card" for every visual.
  **Why** Founder: "each visual is like a card, it loads in just like a card, couldn't it do something of its own?"
  **Applies to** bento scenes, hero visuals, step visuals. **Check** filmstrip of two visuals side by side: their first 800ms differ in choreography, not just content. **Source** founder, Kaching round 2

- **RULE** [founder] Product photos inside an app/section visual are tinted from that section's own palette (or neutral grey); a red tee glowing on the green Cart card is wrong. Palettes stay clean: gold is a clean amber, never olive or muddy.
  **Why** Client: "why does the red T-shirt glow on the green card instead of being green", "the yellow is too dirty compared to the new one".
  **Applies to** dithered/duotone product art and app colour fields. **Check** each product-art ramp's hue sits within ~25deg of its section accent or is neutral. **Source** client, Kaching round 2

- **RULE** [founder] Dither (and gradient) fields should end in a slow, uneven, drifting wave, not one straight horizontal line, and the wave stays modest: depth about a quarter of the fade band, capped near 85px, wavelength ~640px. 0.36 of the band / 120px cap read "good but a bit too big".
  **Why** Client: "make some waves so it's not all one straight horizontal line, it looks basic"; founder after the first pass: "they're good but just a bit too big".
  **Applies to** dither/gradient section edges. **Check** the fade boundary varies along its length; peak depth <= ~86px at 1440. **Source** client + founder, Kaching round 2

- **RULE** [founder] Never reproduce a friend brand's signature section identically (Kaching's founders' letter mirrored Commslayer's structure and was rejected); take the idea, then make it unmistakably ours (Kaching: a torn notebook page with 2px dither fibres along the tear).
  **Why** Client: "it's not similar, it's identical to Commslayer, I'll be ashamed to look their founder in the eye".
  **Applies to** reference-driven sections. **Check** structure, material and copy rhythm all differ from the reference. **Source** client, Kaching round 2

- **RULE** [founder] Hero title sizes are one scale across a site's secondary pages; no page gets a one-off giant h1 (Kaching About was "huge and out of place").
  **Applies to** multi-page sites. **Check** h1 font-size is identical across secondary pages at each breakpoint. **Source** founder, Kaching round 2

- **RULE** [founder] Auto-advancing tabs show progress as a small circular ring beside the active label (or a fill inside a full-width segmented track), never a 1px line under a pill.
  **Why** Client: "that 1px line at the bottom of the pill doesn't look good, try a small circular progress next to the name".
  **Applies to** auto-cycling tab selectors. **Check** no progress hairline under pills; the indicator is driven by the same clock as the advance. **Source** client, Kaching round 2

- **RULE** [founder] Product dashboards default to the compact, calm grammar measured from Rico's and Kargul's real screens (knowledge/web/heyrico-recreation-lessons.md, kargul-source-study.md), not to a "spacious AlignUI template" reading: one size smaller than instinct everywhere (sidebar ~260px, rows 28-30px on a 30-32px pitch, controls 28-30px, icons 14px stroke at text size, labels 13-14px, KPI numbers ~18px semibold-tabular, card padding 16px, page gutters 24px); hierarchy from two text greys, not from size or weight; group labels small and sentence case, never uppercase; active nav row = grey fill + darker text only (no accent bar or chevron); canvas and sidebar share one neutral, cards are white with a 1px border and no shadow (one shadow per screen at most); the accent appears only in data (bars, lines, meters, progress); tight inside, generous between (2px between rows, 20px between cards). Build one primary view to full detail with real-looking data and working interactions, and put secondary content in overlays (sheets, popovers, dialogs) instead of stacking six blocks.
  **Why** Founder rejected Acquisity v1 (boxed, colourful, cramped) and v2 (an "AlignUI template" reading with uppercase labels, 24px numbers, 32px padding): "it copied it mostly and just changed surface level stuff... nothing like Marcel Kargul's style nor Rico... too noobish... nothing like Attio". Recreating Rico 1:1 and auditing Kargul's code showed the engine's product UI is one notch too big, too many sizes (7 type sizes vs 3, 5 control heights vs 1, 8 radii vs 4) and too boxy.
  **Applies to** SaaS app UI and dashboards. **Check** distinct font sizes in the main view <= 4; one control height for actions; icon size = adjacent text size; shadows <= 1 per screen; no uppercase group labels; overlay side-by-side with a Rico/Kargul reference via tools/compare.mjs. **Source** founder verdicts on Acquisity v1/v2; Rico recreation and Kargul source study, 2026-10-09

- **RULE** [founder] A content reference (an existing screen, a kit, a brief) is content only: redesign structure, sizes and hierarchy from scratch in our own system, and add what the product is missing (sections, states, live elements) instead of re-skinning the original layout box for box.
  **Why** Founder: "that example I gave you was just like the content, you should design the stuff in your own size and way or even add stuff there isn't and just do it consistently".
  **Applies to** every redesign and review-and-fix job. **Check** DIRECTION.md lists what was restructured and what was added, not only what was restyled. **Source** founder, Acquisity redesign v1

- **RULE** [founder] The product-UI bar is Marcel Kargul's, Rico's (@_heyrico) and Attio's shipped product work, not "AlignUI-flavoured". Before building product UI, study and recreate reference screens at 1:1 (overlay your render on the reference and close the gaps), build from a measured product kit, and judge every screen side by side with a reference at the same zoom. A redesign that keeps the source layout and changes surface styling is a reject.
  **Why** Founder on Acquisity v1/v2: "it seems to have copied it mostly and just changed surface level stuff", "nothing like Marcel Kargul's style nor Rico... too noobish... nothing like Attio... spend more time perfecting product craft".
  **Applies to** all SaaS app UI and dashboards. **Check** DIRECTION.md names the reference screens used, includes a side-by-side at equal zoom, and lists the structural changes (not only restyling). **Source** founder, Acquisity redesign rejection 2026-10-09

- **RULE** [founder] Bento visuals (Commslayer-measured): no grey stage boxes; each visual starts exactly on its copy's left edge, one fixed gap under the copy, top-aligned (never centred in a tall box), filling the cell's width; only the lead cell carries the brand dither, across the whole lower cell edge to edge; the longest visual goes in the tall lead cell and the widest in the wide cell; on tablet and phone every cell has the same height. Never replace an accepted bento layout with a "systemised" fixed grid without diffing it against the accepted one.
  **Why** Founder on Kaching round 2: "not in a rectangular grey box", "this bento was clean, neat, consistent when scaling down, on mobile all the same heights, and now you messed it up everywhere", "we had the long visual, so put it first and the calendar as the long one".
  **Applies to** feature bentos. **Check** visual.left == copy.left per cell; gap copy->visual identical across cells; no stage background; tablet/phone cell heights equal. **Source** founder, Kaching round 2

- **RULE** [founder] Visuals inside dark sections are dark visuals (dark panels with a faint white ring, light text, accent only on the selected/primary element). Never drop a bright white UI window onto a black band.
  **Why** Founder on the Kaching migration section: "dark sections should have dark visuals, what's going on?"
  **Applies to** any product visual on a dark surface. **Check** in dark sections, no visual panel has a background lighter than ~#2A2A2A. **Source** founder, Kaching round 2

- **RULE** [founder] When a founder-approved visual already exists (a motion artist's scene, a shipped section), revise it app by app: keep its composition, polish styling and motion, check it side by side against the original, and only then move to the next. Never regenerate a whole set in parallel from a new system; it drifts ("what you replaced is a bit shit", "let's go one by one").
  **Applies to** revision rounds. **Check** each revised visual has a side-by-side with its original in the report. **Source** founder, Kaching round 2

## 5. Exceptions & judgement calls

- The split layout (copy left, visual right) was rejected by Larpo when the right side was a decorative dashboard. With a real product world on the right (the payout globe) the founder accepted it.
- Title Case applies to the hero headline. Body copy, buttons and labels stay in sentence case unless told otherwise.
- **RULE** [founder] An app sidebar follows Attio: one refined outline icon family (Phosphor regular, 16px, grey #7c7f85; the active row's icon goes fill), record types as 16px solid colour tiles (radius 4.5) with a white filled glyph, and enough real pages to feel like a product (workspace pages, Favorites, Records, Lists, Agents), grouped under small sentence-case headers. The whole nav fits a 1440x900 viewport without a clipped group; secondary actions (invite, help, settings) collapse into icon buttons in the user footer. White buttons get a crisp 1px ring plus a soft 1-2px lift (`.btn-white`), never a blurred halo.
  **Why** Founder on Acquisity v3 (renamed Ferry): "not bad actually, you're getting better... I'd just improve the sidebar and the white buttons a tiny bit.. the sidebar icons look trash... overall sidebar itself should look more like attio and have more pages".
  **Applies to** SaaS app UI and hero dashboards. **Check** one icon library in the sidebar; record tiles solid with white glyphs; no group cut at 900px tall; white button shadow = 0 0 0 1px ring + <= 2px blur lift. **Source** founder, Ferry round 1, 2026-10-09; knowledge/web/attio-product-ui.md
- **RULE** [founder] The last 5% to Marcel/Rico level is tiny effects plus consistency, so finish every product screen with this pass: one icon family across sidebar and canvas (state = fill weight, never a second library); one card-header grammar everywhere (16px solid tile + white glyph, 14/600 title, soft meta, actions right, same 48px band); micro-visuals that carry data (KPI micro-bar sparks with the latest period in the accent, segmented meters for rates, dotted underline on metric labels); charts compare against something (previous period dotted grey under a 1.5px accent line, monotone smoothing that never overshoots a real value, dashed gridlines, a hover crosshair + tooltip, an end-point dot); only one attribute per row is a filled chip, other statuses are icon + text; table edge cells share the card's 16px inset; dense cells use compact values ("12m", "1d") so nothing clips.
  **Why** Founder on Ferry: "we're so close but not marcel or rico quality by a tiny bit, which comes down to tiny effects and consistencies"; while studying Rico's analytics, Attio's charts and Kargul's CRM: "you're looking at fire examples tho".
  **Applies to** dashboards and hero product UI. **Check** icon libraries imported in the product = 1; every card header renders through one component; each chart has a comparison series and a hover state; filled chips per table row <= 1; no clipped cell text at 1440 wide. **Source** founder, Ferry round 2, 2026-10-09; knowledge/benchmarks/heyrico/analytics-light-cropped-window.jpg, attio/crop-home-charts.png, kargul-crm/crop-table-rows.png
- **RULE** [founder] A split product hero stays clean: plain canvas behind the copy (Lightfield, Attio), the copy block vertically centred with nothing under the CTAs, and the product doing the visual work. If the hero needs art, confine it to one stage panel directly behind the product (Folk's grain gradient, Cursor's painting, Granola's collage); never a full-page pattern, contour field or scattered decorative numbers, and never a "how it works" step list in the hero.
  **Why** Founder on the Ferry hero: kept "the title subtitle buttons nav bar the product nice", rejected the live sea-chart contour background and the three lit-up steps: "BG WITH THOSE LIKE THREE STEPS LIKE WTF IS SO STUPID... find better cleaner examples of this and do it better".
  **Applies to** split and left-aligned product heroes. **Check** no texture or pattern outside the product stage; nothing between the CTAs and the bottom of the fold on the copy side; at most one floating surface over the product. **Source** founder, Ferry hero round 1, 2026-10-09; knowledge/benchmarks/split-heroes/lightfield-1440.png, folk-1440.png, attio-1440.png, product-heroes/cursor-1440.png
