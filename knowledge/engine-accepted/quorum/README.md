# Quorum: accepted light SaaS hero (2026-10-15)

Founder verdict: "ok this is now perfected nicely to look... see how clean and professional this looks". It took 12 rounds (v1 to v6.6) in one session. The final build is `work/quorum/app/src/HeroV6.tsx`, the still is `quorum-fold@2x.png`, and the ledger entry is `quorum` (accept). It is the engine's second accepted reference after Kestrel, and the default floor for **light, product-first SaaS heroes**.

## The recipe (copy the numbers, change the product)

**Canvas and nav**
| Part | Value |
|---|---|
| Canvas | 1440x900, page `#fff`, Inter Variable with opsz, `cv11` `ss01` |
| Nav | 88px tall, inset 64px. Wordmark left; 5 plain text links 14/500 #5d6168, 32px apart, starting 48px after the logo (no pills, no dots). Right: text links only. "Sign in" grey and "Start free →" ink with a draw-in underline, so they never repeat the hero buttons |

**Copy column (`<main>`, x 64, w 470, top 207)**
| Part | Value |
|---|---|
| h1 | 58/550/-0.045em/1.03, Title Case, two lines, no full stop |
| Subtitle | mt 20, 17/27 #5d6168, two hand-set lines |
| CTAs | mt 32, 48px, r12: ink gradient key ("Start for free →") plus a raised white "Book a demo" |
| Ask composer | mt 96, 470 wide. The CTA-to-composer gap equals the composer-to-fold gap (96/97) |

**Stage (x 572, y 124, 856x820, r24, bleeds off the bottom)**
| Part | Value |
|---|---|
| Field | Paper `GrainGradient`, `corners`, colours `#aeb4ff #d4d7ff #f3e9ff #ffe9dc` on `#eef0fb`, softness .85, intensity .22, **noise 0**, layer blurred 26px at inset -40 (smooth, no texture) |
| Agent bar | Removed in the final version (founder asked). Earlier: one white/90 bar, 44px, r12, at stage (44, 40), message cycling every 2.6s. Still exported as `AgentStack` |
| App window | At stage (44, 44), the same inset on top and left, 900x812, r14, ring plus a soft drop. Masked to fade out over the bottom (#000 74% to transparent 96%) and the right (84% to 100%) |
| Progressive blur | Over the dissolving band only: 140px tall, three stacked backdrop blurs (2/4/8px) |

**App contents (Kargul detail level)**
- **Sidebar** (#fafafb, 212px): a workspace row, a search field with ⌘K, nav with counts, the active item as a white tile with a ring and an indigo icon, then Ask Quorum chats and Studies.
- **Header:** title, a Table/Board segmented control, and the meta "All studies · sample data".
- **Summary strip:** one card split into 4 hairline cells, each a label, a 20/600 value and a muted delta.
- **Table:**
  - column-header icons;
  - row 1 selected (#f5f5ff, indigo checkbox);
  - mention bars at 60x6, indigo when 7 or more, pale indigo below that;
  - tinted tag chips with dots;
  - tinted-initial avatars (10px minimum);
  - 13 rows running to the bleed.

**Composer (the only element under the CTAs)**
- **Frame:** a hairline gradient edge (indigo .2 to neutral .08) with a soft shadow.
- **Inside:** a #fafafb question panel; the question types itself at 17/550.
- **After typing:** suggestion chips swap for an answer that streams in, with its key finding highlighted in its tag colour, then three citation chips (avatar plus timestamp) and "+11 sources".

**Colour:** ink #111214, sub #5d6168, muted #6b6f76 / #6f737a (AA on white), one accent indigo #5056f0 (selection, strong bars, sparkle tiles). Tag colours appear only on tags.

**Motion:** nav .1, h1 .25 (+.08 per line), sub .55, CTAs .66, composer .8 (typing starts 1.3), stage .2, app .55, rows from .95 (+45ms each), agent bar 1.4. Kaching reveal tokens.

**Check:** 0 fail (`reports/quorum`). One remaining warning: the product mock sits outside a landmark, which is acceptable for a depiction.

## What 12 rounds taught (the "less is more" ledger)

| Round | Tried | Founder | Lesson |
|---|---|---|---|
| v1 | Kestrel grammar + full page | "identical to the other one", "JUST THE HERO" | A new brief needs a new family; a hero ask means only the hero |
| v2 | Halftone voice shader, tilted sheet, flag chips | "not professional, especially the visual and the three cards"; liked the nav dots | Signature visuals must look like product UI, not toys |
| v3 | Engraved landscape + one interview window | "do completely different... clean, Marcel, Basit" | When the founder says clean, go to Altrina-level restraint |
| v4 | Fine-line ribbon, bottom-left headline | "cool idea, ass execution, no nav dots" | Line art must be one coherent object |
| v4.1 | Twisted ribbon sheet | "what even is this hero... what is it about" | **The hero must say what the product is in 3 seconds. Abstract art fails** |
| v5 | Lightfield split, plain grey, flat table | "good idea, too simple, bad execution" | Clean is not bare: stage, detail density, button material |
| v6 | Grain stage, detailed app, peek card, 3 bullets | "ouuu this is cool"; the stage is too high, the bottom is white, the bullets are stupid | Align the stage with the copy, fill the product to the bleed, no bullet lists |
| v6.1-6.2 | Composer, peek, stacked toasts | "the popover with the voice visual is too much", wants "something minimal" above | One floater max; nothing competes with the product |
| v6.3-6.4 | Square avatar tiles, louder composer | "squares distracting", "colourful border and shadow too much" | Accessories stay quiet: low-alpha edges, soft shadows |
| v6.5 | Removed the gradient by mistake | "where did our gradient go... only remove the texture" | Change only what was named; ask when an instruction can be read two ways |
| v6.6 | Smooth gradient, shorter blur | "perfected" | Done |

**Less is more, operationally:**
- **Element budget:** the fold holds four things. Nav, copy (h1 + subtitle + CTAs), one composer, and one product stage. The status bar was cut too in the end.
- **Remove first:** cut accessories first (avatar rows, stacks, popovers, bullets, dots).
- **Clarity before decoration:** keep anything that explains the product, and keep anything that proves it (sample data, sources, the selected row).
- **Every accessory sits at about 20% intensity:** hairline gradient edges at alpha .2, shadows at alpha .14-.18, muted text two steps lighter than body.
- **Fill or fade, never stop:** the product either fills to the bleed or dissolves into the stage. A hard white corner reads as unfinished.
- **Even rhythm on the copy side:** the gaps between blocks repeat (96/97).
