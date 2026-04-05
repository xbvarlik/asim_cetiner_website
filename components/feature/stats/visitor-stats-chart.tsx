"use client";

import { Cell, Legend, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";

import type { VisitorBySourceStat } from "@/types";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { StatsEmptyState } from "./stats-empty-state";

const SLICE_COLORS = [
  "hsl(var(--primary))",
  "hsl(var(--chart-2))",
  "hsl(var(--chart-3))",
  "hsl(var(--chart-4))",
  "hsl(var(--chart-5))",
  "hsl(var(--muted-foreground))",
];

type VisitorStatsChartProps = {
  visitorsBySource: VisitorBySourceStat[];
};

export function VisitorStatsChart({
  visitorsBySource,
}: VisitorStatsChartProps): React.JSX.Element {
  const data = visitorsBySource.map((v) => ({
    name: v.sourceLabel,
    value: v.count,
  }));

  return (
    <Card className="min-w-0 overflow-hidden">
      <CardHeader>
        <CardTitle>Kaynağa göre ziyaretler</CardTitle>
        <CardDescription>TrafficLog kayıtlarına göre dağılım</CardDescription>
      </CardHeader>
      <CardContent className="h-[360px] min-w-0 w-full p-2 sm:p-6">
        {data.length === 0 ? (
          <StatsEmptyState className="min-h-[320px]" />
        ) : (
          <div className="h-full w-full min-w-0 overflow-x-auto">
            <div className="mx-auto h-full min-w-[280px] max-w-full">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                innerRadius={56}
                outerRadius={100}
                paddingAngle={1}
                label={({ name, percent }) =>
                  `${name}: ${((percent ?? 0) * 100).toFixed(0)}%`
                }
              >
                {data.map((_, i) => (
                  <Cell key={i} fill={SLICE_COLORS[i % SLICE_COLORS.length]} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  borderRadius: 8,
                  border: "1px solid hsl(var(--border))",
                  background: "hsl(var(--popover))",
                }}
              />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
