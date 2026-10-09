---
source: web:https://kargul.studio (all 34 sitemap URLs), X @marcelkargul (60 recent posts via api.fxtwitter.com), live templates (workflow-editor-kargul.vercel.app, kanban-blue-beta.vercel.app), Framer creator page @kargul-studio, github.com/kargulstudio; measured with Playwright/Chromium 2026-10-09
chapter: Marcel Kargul / Kargul Studio deep study (landing craft, product UI, bento construction, presentation)
pages: n/a (web, measured and viewed 2026-10-09)
topic_tags: [benchmark, kargul, bento, product-ui, buttons, motion, dark-mode, presentation, case-study, x-posts, hover, radius, founder-bar]
status: studied
companion: knowledge/benchmarks/marcel-kargul-profile.md, knowledge/benchmarks/fully-specced-bar.md
---

# Marcel Kargul / Kargul Studio: deep study

Deepens `knowledge/benchmarks/marcel-kargul-profile.md` (shell measurements, spec package, AlignUI provenance). Not repeated here. The CRM app (sales-crm-kargulstudio.vercel.app) is being torn down by another study; it is only referenced.

Evidence base, all in `knowledge/benchmarks/kargul-deep/`:
- `home-s00..s09.png` (home at 1440x900 @2x, 10 slices), `*-fold.png` and `*-full.png` for all 34 URLs (home, /work, /swipe-file, /intro, 30 case studies).
- `gallery/` : 285 original case-study gallery images (2880x2070 canvas, downloaded at 1800px wide) and 63 contact sheets (`gallery/sheet-<project>-N.jpg`). Note: file numbering starts at 01 (00 is the hero video, not downloaded).
- `x/` : 41 images from 60 recent X posts (`x-<postId>-<n>.jpg`, originals), 54 frames and 9 contact sheets sampled from the post videos (`xv-*`, `xvsheet-*`), profile banner and avatar.
- `live-workflow-editor.png`, `live-kanban.png` (his public templates), `hover-hero-*.png` (3x crops of the button hover states).

Provenance caveats are in section 7. Values marked "~" were read off images (scaled from the 2880x2070 gallery canvas, which equals a 1440x1035 CSS page at 2x), not computed from CSS. Everything else was computed in Chromium.

## 1. Core ideas

