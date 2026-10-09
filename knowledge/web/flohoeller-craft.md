---
source: web:affectui.com (home, library index, 25 component pages, 5 screens, 6 blocks, 8 illustrations, 8 motion effects, docs, pricing) + adfects.com (single page, all sections + inline JS) + flohoeller.com + recruitpilot.co (client site) + GitHub README flohoeller/affectui + threads.com/@growthflo (public posts)
chapter: Product UI and marketing-site craft of Florian Hoeller (Flo, @flohoeller / @growthflo, Vienna): tokens, card-in-card anatomy, buttons, depth-of-field hero, curved 3D reel, motion grammar
pages: n/a (web; Playwright 1440x900 DPR 2, getComputedStyle, document.getAnimations(), served CSS and inline JS read directly)
topic_tags: [product-ui, saas-marketing, component-library, ai-agent-ui, card-in-card, concentric-radius, buttons, gradient-button, chips, hero, depth-of-field, collage, 3d-reel, perspective, motion, stagger, blur-in, reduced-motion, dark-mode, typography, inter, benchmark, flohoeller]
status: studied
---

# Florian Hoeller (Flo): measured craft study

Credit: all work studied here is by **Florian Hoeller** ("Florian Höller", Design Engineer, Vienna; one-person studio **adfects**; author of the component library **affectUI**). The founder considers him the best product/UI designer working today. We study the grammar; we never ship his assets, copy, illustrations or component source (affectUI Pro is paid; the free items are MIT but we still rebuild, not copy).

Evidence tags: **[M]** = measured with getComputedStyle / getAnimations on the live page; **[CSS]** = read from his served stylesheet; **[JS]** = read from his inline script; **[C]** = his own words in a CSS/JS comment or docs (quoted under 15 words); **[V]** = read from a screenshot. Local captures: `knowledge/benchmarks/flohoeller/` (section 9). Tokens: `system/variety/flohoeller-tokens.json`.

## 0. The one-paragraph answer

Flo's work looks expensive because it is **small, quiet and exact, with every number derived from another number**. One typeface (Inter), essentially one weight (500), a 13px UI base, greys from a single ramp, a single accent per site. Every surface is a **grey tray holding a white card**, and every inner radius is the outer radius minus the inset (14 - 6 = 8, 20 - 4 = 16, 32 - 8 = 24). Edges are 1px rings at 5-8% ink, not borders; shadows are a 1-2px contact shadow plus at most one wide soft blur. Product content is **specific and real** (a Lisbon offsite with €2,880 for three nights, Strabag and Raiffeisen logos, "Answered in 3.6s"). Motion is **calm and generous**: everything enters with `opacity 0 + translateY(4-10px) + blur(2-8px)` on `cubic-bezier(0.22, 1, 0.36, 1)`, 260-520ms, staggered 40-70ms, and every state change (height, width, label, number) glides instead of jumping. Then each site gets **one big owned visual**: affectUI's depth-of-field collage of tilted product tiles; adfects' curved 3D reel of reference shots. He writes down the reason for every value, in the CSS itself.

## 1. Sources and what was measured

| Surface | What | Evidence |
|---|---|---|
| affectui.com home | hero collage, type, buttons, tabs, library cards, compare section, FAQ | `affectui-fold.png`, `-s01..06`, `affectui-dark-*.png`, `home-deep-measure.json`, 116 KB main CSS + 97 KB inline CSS [M][CSS] |
| affectUI components (25) | AI Answer, Chat Composer, Thinking State, Writing Assistant, OTP Input, Stepper Form, Comments Panel, Comment Thread, Smart Recommendation, Email Draft, Usage Meter, KPI Chart, Data Table, Command Menu, Segmented Control, Integration Picker, Button, Reaction Bar, Combobox, Date Range Picker, Dropzone, Toaster, Setup Guide, Decision Inbox, Notification Stack | `affectui-c-<name>.png` (page, 2x), `-stage.png` (preview, 2x), `-dark.png`, `frames/<name>-load.png` (0/150/400/800/1500/3000 ms), `frames/<name>-hover.png` (before/+60/+150/+400 ms), `affectui-components-measure.json` (animations with keyframes, type tuples, radii, shadows, controls, and his written Motion / Accessibility / Responsive specs) [M] |
| affectUI screens (5), blocks (6), illustrations (8), motion (8) | App Shell, Assistant Home, Agent Chat, CRM, Analytics; Agent Gallery, Pricing Plans, Metrics Dashboard, AI Workspace, Task Board, Logo Marquee; Glow Keyboard, Integration Beam, Frost Cloud, Glass Folder, Model Wheel, Enrichment Orbit, Layer Stack, World Map; Gradient Text, Text Reveal, Number Ticker, Blur Crossfade, Gradient Floor, Grid Background, Tilt Card, Shimmer Loader | same naming, `affectui-screens-blocks-illus-motion-measure.json` [M] |
| affectUI index pages | components, screens, blocks, illustrations, motion, pricing, docs | `affectui-<index>.png`, `index-pages-measure.json` [M] |
| adfects.com | hero + reel, services, case studies, about, clients, pricing, FAQ, CTA, footer | `adfects-fold.png`, `adfects-<section>.png`, `adfects-plan-dark.png`, `adfects-mobile-fold.png`; inline CSS (2,972 lines, 153 explanatory comments) and the reel / ticker / word-reveal scripts [M][CSS][JS] |
| flohoeller.com, recruitpilot.co | personal site; a client site he designed | `flohoeller-home.png`, `recruitpilot-home.png` [V][CSS] |

