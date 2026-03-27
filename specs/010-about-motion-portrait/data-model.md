# Data Model: About Section Subtle Motion & Portrait

**Feature**: `010-about-motion-portrait` | **Date**: 2026-03-27

## Summary

This feature introduces **no** new database tables, Prisma models, or server-persisted entities. It is a **presentation-only** change: static asset reference and UI motion/styling.

## Entities

| Name | Persistence | Notes |
|------|-------------|--------|
| About section content | N/A | Copy remains unchanged per FR-006; not modeled in DB in this slice. |
| Portrait image | Static file | Served from `public/images/kenan_kubuc_stok.jpg` at URL path `/images/kenan_kubuc_stok.jpg`. |

## Validation rules

- None at the data layer; image file is expected to exist in repo for builds and deployments.

## State transitions

- None.
