
import { apiFetch } from "@/lib/api/apiFetch";
import type {
  DietaryTypeValue,
  Meal,
  MealAvailabilityValue,
} from "@/types/meal";

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
  dietary: DietaryTypeValue;
  excerpt: string;
  details: string;
  categoryId: string;
  isFeatured?: boolean;
  availability?: MealAvailabilityValue;
};

export type UpdateMealPayload = CreateMealPayload;

export async function createProviderMeal(payload: CreateMealPayload) {
  return apiFetch<Meal>("/provider/meals", "POST", payload);
}

export async function updateProviderMeal(id: string, payload: UpdateMealPayload) {
  return apiFetch<Meal>(`/provider/meals/${id}`, "PATCH", payload);
}


export async function getMealByProvider(){
   return apiFetch<Meal[]>("/provider/meals");
}

export async function getProviderMealById(id: string) {
  return apiFetch<Meal>(`/provider/meals/${id}`);
}
