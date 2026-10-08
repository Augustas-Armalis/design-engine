---
source: web:https://developer.apple.com/design/human-interface-guidelines/color (also dark-mode, materials, branding; fetched 2026-10-08 from the HIG JSON feed)
chapter: Apple HIG - Color, Dark Mode, Materials and Liquid Glass
pages: n/a (web source)
topic_tags: [color, dark-mode, contrast, materials, liquid-glass, blur, vibrancy, elevation, accent-color, wide-gamut, apple-hig]
status: studied
---

# Apple HIG - Color, Dark Mode, Materials

Raw text: `corpus/web/apple-hig/{color,dark-mode,materials,branding,toggles,page-controls}.txt` (private). Written in my own words. The HIG pages are now written around Liquid Glass (updated December 2025 and June 2025 per the change log), so "materials" here means Liquid Glass plus four older standard blurs.

**Limit of this source.** All system colour swatch values (hex for red, blue, grays; light, dark, increased-contrast variants) are drawn as images; the JSON tables contain empty cells. No hex values are quoted from Apple below. A handful of well-known values appear in section 5 labelled from memory and flagged to verify. Apple also publishes no blur radius in px; the only material number in the text is a 35% dim.

## 1. Core ideas
1. Colour must mean one thing: if the accent colour marks interactive text, never use a similar colour on static text.
2. Every colour needs a light, a dark and an increased-contrast variant, even in an app that ships in a single appearance (because translucent glass adapts to all of them).
3. System colours are semantic (by job, not by look) and their raw values change between OS releases, so reference by token, never by value, and never re-purpose a token (do not use the separator colour as a text colour).
4. Colour is never the only channel for state, identity or data. Red-green and blue-orange are the pairings that fail first.
5. Liquid Glass has no colour of its own; it takes colour from the content behind it. Tint it only for emphasis, and prefer tinting the background of the one primary control over tinting icons or text.
6. Colourful content behind controls makes control labels hard to read; in a colourful app keep bars monochrome, in a mostly neutral app the brand colour as accent works well.
7. Dark Mode is not inversion: backgrounds are dimmer, foregrounds brighter, and two background levels (base, elevated) create depth in dark UIs.
8. Contrast floors: 4.5:1 absolute minimum; aim for 7:1 for custom small text.
9. Materials separate foreground from background by blur and luminosity adjustment; thicker = more opaque = better for fine text, thinner = more context shows through.
10. Glass belongs to the controls/navigation layer floating over content; the content layer uses ordinary solid or standard-material surfaces.
11. Brand colour should be applied sparingly: primary actions and status indicators, with the bulk of brand expression placed in the content layer that scrolls under glass controls.

## 2. Rules

- **RULE [AH-CO-01]** Each colour has one meaning across the product (one colour for "interactive", one for each status). Do not give static text the link/accent colour.
  **Why** inconsistent colour meaning makes people guess what is clickable. **Applies to** web: all. **Check** computed `color` of non-interactive text must not equal the link/accent token unless inside an accent-coloured region; visual. **Source** https://developer.apple.com/design/human-interface-guidelines/color

- **RULE [AH-CO-02]** Define every colour token in three variants: light, dark, and increased-contrast (`@media (prefers-contrast: more)`), even if you only ship one theme.
  **Why** Apple wants all three so adaptive materials and accessibility settings do not break the palette. **Applies to** web: design tokens. **Check** each semantic token has a `light-dark()` or paired declarations plus a `prefers-contrast: more` override that raises text and border contrast. **Source** https://developer.apple.com/design/human-interface-guidelines/color

- **RULE [AH-CO-03]** Even if the product is single-theme, keep a dark (or light) twin of every colour in the token file.
  **Why** glass and system surfaces adapt automatically; missing twins cause wrong fallbacks. **Applies to** web: tokens. **Check** token linter: no token without both values. **Source** https://developer.apple.com/design/human-interface-guidelines/color

- **RULE [AH-CO-04]** Use semantic tokens named by job (background / secondary background / tertiary background, text / secondary text / tertiary text / quaternary text, placeholder, separator, opaque separator, link), not named by hue; never re-assign a token to another job.
  **Why** semantic naming keeps the palette stable when appearance changes. **Applies to** web: all. **Check** CSS uses `var(--text-2)` etc.; ban raw hex in component CSS; `--separator` never used as `color:` or `--text-*` never as `background`. **Source** https://developer.apple.com/design/human-interface-guidelines/color

