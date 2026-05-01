import z from "zod";

export const createCategorySchema = z.object({
    name: z.string().trim().min(1, "Category Name is required")
})

export type CreateCategoryPayload = z.infer<typeof createCategorySchema>