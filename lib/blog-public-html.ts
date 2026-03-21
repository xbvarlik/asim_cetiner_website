/**
 * Server-side helpers for trusted admin HTML on public blog pages.
 * Not a full sanitizer — blocks common XSS vectors per feature research (R5).
 */

export function stripUnsafeBlogHtml(html: string): string {
  let s = html;
  s = s.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, "");
  s = s.replace(/<script\b[^>]*>/gi, "");
  s = s.replace(/\s+on\w+\s*=\s*("[^"]*"|'[^']*'|[^\s>]+)/gi, "");
  return s;
}

/** Plain text for previews and metadata (strip tags after script removal). */
export function htmlToPlainText(html: string): string {
  const withoutScripts = stripUnsafeBlogHtml(html);
  return withoutScripts
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

export function formatBlogPostDate(date: Date): string {
  return new Intl.DateTimeFormat("tr-TR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(date);
}
