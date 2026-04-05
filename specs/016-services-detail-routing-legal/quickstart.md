# Quickstart: verify 016-services-detail-routing-legal

Run from repository root: `npm run lint`

## Manual checks

1. **Home (`/`)**  
   - Scroll: **no** “Çalışma Alanları” / `AreasOfWork` section.  
   - Services block matches **compact** cards (no bullet lists under each service).

2. **Services (`/hizmetler`)**  
   - Services block uses **larger** cards than home.  
   - Each service shows a longer description and a **`<ul>`** of points at the bottom of the card.

3. **Removed route**  
   - Open `/calisma-alanlari` — expect **404** (Next.js not found), not the previous `AreasOfWork`-only page.

4. **Header / footer**  
   - No “Çalışma Alanları” link in primary nav or footer sitemap list.  
   - Footer contains the disclaimer sentence **verbatim** (copy-paste check).

5. **Copy sweep**  
   - Spot-check Turkish UI: generic “terapi” marketing phrasing moved toward “danışmanlık” where intended.  
   - Confirm URL paths such as `/cift-terapisi` still work and **path strings** unchanged.

## Grep aids (optional)

```bash
# Should return no TS/TSX usages after implementation (except specs/history if any)
rg "areasOfWork|calisma-alanlari" --glob "*.tsx" --glob "*.ts"
```

## Regression

- SEO landing pages and `HomeTemplate`-based flows still build and show footer disclaimer.
