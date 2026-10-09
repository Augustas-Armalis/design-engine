---
source: web:linear.app + vercel.com + stripe.com + raycast.com + resend.com + cursor.com + clerk.com + mercury.com + ramp.com + attio.com + lightfield.app + framer.com + arc.net + superhuman.com + granola.ai + cal.com + supabase.com + warp.dev + family.co + basement.studio + posthog.com + usepylon.com + folk.app + clay.com + mintlify.com + browserbase.com + neon.tech + railway.com + planetscale.com + oxide.computer + modal.com + diabrowser.com + factory.ai + sanity.io + tailscale.com + paper.design + zed.dev + bun.sh + replicate.com + convex.dev + trigger.dev + jitter.video + cosmos.so + spline.design + rive.app + superlist.com + screen.studio + tella.tv + mymind.com + teenage.engineering + thebrowser.company + darkroom.engineering + tldraw.com + elevenlabs.io + liveblocks.io + suno.com + fal.ai + interfacecraft.dev (+ rauno.me, devouringdetails.com, emilkowal.ski, paco.me, brianlovin.com, joshpuckett.me as portfolio controls)
chapter: Marketing nav constructions: 14 distinct grammars measured from live sites, with specs and rules
pages: n/a (live sites captured 2026-10-09 with Playwright Chromium, 1440x900, dsf 2; top strip at rest, on hover of the first link, and after a 900px scroll)
topic_tags: [nav, header, navigation, capsule, pill, glass, blur, announcement-bar, scroll-state, hover, mono, cta, variety, divergence, measured]
status: studied
---

# Nav grammars: 14 constructions that are not "white pill left, Log in + ink Start free right"

Why this file exists: the engine's heroes converged on one nav (the Kaching/Tideline divided white pill). The founder wants range at the same polish. This file catalogues 14 nav constructions that real premium sites ship, each with measured numbers, a buildable spec that already satisfies the founder's floor, and rules for picking one.

Evidence:
- `knowledge/benchmarks/variety/navs/<site>.png` top strip at rest (2880px wide, dsf 2; 120 to 200px tall so docked navs are not cut), `<site>-hover.png` with the pointer on the first text link, `<site>-scrolled.png` after a 900px wheel scroll.
- `knowledge/benchmarks/variety/navs/measurements.json` raw DOM: every link/button in the top 150px (rect, font, weight, tracking, case, padding, radius, fill, ring, shadow, icon size, colour), the decorated ancestor chain (position, fill, border, radius, shadow, backdrop-filter), any full-width bar above the nav, the hover computed style and the scrolled container.
- `system/variety/navs.html` renders all 14 grammars with role tokens; screenshot `knowledge/benchmarks/variety/navs-specimen.png`.

Numbers are CSS px at 1440 wide. "Link h" is the hit-box height of a text link, "CTA h" the primary nav button height.

## 1. Core ideas

1. **The construction is the decision, not the colour.** 61 measured sites reduce to 14 constructions that differ in *container* (none, full-bleed bar, rail-width capsule, content-hugging island, opaque sheet, colour band), *position* (top 0, inset 8-32px, docked under an announcement), *voice* (sans sentence case, mono caps, serif lowercase) and *what sits on the right* (buttons, proof chips, a search field, a text link). Pick on those four axes and the nav reads as a different brand even with the same links.
2. **Most premium navs are compact; the founder's floor is above the median.** Measured link hit heights across the 47 sites with a clean DOM: median 36 (range 16 basement to 64 supabase/mintlify full-height tabs); 23 of 47 are under 36. Primary CTA heights: median 35-36 (range 25 factory to 52 jitter). Link font median 14-14.5px (12 to 20). The founder's floor (links >= 36 with ~14px side padding, buttons ~40) is a deliberate step above the median; every spec below is already lifted to it. When copying a source, scale its control heights up, not its type.
3. **The scroll state is part of the grammar.** At least 12 sampled sites change on scroll (vercel, paper and tella simply gain a solid fill) and the change is the craft: mymind morphs a 1440x87 bar into a 980x60 capsule (r30, blur 22 + saturate 1.8, top 25); cal and granola go from transparent to a white r16 / full-round capsule; screen.studio goes to #161617 at 80% with saturate 1.8 + blur 20; modal collapses its wordmark to the mark and gains 90% fill + blur 20 + a 5% white hairline; factory hides its links and keeps only logo + actions; warp replaces the whole nav with an accent section index; mercury and clerk let the announcement scroll away while the nav sticks.
4. **Only five hover grammars exist, and each site uses one.** (a) Pill fill: linear rgba(255,255,255,.075) full round, attio grey fill r10, railway #1c1a28 r6, arc ink at 50% r8, oxide grey r1, family off-white r6. (b) Colour shift to the brand accent: supabase green, trigger lime #a8ff53, basement #ff4d00 at opacity .5, browserbase #ff4500 text + #ffeae3 fill. (c) Underline: superhuman, replicate. (d) Ink darken / alpha: cursor to 75%, paper opacity .8, tella .9, mymind blue to black. (e) Invert: sanity's dark bar link goes #ededed fill + ink text. The hover grammar should match the CTA radius (pill fill with round CTAs, r2 fill with r2 mono buttons).
5. **Proof and utility have moved into the nav.** GitHub stars (supabase 111.2K, neon 23.2k, trigger 16.5k, convex 21,446 stars + npm 2M weekly as two-line 44px chips), a live "Online" dot (basement), search fields with keycaps (bun 416x36 with "/", replicate with "cmd+k", clay "⌘ K"), and superscript counts (basement Showcase (26), Blog (29)). These are real, live values; the engine may only use them with real data (principle 4: never invent proof).
6. **Announcement relation is a sub-grammar.** Above the nav at 32-54px: fal 32, neon 36, modal 36, bun 38, ramp 40, replicate 40, planetscale 40, warp 42, convex 44, clay 44, attio 48, pylon 48, elevenlabs 48, mercury 49, tailscale 54 (with utility links). Below the nav: vercel (row at y 80 inside the header) and superhuman (lavender strip under the bar). Inside the nav container: clay (announcement and nav share one inset sheet).
7. **Not found on premium SaaS homepages:** a left vertical rail nav, a docked bottom bar and a nav drawn as browser chrome. The closest are portfolio/editorial sites (devouringdetails' left tick index, thebrowser.company's bottom index row) and product-as-homepage (tldraw's bottom toolbar, posthog's OS desktop with a 40px menubar). Treat these as art-direction moves, not SaaS nav defaults.

