import { fromZonedTime } from "date-fns-tz";

const TZ = "Europe/Istanbul";

/**
 * Inclusive Istanbul calendar dates → UTC `Date` bounds for Prisma `createdAt` filters.
 */
export function istanbulRangeToUtcBounds(
  fromYmd: string,
  toYmd: string
): { startUtc: Date; endUtc: Date } {
  const startUtc = fromZonedTime(`${fromYmd}T00:00:00.000`, TZ);
  const endUtc = fromZonedTime(`${toYmd}T23:59:59.999`, TZ);
  return { startUtc, endUtc };
}
