"use client";

import * as React from "react";
import { DayPicker, type DayPickerProps } from "react-day-picker";
import { tr } from "date-fns/locale";

import { cn } from "@/lib/utils";

import "react-day-picker/style.css";

export type CalendarProps = DayPickerProps;

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  ...props
}: CalendarProps) {
  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      locale={tr}
      className={cn("p-2", className)}
      classNames={{
        root: "w-fit",
        months: "flex flex-col gap-4 sm:flex-row",
        month: "flex flex-col gap-2",
        month_caption: "flex items-center justify-center gap-1 px-1 py-1 text-sm font-medium",
        nav: "flex items-center gap-1",
        button_previous:
          "inline-flex size-8 items-center justify-center rounded-md border border-border bg-background hover:bg-muted",
        button_next:
          "inline-flex size-8 items-center justify-center rounded-md border border-border bg-background hover:bg-muted",
        month_grid: "w-full border-collapse",
        weekdays: "flex",
        weekday:
          "text-muted-foreground w-9 text-center text-[0.7rem] font-normal",
        week: "flex w-full",
        day: "relative p-0 text-center text-sm",
        day_button:
          "inline-flex size-9 items-center justify-center rounded-md hover:bg-muted focus-visible:ring-2 focus-visible:ring-ring aria-selected:bg-primary aria-selected:text-primary-foreground",
        selected:
          "bg-primary text-primary-foreground [&_button]:bg-primary [&_button]:text-primary-foreground",
        today: "font-semibold",
        outside: "text-muted-foreground/50",
        disabled: "pointer-events-none opacity-40",
        range_start: "rounded-l-md",
        range_end: "rounded-r-md",
        range_middle: "rounded-none bg-muted [&_button]:rounded-none",
        ...classNames,
      }}
      {...props}
    />
  );
}

export { Calendar };
