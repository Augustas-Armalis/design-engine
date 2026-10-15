# Sellify Video Ad Creator: direction and spec

Brief: redesign the whole Video Ad Creator flow in the clean AlignUI / affectUI light style, inside Sellify's own tokens and shared components. Every surface must follow one spec. Nothing is restyled ad hoc.

Bound system: Sellify `globals.css` tokens + shared `components/ui` owners (Button, Input, Textarea, Select, Switch, Dialog, Popover, DropdownMenu, Badge). Reference anatomy: affectUI (`knowledge/benchmarks/flohoeller/affectui-*`), measured numbers in `affectui-components-measure.json`.

## The spec (one source for every surface)

### Surfaces
- Page canvas is white. A section is a grey tray (work surface, radius 20, 4px inset, 1px subtle ring). Its title strip sits on the grey: plain 16px secondary icon, title 14/500, soft meta, action on the right.
- Content inside a tray sits on a white card (radius 16, 1px subtle ring, no shadow). Secondary info and actions go on the tray footer strip, never inside the card.
- Never box-in-box-in-box. No borderless filled boxes. Never grey on grey or white on white.

### Form controls (the same everywhere: page, dialogs, popovers)
- Height 36 (`size="system"`, `density="default"`), radius 12.
- Text input, textarea and select trigger: our grey work fill and the owner's quiet edge. On white cards and in dialogs they use the lighter field fill (work 55% toward raised) with a 10% ink edge, and an 18% edge on hover. Focus uses the owner's focus ring. Fields never get a custom shadow.
- Label 14/500 above the field with an 8px gap. Hint 12, tertiary, 6px under the field. 16px between fields. Two-column grids use a 12px column gap.
- Select: the owner trigger plus `SelectContent appearance="system"`. Exactly one edge on the list (the overlay shadow ring), items 36 tall, radius 9, check on the selected item.
- Segmented choice (mode, cast): 36 track, 3px inset, a soft grey fill with no ring. The selected option is a white pill with a 0.5px ring and a soft 1-3px lift (affectUI values). The pill slides 400ms.
- Switch: owner `appearance="system"`. It always sits at the right end of a row with a title and a meta line.
- Buttons: primary is ink `systemPrimary`; secondary `systemOutline`; tertiary and Cancel `systemGhost`. One size (`system`, 36) per screen region. An icon leads the label at 16px.

### Overlays (Dialog, Popover, Menu, Select list)
- Owner `variant`/`appearance="system"`, one edge (shadow ring only), radius 20 for a dialog and 12 for menus and lists.
- Dialog layout: header (title 16/500, description 13, secondary), then the body, then a footer with Cancel (ghost) on the left of the primary on the right. The body is a plain stack (gap 16) of Field + control. No grey section boxes inside dialogs, and no dividers between header, body and footer.
- Dialog body content follows the form-control spec above exactly.

### Media
- Galleries, library and filmstrip thumbnails are 3:4, radius 12. The video player is the real 9:16. List-row thumbnails are 44px squares, radius 10.
- A selected media item gets a 2px canvas gap plus a 1.5px ink ring. No tinted selected rows, and no accent outlines.
- Hover shows a quiet edge only. No zoom or scale on images.

### Status
- The product `Badge` with `rounded="lg"`: success (check), error (alert), orange live (spinner), neutral outline. No dot-chips.

### Type
- Geist from the app provider, with the `--font-size-ds-12/14/18` sizes and matching `--letter-spacing-ds-*`. Weights are 450 for body and 500 for titles. No 13px or 600 one-offs.

### Motion (one set of tokens)
- Ease `cubic-bezier(.22,1,.36,1)`.
- Content in: 240ms, rising 4px from 0 opacity (affectUI `ui-sf-in`, without blur in the product).
- Step change: 220ms fade and rise.
- Disclosure height: 300ms.
- Segmented pill and step pill: 400ms slide.
- Hover colour: 150ms.
- Overlays use the owners' open and close animations.
- No looping decoration except live progress (spinner, segment sweep, develop sweep). Reduced motion turns every loop off.

