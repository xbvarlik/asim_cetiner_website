import { z } from "zod";

import { ROUTES } from "@/lib/routes";
import {
  KNOWS_ABOUT_WIKIDATA_IRIS,
  MANDATORY_DISCLAIMER,
  PLACEHOLDER_ACADEMIA_URL,
  PLACEHOLDER_RESEARCHGATE_URL,
  PRACTICE_BUSINESS_NAME,
  PRACTICE_JOB_TITLE,
  PRACTITIONER_FULL_NAME,
} from "@/lib/seo/constants";
import { AUTHORITY_JSONLD_SNIPPET } from "@/lib/seo/practice-copy";
import { getSiteOrigin } from "@/lib/seo/site-origin";
import {
  SITE_EMAIL,
  SITE_INSTAGRAM_URL,
  SITE_OFFICE_ADDRESS_SINGLE_LINE,
  SITE_PHONE_DISPLAY,
} from "@/lib/site-contact";

const jsonLdEnvelopeSchema = z.object({
  "@context": z.string(),
  "@graph": z.array(z.unknown()),
});

function buildDescriptions(): { business: string; person: string } {
  const base = `${MANDATORY_DISCLAIMER} ${AUTHORITY_JSONLD_SNIPPET}`;
  return {
    business: `${PRACTICE_BUSINESS_NAME}. ${base}`,
    person: `${PRACTITIONER_FULL_NAME}, ${PRACTICE_JOB_TITLE}. ${base}`,
  };
}

/**
 * Builds Schema.org JSON-LD with LocalBusiness + nested Person (employee).
 * Validates envelope shape with Zod before consumers stringify.
 */
export function buildPracticeJsonLd(): Record<string, unknown> {
  const origin = getSiteOrigin();
  const { business, person } = buildDescriptions();

  const businessId = `${origin}/#practice`;
  const personId = `${origin}/#psychologist`;

  const graph: Record<string, unknown> = {
    "@type": "LocalBusiness",
    "@id": businessId,
    name: PRACTICE_BUSINESS_NAME,
    description: business,
    url: `${origin}${ROUTES.home}`,
    telephone: SITE_PHONE_DISPLAY,
    email: SITE_EMAIL,
    address: {
      "@type": "PostalAddress",
      streetAddress: SITE_OFFICE_ADDRESS_SINGLE_LINE,
      addressLocality: "Kadıköy",
      addressRegion: "İstanbul",
      postalCode: "34732",
      addressCountry: "TR",
    },
    knowsAbout: [...KNOWS_ABOUT_WIKIDATA_IRIS],
    sameAs: [
      SITE_INSTAGRAM_URL,
      PLACEHOLDER_ACADEMIA_URL,
      PLACEHOLDER_RESEARCHGATE_URL,
    ],
    employee: {
      "@type": "Person",
      "@id": personId,
      name: PRACTITIONER_FULL_NAME,
      jobTitle: PRACTICE_JOB_TITLE,
      description: person,
      knowsAbout: [...KNOWS_ABOUT_WIKIDATA_IRIS],
      sameAs: [
        SITE_INSTAGRAM_URL,
        PLACEHOLDER_ACADEMIA_URL,
        PLACEHOLDER_RESEARCHGATE_URL,
      ],
    },
  };

  const payload = {
    "@context": "https://schema.org",
    "@graph": [graph],
  };

  jsonLdEnvelopeSchema.parse(payload);
  return payload;
}
