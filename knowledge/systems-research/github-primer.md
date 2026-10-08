---
source: web:primer.style + github.com/primer/primitives (npm @primer/primitives 11.10.0, MIT) + @primer/react 38.40.1 (MIT)
chapter: GitHub Primer, tokens, themes, components, patterns
pages: n/a (web research, date-stamped 2026-10-08)
topic_tags: [design-system, primer, tokens, color-roles, themes, high-contrast, density, forms, motion, elevation, dark-mode, accessibility, content]
status: studied
---

# GitHub Primer

Machine-readable profile: `system/systems-research/github-primer.json`. Raw package copies (untrusted data, gitignored): `corpus/web/systems/primer/`, `corpus/web/systems/primer-react/`.

Evidence grading (same convention as `knowledge/web/color-and-surfaces.md`): **[verified]** read from the shipped package files or a fetched primer.style page in this session; **[computed]** produced by a script in this session (WCAG 2.x luminance formula); **[secondary]** summarised by the fetch tool from a long page (treat as a lead); **[engine note]** my own inference.

## 1. Core ideas

1. **Primer is a three-tier token system and the tiers are enforced by prose, not just structure.** base (raw scales, never used directly) to functional (themed, the default choice) to component/pattern (sparingly). The Color usage page says base tokens "don't respect color modes" and must not be used in code or design [verified, primer.style color-usage]. The same rule is written as machine instructions in `DESIGN_TOKENS_GUIDE.md` inside the npm package: "You are a CSS expert. Never use raw values (hex, px, etc.). Only use semantic tokens." [verified].
2. **Colour is a grammar of three roles times two emphases.** Properties `bgColor`, `fgColor`, `borderColor`; semantic hues `accent, success, attention, danger, severe, done, sponsors, neutral` (+ aliases `open, closed, draft, upsell`); emphasis levels `muted` (tint) and `emphasis` (strong). Rule of use: emphasis background must be paired with `fgColor-onEmphasis`; muted background takes the semantic foreground; `bgColor-muted` never takes `fgColor-muted` [verified, guide pairing matrix].
3. **The neutral scale 0-13 is the contrast contract.** Steps 0-5 backgrounds, 7-8 borders/dividers, 9-10 text/icons; step 9 is the minimum for text on steps 0-4, step 10 on steps 5-6, step 8 is the minimum for interactive control borders vs `bgColor-muted`; the light and dark scales are mirror images so functional tokens need no per-theme override [verified, primer.style color-usage + figma scales].
4. **Fourteen themes from one source.** light, dark, dark-dimmed, each with high-contrast, colour-blind (`colorblind`) and `tritanopia` variants, with high-contrast variants of those [verified: 14 css files in `dist/css/functional/themes`; docs page still says nine themes]. Semantic roles remap in colour-blind themes (success becomes blue `#0969da`, danger becomes orange `#bc4c00` in light-colorblind) rather than components being redrawn [verified].
5. **Typography is shipped as `font` shorthand tokens per role.** `--text-body-shorthand-medium` is weight + size/line-height + family in one declaration, so the three cannot drift. The guide says to downgrade one size level on mobile and never use caption for multi-line text [verified].
6. **Density is a three-mode axis on every control size.** `--control-{xsmall..xlarge}-paddingInline-{condensed|normal|spacious}`, with stack gaps 8/16/24 and a pointer-aware target size (16px fine, 44px coarse) [verified].
7. **Motion has a hard cap and an asymmetry.** Micro 100 / short 200 / medium 300 / long 500 ms; enter = 300ms easeOut, exit = 200ms easeIn; "NEVER exceed 500ms for UI", "MUST respect prefers-reduced-motion" [verified].
8. **Patterns are specified as thresholds, not adjectives.** Loading: <1s nothing, 1-3s indeterminate, 3-10s determinate, >10s determinate + background task. Forms: validate on submit; 3+ errors get a summary Banner whose items are anchor links; inline validation only after a field is changed and blurred; validation over 1 second shows a loader [secondary, primer.style patterns pages].
9. **Border-led, low-ornament depth.** Default separation is a 1px `#d1d9e0` hairline; resting shadows are tiny; floating shadows are layered and, in dark themes, gain a 1px `#3d444d` ring because shadows vanish on dark [verified in theme CSS].
10. **Copy is part of the system.** Sentence case everywhere, seventh-grade reading level, imperative verb labels, "sign in" not "log in", no "Oops", no humour in errors [secondary, primer.style content foundations].