## 2. The 14 grammars

Each spec is the engine version (founder floor applied, roles not hex). Source numbers are as measured.

### G01 Hairline glass bar
**Measured.** linear: fixed header 1440x73, background transparent, 1px bottom hairline rgba(255,255,255,.08), backdrop blur 20; links 13px/400 Inter #8a8f98, 32px tall, pad 0 12, r 9999; hover fill rgba(255,255,255,.075) + text #f3f4f5; Sign up 32px pill #e5e5e6, 13px/510. supabase: 65px, blur 4, hairline 8% ink, links 14/500 full-height tabs, hover to brand green. modal (scrolled): 65px, 90% fill + blur 20, 1px rgba(255,255,255,.05). resend 58px transparent, links #a1a4a5 14/500.
**Personality / when.** Engineering-grade, quiet, dark-first. The hero field (shader, product frame, gradient) runs under the bar. Use when the hero is dark or full-bleed and the product frame starts high.
**Spec.** Full-bleed bar 64px, content inside the 1200 rail. Fill: canvas at 55-90% + `backdrop-filter: blur(20px)`; 1px bottom `--line` (8% on dark, 6-8% ink on light). Brand left; links right-aligned next to actions, 13-14px/400-500 `--sub`, 36px tall, 14px side padding, full-round hover pill; a 1x18 `--line` divider; Log in as a link; primary 36-40px full-round, light fill on dark.
**States.** Hover: pill fill `--hover` (7.5% white / 5% ink), text to `--ink`, 220ms. Active page: same fill, persistent. Scroll: no change (it is already glass); optionally fade the hairline in from 0 after 8px.
**Light / dark.** Dark is native. Light: canvas 80% + blur 16, hairline 8% ink, ink text links at `--sub`.
**Avoid.** A solid fill (neon is the exception) or a visible shadow; the bar should disappear into the field.

### G02 Floating rail capsule
**Measured.** raycast: 1204x76 at top 16, r16, transparent fill with 1px rgba(255,255,255,.06) border, inset 0 1px 1px rgba(255,255,255,.15) highlight, blur 5; links 14/500 +0.2px #9c9c9d, 41px tall, pad 12 8; Download 36px, r8, #e6e6e6 with a 2px black ring + 14px white glow. spline: 992x56 at top 32, r56, black 80% + blur 24, links 16px 70% white, Get Started 40px r50 20% white. screen.studio: 1024x52 at top 10, r28.8. granola: 1217x56 at top 8, full round.
**Personality / when.** Object-like, premium hardware feel. Use over atmospheric heroes (shader, gradient, photo) where the nav must read as a crafted object.
**Spec.** Capsule = rail width (1200) at top 16, 64px tall, r16 (or full round at <= 56px). Fill 3.5% white + blur 12 on dark; ring `inset 0 0 0 1px` 7% + top highlight `inset 0 1px 0` 12% + drop `0 12px 32px -12px` 60% black. Inner padding 20 left / 12 right. Links centred absolutely, actions right. Primary is a "physical" light button: vertical gradient, 1px dark ring, soft white glow, r10.
**States.** Hover: pill fill 7.5% white, r10. Scroll: keep geometry; raise fill to 6-8% so text stays legible over content.
**Light / dark.** Light: surface at 72% + blur 16, ring 6% ink, drop `0 8px 24px -12px` 18% ink.
**Avoid.** Gaps between capsule edges and content edges that differ from the rail; a capsule wider than the rail.

