# Contract: `GET /llms.txt`

## Response

| Aspect | Requirement |
|--------|-------------|
| Status | `200` in production for the deployed site |
| Path | `/llms.txt` (static file under `public/llms.txt`) |
| Body format | Markdown-oriented plain text: `#` H1 title, summary paragraphs, section list with links |

## Required content elements

1. **H1**: Practice name (aligned with site metadata, compliant terminology).
2. **Summary**: Brief informative text using **danışmanlık** framing; mention academic background using **only** institutions/programs from approved copy (`docs/info.md`); include verbatim disclaimer:

   `Verilen hizmetler danışmanlık kapsamındadır, psikiyatrik müdahale bulunmamaktadır.`

3. **Sections list** (labels may be Turkish): pointers to **About**, **Çalışma Alanları** (services concept), **Contact** — paths MUST come from `ROUTES` in `lib/routes.ts` (no hardcoded path strings).

## Prohibited (new strings in this file)

- Substrings: `Terapi`, `Psikoterapi`, `Hekim`, `Doktor`, `Physician`
- Superlative marketing: e.g. `en iyi`, `rakipsiz`

## Example shape (non-normative)

```markdown
# [Practice name]

[Summary + disclaimer sentence]

## Site sections

- Hakkımda: https://…/hakkimda
- Çalışma alanları: https://…/hizmetler
- İletişim: https://…/iletisim
```

Absolute URLs use `NEXT_PUBLIC_SITE_URL` + `ROUTES` path segments.
