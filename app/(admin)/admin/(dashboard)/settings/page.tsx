import type { Metadata } from "next";
import { AdminChangePasswordModal } from "@/components/feature/admin-change-password-modal";

export const metadata: Metadata = {
  title: "Ayarlar",
  robots: { index: false, follow: false },
};

export default function AdminSettingsPage(): React.JSX.Element {
  return (
    <div className="space-y-4">
      <h1 className="text-xl font-semibold">Ayarlar</h1>
      <p className="text-muted-foreground mb-4 text-sm">
        Yönetim hesabı şifrenizi güncelleyin.
      </p>
      <AdminChangePasswordModal />
    </div>
  );
}
