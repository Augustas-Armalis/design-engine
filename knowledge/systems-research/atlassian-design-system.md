---
source: web:atlassian.design + npm @atlaskit/tokens 20.4.0, @atlaskit/button 25.4.7, @atlaskit/textfield 10.2.6 (Apache-2.0)
chapter: Atlassian Design System, tokens, elevation, motion, content
pages: n/a (web research, date-stamped 2026-10-08)
topic_tags: [design-system, atlassian, tokens, color-roles, emphasis, elevation, dark-mode, spacing, radius, motion, content, buttons]
status: studied
---

# Atlassian Design System (ADS)

Machine-readable profile: `system/systems-research/atlassian-design-system.json`. Raw package copies and decoded theme CSS (untrusted data, gitignored): `corpus/web/systems/atlassian/` (`css/atlassian-light.css`, `atlassian-dark.css`, `atlassian-motion.css`, `atlassian-typography.css`, `atlassian-spacing.css`, `atlassian-shape.css`, plus increased-contrast, finesse, future and legacy variants).

Evidence grading as in `knowledge/web/color-and-surfaces.md`: **[verified]** read from the published package CSS or a fetched atlassian.design page; **[computed]** script-produced; **[engine note]** my inference. Several atlassian.design pages (grid, border, content sub-pages) returned 404 or empty text; image-only do/don't blocks were unreadable.

## 1. Core ideas

1. **Token names are sentences.** `color.background.danger.bold.hovered` = property, role, emphasis, state; the page says every colour token starts with `color` then the property it styles, then modifiers [verified, foundations/color]. Because the name carries the contract, lint rules (ESLint, Stylelint, Babel plugins) can enforce usage [verified: Tooling category lists them].
2. **Roles carry meaning, accents do not.** Roles: neutral, brand, information, success, warning, danger, discovery (plus selected, input, inverse). Ten accent hues (gray, red, orange, yellow, lime, green, teal, blue, purple, magenta) are "meaningless decoration" and must be interchangeable "without changing the experience" [verified, foundations/color].
3. **Emphasis is relative contrast against the surface**: subtlest < subtler < subtle < default < bold < bolder < boldest; bold backgrounds have `inverse` text/icon tokens; yellow bold uses `warning.inverse` (`#292A2E`) [verified].
4. **Every fill has interaction twins.** Nearly every `background-*` token exists as base, `-hovered`, `-pressed` (208 background tokens in the light theme alone), plus `selected`, `focused`, `disabled`, `input` states. Icons have no hovered/pressed tokens; wrap them in a subtle neutral background [verified].
5. **Neutral backgrounds are translucent.** `background.neutral` = `#0515240F` (light) / `#CECED912` (dark), so the same token adapts to whichever surface it sits on; `elevation.surface.sunken` is opaque and fixed [verified in CSS + foundations/elevation].
6. **Elevation is a vocabulary of surface levels paired with shadows**: sunken (backdrop for grouped content), default (flat page), raised (movable cards, one focal point per screen), overlay (UI over UI), plus overflow (shadow that signals scrolled-away content, not a level). Raised surface must pair with raised shadow, overlay with overlay shadow; default and sunken have no shadow [verified, foundations/elevation].
7. **Dark mode lightens upward.** Surface `#1F1F21`, raised `#242528`, overlay `#2B2C2F`; sunken `#18191A`; overlay shadow gains `0 0 0 1px #BDBDBD1F`. "Light-mode accessibility doesn't guarantee dark-mode accessibility" [verified].
8. **Themes are attribute-composed layers.** `<html data-color-mode="light|dark" data-theme="light:light dark:dark spacing:spacing typography:typography shape:shape">`; extra layers: increased contrast, finesse, new-input-border, future, legacy, dynamic custom brand colour [verified in package CSS selectors].
9. **Spacing is an 8px base with named percentages**: `space.100` = 8px, `space.200` = 16px, with half steps 2/4/6 and a 5-10x range to 80px; guidance by range (small 0-8 compact, medium 12-24, large 32-80) and by gestalt (similarity, proximity, order, rhythm, optical adjustment) [verified].
10. **Radius is a role map and the focus ring derives from it.** badge 2, tag 4, control 6, card 8, modal/container 12; focus ring sits 2px outside, radius = element radius + 2px [verified, foundations/radius].
11. **Content has a personality dial.** Traits: bold, optimistic, practical-with-a-wink; the dial lowers optimism and wink for new or confused users and in errors; delight only after trust is built [secondary + verified, foundations/content/voice-tone].

