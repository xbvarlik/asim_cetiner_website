import { NextResponse } from "next/server";

import { ROUTES } from "@/lib/routes";
import {
  MANDATORY_DISCLAIMER,
  PRACTICE_BUSINESS_NAME,
} from "@/lib/seo/constants";
import { buildLlmsIntroSummary } from "@/lib/seo/practice-copy";
import { getSiteOrigin } from "@/lib/seo/site-origin";

export function GET(): NextResponse {
  const origin = getSiteOrigin();
  const body = `# ${PRACTICE_BUSINESS_NAME}

${buildLlmsIntroSummary()}

${MANDATORY_DISCLAIMER}

## Site sections

- Hakkımda: ${origin}${ROUTES.about}
- Çalışma alanları (hizmetler): ${origin}${ROUTES.services}
- İletişim: ${origin}${ROUTES.contact}
`;

  return new NextResponse(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  });
}
