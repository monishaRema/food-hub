import "server-only";

import { apiFetchServer } from "@/lib/api/apiFetchServer";
import type {
  AdminOrder,
  CreateOrderType,
  CustomerOrder,
  CustomerOrderDetails,
  OrderCreateResponse,
} from "@/types/order";
import { getQuery } from "../utils/query";
import { QuerySearchType } from "../schema";

export async function createOrder(payload: CreateOrderType) {
  const response = await apiFetchServer<OrderCreateResponse>("/api/orders", {
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

  const endpoint =
    searchParams.size > 0
      ? `/api/orders?${searchParams.toString()}`
      : "/api/orders";

  return apiFetchServer<CustomerOrder[]>(endpoint, {
    cache: "no-store",
  });
}

export async function getSingleOrder(id: string) {
  const response = await apiFetchServer<CustomerOrderDetails>(`/api/orders/${id}`, {
    cache: "no-store",
  });
  return response.data;
}

export async function cancelOrder(id: string) {
  const response = await apiFetchServer<OrderCreateResponse>(
    `/api/orders/${id}/cancel`,
    {
      method: "PATCH",
      cache: "no-store",
    },
  );

  return response.data;
}

export async function getAdminOrders(params: QuerySearchType) {
  const query = getQuery(params);
  const response = await apiFetchServer<AdminOrder[]>(
    `/api/admin/orders${query ? `?${query}` : ""}`,
    {
      cache: "no-store",
    },
  );

  return response;
}
export async function getAdminSingleOrders(id: string) {
  const response = await apiFetchServer<AdminOrder>(
    `/api/admin/orders/${id}`,
    {
      cache: "no-store",
    },
  );

  return response.data;
}
