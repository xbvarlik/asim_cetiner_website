# Feature 024: Legal Documents, Blog Enhancements & Sitemap

**Status**: In Development  
**Created**: 2026-05-13  
**Last Updated**: 2026-05-13

## Overview

This feature adds:
1. Database-managed legal documents (KVKK Aydinlatma Metni, Gizlilik Sözleşmesi)
2. Rich text editor for blog posts with styling support
3. Slug-based blog URLs
4. Dynamic sitemap generation

## Requirements

### 1. Legal Documents Management

#### 1.1 Database Storage
- Store KVKK Aydinlatma Metni and Gizlilik Sözleşmesi in database
- Support rich text content with HTML
- Track creation and update timestamps
- Single-record system (one KVKK, one Gizlilik document)

#### 1.2 Admin Panel
- CRUD interface for managing legal documents
- Rich text editor with formatting options
- Preview capability
- Turkish language interface

#### 1.3 Public Pages
- `/kvkk-aydinlatma-metni` - KVKK disclosure page
- `/gizlilik-sozlesmesi` - Privacy policy page
- SEO-optimized metadata
- Responsive design

### 2. Blog Enhancements

#### 2.1 Rich Text Support
- Bold, italic, underline formatting
- Multiple heading levels (H1-H6)
- Paragraph support
- Ordered and unordered lists
- Links
- Blockquotes
- Code blocks

#### 2.2 Rich Text Editor
- WYSIWYG editor in admin panel
- Toolbar with formatting options
- Support for pasting from:
  - Microsoft Word (.doc, .docx)
  - Markdown (.md)
  - Plain text
- Preserve formatting on paste
- HTML storage in database

#### 2.3 Slug-Based URLs
- Generate URL-friendly slugs from blog titles
- Format: `/blog/example-title` instead of `/blog/3`
- Automatic slug generation on create/update
- Handle Turkish characters (ç→c, ş→s, ğ→g, ü→u, ö→o, ı→i)
- Ensure slug uniqueness
- Migration path for existing blog posts

#### 2.4 Unique Title Enforcement
- Database constraint for unique titles
- Validation in service layer
- Clear error messages in UI

### 3. Sitemap Generation

#### 3.1 Dynamic Sitemap
- Generate `/sitemap.xml` dynamically
- Include all public pages:
  - Main pages (home, about, services, contact, FAQ)
  - SEO landing pages
  - Blog index and individual posts
  - Legal document pages
- Exclude admin pages
- Include lastmod dates where applicable
- Set appropriate priority and changefreq

## Technical Specification

### Database Schema Changes

```prisma
model LegalDocument {
  id        String   @id // "kvkk" or "gizlilik"
  title     String
  content   String   @db.Text
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}

model BlogPost {
  id        Int      @id @default(autoincrement())
  title     String   @unique // Added unique constraint
  slug      String   @unique // New field
  content   String   @db.Text
  isActive  Boolean  @default(true)
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}
```

### Technology Stack

**Rich Text Editor**: Tiptap
- Modern, headless editor
- React integration
- Extensible with extensions
- Good paste handling
- Active maintenance

**Slug Generation**: Custom utility
- `title-to-slug` function
- Turkish character normalization
- Collision handling

**Sitemap**: Next.js dynamic route
- `app/sitemap.ts` route handler
- Generate XML programmatically

### File Structure

```
app/
  (main)/
    kvkk-aydinlatma-metni/
      page.tsx
    gizlilik-sozlesmesi/
      page.tsx
    blog/
      [slug]/           # Changed from [id]
        page.tsx
  (admin)/
    admin/
      (dashboard)/
        legal-documents/
          page.tsx
  sitemap.ts           # New

server/
  services/
    legal-document-service.ts
    blog-service.ts    # Updated
  actions/
    admin-legal-document-actions.ts
    admin-blog-actions.ts    # Updated

components/
  feature/
    admin-legal-document-editor.tsx
    admin-blog-editor.tsx    # New rich text editor
    rich-text-editor.tsx     # Reusable Tiptap component
    
lib/
  utils/
    slug.ts            # New
  validations/
    legal-document-validation.ts
    blog-validation.ts # Updated

prisma/
  migrations/
    YYYYMMDDHHMMSS_add_legal_documents_and_blog_slug/
```

