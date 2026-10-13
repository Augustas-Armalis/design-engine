# Perch: direction

**Brief:** founder 2026-10-13: "design me a cool hero section with another product please, something Mac". Perch (fictional) turns the MacBook notch into a shelf for everything you copy, screenshot or drag. Audience: Mac power users and creators. One action: Download for Mac. Proof: the shelf itself, open, with a clip being dragged into a document.

## Hero class
Product proof. One object (a tilted MacBook display), one moment (drag out of the notch).

## Concept
The product lives where the camera is: a black squircle shelf grows out of the notch (Dynamic Island grammar) over a warm macOS wallpaper.

## Variety row
<!-- variety: layout=tilted-3d nav=G04 button=link type=rounded-friendly palette=light system=perch -->
- layout tilted-3d -> override (founder 2026-10-13: "a bit tilted and off"): the display rests straight-on; the tilt is only a 14°->0° entrance.
- nav G04: transparent bar at rest (capsule morph is specced for scroll; the page is one fold).
- button: link-led secondary ("Watch the 40s tour →"). override: the primary is an ink keycap (b2-key family), because a Mac download needs one solid action; the keycap presses 2px.
- type rounded-friendly: Rubik 460 / 78 / -0.04em, Title Case; Inter body (SF-like, for the macOS UI).
- system: new house system `perch` (contract met).

## Divergence
| axis | recent (Murmur, Settle, Halyard, Weekline) | Perch |
|---|---|---|
| structure | flat or tilted phone, dashboards | tilted laptop display, product in the notch |
| type voice | Inter / Geist / Inter Tight | Rubik rounded display |
| palette | cinematic dark, neutral app | Apple-light #f5f5f7; colour only in the wallpaper |
| CTA | glossy pills, plain buttons | ink keycap + arrow link |
| motion | load-ins | spring notch expansion, clips arrive, drag into document |

## Founder rules applied
Title Case h1, subtitle 2 lines, ≥64px CTA to product (100px), one product view, version chip says something specific, Lucide icons, squircles, logo drawn as an object (app icon: notch tab with clips), screenshots only.
## Check
check.mjs: 0 fail, 0 warn, 33 pass. ledger similar: ok.

## Round 2 (founder: "the mouse drags sth box is stupidly designed... should be more polished as the visual itself")
The drag is rebuilt in macOS's own drag grammar:
- The drag image is the screenshot itself (opaque, lift shadow, small green + badge, cursor at its lower edge), and the source card dims.
- The document is fully visible below the shelf, with real copy and a system-blue insertion line between paragraphs. On drop, the image springs in, then the loop restarts.
- Removed the striped ghost slot, the dashed drop box and the desktop icons. The display is 0.8x and sits 66px under the CTAs, so the whole moment fits in the fold.

## Round 3 (founder: title too tight, drop the top bar if it doesn't fit, subtitle badly formatted/too long, use real images, logo from his picture, more font and layout variants)
- **Chip:** removed; the headline gets 132px of top room.
- **Subtitle:** set by hand into two phrase-lines ("Everything you copy, screenshot or drag / waits under your notch. Drop it anywhere.").
- **Palette:** taken from the reference image: page #e6e9d4, mark #1eaf5c, ink #1b2116. The wallpaper is in the same greens; the menu bar uses dark text on the light wallpaper, as macOS does.
- **Logo:** the founder's reference mark (LogoFav / Matsuura), fitted as three exact ellipses (1.0% area error) with a smooth-union fillet: `brand/mark.svg`, `src/Mark.tsx`. Placeholder for a local concept only: it is another company's mark and must be replaced before anything public.
- **Real images:** the screenshot clip, drag image and dropped image are a real capture of our Settle dashboard; the link preview is our Kestrel hero. The wallpaper is still generated (no rights-cleared photo on disk).
- **Variants:** `?layout=centre|split|stage` and `?font=rubik|bricolage|figtree|funnel|onest`; contact sheet in `variants/contact-sheet.png`.
- **Check:** 0 fail on all three layouts.

## Round 4 (founder: "not green, the other design was better", supplied a star logo)
- **Restored round 2:** #f5f5f7 page, warm orange wallpaper, ink keycap. Kept the asked-for fixes: no chip, roomier headline, 2-line hand-set subtitle, real screenshots, layout/font switches.
- **Logo:** the founder's supplied star (two interlocking arcs), traced sub-pixel to `brand/star.svg` and `src/Star.tsx`. It sits as a macOS app icon (white mark on a black squircle) in the nav, and as a mono glyph in the menu bar. The green Matsuura placeholder is removed.
- **Menu bar:** dark text on the light wallpaper top. The backdrop blur was removed (a Chromium artefact painted teal).
- **Check:** 0 fail.
