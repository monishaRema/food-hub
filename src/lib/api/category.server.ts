import "server-only";

import { apiFetchServer } from "@/lib/api/apiFetchServer";
import type { Category } from "@/types/category";
import { CreateCategoryPayload } from "../schema/category.schema";
import { tags } from "@/constants/cache";

export async function getCategories() {
  const response = await apiFetchServer<Category[]>("/admin/category", {
    tags: [tags.categories],
  });

  return response.data ?? [];
}

export async function createCategory(data: CreateCategoryPayload) {
  const response = await apiFetchServer<Category>("/admin/category", {
    method: "POST",
    data,
  });

  return response.data;
}


