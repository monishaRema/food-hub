import { notFound } from "next/navigation";

import { OrderDetails } from "@/features/orders/components/OrderDetails";
import { isApiError } from "@/lib/api/errors";
import { getSingleOrder } from "@/lib/api/orders.server";
import { redirectIfUnauthorized } from "@/lib/auth/redirect-if-unauthorized";
import type { ParamsIdType } from "@/types";

export default async function SingleOrderPage({ params }: ParamsIdType) {
  const { id } = await params;

  try {
    const order = await getSingleOrder(id);

    if (!order) {
      notFound();
    }

    return <OrderDetails order={order} />;
  } catch (error) {
    redirectIfUnauthorized(error, `/dashboard/customer/my-orders/${id}`);

    if (isApiError(error) && error.status === 404) {
      notFound();
    }

    throw error;
  }
}
