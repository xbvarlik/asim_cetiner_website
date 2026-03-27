# Quickstart: Verify 013 header & areas imagery

**Feature**: `013-header-areas-work-ui`

## Prereqs

- `npm install` (once)
- `npm run dev`

## Header

1. Open any page under `(main)` layout (e.g. `/`).
2. At **desktop width** (≥1024px): confirm **nav links sit centered** in the bar, **logo left**, **share + hamburger right**.
3. Confirm the header bar is **taller** than before.
4. Confirm nav text is **larger** and **dark green** (not plain gray/black).
5. **Tab** through logo, share, nav links (desktop), and menu trigger (mobile): **focus rings** visible on each.
6. Resize to **mobile**: open the sheet menu; links work; styling consistent with spec.

## Areas of work

1. On `/`, scroll to **Çalışma Alanları**.
2. Confirm a **background image** displays with overlay and tags readable.
3. **Asset uniqueness**: Search the repo for the new `AREAS_BACKGROUND_SRC` path — it should appear **only** in `areas-of-work.tsx`. Confirm **`kenan_kubuc_stok.jpg`** is **not** used in that file (About may still use it).
4. Confirm the areas image is **not** `hero-therapy-calm.jpg`.

## Lint

```bash
npm run lint
```

## Contrast spot-check (manual)

- Verify nav text contrast on the semi-transparent header background (browser extension or devtools) — aim for **WCAG AA** for normal-sized text.