## 2. Rules

- **RULE [SYS-PRIMER-01]** Use functional tokens (`bgColor-*`, `fgColor-*`, `borderColor-*`, `shadow-*`, `control-*`) in product code; use base scale tokens only as the source for other tokens; use component tokens only when no functional token expresses the value.
  **Why** Base tokens ignore colour mode, so one hard reference breaks dark, dimmed, high-contrast and colour-blind themes at once.
  **Applies to** SaaS app UI | design systems | all
  **Check** grep product CSS for `--base-`, raw hex or raw px on colour/space properties; any hit outside a token definition is a FAIL.
  **Source** primer.style/product/getting-started/foundations/color-usage; DESIGN_TOKENS_GUIDE.md "Core Rule" (npm @primer/primitives 11.10.0)

- **RULE [SYS-PRIMER-02]** Pair every emphasis background with the on-emphasis foreground and every muted background with the semantic (or default) foreground; never put `fgColor-muted` on `bgColor-muted`.
  **Why** Each pair is contrast-tested together; mixing breaks the guarantee. [computed] `#ffffff` on `bgColor-success-emphasis #1f883d` is 4.52:1 (only 0.02 above AA), so even the sanctioned pair has almost no slack.
  **Applies to** all
  **Check** computed contrast of every text/icon over its background >= 4.5:1 (3:1 for large text and icons); flag any `fgColor-muted` whose parent background is `bgColor-muted`.
  **Source** DESIGN_TOKENS_GUIDE.md "Logic Matrix: Color Pairings"; contrast computed 2026-10-08

- **RULE [SYS-PRIMER-03]** Build the neutral ladder so that body text sits at step 9-10 (light `#59636e` / `#454c54`, dark `#9198a1` / `#b7bdc8`) or darker, control borders at step 8 (`#818b98` light, `#656c76` dark), decorative dividers at step 6-7 (`#d1d9e0`, `#3d444d`), and surfaces at steps 0-5.
  **Why** Roles by step make contrast a property of the ladder; interactive borders need >= 3:1, dividers may be quieter. [computed] `#818b98` on `#f6f8fa` is 3.24:1; `#d1d9e0` on white is only 1.43:1.
  **Applies to** SaaS app UI | design systems
  **Check** border colour of any input/button vs adjacent surface >= 3:1; decorative border <= 3:1 is acceptable; text >= 4.5:1.
  **Source** primer.style color-usage "Neutral scales (0-13)"; contrast computed 2026-10-08

- **RULE [SYS-PRIMER-04]** Define all five interactive states for every control (rest, `:hover`, `:focus-visible`, `:active`, disabled) and express disabled with dedicated disabled tokens, never `opacity`.
  **Why** Opacity lowers contrast unpredictably and stacks with other alpha tokens; dedicated tokens can be contrast-tuned. `:focus` alone shows rings on mouse clicks.
  **Applies to** all interactive elements
  **Check** for each `button, a, input, select, [role=button]` rule set: presence of `:hover`, `:focus-visible`, `:active`, `:disabled` or `[aria-disabled=true]`; no `opacity` < 1 on disabled selectors.
  **Source** DESIGN_TOKENS_GUIDE.md "Interactive States Checklist" and golden button example

- **RULE [SYS-PRIMER-05]** Draw the keyboard focus indicator as a 2px solid outline in `focus-outlineColor` (accent blue) with a -2px (inset) offset on controls that sit inside a container.
  **Why** An inset ring cannot be clipped by `overflow:hidden` parents and keeps its 3:1 contrast against the control itself.
  **Applies to** all
  **Check** computed `outline-width` = 2px and `outline-style` solid on `:focus-visible`; outline colour contrast vs both the control and the page >= 3:1.
  **Source** primitives `focus-outline-width: 0.125rem`, `focus-outline-offset: -0.125rem` (dist/css/functional/size/border.css)

- **RULE [SYS-PRIMER-06]** Use only the five control heights 24, 28, 32 (default), 40, 48 px, with paddingInline from {condensed, normal, spacious} = {8, 12, 16} (xsmall {4, 8, 12}); on coarse pointers raise the target to at least 44px.
  **Why** A closed set of heights lets controls align in a row without per-pair tuning; density is then a single switch.
  **Applies to** SaaS app UI | forms | mobile
  **Check** computed `min-height`/`height` of controls in set; `@media (pointer: coarse)` target >= 44px.
  **Source** primitives `control-*-size` and `control-minTarget-*` tokens (dist/css/functional/size/size.css, size-coarse.css)

