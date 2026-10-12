# X design posts: benchmark credits

Study evidence only. Every post shown here belongs to its author (handle in the table). The images are screenshots of X's **public embed page** (`https://platform.twitter.com/embed/Tweet.html?id=<id>`, light theme, `dnt=true`), the same view any website that embeds the post shows. No login, no account, nothing liked, followed, posted or submitted. Never copy, trace, repost or present any of this work as engine or Larpo work. Notes: `knowledge/web/x-design-posts.md`; formats: `system/variety/x-post-formats.json`.

## How it was captured (2026-10-12)

- **Timelines** (`data/<handle>.json`, 29 accounts, 1,161 original posts plus replies/reposts): `https://api.fxtwitter.com/2/profile/<handle>/statuses` (the public FixTweet API, the same mirror earlier studies in this repo used for @_heyrico and @marcelkargul), up to 3-5 pages of 20 per account, slimmed to text, timestamps, public counts (likes, reposts, replies, quotes, bookmarks, views) and media type/size/duration. `data/_summary.json` (per-account stats) and `data/_captions.json` (caption-pattern and format engagement, normalised to each account's median likes) are derived. Scripts: `scripts/harvest.mjs`, `analyze.mjs`, `captions.mjs`, `embed.mjs`.
- **Embeds**: Playwright Chromium (repo `node_modules`), viewport 560x1100, DPR 2; the `<article>` element is screenshotted after network idle + 2.5 s. Video posts show X's play button and "Watch on X" chip over the poster frame (videos do not autoplay in the embed). `embed-measure.json` holds the rendered media tile boxes (CSS px; the media column is 514 px wide), which is how the 2/3/4-image crops in the note were measured.
- Counts in the table are likes / views / bookmarks at capture time (views are 0 for posts older than X's view counter).
- Accounts whose timeline returned 404 through the mirror were dropped (anthonyhobday, 1Aakib, aaroniker, mikelikesdesign, olivierlarose, MalewiczHype, jordanphughes, alignui, 10x_design, Ahmedcreatives, imlucasfields); `heyrico` (no underscore) is a different person and was discarded.

## Screenshots

| File | Author | Post URL | Uploaded media (type, px, duration) | Rendered tile(s) in embed (CSS px) | Likes / views / bookmarks |
|---|---|---|---|---|---|
| `flohoeller-video-component-context-window.png` | @flohoeller | https://x.com/flohoeller/status/2109572824314876115 | video 1714x1172 20.3s | 514x351 | 127 / 2707 / 70 |
| `flohoeller-2up-7x8-chatbox.png` | @flohoeller | https://x.com/flohoeller/status/2100478630375628922 | photo 1760x1996, photo 1760x1996 | 256x289 256x289 | 367 / 31754 / 233 |
| `flohoeller-3up-7x8-recent-product.png` | @flohoeller | https://x.com/flohoeller/status/2095554943218229439 | photo 1760x1996, photo 1760x1996, photo 1760x1996 | 256x289 256x144 256x144 | 219 / 8602 / 130 |
| `flohoeller-4up-7x8-settings.png` | @flohoeller | https://x.com/flohoeller/status/2105700142188007604 | photo 1760x1996, photo 1760x1996, photo 1760x1996, photo 1760x1996 | 256x144 256x144 256x144 256x144 | 90 / 4318 / 79 |
| `flohoeller-4up-wide-web-explorations.png` | @flohoeller | https://x.com/flohoeller/status/2093699484224037109 | photo 3840x1903, photo 3840x1903, photo 3840x1903, photo 3840x1903 | 256x144 256x144 256x144 256x144 | 116 / 4266 / 44 |
| `marcelkargul-single-designsites.png` | @marcelkargul | https://x.com/marcelkargul/status/2108960108147552273 | photo 1899x1080 | 514x292 | 993 / 45166 / 1703 |
| `marcelkargul-3up-portrait-cleanest.png` | @marcelkargul | https://x.com/marcelkargul/status/2108671403981496458 | photo 1027x2040, photo 1027x2040, photo 1027x2040 | 256x289 256x144 256x144 514x329 | 393 / 20217 / 291 |
| `marcelkargul-2up-type-geist-inter.png` | @marcelkargul | https://x.com/marcelkargul/status/2108967996190244979 | photo 2048x1575, photo 2048x1575 | 256x289 256x289 | 549 / 45978 / 415 |
| `marcelkargul-single-type-argument.png` | @marcelkargul | https://x.com/marcelkargul/status/2109273659038650501 | photo 3244x4096 | 514x612 514x576 | 190 / 8685 / 178 |
| `basit-video-minimal-landing.png` | @basit_designs | https://x.com/basit_designs/status/2108867100395843811 | video 2452x1802 18.3s | 514x378 | 1708 / 40880 / 1368 |
| `basit-video-gradient-phone.png` | @basit_designs | https://x.com/basit_designs/status/2109288607655829623 | video 2940x2160 14.0s | 514x378 | 283 / 8069 / 206 |
| `emilkowalski-video-ai-stress-test.png` | @emilkowalski | https://x.com/emilkowalski/status/2103516287452483885 | video 1726x1590 8.8s | 514x473 | 4096 / 194197 / 2856 |
| `emilkowalski-video-stagger-lesson.png` | @emilkowalski | https://x.com/emilkowalski/status/2104634532154524054 | video 3024x1716 11.0s | 514x292 | 3412 / 124932 / 1896 |
| `jakubkrehel-video-before-after.png` | @jakubkrehel | https://x.com/jakubkrehel/status/2082127924946223448 | video 2424x1604 23.7s | 514x340 | 4517 / 586534 / 5290 |
| `jakubkrehel-video-cheatsheet.png` | @jakubkrehel | https://x.com/jakubkrehel/status/2089009286940639674 | video 2560x1680 7.0s | 514x337 | 1407 / 57867 / 1923 |
| `pacocoursey-video-3x1-exclusion-tabs.png` | @pacocoursey | https://x.com/pacocoursey/status/1522639642155266048 | video 1200x400 10.3s | 514x171 | 1258 /  / 319 |
| `pacocoursey-video-detail-no-caption.png` | @pacocoursey | https://x.com/pacocoursey/status/1630425455235940352 | video 1768x856 24.1s | 514x249 | 2913 / 215227 / 1004 |
| `mrncst-video-tiny-component.png` | @mrncst | https://x.com/mrncst/status/1791467029540573376 | video 3414x2160 6.0s | 514x325 | 1431 / 109054 / 589 |
| `mrncst-image-components-home.png` | @mrncst | https://x.com/mrncst/status/1766117470207647836 | photo 4096x2593 | 514x325 | 1356 / 179461 / 1047 |
| `raunofreiberg-video-debug-ui.png` | @raunofreiberg | https://x.com/raunofreiberg/status/2049592715860447540 | video 2760x1832 12.0s | 514x341 | 1506 / 68389 / 1064 |
| `raunofreiberg-image-arial-poster.png` | @raunofreiberg | https://x.com/raunofreiberg/status/2091189101269569903 | photo 3840x2160 | 514x289 514x289 | 873 / 44309 / 350 |
| `raphaelsalaja-image-skill-file.png` | @raphaelsalaja | https://x.com/raphaelsalaja/status/2033945823973671283 | photo 2400x1260 | 514x270 | 3456 / 225235 / 5889 |
| `gavmn-image-small-icons.png` | @Gavmn | https://x.com/Gavmn/status/1981385435726434494 | photo 4096x2304 | 514x289 | 3798 / 213047 / 116 |
| `gavmn-image-dock-shrink.png` | @Gavmn | https://x.com/Gavmn/status/2082684629832884302 | photo 3840x2160 | 514x289 | 3116 / 149919 / 125 |
| `fonsmans-2up-portrait-bots.png` | @FonsMans | https://x.com/FonsMans/status/2107824471260180607 | photo 2380x3368, photo 2380x3368 | 256x289 256x289 | 1366 / 49103 / 380 |
| `fonsmans-4up-portrait-allin.png` | @FonsMans | https://x.com/FonsMans/status/2108112099105026332 | photo 2380x3368, photo 2380x3368, photo 2380x3368, photo 2380x3368 | 256x144 256x144 256x144 256x144 | 787 / 19915 / 169 |
| `fonsmans-image-pictograms.png` | @FonsMans | https://x.com/FonsMans/status/2107103917167575455 | photo 3000x2000 | 514x343 | 654 / 15720 / 285 |
| `lochieaxon-video-torph.png` | @lochieaxon | https://x.com/lochieaxon/status/2096954781004874150 | video 1920x1080 31.6s | 514x289 | 2714 / 284520 / 2726 |
| `steveschoger-video-dashboard-week2.png` | @steveschoger | https://x.com/steveschoger/status/2024193315365933333 | video 2652x2160 47.0s | 514x419 | 1768 / 166498 / 1619 |
| `mengto-video-hook-caption.png` | @MengTo | https://x.com/MengTo/status/2102760783344189761 | video 2880x2160 59.7s | 514x386 | 6577 / 483253 / 3814 |
| `pixeljanitor-video-square-sidebar.png` | @PixelJanitor | https://x.com/PixelJanitor/status/2082151940478398497 | video 1440x1440 20.6s | 514x514 | 710 / 35159 / 455 |
| `shadcn-image-why-horizontal-tabs.png` | @shadcn | https://x.com/shadcn/status/2104873649702387819 | photo 1083x866 | 514x411 | 3685 / 406039 / 2508 |
| `pablostanley-video-doodle-world.png` | @pablostanley | https://x.com/pablostanley/status/2094797787754082449 | video 3836x2160 89.0s | 514x289 | 1280 / 47596 / 531 |
| `alexbarashkov-video-square-handcrafted.png` | @alex_barashkov | https://x.com/alex_barashkov/status/2107487915555393805 | video 2150x2150 21.0s | 514x514 | 414 / 11417 / 185 |
| `benjitaylor-video-x-numbers.png` | @benjitaylor | https://x.com/benjitaylor/status/2102443951898992825 | video 1920x1080 31.3s | 514x289 | 5045 / 762453 / 1006 |
| `uisabor-4up-tall-landing-pages.png` | @uisabor | https://x.com/uisabor/status/2100871031879847970 | photo 3032x4096, photo 3032x4096, photo 3032x4096, photo 3032x4096 | 256x144 256x144 256x144 256x144 | 1182 / 56510 / 958 |
| `uisabor-4up-landing-layout.png` | @uisabor | https://x.com/uisabor/status/2107031704783425765 | photo 3033x4096, photo 3033x4096, photo 3033x4096, photo 3033x4096 | 256x144 256x144 256x144 256x144 | 546 / 21584 / 523 |
| `oguzyagizkara-video-square-shader-workflow.png` | @oguzyagizkara | https://x.com/oguzyagizkara/status/2100171221493027080 | video 1880x1880 15.5s | 514x514 | 1395 / 48210 / 768 |
| `oguzyagizkara-4up-video-product-pages.png` | @oguzyagizkara | https://x.com/oguzyagizkara/status/2091466675681911121 | video 3840x2264 11.6s, video 3840x2160 13.0s, video 3840x2160 9.0s, video 3840x2160 6.6s | 256x144 256x144 256x144 256x144 | 1016 / 32573 / 739 |
| `jh3yy-video-square-css-tip.png` | @jh3yy | https://x.com/jh3yy/status/2108593170569175495 | video 2160x2160 25.6s | 514x514 | 2158 / 52757 / 1620 |
