import type { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import * as leadService from "@/server/services/lead-service";
import { leadListQuerySchema } from "@/lib/validations/admin-list-query-validation";
import { AdminLeadsTable } from "@/components/feature/admin-leads-table";
import type { LeadAdminRowDto } from "@/components/feature/admin-leads-table";

export const metadata: Metadata = {
  title: "Danışan yönetimi",
  robots: { index: false, follow: false },
};

function firstParam(
  v: string | string[] | undefined
): string | undefined {
  if (Array.isArray(v)) {
    return v[0];
  }
  return v;
}

type PageProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export default async function AdminLeadsPage({
  searchParams,
}: PageProps): Promise<React.JSX.Element> {
  const sp = await searchParams;
  const parsed = leadListQuerySchema.safeParse({
    page: firstParam(sp.page),
    pageSize: firstParam(sp.pageSize),
    sortBy: firstParam(sp.sortBy),
    sortDir: firstParam(sp.sortDir),
    statusId: firstParam(sp.statusId),
    officeId: firstParam(sp.officeId),
  });
  const query = parsed.success
    ? parsed.data
    : leadListQuerySchema.parse({});

  const [listResult, statuses, offices] = await Promise.all([
    leadService.listForAdmin({
      page: query.page,
      pageSize: query.pageSize,
      sortBy: query.sortBy,
      sortDir: query.sortDir,
      statusId: query.statusId,
      officeId: query.officeId,
    }),
    prisma.status.findMany({ orderBy: { name: "asc" } }),
    prisma.office.findMany({ orderBy: { name: "asc" } }),
  ]);

  if (!listResult.success) {
    return (
      <p className="text-destructive text-sm">{listResult.error}</p>
    );
  }

  const rows: LeadAdminRowDto[] = listResult.data.data.map((row) => ({
    id: row.id,
    name: row.name,
    email: row.email,
    phoneNumber: row.phoneNumber,
    createdAt: row.createdAt.toISOString(),
    updatedAt: row.updatedAt.toISOString(),
    office: row.office,
    status: row.status,
  }));

  return (
    <div className="space-y-4">
      <h1 className="text-xl font-semibold">Danışan yönetimi</h1>
      <AdminLeadsTable
        rows={rows}
        pagination={listResult.data.pagination}
        query={query}
        statuses={statuses}
        offices={offices}
      />
    </div>
  );
}
