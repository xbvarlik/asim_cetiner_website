# Data Model: 009 Public Marketing Visual & Motion Refresh

This feature is **presentation-only**; there is **no new Prisma schema** or persisted business entity. The following **conceptual model** guides which UI surfaces share behavior and tokens.

## Conceptual entities

### PublicMarketingSurface

**Represents**: A visitor-facing route that must obey the unified design system (typography, spacing, motion vocabulary, shell).

**Key attributes**:

- `routePattern`: filesystem path under `app/(main)/` or `app/(home-variations)/` (excluding dynamic segments where styling is inherited).
- `usesFullHomeTemplate`: boolean — `true` for pages composing `HomeTemplate` (home + SEO landings using the same template).
- `hasPhotographicHero`: boolean — `true` **only** for the primary home hero implementation on `/` and equivalent **when** product choice is to reuse the same hero component; per spec, the **therapy stock hero** is required on the **home (primary landing) page**; SEO variants may reuse `Hero` via `HomeTemplate` (same component = same treatment).

**Relationships**:

- Composed of many `SectionBlock` instances (see below).
- Wrapped by `GlobalShell` (header/footer).

### GlobalShell

**Represents**: `SiteShell` → `Header`, `Footer`, optional trackers.

**Validation / rules**:

- Header and footer MUST use the same tokens and interaction states as inner pages (**FR-009**).
- Focus rings visible on all interactive chrome (**SC-005**).

### SectionBlock

**Represents**: A major vertical band on a page (e.g. About, Services list, Contact form section).

**Key attributes**:

- `semanticRole`: marketing section name (for QA checklists only).
- `scrollRevealEligible`: boolean — `false` for pages with a single short block (spec exemption).

**Validation / rules**:

- When `scrollRevealEligible` is true and user has not requested reduced motion, block MUST animate into view once per page load path (**FR-004**).
- Spacing and radii MUST align with token scale (**FR-003**).

### InteractiveTile

**Represents**: Card-like UI (service tiles, testimonials, list items with hover).

**Validation / rules**:

- Pointer hover: subtle elevation/scale/shadow (**FR-005**).
- Keyboard focus: visible ring, no reliance on hover-only cues (**FR-005**, **SC-005**).

### HomeHeroMedia

**Represents**: Background photograph + overlays + fallback.

**Validation / rules**:

- Licensed asset in repo (**Assumptions** in spec).
- Foreground text contrast sufficient; overlay adjustable (**Edge cases**).
- Start-aligned headline and CTAs in LTR (**FR-002**).

## State transitions

| State              | Trigger                         | Outcome                                      |
|--------------------|----------------------------------|----------------------------------------------|
| Motion enabled     | Default / no reduced-motion pref | Scroll reveal + hover motion active          |
| Reduced motion     | `prefers-reduced-motion: reduce` | Content visible without required animation   |
| Hero image pending | Image loading                    | Fallback gradient/solid visible immediately  |
| Hero image error   | Load failure                     | Fallback only; text and CTAs remain usable |

## Non-goals (data)

- No new CMS fields for “animation on/off” unless a future feature requests it.
- No analytics schema changes for this feature.
