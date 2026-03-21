# Data Model: Home Page

**Feature**: 002-home-page | **Date**: 2026-03-19

## Existing Entities (from 001-backend-data-layer)

This feature reuses the existing data layer. No schema changes required.

### Lead

| Field       | Type     | Constraints                                     |
|-------------|----------|-------------------------------------------------|
| id          | String   | UUID, PK, auto-generated                        |
| name        | String   | Required, max 255                               |
| phoneNumber | String   | Required, max 50                                |
| email       | String   | Required, valid email, max 255                  |
| message     | String   | Optional, max 2000                              |
| officeId    | Int      | FK → Office.id, required                        |
| statusId    | Int      | FK → Status.id, required (default: "New" = 1)   |
| deletedAt   | DateTime | Nullable, soft delete marker                    |
| createdAt   | DateTime | Auto-set on creation                            |
| updatedAt   | DateTime | Auto-updated                                    |

### Office

| Field    | Type   | Constraints                |
|----------|--------|----------------------------|
| id       | Int    | PK, auto-increment         |
| name     | String | Required, unique           |
| address  | String | Required                   |
| mapsLink | String | Optional                   |

### Status

| Field | Type   | Constraints                |
|-------|--------|----------------------------|
| id    | Int    | PK, auto-increment         |
| name  | String | Required, unique           |

## New Types (frontend-facing)

### ContactFormState

The state type used by `useActionState` for the contact form:

```
ContactFormState {
  success: boolean
  error?: string                    // General form error
  fieldErrors?: {                   // Per-field validation errors
    name?: string[]
    phoneNumber?: string[]
    email?: string[]
    message?: string[]
    officeId?: string[]
  }
}
```

### NavItem

Used by Header and Footer for navigation link rendering:

```
NavItem {
  label: string        // Display text (Turkish)
  href: string         // Route path from ROUTES constant
}
```

## Data Flow

1. **Office list**: Server Component fetches offices via `officeService.getAll()`
   at page render time → passed as props to ContactForm.
2. **Lead creation**: ContactForm (client) → Server Action (`createLeadAction`)
   → honeypot check → Zod validation → `leadService.create()` → database.
3. **Static content**: All mock data (services, areas of work, about text) is
   hardcoded in component files as constants — no database queries needed.
