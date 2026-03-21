import type { Metadata } from "next";
import * as blogService from "@/server/services/blog-service";
import { blogListQuerySchema } from "@/lib/validations/admin-list-query-validation";
import {
  AdminBlogTable,
  type BlogRowDto,
} from "@/components/feature/admin-blog-table";

export const metadata: Metadata = {
  title: "Blog yönetimi",
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

export default async function AdminBlogPage({
  searchParams,
}: PageProps): Promise<React.JSX.Element> {
  const sp = await searchParams;
  const parsed = blogListQuerySchema.safeParse({
    page: firstParam(sp.page),
    pageSize: firstParam(sp.pageSize),
    sortBy: firstParam(sp.sortBy),
    sortDir: firstParam(sp.sortDir),
  });
  const query = parsed.success
    ? parsed.data
    : blogListQuerySchema.parse({});

  const result = await blogService.listForAdmin({
    page: query.page,
    pageSize: query.pageSize,
    sortBy: query.sortBy,
    sortDir: query.sortDir,
  });

  if (!result.success) {
    return (
      <p className="text-destructive text-sm">{result.error}</p>
    );
  }

  const rows: BlogRowDto[] = result.data.data.map((p) => ({
    id: p.id,
    title: p.title,
    content: p.content,
    isActive: p.isActive,
    createdAt: p.createdAt.toISOString(),
    updatedAt: p.updatedAt.toISOString(),
  }));

  return (
    <div className="space-y-4">
      <h1 className="text-xl font-semibold">Blog yönetimi</h1>
      <AdminBlogTable
        rows={rows}
        pagination={result.data.pagination}
        query={query}
      />
    </div>
  );
}
