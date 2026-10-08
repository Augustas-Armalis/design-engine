---
source: web:https://developer.apple.com/design/human-interface-guidelines/layout (also designing-for-ios, scroll-views, sidebars, split-views, modality, sheets, popovers, boxes, collections, page-controls, accessibility, pointing-devices, buttons; fetched 2026-10-08)
chapter: Apple HIG - Layout, spacing, hit targets, adaptability, presentation containers
pages: n/a (web source)
topic_tags: [layout, spacing, hit-target, safe-area, size-class, adaptability, hierarchy, sidebar, modality, scroll, apple-hig]
status: studied
---

# Apple HIG - Layout and Spacing

Raw text: `corpus/web/apple-hig/{layout,designing-for-ios,scroll-views,sidebars,split-views,modality,sheets,popovers,boxes,collections,page-controls}.txt` (private). Written in my own words.

**What this source does not give.** The current Layout page publishes no numeric margin, gutter, column or spacing scale for iOS/macOS (the older "16 pt margins / 8 pt grid" tables are gone; the grid and margin diagrams are images). The only numbers are hit-target sizes, padding around targets (12 / 24 pt), safe-area insets on tvOS (60 / 80 pt), a visionOS 60 pt centre spacing, a macOS image-button 10 px padding, and counts (dots, tabs, segments, levels). Unit note: HIG pt equal CSS px for sizes in Safari and on macOS (1:1); mark `[engine note]`.

## 1. Core ideas
1. Hierarchy follows reading order: the most important things sit top and leading (in the reading direction), and alignment/indent/group cues express relations.
2. Progressive disclosure: show the essential first, hide advanced options behind disclosure, menus or nested views.
3. Controls and content are different layers. Controls float (glass) over content; do not put a solid fill behind them; let content extend underneath.
4. Layout decisions should depend on available space (size classes), never on device type or orientation, because windows resize freely.
5. Functionality stays the same across sizes; what changes is how much is visible (e.g. tab bar becomes sidebar, overflow items become visible).
6. Text size, language length and direction are layout inputs: rows must be able to grow, adjacent items must be able to stack.
7. Hit area and spacing are accessibility: 44 x 44 default on touch with 12-pt padding around bezelled controls and about 24 pt around borderless ones; the visible shape can be smaller than the hit region.
8. On handheld devices, the middle and bottom of the screen are easiest to reach, so key controls and swipe gestures live there.
9. Modal and transient containers (sheets, popovers, alerts) are for scoped tasks; one at a time; always with an obvious exit; avoid them in compact widths (popover to sheet).
10. A box groups related controls; keep it small relative to its container and avoid nesting boxes.

## 2. Rules

- **RULE [AH-LA-01]** Order content by importance: put the most important item near the top and leading side (top-left in LTR), because people scan in reading order.
  **Why** reading order sets attention order. **Applies to** web: landing page, SaaS app UI; mirror in RTL. **Check** primary CTA / key data node has the smallest `y` and the leading-most `x` among sibling blocks in its container; visual. **Source** https://developer.apple.com/design/human-interface-guidelines/layout

- **RULE [AH-LA-02]** Align related elements on a shared edge and use indentation only to mean "subordinate to the item above".
  **Why** people read alignment as relation and indentation as hierarchy. **Applies to** web: all. **Check** left edges of siblings in a stack share x within 1 px; indented items follow a parent. **Source** https://developer.apple.com/design/human-interface-guidelines/layout

- **RULE [AH-LA-03]** Group related items with negative space, a container shape or a separator line; keep unrelated groups apart.
  **Why** proximity and enclosure express relatedness. **Applies to** web: all. **Check** inter-group gap > intra-group gap by at least 1.5x. **Source** https://developer.apple.com/design/human-interface-guidelines/layout

- **RULE [AH-LA-04]** Use progressive disclosure: show the primary controls, reveal advanced content via disclosure triangles, menus, nested views or scrollable sections.
  **Why** too many choices make everything harder to find. **Applies to** web: settings, forms, dashboards. **Check** count of visible controls per view (heuristic <= 7 primary controls) `[engine note]`; advanced fields collapsed by default. **Source** https://developer.apple.com/design/human-interface-guidelines/layout

