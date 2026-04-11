# Contract: How it works — horizontal process layout (021-horizontal-process-flow)

Extends copy/data expectations from `specs/020-how-testimonials-home/contracts/home-content.md`; does **not** change `HomeTemplate` section order.

## 1. Component and data source

| Item | Contract |
|------|----------|
| Component | `components/feature/how-it-works.tsx` remains a **React Server Component** (no `'use client'` unless a justified leaf is added later). |
| Data | Steps MUST be rendered from `HOW_IT_WORKS_STEPS` in `lib/content/how-it-works.ts` only—no duplicated copy in the component. |

## 2. Visual layout (desktop-class viewport)

- A **single horizontal dashed connector** spans the width of the step track and passes through the **vertical center** of each step node.
- **Equal column width** per step (grid); title and description are **horizontally centered** under the node.
- **No** per-step card: no `shadow-*`, no bordered “card” panel, no distinct `bg-card` slab behind individual steps (open section on `bg-background`).

## 3. Node appearance

- **Shape**: circle.
- **Fill**: dark, using a **theme token** (e.g. primary/foreground family)—not raw hex outside theme.
- **Border/ring**: light edge (e.g. `border-*` / `ring-*` aligned to background token) so the node reads clearly on the section background.
- **Content**: step index (1…n) centered inside the node.

## 4. Typography

- Step **title**: bold, `text-foreground` (or equivalent semantic token).
- Step **description**: body size, relaxed line height, `text-muted-foreground` (or equivalent)—consistent with surrounding home sections.

## 5. Accessibility

- Steps MUST be exposed as an **ordered list** in the DOM such that assistive technologies read steps **in process order** (first to last).
- Avoid duplicate announcement of the step index (decorative number vs. list position)—implementation MUST verify with VoiceOver/NVDA once.

## 6. Narrow viewport

- All steps MUST remain discoverable (no hidden steps): **horizontal scroll** with a scrollable track and/or breakpoint behavior documented in `research.md`, or an alternate layout that preserves order and node–text association.

## 7. Motion

- Section MAY use existing `RevealSection` wrapper; no requirement for per-step motion. If any motion is added later, it MUST respect `prefers-reduced-motion`.
