---
source: ui-pedia
chapter: Pattern (UI design patterns)
pages: 141-153
topic_tags: [patterns, conventions, familiarity, dark-patterns, pattern-library, process]
status: studied
---

# Pattern (UI design patterns)

The chapter is conceptual and process-oriented: it has almost no numbers. Its value for the engine is the argument for convention, the Problem/Context/Solution/Examples template, the dark-pattern warning and the method for building and using a pattern library.

## 1. Core ideas

1. UI design patterns are repeating, proven solutions to recurring interface problems (nav bar on websites, tab bar in apps, 2-field login, the checkout sequence). Similar-looking products are the result of shared patterns, not of copying. (p.141, p.142)
2. Patterns came from architecture and programming (reusable component libraries that cut build/test time), not from visual designers. (p.142-143)
3. Users already know patterns from other sites and apps, so an interface built on standard patterns "will take a user seconds to learn what to do". Familiarity is the main benefit. (p.143)
4. A pattern is a framework, not a finished answer. Every pattern must be customised to the use case, like a t-shirt: size, fit, pocket, sleeves and print vary, structure stays. (p.143-144)
5. Patterns are a shared vocabulary for a team (fewer misunderstandings, consistency across several designers), and a template to refer to, "not merely common elements that can be copied and pasted". (p.144)
6. Patterns reduce cognitive burden and protect retention and conversion: users are conditioned to expect patterns, and deviating can lose "important leads and conversions". Test: a site with no nav bar or obvious buttons is puzzling. (p.145)
7. Every pattern, in any library, has the same four parts: Problem, Context, Solution, Examples. (p.145-146)
8. Dark patterns are interfaces crafted to trick users against their interest; they erode trust. Empathy and a pleasant (not frustrating) interface are the counter-principle. (p.148-149)
9. Innovation is still possible: if no pattern fits, make your own, and test it for pain points before release. (p.151)
10. Build a personal pattern library by screenshotting and annotating apps you like and dislike. (p.151-153)

## 2. Rules

- **RULE** Use the standard pattern for any solved problem (top nav on websites, tab bar in apps, 2-field login plus submit button, sequential checkout). Do not invent a new control for a solved task.
  **Why** Learned conventions let users act in seconds without instruction; unfamiliar variants cost cognitive load and conversions.
  **Applies to** all. **Check** `visual`: does a nav element exist on every page; does a login screen have identifier + password + one submit button; does checkout follow shipping -> payment -> confirmation. **Source** (p.141, p.143, p.145)

- **RULE** Always customise a pattern to the specific case (content, brand, constraints) instead of pasting it unchanged; keep the pattern's structure, change the skin and the parts that the use case demands.
  **Why** Patterns are "not a one-size-fits-all solution"; structure stays, details adapt (t-shirt analogy).
  **Applies to** all. **Check** `visual`. **Source** (p.143, p.148)

- **RULE** Do not remove or hide the high-expectation elements of a page type: a visible navigation bar and obvious buttons.
  **Why** Visitors conditioned to see them are puzzled when absent; the book ties this to lost leads and conversions.
  **Applies to** landing page | SaaS app UI | mobile. **Check** presence of `nav`/header links and at least one clearly styled primary button per view. **Source** (p.145)

- **RULE** Describe each pattern you use with the four-part formula: Problem (what the user wants to do), Context (when to use it), Solution (how it is solved), Examples (where it has been implemented before). If one of the four is missing the pattern is not understood well enough to apply.
  **Why** Every library entry has these same elements; they force the designer to decide whether the pattern fits.
  **Applies to** all (process). **Check** `visual` / documentation review. **Source** (p.145-146)

- **RULE** Procedure to apply a pattern: (1) define the problem to solve; (2) open a pattern library with that problem in mind and choose the matching category; (3) study ALL samples: intended application, what other designers did, lessons, which element types are used and how they are organised; (4) derive your own solution from those lessons.
  **Why** Patterns "can't be directly applied"; they must be adapted via comparison of several implementations.
  **Applies to** all (process). **Check** `visual`. **Source** (p.148-150)

