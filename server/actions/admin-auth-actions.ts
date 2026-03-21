"use server";

import { revalidatePath } from "next/cache";
import {
  verifyAdminPassword,
  verifyAdminCurrentPassword,
  updateAdminPasswordHash,
} from "@/server/services/admin-service";
import {
  setAdminSessionCookie,
  clearAdminSessionCookie,
  getAdminSessionFromCookies,
} from "@/lib/server/admin-session";
import { hashPassword } from "@/lib/server/admin-password";
import {
  adminLoginSchema,
  adminChangePasswordSchema,
} from "@/lib/validations/admin-auth-validation";
import type { AdminActionResult } from "@/types";
import { ROUTES } from "@/lib/routes";

export async function loginAction(
  _prev: AdminActionResult | undefined,
  formData: FormData
): Promise<AdminActionResult> {
  const parsed = adminLoginSchema.safeParse({
    password: formData.get("password"),
  });
  if (!parsed.success) {
    return {
      success: false,
      error: parsed.error.issues[0]?.message ?? "Geçersiz giriş",
    };
  }

  const verified = await verifyAdminPassword(parsed.data.password);
  if (!verified.success) {
    return { success: false, error: verified.error };
  }

  await setAdminSessionCookie(verified.data.id);
  revalidatePath("/", "layout");
  return { success: true, message: "Giriş başarılı" };
}

export async function logoutAction(): Promise<AdminActionResult> {
  await clearAdminSessionCookie();
  revalidatePath("/", "layout");
  return { success: true, message: "Çıkış yapıldı" };
}

export async function changeAdminPasswordAction(
  _prev: AdminActionResult | undefined,
  formData: FormData
): Promise<AdminActionResult> {
  const session = await getAdminSessionFromCookies();
  if (!session) {
    return { success: false, error: "Oturum bulunamadı" };
  }

  const parsed = adminChangePasswordSchema.safeParse({
    currentPassword: formData.get("currentPassword"),
    newPassword: formData.get("newPassword"),
    confirmPassword: formData.get("confirmPassword"),
  });
  if (!parsed.success) {
    return {
      success: false,
      error: parsed.error.issues[0]?.message ?? "Geçersiz veri",
    };
  }

  const verified = await verifyAdminCurrentPassword(
    session.sub,
    parsed.data.currentPassword
  );
  if (!verified.success) {
    return { success: false, error: verified.error };
  }

  const newHash = await hashPassword(parsed.data.newPassword);
  const updated = await updateAdminPasswordHash(session.sub, newHash);
  if (!updated.success) {
    return { success: false, error: updated.error };
  }

  await setAdminSessionCookie(session.sub);
  revalidatePath(ROUTES.admin.settings);
  return { success: true, message: "Şifre güncellendi" };
}
