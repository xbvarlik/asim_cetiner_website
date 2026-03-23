"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";
import * as leadService from "@/server/services/lead-service";
import type { ContactFormState } from "@/types";

const contactFormSchema = z.object({
  name: z.string().min(1, "Ad alanı zorunludur").max(255, "Ad çok uzun"),
  phoneNumber: z
    .string()
    .min(1, "Telefon numarası zorunludur")
    .max(50, "Telefon numarası çok uzun"),
  email: z
    .string()
    .min(1, "E-posta alanı zorunludur")
    .email("Geçerli bir e-posta adresi giriniz")
    .max(255, "E-posta çok uzun"),
  message: z.string().max(2000, "Mesaj çok uzun").optional(),
  officeId: z.coerce
    .number()
    .int()
    .positive("Lütfen bir ofis seçiniz"),
  utmSource: z.preprocess(
    (v) => (v == null || v === "" ? undefined : String(v)),
    z.string().max(128).optional()
  ),
});

const INITIAL_STATE: ContactFormState = { success: false };

export async function createLeadAction(
  _prevState: ContactFormState,
  formData: FormData
): Promise<ContactFormState> {
  const honeypot = formData.get("honeypot");
  if (honeypot) {
    return { ...INITIAL_STATE, success: true };
  }

  const raw = {
    name: formData.get("name"),
    phoneNumber: formData.get("phoneNumber"),
    email: formData.get("email"),
    message: formData.get("message") || undefined,
    officeId: formData.get("officeId"),
    utmSource: formData.get("utmSource") || undefined,
  };

  const parsed = contactFormSchema.safeParse(raw);

  if (!parsed.success) {
    return {
      success: false,
      fieldErrors: parsed.error.flatten()
        .fieldErrors as ContactFormState["fieldErrors"],
    };
  }

  const { utmSource, ...rest } = parsed.data;

  const result = await leadService.create({
    ...rest,
    statusId: 1,
    ...(utmSource !== undefined && { utmSource }),
  });

  if (!result.success) {
    return {
      success: false,
      error: "Bir hata oluştu. Lütfen tekrar deneyin.",
    };
  }

  revalidatePath("/");
  return { success: true };
}