1. **The case-study gallery is the real product of the site.** The shell is neutral and hardly designed; the quality bar lives in 285 gallery images across 30 clients, every one on the same 2880x2070 canvas. Each client gets its own palette, type voice and illustration language (cream + serif for 43, black + pixel mono for Volcano, sky-blue iso for ChatSheet, purple 3D glass for Stardust). The study therefore measures the shell, but learns craft from the gallery.
2. **Bento tiles are mini art-directed scenes, not icon cards.** Almost every feature section is a hairline or card grid in which each tile has ONE focal object, 2-4 satellites, a ring/orbit/path line, a single light source and a texture (dot field, hex mesh, checker). The visual language is derived from the client's logo geometry (hexagon for Hunt, voxel for Volcano, disc for Agent Arcade, shield for ZeroLeaks).
3. **Product UI in the gallery is restrained, dense and believable.** Hairline borders, small type, 6px status dots instead of full badges, big figure plus small tinted delta, real tool logos and coherent sample data. Light and dark versions of the same screen are shown side by side. Colour is spent on one accent and tinted 24px icon tiles.
4. **Buttons are plain pills with one signature hover.** 54px pill, no border, no shadow, no colour change on hover. The hover swaps the middle word of the label for an arrow glyph and re-centres the label; press is `scale(.98)`. Two easing tokens only.
5. **Radii are concentric.** Frame radius = inner radius + frame padding, verified twice (24 = 18 + 6 on work cards; 38 = 20 + 18 on spotlight cards). Slabs are 36px, inset 18px.
6. **Presentation is a craft of its own.** On X every UI is exported at 2k-4k as a cropped window on a flat pure-neutral grey canvas (#bebebe, #aaaaaa, #b3b3b3 for light UI; #1e1e1e, #2e2e2e, #5e5e5e for dark UI), cropped off an edge so it implies a bigger product. Captions are one lowercase line plus one emoji; links go in a reply.
7. **Distribution leans on giving source away.** Top posts are a free dashboards Figma file (54.6k views, 689 likes, 1,096 bookmarks), an open-source kanban repo (82.6k views) and AlignUI promotion (68.9k views). Public repos (sales-crm 1,663 stars, workflow-editor 416, kanban 229) are live, styled templates that double as portfolio.
8. **Hands-on authorship stays unverified.** Marcel is the Founder (60,031 followers, joined Sep 2022, 27,539 posts, 3,534 media at fetch time). The posts say "we design", and the gallery credits a team. Treat the bar as the studio's pipeline.

### Kargul signature (the moves that make the work read as his)

1. One neutral shell (#efefef / #232323 / white) with 36px slabs inset 18px; colour only from the client work.
2. Pill everything: 42px nav pills, 54px CTAs, 48px card CTAs, 35.5px filter buttons, no borders, no shadows on buttons.
3. Label-to-arrow hover (middle word becomes an arrow glyph) plus `scale(.98)` press; nothing else moves.
4. Two easings (cubic-bezier .76,0,.24,1 and .7,0,0,1), one tracking value (-0.03em on 18/36/52px headings), one weight pair (700 / 500).
5. Concentric radii everywhere (24 = 18 + 6; 38 = 20 + 18; slabs 36 at 18 inset).
6. Flush category tabs fused to the top and bottom edge of media frames (radius 12 on the free corners).
7. Case pages in a single 626px column with a fixed 8-section template and a looping gallery of same-canvas 2880x2070 tiles.
8. Every client gets its own palette, type voice and bento art language derived from its logo geometry.
9. Bento tiles as lit mini-scenes: one focal object, satellites on an orbit, one light source, a texture, caption in the tile.
10. Product UI with hairlines, small type, one dominant figure per card, status dots, real logos and coherent data, shown in light and dark.
11. Presentation on a pure-neutral flat canvas, window cropped off an edge, 2k-4k export, one-line lowercase caption, link in the reply.
12. Source as marketing: free Figma dashboards, open-source repos with live demos, AlignUI endorsement.
13. A tilted price chip inside a headline, a ripple status dot with a real scarcity sentence, an oversized near-invisible logo watermark.
14. Team and tools shown as consistent sets (14 illustrated avatars; one greyscale logo capsule), never as photos or colour logos.

## 2. Rules

### 2a. Shell, hero and section composition (kargul.studio)

- **RULE** Build the nav as three separate 42px-tall pills fixed 12px from the top and centred: a circular logo pill (42x42), a links pill (~182px wide, padding 10x15, 13px/500 labels, ~14px between labels) and a CTA pill (118x42, 13px/600), ~8px apart.
  **Why** Separate pills keep the nav light enough to float over dark slabs and imagery, and each target is a clean 42px.
  **Applies to** landing page. **Check** `header` children: 3 elements, each height 42px, `top: 12px`, `position: fixed`; gap ~8px at 1440. **Source** home (measured nav, home-s00).
- **RULE** Give the nav pills depth with Tailwind shadow-sm only (0 1px 3px rgba(0,0,0,.1), 0 1px 2px -1px rgba(0,0,0,.1)) on a white fill, and animate colour, background and shadow over 500ms with cubic-bezier(.7,0,0,1).
  **Why** A hair of shadow separates white pills from #efefef without a border; the slower smooth curve keeps colour swaps from flickering while scrolling across sections.
  **Applies to** landing page. **Check** computed `box-shadow` on the links pill; `transition` on nav links = `color, background-color, box-shadow 0.5s cubic-bezier(0.7,0,0,1)`. **Source** home (measured).
- **RULE** Open the hero with a 32px white status pill (padding 4x12) holding an 8px green dot that emits a `ripple` (two stacked spans, 2050ms, linear, infinite) and a plain sentence ("Accepting 3 more projects in Q4 2026").
  **Why** Real scarcity plus a pulse reads as live; it is the only looping animation measured on the page load.
  **Applies to** landing page. **Check** `document.getAnimations()` on load returns 2 `CSSAnimation ripple` (2050ms) plus only transitions. **Source** home (measured).
- **RULE** Centre the hero stack on one axis: status pill, h1 (52px/55.64px, 700, -1.56px, max-width 626px = 12.04em), lede (16/24, 500, #707070, ~396px wide, 3 lines), two 54px CTAs side by side, then a logo strip; no hero image at all.
  **Why** When the proof is the work below, a type-only hero with one dominant element per viewport is the fastest read.
  **Applies to** landing page. **Check** hero children share one centre x; only h1 > 40px; h1 `max-width` in em (~12em). **Source** home-s00.
- **RULE** Put an oversized brand mark behind the hero as a watermark at about 3% luminance difference from the background (#e2e2e2 on #efefef), cropped by the status pill; repeat it behind the contact form.
  **Why** A near-invisible logo gives the empty neutral hero an identity without adding a colour or a focal competitor.
  **Applies to** landing page. **Check** visual: watermark contrast vs background < 1.15:1; does not intersect the h1 box. **Source** home-s00, intro-fold.
- **RULE** Separate semantic level from visual style with role classes (`h1-display` 52px, `h2-style` 36px, `h3-style` 18px): the page h1 on /work and each case page is styled at 36px, and case sections are `h2` styled at 18px.
  **Why** SEO/semantics stay correct while a quiet page can carry a modest title; style lives on a role, not on the tag.
  **Applies to** landing page. **Check** `/work` h1 computed 36px/-1.08px; case h2 computed 18px/-0.54px; hero h1 52px. **Source** /work, /work/zeroleaks (measured class names).
- **RULE** Pace the page with 36px-radius slabs inset 18px from the viewport (width 1404 at 1440) in alternating #232323 (services, spotlights) and white (testimonials, trial) on the #efefef page, padding 80px top/bottom and 90px sides.
  **Why** Alternating background mass replaces dividers; a 36px radius at 18px inset reads as one family with 18px cards.
  **Applies to** landing page. **Check** slab `x=18`, `width=1404`, `border-radius=36px`, `padding=80px 90px` (white testimonial slab 80px 0px); section gaps are bare background. **Source** home (measured), home-s02/s05.
- **RULE** Make nested corners concentric: outer radius = inner radius + the padding between them (work card frame 24 = image 18 + 6px; spotlight card 38 = image 20 + 18px padding).
  **Why** Equal gaps follow the curve, so frames look machined instead of stacked.
  **Applies to** all. **Check** for any rounded parent with padding p and rounded child: |R_outer - (R_inner + p)| <= 1px. **Source** /work card DOM (`rounded-[24px] p-1.5` > `rounded-[18px]`), home spotlight (38px, padding 18, image parent radius 20).
- **RULE** Lay services out on a 6-column grid of 184px columns with 24px gaps: three tiles span 2 columns (392px) and the next row two tiles span 3 (600px), all 18px radius, #313131 on the #232323 slab, padding 18x24, no border, no shadow.
  **Why** A 2/2/2 then 3/3 split gives rhythm from one column system; fill contrast carries elevation.
  **Applies to** landing page. **Check** `grid-template-columns` = 6x184px, gap 24px; tile widths 392/392/392 and 600/600; heights 435.5 and 387.7. **Source** home-s01/s02 (measured).
- **RULE** Stack a service tile as: title (18/700, -0.54px) top-left over the art, art filling the upper ~55%, body 14/22 #9d9d9d, then wrapped chips; let the illustration be ~1.9-2.2x the tile width (826x603 in a 392 tile; 1115x507 in a 600 tile) and clip it with overflow so the scene bleeds off the tile edges.
  **Why** An oversized, cropped scene implies a larger system and avoids a visible "icon in a box".
  **Applies to** landing page. **Check** art element width / tile width between 1.8 and 2.3; tile `overflow: hidden`. **Source** home-s01/s02 (measured), Rive canvases (6 on home).
- **RULE** Draw the service-tile art as one-stroke-weight isometric line art on a dashed isometric guide grid in a single grey ramp with white as the only highlight, and put real tool marks (Framer, Webflow, Next.js, Figma) into the art as props.
  **Why** One stroke and one ramp makes five different scenes read as one set; real marks tie the illustration to the service promise.
  **Applies to** landing page. **Check** visual: stroke width constant across the five scenes; no chroma in the art. **Source** home-s01/s02.
- **RULE** Set category chips at 10.5px/700 uppercase, 25.5px tall, padding 7.5x12; on cards use pills, but on media frames use flush tabs (radius 12px 12px 0 0 above the frame, 0 0 12px 12px below) with 4.5px between chips.
  **Why** Tabs fused to the frame edge read as label tags on a physical card and cost no layout space inside the image.
  **Applies to** landing page. **Check** chip `border-radius` `12px 12px 0 0` (top) and `0 0 12px 12px` (bottom), `gap 4.5px`, font-size 10.5px. **Source** /work, /work/zeroleaks (measured).
- **RULE** Build work-grid cards as a white frame (padding 6px, radius 24px) around a media tile (radius 18px, aspect 2880/2070), two columns of 576px with a 30px gap, tags as tabs above, title as a bottom-left tab; on hover scale the image 1.05 over 500ms cubic-bezier(.76,0,.24,1) and show a custom cursor labelled "View".
  **Why** A single consistent aspect makes 30 unlike projects scan as one grid; the slow image zoom plus cursor label signals "enter" without moving the card.
  **Applies to** landing page. **Check** image 576x414 at 1440; `transition: transform .5s cubic-bezier(.76,0,.24,1)`; `group-hover:scale-105`; `data-cursor="View"` on card link. **Source** /work (measured, hover test), work-fold.
- **RULE** Add a segmented filter capsule (All / Website / Product / Branding): white capsule, 35.5px buttons, padding 12x13.2, 13px, active 700 #232323 with a grey fill pill, inactive 500 #707070, 500ms smooth curve.
  **Why** A single pill control keeps filtering as quiet as the rest of the shell.
  **Applies to** landing page. **Check** button height 35.5px; active weight 700 vs inactive 500; transition 0.5s cubic-bezier(.7,0,0,1). **Source** /work, /swipe-file (measured).
- **RULE** Show spotlight cards as two-part panels (card 1042px wide, ~490px tall, radius 38px, padding 18/24/18/18, #313131): a 497x454 art tile (radius 20px) on one side, copy and a full-width 48px pill CTA on the other, alternating sides per card.
  **Why** Alternating sides adds rhythm without any extra device; the CTA at card width removes ambiguity.
  **Applies to** landing page. **Check** image parent radius 20px, card radius 38px, CTA 471x48 at 14/600/-0.112px, alternation visible in home-s03/s04. **Source** home (measured), home-s03/s04.
- **RULE** Turn the contact form into a stepped page: 2x2 field grid (white inputs ~54px high, labels 16/700 above), a pill Continue that stays grey until valid, and a thin segmented progress bar pinned near the bottom; no marketing around it.
  **Why** A progress bar plus a disabled CTA reframes a long enquiry as a short conversation ("Let's chat!").
  **Applies to** landing page. **Check** visual: Continue disabled state ~#9d9d9d; progress bar visible; page has only nav + form. **Source** /intro.
- **RULE** Render the trial offer in the headline itself, with the price inside a tilted pill (~-4deg, #e5e5e5 fill) set inline in the 52px h1: "Start with a trial week for only [$2500]".
  **Why** A tilted chip makes the number the stress point of the sentence and adds one playful tilt to a rigid grid.
  **Applies to** landing page. **Check** visual: chip rotation between -2 and -6deg, inline with text baseline. **Source** home-s06.
- **RULE** Show the team as 14 monochrome illustrated portraits in ~102px rounded-square white tiles in centred rows (4 / 6 / 4), name 18/700, role 14/500 #707070, one pink cheek accent as the only colour.
  **Why** Illustrated avatars give a 14-person team a consistent face without photo shoots.
  **Applies to** landing page. **Check** tile size ~102px, row counts 4/6/4, avatar palette greyscale + pink. **Source** home-s05.
- **RULE** Pull-quote testimonials with the decisive clause in black 700 inside grey 500 text, portrait left in a rounded tile, name 18/700 and company below, prev/next circles top-right.
  **Why** The bolded clause is the scan path; the rest is context.
  **Applies to** landing page. **Check** visual: one bold span per quote, rest #707070; portrait tile radius ~24px. **Source** home-s05/s06.
- **RULE** Show tools as one white capsule (~100px tall) with a greyscale logo marquee fading at the edges; show clients in a 6-logo strip then a "50+ More" pill instead of a longer wall.
  **Why** Grey logos stay below the headline in the hierarchy; the "+ More" pill hands the credibility claim to the case pages.
  **Applies to** landing page. **Check** visual: logo colour = greyscale (opacity or filter); strip height < 120px. **Source** home-s00/s01/s06.

### 2b. Buttons, states and motion

- **RULE** Make the primary CTA a 54px-high pill (padding 18x24, 15px/700, tracking -0.008em = -0.12px, line-height 18px), #232323 fill, #efefef text, no border, no shadow; the secondary is the same size in white with black 15/600 text; card CTAs are 48px high at 14/600.
  **Why** A fully rounded, borderless, shadowless pair reads as the calmest possible buttons; size, not decoration, carries priority.
  **Applies to** landing page. **Check** button height 54px, `border-radius` full, `box-shadow: none`, `border-width: 0`; secondary weight 600 vs primary 700. **Source** home-s00 (measured; `bg-primary text-primary-foreground font-bold px-[24px] py-[18px] text-[15px]`).
- **RULE** On hover change no colour, shadow or size; instead cross-fade the middle word of the label into a 1.07em arrow glyph (stroke 2.25, square caps) occupying that word's slot, and slide the neighbouring words (about -2.8px and -11.3px in "Start a project") so the label re-centres.
  **Why** The label itself becomes the affordance, so the button stays a flat shape and hover feels deliberate rather than decorative.
  **Applies to** landing page. **Check** hover: only `transform` of inner spans changes (matrix translateX), word span opacity 1 to 0, svg opacity 0 to 1; button bg/color identical to rest. **Source** home hero buttons (measured, `hover-hero-primary.png`).
- **RULE** Vary the glyph by intent: a right arrow for "Start a project" and card CTAs, a north-east arrow for "See our work" (outbound or gallery), both with the same 2.25 stroke.
  **Why** Direction encodes "advance" versus "go look".
  **Applies to** landing page. **Check** visual: icon rotation matches CTA intent. **Source** `hover-hero-primary.png`, `hover-hero-secondary.png`.
- **RULE** Add a ~43px disc that follows the cursor inside the pill on hover, in the inverse of the button (light grey on the dark pill, black on the white pill), with the text under it flipping to the inverse colour.
  **Why** A small inverted spot gives the hover a physical, magnetic feel with no layout change. [observed in 3x screenshots with the cursor at the button centre; not isolated in CSS]
  **Applies to** landing page. **Check** visual with a hover screenshot at 3x; disc diameter ~40-45px; treat as optional. **Source** `hover-hero-primary.png`, `hover-hero-secondary.png`.
- **RULE** Press state: `active:scale-98` (scale .98) on every pill, transitions limited to `color, background-color, opacity, scale` over 300ms cubic-bezier(.76,0,.24,1); disabled state is `bg-primary/40` with `pointer-events: none`.
  **Why** Limiting the transitioned properties keeps buttons compositor-cheap and the press feel identical everywhere.
  **Applies to** all. **Check** `transition-property` list; active computed `scale: 0.98`; disabled bg alpha .4. **Source** home hero primary (measured: active snapshot `scale 0.98`).
- **RULE** Use exactly two named easings: `ease-power3-in-out` cubic-bezier(.76,0,.24,1) for transforms, scale and presses (300-500ms), and `ease-smooth-in-out` cubic-bezier(.7,0,0,1) for colour, background and shadow (500ms); no springs.
  **Why** One pair of curves is the cheapest way to make a whole site feel consistent.
  **Applies to** all. **Check** distinct `transition-timing-function` values on the page <= 2 (plus `all`/linear). **Source** home, /work (measured class names and transitions).
- **RULE** Keep ambient motion to one thing at rest (the status ripple) and put everything else behind hover or scroll: marquees (logos, tools, gallery), image zoom 1.05, FAQ chevrons, Rive scenes in tiles.
  **Why** A calm resting page lets the heavy hero and gallery visuals carry the attention.
  **Applies to** landing page. **Check** `getAnimations()` count at rest <= 3 infinite animations. **Source** home (measured: 2 `ripple` animations).
- **RULE** Mask product videos with `linear-gradient(#000 1px, #000 calc(100% - 1px))` so codec edge fringing never shows against the rounded tile, and clip the tile at radius 24px with a white `bg-card` backing.
  **Why** Hardware-decoded video leaks 1px of edge colour on rounded clips; a 1px inset mask hides it.
  **Applies to** landing page. **Check** `video` has `mask` with 1px stops; parent `overflow: hidden`, radius 24px. **Source** /work/zeroleaks hero tile (measured class names).
- **RULE** Provide a 48px dark circular expand button (backdrop blur, #232323, #efefef icon) at the bottom-right of the case-study hero tile that opens the media full-screen.
  **Why** Hero media is small (626px) so the affordance for "see it bigger" must be explicit.
  **Applies to** landing page. **Check** button 48x48, `border-radius` full, position bottom-right inside the tile. **Source** work-agent-arcade-fold, /work/zeroleaks (measured).

### 2c. Case-study page template

- **RULE** Run every case study in a single 626px column (hero tile 626x450, gallery tile 626x450, section text 626px, h1 max-width 13.72em) with the order: breadcrumb, 36px title, category tabs above the hero, service tabs below it, Overview, Challenge, Outcome, Gallery, Testimonial, Tools used, More recent work, closing CTA.
  **Why** A repeatable template lets 30 very different projects be compared at a glance and makes publishing a new one a copy job.
  **Applies to** landing page. **Check** `h2` x = 407 and width 626 for all sections at 1440; section order matches. **Source** all 30 /work/* pages (measured on zeroleaks; structure verified on every page's headings).
- **RULE** Write each case as Overview (what it is, 2-4 short lines, proof or backers), Challenge (the category is new or complex, plus the tonal constraint), Outcome (designed in Figma, built in Next.js, the animation stack Rive/After Effects, one result line); 3-5 one-sentence paragraphs each, separated by blank lines, with an 18/700 label.
  **Why** A fixed three-beat story with the tools named is faster to scan than prose and sells engineering as well as design.
  **Applies to** landing page. **Check** visual/copy: each section <= 5 paragraphs, each paragraph <= 2 lines at 626px. **Source** /work/agent-arcade, /work/zeroleaks text.
- **RULE** Make every gallery tile the same canvas (2880x2070, shown 626x450, radius 24px, `bg-card` white backing, 20px gap) in a looping marquee that bleeds off both viewport edges and shows ~4 tiles; crop each image as an editorial section of the client's page, not the whole page.
  **Why** Constant canvas plus deliberate crops makes 5-47 images per project feel curated.
  **Applies to** landing page. **Check** all gallery images share aspect 1.391 (1440/1035); tile pitch 646px at 1440 (626 + 20). **Source** gallery/ (285 images, measured aspect), /work/zeroleaks.
- **RULE** Let each project own its type voice and palette: serif + cream (43, Opsis), serif headline + blue (ChatSheet), pixel mono + orange (Volcano), Cy Grotesk + green (Gopher), TWK Lausanne + black/white (Uplinq), Chakra Petch + orange (Supermetal), grotesk + black (ZeroLeaks).
  **Why** The studio shell is neutral so each client page can be recognisably the client's; type is chosen per brand, not per studio.
  **Applies to** all. **Check** visual: no two projects in the gallery share both headline family and accent colour. **Source** gallery sheets (43, opsis, volcano, gopher, uplinq, supermetal, chatsheet).
- **RULE** Title hero headlines in Title Case, two lines, with one accent word carrying a gradient or the brand colour ("Enterprise-Grade Security for AI Systems" with "AI Systems" orange-to-red; "Turn Manual Tasks into Automations"; "Sync Data at The Speed of Light").
  **Why** A single coloured phrase marks the promise in a headline without a second type style. [matches founder headline-case rules]
  **Applies to** landing page. **Check** h1 <= 2 lines at 1440; at most one gradient/colour span. **Source** gallery zeroleaks-02, chatsheet-01, supermetal-01.
- **RULE** Pair a hero headline with an uppercase two-tone treatment when the brand is loud: solid white first line, outlined rainbow-stroke second line ("AGENTIC TRADING IS HERE. / BE EARLY."), a live counter pill above it, and ring lines converging on a product metaphor (an arcade cabinet).
  **Why** A single outlined line is a loud typographic accent that costs one line, and the metaphor object turns a fintech page into a game.
  **Applies to** landing page. **Check** visual: outlined line stroke width ~2px; metaphor object centred below CTAs. **Source** gallery agent-arcade-09.

### 2d. Product UI craft (gallery, X, public templates)

- **RULE** Draw dashboards on near-white surfaces with 1px hairline borders, ~12-16px card radii, small type (~11-13px on the 1440 canvas) and one dominant figure per card: a 28-36px bold number with a small tinted delta chip (+9.72% on 10% green) beside or under it, and uppercase 10-11px labels above.
  **Why** A single hero figure per card plus tiny labels is what makes dense UI read as calm.
  **Applies to** SaaS app UI. **Check** per card: one number >= 24px, labels <= 11px uppercase, delta chip tinted not solid. **Source** x/x-2107524099018764393-0 (4 dashboards), gallery zeroleaks-01, agent-arcade-02.
- **RULE** Express status as a 6px dot plus text (red Critical, amber Vulnerable, green Secure) in table rows, not as filled badges; reserve filled pills for one active filter per view.
  **Why** Dots keep dense tables from turning into a sea of colour.
  **Applies to** SaaS app UI. **Check** table status cell: <= 8px dot + text; no fill behind text except the active filter. **Source** gallery zeroleaks-02 (tables), agent-arcade-12.
- **RULE** In dark product UI use a #000-#0a0a0a canvas, panels 2-4% lighter with 1px borders at ~8-10% white, and spend colour on under 5% of pixels: a white primary button (ZeroLeaks) or a single gradient accent (Agent Arcade purple-orange).
  **Why** Low panel contrast plus a single accent keeps dense dark UIs legible and premium.
  **Applies to** SaaS app UI. **Check** panel vs canvas luminance delta <= 4%; accent area < 5%. **Source** gallery zeroleaks-01/02, agent-arcade-02/04, live-workflow-editor.png.
- **RULE** Give a dark brand's primary button underglow instead of a drop shadow: a dark pill with a 1px gradient edge and a warm-to-magenta glow along the bottom edge (Agent Arcade Deposit), while the secondary is a quiet black pill with a 1px inner highlight.
  **Why** Light from below makes a button feel like a lit key on a dark surface; shadows are invisible on black.
  **Applies to** SaaS app UI. **Check** visual: no `box-shadow` offset below; a gradient border or inner glow at the bottom edge. **Source** work-agent-arcade-fold, gallery agent-arcade-09.
- **RULE** Use 20-24px tinted rounded-square icon tiles (radius ~6px; green, orange, purple, teal) as the only colour in light node and sidebar UI, with grey labels at 13px.
  **Why** One consistent tile shape gives a colourful system without colouring the layout.
  **Applies to** SaaS app UI. **Check** visual: icon tile 20-24px with tinted fill; text greyscale. **Source** x/x-2107524099018764393-0, x-2107869459142914419-0.
- **RULE** Fill sample data with real tool logos and coherent figures (Figma, Stripe, Notion rows; "$1,408.64 +9.72%"; "65% AVG HEALTH" with 48 scans and 8 leaks) and one person set reused across screens (Alex Melton, Sarah Tan).
  **Why** Believable, repeated data turns a screen into a story; the same names tie flows together.
  **Applies to** SaaS app UI. **Check** visual: no "Lorem", no duplicate row text, totals consistent between screens. **Source** gallery zeroleaks-01, sideshift-sheets, agent-arcade-02/03.
- **RULE** Show each key screen in both light and dark, and at both desktop and mobile, in the same gallery.
  **Why** It proves the system is tokenised rather than a single hero mock.
  **Applies to** SaaS app UI. **Check** visual: gallery contains >= 1 light and >= 1 dark rendering of the same screen. **Source** gallery copecart-01..06, listkit, agent-arcade-02/03, uniops-04/05.
- **RULE** Compose phone screens in sets of three on a #2e2e2e canvas (9:41 status bar, top of each phone bleeding off the canvas edge), all sharing one sky or gradient header and one illustration set.
  **Why** Three frames show a flow's start, middle and result at a glance; the shared header makes it one system.
  **Applies to** SaaS app UI. **Check** visual: 3 phones, same header gradient, canvas #2e2e2e. **Source** gallery sideshift sheets, x-2106809106157707647-0.
- **RULE** Treat gamification art as a system sheet: 100+ glossy badges on one sheet (shapes by tier, numerals by value), consistent lighting from the top-left, a cloud/sky gradient for headers.
  **Why** A grid of badges proves the art is systematic, not a one-off.
  **Applies to** SaaS app UI. **Check** visual: all badges share light direction and bevel; numerals in one font. **Source** gallery sideshift-02/03.
- **RULE** Keep presentation props inside the UI: draw browser or app chrome with traffic-light dots, show the cursor (arrow or hand), and lift one element (a dragged row with a larger shadow and a hand cursor) to imply interaction.
  **Why** A visible cursor and a lifted element make a still read like a clip.
  **Applies to** SaaS app UI. **Check** visual: cursor glyph present; one element elevated above its row. **Source** x/x-2107505914345603127-0 (Actions panel), x-2107494499660529916-0.

### 2e. Bento construction (how tiles are built)

- **RULE** Put the tile title and caption inside the tile (bottom-left or centred under the art), with the visual taking the top ~60-65%, title ~16-22px, caption ~13-14px in a muted 55-65% tone.
  **Why** In-tile text lets the whole tile be one clickable, self-contained unit and keeps scanning vertical.
  **Applies to** landing page. **Check** tile text block height <= 40% of tile; caption colour contrast >= 4.5:1. **Source** gallery stardust-02, agent-arcade-12, hunt-05.
- **RULE** Offset widths between consecutive two-column rows so no vertical gutter aligns: ~36/64 on row one and ~64/36 on row two (Agent Arcade 408:732 css), or a wide + narrow pair then a narrow + wide pair (Hunt ~945px + narrow over ~609px + wide).
  **Why** A checkerboard split creates a diagonal reading path and avoids the "table" look.
  **Applies to** landing page. **Check** left tile width row 1 != row 2 (|delta| > 25% of container). **Source** gallery agent-arcade-12, hunt-05.
- **RULE** Vary the column count between rows: two halves over three thirds (Stardust ~663px halves then ~435px thirds, ~20px gaps) or three over two (ChatSheet 3 x ~346px over 2 x ~519px; Kargul services 3 over 2).
  **Why** Different counts per row break monotony and let a hero tile carry the heavier idea.
  **Applies to** landing page. **Check** consecutive rows differ in tile count. **Source** gallery stardust-02, chatsheet-02, home-s01/s02.
- **RULE** Choose one of two grid constructions per page and never mix: hairline-divided tiles with no fill and no gap (Agent Arcade, Gopher, ChatSheet, ZeroLeaks: 1px dividers at ~6-8% contrast) for editorial or infrastructure brands, or separate rounded tiles with ~12-28px gaps and a card fill (Stardust, Hunt, DefendLab, Kargul).
  **Why** The divider system makes the whole grid read as a printed table of images; card tiles read as product objects. Mixing them looks undecided.
  **Applies to** landing page. **Check** one construction per section; divider alpha 4-10% if hairline. **Source** gallery agent-arcade-12, gopher-06, chatsheet-02 vs stardust-02, hunt-05, defendlab-04.
- **RULE** Light each tile with one source: a spotlight cone from top-centre (Hunt: cyan on black with a hex mesh), top light shafts plus a radial base glow (Stardust), or a bloom behind the hero object (Agent Arcade logo disc); add a horizon arc or glow under objects.
  **Why** A single light direction fixes the tile as a lit scene and stops icon-clutter.
  **Applies to** landing page. **Check** visual: one highlight direction per tile; glow colour = brand accent. **Source** gallery hunt-05, stardust-02/04, agent-arcade-12.
- **RULE** Build each tile around one focal object (shield, hex, orb, disc, wallet, voxel block) plus 2-4 satellites on a faint orbit, ring or path line; never two focal objects in one tile.
  **Why** A clear focal object is what makes a bento tile iconic at thumbnail size.
  **Applies to** landing page. **Check** visual: squint test shows one dominant blob per tile. **Source** gallery zeroleaks-06 (shield + 8 nodes), agent-arcade-12 (logo disc + 6 satellites), stardust-02.
- **RULE** Texture dark tiles so they are not flat: halftone dot fields fading at one edge (ZeroLeaks, with one red accent patch), hex mesh (Hunt), checker ground with pixel dissolve at the top edge (Volcano), dot cloud behind an app icon (DefendLab).
  **Why** Texture gives a black tile depth and a place for light to land.
  **Applies to** landing page. **Check** visual: texture opacity < 25%; fades out before reaching text. **Source** gallery zeroleaks-03/06, hunt-02/05, volcano-04, defendlab-04.
- **RULE** Derive every tile's object language from the client logo geometry (hexagon, voxel, disc, shield, squircle app icon) and repeat it across all tiles on the page.
  **Why** Shared geometry makes custom illustration read as the brand rather than as stock.
  **Applies to** all. **Check** visual: >= 80% of tile objects reuse one shape family. **Source** gallery hunt-05 (hex), volcano-04 (voxel), agent-arcade-12 (disc), altrina-05 (hex nodes).
- **RULE** Break a bento with one number tile: a single giant numeral with a gradient fill and diagonal hatch (Hunt "89%" in teal-to-peach) and a two-line grey caption beneath; keep other tiles object-led.
  **Why** A statistic tile changes rhythm and gives the section its proof point.
  **Applies to** landing page. **Check** one tile with numeral >= 120px and caption <= 2 lines per bento. **Source** gallery hunt-05.
- **RULE** Write bento captions as a bold lead word plus one grey sentence in one run ("Discovery. Discover infrastructure and block threats before they launch.") at ~15-17px, lead 700 white, remainder ~60% white.
  **Why** The lead word is the heading, so no separate title element is needed.
  **Applies to** landing page. **Check** caption has a <=2-word bold lead followed by grey text in the same paragraph. **Source** gallery hunt-02/05.
- **RULE** Number process tiles ("01 Run AI-Powered Scans") with a small grey index above a ~17-20px title, and let the art show flow: icon tiles on a thin horizontal line with a green start dot and a red end dot.
  **Why** The numbers set order; green-to-red dots explain "scan to exploit" without copy.
  **Applies to** landing page. **Check** index text <= 13px grey above the title; line endpoints coloured. **Source** gallery defendlab-04.
- **RULE** For light, soft product bento use squircle app-icon tiles (~60-80px, soft ring plus faint lift) as nodes, halftone dot clouds behind them, and hairline connectors; tiles are white with a ~24px radius on a #f9f9f9 canvas.
  **Why** App-icon tiles read as real software logos, and soft depth matches light UI.
  **Applies to** landing page. **Check** tile radius ~24px, shadow alpha <= 8%. **Source** gallery defendlab-04/05, chatsheet-02.
- **RULE** In isometric light bento (ChatSheet) use one blue family (white plates, #dbe6ff fills, one #3b6bff accent, one black plate as the pivot), consistent isometric angle, and dashed paths between plates.
  **Why** One hue plus one black pivot gives illustration hierarchy with no extra colour.
  **Applies to** landing page. **Check** visual: <= 3 hues; all plates share the same isometric angle. **Source** gallery chatsheet-02/03.
- **RULE** On cream and serif brands (Gopher) draw bento art in 1.5px dark-green line with 5px green accent dots and pale-green fills on a cream canvas, with the title top-left and the art at the bottom of each hairline-divided cell.
  **Why** Dots mark connection points, so the diagram reads as infrastructure.
  **Applies to** landing page. **Check** visual: line weight constant; accent dots only on connection points. **Source** gallery gopher-06.
- **RULE** Add a 2px gradient rule (blue to orange to red) under a hero bento tile when the tile sits on pure black, to anchor its lower edge.
  **Why** A single coloured line gives a floating dark tile a floor.
  **Applies to** landing page. **Check** 2px line at tile bottom; gradient spans full tile width. **Source** gallery zeroleaks-06.
- **RULE** Use a 3-step strip of near-square cards (~522x460 css) with the step name inside the tile bottom-left, each scene a lit 3D glass object (dashboard slab to sparkle plate; phone with a light-beam fan; dot-grid with phone).
  **Why** Equal near-square cards turn a process into three visual beats.
  **Applies to** landing page. **Check** three equal-size cards; one scene per card; label bottom-left. **Source** gallery stardust-03.

### 2f. Presentation and distribution (X posts, templates)

- **RULE** Export every UI shot as a cropped window on a flat, pure-neutral canvas chosen near the UI's surface: #bebebe, #aaaaaa, #b3b3b3 for light UI; #1e1e1e, #2e2e2e, #5e5e5e for dark or colour UI; #e5e5e5 for a very quiet light UI; no gradient or shadow behind the window.
  **Why** A neutral backdrop makes the interface the only chroma; a canvas one step off the UI surface avoids a heavy frame.
  **Applies to** all. **Check** canvas corner pixels R=G=B; no gradient (corner pixels equal at 3 corners). **Source** x/ images (pixel samples: 2107524099018764393 #bebebe, 2107525106037670247 #aaaaaa, 2106344367556632659 #5e5e5e, 2108299389466825173 #1e1e1e, 2106809106157707647 #2e2e2e, 2107875639688933602 #b3b3b3, 2107619825719910460 #e5e5e5).
- **RULE** Crop the window off the right or bottom canvas edge (and keep ~20% empty canvas on the other sides) so the product feels bigger than the frame; use rounded window corners of ~24-32px (at 2k width).
  **Why** An uncropped window looks like a thumbnail; a cropped one looks like a slice of a product.
  **Applies to** all. **Check** visual: window touches at least one canvas edge or is cut by it. **Source** x-2107875639688933602-0 (full window), x-2107869459142914419-0 and x-2107619825719910460-0 (cropped).
- **RULE** Use retina export sizes: 4096x2978, 4096x3781, 3104x2272, 2048x1472 for UI shots, 2000x2000 for single-detail posts, 2048x1643 for tall UI.
  **Why** X recompresses; starting at 2-4k keeps text crisp on retina.
  **Applies to** all. **Check** export width >= 2048. **Source** x/ images (media metadata from API).
- **RULE** Make "details." posts as one component centred on a near-black 1:1 canvas (#100f11 to #0c0b0d with a faint top-left light haze), a 1px top highlight on the panel, one lifted row with a hand cursor, and sparse star specks.
  **Why** Isolating one component at large scale shows craft details (spacing, icon colours, row hover) that a full screen hides.
  **Applies to** all. **Check** 2000x2000 export; component width ~40% of canvas. **Source** x/x-2107505914345603127-0 ("how are your designs so good? details.").
- **RULE** Post multi-image sets (3-4 images) with the same canvas colour, crop scale and framing so they read as one object; for mobile use 3-up.
  **Why** Matching sets look like a system; mismatched ones look like a dump.
  **Applies to** all. **Check** all images in a post have equal width/height and corner colour. **Source** x/x-2107525106037670247 (3 x 3104x2944), x-2106809106157707647 (3 x 2048x1472), x-2107175194838044784 (4 dashboards).
- **RULE** Caption in one lowercase line of <= 8 words with at most one emoji (😏 😁 🤩), no hashtags, no line breaks inside the thought; put links in a reply to the post.
  **Why** Restraint reads as confidence; moving links out preserves reach and keeps the image the only message.
  **Applies to** all. **Check** caption length <= 80 characters; link posted as a self-reply (`replying_to` is the author). **Source** x posts 2107060192559181914/2107060195910353132, 2107112139605618920/2107112142734242052, 2107875639688933602/2107875643681640687.
- **RULE** Lead with source: ship a free editable Figma file of the dashboards (Plunio, Alloway, Callione, Acme examples) and open-source starters with live demos; the top posts by reach are these (82.6k and 54.6k views, 998 and 1,096 bookmarks).
  **Why** Editable assets earn bookmarks, which is the strongest signal on X, and show spacing and type as evidence.
  **Applies to** all. **Check** n/a (distribution). **Source** x 2107524099018764393, 2107112139605618920; github.com/kargulstudio.
- **RULE** Record UI videos as screen captures at 2x with a visible arrow cursor, 5-45 seconds, cropped to the product (1252x900, 2880x2048, 3840x2112, 2504x1800, 1134x720), with no music or overlay text.
  **Why** A real cursor interacting with a real page is the only proof that polish survives interaction.
  **Applies to** all. **Check** n/a (distribution). **Source** x/xvsheet-* (9 videos; cursor visible in kanban, Opsis guidelines, Figma recording).
- **RULE** Present brand work in environment mockups with natural light: billboards and bus-stop posters, a tram wrap, a flag, an embossed cloth book, business cards on black, a 3D mascot on a red velvet curtain, and a logo reveal on a motion-blurred gradient.
  **Why** Real-world light and materials make an identity feel shipped and give each brand a different world.
  **Applies to** all. **Check** visual: >= 4 distinct physical contexts per brand case. **Source** gallery folk-0/1, opsis-partners-0/1, ostium-0.
- **RULE** Ship the brand kit pages inside the case: logo clear-space with a px label (15px), type specimen with three "Aa" weights, colour ramps at 100/80/60/40/20 per colour, and a logo size ladder (32/64/96/160/224 px).
  **Why** Kit pages show the identity is a system, and they are quick to produce from the same tokens.
  **Applies to** all. **Check** visual: spacing label, specimen, ramps present. **Source** gallery supermetal-05..07, uplinq-0.
- **RULE** Keep the studio's own work-grid thumbnails colour-led by the client (sky blue, black, orange, cream, purple) on the neutral page so the grid reads as a varied wall.
  **Why** Variety in the content with neutrality in the frame makes the whole grid scannable.
  **Applies to** landing page. **Check** visual: adjacent thumbnails differ in dominant hue. **Source** work-fold.png, /work (30 cards).

## 3. Numbers & scales

### Shell (1440 viewport, computed)
| Item | Value |
|---|---|
| Nav | fixed top 12px, 3 pills at 42px tall: logo 42x42, links ~182 wide (padding 10x15, gap ~14), CTA 118x42 |
| Nav shadow | 0 1px 3px rgba(0,0,0,.1), 0 1px 2px -1px rgba(0,0,0,.1) |
| Status pill | 32px tall, padding 4x12, dot 8px, ripple 2050ms linear |
| h1 / h2 / h3 | 52/55.64 700 -1.56px; 36/41.76 700 -1.08px; 18/24 700 -0.54px |
| Case page h1 / h2 | 36px; 18px (role-class styled) |
| Lede | 16/24 500 #707070 (~396px) |
| Card body | 14/22 500 #9d9d9d |
| Primary CTA | 151.2 x 54, padding 18x24, 15/700, -0.12px; secondary 139.8 x 54, 15/600 |
| Card CTA | 471 x 48, padding 15x24, 14/600, -0.112px |
| Chips | 10.5/700 uppercase, 25.5px tall, padding 7.5x12, tab radius 12 |
| Filter button | 35.5px tall, padding 12x13.2, 13px |
| FAQ row | 540 wide, padding 18x16, radius 28.8, closed height 58.4, open 136.4, row pitch ~72 |
| Slabs | x=18, width 1404, radius 36, padding 80/90 (dark and white) |
| Services grid | 6 x 184px cols, gap 24; tiles 392 and 600 wide; radius 18; padding 18x24; heights 435.5/387.7 |
| Spotlight card | 1042 wide, ~490 tall, radius 38, padding 18/24/18/18, image 497x454 radius 20 |
| Work card | frame padding 6, radius 24, image radius 18, aspect 2880/2070, 576x414; grid gap 30; tabs gap 4.5 |
| Case column | 626 wide; hero/gallery tile 626x450, radius 24, gallery pitch 646 (gap 20) |
| Press scale | .98 |
| Colour tokens (light shell) | bg #efefef, fg #232323, card #fff, muted #707070, dark card #313131, dark muted #9d9d9d, success #1daf61 |
| Spacing tokens | `--padding-global` 1.1875rem, `--padding-section-sm/md/lg/page` 2rem/3.5rem/3.5rem/7.375rem |

### Motion
| Item | Value |
|---|---|
| `ease-power3-in-out` | cubic-bezier(.76,0,.24,1); 300ms for press/colour on buttons, 500ms for image zoom |
| `ease-smooth-in-out` | cubic-bezier(.7,0,0,1); 500ms colour/background/shadow (nav, filters) |
| Hover image zoom | scale 1.05 / 500ms |
| Hover label swap | middle word opacity 1 to 0, arrow opacity 0 to 1, neighbour spans translate ~-2.8px / ~-11.3px |
| Rive canvases | 6 on home (5 service tiles + footer dome), 826x603, 860x629, 729x533, 1115x507, 1076x490, 1348x945 |
| Animations at rest | 2 x `ripple` 2050ms linear on the status dot |

### Gallery bento geometry (css px, scaled from 2880x2070 canvas; approximate)
| Bento | Grid | Tile size | Gap |
|---|---|---|---|
| Agent Arcade "Beyond wallstreet" | 2x2 checkerboard, hairline | ~408 / ~732 then ~730 / ~410 x ~490 | 1px divider |
| Stardust "Scale With Stardust" | 2 halves over 3 thirds | ~663x407 then ~435x407 | ~20 |
| Stardust "3 Steps" | 3 near-square | ~522x460 | ~24 |
| Hunt "Signal, Not Noise" | 2 + 2 asymmetric | ~945x474 + narrow; ~609x474 + wide | ~12 |
| DefendLab "How Our Product Thinks" | 3 numbered cards | ~533x492 | ~28 |
| ChatSheet "Examples" | 3 over 2, hairline | ~346x378 x3; ~519x380 x2 | 1px |
| Gopher | 2x2, hairline | ~700 wide | 1px |
| Altrina | 3 cards, 1px border | ~550x387 | ~19 |
| ZeroLeaks | 1 big + 2 below, hairline | ~1059x476 + ~530x314 x2 | 1px |
| Volcano | 3x2 voxel scenes, borderless | ~360x380 | ~48 |

### Bento section breakdown (every bento seen, with what each visual is made of and how it animates)

Animation note: gallery files are stills, so "animates" is stated only where the case copy, the DOM or a measurement supports it; otherwise "unknown (still)". Case copy says Rive and After Effects for the animation work on Agent Arcade, SideShift, ZeroLeaks (micro-interactions) and the landing pages generally.

1. **Kargul home, Services** (`home-s01/s02`). Grid: 6 columns of 184px, gap 24, tiles span 2 (392x435.5) then 3 (600x387.7), radius 18, #313131 on a #232323 slab. Visual: one-stroke isometric line art on a dashed isometric grid, grey ramp with white highlights, real Framer/Webflow/Next.js/Figma marks as props, scene ~2x tile width cropped by the tile (826x603 in a 392 tile). Layering: dashed guide plane below, plates and objects above, edge crop. Animation: Rive canvas per tile (6 on home), lazy; loop timing unknown.
2. **Kargul home, Project spotlights** (`home-s03/s04`). Grid: single column of 1042x~490 cards, radius 38, padding 18, 2-part (497x454 art tile radius 20 + copy), sides alternate. Visual: real client UI screenshots (Hyperliquid hero, ZeroLeaks dashboard, SideShift 3-phone set) cropped to a rounded tile. Animation: none measured beyond card CTA hover.
3. **Agent Arcade, "Beyond wallstreet"** (`gallery/agent-arcade-12.jpg`). Grid: 2x2 checkerboard, hairline dividers, tiles ~408/732 over ~730/410 css, ~490 tall, no fill, centred title and 2-line caption under the art. Visuals: (a) glossy green $ / Apple Pay / USDC discs and a "Grok Tesla" mini card with Copy and gradient Counter button, orbit stroke; (b) a logo disc (rainbow stripes) at the centre of three concentric rings with observe/act/learn/synthesise pills and brand discs on the rings; (c) outlined "24/7" gradient numerals above a dotted arc of logo discs (Meta, Tesla, Apple, BTC, Nvidia, Microsoft, Oracle) with glowing pink-purple bottoms; (d) a wallet with a shield, key and user nodes joined by a gradient cable to a Hyperliquid chip. Depth: soft glow under discs, 1px gradient outlines (blue-green-amber-magenta) on rings. Animation: logo discs and orbits are orbits in concept; case copy says Rive and After Effects; speeds unknown.
4. **Agent Arcade, "Have agents trading in minutes"** (`agent-arcade-10.jpg`). Grid: 3 hairline columns, each a 1px-bordered ~4:3 illustration frame under a 18-20px title and 2-line grey body. Visuals: Visa card + wallet + rising green line + USDC/Tether coins; five hexagon nodes (Grok, Claude, Gemini, OpenAI, Tesla) linked by thin lines over converging chevrons; a trading-terminal panel. A full-width band "Trading is a game. Welcome to the arcade." with waving rainbow lines separates sections.
5. **Agent Arcade, leaderboard** (`agent-arcade-11.jpg`). Not a bento: a fading table (6 rows, then rows fade to 0 over ~2 rows) with an overlay CTA, flanked by concentric rainbow arcs. Teaches the "fade the table into a CTA" move.
6. **Stardust, "Scale With Stardust"** (`stardust-02.jpg`). Grid: 2 halves (~663x407) over 3 thirds (~435x407), ~20px gap, radius ~12, 1px purple-tinted border, #0b0b0d page. Visuals: outlined 24/7 numerals with diagonal light shafts and sparks; concentric rings (KPI / ROAS / CPI) with a comet; a hex-dot grid with a glowing X node and person pins; a curved 3D bar chart with side panels; stacked fanning metric cards (Installs, Purchasers, Retention, ROAS, Ad Viewers, Custom Action). Light: purple radial glow and a base horizon glow. Text inside the tile bottom-left (title ~17px white, caption muted).
7. **Stardust, "3 steps"** (`stardust-03.jpg`). Grid: 3 near-square cards (~522x460). Visuals: glass dashboard slab and sparkle plate joined by a lightning node; a phone with a light-beam fan below; a dotted people-field with a phone. Primary button: purple gradient pill with glow.
8. **Hunt, "Why traditional threat feeds aren't enough" / "Signal, Not Noise"** (`hunt-02.jpg`, `hunt-05.jpg`). Grid: row 1 ~945x474 + narrow tile, row 2 ~609x474 + wide tile, ~12px gaps, radius ~14, black tiles on a white page. Visuals: radar sweep with red scatter on hex mesh; circuit paths with a red hex node and IP chips; a cyan spotlight cone over a red hex; a giant gradient "89%" with hatch texture; a hooded-figure icon at the centre of red nodes. Caption: bold lead word + grey sentence. Animation: radar sweep and path pulses implied; unknown (still).
9. **DefendLab, "How Our Product Thinks"** (`defendlab-04.jpg`) and the 2x2 feature bento (`sheet-defendlab-0`). Grid: 3 numbered cards ~533x492 (radius ~24, soft shadow) on #f9f9f9; the feature bento is 2x2 with mixed widths. Visuals: squircle app-icon tiles (sparkles in orange/pink/blue, green shield hero, red warning and FIX tags) on a thin line with green and red end dots, halftone dot clouds behind; code-line file glyphs. No fill gradients.
10. **Volcano, 3x2 voxel scenes** (`volcano-04.jpg`). Grid: 6 borderless cells of ~360x380 with ~48px gutters on white. Visuals: isometric pixel/voxel blocks (orange, navy, yellow) on a faint checker ground, with a dissolve of pixels along each cell's top edge; scenes: MCP stack, retries, stream, concurrency. Animation: pixel dissolve suggests a build-in; unknown.
11. **Gopher, 2x2** (`gopher-06.jpg`). Grid: 2x2 hairline cells ~700 wide, no fill, title top-left (~26px), 3-line body, art bottom. Visuals: 1.5px dark-green line art on cream; cube with accent dots joined by dashed lines to circular icons; server racks with a green padlock; browser window with gear and cubes; phone to globe to wallet. A "Testnet | Block Explorer | Github" tab row heads the grid.
12. **Altrina, 3 cards** (`altrina-05.jpg`). Grid: 3 white cards ~550x387 with 1px light border on #f3f5f7, ~19px gap, near-square corners. Visuals: app logos (Slack, Gmail, Stripe, Calendar, Drive, Zapier) on an orbit around the hex mark; a 01-02-03 hex-node chain with a globe; a chat bubble over a ribbon wave.
13. **ChatSheet, "Examples of What You Can Automate"** (`chatsheet-02.jpg`) and the 3-up (`sheet-chatsheet-0`). Grid: 3 over 2, hairline, ~346x378 x3 then ~519x380 x2; serif titles (~20px) over a grey sans caption. Visuals: isometric light-blue plates and folders (Contracts/Proposals), Slack/Gmail plates joined by dashed paths, a donut chart over a stacked database, a plate grid with person pins, a laptop with "Welcome!". One black plate is the pivot in each scene.
14. **ZeroLeaks, features** (`zeroleaks-03.jpg`, `zeroleaks-06.jpg`). Grid: 2x2 hairline text tiles (icon tile ~59px with 1px border, title, 2-line caption, halftone dot field with a red accent on one edge) and a large illustration tile ~1059x476 over two tiles ~530x314, a 2px blue-orange-red line below the illustration. Visuals: grey 3D shield with a hole at the centre, 8 rounded plates on an elliptical dashed ring, 3 plates marked with red beams and pill labels ("Injection vectors identified", "suggested remediations", "alerts on new risks"), a dotted radial halo. Light: soft green rim glow on the shield.
15. **UniOps, "What you're doing instead"** (`sheet-uniops-1`). Grid: 3 stat tiles + a comparison table + 3 illustration tiles; weaker than the others (flat, wireframe-like). Use as a counter-example.
16. **Copecart, share-card colourways** (`sheet-copecart-0`). Not a bento: 4 shareable stat cards (cyan, blue, amber, green) each a white chart panel inside a coloured plate with a dot palette picker. Teaches the "theme picker as a bento" idea.

### X profile facts (api.fxtwitter.com, 2026-10-09)
60,031 followers; joined 2022-09-05; 27,539 posts; 3,534 media; top recent posts: kanban repo video 82.6k views / 659 likes / 998 bookmarks; "this is insane alignui.com" 68.9k / 264 / 555; "client scammed us" 63.1k / 353; "most companies never reach this level of design" 56.0k / 333 / 302; free dashboards Figma 54.6k / 689 / 1,096.

## 4. Dos and Don'ts

- **Do** show the same screen as light, dark, desktop and mobile in one gallery (Copecart, Agent Arcade, ListKit). **Don't** show a single hero mock and call it a system.
- **Do** use a pure-neutral canvas and crop the window off an edge (Kargul X posts). **Don't** put a product screenshot on a tinted gradient with a heavy drop shadow; it competes with the UI colour.
- **Do** use concentric radii (24 = 18 + 6; 38 = 20 + 18). **Don't** keep the same radius on frame and image; the corner gap goes uneven.
- **Do** swap one label word for an arrow on hover and leave the colours alone. **Don't** add colour shift, shadow lift and scale in one hover.
- **Do** make each bento tile one scene with one light source (Hunt, Stardust). **Don't** fill a tile with a row of unrelated icons or several equal-weight objects.
- **Do** pick hairline-divided or gapped cards per bento. **Don't** put a hairline table next to floating cards in one section.
- **Do** give each client its own palette and type voice behind a neutral shell. **Don't** reuse the studio's grey Geist shell for a client brand page.
- **Do** keep status as a dot plus text and one accent colour in dense dark UI (ZeroLeaks). **Don't** colour every badge; the table becomes noise.
- **Don't** copy the studio's weak spots: 10.5px chips, #9d9d9d on #313131 (~4.5:1 by estimate), and the loose "What you're doing instead" tiles in UniOps pricing, which look like a wireframe next to the polished hero (see uniops-sheet-1).

## 5. Exceptions & judgement calls

- The shell is deliberately plain; the founder's "polished modern SaaS" bar (Kaching, Capto) lives in the gallery, so copy gallery craft (scenes, lighting, tile grammar) and the shell's mechanics (radii, easing, button anatomy), not its grey look. [engine note]
- Hairline bento (Agent Arcade, ChatSheet, ZeroLeaks) is cheaper to build but needs strong art; card bento (Stardust, Hunt) hides weaker art better. [engine note]
- The cursor-follow disc on hover is only seen in screenshots; implement the label-to-arrow swap first and treat the disc as optional. [engine note]
- 3D-glass purple (Stardust) and rainbow outline (Agent Arcade) are loud brand-specific styles; they are references for lighting and object scale, not defaults.
- The "Start a project" CTA appears in both white and #232323 in the nav depending on the background beneath it in different screenshots; the rule is a contrast-adaptive CTA, but the trigger was not isolated. [engine note]
- Marcel posts 5-6+ times a day and claims 3-4 before; reach metrics are noisy per post, so use the ranking (source files, repos, AlignUI), not the absolute numbers.

## 6. Figures worth keeping

Paths under `knowledge/benchmarks/kargul-deep/`:
- `gallery/agent-arcade-12.jpg`: 2x2 checkerboard bento, hairline dividers, orbit and logo-disc art on near-black.
- `gallery/agent-arcade-10.jpg`: "Have agents trading in minutes" 3-column hairline strip with bordered illustration frames.
- `gallery/agent-arcade-09.jpg`: hero with outlined rainbow headline and arcade metaphor.
- `gallery/stardust-02.jpg`, `stardust-03.jpg`: 2+3 bento and 3-step strip, purple 3D glass objects with base glow.
- `gallery/hunt-05.jpg`, `hunt-02.jpg`: black tiles on white page, spotlight cones, hex mesh, giant 89% numeral tile.
- `gallery/defendlab-04.jpg`: numbered light cards with squircle app-icon nodes and green/red flow line.
- `gallery/volcano-04.jpg`: 3x2 voxel isometric scenes on checker ground in orange/navy/yellow.
- `gallery/gopher-06.jpg`: cream hairline 2x2 with line-art and green accent dots.
- `gallery/altrina-05.jpg`: three white cards with orbit, hex-node and chat art.
- `gallery/chatsheet-02.jpg`: 3+2 isometric blue bento on hairline grid, serif headline.
- `gallery/zeroleaks-06.jpg`, `zeroleaks-03.jpg`: black bento with 3D shield, dot field and gradient rule.
- `gallery/sheet-zeroleaks-1.jpg`, `sheet-uniops-0.jpg`: dense dark and light dashboard sets.
- `gallery/sheet-sideshift-0..2.jpg`: badge sheet, illustration set, mobile flows.
- `gallery/sheet-folk-0.jpg`, `sheet-opsis-partners-0.jpg`, `sheet-ostium-0.jpg`: brand presentation mockups.
- `gallery/sheet-supermetal-0/1.jpg`: kit pages (typeface, ramps, clear-space).
- `x/x-2107524099018764393-0.jpg`: four-dashboard Figma-file post (the format to copy).
- `x/x-2107505914345603127-0.jpg`: "details." single-component post.
- `x/x-2107875639688933602-0.jpg`, `x-2107619825719910460-0.jpg`, `x-2107869459142914419-0.jpg`: workflow editor, projects list, inbox UI presentation crops.
- `x/x-2106344367556632659-0.jpg`: his own "builder" UI presented on #5e5e5e.
- `hover-hero-primary.png`, `hover-hero-secondary.png`: the label-to-arrow hover and cursor disc.
- `home-s00.png`, `home-s01.png`, `home-s02.png`, `home-s05.png`: nav pills, hero, services bento, team avatars.
- `live-workflow-editor.png`, `live-kanban.png`: his public templates as live proof.

## 7. Open questions

- Motion inside bento tiles is inferred, not captured: case copy says Rive and After Effects, home has 6 Rive canvases, and gallery PNGs are stills. Orbit speeds, loop lengths and easing inside tiles are unknown. The sampled X video frames were mostly static (six evenly spaced stills each), so they show no motion either.
- Whether the hover disc is a cursor-follow element or a pointer-position ripple was not isolated in CSS.
- Home-page hero fonts are Geist per the earlier profile; client fonts (Cy Grotesk, TWK Lausanne, Chakra Petch) are read off specimen sheets, not from client sites. ChatSheet and 43 serif families are not named.
- Only the 60 most recent posts were reachable (fxtwitter paging stopped at 60); older posts, replies and quote-posts were not read.
- Other public work: a Framer Community creator page `@kargul-studio` exists with one named component ("LightBox Gallery K."); no Dribbble, Layers, Behance or Figma Community pages were found (404); a Contra page "Kargul Studio" exists but was not confirmed as the same studio. The two free Figma files linked from X (dashboards; workflow editor) were not opened (design access needs sign-in, and none was attempted).
- AlignUI: Marcel promotes it publicly (2 posts), and a screen recording shows an "Align UI Design System" Figma file by "Choirul"; this strengthens the team overlap but still does not show ownership or authorship.
- The CRM app (sales-crm-kargulstudio.vercel.app) and the repo's `CONVENTIONS.md` are out of scope here and covered elsewhere.
