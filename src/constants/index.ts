export const UserRole =  {
  CUSTOMER : "CUSTOMER", 
  PROVIDER : "PROVIDER",
  ADMIN: "ADMIN"
} as const

export const  UserStatus =  {
  ACTIVE : "ACTIVE", 
  SUSPENDED: "SUSPENDED"
} as const

export const DietaryType = ["VEG", "NON_VEG", "VEGAN"] as const;

export const MealAvailability = ["AVAILABLE", "UNAVAILABLE"] as const;

export const ProviderOrderStatusFlow = {
  PENDING: "CONFIRMED",
  CONFIRMED: "PREPARING",
  PREPARING: "READY",
  READY: "DELIVERED",
} as const;