- **RULE [SYS-PRIMER-07]** Set text with the role shorthand (weight, size/line-height, family together); body-medium is 14/21, title-medium 20/32.5, caption 12/15 and is single-line only; keep measure near or under 80 characters, left-aligned.
  **Why** Splitting size, line-height and weight lets them drift; caption's tight 1.25 leading fails for multi-line reading.
  **Applies to** SaaS app UI | marketing (product pages only)
  **Check** computed font-size/line-height pairs match the role table; `max-width` of paragraphs <= ~80ch; no `font-weight` outside {300, 400, 500, 600}.
  **Source** typography.css (dist); primer.style typography foundations; DESIGN_TOKENS_GUIDE.md "Typography"

- **RULE [SYS-PRIMER-08]** Cap UI transitions at 300ms (100ms hover, 200ms state change, 300ms enter), make exit faster than enter (200ms easeIn), use no motion token over 500ms, and replace motion with an instant change under `prefers-reduced-motion`.
  **Why** Interface motion that outlasts the user's intent feels like lag; faster exits keep dismissed elements from blocking the next action.
  **Applies to** all
  **Check** computed `transition-duration` <= 300ms on interactive elements; presence of `@media (prefers-reduced-motion: reduce)` zeroing transitions.
  **Source** motion.css (dist); DESIGN_TOKENS_GUIDE.md "Motion" keywords table

- **RULE [SYS-PRIMER-09]** Tie elevation to stacking: resting shadows with default/sticky layers; `floating-small`/`medium` with dropdown (200) / overlay (300); `floating-large`/`xlarge` with modal (400) / popover (500); add a 1px ring (`0 0 0 1px`) to floating shadows so edges survive dark themes.
  **Why** Shadow size predicts how far an element floats, so z-index and shadow disagreeing reads as a bug; on dark backgrounds blur shadows disappear.
  **Applies to** SaaS app UI
  **Check** each element with `z-index` >= 200 has a floating shadow; dark floating shadow starts with a 1px ring.
  **Source** DESIGN_TOKENS_GUIDE.md "Shadow <-> Z-Index Alignment"; dark.css shadow-floating-*

- **RULE [SYS-PRIMER-10]** Validate forms on submit; do not disable the submit button; with three or more errors show an error summary Banner of anchor links that focus each input, otherwise focus the first invalid input; mark invalid inputs `aria-invalid="true"` and link messages with `aria-describedby`; hide the caption while the error shows.
  **Why** Disabled submit buttons explain nothing; focus management replaces live regions for validation so screen-reader users land on the problem.
  **Applies to** forms
  **Check** `button[type=submit]:disabled` count = 0 on an empty form; invalid inputs expose `aria-invalid` and a resolvable `aria-describedby`.
  **Source** primer.style/product/ui-patterns/forms [secondary]

- **RULE [SYS-PRIMER-11]** Pick the loading indicator by expected duration: under 1s none, 1-3s indeterminate (spinner), 3-10s determinate (progress), over 10s determinate plus background task; use skeletons for large regions and avoid layout shift.
  **Why** An indicator flashing for under a second is more distracting than the wait; known duration deserves a determinate cue.
  **Applies to** SaaS app UI
  **Check** visual / review: indicator type vs measured latency; CLS of region swap ~0.
  **Source** primer.style/product/ui-patterns/loading [secondary]

- **RULE [SYS-PRIMER-12]** Put one primary Button in a view, at the end of a ButtonGroup, paired with a secondary; use the secondary (default) variant most of the time; label in sentence case with no line break; show selected values inside selector buttons (`2 selected`), not comma lists.
  **Why** Primary loses meaning when repeated; the default variant keeps hierarchy readable.
  **Applies to** all
  **Check** count of `primary` buttons per viewport region <= 1; button label has no `<br>`/wrap and matches sentence case.
  **Source** primer.style/product/components/button/guidelines [secondary]

- **RULE [SYS-PRIMER-13]** Make Dialog header title and close button mandatory (title may be visually hidden; close must be visible), keep a 16px safe area and 8px close inset, put primary actions on the right and secondary on the left, never dismiss on backdrop click when a form is dirty, nest at most two Dialogs, use full-screen on narrow viewports when inputs exist.
  **Why** A dialog without a title or a visible exit traps users and screen readers; dirty-form backdrop dismissal destroys work.
  **Applies to** SaaS app UI | mobile
  **Check** every `[role=dialog]` has an accessible name and a visible close control; dirty-form dialog ignores backdrop click.
  **Source** primer.style/product/components/dialog/guidelines [secondary]

