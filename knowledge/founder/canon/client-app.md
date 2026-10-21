# Canon: UI inside an existing client app (Sellify first)

Decided defaults, 2026-10-21. A client app is bound to its own kit; divergence rules do not apply. This page absorbs the visual rules of `knowledge/founder/sellify-design-pass.md` (cited as `SDP L<n>`); that note keeps the process (latest main, report format, PR rules). Gate numbers: `system/canon/client-app.json` (Sellify values; another client gets its own JSON from its kit).

## Floor references
- **Sellify Video Ad Creator studio kit** (ENG-2079): `StudioPanel`, `StudioStatus`, step tray, `.gallery` / `.tile9` / `.libraryCard`, segmented control, list rows, sticky footer bar, owner components with `size="system"` / `appearance="system"` (L470). Spec: `work/sellify-video-ad-creator/DIRECTION.md`. Engine copy of the grammar: `system/kits/product-studio/` (`GUIDE.md`, `StudioPanel.tsx`, `preview.html`).
- Style reference: affectUI blocks, `knowledge/benchmarks/flohoeller/affectui-blocks-*` (L437).

## Reading set (5 files)
1. this page
2. `knowledge/founder/sellify-design-pass.md` (process + checklist)
3. `work/sellify-video-ad-creator/DIRECTION.md` (the spec)
4. the client's own kit files in its repo (for Sellify `video-ad-studio.module.css`, `components/ui` owners)
5. the last 5 ledger rounds + the ticket's own thread

## Decided numbers (Sellify)

| Part | Default | Source |
|---|---|---|
| Kit first | every new screen imports the app's kit; zero new tray, card, badge, stepper or choice-tile recipes | L470 |
| Container grammar | grey tray r20, 4px inset, 1px ring; title strip on the grey (plain 16px secondary icon + title 14/500 + soft meta + action right, never a black icon tile); white cards inside r16, 1px ink-alpha ring, no shadow; secondary info and actions on a tray footer strip | L437; Sellify DIRECTION |
| Type | Geist, sizes 12 / 14 / 18 only, weights 450 / 500 only, the app's own tracking tokens; no tracking or leading utility classes | L437, L472; SDP L29 |
| Radius | 12 / 16 / 20 (controls / cards / trays and dialogs); menu items r9 inside an r12 list (concentric); media r12; list thumbnails 44px r10 | SDP L29; Sellify DIRECTION; SDP L69 |
| Controls | one height per region: 36 (`size="system"`), radius 12; label 14/500, 8px to the control, 16px between fields, hint 12 at ~6px under the field | Sellify DIRECTION; L488; SDP L113 |
| Fields | never white on white: on a white surface a field is grey with a 1px border; inside a grey box inside a white overlay, fields are white | L491; SDP L125 |
| Borders | 1px everywhere; no 2px borders, outlines or rings at rest, focused or selected; focus = 1px focus-colour edge + soft 10% halo; selected = 1px orange edge + soft halo | SDP L101 |
| Borderless boxes | none: every filled box, list, value field or summary bar gets the quiet 1px border | SDP L65 |
| Overlays | exactly one edge (1px ring ~8% ink inside the overlay shadow token, border transparent); shadow `0 2px 4px -1px rgb(0 0 0/.06), 0 12px 28px -8px rgb(0 0 0/.14)`; max-height `calc(100dvh - 32px)` with one inner scroll; nesting alternates surfaces | L491 |
| Dialogs | header (title + one-line description), plain stacked fields, option rows like the Select menu (hover tint, check on the selected row, own scroll, ellipsis), footer with ghost Cancel left of the primary; no grey box inside, no uppercase labels, no tinted selected rows, no focus ring visible on open; confirm/cost dialogs carry a bordered summary box | L488; SDP L97 |
| Colour | brand orange (`--ds-brand-signal`, soft `--ds-brand-signal-soft`) for data, selected, active, running; green only for success feedback; a pill inside an orange-selected card is white with a quiet border | L479; SDP L29, L107 |
| Status | outlined chip with a coloured dot; done = quiet check, current = orange + motion, pending = grey ring; no black filled checks, no coloured icon tiles | L437; SDP L93 |
| Choices | options with descriptions = selectable option cards (icon, title, description, radio/check); segmented controls only for short labels | SDP L73 |
| Pills | one pill component: same height, padding, font; a row shares one centre line | SDP L77 |
| Media | 9:16 in galleries and preview, 3:4 library tiles, square list-row thumbs; real aspect ratios in review grids; kit player, never native `<audio controls>` | L437; SDP L117, L119 |
| Charts | brand orange, rounded bar caps (~6px on a 30px bar), dot legends, dashed quiet gridlines; match the nearest sibling chart | L479 |
| Space | no dead white space between related things; transient inputs open as an overlay on the item; page top offset = side gutter | L485; SDP L111 |
| Volume | 1 / 4 / 12 / 40 items, 60-character names, 2 / 5 / 12+ scenes, 8-step trays; nothing overflows its container | L473; SDP L89, L123 |
| Motion | state motion inside components (progress, current step, enter, selection), reduced-motion safe; no animated deliverables unless asked | SDP L93; L512 |

## Contradictions resolved

| Topic | Default | Superseded |
|---|---|---|
| Selected media ring | 1px orange edge + soft halo | Sellify DIRECTION "2px canvas gap + 1.5px ink ring" (SDP L101, 2026-10-20, is later) |
| Dialog type | title 14/500 or 18/500 from the scale, description 14 or 12 | Sellify DIRECTION "title 16/500, description 13" (L472: sizes within 12/14/18) |
| Light-app weights | 450 / 500 (the app's scale) | product-ui.md {500, 600} does not apply inside a client app |

## Never (rejected, with evidence)
- A screen from its own CSS module with 13px/600 type, filled badges, padded section boxes, bordered choice tiles (ENG-2105, ledger `2026-10-15-sellify-guided-avatars-r1`, "the ugliest sheeet in the world").
- Mismatched field radius or height (ENG-2079, L476 "NOT DOING FINAL CHECKS").
- Green stacked bars with square tops, green selected states (ENG-2080, L479).
- Popups with a boxed grey list, uppercase labels, tinted selected rows, an orange focus ring on open (L488); double borders and 50px haze shadows (L491).
- 2px borders anywhere (SDP L101); white inputs on white cards (L437, SDP L125).
- Black icon tiles in title strips; 9:16 slivers in list rows (L437).
- Redesigning over a teammate's logic, labels or flags (SDP L25).

## Pre-delivery checklist
1. Branch 0 behind `origin/main`; teammate commits in the area listed and adopted (SDP L25).
2. Every new screen imports the kit; grep the diff for new tray/card/badge recipes = 0.
3. Audit script (`studio.cjs AUDIT=1` or `gate.mjs --kind audit`): zero field height/radius mismatches, zero double edges, pointer cursor on every clickable.
4. Font sizes in {12, 14, 18}, weights in {450, 500}; radii in {9, 10, 12, 16, 20} per role.
5. Colour diff: new orange uses resolve to brand tokens; green only on success.
6. Every state at 1440, 1100, 390 and 1440 dark: steps, dialogs, popovers, empty, loading, error, long content, many items.
7. Sweep: the same class of drift fixed across the whole diff, listed in the report (L482).
8. Before/after on the real local route with real-looking data (SDP L37). Nothing pushed without a yes.

## Open
- Sellify dark-mode values are not recorded in the engine; read them from the app's tokens.
- Clients other than Sellify and Kaching: no kit is canonised yet.
