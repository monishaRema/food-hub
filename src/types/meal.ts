export const dietaryTypes = ["VEG", "NON_VEG", "VEGAN"] as const;

export const mealAvailabilityValues = ["AVAILABLE", "UNAVAILABLE"] as const;

export type DietaryType = (typeof dietaryTypes)[number];

export type MealAvailability = (typeof mealAvailabilityValues)[number];

export type DietaryTypeValue = DietaryType;

export type MealAvailabilityValue = MealAvailability;

export interface MealCategory {
  id?: string;
  name: string;
}

export interface Meal {
  id: string;
  providerId?: string;
  categoryId?: string;
  name: string;
  price: number;
  image?: string;
  excerpt?: string;
  details?: string;
  dietary?: DietaryType;
  availability?: MealAvailability;
  isFeatured?: boolean;
  createdAt?: string;
  updatedAt?: string;
  category?: MealCategory;
}

export interface FeaturedMeal {
  id: string;
  name: string;
  image?: string;
  price: number;
  providerId: string;
  dietary?: DietaryType;
  excerpt?: string;
  isFeatured: boolean;
  availability?: MealAvailability;
  category?: {
    name: string;
  };
}

export interface GetMealsParams {
  page?: string;
  limit?: string;
  sortBy?: "name" | "price" | "createdAt" | "updatedAt";
  sortOrder?: "asc" | "desc";
  search?: string | undefined;
}
