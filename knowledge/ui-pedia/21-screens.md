---
source: ui-pedia
chapter: Screens
pages: 525-535
topic_tags: [screens, canvas-size, px-pt-ppi, mobile, desktop, tablet, watch, thumb-reach, ergonomics, navigation]
status: studied
---

# Screens

Chapter of "UI Pedia" (Design Basics). Short, practical: which canvas size to design on, what px/pt/ppi mean, and where thumbs can reach. The size recommendations are from a 2020-2021 stats snapshot, so they are dated (see sections 5 and 7).

## 1. Core ideas

1. Design starts by choosing the screen/canvas, and everything is built from the pixel (p.525).
2. px = smallest unit on a display; pt = a resolution-independent unit; ppi = pixel density (p.526-527). Designers work in pt-like "logical" sizes (e.g. 375 x 812), not device pixels (e.g. 1080 x 2340).
3. Pick the platform first (Android / iOS / desktop), then target the most widely used AND smallest common size for it, so the design still fits larger devices (p.528, p.530).
4. Android baseline 360x640, iOS baseline 375x667, desktop baseline 1440x1024 (p.529-530).
5. Use the design tool's built-in device frames instead of memorising numbers (p.532).
6. Reach matters on phones: the thumb of the holding hand does most of the work, the top corner opposite the thumb (hamburger menu location) is the worst spot, and bottom-aligned tabs are the easiest menu (p.533-534).
7. Tablets are held two-handed most often, so reach zones are at the left and right sides, not the bottom centre (p.534-535).

## 2. Rules

- **RULE** Start every design by choosing a platform-specific base canvas before drawing anything.
  **Why** Users expect the product to fit their screen perfectly; the canvas fixes every later measurement.
  **Applies to** all. **Check** visual: root frame width/height match a listed preset. **Source** (p.525, p.529)

- **RULE** Target the most widely used and (where possible) the smallest screen size for the platform, so the design fits bigger devices.
  **Why** Shrinking a layout is a bigger risk than growing one; a base canvas in a small size proves the content fits.
  **Applies to** all. **Check** layout still valid at 360px wide (Android) / 375px (iOS) viewport; no horizontal overflow (`scrollWidth <= clientWidth`). **Source** (p.528, p.530)

- **RULE** Android phone base canvas: 360 x 640 (small) and 360 x 800 (large).
  **Why** 360x640 is the most widely used mobile resolution (7.28% of all-device stats, Dec 2020-Dec 2021) because early 16:9 Android devices all have 360x640 screens.
  **Applies to** mobile. **Check** viewport 360x640 / 360x800 renders without overflow. **Source** (p.529, p.531; 360x800 verified on image, OCR said 840)

- **RULE** iOS phone base canvas: 375 x 667 pt (iPhone 8 and below / "regular iPhone" iPhone 5 to X) and 375 x 812 (X and up, per Figma list). The chapter's own device figures label them 370 x 667 and 370 x 812.
  **Why** Every regular iPhone model between iPhone 5 and iPhone X is 375x667 pt.
  **Applies to** mobile. **Check** viewport 375x667 and 375x812. **Source** (p.528-530, p.532)

- **RULE** Use a newer/trendier device frame (iPhone 11 Pro, Samsung Galaxy S10+) only to showcase a design, or when the target user base actually uses a different screen size.
  **Why** The default baselines are about reach and fit, not fashion.
  **Applies to** mobile. **Check** visual. **Source** (p.529) (opinion: "I recommend")

- **RULE** Desktop base canvas: 1440 x 1024.
  **Why** Author states it is "still the most dominant size for any Desktop" (note: the same stats list shows 1920x1080 and 1366x768 as the top raw resolutions; 1440 is the recommended design frame).
  **Applies to** landing page | SaaS app UI. **Check** viewport 1440x1024 renders as designed. **Source** (p.529-530, p.531)

- **RULE** Tablet base canvas: 1024 x 768 (landscape frame shown).
  **Why** Preferred tablet size in the chapter's device list.
  **Applies to** all. **Check** viewport 1024x768. **Source** (p.531)

- **RULE** Apple Watch canvases: 292 x 320 (40 mm) and 330 x 364 (44 mm).
  **Why** Preferred watch sizes in the device list. (Values read from the figure; OCR gave only the second pair.)
  **Applies to** mobile (wearable). **Check** visual. **Source** (p.531-532)

- **RULE** Use the design tool's frame presets (Figma: Phone, Tablet, Desktop, Presentation, Watch, Paper, Social Media, Archive) rather than typing device sizes.
  **Why** Saves time and avoids wrong canvases; "save time and quality for the design itself".
  **Applies to** all. **Check** visual. **Source** (p.532)