## 2. Rules

- **RULE [SYS-ADS-01]** Name colour tokens `color.{property}.{role}.{emphasis}.{state}` and consume only semantic tokens in product code; keep raw palette values behind the semantic layer.
  **Why** A structured name makes misuse greppable (a `text` token on a `background` slot) and lets a linter reject it.
  **Applies to** design systems | SaaS app UI
  **Check** lint: no hex/rgb in product CSS; every `var(--ds-*)` resolves to a known token (inventory of 467 colour/elevation tokens in the light theme).
  **Source** atlassian.design/foundations/color; package @atlaskit/tokens 20.4.0

- **RULE [SYS-ADS-02]** Use accent colours only as decoration that could be swapped for another accent without losing meaning; use a role (danger, success, warning, information, discovery, brand) whenever the colour carries meaning.
  **Why** Meaning attached to arbitrary hues cannot be themed, localised or made colour-blind-safe.
  **Applies to** SaaS app UI
  **Check** review: any accent-coloured element that communicates state is a FAIL; accent usage count by hue (swap test).
  **Source** atlassian.design/foundations/color "accent"

- **RULE [SYS-ADS-03]** Hold contrast at 4.5:1 for text smaller than 24px and 3:1 for text 24px and larger and for UI essential to understanding; text on bold fills uses the paired inverse token.
  **Why** Emphasis ladders are only safe if the bold end has a dedicated foreground. [computed] white on brand-bold `#1868DB` 5.2:1; white on success-bold `#5B7F24` 4.66:1; `#292A2E` on warning-bold `#FBC828` 9.14:1.
  **Applies to** all
  **Check** computed contrast on every text/background pair; `warning.bold` background must use dark text.
  **Source** atlassian.design/foundations/color; contrast computed 2026-10-08

- **RULE [SYS-ADS-04]** Express "selected" with the `selected` tokens plus a second cue (check, underline, border or shape), never with brand, link or focus tokens; if an element is both selected and focused keep the selected treatment and add the focus ring; reserve `color.border.focused` for focus.
  **Why** One token one meaning; a colour alone fails colour-blind users and collides with hover.
  **Applies to** SaaS app UI
  **Check** selected element has non-colour differentiator; `border-focused` appears only in `:focus-visible` rules.
  **Source** atlassian.design/foundations/color "Interaction states"

- **RULE [SYS-ADS-05]** Pair surface and shadow by level (`surface.raised` with `shadow.raised`, `surface.overlay` with `shadow.overlay`), give default and sunken surfaces no shadow, limit raised to movable or focal items (one focal point per screen), and use sunken only as a backdrop for default-surface content (never on raised or overlay).
  **Why** Stacked cues must agree about height or the stack reads as broken; overuse of raised destroys the emphasis.
  **Applies to** SaaS app UI
  **Check** any element with an overlay shadow has overlay surface and z-index >= 300; count of raised cards in one viewport focal region <= 1 per focal group.
  **Source** atlassian.design/foundations/elevation

- **RULE [SYS-ADS-06]** In dark mode make higher elevation lighter (default `#1F1F21` < raised `#242528` < overlay `#2B2C2F`), keep the shadow pairing, add a 1px hairline ring to overlays, and contrast-check overlays separately.
  **Why** Shadows are barely visible on dark backgrounds, so surface lightness carries depth.
  **Applies to** SaaS app UI
  **Check** luminance(overlay) > luminance(raised) > luminance(surface); overlay text contrast >= 4.5:1.
  **Source** atlassian.design/foundations/elevation "Dark mode"; atlassian-dark.css

