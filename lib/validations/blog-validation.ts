import { z } from "zod";

export const createBlogPostSchema = z.object({
  title: z.string().min(1, "Title is required").max(255),
  slug: z.string().min(1, "Slug is required").max(255).regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Invalid slug format"),
  content: z.string().min(1, "Content is required"),
  isActive: z.boolean().optional(),
});

export const updateBlogPostSchema = z.object({
  title: z.string().min(1, "Title is required").max(255).optional(),
  slug: z.string().min(1, "Slug is required").max(255).regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Invalid slug format").optional(),
  content: z.string().min(1, "Content is required").optional(),
  isActive: z.boolean().optional(),
});
