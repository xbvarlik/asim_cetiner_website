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
    <div className="min-w-0 space-y-6">
      <div className="flex min-w-0 flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="min-w-0">
          <h1 className="text-xl font-semibold">İstatistikler</h1>
          <p className="text-muted-foreground text-sm">
            Başvuru ve ziyaret metrikleri (İstanbul takvim günü)
          </p>
        </div>
        <div className="w-full min-w-0 sm:w-auto sm:max-w-full">
          <StatsDateRangePicker from={from} to={to} sourcesQuery={sourcesQuery} />
        </div>
      </div>

      <LeadStatsChart
        leadsBySource={bundle.leadsBySource}
        leadsByOffice={bundle.leadsByOffice}
      />

      <div className="grid min-w-0 gap-4 xl:grid-cols-2">
        <div className="min-w-0 xl:min-w-0">
          <VisitorStatsChart visitorsBySource={bundle.visitorsBySource} />
        </div>
        <div className="min-w-0 xl:min-w-0">
          <ConversionTable rows={bundle.conversion} />
        </div>
      </div>

      <SourceComparisonChart
        dailyBySource={bundle.dailyBySource}
        initialSelectedKeys={initialSourceKeys}
      />
    </div>
  );
}
