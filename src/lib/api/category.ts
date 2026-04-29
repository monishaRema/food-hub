import { apiFetch } from "@/lib/api/apiFetch";
import type { Category } from "@/types/category";

export async function getCategoriesClient() {
  return apiFetch<Category[]>("/admin/category");
}
