import type { Metadata } from "next";
import { AdminChangePasswordModal } from "@/components/feature/admin-change-password-modal";
import { AdminLegalDocuments } from "@/components/feature/admin-legal-documents";
import * as legalDocService from "@/server/services/legal-document-service";

export const metadata: Metadata = {
  title: "Ayarlar",
  robots: { index: false, follow: false },
};

export default async function AdminSettingsPage(): Promise<React.JSX.Element> {
  const result = await legalDocService.getAll();
  const documents = result.success
    ? result.data.map((d) => ({
        id: d.id,
        title: d.title,
        content: d.content,
        createdAt: d.createdAt.toISOString(),
        updatedAt: d.updatedAt.toISOString(),
      }))
    : [];

  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <h1 className="text-xl font-semibold">Ayarlar</h1>
        <p className="text-muted-foreground mb-4 text-sm">
          Yönetim hesabı şifrenizi güncelleyin.
        </p>
        <AdminChangePasswordModal />
      </div>
      
      <div className="border-t border-border pt-8">
        <AdminLegalDocuments documents={documents} />
      </div>
    </div>
  );
}
