"use client";

import { useState, useTransition } from "react";
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
  createBlogPostAction,
  updateBlogPostAction,
  deleteBlogPostAction,
} from "@/server/actions/admin-blog-actions";
import { ROUTES } from "@/lib/routes";
import type { BlogListQuery } from "@/lib/validations/admin-list-query-validation";

export type BlogRowDto = {
  id: number;
  title: string;
  content: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
};

export function AdminBlogTable({
  rows,
  pagination,
  query,
}: {
  rows: BlogRowDto[];
  pagination: { page: number; pageSize: number; total: number; totalPages: number };
  query: BlogListQuery;
}): React.JSX.Element {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<BlogRowDto | null>(null);
  const [expandedIds, setExpandedIds] = useState<Set<number>>(() => new Set());

  function toggleExpand(id: number): void {
    setExpandedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  }

  const q: Record<string, string | undefined> = {
    page: String(query.page),
    pageSize: String(query.pageSize),
    sortBy: query.sortBy,
    sortDir: query.sortDir,
  };

  function submitCreateOrUpdate(formData: FormData): void {
    startTransition(async () => {
      const action = editing ? updateBlogPostAction : createBlogPostAction;
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
      const result = await deleteBlogPostAction(undefined, fd);
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
      <div className="mb-4 flex w-full min-w-0 justify-end">
        <Button
          type="button"
          size="sm"
          onClick={() => {
            setEditing(null);
            setModalOpen(true);
          }}
        >
          Yeni yazı
        </Button>
      </div>

      <div className="md:hidden space-y-3">
        {rows.length === 0 ? (
          <p className="text-muted-foreground py-6 text-center text-sm">Kayıt yok.</p>
        ) : (
          rows.map((row) => {
            const open = expandedIds.has(row.id);
            return (
              <div
                key={row.id}
                className="bg-card border-border space-y-3 rounded-xl border p-4 shadow-sm"
              >
                <div className="flex items-start justify-between gap-2">
                  <p className="min-w-0 flex-1 font-medium">{row.title}</p>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="shrink-0"
                    aria-expanded={open}
                    onClick={() => {
                      toggleExpand(row.id);
                    }}
                  >
                    {open ? "Gizle" : "Detay"}
                  </Button>
                </div>
                <p className="text-sm">
                  <span
                    className={
                      row.isActive
                        ? "text-green-700 dark:text-green-400"
                        : "text-muted-foreground"
                    }
                  >
                    {row.isActive ? "Yayında" : "Taslak"}
                  </span>
                </p>
                <div className="flex flex-col gap-2 sm:flex-row sm:flex-wrap">
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    className="w-full sm:w-auto"
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
                    size="sm"
                    className="w-full sm:w-auto"
                    onClick={() => {
                      setDeleteId(row.id);
                    }}
                  >
                    Sil
                  </Button>
                </div>
                {open ? (
                  <div className="border-border text-sm space-y-2 border-t pt-3">
                    <p className="text-muted-foreground text-xs">
                      Oluşturulma: {new Date(row.createdAt).toLocaleString("tr-TR")}
                    </p>
                    <p className="text-muted-foreground text-xs">
                      Güncelleme: {new Date(row.updatedAt).toLocaleString("tr-TR")}
                    </p>
                    <p className="text-foreground line-clamp-6 whitespace-pre-wrap break-words">
                      {row.content}
                    </p>
                  </div>
                ) : null}
              </div>
            );
          })
        )}
      </div>

      <div className="hidden min-w-0 md:block md:overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>
              <AdminSortHeader
                pathname={ROUTES.admin.blog}
                label="Başlık"
                field="title"
                currentField={query.sortBy}
                currentDir={query.sortDir}
                query={q}
              />
            </TableHead>
            <TableHead>Durum</TableHead>
            <TableHead>
              <AdminSortHeader
                pathname={ROUTES.admin.blog}
                label="Oluşturulma"
                field="createdAt"
                currentField={query.sortBy}
                currentDir={query.sortDir}
                query={q}
              />
            </TableHead>
            <TableHead>
              <AdminSortHeader
                pathname={ROUTES.admin.blog}
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
              <TableCell colSpan={5} className="text-muted-foreground py-8 text-center">
                Kayıt yok.
              </TableCell>
            </TableRow>
          ) : (
            rows.map((row) => (
              <TableRow key={row.id}>
                <TableCell className="max-w-[200px] font-medium">
                  {row.title}
                </TableCell>
                <TableCell>
                  <span
                    className={
                      row.isActive
                        ? "text-green-700 dark:text-green-400"
                        : "text-muted-foreground"
                    }
                  >
                    {row.isActive ? "Yayında" : "Taslak"}
                  </span>
                </TableCell>
                <TableCell className="text-muted-foreground text-xs whitespace-normal">
                  {new Date(row.createdAt).toLocaleString("tr-TR")}
                </TableCell>
                <TableCell className="text-muted-foreground text-xs whitespace-normal">
                  {new Date(row.updatedAt).toLocaleString("tr-TR")}
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
      </div>

      <AdminPagination
        pathname={ROUTES.admin.blog}
        page={pagination.page}
        totalPages={pagination.totalPages}
        query={q}
      />

      <Dialog open={modalOpen} onOpenChange={setModalOpen}>
        <DialogContent className="max-h-[90vh] w-[calc(100vw-2rem)] max-w-lg overflow-y-auto sm:w-full">
          <DialogHeader>
            <DialogTitle>
              {editing ? "Yazıyı düzenle" : "Yeni yazı"}
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
              <Label htmlFor="blog-title">Başlık</Label>
              <Input
                id="blog-title"
                name="title"
                required
                defaultValue={editing?.title ?? ""}
                disabled={pending}
              />
            </div>
            <div className="space-y-1">
              <Label htmlFor="blog-content">İçerik</Label>
              <Textarea
                id="blog-content"
                name="content"
                required
                rows={8}
                defaultValue={editing?.content ?? ""}
                disabled={pending}
              />
            </div>
            <div className="space-y-1">
              <Label htmlFor="blog-active">Durum</Label>
              <select
                id="blog-active"
                name="isActive"
                className="border-input bg-background h-9 w-full rounded-md border px-2 text-sm"
                defaultValue={editing ? String(editing.isActive) : "true"}
                disabled={pending}
              >
                <option value="true">Yayında</option>
                <option value="false">Taslak</option>
              </select>
            </div>
            <DialogFooter className="flex flex-row justify-end gap-2 border-0 bg-transparent p-0">
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
        title="Yazıyı sil?"
        description="Bu işlem geri alınamaz."
        confirmLabel="Sil"
        destructive
        pending={pending}
        onConfirm={confirmDelete}
      />
    </div>
  );
}