- **RULE [AH-CO-05]** Use three background levels for hierarchy: primary for the page, secondary for groups inside it, tertiary for groups inside those. Use the "grouped" trio for grouped table/list layouts and the plain trio otherwise.
  **Why** one rule for depth without drawing borders everywhere. **Applies to** web: SaaS app UI, settings pages. **Check** surface nesting depth <= 3 distinct background tokens; inner surface is never the same token as its parent. **Source** https://developer.apple.com/design/human-interface-guidelines/color

- **RULE [AH-CO-06]** Never rely on colour alone to convey state, identity, links or data; add a label, icon shape, pattern, underline or position.
  **Why** colour-blind and low-vision users; also translucent or sunlit screens. **Applies to** web: all, especially charts, status pills, form validation. **Check** axe `color-contrast` plus a grayscale screenshot test: every status still distinguishable. **Source** https://developer.apple.com/design/human-interface-guidelines/color

- **RULE [AH-CO-07]** Avoid red-green and blue-orange as the only differentiator in pairs of states or series.
  **Why** the combinations Apple singles out as problematic for colour-blind people. **Applies to** web: dashboards, charts, diffs. **Check** simulate protanopia/deuteranopia/tritanopia in devtools; pairs remain separable or carry an icon/pattern. **Source** https://developer.apple.com/design/human-interface-guidelines/accessibility

- **RULE [AH-CO-08]** Check each colour's meaning in every target locale; do not assume red = danger or white = purity worldwide.
  **Why** colours carry cultural meanings (white is mourning in some places). **Applies to** web: international products. **Check** locale review checklist; visual. **Source** https://developer.apple.com/design/human-interface-guidelines/inclusion

- **RULE [AH-CO-09]** Do not hard-code the documented system colour values; reference the colour by name/token because the actual values change between releases and environments.
  **Why** Apple says documented values are for design-time reference only. **Applies to** web: when mirroring Apple tokens on web, treat them as starting points and re-tune with contrast tests. **Check** n/a (process). **Source** https://developer.apple.com/design/human-interface-guidelines/color

- **RULE [AH-CO-10]** Test colour under bright ambient light (colours look darker and muted) and dim light (colours look brighter and more saturated), and on several displays and colour profiles (sRGB and Display P3).
  **Why** ambient light and white-point adaptation change perceived colour. **Applies to** web: visual QA on a phone outdoors and a dark room; `color-gamut` test. **Check** visual; device matrix. **Source** https://developer.apple.com/design/human-interface-guidelines/color

- **RULE [AH-CO-11]** Use sRGB as the baseline and add wide-gamut Display P3 only where it improves meaning (status indicators, rich photos); provide sRGB fallbacks for near-identical P3 colours and for P3 gradients that clip.
  **Why** P3 colours that differ slightly can look identical on sRGB, and gradients can band or clip. **Applies to** web: use `@media (color-gamut: p3)` with `color(display-p3 ...)` or `oklch()`, fallback hex. **Check** every P3 colour has a hex fallback; contrast tests run on the sRGB-mapped value. **Source** https://developer.apple.com/design/human-interface-guidelines/color

- **RULE [AH-CO-12]** Tag exported images with a colour profile (sRGB by default); export wide-colour images as Display P3 PNG at 16 bits per channel only where needed.
  **Why** untagged images shift on different displays. **Applies to** web: image pipeline (AVIF/PNG with ICC). **Check** `identify -verbose` shows an ICC profile or sRGB tag for hero and brand images. **Source** https://developer.apple.com/design/human-interface-guidelines/color

- **RULE [AH-CO-13]** Colour near translucent bars shifts: re-check colours that sit behind or inside translucent elements, and when artwork changes the scheme (e.g. satellite vs map), adapt nearby colours.
  **Why** translucency tints what it sits over. **Applies to** web: sticky nav, overlays. **Check** screenshot the bar over each section background; measure text contrast at the worst backdrop. **Source** https://developer.apple.com/design/human-interface-guidelines/color

