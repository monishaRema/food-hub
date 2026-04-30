import "server-only";

import { apiFetchServer } from "@/lib/api/apiFetchServer";
import type { Category } from "@/types/category";

export async function getCategories() {
  const response = await apiFetchServer<Category[]>("/admin/category", {
    tags: ["categories"],
  });

  return response.data ?? [];
}
