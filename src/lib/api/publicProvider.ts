import { apiFetchServer } from "./apiFetchServer";

import type { ApiFetchResult} from "@/types/api";
import { GetMealsParams, Meal } from "@/types/meal";
import type {
  GetProvidersParams,
  Provider,
  ProviderData,
} from "@/types/providers.type";

export async function getPublicProviders(params: GetProvidersParams = {}) {
  const searchParams = new URLSearchParams();

  if (params.page !== undefined) {
    searchParams.set("page", String(params.page));
  }

  if (params.limit !== undefined) {
    searchParams.set("limit", String(params.limit));
  }

  if (params.sortBy) {
    searchParams.set("sortBy", params.sortBy);
  }

  if (params.sortOrder) {
    searchParams.set("sortOrder", params.sortOrder);
  }

  if (params.search) {
    searchParams.set("search", params.search);
  }

  const query = searchParams.toString();

  const response = await apiFetchServer<Provider[]>(
    `/providers${query ? `?${query}` : ""}`,
    {
      revalidate: 60,
      tags: ["providers"],
    },
  );

  return {
    data: response.data ?? [],
    meta: response.meta,
  } satisfies ApiFetchResult<Provider[]>;
}

export async function getSingleProvider(id: string) {
  const response = await apiFetchServer<ProviderData>(`/providers/${id}`, {
    cache: "no-store",
  });

  if (!response.data) {
    throw new Error("Provider not found.");
  }

  return response.data;
}


export async function getMealsByProvider(id:string, params: GetMealsParams = {}) {
  const searchParams = new URLSearchParams();

  if (params.page !== undefined) {
    searchParams.set("page", String(params.page));
  }

  if (params.limit !== undefined) {
    searchParams.set("limit", String(params.limit));
  }

  if (params.sortBy)
    searchParams.set("sortBy", params.sortBy);

  if (params.sortOrder)
    searchParams.set("sortOrder", params.sortOrder);

  if (params.search)
    searchParams.set("search", params.search);

  const query = searchParams.toString();

  const response = await apiFetchServer<Meal[]>(
   `/providers/${id}/meals${query ? `?${query}` : ""}`,
    {
      revalidate: 60,
      tags: ["meals"],
    }
  );


  return {
    data: response.data ?? [],
    meta: response.meta,
  } satisfies ApiFetchResult<Meal[]>;
}
