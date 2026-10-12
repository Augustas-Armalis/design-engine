<!-- Copied from the founder's global Claude instructions so teammates get the same product-app rules. -->
# coss ui Skill

**coss ui** is a React component library built on [Base UI](https://base-ui.com/) and styled with Tailwind CSS v4. It's copy-paste owned — you get the source, not a package abstraction.

> Full component reference: https://coss.com/ui/docs  
> llms.txt index: https://coss.com/ui/llms.txt  
> Per-component .md docs: `https://coss.com/ui/docs/components/<name>.md`

---

## Core Rules

1. **Never override coss component styles with custom padding/sizing.** Use the `size` prop instead.
2. **Never use `asChild`** — coss uses the `render` prop (Base UI pattern).
3. **Never use `onSelect`** on menu/select items — use `onClick`.
4. **Select items take object values first**, not strings: `<SelectItem value={item}>`
5. **Always use `toastManager.add()`** for toasts — never render `<Toast>` directly.
6. **Dialog structure is strict**: `DialogPopup > DialogHeader + DialogPanel + DialogFooter`.
7. **Cancel buttons use `variant="ghost"`**, not `variant="outline"`.
8. **Don't add custom `className` padding to coss components** — it breaks their internal sizing. Use `size` props.
9. **For forms inside dialogs**: wrap only `DialogPanel` + `DialogFooter` in `<Form className="contents">`, with `DialogHeader` outside the form.
10. **CSS token names**: use `--font-sans`, `--font-mono`, `--font-heading` — not `--font-geist-sans`.

---

## Installation

### New project
```bash
npx shadcn@latest init @coss/style
```
Installs all primitives + neutral color system + Inter/Geist Mono fonts wired in `layout.tsx`.

### Existing project
```bash
npx shadcn@latest add @coss/ui           # all primitives
npx shadcn@latest add @coss/style        # full theme + fonts
npx shadcn@latest add @coss/colors-neutral  # color tokens only
```

### Individual components
```bash
npx shadcn@latest add @coss/<component-name>
# e.g.: @coss/button, @coss/dialog, @coss/toast, @coss/select
```

---

## Component Quick Reference

Read `references/components.md` for full per-component API. Here's the essential cheatsheet:

### Button
```tsx
import { Button } from "@/components/ui/button"

<Button>Default</Button>
<Button variant="outline">Outline</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="ghost">Ghost</Button>       // use for cancel actions
<Button variant="destructive">Delete</Button>
<Button variant="link">Link</Button>
<Button size="sm">Small</Button>
<Button size="lg">Large</Button>
<Button size="icon"><Icon /></Button>
<Button loading>Saving...</Button>
<Button render={<Link href="/login" />}>Login</Button>  // NOT asChild
```

**Variants**: `default | destructive | destructive-outline | ghost | link | outline | secondary`  
**Sizes**: `default | sm | lg | xl | xs | icon | icon-sm | icon-lg | icon-xl | icon-xs`

### Input
```tsx
import { Input } from "@/components/ui/input"

<Input />
<Input size="sm" />
<Input size="lg" />
<Input unstyled />   // removes border/shadow wrapper
```

### Select
```tsx
import { Select, SelectItem, SelectPopup, SelectTrigger, SelectValue } from "@/components/ui/select"

// IMPORTANT: items are objects, not strings
const items = [
  { label: "Next.js", value: "next" },
  { label: "Vite", value: "vite" },
]

<Select items={items}>
  <SelectTrigger><SelectValue /></SelectTrigger>
  <SelectPopup>
    {items.map(item => (
      <SelectItem key={item.value} value={item}>{item.label}</SelectItem>
    ))}
  </SelectPopup>
</Select>
```

### Dialog
```tsx
import { Dialog, DialogTrigger, DialogPopup, DialogHeader, DialogTitle,
  DialogDescription, DialogPanel, DialogFooter, DialogClose } from "@/components/ui/dialog"

<Dialog>
  <DialogTrigger render={<Button />}>Open</DialogTrigger>
  <DialogPopup>
    <DialogHeader>
      <DialogTitle>Title</DialogTitle>
      <DialogDescription>Description</DialogDescription>
    </DialogHeader>
    <DialogPanel>
      {/* scrollable content */}
    </DialogPanel>
    <DialogFooter>
      <DialogClose render={<Button variant="ghost" />}>Cancel</DialogClose>
      <Button>Save</Button>
    </DialogFooter>
  </DialogPopup>
</Dialog>
```

**Dialog with form** (correct pattern):
```tsx
<Dialog>
  <DialogTrigger render={<Button />}>Open</DialogTrigger>
  <DialogPopup>
    <DialogHeader>
      <DialogTitle>Edit Item</DialogTitle>  {/* OUTSIDE the form */}
    </DialogHeader>
    <Form className="contents" onSubmit={handleSubmit}>
      <DialogPanel>
        <Field><FieldLabel>Name</FieldLabel><Input name="name" /></Field>
      </DialogPanel>
      <DialogFooter>
        <DialogClose render={<Button variant="ghost" />}>Cancel</DialogClose>
        <Button type="submit">Save</Button>
      </DialogFooter>
    </Form>
  </DialogPopup>
</Dialog>
```

### Toast
```tsx
import { toastManager } from "@/components/ui/toast"

// In layout.tsx — required setup:
import { ToastProvider, AnchoredToastProvider } from "@/components/ui/toast"
// Wrap app: <ToastProvider><AnchoredToastProvider>{children}</AnchoredToastProvider></ToastProvider>

// Usage anywhere:
toastManager.add({ title: "Saved!", description: "Your changes were saved." })
toastManager.add({ title: "Error", description: "Something went wrong.", data: { status: "error" } })
```

**Position options**: `top-left | top-center | top-right | bottom-left | bottom-center | bottom-right` (default: `bottom-right`)

### Field (form wrapper)
```tsx
import { Field, FieldLabel, FieldError, FieldDescription } from "@/components/ui/field"

<Field>
  <FieldLabel>Email</FieldLabel>
  <Input type="email" required />
  <FieldDescription>We'll never share your email.</FieldDescription>
  <FieldError>Please enter a valid email.</FieldError>
</Field>
```

---

## Styling & Token System

CSS variables (Tailwind v4 compatible):

| Token | Usage |
|-------|-------|
| `--background` / `--foreground` | Page base |
| `--card` / `--card-foreground` | Card surfaces |
| `--muted` / `--muted-foreground` | Subtle backgrounds/text |
| `--primary` / `--primary-foreground` | Brand color / buttons |
| `--secondary` / `--secondary-foreground` | Secondary actions |
| `--destructive` / `--destructive-foreground` | Error/danger |
| `--border` | Borders |
| `--ring` | Focus rings |
| `--info` / `--info-foreground` | Info badges/toasts |
| `--success` / `--success-foreground` | Success states |
| `--warning` / `--warning-foreground` | Warning states |
| `--font-sans` | Body text |
| `--font-mono` | Code |
| `--font-heading` | Dialog titles |

**Custom color example** (globals.css):
```css
:root {
  --primary: oklch(0.6 0.2 250);  /* your brand color */
  --primary-foreground: oklch(1 0 0);
}
.dark {
  --primary: oklch(0.7 0.2 250);
}
```

**`--alpha()` syntax** (Tailwind v4):
```css
background: --alpha(var(--primary) / 10%);
```

---

**Smooth corners (engine default, founder 2026-10-12):** copy `system/effects/squircle.css` next to `globals.css` and add `@import "./squircle.css";` after the Tailwind import. coss components keep their own radii; the corner shape becomes Apple-continuous, and `rounded-full` pills and avatars stay round. Borders follow `knowledge/web/borders-and-nesting.md`.

## Migration from shadcn / Radix UI

| shadcn/Radix | coss ui |
|---|---|
| `asChild` | `render={<Component />}` |
| `onSelect` | `onClick` |
| `<SelectItem value="string">` | `<SelectItem value={objectItem}>` (items-first pattern) |
| `ToggleGroup type="single"` | `ToggleGroup multiple={false}` |
| `Slider value={[5]}` | `Slider value={5}` (scalar, not array) |
| `DialogContent` | `DialogPopup` (also exported as `DialogContent` for compat) |
| `SheetContent` | `SheetPopup` |
| `onOpenChange` | same — no change |

Full migration guide: https://coss.com/ui/docs/radix-shadcn-migration.md

---

## Common Mistakes & Fixes

### Buttons with bad padding / tight spacing
**Wrong**: Adding `className="px-4 py-2"` to a `<Button>` — this fights the component's internal sizing.  
**Right**: Use the `size` prop: `<Button size="lg">` or `<Button size="sm">`.

### Buttons with icons are misaligned
Use the `size="icon"` variant for icon-only buttons. For buttons with text + icon, just put the icon inside normally — coss handles the gap automatically.

### Backdrop is white instead of dark in dark mode
The backdrop should use `--background` or a dark overlay. Check that your `DialogBackdrop` / `DialogOverlay` isn't getting a hardcoded `bg-white`. coss handles this via the theme tokens — make sure dark mode CSS variables are defined.

### Popups / dropdowns not styled
They likely aren't using coss components. Replace `<DropdownMenu>` (Radix) with `<Menu>` (coss), replace `<Popover>` (Radix) with `<Popover>` (coss). Import from `@/components/ui/menu` or `@/components/ui/popover`.

### Tags/badges with white border
Make sure they're using `<Badge>` from coss with `--border` token, not custom `border-white`.

### Stripe/third-party orange buttons
Wrap in a coss `<Button>` instead of using inline styles or third-party styled buttons.

---

## Component Registry Index

For detailed docs on any component, fetch: `https://coss.com/ui/docs/components/<name>.md`

**All available components:**
accordion, alert, alert-dialog, autocomplete, avatar, badge, breadcrumb, button, calendar, card, checkbox, checkbox-group, collapsible, combobox, command, date-picker, dialog, drawer, empty, field, fieldset, form, frame, group, input, input-group, kbd, label, menu, meter, number-field, otp-field, pagination, popover, preview-card, progress, radio-group, scroll-area, select, separator, sheet, sidebar, skeleton, slider, spinner, switch, table, tabs, textarea, toast, toggle, toggle-group, toolbar, tooltip

**Hooks:** use-media-query, use-copy-to-clipboard
