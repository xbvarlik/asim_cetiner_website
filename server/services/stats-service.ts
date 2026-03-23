import { Prisma } from "@/lib/generated/prisma/client";
import { prisma } from "@/lib/prisma";
import type {
  AdminStatsBundle,
  ConversionStatRow,
  DailySourceMetric,
  LeadByOfficeStat,
  LeadBySourceStat,
  ServiceResult,
  VisitorBySourceStat,
} from "@/types";

export type StatsDateRangeUtc = {
  startUtc: Date;
  endUtc: Date;
};

type RawKeyCount = { key: string; label: string; cnt: number };
type RawDaily = {
  day: string;
  sourceKey: string;
  sourceLabel: string;
  cnt: number;
};

export async function getLeadsBySourceInRange(
  range: StatsDateRangeUtc
): Promise<ServiceResult<LeadBySourceStat[]>> {
  try {
    const rows = await prisma.$queryRaw<RawKeyCount[]>(Prisma.sql`
      SELECT
        CASE
          WHEN l."utmSource" IS NULL OR trim(l."utmSource") = '' THEN '__unattributed__'
          ELSE lower(trim(l."utmSource"))
        END AS key,
        max(
          CASE
            WHEN l."utmSource" IS NULL OR trim(l."utmSource") = '' THEN 'Belirtilmedi'
            ELSE trim(l."utmSource")
          END
        ) AS label,
        COUNT(*)::int AS cnt
      FROM "Lead" l
      WHERE l."deletedAt" IS NULL
        AND l."createdAt" >= ${range.startUtc}
        AND l."createdAt" <= ${range.endUtc}
      GROUP BY 1
      ORDER BY cnt DESC
    `);
    return {
      success: true,
      data: rows.map((r) => ({
        sourceKey: r.key,
        sourceLabel: r.label,
        count: r.cnt,
      })),
    };
  } catch {
    return { success: false, error: "An unexpected error occurred" };
  }
}

export async function getLeadsByOfficeInRange(
  range: StatsDateRangeUtc
): Promise<ServiceResult<LeadByOfficeStat[]>> {
  try {
    const grouped = await prisma.lead.groupBy({
      by: ["officeId"],
      where: {
        deletedAt: null,
        createdAt: { gte: range.startUtc, lte: range.endUtc },
      },
      _count: { _all: true },
    });
    const officeIds = grouped.map((g) => g.officeId);
    if (officeIds.length === 0) {
      return { success: true, data: [] };
    }
    const offices = await prisma.office.findMany({
      where: { id: { in: officeIds } },
      select: { id: true, name: true },
    });
    const nameById = new Map(offices.map((o) => [o.id, o.name]));
    const data: LeadByOfficeStat[] = grouped
      .map((g) => ({
        officeId: g.officeId,
        officeName: nameById.get(g.officeId) ?? `#${g.officeId}`,
        count: g._count._all,
      }))
      .sort((a, b) => b.count - a.count);
    return { success: true, data };
  } catch {
    return { success: false, error: "An unexpected error occurred" };
  }
}

export async function getVisitorsBySourceInRange(
  range: StatsDateRangeUtc
): Promise<ServiceResult<VisitorBySourceStat[]>> {
  try {
    const rows = await prisma.$queryRaw<RawKeyCount[]>(Prisma.sql`
      SELECT
        lower(trim(t."source")) AS key,
        max(trim(t."source")) AS label,
        COUNT(*)::int AS cnt
      FROM "TrafficLog" t
      WHERE t."createdAt" >= ${range.startUtc}
        AND t."createdAt" <= ${range.endUtc}
      GROUP BY 1
      ORDER BY cnt DESC
    `);
    return {
      success: true,
      data: rows.map((r) => ({
        sourceKey: r.key,
        sourceLabel: r.label,
        count: r.cnt,
      })),
    };
  } catch {
    return { success: false, error: "An unexpected error occurred" };
  }
}

function buildConversionRows(
  leads: LeadBySourceStat[],
  visitors: VisitorBySourceStat[]
): ConversionStatRow[] {
  const vMap = new Map(visitors.map((v) => [v.sourceKey, v]));
  const lMap = new Map(leads.map((l) => [l.sourceKey, l]));
  const keys = new Set([...vMap.keys(), ...lMap.keys()]);
  const rows: ConversionStatRow[] = [];
  for (const key of keys) {
    const vis = vMap.get(key)?.count ?? 0;
    const ld = lMap.get(key)?.count ?? 0;
    const label =
      vMap.get(key)?.sourceLabel ??
      lMap.get(key)?.sourceLabel ??
      key;
    rows.push({
      sourceKey: key,
      sourceLabel: label,
      visitors: vis,
      leads: ld,
      conversionPercent: vis === 0 ? null : (ld / vis) * 100,
    });
  }
  return rows.sort((a, b) => b.visitors + b.leads - (a.visitors + a.leads));
}

