"use client";

import * as React from "react";
import {
  CartesianGrid,
  ComposedChart,
  Legend,
  Line,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import type { DailySourceMetric } from "@/types";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { StatsEmptyState } from "./stats-empty-state";

const GRID = "hsl(var(--border))";
const LINE_PALETTE = [
  "hsl(var(--primary))",
  "hsl(var(--chart-2))",
  "hsl(var(--chart-3))",
  "hsl(var(--chart-4))",
  "hsl(var(--chart-5))",
];

function safeKey(sourceKey: string): string {
  return sourceKey.replace(/[^a-zA-Z0-9]/g, "_");
}

type SourceComparisonChartProps = {
  dailyBySource: DailySourceMetric[];
  /** Normalized keys from URL; when empty, all sources in payload start selected. */
  initialSelectedKeys: string[];
};

export function SourceComparisonChart({
  dailyBySource,
  initialSelectedKeys,
}: SourceComparisonChartProps): React.JSX.Element {
  const allSources = React.useMemo(() => {
    const map = new Map<string, string>();
    for (const row of dailyBySource) {
      if (!map.has(row.sourceKey)) {
        map.set(row.sourceKey, row.sourceLabel);
      }
    }
    return [...map.entries()].sort((a, b) => a[1].localeCompare(b[1], "tr"));
  }, [dailyBySource]);

  const [selected, setSelected] = React.useState<Set<string>>(() => {
    if (initialSelectedKeys.length > 0) {
      return new Set(initialSelectedKeys);
    }
    return new Set(allSources.map(([k]) => k));
  });

  React.useEffect(() => {
    if (initialSelectedKeys.length > 0) {
      setSelected(new Set(initialSelectedKeys));
    } else {
      setSelected(new Set(allSources.map(([k]) => k)));
    }
  }, [initialSelectedKeys, allSources]);

  const chartData = React.useMemo(() => {
    const days = [...new Set(dailyBySource.map((d) => d.day))].sort();
    const selectedKeys = [...selected];
    return days.map((day) => {
      const point: Record<string, string | number> = { day };
      for (const sk of selectedKeys) {
        const row = dailyBySource.find((r) => r.day === day && r.sourceKey === sk);
        const skSafe = safeKey(sk);
        point[`v_${skSafe}`] = row?.visitors ?? 0;
        point[`l_${skSafe}`] = row?.leads ?? 0;
      }
      return point;
    });
  }, [dailyBySource, selected]);

  const lines = React.useMemo(() => {
    const out: { sk: string; label: string; type: "v" | "l"; color: string }[] = [];
    let c = 0;
    for (const sk of selected) {
      const label = allSources.find(([k]) => k === sk)?.[1] ?? sk;
      const color = LINE_PALETTE[c % LINE_PALETTE.length];
      c += 1;
      out.push({ sk, label: `${label} (ziyaret)`, type: "v", color });
      out.push({ sk, label: `${label} (başvuru)`, type: "l", color: `${color}cc` });
    }
    return out;
  }, [selected, allSources]);

  function toggle(key: string): void {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(key)) {
        next.delete(key);
      } else {
        next.add(key);
      }
      if (next.size === 0) {
        return prev;
      }
      return next;
    });
  }

  if (allSources.length === 0) {
    return (
      <Card className="min-w-0 overflow-hidden">
        <CardHeader>
          <CardTitle>Kaynak karşılaştırması</CardTitle>
          <CardDescription>Günlük ziyaret ve başvuru eğrileri</CardDescription>
        </CardHeader>
        <CardContent className="min-w-0">
          <StatsEmptyState />
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="min-w-0 overflow-hidden">
      <CardHeader>
        <CardTitle>Kaynak karşılaştırması</CardTitle>
        <CardDescription>Günlük ziyaret ve başvuru eğrileri</CardDescription>
      </CardHeader>
      <CardContent className="flex min-w-0 flex-col gap-4">
        <fieldset className="flex min-w-0 flex-wrap gap-3 text-sm">
          <legend className="text-muted-foreground mb-2 w-full font-medium">
            Kaynaklar
          </legend>
          {allSources.map(([key, label]) => (
            <label
              key={key}
              className="border-border flex cursor-pointer items-center gap-2 rounded-md border px-2 py-1"
            >
              <input
                type="checkbox"
                className="size-3.5 accent-primary"
                checked={selected.has(key)}
                onChange={() => {
                  toggle(key);
                }}
              />
              <span>{label}</span>
            </label>
          ))}
        </fieldset>

        <div className="h-[380px] w-full min-w-0 overflow-x-auto">
          {chartData.length === 0 || selected.size === 0 ? (
            <StatsEmptyState className="min-h-[340px]" />
          ) : (
            <div className="h-full min-w-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart data={chartData} margin={{ top: 8, right: 16, left: 0, bottom: 8 }}>
                <CartesianGrid stroke={GRID} strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="day" tick={{ fontSize: 10 }} />
                <YAxis allowDecimals={false} tick={{ fontSize: 11 }} />
                <Tooltip
                  contentStyle={{
                    borderRadius: 8,
                    border: "1px solid hsl(var(--border))",
                    background: "hsl(var(--popover))",
                  }}
                />
                <Legend />
                {lines.map((ln) => (
                  <Line
                    key={`${ln.sk}-${ln.type}`}
                    type="monotone"
                    dataKey={`${ln.type}_${safeKey(ln.sk)}`}
                    name={ln.label}
                    stroke={ln.color}
                    strokeWidth={2}
                    dot={false}
                    connectNulls
                  />
                ))}
              </ComposedChart>
            </ResponsiveContainer>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
