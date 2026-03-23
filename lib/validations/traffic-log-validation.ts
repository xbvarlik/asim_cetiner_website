import { z } from "zod";

const safePathname = z
  .string()
  .min(1)
  .max(512)
  .refine(
    (p) => p.startsWith("/") && !p.includes("//") && !/^https?:/i.test(p),
    "Invalid pathname"
  );

const utmField = z
  .string()
  .max(128)
  .optional()
  .transform((s) => (s == null || s.trim() === "" ? undefined : s.trim().slice(0, 128)));

export const trafficLogPayloadSchema = z.object({
  source: z
    .string()
    .min(1)
    .max(128)
    .transform((s) => s.trim().slice(0, 128)),
  path: safePathname,
  utmMedium: utmField,
  utmCampaign: utmField,
});

export type TrafficLogPayload = z.infer<typeof trafficLogPayloadSchema>;
