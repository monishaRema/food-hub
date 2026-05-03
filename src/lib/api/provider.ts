
import { apiFetch } from "@/lib/api/apiFetch";
import type {
  DietaryType,
  Meal,
  MealAvailability,
} from "@/types/meal";
import type {
  ProviderOrder,
  ProviderOrdersListResult,
  ProviderOrderStatusUpdate,
} from "@/types/order";


export type RegisterProviderPayload = {
  shopName: string;
  address: string;
  shopImage?: string;
};


export async function registerProviderProfile(payload:RegisterProviderPayload){
  return apiFetch("/provider/profile","POST",payload)
}


export type CreateMealPayload = {
  name: string;
  image: string;
  price: number;
  dietary: DietaryType;
  excerpt: string;
  details: string;
  categoryId: string;
  isFeatured?: boolean;
  availability?: MealAvailability;
};

export type UpdateMealPayload = CreateMealPayload;


type ProviderOrdersApiShape =
  | ProviderOrder[]
  | {
      data?: ProviderOrder[];
      orders?: ProviderOrder[];
      meta?: {
        page?: number;
        limit?: number;
        total?: number;
        totalPages?: number;
      };
      page?: number;
      limit?: number;
      total?: number;
      totalPages?: number;
    };

export async function createProviderMeal(payload: CreateMealPayload) {
  return apiFetch<Meal>("/provider/meals", "POST", payload);
}

export async function updateProviderMeal(id: string, payload: UpdateMealPayload) {
  return apiFetch<Meal>(`/provider/meals/${id}`, "PATCH", payload);
}

export async function deleteProviderMeal(id: string) {
  return apiFetch<void>(`/provider/meals/${id}`, "DELETE");
}


export async function getMealByProvider(){
   return apiFetch<Meal[]>("/provider/meals");
}

export async function getProviderMealById(id: string) {
  return apiFetch<Meal>(`/provider/meals/${id}`);
}




export async function updateProviderOrderStatus(
  id: string,
  status: ProviderOrderStatusUpdate,
) {
  return apiFetch<ProviderOrder>(`/provider/orders/${id}/status`, "PATCH", {
    status,
  });
}
