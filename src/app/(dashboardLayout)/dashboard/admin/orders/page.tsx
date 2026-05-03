import { DashboardPageShell } from "@/components/shared/dashboard-page-shell";
import PaginationControls from "@/components/shared/pagination-control";
import { getAdminOrdersAction } from "@/features/orders/actions/admin-orders.action";
import { AdminOrdersTable } from "@/features/orders/components/AdminOrderTable";
import { ProviderOrdersTable } from "@/features/provider/components/provider-orders-table";
import { isApiError } from "@/lib/api/errors";
import { getAdminOrders } from "@/lib/api/orders.server";
import { redirectIfUnauthorized } from "@/lib/auth/redirect-if-unauthorized";
import { querySearchSchema } from "@/lib/schema";
import { SearchParamsType } from "@/types";


export default async function AdminOrdersPage({searchParams}:SearchParamsType) {

  const rawQuery = await searchParams
  const query = querySearchSchema.parse(rawQuery)
  
try {
    const orders = await getAdminOrdersAction(query);

   
    return (
      <section className="py-10">
        <div className="container mx-auto px-6">
          <AdminOrdersTable orders={orders.data || []} />
          {orders.meta ? <PaginationControls meta={orders.meta} /> : null}
        </div>
      </section>
    );
  } catch (error) {
    redirectIfUnauthorized(error, "/dashboard/provider/orders");

    if (isApiError(error)) {
      return (
        <section className="py-10">
          <div className="container mx-auto px-6">
            <div className="rounded-[28px] border border-red-200 bg-red-50 px-6 py-5 text-sm text-red-700">
              {error.message || "Unable to load provider orders right now."}
            </div>
          </div>
        </section>
      );
    }

    throw error;
  }
}
