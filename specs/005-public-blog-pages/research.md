# Research: Public Blog List & Detail

**Feature**: `005-public-blog-pages`  
**Date**: 2026-03-21

## R1: Listing published posts

**Decision**: Add **`listPublishedForPublic`** (name may vary) in **`blog-service.ts`** that queries `BlogPost` with **`where: { isActive: true }`**, **`orderBy: { createdAt: "desc" }`**, and a **high but bounded** `take` (e.g. **100**) for the first release—no public pagination in spec.

**Rationale**: Spec requires **only active** posts and **newest first**; existing **`getAll`** returns all posts regardless of `isActive`. A dedicated function keeps public behavior explicit and testable.

**Alternatives considered**:

- **Filter in the page**: Violates FR-005 (logic should live in the service layer).
- **Cursor pagination**: Out of scope until spec asks for it.

## R2: Detail fetch and `notFound()`

**Decision**: Add **`getPublishedById(id: number)`** (or equivalent) that returns **`ServiceResult<BlogPost | null>`** where **`null`** means missing **or** `isActive: false`. The page parses `params.id` with **Zod** `z.coerce.number().int().positive()`; on parse failure or **`null`**, call **`notFound()`**.

**Rationale**: Single source of truth; never leak draft bodies on the public route.

**Alternatives considered**:

- **`getById` + check in page**: Duplicates rules; prefer one service method for public reads.

## R3: Route helper for `/blog/[id]`

**Decision**: Export **`getBlogPostPath(id: number): string`** (or **`ROUTES.blogPost(id)`** if the codebase prefers a method on a nested object) from **`lib/routes.ts`**, returning **`/blog/${id}`**. **BlogCard** imports only this helper + **`ROUTES.blog`** for list—**no** template literals in feature files.

**Rationale**: Constitution **IV** — central path definitions.

## R4: Typography without `@tailwindcss/typography`

**Decision**: Use Tailwind **layout/typography utilities** only: **`max-w-prose`**, **`leading-relaxed`**, **`text-pretty`**, spacing (`space-y-*`), **`text-foreground`** / **`text-muted-foreground`**. Defer adding **`@tailwindcss/typography`** unless stakeholders ask for full `prose` plugin.

**Rationale**: Keeps dependencies minimal; meets FR-013 readability for typical article lengths.

## R5: Body content: plain text vs HTML

**Decision**: Treat **`BlogPost.content`** as **trusted admin-authored** string. If it **contains HTML markers** (e.g. `<p>`, `<br>`, `<img`), render inside a **server** wrapper using **`dangerouslySetInnerHTML`** inside a scoped container **`.blog-body`**. Apply a **minimal server-side strip** of **`<script`** / **`on*=`** attributes (simple string pass) before injection—**not** a full HTML sanitizer library in v1.

**Rationale**: Spec assumes trusted content; blocks the most obvious XSS vectors without new deps.

**Alternatives considered**:

- **Plain text only**: Fails admin rich content expectations if HTML is already stored.
- **Full sanitizer (DOMPurify/isomorphic-dompurify)**: Better hardening; add in a hardening follow-up if needed.

## R6: Images inside HTML body (FR-014)

**Decision**: In v1, style embedded images with **scoped CSS**: **`.blog-body img { max-width: 100%; height: auto; }`** so they are responsive. Use **`next/image`** only when a future pass introduces structured blocks or known-safe internal URLs + **`remotePatterns`**.

**Rationale**: Arbitrary CMS HTML makes **`next/image`** width/height and remote domain config awkward without a parser pipeline.

## R7: Brand “semi-dark green”

**Decision**: Use **`text-primary`** for article titles and primary inline links (**`text-primary`**, **`hover:underline`**, **`focus-visible:ring`**)—**`:root` `--primary`** is already a **semi-dark green** in `globals.css`.

**Rationale**: Aligns with existing tokens (FR-012).
