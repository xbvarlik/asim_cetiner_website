# Implementation Plan: Admin mobile layout and navigation

**Branch**: `018-admin-mobile-layout` | **Date**: 2026-04-05 | **Spec**: [spec.md](./spec.md)  
**Input**: Feature specification from `/specs/018-admin-mobile-layout/spec.md`

**Note**: This template is filled in by the `/speckit.plan` command. See `.specify/templates/plan-template.md` for the execution workflow.

## Summary

Make the **admin area** usable on narrow viewports: replace the always-visible horizontal nav in `AdminShell` with a **hamburger-triggered** off-canvas (or equivalent) navigation on small screens, keep a **desktop** sidebar/header nav from `md` (or similar) upward, and eliminate **horizontal page scrolling** on admin list, form, and stats views by using **responsive tables**, **stacked layouts**, **progressive disclosure** (expand/toggle row details), and **contained overflow** (e.g. chart/table regions) where full shrink is impossible. **Do not change** `app/(main)/` or other public marketing routes.

**Phase outputs**: [research.md](./research.md) (decisions), [data-model.md](./data-model.md) (persistence scope), [contracts/](./contracts/) (UI acceptance contract), [quickstart.md](./quickstart.md) (verification).

## Technical Context

**Language/Version**: TypeScript 5.x (strict)  
**Primary Dependencies**: Next.js 16 (App Router), React 19, Tailwind CSS 4, Shadcn/UI (`@base-ui` primitives), lucide-react; existing **Sheet** primitive at `components/ui/sheet.tsx`  
**Storage**: N/A — no Prisma or schema changes  
**Testing**: `npm run lint` (ESLint); manual verification per [quickstart.md](./quickstart.md) and [contracts/admin-mobile-ui.md](./contracts/admin-mobile-ui.md)  
**Target Platform**: Web; mobile-first responsive admin (`max-w-6xl` shell already)  
**Project Type**: Single Next.js app (`app/` + `components/feature/`)  
**Performance Goals**: No unnecessary client JS beyond what `AdminShell` already uses; keep new interactivity localized to admin feature components  
**Constraints**: Constitution — server-first; `'use client'` only on interactive leaves; use `ROUTES` from `lib/routes.ts`; no edits outside admin scope per spec FR-007  
**Scale/Scope**: `AdminShell` + admin tables (`admin-leads-table`, `admin-blog-table`, `admin-office-table`), shared `admin-data-table` helpers, stats feature (`components/feature/stats/*`), login/settings modals as needed; ~8 admin routes under `app/(admin)/`

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

| Principle | Status | Notes |
|-----------|--------|--------|
| I. Core stack | Pass | Sheet/Button already in stack; no new dependency required |
| II. Server-first / hierarchy | Pass | Pages stay server components; extend existing **client** `AdminShell` and existing **client** table components; any new mobile-only UI stays in `components/feature/` or `components/ui/` |
| III. Data / mutations | Pass | No Server Action or service changes |
| IV. Directory standards | Pass | Nav links continue to use `ROUTES` |
| V. State | Pass | Menu open/row expand = local `useState` in client components; no global store |

**Post-design**: No violations; **Complexity Tracking** not required.

## Project Structure

### Documentation (this feature)

```text
specs/018-admin-mobile-layout/
├── plan.md
├── research.md
├── data-model.md
├── quickstart.md
├── contracts/
│   └── admin-mobile-ui.md
├── checklists/
│   └── requirements.md
└── spec.md
```

### Source Code (repository root)

```text
app/(admin)/
├── layout.tsx                          # Unchanged wrapper (session) — verify no overflow
├── admin/(auth)/login/page.tsx         # Optional: padding/max-width touch-up only if needed
└── admin/(dashboard)/**/page.tsx       # Unchanged data wiring; layout via AdminShell

components/feature/
├── admin-shell.tsx                     # Hamburger + Sheet/drawer nav; responsive header
├── admin-leads-table.tsx               # Mobile row summary + expand / or stacked cards
├── admin-blog-table.tsx                # Same pattern
├── admin-office-table.tsx              # Same pattern
├── admin-data-table.tsx                # Pagination/sort row wrap for narrow widths
├── admin-login-form.tsx                # Only if fields overflow on 320px
├── admin-change-password-modal.tsx     # Only if modal content overflows
└── stats/
    ├── stats-dashboard.tsx             # Grids/charts: min-w-0, responsive chart containers
    ├── lead-stats-chart.tsx            # As needed for overflow
    ├── visitor-stats-chart.tsx
    ├── conversion-table.tsx
    └── source-comparison-chart.tsx

components/ui/
└── sheet.tsx                           # Reuse for mobile nav panel
```

**Structure Decision**: Single Next.js app. All functional changes stay under `components/feature/` (admin) and optionally `components/ui/` for primitives already in use. No changes under `app/(main)/` or public components.

## Complexity Tracking

> **Fill ONLY if Constitution Check has violations that must be justified**

| Violation | Why Needed | Simpler Alternative Rejected Because |
|-----------|------------|-------------------------------------|
| — | — | — |
