import { prisma } from "@/lib/prisma";
import { verifyPassword } from "@/lib/server/admin-password";
import type { ServiceResult } from "@/types";
import type { Admin } from "@/lib/generated/prisma/client";

export async function getAdminById(
  id: string
): Promise<ServiceResult<Admin | null>> {
  try {
    const admin = await prisma.admin.findUnique({ where: { id } });
    return { success: true, data: admin };
  } catch {
    return { success: false, error: "Beklenmeyen bir hata oluştu" };
  }
}

/** Single-admin MVP: first row is the account. */
export async function getDefaultAdmin(): Promise<ServiceResult<Admin | null>> {
  try {
    const admin = await prisma.admin.findFirst();
    return { success: true, data: admin };
  } catch {
    return { success: false, error: "Beklenmeyen bir hata oluştu" };
  }
}

export async function verifyAdminCurrentPassword(
  adminId: string,
  plainPassword: string
): Promise<ServiceResult<Admin>> {
  try {
    const admin = await prisma.admin.findUnique({ where: { id: adminId } });
    if (!admin) {
      return { success: false, error: "Hesap bulunamadı" };
    }
    const ok = await verifyPassword(plainPassword, admin.passwordHash);
    if (!ok) {
      return { success: false, error: "Mevcut şifre yanlış" };
    }
    return { success: true, data: admin };
  } catch {
    return { success: false, error: "Beklenmeyen bir hata oluştu" };
  }
}

export async function verifyAdminPassword(
  plainPassword: string
): Promise<ServiceResult<Admin>> {
  const adminResult = await getDefaultAdmin();
  if (!adminResult.success) {
    return adminResult;
  }
  const admin = adminResult.data;
  if (!admin) {
    return { success: false, error: "Geçersiz kullanıcı veya şifre" };
  }
  const ok = await verifyPassword(plainPassword, admin.passwordHash);
  if (!ok) {
    return { success: false, error: "Geçersiz kullanıcı veya şifre" };
  }
  return { success: true, data: admin };
}

export async function updateAdminPasswordHash(
  adminId: string,
  passwordHash: string
): Promise<ServiceResult<Admin>> {
  try {
    const admin = await prisma.admin.update({
      where: { id: adminId },
      data: { passwordHash },
    });
    return { success: true, data: admin };
  } catch {
    return { success: false, error: "Şifre güncellenemedi" };
  }
}
