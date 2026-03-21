"use client";

import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { logoutAction } from "@/server/actions/admin-auth-actions";
import { ROUTES } from "@/lib/routes";

export function AdminSignOutButton(): React.JSX.Element {
  const router = useRouter();

  async function handleClick(): Promise<void> {
    const result = await logoutAction();
    if (result.success) {
      toast.success(result.message ?? "Çıkış yapıldı");
    } else {
      toast.error(result.error);
    }
    router.push(ROUTES.admin.login);
    router.refresh();
  }

  return (
    <Button type="button" variant="outline" size="sm" onClick={handleClick}>
      Çıkış
    </Button>
  );
}
