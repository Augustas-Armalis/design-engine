---
source: web:https://developer.apple.com/design/human-interface-guidelines/accessibility (also inclusion, right-to-left, voiceover, keyboards, charting-data, charts; fetched 2026-10-08)
chapter: Apple HIG - Accessibility, inclusion, localisation direction (RTL), VoiceOver
pages: n/a (web source)
topic_tags: [accessibility, inclusion, a11y, contrast, rtl, localization, voiceover, keyboard, reduced-motion, gestures, plain-language, apple-hig]
status: studied
---

# Apple HIG - Accessibility and Inclusion

Raw text: `corpus/web/apple-hig/{accessibility,inclusion,right-to-left,voiceover,keyboards,charting-data,charts,gestures,entering-data}.txt` (private). Written in my own words.

## 1. Core ideas
1. Accessible = intuitive, perceivable, adaptable: familiar interactions, no single sensory channel, respects the user's system settings.
2. Vision: allow at least 200% text enlargement, meet contrast minimums (and offer a higher-contrast scheme when the default misses them), use system colours with built-in accessible variants, and never use colour alone.
3. Hearing: text alternatives for audio and video (captions, subtitles, audio description, transcripts), haptics and visuals alongside sound.
4. Mobility: 44 x 44 default targets with generous padding, simple gestures with button alternatives, voice, keyboard and switch-device support.
5. Speech: complete keyboard operation; do not override system shortcuts.
6. Cognitive: few, familiar actions; no timed-out UI; no autoplay; no flashing; reduce motion; a reduced mode that cuts features to the core and asks twice before hard-to-undo actions.
7. Inclusion is not only the absence of offence: plain language, "you", gender-neutral, culturally neutral examples, diverse people without stereotypes, and awareness that disability is a spectrum and temporary/situational for everyone.
8. Right-to-left support is mostly mirroring order and direction, not mirroring everything: numbers keep digit order, photos and logos are not flipped, directional icons flip, paragraphs align to their own language.
9. VoiceOver-style support means labels for non-text, descriptive titles and headings, logical order and grouping, announcements for visible changes, and skipping decoration.
10. Charts are accessibility objects: summary, labels per meaningful mark, an overview of axes and bounds, not-by-colour differentiation.

## 2. Rules

- **RULE [AH-AX-01]** Let users enlarge text at least 200% without loss of content or function (use `rem`, flexible containers; do not lock zoom).
  **Why** Apple's stated minimum (140% on watch). **Applies to** web: all. **Check** Playwright at 200% zoom and at root font-size 32 px: no horizontal scroll at 1280 px, no clipped text. **Source** https://developer.apple.com/design/human-interface-guidelines/accessibility

- **RULE [AH-AX-02]** Meet contrast minimums: text up to 17 px 4.5:1; 18 px and larger 3:1; bold text 3:1 (WCAG AA mapping); if the default misses it, supply a higher-contrast scheme under `prefers-contrast: more`; check both light and dark.
  **Why** Apple's audit thresholds. **Applies to** web: use WCAG's actual large-text definition (24 px regular, ~18.7 px bold) for the 3:1 case; see section 5. **Check** per-text-node contrast >= 4.5:1 unless large per WCAG; re-run in dark and `prefers-contrast: more`. **Source** https://developer.apple.com/design/human-interface-guidelines/accessibility

- **RULE [AH-AX-03]** Use design-system colours that already carry accessible variants; do not invent unrelated one-off colours for text and controls.
  **Why** variants adapt automatically to Increase Contrast and appearance. **Applies to** web: tokens with `light-dark()` and `prefers-contrast`. **Check** every text/control colour is a token. **Source** https://developer.apple.com/design/human-interface-guidelines/accessibility