- **RULE [AH-CO-14]** Prefer the platform colour picker (`<input type="color">`) over a custom one when users choose colours.
  **Why** familiarity and the user's saved colours. **Applies to** web: forms. **Check** presence of native input. **Source** https://developer.apple.com/design/human-interface-guidelines/color

- **RULE [AH-CO-15]** Tint glass sparingly: reserve colour for status indicators and the one primary action; for a primary action apply colour to the control background, not to its icon or text; do not colour the backgrounds of multiple adjacent controls.
  **Why** colour on glass competes with the underlying content; one coloured control makes the focal point clear. **Applies to** web: toolbars, sticky action bars. **Check** at most one filled-accent control per toolbar; icon/text colour stays neutral in other buttons. **Source** https://developer.apple.com/design/human-interface-guidelines/color

- **RULE [AH-CO-16]** If the page behind controls is colourful or image-rich, keep bars and control labels monochrome (dark on light content, light on dark content); if the content is mostly neutral, an accent-coloured control is fine.
  **Why** similar hues between label and backdrop kill legibility. **Applies to** web: nav, tab bar, floating actions. **Check** worst-case contrast of control label against the backdrop crop >= 4.5:1. **Source** https://developer.apple.com/design/human-interface-guidelines/color

- **RULE [AH-CO-17]** Check legibility of controls against content in its resting state (e.g. page scrolled to top), not just while content scrolls underneath.
  **Why** the resting state is what the user sees first and for longest. **Applies to** web: hero + sticky nav. **Check** screenshot at scrollY=0 and measure label contrast. **Source** https://developer.apple.com/design/human-interface-guidelines/color

- **RULE [AH-CO-18]** Apply the brand/accent colour judiciously: primary actions and status indicators (unread badge, selected tab icon); express more brand in the content layer, not on every control.
  **Why** accent on everything dilutes its signal. **Applies to** web: all. **Check** accent-coloured controls per viewport <= 2 filled plus status marks; ratio of accent pixels < ~10% `[engine note]`. **Source** https://developer.apple.com/design/human-interface-guidelines/branding

- **RULE [AH-CO-19]** Do not offer an app-specific light/dark setting that overrides the system; follow `prefers-color-scheme` and handle automatic mid-session switches.
  **Why** extra setting means people must change two things and may think the app is broken. **Applies to** web: see section 5 for the conflict with the engine's persisted-override rule. **Check** `matchMedia('(prefers-color-scheme: dark)')` change listener updates theme live. **Source** https://developer.apple.com/design/human-interface-guidelines/dark-mode

- **RULE [AH-CO-20]** Make the UI look right in both appearances and verify legibility with the contrast and transparency preferences on, separately and together (`prefers-contrast: more`, `prefers-reduced-transparency`).
  **Why** Dark Mode plus increased contrast can reduce contrast between dark text and a dark surface. **Applies to** web: all. **Check** four-way Playwright matrix (light/dark x normal/more contrast) with contrast scan. **Source** https://developer.apple.com/design/human-interface-guidelines/dark-mode

- **RULE [AH-CO-21]** A permanently dark UI is acceptable for immersive media viewing, where the UI should recede.
  **Why** content-first. **Applies to** web: video/photo viewers, cinema-style players. **Check** `color-scheme: dark` explicit and documented. **Source** https://developer.apple.com/design/human-interface-guidelines/dark-mode

- **RULE [AH-CO-22]** Dark palettes use dimmer backgrounds and brighter foregrounds, but are not a mechanical inversion; some colours do not invert. Design the dark tokens separately.
  **Why** inversion breaks brand colours, shadows and images. **Applies to** web: all. **Check** dark tokens are individually authored (not computed `invert()` or `filter`). **Source** https://developer.apple.com/design/human-interface-guidelines/dark-mode

- **RULE [AH-CO-23]** Contrast between foreground and background must be at least 4.5:1 in every appearance, and 7:1 for custom foreground/background pairs, especially small text.
  **Why** 4.5:1 is the WCAG AA floor; 7:1 gives margin for Increase Contrast and small sizes. **Applies to** web: all. **Check** WCAG 2 ratio on every (text, bg) pair >= 4.5; small-body target >= 7. **Source** https://developer.apple.com/design/human-interface-guidelines/dark-mode