### G03 Centred island (content-hugging)
**Measured.** lightfield: one capsule about 615x36 centred at top 16 (pixel-read; drawn by a pseudo-element), tinted fill one step darker than the canvas, no border; brand 89x16 + links 12px/400 untitledSans at 60% black, a hairline divider, Log in, Request demo 28px r6 near-black. diabrowser: 307x52 at top 28, r16, #f8f8f8, 1px 8% ink border, `0 2px 8px` 6% shadow, blur 12, mark + three 16px links, no CTA at all.
**Personality / when.** Calm, editorial, product-led brands with few pages (4-5 links). Leaves the full width to the hero. Strong with centred heroes.
**Spec.** Island hugs content, centred, top 20, 52px tall, padding 6/6/6/18, r16. Fill `--canvas` darkened ~4% (or `--surface` with 1px `--line` ring on busy art). Links 14px `--sub`, 36px, pad 0 12; divider 1x18; primary 40px r11 ink. Gap 8.
**States.** Hover: fill `--hover` r10 inside the island. Scroll: add `0 8px 24px -12px` shadow and 80% surface + blur 12 once content passes under it.
**Light / dark.** Dark: island = canvas lightened 4% with 6% white ring.
**Avoid.** More than 5 links (the island stops reading as one object); 12px text at 28px height as measured: lift to 14px/36px.