- **RULE [AH-AX-04]** Convey information with more than colour: shapes, icons, labels, patterns, position; allow customising colour schemes for charts where possible.
  **Why** red-green and blue-orange pairs fail for colour-blind users. **Applies to** web: status chips, charts, form validation. **Check** grayscale screenshot test; every state remains distinguishable. **Source** https://developer.apple.com/design/human-interface-guidelines/accessibility

- **RULE [AH-AX-05]** Give every key interface element an accessible name (alternative text label) that conveys function, including custom controls and icon-only buttons; keep labels in sync when UI changes.
  **Why** screen readers have only the label. **Applies to** web: `aria-label`, `<label>`, `alt`. **Check** axe `button-name`, `link-name`, `image-alt`, `label` pass; icon-only buttons have `aria-label` or visually hidden text. **Source** https://developer.apple.com/design/human-interface-guidelines/voiceover

- **RULE [AH-AX-06]** Describe meaningful images by what they convey (not by repeating nearby captions); mark decorative images as hidden (`alt=""` or `aria-hidden="true"`).
  **Why** reduces noise and cognitive load. **Applies to** web: all images/SVG. **Check** `<img>` has `alt` attribute always; decorative ones `alt=""`; no alt text starting with "image of". **Source** https://developer.apple.com/design/human-interface-guidelines/voiceover

- **RULE [AH-AX-07]** Every chart or infographic needs a concise overview (type, what each axis shows, bounds, main message), accessible labels for important marks (value plus context such as date), and any interaction must be available to assistive technology; hide visible axis/tick labels from assistive tech when mark labels already carry the values.
  **Why** a chart is not one image; labels need structure. **Applies to** web: dashboards (SVG `role=img` + `aria-label` summary, `<table>` fallback). **Check** each chart has `figcaption`/summary and a data table or per-mark `aria-label`; axis text `aria-hidden`. **Source** https://developer.apple.com/design/human-interface-guidelines/charts

- **RULE [AH-AX-08]** Write chart accessibility labels with objective values and unambiguous formats: "June 6" not "6/6", "60 minutes" not "60m", no subjective words (rapidly, gradually), describe what the series represents not what colour it is, and refer to axes consistently.
  **Why** avoids ambiguity and editorialising. **Applies to** web: charts and KPI tiles. **Check** regex for `\d+/\d+` and subjective adverbs in aria-labels. **Source** https://developer.apple.com/design/human-interface-guidelines/charts

- **RULE [AH-AX-09]** Give each page/screen a unique, specific title, and use accurate section headings to build a heading outline.
  **Why** title is the first thing a screen reader announces. **Applies to** web: `<title>`, one `h1`, ordered `h2..h6`. **Check** unique `<title>` per route; no skipped heading levels. **Source** https://developer.apple.com/design/human-interface-guidelines/voiceover

- **RULE [AH-AX-10]** Express visual relationships (grouping, order, linkage) programmatically: DOM order equals reading order; group image with its caption (`<figure>`); landmarks and headings for navigation.
  **Why** sighted proximity cues disappear for screen readers. **Applies to** web: all. **Check** tab/reading order equals visual order; `<figure>/<figcaption>` for captioned images; landmark roles present. **Source** https://developer.apple.com/design/human-interface-guidelines/voiceover

- **RULE [AH-AX-11]** Announce visible content and layout changes (toasts, inline validation, loaded results) to assistive technology.
  **Why** unexpected changes break the user's mental map. **Applies to** web: `aria-live="polite"`/`role="status"`, `role="alert"` for errors, focus management on route changes. **Check** async updates are inside live regions; focus moved to heading on SPA navigation. **Source** https://developer.apple.com/design/human-interface-guidelines/voiceover

- **RULE [AH-AX-12]** Support headings/links/landmarks as quick navigation targets (the "rotor" equivalent).
  **Why** screen-reader users jump by element type. **Applies to** web: native semantic elements first. **Check** all links `<a href>`, headings use `<h*>`, nav in `<nav>`. **Source** https://developer.apple.com/design/human-interface-guidelines/voiceover

