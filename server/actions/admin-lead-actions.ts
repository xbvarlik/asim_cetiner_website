"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";
import * as leadService from "@/server/services/lead-service";
import { getAdminSessionFromCookies } from "@/lib/server/admin-session";
import type { AdminActionResult } from "@/types";
import { ROUTES } from "@/lib/routes";

const updateStatusSchema = z.object({
  leadId: z.string().uuid(),
  statusId: z.coerce.number().int().positive(),
});

const deleteLeadSchema = z.object({
  leadId: z.string().uuid(),
});

async function requireAdmin(): Promise<{ sub: string } | null> {
  return getAdminSessionFromCookies();
}

export async function updateLeadStatusAction(
  _prev: AdminActionResult | undefined,
  formData: FormData
): Promise<AdminActionResult> {
  const session = await requireAdmin();
  if (!session) {
    return { success: false, error: "Yetkisiz" };
  }

  const parsed = updateStatusSchema.safeParse({
    leadId: formData.get("leadId"),
    statusId: formData.get("statusId"),
  });
  if (!parsed.success) {
    return {
      success: false,
      error: parsed.error.issues[0]?.message ?? "Geçersiz veri",
    };
  }

  const result = await leadService.update(parsed.data.leadId, {
    statusId: parsed.data.statusId,
  });
  if (!result.success) {
    return { success: false, error: result.error };
  }
  revalidatePath(ROUTES.admin.leads);
  return { success: true, message: "Durum güncellendi" };
}

export async function deleteLeadAction(
  _prev: AdminActionResult | undefined,
  formData: FormData
): Promise<AdminActionResult> {
  const session = await requireAdmin();
  if (!session) {
    return { success: false, error: "Yetkisiz" };
  }

  const parsed = deleteLeadSchema.safeParse({
    leadId: formData.get("leadId"),
  });
  if (!parsed.success) {
    return {
      success: false,
      error: parsed.error.issues[0]?.message ?? "Geçersiz veri",
    };
  }

  const result = await leadService.remove(parsed.data.leadId);
  if (!result.success) {
    return { success: false, error: result.error };
  }
  revalidatePath(ROUTES.admin.leads);
  return { success: true, message: "Kayıt silindi" };
}
