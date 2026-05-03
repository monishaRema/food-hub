
import PaginationControls from "@/components/shared/pagination-control";
import { ProviderOrdersTable } from "@/features/provider/components/provider-orders-table";
import { isApiError } from "@/lib/api/errors";
import { getProviderOrders } from "@/lib/api/provider.server";
import { redirectIfUnauthorized } from "@/lib/auth/redirect-if-unauthorized";
import { querySearchSchema } from "@/lib/schema";
import { SearchParamsType } from "@/types";

export default async function ProviderOrdersPage({searchParams}:SearchParamsType) {

  const rawSearchParams = await searchParams;
    const query = querySearchSchema.parse(rawSearchParams);

  try {
    const orders = await getProviderOrders(query);

   
    return (
      <section className="py-10">
        <div className="container mx-auto px-6">
          <ProviderOrdersTable orders={orders.data || []} />
          {orders.meta ? <PaginationControls meta={orders.meta} /> : null}
        </div>
      </section>
    );
  } catch (error) {
    redirectIfUnauthorized(error, "/dashboard/providers/orders");

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
