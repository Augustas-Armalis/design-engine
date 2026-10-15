---
source: ui-pedia
chapter: Color (Principles)
pages: 35-70
topic_tags: [color, palette, color-theory, color-psychology, 60-30-10, tints-shades-tones, interactive-color, status-color, accessibility, contrast, brand]
status: studied
---

# Color (Principles)

Page convention: all "p.NN" are PDF pages (printed page = PDF page - 1). Images for the instructive figures are in `examples/ui-pedia/color/p-NNNN.jpg`.

The chapter is half colour psychology told through brand logos (pp.38-47, 57-58), half colour-theory scheme types with a mini UI mockup per scheme (pp.49-56), then practical UI rules (pp.58-68): 60/30/10, tints/shades/tones, saturation, interactive colour, status colour, accessibility, simplicity. Much of the psychology is anecdotal and brand-based; the practical UI rules are the strongest material. Weak or unsourced claims are labelled (opinion) or (claim).

## 1. Core ideas

1. Colour is communication: each colour evokes an image or emotion, can reflect a brand's individuality, and shapes mood, tone, concept and meaning (p.35, p.36). So choose it deliberately, never "on the heat of a moment" (p.36).
2. Meaning is partly cultural and must be matched to the target audience and objective, not picked in the abstract (p.38).
3. Warm hues (red, orange, yellow) read as warmth, comfort, excitement, joy; cool hues (blue, green, indigo, violet) read as calm, trust, confidence. Almost every hue carries a positive and a negative reading (red = love and rage), so context decides (pp.39-47).
4. Colour must agree with brand personality: you cannot use colours that contradict what the brand is trying to portray (p.57). Ask who the customer is, what tone, what value proposition, how established the brand is ("fresh and exciting" vs "tried and true") (p.58).
5. Build the palette from a small number of colours in a fixed proportion: 60% neutral, 30% secondary brand colour, 10% main brand colour; at most three primary colours (pp.59-61). The main brand colour is the smallest share, i.e. an accent.
6. Pick a scheme type from the wheel (monochromatic, triad, complementary, analogous, tetradic, square, split-complementary) according to how much contrast and tension the interface needs (pp.50-56). Contrast on the wheel = tension and focus; closeness on the wheel = calm (p.63-64).
7. Derive variants of a hue by adding white (tint), black (shade) or grey (tone), and use them subtly to enhance major elements and to express UI states (pp.62-63, 65).
8. Reserve one hue for primary interaction so it acquires a single meaning for the user; use its darker/lighter variants for hover/pressed/disabled (pp.64-65).
9. Reserve a separate set of "denotative" colours for status (error, success, warning, info) and do not reuse a brand colour for them (p.65-66).
10. Colour must never be the only carrier of information: check contrast with a checker, and make distinctions survive in greyscale through light/dark value or other cues (pp.66-67).
11. Simplicity wins: two contrasting hues or one monochromatic scheme is easier to read than many colours in many places (p.68). Start in greyscale to force layout and spacing first (p.57).

## 2. Rules

### 2.1 Process and brand fit

- **RULE** Design the layout in grayscale first; only then choose a single brand colour, then choose the other colours that suit it.
  **Why** Greyscale "forces a layout of the elements and a renewed focus on spacing" and makes a complex visual element simpler (p.57).
  **Applies to** all. **Check** visual (render the page with `filter: grayscale(1)`; hierarchy and grouping must still read). **Source** (p.57)

- **RULE** Choose colours that are consistent with the brand's personality; never use colours that contradict what the brand is trying to portray.
  **Why** Colour sets the brand's mood, tone, concept and meaning, and the user connects it to the brand only if it agrees with it (p.36, p.57).
  **Applies to** landing page | SaaS app UI. **Check** visual / brief review: each palette colour can be justified by a brand attribute. **Source** (p.36, p.57)

- **RULE** Before committing to colour, define: brand personality, likely customers (the book names gender), tone to project, value proposition, and company age ("fresh and exciting" or "tried and true").
  **Why** The goal is a hue that becomes synonymous with the company later (p.58-59).
  **Applies to** landing page. **Check** the brief records these five answers before a palette is chosen. **Source** (p.58, p.59)

- **RULE** Keep the goal as "a simple UI with sensible colors" rather than maximal colour.
  **Why** Stated as the overall objective of colour selection (p.59).
  **Applies to** all. **Check** visual; count distinct hues (see 2.2). **Source** (p.59)

- **RULE** Match each hue's connotation to what the brand or product says (see the table in section 3): trust/security = blue, calm/regeneration = green, excitement = orange, joy = yellow, wealth/royalty = purple, energy/passion = red, mystery/modern = black, purity/clarity = white.
  **Why** Hues provoke particular emotions and "help to get the desired response" (p.38); technology brands choose blue to establish trust (p.42).
  **Applies to** landing page | brand. **Check** visual / brief. **Source** (pp.38-47)

- **RULE** Keep in mind that meaning depends on culture and context; the same colour can mean opposite things (red = love and anger; black = mystery and death; warm colours = comfort or rage).
  **Why** Each colour has "a unique meaning and connotation", partly culture-dependent (p.38, p.39-40, p.46).
  **Applies to** all. **Check** visual; confirm with target-market review. **Source** (p.38, p.39, p.40, p.46)

- **RULE** Run colour options past potential clients/users before launching a website or a new corporate logo.
  **Why** Cheap validation; the book frames it as "never a bad idea" (p.70).
  **Applies to** landing page | brand. **Check** process (ledger of the review). **Source** (p.70)

- **RULE** Take colour inspiration from nature and art (e.g. the many greens of grass); natural-looking colours are chosen by people and "appear to be user-friendly".
  **Why** Colours that appear natural feel familiar and friendly (p.69). (opinion)
  **Applies to** landing page | illustration. **Check** visual. **Source** (p.69)

- **RULE** Use a deliberate UX palette to help readability, strengthen CTA buttons, improve navigation and meet subconscious aesthetic needs.
  **Why** Appropriate colour aids information readability and elicits intuitive responses (p.37).
  **Applies to** all. **Check** visual. **Source** (p.37)

### 2.2 Palette structure and proportion

