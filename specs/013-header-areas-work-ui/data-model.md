# Data Model: Header, Areas of Work Imagery, and Calm UI

**Feature**: `013-header-areas-work-ui`  
**Date**: 2026-03-27

## Persistence

**None.** This feature is presentation-only. No Prisma models, migrations, or Server Action changes.

## Static presentation (reference)

| Concept | Description | Validation / rules |
|---------|-------------|-------------------|
| **Header nav items** | `navItems` derived from `ROUTES` + `getHomeLink(pathname)` | Labels and `href`s MUST remain unchanged |
| **Areas clinical labels** | `CLINICAL_AREAS` in `areas-of-work.tsx` | Unchanged strings unless a separate copy spec applies |
| **Areas background asset** | Single `AREAS_BACKGROUND_SRC` string | MUST reference a file under `public/images/` that is not referenced by any other component |

## State transitions

**N/A** — Header client state (sheet open, share modal) unchanged in behavior; only layout and styling.
