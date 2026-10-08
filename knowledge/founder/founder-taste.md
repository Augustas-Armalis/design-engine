---
source: founder
chapter: Founder taste: direct feedback on engine output (Augustas, 2026-10-08)
pages: n/a
topic_tags: [founder, taste, hero, nav, typography, copy, icons, logo, layout, product-card, background, buttons, quality-bar]
status: studied
---

# Founder taste (binding)

Every rule here is a direct founder verdict on real output. It outranks books, web research and studied systems. When it conflicts with anything else, this wins. Add to it after every round of feedback; never delete a rule without the founder saying so.

## 1. Core ideas

1. The bar is the studio's own shipped work (Kaching, Capto) and kargul.studio-grade finish, not the rulebook. A rules-perfect page that looks like a diagram was called "dogshit" (Linework).
2. Polished modern SaaS beats clever concepts: Geist-class type, tight tracking, rich believable product UI, a signature visual field, Kaching-spec controls.
3. Creative backgrounds are wanted (live halftone/dither, real data like coastlines), but they must sit in a deliberate position on the grid.
4. Simpler product UI beats denser product UI when both are believable: the founder preferred the original simple payroll card over a richer one.

## 2. Rules

- **RULE** [founder] Never hand-draw icons or logos in SVG paths; use a professional icon set (Phosphor or Lucide) or supplied/traced artwork.
  **Why** Founder: hand-made icons look amateur ("it's ass").
  **Applies to** all. **Check** icons come from an installed icon package or a supplied/traced file. **Source** founder, Tideline round 1

- **RULE** [founder] A logo is a mark plus wordmark with no rounded-rectangle container behind the mark; wordmark at 20px+ in the nav (not 17px).
  **Why** Founder rejected icon-in-a-box logos and asked for the wordmark "a few pixels bigger".
  **Applies to** all. **Check** nav wordmark font-size >= 20px; logo has no filled container. **Source** founder, Tideline rounds 1-3

- **RULE** [founder] Hero headlines use Title Case (every word capitalised) and run two lines maximum at desktop.
  **Why** Founder asked for "title has all first letters capitalized" and two lines max.
  **Applies to** landing page hero. **Check** h1 renders <= 2 lines at 1440px; each word starts uppercase. **Source** founder, Tideline round 3

- **RULE** [founder] The hero subtitle runs two lines maximum at desktop (about 100-120 characters at 18px in a ~520px measure).
  **Why** Founder: "title and subtitle two lines max".
  **Applies to** landing page hero. **Check** hero p renders <= 2 lines at 1440px. **Source** founder, Tideline round 3

- **RULE** [founder] Nav is divided: a white pill holding logo, a hairline divider and the links on the left, and the actions (Log in, primary) on the right; both aligned to the content edges, with generous spacing (40px link targets, 14px link padding, 20px around the divider).
  **Why** Founder preferred the divided nav over a single full-width bar, but wanted it "spaced out better" and aligned with the content.
  **Applies to** marketing site. **Check** nav pill left edge == content left edge; actions right edge == content right edge. **Source** founder, Tideline rounds 2-3

- **RULE** [founder] Everything in the hero shares one left edge (nav, chip, headline, body, buttons, product card) on the content gutter inside the rail.
  **Why** Founder asked for the nav "to be aligned with the other stuff".
  **Applies to** all. **Check** left x of nav, chip, h1, p, actions and first card are equal within 1px. **Source** founder, Tideline round 2

- **RULE** [founder] Rails/dividers must be continuous and deliberate: a rail that meets artwork dissolves before it instead of being cut off or crossing it.
  **Why** Founder: "fix the borders also like dividers".
  **Applies to** marketing site. **Check** visual: no rail ends abruptly mid-section or crosses the hero visual. **Source** founder, Tideline round 2

- **RULE** [founder] Place the hero visual deliberately on the grid: in the right column, pushed right and down so it bleeds off the frame edge, top roughly level with the headline, never floating mid-page.
  **Why** Founder found the globe "a bit out of place", then asked to move it right and down.
  **Applies to** landing page hero. **Check** visual: the visual's mass sits right and low and bleeds off the frame. **Source** founder, Tideline rounds 2-3

- **RULE** [founder] Keep the hero product card simple: title + status badge, one context line, one large figure, one progress element, three small stats. Do not add icon tiles, avatar stacks or extra rows.
  **Why** Founder: the richer card was "too complicated, the original one was better".
  **Applies to** hero product proof. **Check** card has <= 5 visual rows. **Source** founder, Tideline round 3

- **RULE** [founder] Buttons follow Kaching's spec: 14px radius, 18px label at -0.54px tracking, solid ink primary with #303030 hover and no lift, press scale 0.98, secondary white with 1px border and an optional 5px-inset image or icon tile.
  **Why** Founder pointed to Kaching's buttons as the standard.
  **Applies to** marketing site. **Check** computed radius 14px, font-size 18px, letter-spacing -0.54px on hero CTAs. **Source** founder; knowledge/larpo-shipped/kaching-DESIGN-SYSTEM.md

- **RULE** [founder] Every hero needs a creative signature visual field (live dither, halftone, shader, real-data map), not a flat or empty background.
  **Why** Founder asked for "a more creative bg"; the halftone globe was called "cool".
  **Applies to** landing page hero. **Check** visual: a signature visual occupies at least 30% of the fold. **Source** founder, Tideline round 1

- **RULE** [founder] Desktop first when the deliverable is an image; do not spend effort on mobile unless asked.
  **Why** Founder: "no mobile just desktop focus right now to get me an image".
  **Applies to** hero images, X posts. **Check** n/a. **Source** founder, Tideline round 1

## 5. Exceptions & judgement calls

- The split layout (copy left, visual right) was rejected by Larpo when the right side was a decorative dashboard. With a real product world on the right (the payout globe) the founder accepted it.
- Title Case applies to the hero headline. Body copy, buttons and labels stay in sentence case unless told otherwise.
