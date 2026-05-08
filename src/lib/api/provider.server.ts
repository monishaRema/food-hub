
import "server-only";

import { apiFetchServer } from "@/lib/api/apiFetchServer";
import type { Meal } from "@/types/meal";
import type { ProviderOrder, ProviderOrderStatusUpdate } from "@/types/order";
import { QuerySearchType } from "../schema";
import { getQuery } from "../utils/query";
import { CreateMealPayload, RegisterProviderPayload, UpdateMealPayload } from "@/types/providers.type";


export async function getProviderMeals(params: QuerySearchType) {

  const query = getQuery(params)
  return apiFetchServer<Meal[]>(`/api/provider/meals${query? `?${query}`: ""}`, {
    cache: "no-store",
    forwardCookies: true,
  });
}

export async function getProviderMealById(id: string) {
  const response = await apiFetchServer<Meal>(`/api/provider/meals/${id}`, {
    cache: "no-store",
    forwardCookies: true,
  });

  if (!response.data) {
    throw new Error("Meal not found.");
  }

  return response.data;
}

export async function getProviderOrders(params: QuerySearchType) {
  const query = getQuery(params);
  const response = await apiFetchServer<ProviderOrder[]>(
    `/api/provider/orders${query ? `?${query}` : ""}`,
    {
      cache: "no-store",
      forwardCookies: true,
    },
  );

  return response;
}

export async function updateMealByProvider(id:string,data:UpdateMealPayload){

  const response = await apiFetchServer<Meal>(`/api/provider/meals/${id}`,{
    method:"PATCH",
    data:data,
    cache:"no-store",
    forwardCookies: true,
  })

  return response

}



export async function deleteProviderMeal(id: string) {
  return apiFetchServer<void>(`/api/provider/meals/${id}`, {
    method:"DELETE",
    forwardCookies: true,
  });
}

export async function createProviderMeal(payload: CreateMealPayload) {
  return apiFetchServer<Meal>("/api/provider/meals", {
    method:"POST",
    data:payload,
    cache:"no-store",
    forwardCookies: true,
  });
}


export async function registerProviderProfile(payload:RegisterProviderPayload){
  return apiFetchServer("/api/provider/profile",{
    method:"POST",
    data:payload,
    cache:"no-store",
    forwardCookies: true,
  })
}

export async function updateProviderOrderStatus(
  id: string,
  status: ProviderOrderStatusUpdate,
) {


  return apiFetchServer<ProviderOrder>(`/api/provider/orders/${id}/status`, {
    method:"PATCH", 
    data:{status},
    cache:"no-store",
    forwardCookies: true,
  });
}
