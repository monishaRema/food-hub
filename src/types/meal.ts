import { DietaryType, MealAvailability } from "@/constants";

export type DietaryTypeValue = (typeof DietaryType)[number];

export type MealAvailabilityValue = (typeof MealAvailability)[number];

export type Meal = {
  id?: string;
  name?: string;
  image?: string;
  price?: number;
  dietary?: DietaryTypeValue;
  excerpt?: string;
  details?: string;
  categoryId?: string;
  isFeatured?: boolean;
  availability?: MealAvailabilityValue;
} & Record<string, unknown>;
