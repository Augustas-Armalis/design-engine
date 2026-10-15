# x-heroes-2026-10: credits and capture notes

Study evidence only. Every screenshot here shows the work of the designer, studio or company named below. Do not copy, trace, ship or present any of it as engine or Larpo work, and do not reuse their assets (fonts, images, illustrations, logos) in builds. Note: `knowledge/web/hero-craft-study-2026-10.md`.

## How it was captured (2026-10-15)

- Headless Chromium (Playwright from the repo). Viewport 1440x900 at DPR 2. Each page was given 5 s after network idle, then captured as `<slug>-fold.jpg` (JPEG q82).
- Cookie and consent banners were hidden with CSS (`[id*=cookie]`, `[class*=consent]`, OneTrust, Cookiebot, Framer badge). Nothing was accepted, clicked or submitted. Some banners did not match those selectors and still show: aave, brandbird, langdock (its consent overlay also dims the whole fold), ostium, rork, runinfra. Discount those areas when you read colour or quiet-space numbers.
- `measure/<slug>.json` holds computed styles: nav, h1, subtitle, hero buttons (with a hover diff and a press diff), framed boxes, the largest media item, text counts in the fold, font list, radius and shadow histograms, section paddings, and pixel stats (`quietBlockShare` is the share of 16 px blocks whose luminance std is under 4; `saturatedShare` is pixels with HSV saturation over 0.45).
- The press diff was taken with mouse down, then the pointer moved off the element before mouse up, so no link was followed.
- Some heroes were captured mid-animation: graphical (headline chips), hunt (h1 split into per-letter spans, so its line count is wrong), stardust ("Scale" is the first span of the h1), brandbird (letter-by-letter rotator), rork (word rotator). altrina.com now shows an acquisition notice ("Altrina has joined Abridge"), not the Kargul-era hero. breez.ai returned "Access Denied", so it was deleted.

## Sites and attribution

How we know who designed each site is stated per row. "Listed" means the studio shows the client as a case study. The live site may have been revised since, so the grammar is credited to the site, not claimed as the designer's current file.

| Slug | URL | Designer / link | Attribution source |
|---|---|---|---|
| zeroleaks | https://zeroleaks.ai/ | Marcel Kargul / Kargul Studio | kargul.studio/work/zeroleaks |
| runinfra | https://runinfra.ai/ | Kargul Studio | kargul.studio/work/runinfra |
| supermetal | https://supermetal.io/ | Kargul Studio | kargul.studio/work/supermetal |
| hunt | https://hunt.io/ | Kargul Studio | kargul.studio/work/hunt |
| listkit | https://www.listkit.io/ | Kargul Studio | kargul.studio/work/listkit |
| rork | https://rork.com/ | Kargul Studio | kargul.studio/work/rork |
| uplinq | https://www.uplinq.com/ | Kargul Studio | kargul.studio/work/uplinq |
| sideshift | https://sideshift.app/ | Kargul Studio | kargul.studio/work/sideshift |
| ostium | https://www.ostium.com/ (Gateway page) | Kargul Studio | kargul.studio/work/ostium |
| defendlab | https://defendlab.com/ | Kargul Studio | kargul.studio/work/defendlab |
| sftensor | https://sf-tensor.com/ | Kargul Studio | kargul.studio/work/sf-tensor |
| opero | https://opero.so/ | Kargul Studio | kargul.studio/work/opero-labs |
| stardust | https://stardust.gg/ | Kargul Studio | kargul.studio/work/stardust |
| amtrades | https://amtrades.com/ | Kargul Studio | kargul.studio/work/am-trades |
| altrina | https://www.altrina.com/ | Kargul Studio | kargul.studio/work/altrina (site replaced) |
| kargul | https://kargul.studio/ | Kargul Studio's own site | own |
| antimetal | https://antimetal.com/ | Lué Studio (Oğuz Yağız Kara, @oguzyagizkara) | lue.studio/works/antimetal |
| authkit | https://www.authkit.com/ | Lué Studio | lue.studio/works/authkit |
| reflect | https://reflect.app/ | Lué Studio | lue.studio/works/reflect |
| dimension | https://dimension.dev/ | Lué Studio | lue.studio/works/dimension |
| firecrawl | https://www.firecrawl.dev/ | Lué Studio | lue.studio/works/firecrawl |
| lue | https://lue.studio/ | Lué Studio's own site | own |
| twin | https://twin.so/ | Rico (@_heyrico) / Ace Studio | acedesign.io/work/twin (scope may be product UI only) |
| langdock | https://langdock.com/ | Rico / Ace Studio | acedesign.io/work/langdock (scope may be product UI only) |
| blackbox | https://www.blackbox.ai/ | Rico lists @blackboxai as a client | X bio @_heyrico (scope unknown) |
| interfere | https://interfere.com/ | Jakub Krehel (@jakubkrehel), founding design engineer | X bio, jakub.kr |
| interfaces | https://interfaces.dev/ | Jakub Krehel | X bio |
| jakub | https://jakub.kr/ | Jakub Krehel | own |
| emil | https://emilkowal.ski/ | Emil Kowalski (@emilkowalski) | own |
| aiforui | https://aiforui.dev/ | Emil Kowalski | X bio |
| rauno | https://rauno.me/ | Rauno Freiberg (@raunofreiberg) | own |
| devouring | https://devouringdetails.com/ | Rauno Freiberg | X bio |
| paco | https://paco.me/ | Paco Coursey (@pacocoursey) | own |
| uiwiki | https://www.userinterface.wiki/ | Raphael Salaja (@raphaelsalaja) | X bio |
| warp | https://www.warp.dev/ | Warp; Raphael Salaja works there | X bio (employer; individual credit unknown) |
| profound | https://www.tryprofound.com/ | Profound; Mariana Castilho (@mrncst) works there | X bio (employer; individual credit unknown) |
| uilabs | https://www.uilabs.dev/ | Mariana Castilho | own |
| graphical | https://www.graphicalui.com/ | Josh Puckett (@joshpuckett), co-founder | X bio |
| interfacecraft | https://www.interfacecraft.dev/ | Josh Puckett | X bio |
| khagwal | https://khagwal.com/ | Nitish Khagwal (@nitishkmrk) | own |
| uish | https://ui.sh/ | Steve Schoger (@steveschoger) | his posts link ui.sh |
| mymind | https://mymind.com/ | Tobias van Schneider, co-founder | public company info |
| semplice | https://www.semplice.com/ | Tobias van Schneider, co-founder | public company info |
| shiftnudge | https://www.shiftnudge.com/ | MDS (@mds) | X bio |
| hilos | https://hilos.sh/ | Pablo Stanley (@pablostanley) | his posts link hilos.sh |
| brandbird | https://www.brandbird.app/ | Jim Raptis (@d__raptis) | his posts link brandbird.app |
| family | https://family.co/ | Family; lochie (@lochieaxon) was there | X profile (employer; individual credit unknown) |
| aave | https://aave.com/ | Aave; lochie (@lochieaxon) works there | X profile (employer; individual credit unknown) |
| affectui | https://www.affectui.com/ | Flo Hoeller (@flohoeller) | X bio |
| untitledui | https://www.untitledui.com/ | Jordan Hughes (@jordanphughes) | @untitledui bio |

Profiles were read through api.fxtwitter.com on 2026-10-15 (bio, website and follower count only). x.com was not opened.
