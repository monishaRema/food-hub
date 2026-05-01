import Link from "next/link";
import { ArrowLeft, MapPin, Phone, ReceiptText, Store } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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
  formatEnumLabel,
} from "@/lib/utils/format";
import type { CustomerOrderDetails, OrderStatus } from "@/types/order";

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

function DetailCard({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-2xl border border-[#eadfd2] bg-white/80 p-4 shadow-sm">
      <p className="text-xs font-medium uppercase tracking-[0.2em] text-stone-500">
        {label}
      </p>
      <p className="mt-2 text-sm font-semibold text-stone-900">{value}</p>
    </div>
  );
}

export function OrderDetails({ order }: { order: CustomerOrderDetails }) {
  const totalItems = order.orderItems.reduce(
    (total, item) => total + item.quantity,
    0,
  );

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap items-center gap-3">
        <Button asChild variant="outline" size="sm">
          <Link href="/dashboard/my-orders">
            <ArrowLeft />
            Back to orders
          </Link>
        </Button>

        <Button asChild variant="outline" size="sm">
          <Link href={`/providers/${order.provider.id}`}>
            <Store />
            View provider
          </Link>
        </Button>
      </div>

      <section className="overflow-hidden rounded-[32px] border border-[#eadfd2] bg-[#f7f1e9] shadow-sm">
        <div className="bg-[radial-gradient(circle_at_top_left,rgba(249,115,22,0.18),transparent_38%),linear-gradient(135deg,rgba(255,255,255,0.72),rgba(247,241,233,0.94))] p-6 sm:p-8">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex items-start gap-5">
              <div className="flex size-20 shrink-0 items-center justify-center rounded-[24px] border border-white/70 bg-white text-[#f97316] shadow-sm">
                <ReceiptText className="size-9" />
              </div>

              <div className="space-y-3">
                <p className="text-xs font-semibold uppercase tracking-[0.28em] text-stone-500">
                  FoodHub order
                </p>
                <div>
                  <h1 className="text-3xl font-semibold tracking-tight text-stone-900 sm:text-4xl">
                    Order #{order.id.slice(0, 8)}
                  </h1>
                  <p className="mt-2 max-w-2xl text-sm leading-6 text-stone-600">
                    Review the provider, delivery contact, total amount, and
                    item snapshot saved when this order was created.
                  </p>
                </div>
                <div className="flex flex-wrap gap-3">
                  <Badge variant={getStatusVariant(order.status)}>
                    {formatEnumLabel(order.status)}
                  </Badge>
                  <span className="inline-flex items-center rounded-full bg-white px-4 py-2 text-sm font-semibold text-stone-700 ring-1 ring-[#eadfd2]">
                    Provider: {order.provider.shopName}
                  </span>
                </div>
              </div>
            </div>

            <div className="rounded-[28px] border border-[#eadfd2] bg-white px-6 py-5 shadow-sm">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-stone-500">
                Total amount
              </p>
              <p className="mt-3 text-3xl font-semibold text-stone-900">
                {formatCurrency(order.totalAmount)}
              </p>
              <p className="mt-2 text-sm text-stone-500">
                Created {formatDateTime(order.createdAt)}
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <DetailCard label="Provider" value={order.provider.shopName} />
        <DetailCard label="Contact phone" value={order.contactPhone} />
        <DetailCard label="Delivery address" value={order.deliveryAddress} />
        <DetailCard label="Items count" value={String(totalItems)} />
      </section>

      <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_320px]">
        <div className="overflow-hidden rounded-[28px] border border-[#eadfd2] bg-white shadow-sm">
          <div className="border-b border-[#f1e5d7] px-6 py-5">
            <h2 className="text-xl font-semibold text-stone-900">Ordered items</h2>
            <p className="mt-1 text-sm text-stone-600">
              Meal names and prices are shown from the saved order snapshot.
            </p>
          </div>

          <Table>
            <TableHeader>
              <TableRow className="border-[#f1e5d7] bg-stone-50/80 hover:bg-stone-50/80">
                <TableHead className="px-6 py-4">Meal</TableHead>
        
                <TableHead className="text-right">Quantity</TableHead>
                <TableHead className="text-right">Unit price</TableHead>
                <TableHead className="px-6 text-right">Line total</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {order.orderItems.map((item) => (
                <TableRow key={item.id} className="border-[#f7ede2] hover:bg-[#fffaf5]">
                  <TableCell className="px-6 py-4 font-medium text-stone-900">
                    <Link href={`/meals/${item.mealId}`} className="text-base font-semibold text-stone-900 hover:text-orange-500">{item.mealNameSnapshot}</Link>
                  </TableCell>
                
                  <TableCell className="text-right font-medium text-stone-900">
                    {item.quantity}
                  </TableCell>
                  <TableCell className="text-right text-stone-700">
                    {formatCurrency(item.price)}
                  </TableCell>
                  <TableCell className="px-6 text-right font-semibold text-stone-900">
                    {formatCurrency(Number(item.price) * item.quantity)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        <Card className="h-fit rounded-[28px] border border-[#eadfd2] bg-white shadow-sm">
          <CardHeader className="bg-amber-50">
            <CardTitle className="text-2xl text-stone-900">Delivery details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-5 pt-6">
            <div className="rounded-[24px] border border-[#eadfd2] bg-[#fffaf5] p-5">
              <div className="flex items-start gap-3">
                <div className="rounded-full bg-[#fff1e4] p-2 text-[#ff8b2b]">
                  <MapPin className="size-4" />
                </div>
                <div>
                  <p className="text-sm font-semibold uppercase tracking-[0.18em] text-stone-500">
                    Address
                  </p>
                  <p className="mt-2 text-sm leading-6 text-stone-700">
                    {order.deliveryAddress}
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-[24px] border border-[#eadfd2] bg-[#fffaf5] p-5">
              <div className="flex items-start gap-3">
                <div className="rounded-full bg-[#fff1e4] p-2 text-[#ff8b2b]">
                  <Phone className="size-4" />
                </div>
                <div>
                  <p className="text-sm font-semibold uppercase tracking-[0.18em] text-stone-500">
                    Contact phone
                  </p>
                  <p className="mt-2 text-sm leading-6 text-stone-700">
                    {order.contactPhone}
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-[24px] border border-[#eadfd2] bg-[#fffaf5] p-5">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-stone-500">
                Provider
              </p>
              <Link  href={`/providers/${order.provider.id}`} className="mt-2 text-base font-semibold text-stone-900 hover:text-orange-500">
                {order.provider.shopName}
              </Link>
              
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
