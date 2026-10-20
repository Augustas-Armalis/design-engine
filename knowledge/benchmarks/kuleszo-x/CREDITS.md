# Kuleszo X study: credits and capture notes

Study evidence only. Every post, image and video frame here belongs to Adrian Kuleszo (@adriankuleszo), his studio DesignMe (@designme, designme.agency) and, for client screens, to the studio's clients (Ballogy, Hint, Quotient, Cluely/Bounty, Seamless.AI, Lightdash, N3XT, Structurely, GrowthSync, Zeal, Key Carbon, RecruitU, 21 Oaks, Kinetiq, Atlas and others). Nothing is to be copied, traced, reposted or presented as engine or Larpo work; client names, logos, photos and illustrations stay theirs. The notes that use this evidence: `knowledge/web/kuleszo-craft.md` (rules AKZ-01..AKZ-30) and `system/variety/kuleszo-tokens.json`.

## How it was captured (2026-10-20)

- **Timeline** (`posts.json`, 288 statuses from 21 Aug to 19 Oct 2026, 286 his own, 230 top-level, 195 with media): `https://api.fxtwitter.com/2/profile/adriankuleszo/statuses`, the public FixTweet API, 16 pages with the returned `cursor.bottom`, de-duplicated by id. No login; nothing liked, followed, replied to or posted. Fields kept: id, url, timestamp, text, likes/reposts/replies/views/bookmarks, reply/quote target, author, media type/size/URL.
- **Media list** (`media-urls.txt`, tab-separated: post index, media index, post id, date, type, WxH, original URL).
- **Images** (`kz-<postIndex>-<n>-<postId>.jpg|png`, 56 files): downloaded with `?name=large` (2048px max) from `pbs.twimg.com`. `<postIndex>` is the index in `posts.json`. Every one was opened and read.
- **Video frames** (`kz-<postIndex>-v<k>-<mediaId>.jpg`, 12 files): Playwright with the system Chrome channel (H.264), the MP4 opened directly, seeked to 25/50/80% of its duration, screenshotted at 1280x800 (player chrome visible at the bottom). Posts 127 (hero animated in Opus 5.5), 52 (workflow builder), 65 (dashboard in motion), 28 (designme testimonial cards). Note the file suffix is the media id, not the post id.
- **Pixel samples** (`measure/pixel-samples.json`): every downloaded image decoded in a canvas: four corners + top-centre (the post canvas colour), the top five 8-level-quantised colours, and the share of chromatic pixels (max-min channel > 40).
- **Live sites** (`measure/<name>.json`, `-fold.png` at 1440x900 DPR 2, `-full.jpg` at DPR 1): Playwright Chrome, getComputedStyle on h1/sub/h2, every filled or bordered control in the first viewport, header links, histograms of radii, shadows, backgrounds, text colours, font tuples, top borders and max-widths across all elements, section paddings, hover diffs (computed style before/after `hover()`), and `document.getAnimations()` at 400ms after network idle. Pages: designme.agency home, about-us, pricing, our-process, projects/ballogy; ballogy.com (Framer, credited to DesignMe in post 214); seamless.ai (redesign credited in post 29). The cookie banner was never clicked; it appears in the DesignMe folds. Full-page captures of DesignMe show blank bands where scroll reveals did not fire; use the JSON, not the full image. `lightdash.json` measured only a client-rendered shell (no h1) and the redesign attribution for the current lightdash.com is unconfirmed: treat it as unattributed. quotientai.co did not resolve and was dropped.

## Images (post index -> what it shows)

