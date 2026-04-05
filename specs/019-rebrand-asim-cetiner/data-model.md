# Data model: 019-rebrand-asim-cetiner

This feature is **presentation and static asset** only. No Prisma entities or migrations.

## Entity: `SiteBrandIdentity` (conceptual)

| Attribute | Description |
|-----------|-------------|
| Therapist display name | **Asım Çetiner** — canonical string for visible copy, titles, alt text where the professional is named. |
| Former names | **Kenan Kübuç**, **Kenan Buğrahan Kübüç** (and spacing variants) — must not appear in production UI or live SEO metadata after implementation. |

## Entity: `BrandColorTokens` (conceptual)

| Token role | Spec value | Maps to (implementation) |
|------------|------------|---------------------------|
| Primary | `#783B04` | `--primary`, `--ring`, sidebar primary/ring aligned with existing theme pattern |
| Secondary accent | `#FD9B2F` | `--accent` (highlights); `--accent-foreground` chosen for contrast |
| Page background | Off-white (unchanged mood) | `--background` stays soft neutral; tweak only if new primary/foreground pairing requires it |

## Entity: `StaticMarketingImage`

| Logical asset | Public URL | File on disk | Rules |
|---------------|------------|--------------|--------|
| Portrait | `/images/asim_cetiner_stock.jpg` | `public/images/asim_cetiner_stock.jpg` | Used where the therapist photo appeared (`about.tsx` today). |
| Areas background | `/images/areas-of-work-bg.jpg` | `public/images/areas-of-work-bg.jpg` | Replace image bytes; must not be the same file as hero; calm/professional tone. |
| Hero calm image | `/images/hero-therapy-calm.jpg` | `public/images/hero-therapy-calm.jpg` | Replace image bytes; full-bleed hero suitable; calm/contemplative tone. |

**Validation**: Zod/none required. **State transitions**: N/A.
