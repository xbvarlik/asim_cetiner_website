import type { ConversionStatRow } from "@/types";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { StatsEmptyState } from "./stats-empty-state";

type ConversionTableProps = {
  rows: ConversionStatRow[];
};

function formatPercent(p: number | null): string {
  if (p === null) {
    return "—";
  }
  return `${p.toFixed(1)}%`;
}

export function ConversionTable({ rows }: ConversionTableProps): React.JSX.Element {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Dönüşüm özeti</CardTitle>
        <CardDescription>Kaynak bazlı ziyaret ve başvuru</CardDescription>
      </CardHeader>
      <CardContent>
        {rows.length === 0 ? (
          <StatsEmptyState />
        ) : (
          <div className="overflow-x-auto rounded-lg border border-border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Kaynak</TableHead>
                  <TableHead className="text-right">Ziyaret</TableHead>
                  <TableHead className="text-right">Başvuru</TableHead>
                  <TableHead className="text-right">Dönüşüm %</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {rows.map((r) => (
                  <TableRow key={r.sourceKey}>
                    <TableCell className="font-medium">{r.sourceLabel}</TableCell>
                    <TableCell className="text-right tabular-nums">{r.visitors}</TableCell>
                    <TableCell className="text-right tabular-nums">{r.leads}</TableCell>
                    <TableCell className="text-right tabular-nums">
                      {formatPercent(r.conversionPercent)}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
