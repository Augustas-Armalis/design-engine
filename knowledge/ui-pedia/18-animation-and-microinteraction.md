---
source: ui-pedia
chapter: Animation & Microinteraction (Design Basics)
pages: 457-478
topic_tags: [animation, motion, microinteraction, easing, feedback, loading, progress, hover, toggles, tab-bar, logo-animation, restraint]
status: studied
---

# Animation & Microinteraction

PDF page = printed page + 1. All citations are PDF pages. Images: `corpus/ui-pedia/pages/p-<PDF page>.jpg`. The chapter is conceptual: the book is a static eBook and says so (p.476: you "won't be able to view them in all of their beauty"), so its figures are before/after frames with arrows, not motion specs. The only numbers are an easing demo (0 s / 1 s / 2 s) and a 1-3 s logo animation. No durations in ms, no easing curves in cubic-bezier, no distances.

## 1. Core ideas

1. Animation is all around us in apps/websites: it guides users (scrolling, receiving a notice), tells stories, and builds a brand narrative. Microinteractions are the small daily encounters that give feedback, report system status, help avoid errors, and can promote a brand (p.457-458).
2. UI animation is used to lead users through the interface, notify them of changes, affect their decisions, and show a relationship between items. It also reduces the mechanical feel of a site (p.458).
3. History lesson: early designers overloaded interfaces with animated trinkets and bright flashing colours; too much animation lowered perceived quality and made users leave. Designers moved from decorative to functional use of animation (p.458-459).
4. Watershed moment: moving from linear movement to motion that replicates real-world speed, gravity and weight (p.459).
5. Two roles: functional animation guides and informs in real time; ornamental animation is storytelling and branding (p.459).
6. A microinteraction is a small occurrence serving a single goal; its aim is to delight by creating an engaging, friendly, "dare we say, human" experience (p.459).
7. Every microinteraction has four parts: Trigger, Rules, Feedback, Loops & Modes (p.460-461).
8. Animation mimics the feel of a physical object, lowers cognitive load, relieves stress with real-time feedback; it is usually so subtle you don't notice it (p.461-462).
9. Seasoning metaphor: animation is a spice rack; one spice is bland, too many is overwhelming; the skill is the right amount (p.462).
10. The halo effect: like one component and you are biased positive towards the whole product (and vice versa), so good microinteractions raise overall impression and negative ones hurt (p.465).
11. Subtlety is the intent: "Microinteractions are subtle, which is exactly how they should be." A product works without them but is not as enjoyable; a well-designed product is usable and enjoyable (p.478).

## 2. Rules

### Purpose and restraint

- **RULE** Make animation functional first: it must guide, inform, give feedback, show a relationship between items, or notify of a change. Use decorative/ornamental animation only for storytelling and branding.
  **Why** Excess decorative animation detracted from site quality and made users leave (p.458); functional benefits are what improve UX (p.459).
  **Applies to** all. **Check** each animation can be tagged with a purpose (navigation, feedback, status, relationship, story). **Source** (p.458-459)

- **RULE** Use "just the perfect amount" of motion; do not use too many different animations.
  **Why** Spice metaphor: one note is dull, many overwhelm and confuse (p.462). Too many animations irritate and users abandon the program (p.473).
  **Applies to** all. **Check** visual / count of distinct animated elements per view. **Source** (p.462, p.473)

- **RULE** Do not bother users. An excessive number of animations has the opposite effect.
  **Why** Irritated users leave.
  **Applies to** all. **Check** visual. **Source** (p.473)

- **RULE** Animation must interest visitors rather than distract or frustrate them; beware processing delays or introducing a new design that causes confusion.
  **Why** Animation that does not serve the task becomes friction.
  **Applies to** all. **Check** visual. **Source** (p.470)

- **RULE** Make animations that work: pleasing to the eye and improving the UX, not only decorative.
  **Why** The user's experience is what drives continued use.
  **Applies to** all. **Check** visual. **Source** (p.473)

- **RULE** Keep microinteractions subtle and short. They should be so unobtrusive that most users will not consciously notice them.
  **Why** Subtlety is the design intent; their absence "may go unnoticed, yet it has an impact on everyone".
  **Applies to** all. **Check** visual; (book gives no duration limit). **Source** (p.470, p.477-478)

### Microinteraction structure

- **RULE** Design each microinteraction as four parts: (1) Trigger (user-initiated, requires user action; or system-initiated, software detects criteria and acts); (2) Rules (what happens once triggered); (3) Feedback (anything the user sees, hears or feels); (4) Loops & Modes (the meta-rules: what happens when circumstances change).
  **Why** Complete definition makes behaviour predictable.
  **Applies to** all interactive components. **Check** each interactive component has a defined trigger, a state change and visible feedback. **Source** (p.460-461; figure p.460: icons + -> check -> ! -> return arrow labelled Trigger, Rules, Feedback, Loops & Modes)

