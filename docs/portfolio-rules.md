# Portfolio Build Rules

Use this as a standing prompt/spec — paste it into Claude Code, Cursor, or reference it manually so every component and page follows the same system.

## Stack

- Next.js (App Router) + TypeScript
- Tailwind CSS v4 (CSS-first config via `@theme`, no `tailwind.config.js`)
- GSAP for scroll/hover animation, Lenis for smooth scroll
- Single-page portfolio — one route, section-based, anchor navigation

## Design tokens — non-negotiable

All values live in `app/globals.css` as CSS variables inside `@theme`. Never hardcode a hex color, px font-size, or arbitrary spacing value inside a component — reference a token instead.

- **Units**: rem only for font-size, spacing, and radius. No px except `border-width`.
- **Type scale**: `--text-xs` through `--text-6xl`, each paired with its own `--leading-*`. Line-height is inversely proportional to font-size — small text gets more leading (1.5–1.6), large display text gets less (1.0–1.2). Never set a line-height that isn't the token paired with that size.
- **Color**: three brand tiers (`primary`, `secondary`, `tertiary`) each with a 50/300/500/600 ramp, plus an `ink` (text) scale and `paper` (background/surface) scale. Every new color need gets added to this system, not invented inline.
- **Radius/motion**: `--radius-sm/md/lg/pill` and `--ease-out` / `--duration-fast/base` are the only allowed values for rounding and transitions.

## Component rules

Every visual pattern that repeats — button, link, card, badge, section wrapper, input — is a component, not a one-off className string. Before writing markup, check if it already exists in `components/ui/`; extend it with a prop rather than duplicating it.

1. **Location**: `components/ui/` for primitives (Button, Link, Card, Badge, Tag, Input). `components/sections/` for page sections (Hero, Projects, About, Contact) that compose primitives.
2. **Variant pattern**: every primitive takes a `variant` prop typed as a union (`"primary" | "secondary" | "tertiary"`), mapped to a class lookup object — same pattern as `Button.tsx` and `TextLink` already built. Don't branch variants with if/else chains.
3. **Emphasis mapping** (apply consistently across every primitive that has variants, not just buttons):
   - `primary` — solid/filled, highest visual weight, one per section max (the actual CTA).
   - `secondary` — outlined or medium-weight, supporting actions.
   - `tertiary` — ghost/text/low-contrast, quiet or repeated actions (nav links, footer, tags).
4. **Props over duplication**: size, disabled state, icon slot, and loading state are all props on the same component, never a separate `SmallButton` or `IconButton` component.
5. **Composition**: sections import primitives, they never redefine button/card styling locally. If a section needs a one-off tweak, pass a `className` override — don't fork the component.
6. **Card component** (build alongside Button/Link using the same pattern):
   - Props: `variant` (`"default" | "outlined" | "elevated"`), `padding` (`"sm" | "md" | "lg"` mapped to spacing tokens), optional `href` (renders as a link wrapper when present).
   - Base: `bg-[var(--color-paper-50)]`, `rounded-[var(--radius-lg)]`, padding from token scale, transition on hover using `--duration-base` / `--ease-out`.
   - `default`: flat surface, 1px border in `--color-ink-100`.
   - `outlined`: transparent background, border in `--color-ink-300`.
   - `elevated`: soft shadow, no border, lifts (`translateY(-2px)`) on hover.
7. **Accessibility floor on every primitive**: visible `:focus-visible` ring (already global), disabled state reduces opacity and removes hover/active transforms, interactive elements are real `<button>`/`<a>` tags — never a styled `<div onClick>`.

## Animation rules

- Lenis mounts once at the root (`SmoothScroll.tsx`) — never re-instantiate per page/section.
- GSAP animations are scroll-triggered per section, registered in a `useEffect` with cleanup (`ctx.revert()` via `gsap.context()`), not fired globally on mount.
- One orchestrated entrance moment on the hero; everything else gets restrained scroll-reveal or hover micro-interaction. No animation on every single element — that's the "AI-generated" tell.
- Respect `prefers-reduced-motion` — already handled globally in `globals.css`; don't bypass it with inline animation logic.

## File structure

```
app/
  layout.tsx        // mounts <SmoothScroll />, imports globals.css
  globals.css
  page.tsx           // composes section components only, no raw markup
components/
  ui/
    Button.tsx
    Link.tsx
    Card.tsx
    Badge.tsx
  sections/
    Hero.tsx
    Projects.tsx
    About.tsx
    Contact.tsx
lib/
  SmoothScroll.tsx
```

## Content/copy rules

- Write copy from the visitor's side: what they can do or learn, not how the site is built.
- Active voice, plain verbs, no filler ("Explore my work" not "Welcome to my portfolio where you can explore...").
- Every section has exactly one job — don't let the hero also try to be the bio.

## Before shipping a section, check

- Every color, font-size, radius, and spacing value traces back to a token.
- No component was duplicated instead of extended with a prop.
- Keyboard focus is visible and tab order is logical.
- Works at mobile width without a separate mobile-only component.