- **RULE [AH-LA-05]** Differentiate controls from content structurally: do not place a solid or semi-opaque background under floating bars; let content run underneath and use a fade/blur edge for legibility. Extend full-screen background content beneath the bars.
  **Why** keeps chrome light and reinforces the layer split. **Applies to** web: sticky nav/footer bars; native-only parts: system Liquid Glass. **Check** hero/background extends behind the sticky header (header `position: sticky/fixed` with transparent background + gradient mask). **Source** https://developer.apple.com/design/human-interface-guidelines/layout

- **RULE [AH-LA-06]** Decide layout from available space (container width/height classes), not from device model, orientation or user-agent.
  **Why** windows resize (split-screen, window resize, mirroring), so orientation says nothing about space. **Applies to** web: use container queries and width breakpoints; no UA sniffing. **Check** grep for `userAgent`/`navigator.platform`/`orientation` driving layout: 0 hits; layouts defined by `@container` or `min-width` queries. **Source** https://developer.apple.com/design/human-interface-guidelines/layout

- **RULE [AH-LA-07]** Design for all four combinations of narrow/wide width x short/tall height, not just portrait phone and landscape desktop.
  **Why** an app designed for compact-portrait leaves space unused when widened; the reverse crams. **Applies to** web: test 390x844, 844x390 (landscape phone), 768x1024, 1280x800, 1920x1080, and a wide-short window (1200x500). **Check** Playwright viewport matrix; no overflow, no unusable empty area. **Source** https://developer.apple.com/design/human-interface-guidelines/layout

- **RULE [AH-LA-08]** Keep functionality identical across sizes; change only how much is visible (e.g. bottom tab bar becomes a sidebar; overflow items become visible actions when there is room).
  **Why** a feature that vanishes at some widths breaks trust and muscle memory. **Applies to** web: responsive nav and toolbars. **Check** set of reachable actions at 390 px equals set at 1440 px (via DOM accessibility tree diff). **Source** https://developer.apple.com/design/human-interface-guidelines/layout

- **RULE [AH-LA-09]** Respect safe areas so system UI, notches, rounded corners and home indicators never cover content or controls: `env(safe-area-inset-top|right|bottom|left)` with `viewport-fit=cover`.
  **Why** hardware cut-outs and OS bars occlude content in the edge strips. **Applies to** web: fixed/sticky bars, full-bleed layouts on mobile. **Check** fixed bottom bar has `padding-bottom: env(safe-area-inset-bottom)`; Playwright iPhone emulation shows no overlap. **Source** https://developer.apple.com/design/human-interface-guidelines/layout

- **RULE [AH-LA-10]** Keep text inside a readable width (layout guide) rather than stretching to the full window.
  **Why** system layout guides restrict text width for readability. **Applies to** web: article/body copy (`max-width: 60-75ch`; the HIG gives no number). **Check** computed paragraph width <= 75ch. **Source** https://developer.apple.com/design/human-interface-guidelines/layout

- **RULE [AH-LA-11]** When text size or translations grow, let rows grow, stack adjacent items vertically, drop columns, and avoid fixed heights.
  **Why** horizontally adjacent items crowd text and cause truncation. **Applies to** web: all. **Check** 200% zoom / long-string pseudo-localisation (+40% length): no overlap or clip. **Source** https://developer.apple.com/design/human-interface-guidelines/layout

- **RULE [AH-LA-12]** Preview on several devices, size classes, localisations and text sizes; start with the largest and smallest layouts.
  **Why** the extremes reveal most clipping bugs. **Applies to** web: QA matrix. **Check** automated screenshot suite includes min and max viewport + 200% zoom + one long locale + one RTL locale. **Source** https://developer.apple.com/design/human-interface-guidelines/layout

- **RULE [AH-LA-13]** Scale background artwork to fill the screen without changing its aspect ratio; expect crops on very wide-short or tall-narrow windows, so put essential subject matter inside a central safe zone.
  **Why** letterboxing and distortion both look broken. **Applies to** web: hero imagery (`object-fit: cover`, `object-position`). **Check** hero `img` has `object-fit: cover`; subject remains visible at 5 aspect ratios. **Source** https://developer.apple.com/design/human-interface-guidelines/layout

