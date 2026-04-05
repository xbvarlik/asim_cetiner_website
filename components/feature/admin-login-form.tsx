"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { loginAction } from "@/server/actions/admin-auth-actions";
import { ROUTES } from "@/lib/routes";

export function AdminLoginForm(): React.JSX.Element {
  const router = useRouter();
  const [pending, setPending] = useState(false);

  async function handleSubmit(e: FormEvent<HTMLFormElement>): Promise<void> {
    e.preventDefault();
    setPending(true);
    try {
      const formData = new FormData(e.currentTarget);
      const result = await loginAction(undefined, formData);
      if (result.success) {
        toast.success(result.message ?? "Giriş başarılı");
        router.refresh();
        router.push(ROUTES.admin.home);
      } else {
        toast.error(result.error);
      }
    } finally {
      setPending(false);
    }
  }

  return (
    <form
      onSubmit={(e) => {
        void handleSubmit(e);
      }}
      className="mx-auto flex w-full max-w-sm min-w-0 flex-col gap-4 rounded-xl border bg-card p-4 shadow-sm sm:p-6"
    >
      <div className="space-y-2">
        <h1 className="text-lg font-semibold">Yönetim girişi</h1>
        <p className="text-muted-foreground text-sm">
          Devam etmek için şifrenizi girin.
        </p>
      </div>
      <div className="space-y-2">
        <Label htmlFor="password">Şifre</Label>
        <Input
          id="password"
          name="password"
          type="password"
          autoComplete="current-password"
          required
          disabled={pending}
        />
      </div>
      <Button type="submit" disabled={pending} className="w-full">
        {pending ? "Giriş…" : "Giriş"}
      </Button>
    </form>
  );
}
