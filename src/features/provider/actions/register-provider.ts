import {
  registerProviderProfile,
  type RegisterProviderPayload,
} from "@/lib/api/provider";

export async function registerProvider(payload: RegisterProviderPayload) {
  return registerProviderProfile(payload);
}