- **RULE [AH-AX-13]** Provide text equivalents for audio/video: captions (synchronised text of audio), subtitles (dialogue in a language), audio descriptions (narration of visuals in pauses), transcripts (full text), and let people style captions.
  **Why** deaf or hard-of-hearing users and noisy environments. **Applies to** web: video/podcast pages. **Check** `<track kind="captions">` present; transcript link adjacent. **Source** https://developer.apple.com/design/human-interface-guidelines/accessibility

- **RULE [AH-AX-14]** Pair audio cues with visual cues (and haptics on devices that have them), and add visual indicators when audio points to off-screen content.
  **Why** muted or deaf users miss audio-only signals. **Applies to** web: notification sounds, game-like UI. **Check** every `Audio.play()` call is paired with a visible state change. **Source** https://developer.apple.com/design/human-interface-guidelines/accessibility

- **RULE [AH-AX-15]** Provide an alternative to every gesture: if swipe dismisses, a visible button must also dismiss; core features must work with more than one physical interaction.
  **Why** motor and assistive-technology users. **Applies to** web: swipe-to-delete, drag, long-press. **Check** gesture-handler elements have a keyboard/button equivalent (axe + manual). **Source** https://developer.apple.com/design/human-interface-guidelines/accessibility

- **RULE [AH-AX-16]** Use the simplest gesture for frequent actions; avoid multi-finger or multi-hand custom gestures and path-based gestures as the only input.
  **Why** repetition and dexterity. **Applies to** web: WCAG 2.5.1. **Check** no multi-touch-only features; pinch has +/- alternative. **Source** https://developer.apple.com/design/human-interface-guidelines/accessibility

- **RULE [AH-AX-17]** Label controls so voice control can target them: the visible label text is the accessible name (or starts with it).
  **Why** people say what they see. **Applies to** web: WCAG 2.5.3 Label in Name. **Check** accessible name contains visible text for each control. **Source** https://developer.apple.com/design/human-interface-guidelines/accessibility

- **RULE [AH-AX-18]** The entire UI works with keyboard alone; do not override system or browser shortcuts; keep a logical tab order and visible focus.
  **Why** Full Keyboard Access users, plus screen-reader and switch users. **Applies to** web: all (note iPadOS-specific exception in section 5). **Check** Tab through every control; `:focus-visible` outline present; custom shortcuts do not collide with browser/OS ones. **Source** https://developer.apple.com/design/human-interface-guidelines/keyboards

- **RULE [AH-AX-19]** For custom shortcuts: only for the most frequent commands, Command (Ctrl on web) as the primary modifier, Shift as a secondary, Option sparingly, avoid Control; list modifiers in the order Control, Option, Shift, Command; never use the shifted character plus Shift in the label (write "Cmd /" not "Shift Cmd /" for the key that shows the symbol with Shift).
  **Why** system conflicts and consistency. **Applies to** web: command palettes, app shortcuts (Cmd on Mac, Ctrl elsewhere); modifier order is display. **Check** shortcut table lint; no duplicates with browser; show hints in menus not context menus. **Source** https://developer.apple.com/design/human-interface-guidelines/keyboards

- **RULE [AH-AX-20]** Respect standard shortcuts: do not repurpose Cmd-C/V/X/Z/A/F/S/W/Q/comma (settings) etc. unless the action truly does not exist in your product.
  **Why** muscle memory. **Applies to** web: web apps with shortcuts. **Check** keydown handlers do not `preventDefault` on standard combos unless in a text-less canvas. **Source** https://developer.apple.com/design/human-interface-guidelines/keyboards

- **RULE [AH-AX-21]** Keep interactions simple and consistent; prefer system patterns to novel ones.
  **Why** lower cognitive load. **Applies to** web: all. **Check** review; fewer than N custom widgets without native fallback. **Source** https://developer.apple.com/design/human-interface-guidelines/accessibility

