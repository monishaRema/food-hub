export const dietaryTypes = ["VEG", "NON_VEG", "VEGAN"] as const;

export const mealAvailabilityValues = ["AVAILABLE", "UNAVAILABLE"] as const;

export type DietaryType = (typeof dietaryTypes)[number];

export type MealAvailability = (typeof mealAvailabilityValues)[number];

export interface MealCategory {
  id?: string;
  name: string;
}

export interface MealReview {
  id: string;
  rating: number;
  content: string;
  createdAt: string;
}

export interface MealProvider {
  shopName: string;
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
  id: Meal["id"];
  name: Meal["name"];
  image?: Meal["image"];
  price: Meal["price"];
  providerId: string;
  dietary?: Meal["dietary"];
  excerpt?: Meal["excerpt"];
  isFeatured: true;
  availability?: Meal["availability"];
  category?: {
    name: string;
  };
}

export interface GetMealsParams {
  page?: number;
  limit?: number;
  sortBy?: "createdAt" | "updatedAt" | "price" | "name";
  sortOrder?: "asc" | "desc";
  search?: string;
}

export interface SingleMeal extends Meal {
  image: string;
  providerId: string;
  details: string;
  dietary: DietaryType;
  excerpt: string;
  isFeatured: boolean;
  availability: MealAvailability;
  createdAt: string;
  updatedAt: string;
  category: MealCategory;
  provider: MealProvider;
  reviews: MealReview[];
}