- **RULE** Group patterns by type when thinking about which you need: Social Sharing (promote/share content across networks), Navigation (move through the UI and always be able to return home when disoriented), Input/Output (forms to enter data, feedback in response to an action), Content structuring (site organisation that feels intuitive and accessible).
  **Why** Gives a quick checklist of the pattern families a page/app should cover.
  **Applies to** all. **Check** `visual`: every product has an answer to each of the four families (even if "not needed"). **Source** (p.147)

- **RULE** A user must always be able to get back to the homepage (navigation pattern).
  **Why** Disorientation is the failure navigation patterns exist to prevent.
  **Applies to** landing page | SaaS app UI | mobile. **Check** logo/home link present on every page. **Source** (p.147)

- **RULE** Do not use dark patterns: no wording that tricks the user into the opposite of what they intend, no obfuscated terms that lock people into memberships or automatic payments, no luring into email sign-ups as a disguised exchange.
  **Why** They benefit the company at the user's expense and "compromise a company's ability to build trust".
  **Applies to** all, especially forms, pricing, cancellation, modals. **Check** button labels: reject double negatives ("Don't not opt in"); cost/renewal terms visible near the action; accept and decline options phrased plainly. **Source** (p.148-149)

- **RULE** If no existing pattern solves the problem or can serve as a structure, design a new one, then test it to find pain points and optimise before release.
  **Why** Pattern libraries can create a false sense that innovation is impossible; there is "plenty of room for fresh and innovative solutions".
  **Applies to** all. **Check** `visual` / user test. **Source** (p.151)

- **RULE** A personal/team pattern library needs: (1) familiarity with popular libraries (to know which patterns to use and avoid); (2) a clear hierarchy, separating simple patterns (e.g. sign-in/register) from more involved macro-patterns; (3) real usability: plain language, no heavy jargon, meant for daily use, not decoration.
  **Why** A library is a working tool for everyone on the project, including newcomers.
  **Applies to** all (process, design systems). **Check** `visual`: library has levels (atom -> macro pattern), plain-language entries. **Source** (p.152)

- **RULE** Capture patterns continuously: when an experience delights or frustrates you, screenshot it, note why, and file it in your archive. Study apps you dislike as well as those you like.
  **Why** Understanding why a solution works or fails is what makes a library useful.
  **Applies to** all (process). **Check** n/a. **Source** (p.151, p.153)

## 3. Numbers & scales

The chapter gives almost no hard numbers. Figures present in mockups (illustrative, not rules):

| Item | Value | Page |
|---|---|---|
| Pattern formula elements | 4 (Problem, Context, Solution, Examples) | p.145-146 |
| Pattern families listed | 4 (Social Sharing, Navigation, Input/Output, Content structuring) | p.147 |
| Create-your-own-library best practices | 3 | p.152 |
| Recommended libraries | 4: Mobbin, UI Garage, UI Patterns, Pttrns | p.150 |
| Checkout mockup (illustrative) | 3 steps: Shipping Details -> Shipping Details & Payment -> Thank You page; payment tabs PayPal / Card; fields Card Number, Expires on, CVV, Cardholder Name; button labels "Add to Cart", "Pay Now", "Order Details"; sample VAT (15%) $5.00, shipping $5.00, sub total $249.00 | p.141 |
| Dark-pattern sample | 30% off coupon, "SIGN UP + GET COUPON" | p.148 |

Library recommendation: start with UI Patterns because the others "lack the documentation" it provides (opinion). (p.151) Note: OCR of p.151 reads "lock"; page image confirms "lack".

## 4. Dos and Don'ts

