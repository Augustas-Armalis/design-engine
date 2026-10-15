---
source: ui-pedia
chapter: Buttons (Design Basics)
pages: 286-328
topic_tags: [buttons, cta, states, hierarchy, touch-targets, padding, corner-radius, labels, accessibility, contrast]
status: studied
---

# Buttons

All page numbers are PDF pages (printed page = PDF page - 1). The book's example buttons are drawn with a violet-to-blue vertical gradient fill, white label, radius about 8-10px, soft coloured drop shadow; this is the book's house style, not a rule.

## 1. Core ideas

1. A button is a control that triggers an action and gives feedback. Anatomy (p.286 figure): background, label, optional icon, border, top/right/bottom/left padding, border radius.
2. Button vs link (p.289): a button performs an action that changes something (submit, merge, make new, upload). A link navigates somewhere (see all page, a profile) and changes nothing. Do not blur them.
3. Every button needs distinct states (normal, focus, hover, active, loading, disabled), each distinguishable from the others and from the surroundings, without large visual changes or noise (p.290-291).
4. Visual style encodes the importance of the action: one primary, several secondary, low-importance tertiary (p.292-293).
5. Buttons must look like buttons. Departing far from users' learned expectations costs seconds of hesitation (p.294). Interactive and non-interactive elements must not share a colour.
6. Consistency (within the design system and with the platform) raises speed and accuracy and lowers errors (p.296).
7. Size and touch area are usability, not decoration: 44x44 pt minimum on touch, 48x48 dp suggested, 7-10 mm physical, 32x32 for cursor devices (p.297, 325).
8. Labels are verbs naming the function. Never bare Yes/No/Submit (p.299-300).
9. Avoid disabled buttons; keep the button live and show what is missing (p.302).
10. Padding is built from the grid or from the glyph "W": horizontal about 2W, vertical about 1W; corner radius must be consistent with the rest of the interface (p.322-328).
11. Only one CTA should win visually on a screen (p.309-310).

## 2. Rules