### G04 Scroll-morph bar to capsule
**Measured.** mymind: header 1440x87 transparent at rest, links 20px serif; scrolled: 980x60 at top 25, r30, blur 22 + saturate 1.8, white. cal: 1152x57 transparent at rest, scrolled white r16. granola: 1217x56 full round, transparent at rest, scrolled #ffffff + 1px #d5d5d2. screen.studio: 1024x52 r28.8, transparent at rest, scrolled #161617 at 80% + saturate 1.8 + blur 20.
**Personality / when.** Feels expensive because it moves. Use when the hero art needs an unobstructed top edge at rest, and when the page is long.
**Spec.** At rest: transparent bar, rail width, 52-56px, no fill. After 24-80px scroll: width animates to 980 (or rail minus 2x110), top to 12-24, r = height/2, fill `--surface` 78% + `blur(22px) saturate(1.8)`, ring 6% ink, drop `0 8px 24px -10px` 18% ink. Same links, same order, same x-centre.
**States.** Morph 320-420ms `cubic-bezier(.23,1,.32,1)` on width, top, radius, background; links do not reflow (keep them centred absolutely). Hover: pill fill inside the capsule. Reduced motion: switch states without the tween.
**Light / dark.** Dark: scrolled fill = surface 80% (screen.studio's #161617/.8) with 7% white ring.
**Avoid.** Changing link order or font size between states; height jumps greater than ~30% (mymind 87 to 60 is the upper bound).

### G05 Mono operator bar
**Measured.** oxide: sticky 60px, 1px bottom oklch(.316) line; links 12px GT America Mono uppercase +0.64px (0.053em), 32px, pad 8 12, r1, chevron 12px; hover fill oklch(.247) + text oklch(.9); TRY NOW outlined r2, CONTACT SALES accent-tinted fill oklch(.24 .07 184) with accent text oklch(.77 .19 164). sanity: IBM Plex Mono 13px uppercase, 35px, pad 4 12, full round, GET STARTED orange fill + ASK AGENT orange outline. warp: azeretSemiMono 12px/600 uppercase +0.6px, r4, BOOK A DEMO lime #eef17c. tailscale strip: 12px mono uppercase +0.6px at 70% white. factory: LOG IN / SIGN UP and CONTACT SALES as r3 mono-style buttons.
**Personality / when.** Infrastructure, devtools, hardware, security. Signals precision and seriousness. Pairs with sharp radii and grid textures.
**Spec.** Full-bleed 60px bar, 1px bottom `--line`. One mono family for links and buttons: 12px/400, uppercase, +0.06em. Links 36px, pad 0 14, r2, 12px chevrons 5px after the label. Actions: secondary outlined (1px `--line`) and primary tinted (accent mixed 16% into the canvas, accent text) at 36px, r2. Brand may be set in the mono with an accent colour.
**States.** Hover: fill one step up from canvas (`--surface`), text to `--ink`; no colour shift. Scroll: unchanged (sticky).
**Light / dark.** Dark is native. Light (warp): canvas bar, ink text, accent-fill primary (lime/yellow on ink text).
**Avoid.** Mixing a rounded sans CTA into a mono bar; tracking below +0.04em on caps.

### G06 Utility strip + main bar (two tier)
**Measured.** tailscale: 54px dark strip (#2e2d2d) with the announcement left and BLOG / DOCS / DOWNLOAD / CONTACT SALES right (12px/500 mono caps +0.6px, 70% white, 40px targets), then the main bar: 14px/500 links 41px tall, pad 10 12, r8, chevrons as "+", primary 36px r8 ink. attio: 48px black announcement + 68px main; links 15/500, 36px, r10, hover grey fill; Sign in 36px r10 with 1px ring, Start for free 36px r10 ink. vercel puts the announcement row *below* the nav inside the 64px header's extension (y 80).
**Personality / when.** Large product surface with secondary destinations (docs, download, status, contact) that should not compete with the main menu. Enterprise-credible.
**Spec.** Strip 36px, `--ink` fill, mono 11px caps +0.06em at 72% canvas; 36px link targets. Main bar 68px on `--surface`, 1px bottom `--line`; brand + 4-5 menu links on the left (gap 28 between brand and links), Log in + primary right. Primary r8 at 40px.
**States.** Strip scrolls away; the main bar sticks at top 0. Hover main links: fill `--hover` r10.
**Light / dark.** Dark: strip one step darker than the canvas, main bar = canvas + hairline.
**Avoid.** Duplicating any link between strip and main bar.

### G07 Hanging sheet (opaque inset card)
**Measured.** clay: one sheet inset 36px each side (1368 wide) hanging from top 0: a 44px aubergine announcement + 58px white nav, rounded bottom corners, art visible on both sides; links 16px/400 Roobert, 42px tall, pad 10 8; ⌘ K keycaps, Get a demo 39px r12 #f3f2ed, Start free trial 39px r12 black. pylon: 48px announcement, then a black 1392x70 slab inset 24px, r8, over a blue motion-blur hero; links 14px/300 white, 62px tall; Book a demo 40px r4 with a 1px white ring. posthog: 1424x40 menubar inset 8, r4, 50% cream + blur 64.
**Personality / when.** Brand-forward, confident, works over loud hero art (gradient, photo, 3D) because the sheet is opaque. Distinct from G02: solid, attached to the top edge, often carries the announcement.
**Spec.** Sheet = rail width at top 0, `--surface` opaque, radius 0 0 16 16, drop `0 16px 40px -18px` 45% of the art's dark tone. Optional 40px announcement row inside it in a deep brand tone. Nav row 64px, padding 0 12 0 24; links 14-15px ink; secondary soft-fill button + ink primary, both 40px r12.
**States.** Scroll: sheet sticks; the announcement row collapses (height 40 to 0, 260ms) so the sheet becomes a 64px tab. Hover: fill `--hover` r10.
**Light / dark.** Dark sheet over light art also works (pylon: black slab on blue).
**Avoid.** Glass on the sheet (that is G02); shadows above the sheet.

### G08 Proof-chip nav
**Measured.** convex: 80px dark-warm header, links 16/500 white with 48px targets, then two 44px full-round chips (5% white) holding a 24px logo icon and two lines ("npm / 2M weekly", "GitHub / 21,446 stars"), Log in as a 44px chip. neon: Discord + "23.2k" GitHub icon-labels then Log in (36px outlined pill) + Sign up (36px white pill). supabase: "111.2K" GitHub 26px + Sign in + Start your project (26px r8 green). trigger: Discord icon + "Star 16.5k" + Login + lime Get started.
**Personality / when.** Open-source, developer and infra products whose strongest proof is adoption. Only with live numbers from a real API (stars, downloads, uptime).
**Spec.** 76px bar. Right side: max two chips (status and one adoption metric), 44px, full round, 6% `--ink` fill + 5% ring, 22px icon, two lines (13px/500 label, 11px tabular-nums value at `--sub`), then Log in link, then primary 40px full round. A status chip uses a 7px dot with a 3px 18% halo.
**States.** Chips hover: fill to 10%. Values update without layout shift (tabular nums, fixed min-width).
**Light / dark.** Light: chips `--surface` with 1px `--line`.
**Avoid.** Static or invented numbers (principle 4), more than two chips, chips taller than the primary.

### G09 Command-search nav
**Measured.** bun: 65px sticky white header under a 38px black announcement; links 14.5px/500, 34px, pad 6 12, full round; a 416x36 search button (1px #e2e2e2, "Search docs, APIs, guides…" + "/" keycap); GitHub + Discord 36px icon buttons; Install 36px square ink. replicate: search field directly after the logo ("Search 'best image models'…" + cmd+k keycap), links to the right. clay: ⌘ K keycaps before Log in.
**Personality / when.** Docs-heavy and catalog products (APIs, models, components) where search is the main task.
**Spec.** 68px bar on `--surface` with 1px bottom `--line`. Brand, 4 links, then a 400x40 search button (r10, 1px `--line` ring, canvas fill, 16px magnifier, placeholder at `--sub`, two 20px keycaps right). Right: 40px icon buttons, then primary 40px r10.
**States.** Focus/⌘K opens a command palette (dialog) rather than typing inline. Hover field: ring to 16%.
**Light / dark.** Dark: field = surface, ring 8% white, keycaps 12% white.
**Avoid.** A fake search that does nothing; a search field and a primary CTA of the same visual weight.

### G10 Section index with keycaps (scroll swap)
**Measured.** warp (after the hero): the main nav is replaced by a fixed 64px solid #2a1eff band; items "[C] Configuration", "[S] SDLC", "[Q] Quality loop"… at 13px/500 azeretSemiMono white; keycaps are 25x20 boxes, 9px mono, 12% white fill, 1px 40% white border (2px bottom), r3; GET STARTED 32px white r4 with accent text. zed ships keycap hints inside buttons ("Download now D", search "⌘ O P"); basement shows "Press [/]".
**Personality / when.** Long single-page product stories, tool-for-pros brands, keyboard-first products. The keycaps double as real shortcuts.
**Spec.** After the hero (scroll past ~1 viewport), cross-fade the main nav out and a 64px accent band in. Items: 20px keycap + 13px mono label, gap 8, 14px between items; active item gets a 2px `--accent-ink` underline at the bar's bottom. Primary 36px r4, inverted. Shortcuts actually scroll to the section.
**States.** Active section tracked by IntersectionObserver; underline slides with a shared layout animation. Esc or scroll to top restores the main nav.
**Light / dark.** Works as a solid accent band on either canvas; on dark, a near-black band with accent keycaps.
**Avoid.** Keycaps that are not wired; using it as the first-load nav (it is a second state).

### G11 Micro strip with counts and status
**Measured.** basement: fixed full-bleed 36px transparent bar over dark art, wordmark 107x15 at x 16; links 12px/600 Geist #e6e6e6 centred, no padding; superscript counts "(26)", "(29)" at 9px/600 #757575; right: "● Online" (orange dot) + "Press [/]" + a sound toggle + Contact Us; hover = colour to #ff4d00 at opacity .5. darkroom: a 22px mono caps strip with red text on maroon fills.
**Personality / when.** Studio, agency or a confident brand that wants the hero to own the screen. Smallest visual footprint of any grammar.
**Spec (lifted).** Full-bleed 44px, transparent, 24px edge padding (deliberately outside the rail). Wordmark 20px/700. Links 12px/600 centred, but each a 36px hit target with 14px padding; counts as 9px `--sub` superscript. Right: status (6px accent dot + 3px halo, 12px/600 label, optional 10px mono shortcut hint) and one text action.
**States.** Hover: colour only, to the accent; no fill. Scroll: stays transparent; add a 4% blur only if text crosses content.
**Light / dark.** Light: ink links on canvas, accent dot unchanged.
**Avoid.** Status text that is decorative; counts that are not real.

### G12 Centred wordmark split
**Measured.** cosmos: 92px header; mark at x 32 then links left (Explore, Sequence, Shop at 15px/500 grey, -0.28px); the COSMOS wordmark centred (665-765); Log in + Sign up right as 48px full-round pills, pad 16 24, black primary. teenage engineering takes the same split to an index of big tiles.
**Personality / when.** Consumer, fashion-adjacent, creative tools, brands whose name is the hero. Symmetric, gallery-like.
**Spec.** 92px bar on the rail. Left: mark (24px) + 3-4 links 15px `--sub`. Centre: wordmark 22px, absolutely centred on the page axis. Right: Log in link + primary 44px full round, pad 0 20, 15px.
**States.** Hover: fill `--hover` full round, text to `--ink`. Scroll: collapse to 64px; wordmark stays centred.
**Light / dark.** Dark: wordmark in `--ink`, pills inverted.
**Avoid.** A left-aligned hero under it (the centred wordmark sets a symmetric axis); more than 4 left links.

### G13 Brand-colour band
**Measured.** arc: fixed 96px band in #3139fb with a scalloped bottom edge over a cream page; mark 32px; links 14px/500 white, 36px, pad 8 10, r8; hover fill #170394 at 50%; no CTA in the nav. mercury (scrolled): solid #171721 + blur 10 at 72px. planetscale: a 40px #fbca00 announcement band above a mono main nav.
**Personality / when.** Consumer-friendly, playful, opinionated brands that own a colour. Strongest when the brand colour is used nowhere else at that saturation.
**Spec.** Full-bleed band 92px (content 92 + a 8px decorative edge: scallop via radial-gradient mask, a hairline or a 2px darker rule), fill `--accent`. Brand and links white (`--accent-ink`), 14px/500, hover = 45% darker accent, r8. Primary: white button with accent text, 40px r12, soft shadow tinted from the accent.
**States.** Scroll: band height to 64 and the edge decoration stays. Hover: tinted fill only.
**Light / dark.** On dark pages use the accent band as the only colour in the fold.
**Avoid.** Accent band + accent CTA in the hero (two equal loud fields); low-contrast accents (white text needs >= 4.5:1 on the band).

### G14 Text-only editorial
**Measured.** mymind: 87px transparent header; wordmark 110x23; links "What / Why / How" in a 20px serif (Louize) at #1573dd, each preceded by a coloured dot; "Log in" also with a dot; Sign up as an orange pill (scrolled into a capsule, see G04). paper.design: 61px fixed; links lowercase 18px/400 Matter +0.18px, no button anywhere, "sign up" as a text link; hover opacity .8. interfacecraft: mark at top-left + one 32px "Login" chip.
**Personality / when.** Calm, literary, tools for thought, design tools. Says "we do not need to shout". Use with serif or humanist headlines.
**Spec.** 88px, transparent. Wordmark left (20px, weight 500). 3-4 links centred, 20px serif (or 18px lowercase sans), each a 36px target with a 6px dot in a distinct palette colour 8px before the label. Right: "log in" text + accent text link "sign up →". No filled buttons; the hero CTA carries the weight.
**States.** Hover: 1px underline, 5px offset. Active: dot grows to 8px. Scroll: optional morph to a G04 capsule.
**Light / dark.** Dark: paper-black canvas, off-white links, dots keep their hues.
**Avoid.** Using it on sales-led products that need a persistent "Book a demo".

### Variants noted, not promoted
- **Centred cluster, no container** (jitter): logo + 4 links + Log in + a 52px pill all centred as one group (290-1150), links 16px/600 with 20px padding. A quieter G03 without the island.
- **Mega-index header** (teenage engineering): 95px of icon tiles each with three 16px weight-100 sub-links. Editorial, not SaaS.
- **OS menubar** (posthog): 40px menubar inset 8, r4, 50% + blur 64, 13px links, desktop icons below. Metaphor sites only.

## 3. Rules

- **RULE** Choose the nav grammar on four axes before building (container, position, voice, right-hand content) and write it in DIRECTION.md as `nav: G0x <name>`; the default divided white pill counts as its own grammar and may not be used twice in a row.
  **Why** 61 measured sites resolve into 14 constructions that differ on those axes, and the engine's last builds reused one (white pill + Log in + ink "Start free"); the founder asked for range at the same polish (founder-taste "Range is mandatory", Vigil round 1).
  **Applies to** marketing nav. **Check** DIRECTION.md names a grammar id; it differs from the previous accepted build's grammar in container or voice. **Source** all 61 measured sites; founder-taste.md

- **RULE** Copy a source's construction, not its control sizes: lift every grammar to the founder floor (link hit box >= 36px with 12-14px side padding, buttons 40px, wordmark >= 20px) while keeping the source's type size and voice.
  **Why** Measured link hit heights have a median of 36 with 23 of 47 sites below it (vercel 32, linear 32, lightfield 28, posthog 28, jitter 24, mymind 24, neon 23, fal 23, basement 16); primary CTAs median 35-36 (factory 25, supabase 26, cursor 27, lightfield 28). The founder called 32px-class nav controls "cramped" (Kestrel round 1).
  **Applies to** all grammars. **Check** every nav link getBoundingClientRect().height >= 36; nav buttons >= 40 (chips may be 44); wordmark font-size or SVG height >= 20. **Source** measurements.json; founder-taste.md

- **RULE** A floating nav is either rail width (aligned to the content edges, 990 to 1220px) or content-hugging and centred (300 to 620px); never an arbitrary width in between, and its top offset is 8 to 32px.
  **Why** Rail-width capsules: raycast 1204 at top 16, granola 1217 at 8, cal 1152 at 8, screen.studio 1024 at 10, spline 992 at 32, mymind 980 at 25. Hugging islands: diabrowser 307 at 28, lightfield ~615 at 16. No measured floating nav sits between 620 and 980.
  **Applies to** G02, G03, G04. **Check** capsule width in [990, 1220] with left edge == content left edge, or width <= 620 with centre == viewport centre ±1px; top in [8, 32]. **Source** raycast, granola, cal, screen.studio, spline, mymind, diabrowser, lightfield

- **RULE** Radius follows height: full round (r = h/2) at 56px or less, 16px for taller capsules; the controls inside step down by the capsule padding (capsule r16 with 6px padding means inner controls r10-12).
  **Why** Full round at 52-60: spline 56/r56, mymind 60/r30, screen.studio 52/r28.8, granola 56/full. r16 at 52-76: raycast 76/r16, diabrowser 52/r16, cal 57/r16. Inner controls: raycast r16 shell, r8 Download; lightfield shell to r6 button.
  **Applies to** G02, G03, G04, G07. **Check** capsule h <= 56 implies r >= h/2 - 1; inner control r <= capsule r - padding + 2. **Source** spline, mymind, screen.studio, granola, raycast, diabrowser, cal, lightfield

- **RULE** On a nav that floats over moving or busy content, use fill alpha 55-90% plus backdrop blur 12-24px (saturate 1.8 for light glass); never a fully transparent fill once content scrolls under it.
  **Why** linear 0% fill at rest but blur 20 over a static field; scrolled glass measures modal 90% + blur 20, screen.studio 80% + saturate 1.8 + blur 20, spline 80% + blur 24, mymind blur 22 + saturate 1.8, mercury solid + blur 10, ramp 50% white; diabrowser blur 12 on a solid fill.
  **Applies to** G01, G02, G03, G04. **Check** after a 900px scroll the nav container has background alpha >= 0.55 or backdrop-filter blur >= 12px. **Source** modal, screen.studio, spline, mymind, mercury, ramp, linear

- **RULE** Pick one hover grammar per nav (pill fill, accent colour shift, underline, ink alpha, invert) and match it to the CTA shape: fill hovers use the CTA's radius family, colour-shift hovers go with flat or mono navs.
  **Why** Every measured site uses exactly one: fills (linear 7.5% white full round with round CTAs; oxide r1 with r2 buttons; attio r10 with r10 buttons; arc r8), colour shifts (supabase green, trigger lime, basement #ff4d00, browserbase #ff4500), underline (superhuman, replicate), alpha (cursor 75%, paper .8, tella .9).
  **Applies to** marketing nav. **Check** all nav links share one hover rule; for fill hovers, |link hover radius - CTA radius| <= 4px or both full round. **Source** linear, oxide, attio, arc, supabase, trigger, basement, superhuman, cursor

- **RULE** Mono caps nav voice means 11-13px, uppercase, +0.05 to +0.06em tracking, one mono family for links and buttons, radii 1-4px (or full round, never 6-12).
  **Why** oxide 12px +0.64px (0.053em) r1-2; warp 12px/600 +0.6px (0.05em) r4; tailscale strip 12px +0.6px; sanity 13px mono caps but full-round pills; darkroom 14px caps r0. None mixes a mono link row with a rounded sans button.
  **Applies to** G05, G06 strip, G10. **Check** text-transform uppercase implies letter-spacing/font-size in [0.04, 0.08] and button radius <= 4 or >= h/2. **Source** oxide, warp, tailscale, sanity, darkroom

- **RULE** Put at most two proof items in a nav (stars, downloads, status) and only from a live source; size them to the action height and set numbers in tabular figures.
  **Why** convex uses two 44px two-line chips (npm 2M weekly, GitHub 21,446 stars) beside 44px Log in; neon 23.2k + Discord; supabase 111.2K; trigger 16.5k; none shows more than two. The engine's principle 4 forbids invented proof.
  **Applies to** G08, G11. **Check** <= 2 proof elements in the nav; each value is fetched (no hard-coded count) or labelled sample in a specimen; font-variant-numeric includes tabular-nums. **Source** convex, neon, supabase, trigger, basement

- **RULE** An announcement bar sits above the nav at 36-48px, uses a different fill from the nav, scrolls away while the nav sticks, and is dismissible; put it below the nav or inside the nav sheet only when the nav is a light flat bar (vercel, superhuman) or a hanging sheet (clay).
  **Why** Above-nav heights: neon 36, modal 36, bun 38, ramp 40, replicate 40, planetscale 40, warp 42, convex 44, clay 44, attio 48, pylon 48, elevenlabs 48, mercury 49 (outliers fal 32, tailscale 54 with links). Mercury, clerk and modal let the bar scroll away; attio, ramp, warp, convex, fal and pylon show a dismiss button.
  **Applies to** marketing nav with news. **Check** bar height in [36, 48]; fill differs from the nav fill; after scroll the bar is off-screen and the nav top == 0 (or its float offset). **Source** neon, modal, bun, ramp, warp, convex, attio, mercury, clerk, vercel, superhuman, clay

- **RULE** A nav that changes on scroll changes container properties only (fill, ring, blur, width, radius, top offset; at most one content change such as wordmark to mark or dropping secondary links), in 300-420ms with an out-expo curve, and keeps link order and type size.
  **Why** mymind (width 1440 to 980, r30, blur), cal and granola (fill + ring), screen.studio (fill + blur), modal (fill + hairline, wordmark to mark), factory (drops links, keeps actions), clerk/mercury (announcement leaves). None resizes link type or reorders items.
  **Applies to** G04 and any sticky nav. **Check** link font-size and DOM order identical at scroll 0 and 900; transition duration in [300, 420]ms; prefers-reduced-motion skips the tween. **Source** mymind, cal, granola, screen.studio, modal, factory, clerk, mercury

- **RULE** Centre the links absolutely on the page axis (not "whatever is left between brand and actions") whenever the nav or the hero is symmetric.
  **Why** raycast, spline, cursor, resend, mintlify, browserbase, tella, superlist, screen.studio and cosmos centre the link group (or wordmark) on x=720 independent of brand and action widths; flex `space-between` with unequal ends drifts the group by half the width difference (e.g. a 167px wordmark vs a 240px action group shifts the links 36px).
  **Applies to** G02, G04, G11, G12, G14, centred heroes. **Check** link group centre x within 2px of 720 at 1440. **Source** raycast, spline, cursor, resend, mintlify, tella, cosmos

## 4. Measured table (selection)

| site | grammar | container (w x h, top, radius) | fill / ring / blur | link px/wt, h, pad | primary h / r | announcement |
|---|---|---|---|---|---|---|
| linear | G01 | 1440x73, 0 | transparent, 1px 8% white bottom, blur 20 | 13/400, 32, 0 12 | 32 / full | none |
| supabase | G01 | 1440x65, 0 | transparent, 8% ink bottom, blur 4 | 14/500, 64 tabs | 26 / 8 | none |
| raycast | G02 | 1204x76, 16, r16 | 6% white border, inset 15% highlight, blur 5 | 14/500 +0.2, 41, 12 8 | 36 / 8 | none |
| spline | G02 | 992x56, 32, r56 | black 80%, blur 24 | 16/400, 38 | 40 / 50 | none |
| screen.studio | G02/G04 | 1024x52, 10, r28.8 | scrolled #161617 80%, sat 1.8 blur 20 | 14/500, 36, 6 10 | 32 / 9.6 | none |
| lightfield | G03 | ~615x36, 16 (pixel-read) | tinted fill, no ring | 12/400, 28 | 28 / 6 | none |
| diabrowser | G03 | 307x52, 28, r16 | #f8f8f8, 8% ring, 0 2 8 6%, blur 12 | 16/400 | none | none |
| mymind | G04/G14 | 1440x87 then 980x60, 25, r30 | blur 22 sat 1.8 | 20 serif, 24 | pill | none |
| granola | G04 | 1217x56, 8, full | scrolled white + 1px #d5d5d2 | 14/400 +0.14, 38, 6 12 | 40 / full | none |
| oxide | G05 | 1440x60, sticky | 1px bottom line | 12 mono caps +0.053em, 32, 8 12, r1 | 32 / 2 tinted | none |
| warp | G05/G10 | 1440x64 | scrolled: solid #2a1eff | 12/600 mono caps; index 13 mono + 25x20 keycaps | 32 / 4 | 42 dark |
| tailscale | G06 | 54 strip + 75 main | strip #2e2d2d | strip 12 mono caps; main 14/500, 41, 10 12, r8 | 36 / 8 | in strip |
| attio | G06 | 48 + 68 | 95% white, 1px bottom | 15/500, 36, r10 | 36 / 10 | 48 black |
| clay | G07 | 1368x(44+58), 0, bottom-rounded | white sheet over art | 16/400, 42 | 39 / 12 | 44 inside sheet |
| pylon | G07 | 1392x70, 72, r8 | solid black | 14/300, 62 | 40 / 4 ring | 48 |
| convex | G08 | 1440x80 | dark warm | 16/500, 48 | chips 44 / full | 44 |
| bun | G09 | 1425x65, sticky | white, 1px bottom | 14.5/500, 34, full | 36 / 0 | 38 black |
| basement | G11 | 1440x36, fixed | transparent | 12/600, 16 (no pad), counts 9px | text | none |
| cosmos | G12 | 1429x92 | transparent | 15/500 -0.28 | 48 / full | none |
| arc | G13 | 1440x96, fixed | #3139fb band, scalloped | 14/500 -0.28, 36, 8 10, r8 | none | none |
| paper | G14 | 1425x61, fixed | transparent | 18/400 lowercase | text link | none |

## 5. What could not be measured

- lovable.dev, openai.com, perplexity.ai, midjourney.com and x.ai served bot challenges or a block page; they were not bypassed and are not in the data.
- zed.dev served the measurer a different page ("Zed Industries"); its keycap-in-button detail is read from a fold screenshot, not the DOM.
- cal.com, rive.app, framer.com and superlist.com report fallback styles for their nav items in measurements.json (`sans-serif`, 12px, #0000ee), most likely a hidden duplicate or not-yet-hydrated nav; use their screenshots, not those rows.
- lightfield's capsule is painted by a pseudo-element; its size and radius are read from pixels (±2px).
- Hover screenshots show only CSS hover; menus that open on hover (framer, stripe) are captured open in the scrolled strip because the pointer was still near the nav.
- Left rail, bottom dock and browser-chrome navs: no premium SaaS homepage using one was found in this sample.
