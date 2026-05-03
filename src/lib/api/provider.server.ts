import "server-only";

import { apiFetchServer } from "@/lib/api/apiFetchServer";
import type { QuerySearchType } from "@/lib/schema";
import type { Meal } from "@/types/meal";
import type { Meta } from "@/types/api";
import type { ProviderOrder, ProviderOrderStatusUpdate } from "@/types/order";

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

type ProviderOrdersApiShape =
  | ProviderOrder[]
  | {
      data?: ProviderOrder[];
      orders?: ProviderOrder[];
      meta?: {
        page?: number;
        limit?: number;
        total?: number;
        totalPages?: number;
      };
      page?: number;
      limit?: number;
      total?: number;
      totalPages?: number;
    };

function normalizeProviderOrdersData(payload: ProviderOrdersApiShape) {
  if (Array.isArray(payload)) {
    return payload;
  }

  return Array.isArray(payload.data)
    ? payload.data
    : Array.isArray(payload.orders)
      ? payload.orders
      : [];
}

function normalizeProviderOrdersMeta(
  payload: ProviderOrdersApiShape,
  fallbackMeta: Meta | null,
): Meta | null {
  if (fallbackMeta) {
    return fallbackMeta;
  }

  if (Array.isArray(payload)) {
    return null;
  }

  const totalItems = payload.meta?.total ?? payload.total;
  const totalPage = payload.meta?.totalPages ?? payload.totalPages;

  if (totalItems === undefined || totalPage === undefined) {
    return null;
  }

  return {
    page: payload.meta?.page ?? payload.page ?? 1,
    limit: payload.meta?.limit ?? payload.limit ?? 10,
    totalItems,
    totalPage,
  };
}

export async function getProviderOrders(
  params?: QuerySearchType,
): Promise<
  {
    data: ProviderOrder[];
    meta: Meta | null;
  }
> {
  const searchParams = new URLSearchParams();
  const query: Partial<QuerySearchType> = params ?? {};

  if (query.page !== undefined) {
    searchParams.set("page", String(query.page));
  }

  if (query.limit !== undefined) {
    searchParams.set("limit", String(query.limit));
  }

  const queryString = searchParams.toString();
  const response = await apiFetchServer<ProviderOrdersApiShape>(
    `/provider/orders${queryString ? `?${queryString}` : ""}`,
    {
      cache: "no-store",
    },
  );

  return {
    data: normalizeProviderOrdersData(response.data ?? []),
    meta: normalizeProviderOrdersMeta(response.data ?? [], response.meta),
  };
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
