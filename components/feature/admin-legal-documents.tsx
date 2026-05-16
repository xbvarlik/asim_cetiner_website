"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
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
import { RichTextEditor } from "@/components/feature/rich-text-editor";
import { AdminConfirmDialog } from "@/components/feature/admin-confirm-dialog";
import {
  upsertLegalDocumentAction,
  deleteLegalDocumentAction,
} from "@/server/actions/admin-legal-document-actions";
import type { LegalDocumentType } from "@/server/services/legal-document-service";
import type { LegalDocumentId } from "@/lib/validations/legal-document-validation";

type LegalDocumentDto = {
  id: string;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
};

type AdminLegalDocumentsProps = {
  documents: LegalDocumentDto[];
};

const DOCUMENT_LABELS: Record<string, string> = {
  kvkk: "KVKK Aydınlatma Metni",
  gizlilik: "Gizlilik Sözleşmesi",
};

export function AdminLegalDocuments({
  documents,
}: AdminLegalDocumentsProps): React.JSX.Element {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const [modalOpen, setModalOpen] = useState(false);
  const [deleteId, setDeleteId] = useState<LegalDocumentId | null>(null);
  const [editing, setEditing] = useState<LegalDocumentDto | null>(null);
  const [content, setContent] = useState<string>("");
  const [title, setTitle] = useState<string>("");

  const kvkkDoc = documents.find((d) => d.id === "kvkk");
  const gizlilikDoc = documents.find((d) => d.id === "gizlilik");

  function openEditDialog(docId: LegalDocumentId): void {
    const doc = documents.find((d) => d.id === docId);
    if (doc) {
      setEditing(doc);
      setTitle(doc.title);
      setContent(doc.content);
    } else {
      setEditing({ id: docId, title: "", content: "", createdAt: "", updatedAt: "" });
      setTitle(DOCUMENT_LABELS[docId] || "");
      setContent("");
    }
    setModalOpen(true);
  }

  function submitUpsert(formData: FormData): void {
    formData.set("title", title);
    formData.set("content", content);
    if (editing) {
      formData.set("id", editing.id);
    }

    startTransition(async () => {
      const result = await upsertLegalDocumentAction(undefined, formData);
      if (result.success) {
        toast.success(result.message ?? "Kaydedildi");
        setModalOpen(false);
        setEditing(null);
        setTitle("");
        setContent("");
        router.refresh();
      } else {
        toast.error(result.error);
      }
    });
  }

  function confirmDelete(): void {
    if (!deleteId) return;
    const fd = new FormData();
    fd.set("id", deleteId);
    
    startTransition(async () => {
      const result = await deleteLegalDocumentAction(undefined, fd);
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
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-semibold mb-4">Yasal Dokümanlar</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="border border-border rounded-lg p-4 space-y-3">
            <div>
              <h3 className="font-medium">KVKK Aydınlatma Metni</h3>
              {kvkkDoc ? (
                <p className="text-sm text-muted-foreground mt-1">
                  Son güncelleme: {new Date(kvkkDoc.updatedAt).toLocaleDateString("tr-TR")}
                </p>
              ) : (
                <p className="text-sm text-muted-foreground mt-1">Henüz eklenmedi</p>
              )}
            </div>
            <div className="flex gap-2">
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => openEditDialog("kvkk")}
              >
                {kvkkDoc ? "Düzenle" : "Ekle"}
              </Button>
              {kvkkDoc && (
                <Button
                  type="button"
                  variant="destructive"
                  size="sm"
                  onClick={() => setDeleteId("kvkk")}
                >
                  Sil
                </Button>
              )}
            </div>
          </div>

          <div className="border border-border rounded-lg p-4 space-y-3">
            <div>
              <h3 className="font-medium">Gizlilik Sözleşmesi</h3>
              {gizlilikDoc ? (
                <p className="text-sm text-muted-foreground mt-1">
                  Son güncelleme: {new Date(gizlilikDoc.updatedAt).toLocaleDateString("tr-TR")}
                </p>
              ) : (
                <p className="text-sm text-muted-foreground mt-1">Henüz eklenmedi</p>
              )}
            </div>
            <div className="flex gap-2">
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => openEditDialog("gizlilik")}
              >
                {gizlilikDoc ? "Düzenle" : "Ekle"}
              </Button>
              {gizlilikDoc && (
                <Button
                  type="button"
                  variant="destructive"
                  size="sm"
                  onClick={() => setDeleteId("gizlilik")}
                >
                  Sil
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>

      <Dialog open={modalOpen} onOpenChange={setModalOpen}>
        <DialogContent className="max-h-[90vh] w-[calc(100vw-2rem)] max-w-4xl overflow-y-auto sm:w-full">
          <DialogHeader>
            <DialogTitle>
              {editing ? DOCUMENT_LABELS[editing.id] || "Doküman Düzenle" : "Yeni Doküman"}
            </DialogTitle>
          </DialogHeader>
          <form
            className="flex flex-col gap-4"
            onSubmit={(e) => {
              e.preventDefault();
              const fd = new FormData(e.currentTarget);
              submitUpsert(fd);
            }}
          >
            <div className="space-y-1">
              <Label htmlFor="legal-title">Başlık</Label>
              <Input
                id="legal-title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                disabled={pending}
              />
            </div>
            <div className="space-y-1">
              <Label htmlFor="legal-content">İçerik</Label>
              <RichTextEditor
                content={content}
                onChange={setContent}
                disabled={pending}
                placeholder="Doküman içeriğini buraya yazın..."
              />
            </div>
            <DialogFooter className="flex flex-row justify-end gap-2 border-0 bg-transparent p-0">
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  setModalOpen(false);
                  setEditing(null);
                  setTitle("");
                  setContent("");
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
          if (!open) setDeleteId(null);
        }}
        title="Dokümanı sil?"
        description="Bu işlem geri alınamaz."
        confirmLabel="Sil"
        destructive
        pending={pending}
        onConfirm={confirmDelete}
      />
    </div>
  );
}
