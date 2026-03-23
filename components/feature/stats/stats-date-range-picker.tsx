"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { format } from "date-fns";
import type { DateRange } from "react-day-picker";

import { ROUTES } from "@/lib/routes";
import { cn } from "@/lib/utils";
import { Button, buttonVariants } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

function parseYmdLocal(ymd: string): Date {
  const [y, m, d] = ymd.split("-").map(Number);
  return new Date(y, m - 1, d);
}

type StatsDateRangePickerProps = {
  from: string;
  to: string;
  /** Raw `sources` query value to preserve when updating the range. */
  sourcesQuery?: string;
};

export function StatsDateRangePicker({
  from,
  to,
  sourcesQuery,
}: StatsDateRangePickerProps): React.JSX.Element {
  const router = useRouter();
  const [open, setOpen] = React.useState(false);
  const [range, setRange] = React.useState<DateRange | undefined>(() => ({
    from: parseYmdLocal(from),
    to: parseYmdLocal(to),
  }));

  React.useEffect(() => {
    setRange({
      from: parseYmdLocal(from),
      to: parseYmdLocal(to),
    });
  }, [from, to]);

  const label =
    range?.from && range?.to
      ? `${format(range.from, "d MMM yyyy")} — ${format(range.to, "d MMM yyyy")}`
      : "Tarih aralığı seçin";

  function applyRange(): void {
    if (!range?.from || !range?.to) {
      return;
    }
    const a = range.from.getTime();
    const b = range.to.getTime();
    const [start, end] = a <= b ? [range.from, range.to] : [range.to, range.from];
    const params = new URLSearchParams();
    params.set("from", format(start, "yyyy-MM-dd"));
    params.set("to", format(end, "yyyy-MM-dd"));
    if (sourcesQuery != null && sourcesQuery.trim() !== "") {
      params.set("sources", sourcesQuery);
    }
    setOpen(false);
    router.push(`${ROUTES.admin.stats}?${params.toString()}`);
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger
        className={cn(
          buttonVariants({ variant: "outline" }),
          "min-w-[220px] justify-start font-normal"
        )}
      >
        {label}
      </PopoverTrigger>
      <PopoverContent className="flex w-auto flex-col gap-3" align="start">
        <Calendar
          mode="range"
          numberOfMonths={2}
          defaultMonth={range?.from}
          selected={range}
          onSelect={setRange}
        />
        <div className="flex justify-end gap-2 border-t border-border pt-2">
          <Button type="button" variant="ghost" size="sm" onClick={() => setOpen(false)}>
            İptal
          </Button>
          <Button
            type="button"
            size="sm"
            onClick={applyRange}
            disabled={!range?.from || !range?.to}
          >
            Uygula
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
}