- **RULE** A microinteraction should serve a single goal and accomplish: status update/feedback, a sense of direct control, and helping users see the outcome of their actions.
  **Why** Those are the three goals the book credits to its toggle/checkbox/button example.
  **Applies to** forms, controls. **Check** visual. **Source** (p.459-460; figure p.460)

- **RULE** Use microinteractions for: promoting participation, showing system state, error prevention, and brand communication.
  **Why** Listed as their four UX contributions.
  **Applies to** all. **Check** visual. **Source** (p.463)

### The seven microinteraction uses

- **RULE** Swipe: use it in place of tapping for a more dynamic, seamless flow (quickly move between tabs, learn about the product); it is a familiar gesture that "doesn't make people think".
  **Why** Familiar gesture lowers thinking. **Applies to** mobile. **Check** visual. **Source** (p.469-470)

- **RULE** Data input (passwords, sign-up): add proactive password-strength and usage suggestions to help users progress; interactive data entry keeps users engaged until they reach the goal.
  **Why** Account creation is a known pain point. **Applies to** forms. **Check** password field shows strength/requirements feedback. **Source** (p.470)

- **RULE** Current system status: keep users informed of what the site/app is doing and how long it will take; uninformed users get irritated and leave. Even failure messages can be playful while keeping trust.
  **Why** Visibility of status. **Applies to** all. **Check** any async action shows state (loading, progress, success, failure). **Source** (p.470-471)

- **RULE** Tutorials: use microinteraction to walk users through the program by simplifying and emphasising key features and controls.
  **Why** Teaches by showing. **Applies to** onboarding. **Check** visual. **Source** (p.471)

- **RULE** Call to action: use small animated prompts to encourage interaction; make the CTA entertaining to get users to connect with it.
  **Why** Instils a sense of accomplishment and empathy. **Applies to** landing page. **Check** visual. **Source** (p.471)

- **RULE** Animated buttons: use them as an information manager that directs users through the app; attend to colour, form, special effects, animation, positioning and texture. Add a hover animation so the user is more assured it is clickable.
  **Why** The hover change confirms interactivity (p.478 caption). **Applies to** buttons. **Check** a `:hover` style that differs from rest (figure shows a soft blue glow shadow appearing under the button). **Source** (p.471-472, p.477-478)

- **RULE** Animation as enabler: microinteractions are enabled and improved by animation; it makes even basic operations engaging, as long as it does not distract.
  **Why** See restraint rules. **Applies to** all. **Check** visual. **Source** (p.470)

### Types of animation (purpose map)

- **RULE** Navigation animation: guide the user through the interface; the larger or more complex the site, the more it matters. Use cues like arrows, hover animations, swipeable layout elements to make the visual hierarchy clear and let the user feel sure where to go next. Example: tab bar where the active-item notch and dot slide from one icon to the next.
  **Why** Clarifies hierarchy and next step. **Applies to** all. **Check** visual. **Source** (p.465-466; figures p.465, p.477)

- **RULE** Storytelling and branding: use decorative animation (often on welcome screens) to reinforce brand identity and tell a story in seconds, draw attention to brand features, or demo a product in an engaging way (animated logo is the classic case).
  **Why** Fast brand impression. **Applies to** landing/welcome screens. **Check** visual. **Source** (p.466)

- **RULE** Loading and progress animation: show the process of an activity or the time it takes. Use progress bars, timelines (step indicators), pull-to-refresh. Do not leave users waiting without knowing how long.
  **Why** "Nobody enjoys waiting ... especially when they don't know how long"; progress reinforces the perception of progress and reduces stress. **Applies to** all. **Check** any wait > a moment shows a progress indicator. **Source** (p.467; figure p.467: blue fill bar labelled 26 % and 3-step timeline with step 1 checked, step 2 current ring, step 3 grey)

- **RULE** Large animations: reserve whole-site animation where all content pieces interact (web studios, architects, creative firms, exhibits, business sites with limited content). They look good in a portfolio and demonstrate company level.
  **Why** Works when content is limited and the site is itself the showcase. **Applies to** portfolio/creative sites. **Check** visual. **Source** (p.467-468)

- **RULE** Logo animation: movement of the pieces is the key factor; tell the whole story in 1-3 seconds. Use with caution so as not to divert attention from the site's aim.
  **Why** Conveys modernity and information and elicits emotion from the first seconds, but can pull focus. **Applies to** brand intros. **Check** logo animation duration <= 3 s. **Source** (p.468-469; figure p.468: Figma logo assembling, Animation 1 -> Animation 2 -> Final logo)

