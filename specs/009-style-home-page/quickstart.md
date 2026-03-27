# Quickstart: 009 Public Marketing Visual & Motion Refresh

Absolute repo root: `D:\Codes\TherapistLanding\kenan_kubuc_website`

## Prerequisites

- Node 20+ (project uses Next 16 / React 19)
- Dependencies installed: `npm install`

## Implement / verify locally

1. **Add hero image asset** (after selecting a licensed file):

   - Place under `public/images/` (e.g. `public/images/hero-therapy-calm.jpg`).
   - Prefer landscape, ≥ 1920px wide, compressed for web.

2. **Install motion dependency** (when implementation tasks begin):

   ```bash
   npm install framer-motion
   ```

3. **Run dev server**:

   ```bash
   npm run dev
   ```

4. **Manual QA matrix** (minimum):

   | Check | URL / action |
   |-------|----------------|
   | Hero image + overlay + left/start-aligned copy | `http://localhost:3000/` |
   | Shell matches inner page | `/` → `/hizmetler` → `/iletisim` |
   | Scroll reveal | Scroll home + one inner page with multiple sections |
   | Reduced motion | OS setting on → reload → scroll (no required motion) |
   | Keyboard focus | Tab through header, hero links, footer |
   | SEO landing | One path from `SEO_LANDING_PATHS` in `lib/routes.ts` |

5. **Build**:

   ```bash
   npm run build
   ```

## Lint

```bash
npm run lint
```

## Notes

- Do not commit unlicensed stock imagery; keep license/attribution per vendor policy in repo docs if required.
- Admin routes should be visually unchanged by this feature.
