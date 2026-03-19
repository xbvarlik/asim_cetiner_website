import { z } from "zod";

export const createBlogPostSchema = z.object({
  title: z.string().min(1, "Title is required").max(255),
  content: z.string().min(1, "Content is required"),
  isActive: z.boolean().optional(),
});

export const updateBlogPostSchema = createBlogPostSchema.partial();
