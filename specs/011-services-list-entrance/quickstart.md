# Quickstart: Verify services list entrance

**Feature**: `011-services-list-entrance` | **Date**: 2026-03-27

## Prerequisites

- Node 20+
- From repo root: `npm install` (once)

## Run locally

```bash
npm run dev
```

Open the page that renders **`ServicesList`** (home or landing route per project).

## Checks

1. **Entrance**: Scroll until the services grid enters view. Confirm each card moves **up** into place in **order** (not all at once as a single block only).
2. **Hover**: Hover each card — **lift / scale / shadow** should match the **pre-change** behavior in character (compare with a `main` checkout if needed).
3. **Focus**: Tab into links or focusable content inside cards — **focus ring** visible.
4. **Reduced motion**: OS setting **Reduce motion** (Windows: Accessibility → Visual effects; macOS: Display → Reduce motion). Reload — **no** entrance animation; content immediately usable.
5. **Lint**: `npm run lint` passes on touched files.

## Regression signal

- No console errors from Framer / React.
- No layout jump after animations finish (CLS heuristic: stable grid).
