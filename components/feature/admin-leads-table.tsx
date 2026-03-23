"use client";

import { useState, useTransition } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  AdminPagination,
  AdminSortHeader,
} from "@/components/feature/admin-data-table";
import { AdminConfirmDialog } from "@/components/feature/admin-confirm-dialog";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  updateLeadStatusAction,
  deleteLeadAction,
} from "@/server/actions/admin-lead-actions";
import { ROUTES } from "@/lib/routes";
import type { LeadListQuery } from "@/lib/validations/admin-list-query-validation";

export type LeadAdminRowDto = {
  id: string;
  name: string;
  email: string;
  phoneNumber: string;
  utmSource: string | null;
  createdAt: string;
  updatedAt: string;
  office: { id: number; name: string };
  status: { id: number; name: string };
};

export function AdminLeadsTable({
  rows,
  pagination,
  query,
  statuses,
  offices,
}: {
  rows: LeadAdminRowDto[];
  pagination: { page: number; pageSize: number; total: number; totalPages: number };
  query: LeadListQuery;
  statuses: { id: number; name: string }[];
  offices: { id: number; name: string }[];
}): React.JSX.Element {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const q: Record<string, string | undefined> = {
    page: String(query.page),
    pageSize: String(query.pageSize),
    sortBy: query.sortBy,
    sortDir: query.sortDir,
    ...(query.statusId != null && { statusId: String(query.statusId) }),
    ...(query.officeId != null && { officeId: String(query.officeId) }),
  };

  function updateStatus(leadId: string, statusId: string): void {
    const fd = new FormData();
    fd.set("leadId", leadId);
    fd.set("statusId", statusId);
    startTransition(async () => {
      const result = await updateLeadStatusAction(undefined, fd);
      if (result.success) {
        toast.success(result.message ?? "Güncellendi");
        router.refresh();
      } else {
        toast.error(result.error);
      }
    });
  }

  function confirmDelete(): void {
    if (!deleteId) {
      return;
    }
    const id = deleteId;
    const fd = new FormData();
    fd.set("leadId", id);
    startTransition(async () => {
      const result = await deleteLeadAction(undefined, fd);
      if (result.success) {
        toast.success(result.message ?? "Silindi");
        setDeleteId(null);
        router.refresh();
      } else {
        toast.error(result.error);
      }
    });
  }

  return (
    <div>
      <form
        method="get"
        className="mb-4 flex flex-wrap items-end gap-3"
        action={ROUTES.admin.leads}
      >
        <input type="hidden" name="page" value="1" />
        <input type="hidden" name="pageSize" value={String(query.pageSize)} />
        <input type="hidden" name="sortBy" value={query.sortBy} />
        <input type="hidden" name="sortDir" value={query.sortDir} />
        <div className="flex flex-col gap-1">
          <label className="text-muted-foreground text-xs" htmlFor="statusId">
            Durum
          </label>
          <select
            id="statusId"
            name="statusId"
            defaultValue={query.statusId ?? ""}
            className="border-input bg-background h-9 rounded-md border px-2 text-sm"
          >
            <option value="">Tümü</option>
            {statuses.map((s) => (
              <option key={s.id} value={s.id}>
                {s.name}
              </option>
            ))}
          </select>
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-muted-foreground text-xs" htmlFor="officeId">
            Ofis
          </label>
          <select
            id="officeId"
            name="officeId"
            defaultValue={query.officeId ?? ""}
            className="border-input bg-background h-9 rounded-md border px-2 text-sm"
          >
            <option value="">Tümü</option>
            {offices.map((o) => (
              <option key={o.id} value={o.id}>
                {o.name}
              </option>
            ))}
          </select>
        </div>
        <Button type="submit" size="sm" variant="secondary">
          Filtrele
        </Button>
        <Link
          href={ROUTES.admin.leads}
          className={cn(buttonVariants({ variant: "outline", size: "sm" }))}
        >
          Sıfırla
        </Link>
      </form>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>
              <AdminSortHeader
                pathname={ROUTES.admin.leads}
                label="Ad"
                field="name"
                currentField={query.sortBy}
                currentDir={query.sortDir}
                query={q}
              />
            </TableHead>
            <TableHead>İletişim</TableHead>
            <TableHead>Kaynak</TableHead>
            <TableHead>Ofis</TableHead>
            <TableHead>Durum</TableHead>
            <TableHead>
              <AdminSortHeader
                pathname={ROUTES.admin.leads}
                label="Oluşturulma"
                field="createdAt"
                currentField={query.sortBy}
                currentDir={query.sortDir}
                query={q}
              />
            </TableHead>
            <TableHead>
              <AdminSortHeader
                pathname={ROUTES.admin.leads}
                label="Güncelleme"
                field="updatedAt"
                currentField={query.sortBy}
                currentDir={query.sortDir}
                query={q}
              />
            </TableHead>
            <TableHead className="text-right">İşlem</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {rows.length === 0 ? (
            <TableRow>
              <TableCell colSpan={8} className="text-muted-foreground py-8 text-center">
                Kayıt yok.
              </TableCell>
            </TableRow>
          ) : (
            rows.map((row) => (
              <TableRow key={row.id}>
                <TableCell className="font-medium">{row.name}</TableCell>
                <TableCell className="max-w-[200px] truncate text-xs">
                  <div>{row.email}</div>
                  <div className="text-muted-foreground">{row.phoneNumber}</div>
                </TableCell>
                <TableCell className="max-w-[100px] truncate text-xs text-muted-foreground">
                  {row.utmSource ?? "—"}
                </TableCell>
                <TableCell>{row.office.name}</TableCell>
                <TableCell>
                  <select
                    className="border-input bg-background h-8 max-w-[140px] rounded-md border px-1 text-xs"
                    value={String(row.status.id)}
                    disabled={pending}
                    onChange={(e) => {
                      updateStatus(row.id, e.target.value);
                    }}
                  >
                    {statuses.map((s) => (
                      <option key={s.id} value={s.id}>
                        {s.name}
                      </option>
                    ))}
                  </select>
                </TableCell>
                <TableCell className="text-muted-foreground text-xs whitespace-normal">
                  {new Date(row.createdAt).toLocaleString("tr-TR")}
                </TableCell>
                <TableCell className="text-muted-foreground text-xs whitespace-normal">
                  {new Date(row.updatedAt).toLocaleString("tr-TR")}
                </TableCell>
                <TableCell className="text-right">
                  <Button
                    type="button"
                    variant="destructive"
                    size="xs"
                    onClick={() => {
                      setDeleteId(row.id);
                    }}
                  >
                    Sil
                  </Button>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>

      <AdminPagination
        pathname={ROUTES.admin.leads}
        page={pagination.page}
        totalPages={pagination.totalPages}
        query={q}
      />

      <AdminConfirmDialog
        open={deleteId != null}
        onOpenChange={(open) => {
          if (!open) {
            setDeleteId(null);
          }
        }}
        title="Danışanı sil?"
        description="Bu kayıt listeden kaldırılır (yumuşak silme)."
        confirmLabel="Sil"
        destructive
        pending={pending}
        onConfirm={confirmDelete}
      />
    </div>
  );
}
