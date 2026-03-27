# Data Model: Services list entrance and calm presentation

**Feature**: `011-services-list-entrance` | **Date**: 2026-03-27

## Overview

No database entities or API payloads. The feature only affects **presentation** of a **static in-code list** of services.

## Entity: Service item (presentation)

| Field | Type (conceptual) | Required | Notes |
|--------|-------------------|----------|--------|
| `icon` | Icon component | Yes | Lucide (or equivalent) visual for the card header |
| `title` | string | Yes | Short heading; used as React `key` today |
| `description` | string | Yes | Supporting copy under the title |

## Relationships

- Items form an **ordered list**. **Array order** defines entrance **sequence** (top-to-bottom / grid read order) per FR-002.

## Validation rules

- **Uniqueness**: `title` SHOULD remain unique within the list (stable `key`).
- **Content**: No schema validation (Zod) required for this feature; copy edits are out of scope unless explicitly requested.

## State transitions

- **None** (static marketing content).

## Reduced motion

- When the user prefers reduced motion, **entrance** is skipped; **content** remains the same ordered list with no animation state machine beyond “static.”
