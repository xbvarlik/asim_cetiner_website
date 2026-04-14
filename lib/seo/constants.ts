/**
 * AEO / JSON-LD shared constants. Sync disclaimer wording with specs/022-aeo-llms-jsonld/spec.md FR-003.
 */

/** Verbatim mandatory scope disclaimer (Turkish). */
export const MANDATORY_DISCLAIMER =
  "Verilen hizmetler danışmanlık kapsamındadır, psikiyatrik müdahale bulunmamaktadır." as const;

/** Wikidata entity IRIs for knowsAbout (see specs/022-aeo-llms-jsonld/research.md). */
export const KNOWS_ABOUT_WIKIDATA_IRIS = [
  "https://www.wikidata.org/entity/Q1147152",
  "https://www.wikidata.org/entity/Q172195",
] as const;

export const PRACTICE_JOB_TITLE = "Uzman Psikolog" as const;

export const PRACTITIONER_FULL_NAME = "Asım Çetiner" as const;

/** Public display name for LocalBusiness (aligned with app/layout metadata). */
export const PRACTICE_BUSINESS_NAME =
  "Klinik Psikolog İstanbul - Asım Çetiner | Kadıköy Psikolojik Danışmanlık" as const;

/** Placeholder tokens for deferred academic profiles (replace in code when URLs exist). */
export const PLACEHOLDER_ACADEMIA_URL = "PLACEHOLDER_ACADEMIA_URL" as const;

export const PLACEHOLDER_RESEARCHGATE_URL = "PLACEHOLDER_RESEARCHGATE_URL" as const;