### Designing microinteractions

- **RULE** Put yourself in the user's shoes and use all resources to learn how they use the software.
  **Why** Context drives design. **Applies to** all. **Check** process. **Source** (p.472)

- **RULE** Have fun and keep users entertained; an enjoyable experience brings users back.
  **Why** Enjoyment drives continued use. **Applies to** all. **Check** visual. **Source** (p.473)

- **RULE** Use non-technical language and a human tone in microcopy; humour can temporarily distract from frustration (e.g. a blank page).
  **Why** Softens friction. **Applies to** empty states, errors. **Check** copy review. **Source** (p.473)

### Easing (transition types)

- **RULE** Prefer eased motion to linear for UI elements. Linear = constant speed over the whole duration; after 1 s of a 2 s animation the object is exactly at the midpoint. It lacks realism because real objects accelerate and decelerate (a car cannot start at 100 km/h).
  **Why** Real-world speed/gravity/weight realism (p.459, p.474).
  **Applies to** all. **Check** transition-timing-function is not `linear` for movement/state changes (linear is fine for spinners/progress, [engine note]). **Source** (p.474; figure p.474)

- **RULE** Ease In: starts gently, speeds up after the half-time; at 1 s of 2 s the object is still closer to the start. Likened to driving a fast car.
  **Applies to** exits/accelerating motion (mapping is [engine note]; the book only gives the analogy). **Check** `ease-in`. **Source** (p.475; figure p.475: gap before the 1 s square is short, gap after it long)

- **RULE** Ease Out: starts swiftly and ends slowly; at 1 s of 2 s the object is closer to the end. Likened to a braking car.
  **Applies to** decelerating arrivals. **Check** `ease-out`. **Source** (p.475; figure p.475: gap before the 1 s square is long, gap after it short)

- **RULE** Learn easing types in depth in your design tool (Figma, Adobe XD); advanced interactions need more tools and are "an unique field".
  **Why** Linear, ease in and ease out are the most popular and widely supported. **Applies to** prototyping. **Check** process. **Source** (p.473-474)

### Audit additions (audit 2026-10-15)

- **RULE** Give every interactive element a microinteraction that signals it is interactive before use (hover/press change), and answer every completed action with immediate, visible feedback that says whether the action was right and was accepted by the system.
  **Why** The book lists "convey information about specific features, such as whether or not it is interactive" and "immediate and relevant feedback on completed actions" as core jobs; instant visible feedback is how the product teaches the user to interact with it.
  **Applies to** all. **Check** every `button`, `a`, form control has `:hover`, `:active` and `:focus-visible` styles that differ from rest; every submit/save shows a success or error state. **Source** (p.463-464) (audit 2026-10-15)

- **RULE** Beyond confirming actions, use microinteractions to make navigation easier, deliver tips, draw attention to specific content, and prompt sharing/liking/commenting (the book's list of jobs beyond feedback).
  **Why** Well-designed microinteractions "show that the user is being taken care of".
  **Applies to** all. **Check** visual: tag each microinteraction with one job from the list. **Source** (p.463-464) (audit 2026-10-15)

- **RULE** Start with the small, frequent moments: toggling between screens, emphasising a feature, and flashing a new notice are the book's named examples of small interactions that make a big difference.
  **Why** "The devil is in the details"; users are "hardwired to want immediate gratification".
  **Applies to** all. **Check** visual: screen switches, new-feature highlights and new notices each have a defined transition or flash. **Source** (p.472) (audit 2026-10-15)

- **RULE** Animate a tab bar's active state as ONE indicator that travels continuously from the old item to the new one (the figure's middle frame shows the notch and dot between Home and the next icon); keep the icons themselves unchanged (same outline style and colour in every frame) so the indicator alone marks the active item. The indicator is a notch cut into the bar's top edge with a small blue dot in it.
  **Why** A single moving indicator shows the relationship between the two states; the book calls it "very subtle and short" and "lovely".
  **Applies to** mobile | SaaS app UI. **Check** one indicator node animated with `transform: translateX()`, not a per-item show/hide; icon colour identical across states in the figure. **Source** (p.465, p.477) (audit 2026-10-15)

