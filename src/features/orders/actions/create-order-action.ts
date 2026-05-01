"use server";

import { ApiError } from "@/lib/api/errors";
import { createOrder } from "@/lib/api/orders.server";
import type { CreateOrderType } from "@/types/order";

type CreateOrderActionResult =
  | {
      success: true;
      orderId?: string;
    }
  | {
      success: false;
      message: string;
      reason?: "unauthorized" | "validation";
    };

export async function createOrderAction(
  payload: CreateOrderType,
): Promise<CreateOrderActionResult> {
  if (!payload.deliveryAddress.trim()) {
    return {
      success: false,
      message: "Delivery address is required.",
      reason: "validation",
    };
  }

  if (!payload.contactPhone.trim()) {
    return {
      success: false,
      message: "Contact phone is required.",
      reason: "validation",
    };
  }

  if (!Array.isArray(payload.items) || payload.items.length === 0) {
    return {
      success: false,
      message: "Your cart is empty.",
      reason: "validation",
    };
  }

  try {
    const order = await createOrder({
      deliveryAddress: payload.deliveryAddress.trim(),
      contactPhone: payload.contactPhone.trim(),
      items: payload.items.map((item) => ({
        mealId: item.mealId,
        quantity: item.quantity,
      })),
    });

    return {
      success: true,
      orderId: typeof order?.id === "string" ? order.id : undefined,
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
        error instanceof Error
          ? error.message
          : "Unable to create your order right now.",
    };
  }
}
