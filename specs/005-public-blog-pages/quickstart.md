# Quickstart: Public Blog List & Detail

**Feature**: `005-public-blog-pages`  
**Date**: 2026-03-21

## Prerequisites

- Database with **`BlogPost`** rows (seed or admin).
- At least one post with **`isActive: true`** for happy-path checks.
- Optional: one post with **`isActive: false`** to verify detail **404**.

## Steps

1. **`npm run dev`**
2. Open **`/blog`** — expect list of **active** posts only, newest first.
3. Click **Devamını oku** — lands on **`/blog/<id>`** with full content.
4. Click **Geri Dön** — returns to **`/blog`**.
5. Open **`/blog/<draftId>`** for a draft — expect **not found** UI.
6. Open **`/blog/999999`** (non-existent) — **not found**.
7. Open **`/blog/not-a-number`** — **not found**.
8. Verify browser tab title: list shows blog section title; detail shows **post title**.
9. **`npm run build`** — no type errors.

## Empty state

- Set all posts to **`isActive: false`** (or delete actives) — list shows **“Henüz yazı paylaşılmadı”** (or approved copy).