## 2. What makes his work special (concrete, with numbers)

1. **A single weight carries the whole site.** affectUI's main CSS sets weight 500 95 times vs 600 32, 400 10, 700 8 [CSS]. H1, H2, nav, buttons, tabs, card titles and chips are all 500; only body copy is 400; 600 appears only inside product UI headings (18px card title, 16px form heading). Hierarchy comes from size and grey, never from bold.
2. **Headlines are small and tight, not shouty.** affectUI h1 46/52 px, -1.4px (-0.030em), weight 500 [M]. adfects h1 54px, line-height 1.04, -0.022em [CSS]. Section leads are 28/34 -0.7px (affectUI) and 31.7/36.4 (adfects). Every section heading is **two short lines broken at a comma or full stop**: "81+ pieces, / none of them generic", "Same screen, / with the details done", "What you get, / all on one retainer.", "Case studies.", "Pricing.". `text-wrap: balance` on all of them [M].
3. **13px is the UI base.** Body 13px / 18.571px (1.4286) [CSS]; histogram of font sizes in the main CSS: 13px x60, 12 x29, 14 x26, 12.5 x24, 11 x22 [CSS]. Half-pixel sizes (12.5, 13.5, 11.5, 10.5) are used freely to tune optical weight.
4. **Concentric radii everywhere, by construction.** Library card 14px with 6px inset -> stage 8px; AI Answer tray 20px, 4px padding -> card 16px; Writing Assistant 32px card, 8px padding -> 24px panel ("Card radius 32 minus its 8px padding, so the corners run parallel" [C]); adfects plan/case shell 14px, 6px padding -> panel/shot 8px; segmented control 11px - 3px pad -> 8px pill [CSS][M]. Segmented sizes sm/md/lg = r 9/11/13 with pad 2/3/4 [CSS].
5. **Grey tray around a white card is the signature anatomy.** Twelve components declare the same tokens: tray `#f0f0f0`, card `#fff`, line `#ececec`, ink `#171717`, text `#404040`, muted `#8f8f8f`, faint `#b5b5b5`, accent `#2f6bff`, focus `rgba(23,23,23,.22)`, ease `cubic-bezier(.22,1,.36,1)` [CSS]. The tray carries secondary rows ("Connect apps", "Demo code: 482 913", step tabs "1. Workspace 2. Team ...") so the card stays one job. His words: "The gray tray frames the white card on every side" [C].
6. **Rings instead of borders, shadows that barely exist.** Rest state of a product card: `0 0 0 1px #ececec, 0 1px 2px rgba(0,0,0,.04)` [M] (seen on every component). Library card edge: 1px at `#0a0a0a0e` (5.5% ink) [M]. Popovers get one wide blur with negative spread: `0 18px 40px -12px rgba(0,0,0,.18)` [CSS]. adfects goes further: 0.5px panel strokes and 0.75px case-shell borders [CSS].
7. **The primary button is a lit object.** 42px pill; fill `linear-gradient(#323137,#201e25)` on padding-box, a 3-stop edge `linear-gradient(#4b4951,#31303a,#18171b)` on border-box through a transparent 1px border (a lit top bevel), then `0 0 0 1px #0d0d0d, 0 2px 4px #0000001a` [M]. Secondary is just `#0000000a` fill, no border. Press is `scale(.97)` (primary `.99`) [CSS]. In dark mode the same recipe inverts to a pale pill (`#f4f4f5 -> #e4e4e7`) [CSS].
8. **He shows the anti-pattern he is beating.** In "Same screen, with the details done" the "Vibecoded" half uses `rgb(37,99,235)` (Tailwind blue-600) 6px-radius buttons in weight 600 and 700 h4s in `rgb(17,24,39)`; the affectUI half uses the gradient dark pill at 10px radius, 500 weight, `#171717` [M]. That pair is a precise list of what reads as "AI default" to him.
9. **Content is specific, internally coherent, and branded.** The AI Answer demo: "Where should we hold the team offsite in Lisbon?", six real sources (Notion, Slack, Wikipedia, Google Flights, Airbnb, Booking.com), "two linked houses in Alfama come to €2,880 for three nights, about 20% less than the hotel", "Answered in 3.6s" [V]. adfects case tiles show Strabag/Raiffeisen/Novomatic with real marks and a named contact. Source chips carry real brand icons on white tiles even in dark mode [V].
10. **Motion is calm, generous and everywhere.** Component CSS duration histogram: 160ms x48, 200 x45, 220 x35, 260 x30, 320 x23, 300 x22, 140 x22, 380 x19 [CSS]; one ease (`.22,1,.36,1`) for movement, plain `ease` (268 uses) for colour. Entrances are lift + fade + blur; state changes glide (height 360ms, width 320ms, ring position, number roll). 13 reduced-motion blocks in the component CSS alone [CSS].
11. **Every site owns exactly one big visual move.** affectUI: an isometric, slowly scrolling plane of 400x250 product tiles behind the hero, sharp at the corners and dissolving into a lens blur toward the copy. adfects: a curved-screen reel of 320px-tall reference shots that rotate up to 30 degrees and grow 26% toward the edges, draggable with inertia [CSS][JS]. Everything else stays white and quiet.
12. **The reasoning is written down.** adfects' inline CSS carries 153 comments explaining values ("One blue for the whole page..." [C]; "Optically matched to the hero subtitle (15px/400)" [C]; seams measured to 264px so "the same air on either side" [C]). Component CSS documents units ("text starts 73 units from the card edge, like the reference" [C]). The quality is a by-product of refusing unexplained numbers.

