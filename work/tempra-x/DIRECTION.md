# Tempra X weekend (Sat 24 / Sun 25 Oct 2026)

scope: "may you prepare me 6 content pieces for this saturday and sunday too please... maybe a few videos of idk a dahsbaor dhero we did or will do and then think of sth more"
motion: asked ("a few videos")
mode: X (designs for the day), kind: post-component
floor: Tempra hero h4a, Tempra product cprodb (finals in library/tempra), studio caption register (knowledge/x/caption-patterns.md)

owned decisions:
1. One series across the weekend: full -> close-up -> motion (quote) on Saturday; hero -> teaching card -> hero motion (quote) on Sunday (XS-15).
2. Motion is the product's own story (type the ask -> read 5 calendars -> answer -> the slot lands -> book), one clock, one T table (`TempraMotion.tsx`).
3. Teaching card from our own measured finding (optical centring), numbers probed from the render itself; no claim the render does not show.

teaching card (`#/xoptical`, 1080x1350, v2): flex-centred Geist caps 48.0 above / 50.7 below (high), Manrope 49.7 / 48.3 (low); nudged per font (Geist +1.33px, Manrope -0.67px) -> 49.3/49.3 and 49.0/49.0 (tools/capgap.cjs at 3x).

- override: radius.ladder.boxes because the teaching card shows our 46px CTA at 3x (r16 at 3.9x = r62); the radius is the real button's, scaled
- override: type.families because the teaching card compares two fonts on purpose (Geist and Manrope); Inter carries every label