- **RULE [AH-CO-24]** Accessibility Inspector thresholds for text: up to 17 pt (px) text needs 4.5:1; 18 pt and larger needs 3:1; any bold text needs 3:1; when the default scheme does not reach these, supply a higher-contrast scheme under Increase Contrast.
  **Why** Apple's WCAG AA mapping for its audit tool. **Applies to** web: mind the conflict in section 5 - WCAG defines large text as 24 px regular or ~18.7 px bold, so apply 3:1 only at those sizes. **Check** contrast ratio by size bucket; for text 18-23 px non-bold use 4.5:1 on the web. **Source** https://developer.apple.com/design/human-interface-guidelines/accessibility

- **RULE [AH-CO-25]** Soften pure-white image backgrounds in dark UI (slight darkening or transparent PNG) so they do not glow.
  **Why** white boxes become the brightest object on a dark screen. **Applies to** web: logos, product shots, screenshots in dark themes. **Check** images with near-#fff background inside `[data-theme=dark]` have `filter: brightness(.9)` or a dark variant. **Source** https://developer.apple.com/design/human-interface-guidelines/dark-mode

- **RULE [AH-CO-26]** Provide separate light and dark versions of an icon or asset only when one asset cannot work in both (e.g. an outline needed on light but not on dark).
  **Why** avoid asset duplication but fix edge failures. **Applies to** web: logos, illustrations; use `<picture>` with `prefers-color-scheme` or `light-dark()` SVG. **Check** any asset with a visible fill on its own colour in one theme is flagged. **Source** https://developer.apple.com/design/human-interface-guidelines/dark-mode

- **RULE [AH-CO-27]** In dark UIs, raise elevated layers (popover, modal, sheet) to a lighter background than the base to show depth, and use the system pair rather than a custom one.
  **Why** shadows are weak on dark; luminance carries the depth. **Applies to** web: dark theme surface tokens. **Check** `--surface-elevated` L* > `--surface-base` L* by >= 3-6 L points in dark theme `[engine note]`. **Source** https://developer.apple.com/design/human-interface-guidelines/dark-mode

- **RULE [AH-CO-28]** Use glass (blurred translucent material) only for the controls and navigation layer floating over content (tab bars, toolbars, sidebars, sheets, popovers), not for content cards.
  **Why** glass in the content layer confuses the control/content hierarchy. **Applies to** web: sticky nav, floating toolbar, popover; not card grids. **Check** `backdrop-filter` count in viewport <= 4 and none on `article`/content cards. **Source** https://developer.apple.com/design/human-interface-guidelines/materials

- **RULE [AH-CO-29]** Exception: transient interactive parts (slider thumb, toggle knob) may take on glass while being operated.
  **Why** shows interactivity at the moment of touch. **Applies to** web: optional micro-polish; native-leaning. **Check** visual. **Source** https://developer.apple.com/design/human-interface-guidelines/materials

- **RULE [AH-CO-30]** Use glass effects sparingly on custom controls and limit them to the most important functional elements.
  **Why** overuse distracts from the content that glass is meant to reveal. **Applies to** web: custom UI. **Check** <= 4 glass layers per viewport (matches engine H-section). **Source** https://developer.apple.com/design/human-interface-guidelines/materials

- **RULE [AH-CO-31]** Choose the "regular" (frosted, more opaque) variant for text-heavy or legibility-critical surfaces (alerts, sidebars, popovers); choose "clear" (highly translucent) only over rich media backgrounds such as photo and video.
  **Why** regular blurs and adjusts luminosity to protect text; clear prioritises seeing the media. **Applies to** web: pick alpha >= 0.7 + blur for text surfaces; alpha <= 0.3 only over media. **Check** surface alpha and content type pairing. **Source** https://developer.apple.com/design/human-interface-guidelines/materials

- **RULE [AH-CO-32]** Over a clear-glass control on bright media, add a 35% black dimming layer behind it; skip the layer when the media is dark or the player already supplies its own.
  **Why** the only numeric material value in the HIG; keeps white glyphs legible. **Applies to** web: video controls, photo overlays. **Check** `background: rgb(0 0 0 / .35)` scrim present under clear controls on light imagery. **Source** https://developer.apple.com/design/human-interface-guidelines/materials

