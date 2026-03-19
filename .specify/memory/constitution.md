<!--
Sync Impact Report
===================
Version change: 0.0.0 → 1.0.0
Modified principles: N/A (initial constitution)
Added sections:
  - Core Principles (5 principles: Core Tech Stack, Architecture & Component Philosophy,
    Data Handling & Logic, Directory Standards, State Management)
  - Styling & UI Conventions (new section)
  - Code Quality & TypeScript Conventions (new section)
  - Governance
Removed sections: None
Templates requiring updates:
  - .specify/templates/plan-template.md        ✅ reviewed — generic structure, no changes required
  - .specify/templates/spec-template.md        ✅ reviewed — generic structure, no changes required
  - .specify/templates/tasks-template.md       ✅ reviewed — generic structure, no changes required
  - .specify/templates/checklist-template.md   ✅ reviewed — generic structure, no changes required
  - .specify/templates/agent-file-template.md  ✅ reviewed — generic structure, no changes required
Follow-up TODOs: None
-->

# Kenan Kubuc Website Constitution

## Core Principles

### I. Core Tech Stack

The project MUST use the following technologies exclusively:

- **Framework**: Next.js LTS (App Router)
- **UI Library**: React 19+
- **Styling**: Tailwind CSS
- **Component Library**: Shadcn/UI
- **ORM**: Prisma ORM
- **Validation**: Zod

All dependencies MUST align with this stack. Third-party libraries outside this
stack require explicit justification and documented rationale before adoption.

### II. Architecture & Component Philosophy

**Server-First**: All components are React Server Components by default. The
`'use client'` directive MUST only be applied to leaf-node components that
require browser interactivity (event handlers, hooks, browser APIs).

**Component Hierarchy** (strictly enforced):

- `components/ui/`: Atomic, highly reusable primitives (primarily Shadcn/UI).
  MUST NOT contain business logic.
- `components/feature/`: Molecular compositions of UI atoms. These handle
  feature-specific layout and internal logic.
- `app/`: Contains `page.tsx` files acting as Organisms — composing feature
  molecules and performing server-side data fetching.

A component MUST NOT skip hierarchy levels. A page MUST NOT directly use a UI
atom for feature-specific behavior — it MUST wrap it in a feature component.

### III. Data Handling & Logic

- **Mutations**: All CRUD operations and form submissions MUST use Server
  Actions. API routes for mutations are prohibited unless interfacing with
  external services.
- **Business Logic**: All database interactions MUST be encapsulated in
  `server/services/` organized by feature. Services interact directly with
  Prisma. No repository abstraction layer.
- **Validation**: All user input and API payloads MUST be validated with Zod
  schemas. Validation MUST occur at the boundary (Server Actions, API route
  handlers) before any business logic executes.

### IV. Directory Standards

The following directory structure is mandatory:

- `lib/prisma.ts`: Singleton Prisma client instance.
- `lib/api/`: Fetch wrappers for internal and external API routes.
- `lib/routes.ts`: Central `ROUTES` constant for all application paths.
  Hardcoded route strings elsewhere are prohibited.
- `lib/hooks/`: Client-side custom hooks only.
- `lib/server/`: Server-only utility functions and helpers.
- `types/`: Centralized TypeScript type definitions. Co-located types are
  acceptable only for component props.

### V. State Management

- External state management libraries (Redux, Zustand, Jotai, etc.) are
  prohibited.
- React Context API MUST only be used when state needs to be shared across
  deeply nested components where prop drilling is impractical.
- Prefer URL search params, server state, and component-local state before
  reaching for Context.

## Styling & UI Conventions

- Tailwind CSS utility classes are the primary styling mechanism. Custom CSS
  files are prohibited unless required for third-party library overrides.
- Shadcn/UI components MUST be used as the base for all UI primitives. Custom
  primitives MUST only be created when no suitable Shadcn component exists.
- Design tokens (colors, spacing, typography) MUST be configured in
  `tailwind.config.ts` and referenced via Tailwind classes — never hardcoded.
- Responsive design MUST follow a mobile-first approach using Tailwind
  breakpoint utilities.

## Code Quality & TypeScript Conventions

- TypeScript strict mode MUST be enabled. The `any` type is prohibited; use
  `unknown` with type guards instead.
- All exported functions and components MUST have explicit return types.
- Barrel exports (`index.ts`) MUST be used for `components/ui/`,
  `components/feature/`, and `types/` directories.
- File naming: `kebab-case` for files, `PascalCase` for components, `camelCase`
  for utilities and hooks.

## Governance

This constitution is the authoritative reference for all architectural and
development decisions in this project. All code contributions MUST comply with
these principles.

**Amendment Procedure**:

1. Proposed changes MUST be documented with rationale.
2. Changes MUST be reflected in this constitution before implementation begins.
3. All dependent templates and documentation MUST be updated in the same
   amendment cycle.

**Versioning**: This constitution follows semantic versioning (MAJOR.MINOR.PATCH).

**Compliance**: Every pull request and code review MUST verify adherence to
these principles. Non-compliance MUST be flagged and resolved before merge.

**Version**: 1.0.0 | **Ratified**: 2026-03-19 | **Last Amended**: 2026-03-19
