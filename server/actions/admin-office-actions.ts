"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";
import * as officeService from "@/server/services/office-service";
import { getAdminSessionFromCookies } from "@/lib/server/admin-session";
import {
  createOfficeSchema,
  updateOfficeSchema,
} from "@/lib/validations/office-validation";
import type { AdminActionResult } from "@/types";
import { ROUTES } from "@/lib/routes";

const idSchema = z.coerce.number().int().positive();

async function requireAdmin(): Promise<boolean> {
  const s = await getAdminSessionFromCookies();
  return s != null;
}

export async function createOfficeAction(
  _prev: AdminActionResult | undefined,
  formData: FormData
): Promise<AdminActionResult> {
  if (!(await requireAdmin())) {
    return { success: false, error: "Yetkisiz" };
  }

  const raw = {
    name: formData.get("name"),
    address: formData.get("address"),
    mapsLink: formData.get("mapsLink") ?? "",
  };
  const parsed = createOfficeSchema.safeParse(raw);
  if (!parsed.success) {
    return {
      success: false,
      error: parsed.error.issues[0]?.message ?? "Geçersiz veri",
    };
  }

  const result = await officeService.create(parsed.data);
  if (!result.success) {
    return { success: false, error: result.error };
  }
  revalidatePath(ROUTES.admin.offices);
  return { success: true, message: "Ofis oluşturuldu" };
}

export async function updateOfficeAction(
  _prev: AdminActionResult | undefined,
  formData: FormData
): Promise<AdminActionResult> {
  if (!(await requireAdmin())) {
    return { success: false, error: "Yetkisiz" };
  }

  const idParsed = idSchema.safeParse(formData.get("id"));
  if (!idParsed.success) {
    return { success: false, error: "Geçersiz ofis" };
  }

  const raw = {
    name: formData.get("name"),
    address: formData.get("address"),
    mapsLink: formData.get("mapsLink") ?? "",
  };
  const parsed = updateOfficeSchema.safeParse(raw);
  if (!parsed.success) {
    return {
      success: false,
      error: parsed.error.issues[0]?.message ?? "Geçersiz veri",
    };
  }

  const result = await officeService.update(idParsed.data, parsed.data);
  if (!result.success) {
    return { success: false, error: result.error };
  }
  revalidatePath(ROUTES.admin.offices);
  return { success: true, message: "Ofis güncellendi" };
}

export async function deleteOfficeAction(
  _prev: AdminActionResult | undefined,
  formData: FormData
): Promise<AdminActionResult> {
  if (!(await requireAdmin())) {
    return { success: false, error: "Yetkisiz" };
  }

  const idParsed = idSchema.safeParse(formData.get("id"));
  if (!idParsed.success) {
    return { success: false, error: "Geçersiz ofis" };
  }

  const result = await officeService.remove(idParsed.data);
  if (!result.success) {
    return { success: false, error: result.error };
  }
  revalidatePath(ROUTES.admin.offices);
  return { success: true, message: "Ofis silindi" };
}