## Implementation Plan

### Phase 1: Database & Schema
1. Update Prisma schema
2. Create migration
3. Run migration
4. Add slug generation for existing blog posts

### Phase 2: Rich Text Editor
1. Install Tiptap dependencies
2. Create reusable RichTextEditor component
3. Configure extensions (bold, italic, heading, etc.)
4. Add paste handling

### Phase 3: Legal Documents
1. Create service layer (CRUD operations)
2. Create admin UI with rich text editor
3. Create public pages
4. Update routes configuration
5. Add navigation links

### Phase 4: Blog Enhancements
1. Implement slug generation utility
2. Update blog service (slug handling, unique titles)
3. Update blog routing (slug-based URLs)
4. Integrate rich text editor into admin blog form
5. Create migration for existing blog posts
6. Update all blog links throughout site

### Phase 5: Sitemap
1. Create sitemap.ts route
2. Fetch all public URLs
3. Generate XML with proper structure
4. Test sitemap validation

### Phase 6: Testing
1. Test legal document CRUD
2. Test rich text editor functionality
3. Test blog slug generation and routing
4. Test sitemap generation
5. Test paste from Word/Markdown
6. Verify Turkish character handling
7. Mobile responsiveness testing

## Dependencies

```json
{
  "@tiptap/react": "^2.10.4",
  "@tiptap/starter-kit": "^2.10.4",
  "@tiptap/extension-underline": "^2.10.4",
  "@tiptap/extension-link": "^2.10.4",
  "@tiptap/extension-typography": "^2.10.4"
}
```

## Security Considerations

1. **XSS Prevention**
   - Sanitize HTML before rendering
   - Use DOMPurify or similar
   - Whitelist allowed HTML tags

2. **Admin Access**
   - Ensure proper authentication for legal doc management
   - Same auth middleware as existing admin routes

3. **Input Validation**
   - Validate slug format
   - Limit content length
   - Validate HTML structure

## SEO Considerations

1. **Legal Pages**
   - Proper meta tags (title, description)
   - Structured data (WebPage schema)
   - Turkish language tag

2. **Blog URLs**
   - SEO-friendly slugs
   - 301 redirects from old ID-based URLs (future consideration)
   - Canonical URLs
   - Update JSON-LD breadcrumbs

3. **Sitemap**
   - Submit to Google Search Console
   - Update robots.txt to reference sitemap
   - Set appropriate priorities

## Migration Strategy

### Existing Blog Posts
1. Generate slugs for all existing posts
2. Handle potential slug conflicts
3. Update all internal links
4. (Optional) Set up 301 redirects from old URLs

## Testing Checklist

- [ ] Legal document creation
- [ ] Legal document editing
- [ ] Legal document public pages
- [ ] Rich text editor basic formatting
- [ ] Paste from Word preserves formatting
- [ ] Paste from Markdown converts correctly
- [ ] Blog slug generation
- [ ] Blog unique title enforcement
- [ ] Blog slug-based routing
- [ ] Sitemap includes all pages
- [ ] Sitemap excludes admin pages
- [ ] Turkish character normalization
- [ ] Mobile responsiveness
- [ ] Error handling and validation

## Future Enhancements

- Image upload in rich text editor
- Blog post preview before publishing
- Revision history for legal documents
- Blog post categories and tags
- Search functionality for blog
- RSS feed generation

## References

- Tiptap Documentation: https://tiptap.dev/
- Next.js Sitemap: https://nextjs.org/docs/app/api-reference/file-conventions/metadata/sitemap
- Schema.org WebPage: https://schema.org/WebPage
