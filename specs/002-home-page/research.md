# Research: Home Page

**Feature**: 002-home-page | **Date**: 2026-03-19

## Decision 1: Shadcn/UI Initialization with Tailwind v4

**Decision**: Run `npx shadcn@latest init` which auto-detects Next.js 16 +
Tailwind v4. For Tailwind v4 projects, the `tailwind.config` path in
`components.json` is left blank. The default style is now "new-york".

**Required Shadcn components** (add via `npx shadcn@latest add <name>`):
- `button` — CTAs, form submit, footer CTA
- `input` — Form text fields (name, phone, email)
- `label` — Form field labels
- `select` — Office dropdown
- `textarea` — Message field
- `sheet` — Mobile navigation drawer (hamburger menu)
- `navigation-menu` — Desktop header navigation (optional, can use custom)

**Rationale**: Shadcn/UI is mandated by the constitution. The CLI v4 (March
2026) supports `--diff` and `--dry-run` flags for safe component additions.
Tailwind v4 integration is first-class — no special config needed.

**Alternatives considered**: Building custom UI primitives — rejected because
the constitution mandates Shadcn/UI as the base for all UI primitives.

## Decision 2: Green/Off-White Theme via Tailwind v4 @theme

**Decision**: Define the color palette as CSS custom properties in
`app/globals.css` using the `@theme` block. Use OKLCH for perceptual
consistency.

```css
:root {
  --background: oklch(97% 0.005 120);    /* off-white with warm tint */
  --foreground: oklch(15% 0.02 160);     /* near-black green-tinted */
  --primary: oklch(30% 0.08 160);        /* dark green (≈ bg-green-900) */
  --primary-foreground: oklch(97% 0.005 120);
  --accent: oklch(94% 0.02 120);         /* light accent */
  --accent-foreground: oklch(30% 0.08 160);
  --muted: oklch(92% 0.01 120);
  --muted-foreground: oklch(45% 0.03 160);
  --border: oklch(88% 0.02 160);
  --ring: oklch(30% 0.08 160);
}

@theme inline {
  --color-background: var(--background);
  --color-foreground: var(--foreground);
  --color-primary: var(--primary);
  --color-primary-foreground: var(--primary-foreground);
  --color-accent: var(--accent);
  --color-accent-foreground: var(--accent-foreground);
  --color-muted: var(--muted);
  --color-muted-foreground: var(--muted-foreground);
  --color-border: var(--border);
  --color-ring: var(--ring);
}
```

**Rationale**: Tailwind v4 replaces `tailwind.config.ts` with CSS-first
`@theme` blocks. This approach generates utility classes like `bg-primary`,
`text-primary-foreground` automatically. OKLCH provides perceptual uniformity.
Shadcn/UI reads these same CSS variables for its component theming.

**Alternatives considered**: Keeping Tailwind's default green scale and using
`bg-green-900` directly — rejected because the constitution mandates design
tokens configured in the theme, not hardcoded utility classes.

## Decision 3: Server Action Pattern for Contact Form

**Decision**: Use `useActionState` (React 19) in the client-side ContactForm
component. The Server Action lives in `server/actions/lead-actions.ts` with
`'use server'` directive at the top of the file.

**Flow**:
1. ContactForm renders with `useActionState(createLeadAction, initialState)`.
2. On submit, `createLeadAction` receives `prevState` + `FormData`.
3. Action checks honeypot field first — if filled, returns fake success silently.
4. Action parses FormData → Zod `safeParse` with `createLeadSchema`.
5. On validation failure, returns `{ success: false, fieldErrors: ... }` via
   `error.flatten().fieldErrors`.
6. On validation success, calls `leadService.create(data)`.
7. On service success, calls `revalidatePath('/')` and returns
   `{ success: true }`.
8. On service failure, returns `{ success: false, error: serviceResult.error }`.

**Rationale**: `useActionState` is the recommended React 19 pattern for form
state management with Server Actions. It provides `pending` state for
disable/loading UI, and structured state for field-level error display.

**Alternatives considered**:
- Manual `fetch` + API route — rejected by constitution (Server Actions for
  mutations).
- `useTransition` + manual state — more boilerplate, `useActionState` is
  purpose-built.

## Decision 4: Route Group for Shared Layout

**Decision**: Use an `(main)` route group under `app/` to share the Header and
Footer layout across all public pages. The home page lives at
`app/(main)/page.tsx`.

```text
app/
├── (main)/
│   ├── layout.tsx      # Header + {children} + Footer
│   ├── page.tsx        # Home page
│   ├── hakkimda/       # About (Turkish URL)
│   ├── hizmetler/      # Services
│   ├── calisma-alanlari/ # Areas of Work
│   ├── iletisim/       # Contact
│   └── blog/           # Blog
└── layout.tsx          # Root layout (html, body, fonts)
```

**Rationale**: Route groups in Next.js App Router allow shared layouts without
affecting the URL structure. The `(main)` group wraps all public pages with a
consistent Header/Footer. Turkish route slugs match the Turkish-only content
requirement.

**Alternatives considered**: Putting Header/Footer in the root layout — rejected
because admin pages (future) may need a different layout.

## Decision 5: Mobile Navigation

**Decision**: Use the Shadcn `Sheet` component for the mobile hamburger menu.
The Header component itself uses `'use client'` only for the mobile menu toggle
state. On desktop (>= 1024px), a horizontal nav bar is shown. On mobile, a
hamburger icon opens a Sheet (slide-in drawer) from the right.

**Rationale**: Shadcn Sheet provides accessible slide-in behavior out of the
box (focus trap, keyboard dismiss, overlay). Only the mobile toggle requires
client interactivity — the desktop nav links are static.

**Alternatives considered**: CSS-only hamburger with `<details>` — accessible
but limited animation/overlay support. Custom drawer — rejected in favor of
Shadcn primitive per constitution.

## Decision 6: Image Strategy

**Decision**: Use `next/image` for all images. Hero background uses a large
placeholder image with `priority` and `fill` props for above-the-fold
performance. Below-fold images (therapist photo, service icons) use default lazy
loading. All images in `public/images/` with descriptive alt text in Turkish.

For the initial implementation, use placeholder images:
- Hero: solid color gradient or a placeholder from `public/images/hero-bg.jpg`
- Therapist: placeholder from `public/images/therapist.jpg`
- Service icons: Lucide icons (bundled with Shadcn) instead of image files

**Rationale**: `next/image` provides automatic optimization, WebP conversion,
and lazy loading. Lucide icons avoid image file management for service cards
while remaining crisp at any size.

**Alternatives considered**: CSS background-image for hero — rejected because
`next/image` provides better optimization and responsive sizing.

## Decision 7: lib/routes.ts Structure

**Decision**: Create a central `ROUTES` constant object mapping logical route
names to their URL paths. All navigation links reference this constant.

```typescript
export const ROUTES = {
  home: "/",
  about: "/hakkimda",
  services: "/hizmetler",
  areasOfWork: "/calisma-alanlari",
  contact: "/iletisim",
  blog: "/blog",
} as const;
```

**Rationale**: Constitution mandates `lib/routes.ts` with a central `ROUTES`
constant. Hardcoded route strings elsewhere are prohibited. Turkish slugs match
the Turkish-only content decision.

**Alternatives considered**: English slugs (`/about`, `/services`) — rejected
in favor of Turkish consistency with all-Turkish content.
