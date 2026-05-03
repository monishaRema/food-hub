export type OrderStatus =
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

export type ProviderOrderStatus = OrderStatus;

type OrderProvider = {
  id: string;
  shopName: string;
};

type OrderItem = {
  id: string;
  mealId: string;
  mealNameSnapshot: string;
  quantity: number;
  price: number;
};

type BaseOrder = {
  id: string;
  userId: string;
  status: OrderStatus;
  totalAmount: string;
  deliveryAddress: string;
  contactPhone: string;
  createdAt: string;
  provider: OrderProvider;
  orderItems: OrderItem[];
};

export type ProviderOrder = BaseOrder & {
  status: ProviderOrderStatus;
  user: {
    name: string;
    email: string;
  };
};

export type ProviderOrdersListResult = {
  items: ProviderOrder[];
  page: number;
  limit: number;
  total?: number;
  totalPages?: number;
};

export type CustomerOrderProvider = OrderProvider;

export type CustomerOrderItem = Omit<OrderItem, "price"> & {
  price: number | string;
};

export type CustomerOrder = Omit<BaseOrder, "totalAmount" | "orderItems"> & {
  totalAmount: number | string;
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

export type CustomerOrderDetails = Omit<
  BaseOrder,
  "status" | "totalAmount" | "orderItems"
> & {
  status: ProviderOrderStatus;
  totalAmount: string | number;
  orderItems: {
    id: string;
    mealId: string;
    mealNameSnapshot: string;
    quantity: number;
    price: string | number;
  }[];
};

export type AdminOrder = BaseOrder & {
  user: {
    id: string;
    name: string;
    email: string;
  };
};