- **RULE [SYS-PRIMER-14]** Provide `inactive` as a distinct state from `disabled`: inactive looks muted for every variant but stays focusable, keeps compliant contrast, and must open a dialog or tooltip that explains why.
  **Why** Disabled controls are unreachable and silent; a blocked-but-explainable action needs an accessible alternative.
  **Applies to** SaaS app UI
  **Check** inactive control is in tab order; has an explanatory dialog/tooltip; contrast >= 4.5:1.
  **Source** primer.style button guidelines [secondary]; @primer/react Button prop `inactive` docs (generated/components.json)

- **RULE [SYS-PRIMER-15]** Ship the system spec as an LLM-readable guide: RFC 2119 keywords (MUST, SHOULD, NEVER), decision trees (easing choice), a golden example, and a hallucination guard that makes an unrecognised token name carry a `/* check-token */` marker.
  **Why** Agents invent plausible token names; explicit guard text turns silent failure into a greppable one.
  **Applies to** design systems | this engine
  **Check** tool: extract every `var(--*)` from generated CSS and diff against the token list; report unknown names.
  **Source** DESIGN_TOKENS_GUIDE.md "Hallucination Guard"

- **RULE [SYS-PRIMER-16]** Write copy in sentence case with no end punctuation on headings, labels or buttons, imperative verb first ("Save preferences"), no exclamation marks, no "Oops", no humour in errors or loading, error text says what to do ("Enter a credit card number", not "Field required"), link text never "here".
  **Why** Predictable wording is faster to scan and localises; blame-free errors reduce abandonment.
  **Applies to** all
  **Check** regex on UI strings: Title Case buttons, trailing `.` on labels, `!`, `Oops`, `click here`.
  **Source** primer.style/product/getting-started/foundations/content [secondary]

## 3. Numbers & scales

| Group | Values |
|---|---|
| Base size scale (px) | 2, 4, 6, 8, 12, 16, 20, 24, 28, 32, 36, 40, 44, 48, 64, 80, 96, 112, 128 (plus negatives to -48) |
| Functional space (px) | xxs 2, xs 4, sm 8, md 12, lg 16, xl 24; stack gap/padding 8/16/24 |
| Radius (px) | small 3, medium 6 (default), large 12, full 9999; overlay 6 |
| Border width (px) | thin 1 (default), thick 2, thicker 4; focus outline 2px offset -2px |
| Control heights (px) | xsmall 24, small 28, medium 32, large 40, xlarge 48; min target fine 16 / coarse 44 |
| Control padding-inline (px, condensed / normal / spacious) | xsmall 4/8/12; small-xlarge 8/12/16 |
| Control padding-block (px) | xsmall 2, small 4, medium 6, large 10, xlarge 14 |
| Overlay widths (px) | xsmall 192, small 320, medium 480, large 640, xlarge 960 |
| Breakpoints (px) | xsmall 320, small 544, medium 768, large 1012, xlarge 1280, xxlarge 1400 |
| Page max widths | full 1280 (24px padding at xlarge+), interstitial 320 |
| Type (px / line-height) | display 40/55 w500; title-large 32/48 w600; title-medium 20/32.5 w600; title-small 16/24 w600; subtitle 20/32.5 w400; body-large 16/24; body-medium 14/21; body-small 12/19.5; caption 12/15; code-block 13/19.5 |
| Line-height scale | tight 1.25, snug 1.375, normal 1.5, relaxed 1.625, loose 1.75 |
| Motion (ms) | 100 micro, 200 short, 300 medium, 500 long; base 0-1000 in 50-100 steps |
| Easings | ease `0.25,0.1,0.25,1`; easeIn `0.7,0.1,0.75,0.9`; easeOut `0.3,0.8,0.6,1`; easeInOut `0.6,0,0.2,1` |
| z-index | behind -1, default 0, sticky 100, dropdown 200, overlay 300, modal 400, popover 500, skipLink 600 |
| Light colours | bg `#ffffff`, muted `#f6f8fa`, fg `#1f2328`, fg-muted `#59636e`, border `#d1d9e0`, accent `#0969da`, success `#1a7f37`/`#1f883d`, danger `#d1242f`/`#cf222e`, attention `#9a6700`, severe `#bc4c00`, done `#8250df` |
| Dark colours | bg `#0d1117`, muted `#151b23`, inset `#010409`, fg `#f0f6fc`, fg-muted `#9198a1`, border `#3d444d`, accent fg `#4493f8`, success `#3fb950`, danger `#f85149` |
| Dark-dimmed | bg `#212830`, muted `#262c36`, fg `#d1d7e0` |
| Contrast [computed] | fg-default on white 15.8; fg-muted 6.11; accent link 5.19; white on success-emphasis 4.52; dark fg-muted on `#0d1117` 6.5; HC border `#454c54` on white 8.7 |

