# Cadence product screen, Marcel Kargul grammar (`#/cprodk`)

scope: one product screen (Cadence week calendar), presented as a 1600x1200 post frame, light, pale canvas, window cropped at the bottom edge
motion: none
mode: B (design in a style), floor = KargulR3 (calendar + popover, KMD-36..38) + KargulR1 (UniOps chrome, sidebar, pills, primary), sample data
kind: product-ui

- **Owned states, in his tint + ring + text language:**
  1. Suggested slot: accent tint `#eef4ff`, 1.5px dashed accent edge, accent ink. It is selected (content shifted 2px in) with his popover open beside it.
  2. Protected focus: neutral tint `#f4f4f3`, a 1px `#e0e0de` ring, a fine 135deg hatch and a lock glyph.
  3. Resolved conflict: the moved meeting keeps its colour. An accent-triple note hangs 4px under it ("Moved here from 10:00 / Clashed with your focus block").
- **Colour:** one accent (`#4785ff`) for everything Cadence did (suggestion, note, primary, active nav). Meetings use two of R3's tints (purple team, pink external); the now marker is `#e0735a`.
- **Radii by box size** (KMD-31) at squircle scale (founder L373, x1.2 of his circular values): events 9.5, chips 7, controls 12, popover 14.5, card 25, panel 25, window 30.

- override: radius.ladder.boxes because radius follows box size per Marcel's measured screens (KMD-31: r8 events at 62h, r12 popover, r22.5 strips, r25 window) at squircle scale, not the control-height bands
- override: radius.ladder.product because the same KMD-31 size ladder applies inside the app window
- override: type.weights.product because event titles are 480, measured on his calendar post (KMD-36, R3 registered within 1px)
