import { apiFetchServer } from "@/lib/api/apiFetchServer";
import { ApiError } from "@/lib/api/errors";
import type { FeaturedMeal, GetMealsParams, Meal, SingleMeal } from "@/types/meal";

export async function getMeals(params: GetMealsParams = {}) {
  const searchParams = new URLSearchParams();

  if (params.page !== undefined)
    searchParams.set("page", String(params.page));

  if (params.limit !== undefined)
    searchParams.set("limit", String(params.limit));

  if (params.sortBy)
    searchParams.set("sortBy", params.sortBy);

  if (params.sortOrder)
    searchParams.set("sortOrder", params.sortOrder);

  if (params.search)
    searchParams.set("search", params.search);

  const query = searchParams.toString();

  const meals = await apiFetchServer<Meal[]>(
    `/meals${query ? `?${query}` : ""}`,
    {
      revalidate: 60,
      tags: ["meals"],
    }
  );

  return meals;
}

export async function getFeaturedMeal(params?: Record<string, string>) {
  const query = params ? `?${new URLSearchParams(params).toString()}` : "";

  const response = await apiFetchServer<FeaturedMeal[]>(
    `/meals/featured${query}`,
  );

  return response.data ?? [];
}

export async function getSingleMeal(id: string) {
  const response = await apiFetchServer<SingleMeal>(`/meals/${id}`, {
    cache: "no-store",
  });

  if (!response.data) {
    throw new ApiError(response.message || "Meal not found.", response.statusCode);
  }

  return response.data;
}
