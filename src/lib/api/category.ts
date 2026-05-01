"use server";

import type { Category } from "@/types/category";
import { getCategories } from "@/lib/api/category.server";

export async function getCategoriesClient(): Promise<Category[]> {
  return getCategories();
}
