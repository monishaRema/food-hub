export type ProviderOrderStatus =
  | "PENDING"
  | "CONFIRMED"
  | "PREPARING"
  | "READY"
  | "DELIVERED"
  | "CANCELLED";

export type ProviderOrderStatusUpdate =
  | "CONFIRMED"
  | "PREPARING"
  | "READY"
  | "DELIVERED";

export type ProviderOrder = {
  id: string;
  status?: ProviderOrderStatus;
  quantity?: number;
  totalPrice?: number | string;
  totalAmount?: number | string;
  createdAt?: string;
  updatedAt?: string;
  customer?: {
    id?: string;
    name?: string;
    email?: string;
  };
  user?: {
    id?: string;
    name?: string;
    email?: string;
  };
  meal?: {
    id?: string;
    name?: string;
    image?: string;
  };
};

export type ProviderOrdersListResult = {
  items: ProviderOrder[];
  page: number;
  limit: number;
  total?: number;
  totalPages?: number;
};