- **RULE** Distribute colour 60% / 30% / 10%: 60% a neutral ("any justifying neutral color"), 30% the secondary brand colour, 10% the main brand colour. The book writes it as 6:3:1 and calls it the Golden Rule / Golden Ratio of Colors.
  **Why** Produces a neat, harmonious interface, soothes the eye, and lets the viewer flow from one place to the next naturally (p.59, p.60).
  **Applies to** all. **Check** sample rendered pixels by colour family (neutral share about 60%, secondary about 30%, main brand colour about 10% of visible area). **Source** (p.59, p.60, p.61)

- **RULE** Use no more than three primary colours.
  **Why** Keeps the design from becoming jumbled and maintains equilibrium, especially with 60/30/10 (p.60).
  **Applies to** all. **Check** cluster dominant hues on the rendered page; non-neutral hue families of brand role <= 3. **Source** (p.60)

- **RULE** Apply it as: neutral for 60% of the design, secondary brand colour for 30%, main brand colour for 10% of the UI (the book's wording for a logo and for UI).
  **Why** Same proportion, stated for both logo and UI (p.60).
  **Applies to** all. **Check** as above. **Source** (p.60)

- **RULE** Reference pattern (Amazon, p.61): white page background = 60%; blue (dark navy in the screenshot) header/footer = 30%; yellow buttons and star ratings = 10%. The accent colour sits on actions and ratings, i.e. the elements the user should act on.
  **Why** The book presents it as good UI using the rule "to arouse people" (p.61).
  **Applies to** SaaS app UI | e-commerce landing page. **Check** the 10% colour appears only on CTAs/key signals. **Source** (p.61)

- **RULE** Avoid overcrowding and disorder; minimalism is "always preferable in user interfaces"; do not ignore colour combinations entirely.
  **Why** Crowded colour use produces a disordered interface (p.59).
  **Applies to** all. **Check** visual. **Source** (p.59)

- **RULE** Prefer a simple scheme: two contrasting hues, or a monochromatic scheme. Do not put many colours in many locations.
  **Why** Simple schemes are less distracting to the eye and make material easier to assimilate; too many colours "generates a convoluted interface that confuses the user". If the mind finds an app easy to look at, "half of a designer's job is done" (p.68).
  **Applies to** all. **Check** count distinct non-neutral hues on a screen (target <= 2 in the book's "simple" version; <= 3 in the 60/30/10 version). **Source** (p.68)

### 2.3 Colour-wheel scheme types

Wheel basis: Isaac Newton's colour wheel (1666) with primary red/blue/yellow, secondary orange/purple/green, tertiary = a primary mixed with a secondary (the book names magenta, vermillion, violet, teal, amber, chartreuse) (p.49). The wheel drawn is a 12-segment red/yellow/blue-based wheel (primary at 12 o'clock-style positions marked P, S, T).

- **RULE** Monochromatic: use tints, shades and tones of one hue, including black and white. Expect lower contrast than other schemes; compensate so the result is not lifeless.
  **Why** Full spectrum of one colour is cohesive but "the contrast is often lower ... making our creations appear lifeless" (p.50).
  **Applies to** all. **Check** contrast ratios between element tiers (see 2.7). **Source** (p.50)

- **RULE** Triad: three colours equally spaced on the wheel, used when the design needs more colours; make one colour prominent and the other two accents.
  **Why** Keeps balance in a three-hue scheme (p.51).
  **Applies to** landing page | brand-led UI. **Check** one hue family covers the majority of coloured area; others limited. **Source** (p.51)

- **RULE** Complementary: pair colours directly opposite each other for significant contrast. It is "the polar opposite of similar and monochrome". Example: an orange button on a blue background is difficult to overlook.
  **Why** Opposite hues give maximum contrast and so make a CTA stand out (p.52).
  **Applies to** CTAs on landing pages. **Check** hue difference about 180 degrees between CTA and its surroundings. **Source** (p.52)

- **RULE** Analogous: use hues immediately adjacent on the wheel where there is little need for contrast, such as page backgrounds or banners.
  **Why** Adjacent hues give "comparable harmony" with low contrast (p.53).
  **Applies to** backgrounds, banners, hero fills. **Check** hue spread of the scheme narrow (adjacent wheel segments). **Source** (p.53)

- **RULE** Tetradic (rectangle): four colours as two complementary pairs forming a rectangle on the wheel. It is the hardest to balance and "reserved for skilled designers"; works only if synchronised well.
  **Why** Many hues compete; payoff is rich result when done well (p.54).
  **Applies to** experienced use only. **Check** visual; keep one hue dominant. **Source** (p.54)

- **RULE** Square: four colours evenly spaced around the wheel. Works best when one colour dominates; also balance warm and cold hues.
  **Why** Evenly spaced hues have equal weight unless one is made dominant (p.55).
  **Applies to** brand-led UI. **Check** one hue holds the largest area share; both warm and cool present. **Source** (p.55)

- **RULE** Split-complementary: base colour plus the two colours adjacent to its complement. Same high visual contrast as complementary but "less tense".
  **Why** Keeps the contrast while softening the tension of an exact opposite pair (p.56).
  **Applies to** CTAs/accents where complementary feels too harsh. **Check** hue offsets of accent colours about 150 and 210 degrees from base. **Source** (p.56)

- **RULE** (figure-derived, not stated in the text) In every scheme mockup the type-and-button kit is built the same way: title and subheading are set in the scheme's darkest hue (near-black tinted with the scheme), body text is a neutral grey, the primary button is a solid fill in the strongest hue, the secondary button is a second hue (or a lighter tint) fill, and the tertiary button is an outline (or text-only) in the same hue.
  **Why** Visible across pp.50-56: hierarchy is carried by fill > tinted fill > outline.
  **Applies to** SaaS app UI | landing page. **Check** at most one solid fill per button group; lower tiers use tint/outline/text. **Source** (pp.50-56 figures)

### 2.4 Tints, shades, tones, brightness

- **RULE** Create variants of a hue on the wheel by: adding white = tint; adding black = shade; adding a mix of black and white (grey) = tone.
  **Why** These give systematic, harmonious variants of one hue ("extremely useful indicators for guiding the human brain to specific conclusions") (p.62, p.63).
  **Applies to** all. **Check** tokens derive from one base hue by mixing with white/black/grey. **Source** (p.62, p.63)

- **RULE** Use shades, tints and tones to enhance major design elements "in a subtle way", not as new unrelated colours.
  **Why** Keeps the palette cohesive while giving emphasis (p.62).
  **Applies to** all. **Check** visual. **Source** (p.62)

- **RULE** To make a dark variant, increase saturation while lowering brightness; to make brighter variants, do the opposite (HSB terms).
  **Why** Stated as the way to make dark/brighter colour variations (p.63). (Note: this is the HSB model shown on p.35.)
  **Applies to** token generation. **Check** HSB of dark variants: S up, B down vs the base. **Source** (p.63)

### 2.5 Contrast and saturation

- **RULE** Use strong contrast (colours on opposite sides of the wheel, black next to white) to create tension and make viewers focus; use light contrast for delightful, relaxing, laid-back feel. Decide by intent.
  **Why** Contrast between opposite hues is "always the most noticeable"; strong contrast creates tension and focus; light contrast relaxes (p.63, p.64).
  **Applies to** all. **Check** visual; contrast of focal element vs surroundings higher than of non-focal elements. **Source** (p.63, p.64)

- **RULE** Contrast is also a way to create a simple interface and elicit emotional responses.
  **Why** Stated as a "simple approach" (p.63).
  **Applies to** all. **Check** visual. **Source** (p.63)

- **RULE** Combine a highly saturated hue with less saturated colours; do not saturate everything. "Saturation overload kills color vibrancy"; less is nearly always more.
  **Why** One saturated colour among muted ones looks vivid (the Instagram logo is the example); many saturated colours cancel each other (p.64).
  **Applies to** all. **Check** only one hue family has high saturation; rest neutral or desaturated. **Source** (p.64)

### 2.6 Interactive and status colour

- **RULE** Use interactive colours for anything the user touches or clicks (links, buttons, other controls). Keep primary interactions to a single hue.
  **Why** "For the user, that color will begin to have a single meaning" (p.64).
  **Applies to** SaaS app UI | landing page. **Check** all primary buttons/links share one hue (computed `background-color`/`color` of `a`, `button`). **Source** (p.64)

- **RULE** Provide the interactive colour in dark and light variants and use these shades for states: pressed/hover (darker), disabled (lighter/washed). 
  **Why** Shades express status of UI elements; pressed and hover are named examples (p.65). The figure (p.64) shows default = saturated violet gradient, hover/pressed = darker indigo with cursor, disabled = pale lavender; loading = pale blue with spinner or progress bar.
  **Applies to** buttons, links. **Check** four states exist per interactive component with the same hue. **Source** (p.64, p.65)

- **RULE** (figure-derived, not stated in text) Purchase actions can have their own colour language. The p.64 figure shows a dark charcoal pill with yellow label ("ADD TO CART"), yellow pills with dark labels ("CHECKOUT", "PayPal" logo) and a blue pill ("Submit"); the pairs are high-contrast (yellow on charcoal, charcoal on yellow).
  **Why** Shown, not explained; the text only says to keep primary interactions to one hue.
  **Applies to** e-commerce flows. **Check** visual; each button's label/fill pair is a strong contrast. **Source** (p.64 figure)

- **RULE** Define a state palette: error, success, warning (the figure also has info). Red, green and (in the figure) yellow/amber and blue are used. Each status card has a tinted background, a tinted border, a solid-colour circular icon with white glyph, bold title, grey description, and a close X.
  **Why** Denotative colours "have meaning" and must be defined for states (p.65).
  **Applies to** SaaS app UI | forms | toasts/alerts. **Check** tokens `--success`, `--warning`, `--error`, `--info` exist; each pairs colour with an icon glyph. **Source** (p.65)

- **RULE** If a brand colour is red, do not use that red for error messages.
  **Why** A brand colour carrying a status meaning makes errors indistinguishable from branding (p.66).
  **Applies to** all. **Check** error colour differs in hue from brand primary. **Source** (p.66)

- **RULE** When picking the disabled-state colour, make sure it has sufficient contrast; users must be able to read it.
  **Why** Disabled does not mean unreadable (p.66).
  **Applies to** buttons, inputs. **Check** contrast of disabled text/label vs its fill (see 2.7). **Source** (p.66)

### 2.7 Accessibility

- **RULE** Check the contrast and accessibility level of the palette while choosing colours, so colourblind users can use the product. Use contrast checkers and accessibility checkers (WebAIM contrast checker, noCoffee, Accessibility Scanner).
  **Why** "You are creating an interface for the use of public" (p.66, p.67).
  **Applies to** all. **Check** computed contrast ratio per text/background pair. Book's own reference figure: WebAIM result 4.83:1 for a light violet foreground (about #9095FE) on a dark grey background (about #323232), which shows WCAG AA Pass and AAA Fail for normal text, AA Pass and AAA Pass for large text (p.67). **Source** (p.66, p.67)

- **RULE** Do not rely entirely on colour distinctions. Use light and dark hues (value difference) and techniques like cross-hatching to distinguish parts of the interface.
  **Why** Colour-blind people cannot use products that depend on colour alone (p.67).
  **Applies to** all, especially charts, status, buttons. **Check** desaturate the screenshot; elements and states must remain distinguishable. **Source** (p.67)

- **RULE** Let hierarchy survive greyscale: in the book's example the bad version fills both "Skip" (pink) and "Continue" (teal) buttons, which become two near-identical grey fills in greyscale; the good version keeps "Skip" as an outline (pink border/text) and "Continue" filled, so greyscale still shows outline vs solid.
  **Why** Colour-blind users and greyscale rendering lose hue, so primary vs secondary must differ in form (fill vs outline) too (p.66 figure).
  **Applies to** button pairs, any two-tier choice. **Check** greyscale screenshot; the primary and secondary controls differ in fill/weight, not hue only. **Source** (p.66)

### 2.8 Claims about colour effectiveness (source-stated; weak evidence)

- **RULE** (claim) Treat colour as a primary driver of first impressions: the book cites the "Institute for Color" saying customers assess online purchases in about 90 seconds, that colour influences 62% to 90% of product evaluations on a subconscious level, and "up to 85%" of customers say colour is the most important purchase factor.
  **Why** Used to justify care in logo, brand and packaging colour (p.36, p.57). No primary source given.
  **Applies to** brand decisions. **Check** n/a (motivation only). **Source** (p.36, p.57)

### Audit additions (audit 2026-10-15)

- **RULE** (figure-derived) In a dark UI, build the surfaces from two values of one hue and keep one bright accent for action and selection. The p.37 travel app uses #272343 for the page and #443D72 for every raised surface (the stat card and the sticky bottom price bar). Yellow #FFD803 marks the primary CTA ("Book Now"), the active tab (yellow label with a short underline narrower than the word), the rating stars, the inline "Continue reading" link and the location pin. Light blue #82C6FE marks the secondary text link ("Show on Maps", underlined) and two of the stat icons. Headings and body text are white, and meta labels (Duration, Distance, Sunny) are a muted lavender.
  **Why** Two surface steps of the same hue give depth without adding hues, and a single accent gives the eye one route to the action (p.37 figure).
  **Applies to** mobile | SaaS app UI. **Check** dark-theme surface tokens share one hue; the accent hue appears only on the CTA, the selected state, links and ratings. **Source** (p.37) (audit 2026-10-15)

- **RULE** (figure-derived) When the button fill is a light, high-luminance hue such as yellow, set the label in a dark colour, never white. Examples: "Book Now" is dark navy on #FFD803 (p.37), "CHECKOUT" is dark grey on yellow (p.64), the triad secondary is navy on yellow #FDF01F (p.51), and the monochromatic secondary is dark text on light pink #FFCECE (p.50).
  **Why** A light fill only stays readable with a dark label; white on yellow nearly disappears (see the p.53 counter-example in section 4).
  **Applies to** all. **Check** computed contrast of the button label against its fill. **Source** (p.37, p.50, p.51, p.64) (audit 2026-10-15)

- **RULE** Generate shades by mixing the base colour with black at the book's steps of 17%, 34%, 51%, 63% and 75% (100% = black). Generate tints by mixing the pure hue with white at 46%, 54%, 62%, 70% and 78% (100% = white). Sampling the p.62 swatches shows these are plain linear sRGB mixes. Shades of base #758BFD: 17% #6174D3, 34% #4D5CA8, 51% #39447C, 63% #2B335E, 75% #1E243E. Tints of pure #002AFF: 46% #758BFD, 54% #899CFD, 62% #9DADFD, 70% #B1BEFD, 78% #C6CFFD.
  **Why** Mixing with one fixed partner keeps every step on the same hue, so the ramp stays harmonious (p.62, p.63).
  **Applies to** token generation. **Check** recompute each token as mix(base, black or white, p) and compare the hex values. **Source** (p.62) (audit 2026-10-15)

- **RULE** (figure-derived) Take the UI base colour as a tint of the fully saturated hue, not the pure hue itself. On p.62, "Base Color" #758BFD (HSB 230 deg, S 54%, B 99%) is exactly pure #002AFF (S 100%) mixed with 46% white, and the hue, shade and tone rows all start from that tint.
  **Why** The pure 100%-saturation hue is kept only as the tint row's starting point. The working colour is a softer step that leaves room for darker and lighter variants on both sides (p.62).
  **Applies to** token generation. **Check** the brand base token is not a 100%-saturation primary; HSB S of the base is below 100. **Source** (p.62) (audit 2026-10-15)

- **RULE** For neighbouring hue variants, rotate the hue in 5-degree steps up to +/-15 degrees from the base while holding saturation and brightness. The p.62 hue row measures #74ACFB (-15, about 215 deg), #74A1FB (-10), #7495FB (-5), #758BFD (base, about 230 deg), #747FFB (+5), #7474FB (+10) and #7F74FB (+15, about 245 deg), all at S about 54% and B about 98%. The p.64 default SIGN UP gradient uses the same move: #7F64FC (251 deg) to #5E6AF5 (235 deg), roughly a 15-degree span at about the same S and B.
  **Why** A small hue rotation at constant S and B gives related colours that stay in one family (p.62).
  **Applies to** token generation | gradients. **Check** HSB of the variants: H differs from the base by multiples of 5 deg up to 15 deg; S and B equal the base's within a few points. **Source** (p.62, p.64) (audit 2026-10-15)

- **RULE** (figure-derived) Make the hover/pressed state by lowering brightness by about 30 points at the same hue and saturation. Make the disabled and loading states by dropping saturation to about 25% at the same brightness. Measured on p.64: default SIGN UP #7F64FC to #5E6AF5 (S about 60%, B 96-99%); hover #5A46B1 to #4349AC (S about 60%, B 67-69%); disabled #C8BDFD (S 25%, B 99%); Submit #1C71F0 (S 88%, B 94%) becomes "Submitting..." #B9CFF6 (S 25%, B 96%).
  **Why** The user reads the state as the same control turning darker (engaged) or washing out (unavailable) with no change of hue (p.64, p.65).
  **Applies to** buttons | links. **Check** HSB of each state token compared with the default: hover lowers B and keeps H and S; disabled lowers S and keeps H and B. **Source** (p.64) (audit 2026-10-15)

- **RULE** (figure-derived) For a loading state, change the label to the progressive verb with an ellipsis ("Submit" -> "Submitting..."), fade the button body to the light tint, and draw the progress indicator in the full-strength hue. The indicator is either a spinner placed before the label or a progress bar along the button's top edge (bar about #1870F2, the same blue as the default fill, shown about 70% complete).
  **Why** The faded body says "not clickable now", while the full-strength indicator shows the action is still running (p.64).
  **Applies to** buttons | forms. **Check** each submit button has a loading state; the indicator colour equals the default fill; the label text changes. **Source** (p.64) (audit 2026-10-15)

- **RULE** (figure-derived) Give solid filled buttons a soft drop shadow tinted with their own fill hue: a violet glow under SIGN UP and a blue glow under Submit (p.64), and a red-tinted shadow under the red Primary in the scheme kits (pp.50-53). Outline and text-only tiers have no coloured glow.
  **Why** The tinted shadow lifts the primary fill off a light page without adding a new colour (pp.50-56, p.64 figures).
  **Applies to** landing page | SaaS app UI (light themes; see section 5 for dark). **Check** `box-shadow` colour of the primary button shares the fill's hue; outline buttons have no coloured shadow. **Source** (pp.50-53, p.64) (audit 2026-10-15)

- **RULE** (figure-derived) Keep the primary, secondary and tertiary buttons the same width, height and corner radius, and change only the fill treatment (solid fill > second hue or tint fill > outline > text-only). Every scheme kit on pp.50-56 stacks three identical boxes that differ only in fill.
  **Why** With size held constant, fill weight alone carries the rank, so the group reads as one family.
  **Applies to** SaaS app UI | landing page. **Check** computed width, height and border-radius are equal across button tiers within one group. **Source** (pp.50-56) (audit 2026-10-15)

- **RULE** (figure-derived) In status alerts, put the status hue only on the icon disc, a very light background tint and a slightly stronger border. Keep the title dark navy and bold, keep the message neutral grey, and style an inline action ("Check status") as an underlined link in the same message grey, not in the status colour. Each status also gets its own glyph: truck = success, i = info, ! = warning, triangle = error. Sampled icon discs: success #4FD869, info #3185E8, warning #FDBF21, error #FB5657. The close X is a neutral grey (about #80808A) on all four.
  **Why** Glyph plus hue identify the status, while neutral text stays readable on every tint; the layout is identical across all four alerts, so only colour and glyph change (p.65).
  **Applies to** SaaS app UI | forms | toasts/alerts. **Check** alert title and body text colours are not the status hue; each status uses a distinct icon glyph. **Source** (p.65) (audit 2026-10-15)

- **RULE** (figure-derived) Read the 30% "secondary brand colour" as a dark, low-saturation brand neutral and the 10% "main brand colour" as the one saturated accent. Both of the book's 60/30/10 donuts do this. The 30% is a near-black slate: #344259 (HSB S 42%, B 35%) on p.59 and #202C3A (S 45%, B 23%) on p.61. The 10% is saturated: violet #7A68F2 on p.59 and orange #FA9B43 on p.61. The 60% is near-white: #F5F5FF and #FBFBFB.
  **Why** This keeps saturated colour to about a tenth of the area, in line with "saturation overload kills color vibrancy" (p.64).
  **Applies to** all. **Check** sampled saturated-pixel area of about 10% of the page; the 30% role has low chroma and low lightness. **Source** (p.59, p.61) (audit 2026-10-15)

- **RULE** (figure-derived) A black/grey/white site can take its only colour from the product photograph. The Mercedes page shown on p.45 keeps the navigation, chrome and search bar in black, grey and white. The only colour is the green light in the hero image of the car.
  **Why** With neutral chrome, the photograph becomes the single colour event and the focal point (p.45 figure).
  **Applies to** landing page. **Check** in the fold, non-neutral hues come only from imagery, not from UI fills. **Source** (p.45) (audit 2026-10-15)

- **RULE** Check contrast for non-text UI components as well as text. The WebAIM checker the book shows reports Normal Text, Large Text and a third section, "Graphical Objects and User Interface Components".
  **Why** Borders, icons and control fills also have to be seen by low-vision and colour-blind users (p.66, p.67).
  **Applies to** all. **Check** contrast of control borders, icons and focus indicators against adjacent colours. **Source** (p.67) (audit 2026-10-15)

## 3. Numbers & scales

| Item | Value | Source |
|---|---|---|
| Colour proportion ("Golden Rule", 6:3:1) | 60% neutral / 30% secondary brand colour / 10% main brand colour | p.58-61 |
| Max primary colours | 3 | p.60 |
| Simple scheme | 2 contrasting hues, or monochromatic | p.68 |
| Online purchase quality judged in | about 90 seconds (claim) | p.36 |
| Share of product evaluations influenced by colour | 62%-90% (claim) | p.36 |
| Customers who say colour is the most important factor | up to 85% (claim) | p.57 |
| Newton colour wheel | 1666 | p.49 |
| Primary / secondary / tertiary | R,B,Y / orange, purple, green / magenta, vermillion, violet, teal, amber, chartreuse | p.49 |
| Colour models shown (no explanation) | CMYK, RGB, HSB, grey scale | p.35 |
| Dark-theme example palette (travel app, p.37) | #272343 (background), #443D72 (panel), #FFD803 (CTA/accents), #82C6FE (link/secondary accent), #FFFFFF (text) | p.37 |
| Interactive-button figure states | default, hover/pressed (darker), disabled (lighter), loading (spinner or top progress bar) | p.64 |
| WebAIM example | 4.83:1; AA normal Pass; AAA normal Fail; AA large Pass; AAA large Pass | p.67 |

Variant-generation table (figure on p.62, base hue is a periwinkle blue):

| Row | Definition | Steps shown |
|---|---|---|
| Hue (pure colour) | the hue shifted around the wheel | -15, -10, -5, Base, +5, +10, +15 (units not stated; presumably hue degrees) |
| Tint | hue + white | Pure Color, 46%, 54%, 62%, 70%, 78%, 100% of White |
| Shade | hue + black | Base Color, 17%, 34%, 51%, 63%, 75%, 100% of Black |
| Tone | hue + grey | Pure Color, 17%, 34%, 51%, 63%, 75%, 100% (label printed "of White", swatch is grey) |

Observed: shade and tone steps are 17, 34, 51 (equal 17-point steps) then 63, 75, 100 (smaller steps then a jump). Tint steps are uneven (8-point steps 46 to 78, then 100).

Colour meaning (brand-example mapping the book gives):

| Colour | Connotations stated | Brand example given | Page |
|---|---|---|---|
| Warm (red, orange, yellow) | warmth, comfort; can imply rage, animosity, fury | Coca-Cola, Netflix | p.39 |
| Red | anger, love, confidence, passion (positive and negative) | Coca-Cola | p.40 |
| Orange | excitement; popular UI colour; used as backdrop to draw emphasis to the brand name | Fanta, Home Depot | p.40, p.58 |
| Yellow | joy, happiness, sunlight; suited to social media | Snapchat, McDonald's arches | p.40, p.41, p.58 |
| Cool (blue, green, indigo, violet) | sweetness, serenity, trust, confidence, introspection | Skype, IBM, Dell, HP, Intel | p.42 |
| Blue | security, trust, safety | Skype, Microsoft Word | p.43 |
| Green | regeneration, peace | Tropicana (also Starbucks shown) | p.43, p.42 |
| Purple | wealth, royalty | Asprey | p.44 |
| Black | mysterious; death and sorrow; modern or traditional | Mercedes site (black/grey/white) | p.45, p.46 |
| White | wholesomeness, clarity, purity, innocence | | p.46 |
| Red + blue | most popular combination among adults (claim) | Pepsi | p.47 |

Audit additions (hex values sampled from the PDF render; HSB computed from them):

- p.62 measured ramps: Hue row #74ACFB, #74A1FB, #7495FB, **#758BFD**, #747FFB, #7474FB, #7F74FB (215 to 245 deg in 5-deg steps, S 54%, B 98%). Tint row from pure #002AFF: #758BFD (46%), #899CFD, #9DADFD, #B1BEFD, #C6CFFD (78%), #FFFFFF. Shade row from #758BFD: #6174D3, #4D5CA8, #39447C, #2B335E, #1E243E, #000000; HSB S stays 54% while B falls 99 -> 49% at 51%. Tone row from #758BFD: #5D75EF, #6B7EDF, #7987CF, #8790C1, #9599B1, #9F9F9F (end grey). (audit 2026-10-15)
- p.62 hue-row unit: degrees, confirmed by measurement (-15 = 215 deg, base = 230 deg, +15 = 245 deg). (audit 2026-10-15)
- p.59 donut: 10% #7A68F2 violet, 30% #344259 slate, 60% #F5F5FF. p.61 donut: 10% #FA9B43 orange, 30% #202C3A near-black, 60% #FBFBFB. (audit 2026-10-15)
- p.64 button states: SIGN UP default gradient #7F64FC -> #5E6AF5 (251 -> 235 deg); hover #5A46B1 -> #4349AC (B about 68%); disabled #C8BDFD (S 25%) with a white label. ADD TO CART #404040 fill with a yellow label. CHECKOUT/PayPal #F3E600 fill with dark labels. Submit #1C71F0; Submitting... #B9CFF6 (S 25%) with a white label; top-edge progress bar #1870F2. Shapes: the SIGN UP column uses rounded rectangles, while the cart/checkout/submit columns use full pills. (audit 2026-10-15)
- p.65 status icon discs: success #4FD869, info #3185E8, warning #FDBF21, error #FB5657; close X about #80808A; fills and borders are very light tints of each hue (e.g. success fill about #E4EFF3, border about #D6E8E0). (audit 2026-10-15)
- p.66 greyscale test: bad pair Skip #F05B9A (pink) and Continue #31AED0 (teal) become #909090 and #808080 in greyscale, a contrast of only 1.24:1 between the two fills. (audit 2026-10-15)
- p.68 simplicity figure: DON'T nav CTA #79A2FE, orange #FE7C4A, teal #47CAB7 (three hue families). DO nav CTA #79A1FE, secondary #B3C9FD, bottom button #8FB1FD (three lightness steps of one blue). Placeholder tint about #D8EDFF. (audit 2026-10-15)
- Scheme kits sampled: monochromatic (p.50) primary #FF3D26, secondary #FFCECE, tertiary outline #F61C1C; triad (p.51) primary #FF3D26, secondary #FDF01F, tertiary outline #1879C1; analogous (p.53) primary #FF2626, secondary gradient #FDC627 -> #FEB526 with a white label, tertiary outline/text #FFA526. (audit 2026-10-15)
- p.49 wheel construction: primary ring = 3 segments, secondary ring = 6, tertiary ring = 12, labelled P/S/T. (audit 2026-10-15)
- p.37 surfaces confirmed by sampling: page #272342 (#272343), raised card and bottom bar #433D71 (#443D72), CTA #FED706 (#FFD803). (audit 2026-10-15)
- p.67 WebAIM screenshot sections: Normal Text (AA Pass, AAA Fail), Large Text (AA Pass, AAA Pass), Graphical Objects and User Interface Components (result cut off). 4.83:1 matches #9095FE on #323232 exactly. (audit 2026-10-15)

## 4. Dos and Don'ts

- **DO / DON'T: greyscale test of button hierarchy (p.66).** Four phone mockups "Drink Water" (cyan glass, cyan wave footer, two buttons "Skip" and "Continue"), each shown in colour and in greyscale.
  - DON'T (red X): "Skip" is a solid pink pill, "Continue" a solid teal pill; in greyscale both are near-identical solid grey pills, so primary and secondary are indistinguishable.
  - DO (green check): "Skip" is an outline pill (pink border and text, white fill), "Continue" stays a solid teal pill; in greyscale it still reads outline vs solid.
  - Lesson: differentiate the tiers by form (fill vs outline), not hue alone.

- **DO / DON'T: simplicity of colour (p.68).** Two identical wireframe landing pages (white card on violet gradient; nav row with a blue CTA top right; headline lines; image placeholder at right; small button row under the headline; wide button strip at the bottom).
  - DON'T (red X): extra unrelated hues, an orange button beside the headline and a green/teal bottom button on top of the blue nav CTA = three hues competing.
  - DO (green check): same layout with one hue family only: blue nav CTA, a light periwinkle secondary button, a periwinkle-blue bottom button.
  - Lesson: reuse one hue and vary lightness for hierarchy.

- **DO: proportioned colour (p.59, p.61).** Donut chart with 10% main brand colour (violet in p.59, orange in p.61), 30% dark navy secondary, 60% near-white neutral. Amazon screenshot (p.61) used as the real-world example: dark header, white content cards on a light background, yellow "Sign in securely" button. (Caveat in section 5: the screenshot also has a large orange hero banner.)

- **DO: interactive colour system (p.64).** Left column: "SIGN UP" violet gradient (default), darker indigo with arrow cursor (hover/pressed), faint lavender with white label (disabled). Middle: dark charcoal pill with yellow label ("ADD TO CART"), yellow pills with dark label ("CHECKOUT") and PayPal logo. Right: blue "Submit" pill, then pale-blue "Submitting..." with spinner, "OR" the same with a progress bar along the top edge.

- **DO: status palette (p.65).** Four alert bars, each with a tinted fill and tinted 2px border, coloured circle icon, bold title and grey message, close "X": Success green with truck icon ("Congratulations! Your order has been placed. Check status" with underlined link); Info blue with "i" ("Did you know? You can collaborate with other with Premium"); Warning amber with "!" ("Important Notice! Your subscription is ending soon"); Error red with warning triangle ("Unexpected Error! Something went wrong, please try agin later" [sic]).

- **DO: scheme-to-UI mapping (pp.50-56).** Each page shows the wheel (with selected points joined by lines), the swatches, and a mock kit "This is a Title / This is a Subheading / This is the Content" with Primary / Secondary / Tertiary buttons, plus a brand example:

  | Scheme (page) | Swatches / wheel points | Mock kit | Brand example |
  |---|---|---|---|
  | Monochromatic (p.50) | one blue, three lightness steps | red-orange solid primary, light pink secondary with dark text, red outline tertiary | PayPal |
  | Triad (p.51) | blue, yellow, red equally spaced | red primary, yellow secondary (dark text), blue outline tertiary, navy title | Burger King |
  | Complementary (p.52) | red and green | red primary, green secondary, green outline tertiary, deep purple title | Krispy Kreme |
  | Analogous (p.53) | red, orange, amber | red primary, amber secondary, amber outline tertiary, grey title | McDonald's |
  | Tetradic (p.54) | blue, red, orange, green (rectangle) | blue solid primary, blue outline secondary, blue text-only tertiary | Google |
  | Square (p.55) | red, yellow, green, indigo | indigo primary, bright blue secondary, blue outline tertiary, dark teal title | eBay |
  | Split-complementary (p.56) | magenta, yellow, indigo | magenta primary, indigo secondary, magenta outline tertiary | Taco Bell |

- **DO / DON'T: brand colour selection by anecdote.** McDonald's: red = ingredients/beef, yellow = joy (p.58). Home Depot: orange + white signals excitement and expectation of "top-of-the-line" gear (p.58). Mercedes site: black, grey, white (p.45). Evian: natural colours and natural mountain imagery (p.69).

- **DON'T (the book's own figure): white label on a light warm fill (p.53).** The analogous kit's "Secondary Button" puts a white label on an amber gradient (#FDC627 -> #FEB526), and the outline "Tertiary Button" sets amber text #FFA526 on the near-white card. Both read washed out. Compare the triad kit (p.51), where the yellow secondary #FDF01F has a navy label and stays legible. Lesson: light, warm fills take dark labels, and light-hue outline buttons need a darker shade for border and text. (audit 2026-10-15)