### Purpose and semantics
- **RULE** Use a button (real action control) for actions that change data or state: "submit", "merge", "make new", "upload". Use a link for navigation to another location ("see all" page, a person's profile) and for anything that does not affect the site.
  **Why** Users and assistive tech read the two as different promises; buttons act, links go.
  **Applies to** all. **Check** `<button>` for actions, `<a href>` for navigation; flag `<a>` without href used as action and `<button>` used only to navigate. **Source** (p.289)
- **RULE** Give any custom clickable element that acts like a button `role="button"`; prefer a native `<button>`. Designers must work with developers so screen readers announce a button control.
  **Why** role="button" makes the element appear to a screen reader as a button control.
  **Applies to** all. **Check** every non-`<button>` clickable has `role="button"` plus keyboard activation; lint with axe. **Source** (p.298)

### States
- **RULE** Define six states for every button style: Normal (active and interactive), Focus (keyboard or other input highlighted), Hover (cursor over), Active/pressed, Progress/Loading, Disabled.
  **Why** Each state tells the user what the control is doing now; missing states leave the user guessing.
  **Applies to** all. **Check** computed styles for `:hover`, `:focus-visible`, `:active`, `[aria-busy]`/loading, `:disabled` all differ from base. **Source** (p.290-291)
- **RULE** Each state needs a distinct affordance, but state changes must not significantly modify the component or add excessive visual noise.
  **Why** The component must stay recognisable across states. The book's figure shows only a darker fill for hover, a lighter/translucent fill for disabled, and a normal-looking fill with no label change for progressing.
  **Applies to** all. **Check** hover/active change colour/shadow only, not size, layout or label length (no layout shift). **Source** (p.290)
- **RULE** Use a loading state when an action is not completed immediately.
  **Why** Signals the component is in the process of completing the action.
  **Applies to** forms, SaaS app UI. **Check** async handlers set a loading state on the button. **Source** (p.291)
- **RULE** Avoid disabled buttons whenever possible. Leave the button enabled; if required info is missing, highlight the blank/invalid fields (red outline, error icon) or show a notification on press.
  **Why** A disabled button gives no reason why; users get stuck "for several seconds or minutes" hunting for what to fix. Figure: bad = greyed Login with no explanation; good = live blue Login and the empty Password field outlined red with a red x.
  **Applies to** forms. **Check** forms: submit not `disabled` by default; invalid fields carry visible error state. **Source** (p.302)
- **RULE** (When a disabled button must exist) it signals a component that is currently inactive but may be enabled later; used because removing a button from its natural place and showing it later could confuse.
  **Why** Keeps layout stable.
  **Applies to** all. **Check** visual: lighter, desaturated fill, no hover. **Source** (p.302)

### Hierarchy, defaults and emphasis
- **RULE** Create a hierarchy of actions: usually one conspicuous primary button, multiple medium secondary, and low-importance tertiary actions. Figure (p.293): primary = filled gradient button; secondary = outlined button (blue border, blue text, transparent/white fill); tertiary = text-only button (blue text, no container). Example composer: Delete as red text tertiary, "Save Draft" outlined secondary, "Send" filled primary with icon, laid out left to right.
  **Why** Style distinguishes more essential from less important behaviours and guides users through many options.
  **Applies to** all. **Check** per view: count of filled/primary buttons = 1 (per action group); secondary uses outline; tertiary has no fill/border. **Source** (p.292-293)
- **RULE** Make the most frequently used button the default: primary style, and focus it.
  **Why** Helps most users finish tasks faster and directs them down the appropriate route.
  **Applies to** forms, dialogs. **Check** primary action has primary style and (where sensible) `autofocus`. **Source** (p.293)
- **RULE** When all options are equal, or the action is very risky, give no default: show equal-weight buttons so users consciously pick rather than mistakenly select. Figure: Accept/Reject with Accept filled and Reject outlined = steering; both outlined with icons (check, x) = presenting all choices equally.
  **Why** Visual weight is a nudge; remove it when a nudge would cause mistakes.
  **Applies to** dialogs, consent, destructive confirmations. **Check** visual. **Source** (p.293)
- **RULE** For a CTA, make it the only element on the screen with a distinct colour or design; no other button should compete with it visually or draw attention to it. Keep enough contrast with the background so it does not merge in.
  **Why** A CTA converts a passive user into an active one; competition dilutes it.
  **Applies to** landing page. **Check** only one saturated filled button style in the viewport; contrast of button vs its background. **Source** (p.309)
- **RULE** CTA size: not too small (users miss it) and not too large ("banner blindness", ignoring elements that look like adverts). Sweet spot 40-60 points of height with adequate separation on both sides.
  **Why** Visibility vs. ad-like dismissal.
  **Applies to** landing page. **Check** CTA height 40-60px; clear margin on both sides. **Source** (p.310)
- **RULE** CTA shape: pill (highest possible border-radius) works well for CTAs.
  **Why** (opinion/observation) Distinguishes CTA from the standard radius used elsewhere. **Applies to** landing page. **Check** `border-radius` >= height/2 on CTA. **Source** (p.328)

### Recognisability, colour, consistency
- **RULE** Make buttons look unmistakably like buttons using visual cues; do not rely on a bare icon or a text-only label where recognition matters. The book's quote: the best way to indicate a button is to use visual cues. Figure: filled button with pencil icon and "Edit" = understood in under a second; a circle-outlined "Edit" = people think for a few seconds; "Editable mode" in plain coloured text with a faint pencil = visual confusion, cannot decide quickly.
  **Why** Users expect buttons to look and work as they have for years (Krug, "Don't Make Me Think"); significant departure causes delay and confusion.
  **Applies to** all. **Check** visual; each interactive element has container, underline, or other affordance. **Source** (p.294, 321)
- **RULE** Do not use the same colour for interactive and non-interactive elements.
  **Why** Users cannot tell where to tap.
  **Applies to** all. **Check** colour of body/label text differs from clickable-text colour. **Source** (p.294)
- **RULE** Be consistent: apply the same colour, shape and styling across primary, secondary and tertiary buttons, within the design system and with the platform. Bad figure: Edit as a green gradient pill with glow, "+" as a white circle with shadow, Export as bare text with icon, Done as a square-cornered blue outline: four unrelated styles. Good figure: all four share one violet/blue palette and one corner radius: Edit filled with icon, "+" as filled rounded square, secondary "+" as light tinted square, Export as text button, Done as tinted/lighter-fill button.
  **Why** Predictability: speed, accuracy, fewer errors, users feel in control.
  **Applies to** all. **Check** unique values of button radius, font, height across the page <= number of defined variants; same hue family. **Source** (p.296)
- **RULE** Choose button colours that contrast well with the background to distinguish buttons from other UI elements.
  **Why** Colour is strongly linked to behaviour; contrast makes buttons findable.
  **Applies to** all. **Check** contrast ratio button vs its background and label vs button fill. **Source** (p.319)

### Accessibility and contrast
- **RULE** Check WCAG contrast of the button label against its fill. Figure: bad = white "Send" on pale mint green fill, plus an outlined "Draft" in the same pale green, rated 1.8:1 (fails AA and AAA); good = white "Send" on strong royal blue, with a blue-outlined "Draft", rated 8.8:1 (passes AA and AAA). Font size, colour and contrast all matter.
  **Why** Low contrast makes the label unreadable.
  **Applies to** all. **Check** contrast >= 4.5:1 for normal-size button text (WCAG AA); the book shows 1.8:1 as failing and 8.8:1 as passing both AA and AAA. **Source** (p.297-298)
- **RULE** Gestures (swipe to trigger contextual actions, double-tap to like, long-press for menu) are not intuitive to the typical user. Offer them only as an additional route for skilled users; a visible button must still exist for the same action.
  **Why** Hidden actions are undiscoverable. Book is explicit: "I recommend using them as an alternative method" (opinion, author recommendation).
  **Applies to** mobile. **Check** every gesture action has a visible control equivalent. **Source** (p.298-299)

### Touch target and size
- **RULE** Touch targets at least 48 x 48 dp for most platforms (about 9 mm physical, regardless of screen size). Touchscreen elements should be at least 7-10 mm.
  **Why** Mis-taps and accidental taps on neighbours waste time and annoy.
  **Applies to** mobile. **Check** bounding box of interactive elements >= 48x48 CSS px (or 44x44 minimum, see rule below). **Source** (p.297)
- **RULE** For all interactive elements on mobile start from 44 x 44 points; for smartphone buttons the sweet spot is roughly 50 in height. Width may be any value >= height (including the double-W minimum horizontal padding).
  **Why** Minimum comfortable tap size. **Applies to** mobile. **Check** height 44-50px on mobile, width >= height. **Source** (p.325)
- **RULE** Cursor-based devices: 32 x 32 should work. Even on desktop, the larger the button the easier it is to use.
  **Why** Pointer precision is higher than a finger. **Applies to** desktop SaaS app UI. **Check** min desktop button size >= 32px. **Source** (p.325)
- **RULE** Extend the clickable area of icon buttons beyond the visible icon/border (for touch and for mouse). Figure: bad = dashed clickable area hugs the hamburger icon, the chevron of "Click Me >" and the radio dot; good = dashed area extends around the whole "Click Me ->" label plus arrow, around the hamburger with padding, and around the radio plus its label "I'm an option".
  **Why** Visible glyphs are small; a bigger hit area prevents misses.
  **Applies to** all. **Check** `getBoundingClientRect` of the clickable wrapper larger than the icon; label included in hit area. **Source** (p.297)
- **RULE** Set a minimum button size for both web and mobile. Figure series (p.325-326), same heart icon button at four sizes: very small (frustrating), still too small for mobile (fine on laptop/desktop), big enough for both.
  **Why** Too-small buttons are hard to hit; users frustrated and may uninstall.
  **Applies to** all. **Check** as above. **Source** (p.324-326)
- **RULE** Size communicates importance and builds hierarchy: large enough to be noticed immediately, but not so large that the layout structure is broken. Follow market leaders' (platform) size recommendations.
  **Why** Size is one of the most effective hierarchy tools. **Applies to** all. **Check** primary button larger/heavier than secondary within the same group. **Source** (p.318)

### Labels
- **RULE** Write labels as verbs naming the function the button performs ("Add to basket", "Confirm order"). Test: the button should read as the answer to "Would you like to (Add to basket)?".
  **Why** A good label encourages action; a wrong one causes confusion, time loss, possibly major errors.
  **Applies to** all. **Check** label begins with a verb (or an imperative noun phrase such as "Learn more"); flag bare "Submit", "OK", "Yes", "No", "Click here". **Source** (p.299-300)
- **RULE** Do not use Yes / No or overly generic labels (Submit). Figure: bad dialog = "Information" link, "No" outlined, "Yes" filled; good = "Learn More" text, "Don't Allow" outlined, "Allow" filled.
  **Why** The user should not have to reread the question to know what the button does.
  **Applies to** dialogs. **Check** dialog buttons name the action. **Source** (p.300)
- **RULE** A text button's text must describe what will happen on touch/click.
  **Why** Without a container, the words are the only cue. **Applies to** all. **Check** visual. **Source** (p.305)
- **RULE** Strong button microcopy is constant (consistent) and brief. Capital letters are optional: the decision depends on the font, basic design concept and mood of the message.
  **Why** Brief copy captures attention quickly. **Applies to** all. **Check** label word count (book gives no number; typical 1-3 words, [engine note]). **Source** (p.319)

### Button order
- **RULE** OK/Cancel vs Cancel/OK: either order is fine; pick one and be consistent. Argument for primary first (Windows): matches natural reading order, saves time when it is the likely choice. Argument for primary last (Apple): lets users consider all options before acting, reducing rash choices. Author (opinion) usually puts OK last in dialogue boxes.
  **Why** Neither order produces usability disasters; consistency matters more.
  **Applies to** dialogs. **Check** same order across all dialogs in the product. **Source** (p.299-301)

### Shape, radius, padding
- **RULE** Default shape: rectangle with rounded corners; users recognise it immediately and it complements the input field.
  **Why** Studies cited: rounded corners boost data processing, and the element's centre attracts attention. **Applies to** all. **Check** visual. **Source** (p.291, 317)
- **RULE** If using unusual button shapes (circle, parallelogram/skewed, rectangle with only two diagonally opposite corners rounded (top-right and bottom-left) shown in the p.317 figure), usability-test them and keep UI controls consistent so users can still distinguish buttons.
  **Why** Unusual shapes risk non-recognition. **Applies to** all. **Check** n/a. **Source** (p.317)
- **RULE** Choose corner radius to match the brand and the other on-screen objects. Sharp corners fit brands with similar shapes in logo and elements; slightly rounded corners are likely the most popular and most user-friendly; larger radius makes it harder to align text above and below the button; pill (max radius) works well for CTAs.
  **Why** Mixed radii without intent break consistency and readability, and "margin imbalances" appear if the same radius is applied to everything blindly.
  **Applies to** all. **Check** button radius relates to card/input radius; no more than a deliberate small set of radii. **Source** (p.325-328)
- **RULE** Do not mix several corner radii within one interface unless deliberate. Do not use rounded buttons if the brand image is all sharp corners.
  **Why** Inconsistent UI. **Applies to** all. **Check** collect distinct `border-radius` values on interactive elements. **Source** (p.325)
- **RULE** Set padding and safe space from the grid base numbers.
  **Why** Keeps rhythm. **Applies to** all. **Check** padding values are multiples of the base unit (4/8px, [engine note]). **Source** (p.321)
- **RULE** Horizontal inner padding = 2x the vertical (example: left padding 2X, vertical 1X). Measured with the capital letter W: vertical padding about 1W (one W above and below the label), horizontal about 2W each side. Minimum: at least one W fits on each side of the label; preferred 2 x W on the sides.
  **Why** Smaller padding makes the label harder to read and comprehend; 2:1 is a "safe choice for better readability".
  **Applies to** all. **Check** padding-x / padding-y about 2; padding-x >= width of "W" in the label font, ideally 2W. **Source** (p.321-323)
- **RULE** Centre the label horizontally and vertically (equal X on left and right, equal Y on top and bottom); use guides to verify.
  **Why** Misaligned/irregular buttons are one of the most common interface problems. **Applies to** all. **Check** measure label bounding box vs button box: left gap = right gap, top gap = bottom gap (optical caps height). **Source** (p.322)
- **RULE** Leave enough space around buttons. When there are several, each button's safe area (margin) must be separate; do not overlap them. Figure: CANCEL (white fill, black caps) and SAVE (blue fill, white caps) with two dotted-outlined safe areas that touch edge to edge and do not overlap.
  **Why** Prevents mis-taps and crowding. **Applies to** all. **Check** gap between adjacent buttons >= sum of their safe margins; no overlap of hit areas. **Source** (p.324)

### Button types: when to use what
- **RULE** Variants shown (p.292 figure): icon + contained, contained, outlined, text, icon button, floating action button (FAB), toggle button (segmented icons), multiselect button (B / I / U segments), split button ("Save as" + dropdown arrow). Pick from these by importance and context.
  **Why** Each has a fixed role; see below. **Applies to** all. **Check** n/a. **Source** (p.292)
- **RULE** Dropdown button: tap reveals a list of options; mark the chosen option active (e.g. colour). Settings buttons can behave the same way.
  **Why** Shows current selection. **Applies to** SaaS app UI. **Check** selected item has distinct style. **Source** (p.304-305)
- **RULE** Text button: modest emphasis, for less important tasks; no container so it cannot distract from nearby content. Figure shows ADD TO CART (dark) and BUY BOOK (blue) as uppercase, container-less labels.
  **Why** Low visual weight. **Applies to** all. **Check** tertiary actions have no fill. **Source** (p.305)
- **RULE** Hamburger button: opens a hidden menu; saves space and makes UI lighter/minimalist. Counter-argument: confusing for infrequent web users, can hurt navigation; do user research before using it.
  **Why** Trade-off between space and discoverability. **Applies to** mobile. **Check** n/a. **Source** (p.305-306)
- **RULE** Toggle button: switch between two or more states (on/off switches) or group related alternatives. If grouped, the layout must make clear they belong to a group. In a group there must be at least three toggle buttons (book's wording). Toggle buttons must be labelled with icons, text, or both; single select-or-not toggles (adding or removing a star) require icons.
  **Why** Grouping and labelling prevent ambiguity. **Applies to** all. **Check** grouped toggles share container/border; each has icon or text. **Source** (p.307; see section 7 on the "three" claim)
- **RULE** Floating Action Button (FAB): round (Material Design) button with an icon, floating above the UI, for the single promoted action; has a transferring anchor point, launch and morph motion.
  **Why** Surfaces the promoted action. **Applies to** mobile. **Check** one FAB per screen, [engine note]. **Source** (p.308)
- **RULE** CTA button: urges the user to take a certain action; can technically be any button type that carries call-to-action text; must stand out from all other buttons. See hierarchy rules above for size and exclusivity. Example (p.308 figure): header "Login" as small filled button, hero "Get Started" as larger filled button under a two-line tagline.
  **Why** Turns passive into active user. **Applies to** landing page. **Check** see above. **Source** (p.308-310)
- **RULE** Ghost (outlined) button: increases the attention and complexity of a text button; denotes crucial actions that are not the page's main action; outline only, no surrounding text indicating an action. Figure: filled "Allow" next to outlined "Don't Allow", with a width dimension marker.
  **Why** Secondary prominence. **Applies to** all. **Check** secondary = outline. **Source** (p.310-311)
- **RULE** Raised (contained) button: rectangular with a drop shadow to lift it off the surface; shadow signals it can be pressed. Mostly used to add dimension to flat layouts and for usefulness in large, busy or crowded areas.
  **Why** Shadow separates it from busy backgrounds. **Applies to** all. **Check** box-shadow present, low blur. **Source** (p.311)
- **RULE** Share button: labelled with icons (recognisable brand emblems). If sharing is not the user's primary activity on the page, do not style it as a button at all (no colour, extra shapes, underlining): show only the icons, which remain interactive.
  **Why** Minimalism, effective negative space. **Applies to** all. **Check** share icons unfilled when secondary. **Source** (p.311-312)
- **RULE** Expandable button: opens different alternatives when pressed (figure: round "+" button that becomes "x" with three round teal icon buttons fanning out above it); arranges interaction flow without overburdening the screen, important for limited mobile screens.
  **Why** Progressive disclosure. **Applies to** mobile. **Check** n/a. **Source** (p.312-313)
- **RULE** Plus button: adds new content (contact, post, note, location, product); often goes straight to a creation modal, sometimes offers options first so creation is more focused.
  **Why** Standard add pattern. **Applies to** all. **Check** n/a. **Source** (p.313-314)
- **RULE** Delete button: an animation that portrays the action and shows the item being deleted keeps people engaged. Figure sequence: blue trash icon square -> expands to show a red "Delete" -> blue "?" with teal "Are You Sure" -> green check with "Deleted" (four steps left to right, colours blue, red, teal-blue, green).
  **Why** Built-in confirmation and feedback in one control; saves time deleting many files. **Applies to** SaaS app UI. **Check** destructive action has confirm step. **Source** (p.314)
- **RULE** Hover and interaction effects (animations, frames, opacity, fonts, forms, shadows, colours) can persuade users to click and move to the next stage; tune to action demands. Example: a Framer Play button pops out with a 3D gradient on hover and reverts when the cursor leaves.
  **Why** Hover feedback invites the click. **Applies to** landing page. **Check** hover effect reverses on leave. **Source** (p.315)
- **RULE** Flat button: does not lift; fills with colour; main advantage is reduced content distraction. Use with padding so users can locate them, on toolbars, and in dialogues to unify button action with dialogue text.
  **Why** Low distraction. **Applies to** SaaS app UI. **Check** n/a. **Source** (p.315-316)
- **RULE** Placement: use common UI patterns and traditional layouts; standard placement improves discoverability, and works even for a button with few visual cues. Combine with ample whitespace and clean visual design.
  **Why** Learned conventions. **Applies to** all. **Check** primary action in conventional position (e.g. bottom-right of dialogs/forms). **Source** (p.318)

### Audit additions (audit 2026-10-15)
- **RULE** Measure vertical padding to the glyphs, not the line box: top padding runs from the button's top edge to the label's cap height, bottom padding from the baseline to the bottom edge, and the two are equal. When an icon leads the label, the left padding is measured to the icon (icon + label form one content block) and left padding = right padding.
  **Why** The anatomy figure draws top/bottom padding brackets ending at cap height and baseline, and the left bracket ending at the download icon; this is what makes the label look optically centred rather than line-box centred.
  **Applies to** all. **Check** render the button, measure cap-top-to-top-edge vs baseline-to-bottom-edge (equal within 1px); with a leading icon, edge-to-icon = label-end-to-edge. **Source** (p.286, p.323) (audit 2026-10-15)

- **RULE** Put the icon before the label in icon + label buttons (Download, Edit, Send, Accept/Reject, Add To Cart, Delete, Share are all icon-left in this chapter), with the icon-to-label gap clearly smaller than the side padding so icon and label read as one unit.
  **Why** Every icon + label button in the chapter's figures uses a leading icon; in the p.286 anatomy the gap is visibly a fraction of the side padding (book gives no number).
  **Applies to** all. **Check** icon precedes label in DOM order and visually; `gap` < `padding-inline`. **Source** (p.286, p.292, p.294, p.298, p.314-315) (audit 2026-10-15)

- **RULE** Specify every button through six build properties, chosen from the brand book: corner radius; font family, colour, weight and style; safe area (margin); fill style (solid colour or gradient); inner margin (padding); shadow.
  **Why** The "Building a Button" anatomy labels exactly these six; a button spec missing one leaves it to chance and drifts across screens.
  **Applies to** all. **Check** the button token set defines radius, font tuple, padding, margin/gap, fill and shadow for each variant. **Source** (p.322) (audit 2026-10-15)

- **RULE** Draw a safe area (margin) around each button as its own zone that follows the button's shape (the figure shows it as a lighter rounded rectangle concentric with the button), and size it from the grid base numbers like the padding.
  **Why** The safe area is part of the button, not leftover page space; it reserves the clearance that keeps neighbours from crowding or overlapping it.
  **Applies to** all. **Check** spacing tokens: button margin/gap is a grid multiple; neighbouring buttons' safe areas do not overlap. **Source** (p.322, p.324) (audit 2026-10-15)

- **RULE** Hover = the same hue made darker and deeper (violet to deep indigo in the figure) with size and label kept (the figure also deepens the drop shadow); Disabled = the whole button paled (light lavender fill, label also faded to low contrast) and the coloured drop shadow removed; Progressing keeps the normal look.
  **Why** Each state changes one visual property family so the component stays recognisable (p.290 text) while still being distinguishable.
  **Applies to** all. **Check** `:hover` changes background lightness of the same hue only; `:disabled` lowers fill and label contrast and sets `box-shadow: none`; no width/height change between states. **Source** (p.290) (audit 2026-10-15)

- **RULE** Keep every variant in one action group at the same height: filled, outlined and text-with-icon versions share one height; widths may hug their labels (Cancel wider than Ok, Don't Allow wider than Allow), but in style sheets the variants are drawn at identical size so only fill and border carry the hierarchy.
  **Why** In p.292 the icon + contained, contained and outlined buttons are the same box; in p.293 primary and secondary are the same box; in p.300-301 dialog pairs share a height but hug their labels. Hierarchy comes from fill, not from size within a group.
  **Applies to** all. **Check** buttons sharing a row: equal computed `height`; filled vs outlined differ only in background/border. **Source** (p.292-293, p.300-301, p.315, p.327-328) (audit 2026-10-15)

- **RULE** Group the secondary and primary actions together at one edge and push the tertiary or destructive action to the opposite edge: composer = red-text "Delete" alone at the far left, "Save Draft" (outlined) + "Send" (filled) together at the right; dialog = text link "Learn More" at the left, "Don't Allow" + "Allow" at the right.
  **Why** Physical separation keeps a low-importance or destructive action from being hit while aiming for the primary.
  **Applies to** dialogs, forms, SaaS app UI. **Check** destructive/tertiary button is not adjacent to the primary; secondary + primary share a container with a small gap. **Source** (p.293, p.300) (audit 2026-10-15)

- **RULE** In a stacked form card (login), make the primary a full-width filled button and put the tertiary "Cancel" as centred brand-coloured text below it.
  **Why** The figure's login form uses this pattern in both the bad and good versions; full width makes the one primary unmistakable and the text Cancel cannot compete.
  **Applies to** forms, mobile. **Check** primary width = field width; Cancel has no fill/border. **Source** (p.302) (audit 2026-10-15)

- **RULE** When two text buttons sit together, mark the main one with the accent colour and leave the other in neutral dark text (figure: "ADD TO CART" dark, "BUY BOOK" accent blue, both uppercase, right-aligned under the dialog text).
  **Why** Without containers, colour is the only hierarchy cue left between text buttons.
  **Applies to** all. **Check** paired text buttons: exactly one uses the accent colour. **Source** (p.305) (audit 2026-10-15)

- **RULE** Make links look like links: underlined accent-coloured text (the figure adds a chain-link icon), never a filled container; buttons get the container.
  **Why** The button-vs-link figure contrasts a filled gradient "Button" with an underlined blue "Link"; the visual promise must match the behaviour.
  **Applies to** all. **Check** `<a>` used for navigation inside text is underlined or otherwise not button-styled. **Source** (p.289) (audit 2026-10-15)

- **RULE** Render selection inside grouped buttons with a tinted fill, not a different colour family: toggle group (single choice, e.g. text alignment) = one bordered container with the selected item on a light-tint square; multiselect (B / I / U) = adjacent segments where every selected segment is tint-filled and unselected ones stay white; split button = outlined button with label plus a caret.
  **Why** One tint for "selected" keeps the group readable as one control with clear current state.
  **Applies to** SaaS app UI. **Check** selected segment uses the brand tint background; `aria-pressed`/`aria-checked` set; group shares one border. **Source** (p.292) (audit 2026-10-15)

- **RULE** Dropdown button: attach the option list directly under the trigger at the trigger's width, as a white panel with hairline separators between options; the trigger itself is a filled brand bar with the label left and the affordance at the right.
  **Why** The attached, same-width panel makes it obvious which control the list belongs to.
  **Applies to** SaaS app UI. **Check** menu panel left/right edges align with the trigger; separators 1px. **Source** (p.304) (audit 2026-10-15)

- **RULE** Use the same CTA style in the nav and the hero, scaled up in the hero: the nav "Login" is a small filled button paired with a same-height dark square menu icon button; the hero "Get Started" is the same filled style with larger label and padding, placed directly under the headline.
  **Why** One CTA style keeps the action recognisable; size, not a new style, gives the hero CTA its priority.
  **Applies to** landing page. **Check** nav and hero CTA share fill, radius family and font; hero CTA height > nav CTA height. **Source** (p.308) (audit 2026-10-15)

- **RULE** FAB: on press, show an ink reaction and lift (ripple plus elevation increase); place it floating over the bottom-right corner of the content it acts on.
  **Why** Material's press feedback confirms the tap; the corner float keeps it reachable without covering content.
  **Applies to** mobile. **Check** `:active` adds ripple and higher shadow; FAB fixed bottom-right. **Source** (p.292, p.308) (audit 2026-10-15)

- **RULE** Expandable button: the main round button morphs its icon (+ to x) when open, and the revealed options are smaller round buttons in a contrasting colour (teal against the violet main button) fanned in an arc above it.
  **Why** The morph shows how to close; smaller, differently coloured satellites read as children of the main action.
  **Applies to** mobile. **Check** open state swaps icon; satellite diameter < main diameter. **Source** (p.312) (audit 2026-10-15)

- **RULE** Animated delete button: build it as two joined segments; the icon segment keeps the brand colour while the label segment changes colour and text per step (red "Delete", cyan "Are You Sure", teal "Deleted"), and the icon swaps with it (trash, ?, check). The resting state is a compact icon-only square.
  **Why** Holding the icon segment constant keeps the control recognisable while the changing segment carries the state; confirmation lives inside the button.
  **Applies to** SaaS app UI. **Check** visual; each step changes label + colour, not position or height. **Source** (p.314) (audit 2026-10-15)

- **RULE** Swipe-revealed row actions are square tinted icon tiles at row height, coloured by meaning (blue tint for send, red tint for delete); long-press menus list the label on the left and the icon right-aligned.
  **Why** Tinted tiles keep hidden actions consistent with the colour semantics of visible buttons.
  **Applies to** mobile. **Check** visual. **Source** (p.299) (audit 2026-10-15)

- **RULE** Size an icon button to fill its touch target. The size figure keeps one fixed target box and grows the visible button inside it: about half the box = too small for anyone; about three quarters = fine for laptop/desktop only; filling the box = right for mobile and desktop.
  **Why** The target, not the drawn glyph, is what the finger hits; a small visible button inside a big hit area still reads as hard to hit.
  **Applies to** mobile, all. **Check** icon button visible box >= 44px on touch; desktop >= 32px. **Source** (p.325-326) (audit 2026-10-15)

- **RULE** Keep filled and outlined variants on the same radius and size at every radius step; the book's outline variant uses a 1px brand-colour border, white/transparent fill and dark (black) uppercase label, while the filled variant carries the soft coloured drop shadow.
  **Why** The radius sheet always pairs NORMAL and OUTLINE at identical box and corner, so the pair reads as one family.
  **Applies to** all. **Check** filled and outlined `border-radius` and `height` equal; outline `border-width` 1px. **Source** (p.327-328) (audit 2026-10-15)

## 3. Numbers & scales

| Item | Value | Page |
|---|---|---|
| Touch target (general) | >= 48 x 48 dp, about 9 mm physical | 297 |
| Touchscreen element physical size | >= 7-10 mm | 297 |
| Mobile interactive element | start at 44 x 44 points | 325 |
| Smartphone button height sweet spot | about 50 (written "50p") | 325 |
| Button width | any value >= height, including 2W minimum side padding | 325 |
| Cursor-based devices | 32 x 32 works | 325 |
| CTA height sweet spot | 40-60 points, adequate separation both sides | 310 |
| Padding horizontal : vertical | 2 : 1 (left 2X, vertical 1X) | 322 |
| Side padding in W units | minimum 1W each side; better 2W | 323-324 |
| Vertical padding in W units | 1W above and below (figure) | 324 |
| Padding unit | grid base numbers | 322 |
| Contrast example, failing | 1.8:1 (fails AA and AAA) | 298 |
| Contrast example, passing | 8.8:1 (passes AA and AAA) | 298 |
| Toggle group | at least three toggle buttons (book's wording) | 307 |
| Style tiers | 1 primary, multiple secondary, tertiary | 292 |
| Corner radius spectrum | sharp / slight (most popular) / large / pill (max, for CTA) | 327-328 |
| Button states | 6: normal, focus, hover, active, progress/loading, disabled | 290-291 |

The book gives no pixel values for radius or exact paddings; the radius figures (p.327-328) show four steps (sharp, slightly rounded, larger, pill) without numbers.

Audit additions (the first three rows are measured from the page images; the book prints no number for them):
- Radius steps as a fraction of button height, measured on the p.327-328 sheet (button about 58px tall at page scale): sharp = 0; slightly rounded about 0.1 x height; larger about 0.2 x height; pill = 0.5 x height. Measured from figure, not stated (audit 2026-10-15)
- Icon-button size series (p.325-326): one fixed target box; visible button about 1/2 of it = too small; about 3/4 = desktop only; 1/1 = mobile and desktop. Measured from figure (audit 2026-10-15)
- Vertical padding reference points (p.286): top padding = top edge to cap height, bottom padding = baseline to bottom edge, top = bottom (audit 2026-10-15)
- Build properties per button: 6 (corner radius; font family/colour/weight/style; safe area; fill style colour or gradient; inner margin; shadow) (p.322) (audit 2026-10-15)
- Outline variant border: 1px brand colour, same radius and box as the filled variant (p.327-328) (audit 2026-10-15)
- Delete-button state sequence: 4 steps (icon-only, Delete, Are You Sure, Deleted) (p.314) (audit 2026-10-15)
- Expandable button: 1 main round button + 3 smaller satellite buttons in the figure (p.312) (audit 2026-10-15)

## 4. Dos and Don'ts

| Topic | Bad | Good | Page |
|---|---|---|---|
| Recognisability | Outlined circle "Edit", or "Editable mode" in coloured text with a faint pencil (hesitation) | Filled button with pencil icon and "Edit" (instant) | 294 |
| Consistency | Four buttons in different colours, shapes, shadows | One palette, one radius, hierarchy only via fill intensity | 296 |
| Hit area | Clickable region equals the glyph | Region wraps label + icon, or radio + label | 297 |
| Contrast | White on pale green, 1.8:1 | White on royal blue, 8.8:1 | 298 |
| Dialog labels | Yes / No / "Information" | Allow / Don't Allow / "Learn More" | 300 |
| Dialog order | n/a | Cancel then OK (primary last, Apple) or OK then Cancel (primary first, Windows); the figure p.301 shows both with checkbox list, both valid | 301 |
| Disabled | Grey inert Login, no hint | Live Login; the empty field flagged in red | 302 |
| Default | n/a | Steer: Accept filled / Reject outlined. Equal: both outlined | 293 |
| Padding | Cramped label | 2W sides, 1W top/bottom | 323 |
| Spacing | Adjacent buttons with overlapping safe areas | Separate non-overlapping safe areas | 324 |
| Size | Tiny heart icon (frustrating); slightly larger (OK for desktop only) | Larger (works on mobile and desktop) | 325-326 |
| Disabled rendering (audit 2026-10-15) | p.302 bad: neutral mid-grey fill with dark-grey label, off the brand hue, no reason given | p.290: disabled shown as the brand hue paled to light lavender with faded label and no shadow (and p.302 prefers no disabled state at all) | 290, 302 |
| Field error instead of disabled (audit 2026-10-15) | Submit greyed, empty field looks normal | Password field gets a red 1px outline plus a red filled circle-x icon at its right end; Login stays live and full-width | 302 |
| Button vs link (audit 2026-10-15) | n/a | Button = filled gradient container; Link = underlined blue text with chain icon, no container | 289 |
| Tertiary placement (audit 2026-10-15) | n/a | Red "Delete" text isolated at far left; "Save Draft" outlined + "Send" filled with leading plane icon grouped at right | 293 |
| Text-button pair (audit 2026-10-15) | n/a | "ADD TO CART" neutral dark + "BUY BOOK" accent blue, uppercase, no containers, right-aligned | 305 |
| Shape variants (audit 2026-10-15) | Untested unusual shapes: circle, skewed parallelogram, rectangle with only top-right and bottom-left corners rounded | Rounded rectangle or pill, consistent across controls (unusual shapes only after usability testing) | 317 |
| Radius pairs (audit 2026-10-15) | Filled and outline variants on different radii (implied by the sheet's consistency) | Each step pairs NORMAL (filled, shadow) and OUTLINE (1px brand border, black label) at the same box and radius | 327-328 |
| Share button (audit 2026-10-15) | Styled share button when sharing is secondary | Bare brand icons; when it is the main action, a filled "Share" button with the share icon on a white inset tile at its left | 311-312 |

## 5. Exceptions & judgement calls

- OK/Cancel order is explicitly a taste call; the author prefers primary last (opinion, "perhaps because I'm a Mac user", p.301).
- Disabled buttons: the book says "if at all possible, stay away", not "never" (p.302). Disabled is acceptable when removing the control would confuse.
- Capitalised microcopy is optional (p.319); the figures use uppercase for text buttons and some outline/normal samples (ADD TO CART, NORMAL, CANCEL) and sentence case elsewhere.
- Gestures: only as an alternative to a visible control for skilled users (p.299).
- Hamburger menu: saves space, but conduct user research first (p.306).
- Share icons: unstyled icons are fine when sharing is secondary; make a styled button only if sharing is the main action (p.312).
- Radius: sharp corners are right for sharp-cornered brands; pill only for CTAs. Mixing radii is allowed only on purpose (p.326-328).
- Size: 44 pt, 48 dp, 32 px, 40-60 pt CTA, and about 50 smartphone height coexist; they are different contexts (platform minimum, general touch, cursor, CTA, phone sweet spot). [engine note] In practice use 44-48 minimum on touch regardless of desktop, and keep the CTA at the upper end of the 40-60 band.
- [engine note] The book's hierarchy figure uses filled/outline/text for primary/secondary/tertiary. A destructive tertiary is shown in red text ("Delete"). Pairing red with a risky action is consistent with the "no default when risky" rule: do not fill a destructive button as primary on first view.
- [engine note] WCAG numeric thresholds beyond the two ratios shown (4.5:1 AA body text, 3:1 large text/UI components) are standard but not stated in these pages.
- [engine note] Rule "padding = about 2W horizontal, 1W vertical" and "radius relates to surroundings" can be checked mechanically; the W-unit is the font's capital W advance width at the label size.

## 6. Figures worth keeping

Copied to examples/ui-pedia/buttons/:
- p.286: button anatomy (background, label, icon, border, four paddings, radius).
- p.290: four states drawn (normal, hover darker, progressing, disabled pale).
- p.292: nine button variants (icon+contained, contained, outlined, text, icon, FAB, toggle, multiselect, split).
- p.293: primary/secondary/tertiary hierarchy; composer with Delete/Save Draft/Send; default vs no-default pair.
- p.294: Edit button recognisability, three versions.
- p.296: inconsistent vs consistent button set.
- p.297: clickable-area bad vs good with dashed hit boxes.
- p.298: contrast 1.8:1 vs 8.8:1 Send/Draft buttons with WCAG verdicts.
- p.299: swipe, double tap, long press gesture examples.
- p.300: dialog labels Yes/No vs Allow/Don't Allow.
- p.301: OK last vs OK first in a checklist dialog.
- p.302: disabled login button vs live button with field error.
- p.310: CTA size note plus ghost button figure.
- p.314: animated delete button sequence.
- p.317: button shape variants (circle, skewed, diagonal-corners-rounded rectangle, pill).
- p.322: padding model (2X / 1X) and DOWNLOAD label.
- p.323: guides for X / Y centring.
- p.324: 2W / 1W padding with W glyphs; CANCEL/SAVE non-overlapping safe areas.
- p.325: touch-target figure and first two too-small icon buttons.
- p.326: final big-enough button, corner-radius intro.
- p.327: sharp / slight / larger radius samples (NORMAL + OUTLINE).
- p.328: pill radius sample.
- p.289: button vs link pair (filled container vs underlined link with chain icon). (audit 2026-10-15)
- p.304: dropdown button with attached same-width option panel and hairline separators. (audit 2026-10-15)
- p.308: nav "Login" (small filled + square menu icon button) vs hero "Get Started" (same style, larger). (audit 2026-10-15)
- p.322 top: "Building a Button" six-property anatomy (radius, font tuple, safe area, fill style, inner margin, shadow). (audit 2026-10-15)

## 7. Open questions

- p.290-291 states: the figure draws only four of the six states (normal, hover, progressing, disabled); focus and active are text-only. The "Progressing" sample looks identical to Normal in the image (no spinner drawn); the book gives no loading visual. [engine note] add a spinner or label change in implementation.
- p.307 "In a group, there must be at least three toggle buttons": checked in image; the figure shows an alarm list of three on/off switches, not a button group. Likely means "at least two" for a segmented group; flagged, not corrected.
- p.310: "40 and 60 points of height" vs p.325 "roughly 50p in height" for smartphone buttons: "p" is presumably points; not reconciled in the book.
- p.314-315: OCR shows item "13." is missing; page 315 starts mid-description of a "Play Button" hover effect (Framer) with no heading or figure in the image. Item 13 is unnamed (likely "Button with hover effect").
- p.316: "Flat Button ... fills with a rainbow of colours" does not match the figure (outlined vs solid blue "Add To Cart"); treat as author's loose wording.
- p.312: the OCR "Expendable"/"disposable" button is the Expandable button (heading in image is spelled "Expendable"); figure shows plus morphing to x with three satellite icons.
- p.303: text claims buttons are "typically themed links"; conflicts in spirit with the p.289 button-vs-link rule. Flagged.
- p.317 shape figure: two shapes (skewed parallelogram, rectangle with two diagonal corners rounded) are shown as examples of unusual shapes; the book does not say they are bad, only to test them.
- p.325 "50p": unit not explained.
- (audit 2026-10-15) corrected: p.317 unusual-shape figure, was "one-corner-cut rectangle" / "cut corner" (rule, section 6 and the open question above), page shows a rectangle with only the top-right and bottom-left corners rounded and the other two square (p.317)
- (audit 2026-10-15) corrected: coverage line listed p.304 and p.312 as text-only, page shows p.304 carries the dropdown-button figure and p.312 the expandable-button figure (p.304, p.312)
- (audit 2026-10-15) p.316 open question above: the Flat Button figure (outlined vs filled "Add To Cart", basket icon leading) is on p.315; p.316 holds only the text.
- (audit 2026-10-15) Radius fractions and icon-button size ratios in section 3 are measured from the page images at page scale; the book states no pixel values. Treat them as proportions, not specs.
- (audit 2026-10-15) p.290 Hover figure also shows the drop shadow turning darker/greyer; whether that is intentional or a render artefact is unclear.

Pages with no rule content: p.287 (history of push buttons, Plotnick "Power Button"), p.288 (Kodak quote "You press the button, we do the rest"), p.295 (Nielsen consistency quote, full-bleed violet quote page), p.303 (intro to types, no rules beyond CTA framing), p.320 (summary "Points to Be Noted": buttons are the most effective way to get users to take actions, plan around the factors above; intro to the design guide), p.321 (full-bleed quote: the best way to indicate a button is to use visual cues; carried into the recognisability rule).

Coverage: pages 286-328 all read (text and image). Pages 291, 309, 316, 318, 319 are text-only content; their rules are included above.

Audit coverage (audit 2026-10-15): all 43 page images p.286-328 viewed plus OCR text. No-rule pages confirmed: p.287 (history text), p.288 (Kodak quote page), p.295 (Nielsen quote page), p.303 (types intro prose), p.320 (summary box + guide intro), p.321 (visual-cues quote page). Figures re-read for image-only detail: p.286, 289, 290, 292, 293, 296, 297, 299, 300, 301, 302, 304, 305, 306, 308, 310, 311, 312, 314, 315, 317, 322, 323, 324, 325, 326, 327, 328.
