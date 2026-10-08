---
source: web:https://developer.apple.com/design/human-interface-guidelines/writing (also onboarding, settings, managing-accounts, privacy, generative-ai, branding, design-principles, ratings-and-reviews, sign-in-with-apple, entering-data, launching; fetched 2026-10-08)
chapter: Apple HIG - Writing, flows (onboarding, settings, accounts, permissions, AI) and product principles
pages: n/a (web source)
topic_tags: [writing, ux-writing, microcopy, errors, empty-states, onboarding, settings, accounts, permissions, privacy, generative-ai, principles, apple-hig]
status: studied
---

# Apple HIG - Writing, Flows and Principles

Raw text: `corpus/web/apple-hig/{writing,onboarding,settings,managing-accounts,privacy,generative-ai,branding,design-principles,ratings-and-reviews,sign-in-with-apple,entering-data,launching,offering-help,searching}.txt` (private). Written in my own words. Copy rules for alerts, notifications, tooltips and button labels live in `apple-hig-controls-and-components.md`; inclusion language lives in `apple-hig-accessibility-and-inclusion.md`.

## 1. Core ideas
1. Voice is stable (who you are, a list of consistent terms); tone shifts with the situation (serious for a payment error, light for a goal reached).
2. Write for everyone: plain, short, no jargon, no gendered terms, prepared for translation.
3. Put the most important information first on each screen; split multiple ideas across screens.
4. Labels are verbs; clarity beats cleverness ("Send" beats "Let's do it!").
5. Choose patterns and capitalisation once and apply consistently, per element type; multi-step flows keep one vocabulary (Get Started, Continue/Next, Done).
6. Errors sit next to the problem, avoid blame and say how to fix; "oops" interjections sound insincere; if language cannot fix a common error, fix the interaction.
7. Empty states are an opportunity: say what to do next and give a button; they are temporary, so never put crucial information there.
8. Onboarding: fast, interactive, optional, shown once; prefer contextual tips; teach the product, not the device; postpone non-essential setup.
9. Ask for permissions at the moment of need and explain why; never trick people (no fake "Allow" lookalike before the system prompt).
10. Accounts only when the core function needs them; delay sign-in; passkeys over passwords; account deletion must be possible in-app.
11. Settings: good defaults, few options, task options inside the task, never duplicate system settings.
12. Generative AI: keep people in control, disclose AI, set expectations, give examples, make outputs refinable and reversible, plan non-AI fallbacks.
13. Principles: be useful, stay out of the way, forgive mistakes, be transparent, be familiar and consistent, be inclusive, keep it simple, sweat the craft, delight without decoration.

## 2. Rules

### Voice, tone, clarity

- **RULE [AH-WR-01]** Define a voice for the product and keep a list of common terms; vary tone by situation (error tone is direct and serious, achievement tone can be light).
  **Why** consistent vocabulary builds cohesion; mismatched tone feels tone-deaf. **Applies to** web: all copy. **Check** a glossary file exists; term lint for synonyms (e.g. "workspace/team/org" used for one thing). **Source** https://developer.apple.com/design/human-interface-guidelines/writing

- **RULE [AH-WR-02]** Be clear and brief: each word earns its place; read the text aloud.
  **Why** shorter text is easier to scan and translate. **Applies to** web: all. **Check** UI strings <= ~10 words for labels, <= 2 sentences for messages `[engine note]`. **Source** https://developer.apple.com/design/human-interface-guidelines/writing

- **RULE [AH-WR-03]** Use simple, plain language, avoid jargon and gendered terms, and write with localisation in mind.
  **Why** accessibility and translation. **Applies to** web: all. **Check** readability and jargon lint. **Source** https://developer.apple.com/design/human-interface-guidelines/writing

- **RULE [AH-WR-04]** Order content by importance on each screen and break multiple ideas into multiple screens or sections.
  **Why** people read the first line. **Applies to** web: all. **Check** first sentence of each section carries the key fact. **Source** https://developer.apple.com/design/human-interface-guidelines/writing

### Labels and links

- **RULE [AH-WR-05]** Label buttons and links with verbs and specific objects; prefer clarity over cleverness ("Send" over "Let's do it!").
  **Why** actions must be unambiguous. **Applies to** web: all CTAs (matches CW-17). **Check** button text starts with a verb or a known flow term; no filler like "Click here". **Source** https://developer.apple.com/design/human-interface-guidelines/writing