export async function getConversionTableInRange(
  range: StatsDateRangeUtc
): Promise<ServiceResult<ConversionStatRow[]>> {
  const [lr, vr] = await Promise.all([
    getLeadsBySourceInRange(range),
    getVisitorsBySourceInRange(range),
  ]);
  if (!lr.success) {
    return { success: false, error: lr.error };
  }
  if (!vr.success) {
    return { success: false, error: vr.error };
  }
  return {
    success: true,
    data: buildConversionRows(lr.data, vr.data),
  };
}

function mergeDailyVisitorsLeads(
  vRows: RawDaily[],
  lRows: RawDaily[]
): DailySourceMetric[] {
  const map = new Map<string, DailySourceMetric>();

  for (const r of vRows) {
    const k = `${r.day}|${r.sourceKey}`;
    map.set(k, {
      day: r.day,
      sourceKey: r.sourceKey,
      sourceLabel: r.sourceLabel,
      visitors: r.cnt,
      leads: 0,
    });
  }
  for (const r of lRows) {
    const k = `${r.day}|${r.sourceKey}`;
    const cur = map.get(k);
    if (cur) {
      cur.leads = r.cnt;
      if (cur.sourceLabel === r.sourceKey && r.sourceLabel !== r.sourceKey) {
        cur.sourceLabel = r.sourceLabel;
      }
    } else {
      map.set(k, {
        day: r.day,
        sourceKey: r.sourceKey,
        sourceLabel: r.sourceLabel,
        visitors: 0,
        leads: r.cnt,
      });
    }
  }

  return [...map.values()].sort((a, b) =>
    a.day === b.day ? a.sourceKey.localeCompare(b.sourceKey) : a.day.localeCompare(b.day)
  );
}

export async function getDailyMetricsBySourceInRange(
  range: StatsDateRangeUtc
): Promise<ServiceResult<DailySourceMetric[]>> {
  try {
    const [vRows, lRows] = await Promise.all([
      prisma.$queryRaw<RawDaily[]>(Prisma.sql`
        SELECT
          to_char((t."createdAt" AT TIME ZONE 'Europe/Istanbul')::date, 'YYYY-MM-DD') AS day,
          lower(trim(t."source")) AS "sourceKey",
          max(trim(t."source")) AS "sourceLabel",
          COUNT(*)::int AS cnt
        FROM "TrafficLog" t
        WHERE t."createdAt" >= ${range.startUtc}
          AND t."createdAt" <= ${range.endUtc}
        GROUP BY 1, 2
        ORDER BY 1, 2
      `),
      prisma.$queryRaw<RawDaily[]>(Prisma.sql`
        SELECT
          to_char((l."createdAt" AT TIME ZONE 'Europe/Istanbul')::date, 'YYYY-MM-DD') AS day,
          CASE
            WHEN l."utmSource" IS NULL OR trim(l."utmSource") = '' THEN '__unattributed__'
            ELSE lower(trim(l."utmSource"))
          END AS "sourceKey",
          max(
            CASE
              WHEN l."utmSource" IS NULL OR trim(l."utmSource") = '' THEN 'Belirtilmedi'
              ELSE trim(l."utmSource")
            END
          ) AS "sourceLabel",
          COUNT(*)::int AS cnt
        FROM "Lead" l
        WHERE l."deletedAt" IS NULL
          AND l."createdAt" >= ${range.startUtc}
          AND l."createdAt" <= ${range.endUtc}
        GROUP BY 1, 2
        ORDER BY 1, 2
      `),
    ]);
    return { success: true, data: mergeDailyVisitorsLeads(vRows, lRows) };
  } catch {
    return { success: false, error: "An unexpected error occurred" };
  }
}

export async function getAdminStatsBundle(
  range: StatsDateRangeUtc
): Promise<ServiceResult<AdminStatsBundle>> {
  const [ls, lo, vs, dy] = await Promise.all([
    getLeadsBySourceInRange(range),
    getLeadsByOfficeInRange(range),
    getVisitorsBySourceInRange(range),
    getDailyMetricsBySourceInRange(range),
  ]);

  if (!ls.success) {
    return { success: false, error: ls.error };
  }
  if (!lo.success) {
    return { success: false, error: lo.error };
  }
  if (!vs.success) {
    return { success: false, error: vs.error };
  }
  if (!dy.success) {
    return { success: false, error: dy.error };
  }

  return {
    success: true,
    data: {
      leadsBySource: ls.data,
      leadsByOffice: lo.data,
      visitorsBySource: vs.data,
      conversion: buildConversionRows(ls.data, vs.data),
      dailyBySource: dy.data,
    },
  };
}
