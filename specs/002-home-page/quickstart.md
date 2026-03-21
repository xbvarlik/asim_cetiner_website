# Quickstart: Home Page

**Feature**: 002-home-page | **Date**: 2026-03-19

## Prerequisites

- Node.js 18+ installed
- PostgreSQL database running (connection string in `.env`)
- `npm install` completed
- Prisma migration applied (`npx prisma migrate dev`)
- Database seeded (`npx prisma db seed`)

## Setup Steps

### 1. Initialize Shadcn/UI

```bash
npx shadcn@latest init
```

Follow prompts — the CLI detects Next.js 16 + Tailwind v4 automatically.

### 2. Add Required Shadcn Components

```bash
npx shadcn@latest add button input label select textarea sheet
```

### 3. Create Routes Constant

Create `lib/routes.ts`:

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

### 4. Update Theme Colors

Update `app/globals.css` with the green/off-white palette in the `@theme`
block (see `research.md` Decision 2 for full CSS).

### 5. Run Development Server

```bash
npm run dev
```

Visit `http://localhost:3000` to see the home page.

## File Structure After Implementation

```text
app/
├── (main)/
│   ├── layout.tsx              # Shared Header + Footer
│   └── page.tsx                # Home page composition
├── globals.css                 # Theme tokens
└── layout.tsx                  # Root layout (lang="tr")

components/
├── feature/
│   ├── header.tsx
│   ├── hero.tsx
│   ├── about.tsx
│   ├── areas-of-work.tsx
│   ├── services-list.tsx
│   ├── contact-form.tsx
│   ├── map-view.tsx
│   ├── footer.tsx
│   └── index.ts
└── ui/
    ├── button.tsx (Shadcn)
    ├── input.tsx (Shadcn)
    ├── label.tsx (Shadcn)
    ├── select.tsx (Shadcn)
    ├── textarea.tsx (Shadcn)
    ├── sheet.tsx (Shadcn)
    └── ...

lib/
└── routes.ts

server/
└── actions/
    └── lead-actions.ts

types/
└── index.ts                    # Extended with ContactFormState, NavItem
```

## Usage Examples

### Navigating with centralized routes

```tsx
import Link from "next/link";
import { ROUTES } from "@/lib/routes";

<Link href={ROUTES.about}>Hakkımda</Link>
```

### Submitting the contact form

The ContactForm component handles everything internally:

1. Visitor fills fields → client-side Zod validation on blur/submit.
2. On submit → `useActionState` calls `createLeadAction`.
3. Server validates with Zod → checks honeypot → calls `leadService.create`.
4. Success → confirmation message shown, form reset.
5. Failure → field-level or general error displayed.

## Common Commands

```bash
# Development
npm run dev

# Build
npm run build

# Add a new Shadcn component
npx shadcn@latest add <component-name>

# Check for Shadcn updates
npx shadcn@latest diff
```
