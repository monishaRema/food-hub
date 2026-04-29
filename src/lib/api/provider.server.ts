import "server-only";

import { apiFetchServer } from "@/lib/api/apiFetchServer";
import type { Meal } from "@/types/meal";

export async function getProviderMeals() {
  return apiFetchServer<Meal[]>("/provider/meals", {
    cache: "no-store",
  });
}

export async function getProviderMealById(id: string) {
  return apiFetchServer<Meal>(`/provider/meals/${id}`, {
    cache: "no-store",
  });
}