### Interaction
- Every clickable element has `cursor: pointer` and a hover state.
- Pressed buttons use the owner's 0.97 scale.
- Focus-visible is a 2px focus ring on everything.

## Surface checklist (all must pass before handoff)

Pages and states
1. Library (with videos, empty, loading, error)
2. Template step (mode switch, gallery, hover sample, coming soon)
3. Product step (link fill, product select, name, photo row, story, look and sound closed and open, custom cast, script check)
4. References step (guided)
5. Scenes step (guided)
6. Script check
7. Making (writing, images, frames, scenes, rendering)
8. Finished, scene redo running, scene redo done
9. Render failed, run stopped
10. Header, stepper, footer and preview across all of the above

Overlays
11. Template details dialog
12. Product photo upload dialog (drop zone)
13. Not enough credits dialog
14. Start a new video (reset) dialog
15. Start from finished dialog
16. Rebuild storyboard dialog
17. Change template dialog
18. Download / export dialog
19. Regenerate scene dialog
20. Edit scene dialog
21. Rename dialog
22. Delete confirmation modal
23. Video actions menu
24. Voice picker popover
25. Every select list (angle, workspace product, setting, delivery, music, place direction)

Out of scope: the video editor behind the `video_editor` flag, which has its own surface.

## Checks per surface
- Automated audit (`studio.cjs AUDIT=1`): no double edges, a pointer on every clickable, no transparent fields.
- Computed styles: field fill and edge, control heights, radii, and font sizes drawn only from the spec.
- A 2x screenshot read at full size against this spec and the affectUI references.

## Overrides
- override: affectUI white inputs, because Sellify's design language uses grey work-surface fields on white cards (founder).
- override: affectUI blur-in on content, because product screens drop the blur to stay crisp.

## Guided approval and avatars (ENG-2105, 2026-10-15)

Round 1 was REJECTED: "super super bad and inconsistent and just the ugliest... do it in our affectUI / AlignUI style, nice and sleek". It used its own CSS module (padded grey section, white cards with green edges, filled badges, 13px/600 type, bordered choice tiles, a pill step strip). Lesson: a new screen inside this app is built from the studio kit, never from a new stylesheet (founder-taste rule, 2026-10-15).

Round 2 (current) is built only from the kit, now shared on main as `components/video-ads/video-ad-studio.module.css` + `video-ad-studio-panel.tsx`:
- `StudioTopbar`: 36px back tile, 12px eyebrow, 18/500 title, status chip and actions right.
- `StudioSteps`: the step tray (grey tray, white current pill, numbered index, caption). Video run: Template, Product, Set, Scenes, Video. Avatar: Describe, Review views, Save.
- `StudioPanel`: every section. Title strip on the grey (16px icon, 14/500 title, soft meta, action right), one white card, footer strip for secondary info and actions (save-as-avatar lives here, not in a tile).
- `StudioStatus`: every status (Approved, Generating/Making, Ready to review, Failed, Needs review, Your avatar, Saved, "n of N approved").
- Media: `.media` 3:4 for set items and library covers, `data-ratio="tall"` (9:16) for avatar views; status chip on the image top left; generating = kit sweep, pending images blur.
- Library: `.libraryCard` anatomy (cover, name + look, menu, voice line), dashed create tile first, auto-fill min 176px.
- Create form: creator canvas (main stack + sticky 316px aside), segmented control for kind and style, owner buttons for examples and quick-adds, `StudioFooter` with the price and Generate.
- `StudioFooter`: sticky bottom bar; the screen fills the scroll area so a short page rests the bar on the bottom edge; on phones it wraps (context row, then actions) and keeps the price visible.

Content volume (founder rule): set grid = min(items, 4) columns, then 3 at 1100, 2 at 860, 1 at 520; tiles stack their buttons under 280px; avatar views auto-fill min 150px (8 pieces wrap to two rows); library tested with 40 avatars and a 70-character name (ellipsis + title); voice list scrolls inside its popover.

Final checks run before handoff (audit `kitshot.cjs`, 22 states, 1440/1100/390, light and dark): font sizes only 12/14/18, weights only 450/500, every field 36px r12, no horizontal scroll, every clickable has a pointer, no clipped button label.