- **DO: dark-mode role mapping (p.37).** Two-step dark surfaces (#272343 page, #443D72 card and bottom bar), one yellow accent for every action and selection (Book Now with a dark label, the active tab with a short underline, stars, the "Continue reading" link), light blue for the secondary link "Show on Maps", white text, muted lavender meta labels. No other hues; the photograph supplies the remaining colour. (audit 2026-10-15)

- **DO: loading state anatomy (p.64).** "Submit" (solid #1C71F0, blue glow) becomes "Submitting..." on a 25%-saturation tint (#B9CFF6), with either a full-blue spinner before the label or a full-blue progress bar along the top edge. Both variants are shown as alternatives ("OR"). (audit 2026-10-15)

## 5. Exceptions & judgement calls

Source hedges and tensions found in the pages:

- The 60/30/10 split is presented as the "optimal proportion" with no hedge. Terminology is loose: the same page says "no more than three primary colors" while the three roles are neutral, secondary brand and main brand colour (p.60), so "primary" here does not mean the red/blue/yellow primaries of p.49. The text calls it "6:3:1" and "60 percent + 30 percent + 10%"; the charts (p.59, p.61) agree on 60/30/10.
- The Amazon example (p.61) is loosely described: text says "blue for the footer and header (30%)"; the screenshot header is dark navy, and the page also shows a large orange hero banner and blue promotional tiles, so measured proportions would not match 60/30/10 strictly. Treat as illustration, not measurement.
- Monochromatic is criticised as lifeless due to low contrast (p.50), yet p.68 recommends "a monochromatic color scheme" for simplicity. Resolution implied: monochromatic works if value contrast between tiers is deliberately large.
- Complementary text (p.52) gives an example of an orange button on blue background, but the wheel and mockup on that page show red and green (a pair that the same chapter's accessibility section would flag for colour-blind users). The book does not reconcile this.
- Tetradic is described as "four complimentary pairs" (p.54); the figure shows a rectangle with 4 points, i.e. two complementary pairs. The figure is the authoritative version. The mock for tetradic uses only blue tones, so the page demonstrates nothing about balancing four hues.
- Denotative colours: the text lists "red, black, and green" (p.65, OCR and image agree), but the figure uses green, blue, amber, red. "Black" is most likely an error for "yellow/amber"; flagged in section 7.
- The book's own disabled and loading button examples (p.64) use white text on a pale fill (faint lavender "SIGN UP", pale blue "Submitting..."). That conflicts with its own rule that disabled states need readable contrast (p.66). [engine note] Follow the written rule, not the illustration.
- Gender-based colour claims (p.45, p.58: men prefer grey/white/black, women attention to red/blue combos and are "confused and distracted more often") and the 62-90%/85% statistics (pp.36, 57) are presented without citations beyond a named study/institute. (opinion/claim). [engine note] Do not encode gender targeting or those percentages as rules in the engine; use only as brief-intake prompts.
- [engine note] The wheel here is the traditional red-yellow-blue (RYB) artist wheel, while the chapter opens (p.35) with the digital models RGB, HSB, CMYK. Hue offsets for digital implementation (for example complementary = 180 degrees) differ on an RGB/HSL wheel; verify against the digital hue angle rather than the RYB picture.
- [engine note] The chapter gives no numeric contrast thresholds in text. WCAG AA is 4.5:1 for normal text and 3:1 for large text and UI components; AAA is 7:1 and 4.5:1. The only number in the chapter is the 4.83:1 WebAIM screenshot (p.67), which passes AA and fails AAA for normal text, consistent with those thresholds.
- [engine note] The proportion rule is about visual area, not number of colours: a page can be 60% white, 30% a dark neutral, 10% brand accent and still be "monochrome plus accent". Most strong SaaS/landing pages are exactly that; the three roles do not require three hues.
- (audit 2026-10-15) The text says dark variants need more saturation and less brightness (p.63), but the book's own figures do not raise saturation. The p.62 shade row is a linear mix with black, which keeps HSB S at 54% while B falls, and the p.64 hover state keeps S at about 60% while B drops by about 30 points. [engine note] Follow the figures, and treat "raise saturation" as optional seasoning. In perceptual spaces (OKLCH), a pure black mix also lowers chroma, so a slight chroma boost on deep shades is what the text's advice amounts to.
- (audit 2026-10-15) [engine note] Contrast of the book's own examples, computed from the sampled hexes (WCAG formula): disabled SIGN UP white on #C8BDFD = 1.73:1, "Submitting..." white on #B9CFF6 = 1.58:1, analogous secondary white on #FDC627 = 1.58:1 and on #FEB526 = 1.77:1. All fail even the 3:1 large-text threshold, which contradicts the book's own "disabled must be readable" rule (p.66). Default SIGN UP white on #7F64FC = 4.09:1 (fails AA normal text, passes large text/UI). Hover #5A46B1 = 7.13:1. Submit white on #1C71F0 = 4.50:1 (exactly at AA). ADD TO CART #F3E600 on #404040 = 7.96:1. The p.37 dark example passes comfortably: #FFD803 on #272343 = 10.71:1, #82C6FE on #272343 = 8.14:1, white on #443D72 = 9.74:1. White glyphs on the status discs are low (warning #FDBF21 1.66:1, success #4FD869 1.85:1), so those icons work by shape, not contrast.
- (audit 2026-10-15) [engine note] The coloured glow under resting primary buttons (pp.50-53, p.64) is a light-theme device. In dark themes the founder's dark-mode rule ("no glow on a resting button", see CLAUDE.md and `knowledge/web/dark-mode-premium.md`) wins.
- (audit 2026-10-15) [engine note] The p.66 greyscale failure measures 1.24:1 between the two fills (#909090 vs #808080). As a working check, if two tiers' greyscale fills are within about 1.5:1 of each other, give them a form difference (fill vs outline) rather than relying on hue.
- (audit 2026-10-15) Inconsistent button shapes in one figure: p.64 shows SIGN UP as rounded rectangles and every other button as a full pill. The figure is a colour demo, not a shape rule; do not read radius guidance from it.

## 6. Figures worth keeping

- p.36: logos arranged on a hue wheel (green, blue, purple, red, orange, yellow sectors): brand colour distribution by hue family.
- p.37: five-swatch palette with hex values next to a dark travel-app mock (Mount Everest) showing the roles: #272343 background, #443D72 panel, #FFD803 CTA, #82C6FE links/secondary text, #FFFFFF text.
- p.49: Newton wheel split into primary, secondary, tertiary (P/S/T labels on a 12-segment wheel).
- p.50: monochromatic scheme: wheel slice, swatches, mock kit, PayPal.
- p.51: triad scheme with wheel, swatches, kit with primary/secondary/tertiary, Burger King.
- p.52: complementary scheme, wheel, kit, Krispy Kreme.
- p.53: analogous scheme, wheel, kit, McDonald's.
- p.54: tetradic scheme, wheel (rectangle), kit, Google.
- p.55: square scheme, wheel, kit, eBay.
- p.56: split-complementary scheme, wheel, kit, Taco Bell.
- p.59: 60/30/10 donut chart.
- p.61: Amazon screenshot with 60/30/10 interpretation.
- p.62: hue / tint / shade / tone swatch table with percentages.
- p.64: interactive button states and third-party action colours.
- p.65: success / info / warning / error alert bars.
- p.66: greyscale accessibility comparison (bad vs good button hierarchy).
- p.67: WebAIM contrast checker screenshot (4.83:1).
- p.68: bad vs good simplicity wireframes.
- p.45: Mercedes site screenshot: black/grey/white chrome, with colour only from the green-lit hero photograph. (audit 2026-10-15)
- p.53: analogous kit as a negative example: white label on amber, amber outline text on near-white. (audit 2026-10-15)

## 7. Open questions

- Hue-row unit on p.62 (-15 ... +15): not stated; assumed degrees. Verify before using as a rule.
- Tone row last label on p.62 reads "100% of White" for a grey end swatch; probably a copy/paste error (should be 100% grey). The 17/34/51/63/75 steps are identical to the shade row.
- p.65 "red, black, and green" for status colours: image confirms the text. Probably should read yellow/amber; confirm only with another source.
- p.67 WebAIM hex values are low-resolution in the image (foreground about #9095FE, background about #323232); only the 4.83:1 ratio and pass/fail table are legible with confidence.
- p.45 phrase "men prefer grey, white, or black to women" is garbled in the source; the intended claim is that men prefer those neutrals more than women do.
- p.46 OCR "innocenyce", p.43 "coloyr", p.52 "overlooky", p.65 "statey": stray characters from OCR/typesetting; text meaning unaffected.
- p.35: the colour-model graphic (CMYK, RGB, HSB, grey scale) has no accompanying explanation; nothing to extract beyond the model names.
- Coverage: every page 35-70 was read (text and image). Pages with no or minimal rule content: p.35 (colour-model graphic and intro; only the model names CMYK, RGB, HSB, grey scale), p.38 (introduction to "UI color fundamentals": audience and goal framing, no numbers), p.41 (continuation of the yellow/Snapchat line from p.40), p.44 (purple/Asprey, one line), p.48 (pull-quote divider: "keep the meaning of the colors in mind"), p.70 (closing paragraph; the only rule is client validation). Pages that are brand-example illustration of the connotations table in section 3: pp.39-47.
- (audit 2026-10-15) corrected: page citation for the gender-colour phrase, was p.44, page shows it on p.45 (p.45).
- (audit 2026-10-15) corrected: page citation for the OCR typo "innocenyce", was p.45, page shows it on p.46 (p.46).
- (audit 2026-10-15) Resolved: the p.62 hue-row unit is hue degrees. Measured -15 = 215 deg, base = 230 deg, +15 = 245 deg, at constant S and B. The first open question above can be treated as closed.
- (audit 2026-10-15) The p.62 tone row is not a linear grey mix. The 17% swatch (#5D75EF, S 61%, B 94%) is darker and more saturated than the base (#758BFD, S 54%, B 99%), and the steps only converge on grey #9F9F9F later. Do not derive tone percentages from this row; the shade and tint rows are exact linear mixes.
- (audit 2026-10-15) The p.67 WebAIM foreground hex reads like "#9096FE" in the blurred screenshot, but 4.83:1 on #323232 matches #9095FE exactly (#9096FE gives 4.87:1). Keep #9095FE.
- (audit 2026-10-15) The gender claim on p.45 is attributed to Natalia Khouw, "The Meaning of Color for Gender"; no further citation is given.
- (audit 2026-10-15) Coverage: all 36 page images from p.35 to p.70 were viewed, and figure colours were sampled from the PDF render. No rule content beyond what is already captured: p.35 (colour-model graphic), p.36 (logo hue wheel), p.38 (framing), p.39-p.44, p.46, p.47 (brand-logo connotation pages; logos on tinted strips of their own colour, decorative), p.48 (quote divider), p.69-p.70 (closing). Image-only material newly captured: p.37 role mapping, p.45 Mercedes, pp.50-56 kit sizing and glows, p.59/p.61 donut hexes, p.62 measured ramps, p.64 state HSB and loading anatomy, p.65 alert anatomy, p.66 greyscale values, p.68 hexes.
