# Quickstart: Verify 012 calm areas & contact UI

**Feature**: `012-calm-areas-contact-ui`

## Prereqs

- `npm install` (once)
- `npm run dev`

## Areas of work

1. Open `/` (and optionally `/iletisim` if that page embeds the same home template — confirm where `AreasOfWork` appears).
2. Scroll to **Çalışma Alanları**.
3. Confirm a **background image** appears behind the tags (not only flat muted color for the full section).
4. Confirm the image is **not** the same as the hero’s main photo (`hero-therapy-calm.jpg`).
5. Check **mobile width** (~375px): tags wrap; all labels readable.
6. Optional: throttle network (Slow 3G) and reload — title and tags should still appear; background may load later.

## Contact form

1. Open a page with **İletişime Geçin** (e.g. `/` or `/iletisim`).
2. Confirm inputs, textarea, and office dropdown trigger are **taller** than before and feel consistent.
3. Tab through fields: **focus rings** visible on each control.
4. Submit with **invalid** data: field errors still show; submit with **valid** data: success message and reset behave as before.

## Lint

```bash
npm run lint
```

## Contrast spot-check (manual)

- Use browser devtools or a contrast extension on tag text over chips and on form labels vs background — aim for WCAG AA for normal text where the spec applies.
