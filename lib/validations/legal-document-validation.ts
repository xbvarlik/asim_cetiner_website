import { z } from "zod";

export const legalDocumentIdSchema = z.enum(["kvkk", "gizlilik"], {
  message: "Invalid document ID. Must be 'kvkk' or 'gizlilik'",
});

export const createOrUpdateLegalDocumentSchema = z.object({
  id: legalDocumentIdSchema,
  title: z.string().min(1, "Title is required").max(255),
  content: z.string().min(1, "Content is required"),
});

export type LegalDocumentId = z.infer<typeof legalDocumentIdSchema>;
