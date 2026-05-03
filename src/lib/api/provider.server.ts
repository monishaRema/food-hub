import "server-only";

import { apiFetchServer } from "@/lib/api/apiFetchServer";
import type { Meal } from "@/types/meal";
import type {
  ProviderOrder,
  ProviderOrderStatusUpdate,
} from "@/types/order";
import { ApiFetchResult } from "@/types/api";
import { QuerySearchType } from "../schema";

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





export async function getProviderOrders(params:QuerySearchType) {
  const searchParams = new URLSearchParams();

  if (params.page !== undefined)
    searchParams.set("page", String(params.page));

  if (params.limit !== undefined)
    searchParams.set("limit", String(params.limit));

  const query = searchParams.toString();

// /provider/orderspage=1&limit=2?
  const response = await apiFetchServer<ApiFetchResult<ProviderOrder>>(
    `/provider/orders${query? `?${query}`: ""}`,
    {
      cache: "no-store",
    },
  );

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
