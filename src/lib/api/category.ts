import { apiFetch } from "@/lib/api/apiFetch";
import type { Category } from "@/types/category";
import type { CreateCategoryPayload } from "@/lib/schema/category.schema";

export async function createCategoryClient(data: CreateCategoryPayload) {
  return apiFetch<Category>("/admin/category", "POST", data);
}
