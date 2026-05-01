import "server-only";

import { apiFetchServer } from "@/lib/api/apiFetchServer";
import type { CreateOrderType, OrderCreateResponse } from "@/types/order";

export async function createOrder(payload: CreateOrderType) {
  const response = await apiFetchServer<OrderCreateResponse>("/orders", {
    method: "POST",
    data: payload,
    cache: "no-store",
  });

  return response.data;
}
