import type { Metadata } from "next";
import * as officeService from "@/server/services/office-service";
import { officeListQuerySchema } from "@/lib/validations/admin-list-query-validation";
import {
  AdminOfficeTable,
  type OfficeRowDto,
} from "@/components/feature/admin-office-table";

export const metadata: Metadata = {
  title: "Ofis yönetimi",
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

export default async function AdminOfficesPage({
  searchParams,
}: PageProps): Promise<React.JSX.Element> {
  const sp = await searchParams;
  const parsed = officeListQuerySchema.safeParse({
    page: firstParam(sp.page),
    pageSize: firstParam(sp.pageSize),
    sortDir: firstParam(sp.sortDir),
  });
  const query = parsed.success
    ? parsed.data
    : officeListQuerySchema.parse({});

  const result = await officeService.listForAdmin({
    page: query.page,
    pageSize: query.pageSize,
    sortDir: query.sortDir,
  });

  if (!result.success) {
    return (
      <p className="text-destructive text-sm">{result.error}</p>
    );
  }

  const rows: OfficeRowDto[] = result.data.data.map((o) => ({
    id: o.id,
    name: o.name,
    address: o.address,
    mapsLink: o.mapsLink,
  }));

  return (
    <div className="space-y-4">
      <h1 className="text-xl font-semibold">Ofis yönetimi</h1>
      <AdminOfficeTable
        rows={rows}
        pagination={result.data.pagination}
        query={query}
      />
    </div>
  );
}