- **RULE [SYS-ADS-07]** Indicate scrolled content with a border at the cut-off for sticky headers/footers/navigation, and use the overflow shadow (`0 0 8px #1E1F2129`) only on small UI or bordered tables where a border could be missed.
  **Why** A visible edge tells users more content exists without adding a second elevation level.
  **Applies to** SaaS app UI
  **Check** sticky header has border/shadow when scrollTop > 0.
  **Source** atlassian.design/foundations/elevation "Scrolled content"

- **RULE [SYS-ADS-08]** Space with the 8px-based scale (2, 4, 6, 8, 12, 16, 20, 24, 32, 40, 48, 64, 80); use 0-8px inside compact UI, 12-24px for button padding and card inner space, 32-80px between page sections; group related items closer than unrelated ones; apply optical adjustment instead of equal spacing when visual weight differs.
  **Why** A named scale removes arbitrary values; the range guidance tells which scale step fits which tier.
  **Applies to** all
  **Check** padding/margin/gap values within the scale; related-group gap < between-group gap.
  **Source** atlassian.design/foundations/spacing

- **RULE [SYS-ADS-09]** Structure content with heading styles (7 sizes), one h1 per page, no skipped levels, never bold or enlarged body as a heading; default to body 14/20, use body-large 16/24 only for long-form, body-small 12/16 sparingly; reserve metric styles for emphasising numbers and the code style for code blocks.
  **Why** Semantic order is accessibility; role-specific styles prevent ad-hoc hierarchy.
  **Applies to** SaaS app UI | docs
  **Check** DOM: one `h1`; heading levels monotonic; computed sizes match token table.
  **Source** atlassian.design/foundations/typography; atlassian-typography.css

- **RULE [SYS-ADS-10]** Assign radius by role (badge 2, tag/lozenge/tooltip 4, button/input 6, card/dropdown 8, modal/page container/table 12, avatar full) and draw the focus ring 2px outside the element with radius = element radius + 2.
  **Why** A role map avoids one-off radii; a derived focus radius keeps the ring concentric.
  **Applies to** all
  **Check** computed radius of component classes in the role set; `outline-offset` 2px and ring radius = radius + 2.
  **Source** atlassian.design/foundations/radius

- **RULE [SYS-ADS-11]** Time motion by tier: interactions (hover, press) 50-150ms, transitions 150-400ms scaled to element size, exits faster than entrances (popup in 150ms, out 100ms; modal in 250ms, out 200ms), start motion immediately, lead with one focal motion, and make reduced motion instant.
  **Why** Large elements need time to be perceived; exits that outlast intent block work.
  **Applies to** all
  **Check** computed `transition-duration` on hover/press <= 150ms; modal enter <= 250ms; reduced-motion media query present.
  **Source** atlassian.design/foundations/motion; atlassian-motion.css

- **RULE [SYS-ADS-12]** Use bold-ease curves for large structural entrances (panels, flags: `0,0.4,0,1`), practical-ease for small ones (popups, hover fades: `0.4,1,0.6,1`), and the in-practical curve (`0.6,0,0.8,0.6`) for every exit.
  **Why** Matching curve to element size and direction makes motion feel intentional and consistent across components.
  **Applies to** SaaS app UI
  **Check** transition-timing-function in {the four tokens}; exits use in-practical.
  **Source** atlassian.design/foundations/motion; atlassian-motion.css

- **RULE [SYS-ADS-13]** Use one primary button per page or area; avoid disabling buttons (keep them pressable and explain via validation); never put tooltips on disabled buttons; align the primary with the group's alignment (right-aligned group: primary right; left-aligned: primary left; centre only in benefit modals and login); label in sentence case, verb first, no articles, no punctuation.
  **Why** Disabled buttons are not focusable and cannot explain themselves; alignment keeps the primary where the eye ends.
  **Applies to** forms | SaaS app UI
  **Check** primary button count per region <= 1; `disabled` submit buttons = 0; tooltip not attached to `[disabled]`.
  **Source** atlassian.design/components/button/usage [secondary]

