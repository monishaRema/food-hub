
export const UserRole =  {
  CUSTOMER : "CUSTOMER", 
  PROVIDER : "PROVIDER",
  ADMIN: "ADMIN"
} as const

export const  UserStatus =  {
  ACTIVE : "ACTIVE", 
  SUSPENDED: "SUSPENDED"
} as const



export const DietaryType = {VEG:"VEG", NON_VEG: "NON_VEG", VEGAN: "VEGAN"} as const;
export const DietaryTypeArr = ["VEG", "NON_VEG", "VEGAN"]

export const MealAvailability = {AVAILABLE: "AVAILABLE", UNAVAILABLE:  "UNAVAILABLE"} as const;
export const MealAvailabilityArr = ["AVAILABLE" , "UNAVAILABLE"]

export const ProviderOrderStatusFlow = {
  PENDING: "CONFIRMED",
  CONFIRMED: "PREPARING",
  PREPARING: "READY",
  READY: "DELIVERED",
} as const;