- **RULE** Animate binary controls through an interpolated in-between state rather than snapping: the switch knob travels while the track darkens from pale grey through a mid-tone to dark slate; the checkbox goes empty outline, then a mid-tone fill with a small chevron, then a dark fill with a white tick.
  **Why** The book's switch and checkbox examples are drawn as three frames, so the change of colour and position is gradual; "these animations are little and subtle".
  **Applies to** forms | SaaS app UI. **Check** `transition` on the track `background-color` and knob `transform` together; checkbox fill and tick are both transitioned. **Source** (p.476) (audit 2026-10-15)

## 3. Numbers & scales

| Item | Value | Source |
|---|---|---|
| Parts of a microinteraction | 4: Trigger, Rules, Feedback, Loops & Modes | p.460 |
| Trigger types | 2: user-initiated, system-initiated | p.460 |
| Key goals of a microinteraction (toggle example) | 3: status/feedback, sense of direct control, seeing outcomes | p.460 |
| Microinteraction benefits (UX list) | 4: participation, system state, error prevention, brand | p.463 |
| Microinteraction "uses" | 7: Swipe, Data Input, Animation, Current System Status, Make Tutorials Interesting, Call to Action, Animated Buttons | p.469-472 |
| Designing guidance | 5 bullets: user's shoes, animations that work, have fun, don't bother, human tone | p.472-473 |
| Easing types shown | 3: Linear, Ease In, Ease Out | p.474-475 |
| Easing demo timeline | 0 s start, 1 s mid-time, 2 s end (square travel) | p.474-475 |
| Linear at 1 s | exactly mid-path | p.474 |
| Ease In at 1 s | closer to start | p.475 |
| Ease Out at 1 s | closer to end | p.475 |
| Logo animation length | 1-3 seconds | p.468 |
| Car speed analogy | 100 km/h start impossible without acceleration | p.474 |
| Progress figure | bar at 26 %, 3 steps | p.467 |
| Animation categories | heading says "four", list shows five (see section 7) | p.465-468 |

- Reasons microinteractions are "so awesome" listed on p.463-464: 9 (easier navigation; easier to connect with the site; immediate and relevant feedback on completed actions; tips; convey whether a feature is interactive; enhance UX; encourage share/like/comment; draw attention to content; add an emotional component) (audit 2026-10-15)
- Small-interaction examples named on p.472: 3 (toggling between screens, emphasising a feature, flashing a new notice) (audit 2026-10-15)
- Tab-bar figure (p.477): 3 frames, 5 icons (home, add-to-collection, search, heart, people); indicator moves Home -> 2nd icon, passing through a between-icons position in frame 2 (audit 2026-10-15)
- Loading-bar figure (p.467): the "26%" label is white text centred in the bar, sitting on the unfilled dark track; the filled part is light periwinkle on the left (audit 2026-10-15)

## 4. Dos and Don'ts

- **Do** (p.460 figure) switch/radio/checkbox cluster with a primary `Continue` button as the example of a microinteraction: radio selected vs unselected, toggle on (dark track, knob right) vs off (pale track, knob left), checkbox checked (filled dark with tick) vs empty (outline).
- **Do** (p.476 figures) Switch interaction in three frames: off (pale grey track, knob left) -> in-between (mid-tone track, knob moving in; knob appears slightly larger) -> on (dark slate track, knob right). Checkbox: empty outline -> mid-tone filled with a small chevron/in-between mark -> dark filled with a white tick. Caption: "These animations are little and subtle." The intermediate frame is the lesson: colour fills progressively rather than snapping.
- **Do** (p.477 figure) tab bar: active-item indicator is a notch-with-dot cut into the top edge of the bar; it travels from Home to the 2nd icon in three frames. Caption: "a very subtle and short microinteraction... most users will not notice it, but it is lovely!"
- **Do** (p.477 figure) button: same dark slate `Continue` button at rest, then on hover it gains a soft lilac/blue glow shadow beneath it (no size change, no colour change).
- **Do** (p.467 figure) loading as a filled progress bar with a visible 26 % label; progress as a three-node step timeline (completed node = filled with a tick, current = hollow ring, upcoming = grey).
- **Do** (p.468 figure) logo animation: pieces of the logo drift in from tilted/offset positions (Animation 1), settle into place with some pieces still tinted/light (Animation 2), end on the final logo.
- **Don't** pack the interface with "animated trinkets and bright, flashing colours" (p.458).
- **Don't** use many different animations at once; and don't use animation that delays the user or distracts from the site's aim (p.470, p.473, p.469).
- **Don't** let logo animation divert attention from the site's purpose (p.469).

