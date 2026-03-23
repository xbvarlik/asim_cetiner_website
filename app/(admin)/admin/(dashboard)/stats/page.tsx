import type { Metadata } from "next";

import {
  getDefaultStatsRangeStrings,
  parseSourcesParam,
  statsRangeQuerySchema,
} from "@/lib/validations/stats-range-validation";
import { istanbulRangeToUtcBounds } from "@/lib/server/stats-date-bounds";
import { getAdminStatsBundle } from "@/server/services/stats-service";
import { StatsDashboard } from "@/components/feature/stats/stats-dashboard";

export const metadata: Metadata = {
  title: "İstatistikler",
  robots: { index: false, follow: false },
};

type PageProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export default async function AdminStatsPage({
  searchParams,
}: PageProps): Promise<React.JSX.Element> {
  const sp = await searchParams;
  const defaults = getDefaultStatsRangeStrings();
  const fromRaw = typeof sp.from === "string" ? sp.from : undefined;
  const toRaw = typeof sp.to === "string" ? sp.to : undefined;
  const sourcesRaw = typeof sp.sources === "string" ? sp.sources : undefined;

  const candidate = {
    from: fromRaw ?? defaults.from,
    to: toRaw ?? defaults.to,
    sources: sourcesRaw,
  };

  const parsed = statsRangeQuerySchema.safeParse(candidate);
  const range = parsed.success
    ? { from: parsed.data.from, to: parsed.data.to }
    : defaults;

  const bounds = istanbulRangeToUtcBounds(range.from, range.to);
  const initialSourceKeys = parseSourcesParam(sourcesRaw);

  const result = await getAdminStatsBundle(bounds);

  if (!result.success) {
    return (
      <div className="space-y-2">
        <h1 className="text-xl font-semibold">İstatistikler</h1>
        <p className="text-destructive text-sm">{result.error}</p>
      </div>
    );
  }

  return (
    <StatsDashboard
      from={range.from}
      to={range.to}
      sourcesQuery={sourcesRaw}
      initialSourceKeys={initialSourceKeys}
      bundle={result.data}
    />
  );
}
