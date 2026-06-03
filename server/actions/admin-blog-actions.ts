"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";
import * as blogService from "@/server/services/blog-service";
import { getAdminSessionFromCookies } from "@/lib/server/admin-session";
import { createBlogPostInputSchema } from "@/lib/validations/blog-validation";
import type { AdminActionResult } from "@/types";
import { ROUTES, getBlogPostPath } from "@/lib/routes";

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

function revalidatePublicBlogPaths(slug?: string, previousSlug?: string): void {
  revalidatePath(ROUTES.blog);
  revalidatePath("/sitemap.xml");
  if (previousSlug && previousSlug !== slug) {
    revalidatePath(getBlogPostPath(previousSlug));
  }
  if (slug) {
    revalidatePath(getBlogPostPath(slug));
  }
}

export async function createBlogPostAction(
  _prev: AdminActionResult | undefined,
  formData: FormData
): Promise<AdminActionResult> {
  if (!(await requireAdmin())) {
    return { success: false, error: "Yetkisiz" };
  }

  const parsed = createBlogPostInputSchema.safeParse({
    title: formData.get("title"),
    content: formData.get("content"),
    isActive: parseBool(formData.get("isActive")) ?? true,
  });
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
  revalidatePublicBlogPaths(result.data.slug);
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

  const existing = await blogService.getById(idParsed.data);
  const previousSlug =
    existing.success && existing.data ? existing.data.slug : undefined;

  const raw: Record<string, unknown> = {
    title: formData.get("title"),
    content: formData.get("content"),
  };
  const activeRaw = formData.get("isActive");
  if (activeRaw !== null && activeRaw !== "") {
    raw.isActive = parseBool(activeRaw) ?? false;
  }

  const parsed = createBlogPostInputSchema.partial().safeParse(raw);
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
  revalidatePublicBlogPaths(result.data.slug, previousSlug);
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

  const existing = await blogService.getById(idParsed.data);
  const slug =
    existing.success && existing.data ? existing.data.slug : undefined;

  const result = await blogService.remove(idParsed.data);
  if (!result.success) {
    return { success: false, error: result.error };
  }
  revalidatePath(ROUTES.admin.blog);
  revalidatePublicBlogPaths(slug);
  return { success: true, message: "Yazı silindi" };
}
