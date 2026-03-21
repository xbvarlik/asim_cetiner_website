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
import { AdminPagination, adminListHref } from "@/components/feature/admin-data-table";
import { AdminConfirmDialog } from "@/components/feature/admin-confirm-dialog";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  createOfficeAction,
  updateOfficeAction,
  deleteOfficeAction,
} from "@/server/actions/admin-office-actions";
import { ROUTES } from "@/lib/routes";
import type { OfficeListQuery } from "@/lib/validations/admin-list-query-validation";

export type OfficeRowDto = {
  id: number;
  name: string;
  address: string;
  mapsLink: string | null;
};

export function AdminOfficeTable({
  rows,
  pagination,
  query,
}: {
  rows: OfficeRowDto[];
  pagination: { page: number; pageSize: number; total: number; totalPages: number };
  query: OfficeListQuery;
}): React.JSX.Element {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<OfficeRowDto | null>(null);

  const q: Record<string, string | undefined> = {
    page: String(query.page),
    pageSize: String(query.pageSize),
    sortDir: query.sortDir,
  };

  const toggleSortHref = adminListHref(ROUTES.admin.offices, {
    ...q,
    sortDir: query.sortDir === "asc" ? "desc" : "asc",
    page: "1",
  });

  function submitCreateOrUpdate(formData: FormData): void {
    startTransition(async () => {
      const action = editing
        ? updateOfficeAction
        : createOfficeAction;
      if (editing) {
        formData.set("id", String(editing.id));
      }
      const result = await action(undefined, formData);
      if (result.success) {
        toast.success(result.message ?? "Kaydedildi");
        setModalOpen(false);
        setEditing(null);
        router.refresh();
      } else {
        toast.error(result.error);
      }
    });
  }

  function confirmDelete(): void {
    if (deleteId == null) {
      return;
    }
    const id = deleteId;
    const fd = new FormData();
    fd.set("id", String(id));
    startTransition(async () => {
      const result = await deleteOfficeAction(undefined, fd);
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
      <div className="mb-4 flex justify-end">
        <Button
          type="button"
          size="sm"
          onClick={() => {
            setEditing(null);
            setModalOpen(true);
          }}
        >
          Yeni ofis
        </Button>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>
              <Link
                href={toggleSortHref}
                className="hover:text-foreground text-muted-foreground font-medium"
              >
                Ad {query.sortDir === "asc" ? "↑" : "↓"}
              </Link>
            </TableHead>
            <TableHead>Adres</TableHead>
            <TableHead>Harita</TableHead>
            <TableHead className="text-right">İşlem</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {rows.length === 0 ? (
            <TableRow>
              <TableCell colSpan={4} className="text-muted-foreground py-8 text-center">
                Kayıt yok.
              </TableCell>
            </TableRow>
          ) : (
            rows.map((row) => (
              <TableRow key={row.id}>
                <TableCell className="font-medium">{row.name}</TableCell>
                <TableCell className="max-w-xs truncate text-sm">
                  {row.address}
                </TableCell>
                <TableCell className="max-w-[120px] truncate text-xs">
                  {row.mapsLink ? (
                    <a
                      href={row.mapsLink}
                      target="_blank"
                      rel="noreferrer"
                      className="text-primary underline"
                    >
                      Link
                    </a>
                  ) : (
                    "—"
                  )}
                </TableCell>
                <TableCell className="space-x-2 text-right">
                  <Button
                    type="button"
                    variant="outline"
                    size="xs"
                    onClick={() => {
                      setEditing(row);
                      setModalOpen(true);
                    }}
                  >
                    Düzenle
                  </Button>
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
        pathname={ROUTES.admin.offices}
        page={pagination.page}
        totalPages={pagination.totalPages}
        query={q}
      />

      <Dialog open={modalOpen} onOpenChange={setModalOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>
              {editing ? "Ofisi düzenle" : "Yeni ofis"}
            </DialogTitle>
          </DialogHeader>
          <form
            className="flex flex-col gap-3"
            onSubmit={(e) => {
              e.preventDefault();
              const fd = new FormData(e.currentTarget);
              submitCreateOrUpdate(fd);
            }}
          >
            <div className="space-y-1">
              <Label htmlFor="office-name">Ad</Label>
              <Input
                id="office-name"
                name="name"
                required
                defaultValue={editing?.name ?? ""}
                disabled={pending}
              />
            </div>
            <div className="space-y-1">
              <Label htmlFor="office-address">Adres</Label>
              <Textarea
                id="office-address"
                name="address"
                required
                rows={3}
                defaultValue={editing?.address ?? ""}
                disabled={pending}
              />
            </div>
            <div className="space-y-1">
              <Label htmlFor="office-maps">Harita linki (isteğe bağlı)</Label>
              <Input
                id="office-maps"
                name="mapsLink"
                type="url"
                defaultValue={editing?.mapsLink ?? ""}
                disabled={pending}
              />
            </div>
            <DialogFooter className="border-0 bg-transparent p-0">
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  setModalOpen(false);
                }}
                disabled={pending}
              >
                İptal
              </Button>
              <Button type="submit" disabled={pending}>
                Kaydet
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      <AdminConfirmDialog
        open={deleteId != null}
        onOpenChange={(open) => {
          if (!open) {
            setDeleteId(null);
          }
        }}
        title="Ofisi sil?"
        description="Bu ofise bağlı danışanlar varsa silme engellenir."
        confirmLabel="Sil"
        destructive
        pending={pending}
        onConfirm={confirmDelete}
      />
    </div>
  );
}
