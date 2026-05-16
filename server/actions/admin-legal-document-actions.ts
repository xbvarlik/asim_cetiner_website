"use server";

import { revalidatePath } from "next/cache";
import * as legalDocService from "@/server/services/legal-document-service";
import { getAdminSessionFromCookies } from "@/lib/server/admin-session";
import {
  createOrUpdateLegalDocumentSchema,
  legalDocumentIdSchema,
} from "@/lib/validations/legal-document-validation";
import type { AdminActionResult } from "@/types";
import { ROUTES } from "@/lib/routes";

async function requireAdmin(): Promise<boolean> {
  const s = await getAdminSessionFromCookies();
  return s != null;
}

export async function upsertLegalDocumentAction(
  _prev: AdminActionResult | undefined,
  formData: FormData
): Promise<AdminActionResult> {
  if (!(await requireAdmin())) {
    return { success: false, error: "Yetkisiz" };
  }

  const raw = {
    id: formData.get("id"),
    title: formData.get("title"),
    content: formData.get("content"),
  };

  const parsed = createOrUpdateLegalDocumentSchema.safeParse(raw);
  if (!parsed.success) {
    return {
      success: false,
      error: parsed.error.issues[0]?.message ?? "Geçersiz veri",
    };
  }

  const result = await legalDocService.upsert(parsed.data);
  if (!result.success) {
    return { success: false, error: result.error };
  }

  revalidatePath("/kvkk-aydinlatma-metni");
  revalidatePath("/gizlilik-sozlesmesi");
  revalidatePath(ROUTES.admin.settings);
  
  return { success: true, message: "Doküman kaydedildi" };
}

export async function deleteLegalDocumentAction(
  _prev: AdminActionResult | undefined,
  formData: FormData
): Promise<AdminActionResult> {
  if (!(await requireAdmin())) {
    return { success: false, error: "Yetkisiz" };
  }

  const idParsed = legalDocumentIdSchema.safeParse(formData.get("id"));
  if (!idParsed.success) {
    return { success: false, error: "Geçersiz doküman" };
  }

  const result = await legalDocService.remove(idParsed.data);
  if (!result.success) {
    return { success: false, error: result.error };
  }

  revalidatePath("/kvkk-aydinlatma-metni");
  revalidatePath("/gizlilik-sozlesmesi");
  revalidatePath(ROUTES.admin.settings);
  
  return { success: true, message: "Doküman silindi" };
}