- **RULE [AH-AX-22]** Avoid auto-dismissing timers on views and controls; prefer explicit dismissal.
  **Why** slow readers and assistive tech need time. **Applies to** web: toasts, carousels, session timeouts (WCAG 2.2.1). **Check** auto-advance carousels have pause; toast timers pause on focus/hover. **Source** https://developer.apple.com/design/human-interface-guidelines/accessibility

- **RULE [AH-AX-23]** Support Reduce Motion: remove or tone down zoom, scale, peripheral and repeating animation; use fades; see the motion note for the five tactics.
  **Why** vestibular disorders. **Applies to** web: `prefers-reduced-motion`. **Check** reduced-motion emulation has no translate/scale >= 8 px or looping animation. **Source** https://developer.apple.com/design/human-interface-guidelines/accessibility

- **RULE [AH-AX-24]** Provide an opt-out for flashing in video and avoid flashing/blinking UI.
  **Why** photosensitivity. **Applies to** web: WCAG 2.3.1. **Check** no content flashes > 3/s. **Source** https://developer.apple.com/design/human-interface-guidelines/accessibility

- **RULE [AH-AX-25]** A reduced, "simplified" mode (core features, one task per screen, bigger controls) should exist where cognitive load is a concern; ask for confirmation twice for hard-to-recover actions in that mode.
  **Why** cognitive accessibility (Assistive Access). **Applies to** web: simplified view option for senior or care contexts; most SaaS can skip. **Check** n/a (product decision). **Source** https://developer.apple.com/design/human-interface-guidelines/accessibility

- **RULE [AH-AX-26]** Write in plain, inclusive language: address people as "you/your" (not "the user"/"the player"), reserve "we/our" for the company, define or avoid technical terms, replace idioms and colloquialisms, and use humour sparingly.
  **Why** idioms and jargon exclude and translate poorly. **Applies to** web: all copy. **Check** copy lint for "the user", "users can", idiom list, readability grade <= 8 `[engine note]`. **Source** https://developer.apple.com/design/human-interface-guidelines/inclusion

- **RULE [AH-AX-27]** Pick a tone consistent with your audience; an academic tone excludes people with less formal education.
  **Why** tone signals who the product is for. **Applies to** web: all. **Check** visual/editorial review. **Source** https://developer.apple.com/design/human-interface-guidelines/inclusion

- **RULE [AH-AX-28]** Avoid unnecessary gender references and singular gendered pronouns; use plural or role nouns ("Subscribers can post recipes"); use nongendered figures for generic people; if gender must be collected, include non-binary, self-identify and decline options.
  **Why** inclusion and cleaner localisation. **Applies to** web: copy, avatars, forms. **Check** grep for "he/she/his/her/him" in UI strings; forms with gender field have more than two options. **Source** https://developer.apple.com/design/human-interface-guidelines/inclusion

- **RULE [AH-AX-29]** Show a range of people and settings; avoid stereotyped roles and avoid depictions of high affluence unless needed.
  **Why** people exclude themselves when they do not see themselves. **Applies to** web: marketing imagery, testimonials. **Check** editorial review. **Source** https://developer.apple.com/design/human-interface-guidelines/inclusion

- **RULE [AH-AX-30]** Do not base prompts, security questions or examples on culture- or ability-specific experiences (first car, favourite college subject); choose universal ones.
  **Why** context-specific questions exclude. **Applies to** web: onboarding, forms. **Check** editorial review. **Source** https://developer.apple.com/design/human-interface-guidelines/inclusion

- **RULE [AH-AX-31]** Write about disability people-first, avoid using disability as a negative metaphor, and do not assume a disability prevents someone from wanting a feature.
  **Why** respect and audience reach. **Applies to** web: copy. **Check** banned-phrase lint ("blind spot", "crippled", "lame" etc.) `[engine note]`. **Source** https://developer.apple.com/design/human-interface-guidelines/inclusion

