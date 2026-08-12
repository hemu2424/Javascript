import { z } from "zod";

export const createProductSchema = z.object({
  name: z
    .string()
    .min(2)
    .max(100),

  description: z
    .string()
    .min(10),

  price: z
    .number()
    .min(0),

  stock: z
    .number()
    .int()
    .min(0),

  category: z
    .string()
    .min(2),

  image: z
    .string()
    .url()
    .optional(),
});

export const updateProductSchema = createProductSchema.partial();