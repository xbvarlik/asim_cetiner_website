import { subDays, format } from "date-fns";
import { toZonedTime } from "date-fns-tz";
import { z } from "zod";

const ymd = z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Geçerli tarih YYYY-MM-DD olmalı");

export const statsRangeQuerySchema = z
  .object({
    from: ymd,
    to: ymd,
    sources: z.string().optional(),
  })
  .refine((v) => v.from <= v.to, {
    message: "Başlangıç tarihi bitişten sonra olamaz",
    path: ["from"],
  })
  .refine(
    (v) => {
      const a = new Date(`${v.from}T00:00:00Z`).getTime();
      const b = new Date(`${v.to}T00:00:00Z`).getTime();
      const days = (b - a) / (86400 * 1000);
      return days <= 366;
    },
    { message: "En fazla 366 günlük aralık seçilebilir", path: ["to"] }
  );

export type StatsRangeQuery = z.infer<typeof statsRangeQuerySchema>;

const istanbul = "Europe/Istanbul";

/** Default last 30 calendar days in Istanbul (inclusive). */
export function getDefaultStatsRangeStrings(): { from: string; to: string } {
  const nowIst = toZonedTime(new Date(), istanbul);
  const to = format(nowIst, "yyyy-MM-dd");
  const from = format(subDays(nowIst, 29), "yyyy-MM-dd");
  return { from, to };
}

/** Parse optional `sources=a,b,c` into normalized keys (trim, lowercase). */
export function parseSourcesParam(sources: string | undefined): string[] {
  if (sources == null || sources.trim() === "") {
    return [];
  }
  return sources
    .split(",")
    .map((x) => x.trim().toLowerCase())
    .filter((x) => x.length > 0);
}
