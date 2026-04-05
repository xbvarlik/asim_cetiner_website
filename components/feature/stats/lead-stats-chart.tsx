"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import type { LeadByOfficeStat, LeadBySourceStat } from "@/types";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { StatsEmptyState } from "./stats-empty-state";

const PRIMARY = "hsl(var(--primary))";
const GRID = "hsl(var(--border))";

type LeadStatsChartProps = {
  leadsBySource: LeadBySourceStat[];
  leadsByOffice: LeadByOfficeStat[];
};

export function LeadStatsChart({
  leadsBySource,
  leadsByOffice,
}: LeadStatsChartProps): React.JSX.Element {
  const sourceData = leadsBySource.map((s) => ({
    name: s.sourceLabel,
    count: s.count,
  }));
  const officeData = leadsByOffice.map((o) => ({
    name: o.officeName,
    count: o.count,
  }));

  return (
    <div className="grid min-w-0 gap-4 lg:grid-cols-2">
      <Card className="min-w-0 overflow-hidden">
        <CardHeader>
          <CardTitle>Kaynağa göre başvurular</CardTitle>
          <CardDescription>UTM / kaynak alanına göre dağılım</CardDescription>
        </CardHeader>
        <CardContent className="h-[320px] min-w-0 w-full p-2 sm:p-6">
          {sourceData.length === 0 ? (
            <StatsEmptyState className="min-h-[280px]" />
          ) : (
            <div className="h-full w-full min-w-0 overflow-x-auto">
              <div className="h-full min-w-[260px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={sourceData} margin={{ top: 8, right: 8, left: 0, bottom: 8 }}>
                <CartesianGrid stroke={GRID} strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="name" tick={{ fontSize: 11 }} interval={0} angle={-25} textAnchor="end" height={72} />
                <YAxis allowDecimals={false} tick={{ fontSize: 11 }} />
                <Tooltip
                  contentStyle={{
                    borderRadius: 8,
                    border: "1px solid hsl(var(--border))",
                    background: "hsl(var(--popover))",
                  }}
                />
                <Legend />
                <Bar dataKey="count" name="Başvuru" fill={PRIMARY} radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      <Card className="min-w-0 overflow-hidden">
        <CardHeader>
          <CardTitle>Ofise göre başvurular</CardTitle>
          <CardDescription>Seçilen aralıktaki ofis dağılımı</CardDescription>
        </CardHeader>
        <CardContent className="h-[320px] min-w-0 w-full p-2 sm:p-6">
          {officeData.length === 0 ? (
            <StatsEmptyState className="min-h-[280px]" />
          ) : (
            <div className="h-full w-full min-w-0 overflow-x-auto">
              <div className="h-full min-w-[260px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={officeData} margin={{ top: 8, right: 8, left: 0, bottom: 8 }}>
                <CartesianGrid stroke={GRID} strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="name" tick={{ fontSize: 11 }} interval={0} angle={-20} textAnchor="end" height={68} />
                <YAxis allowDecimals={false} tick={{ fontSize: 11 }} />
                <Tooltip
                  contentStyle={{
                    borderRadius: 8,
                    border: "1px solid hsl(var(--border))",
                    background: "hsl(var(--popover))",
                  }}
                />
                <Legend />
                <Bar dataKey="count" name="Başvuru" fill={PRIMARY} radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
