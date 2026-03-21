import type { Metadata } from "next";
import { AdminLoginForm } from "@/components/feature/admin-login-form";

export const metadata: Metadata = {
  title: "Yönetim girişi",
  robots: { index: false, follow: false },
};

export default function AdminLoginPage(): React.JSX.Element {
  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <AdminLoginForm />
    </div>
  );
}