Counts: 959 unique custom properties in `light.css`; 1120 across functional CSS; 62 documented components (80 entries in React `components.json`: alpha 56, deprecated 11, draft 7, beta 6).

## 4. Dos and Don'ts

- **Do** `font: var(--text-body-shorthand-medium)`; **Don't** set `font-size: 14px; line-height: 1.5; font-weight: 400` separately (loses sync).
- **Do** `background: var(--bgColor-danger-emphasis); color: var(--fgColor-onEmphasis);` **Don't** `color: var(--fgColor-muted)` on `--bgColor-muted`.
- **Do** `transition: background-color var(--motion-transition-hover)` and disable it under `prefers-reduced-motion`; **Don't** fade in a modal for 800ms.
- **Do** show the error summary Banner at three or more errors; **Don't** use live regions for form validation or browser-native bubbles.
- **Do** write "Sign in"; **Don't** write "Log in", "Oops, something went wrong", or "Click here".
- **Don't** re-order heading tags to get a visual size; use the style token instead (h2 before h1 is explicitly a fail).

## 5. Exceptions & judgement calls

- Contrast numbers: the success primary button is the system's signature but its white label sits at 4.52:1, so any tint or alpha change (for example the translucent border) can push a derivative below AA. [engine note] If we adopt this pattern, test the hover/active/disabled variants too: `#1c8139` hover and `#197935` active are darker so they improve; disabled is `#95d8a6` with `#ffffffcc` text, which is intentionally exempt.
- Docs vs package drift: the Color usage page says nine themes, the package ships 14; the typography page says line heights align to a 4px grid, but 14px x 1.5 = 21px and 12px x 1.625 = 19.5px. Trust the package.
- Fine-pointer minimum target of 16px is under WCAG 2.2 AA 24px target size; the system relies on control heights (>= 24px) rather than the tiny `minTarget` token. [engine note] Keep icon-only buttons at >= 24px.
- Marketing: Primer Product UI has almost no brand vocabulary. For landing pages GitHub uses Primer Brand (not studied here).
- Mona Sans is the first family in the stack, but the files are separate assets with their own licence terms (not verified); do not assume it is redistributable.
- Primer docs describe the neutral scale and pairing rules in prose, but the primitives docs pages (size, typography, color) list values with almost no usage text; the usage rules live on foundations pages and in the package guide.

## 6. Figures worth keeping

No page images captured in this pass (WebFetch returns text only). Candidate pages to screenshot later for `examples/`: primer.style color-usage (neutral scale diagram), button guidelines (variant matrix), forms pattern (error summary), dialog guidelines (anatomy).

## 7. Open questions

- Exact Primer Button size/variant matrix (sizes small 28 / medium 32 / large 40 are inferred from control tokens; React docs list variants default, primary, invisible, danger, outline?) not read in full; `button-outline` and `button-star` tokens exist but the outline variant status is unverified.
- Primer "Do/Don't" images on component pages were not readable through the text fetch.
- Whether `Mona Sans VF` is loaded by github.com product pages or only declared first in the stack: unknown.
- Accessibility pages (focus management, colour considerations, designer checklist) were not read beyond the hub; they likely hold the concrete WCAG targets.
- Primer Brand (marketing) system: not studied.
- URLs fetched: https://primer.style/product/getting-started/, /product/primitives/{color,typography,size}/, /product/components/button/guidelines/, /product/components/dialog/guidelines/, /product/ui-patterns/{forms,empty-states,loading}/, /product/getting-started/foundations/{color-usage,typography,content,layout}/, /product/components/, /accessibility/. Package sources: https://www.npmjs.com/package/@primer/primitives, https://www.npmjs.com/package/@primer/react, https://github.com/primer/primitives, https://github.com/primer/react.
