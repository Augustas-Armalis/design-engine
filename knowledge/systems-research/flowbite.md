---
source: web:https://flowbite.com/docs/ ; https://unpkg.com/flowbite@4.0.2/src/themes/*.css ; https://flowbite.com/docs/components/buttons/ ; https://flowbite.com/docs/forms/input-field/
chapter: Flowbite 4 system profile (five themes)
pages: n/a (web sources, fetched 2026-10-08)
topic_tags: [design-system, tailwind-v4, tokens, themes, density, admin-ui]
status: studied
---

# Flowbite 4

Machine profile: `system/systems-research/flowbite.json`. Raw fetches: `corpus/web/systems/flowbite/` (theme_default/enterprise/minimal/mono/playful.css, docs HTML). Licence: MIT core (Flowbite Pro is commercial, not studied).

## 1. Core ideas

1. **Alias layer by role x intensity.** ~100 semantic colour aliases over the Tailwind palette: text (`body`, `body-subtle`, `heading`, `fg-brand`, `fg-success`...), backgrounds (`neutral-primary-soft/primary/medium/strong`, `neutral-secondary-*`, `neutral-tertiary-*`, `brand-softer/soft/medium/strong`, `success-soft/medium/strong`...), borders (`default-subtle/default/medium/strong`, `brand-subtle`...).
2. **Five themes = font + radius + one hue + neutral family.** default (Inter, 12px base radius, blue-700, gray), enterprise (STIX Two Text serif, 1-4px, cyan-900, zinc), minimal (Open Sans, 2-16px, stone-900, stone), mono (Google Sans Code, 1px everywhere, indigo-900, neutral, tracking-normal -0.4px), playful (Shantell Sans, 10-20px, pink-900, slate).
3. **Default grammar is the stock admin look:** Inter, gray-600 body, gray-900 headings, blue-700 brand, rounded-base 12px, `shadow-xs`, `focus:ring-4` with a soft tint ring.
4. **px-based leading and tracking tokens** (leading-5 = 20px, tracking-tight -0.4px).
5. **Vanilla JS behaviour** through data attributes (flowbite.js), so it works on any server stack.
6. **Breadth:** 44 components + 13 form controls + 3 plugins (charts, datatables, WYSIWYG) + 8 typography pages = 68 doc pages.

## 2. Rules

- **RULE** Build a theme switch from four levers only: font family, radius set, brand hue, neutral family; keep component markup identical across themes.
  **Why** Flowbite's five themes show these four levers alone move a UI from corporate serif to playful handwriting without touching components.
  **Applies to** all. **Check** theme files differ only in `--font-*`, `--radius-*`, `--color-*` aliases. **Source** flowbite@4.0.2 src/themes/*.css

- **RULE** Name colour aliases as role + intensity (`brand-soft`, `brand`, `brand-strong`; `neutral-primary-soft..strong`) so dark mode can remap each step independently.
  **Why** In dark mode "soft" must become darker, not lighter; separate names allow that inversion.
  **Applies to** all. **Check** dark block redefines each alias. **Source** theme_default.css `.dark`

- **RULE** Specify tracking in em, not px.
  **Why** Flowbite's -0.8px "tighter" is -0.05em at 16px but only -0.017em at 48px; px tracking under-tightens display type.
  **Applies to** all. **Check** letter-spacing values in token files end in `em`. **Source** [engine note] from theme_default.css `--tracking-tighter: -0.8px`

- **RULE** Avoid the Flowbite default grammar (Inter + blue-700 + 12px radius + ring-4 halo + shadow-xs) on marketing pages unless DIRECTION.md justifies it.
  **Why** It is the reference "Tailwind admin template" look and erases identity.
  **Applies to** landing page. **Check** primary CTA bg not blue-600/700 with 12px radius and Inter simultaneously. **Source** [engine note]

- **RULE** Use a focus ring tinted from the control's own role colour (brand -> brand-medium, success -> success-medium) at 4px.
  **Why** A same-hue ring reads as part of the control and stays visible on white.
  **Applies to** forms, SaaS app UI. **Check** focus ring colour hue = control hue. **Source** flowbite.com/docs/components/buttons (classes) (opinion: 4px is heavy for dense UI)

## 3. Numbers & scales

| Token | default | enterprise | minimal | mono | playful |
|---|---|---|---|---|---|
| font | Inter | STIX Two Text | Open Sans | Google Sans Code | Shantell Sans |
| radius xxs/xs/sm/radius/base/lg (px) | 2/4/6/8/12/16 | 1/1/1/4/4/4 | 2/2/4/6/8/16 | 1 all | 2/2/10/14/20/16 |
| brand light (dark) | blue-700 (blue-600) | cyan-900 (cyan-600) | stone-900 (stone-600) | indigo-900 (indigo-600) | pink-900 (pink-600) |
| neutral family | gray | zinc | stone | neutral | slate |

Default status: success emerald-700 (soft emerald-50), danger rose-700 (soft rose-50), warning orange-500 (strong orange-700). Body gray-600 / dark gray-400.

Controls (computed: 20px line + 2 x padding + 2px border; not measured):

| size | button | input |
|---|---|---|
| xs | 34 (text-xs, px-3 py-1.5) | - |
| sm | 38 (text-sm, px-3 py-2) | 38 (px-2.5 py-2) |
| base | 42 (text-sm, px-4 py-2.5) | 42 (px-3 py-2.5) |
| lg | 46 (text-base, px-5 py-3) | 50 (px-3.5 py-3, text-base) |
| xl | 50 (text-base, px-6 py-3.5) | 58 (px-4 py-3.5) |

Leading tokens: 4 16px, 5 20, 6 24, 7 28, 8 32, 9 36, heading-none 60. `--text-2xs` 10px. `--spacing-8xl` 90rem. Motion: duration-200/300 most common in modal/drawer docs.

## 4. Dos and Don'ts

- Do: status input states with soft bg + subtle border + strong text (`bg-danger-soft border-danger-subtle text-fg-danger-strong`).
- Don't: map four alias names to the same value (light `neutral-primary-soft/primary/medium/strong` are all white): it promises a range that is not there.

## 5. Exceptions & judgement calls

- [engine note] Flowbite's serif "enterprise" theme is a useful counterexample to the assumption that enterprise = grotesk.
- [engine note] Input lg/xl heights assume text-base line-height 24px; if leading-5 is applied they are 4px shorter.

## 6. Figures worth keeping

- none fetched as images.

## 7. Open questions

- Typography heading sizes (flowbite.com/docs/typography/headings) not extracted.
- Flowbite Pro and Figma tokens not studied (commercial).
