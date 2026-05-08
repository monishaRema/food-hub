import { apiFetchServer } from "@/lib/api/apiFetchServer";
import { revalidateInSeconds, tags } from "@/constants/cache";
import type { ApiFetchResult, PaginatedPayload } from "@/types/api";
import type {
  CreateReviewType,
  FeaturedMeal,
  GetMealsParams,
  Meal,
  ReviewEligibility,
  SingleMeal,
} from "@/types/meal";

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
    `/api/meals${query ? `?${query}` : ""}`,
    {
      revalidate: revalidateInSeconds.catalog,
      tags: [tags.meals],
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
    `/api/meals/featured${query}`,
    {
      revalidate: revalidateInSeconds.catalog,
      tags: [tags.featuredMeals, tags.meals],
    },
  );

  return response.data ?? [];
}

export async function getSingleMeal(id: string) {
  const response = await apiFetchServer<SingleMeal>(`/api/meals/${id}`, {
    cache: "no-store",
  });

  if (!response.data) {
    throw new Error("Meal not found.");
  }

  return response.data;
}


export async function createReview(data: CreateReviewType){
   const response = await apiFetchServer(`/api/reviews`, {
    method: "POST",
    data: data,
    forwardCookies: true,
  });


  return response;
}


export async function checkReviewEligibility(mealId: string){
  const response = await apiFetchServer<ReviewEligibility>(`/api/reviews/eligibility/${mealId}`, {
    cache: "no-store",
    forwardCookies: true,
  });
  return response.data;
}
