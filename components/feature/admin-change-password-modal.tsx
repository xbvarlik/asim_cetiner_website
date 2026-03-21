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
import { changeAdminPasswordAction } from "@/server/actions/admin-auth-actions";

export function AdminChangePasswordModal(): React.JSX.Element {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [pending, startTransition] = useTransition();

  function handleSubmit(formData: FormData): void {
    startTransition(async () => {
      const result = await changeAdminPasswordAction(undefined, formData);
      if (result.success) {
        toast.success(result.message ?? "Şifre güncellendi");
        setOpen(false);
        router.refresh();
      } else {
        toast.error(result.error);
      }
    });
  }

  return (
    <>
      <Button
        type="button"
        variant="outline"
        size="sm"
        onClick={() => {
          setOpen(true);
        }}
      >
        Şifre değiştir
      </Button>
      <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Şifre değiştir</DialogTitle>
        </DialogHeader>
        <form
          className="flex flex-col gap-3"
          onSubmit={(e) => {
            e.preventDefault();
            const fd = new FormData(e.currentTarget);
            handleSubmit(fd);
          }}
        >
          <div className="space-y-1">
            <Label htmlFor="currentPassword">Mevcut şifre</Label>
            <Input
              id="currentPassword"
              name="currentPassword"
              type="password"
              autoComplete="current-password"
              required
              disabled={pending}
            />
          </div>
          <div className="space-y-1">
            <Label htmlFor="newPassword">Yeni şifre</Label>
            <Input
              id="newPassword"
              name="newPassword"
              type="password"
              autoComplete="new-password"
              required
              disabled={pending}
            />
            <p className="text-muted-foreground text-xs">
              En az 8 karakter, büyük harf, küçük harf ve rakam.
            </p>
          </div>
          <div className="space-y-1">
            <Label htmlFor="confirmPassword">Yeni şifre (tekrar)</Label>
            <Input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              autoComplete="new-password"
              required
              disabled={pending}
            />
          </div>
          <DialogFooter className="flex flex-row justify-end gap-2 border-0 bg-transparent p-0">
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                setOpen(false);
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
    </>
  );
}
