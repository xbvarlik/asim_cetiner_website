# Contract: Public brand & marketing surfaces (019)

## Copy contract

- **Canonical therapist name**: **Asım Çetiner** (Latin **I** in “Asım” as used in Turkish typography; match stakeholder spelling).
- **Forbidden in production visitor/admin-visible strings**: **Kenan Kübuç**, **Kenan Buğrahan Kübüç**, and obvious variants used as the practitioner name.
- **Email**: `info@kenankubuc.com` may remain until a separate stakeholder decision provides a replacement (out of scope for name/visual rebrand).

## Metadata contract

- **Root title pattern**: `"%s | Asım Çetiner"` (or equivalent with Asım Çetiner as the stable suffix).
- **Default home title**: Must include **Asım Çetiner**, not the prior name.
- **SEO landing page titles** (`lib/seo/landing-pages.ts`): Pipe suffix **`| Asım Çetiner`** for each defined landing entry.

## Image contract

| Surface | `src` / path | Alt text (where applicable) |
|---------|----------------|-----------------------------|
| About portrait | `/images/asim_cetiner_stock.jpg` | Describes **Asım Çetiner**, clinical role; no old name. |
| Hero | `/images/hero-therapy-calm.jpg` | Decorative empty alt allowed if unchanged pattern. |
| Areas of work | `/images/areas-of-work-bg.jpg` | Decorative empty alt allowed if unchanged pattern. |

## Theme contract (visual)

- Interactive **primary** surfaces (buttons, key brand marks using `primary`) render **#783B04** as the main fill/border color as defined in `:root`.
- **Accent** highlights (links, chips, secondary emphasis using `accent`) render **#FD9B2F** as the main accent color.
- **Background** of the document body remains a **soft off-white** relative to white (#fff)—not a saturated page-wide color.

## Verification

1. Repo search for `Kenan`, `Kübuç`, `Kübüç` under `app/`, `components/`, `lib/` (exclude `specs/` unless scope expanded).
2. Spot-check home, about, one SEO landing, header, footer, layout metadata.
3. Visual pass: hero, areas section readability, primary button contrast.