- **RULE [AH-CO-33]** Pick standard materials by purpose, not by the colour they look like. Four thicknesses exist: ultra-thin, thin, regular (default), thick. Thicker is more opaque for fine text; thinner shows more context behind.
  **Why** the look of a material can change with system settings. **Applies to** web: define 4 surface-blur tokens (`--glass-1..4`) by purpose. **Check** token names describe use (overlay, sheet, toolbar) not colour. **Source** https://developer.apple.com/design/human-interface-guidelines/materials

- **RULE [AH-CO-34]** On a material use high-contrast "vibrant" foreground tones; the weakest tier (quaternary) is not allowed on thin or ultra-thin materials. Labels have four vibrancy levels, fills three, separators one.
  **Why** low tiers on thin materials fall below legibility. **Applies to** web: text tiers over `backdrop-filter` surfaces: stay at tiers 1-3 on thin glass. **Check** text colour token on thin glass is not tertiary/quaternary. **Source** https://developer.apple.com/design/human-interface-guidelines/materials

- **RULE [AH-CO-35]** Differentiate controls from content with a scroll-edge effect (a soft fade/blur at the edge where content scrolls under a floating bar) instead of a solid or semi-opaque bar background; extend full-bleed content under bars.
  **Why** keeps the bar light while preserving legibility. **Applies to** web: sticky header/footer over scrolling content; use a gradient mask + blur. **Check** sticky bar has no flat `background` fill when a fade/blur is used; hero image extends behind the nav. **Source** https://developer.apple.com/design/human-interface-guidelines/layout

- **RULE [AH-CO-36]** Use one scroll-edge effect per view; prefer the automatic (more opaque) style for bars with many controls, text outside glass controls, or pinned table headers; use the softer style only after legibility testing. Apply the effect only when content scrolls behind floating controls; it is not decoration.
  **Why** avoids layered haze and keeps controls distinct. **Applies to** web: sticky UI. **Check** count of fade layers per viewport = 1 per scroll container. **Source** https://developer.apple.com/design/human-interface-guidelines/scroll-views

- **RULE [AH-CO-37]** When a full-width background image would be covered by a sidebar or inspector, mirror and blur the image under the component to make it seem to continue.
  **Why** keeps a clean image without cropping its subject. **Applies to** web: hero + side panel; CSS mirrored blurred copy. **Check** visual. **Source** https://developer.apple.com/design/human-interface-guidelines/layout

- **RULE [AH-CO-38]** Reduce toolbar backgrounds and tinted controls; let content colour inform bar colour.
  **Why** custom backgrounds fight system effects and distract. **Applies to** web: app bars. **Check** bar `background` is transparent/blurred, controls neutral except one primary. **Source** https://developer.apple.com/design/human-interface-guidelines/toolbars

- **RULE [AH-CO-39]** Do not tint page-indicator dots or badges with custom colours; keep the badge as a red oval with white text for critical counts only.
  **Why** custom colours reduce the contrast that identifies the current page or an unread count. **Applies to** web: carousel dots, notification badges. **Check** dot active/inactive contrast >= 3:1; single badge style in the app. **Source** https://developer.apple.com/design/human-interface-guidelines/page-controls

- **RULE [AH-CO-40]** A switch/toggle's on colour (default green) must contrast with its off state; change it to the accent only if the new colour stays perceptible.
  **Why** state must be visible without reading. **Applies to** web: toggles. **Check** on-track vs off-track contrast >= 3:1 and a non-colour cue (knob position). **Source** https://developer.apple.com/design/human-interface-guidelines/toggles

- **RULE [AH-CO-41]** (native-only) macOS lets people override the accent colour system-wide, and graphite makes window backgrounds pick up desktop colour (desktop tinting); tvOS highlights focus by scale and motion, never colour alone; visionOS discourages colour on glass in light text; watchOS avoids full-screen background colour in long-lived views.
  **Why** records platform behaviours that do not map to the web. **Applies to** native-only. **Check** n/a. **Source** https://developer.apple.com/design/human-interface-guidelines/color

## 3. Numbers & scales