- **RULE [AH-WR-06]** Never use "Click here" or bare "Learn more"; make the link text describe the destination ("Learn more about UX writing").
  **Why** screen-reader users navigate by link list. **Applies to** web: all links. **Check** link text uniqueness and no "click here/read more/here". **Source** https://developer.apple.com/design/human-interface-guidelines/writing

- **RULE [AH-WR-07]** In multi-step flows use one vocabulary: start with "Get Started", move with "Continue" or "Next" (pick one), end with "Done".
  **Why** consistent verbs build a flow model. **Applies to** web: wizards, onboarding. **Check** within a flow, step button labels come from one set. **Source** https://developer.apple.com/design/human-interface-guidelines/writing

- **RULE [AH-WR-08]** Choose a capitalisation style per element type (e.g. sentence case for headlines, title case for alerts) and apply it consistently.
  **Why** capitalisation signals formality; inconsistency signals sloppiness. **Applies to** web: see conflict note in section 5. **Check** per element type, all instances pass the same casing regex. **Source** https://developer.apple.com/design/human-interface-guidelines/writing

- **RULE [AH-WR-09]** Use possessives ("my", "your") sparingly and consistently; avoid "we" in system messages ("Unable to load content", not "We're having trouble loading this content").
  **Why** "we" is ambiguous in errors and can sound insincere. **Applies to** web: UI strings, errors. **Check** grep `\bWe('re| are)\b` in error strings. **Source** https://developer.apple.com/design/human-interface-guidelines/writing

- **RULE [AH-WR-10]** Use gesture verbs that match the device (tap on touch, click on pointer); adjust length for screen size and who might see the screen.
  **Why** wrong verbs confuse; TVs and phones differ in distance and audience. **Applies to** web: responsive copy (`@media (pointer)` copy variants). **Check** "click" absent from touch-only UI strings; "tap" absent from desktop-only. **Source** https://developer.apple.com/design/human-interface-guidelines/writing

### States and messages

- **RULE [AH-WR-11]** Every blank/empty screen offers a clear next step and, if possible, a button; keep it helpful, in context, and never put critical information that vanishes later in it.
  **Why** an empty screen with no action is a dead end. **Applies to** web: lists, search, dashboards. **Check** empty-state component has heading, one sentence, primary action. **Source** https://developer.apple.com/design/human-interface-guidelines/writing

- **RULE [AH-WR-12]** Error messages: show them as close to the problem as possible, do not blame, say what to do ("Choose a password with at least 8 characters" beats "That password is too short"), skip "oops"/"uh-oh", and if the same error hits many people, redesign the interaction.
  **Why** errors are frustrating; guidance beats scolding. **Applies to** web: forms, system errors. **Check** error text contains an imperative recommendation; no "oops/uh-oh/invalid"; located within the field container. **Source** https://developer.apple.com/design/human-interface-guidelines/writing

- **RULE [AH-WR-13]** Pick the delivery method by urgency and context: banner/inline for passive info, alert for critical actions, notification for events outside the app, with tone matched to the situation.
  **Why** wrong channel annoys or is missed. **Applies to** web: toast vs dialog vs email. **Check** channel mapping documented per message class. **Source** https://developer.apple.com/design/human-interface-guidelines/writing

- **RULE [AH-WR-14]** Settings labels are plain and practical; if more explanation is needed, describe what the setting does when on (people infer off); link directly to a setting instead of describing where it is.
  **Why** less text, fewer misreads. **Applies to** web: settings pages. **Check** helper text starts with a verb in present tense ("Starts a timer when..."). **Source** https://developer.apple.com/design/human-interface-guidelines/writing

- **RULE [AH-WR-15]** In text fields show hints (example "name@example.com" or description "Your name"), label all fields, and place errors next to the field with positive instructions ("Use only letters for your name" not "Don't use numbers or symbols"; never just "Invalid name").
  **Why** teach format, do not scold. **Applies to** web: forms. **Check** error strings pass the positive-instruction lint. **Source** https://developer.apple.com/design/human-interface-guidelines/writing

### Onboarding and first use

