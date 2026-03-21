import { z } from "zod";

const newPasswordSchema = z
  .string()
  .min(8, "Yeni şifre en az 8 karakter olmalıdır")
  .regex(/[A-Z]/, "En az bir büyük harf gerekli")
  .regex(/[a-z]/, "En az bir küçük harf gerekli")
  .regex(/[0-9]/, "En az bir rakam gerekli");

export const adminLoginSchema = z.object({
  password: z.string().min(1, "Şifre gerekli"),
});

export const adminChangePasswordSchema = z
  .object({
    currentPassword: z.string().min(1, "Mevcut şifre gerekli"),
    newPassword: newPasswordSchema,
    confirmPassword: z.string().min(1, "Şifre tekrarı gerekli"),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Yeni şifreler eşleşmiyor",
    path: ["confirmPassword"],
  });

export type AdminLoginInput = z.infer<typeof adminLoginSchema>;
export type AdminChangePasswordInput = z.infer<typeof adminChangePasswordSchema>;