- **RULE [AH-AX-32]** Support locale-specific formats for dates, time, numbers, currency and translated text lengths; use SF-style symbol sets that have RTL and script variants.
  **Why** internationalisation. **Applies to** web: `Intl.*` APIs; no hard-coded formats. **Check** grep for manual date/number formatting; test with pseudo-locale (+40% length). **Source** https://developer.apple.com/design/human-interface-guidelines/inclusion

- **RULE [AH-AX-33]** Mirror layout for right-to-left languages: use logical CSS properties (`margin-inline-start`, `padding-inline`, `inset-inline`, `text-align: start`) and `dir="rtl"`; let the platform flip standard components.
  **Why** system-wide approach reduces per-component work. **Applies to** web: all. **Check** grep for `margin-left|padding-right|left:|float:` in component CSS; replace with logical properties. **Source** https://developer.apple.com/design/human-interface-guidelines/right-to-left

- **RULE [AH-AX-34]** Align one- and two-line text to the interface direction, but align paragraphs (three or more lines) to their own language direction; reverse alignment of all items in a list together.
  **Why** mismatched alignment hides line beginnings. **Applies to** web: `dir="auto"`/`text-align: start` on user content; `unicode-bidi: plaintext`. **Check** paragraphs with mixed-language content use `dir=auto`. **Source** https://developer.apple.com/design/human-interface-guidelines/right-to-left

- **RULE [AH-AX-35]** Do not reverse the digits inside a number (541, phone, card numbers); do reverse the order of numerals that show a progression (progress bars, sliders, ratings, ordered sequences); never mirror the numerals themselves.
  **Why** numbers read in a fixed order even in RTL. **Applies to** web: use `dir="ltr"` islands for phone/card numbers; `unicode-bidi: isolate`. **Check** phone/card strings wrapped in `<bdi>` or `dir=ltr`. **Source** https://developer.apple.com/design/human-interface-guidelines/right-to-left

- **RULE [AH-AX-36]** Flip controls that show progress or order (sliders, progress bars, back/next, ordered thumbnails, forward/back icons); do not flip controls that mean an absolute direction ("right"), logos, universal marks (checkmark), real-world object icons (clock), or photos; flip icons that represent text or reading direction (text-alignment bars).
  **Why** meaning depends on direction. **Applies to** web: `[dir=rtl] .icon-chevron { transform: scaleX(-1) }`. **Check** icon allow-list of flippable glyphs; logos exempt. **Source** https://developer.apple.com/design/human-interface-guidelines/right-to-left

- **RULE [AH-AX-37]** Visually balance mixed-script UI: when Arabic or Hebrew sits next to uppercase Latin, enlarge the RTL text about 2 px.
  **Why** those scripts have no capitals and look small. **Applies to** web: bilingual UIs. **Check** `:lang(ar), :lang(he)` font-size +2 px near all-caps labels. **Source** https://developer.apple.com/design/human-interface-guidelines/right-to-left

- **RULE [AH-AX-38]** Provide localised variants of icons that include letters or words, and flip abstract text-line icons; do not use letters in icons for non-text concepts.
  **Why** letters do not translate. **Applies to** web: icon sets. **Check** icons with `<text>` elements flagged. **Source** https://developer.apple.com/design/human-interface-guidelines/right-to-left

- **RULE [AH-AX-39]** Colours have cultural meaning (white = mourning vs purity): verify per locale when colour communicates.
  **Why** a signal may invert. **Applies to** web: international launches. **Check** locale review. **Source** https://developer.apple.com/design/human-interface-guidelines/inclusion

- **RULE [AH-AX-40]** Give users the same functionality via keyboard-driven drag alternatives, and make data-entry mistakes recoverable (validation, undo).
  **Why** inclusive input. **Applies to** web: forms, sortable lists. **Check** see motion note AH-MO-37. **Source** https://developer.apple.com/design/human-interface-guidelines/entering-data

