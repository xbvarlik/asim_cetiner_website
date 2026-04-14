/**
 * Canonical absolute origin for JSON-LD and llms.txt links.
 * See specs/022-aeo-llms-jsonld/research.md.
 */
export function getSiteOrigin(): string {
  const raw = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (raw && raw.length > 0) {
    return raw.replace(/\/+$/, "");
  }
  return "http://localhost:3000";
}