- **RULE [AH-LA-14]** Touch controls must have a hit region of at least 44 x 44 px (default); never below 28 x 28 px; on dense desktop UI 28 x 28 default / 20 x 20 minimum.
  **Why** Apple's published defaults and minimums by platform: iOS/iPadOS 44 / 28, macOS 28 / 20, tvOS 66 / 56, visionOS 60 / 28, watchOS 44 / 28. **Applies to** web: coarse pointer UIs 44; fine pointer UIs 24-28 (WCAG 2.2 AA is 24). **Check** `getBoundingClientRect` of every interactive element >= 44x44 under `(pointer: coarse)` emulation; >= 24 (target ≥ 28) otherwise; the clickable area may be larger than the visible shape via padding or `::after`. **Source** https://developer.apple.com/design/human-interface-guidelines/accessibility

- **RULE [AH-LA-15]** Space controls by padding: about 12 px around elements that have a visible bezel (filled/bordered), about 24 px around the visible edges of elements without a bezel (text-only buttons, icons).
  **Why** reduces mis-taps; borderless targets have fuzzier visible edges. **Applies to** web: toolbars, icon rows, link lists on touch. **Check** distance between adjacent interactive hit boxes >= 12 px (bezelled) / >= 24 px visible-edge gap (unbordered) on coarse pointer. **Source** https://developer.apple.com/design/human-interface-guidelines/accessibility

- **RULE [AH-LA-16]** Treat size and spacing as equally important: a 44-px target packed with 4 px gaps still mis-taps.
  **Why** Apple pairs the size table with the padding rule. **Applies to** web: all. **Check** hit-box overlap = 0; gaps as above. **Source** https://developer.apple.com/design/human-interface-guidelines/accessibility

- **RULE [AH-LA-17]** Make hit regions of adjacent custom bar buttons contiguous (no dead gaps) so hover states and pointer cursor do not flicker.
  **Why** gaps cause the cursor/hover to revert between buttons. **Applies to** web: toolbar and segmented groups. **Check** adjacent button rects touch or overlap within 1 px; gap handled by inner padding. **Source** https://developer.apple.com/design/human-interface-guidelines/pointing-devices

- **RULE [AH-LA-18]** Give image buttons about 10 px padding between the image edge and the button edge, since the button's boundary is the clickable area even when invisible.
  **Why** clicks near but outside a glyph still register. **Applies to** web: icon-only buttons (mac-style); on touch use 44 px. **Check** padding of icon buttons >= 10 px each side. **Source** https://developer.apple.com/design/human-interface-guidelines/buttons

- **RULE [AH-LA-19]** Put frequently used controls in the middle and bottom of phone screens and support swipe-to-go-back and row swipe actions; keep the number of on-screen controls small and make secondary actions discoverable with minimal interaction.
  **Why** one- or two-handed use makes the top corners hard to reach. **Applies to** web: mobile web (bottom nav, sheet actions) and native; desktop N/A. **Check** primary mobile actions placed within the bottom 60% of the viewport; visual. **Source** https://developer.apple.com/design/human-interface-guidelines/designing-for-ios

- **RULE [AH-LA-20]** Avoid placing controls or critical information at the very bottom of a desktop window or sidebar, and avoid showing content behind the camera housing at the top.
  **Why** users routinely drag windows so the bottom edge is off-screen. **Applies to** native-only (macOS); the web analogue is "important content must be visible without needing a very tall viewport". **Check** n/a. **Source** https://developer.apple.com/design/human-interface-guidelines/layout

- **RULE [AH-LA-21]** Use multi-pane (split view) layouts only at regular width; on compact width collapse to a single pane with navigation.
  **Why** multiple panes in a narrow window force wrapping and truncation. **Applies to** web: master-detail, sidebar layouts: collapse below about 768 px `[engine note]` (the HIG names no px threshold). **Check** at 390 px only one pane visible; at >= 1024 px >= 2 panes. **Source** https://developer.apple.com/design/human-interface-guidelines/split-views

