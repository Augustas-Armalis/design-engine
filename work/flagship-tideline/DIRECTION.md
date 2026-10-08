# Flagship v3 · Tideline: DIRECTION (desktop only, 1440x900)

**Fictional product:** Tideline, payroll for distributed teams. All names, amounts and times are sample data.

**Calibration:** Kaching + Capto (knowledge/larpo-shipped). Kaching's real button spec copied, not guessed: 14px radius, 18px label at -0.54px, ink fill with #303030 hover and no lift, demo button with a 5px-inset image tile. Geist 600 at -0.055em. Floating white nav, rail hairlines.

**Signature visual (owned):** a live WebGL halftone Earth rising from the bottom right: real Natural Earth coastlines (public domain, world-atlas), orthographic projection, 2px Bayer-dithered ink on warm paper, dotted graticule and atmosphere, pixel-develop entrance. Payout arcs in signal orange (#ff5b1f) from Berlin to New York, Lagos, Cairo and Bengaluru, each landing on a chip with the local amount and arrival time. Same projection in shader and SVG, so arcs land on the right city.

**Product proof:** the "October payroll" card the arcs are paying out: €184,320 to 48 people in 11 currencies, 41 of 48 paid, all paid by 14:20 CET.

**Icons:** Phosphor (MIT), including the logo glyph (Waves). No hand-drawn icons.

**Fixes found on the way:** Bayer threshold off-by-one drew a dot lattice in empty areas (also fixed in Cadence); globe shadow too heavy, then too light; chips covering their own arc endpoints.

**Override:** layout reads copy-left / visual-right; accepted deliberately because the right side is the product world (live payouts on a real map), not the rejected decorative dashboard.
