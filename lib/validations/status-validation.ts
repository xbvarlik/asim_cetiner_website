import { z } from "zod";

export const createStatusSchema = z.object({
  name: z.string().min(1, "Name is required").max(100),
});

export const updateStatusSchema = createStatusSchema.partial();
