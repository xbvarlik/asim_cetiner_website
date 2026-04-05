# Quickstart: 019-rebrand-asim-cetiner

## Prerequisites

- Node 20+, dependencies installed (`npm install`).
- Files present: `public/images/asim_cetiner_stock.jpg`; replacement binaries for `areas-of-work-bg.jpg` and `hero-therapy-calm.jpg` (rights-cleared).

## Implementation order (suggested)

1. **`app/globals.css`** — Set `:root` tokens for primary (#783B04), accent (#FD9B2F), aligned ring/sidebar/chart tokens if needed; keep background off-white; validate `--primary-foreground` / `--accent-foreground` contrast.
2. **Portrait** — `components/feature/about.tsx`: `src="/images/asim_cetiner_stock.jpg"`, update intro line and `alt`.
3. **Global name** — `components/feature/header.tsx`, `components/feature/footer.tsx` (title, copyright; leave email unless stakeholder updates).
4. **Metadata** — `app/layout.tsx`, `app/(main)/page.tsx`, `hakkimda`, `iletisim`, `sikca-sorulan-sorular` metadata exports.
5. **SEO landings** — `lib/seo/landing-pages.ts` title strings.
6. **Images** — Overwrite `public/images/areas-of-work-bg.jpg` and `hero-therapy-calm.jpg` (no code change if paths unchanged).
7. **Lint** — `npm run lint`.

## Quick verification

```bash
# From repository root
npm run lint
```

Manual:

- Open `/`, `/hakkimda`, one of `/istanbul-psikolog`, `/besiktas-psikolog`, `/uskudar-psikolog`, `/bilissel-davranisci-terapi`, `/cift-terapisi`.
- Confirm browser tab titles and on-page name read **Asım Çetiner**.
- Confirm About image URL in network tab is `asim_cetiner_stock.jpg`.

## Optional (non-blocking)

- Rename `package.json` `name` from `kenan-kubuc-website` if publishing or workspace clarity matters.
- Update `.env.example` example `DATABASE_URL` database name for local dev consistency.
