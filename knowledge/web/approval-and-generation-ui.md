---
source: web:Sellify Video Ad Creator studio kit spec (work/sellify-video-ad-creator/DIRECTION.md, ENG-2105 round 2, 2026-10-15) + founder verdicts (knowledge/founder/founder-taste.md, 2026-10-14/15) + ENG-2105 first-frame approval hand-over + competitor desk research (~/Documents/sellify sth/reusable-characters-research/RESEARCH.md)
chapter: Approval and generation UI: approval tiles, status chips, pending blur + sweep, redo with note and price, progress count, sticky cost footer, content volume, failure copy, final checks
pages: n/a (spec + verdicts + code hand-over)
topic_tags: [ai-generation, approval, tiles, status, badges, loading, skeleton, sweep, redo, cost, sticky-footer, grid, content-volume, empty-state, failure, forms, type-scale, radius, motion, saas-app-ui, consistency]
status: studied
---

# Approval and generation UI

The reusable screen pattern for anything AI-generated that a user approves before it is used or paid for: set images, first frames, character views, scenes, copy variants. Distilled from the Sellify Video Ad Creator studio kit (DIRECTION.md; ENG-2105 round 2 after round 1 was rejected as "super super bad and inconsistent and just the ugliest"), the founder's 2026-10-14/15 verdicts, the first-frame approval hand-over, and the competitor research (no competitor documents per-item approval, so this pattern is ours). Flow-level rules (anchor first, cost before commit, reuse) are in `ai-video-ad-creator-flows.md`; borders and nesting in `borders-and-nesting.md`.

## 1. Core ideas

1. **One tile, one decision.** Each generated item is a tile: the media, a status chip on the image, and exactly two actions (Approve, or Redo with a note). Per-item approval is the point; no approve-all (RESEARCH §4 step 3).
2. **Status is a closed vocabulary rendered by one component.** Approved, Generating / Making, Ready to review, Failed, Needs review, Your avatar, Saved, "n of N approved" (DIRECTION, `StudioStatus`). New words or new chip styles per screen read as a different product.
3. **Pending looks pending, not broken.** A pending image is blurred with the kit's sweep over it; the sweep is the only looping motion allowed besides spinners, and reduced motion turns it off (DIRECTION motion, media).
4. **A redo is a priced, directed action.** It takes a note (what to change) and shows its cost on the button (`creditsText`); a redo clears that item's approval because the asset changes (RESEARCH, hand-over).
5. **Progress gates the next step.** The "n of N approved" count sits in the header; the next action (Make the scenes, Name and save) unlocks only when all are approved (RESEARCH §4 step 4).
6. **The cost lives in a sticky footer beside the primary.** The bar rests on the bottom edge even on a short page, wraps on phones and never hides the price (DIRECTION `StudioFooter`).
7. **Design for volume, not the sample.** More items wrap into more rows; names truncate with a tooltip; lists scroll inside their popover; the sticky bar never covers the last row (founder 2026-10-15).
8. **New screens are built from the app's kit.** A screen with its own tray, card, badge, step strip or choice tile reads as a different product even when each part is tidy (founder 2026-10-15, round 1 reject).
9. **Final checks are part of the job.** Computed styles across every state, before handoff; the founder should never find a mismatched field (founder 2026-10-15).

## 2. Rules

- **RULE APR-01** Every generated item is one tile: media on top, status chip on the image's top-left, then Approve (primary) and Redo with note; secondary info and actions (save as avatar) go on the panel's footer strip, never inside the tile.
  **Why** One repeated anatomy lets the user scan a set and decide fast; extra controls inside tiles make every tile a different object.
  **Applies to** SaaS app UI. **Check** each tile has exactly one status chip and <= 2 actions; no third button inside a tile. **Source** DIRECTION round 2 (`StudioPanel`, media, footer strip); RESEARCH §4
- **RULE APR-02** Approve per item; never offer approve-all on a set the user is paying for.
  **Why** The control is the product's advantage over "pick whatever came out"; approve-all turns review into a rubber stamp.
  **Applies to** SaaS app UI. **Check** no "approve all" control on approval screens. **Source** RESEARCH §4 step 3 ("No approve-all. Per card is the point."); no competitor documents per-view approval (RESEARCH §2)
- **RULE APR-03** Render every status with one status component and a closed vocabulary (Approved, Generating, Ready to review, Failed, Needs review, Saved, "n of N approved"); never a coloured icon tile, a filled badge per screen, or a new word for the same state.
  **Why** Status is read peripherally; one shape and one word per state is what makes it readable at a glance.
  **Applies to** SaaS app UI. **Check** all status elements share one component class; status strings come from the list. **Source** DIRECTION `StudioStatus`; founder-taste 2026-10-14 (status is an outlined chip, never a coloured icon tile or check badge)
