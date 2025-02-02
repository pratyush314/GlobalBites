import { z } from "zod";

export const restaurantFormSchema = z.object({
  restaurantName: z.string().min(1, "Restaurant Name is Required"),
  city: z.string().min(1, "City is Required"),
  country: z.string().min(1, "Country is Required"),
  deliveryTime: z.number().min(1, "Delivery Time cannot be negative"),
  cuisines: z.array(z.string()),
  imageFile: z
    .instanceof(File)
    .optional()
    .refine((file) => file?.size !== 0, "Image file is required"),
});

export type RestaurantFormSchema = z.infer<typeof restaurantFormSchema>;