- **RULE [AH-LA-22]** Persistently highlight the current selection in each pane that leads to the detail, and set min/max pane sizes so the divider stays visible.
  **Why** keeps orientation in multi-pane navigation; a collapsed pane makes the divider disappear. **Applies to** web: resizable panels (min-width on panels; thin 1 px divider). **Check** active row has `aria-current`/selected style; panel min-width set. **Source** https://developer.apple.com/design/human-interface-guidelines/split-views

- **RULE [AH-LA-23]** Prefer a thin divider (1 px) for resizable panes unless adjacent content has strong linear patterns.
  **Why** more room for content while still grabbable. **Applies to** web: split panes. **Check** divider visible width 1 px with a larger invisible hit area (>= 8 px, `[engine note]`). **Source** https://developer.apple.com/design/human-interface-guidelines/split-views

- **RULE [AH-LA-24]** A sidebar shows at most two levels of hierarchy; for deeper structure insert a content list between sidebar and detail. Let people hide it, but never hide it by default.
  **Why** deep sidebars become unscannable; a hidden-by-default sidebar is undiscoverable. **Applies to** web: app navigation. **Check** depth of nav tree <= 2 in the sidebar; sidebar visible on first load at >= 1024 px. **Source** https://developer.apple.com/design/human-interface-guidelines/sidebars

- **RULE [AH-LA-25]** Avoid popovers in compact widths; use a full-screen sheet instead, and reserve popovers for wide layouts. Show one popover at a time, never nested, never covered by another view (an alert may cover it).
  **Why** popovers need room and an arrow to the source; stacks add clutter. **Applies to** web: popover/menus under 640 px -> bottom sheet (`[engine note]` threshold). **Check** open popover count <= 1; below breakpoint popovers render as sheets. **Source** https://developer.apple.com/design/human-interface-guidelines/popovers

- **RULE [AH-LA-26]** Make a popover only as big as its content, animate size changes between condensed and expanded views, and let outside-click dismiss save work rather than discard it.
  **Why** abrupt jumps look like a different popover; accidental dismissal must not lose input. **Applies to** web: popover/Floating UI. **Check** popover has `max-width` fitting content; resize uses transition; autosave on close. **Source** https://developer.apple.com/design/human-interface-guidelines/popovers

- **RULE [AH-LA-27]** Show only one sheet at a time from the main interface; if a sheet opens another, close the first before showing the second.
  **Why** returning from stacked sheets disorients. **Applies to** web: dialogs and drawers. **Check** `dialog[open]` count <= 1 (alerts excepted). **Source** https://developer.apple.com/design/human-interface-guidelines/sheets

- **RULE [AH-LA-28]** Support swipe-down to dismiss a sheet on mobile, offer a grabber on resizable sheets, and rest at two heights: full and about half (medium). If the sheet has unsaved edits when dismissed by swipe, confirm with an action sheet.
  **Why** people expect vertical swipe dismissal; the grabber makes resizing discoverable and accessible. **Applies to** web: mobile bottom sheets (vaul-style); desktop dialogs use Esc and close button. **Check** sheet has a grabber, snap points [~50%, 100%], and `Escape`/close control. **Source** https://developer.apple.com/design/human-interface-guidelines/sheets

- **RULE [AH-LA-29]** Keep modal tasks short and simple; avoid making the modal feel like an app within the app (no deep navigation); give a title that names the task and always an obvious dismissal.
  **Why** people lose track of the suspended task. **Applies to** web: dialogs, wizards. **Check** modal depth 1; modal has heading and visible close/cancel; steps <= 4 `[engine note]`. **Source** https://developer.apple.com/design/human-interface-guidelines/modality

- **RULE [AH-LA-30]** Do not nest scroll views that scroll in the same direction; nested scrollers with different axes are fine.
  **Why** same-axis nesting is unpredictable. **Applies to** web: panels with `overflow:auto` inside scrolling pages. **Check** no element with `overflow-y: auto` ancestor with same; `overscroll-behavior: contain` if intentional. **Source** https://developer.apple.com/design/human-interface-guidelines/scroll-views

