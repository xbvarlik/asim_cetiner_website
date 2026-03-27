# UI Contract: Areas of work & contact form (012)

**Feature**: `012-calm-areas-contact-ui`  
**Audience**: Implementers and QA  
**Date**: 2026-03-27

## Areas of work section

1. **Background**: A photographic (or illustration) background is visible behind the tag cluster, not plain `bg-muted` alone for that region.
2. **Hero distinction**: The primary background image MUST NOT be the same file as the main hero image on the same page (`/images/hero-therapy-calm.jpg` today).
3. **Readability**: Section title, subtitle, and every tag label MUST remain readable at mobile and desktop widths; chips or overlay MUST compensate for busy imagery.
4. **Layout**: Tags remain a wrapping flex row; long labels MUST not clip.
5. **Loading**: Foreground content (title, tags) MUST remain structurally present while the image loads; background may appear progressively.

## Contact form section

1. **Scope**: Styling changes apply to the shared marketing **ContactForm** component only (home, iletişim, landing variants), not a blanket change to all `Input` instances site-wide unless explicitly extended later.
2. **Field identity**: All `name` attributes, labels, placeholders, required flags, and error message association (`htmlFor` / `id` / `aria-invalid`) MUST match pre-change behavior.
3. **Submission**: Successful submit still shows the same success message and resets the form; server validation errors still render per field.
4. **Targets**: Text inputs, textarea, and office select trigger MUST be visibly taller than the pre-change baseline and comfortable for touch (see spec SC-003).
5. **Focus**: Keyboard focus indicators MUST remain clearly visible on all interactive controls.

## Non-goals

- New fields, analytics events, or email/CRM integration changes.
- Animation of the areas background or tags beyond existing `RevealSection` behavior.
