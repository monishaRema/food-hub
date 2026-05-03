import { DashboardPageShell } from "@/components/shared/dashboard-page-shell";
import PaginationControls from "@/components/shared/pagination-control";
import OrdersTable from "@/features/orders/components/OrdersTable";
import { customerOrderQuerySchema } from "@/lib/schema";
import { getOrdersByUser } from "@/lib/api/orders.server";
import type { SearchParamsType } from "@/types";

export default async function MyOrdersPage({
  searchParams,
}: SearchParamsType) {
  const rawSearchParams = await searchParams;
  const query = customerOrderQuerySchema.parse(rawSearchParams);
  const orders = await getOrdersByUser(query);
  const orderItems = orders.data ?? [];
  const totalItems = orders.meta?.totalItems ?? orderItems.length;

  return (
    <main className="space-y-8">
      <DashboardPageShell
        title="My Orders"
        description="Review your order history, track active purchases, and check the provider, delivery, and meal details for each order."
      />

      <section className="rounded-[28px] border border-[#eadfd2] bg-[#f7f1e9] p-6 shadow-sm sm:p-8">
        <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
          <div className="space-y-2">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-stone-500">
              Order History
            </p>
            <h2 className="text-2xl font-semibold tracking-tight text-stone-900">
              Browse your recent orders
            </h2>
          </div>

          <div className="inline-flex rounded-full bg-white px-4 py-2 text-sm font-semibold text-stone-700 ring-1 ring-[#eadfd2]">
            {totalItems} {totalItems === 1 ? "order" : "orders"}
          </div>
        </div>

        <OrdersTable orders={orderItems} />
        {orders.meta ? <PaginationControls meta={orders.meta} /> : null}
      </section>
    </main>
  );
}