- **RULE [AH-AX-41]** (native-only) iPadOS: do not add keyboard navigation to buttons/segmented controls/switches (Full Keyboard Access handles it); visionOS: keep elements within the field of view, horizontal layouts, avoid head-anchored content, minimise large repetitive gestures; Accessibility Nutrition Labels on the App Store.
  **Why** platform-specific. **Applies to** native-only (on the web every control must be keyboard-focusable). **Check** n/a. **Source** https://developer.apple.com/design/human-interface-guidelines/accessibility

## 3. Numbers & scales

| Item | Value |
|---|---|
| Text enlargement support | at least 200% (140% watchOS) |
| Default / minimum text size | iOS 17 / 11 pt; macOS 13 / 10; visionOS 17 / 12; watchOS 16 / 12; tvOS 29 / 23 |
| Contrast (WCAG AA mapping) | up to 17 pt: 4.5:1; 18 pt: 3:1; bold: 3:1 |
| Default / minimum control size | iOS 44 / 28; macOS 28 / 20; tvOS 66 / 56; visionOS 60 / 28; watchOS 44 / 28 (pt) |
| Padding around controls | about 12 pt (bezelled) / 24 pt (unbordered) |
| Dark mode contrast floor / target | 4.5:1 / 7:1 |
| RTL script size adjustment | about +2 pt for Arabic/Hebrew beside capitals |
| Modifier order in shortcuts | Control, Option, Shift, Command |
| Assistive Access guidance | one interaction per screen; ask twice for hard-to-recover actions |
| Flash threshold (engine, WCAG) | <= 3 per second |

## 4. Dos and Don'ts
- **Do** label the icon-only trash button "Delete invoice"; **Don't** leave `aria-label` empty or "button".
- **Do** write "Subscribers can post recipes"; **Don't** write "A subscriber can post his or her recipes".
- **Do** keep "541" as 541 in RTL; **Don't** render it 145.
- **Do** flip a back chevron in RTL; **Don't** flip the brand logo or a checkmark.
- **Do** use "June 6"; **Don't** put "6/6" in a chart label.
- **Do** announce "3 results loaded" in a live region; **Don't** silently swap the list.

## 5. Exceptions & judgement calls
- **Large-text contrast.** Apple's "18 pt = 3:1" table is looser than WCAG for regular-weight 18-23 px text; use WCAG's large-text definition on the web (conflict with `AH` table, not with the engine).
- **Toasts.** Apple says minimise time-boxed UI; `web/courses-and-curricula.md` uses 4 s auto-dismiss toasts. Keep the compromise from the motion note: pause on hover/focus, never the only place an error is shown.
- **Keyboard.** The iPadOS note ("avoid supporting keyboard navigation for buttons") is wrong for the web; all interactive elements must be Tab-reachable per WCAG 2.1.1. Treat it as native-only.
- **Shortcut labelling.** Apple's "Shift is implicit for upper characters" and modifier order rules are macOS conventions; on Windows/Linux web apps show Ctrl/Alt/Shift in the platform's order.
- **Confirm twice (Assistive Access)** is stricter than the engine's single confirm + undo pattern; apply only in a simplified mode.
- **Language rules vs engine copy rules.** "Avoid we" (Writing page) and "you/your" (Inclusion) should be reconciled with `web/copy-and-ux-writing.md` brand-voice freedom; engine marketing copy often uses "we". Apple's rule concerns system messages and UI, not brand storytelling.
- Apple recommends testing, not mechanically scoring, inclusion; the Checks above for language are lints that catch only the obvious cases.

## 6. Figures worth keeping
- Accessibility page: Assistive Access Camera layout (image) - an example of reduction to core function.
- Right-to-left page: icon flipping examples (cart with badge) - images only.

## 7. Open questions
- Apple's guidance does not give an exact contrast threshold for non-text elements (icons, borders); use WCAG 1.4.11 (3:1) from the engine.
- Pages with no rule content: `foundations`, `getting-started`.