| Item | Value | Source page |
|---|---|---|
| Minimum contrast (dark mode and general) | 4.5:1 | Dark Mode |
| Recommended for custom small text | 7:1 | Dark Mode |
| Text up to 17 pt | 4.5:1 | Accessibility |
| Text 18 pt | 3:1 | Accessibility |
| Bold text any size | 3:1 | Accessibility |
| Clear glass dimming layer over bright media | 35% black | Materials |
| Standard materials (iOS/iPadOS, tvOS) | ultraThin, thin, regular (default), thick | Materials |
| Label vibrancy levels | 4 (label, secondary, tertiary, quaternary) | Materials |
| Fill vibrancy levels | 3 | Materials |
| Separator vibrancy | 1 | Materials |
| Background levels | primary, secondary, tertiary (x system and grouped sets) | Color |
| Dark mode background pair | base, elevated | Dark Mode |
| System hues | red, orange, yellow, green, mint, teal, cyan, blue, indigo, purple, pink, brown | Color |
| System grays (iOS UIKit) | Gray, Gray 2-6 (six) | Color |
| Foreground tiers | label, secondary, tertiary, quaternary, placeholder, separator, opaque separator, link | Color |
| tvOS recommendation for materials | ultraThin for full-screen light views; thin or regular for overlays; thick for dark overlays | Materials |

Page-control background and toggle states: no numbers given.

## 4. Dos and Don'ts
- **Do** tint the single primary action's background; **Don't** also tint the icons of its neighbours (Done is the model: accent background on the one prominent control).
- **Do** keep a monochrome bar over a colourful photo feed; **Don't** place an accent-coloured label over a similar-hued photo.
- **Do** soften a white-background product image in dark mode; **Don't** let it glow like a lamp.
- **Do** use separator colour for lines; **Don't** reuse it as a text colour.
- **Do** show state with a shape plus colour; **Don't** use a red dot vs green dot only.
- **Do** keep a status colour consistent across screens; **Don't** reuse the brand blue for both "link" and "info".

## 5. Exceptions & judgement calls
- **Theme toggle conflict.** `web/color-and-surfaces.md` (RULE "Mode switching ...") and `web/implementation-craft.md` ("For a toggle override ... ") ship a persisted manual light/dark override. Apple says avoid an app-specific appearance setting. Resolution: default to the system; offer a manual toggle only for products where users plausibly differ from their OS (web apps used on shared screens or kiosks, dev tools) and make "System" the default third option. Do not hide system following.
- **Large-text threshold conflict.** Apple's table treats 18 pt (any weight) as "large", giving 3:1 from 18 px; WCAG defines large text as >= 24 px regular or >= ~18.7 px bold. `web/color-and-surfaces.md` already uses the WCAG definition. Use the stricter web rule; Apple's pt scale is not CSS pt (1 CSS pt = 1.33 px).
- **Blur philosophy conflict.** Apple makes glass the primary navigation material; `web/color-and-surfaces.md` says blur is a cost to use sparingly (3-4 layers, radius <= 20 px, never animate). Both agree on "few, floating, never in content". Keep the engine limits for performance; Apple gives no blur px at all.
- **Contrast metric.** Apple's 4.5/7 are WCAG 2 ratios; the engine gates on WCAG 2.2 AND APCA. Apple also names APCA as an acceptable measure. No conflict; use both.
- **System-colour values from memory `[engine note, unverified - the HIG swatches are images]`:** blue is about #007AFF (light) / #0A84FF (dark); green about #34C759 / #30D158; red about #FF3B30 / #FF453A. Treat only as a sanity check and re-derive in OKLCH with contrast tests.
- **Brand colour in the content layer** (Branding page) agrees with the engine rule that accent is a scarcity effect.
- The 35% dim is a recommendation for "bright" content, with no brightness threshold given.
- Apple says nothing about gradient or shadow values; the engine's elevation rules in `web/color-and-surfaces.md` section F stand alone.

## 6. Figures worth keeping
- Color page: the system-colour tables (light / dark / increased contrast) are images only; capture from the Apple Design Resources if numeric values are needed.
- Materials page: Liquid Glass regular vs clear comparison images (not in the JSON text).

## 7. Open questions
- Real hex values for all system colours and grays (not extractable from the JSON). Ask for an export from Apple Design Resources or measure from a rendered iOS simulator.
- No blur radius, saturation or alpha values for any standard material; if needed, measure `UIBlurEffect` renders on-device.
- Pages with no rule content: `foundations` (index page).