- **RULE APR-04** A pending item shows its blurred image (or the previous image) under the kit's develop sweep plus a short label ("Making character…"); the sweep is the only loop on the screen besides spinners, and `prefers-reduced-motion` stops it.
  **Why** A blurred image says "this is coming" without a blank box; one loop keeps a set of 8 generating tiles calm.
  **Applies to** SaaS app UI. **Check** pending tiles have the sweep class and a blur filter; with reduced motion, no running animations. **Source** DIRECTION media ("generating = kit sweep, pending images blur") and motion ("No looping decoration except live progress")
- **RULE APR-05** Redo opens a note field (max 300 characters) and the redo button shows its price; a redo clears the item's approval and returns it to Generating.
  **Why** A directed redo converges; an undirected regenerate is a slot machine. The price on the button is the confirmation.
  **Applies to** SaaS app UI, forms. **Check** redo textarea `maxlength=300`; redo button label includes the cost; after redo the item's status is not Approved. **Source** RESEARCH §4 step 2 (300 chars, `creditsText`); ENG-2105 frame-approval hand-over (redo clears approval because the asset id changes)
- **RULE APR-06** Show "n of N approved" in the panel's title strip and unlock the next step only when n = N; the next step names what it will do and its price ("Make the scenes · N credits").
  **Why** The count tells the user how far they are; a locked next step explains itself through the count.
  **Applies to** SaaS app UI. **Check** the next-step button is disabled while any tile is unapproved. **Source** RESEARCH §4 steps 3-4; DIRECTION `StudioStatus` "n of N approved"; hand-over ("Make the scenes" sends all approvals in one call)
- **RULE APR-07** Put the primary action and its cost in one sticky footer bar: it rests on the bottom edge even when the page is short, the scroll area is padded by the bar's height so it never covers the last row, and on phones it wraps (context row, then actions) with the price still visible.
  **Why** The cost and the next step must be visible from any scroll position; a bar that covers content or drops the price breaks both.
  **Applies to** SaaS app UI, mobile. **Check** at 390px the price element is visible; last tile's bottom <= bar's top when scrolled to the end. **Source** DIRECTION `StudioFooter`; founder-taste 2026-10-15 (sticky bars never cover the last row)
- **RULE APR-08** Set grids by item count and width: columns = min(items, 4), then 3 at <= 1100px, 2 at <= 860px, 1 at <= 520px; tiles stack their buttons under 280px; columns never shrink below ~200px and buttons never shrink or clip.
  **Why** Two items should not float in a four-column grid, and a crowded grid must wrap rather than squeeze buttons.
  **Applies to** SaaS app UI, mobile. **Check** computed `grid-template-columns` at 1440/1100/860/520; no button with `scrollWidth > clientWidth`. **Source** DIRECTION content volume; founder-taste 2026-10-15 (content volume)
- **RULE APR-09** Test every grid with 1, 4, 12 and 40 items and every label with a 60-70 character string: names truncate with an ellipsis (or clamp to 2 lines) and keep a title tooltip; long lists and popovers cap at about 60dvh and scroll inside; a row of cards keeps equal heights with actions pinned to the bottom.
  **Why** The happy-path sample hides every overflow bug the real account will have.
  **Applies to** SaaS app UI. **Check** preview route renders a stress state; truncated elements have `title`; popovers have `max-height`. **Source** founder-taste 2026-10-15; DIRECTION (library tested with 40 avatars and a 70-character name; voice list scrolls inside its popover)
- **RULE APR-10** Failure is a tile state, not a page: the tile says what happened and the next step ("We could not make this. Try a redo."), keeps the last good image approvable, and does not block other tiles; an abandoned flow resumes as a draft marked "Needs approval".
  **Why** One failed item out of eight should cost one redo, not the set.
  **Applies to** SaaS app UI. **Check** preview `?state=error|mixed` shows a per-tile failure with a redo action while other tiles stay interactive. **Source** RESEARCH §3-4 (no competitor documents failure); hand-over (preview states generating, review, mixed, approved, stress, error)
