# Quickstart: 021-horizontal-process-flow

## Prerequisites

- Node 20+ (per project conventions)
- Dependencies installed: `npm install`

## Run the app

```bash
npm run dev
```

Open `http://localhost:3000/` and scroll to **Süreç Nasıl İşliyor?** (after services, before testimonials per `HomeTemplate`).

## What to verify

1. **Desktop width**: Five steps on one horizontal path; dashed line through nodes; dark circular nodes with light edge; numbers centered; titles bold; descriptions centered below; no card boxes/shadows per step.
2. **Spacing**: Gaps between step centers look even (spot-check vs. design spec ±15% if measuring).
3. **Narrow width**: All five steps still reachable (scroll or adapted layout); no overlapping illegible text.
4. **A11y**: Screen reader announces ordered steps in sequence 1→5 without confusing duplicate numbers.
5. **Lint**: `npm run lint` passes.

## Key files

- `components/feature/how-it-works.tsx` — layout implementation
- `lib/content/how-it-works.ts` — step copy (unchanged unless content task)
- `specs/021-horizontal-process-flow/contracts/how-it-works-layout.md` — layout contract
