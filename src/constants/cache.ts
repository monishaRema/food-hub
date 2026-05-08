export const tags = {
  meals: "meals",
  featuredMeals: "featured-meals",
  providers: "providers",
  providerMeals: "provider-meals",
  categories: "categories",
  users: "users",
} as const;

export const revalidateInSeconds = {
  catalog: 300,
  dashboard: 60,
} as const;
