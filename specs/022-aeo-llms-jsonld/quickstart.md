# Quickstart: Verify 022-aeo-llms-jsonld

## Prerequisites

- Node 20+ (see repo)
- `npm install`
- Optional: set `NEXT_PUBLIC_SITE_URL` to your public origin (e.g. `https://your-domain.com`) so JSON-LD `url` / `@id` match production. For local checks, unset is OK if code falls back to `http://localhost:3000`.

## Run locally

```bash
npm run dev
```

## Checks

### `llms.txt`

1. Open `http://localhost:3000/llms.txt` (or production `/llms.txt`).
2. Confirm H1, summary, section links, and verbatim disclaimer per [spec.md](../spec.md) **FR-003**.
3. Search the file for blacklist terms (**FR-002**); expect **zero** hits on new strings.

### JSON-LD

1. View source on any public page that uses `SiteShell` (e.g. `/`, `/hizmetler`).
2. Find `<script type="application/ld+json">` containing `@type` `LocalBusiness`, nested `Person`, `jobTitle` `Uzman Psikolog`, no `MedicalBusiness`.
3. Validate JSON (browser devtools or copy-paste into a JSON formatter).
4. Confirm `knowsAbout` includes Wikidata IRIs from [research.md](./research.md).
5. Confirm `sameAs` includes Instagram from `lib/site-contact.ts` and placeholder tokens for Academia/ResearchGate.

### Lint

```bash
npm run lint
```

## Files to touch (implementation)

- `public/llms.txt` — static content
- `components/feature/site-shell.tsx` — compose JSON-LD feature component
- `lib/seo/` or `lib/structured-data/` — build graph + base URL helper
- `lib/site-contact.ts` — already canonical for contact; consume, do not duplicate numbers ad hoc
