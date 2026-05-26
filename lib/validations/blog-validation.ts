import { z } from "zod";

/** Admin form / API input before slug auto-generation in the service layer. */
export const createBlogPostInputSchema = z.object({
  title: z.string().min(1, "Title is required").max(255),
  content: z.string().min(1, "Content is required"),
  isActive: z.boolean().optional(),
});

export const createBlogPostSchema = createBlogPostInputSchema.extend({
  slug: z
    .string()
    .min(1, "Slug is required")
    .max(255)
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Invalid slug format"),
});

export const updateBlogPostSchema = z.object({
  title: z.string().min(1, "Title is required").max(255).optional(),
  slug: z.string().min(1, "Slug is required").max(255).regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Invalid slug format").optional(),
  content: z.string().min(1, "Content is required").optional(),
  isActive: z.boolean().optional(),
});
