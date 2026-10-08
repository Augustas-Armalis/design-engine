---
source: web:awwwards.com/blog case studies (the-new-obys, fluid-glass-case-study, designing-for-an-identity-that-shapeshifts, razorpay-sprint26, la-revoltosa, gq-audemars-piguet, mapping-the-uncharted-the-san-rita-project, floema, capitolium, reshaping-telha-clarkes-digital-home, brunos-portfolio-case-study, not-a-portfolio-a-presence, 100-lost-species, maxmaras-woman, inversa, mindmarket, farm-minerals, ribbit, mastercard-business-outcomes, case-study-orage, glyphic-biotechnologies, inkwell, duroc, ponpon-mania, savor, heidelberg-ccus, obys-design-books, case-study-impronta) + blog.lusion.co Oryzo BTS parts 1-3 + awwwards.com/sites/oryzo-ai + utsubo.com award guide + linear.app/now redesign + stripe.com/blog/connect-front-end-experience + siteinspire.com taxonomy + cssdesignawards.com + w3.org WCAG 2.3.3 + web.dev/MDN/Chrome support notes
chapter: Creative, distinctive, award-level direction (method, restraint, last 20%)
pages: n/a (web research, fetched 2026-10-08)
topic_tags: [art-direction, concept, creative-process, awards, restraint, template-avoidance, polish, webgl-judgement, saas-brand-world, scroll-storytelling]
status: studied
---

# Creative, distinctive, award-level direction

Companion file: `art-direction-moves.md` (the 60-move catalogue, IDs `M01`..`M60`). This file is the *method*: how to pick a concept, how to avoid the template, how to push competent work to memorable work, and when to stay quiet.

