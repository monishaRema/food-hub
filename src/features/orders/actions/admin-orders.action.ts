"use server";

import { QuerySearchType } from "@/lib/schema";

import { ApiError } from "@/lib/api/errors";
import { getAdminOrders, getAdminSingleOrders } from "@/lib/api/orders.server";

export async function getAdminOrdersAction(params: QuerySearchType) {
  try {
   return await getAdminOrders(params);
  } catch (error) {
    if (error instanceof ApiError) {
      throw new Error(error.message);
    }

    throw new Error(
      error instanceof Error
        ? error.message
        : "Unable to get orders right now.",
    );
  }
}
export async function getAdminSingleOrderAction(id: string) {
  try {
   return await getAdminSingleOrders(id);
  } catch (error) {
    if (error instanceof ApiError) {
      throw new Error(error.message);
    }

    throw new Error(
      error instanceof Error
        ? error.message
        : "Unable to get the order right now.",
    );
  }
}
