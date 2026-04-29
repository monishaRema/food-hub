import * as z from "zod";

import { DietaryType, MealAvailability } from "@/constants";

export const createMealSchema = z.object({
  name: z.string().trim().min(1, "Meal name is required"),
  image: z.string().trim().pipe(z.url({ message: "Meal image must be a valid URL" })),
  price: z.coerce.number().positive("Price must be greater than 0"),
  dietary: z.enum(DietaryType, {
    message: "Dietary type must be one of VEG, NON_VEG, or VEGAN",
  }),
  excerpt: z
    .string()
    .trim()
    .min(1, "Meal excerpt is required")
    .max(100, "Excerpt can not be more than 100 char"),
  details: z.string().trim().min(1, "Meal details is required"),
  categoryId: z.string().trim().pipe(z.uuid({ message: "Invalid category id" })),
  isFeatured: z.boolean().optional(),
  availability: z
    .enum(MealAvailability, {
      message: "Availability must be AVAILABLE or UNAVAILABLE",
    })
    .optional(),
});

export type CreateMealFormValues = z.input<typeof createMealSchema>;

export type CreateMealValues = z.output<typeof createMealSchema>;



export const updateMealSchema = z
  .object({
    name: z.string().trim().min(1, "Meal name is required").optional(),
    image: z
      .string()
      .pipe(z.url({ message: "Meal image must be a valid URL" }))
      .optional(),
    price: z.coerce
      .number()
      .positive("Price must be greater than 0")
      .optional(),
    dietary: z
      .enum(DietaryType, {
        message: "Dietary type must be one of VEG, NON_VEG, or VEGAN",
      })
      .optional(),
    excerpt: z
      .string()
      .trim()
      .min(1, "Meal excerpt is required")
      .max(100, "Excerpt can not be more than 100 char")
      .optional(),
    details: z.string().trim().min(1, "Meal details is required").optional(),
    categoryId: z
      .string()
      .pipe(z.uuid({ message: "Invalid category id" }))
      .optional(),
    isFeatured: z.boolean().optional(),
    availability: z
      .enum(MealAvailability, {
        message: "Availability must be AVAILABLE or UNAVAILABLE",
      })
      .optional(),
  })
  .refine((data) => Object.keys(data).length > 0, {
    message: "At least one field is required to update meal",
  });

export type UpdateMealSchemaType = z.infer<typeof updateMealSchema>;