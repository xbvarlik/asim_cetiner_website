import { z } from "zod";

export const createOfficeSchema = z.object({
  name: z.string().min(1, "Name is required").max(255),
  address: z.string().min(1, "Address is required").max(500),
  mapsLink: z.string().url("Must be a valid URL").max(2000).optional(),
});

export const updateOfficeSchema = createOfficeSchema.partial();