- **RULE [AH-WR-16]** Teach by interaction and context: prefer contextual tips near the relevant UI, or a short interactive flow, over long tutorials; make tutorials optional, do not repeat after skip, and keep them findable later (help/settings).
  **Why** people retain what they do; tutorials block progress. **Applies to** web: product onboarding (matches the engine's time-to-first-value rule). **Check** onboarding has a visible skip; first value action within 3 steps (funnels note 2.7). **Source** https://developer.apple.com/design/human-interface-guidelines/onboarding

- **RULE [AH-WR-17]** Keep onboarding about your product, not about the device or browser; keep it brief and enjoyable so people finish it.
  **Why** teaching too much overwhelms. **Applies to** web: all. **Check** steps <= 3-5, no OS tutorials. **Source** https://developer.apple.com/design/human-interface-guidelines/onboarding

- **RULE [AH-WR-18]** Postpone non-essential setup and customisation; ship good defaults; do not make people wait on downloads to start; keep licensing text out of the onboarding flow.
  **Why** every pre-use step loses people. **Applies to** web: signup and first-run. **Check** required fields before first value <= 3; legal links in footer not a step. **Source** https://developer.apple.com/design/human-interface-guidelines/onboarding

- **RULE [AH-WR-19]** Hold requests for ratings, reviews or purchases until people have used the product meaningfully; do not interrupt a task; leave at least one to two weeks between prompts.
  **Why** people respond to prompts after engagement; repeated asks irritate. **Applies to** web: NPS, review prompts, upsell modals. **Check** prompt gating on usage counters and last-shown timestamp. **Source** https://developer.apple.com/design/human-interface-guidelines/ratings-and-reviews

### Settings

- **RULE [AH-WR-20]** Ship defaults that suit most people, offer few settings, put task-specific options within the task (filters, view toggles), and reserve the settings area for general, infrequently changed options.
  **Why** settings are a detour; too many settings are hard to find. **Applies to** web: SaaS apps. **Check** settings page item count; view-state controls exist in context not in settings. **Source** https://developer.apple.com/design/human-interface-guidelines/settings

- **RULE [AH-WR-21]** Respect system-level preferences (dark mode, reduced motion, language, contrast) and do not duplicate them in app settings; avoid asking for information you can detect.
  **Why** duplicates imply the system preference does not apply. **Applies to** web: see theme-toggle conflict in the colour note. **Check** settings page has no "reduce motion" duplicate; features read `prefers-*`. **Source** https://developer.apple.com/design/human-interface-guidelines/settings

- **RULE [AH-WR-22]** Make settings reachable by the standard shortcut (Cmd/Ctrl + comma) where the platform uses it.
  **Why** expectation. **Applies to** web apps with shortcuts. **Check** shortcut registered in the shortcuts table. **Source** https://developer.apple.com/design/human-interface-guidelines/settings

### Accounts and permissions

- **RULE [AH-WR-23]** Ask for an account only when the core function requires it; explain benefits at the sign-in screen; delay sign-in as long as possible (browse first, sign in at purchase); consider post-purchase account creation.
  **Why** forced sign-in drives abandonment (matches the engine funnels note). **Applies to** web: all. **Check** content/browse works signed-out; checkout allows guest. **Source** https://developer.apple.com/design/human-interface-guidelines/managing-accounts

- **RULE [AH-WR-24]** Prefer passkeys (or platform sign-in) over passwords; if passwords stay, add two-factor; name the method on the button ("Sign in with Face ID" or "Continue with passkey"), never reference a method that is unavailable on the device; do not call it "passcode".
  **Why** accurate labels prevent confusion. **Applies to** web: WebAuthn, SSO. **Check** auth buttons name the method; passkey UI feature-detected (`PublicKeyCredential`). **Source** https://developer.apple.com/design/human-interface-guidelines/managing-accounts

- **RULE [AH-WR-25]** Provide account deletion inside the product (or a direct, discoverable link); make the web and in-app flows equivalent; allow scheduling with an immediate option; state when it completes and notify when done; explain billing/cancellation consequences.
  **Why** trust and regulation. **Applies to** web: SaaS settings. **Check** "Delete account" reachable within 2 clicks of settings. **Source** https://developer.apple.com/design/human-interface-guidelines/managing-accounts

- **RULE [AH-WR-26]** Offer account linking when a social/ID sign-in email matches an existing account; welcome people right after sign-in; show the current sign-in method in account settings; minimise and justify additional data requests and mark required vs optional.
  **Why** avoids duplicate accounts and builds trust. **Applies to** web: SSO flows. **Check** post-sign-in lands on value, not a long form. **Source** https://developer.apple.com/design/human-interface-guidelines/sign-in-with-apple

- **RULE [AH-WR-27]** Ask for access to data or devices only when needed, ideally at the moment a feature uses it; avoid launch-time requests unless the product cannot function without it; request only the data you need.
  **Why** trust and approval rates. **Applies to** web: geolocation, camera, notifications, clipboard. **Check** no permission prompts on page load (`Notification.requestPermission`, `getUserMedia`, `geolocation` triggered only from a click). **Source** https://developer.apple.com/design/human-interface-guidelines/privacy

- **RULE [AH-WR-28]** Explain the permission in a short active-voice sentence with a period ("The app records during the night to detect snoring sounds."), not passive ("Microphone access is needed for a better experience.") or imperative ("Turn on microphone access.").
  **Why** specific purpose builds consent. **Applies to** web: pre-prompt UI. **Check** purpose string lint: sentence, active voice, ends with period. **Source** https://developer.apple.com/design/human-interface-guidelines/privacy

- **RULE [AH-WR-29]** A pre-permission screen has one button titled "Continue" or "Next" (never "Allow"), no dismiss/cancel path that skips the real prompt, and no incentives, fake request lookalikes or annotations of the system prompt.
  **Why** manipulative pre-screens are rejected and deceptive. **Applies to** web: soft-ask notification prompts (decline must exist for legal consent screens only). **Check** pre-prompt has exactly one primary button, label not "Allow/Enable". **Source** https://developer.apple.com/design/human-interface-guidelines/privacy

- **RULE [AH-WR-30]** Protect data: process on-device when possible, store secrets in the platform keychain/password manager, never in plain text or `localStorage`, avoid inventing custom authentication.
  **Why** security hygiene. **Applies to** web: secrets in `HttpOnly` cookies, not `localStorage`; use platform auth. **Check** token storage audit. **Source** https://developer.apple.com/design/human-interface-guidelines/privacy

- **RULE [AH-WR-31]** Offer search history only with a way to clear it, and consider privacy before displaying it.
  **Why** others may see the screen. **Applies to** web: search suggestions. **Check** "Clear recent searches" control exists. **Source** https://developer.apple.com/design/human-interface-guidelines/searching

### Generative AI

- **RULE [AH-WR-32]** Keep people in control of AI output: easy dismiss, refine, undo, retry, offer alternate versions, honour in-scope requests; show where AI is used and never pass AI output off as human.
  **Why** agency and trust. **Applies to** web: AI features. **Check** AI blocks have Regenerate/Edit/Undo and an "AI-generated" label. **Source** https://developer.apple.com/design/human-interface-guidelines/generative-ai

- **RULE [AH-WR-33]** Set expectations about capabilities and limits; provide curated example prompts; communicate that outputs may contain errors; avoid asking models for facts they cannot verify; request confirmation before significant or irreversible actions taken on someone's behalf.
  **Why** hallucinations are plausible-looking. **Applies to** web: AI chat/search. **Check** disclaimer present near output; examples shown in empty state; destructive agent actions gated. **Source** https://developer.apple.com/design/human-interface-guidelines/generative-ai

- **RULE [AH-WR-34]** Give a non-AI fallback where AI is optional; separate the model from the UX so it can be swapped; offer a voluntary, low-friction feedback control (thumbs up/down) and an option to share detail.
  **Why** resilience and improvement loops. **Applies to** web. **Check** AI features degrade gracefully when unavailable; feedback buttons present. **Source** https://developer.apple.com/design/human-interface-guidelines/generative-ai

- **RULE [AH-WR-35]** Be explicit about privacy: say whether data leaves the device, what is stored or used for training, ask permission before using personal data, and provide an opt-out; process locally where feasible.
  **Why** consent and trust. **Applies to** web: AI features. **Check** data-use disclosure link beside AI input. **Source** https://developer.apple.com/design/human-interface-guidelines/generative-ai

### Brand and principles

- **RULE [AH-WR-36]** Express the brand through voice and tone in all written text, not by decorating every surface with the logo; let branding defer to content; avoid a launch screen as a branding stage; do not repeat the logo throughout the app.
  **Why** people know which app they are in. **Applies to** web: SaaS app UI (marketing pages may differ). **Check** logo instances per app route <= 1 (header). **Source** https://developer.apple.com/design/human-interface-guidelines/branding

- **RULE [AH-WR-37]** Express brand with familiar components and standard patterns: customise sizing, placement and behaviour only where the familiar experience is preserved.
  **Why** familiarity reduces effort even in highly stylised UIs. **Applies to** web: custom design systems. **Check** custom controls keep native semantics (button, input). **Source** https://developer.apple.com/design/human-interface-guidelines/branding

- **RULE [AH-WR-38]** Keep the first screen quickly useful: restore the last state, avoid blocking splash or large downloads, and keep onboarding from delaying content.
  **Why** time to first interaction. **Applies to** web: see motion note AH-MO-33. **Check** n/a. **Source** https://developer.apple.com/design/human-interface-guidelines/launching

- **RULE [AH-WR-39]** Principles for review: create value and stay focused; stay out of the way; allow exploration; make recovery from mistakes easy; be transparent about what the product does and why; use familiar concepts; keep visuals and interactions consistent; give clear feedback; design for everyone; preserve context; support many input methods; include only what is necessary; establish hierarchy; sweat the craft; do not mistake delight for decoration.
  **Why** the HIG's design-principles page, usable as a critique checklist. **Applies to** web: design reviews. **Check** visual/critique. **Source** https://developer.apple.com/design/human-interface-guidelines/design-principles

- **RULE [AH-WR-40]** Build forgiveness in: undo, cancel, back, drafts, confirmations only where loss is real.
  **Why** exploring is safe when mistakes are cheap. **Applies to** web: all. **Check** each destructive action has undo or confirm (see AH-MO-19). **Source** https://developer.apple.com/design/human-interface-guidelines/design-principles

- **RULE [AH-WR-41]** Do not add delight that adds friction: playful moments must not delay the core task.
  **Why** people are trying to finish something. **Applies to** web: animations, copy jokes, mascots. **Check** removal test: does the task get slower without it? visual. **Source** https://developer.apple.com/design/human-interface-guidelines/design-principles

## 3. Numbers & scales

| Item | Value |
|---|---|
| Rating prompt spacing | 1-2 weeks minimum |
| Tip frequency (example) | once per 24 hours |
| Tip length | 1-2 sentences |
| Tip feature complexity | 3 or fewer steps |
| Permission pre-screen buttons | 1 |
| Error copy | next to the problem; no codes; a recommendation |
| Settings keyboard shortcut | Cmd + comma |
| Notification actions | up to 4 |
| Tooltip | 60-75 chars |
| Alert title | at most 2 lines |

## 4. Dos and Don'ts
- **Do** "Choose a password with at least 8 characters." **Don't** "Invalid password" or "Oops! Something went wrong."
- **Do** "Unable to load content." **Don't** "We're having trouble loading this content."
- **Do** "Learn more about UX writing" (link). **Don't** "Click here".
- **Do** purpose text "The app records during the night to detect snoring sounds." **Don't** "Microphone access is needed for a better experience."
- **Do** a pre-permission screen with one "Continue" button. **Don't** a screen with "Allow" / "Not now" that looks like the system prompt.
- **Do** describe settings by what happens when on. **Don't** write a paragraph on what happens in both states.
- **Do** delay sign-in until purchase. **Don't** put a login wall before any content.

## 5. Exceptions & judgement calls
- **Casing conflict.** Apple varies (title style for buttons/menus/tabs/headings; sentence for descriptive text); CW-10 in `web/copy-and-ux-writing.md` defaults to sentence case. See section 5 of the typography and controls notes; the engine default stands unless the brand says otherwise.
- **"Get Started", "Continue", "Next".** Apple recommends them for flow steps; CW-17's `copy_lint.py` lists "continue", "next" as generic-CTA FAIL and "get started" as weak-CTA WARN. These are navigation labels in a multi-step flow; scope the lint to hero/marketing CTAs.
- **"We" in copy.** Apple advises against "we" in system messages and errors; brand storytelling on landing pages legitimately uses "we". Scope the rule to UI strings.
- **Humour.** Apple's Inclusion page advises care with humour; the engine's brand-voice notes allow wit if it passes the swap-the-logo test. Keep humour out of errors and empty states in sensitive contexts.
- **Onboarding vs activation funnels.** Apple says onboarding should be optional and brief; `web/funnels-and-conversion.md` 2.7 pushes first value in <= 3 steps. Compatible: ship an interactive first-value step, not a slideshow.
- **Account creation delay** agrees with the funnels data (forced account creation as a checkout abandonment reason).
- **Tracking/consent.** The privacy page is App Store-specific; for the web the legal baseline is GDPR/ePrivacy consent, outside this source.
- **AI disclosure.** Apple wants to "never trick someone"; regulation (EU AI Act) may require explicit labelling; this note only covers design intent.

## 6. Figures worth keeping
- Writing page: Apple Watch tone examples (two images).
- Privacy page: pre-alert screen "prohibited designs" (incentive, imitation request, alert image, annotated alert) - images worth archiving as anti-patterns.

## 7. Open questions
- Apple's guidance on notification timing and Focus does not map to web push; only the "do not market through high-urgency channels" principle carries over.
- Pages with no extractable rule content: `foundations`, `getting-started`, `patterns` (index pages).
