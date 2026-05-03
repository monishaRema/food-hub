import "server-only";

import { apiFetchServer } from "@/lib/api/apiFetchServer";
import type { Meal } from "@/types/meal";
import type { ProviderOrder, ProviderOrderStatusUpdate } from "@/types/order";
import { ApiFetchResult } from "@/types/api";
import { QuerySearchType } from "../schema";
import { getQuery } from "../utils/query";
import { UpdateMealPayload } from "@/types/providers.type";


export async function getProviderMeals(params: QuerySearchType) {

  const query = getQuery(params)
  return apiFetchServer<ApiFetchResult<Meal>>(`/provider/meals${query? `?${query}`: ""}`, {
    cache: "no-store",
  });
}

export async function getProviderMealById(id: string) {
  return apiFetchServer<Meal>(`/provider/meals/${id}`, {
    cache: "no-store",
  });
}

export async function getProviderOrders(params: QuerySearchType) {
  const query = getQuery(params);
  const response = await apiFetchServer<ApiFetchResult<ProviderOrder>>(
    `/provider/orders${query ? `?${query}` : ""}`,
    {
      cache: "no-store",
    },
  );

  return response;
}

export async function updateMealByProvider(id:string,data:UpdateMealPayload){

  const response = await apiFetchServer(`/provider/meals/${id}`,{
    method:"PATCH",
    data:data,
    cache:"no-store"
  })

  return response

}

export async function updateProviderOrderStatusServer(
  id: string,
  status: ProviderOrderStatusUpdate,
) {
  const response = await apiFetchServer<ProviderOrder>(
    `/provider/orders/${id}/status`,
    {
      method: "PATCH",
      data: { status },
      cache: "no-store",
    },
  );

  return response.data;
}
