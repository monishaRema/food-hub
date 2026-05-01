import { z } from "zod";

export const mealPageQuerySchema = z
  .object({
    search: z.string().trim().optional().catch(undefined),

    page: z.coerce.number().int().positive().catch(1),

    limit: z.coerce.number().int().positive().max(100).catch(8),

    sortBy: z
      .enum(["createdAt", "updatedAt", "price", "name"])
      .catch("createdAt"),

    sortOrder: z.enum(["asc", "desc"]).catch("desc"),
  })
  .strip();

export const providerQuerySchema = z
  .object({
    search: z.string().trim().optional().catch(undefined),

    page: z.coerce.number().int().positive().catch(1),

    limit: z.coerce.number().int().positive().max(100).catch(10),

    sortBy: z
      .enum(["createdAt", "updatedAt", "shopName"])
      .catch("createdAt"),

    sortOrder: z.enum(["asc", "desc"]).catch("desc"),
  })
  .strip();

export const adminUserQuerySchema = z
  .object({
    page: z.coerce.number().int().positive().catch(1),
    limit: z.coerce.number().int().positive().max(100).catch(10),
  })
  .strip();