- **RULE [AH-LA-31]** Signal scrollability: let partial content peek at the trailing edge, since scroll indicators are not always visible. Preserve native scrolling behaviour, keyboard scrolling and elasticity.
  **Why** hidden overflow is not discoverable. **Applies to** web: carousels, horizontal tab rows, tables. **Check** horizontally scrollable containers show a partially clipped last item or a fade. **Source** https://developer.apple.com/design/human-interface-guidelines/scroll-views

- **RULE [AH-LA-32]** For page-by-page scrolling subtract an overlap (a line, a row, part of a picture) from the page size to preserve context, and show page dots only if you hide the scroll indicator on that axis.
  **Why** exact-page jumps lose the reader's place; two indicators on one axis are redundant. **Applies to** web: carousels with scroll-snap (`scroll-padding`, partial next item). **Check** `scroll-snap-type` containers show peek; dots count equals snap points. **Source** https://developer.apple.com/design/human-interface-guidelines/scroll-views

- **RULE [AH-LA-33]** Auto-scroll only when relevant content is out of view (search match, insertion point, drag selection beyond edge), and only as far as needed to retain context.
  **Why** unexpected movement is disorienting. **Applies to** web: in-page search, form errors (`scrollIntoView({block:'nearest'})`). **Check** `scrollIntoView` calls use `nearest` unless the element is off-screen. **Source** https://developer.apple.com/design/human-interface-guidelines/scroll-views

- **RULE [AH-LA-34]** If zoom is supported, set sensible min and max scale; do not allow zooming until one character fills the screen.
  **Why** unlimited zoom is not useful. **Applies to** web: image viewers, maps. **Check** `maxScale`/`minScale` configured on zoom components; never `user-scalable=no` on text pages (accessibility). **Source** https://developer.apple.com/design/human-interface-guidelines/scroll-views

- **RULE [AH-LA-35]** Keep a virtual keyboard from covering the focused input: use the keyboard layout guide so important UI stays visible and custom accessory controls sit at standard padding above the keyboard.
  **Why** the keyboard takes about half the screen. **Applies to** web: mobile forms (`interactive-widget=resizes-content`, `visualViewport`, `scrollIntoView` on focus). **Check** Playwright mobile: focused field fully visible with keyboard open. **Source** https://developer.apple.com/design/human-interface-guidelines/virtual-keyboards

- **RULE [AH-LA-36]** Keep a box small relative to its container; do not nest boxes to express subgroups, use padding and alignment inside a single box.
  **Why** large or nested boxes stop signalling grouping and crowd the layout. **Applies to** web: cards and panels. **Check** card-in-card nesting depth <= 1; card area < ~60% of its container `[engine note]`. **Source** https://developer.apple.com/design/human-interface-guidelines/boxes

- **RULE [AH-LA-37]** Prefer a standard row or grid for collections of images; add enough padding that hover/focus effects do not overlap neighbours; avoid dynamic layout changes while people are interacting unless user-triggered.
  **Why** custom arrangements draw attention to themselves; reflow while viewing loses place. **Applies to** web: galleries, card grids. **Check** `gap` >= focus-ring offset + scale overhead; no layout-shift events after load (CLS). **Source** https://developer.apple.com/design/human-interface-guidelines/collections

- **RULE [AH-LA-38]** Centre a page control horizontally near the bottom of its view; keep the dot count to about 10 or fewer.
  **Why** more than about 10 dots cannot be counted at a glance; use a grid instead. **Applies to** web: carousels. **Check** dots <= 10; dots container centred with `margin-inline:auto`. **Source** https://developer.apple.com/design/human-interface-guidelines/page-controls

- **RULE [AH-LA-39]** (native-only) tvOS: inset primary content 60 pt from top and bottom and 80 pt from sides; grids of 2-9 columns with enough gap to allow focus growth; keep partially hidden off-screen rows symmetric. visionOS: keep centres of buttons at least 60 pt apart; add 4 pt padding around 60+ pt buttons; keep content horizontally centred at very large window sizes. watchOS: at most three glyph buttons or two text buttons per row.
  **Why** overscan, focus enlargement, gaze targeting and tiny screens. **Applies to** native-only. **Check** n/a. **Source** https://developer.apple.com/design/human-interface-guidelines/layout

