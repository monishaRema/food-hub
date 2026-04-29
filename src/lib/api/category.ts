import { apiFetchServer } from "@/lib/api/apiFetchServer";
import type { Category } from "@/types/category";

export async function getCategories() {
  return apiFetchServer<Category[]>("/admin/category", {
    tags: ["categories"],
  });
}
