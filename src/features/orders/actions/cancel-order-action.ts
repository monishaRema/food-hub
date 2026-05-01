"use server";

import { ApiError } from "@/lib/api/errors";
import { cancelOrder } from "@/lib/api/orders.server";

type CancelOrderActionResult =
  | {
      success: true;
    }
  | {
      success: false;
      message: string;
      reason?: "unauthorized";
    };

export async function cancelOrderAction(
  id: string,
): Promise<CancelOrderActionResult> {
  try {
    await cancelOrder(id);

    return {
      success: true,
    };
  } catch (error) {
    if (error instanceof ApiError) {
      return {
        success: false,
        message: error.message,
        reason: error.status === 401 ? "unauthorized" : undefined,
      };
    }

    return {
      success: false,
      message:
        error instanceof Error ? error.message : "Unable to cancel this order.",
    };
  }
}