## 3. Visual grammar

### 3.1 Type
- **Face:** Inter, self-hosted woff2 (latin + latin-ext subsets), `-webkit-font-smoothing: antialiased`. flohoeller.com uses SF Pro (system) at 14/21.7, -0.15px [CSS].
- **Scale (affectUI marketing):** 46/52 h1, 28/34 section lead, 16/24 hero sub (#737373, max 560), 15/22 section sub (max 640), 13/18.571 body, 13 nav (500, #737373), 11 chips (500). Mobile: h1 34/40 -1px, lead 23/29 [CSS].
- **Scale (adfects):** h1 clamp(34px, 3.9vw, 54px) / 1.04 / -0.022em; section h2 31.68/36.4; card titles 16/24 w500; card copy 14/21 #6e6e76; FAQ question 16 w500 in a 68px row [M].
- **In-product:** answer body 15/24.75 #404040; card headings 18/24.3 w600 -0.216px; form headings 16/20.8 w600 -0.16px; meta 12-12.5 #8f8f8f; citation chips 11.5 w500 [M]. Tabular numerals on every count, timer, price and OTP digit [CSS].
- **Tracking:** negative only at >= 16px (h1 -0.030em, lead -0.025em, 18px -0.012em); small text stays at `normal` in affectUI (unlike heyrico's -0.15px). Chat Composer tracks -0.15px at 16px because it is authored in scaled units [M].
- **Wrapping:** `text-wrap: balance` on headings, testimonial quotes and short descriptions; `text-wrap: pretty` on running copy; explicit `<br>` wins (adfects comment: balance "evens out the lines of anything short" [C]).

### 3.2 Colour
- **Neutral ramp (light):** page #fff, bg #f5f5f5, panel #fcfcfc, preview #fafafa, tray #f0f0f0, chip #f4f4f5, line #ececec / #e5e5e5, faint #b5b5b5, muted #8f8f8f / #737373, text #404040, ink #171717 / #0a0a0a [CSS].
- **Dark:** bg #0c0c0d, panel #121213, card #19191b, preview #1f1f21, border #262628, text #ededed, muted #8f8f8f; tints become white at 5-7% (`#ffffff0d`, `#ffffff12`); card shadow becomes `0 1px 1.5px #0000004d, inset 0 -1px 0 #ffffff0a` [CSS]. Composer card on dark "a hair above #232326, so the card still reads" [C].
- **Accent discipline:** affectUI uses #1d93d2 for focus and links, #2f6bff inside components, and a pink-violet gradient (#dd0674 -> #5e3ee0) only for the Pro brand. adfects: one blue #0171e3, "the booking button, the funding labels, the pricing accents and every focus ring" [C]. Semantic: success #2f9e5b, danger #e5484d, alert #f44900 [CSS].
- **Logo treatment:** grayscale(1) + opacity .45 so knock-out letters stay white; an SVG threshold filter flattens client marks onto #58534f; a white-on-transparent mark is inverted first [CSS][C].

### 3.3 Depth
Rings for edges, contact shadows for lift, one ambient blur for floating layers, and backdrop/filter blur only as an optical effect (hero lens, glow blobs at blur(34px) opacity .28, word reveals). He removes blur when it costs: "Cross-fade on opacity alone ... ran mobile Safari out of memory" [C]; reveal scripts drop `filter` and `will-change` after 1600ms [JS].

### 3.4 Radius ladder (measured)
6 citation chip / 8 stage, inputs, panel / 9-11-13 segmented sm-md-lg / 12 source card, component buttons / 14 library card, plan shell, client card / 16 product card / 17 agent chat panel / 18 docs panel / 20 tray / 22 agent frame / 24 assistant panel / 32 assistant card / 999 every marketing button and chip [M][CSS]. The Button component itself is 12px-radius (not a pill) inside product UI; pills are for marketing CTAs and nav [M].

### 3.5 Density and spacing
- Gaps are small and on a 2px rhythm: main CSS gap histogram 6px x38, 8 x37, 12 x25, 10 x20, 4 x18, 14 x11 [CSS]. Card grid gap 14; CTA pair gap 8 (adfects 6).
- Section rhythm affectUI: hero padding 120 top / 112 bottom, every section padding-bottom 112, FAQ 168 [CSS]. adfects: section tops 156 / 108 / 264 / 156 / 132 / 132 / 120 with seams deliberately equalised ("Top and bottom match" [C]).
- Content width: affectUI 1008px (nav 1240); adfects 1200px with 32px gutters [CSS].

### 3.6 Content realism
Real third-party marks, named people, local currency and dates, durations to the tenth of a second ("Answered in 3.6s", "Thinking 7s", "Resend in 0:17"), failure copy ("That code didn't work. 3 tries left."), and a visible demo hint ("Demo code: 482 913") instead of a fake success [V]. adfects proof shows funding ("$12M seed round", "$17M seed round") as small accent labels on the client cards [M].

### 3.7 Illustration style
Two families [V]: (a) **saturated full-bleed grounds** (red-orange or blue gradients) with one soft, glossy 3D object that has a personality (a frosted cloud with eyes that blinks, follows the pointer, winks on click); (b) **quiet product scenes** on a dot-grid ground: integration beams with travelling light pulses, logo clusters on white discs, a model-name drum on a cylinder, an isometric layer stack, a world map with a pastel coastline band. Glass and gradient floors (plus-lighter white layer over colour) for the AI moments. Colour is concentrated in the illustration; the UI chrome around it stays grey.

### 3.8 Motion (measured)
- **Easing:** movement `cubic-bezier(0.22, 1, 0.36, 1)`; pops `cubic-bezier(0.34, 1.56, 0.64, 1)` (soft variant 1.3); quart-out `(0.25, 1, 0.5, 1)` for label swaps; `(0.65, 0, 0.25, 1)` for clip-path reveals; colour on plain `ease` [CSS][M].
- **Entrances:** hero copy `opacity 0, blur(4px), translateY(10px)` 700ms, stagger 0/60/120ms [CSS]; component steps `translateY(6px) blur(3px)` 420-520ms [M]; source cards `translateY(6px) scale(.96)` 460ms at 40ms steps [M]; chips `translateY(4px) scale(.92)` 420ms [M]; OTP digits `translateY(4px) scale(.7) blur(3px)`, "a small lift out of a blur, no bounce" [C]; streamed words `opacity 0 + blur(3px)` 420ms [CSS]; adfects words `translateY(8px) blur(6px)` 450ms ease-out, 30ms per word or 110ms per line [CSS][JS].
- **State changes glide:** card height 360ms, button width to its new label 320ms, segmented indicator "the edge facing the target leads, so it stretches a little and settles - calm, no bounce" [C], regular/semibold label copies crossfade so neighbours never shift [C], numbers roll digit by digit, the hover fill glides between rows, menus morph out of their button with a growing clip-path [C].
- **Feedback:** press scale .97; error shake +-3px at 20/40/60/80%; success pills morph out of the input frame; spinner "arc closes into a quiet ring; the spin freezes where it is" [C].
- **Ambient:** hero plane scroll 80s linear; eyes blink every 7s; glow blobs drift 5.5-7s alternate; shimmer 1.6s linear; orbits 7s / 22s. Ambient loops pause off-screen (IntersectionObserver) [C].
- **Reduced motion:** "Transitions become instant and looping animations stop, without losing any state change" (docs) [C].

## 4. Component anatomy patterns

1. **Tray + card + tray strip.** Tray `#f0f0f0`, padding 4 (AI Answer, Stepper Form) to 8 (Writing Assistant), radius = card radius + padding. Card white, ring `#ececec` + `0 1px 2px rgba(0,0,0,.04)`, inner padding 22-24px top/sides, 20 bottom. Secondary info and status sit on the tray strip below or the tab row above (Stepper Form: "1. Workspace  2. Team  3. Plan  4. Review" on the tray; current step in ink, rest in faint) [M][V].
2. **Library card (marketing).** 14px radius, 1px `#0a0a0a0e` border, padding 6 6 0; 16:10 stage at 8px radius, `#fafafa`, inset 1px ring, preview padding 48/24; category chip top-left and Pro chip top-right both at 10.5px insets, 22px tall, 11px/500; footer padding 10 4 10 11.5 with 13px/500 title, 13px muted one-line ellipsis description and a 28px round copy button [CSS][M].
3. **Chips.** Category: white pill, `0 0 0 1px #0a0a0a1a`, #737373. Pro: `#fdf2f8` fill, inset ring of the pink at 16%, 1px bottom shadow of the pink at 14%, label in a pink->violet clipped gradient, bolt icon in pink, asymmetric padding 0 9 0 7 to optically centre the icon [CSS]. Count: `#0000000a`, 11/17 tabular. Citation: 20px, radius 6, `#f4f4f5`, 11.5/500 #8f8f8f; when lit it inverts to `#171717` with white text [CSS].
4. **AI working states.** "Reading 6 sources" -> "Writing" -> "Answer" label with a shimmer band (dark band `rgba(23,23,23,.9)` sweeping a copy of the label, 1.6s); timer "Thinking 7s" that becomes "Worked for 18s"; timeline with a line growing down to each node; a blue check that pops and draws its tick at the end [C][M].
5. **Composer.** White text card in a grey tray; bottom row left: + and "Request approval" (hand icon); right: model picker ("Auto"), mic, round send button that is grey until there is text; tray strip: app logos + "Connect apps". Authored in design units (`--u`) so it scales with width [CSS][V].
6. **Forms.** Inputs 8-10px radius, inset 1px ring `#dcdcdf`, label 13.5/500 above, hint 12.5 #8f8f8f below, prefix text in faint ("affect.app/"), primary action bottom-right as an ink button [V][M]. Touch: 16px fields so iOS does not zoom, 40px targets [C].
7. **Data.** KPI labels with dotted underline (tooltip affordance), value 26-30px, green/red delta 12-13px beside it, mini bar sparkline right; charts with 4 coloured lines max, thin gridlines, three date ticks; breakdown rows alternate a faint fill [V].

## 5. Hero patterns

### 5.1 affectUI: depth-of-field product collage (centred copy)
Measured recipe [CSS][M]:
- Copy column max 560, centred: h1 46/52, sub 16/24 (pt 14), CTA row pt 28, gap 8: dark gradient pill "Browse library" 42px + grey pill "Get started" 42px. Hero min-height 620, padding 120/112.
- Behind it, a full-bleed `.lp-iso` layer holds a **plane**: a 7-column grid of 400x250 pre-rendered tiles (each tile a real component screenshot, separate light and dark PNGs), every second tile pushed down 60px; `transform-origin: 0 0; top: -24%; left: -6%; transform: perspective(4000px) rotateX(34deg) rotate(-16deg) scale(.78)`. The track scrolls `translateY(-33.33%)` over **80s linear infinite**.
- **Outer mask** (intersect): `radial-gradient(40% 54% at 50% 56%, #0000 42%, #00000040 72%, #000 100%)` makes a clearing behind the copy; `linear-gradient(#0000 0, #000 56px calc(100% - 150px), #0000 100%)` fades top and bottom.
- **Lens blur**: two backdrop-blur layers masked to the centre, `blur(2px)` over `radial-gradient(50% 64% ...)` and `blur(8px)` over `radial-gradient(42% 54% ...)`, plus `blur(6px)` over the bottom 200px. Result: tiles are crisp at the corners and soften toward the headline, like a shallow depth of field focused on the viewer, not the UI.
- Enter: plane fades in over 1.4s; copy rises 700ms, 60ms stagger.
- Mobile (<= 860px): the collage becomes a 320px band above the copy (260px at <= 760), blur layers removed.

### 5.2 adfects: curved-screen reference reel (cinematic tilted showcase)
Measured recipe [CSS][JS]:
- Centred copy: h1 54px two lines ("The design hire / you keep postponing."), sub 16px #6e6e76, CTAs 6px apart: accent pill "Book a call" (#0171e3, 12px 22px) and white outline pill "See Projects".
- Under it a full-bleed reel (`padding: 60px 0 88px`, gap 22px): images exported at one pixel height and shown at **320px tall, width auto, radius 8**, "No plate and no stroke: the artwork is the card" [C].
- Each frame: `translateX(spacing fix) perspective(1100px) rotateY(+-k*30deg) scale(1 + k*0.26)`, where `t` is the card's distance from the screen centre in half-screens and `k = min(t^2, 1.3)` easing to 0 beyond 1.5. zIndex = round(k*100) so outer cards overlap inward. The script computes each projected edge so the visible gap stays exactly 22px.
- Speed 80 px/s; drag with throw up to 4200 px/s; settles back with `vel += (80 - vel) * (1 - exp(-2.2 dt))`; pauses off-screen and under reduced motion.
- The reel's content alternates three looks: dark product UI on near-black with connector lines, light UI on #fafafa, and **translucent glass panels over a cinematic photo** (golden-hour grass) for the hero case. A 46 px/s grayscale logo ticker follows ("Slower than the reel above it, so the two do not read as one band" [C]).

## 6. Product-UI-in-marketing patterns
- **Live components, not pictures.** Library cards render the actual component at reduced scale inside the 16:10 stage; previews run the same source you install [C].
- **Before/after proof.** A draggable split comparing a "Vibecoded" screen with the crafted one (labels in grey pills under the frame, "Drag to compare") [V].
- **Browser frame for full screens**: traffic lights, URL pill "app.acme.com/chat", 14px radius, `#fcfcfc` panel with a 1px `#e5e5e5` border [M].
- **adfects case board**: a 16:9 white shot inside a 6px #fafafa shell (radius 14 / 8), holding a bento at a fixed export grid: 2400x1350, 60 edge, 30 gap, rows split 1700:550 and mirrored, written in container units (2.5cqw / 1.25cqw / 1cqw) so the board keeps geometry at any width [CSS][C]. Tiles use soft pastel washes (lavender-to-blue, pink) with large translucent cards and huge blurred words ("Find Companies").
- **Service drawings**: low-contrast skeleton UIs (#EAEAEA bars on #F9F9F9) whose rows fade in one after another on one shared 8s loop; a single live element ("Try it now") warms on hover [C][V].

## 7. Rules

- **RULE [FH-01]** Set the whole marketing page in one grotesk at two weights: 500 for every heading, label, nav item, chip and button; 400 for body. Allow 600 only inside product UI headings.
  **Why** affectUI CSS: weight 500 x95, 600 x32, 400 x10, 700 x8; h1, h2, nav, buttons, tabs, card titles all compute to 500 [M]. His "vibecoded" counter-example uses 600/700 [M].
  **Applies to** SaaS marketing, product UI. **Check** computed font-weight of h1-h3, a, button, [role=tab] outside the product frame is 500; no 700 outside it. **Source** affectui.com, adfects.com

- **RULE [FH-02]** Keep display type modest and tight: h1 44-54px at line-height 1.04-1.13 and -0.022 to -0.030em; section leads 28-32px at -0.008 to -0.025em; always break headings into two balanced lines at a comma or full stop.
  **Why** affectUI h1 46/52 -1.4px, lead 28/34 -0.7px; adfects h1 54/1.04 -0.022em, h2 31.68/36.4; every section h2 is two lines ("81+ pieces, / none of them generic") with text-wrap: balance [M].
  **Applies to** hero, section headers. **Check** h1 font-size 44-56px, letter-spacing <= -0.02em; each h2 renders on exactly 2 lines at 1440 and has text-wrap: balance. **Source** affectui.com home, adfects.com

- **RULE [FH-03]** Use 13px as the UI base (line-height 1.4286) and tune small sizes in half pixels (11, 11.5, 12, 12.5, 13.5) rather than jumping to 14.
  **Why** body 13px/18.571px; font-size histogram 13px x60, 12 x29, 14 x26, 12.5 x24, 11 x22 [CSS].
  **Applies to** product UI, library cards, nav. **Check** modal font-size of text nodes in product frames and cards is 13px; <= 3 sizes above 16px on the page. **Source** affectui.com

- **RULE [FH-04]** Derive every nested radius: inner = outer - inset. Pick the outer from a short ladder (14 card, 16 product card, 20 tray, 32 hero card) and never set an inner radius independently.
  **Why** 14 - 6 = 8 (library card, adfects shell); 20 - 4 = 16 (AI Answer, Stepper Form trays); 32 - 8 = 24 (Writing Assistant, "so the corners run parallel" [C]); segmented 11 - 3 = 8 [CSS][M].
  **Applies to** all nested surfaces. **Check** for each child flush inside a rounded parent: child radius == parent radius - parent padding (+-1px). **Source** affectUI components, adfects pricing/case

- **RULE [FH-05]** Build components as a grey tray holding a white card; put secondary status and actions on the tray strip, never inside the card.
  **Why** 12 components share tray #f0f0f0 / card #fff / line #ececec; trays carry "Connect apps", "Demo code: 482 913", the step tabs [CSS][V]; "The gray tray frames the white card on every side" [C].
  **Applies to** product UI components, marketing demos. **Check** each demo component has a parent with bg ~#f0f0f0 (L 0.95) and padding 4-8px around a #fff child with a 1px ring. **Source** affectUI AI Answer, Chat Composer, Stepper Form, OTP Input

- **RULE [FH-06]** Draw edges as rings at 5-8% ink and lift with a 1-2px contact shadow; add one wide, negative-spread blur only to floating layers (menus, toasts, popovers).
  **Why** card rest `0 0 0 1px #ececec, 0 1px 2px rgba(0,0,0,.04)`; library card 1px #0a0a0a0e (5.5%); menu `0 0 0 1px rgba(0,0,0,.06), 0 18px 40px -12px rgba(0,0,0,.18), 0 4px 12px -4px rgba(0,0,0,.06)` [M][CSS].
  **Applies to** cards, panels, popovers. **Check** resting card box-shadow max blur <= 2px and ring alpha <= 0.08; only elements with position absolute/fixed have a blur >= 18px. **Source** affectUI

- **RULE [FH-07]** Make the primary CTA a lit dark pill: 2-stop vertical fill on padding-box, 3-stop edge gradient on border-box through a transparent 1px border, a 1px near-black outer ring and a 2/4px 10% drop; hover lightens both fill stops by ~10 L; press scale .97-.99.
  **Why** measured `linear-gradient(#323137,#201e25) padding-box, linear-gradient(#4b4951,#31303a,#18171b) border-box; box-shadow 0 0 0 1px #0d0d0d, 0 2px 4px #0000001a`; hover `#3c3b42 -> #29272f` [M].
  **Applies to** primary CTA on light surfaces. **Check** primary button background-image has 2 gradients, border 1px transparent, box-shadow starts with a 0 0 0 1px ring, :active transform scale 0.97-0.99. **Source** affectui.com hero

- **RULE [FH-08]** Pair the primary pill with a borderless secondary at 4% ink (`#0000000a`, hover `#0000000d`), same height; in nav use 28px pills, in sections 36px, in the hero 42px.
  **Why** secondary "Get started" 42px `rgba(0,0,0,.04)` no border; nav "Log In" 28px; "Browse all components" 36px [M].
  **Applies to** CTA pairs, nav. **Check** secondary button has border-width 0 and bg alpha 0.03-0.06; button heights on the page come from {28, 36, 42}. **Source** affectui.com

- **RULE [FH-09]** On a studio or service site, give the accent colour to exactly one action (booking) and its small labels; render it flat, no shadow, and hover one step darker in the same hue.
  **Why** adfects `--accent #0171e3` used for "Book a call", funding labels and focus rings only; hover #0165ca; "Only the call booking wears the accent, flat and without a shadow" [C][M].
  **Applies to** marketing sites with one conversion. **Check** elements with accent background count <= 2 (nav + hero instance of the same CTA); accent buttons have box-shadow none. **Source** adfects.com

- **RULE [FH-10]** Fill demos with one specific, coherent scenario using real third-party names, local currency, exact durations and honest failure states; label any demo-only affordance as demo.
  **Why** AI Answer: Lisbon offsite, six named sources, "€2,880 for three nights, about 20% less", "Answered in 3.6s"; OTP shows "That code didn't work. 3 tries left." and "Demo code: 482 913" [V].
  **Applies to** product UI in marketing. **Check** demo copy contains >= 3 proper nouns, >= 2 concrete figures with units, and no lorem / "Item 1" / "John Doe". **Source** affectUI AI Answer, OTP Input

- **RULE [FH-11]** Enter every element with fade + small lift + light blur on `cubic-bezier(0.22, 1, 0.36, 1)`: 6-10px and blur 3-4px over 420-700ms for blocks, 4px + scale .92-.96 over 420-460ms for chips and cards; stagger 40-70ms; never bounce on enter.
  **Why** hero `blur(4px) translateY(10px)` 700ms, 60ms stagger; steps `translateY(6px) blur(3px)` 420-520ms; source cards `translateY(6px) scale(.96)` 460ms at 40ms steps; digits "a small lift out of a blur, no bounce" [CSS][M][C].
  **Applies to** load-in and list reveals. **Check** getAnimations() on load: keyframe 0 has opacity 0, translateY 3-10px, blur 2-8px; easing cubic-bezier(0.22,1,0.36,1); sibling delays differ by 40-70ms. **Source** affectUI hero, AI Answer, Thinking State, OTP Input

- **RULE [FH-12]** Never let a state change jump: animate container height (320-380ms), button width to its new label (~320ms), indicator position, and number values (digit roll), with colour on plain `ease` at 140-220ms.
  **Why** transitions measured: `height 360ms`, `width 0.32s cubic-bezier(.22,1,.36,1)`, segmented indicator stretch-and-settle, roll-up counts; colour `background-color .16s` / `.14s ease` [M][CSS].
  **Applies to** interactive components. **Check** elements whose height/width change on interaction have a transition on height/width 300-400ms; hover colour transitions 120-220ms. **Source** affectUI Stepper Form, Segmented Control, Usage Meter

- **RULE [FH-13]** Give AI states a visible working grammar: a shimmering status label that changes word ("Reading 6 sources" -> "Writing" -> "Answer"), a live timer that resolves to "Worked for Ns", items popping in one by one, and a drawn check at the end.
  **Why** Thinking State and AI Answer specs and animations: shimmer 1.6s linear sweep, chips 420ms at 120ms+ delays, check pop + draw [M][C].
  **Applies to** AI product UI and its marketing demos. **Check** the demo has >= 2 distinct status labels over time and a timer or duration string; shimmer animation present while working. **Source** affectUI Thinking State, AI Answer

- **RULE [FH-14]** For a centred product-library or platform hero, build a depth-of-field collage: a grid of real UI tiles on a plane at `perspective(4000px) rotateX(34deg) rotate(-16deg) scale(.78)`, odd tiles offset 60px, drifting 80s linear; mask a clearing behind the copy and stack centre-masked backdrop blurs of 2px and 8px so tiles sharpen toward the corners.
  **Why** measured `.lp-iso` recipe: radial mask `40% 54% at 50% 56%, #0000 42% -> #000 100%`, backdrop blurs 2px / 8px / 6px-bottom, 1.4s fade-in [CSS][M].
  **Applies to** hero, product-proof class with many components. **Check** hero has a transformed plane with rotateX 25-40deg; contrast of tiles under the h1 bounding box < 1.2:1 vs page; >= 2 blur layers. **Source** affectui.com hero

- **RULE [FH-15]** For a portfolio or showcase hero, run references as a curved-screen reel: shots at one fixed height (~320px, radius 8, no frame), each rotated `rotateY(k*30deg)` and scaled `1 + k*0.26` by distance from centre (`k = min(t^2, 1.3)`), perspective 1100px, outer cards on top, 80 px/s, draggable with inertia, visible gap held constant.
  **Why** adfects reel script constants SPEED 80, TURN 30, GROW 0.26, PERSP 1100, gap 22, img height 320 [JS][CSS].
  **Applies to** studio/portfolio heroes, case-study rows. **Check** cards near the viewport edge have rotateY >= 20deg and scale >= 1.2 while the centre card is < 3deg / < 1.03; reel pauses under prefers-reduced-motion. **Source** adfects.com hero

- **RULE [FH-16]** Build plan and case cards as a 6px coloured shell (radius 14) around an inset panel (radius 8) that is a 4-6% wash of the shell's opposite ink behind a 0.5px stroke of that ink at 16%; put the figure and button on the shell's foot, on one baseline.
  **Why** adfects plan-card dark #1b1c1d with panel `rgba(255,255,255,.04)` + `0.5px rgba(255,255,255,.16)`; light #f9f9f9 with `rgba(119,119,119,.06)` + `.16`; "the two curves share a centre" [CSS][C].
  **Applies to** pricing, case studies, feature tiles. **Check** shell padding 6px, shell radius - 6 == panel radius, panel border-width <= 1px with alpha 0.12-0.2. **Source** adfects.com pricing, case studies

- **RULE [FH-17]** Chip system: category chip = white pill with a 10% ink ring, 22px, 11px/500 muted, inset 10.5px from the corner; status/Pro chip = 4-6% tint of its hue, inset ring of the hue at 16%, gradient or hue text, asymmetric padding when it carries an icon.
  **Why** `.card__tag` 22px, `0 0 0 1px #0a0a0a1a`, top/left 10.5px; `.pro-badge` `#fdf2f8`, inset ring 16%, bottom 1px 14%, padding 0 9 0 7, pink->violet text [CSS].
  **Applies to** cards, lists, nav. **Check** chips are 20-24px tall with 11-11.5px text weight 500, ring rather than border, and identical corner insets on both sides of a card. **Source** affectUI library cards

- **RULE [FH-18]** Equalise the air between sections by measuring seams, not by reusing one padding: compute the visible distance between the last element of one section and the first of the next and make neighbouring seams match (affectUI 112px; adfects 156 / 264 / 132 pairs).
  **Why** affectUI section padding-bottom 112, hero 120/112, FAQ 168 [CSS]; adfects comments record seams measured to 264 so "the same air on either side" [C].
  **Applies to** landing pages. **Check** distances between consecutive section content boxes at 1440 vary by <= 12px within each pair of neighbours. **Source** affectui.com, adfects.com

- **RULE [FH-19]** Ship every component light and dark from the same token names; in dark, raise surfaces in small steps (#0c0c0d / #121213 / #19191b / #1f1f21), turn tints into white at 5-7%, and invert the primary pill to a pale gradient.
  **Why** measured dark tokens and dark button `#f4f4f5 -> #e4e4e7` with ring #0009 [CSS]; every component switches on `.dark` or `data-theme="dark"` [C].
  **Applies to** product UI, marketing with a theme toggle. **Check** both themes render with no hard-coded hex outside the token block; dark surface steps differ by 3-8 L%. **Source** affectUI

- **RULE [FH-20]** Write the reason next to every non-obvious value in the source, and treat motion as specified behaviour: each component documents its motion, keyboard, reduced-motion and responsive behaviour in plain sentences.
  **Why** adfects CSS carries 153 explanatory comments; every affectUI component page has Motion / Keyboard / Accessibility / Responsive sections; e.g. "Only the call booking wears the accent" [C].
  **Applies to** engine builds (DIRECTION.md + source). **Check** each build's key components have a Motion and Reduced-motion line in DIRECTION.md; custom values in CSS have a `/* why */` comment. **Source** adfects.com source, affectUI docs

## 8. His stated principles (own words, short)
- "every pixel and interaction feels intentional, from layout to motion" (flohoeller.com bio)
- "Motion that feels finished." (affectUI README)
- "One file each." single-TSX components, "no Tailwind, no CSS setup, no animation library" (README, paraphrased past the first three words)
- "Native elements first – buttons are buttons, inputs are inputs" (affectUI docs, Accessibility)
- "Transitions become instant and looping animations stop, without losing any state change" (docs, reduced motion)
- "The details you never think to prompt for" - hover states, motion, calm hierarchy (affectUI home)
- "Only the call booking wears the accent, flat and without a shadow" (adfects CSS)
- "Digits pop in – a small lift out of a blur, no bounce" (affectUI CSS)
- "calm, no bounce" (Segmented Control motion spec)
- On Threads: "The component library for interfaces people actually feel" and a library to stop "AI-slop designs"; he shares inspiration sources (reelfolio, 60fps.design, mobbin, land-book, backgrounds.supply) and a how-to on describing loading states to Claude and Codex (threads.com/@growthflo).
- Self-description: "agentic designer" and "Design Engineer"; uses AI tools daily; one-person studio for SaaS and AI startups (flohoeller.com). His CSS comments credit Emil Kowalski's motion principles: "fast, ease-out, interruptible" (flohoeller.com styles.css).

## 9. Captured files
`knowledge/benchmarks/flohoeller/`:
- Home: `affectui-fold.png`, `affectui-s01..06.png`, `affectui-dark-fold.png`, `affectui-dark-s01/02.png`, `affectui-hero-collage-left.png`, `affectui-mobile-fold.png`; `adfects-fold.png`, `adfects-s01..09.png`, `adfects-{services,work,about,clients,pricing,faq}.png`, `adfects-plan-dark.png`, `adfects-service-hover.png`, `adfects-mobile-fold.png`.
- Detail pages (52): `affectui-c-<component>.png | -stage.png | -dark.png`, `affectui-screens-*`, `affectui-blocks-*`, `affectui-illustrations-*`, `affectui-motion-*`.
- Index pages: `affectui-{components,screens,blocks,illustrations,motion,pricing,docs}.png`; `flohoeller-home.png`, `recruitpilot-home.png`.
- Motion frames: `frames/<page>-load.png` (strips at 0/150/400/800/1500/3000 ms after load) and `frames/<page>-hover.png` (before, +60, +150, +400 ms).
- Measurements: `home-deep-measure.json`, `affectui-components-measure.json`, `affectui-screens-blocks-illus-motion-measure.json`, `index-pages-measure.json`, plus the earlier `affectui-measure.json`, `adfects-measure.json`.

## 10. What could not be measured
- **X / Twitter posts**: x.com requires login and the xcancel mirror returned HTTP 451; web search found no interviews, talks, Dribbble or Layers profiles under either spelling. Principles above come from his sites, README, docs, CSS comments and the public Threads profile (4 recent posts visible without login).
- **Load frames 0-150ms** on affectUI detail pages show the SPA shell before the preview mounts (~300-400ms); entrance timings were therefore taken from `getAnimations()` keyframes and his CSS, not from pixels.
- **Interaction-only motion** (OTP verify/error/success, composer connect/approve morphs, toast stacking, drag in Task Board, reel drag/throw) was read from CSS, JS and his written specs; I did not type, submit or drag (no forms were submitted). Hover strips exist for 50 detail pages; two hovers failed (Button component: target not visible; Agent Gallery: target outside the viewport).
- **affectUI Pro source** is not public; Pro component internals were measured from the rendered preview and served CSS only.
- **adfects case-study detail pages** do not exist yet ("Coming soon..."); adfects is a single page with anchors, so "project/services/about pages" are its sections.
- **Exact font files and OpenType features** (e.g. Inter `cv11`/`ss01`) were not inspected; computed families only.
- **Hero tile artwork** in the affectUI collage is pre-rendered PNGs; their internal type and spacing were not measured separately.
- **Scroll-linked effects** on adfects beyond the word reveal and reel were not exhaustively probed.
