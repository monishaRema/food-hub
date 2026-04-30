import { apiFetchServer } from "@/lib/api/apiFetchServer";
import { apiFetch } from "@/lib/api/client";
import type { Meal, GetMealsParams } from "@/types/meal";



export async function getMeals(params?: Record<string, string>) {

  
const query = params ? `?${new URLSearchParams(params).toString()}` : "";


  const meals = await apiFetchServer<Meal[]>(`/meals${query}`, {
    revalidate: 60,
    tags: ["meals"],
  });

  return meals
}

export async function getFeaturedMeal(params?: Record<string, string>) {
  const query = params ? `?${new URLSearchParams(params).toString()}` : "";

  return apiFetchServer<Meal[]>(`/meals/featured${query}`);
}
