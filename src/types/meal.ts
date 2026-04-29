import { DietaryType, MealAvailability } from "@/constants";

export type DietaryTypeValue = (typeof DietaryType)[number];

export type MealAvailabilityValue = (typeof MealAvailability)[number];

export type Meal = {
  id: string;
  providerId?: string;
  name?: string;
  image?: string;
  price?: string | number;
  dietary?: DietaryTypeValue;
  excerpt?: string;
  details?: string;
  category?: {
    name?: string;
  };
  categoryId?: string;
  isFeatured?: boolean;
  availability?: MealAvailabilityValue;
  createdAt?: string;
  updatedAt?: string;
};