- **RULE** Express layout in pt/dp-style logical units, not raw device pixels. Convert only when needed: on the original iPhone (163 ppi) 1 pt = 1 px; elsewhere 1 pt = (device ppi / 163) px.
  **Why** Physical pixel counts (1080x2340) differ from the logical canvas (375x812); the same pt design should render at any ppi.
  **Applies to** mobile. **Check** CSS uses px/rem as logical units; images supplied at 2x/3x. **Source** (p.526-527). The 2x/3x asset advice is an [engine note], not in the book.

- **RULE** Design for one-handed thumb use on phones: the book assumes the phone is held in one hand and that same-hand thumb does most taps. Put primary actions in the "easily thumb accessible area" (bottom arc), not at the top.
  **Why** Interfaces assembled without reach in mind are frustrating one-handed.
  **Applies to** mobile. **Check** visual: primary tap targets sit in the lower ~half; run a reach-zone overlay. **Source** (p.533)

- **RULE** Do not put essential navigation at the top corner (hamburger-menu position); the hardest-to-reach spot for right-handed users is exactly where the common hamburger sits.
  **Why** Requires both hands.
  **Applies to** mobile. **Check** visual / position of the menu trigger relative to viewport top-left. **Source** (p.533)

- **RULE** Prefer bottom-aligned tab bars as the first menu option for almost any mobile product.
  **Why** They are simplest to build and sit in the thumb-friendly zone.
  **Applies to** mobile. **Check** nav element anchored to bottom, `position: fixed; bottom: 0`. **Source** (p.533-534)

- **RULE** On tablets, expect two-handed holding: reach zones are the left and right edges (around the middle of the sides), so place controls at both side edges rather than only at bottom centre; the larger canvas plus larger reach area allows a different layout strategy. One-handed tablet use (other hand manipulates the UI) greatly expands the range in both orientations.
  **Why** Thumbs reach on all sides when the tablet is held with both hands; split keyboards and game controllers suit that arrangement.
  **Applies to** tablet. **Check** visual. **Source** (p.534-535)

### Audit additions (audit 2026-10-15)

- **RULE** Treat the phone thumb zone as side-dependent, not centred: in the figure the "easily thumb accessible" circle is anchored at the bottom corner on the holding hand's side (bottom-left for L, bottom-right for R), a light-blue band above and across it needs a hand shift, and the full top band (roughly the top third) needs both hands. Mirror-check layouts for left- and right-handed use; the bottom-centre is the area green in both.
  **Why** One hand holds the phone and its own thumb does most taps; the opposite bottom corner is already a stretch.
  **Applies to** mobile. **Check** overlay both mirrored reach maps; primary action falls in the green area of both (bottom-centre) or is duplicated per side. The "top third" and "bottom-centre overlap" are read from the figure, not stated in text. **Source** (p.533) (audit 2026-10-15)

- **RULE** On a tablet held in one hand and operated with the other, expect the easy zone to cover roughly the lower half of the screen, with a reach ring above it and only the top band hard to reach, in both portrait and landscape.
  **Why** The free hand can travel over the screen, so "the range is significantly increased".
  **Applies to** mobile (tablet). **Check** visual against the p.534 one-handed tablet figure. **Source** (p.534) (audit 2026-10-15)

## 3. Numbers & scales

Most commonly used resolutions, Worldwide Screen Resolution Stats, Dec 2020 - Dec 2021 (p.529):

| Resolution | Share |
|---|---|
| 1920x1080 | 8.89% |
| 1366x768 | 8.44% |
| 360x640 | 7.28% |
| 414x896 | 4.58% |
| 1536x864 | 3.88% |
| 375x667 | 3.75% |

Preferred design canvases (p.528-532):

| Device | Canvas (as labelled in figure) |
|---|---|
| iPhone 8 and below | 370 x 667 (text elsewhere: 375x667) |
| iPhone X and up | 370 x 812 (Figma: 375x812) |
| Small Android | 360 x 640 |
| Large Android | 360 x 800 |
| Desktop | 1440 x 1024 |
| Tablet | 1024 x 768 |
| Apple Watch 40 mm | 292 x 320 |
| Apple Watch 44 mm | 330 x 364 |

Figma Phone frame presets shown (p.532): iPhone 13 Pro Max 428x926; iPhone 13 / 13 Pro 390x844; iPhone 13 Mini 375x812; iPhone 11 Pro Max 414x896; iPhone 11 Pro / X 375x812; iPhone SE 320x568; iPhone 8 375x667; Android Small 360x640.

Unit illustrations (p.525-527): 1080 x 2340 pixels (px); 375 x 812 points (pt); 476 pixels per inch (ppi). Formula: 1 pt = (ppi / 163) px. Context stat: ~22 billion internet-connected devices, almost 7 billion smartphone users, as of 2022 (p.525).

Thumb-reach colour key (p.533): purple-blue = requires both hands; light blue = requires a position shift of the hand; green = easily thumb accessible.

