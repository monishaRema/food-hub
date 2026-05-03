"use server";

import { tags } from "@/constants/cache";
import { ApiError } from "@/lib/api/errors";
import { createReview } from "@/lib/api/meals.api";
import type { CreateReviewType } from "@/types/meal";
import { revalidateTag } from "next/cache";

type CreateReviewActionResult =
  | {
      success: true;
    }
  | {
      success: false;
      message: string;
      reason?: "unauthorized" | "validation";
    };

export async function createReviewAction(
  data: CreateReviewType,
): Promise<CreateReviewActionResult> {
  if (!data.mealId.trim()) {
    return {
      success: false,
      message: "Meal id is required.",
      reason: "validation",
    };
  }

  if (!data.orderId.trim()) {
    return {
      success: false,
      message: "Order id is required.",
      reason: "validation",
    };
  }

  try {
    const response = await createReview(data);

    if (response.data) {
      revalidateTag(tags.meals, "max");
    }

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
        error instanceof Error
          ? error.message
          : "Unable to submit your review right now.",
    };
  }
}
