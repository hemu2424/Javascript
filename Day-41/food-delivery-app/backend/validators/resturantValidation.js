import { z } from "zod";


const createRestaurantSchema = z.object({
  name: z.string().min(2, "Restaurant name must be at least 2 characters"),
  description: z.string().optional(),
  cuisine: z.string().optional(),
  address: z.string().optional(),
});


const updateRestaurantSchema = createRestaurantSchema
  .extend({
  
    isActive: z
      .transform((val) => val === "true")
      .optional(),
  })
  .partial();

export { createRestaurantSchema, updateRestaurantSchema };