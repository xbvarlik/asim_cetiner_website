import type { AdminStatsBundle } from "@/types";

import { StatsDateRangePicker } from "./stats-date-range-picker";
import { LeadStatsChart } from "./lead-stats-chart";
import { VisitorStatsChart } from "./visitor-stats-chart";
import { ConversionTable } from "./conversion-table";
import { SourceComparisonChart } from "./source-comparison-chart";

export type StatsDashboardProps = {
  from: string;
  to: string;
  sourcesQuery?: string;
  initialSourceKeys: string[];
  bundle: AdminStatsBundle;
};

export function StatsDashboard({
  from,
  to,
  sourcesQuery,
  initialSourceKeys,
  bundle,
}: StatsDashboardProps): React.JSX.Element {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-xl font-semibold">İstatistikler</h1>
          <p className="text-muted-foreground text-sm">
            Başvuru ve ziyaret metrikleri (İstanbul takvim günü)
          </p>
        </div>
        <StatsDateRangePicker from={from} to={to} sourcesQuery={sourcesQuery} />
      </div>

      <LeadStatsChart
        leadsBySource={bundle.leadsBySource}
        leadsByOffice={bundle.leadsByOffice}
      />

      <div className="grid gap-4 xl:grid-cols-2">
        <VisitorStatsChart visitorsBySource={bundle.visitorsBySource} />
        <ConversionTable rows={bundle.conversion} />
      </div>

      <SourceComparisonChart
        dailyBySource={bundle.dailyBySource}
        initialSelectedKeys={initialSourceKeys}
      />
    </div>
  );
}
