import { apiFetchServer } from "@/lib/api/apiFetchServer";
import type { Meal } from "@/types/meal";

export async function getMeals() {
  return apiFetchServer<Meal[]>("/meals", {
    tags: ["meals"],
  });
}
