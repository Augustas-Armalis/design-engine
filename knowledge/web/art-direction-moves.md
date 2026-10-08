---
source: web:awwwards.com case studies, blog.lusion.co Oryzo BTS, linear.app, raycast.com, basement.studio, siteinspire.com, httpster.net, recent.design, cssdesignawards.com, w3.org WCAG, rive.app/blog, Chrome/web.dev support notes (see creative-direction.md frontmatter for the full URL list)
chapter: Catalogue of 60 reusable art-direction moves
pages: n/a (web research, fetched 2026-10-08)
topic_tags: [art-direction, moves, catalogue, webgl, scroll, typography, layout, saas, restraint]
status: studied
---

# Art-direction moves (M01-M60)

A **move** is a named, reusable decision that makes a site feel authored. Not a rule, not a limit: a menu. Use `creative-direction.md` (Part B) to pick a concept first; then choose **one primary move + up to two supporting moves** from here. Stacking more than one loud move usually dilutes the signature (see "Combination notes" at the end), but nothing here is forbidden.

**Tags.** `[S]` sourced from a fetched primary write-up (studios' own case studies, self-reported). `[3P]` third-party blog/vendor. `[EN]` engine note (my judgement, hypothesis). Example sites marked "(from memory)" were not fetched this session; verify before quoting.

**Entry format.**
- **What** the move is.
- **Seen in** real sites.
- **Build** libraries/approach.
- **Cost** (L = hours-days, M = 1-3 weeks, H = a month+ or a specialist) and **Risk**.
- **A11y/perf** caveats (floor items from `creative-direction.md` section 2a always apply).
- **Suits / Kills** which product/brand types it fits and which it harms.

Cost and risk are `[EN]` estimates unless stated.

---

## A. World & concept

### M01 Metaphor-as-navigation
- **What** The site's structure *is* a journey, place or map; scroll/nav is traversal, sections are stops.
- **Seen in** Razorpay Sprint26 (store walk; six verticals = six steps) [S]; Capitolium (walk across Place du Capitole, scroll runs top-to-bottom and left-to-right) [S]; San Rita (vintage topographic map; click dives camera to coordinates) [S]; Duroc (amusement park, CTAs sit in the scenery) [S].
- **Build** Storyboard first. DOM sections + GSAP ScrollTrigger for 2D walks; R3F/Three.js + persistent canvas for 3D maps (M31). Keep a real, linkable URL per stop.
- **Cost** M-H. **Risk** the metaphor hides navigation; users lose orientation.
- **A11y/perf** Provide a plain list/sitemap alternative; deep-linkable stops; keyboard path through stops.
- **Suits** launches, portfolios, brand/campaign hubs, fintech/deep-tech storytelling. **Kills** tools used daily (docs, dashboards, pricing/compare pages), heavy-SEO e-commerce.

### M02 First-person brand voice
- **What** The brand narrates the site as itself ("the brand introduces itself"), with bar-counter irony, affection, or deadpan; chapters instead of "About us".
- **Seen in** La Revoltosa [S]; Basement ("cool shit that performs") [S]; Oryzo's deadpan product copy [S].
- **Build** Voice guide with 3 adjectives, 10 sample lines (headline, button, error, 404, footer). Copy-driven section structure; chapters as scroll sections.
- **Cost** L-M. **Risk** voice fatigue; translation; humour misfires.
- **A11y/perf** Keep headings and labels literal enough for screen-reader navigation; avoid clever button labels that obscure action (`Get started` can be witty but must be clear).
- **Suits** consumer/DTC, studios, dev tools with personality, mission-driven. **Kills** regulated finance/health legal pages, enterprise procurement flows.

### M03 Recurring device (thread / timer / strip)
- **What** One visual or interaction device repeated at every scale that also carries the idea.
- **Seen in** MindMarket's scroll-drawn thread as spine and orientation [S]; 100 Lost Species' persistent running timer [S]; Ponpon Mania chapters = albums, panels = songs, colour only in fantasies [S]; Ribbit footer characters [S].
- **Build** GSAP timeline paused and scrubbed by scroll progress (Locomotive/Lenis progress 0-1, DrawSVG for strokes, extra "shadow" path fading near 0.95) [S]; or a single fixed element in the layout shell.
- **Cost** M. **Risk** device repeats until it irritates; must pay off.
- **A11y/perf** Decorative, `aria-hidden`; timers visible but not announced; stop auto-updating counters under reduced motion.
- **Suits** B2B services, editorial/nonprofit, research, storytelling SaaS. **Kills** dense data apps.

### M04 Medium pastiche (terminal, comic, magazine, book, film, console)
- **What** Pick an existing medium and borrow its grammar for the whole interface.
- **Seen in** Orage (CRT terminal: mono type, blinking cursor, boot-sequence loader, command-line list) [S]; Ponpon (web comic with music-player navigation) [S]; Ribbit process page (a slanted cartoon-strip "magazine" opened by scroll-locked CSS transforms) [S]; MaxMara (Brontë sketchbook game) [S]; Goodgrowth (console-inspired concept; per Codrops summary, article unread).
- **Build** Define the medium's 5 grammar items (type, frame, transition, navigation, sound). CSS transforms + GSAP; WebGL only if the medium needs it.
- **Cost** M. **Risk** pastiche becomes costume if content doesn't fit.
- **A11y/perf** Medium tropes (blink, glitch, flicker) violate flash and motion limits if overdone; respect reduced motion; no content flashing >3 times/second (WCAG 2.3.1) [EN].
- **Suits** studios, game/dev-tool brands, culture, fashion. **Kills** healthcare, finance, anything calm.

### M05 Grounded environment instead of abstract product study
- **What** Put the product in a believable, lived-in place rather than a void.
- **Seen in** Oryzo's work desk with sketches and clutter; team explicitly chose it over a minimal product study [S]; Raycast's keyboard hero graphic [S].
- **Build** Real object capture (photogrammetry: 180 RAW images in RealityScan) + 3D scene (Houdini/Blender + Redshift) delivered as image sequences, texture-mapped planes, or splats (M46). Clutter placed by rigid-body simulation [S].
- **Cost** H. **Risk** budget; art-direction drift.
- **A11y/perf** Provide static poster; compress; cap interaction ranges.
- **Suits** physical/DTC goods, hardware, desk tools, lifestyle SaaS with a tangible metaphor. **Kills** pure-infra B2B.

### M06 Character cast that owns layout
- **What** A small cast of characters that shape sections, push UI into view, react to CTAs; archetype-based so each reads alone and as a set.
- **Seen in** Ribbit (five archetypes: Jester, Explorer, Sage, Outlaw, Creator; "stage" homepage modelled on early platform games; real photo + illustrated characters inspired by Gorillaz) [S]; MindMarket's illustrated, animated cast [S].
- **Build** Illustrator/Rive; PNG sequence when WebGL/spritesheets choppy in Safari (Ribbit's solution: each frame a PNG toggled by scroll direction/progress) [S]; Lottie for icons.
- **Cost** H (art). **Risk** inconsistent illustration; character fatigue.
- **A11y/perf** Alt text for meaning only; preload sequences; avoid huge frame counts.
- **Suits** creative services, consumer apps, fintech for young audiences, HR/wellbeing. **Kills** conservative enterprise and legal.

### M07 Per-product mini-worlds
- **What** Each product/flavour/tier gets its own palette, illustration, 3D asset and copy tone; switching items changes the whole stage.
- **Seen in** La Revoltosa (butterfly soda, dragon seltzer, nocturnal crocodile tonic; classic grid alternative with animated toggle) [S].
- **Build** Data-driven theme per item (CSS custom properties), three-layer scroll sync (3D, 2D illustration, background) from one progress value; load only the active 3D model in memory [S].
- **Cost** H. **Risk** consistency, maintenance as range grows.
- **A11y/perf** Offer grid fallback; polygon reduction, shared geometry with swapped labels/textures [S].
- **Suits** DTC ranges, game/entertainment, plan-tiered SaaS with strong personas. **Kills** minimal catalogues where price comparison matters.

### M08 Physical-material world
- **What** Design as if the interface were made of a specific material (paper stocks, concrete, cork, glass, topographic paper).
- **Seen in** Obys Design Books (layered paper pages with distinct textures, visible stack, "paper physics" in GSAP) [S]; San Rita (grain and noise so 3D reads as printed map) [S]; Floema (type shaped by CNC cutting; paper stocks matched to product plastics) [S]; Awwwards trophies (concrete + recycled rubber; brutalist, gold W) [S].
- **Build** Texture assets + noise shaders; CSS `mix-blend-mode`, `filter`, SVG turbulence for light cases; GSAP for z-index/rotation choreography.
- **Cost** M-H. **Risk** texture weight; kitsch.
- **A11y/perf** Textures as background-image with fixed size; test contrast on textured areas.
- **Suits** craft, publishing, architecture, sustainability, hardware. **Kills** data-heavy dashboards.

### M09 Film pacing (storyboard, three acts, scroll as cuts)
- **What** Treat the page as an edited sequence: synopsis, acts, shots, holds; transitions as cuts or dissolves; fewer visible controls.
- **Seen in** Inkwell (synopsis + three-act arc + storyboard, one linear journey, pathfinder, single closing click) [S]; BL/S for Jason Bergh ("rhythm replaces navigation", transitions like film cuts) [S]; GQ x Audemars Piguet (one continuous timeline like a media player) [S].
- **Build** GSAP timelines or Theater.js; Mux/HLS for video; scroll-length budget per scene; audio engineered into navigation (fade, pause, resync on scrub) [S].
- **Cost** M-H. **Risk** users can't skip; long pages; mobile pacing differs.
- **A11y/perf** Provide chapter list and keyboard skip; honour reduced motion with step-through slides; captions for video/audio.
- **Suits** brand films, launches, directors, luxury, storytelling pitches. **Kills** task-oriented SaaS pages; SEO-critical content hubs.

### M10 Withholding / mystery
- **What** Reveal enough to create intrigue and let tone do the persuading.
- **Seen in** Inkwell (stealth AI company: "Proof by persuasion, not portfolio"; "make the invisible, irresistible") [S].
- **Build** Narrative arc + restrained visuals + one invitation CTA; careful copy.
- **Cost** M. **Risk** reads evasive to evaluators; B2B buyers need specifics.
- **A11y/perf** Ensure the minimum facts (what, who, contact) exist in text.
- **Suits** stealth startups, pre-launch, recruitment. **Kills** anything with a procurement checklist.

---

## B. Layout & grid

### M11 Index / catalogue with switchable views
- **What** The work (or products) is an index that the visitor can view as vertical list, horizontal sequence or grid with one shared content set.
- **Seen in** Obys 2026 (vertical, horizontal, grid; virtual scrolling) [S]; Orage (visual card grid vs terminal-style compact list) [S]; La Revoltosa (immersive vs classic grid) [S].
- **Build** Single data model; layout components; GSAP Flip for animated switching (Impronta uses Flip and SplitText [S]); virtual scrolling for long lists.
- **Cost** M. **Risk** three layouts to QA.
- **A11y/perf** Same DOM order across views; list view should be the fast, accessible default.
- **Suits** portfolios, agencies, publishers, catalogues. **Kills** single-product pages.

### M12 Overlap / layered stack
- **What** Elements overlap in z-space so the layout reads as a desk or collage rather than rows.
- **Seen in** Obys Design Books (all pages remain visible as a stack; navigation = click any page, overview, quick menu, reorder) [S]; fromanother (team members placed diagonally; services and clients scroll on a curve) [S].
- **Build** CSS grid with overlapping areas + `z-index`, GSAP for z/rotation; for DOM stacks keep structure shallow.
- **Cost** M. **Risk** per-screen rules stop working; content clipping on small screens.
- **A11y/perf** Reading order must match DOM; avoid overlap that covers text; check at 320px.
- **Suits** editorial, creative, culture, library/archives. **Kills** forms, data tables.

### M13 Diagonal / isometric break of the full-bleed
- **What** Break rectangular full-bleed with a diagonal or isometric composition to add tension.
- **Seen in** Inkwell (isometric compositions with diagonals; rotating wheel for systems thinking) [S]; Stripe Connect (CSS Grid stripes with `skewY(-12deg)`) [S].
- **Build** CSS transforms or clip-path; SVG for geometric primitives; keep content in a normal flow layer.
- **Cost** L-M. **Risk** text on skew harms legibility.
- **A11y/perf** Don't skew text blocks; GPU-friendly transforms only.
- **Suits** B2B, fintech, infra with technical identity. **Kills** long-form reading.

### M14 Poster-scale single statement
- **What** First viewport = one huge typographic or image statement with extreme scale contrast and few words.
- **Seen in** Razorpay's oversized sneaker (no product reference) [S]; (from memory) Vercel-style black-and-white stark hero with oversized type and punctuation accent [3P UXPin/tutorial describes Vercel as "stark black-and-white, generous type sizes, accent used as punctuation"].
- **Build** Fluid `clamp()` type scale, tight line-height (0.85-0.95 for display) [EN], one image or video, nothing else.
- **Cost** L. **Risk** mobile line-breaks; weak copy exposed.
- **A11y/perf** Keep h1 as text; ensure fluid scaling to 320px; minimum zoom behaviour.
- **Suits** launches, studios, fashion, dev tools with strong claim. **Kills** feature-led comparison pages.

### M15 Editorial figure framing ("Fig 0.1")
- **What** Document-like captions, numbering, margin notes and ruled sections that make marketing pages feel like a paper or manual.
- **Seen in** Linear ("Fig 0.x" captions, underlined titles, split headlines) [S]; Raycast ("FIG_0" markers, decorative rules) [S]; Siteinspire "Typographic" (2,105) and "Design & Art Direction" (1,945) tags show how widely editorial treatment is used [S].
- **Build** CSS grid with a marginal column; `counter()` for figure numbers; small caps/mono for captions.
- **Cost** L. **Risk** becomes a cliche across SaaS if copied without content that earns it. [EN]
- **A11y/perf** Use `<figure>/<figcaption>`.
- **Suits** dev tools, research products, infra, publishing. **Kills** playful consumer brands.

### M16 Single continuous page with anchor rail
- **What** One long narrative page, minimal fixed header of anchors, scroll as the only path.
- **Seen in** Glyphic Biotechnologies (continuous page, fixed anchor header, alternating dense/minimal sections) [S]; Farm Minerals (Problem / Explanation / Evidence / Application) [S].
- **Build** Semantic sections, `scroll-margin-top`, IntersectionObserver for rail state; focus management on anchor jump.
- **Cost** L-M. **Risk** loses deep-linkable subpages; long.
- **A11y/perf** Move focus to anchor target; sticky-header offset.
- **Suits** science, deep-tech, consideration-heavy products. **Kills** large catalogues.

### M17 Horizontal chapter
- **What** One section scrolls sideways (vertical wheel mapped to X) as a tactile, concept-driven aside.
- **Seen in** Oryzo's cork "microscope" horizontal scroll with a seamlessly looping periodic-noise texture [S]; Capitolium left-to-right walk [S].
- **Build** GSAP ScrollTrigger pin + scrub or CSS scroll-driven animation (Chromium/Safari 26; Firefox flag [3P]); use native `overflow-x` with scroll-snap as fallback.
- **Cost** M. **Risk** disorienting; trackpad/keyboard parity.
- **A11y/perf** Provide visible progress and keyboard access; avoid pinning > 300vh for text-heavy sections.
- **Suits** timelines, galleries, process. **Kills** text-heavy docs.

### M18 Modular live-canvas tile grid
- **What** Each tile is a dynamic canvas masking video fragments, flickering and syncing like data packets.
- **Seen in** Orage (WebGL grid, shader/time offsets; hover reveals masked fragments; draggable menu) [S].
- **Build** Three.js + canvas textures; one shared renderer; GSAP for micro-timing; Taxi.js transitions [S].
- **Cost** H. **Risk** GPU/memory; many video decoders.
- **A11y/perf** One shared WebGL context; limit simultaneous videos; fallback to poster tiles.
- **Suits** VFX/film, music, motion studios, creative tools. **Kills** content-first sites.

### M19 Dual-density modes (visual vs scan)
- **What** Offer both a cinematic view and a compact data/list view for the same content.
- **Seen in** Orage [S]; Obys (list/horizontal/grid) [S].
- **Build** Same data; two components; remember preference in localStorage with try/catch.
- **Cost** L-M. **Risk** low. **A11y/perf** List view as the SEO/AT-friendly one.
- **Suits** archives, catalogues, portfolios. **Kills** none significant.

### M20 Curated omission (three to four things only)
- **What** Show 3-4 hand-picked items and a quiet path to the rest.
- **Seen in** Telha Clarke (three or four highlighted projects → contextual image grid) [S]; Obys (awards, archives, extended case studies deliberately left off) [S].
- **Build** Editorial decision, not technical.
- **Cost** L (political cost high). **Risk** clients want everything.
- **A11y/perf** Ensure the secondary route is discoverable.
- **Suits** studios, architects, consultancies, luxury. **Kills** marketplaces and docs.

---

## C. Typography

### M21 Custom or modified typeface as identity seed
- **What** Begin the identity from the type; modify an existing face or commission one; let manufacturing/brand logic shape details.
- **Seen in** Obys NG (custom neo-grotesque shaping hierarchy and rhythm) [S]; Floema (Zimula; rounded ink traps echo CNC limits; ® counter removed) [S]; Cursor (CursorGothic custom face per unofficial extraction) [3P]; Linear (Inter Display for headings, Inter for text) [S]; Vercel/Basement made Geist [S].
- **Build** Foundry licence or commission; subset to WOFF2, `font-display: swap`/`optional`, preload the hero face; variable if multiple weights (a variable file ~100-200KB vs 400-800KB for multiple statics: [3P] estimates).
- **Cost** M-H (money). **Risk** licensing for web/app/embed; FOUT/CLS.
- **A11y/perf** Size-adjust fallback to prevent CLS; keep body type conventional.
- **Suits** any brand wanting ownership. **Kills** none, but low-budget projects should choose licensing over custom.

### M22 Mixed type voices
- **What** Two or three voices with distinct jobs: display (statement), text (reading), mono or small caps (technical/index/captions).
- **Seen in** Cursor: custom display + serif body + mono for code [3P, unofficial]; Resend: monospace accents [3P]; Orage mono terminal [S]; Linear caption style [S].
- **Build** CSS type tokens by role, not by size; a limited set of sizes; align baselines.
- **Cost** L. **Risk** too many voices = noise (Oryzo used ~99% one family) [S].
- **A11y/perf** Limit font files; check mono legibility at small sizes.
- **Suits** dev tools, editorial, research products. **Kills** very simple brochure sites.

### M23 Variable-font axis play
- **What** Weight/width/optical-size/slant animated on hover, scroll or load to make type feel alive.
- **Seen in** [3P] "variable fonts are the headline story of 2026" (madegooddesigns); common in Siteinspire "Typographic" work (from memory).
- **Build** `font-variation-settings` / `font-weight` transitions; CSS scroll-driven animations as enhancement (Firefox gap [3P]); GSAP for timeline control.
- **Cost** L-M. **Risk** layout shift if width changes; jitter.
- **A11y/perf** Animate only `font-variation-settings` within boxes of fixed size; avoid reflow on long text; reduced motion → static.
- **Suits** studios, editorial, fashion. **Kills** body copy.

### M24 Kinetic text reveal
- **What** Headline arrives by line/word/char with masks, blur or stagger; text can be re-composed on hover.
- **Seen in** Impronta (GSAP SplitText, Flip) [S]; fromanother (text surfaces through blur and fade) [S].
- **Build** GSAP SplitText (free since GSAP's 2024 acquisition by Webflow [S]) with `aria-label` on parent and `aria-hidden` spans; line-mask reveals via `overflow: clip`.
- **Cost** L. **Risk** overuse; delays reading; flashes of unstyled text.
- **A11y/perf** Reveal within ~400-700ms [EN]; show text instantly under reduced motion; avoid per-character on paragraphs.
- **Suits** most creative landings. **Kills** reading-heavy pages.

### M25 Type in the 3D scene
- **What** Headline built as geometry inside the WebGL world so letters interact with light, refraction and camera.
- **Seen in** La Revoltosa (each letter separate geometry, distorted by bottle refraction) [S].
- **Build** Three.js `TextGeometry`/troika-three-text/MSDF; maintain DOM duplicate of the headline.
- **Cost** H. **Risk** a11y, SEO, performance.
- **A11y/perf** DOM h1 stays; hide canvas text from AT. Floor item in `creative-direction.md`.
- **Suits** product launches, entertainment, beverages. **Kills** SEO-critical SaaS.

### M26 Technical monospace voice
- **What** Mono as a first-class voice: indices, metadata, labels, system messages.
- **Seen in** Orage [S]; Resend (mono accents) [3P]; Raycast (command mock-ups) [S].
- **Build** One mono (e.g., Geist Mono / JetBrains Mono / Berkeley Mono), tabular numerals.
- **Cost** L. **Risk** mono-everywhere fatigue; "dev-tool cliche".
- **A11y/perf** Min 12-13px, adequate letter-spacing.
- **Suits** dev tools, data, hardware. **Kills** warm consumer and luxury.

### M27 Type as image (masks, fills, extreme crops)
- **What** Text acts as a window: video/image fill, outline, huge crops that bleed off the edge.
- **Seen in** (from memory) Siteinspire/Httpster typographic galleries; Httpster describes itself as "typographic, minimal, brutalist vibes" [S].
- **Build** `background-clip: text`, SVG `<mask>`, `mix-blend-mode`, canvas text for shader displacement.
- **Cost** L-M. **Risk** legibility.
- **A11y/perf** Keep contrast of fallback colour; avoid for body copy.
- **Suits** fashion, music, studios. **Kills** compliance-heavy pages.

---

## D. Scroll storytelling & motion systems

### M28 Scroll as timeline (media player)
- **What** Scroll scrubs a pre-authored timeline: camera, dialogue, UI, environment and audio.
- **Seen in** GQ x Audemars Piguet RD#5 (Theater.js tuned in the rendered scene; audio fades/pauses/resyncs on scrub; 60fps target on iPhone 11/12-class) [S].
- **Build** Theater.js or GSAP timeline + Three.js; Blender for assets; audio engineered with Web Audio.
- **Cost** H. **Risk** sync bugs, mobile.
- **A11y/perf** Captions/transcript; scrub control; reduced motion → step slides.
- **Suits** luxury, interviews, editorial campaigns. **Kills** transactional SaaS.

### M29 Scroll-scrubbed path drawing
- **What** A line/thread is drawn by scroll progress, linking sections and orienting the reader.
- **Seen in** MindMarket (paused GSAP timeline scrubbed by Locomotive scroll progress; DrawSVG; three layered paths; CustomEase) [S].
- **Build** GSAP DrawSVGPlugin; IntersectionObserver to lazy-start Rive illustrations; manual per-breakpoint positioning (85 elements) [S].
- **Cost** M. **Risk** breakpoints.
- **A11y/perf** Decorative; avoid layout shift.
- **Suits** services, research, HR/wellbeing, B2B storytelling. **Kills** dense apps.

### M30 Frame-sequence scrub
- **What** Video-like product moments driven by scroll via PNG/WebP/AVIF frame sequences or sprite sheets.
- **Seen in** Glyphic (PNG-sequence play-on-scroll for key explanatory moments) [S]; Ribbit (PNG toggling beat WebGL on Safari) [S]; Oryzo (image sequences/film) [S].
- **Build** Canvas drawImage with preloaded frames; compress; limit to 60-150 frames; lazy-load by section; poster on mobile.
- **Cost** M. **Risk** weight (several MB).
- **A11y/perf** Provide text alternative; use `loading` strategies; test on slow networks.
- **Suits** hardware, science, product turntables. **Kills** low-bandwidth markets without fallbacks.

### M31 Persistent canvas across routes (camera dive)
- **What** A WebGL scene stays mounted while routes change; navigation is camera movement, not page loads.
- **Seen in** San Rita (canvas mounted outside Next.js App Router; click dives camera to map coordinate; Lenis + GSAP; Draco + KTX2; adaptive grain/shadow) [S].
- **Build** R3F; HTML layer for type/UI; DatoCMS-driven content; route state mapped to camera.
- **Cost** H. **Risk** state complexity, back-button, memory leaks.
- **A11y/perf** Real URLs and HTML content; adaptive quality on fps drop.
- **Suits** portfolios, place-based brands. **Kills** SEO-heavy product sites.

### M32 Page transitions as continuity
- **What** Transitions carry elements/colour/logo between pages so navigation feels like one object.
- **Seen in** Goodgrowth (project-to-project scroll transition) [S]; Fluid Glass (continuous project flow, subtle) [S]; fromanother (bleed/diffuse) [S]; Telha Clarke (Taxi) [S].
- **Build** View Transitions API (same-document Baseline since Firefox 144, Oct 2025; cross-document not in Firefox) [3P]; Taxi.js/Barba for MPA; Nuxt/Next transitions with GSAP.
- **Cost** M. **Risk** transitions slow repeat navigation.
- **A11y/perf** Under reduced motion use opacity-only or none; keep < 500ms [S Stripe guidance]; focus reset on arrival.
- **Suits** nearly all portfolios, brand sites, e-commerce. **Kills** none.

### M33 Motion identity as one verb
- **What** A single stated motion rule governs everything ("bleed and diffuse"; "weighted, measured"; "nothing slides or snaps").
- **Seen in** fromanother [S]; Obys ("motion as a system") [S]; Obys Design Books ("measured, weighted pace") [S]; Fluid Glass motion studies [S].
- **Build** A motion token file (durations, easings, distances); lint animations against it; use motion studies in Jitter/After Effects/Figma Motion before code.
- **Cost** L-M. **Risk** none beyond discipline.
- **A11y/perf** Tokens include reduced-motion variants.
- **Suits** every brand. **Kills** none.

### M34 Colour-state background
- **What** The whole background moves between colour states while content stays minimal.
- **Seen in** fromanother (layered videos with opacity + blend modes instead of GLSL) [S]; Ponpon (colour reserved for fantasies) [S].
- **Build** Compressed looping video layers + `mix-blend-mode`; or CSS gradients with `@property`; or a tiny shader.
- **Cost** L-M. **Risk** video weight, banding.
- **A11y/perf** Poster + reduced motion static colour; maintain text contrast across all states (test each).
- **Suits** studios, wellbeing, music. **Kills** data UIs.

### M35 State-machine illustration (Rive)
- **What** Illustrations and diagrams driven by scroll, hover and click states, not loops.
- **Seen in** Razorpay (100+ Rive triggers incl. click-run agent flow) [S]; Savor (scroll-controlled diagrams) [S]; MindMarket (Rive illustrations started via IntersectionObserver) [S]; Floema (Rive) [S]; Figma's homepage (Rive blog, 2023) [S vendor].
- **Build** Rive runtime (WASM), data binding, IntersectionObserver start/stop; designers own animation, devs wire scroll sync [S Savor].
- **Cost** M. **Risk** pixel-heavy canvases slow down [S Savor].
- **A11y/perf** Pause off-screen; text as DOM; static fallback image.
- **Suits** SaaS explainers, fintech, health. **Kills** photoreal brands.

### M36 Physics and inertia
- **What** Objects have mass: drag, throw, collide, settle.
- **Seen in** Ponpon About page (Matter.js) [S]; Inkwell (RapierJS) [S]; MaxMara (Rapier2D WASM with 2D physics in a 3D scene) [S]; Bruno Simon (vehicle physics world) [S].
- **Build** Matter.js (DOM-ish 2D), Rapier (WASM); decouple game loop from UI framework with a store as bridge [S MaxMara].
- **Cost** M-H. **Risk** CPU; mobile battery.
- **A11y/perf** Pause when hidden; reduced motion → static composition.
- **Suits** playful brands, portfolios. **Kills** conservative B2B.

### M37 Restrained depth (parallax grids)
- **What** Light parallax on an image grid for richness without spectacle.
- **Seen in** Telha Clarke (parallax and depth on contextual image grid) [S]; Mastercard (subtle parallax and microinteractions) [S].
- **Build** GSAP ScrollTrigger `yPercent`; transform-only.
- **Cost** L. **Risk** vestibular triggers.
- **A11y/perf** WCAG 2.3.3 names parallax as a motion-sensitivity risk [S]; disable under reduced motion.
- **Suits** architecture, hospitality, editorial. **Kills** text-heavy pages.

---

## E. Cursor, hover & interaction

### M38 Cursor-reactive overlay on imagery
- **What** The image reacts to the pointer with shapes drawn from the brand's graphic language.
- **Seen in** Lando Norris (OFF+BRAND.): blob-like overlays echo the helmet's graphic language as the cursor moves; neon accents drawn from helmet [3P DesignRush].
- **Build** Canvas/WebGL mask or SVG blobs following pointer with lerp; gate under `(pointer: fine) and (hover: hover)`.
- **Cost** M. **Risk** feels gimmicky if not tied to brand graphic.
- **A11y/perf** Native cursor retained; no information only on hover.
- **Suits** sport/entertainment, fashion, music. **Kills** enterprise.

### M39 Contained ripple / distortion on thumbnails
- **What** A tuned image-space distortion on hover or transition, confined within the image.
- **Seen in** fromanother (the ripple is the only real 3D; "stays inside the image rather than spreading across the screen" after extensive tuning; extended into transitions) [S].
- **Build** Three.js/OGL plane with displacement shader; one shared canvas; swap textures.
- **Cost** M-H. **Risk** performance on big grids.
- **A11y/perf** Text/link remains DOM; reduced motion → crossfade.
- **Suits** studio/portfolio index, galleries. **Kills** product catalogues.

### M40 Hover reveal of masked media
- **What** Hovering a card reveals a masked video fragment or alternative state.
- **Seen in** Orage [S]; Goodgrowth "desktop thumbnail element" (Awwwards "great element") [S].
- **Build** CSS clip-path + `<video muted playsinline>`; touch fallback = tap to preview or autoplay in view.
- **Cost** L-M. **Risk** bandwidth; many videos.
- **A11y/perf** `preload="none"`; pointer gating; focus triggers reveal.
- **Suits** film/motion/product indices. **Kills** low-bandwidth.

### M41 Playable world / game
- **What** The site (or section) is a game: drive, draw, collect.
- **Seen in** Bruno Simon 2026 (WebGPU/TSL world authored in Blender; achievements, whispers, seasonal weather; no HTML UI; open source) [S]; MaxMara FW25 (draw bridges, collect diary pages; 270k users) [S].
- **Build** Three.js/TSL, Rapier, Blender naming-convention pipeline; adaptive quality presets for mobile [S].
- **Cost** H. **Risk** scope, moderation (Whispers use OpenAI moderation [S]).
- **A11y/perf** Provide an accessible non-game path; keyboard/gamepad/touch inputs.
- **Suits** portfolios (as proof of skill), fashion/entertainment campaigns. **Kills** everything utilitarian.

### M42 Guided conversion questionnaire
- **What** A friendly multi-step form that educates and pre-qualifies (instead of a blank contact form).
- **Seen in** Ribbit (five categories; reduces intimidation of hiring a motion agency) [S]; Farm Minerals' narrative-to-application flow [S]; Fluid Glass "Get a Quote" capturing project details [S].
- **Build** Multi-step form with progressive disclosure, saved state, server-side validation.
- **Cost** M. **Risk** drop-off if too long.
- **A11y/perf** Labels, error handling, keyboard flow, `autocomplete`.
- **Suits** services, B2B sales, custom products. **Kills** self-serve checkout.

### M43 Playful CTA reaction (sleeping characters)
- **What** The CTA region triggers character/state behaviour that nudges action.
- **Seen in** Ribbit footer (characters sleep in mouse holes; appear on hover of coloured CTA) [S].
- **Build** Sprite or PNG sequence toggling; hover + focus triggers.
- **Cost** L-M. **Risk** gimmick if slower than the CTA itself.
- **A11y/perf** CTA must work without animation; focus-visible parity.
- **Suits** creative services, consumer. **Kills** enterprise.

### M44 Loader as concept statement
- **What** The first 1-2 seconds state the idea (boot sequence, spiral, logo hand-off, dark→light flip).
- **Seen in** Orage (system boot, authentication badge) [S]; Goodgrowth spiral preloader [S]; Obys (old→new logo, dark→light) [S]; Telha Clarke (founder-referencing loader) [S]; Fluid Glass [S].
- **Build** CSS/GSAP; real loading progress where possible; skip for returning visitors via sessionStorage in try/catch.
- **Cost** L. **Risk** delays LCP; annoys repeat visitors.
- **A11y/perf** Don't block content; < ~2s; allow skip; announce nothing.
- **Suits** studios, brand sites. **Kills** tools and docs.

### M45 Sound identity
- **What** Intentional audio: score, ambient bed, spatialised SFX, minimal UI sounds.
- **Seen in** Bruno Simon (3 commissioned CC0 tracks, spatialised object audio, one click sound at varied rate) [S]; Floema (licensed river/birdsong base, in-house ambient on sustainability) [S]; MaxMara (3 soundtracks, ~40 bites) [S]; 100 Lost Species (sound by Mooders) [S].
- **Build** Web Audio API/Howler; start muted after a gesture; persistent toggle; fade on scrub/visibility.
- **Cost** M (+ $3-10k [3P]). **Risk** autoplay policies; annoyance.
- **A11y/perf** Visible toggle, default off or user-initiated; never essential information.
- **Suits** games, luxury, cultural, nature brands. **Kills** workplace tools.

---

## F. Image, 3D & product-as-hero

### M46 Gaussian-splat hybrid
- **What** Photoreal captured/rendered props and reflections as splats, everything else textured planes.
- **Seen in** Oryzo (splats only for props and desk reflections: ~78k desktop / ~45k mobile after ~900k full-scene attempt; camera positions on a hemisphere not along the scroll path) [S].
- **Build** Houdini/Redshift render → Postshot/Lichtfeld → web splat renderer; texture-density remap (centre half gets ~90% of detail) [S].
- **Cost** H. **Risk** tooling, mobile.
- **A11y/perf** Poster fallback; cap splat counts per device.
- **Suits** premium physical products. **Kills** most SaaS.

### M47 Interactive product viewer with CMS ingestion pipeline
- **What** Rotatable GLB product pages whose models are auto-optimised at upload.
- **Seen in** Floema (glTF Transform + Meshoptimizer + Draco in CMS; editors set initial camera; generated PCSS shadows; shadow cache; on-demand render) [S].
- **Build** Sanity/Contentful hook, glTF-Transform, R3F with `frameloop="demand"`; auto-framing.
- **Cost** H. **Risk** asset quality drift.
- **A11y/perf** Static render for catalogue; keyboard rotate; reduce polygons.
- **Suits** B2B catalogues, furniture, hardware. **Kills** services.

### M48 Baked-lighting 3D scene
- **What** Pre-rendered lighting so the real-time scene matches a film and runs cheap.
- **Seen in** Duroc (shadows baked into renders; colours render as designed) [S].
- **Build** Blender bake → unlit materials in Three.js; shared assets across film and site.
- **Cost** M-H. **Risk** less dynamic.
- **A11y/perf** Lower GPU use; good for mobile.
- **Suits** stylised brands, mascots. **Kills** realism-led work.

### M49 Cheap-illusion background
- **What** Look of fluid/shader depth from layered pre-rendered video with blend modes.
- **Seen in** fromanother [S]; Stripe 2017 (CSS-drawn cubes and gradients as lightweight 3D) [S].
- **Build** `<video>` layers, `mix-blend-mode`, opacity timelines; or CSS gradients + SVG filters.
- **Cost** L-M. **Risk** video bitrates; Safari autoplay.
- **A11y/perf** Muted, `playsinline`, poster; pause off-screen.
- **Suits** wide range. **Kills** none.

### M50 Grain / noise / hand-made texture
- **What** Add noise, paper, or ink to digital surfaces so they stop reading as plastic.
- **Seen in** San Rita (custom GLSL grain; Substance baked rocks) [S]; 100 Lost Species (soft watercolour textures) [S]; Obys Design Books (paper stocks) [S].
- **Build** SVG `feTurbulence`, tiled noise PNG, shader noise; adjust density by fps.
- **Cost** L. **Risk** banding; contrast loss.
- **A11y/perf** Keep noise below text contrast threshold; avoid animated grain under reduced motion.
- **Suits** craft, editorial, hardware. **Kills** none.

### M51 Real people, real drawing, no stock
- **What** Photograph real people or commission illustration; state the "no stock" rule.
- **Seen in** La Revoltosa (no models; studio team and client's friends at a bar) [S]; MindMarket (hand-drawn, no stock or AI) [S]; Inversa (hand-drawn line art with nature photography) [S]; Oryzo (photographed cork) [S]; Savor (macro food photography) [S].
- **Build** Art direction brief + consistent grade (Mastercard colour-corrected mixed library) [S]; scan/photograph physical references.
- **Cost** M-H (budget). **Risk** inconsistency.
- **A11y/perf** Proper alt text; modern formats (AVIF/WebP).
- **Suits** nearly all. **Kills** none.

### M52 Real-UI product hero with on-message data
- **What** The product interface is the hero image, populated with believable content about the audience's work.
- **Seen in** Linear (issues, roadmap, agent chat, PR review; "Fig 0.x"; changelog teasers) [S]; Raycast (command-palette-style mockups; keyboard) [S/3P].
- **Build** Real components rendered with sample data (not images) if possible; static-first with enhance-on-view animation; `prefers-reduced-motion` for any "Working..." sequences.
- **Cost** M. **Risk** UI drifts from product.
- **A11y/perf** Mark mockups `role="img"` with description or hide decorative duplicates.
- **Suits** SaaS, dev tools, AI products. **Kills** hardware/physical.

### M53 Guided interactive demo / agent-flow replay
- **What** Replace screenshots with a short, steerable walkthrough or click-to-run flow that mirrors the live product.
- **Seen in** Inversa's Origin guided tour (SVG animation + video of workflows) [S]; Razorpay's click-run agent flow in Rive [S].
- **Build** Rive state machine or scripted DOM sequence; step controls; restartable.
- **Cost** M-H. **Risk** maintenance as product changes.
- **A11y/perf** Step controls are real buttons; transcript; pause/replay.
- **Suits** SaaS with complex workflows, B2B. **Kills** simple utilities.

### M54 Product-adjacent object hero
- **What** Hero is an object tied to the product's world (keyboard for a launcher).
- **Seen in** Raycast ("Your shortcut to everything" with a keyboard graphic and four labelled traits) [S].
- **Build** Rendered image/3D, CSS keycap details, labelled hotspots.
- **Cost** M. **Risk** feels merchandised.
- **A11y/perf** Hotspot labels as text.
- **Suits** productivity tools with hardware affinity. **Kills** pure web products with no physical referent.

### M55 Outcome worlds (make the abstract tangible)
- **What** Turn invisible services into visible worlds: landscapes, particle fields, 3D outcomes.
- **Seen in** Mastercard (each outcome a 3D landscape built from circles/arcs/cylinders; 2D people projected onto 3D planes to save budget) [S]; Inversa (landscape regenerates as invasive species fade) [S]; Heidelberg CCUS (particle fields with matcaps, pre-baked camera paths, globe + 360 modules) [S]; Glyphic (3D + diagrams) [S].
- **Build** Blender/C4D → Three.js; pre-baked camera paths; dynamic asset loading; placeholder assets early.
- **Cost** H. **Risk** metaphor mismatch.
- **A11y/perf** Provide text-first summary per outcome; adaptive resolution.
- **Suits** enterprise storytelling, deep-tech, sustainability. **Kills** transactional SaaS.

---

## G. Creative restraint (when simple is the bolder choice)

### M56 Quiet space makes motion loud
- **What** Keep layout, type and colour extremely calm so the few motions register.
- **Seen in** Razorpay (two colours; "motion feels meaningful only when the surrounding space is quiet") [S]; Fluid Glass [S]; 100 Lost Species [S].
- **Build** Two-colour tokens; a motion budget (e.g., 3 animated moments per viewport max) [EN].
- **Cost** L. **Risk** reads empty if copy/images weak.
- **A11y/perf** Naturally low-risk.
- **Suits** fintech, craft, editorial. **Kills** brands needing visible energy.

### M57 Remove the menu (rhythm replaces navigation)
- **What** Strip navigation and explanatory UI; pacing and sequence do the work.
- **Seen in** BL/S for Jason Bergh [S]; Inkwell's single linear journey [S]; 100 Lost Species (no menus, filters reorder) [S].
- **Build** Subtraction pass; keep escape routes (contact, skip).
- **Cost** L (design cost high). **Risk** not for every audience; the BL/S team accepted this [S].
- **A11y/perf** Keep keyboard-accessible skip links and a minimal nav alternative.
- **Suits** directors, artists, narrative launches. **Kills** sites with many tasks.

### M58 Kill-your-darlings pass
- **What** Build the delight, then remove each effect once and keep only those without which the concept fails.
- **Seen in** San Rita (birds, weather, day-night removed) [S]; Oryzo ("knowing when to stop") [S].
- **Build** Feature-flag every effect; review each flag off.
- **Cost** L. **Risk** emotional.
- **A11y/perf** Improves both.
- **Suits** all. **Kills** none.

### M59 Contrarian palette (calm where the category is loud, light where it is dark)
- **What** Choose the opposite tonal register to the category.
- **Seen in** Glyphic (neon gradients replaced by calm green-yellow) [S]; Cursor (warm off-white and warm-brown text per unofficial extraction) [3P]; Inversa (neither green non-profit nor tech-blue) [S].
- **Build** OKLCH tokens for light/dark pair; test contrast.
- **Cost** L. **Risk** accessible contrast of warm neutrals.
- **A11y/perf** Run contrast checks on off-white/brown.
- **Suits** dev tools, biotech, AI products. **Kills** brands whose users expect dark-mode IDE alignment (judgement).

### M60 One interactive entry point
- **What** One distinctive widget is the main CTA/navigation/motion source; the rest is static and calm.
- **Seen in** Telha Clarke (animated widget redirects, switches views, reveals info; its state transitions became the motion language) [S]; Fluid Glass (navigation island) [S].
- **Build** One component with defined states; reuse its easing/duration across the site.
- **Cost** M. **Risk** the widget must be excellent.
- **A11y/perf** Keyboard/AT patterns for the widget; reduced motion.
- **Suits** studios, architecture, premium services. **Kills** none.

---

## Matrix: which moves suit which brand types (quick lookup)

Y = strong fit, P = possible with care, N = likely damages.

| Brand type | Strong | Possible | Avoid |
|---|---|---|---|
| Developer tool / infra SaaS | M15, M22, M26, M52, M53, M56, M59, M33 | M04 (terminal), M14, M35, M44 | M07, M38, M41 |
| Enterprise / B2B platform | M16, M29, M35, M55, M60, M56 | M09, M31 | M04 pastiche, M41, M43 |
| Fintech | M01, M14, M35, M53, M56 | M52 | M43, M06 (unless youth) |
| Consumer app / AI product | M02, M06, M35, M52, M32 | M03, M45 | M10 |
| Creative studio / portfolio | M04, M11, M12, M18, M31, M39, M44, M60 | M41 | M52 |
| DTC / physical product | M05, M07, M08, M46, M47, M48, M51 | M45 | M26 |
| Deep tech / biotech | M16, M30, M55, M59 | M35 | M43, M38 |
| Nonprofit / editorial | M03, M09, M50, M57 | M17 | M18 |
| Luxury / fashion | M09, M28, M45, M14 | M12 | M43 |
| Marketplace / e-commerce | M47, M11, M32 | M42 | M57, M01 as sole nav |

## Combination notes

- **One primary, two supporting.** Oryzo = grounded environment (M05) + splat hybrid (M46) + restraint in type/colour (M56) + humour voice (M02). Razorpay = metaphor navigation (M01) + state-machine (M35) + two-colour restraint (M56). Telha Clarke = curated omission (M20) + single widget (M60) + restrained depth (M37).
- **Loud + loud cancels.** Pair a loud primary (M18, M41, M31) with quiet type and colour.
- **Rotate the device, not only the paint.** If the last three outputs used Lenis + GSAP marquee + magnetic buttons + big numerals, pick a primary from a different category (e.g., layout M12 or voice M02) for the next brief. [EN]
- **Every loud move needs its fallback paired** (poster, static, text alternative). See `creative-direction.md` section 2a.

## Moves that are cheap but high-yield (try first) [EN]

M02 voice, M14 poster hero, M15 figure framing, M20 curated omission, M21/M22 type voices, M33 motion identity, M44 concept loader, M49 cheap illusion background, M50 grain, M51 real imagery, M56 quiet space, M58 kill pass, M59 contrarian palette, M60 single widget.

## Moves that need a specialist / high budget

M25 3D type, M28 scroll timeline, M31 persistent canvas, M41 playable world, M46 splats, M47 product viewer pipeline, M55 outcome worlds.

## Open questions (moves file)

- Several examples (Vercel hero, Stripe gradient, Cursor face, Resend mono) come from third-party summaries or my memory; verify live before citing as evidence.
- Costs and risk levels are engine estimates, not sourced.
- Codrops-only build write-ups were unreachable (HTTP 403), so some recent award sites (4WIDE, Dash Creative, ZERO, Goodgrowth article) are listed only from search summaries.
