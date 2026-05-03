"use server";

import { ApiError } from "@/lib/api/errors";
import { updateMealByProvider } from "@/lib/api/provider.server";
import { UpdateMealPayload } from "@/types/providers.type";
import { revalidatePath } from "next/cache";


export async function updateMealAction(id: string, data: UpdateMealPayload) {
  try {
    await updateMealByProvider(id, data);
    revalidatePath(`/dashboard/provider/meals/${id}`);
   
    
  } catch (error) {
    if (error instanceof ApiError) {
      throw new Error(error.message);
    }

    throw new Error(
      error instanceof Error
        ? error.message
        : "Unable to update the meal right now.",
    );
  }
}
