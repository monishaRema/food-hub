
import { apiFetch } from "@/lib/api/apiFetch";
import type {
  Meal,
} from "@/types/meal";
import type {
  ProviderOrder,
  ProviderOrderStatusUpdate,
} from "@/types/order";
import { CreateMealPayload } from "@/types/providers.type";


export type RegisterProviderPayload = {
  shopName: string;
  address: string;
  shopImage?: string;
};


export async function registerProviderProfile(payload:RegisterProviderPayload){
  return apiFetch("/provider/profile","POST",payload)
}


export async function createProviderMeal(payload: CreateMealPayload) {
  return apiFetch<Meal>("/provider/meals", "POST", payload);
}




export async function updateProviderOrderStatus(
  id: string,
  status: ProviderOrderStatusUpdate,
) {
  return apiFetch<ProviderOrder>(`/provider/orders/${id}/status`, "PATCH", {
    status,
  });
}
