import { apiFetch } from "@/lib/api/apiFetch";

export type RegisterProviderPayload = {
  shopName: string;
  address: string;
  shopImage?: string;
};

export async function registerProviderProfile(
  payload: RegisterProviderPayload,
) {
  return apiFetch("/provider/profile", "POST", payload);
}
