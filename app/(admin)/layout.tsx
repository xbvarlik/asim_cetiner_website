import { getAdminSessionFromCookies } from "@/lib/server/admin-session";
import { AdminAuthProvider } from "@/components/feature/admin-auth-provider";

export default async function AdminRouteGroupLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>): Promise<React.JSX.Element> {
  const session = await getAdminSessionFromCookies();

  return (
    <AdminAuthProvider
      isAuthenticated={session != null}
      adminId={session?.sub ?? null}
    >
      {children}
    </AdminAuthProvider>
  );
}
