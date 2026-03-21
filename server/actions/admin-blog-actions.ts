"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";
import * as blogService from "@/server/services/blog-service";
import { getAdminSessionFromCookies } from "@/lib/server/admin-session";
import {
  createBlogPostSchema,
  updateBlogPostSchema,
} from "@/lib/validations/blog-validation";
import type { AdminActionResult } from "@/types";
import { ROUTES } from "@/lib/routes";

const idSchema = z.coerce.number().int().positive();

async function requireAdmin(): Promise<boolean> {
  const s = await getAdminSessionFromCookies();
  return s != null;
}

function parseBool(v: FormDataEntryValue | null): boolean | undefined {
  if (v == null || v === "") {
    return undefined;
  }
  return v === "true" || v === "on" || v === "1";
}

export async function createBlogPostAction(
  _prev: AdminActionResult | undefined,
  formData: FormData
): Promise<AdminActionResult> {
  if (!(await requireAdmin())) {
    return { success: false, error: "Yetkisiz" };
  }

  const raw = {
    title: formData.get("title"),
    content: formData.get("content"),
    isActive: parseBool(formData.get("isActive")) ?? true,
  };
  const parsed = createBlogPostSchema.safeParse(raw);
  if (!parsed.success) {
    return {
      success: false,
      error: parsed.error.issues[0]?.message ?? "Geçersiz veri",
    };
  }

  const result = await blogService.create(parsed.data);
  if (!result.success) {
    return { success: false, error: result.error };
  }
  revalidatePath(ROUTES.admin.blog);
  return { success: true, message: "Yazı oluşturuldu" };
}

export async function updateBlogPostAction(
  _prev: AdminActionResult | undefined,
  formData: FormData
): Promise<AdminActionResult> {
  if (!(await requireAdmin())) {
    return { success: false, error: "Yetkisiz" };
  }

  const idParsed = idSchema.safeParse(formData.get("id"));
  if (!idParsed.success) {
    return { success: false, error: "Geçersiz yazı" };
  }

  const raw: Record<string, unknown> = {
    title: formData.get("title"),
    content: formData.get("content"),
  };
  const activeRaw = formData.get("isActive");
  if (activeRaw !== null && activeRaw !== "") {
    raw.isActive = parseBool(activeRaw) ?? false;
  }

  const parsed = updateBlogPostSchema.safeParse(raw);
  if (!parsed.success) {
    return {
      success: false,
      error: parsed.error.issues[0]?.message ?? "Geçersiz veri",
    };
  }

  const result = await blogService.update(idParsed.data, parsed.data);
  if (!result.success) {
    return { success: false, error: result.error };
  }
  revalidatePath(ROUTES.admin.blog);
  return { success: true, message: "Yazı güncellendi" };
}

export async function deleteBlogPostAction(
  _prev: AdminActionResult | undefined,
  formData: FormData
): Promise<AdminActionResult> {
  if (!(await requireAdmin())) {
    return { success: false, error: "Yetkisiz" };
  }

  const idParsed = idSchema.safeParse(formData.get("id"));
  if (!idParsed.success) {
    return { success: false, error: "Geçersiz yazı" };
  }

  const result = await blogService.remove(idParsed.data);
  if (!result.success) {
    return { success: false, error: result.error };
  }
  revalidatePath(ROUTES.admin.blog);
  return { success: true, message: "Yazı silindi" };
}
