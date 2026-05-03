"use server";

import { ApiError } from "@/lib/api/errors";
import { deleteProviderMeal } from "@/lib/api/provider.server";
import { revalidatePath } from "next/cache";


export async function deleteMealAction(id: string) {
  try {
    await deleteProviderMeal(id);
    revalidatePath(`/dashboard/provider/meals`);
   
    
  } catch (error) {
    if (error instanceof ApiError) {
      throw new Error(error.message);
    }

    throw new Error(
      error instanceof Error
        ? error.message
        : "Unable to delete the meal right now.",
    );
  }
}
