"use client";

import { useEffect, useRef } from "react";
import { usePathname, useSearchParams } from "next/navigation";

import {
  persistAttributionSource,
  readTrafficLoggedFlag,
  setTrafficLoggedFlag,
} from "@/lib/attribution-storage";
import { logTrafficAction } from "@/server/actions/traffic-actions";

function trimUtm(value: string | null): string | undefined {
  const t = value?.trim().slice(0, 128);
  return t && t.length > 0 ? t : undefined;
}

export function TrafficTracker(): React.JSX.Element {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const logAttemptedRef = useRef(false);

  useEffect(() => {
    const sourceParam = trimUtm(searchParams.get("utm_source"));
    const medium = trimUtm(searchParams.get("utm_medium"));
    const campaign = trimUtm(searchParams.get("utm_campaign"));

    if (sourceParam) {
      persistAttributionSource(sourceParam);
    }

    if (!sourceParam) {
      return;
    }

    if (readTrafficLoggedFlag()) {
      return;
    }

    if (logAttemptedRef.current) {
      return;
    }
    logAttemptedRef.current = true;

    void (async () => {
      const res = await logTrafficAction({
        source: sourceParam,
        path: pathname,
        utmMedium: medium,
        utmCampaign: campaign,
      });
      if (res.success) {
        setTrafficLoggedFlag();
      } else {
        logAttemptedRef.current = false;
      }
    })();
  }, [pathname, searchParams]);

  return <span className="sr-only" aria-hidden="true" />;
}
