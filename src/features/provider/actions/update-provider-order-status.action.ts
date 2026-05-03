"use server";

import { revalidatePath } from "next/cache";

import { ApiError } from "@/lib/api/errors";
import { updateProviderOrderStatus } from "@/lib/api/provider.server";
import type { ProviderOrderStatusUpdate } from "@/types/order";

export async function updateProviderOrderStatusAction(
  orderId: string,
  status: ProviderOrderStatusUpdate,
) {
  try {
    await updateProviderOrderStatus(orderId, status);
    revalidatePath("/dashboard/providers/orders");
  } catch (error) {
    if (error instanceof ApiError) {
      throw new Error(error.message);
    }

    throw new Error(
      error instanceof Error
        ? error.message
        : "Unable to update the order status right now.",
    );
  }
}
