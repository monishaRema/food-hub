import "server-only";

import { apiFetchServer } from "@/lib/api/apiFetchServer";
import type {
  CreateOrderType,
  CustomerOrder,
  CustomerOrderDetails,
  OrderCreateResponse,
} from "@/types/order";

export async function createOrder(payload: CreateOrderType) {
  const response = await apiFetchServer<OrderCreateResponse>("/orders", {
    method: "POST",
    data: payload,
    cache: "no-store",
  });

  return response.data;
}

type GetOrdersByUserQuery = {
  page?: number;
  limit?: number;
};

export async function getOrdersByUser(query: GetOrdersByUserQuery = {}) {
  const searchParams = new URLSearchParams();

  if (query.page) {
    searchParams.set("page", String(query.page));
  }

  if (query.limit) {
    searchParams.set("limit", String(query.limit));
  }

  const endpoint = searchParams.size > 0
    ? `/orders?${searchParams.toString()}`
    : "/orders";

  return apiFetchServer<CustomerOrder[]>(endpoint, {
    cache: "no-store",
  });
}


export async function getSingleOrder(id: string){
  const response = await apiFetchServer<CustomerOrderDetails>(`/orders/${id}`, {
    cache: "no-store",
  });
  return response.data
}

export async function cancelOrder(id: string) {
  const response = await apiFetchServer<OrderCreateResponse>(`/orders/${id}/cancel`, {
    method: "PATCH",
    cache: "no-store",
  });

  return response.data;
}