**How to read this note.**
- `[S]` = taken from a fetched primary source (a studio's own case study, the Awwwards page, a vendor doc). Case studies are self-reported by the people who built the site; none include independent measurements.
- `[3P]` = third-party blog/marketing claim. Directional only.
- `[EN]` = engine note, my own design knowledge, not from a source. Treat as hypothesis.
- Owner brief: **do not turn this into rules that cap creativity.** So this file separates a **floor** (a short list of fundamentals that are checkable and not negotiable) from a **ceiling** (nothing: the moves, the method and the judgement tests below are prompts, not limits).

---

## 1. Core ideas

1. **Concept first, layout second.** Every strong write-up starts with an idea that can be said in one sentence and then lets it dictate structure, type, motion and copy. Obys started with a typeface and "the site as a space" before any layout [S]. Razorpay's metaphor was "a shopper's walk through a store" so the six product verticals became six steps of a journey, and the page opens on a giant sneaker with no dashboard [S]. Capitolium = "a walk through Place du Capitole"; scroll goes top-to-bottom and left-to-right like crossing a square [S]. San Rita = a vintage topographic map as the navigation [S]. If you cannot state the idea in one sentence, you have a theme (colours and vibes), not a concept.

2. **The idea is a system, not a feature.** MindMarket's "thread" is the narrative spine, the orientation device, the visual signature and a repeatable interaction pattern [S]. Ponpon Mania's chapters are albums and panels are songs [S]. 100 Lost Species has one persistent timer that carries the whole meaning [S]. Obys's lesson: "Build a system, not a set of features. Coherence between typography, motion, layout, and interaction matters more than any single feature" [S]. A concept that appears in loader, menu, hover, list view and footer feels authored (Orage: terminal metaphor from boot-sequence loader to list view [S]).

3. **Distinctiveness comes from inverting the category default, not from adding effects.** Ribbit: most motion studios use clean black-and-white so the work dominates; they went colourful and character-led on purpose [S]. Glyphic: dropped neon orange/purple gradients for calm green-yellow and white because biotech sites all look alike [S]. Inversa: avoided both "green non-profit" and "startup tech-blue gradient" [S]. Razorpay: B2B fintech normally leads with trust signals, pricing, dashboard [S]. Procedure: list what every competitor does, then decide which one or two defaults to invert, and keep everything else conventional so it stays usable.

4. **Constraint is the source of coherence.** Two-colour palettes: Razorpay (#0039FF + #151515) [S], Oryzo (#100904 + #FF8539 on the Awwwards page; the BTS says four values: cream, near-black, muted olive, orange) [S], Goodgrowth (#3803f2 + #fefefe) [S]. Oryzo: about 99% of type in one family [S]. Telha Clarke: only three or four projects featured [S]. Fluid Glass: "generous whitespace, clear typography, simple layouts" [S]. Constraints make the one thing you *do* break look intentional.

5. **One signature moment beats ten effects.** [3P] utsubo: "a single memorable interaction rather than many effects"; [3P] svilenkovic: winners use one or two strong effect moments, losers use generic particle backgrounds and template-derived layouts. Consistent with primary sources: San Rita *built then deleted* flying birds, weather and day-night because they distracted [S]; Oryzo's lesson is "knowing when to stop is often harder than adding detail" [S].

6. **Fake what you can, build what earns it.** fromanother: only the ripple is real 3D; the colour-shifting background is layered video with blend modes. "Knowing which effects to fake and which to build" [S]. Ribbit tried WebGL spritesheets, found Safari choppy, shipped a PNG sequence [S]. Oryzo used Gaussian splats only for props and desk reflections (~78k splats desktop / ~45k mobile) after a full-scene attempt at ~900k still showed flaws, and texture-mapped everything else [S]. Duroc baked lighting into renders so the web scene matches the film [S].

7. **The brand has a voice, and copy is a design material.** La Revoltosa: the site is narrated in first person by the brand, "the brand introduces itself", bar-counter irony; copy treated "as a core design element, not decoration" [S]. Oryzo: deadpan humour is one of four principles (the others: realistic image, product at the centre, seamless transitions) [S]. Basement's own site: "cool shit that performs" [S].

8. **Subtraction is a design act and the hardest one.** Obys: deciding what to exclude (awards, archives, extended case studies) was the hardest part [S]. BL/S: menus and explanatory UI were progressively *removed*, not refined; "Removing elements is harder than adding them because each remaining decision carries more weight" [S]. Razorpay: motion "feels meaningful only when the surrounding space is quiet" [S].

9. **Show the real thing.** Real people at a bar, no hired models (La Revoltosa) [S]; hand-drawn illustration, no stock/AI imagery (MindMarket, Inversa) [S]; a photographed cork bark sample, ~180 RAW images, used across site and film (Oryzo) [S]; the product UI itself as the hero (Linear shows issue lists, roadmap, agent chat and PR review with realistic content, captioned "Fig 0.x") [S]. [3P] A 2026 SaaS analysis says abstract-art heroes are losing to early product display.

10. **Performance and mobile are part of the creative decision.** San Rita's high-poly models crashed mobile browsers; they "killed their darlings" and baked to low-poly, Draco + KTX2, adaptive grain/shadow quality [S]. GQ x Audemars Piguet targeted a steady 60fps on iPhone 11/12-class devices and treated mobile as the primary constraint [S]. La Revoltosa admits 60fps on every mid-range phone is "nearly impossible" and managed memory instead [S]. Bruno Simon: "Performance, not feature count, limits creative ambition on the web" [S].

11. **Judges punish usability failure more than they reward spectacle.** [3P] Awwwards weights: Design 40%, Usability 30%, Creativity 20%, Content 10% (multiple third-party sources agree; not verified against an official page). [S] Oryzo's own Awwwards page: Design 7.90, Usability 7.51, Creativity 8.35, Content 7.76 (SOTD 7.86); developer award 7.87 with Accessibility the weakest category at 7.00 vs Animations/Transitions 8.60 and WPO 8.60. So even a Site of the Month's weak spot is the accessibility floor. CSS Design Awards scores UI / UX / Innovation, WOTD winners seen on 2026-10-08 ranged 8.01-8.58 [S].

12. **AI is a production tool under direction, not the art director.** Oryzo used Midjourney early only to explore composition, then switched to non-AI 3D for finals [S]. GQ/AP dropped AI-generated silhouettes: "Precision matters" [S]. Floema used AI for animated birds/seasons but "required heavy iteration and human control" [S]. MindMarket: "No stock or AI-generated imagery" as a stated design decision [S]. [3P] Trend pieces claim imperfection/friction/texture is reading as "authentic" against AI sameness; the claim comes largely from vendors and has no independent measurement.

---

## 2. Rules

Format per schema. Rules are tagged **FLOOR** (checkable, protect the user; breaking needs an explicit written reason) or **PROMPT** (a question the designer must answer; never a prohibition).

### 2a. The floor (non-negotiable fundamentals)

- **RULE** (FLOOR) Honour `prefers-reduced-motion` for every non-essential animation, scroll-jacking/smooth-scroll, parallax, autoplay loops and WebGL camera motion. Provide a static or crossfade equivalent that still tells the story.
  **Why** WCAG 2.3.3 (AAA) targets motion triggered by interaction, with parallax named explicitly as vestibular-risky; CSS (C39) and JS (SCR40) techniques exist [S: w3.org Understanding 2.3.3]. 2.2.2 (Pause, Stop, Hide, level A) covers anything that auto-starts and lasts over 5 seconds [EN, from WCAG].
  **Applies to** all. **Check** grep for `prefers-reduced-motion` in CSS and JS; emulate reduce in DevTools and confirm no scroll-linked transforms, no autoplay video loops without pause control. **Source** w3.org WCAG 2.3.3 page.

- **RULE** (FLOOR) Smooth-scroll libraries (Lenis etc.) must be disabled under reduced motion, must not break keyboard scrolling (arrows, PgUp/PgDn, Space, Home/End), find-in-page, anchor links, and focus must move to anchor targets with a scroll offset for sticky headers.
  **Why** Library-driven scroll replaces native behaviour; a plugin vendor claims Lenis registers no keyboard handler [3P, unverified]. WCAG 2.4.12 Focus Not Obscured applies to sticky headers [3P summary].
  **Applies to** all with smooth scroll. **Check** tab through page, press Space and arrows, use `#anchor` links, confirm focus ring never hidden under header. **Source** frontendchecklist.io (search result), CSS-Tricks (search result).

- **RULE** (FLOOR) Gate custom cursors and hover-only reveals behind `@media (pointer: fine) and (hover: hover)`; keep the native cursor as default; every hover reveal needs a focus equivalent and a touch path.
  **Why** touch has no pointer to follow; `hover: hover` alone can match on Android long-press emulation; iPadOS ignores image cursors [3P]. Keyboard and screen-reader users never trigger hover.
  **Applies to** all. **Check** emulate touch; Tab through all interactive items and confirm the same content appears. **Source** search synthesis (css-irl, react-aria docs).

- **RULE** (FLOOR) Text stays real HTML text. If headline letters are rendered as 3D geometry or canvas (La Revoltosa) or split per letter for kinetic type, keep an accessible text equivalent (visible DOM text, `aria-label` on the split container with `aria-hidden` on the spans, or a visually hidden duplicate).
  **Why** Canvas text is invisible to assistive tech, find-in-page, translation and SEO. **Applies to** landing page. **Check** disable JS/canvas; the h1 and primary copy must still read; screen reader outputs the sentence once. **Source** [EN]; La Revoltosa technique [S].

- **RULE** (FLOOR) Budget and measure on a real mid-range phone. Working targets (a studio's own marketing numbers, treat as aspirational): LCP < 1.5s, CLS < 0.05, INP < 100ms, total weight < 3MB, 60fps sustained, Lighthouse mobile 90+ [3P: utsubo; svilenkovic].
  **Why** performance failures are what score down creative sites; Awwwards dev jury scores WPO separately (Oryzo 8.60) [S].
  **Applies to** all. **Check** Lighthouse mobile + a trace on a throttled device; compare to budget. **Source** utsubo.com; Awwwards Oryzo page.

- **RULE** (FLOOR) Every WebGL/3D/Rive/video hero needs a designed fallback: poster frame or static render for no-WebGL, reduced-motion, low-power and failed-load states; the page must be usable before the heavy asset arrives.
  **Why** GPUs, battery saver, in-app browsers and Firefox on Linux (reported black canvas with WebGPU [3P]) fail silently. Oryzo/San Rita/MaxMara all ship adaptive quality (frame-rate-triggered downgrades: grain density, shadow resolution; MaxMara halves animation step below 30fps) [S].
  **Applies to** all. **Check** block WebGL (`--disable-gpu`), throttle CPU 6x, confirm usable layout and legible content. **Source** San Rita, MaxMara, Floema [S].

- **RULE** (FLOOR) Contrast, legible type size and tap-target minimums from the rest of the knowledge base still apply to expressive type. Oversized or mixed-voice type does not exempt body copy, labels or controls.
  **Why** expressive display type is safe only when body/controls stay conventional. **Check** run the contrast and size checks in the main notes. **Source** [EN].

- **RULE** (FLOOR) Real content only. No lorem ipsum, no stock people, consistent colour grade across imagery (Mastercard colour-corrected a mixed image library to unify it [S]); inner pages must match the home page's craft [3P: utsubo].
  **Applies to** all. **Check** visual + grep for lorem/placeholder. **Source** Mastercard case [S]; utsubo [3P].

### 2b. The ceiling (prompts, never caps)

Each of these is a question the direction brief must answer in writing. An answer of "no, because X" is valid.

- **PROMPT** What is the one-sentence concept, and which three decisions (type, layout, motion) does it dictate? If none, it is a theme.
- **PROMPT** Which category defaults are we inverting (max two), and which are we keeping on purpose so the site stays usable?
- **PROMPT** What is the signature moment, where is it on the page, and what does it cost (kB, ms, GPU, a11y fallback)?
- **PROMPT** What world are we in: place, material, medium, era, or character cast? Could another brand in the category use this world unchanged? If yes, it is not specific enough.
- **PROMPT** What did we deliberately leave out, and would a reviewer notice the omission?
- **PROMPT** Where does the voice speak (headline, microcopy, errors, loader, footer, 404)?
- **PROMPT** What is real on this page (photographed, drawn, simulated, coded) versus faked, and why?
- **PROMPT** What reward is there for attention (a hidden detail on the second look)?
- **PROMPT** What would make this a worse site if the metaphor were removed? (If nothing, the metaphor is wallpaper.)

---

## 3. Numbers & scales

| Item | Value | Tag |
|---|---|---|
| Awwwards criteria weights | Design 40 / Usability 30 / Creativity 20 / Content 10 | [3P] several blogs, not official page |
| Awwwards jury mechanics | min. 18 jurors, 3 furthest scores dropped, 6.5+ = Honorable Mention, dev jury > 7 = Developer Award | [3P] utsubo |
| Oryzo AI (Lusion), SOTD 2026-04-13 | overall 7.86; D 7.90 / U 7.51 / C 8.35 / Content 7.76; users 9.33; dev 7.87 (Anim 8.60, WPO 8.60, Responsive 7.80, SEO 7.60, Markup 7.20, A11y 7.00); jurors' overall ranged 6.60-9.20; later Site of the Month April 2026 | [S] awwwards.com/sites/oryzo-ai |
| CSSDA | UI / UX / Innovation; WOTD average > 8.00 required; 6.0-7.99 = Special Kudos | [3P] utsubo; recent WOTD seen 8.01-8.58 [S] |
| Gap between a 6.2 and a 7.5 score | "the final three weeks of polish": transition timing, loading states, edge cases on unusual screens | [3P] utsubo |
| Submission timing | wait 2-4 weeks after launch to fix bugs; avoid July-Aug, late Dec-Jan | [3P] utsubo |
| Budget tiers (studio estimates) | entry $30-60k / 8-12 wks; competitive $60-120k / 12-18 wks; premium $120-200k+ / 18-24 wks; sound design $3-10k; photo/video $5-20k+; copy $3-8k | [3P] utsubo |
| Perf targets | LCP < 1.5s, CLS < 0.05, INP < 100ms, < 3MB, 60fps | [3P] utsubo |
| Oryzo splat budget | ~78k splats desktop, ~45k mobile (first full-scene attempt ~900k); texture density remapped so centre half of surface gets ~90% of detail | [S] Lusion BTS 2 |
| Bruno Simon grass | single-triangle blades, ~78,400 total; ETC1S/UASTC textures; Draco with quantization; project took "just over a year" | [S] |
| Floema | 230+ product assets optimised; glTF Transform + Meshoptimizer + Draco at upload in CMS; render loop only runs during interaction; shadow map cached when still | [S] |
| MaxMara FW25 game | if fps < 30, animation step interval doubles; 270,000+ users in month one, 54,327 (>20%) continued to Maxmara.com; 8-stanza poem voiced in 12 languages; ~40 sound bites, 3 soundtracks | [S] (self-reported) |
| Razorpay Sprint26 | 100+ Rive triggers, 2 colours, Webflow + Rive + Three.js; built in-house by the communication design team, no agency hand-off | [S] |
| MindMarket | 85 animated/static elements positioned by hand across breakpoints; paths: main + secondary + shadow (shadow fades in near 0.95 of timeline) | [S] |
| Inkwell | 90 images compressed with KTX2; OGL + Vue custom renderer + Rapier | [S] |
| Stripe Connect page (2017) | CSS Grid stripes with `skewY(-12deg)`; laptop drawn in CSS < 1KB; Express demo ~5KB using Web Animations API; most animations < 500ms; custom cubic-bezier | [S] stripe.com/blog |
| Linear redesign | LCH colour; theme variables cut from 98 to 3 (base, accent, contrast); Inter Display for headings; ~6 weeks, small dedicated team | [S] linear.app/now |
| Siteinspire tags (counts) | Typographic 2,105; Design & Art Direction 1,945; Minimal 847; Grid Layout 672; Unusual Layout 671; style tags include Brutalist (5), Unusual Navigation (215), Scrolling Behaviour (611), Interactive (263), Illustrative (282) | [S] siteinspire.com 2026-10-08 |
| GSAP | acquired by Webflow Oct 2024; all former Club plugins (SplitText, MorphSVG, ...) now free incl. commercial | [S] webflow.com update + GSAP README |
| CSS scroll-driven animations | Chromium 115+, Safari 26+; Firefox off by default in the data seen; use `@supports (animation-timeline: view())` as enhancement | [3P] compat data via search |
| View Transitions | same-document: Baseline newly available since Firefox 144 (Oct 2025); cross-document: Chrome 126, Safari 18.2, Firefox not supported | [3P] web.dev / Chrome docs via search |
| WebGPU | Chrome/Edge 113+, Safari 26, Firefox 141 (Win) / 145 (macOS); Three.js `three/webgpu` falls back to WebGL2; Linux Firefox black-canvas reports | [3P] secondary blogs, verify against MDN |

---

## 4. Dos and Don'ts

**Concept**
- DO name the world in one sentence ("a shopper's walk through a store", "a Brontë-inspired sketchbook", "the brand introduces itself", "a storytelling platform disguised as a digital tool") and test every section against it. DON'T pick a mood ("clean, modern, premium") and call it a concept.
- DO write 3-4 design principles as veto power (Oryzo: realistic image / product at the centre / seamless transitions / humour; Mastercard: clarity / depth / presence). DON'T write principles that any site could claim.
- DO let the concept change the information architecture (Heidelberg: 29 articles in six exploration zones, globe + six 360 modules; Mastercard: macro-to-micro, global -> outcome -> case). DON'T paint a metaphor over a standard nav.

**Process**
- DO storyboard like film before wireframes when the site is a narrative (Inkwell: synopsis, three-act arc, storyboard mapping content, motion, scroll triggers). DON'T start from a section stack.
- DO prototype the feel before production: motion studies on timing/easing (Fluid Glass), proof-of-concept video (Mastercard), paper sketches of what moves (Ponpon), Theater.js live tuning in the rendered scene (GQ/AP), Tweakpane/debug view so the illustrator can tune without a dev (Ponpon). DON'T hand off static comps for motion-led work.
- DO give assets a cheap placeholder early so stakeholders judge composition (Mastercard). DON'T wait for final 3D to judge layout.
- DO set a deadline when there is no client (Bruno Simon, end of 2025 + public devlogs). DON'T iterate forever.

**Type, colour, image**
- DO seed the identity from a typeface choice and make it carry brand logic (Floema's Zimula: rounded ink traps echo CNC cutting limits; the ® counter removed because sharp internal corners are impractical to manufacture). DON'T default to the same neo-grotesque stack everywhere.
- DO use colour as meaning (Ponpon: colour only in DJ fantasies; fromanother: background colour state as the brand carrier). DON'T spread accent colour evenly.
- DO unify imagery with grade, grain or shared lighting (San Rita adds noise/grain so 3D reads as paper; Duroc bakes lighting). DON'T mix stock, CGI and phone photos ungraded.

**3D and motion**
- DO render only when something changes (Floema), pause off-screen (Unicorn Studio runtime pauses out of view [3P]), cap pixel ratio [EN], cache shadows. DON'T run a permanent 60fps loop for a static scene.
- DO simulate physical behaviour rather than hand-animating it when it matters (Oryzo packaging tear in Vellum). DON'T fake cloth/liquid/tear with keyframes if realism is the joke.
- DO prefer cheap illusions (layered video + blend modes; PNG sequence; baked lighting). DON'T use true real-time 3D for every effect.
- DO make continuity out of motion (Goodgrowth project-to-project scroll transition, Fluid Glass continuous project flow, fromanother "bleed and diffuse, never slide or snap"). DON'T cut hard between pages if the concept is fluid.

**Product / SaaS**
- DO use the real product with realistic, on-message sample data as the hero (Linear). DON'T fill UI mockups with lorem or generic charts.
- DO let a conversion path be part of the play (Ribbit's guided five-category booking questionnaire; sleeping characters wake on hover of the CTA). DON'T bolt the CTA on after the story.
- DO build the CMS and asset pipeline so the client can keep the standard (Floema optimises GLB at upload; Orage CMS fields mirror the visual modules). DON'T ship a site that degrades the first time marketing uploads a 20MB model.

---

## 5. Exceptions & judgement calls

- **Floor vs ceiling conflict.** Scroll-jacked, reduced-motion-hostile pieces still win awards. The way to hold both: build the expressive version and a calm version from the same content; reduced-motion should be a designed equivalent (Orage / 100 Lost Species-style static states), not a broken page. Judges' accessibility scores are often the weakest dev-jury category (Oryzo 7.00) [S], so it is where a competitor can overtake on quality without losing creativity.
- **"Simple is bolder" is not a free pass.** Restraint reads as authored only when it has a tell: extreme scale contrast, a single unexpected move, perfect type, a surprising omission, a considered pause. Un-themed minimalism looks like a default (see section G of `art-direction-moves.md`, M56-M60). [EN]
- **WebGL hero as expectation.** [3P] svilenkovic claims a WebGL hero is now expected on premium awards entries; [3P] StudioMeyer's mid-2026 self-review says 3D/WebGL "underperformed because of performance costs" and anti-grid brutalism emerged as a counter to bento. Sources disagree: do not infer WebGL is mandatory for distinctiveness. Obys, Telha Clarke, Impronta, Farm Minerals, Fluid Glass, Glyphic and 100 Lost Species are mostly DOM/GSAP/Rive with at most one WebGL moment [S].
- **Brutalism has two meanings in 2026 sources.** Raw/rough/human vs precise/engineered (1px borders, sharp geometry) [3P lovart, digitalagencybangkok, pixso]. Lovable's guide says brutalist styling fails in finance, healthcare and enterprise B2B where conventional polish signals trust [3P]. Counter-example: Razorpay (fintech) used a "modern blueprint" aesthetic of technical line work + two colours + a sneaker [S]. Judgement: the industry penalty is for *roughness that signals carelessness*, not for a strong point of view.
- **Dark-mode default.** Linear's critique (Anthony Hobday) argued dark mode was popularised by Linear and suits its tone but spread to brands it does not suit [3P]. Unofficial extraction of Cursor's site describes warm off-white `#f2f1ed` with warm-brown text `#26251e` as a departure from the dark norm [3P, unofficial, accuracy not guaranteed]. Treat "not dark" as a legitimate distinguishing move for dev-tool brands. [EN]
- **Hand-placement is expensive but visible.** MindMarket positioned 85 elements by hand per breakpoint to keep rhythm [S]. Worth it for hero compositions, not for body sections.
- **Trust sectors.** Farm Minerals (agri science) deliberately chose "credibility over spectacle": one idea per section, product as visual anchor, restrained motion, because "in conservative industries, trust outweighs visual spectacle" [S]. Distinctive does not mean loud.
- **Humour is a risk multiplier.** Oryzo's six-finger hand joke works because of production precision and a premium feel [S]. Humour with sloppy execution reads as unserious. [EN]
- **Sound.** Bruno Simon, MaxMara, Floema and 100 Lost Species use sound as UX/emotion [S]. WCAG audio-control and autoplay-policy rules still apply: default muted with an obvious toggle. [EN]
- **Award strategy is not the same goal as a good product site.** The utsubo guide frames work around chasing SOTD; a SaaS landing page that must convert has different success measures. Use awards research for craft, not as a spec. [EN]

---

## 6. Figures worth keeping (pages to look at; screenshot into `examples/`)

- awwwards.com/sites/oryzo-ai: restrained 4-colour system, desk world, product-as-hero via photographed cork + splats.
- Razorpay Sprint26 (case: awwwards.com/razorpay-sprint26-the-future-of-payments.html): sneaker hero; blueprint line work; Rive triggers.
- Linear homepage (linear.app): "Fig 0.x" captions, realistic product mockups. [S]
- Obys 2026 site and Obys Design Books: stacked paper pages; switchable list/horizontal/grid portfolio. [S]
- Orage (Beaucoup): terminal metaphor with WebGL tile grid. [S]
- Ribbit: character-owned layout. La Revoltosa: first-person brand voice. Inkwell: storyboard-led single linear journey. [S]
- Floema: CMS-ingested interactive GLB with generated shadows. San Rita: persistent 3D canvas across routes. [S]
- Bruno Simon 2026 portfolio (open source, MIT): world authored in Blender with naming conventions that drive physics. [S]
- Siteinspire "Unusual Layout" and "Unusual Navigation" tag pages; Godly redirects to recent.design (motion/web-interface studies); Httpster ("typographic, minimal, brutalist vibes") for non-WebGL distinctiveness. [S]

---

## 7. Open questions

- Codrops case studies (tympanus.net) returned HTTP 403 for archive and category fetches; Codrops-only build write-ups (Goodgrowth, 4WIDE, Dash Creative, ZERO, Shopify Spring '26) were not read. Only their one-line summaries from search are known.
- Awwwards Site of the Year 2025 winners: a search suggested OFF+BRAND.'s Lando Norris site and abeto's Messenger carry the badge, but the badge assignment was ambiguous; no build details found. Not used as evidence.
- Lusion Oryzo BTS Part 1 (concept and creative direction): the page is ~350k characters of embedded image data; only the first lines were readable. Parts 4-7 are not published on the blog index at fetch time. Part 3 only partly read (first 100k chars).
- Awwwards criteria weights and CSSDA thresholds are from third-party pages; the official criteria page was not retrieved.
- Godly now redirects to recent.design (a motion/branding gallery); the old Godly web-design list was not retrieved. Lapa.ninja returned 403.
- No independent benchmarks exist in what I found for Unicorn Studio vs Spline vs Rive; only vendor docs. Vendor claim: Unicorn Studio runtime ~29KB gzipped (36KB elsewhere) [3P].
- Cursor / Raycast / Resend colour and type details come from unofficial design-system extractions; Resend's home page was not retrievable (agent index returned). Do not quote hex values from these as fact.
- Browser-support claims for scroll-driven animations, cross-document view transitions and WebGPU differ between sources; re-check MDN/caniuse before shipping.
- No source quantified conversion impact of award-style sites vs conventional SaaS pages. The one reach figure (MaxMara, 20% click-through to collection) is a brand activation, self-reported.

---

# PART B: THE METHOD

## B1. Choosing a concept (a procedure the engine can run)

Output = a **Direction Brief** (store in `ledger/` with the screenshot):

```
concept:        one sentence, a world not a mood
category_defaults_inverted:  [max 2]  # e.g. "black-and-white agency site" -> "colourful, character-led"
category_defaults_kept:      [..]     # e.g. conventional nav, real pricing page
world:          place | material | medium | era | cast     # pick one primary
principles:     3-4 veto phrases
constraints:    palette (2-4), type (1 family >=90%, +1 accent), signature_moment (1), device (1 recurring)
voice:          3 adjectives + 2 sample lines (headline, error message)
real_vs_fake:   what is photographed/drawn/simulated/coded/faked
fallbacks:      reduced-motion, no-WebGL, slow-network
omissions:      what we are leaving out on purpose
moves:          [M## primary, M## x2 supporting]   # from art-direction-moves.md
divergence:     nearest 3 prior outputs / category sites and what differs
```

Steps:

1. **Interrogate the product truth.** Ask: what does this product physically do, make, or change? Where does it live (desk, field, city, terminal)? What is its unfair detail (CNC limits, protein expansion, cork)? Concepts that arrive from product truth survive scrutiny: Floema's CNC-derived type, Inversa's regenerating landscape, Capitolium's shared square, Heidelberg's particles for carbon capture. [S]
2. **Cliche audit.** List the category's ten default moves (hero layout, imagery, palette, type, section order, CTA copy). Mark the two to invert, the rest keep. (Ribbit, Glyphic, Inversa, Razorpay each did exactly this.) [S]
3. **Pick a world by one of five routes.**
   - *Place/map:* Capitolium, San Rita, Duroc's amusement park.
   - *Medium:* terminal (Orage), comic + music player (Ponpon), magazine/book (Ribbit process page, Obys books), film (Inkwell, BL/S, GQ/AP), game console (Goodgrowth per Codrops summary), sketchbook (MaxMara).
   - *Material/object:* paper stocks (Obys books), cork (Oryzo), glass (Fluid Glass), concrete (Awwwards trophy).
   - *Character/voice:* La Revoltosa's first-person soda, Ribbit's five archetypes, MindMarket's hand-drawn cast.
   - *Phenomenon/metaphor:* light (fromanother), thread (MindMarket), timer (100 Lost Species), shopping walk (Razorpay).
4. **Reference triad (method [EN]).** Choose three references, at least two from outside web design, and write for each *the rule you steal, not the look*. Example: print poster (steal: one scale jump, 8:1 size ratio, hard crop), film (steal: cut on action, hold a beat), physical object (steal: one material, one edge treatment). A fourth web reference is allowed as an existence proof. If you can't state a rule, it's a skin; drop it. Compare the three to each other: if they agree on everything, pick a different one for friction.
5. **Write the principles and constraints** (see the brief). Cap palette at 2-4 colours, type at one family (+ one accent voice), one device, one signature moment.
6. **Candidate duel.** Write 3 distinct concepts in one sentence each (from different routes in step 3). Score 1-5 on: (a) truth to product, (b) distinctiveness vs the category audit, (c) buildable within the budget and mobile constraint, (d) a11y/perf risk (inverse), (e) works as a system across loader, nav, list, footer, error states, (f) the copy it enables. Pick the highest total; if two tie, choose the one that is cheaper to build well (Oryzo compared an abstract product study with the desk and chose the desk, "accepting less minimalism for a more believable world" [S]).
7. **Storyboard / prototype the feel** (Inkwell storyboard; Mastercard proof-of-concept video; Fluid Glass motion studies; Ponpon paper sketches).
8. **Run the divergence check** against the last N outputs (README pipeline: "direction must diverge from recent work"). Compare world, palette, type pairing, layout skeleton, signature moment. Reject if three or more match. [EN]

## B2. Avoiding the template

**Template tells** [EN, with some third-party support] and the question to ask instead of a ban:

| Tell | Ask instead |
|---|---|
| Default sans (Inter/Geist-style) at default weights for everything | Where is the voice? Is there one place the type does something only this brand would? |
| Purple/blue gradient blob or mesh behind a centred headline | What image would only this product have? |
| Centred hero + two buttons + logo strip | What does the first screen *show* that no competitor shows? |
| Three equal icon cards | Which of these three is the actual point? Give it five times the space. |
| Bento grid for everything | [3P StudioMeyer: bento and dark mode "still winning" in mid-2026, brutalism arrived as counter] Does the content have unequal importance? If yes, hierarchy, not tiles. |
| Glass cards with hairline borders | What is the surface material of this world? |
| Generic particle/orb background | [3P] named as a loser pattern; replace with product-specific matter (cork, thread, terrain). |
| Stock people / abstract 3D shapes | Who is the actual person, place or object? |
| Identical section rhythm (heading, subhead, visual, repeat) | Where does the page break its own rhythm once, on purpose? |
| Hero stat counters and "trusted by" as the only proof | What would a sceptical expert want to see running? |

**Rule of two:** at most two decisions invert the category; all other decisions stay boringly correct. This is how Razorpay (fintech) can open with a sneaker and still have clear product sections.

**Where the template sneaks in even in "creative" work:** the same Lenis + GSAP + marquee + magnetic-button + big-number-index + cursor-follower kit. If the build is identical to last time, the output will be too, whatever the palette. Rotate the *device*, not just the paint. [EN]

## B3. From competent to memorable: the last 20%

Third-party claim (utsubo): the gap between 6.2 and 7.5 is the last three weeks of polish. Here is a checklist built from sources plus engine notes. Each item is a prompt; do the ones the concept calls for.

**Arrival and departure**
- A designed loader that states the concept (Orage boot sequence; Goodgrowth spiral; Telha Clarke loader referencing the two founders; Fluid Glass logo animates then hands off to home; Obys old-logo -> new-logo and dark -> light) [S]. Loader under ~2s perceived or progressive; skip on repeat visit [EN].
- Page transitions that keep the concept (Taxi.js, Barba, View Transitions API same-document; Baseline since Oct 2025 [3P]).
- End-of-page menu expansion (Fluid Glass) so the next step is already open [S].
- 404, empty, error and offline states in the brand voice and world. [EN]

**Craft in the small**
- One timing and easing system (motion studies first: Fluid Glass). Custom cubic-bezier over defaults (Stripe's recommendation: custom curves, mostly < 500ms) [S].
- Hover, focus-visible, active and pressed states all designed; focus ring in the brand style, never removed. [EN]
- Image grade consistent; grain/noise on 3D to avoid plastic (San Rita) [S].
- Optical alignment of type, tabular numerals for data, balanced headline wraps (`text-wrap: balance`), hanging punctuation, OpenType features (Raycast uses Inter ss03 per unofficial extraction [3P]). [EN]
- `::selection` colour, scrollbar styling, tab title / favicon state changes, OG image per page, and `theme-color`. [EN]
- Microcopy with a point of view (button labels, tooltips, form errors, cookie banner).

**Authorship signals** (what reads as "a person decided this")
- A visible omission (Obys; BL/S).
- A hand-placed, expensive detail (MindMarket's 85 elements; Floema's bird idle loops with startled takeoff on scroll [S]).
- A recurring device paid off at the end (Ribbit footer characters sleeping in mouse holes; Ponpon colour only in fantasies) [S].
- A joke or reward on second look (Oryzo's six-fingered hand; Bruno's cryptic achievements) [S].
- One place where the system breaks its own rule.
- Copy that sounds like a specific voice (La Revoltosa).

**Craft honesty**
- Test on a real mid-range phone and an old laptop; MaxMara and La Revoltosa both admit trade-offs rather than pretending (e.g., "60fps on every mid-range phone is nearly impossible") [S].
- Run the "kill your darlings" pass: San Rita deleted birds, weather and day-night. Remove each effect once and ask whether the concept survives. [S]
- Use QA personas (Inkwell tested as executives, developers, designers) [S].

**The last-20% loop for the engine** [EN]: render -> screenshot at 3 widths -> list the 5 weakest craft details (type rhythm, spacing at breakpoints, state coverage, image grade, motion timing) -> fix -> re-render. Also run the "squint test" (blur the screenshot: is there one focal point?) and the "cover test" (hide the logo: could this be another brand?).

## B4. Creative restraint: when simple is the bolder choice

Evidence that quiet wins:
- Fluid Glass: whitespace, clear typography, simple layouts; motion tested and tuned but kept subtle; premium for a craft brand [S].
- Telha Clarke: "Less interface doesn't mean less experience." One interactive widget as the single CTA/motion template; 3-4 featured projects [S].
- Impronta: "The elegance of an interface lies in its transparency"; every component has a purpose, no ornament [S].
- 100 Lost Species: soft watercolour textures, slow motion, no menus, editorial test "does it add meaning or noise?" [S].
- Farm Minerals: calm one-idea-per-section for a conservative industry [S].
- Obys: lean stack, plain CSS, in-house animation on rAF + Web Animations API, custom neo-grotesk; curation over completeness [S].
- Razorpay: restraint around motion so the motion registers [S].
- Linear's product redesign: reduced visual noise, 98 theme variables to 3, alignment changes "meant to be felt after a few minutes" [S].

**When to choose simple** (heuristics, [EN]):
1. The product is the proof (dev tools, utilities): show it, caption it, get out of the way.
2. The audience is conservative or expert and trust is the conversion.
3. The content is already visual and dense (architecture, glass, products): the UI must be transparent.
4. The brand's value is calm or precision.
5. Budget/time can't support polish on the complex version: a simple site with perfect type beats a complex site with jank.

**What makes simple distinctive rather than default** (each simple site needs at least one):
- Scale: one type size jump that is uncomfortable (e.g., 10:1) and a lot of air.
- A single material or colour used fiercely.
- A considered pause (a held frame, an empty viewport that finishes a thought).
- A surprising omission (no nav; no logo wall; no hero image).
- A craft detail only attention finds (custom kerning pair, perfectly set numerals, a transition that follows the concept).
- A voice.

**When simple is the *wrong* choice:** when the category's default is already minimal and the brand needs to be seen (everyone in dev-tools uses dark minimal; Ribbit chose colour and characters to stand out against minimal motion studios [S]); and when the concept's whole value is an experience (Bruno Simon's portfolio is the game).

## B5. When heavy tech earns its place (WebGL/Three.js/shaders/OGL/Spline/Rive/Lottie)

[EN synthesis grounded in cited cases]

| Tool | Earns its place when | Costs / fails when |
|---|---|---|
| Three.js / R3F | The 3D object *is* the product or the world (Floema configurator-like GLB, San Rita map, Bruno Simon, Duroc park, Oryzo desk, Mastercard outcome worlds) | Mobile memory (San Rita crash), loader weight, a11y gaps, 60fps on mid phones "nearly impossible" (La Revoltosa) |
| OGL / TWGL / raw WebGL | A few planes or one shader (Ponpon layers, Inkwell, Savor's SDF logo melt, Orage tile masks); small bundle | Hand-rolled infrastructure; context management on CMS pages (Savor needed shared WebGL context) |
| Shaders (GLSL/TSL) | Material grain, distortion, ripple, mask, transitions that CSS can't produce | Cost grows with pixels and layers; test on mid GPUs; Unicorn Studio's own docs say each layer is a shader pass with a visible cost [3P] |
| Gaussian splats | Photoreal captured/rendered scene with limited camera motion (Oryzo hybrid) | Capture planning, splat counts, tooling immaturity; not for text/UI |
| WebGPU/TSL | Compute-heavy particles or advanced effects, with WebGL fallback | Still verify support (Linux Firefox); same fallbacks required |
| Rive | State-machine UI illustration/diagrams, scroll- or click-driven; light runtime (Razorpay 100+ triggers; MindMarket; Savor diagrams; Floema) | Performance falls as drawn pixels grow (Savor lesson) so not for full-canvas effects |
| Lottie/dotLottie | Simple icon loops from After Effects (Ribbit icons) | Not interactive; heavier than needed for state; Intercom moved from Lottie to Rive (Rive blog) [S vendor] |
| Spline | Quick 3D embeds, prototypes | [3P] anecdotal slow loads; a tool for exploration more than shipping heavy scenes |
| PNG/WebP sequence scrubbing | Product turntables, complex footage you can't do live (Glyphic; Ribbit chose it over WebGL for Safari) | Weight (use sprite sheets/compression, frame budgets, lazy load) |
| GSAP + ScrollTrigger (+ SplitText, Flip) | Almost everything scroll/timeline; now fully free [S] | Over-use → generic "GSAP site"; scroll-jack a11y |
| Lenis | Weighted, cinematic scroll (San Rita tuned "scroll weight") | A11y and keyboard concerns; disable on reduced motion |
| Theater.js | Timeline-authored 3D camera/motion tuned live (GQ/AP) | Authoring tool; adds editor to dev |
| CSS scroll-driven animations / View Transitions | Progressive enhancement of reveals, progress, transitions with no JS | Firefox gap for scroll-driven; cross-doc VT not in Firefox |

Decision test: *Could a 600KB poster + CSS do 80% of this?* If yes, ship the poster and put the budget into type, copy, and the signature moment.

## B6. Identity systems for SaaS and brand worlds

- **Wordmark / logo as active element** (Obys: refined not replaced, adapts across layouts; Fluid Glass loader hand-off; Telha Clarke loader refs founders) [S].
- **Motion identity:** one verb. fromanother: "Anything that slid or snapped was ruled out; text surfaces through blur and fade, transitions bleed and diffuse" [S]. Write it as a sentence and make it a lint rule for motion.
- **Colour identity:** two or four values max; one named accent used for state or emphasis only (Ponpon; Oryzo orange).
- **Type identity:** custom or modified (Obys NG, Floema Zimula, CursorGothic [3P]); or one family used with discipline (Oryzo 99%; Linear: Inter Display for headings, Inter for the rest [S]).
- **Character system:** Ribbit's five archetypes own layout space; MindMarket's illustrated cast; La Revoltosa's per-flavour animals (butterfly, dragon, nocturnal crocodile) with palette, 3D bottle and copy shifting together [S].
- **Sound identity:** commissioned score + spatial SFX (Bruno), nature bed + entry/exit stingers (Floema), curated bites (MaxMara). Minimal UI audio: Bruno used a single click sound with varied playback rate [S].
- **Voice identity:** specific sample lines per surface; first-person, irony, understatement, deadpan, hype (Basement) [S].
- **Content-as-identity for SaaS:** "Fig 0.x" captions, changelog teasers, realistic product data (Linear) [S].
- **Extend beyond the site:** La Revoltosa plans street events; Obys applies the same principles to print and presentations; Floema's paper stocks match product materials [S]. Identity is proven when it survives off-screen.

## B7. Product-as-hero and interactive demos

- **Realistic UI with on-message data** (Linear).
- **Guided tour instead of screenshots** (Inversa's Origin showcase) [S].
- **Click-to-run agent flow in a state machine** (Razorpay's Rive agent flow mirroring the live product) [S].
- **Object adjacent to product** (Raycast hero is a keyboard graphic with four labelled traits) [S, page text].
- **SVG/video UI walk-throughs** that show workflow in motion (Inversa) [S].
- **Code as hero** (dev tools): real syntax, copyable, animated typing only if reduced-motion-safe. [EN]
- **Scrollytelling the architecture** (Glyphic's play-on-scroll PNG sequences; MindMarket path-drawing) [S].
- Rule of thumb [EN]: if the product UI is pretty and legible, show it at real size; if it is dense, show one annotated state; if the value is invisible (data, security), make a world of it (Mastercard outcomes as 3D landscapes with brand geometry as visual DNA [S]).

## B8. Microsites and launch pages

- Launch/hub pages can break more rules because the lifespan is short and the goal is a feeling plus a routing job: Capitolium centralised pop-up, competition, fixtures and routed to club ticketing/stores [S]; MaxMara game funnelled to the collection (20% click-through, self-reported) [S]; GQ x AP is one continuous timeline like a media player [S]; Shopify Editions (Codrops summary only; unread).
- Still ship fallbacks; social/in-app browsers are the entry point (GQ/AP treated mobile as primary) [S].
- Architecture first so motion feels alive: Capitolium's lesson "architecture determines whether motion feels alive" [S]; set foundations while identity is still evolving [S].

---

## Mechanical hooks for the pipeline (what a script can check)

- Reduced-motion: CSS/JS contains `prefers-reduced-motion` handling for any `animation`, `transition > 300ms`, `scroll-behavior: smooth`, or scroll library; assert no `scroll-behavior: smooth` unconditional.
- Cursor: any `cursor: none` appears only inside `@media (pointer: fine) and (hover: hover)`.
- Canvas text: `h1` exists in DOM with real text content even when `<canvas>` is present.
- Fallbacks: `<canvas>`-based hero has a poster/`<img>` or CSS fallback and `no-webgl` class path.
- Budget: Lighthouse mobile run, total transfer, LCP/CLS/INP vs the table above (aspirational).
- Palette/type constraint: count distinct colour tokens and font families used; compare to Direction Brief constraints.
- Divergence: compare Direction Brief fields to the last N briefs; flag if world + palette + signature moment repeat.
