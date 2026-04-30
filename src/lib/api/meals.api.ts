import { apiFetchServer } from "@/lib/api/apiFetchServer";
import type { ApiFetchResult, PaginatedPayload } from "@/types/api";
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

  const response = await apiFetchServer<PaginatedPayload<Meal[]>>(
    `/meals${query ? `?${query}` : ""}`,
    {
      revalidate: 60,
      tags: ["meals"],
    }
  );

  return {
    data: response.data?.data ?? [],
    meta: response.data?.meta ?? response.meta,
  } satisfies ApiFetchResult<Meal[]>;
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
    throw new Error("Meal not found.");
  }

  return response.data;
}
