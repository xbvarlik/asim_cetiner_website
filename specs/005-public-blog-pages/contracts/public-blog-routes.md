# Contract: Public Blog Routes & Metadata

**Feature**: `005-public-blog-pages`  
**Date**: 2026-03-21

## Paths (`lib/routes.ts`)

| Symbol | Value / signature | Usage |
|--------|-------------------|--------|
| `ROUTES.blog` | `"/blog"` | List page, “Geri Dön” target, nav |
| **`getBlogPostPath(id: number)`** (or `ROUTES.blogPost(id)`) | `"/blog/" + id` | **BlogCard** “Devamını oku” / read more **only** via this helper |

**Rule**: Feature components **MUST NOT** contain the literal substring `"/blog/"` except inside the routes module (or a single re-exported helper).

## Next.js routes

| File | URL |
|------|-----|
| `app/(main)/blog/page.tsx` | `ROUTES.blog` |
| `app/(main)/blog/[id]/page.tsx` | `getBlogPostPath(id)` pattern |

## Metadata

| Page | `metadata.title` | `metadata.description` (suggested) |
|------|------------------|-------------------------------------|
| List | e.g. **“Blog”** (fits root `template`) | Short Turkish summary of the blog section |
| Detail | **Post `title`** | First ~155 chars of plain text preview from `content` (strip tags) or `title` fallback |

**Dynamic**: `generateMetadata` async function on **`blog/[id]/page.tsx`** reading the same **published-only** fetch as the page body.

## Error contract

- Invalid **`id`** (non-numeric, ≤0) → **`notFound()`**
- Missing row or **`isActive: false`** → **`notFound()`**

## Component props (illustrative)

- **`BlogList`**: `{ posts: PublicBlogPost[] }`
- **`BlogCard`**: `{ post: PublicBlogPost }` where `PublicBlogPost` includes at least `id`, `title`, `content`, `createdAt`
- **`BlogContent`**: `{ post: PublicBlogPost }` (full body) + optional `backHref` defaulting to **`ROUTES.blog`**
