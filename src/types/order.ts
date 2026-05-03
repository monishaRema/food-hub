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
  userId: string;
  status: ProviderOrderStatus;

  totalAmount: string; 

  deliveryAddress: string;
  contactPhone: string;
  createdAt: string;

  provider: {
    id: string;
    shopName: string;
  };

  user: {
    name: string;
    email: string;
  };

  orderItems: {
    id: string; 
    mealId: string;
    mealNameSnapshot: string;
    quantity: number;
    price: number;
  }[];
};

export type ProviderOrdersListResult = {
  items: ProviderOrder[];
  page: number;
  limit: number;
  total?: number;
  totalPages?: number;
};

export type OrderStatus = ProviderOrderStatus;

export type CustomerOrderProvider = {
  id: string;
  shopName: string;
};

export type CustomerOrderItem = {
  id: string;
  mealId: string;
  mealNameSnapshot: string;
  quantity: number;
  price: number | string;
};

export type CustomerOrder = {
  id: string;
  userId: string;
  status: OrderStatus;
  totalAmount: number | string;
  deliveryAddress: string;
  contactPhone: string;
  createdAt: string;
  provider: CustomerOrderProvider;
  orderItems: CustomerOrderItem[];
};

export type CustomerOrdersListResult = {
  items: CustomerOrder[];
  page: number;
  limit: number;
  total?: number;
  totalPages?: number;
};

export type CartItem = {
  mealId: string;
  providerId: string;
  name: string;
  image?: string;
  price: number;
  quantity: number;
};

export type CartMealInput = {
  mealId: string;
  providerId: string;
  name: string;
  image?: string;
  price: number;
};

export type CreateOrderType = {
  deliveryAddress: string;
  contactPhone: string;
  items: {
    mealId: string;
    quantity: number;
  }[];
};

export type OrderCreateResponse = {
  id?: string;
};

export type CustomerOrderDetails = {
  id: string;
  userId: string;
  status: ProviderOrderStatus;
  totalAmount: string | number;
  deliveryAddress: string;
  contactPhone: string;
  createdAt: string;
  provider: {
    id: string;
    shopName: string;
  };
  orderItems: {
    id: string;
    mealId: string;
    mealNameSnapshot: string;
    quantity: number;
    price: string | number;
  }[];
};
