export interface Provider {
  id: string;
  userId: string;
  shopName: string;
  address: string;
  shopImage?: string | null;
  createdAt?: string;
  updatedAt?: string;
}

export interface GetProvidersParams {
  page?: number;
  limit?: number;
  sortBy?: "createdAt" | "updatedAt" | "shopName";
  sortOrder?: "asc" | "desc";
  search?: string;
}

export interface ProviderData extends Omit<Provider, "userId"> {
  userId?: string;
}