- **RULE APR-11** Build approval screens from the containers the app already has: a grey tray (radius 20, 4px inset, 1px subtle ring) with its title strip on the grey (16px secondary icon, 14/500 title, soft meta, action right), one white card inside (radius 16, 1px ring, no shadow), a footer strip for secondary actions; never box-in-box-in-box and never a fresh stylesheet.
  **Why** One container grammar across every screen is what makes a flow feel like one product.
  **Applies to** SaaS app UI. **Check** count nested ringed boxes (max 2: tray + card); no new CSS module defines its own tray, card, badge or step strip. **Source** DIRECTION surfaces + round 1 reject; founder-taste 2026-10-14 and 2026-10-15 (build from the app's kit)
- **RULE APR-12** Media ratios are fixed by role: set items and library covers 3:4 at radius 12; character views and the video player 9:16; list-row thumbnails 44px squares at radius 10 (a 9:16 sliver in a row reads as a capsule).
  **Why** One ratio per role makes sets comparable and rows aligned.
  **Applies to** SaaS app UI. **Check** computed `aspect-ratio` on media by role; row thumbs 44x44 r10. **Source** DIRECTION media and round 2; founder-taste 2026-10-14
- **RULE APR-13** A selected media item gets a 2px canvas-coloured gap plus a 1.5px ink ring; hover shows a quiet edge only, with no zoom or scale on images and no tinted selected rows or accent outlines.
  **Why** Selection must read without colour noise; image zoom on hover moves the thing being judged.
  **Applies to** SaaS app UI. **Check** selected tile `box-shadow` = 2px canvas + 1.5px ink; no `transform: scale` on media hover. **Source** DIRECTION media
- **RULE APR-14** Controls on approval screens follow one size: height 36, radius 12, label 14/500 with an 8px gap above the field, hint 12 tertiary 6px under, 16px between fields, 12px column gap; one button size per region with a 16px leading icon.
  **Why** The founder catches mismatched field heights first; one control size per region is the consistency contract.
  **Applies to** SaaS app UI, forms. **Check** every input, textarea trigger, select trigger and custom picker trigger computes height 36px and radius 12px. **Source** DIRECTION form controls; founder-taste 2026-10-15 (final checks)
- **RULE APR-15** Type on approval screens uses only the app's scale: 12 / 14 / 18 px at weights 450 (body) and 500 (titles), with the app's letter-spacing tokens; no 13px and no 600.
  **Why** Off-scale one-offs are the fastest tell that a screen was styled ad hoc.
  **Applies to** SaaS app UI. **Check** collect computed font-size and font-weight across the screen: sizes ⊆ {12,14,18}, weights ⊆ {450,500}. **Source** DIRECTION type and final checks; founder-taste 2026-10-14
- **RULE APR-16** Motion uses one token set: ease `cubic-bezier(.22,1,.36,1)`; content in 240ms rising 4px from 0 opacity (no blur in product); step change 220ms fade and rise; disclosure height 300ms; segmented and step pill slide 400ms; hover colour 150ms; pressed buttons scale 0.97.
  **Why** One timing language makes a multi-step flow feel continuous.
  **Applies to** SaaS app UI. **Check** computed transition durations ⊆ {150, 220, 240, 300, 400}ms with the shared ease. **Source** DIRECTION motion and interaction
- **RULE APR-17** The library of saved results opens with a dashed "create" tile first, then cards (cover, name + look, menu, voice line) in an auto-fill grid with a 176px minimum; an empty library shows demo items to start from.
  **Why** The create action and the saved items live in one place; an empty library should still teach what goes in it.
  **Applies to** SaaS app UI. **Check** first grid child is the create tile; `grid-template-columns` uses `minmax(176px, 1fr)`. **Source** DIRECTION `.libraryCard`; RESEARCH §4 (empty library with demo characters)
- **RULE APR-18** Before handoff, audit every state at 1440, 1100 and 390 in light and dark: sizes only from the scale, weights only 450/500, every field 36px r12, one edge per box and per overlay, a pointer on every clickable, no horizontal scroll, no clipped button label; fix every mismatch before showing it.
  **Why** The founder should never be the one who finds a mismatched field.
  **Applies to** SaaS app UI. **Check** run the kit audit (`kitshot.cjs` / `studio.cjs AUDIT=1`) across all preview states; zero findings. **Source** DIRECTION final checks (22 states); founder-taste 2026-10-15 (final checks)

## 3. Numbers & scales

| Token | Value | Source |
|---|---|---|
| Control height / radius | 36px / 12px (`size="system"`, `density="default"`) | DIRECTION |
| Select list item | 36px tall, radius 9, check on selected | DIRECTION |
| Segmented control | 36 track, 3px inset, white pill with 0.5px ring and 1-3px lift, 400ms slide | DIRECTION |
| Label / hint | 14/500, 8px gap above field / 12 tertiary, 6px under | DIRECTION |
| Field spacing | 16px between fields, 12px column gap | DIRECTION |
| Radius ladder | tray 20, dialog 20, card 16, control 12, menu/list 12, media 12, row thumb 10, list item 9 | DIRECTION |
| Tray | grey, radius 20, 4px inset, 1px subtle ring | DIRECTION |
| Type | 12 / 14 / 18 px; weights 450 / 500; dialog title 16/500, description 13 (dialog owner) | DIRECTION |
| Topbar | 36px back tile, 12px eyebrow, 18/500 title | DIRECTION round 2 |
| Media | set items + covers 3:4; avatar views + player 9:16; row thumbs 44px square r10 | DIRECTION |
| Selected media | 2px canvas gap + 1.5px ink ring | DIRECTION |
| Set grid | min(items, 4) cols; 3 at 1100; 2 at 860; 1 at 520; buttons stack < 280px | DIRECTION |
| Auto-fill minimums | library 176px; avatar views 150px (8 pieces = 2 rows); first-frame tiles 200px | DIRECTION, hand-over |
| Create form aside | sticky 316px | DIRECTION |
| Redo note | 300 characters | RESEARCH §4 |
| Popover / list max height | ~60dvh | founder-taste 2026-10-15 |
| Stress test | 1, 4, 12, 40 items; 60-70 character names | founder-taste, DIRECTION |
| Motion | ease (.22,1,.36,1); in 240ms +4px; step 220; disclosure 300; pill 400; hover 150; press 0.97 | DIRECTION |
| Audit viewports | 1440 / 1100 / 390, light + dark, 22 states | DIRECTION |

## 4. Dos and Don'ts

| Do | Don't | Why |
|---|---|---|
| Grey tray + title strip + one white card + footer strip | Padded grey section with white cards with green edges (round 1) | One container grammar (APR-11) |
| One status component, outlined, fixed words | Filled badges, coloured icon tiles, a new label per screen | Status at a glance (APR-03) |
| 14/500 and 12/450 type from the scale | 13px / 600 one-offs | Ad hoc tell (APR-15) |
| Segmented control from the kit | Bordered choice tiles invented for this screen | Kit first (APR-11) |
| Blurred pending image + one sweep | Grey box with a spinner per tile and shimmer everywhere | Calm pending (APR-04) |
| Redo with a note and a price | "Regenerate" with no direction and no cost | Directed, priced (APR-05) |
| Save-as-avatar on the footer strip | A save tile inside the set | Tile anatomy (APR-01) |
| Grid that wraps to more rows | Columns that shrink until labels clip | Volume (APR-08) |

## 5. Exceptions & judgement calls

- **Column minimum conflict.** The founder rule says columns never shrink below ~200px; the kit's avatar-view grid auto-fills at 150px (9:16 views, 8 pieces in two rows) and the library at 176px. Narrow 9:16 views carry less text, so a smaller minimum is defensible there; tiles with two buttons should hold ~200px. Re-check against the founder if a grid with buttons goes below 200px. [engine note]
- **Small batch vs per-item approval.** When the output is a single item (one image), letting the user pick from 2-4 options (HeyGen, Creatify) may beat approve/redo on one. Use per-item approval when items form a set that must all be right. [engine note]
- **Client-held approval state.** In Sellify the API has no per-frame approved flag, so approvals live in client state and are sent in one call; a reload loses "Redoing" and "Failed" (hand-over). Acceptable for a first ship only if the screen warns before leaving with unsent approvals. [engine note]
- **Dialogs.** Dialog description is 13px from the dialog owner, an exception to the 12/14/18 scale written in DIRECTION's overlay spec; leave the owner's value rather than overriding it.

## 6. Figures worth keeping

- `~/Documents/sellify sth/eng-2105-guided-set/frame-approval/`: shots + audit of the first-frame approval screen (states generating, review, mixed, approved, stress, error).
- `knowledge/benchmarks/flohoeller/affectui-*` and `affectui-components-measure.json`: the measured affectUI anatomy behind the kit.

## 7. Open questions

- **Status chip shape conflict.** DIRECTION's Status section says "the product Badge with rounded=lg: success (check), error (alert), orange live (spinner), neutral outline. No dot-chips." The founder rule of 2026-10-14 says "status is an outlined chip with a coloured dot, never a coloured icon tile or check badge." Both agree on one component and an outlined chip; they disagree on dot vs icon. Not resolved here; ask the founder.
- Server truth for per-item approval and redo failure (survive reload) is an engineering gap in Sellify; the right pattern when the server does hold it is not yet specified.
- Kit gaps noted in the hand-over (2-line clamp text, 200px auto-fill tile grid, phone row layout, tile alert) are not yet in the shared kit.
- Kit issue seen: at 1100px the step tray caption "Look, cast and product" runs under the current Scenes pill.
- Mobile approval layout (one tile per row, sticky Approve/Redo bar, step strip as a horizontal scroller) is a recommendation from RESEARCH §4; no competitor benchmark exists.
