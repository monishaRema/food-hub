"use server";

import { tags } from "@/constants/cache";
import { createCategory } from "@/lib/api/category.server";
import { ApiError } from "@/lib/api/errors";
import {  revalidateTag } from "next/cache";

type CreateCategoryActionResult =
  | {
      success: true;
    }
  | {
      success: false;
      message: string;
      reason?: "unauthorized" | "forbidden" | "validation";
    };

export async function createCategoryAction(input: {
  name: string;
}): Promise<CreateCategoryActionResult> {
  try {
    await createCategory(input);
    revalidateTag(tags.categories, "max")

    return {
      success: true,
    };
  } catch (error) {
    if (error instanceof ApiError) {
      return {
        success: false,
        message: error.message,
        reason:
          error.status === 401
            ? "unauthorized"
            : error.status === 403
              ? "forbidden"
              : error.status === 400
                ? "validation"
                : undefined,
      };
    }

    return {
      success: false,
      message: "Unable to create category right now.",
    };
  }
}