- **RULE [SYS-ADS-14]** Write errors with an optional title of 3-4 words (not explaining the fix), a 1-2 sentence body (reason, what to do, what happens if not), and a 1-2 word specific verb CTA with a visible dismiss; use "you" not "we"; avoid "sorry" and "please" unless the consequence is severe and irreversible.
  **Why** "Sorry" inflates severity, "please" makes required steps sound optional, "we" assigns blame.
  **Applies to** forms | messaging
  **Check** regex: `\bsorry\b`, `\bplease\b`, `\bOK\b` as CTA; title word count <= 4 (excluding articles).
  **Source** atlassian.design/foundations/content/designing-messages/error-messages

- **RULE [SYS-ADS-15]** Tune tone to the user's emotional state: bolder and more optimistic for ambitious daily users, more prescriptive and less optimistic for new or confused users, no wink in error or warning states, delight only after trust, concise, global-audience-safe humour.
  **Why** The same line can encourage a power user and condescend to a new user.
  **Applies to** all
  **Check** copy review per state; error/warning strings contain no emoji/jokes.
  **Source** atlassian.design/foundations/content/voice-tone

- **RULE [SYS-ADS-16]** Map z-index to layer meaning (navigation 200, inline dialog 300, popup 400, blanket 500, modal 510, flag 600, spotlight 700, tooltip 800) and elevation style (navigation default; dialog/popup/modal/flag/spotlight overlay; blanket and tooltip none).
  **Why** A single ordered table eliminates z-index wars.
  **Applies to** SaaS app UI
  **Check** computed z-index values of overlay components ⊂ the table.
  **Source** atlassian.design/foundations/elevation "Z-index and layering"

## 3. Numbers & scales

| Group | Values |
|---|---|
| Space (px) | 0, 2, 4, 6, 8, 12, 16, 20, 24, 32, 40, 48, 64, 80; negative -2 to -32 |
| Radius (px) | xsmall 2, small 4, medium 6, large 8, xlarge 12, xxlarge 16, full 9999, tile 25%; focus radius +2 (4, 6, 8, 10, 14, 18) |
| Border width (px) | default 1, selected 2, focused 2 |
| Type (px/lh) | heading xxlarge 32/36, xlarge 28/32, large 24/28, medium 20/24, small 16/20, xsmall 14/20, xxsmall 12/16 (all weight 653; finesse theme 500 for medium to xxsmall); body-large 16/24, body 14/20, body-small 12/16 (weight 400); metric large 28/32, medium 24/28, small 16/20; code 0.875em/1 mono; paragraph spacing 16 / 12 / 8 |
| Weights | 400, 500, 600, 653 |
| Motion (ms) | 0, 50, 100, 150, 200, 250, 400, 600 |
| Easings | out-practical `0.4,1,0.6,1`; in-practical `0.6,0,0.8,0.6`; out-bold `0,0.4,0,1`; inout-bold `0.4,0,0,1`; spring = 65-point `linear()` overshooting to 1.024 |
| Button | height 32 default / 24 compact; font body 14/20 weight 500; padding-block 6 / 2; column gap 4-6; radius 6 |
| Light surfaces | `#FFFFFF`, sunken `#F8F8F8`, hovered `#F0F1F2`, pressed `#DDDEE1` |
| Light text | `#292A2E`, subtle `#505258`, subtlest `#6B6E76`, disabled `#080F214A`, link `#1868DB` |
| Light borders | default `#0B120E24`, bold `#7D818A`, input `#8C8F97`, focused `#4688EC` |
| Light roles (bold bg) | brand/information `#1868DB`; danger `#C9372C`; success `#5B7F24`; warning `#FBC828`; discovery `#964AC0`; selected-bold `#1868DB` |
| Dark | surface `#1F1F21`, raised `#242528`, overlay `#2B2C2F`, sunken `#18191A`; text `#CECFD2`, subtle `#A9ABAF`, subtlest `#96999E`; brand-bold `#669DF1`; danger-bold `#F87168`; success-bold `#94C748` |
| Shadows | raised `0 1px 1px #1E1F2140, 0 0 1px #1E1F214F`; overlay `0 8px 12px #1E1F2126, 0 0 1px #1E1F214F`; overflow `0 0 8px #1E1F2129, 0 0 1px #1E1F211F` |
| Z-index | 200, 300, 400, 500, 510, 600, 700, 800 |
| Contrast [computed] | text 14.34; subtle 7.81; subtlest 5.1; input border 3.24; dark text 10.56; dark subtlest 5.76 |