## 3. Numbers & scales

| Item | Value |
|---|---|
| Default / minimum control size | iOS, iPadOS 44x44 / 28x28; macOS 28x28 / 20x20; tvOS 66x66 / 56x56; visionOS 60x60 / 28x28; watchOS 44x44 / 28x28 (pt) |
| Button hit region (Buttons page) | at least 44x44 pt (visionOS 60x60) |
| Padding around bezelled elements | about 12 pt |
| Padding around elements without a bezel | about 24 pt |
| Pointer hit-region padding (iPadOS) | same 12 / 24 pt |
| macOS image button padding | about 10 px |
| tvOS safe area | 60 pt top and bottom, 80 pt left and right |
| visionOS button centre spacing | at least 60 pt; plus 4 pt padding for buttons >= 60 pt |
| visionOS button sizes | mini 28, small 32, regular 44, large 52, extra large 64 (pt) |
| Page-control dots | about 10 max |
| Segmented control segments | about 5-7 wide screens, about 5 on iPhone |
| Tab view tabs (macOS) | 6 max |
| Sidebar hierarchy depth | 2 levels |
| Sheet detents | large (full) and medium (about half the large height) |
| Toolbar groups | about 3 max; titles under 15 characters |
| Tooltip text | 60-75 characters |
| Size classes | compact / regular, horizontal x vertical |
| Image scale factors | iOS @2x @3x; iPadOS @2x; macOS @1x @2x; tvOS @1x @2x |
| Safe-area unit mapping | HIG pt = CSS px (Safari/macOS) |

## 4. Dos and Don'ts
- **Do** hide a 16-px icon inside a 44-px tap target; **Don't** shrink the target with the glyph.
- **Do** extend a hero image behind a floating nav; **Don't** put a solid white bar over it.
- **Do** swap the popover for a full-screen sheet on a phone; **Don't** shrink the popover to fit.
- **Do** show one dialog; **Don't** open a second dialog on top of the first.
- **Do** let a list row grow to three lines at large text; **Don't** clamp row height and clip.

## 5. Exceptions & judgement calls
- **Hit target conflict.** Apple 44 default / 28 minimum vs engine `web/tokens-spacing-radius-sizing.md` (`--hit-min-fine: 24px`, `--hit-min-coarse: 44px`) and `web/courses-and-curricula.md` rule (24 desktop, 44 mobile). Apple's 28 floor is stricter than WCAG 2.5.8's 24; use 44 coarse, 28-32 fine, 24 only where dense. Aligned with existing rule; add 28 as the "recommended minimum, fine pointer".
- **Spacing around targets.** Apple's 12 / 24 rule is not in the engine; adopt for touch UIs (it exceeds WCAG 2.5.8 spacing exception).
- **Layout margins/grid.** Apple publishes no px margin scale now; the engine's 4/8 px lattice (`web/tokens-spacing-radius-sizing.md`) stands. Do not cite Apple for margin values.
- **Orientation-independent layout** agrees with container-query guidance in `web/implementation-craft.md`; no conflict.
- **Popover to sheet** thresholds (Apple says "compact vs regular") have no px values; 640/768/1024 px are engine choices.
- Apple permits a nonmodal sheet (iOS) and a detachable popover (macOS): web analogues are "sheet that does not block the page" and "pop-out panel"; use only where the parent task needs to continue.
- Apple warns that "a layout designed only for landscape iPhone wastes iPad space"; same applies to desktop-only landing pages on ultra-wide screens (cap content width and background).

## 6. Figures worth keeping
- Layout page: size class diagram, safe area diagram, and tvOS grid layouts (2-9 column) - images only; consider pulling from Apple Design Resources if grids are needed.

## 7. Open questions
- No numeric content margins from Apple for iOS/macOS in the JSON; the visual grid references are images.
- Pages with no extractable rule content: `foundations`, `components`, `patterns`, `getting-started`, `inputs` (index pages).
