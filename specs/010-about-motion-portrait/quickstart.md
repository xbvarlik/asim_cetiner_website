# Quickstart: Verify About Section (010-about-motion-portrait)

**Branch**: `010-about-motion-portrait`

## Prerequisites

- Node 20+, dependencies installed (`npm install`).
- Repo contains `public/images/kenan_kubuc_stok.jpg`.

## Run locally

```bash
npm run dev
```

Open the page that renders the **About** section (home or landing route used in this project).

## Manual checks

1. **Portrait**: The image area shows the photo from **`/images/kenan_kubuc_stok.jpg`** (not the previous therapist image).  
2. **Motion (default)**: Scroll until the About section enters view; animation feels **gentle**, not flashy. Any portrait-specific motion is **subtle**.  
3. **Reduced motion**: Enable “Reduce motion” in OS settings (or browser equivalent), reload, repeat — **no** inappropriate looping or strong movement.  
4. **Responsive**: Resize to narrow mobile width; portrait and text stack cleanly; no clipped face or unreadable lines.  
5. **Keyboard**: Tab through any interactive elements in the section; focus rings are visible.

## Lint

```bash
npm run lint
```

## Success criteria mapping (spec)

| Spec ID | How to verify |
|---------|----------------|
| SC-001 | Visual: correct portrait URL / image content. |
| SC-002 | Internal panel review (process, not automated). |
| SC-003 | OS reduced-motion + observation. |
| SC-004 | Check mobile / tablet / desktop breakpoints for overlap. |
