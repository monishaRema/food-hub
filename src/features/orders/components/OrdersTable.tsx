"use client";

import Link from "next/link";
import { startTransition, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  formatCurrency,
  formatDateTime,
  formatDisplayValue,
  formatEnumLabel,
} from "@/lib/utils/format";
import { cancelOrderAction } from "@/features/orders/actions/cancel-order-action";
import { buildLoginRedirectPath } from "@/lib/auth/login-redirect";
import type { CustomerOrder, OrderStatus } from "@/types/order";

function getStatusVariant(status: OrderStatus) {
  if (status === "DELIVERED") {
    return "default";
  }

  if (status === "CANCELLED") {
    return "destructive";
  }

  if (status === "PENDING") {
    return "outline";
  }

  return "secondary";
}

function canCancelOrder(status: OrderStatus) {
  return status === "PENDING";
}


export default function OrdersTable({
  orders,
}: {
  orders: CustomerOrder[];
}) {
  const router = useRouter();
  const [cancellingOrderId, setCancellingOrderId] = useState<string | null>(null);

  async function handleCancelOrder(orderId: string) {
    const toastId = toast.loading("Canceling order");
    setCancellingOrderId(orderId);

    try {
      const result = await cancelOrderAction(orderId);

      if (!result.success) {
        if (result.reason === "unauthorized") {
          router.replace(buildLoginRedirectPath("/dashboard/customer/my-orders"));
          return;
        }

        toast.error(result.message, { id: toastId });
        return;
      }

      toast.success("Order cancelled successfully.", { id: toastId });
      startTransition(() => {
        router.refresh();
      });
    } finally {
      setCancellingOrderId(null);
    }
  }

  return (
    <div className="overflow-hidden rounded-[28px] border border-[#eadfd2] bg-white shadow-sm">
      <div className="border-b border-[#f1e5d7] px-6 py-5">
        <h2 className="text-xl font-semibold text-stone-900">Your orders</h2>
        <p className="mt-1 text-sm text-stone-600">
          Review your recent purchases, delivery details, and the meals included
          in each order.
        </p>
      </div>

      <Table>
        <TableHeader>
          <TableRow className="border-[#f1e5d7] bg-stone-50/80 hover:bg-stone-50/80">
            <TableHead className="px-6 py-4">Order</TableHead>
            <TableHead>Provider</TableHead>
            <TableHead>Items</TableHead>
            <TableHead>Delivery</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Total</TableHead>
            <TableHead>Action</TableHead>

          </TableRow>
        </TableHeader>

        <TableBody>
          {orders.length === 0 ? (
            <TableRow>
              <TableCell
                colSpan={7}
                className="px-6 py-10 text-center text-sm text-stone-500"
              >
                No orders were returned for this page.
              </TableCell>
            </TableRow>
          ) : (
            orders.map((order) => (
              <TableRow key={order.id} className="border-[#f7ede2] hover:bg-[#fffaf5]">
                <TableCell className="px-6 py-4">
                  <div className="min-w-[200px]">
                    <Link href={`/dashboard/customer/my-orders/${order.id}`} className="font-medium text-stone-900 hover:text-orange-500">#{order.id.slice(0, 8)}</Link>
                    <p className="mt-1 text-sm text-stone-600">
                      {formatDateTime(order.createdAt)}
                    </p>
                  </div>
                </TableCell>

                <TableCell className="text-stone-600">
                  <div className="min-w-25">
                    <Link href={`/providers/${order.provider.id}`} className="font-medium text-stone-900 hover:text-orange-500">
                      {order.provider.shopName}
                    </Link>
                   
                  </div>
                </TableCell>

                <TableCell className="text-sm leading-6 text-stone-600">
                  { order.orderItems.length} items
                </TableCell>

                <TableCell className="text-sm text-stone-600">
                  <div className="min-w-[220px]">
                    <p>{order.deliveryAddress}</p>
                    <p className="mt-1 text-xs text-stone-500">
                      {formatDisplayValue(order.contactPhone)}
                    </p>
                  </div>
                </TableCell>

                <TableCell>
                  <Badge variant={getStatusVariant(order.status)}>
                    {formatEnumLabel(order.status)}
                  </Badge>
                </TableCell>

                <TableCell className="font-bold text-stone-900">
                  {formatCurrency(order.totalAmount)}
                </TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <Link href={`/dashboard/customer/my-orders/${order.id}`}>
                      <Button size="sm" variant="link" className="">
                        View
                      </Button>
                    </Link>

                    {canCancelOrder(order.status) ? (
                      <Button
                        size="sm"
                        disabled={cancellingOrderId === order.id}
                        onClick={() => void handleCancelOrder(order.id)}
                      >
                        {cancellingOrderId === order.id ? "Canceling..." : "Cancel"}
                      </Button>
                    ) : null}
                  </div>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}
