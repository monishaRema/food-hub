"use server";

import { ApiError } from "@/lib/api/errors";
import { createProviderMeal } from "@/lib/api/provider.server";
import { CreateMealPayload } from "@/types/providers.type";
import { revalidatePath } from "next/cache";

export async function createMealAction(data: CreateMealPayload) {
  try {
    await createProviderMeal(data);
    revalidatePath(`/dashboard/provider/meals`);
  } catch (error) {
    if (error instanceof ApiError) {
      throw new Error(error.message);
    }

    throw new Error(
      error instanceof Error
        ? error.message
        : "Unable to create meal right now.",
    );
  }
}