- **Do** (p.465, p.477) keep tab-bar icons visually identical between states; only the notch-and-dot indicator moves. The p.465 frame shows the same mechanism jumping Home -> Heart (4th icon), with an arrow labelled "Navigation Bar Animation { One Icon To Another Icon }". (audit 2026-10-15)
- **Do** (p.457) tie a screen transition to the element tapped: the figure links a product card's small round button on the home screen to the product detail screen with a curved arrow labelled "Interaction" (the book does not specify the motion). (audit 2026-10-15)
- **Do** (p.460) the opening example card puts the three control pairs (radio, switch, checkbox: on row above off row) above a full-width periwinkle "Continue" button inside one light rounded panel. (audit 2026-10-15)

## 5. Exceptions & judgement calls

- The book says animation is optional: "a product can function without animations and microinteractions, but it isn't as enjoyable" (p.478). It frames microinteractions as enjoyment/polish, not as requirements, but also as usability tools (feedback).
- Tension: microinteractions should be so subtle most users won't notice them (p.477), yet the book also says they should "keep your users entertained" and be "fun" (p.473). Resolve by task context: subtle on utility controls, more playful on onboarding/empty states/errors (my inference; the book does not draw this line).
- Large animations are praised for portfolios and creative firms (p.467-468) while the rest of the chapter warns against excess; the exception is limited-content showcase sites.
- Ease In description is loose: "begin moving gently, only to speed once the animation's half-time has gone" (p.475). Do not read this as a literal rule that acceleration starts exactly at 50 %.
- [engine note] The book pairs ease-in with "fast car" and ease-out with "braking car" but gives no guidance on which to use for entering vs exiting UI. In practice, elements entering the screen use ease-out (arrive fast, settle) and exiting elements use ease-in. Treat as engine knowledge, not source.
- [engine note] No durations in ms, no spring/physics values, no `prefers-reduced-motion` guidance appear in the book; supply from motion/accessibility knowledge elsewhere.
- [engine note] "Halo effect" (spelled "Hallo Effect" in the book, p.465) is used as a business argument for investing in microinteractions; it also means a janky or slow animation can drag down perceived product quality.

## 6. Figures worth keeping

- p.457: product-detail interaction in an app: tapping a product card transitions to a detail screen (annotated "Interaction"); the book's framing example of a screen-to-screen animation.
- p.460: the toggle/radio/checkbox + Continue example and the Trigger -> Rules -> Feedback -> Loops & Modes diagram.
- p.465: tab-bar navigation animation (notch and dot moving from Home to Favourites).
- p.467: progress bar (26 %) and 3-step timeline.
- p.468: logo animation stages (Figma logo).
- p.474: linear easing frames (0 s, 1 s, 2 s) with equal arrow lengths.
- p.475: ease-in vs ease-out frames showing the unequal gap lengths.
- p.476: switch and checkbox state-transition frames.
- p.477: tab-bar and button hover microinteraction frames (caption on p.478).

## 7. Open questions

- p.465-468: the text says "the four most prevalent UI animation categories" but lists five numbered items: 1 Navigation, 2 Storytelling and Branding, 3 Loading and Progress, 4 Large animations, 5 Logo animation. (Logo animation is arguably a sub-case of storytelling/branding.) Heading "five" vs "four" unresolved.
- p.469: "Uses of Microinteraction ... top seven" lists seven (Swipe, Data Input, Animation, Current System Status, Make Tutorials Interesting, Call to Action, Animated Buttons); "Animation" as a use is circular. Kept as the book lists them.
- p.457: the p.457 figure's label "Interaction" connects a product card on the home screen to the product detail screen; the book does not say what animation occurs.
- p.463 text reads "many web developers and designers continue to ask this question" but the question is missing (apparently "do we need microinteractions?"); meaning inferred from context.
- p.465: "Hallo Effect" is the OCR/typo spelling for "halo effect"; confirmed in the image.
- p.472: "How to design Microinteraction?" has five bullets across p.472-473; the first bullet starts at the bottom of p.472.
- p.474: Ease In/Ease Out are named by tool convention; the book gives no curves.
- Coverage: p.457-478 all read. Pages with limited rule content: p.457-458 (definitions/history), p.461-464 (importance arguments, listed benefits), p.469 (logo caution plus start of uses list), p.478 (closing summary; no new rules beyond "subtle", "feedback through subtle elegant state changes improves usability").

- (audit 2026-10-15) Pages viewed as images: p.457, 460, 465, 467, 468, 474, 475, 476, 477. Text-only (no figures, prose pages): p.458, 459, 461, 462, 463, 464, 466, 469, 470, 471, 472, 473, 478. No numeric values were found in images beyond those already recorded (0 s / 1 s / 2 s, 26 %, 1-3 s).
- (audit 2026-10-15) Pages with no rule content beyond section 1: p.458-459 (history, definitions), p.461-462 (importance argument, spice metaphor), p.478 (closing summary).
