# Data model: Mobile bottom contact bar

## Persistence

**None.** This feature does not introduce Prisma models, Server Actions, or API payloads.

## Configuration surface (conceptual)

| Concept | Description | Validation / rules |
|--------|-------------|-------------------|
| **Practice voice number** | E.164 digits (no `+` in storage) or agreed internal format used to build `tel:` and display copy | Must match footer and any other contact surfaces; keep in one module (`lib/site-contact.ts` per plan). |
| **WhatsApp deep link** | `https://wa.me/<digits>` consistent with practice WhatsApp | Same source as footer; opens in new tab with `rel="noopener noreferrer"`. |

## State transitions

N/A — stateless links.

## Relationships

N/A — no foreign keys or entities.