- Derived arithmetic from the book's own unit figures (not stated in the text): 476 ppi / 163 = about 2.92 px per pt; 1080 px / 375 pt = 2.88 and 2340 px / 812 pt = about 2.88, so the p.526-527 example device is roughly a 3x screen (audit 2026-10-15)
- PPI direction (p.527): higher PPI = more detail; lower PPI = lower resolution (audit 2026-10-15)
- Reach legend (p.533) has exactly 3 tiers: requires both hands / requires a position shift of the hand / easily thumb accessible (audit 2026-10-15)

## 4. Dos and Don'ts

- DO: pick a base frame per platform (Android 360x640, iOS 375x667, desktop 1440x1024), check it also fits larger devices. DON'T: design only on a large flagship canvas and hope it shrinks (p.528-530).
- DO: bottom tab bar (figure p.534: phone with four icon tiles along the bottom, menu icon top-left). DON'T: rely on a top-left hamburger as the primary nav, it sits outside the thumb arc (p.533-534).
- Figure p.533: two phones (L and R hand). Green circle at bottom (thumb sweep) is easy; light-blue ring above it needs a hand shift; the top band is purple and needs both hands. The arc is mirrored for left/right-handed holding.
- Figure p.534: tablet one-handed (green mass at the bottom, light blue ring above, purple top) versus tablet two-handed (green/blue crescents at the left and right edges with "L" and "R" markers, purple centre).

- Figure p.534 (bottom-tab phone): the four tab icons span the full bottom edge, so the outer icon on the far side of the holding thumb sits in the light-blue "shift" area while the inner ones sit in green; the hamburger icon at top-left sits in the purple both-hands band. Bottom tabs are better than the hamburger, not perfect. (audit 2026-10-15)
- Figure p.525: blank phone frame -> phone with wallpaper, captioned by the idea that everything comes down to the pixel; decorative. (audit 2026-10-15)

## 5. Exceptions & judgement calls

- (opinion) The author's baselines ("I recommend designing at 360x640 for Android and 375x667 for iOS") are a design-handoff convention. Use a newer frame when you want to showcase or the target audience differs (p.529).
- The inconsistency 370 vs 375 widths: figures label the iPhone canvases 370 x 667 / 370 x 812, but the text and Figma list say 375. Treat 375 as the real iOS width; 370 looks like a labelling slip (see section 7).
- Desktop: the stats list has 1920x1080 and 1366x768 as the most common raw resolutions, yet the book recommends 1440x1024. Likely because design frames are not raw screen resolutions; the book gives no further reasoning.
- Android 360x640 is the most common because early 16:9 devices share it; modern Android phones are taller (360x800 is the "large" canvas).
- [engine note] Stats are from 2020-2021. For a modern site, also verify 390x844 (iPhone 13/14), 393x852, and 1280-1536 desktop widths; and treat the canvas as a viewport range via responsive breakpoints rather than one frame.
- [engine note] Bottom-nav advice applies to app-like mobile UI; for content sites a top header + hamburger is still acceptable if the primary CTA stays reachable.

## 6. Figures worth keeping

- p.527: pt vs ppi illustration (375x812 pt, 476 ppi labels on phone diagrams).
- p.530: iPhone 8 vs iPhone X preferred canvases (370x667 / 370x812).
- p.531: Android 360x640 / 360x800, desktop 1440x1024, tablet 1024x768.
- p.532: Apple Watch canvases and the Figma frame preset list with exact sizes.
- p.533: one-handed thumb reach zones, left and right hand, with colour legend.
- p.534: bottom-tab-bar phone figure and tablet reach (one-handed vs two-handed crescents).

Copied to examples/ui-pedia/screens/.

## 7. Open questions

- p.525: no rule content beyond framing (opens chapter; hero mock-up of two shopping-app phones, then a blank-to-wallpaper phone showing "px is the smallest unit").
- p.526: definitions only (px, start of pt definition).
- p.535: no further rules; complements p.534 (two-handed tablet usage).
- 370 vs 375 canvas width (iOS) is contradictory across figures and text (p.528-530 vs p.529, p.532).
- Watch values 292x320 vs 330x364: OCR on p.531 read only "330 x 364"; the left pair read from the image on p.532 at zoom.
- p.531 OCR "360 x 840" is wrong; image shows 360 x 800 (checked on p.531 and p.528).
- No numbers are given for tap-target size or the radius of the thumb zone; the book is qualitative on reach.

- (audit 2026-10-15) The book contradicts itself on tablet holding: p.534 says "the most typical method involves holding the device in one hand while using the other to manipulate the user interface"; p.535 says "Using both hands is the most typical tablet usage behaviour" and then calls thumb reach on all sides with both hands "an unusual occurrence". Core idea 7 above follows p.535; treat which hold is most common as unresolved and design for both.
- (audit 2026-10-15) Pages viewed as images: p.525, 527, 528, 530, 531, 532, 533, 534, 535. Text-only: p.526 (px definition and 1080 x 2340 px figure label, OCR clean), p.529 (stats list, OCR clean). p.530 image confirms the iPhone frames are labelled 370 x 667 and 370 x 812.
