import type { JSX } from "react";

import { buildPracticeJsonLd } from "@/lib/seo/practice-structured-data";

/**
 * Emits Schema.org JSON-LD for LocalBusiness + Person on all SiteShell routes.
 * JSON is server-generated only; stringify is safe for embedding.
 */
export function PracticeJsonLd(): JSX.Element {
  const jsonLd = buildPracticeJsonLd();
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
