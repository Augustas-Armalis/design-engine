# Product-studio kit

The craft layer behind the **Sellify Video Ad Creator studio** (ENG-2079 / ENG-2105 round 2), rebuilt brand-neutral. Round 1 of the guided set was rejected as "super super bad and inconsistent and just the ugliest" because it used its own stylesheet; round 2 was built only from the studio kit. This kit packages that grammar so the next in-app job starts from it, the way `system/kits/product-hero/` does for marketing heroes. Evidence and every number: `knowledge/web/affectui-product-kit.md` (AK-01..32). Flow rules for generation and approval screens: `knowledge/web/approval-and-generation-ui.md` (APR-01..18).

## When to use it

- **Use it for** in-app product UI: multi-step flows, generation and approval screens, libraries, settings-like forms, review screens, anything that sits inside an app shell.
- **Do not use it for** marketing heroes or landing pages (use `system/kits/product-hero/`), or for dashboards that need a data-dense table grammar (affectUI's CRM/analytics screens run 8px radii and 450-weight tables; see AK-16).
- **Inside an existing client app, the app's own kit wins.** If the host already has an accepted kit (Sellify: `video-ad-studio.module.css` + `StudioPanel`), build from that, not from this copy (founder 2026-10-15). Use this kit to start a new app, or to bring a host app to the same grammar by mapping its tokens (below).

## Files

| file | what it is |
|---|---|
| `studio.css` | plain CSS, no build step: token blocks (light, dark, OS-following dark), every component class, breakpoints 1100 / 860 / 520, reduced motion, continuous corners |
| `StudioPanel.tsx` | dependency-free React shells: `StudioTopbar`, `StudioSteps`, `StudioPanel`, `StudioStatus` (+ `studioStatusTone`), `StudioMedia`, `StudioGrid`, `StudioFooter` |
| `preview.html` | static specimen of every component in light and dark; open it from disk and screenshot it after any change |

## Install

**Plain CSS / Vite.** Copy the folder into the app (`src/studio/`), import `studio.css` once at the root, render screens inside `<main className="studio">`. Fonts come from the host (`--studio-font` defaults to `inherit`).

**Next.js + Tailwind v4.** Import `studio.css` in `app/globals.css` after `@import "tailwindcss";` (or in the root layout). The kit does not use Tailwind and does not conflict with it; keep Tailwind for page layout and use the kit classes for the studio grammar. Do not restyle kit classes with utility classes (`p-*`, `rounded-*`): change a token instead. With coss ui / Base UI owners, keep their behaviour and pass the kit look through classes (`className="studio-btn" data-variant="primary"`, `render={<a className="studio-back" />}`) rather than rebuilding them.

**React.** `import { StudioPanel, StudioStatus, ... } from './studio/StudioPanel'`. Icons, buttons and menus are passed in as `ReactNode`; the module imports nothing but React types.

## Token contract

Map these onto the host's tokens in one block (after `studio.css`). Everything else derives from them. Do not map only light: give the dark block the same treatment.

| token | role | default light / dark |
|---|---|---|
| `--studio-canvas` | page, sticky bar fill | `#ffffff` / `#0c0c0d` |
| `--studio-tray` | section tray, media placeholder, field fill on the canvas | `#f0f0f0` / `#121213` |
| `--studio-card` | white card, pills, chips, menus, dialogs | `#ffffff` / `#19191b` |
| `--studio-field` | field fill inside cards and dialogs (tray mixed 55% toward card) | mix / `#1f1f21` |
| `--studio-ink`, `--studio-ink-2`, `--studio-ink-3` | primary, secondary, tertiary text | `#171717 #5f5f5f #6b6b6b` / `#ededed #a1a1a1 #8f8f8f` (affectUI measures #737373/#8f8f8f; darkened so 12-14px meta passes 4.5:1, AK-33) |
| `--studio-ring` | the 1px edge of trays, cards, dividers | ink 8.5% / white 7% |
| `--studio-edge` | control edge (secondary button, chip, back tile, overlay ring) | ink 14% / white 10% |
| `--studio-edge-field`, `--studio-edge-strong` | field edge in cards, hover edge | ink 10%, 18% / white 10%, 12% |
| `--studio-hover`, `--studio-hover-row`, `--studio-track` | hover tint, list row hover, segmented track | ink 4%, 2%, 5% / white 7%, 2%, 5% |
| `--studio-accent` (+ `-soft`, `-edge`, `-text`) | live work, current step index, progress, checked items | `#2f6bff`; text `#2458e0` / dark `#6b9bff` |
| `--studio-success`, `--studio-danger` (+ `--studio-danger-text`) | status dots, errors | `#2f9e5b #e5484d` (text `#c9353a`) / `#5ee5b5 #ff8a99` |
| `--studio-focus` | 2px focus ring; must reach 3:1 on the card | `#1d93d2` |
| `--studio-select` | ring on selected media and picked rows | ink |
| `--studio-primary`, `-hover`, `-fg`, `-shadow` | primary button | `#171717 #2c2d2f #fff` / `#ededed #e4e4e7 #121213` |
| `--studio-overlay-shadow`, `--studio-scrim` | the one overlay edge + drop, modal scrim | see `studio.css` |
| `--studio-font` | font family | `inherit` |
| `--studio-chrome`, `--studio-bar-pad-end(-sm)` | host chrome above the scroll area; room for a bottom-right launcher | `0px`, `24px`, `16px` |

Worked example, the Sellify mapping (warm neutrals, orange signal):

```css
:root {
  --studio-canvas: var(--ds-surface-canvas);
  --studio-tray: var(--ds-surface-work);
  --studio-card: var(--ds-surface-raised);
  --studio-ink: var(--ds-text-primary);
  --studio-ink-2: var(--ds-text-secondary);
  --studio-ink-3: var(--ds-text-tertiary);
  --studio-ring: var(--ds-border-subtle);
  --studio-edge: var(--ds-border-control);
  --studio-accent: var(--ds-brand-signal);
  --studio-primary: var(--ds-action-bg);
  --studio-primary-hover: var(--ds-action-bg-hover);
  --studio-primary-fg: var(--ds-action-fg);
  --studio-primary-shadow: var(--ds-action-shadow);
  --studio-bar-pad-end: 84px;
}
```

Theme switching: the dark tokens apply under `[data-theme="dark"]` or `.dark` (on `<html>` or any island), and follow the OS when `<html>` has neither `data-theme="light"` nor `.light`. A light-only host sets `data-theme="light"` on `<html>`.

## Components and anatomy

| component | class / React | anatomy (numbers in AK rules) |
|---|---|---|
| Page | `.studio` | max 1200, padding 24 (16 under 860), white canvas |
| Work canvas | `.studio-canvas` > `.studio-work` + `.studio-aside` | `1fr 316px`, gap 16; aside sticky 16; 280 under 1100; one column under 860 (`data-aside-first` puts the preview on top) |
| Topbar | `StudioTopbar` / `.studio-topbar` | 36 back tile r12, 12px eyebrow over an 18/500 title, status + actions right |
| Step tray | `StudioSteps` / `.studio-steps` | tray r16 pad 4; steps 52 tall r12; white current pill; index 24 r8 (todo white, done 7% ink, current accent soft); caption ellipsizes; under 860 only the current step shows text |
| Section | `StudioPanel` / `.studio-tray` + `.studio-strip` + `.studio-card` + `.studio-footer-strip` | tray pad 4 r20; strip min 44 (16px icon, 14/500 title, soft meta, action right); card r16 pad 16 (`body="flush"` for lists, `"bare"` for grids of cards); footer strip min 44, 12px |
| Status | `StudioStatus` / `.studio-status[data-tone]` | 24 tall, r8, 6px dot, 12/500; tones neutral, success, error, live (pulses); labels from `StudioStatusLabel` |
| Segmented | `.studio-segmented` > `.studio-segmented-option` | track 36 pad 3 r12, options 30 r9, 14/500; selected = white pill with 0.5px ring + soft lift; `data-fill`, `data-wrap`, `data-tall` (label + hint), optional sliding `.studio-segmented-pill` (`data-slide`, set `--studio-pill-x/-w`) |
| Media | `StudioMedia` / `.studio-media` | 3:4 r12 (`ratio="tall"` 9:16; `size` xs 36 / sm 48); chip top-left 8; tag bottom-left on a shade; `pending` blurs; `generating` adds the 2.4s sweep; selected = 2px gap + 1.5px ring |
| Pickable tile | `.studio-tile` (button) | media + name (14/500, ellipsis) + meta (12); `aria-pressed` = selected; hover = 1px strong ring, no zoom; `.studio-tile-actions` stack under 280px |
| Library card | `.studio-library-card` | cover, `.studio-library-open` overlay link (one tab stop), foot with name + meta + `.studio-library-menu`; grid opens with `.studio-create-tile` (dashed, 3:4) |
| Grid | `StudioGrid` / `.studio-grid` | `data-count` = min(items, 4), then 3 / 2 / 1 at 1100 / 860 / 520; `data-fill="library"` 176, `"tall"` 150, `"tile"` 200 |
| List | `.studio-list` > `li` > `.studio-row` | one flush card; rows min 60, padding 10 16; inset dividers; `.studio-thumb` square 36 / 44 (`lg`) / 56 (`xl`) r10; `data-interactive` hover, `data-selected` rings the thumb |
| Fields | `.studio-field` > `.studio-label` + `.studio-input / .studio-textarea / .studio-select` + `.studio-hint` | 36 tall r12, padding 12; label 14/500, 8 above; hint 12, 6 below; `.studio-fields` 2 columns, gap 16 / 12; grey work fill, never white on white |
| Buttons | `.studio-btn` `data-variant="primary|ghost"` (default secondary) | 36 r12, padding 16 (12 with an icon), gap 6, icon 16, 14/500; `data-size="compact"` 32; `data-icon-only`; press 0.97; `.studio-btn-price` for a price inside the label |
| Sticky bar | `StudioFooter` / `.studio-bar` | last child of `.studio`; min 60, 1px top ring, canvas fill; context + cost left, actions right; rests on the bottom edge of a short page; wraps under 860 with the price visible |
| Dialog | `.studio-dialog` (+ `-header`, `-title`, `-description`, `-body`, `-footer`, `-close`), `.studio-scrim` | r20, pad 24, gap 18, 480 (`data-size="wide"` 560); title 18/500, description 14/450; Cancel ghost left of the primary; one edge |
| Menu / popover / select list | `.studio-menu` > `.studio-menu-item` | r12, pad 5, one edge; items 36 r9, 14/450 (`data-meta` 44); checked = 500 + accent check; max-height 60dvh (`data-kind="select"` 50dvh) |
| Also | `.studio-stats`, `.studio-progress`, `.studio-dropzone`, `.studio-link`, `.studio-in`, `.studio-step-in` | stat tiles r12 on tray grey; 4px / 6px progress; dashed drop zone r16; content in 240ms +4px; step change 220ms +6px |

## Light and dark

Same class names, same structure; only the tokens change. Dark lifts by fill steps (canvas `#0c0c0d` < tray `#121213` < card `#19191b` < field `#1f1f21`), keeps one light ring per box (white 7-10%), never stacks a ring with an inset top highlight, and inverts the primary to a pale fill with dark text. Imagery overlays (media tags, the sweep) are white-on-black in both themes. Check every screen in both before handoff.

## Content volume (founder rule, 2026-10-15)

- Grids count their items and wrap into rows; columns never shrink below their minimum and buttons never clip.
- Every name and meta line ellipsizes (or clamps to 2 lines) and keeps a `title`.
- Menus, popovers and option lists cap at 60dvh and scroll inside.
- A row of tiles keeps equal heights with actions pinned to the bottom.
- The sticky bar never covers the last row: `.studio` becomes a viewport-tall column and the element before the bar gets 16px clearance.
- Build preview states for 1, 4, 12 and 40 items, a 60-70 character name, empty, loading, error, mixed (some failed).

## Pre-handoff checklist

Run these on every state before showing anything (the founder should never be the one who finds a mismatch):

- [ ] Font sizes only 12 / 14 / 18; weights only 450 / 500 (overlay owners' 13px items and 17/600 titles overridden).
- [ ] Every text field, textarea, select trigger and custom picker trigger is 36 tall with radius 12 (rendered value; 14.4 where continuous corners are active).
- [ ] One edge per box and per overlay: no border + ring, no ring + inset highlight, owner overlay borders transparent.
- [ ] Hover, selected and focus follow AK-31; a 2px focus ring on everything focusable; `cursor: pointer` on every clickable.
- [ ] No horizontal scroll; no clipped button label (`scrollWidth <= clientWidth`); no text overflowing its box.
- [ ] Grids and lists tested at 1, 4, 12 and 40 items and with 60-character names.
- [ ] Rendered at 1440, 1100 and 390, light and dark; 2x screenshots read at full size against `preview.html` and the affectUI references.
- [ ] Reduced motion: no running animations, state changes intact.
- [ ] Audit script output attached to the delivery (the in-page audit in the preview run: sizes, weights, field heights/radii, clipped labels, missing pointers).

## Known gaps

See section 7 of `knowledge/web/affectui-product-kit.md`: dot chip vs icon badge for status (ask the founder), selected ring ink vs brand, dialog type, field row gap (16 here, 14 in the shipped kit), no danger button, empty state or skeleton recipe yet.