- **DO** (p.141 figure) Present checkout as a stepper: three nodes (1 completed with a check, 2 current, 3 upcoming), solid connecting line up to the current step and a dashed line afterwards; labels under each node. Step cards: product card (image, name, subtitle, "Only 7 left in stock!", price, primary "Add to Cart"), payment card (PayPal | Card segmented tabs, labelled fields, primary "Pay Now"), thank-you card (icon, "Hey Jay, Thank you for your purchase.", totals list, Order ID, primary "Order Details"). Lesson: the standard sequence and one primary button per step.
- **DO** (p.146 figure) Sign-in pattern as seen on Pinterest, Behance, Dribbble: social login buttons (Facebook, Google, Apple, often as full-width coloured/black/outlined buttons) above or below an "Or"/"OR" divider, then email/username + password inputs, a primary Log in/Continue button, "Forgot password?" and a "No account? Sign up"/"New user? Create an account" link. Lesson: the same Problem/Solution reached by different skins; implementations differ in order (social first vs email first) and button colour.
- **DO** (p.150 figure) Document a flow as a 3-frame wireframe storyboard: (1) user selects Add To Cart button (red numbered marker 1 plus hand cursor on the button), (2) cart icon updates and shows an item count, with an "Item added to cart" popover with Continue Shopping / Checkout, (3) full cart page displayed with line items, price, qty, and a summary (subtotal $159.99, shipping, taxes $12.78, total $162.77) with a Checkout button. Arrows connect frames; numbered red pins tie annotation to place. Lesson: a pattern entry is a numbered sequence with captioned states (source: balsamiq).
- **DON'T** (p.148 figure, top) Use word-play on a decline option: a dark dialog "Want to opt-in?" with two buttons, "Opt in" (outlined, low emphasis) and "Don't not opt in" (filled white, high emphasis); annotation "Use of word play to get you tricked". Wrong because the double negative inverts meaning and the emphasis steers users to the option the company wants.
- **DON'T** (p.148 figure, bottom) The orange gradient "Sign Up + Save" popup: a "SALE 30%" badge, "Sign up for our newsletter and get an exclusive coupon for 30% off your next order" (typo "foe" in the book's mock), email field and "SIGN UP + GET COUPON" button. The book calls this an example of a lesser dark pattern (luring users into e-mail sign-ups); the more dangerous ones obfuscate details so customers get tied into memberships or automatic payments.

## 5. Exceptions & judgement calls

- Book position: patterns must be customised, and fresh solutions are welcome when nothing fits, yet deviations from conventions risk lost conversions (p.145, p.151). The book does not say where to draw the line. [engine note] Practical line: keep behaviour and structure of high-frequency controls (nav, forms, checkout, auth) conventional; spend novelty on visual identity, layout composition, motion and content presentation, and test any novel interaction.
- Dark patterns: the book treats the e-mail-signup lure as "less dangerous" but still frowned upon; it gives no definition of where a legitimate incentive ends and a dark pattern begins. [engine note] A newsletter incentive with plain labels and an easy dismiss is generally not a dark pattern; double negatives, hidden recurring charges and asymmetric accept/decline styling are.
- The "start with UI Patterns" advice is the author's preference (opinion).
- The library-building advice is personal practice ("I've made it a point...") rather than a measured rule (opinion).

## 6. Figures worth keeping

- p.141: three-step checkout stepper with step cards (Shipping Details -> Payment -> Thank You).
- p.145: pattern formula diagram: Problem and Examples as filled purple pills; Context and Solution as outlined boxes; connected 2x2.
- p.146: three sign-in screens (Pinterest, Behance, Dribbble) side by side as pattern Examples.
- p.148: dark-pattern examples (double-negative opt-in, sale popup).
- p.150: balsamiq wireframe flow for Add to Cart -> cart icon update -> full cart, plus library list.

## 7. Open questions

- p.141: no rule content beyond the checkout figure and the intro argument (covered above).
- p.142-144, p.149, p.151-153: text-only; all content captured.
- p.146 Behance mock: "New user? Create an account" text partly cropped in the image; wording as given in OCR.
- p.153: closing summary only, no rule content ("Points to be noted": patterns make the process smoother).
- The pattern-library website names (Mobbin, UI Garage, UI Patterns, Pttrns) are as printed; their current availability is not verified.
- The p.148 sale popup mock contains a typo ("foe 30% off"), which looks like a figure artefact, not intentional teaching.
