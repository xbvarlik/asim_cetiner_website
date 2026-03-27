# Data Model: Calm areas background and modern contact inputs

**Feature**: `012-calm-areas-contact-ui`  
**Date**: 2026-03-27

## Persistence

**None.** This feature is presentation-only. No Prisma models, migrations, or Server Action payload changes.

## Static presentation (reference)

| Concept | Description | Validation / rules |
|---------|-------------|-------------------|
| **Areas section** | Ordered list of Turkish clinical area labels (`CLINICAL_AREAS` in code) | Unchanged strings and order per spec (no copy change) |
| **Contact lead fields** | Existing form field names and Zod validation in `createLeadAction` | MUST remain identical (`name`, `phoneNumber`, email, office, message, honeypot, `utmSource`, etc.) |

## State transitions

**N/A** — No new client or server state machines. Success and error paths for the contact form stay as implemented today.
