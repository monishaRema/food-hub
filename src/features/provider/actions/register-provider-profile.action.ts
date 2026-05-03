"use server";

import { ApiError } from "@/lib/api/errors";
import { registerProviderProfile } from "@/lib/api/provider.server";
import type { RegisterProviderPayload } from "@/types/providers.type";

export async function registerProviderAction(data: RegisterProviderPayload) {
  try {
    await registerProviderProfile(data);
  } catch (error) {
    if (error instanceof ApiError) {
      throw new Error(error.message);
    }

    throw new Error(
      error instanceof Error
        ? error.message
        : "Unable to register provider right now.",
    );
  }
}
