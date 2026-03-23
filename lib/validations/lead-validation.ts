import { z } from "zod";

export const createLeadSchema = z.object({
  name: z.string().min(1, "Name is required").max(255),
  phoneNumber: z.string().min(1, "Phone number is required").max(50),
  email: z.string().email("Must be a valid email address").max(255),
  message: z.string().max(2000).optional(),
  utmSource: z
    .string()
    .max(128)
    .optional()
    .transform((s) => (s == null || s.trim() === "" ? undefined : s.trim().slice(0, 128))),
  officeId: z.number().int().positive("Office ID must be a positive integer"),
  statusId: z.number().int().positive("Status ID must be a positive integer"),
});

export const updateLeadSchema = createLeadSchema.partial();