Counts: 467 `--ds-*` tokens in the light colour theme (208 background, 100 chart, 49 text, 40 border, 23 icon, 13 surface, 5 shadow, 4 link, 3 blanket, 2 interaction, 2 skeleton, 2 opacity), 79 motion tokens, 14 space tokens + 9 negative. Components: 89 listed in 14 categories, 5 deprecated, 84 current.

## 4. Dos and Don'ts

- **Do** structure with heading styles and heading levels. **Don't** use bold or larger body text instead; **Don't** skip heading levels or use more than one h1.
- **Do** keep the primary button where the group alignment ends. **Don't** disable a submit button; validate instead. **Don't** attach a tooltip to a disabled button.
- **Do** use body M 14/20 by default; **Don't** use body S or XXS headings as default text.
- **Do** put raised on a movable card with one focal point; **Don't** place sunken on raised or overlay surfaces; separate with whitespace or borders there.
- **Do** write "Passwords must be at least 8 characters." **Don't** add apology or filler to an error.
- **Do** use `color.border.focused` for focus only.
- **Do** replace elevation surface tokens with solid background tokens only when you need a different colour.

## 5. Exceptions & judgement calls

- Elevation hover/press transitions (overlay on hover, raised on press) are an alternative to hover/pressed surface tokens for default and raised levels; do not combine both and avoid on very small UI [verified].
- Centre-aligned buttons are allowed in benefit modals and login forms [secondary].
- Radius values are "indications and subject to change"; the focus-radius table is for design files while code components handle it automatically.
- Tokens such as motion and `finesse` are behind feature flags (`platform-dst-motion-uplift`, `platform-dst-tokens-finesse`). [engine note] Treat motion values as a strong reference but not a frozen contract.
- Body text uses 14px default; headings in the finesse theme drop from 653 to 500 weight. [engine note] That is a fingerprint of the newer Atlassian look: lighter headings, neutral selected states (`#292A2E`) instead of brand blue.
- The spring easing is shipped as a 65-point `linear()` approximation; use it only for expressive moments (it overshoots 2.4%).
- Brand typography (Charlie Display/Text) is separate from product typography (Atlassian Sans/Mono); marketing pages should not use app fonts.

## 6. Figures worth keeping

None captured. Candidates: elevation level diagram (sunken/default/raised/overlay), colour roles matrix, radius-by-component chart, spacing range examples, and button-group alignment do/don'ts.

## 7. Open questions

- Grid and breakpoints: foundations/grid-beta text was empty; layout grid component is deprecated; breakpoint values unknown.
- Text field height, select, toggle, checkbox size values: not captured (textfield CSS shows padding-block variants space.025/050/075/100 and a 1px border; resolved heights unknown).
- Atlassian Sans/Mono files are not publicly downloadable; what the font fallback chain renders as is Segoe/Helvetica-like.
- Border width tokens page, density modes beyond compact: not read.
- Whether "increased contrast" themes lift all text to 7:1: package has the theme (20,754 chars) but contrast pairs were not analysed.
- Writing-guideline sub-pages (capitalization, punctuation, numbers) returned 404 at the guessed URLs; only voice-tone and error-message pages were read.
- URLs: https://atlassian.design/foundations/{color,spacing,typography,elevation,motion,radius,accessibility,content,content/voice-tone,content/designing-messages/error-messages}, https://atlassian.design/components, https://atlassian.design/components/button/usage; npm @atlaskit/tokens, @atlaskit/button, @atlaskit/textfield.