| File prefix | Post | Shows |
|---|---|---|
| kz-000-0..3 | 2112291473454780694 "new website project" | music distribution site: photo fan, rack hardware panel UI, isometric line icons in numbered cards, stacked folder-shaped photo cards |
| kz-001-0/1 | 2112521767306850797 | DDEX distribution diagram (dark glass tiles), grain-rainbow hero "Deals" |
| kz-002-0 | 2112234851558736322 | Key Carbon brand explorations: blue pixel-dither imagery, dot globe, compliance cards |
| kz-007-0 | 2112211757967999477 | his motion prototyping tool (timeline, AI director panel) |
| kz-009-0/1 | 2111801608900124962 | DesignMe internal growth dashboard (dark), KPI cells with Previous/Baseline |
| kz-016-0 | 2110808044905046019 | PageSpeed 99/100/100/100 of the new Astro site |
| kz-021-0 | 2110785286120825054 | logo concept page (three layers of meaning, construction grid) |
| kz-025-0 | 2110709807766442275 | Key Carbon site: ocean hero, photo cards, dot globe |
| kz-040-0 | 2109392353589170528 | N3XT testimonials masonry with orange-faded photo cards |
| kz-043-0 | 2109094147189838248 | Radar landing (not shipped): pricing, blue gradient hero, ask box, source chips |
| kz-054-0 | 2108305211538428316 | RecruitU hero exploration on violet with product below |
| kz-063-0 | 2107580426160402816 | PayPal concept app with oversized type behind phones |
| kz-095-0/1 | 2105273986389303696 | Zeal hero explorations: serif centred, serif two-tone with grid lines and brand shape |
| kz-100-0/1 | 2104987094137651238 | dark security site: dot map, logo grid, stat strip, capability switcher |
| kz-129-0 | 2103386528345113052 "Inbox UI" | Structurely inbox, light, bleed crop on grey |
| kz-132-0 | 2103175147188568457 | Structurely dark mode, agent analytics funnel |
| kz-135-0/1 | 2102933553625649479 | Atlas landing (dark, selection-box word, order card, route map) |
| kz-137-0 | 2102812763378810973 "Contacts UI" | contacts table, bulk action bar, context menu |
| kz-143-0/1 | 2101057446718648370 | Quotient hero explorations: perspective app planes, light shaft, glow headline |
| kz-146-0 | 2100849831141048545 | GrowthSync landing: painted sky/hill scene, retro TV/computer, chat chips, stat strip |
| kz-147-0 | 2100759217355509871 | GrowthSync "how it works" three cards on cream |
| kz-159-0 | 2099672054345998506 | Cluely action-button onboarding, three phones |
| kz-161-0 | 2099188868490944545 "Agents" | glossy gradient icon matrix |
| kz-163-0 | 2098947277536784418 | Quotient first site: grey second line, inline object in headline, tabs over product |
| kz-169-0 | 2098313099858305369 | Viakonnect travel landing |
| kz-171-0 | 2098222503118426251 | pricing cards with handwritten annotation |
| kz-172-0 | 2098158327763283994 | model picker dropdown-up component |
| kz-180-0 | 2097860116829864100 | Quotient integrations bento (light) |
| kz-188-0 | 2097497729819984049 | Quotient footer: particle gradient CTA band, giant gradient-filled wordmark |
| kz-196-0/1 | 2097135350187770157 | monochromatic dark bentos (hairline grid vs card version) |
| kz-205-0 | 2096138785251848417 | Ballogy feature grid (dark) |
| kz-208-0 | 2095927392120574288 | Ballogy pricing (dark, teal-lit Pro card) |
| kz-216-0/1 | 2095202621753872452 | Bounty final hero explorations (pill nav, phone/laptop) |
| kz-219-0 | 2095259239602352245 | AI clip editor sheet |
| kz-225-0 | 2094840217643647054 | Cluely paywall explorations |
| kz-249-0 | 2093149107028369549 | Ballogy wireframe -> final |
| kz-251-0 | 2093028278944837741 | Cluely paywall in a Figma canvas |
| kz-257-0 | 2092786687676190927 | GrowthSync results section: illustrated room with window, stats |
| kz-274-0 | 2091997738363941031 | running app widgets (dark) |
| kz-282-0/1 | 2091065350519722163 "First vs final" | 21 Oaks: grotesk version vs serif final |
| kz-283-0 | 2090974747945484603 | dark features bento (AI design tool) |
| kz-284-0 | 2090910572233851346 | Kinetiq pricing (dark indigo) |
| kz-287-0/1 | 2090702970287689846 "New template" | NexaLab template: blue hero with prompt box and phones; light how-it-works |
| kz-028/052/065/127-v0..2 | 28, 52, 65, 127 | frames: designme testimonials, workflow editor, Northline metric tree, isometric building hero animation |
