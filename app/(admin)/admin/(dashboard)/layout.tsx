import { AdminShell } from "@/components/feature/admin-shell";

export default function AdminDashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>): React.JSX.Element {
  return <AdminShell>{children}</AdminShell>;
}
