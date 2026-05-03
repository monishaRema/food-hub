import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { updateProviderOrderStatusAction } from "@/features/provider/actions/update-provider-order-status.action";
import { ProviderOrderStatusSubmitButton } from "@/features/provider/components/provider-order-status-submit-button";
import {
  formatCurrency,
  formatDateTime,
  formatDisplayValue,
  formatEnumLabel,
} from "@/lib/utils/format";
import type {
  ProviderOrder,
  ProviderOrderStatus,

} from "@/types/order";

function getStatusVariant(status?: ProviderOrderStatus) {
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

function getCustomerLabel(order: ProviderOrder) {
  return order.user?.name || order.user?.email || "Unknown customer";
}


function getItemCount(order: ProviderOrder) {
  return order.orderItems.reduce((total, item) => total + item.quantity, 0);
}




export function AdminOrdersTable({ orders }: { orders: ProviderOrder[] }) {
  return (
    <div className="overflow-hidden rounded-[28px] border border-[#eadfd2] bg-white shadow-sm">
      <div className="border-b border-[#f1e5d7] px-6 py-5">
        <h2 className="text-xl font-semibold text-stone-900">Provider orders</h2>
        <p className="mt-1 text-sm text-stone-600">
          Review incoming orders and move them through the fulfillment flow.
        </p>
      </div>

      <Table>
        <TableHeader>
          <TableRow className="border-[#f1e5d7] bg-stone-50/80 hover:bg-stone-50/80">
            <TableHead className="px-6 py-4">Order</TableHead>
            <TableHead>Customer</TableHead>
            <TableHead>Provider</TableHead>
            <TableHead className="">Quantity</TableHead>
            <TableHead>Delivery Address</TableHead>
            <TableHead className="">Total</TableHead>
            <TableHead>Status</TableHead>

          </TableRow>
        </TableHeader>

        <TableBody>
          {orders.length === 0 ? (
            <TableRow>
              <TableCell
                colSpan={8}
                className="px-6 py-10 text-center text-sm text-stone-500"
              >
                No orders found yet.
              </TableCell>
            </TableRow>
          ) : (
            orders.map((order) => {
             

              return (
                <TableRow
                  key={order.id}
                  className="border-[#f7ede2] hover:bg-[#fffaf5]"
                >
                  <TableCell className="px-6 py-4">
                    <div className="min-w-[200px]">
                      <p className="font-medium text-stone-900">
                        #{order.id.slice(0, 8)}
                      </p>
                      <p className="mt-1 text-sm text-stone-600">
                        {formatDateTime(order.createdAt)}
                      </p>
                    </div>
                  </TableCell>

                  <TableCell className="text-stone-600">
                    {getCustomerLabel(order)}
                  </TableCell>
                  <TableCell className="text-stone-600">
                    {order.provider.shopName}
                  </TableCell>

            

                  <TableCell className=" font-medium text-stone-900">
                    {getItemCount(order)}
                  </TableCell>

                  <TableCell className="text-sm text-stone-600">
                    <div className="min-w-[220px]">
                      <p>{formatDisplayValue(order.deliveryAddress)}</p>
                      <p className="mt-1 text-xs text-stone-500">
                        {formatDisplayValue(order.contactPhone)}
                      </p>
                    </div>
                  </TableCell>

                  <TableCell className=" font-medium text-stone-900">
                    {formatCurrency(order.totalAmount)}
                  </TableCell>

                  <TableCell>
                    <Badge variant={getStatusVariant(order.status)}>
                      {formatEnumLabel(order.status)}
                    </Badge>
                  </TableCell>
                </TableRow>
              );
            })
          )}
        </TableBody>
      </Table>
    </div>
  );
}
