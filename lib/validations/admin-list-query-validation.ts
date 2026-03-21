import { z } from "zod";

const sortDirectionSchema = z.enum(["asc", "desc"]);

const positiveInt = z.coerce.number().int().positive();
const optionalPositiveInt = z.coerce.number().int().positive().optional();

export const leadListQuerySchema = z.object({
  page: positiveInt.default(1),
  pageSize: z.coerce.number().int().min(1).max(100).default(20),
  sortBy: z.enum(["createdAt", "name", "updatedAt"]).default("createdAt"),
  sortDir: sortDirectionSchema.default("desc"),
  statusId: optionalPositiveInt,
  officeId: optionalPositiveInt,
});

export const blogListQuerySchema = z.object({
  page: positiveInt.default(1),
  pageSize: z.coerce.number().int().min(1).max(100).default(20),
  sortBy: z.enum(["createdAt", "title", "updatedAt"]).default("createdAt"),
  sortDir: sortDirectionSchema.default("desc"),
});

export const officeListQuerySchema = z.object({
  page: positiveInt.default(1),
  pageSize: z.coerce.number().int().min(1).max(100).default(20),
  sortDir: sortDirectionSchema.default("asc"),
});

export type LeadListQuery = z.infer<typeof leadListQuerySchema>;
export type BlogListQuery = z.infer<typeof blogListQuerySchema>;
export type OfficeListQuery = z.infer<typeof officeListQuerySchema>;
