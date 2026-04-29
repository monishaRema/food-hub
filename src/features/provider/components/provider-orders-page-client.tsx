"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ProviderOrdersTable } from "@/features/provider/components/provider-orders-table";
import { ApiError, UnauthorizedError } from "@/lib/api/errors";
import { buildLoginRedirectPath } from "@/lib/auth/login-redirect";
import {
  getProviderOrders,
  updateProviderOrderStatus,
} from "@/lib/api/provider";
import type {
  ProviderOrder,
  ProviderOrdersListResult,
  ProviderOrderStatusUpdate,
} from "@/types/order";

const DEFAULT_PAGE = 1;
const DEFAULT_LIMIT = 10;

export function ProviderOrdersPageClient() {
  const router = useRouter();
  const [ordersResult, setOrdersResult] = useState<ProviderOrdersListResult>({
    items: [],
    page: DEFAULT_PAGE,
    limit: DEFAULT_LIMIT,
  });
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(DEFAULT_PAGE);
  const [updatingOrderId, setUpdatingOrderId] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    async function loadOrders() {
      setIsLoading(true);

      try {
        const providerOrders = await getProviderOrders({
          page: currentPage,
          limit: DEFAULT_LIMIT,
        });

        if (!isMounted) {
          return;
        }

        setOrdersResult(providerOrders);
        setError(null);
      } catch (err) {
        if (!isMounted) {
          return;
        }

        if (err instanceof UnauthorizedError) {
          router.replace(buildLoginRedirectPath("/dashboard/providers/orders"));
          return;
        }

        setError(
          err instanceof Error
            ? err.message
            : "We could not load your provider orders right now.",
        );
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }

    void loadOrders();

    return () => {
      isMounted = false;
    };
  }, [currentPage, router]);

  async function handleUpdateStatus(
    order: ProviderOrder,
    nextStatus: ProviderOrderStatusUpdate,
  ) {
    const toastId = toast.loading(`Updating order to ${nextStatus.toLowerCase()}`);
    setUpdatingOrderId(order.id);

    try {
      const updatedOrder = await updateProviderOrderStatus(order.id, nextStatus);

      setOrdersResult((currentResult) => ({
        ...currentResult,
        items: currentResult.items.map((currentOrder) =>
          currentOrder.id === order.id
            ? {
                ...currentOrder,
                ...updatedOrder,
                status: updatedOrder.status ?? nextStatus,
              }
            : currentOrder,
        ),
      }));

      toast.success("Order status updated successfully", { id: toastId });
    } catch (err) {
      if (err instanceof UnauthorizedError) {
        router.replace(buildLoginRedirectPath("/dashboard/providers/orders"));
        return;
      }

      if (err instanceof ApiError && err.status === 409) {
        toast.error(err.message, { id: toastId });
        return;
      }

      toast.error(
        err instanceof Error ? err.message : "Unable to update order status.",
        { id: toastId },
      );
    } finally {
      setUpdatingOrderId(null);
    }
  }

  const totalPages = ordersResult.totalPages ?? currentPage;

  if (isLoading) {
    return (
      <div className="w-full">
        <Card className="rounded-[28px] border border-[#eadfd2] bg-[#f7f1e9] shadow-sm">
          <CardHeader>
            <CardTitle className="text-2xl text-stone-900">Loading orders</CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-stone-600">
            Fetching provider orders from your dashboard session.
          </CardContent>
        </Card>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full">
        <Card className="rounded-[28px] border border-[#eadfd2] bg-[#f7f1e9] shadow-sm">
          <CardHeader>
            <CardTitle className="text-2xl text-stone-900">
              Provider orders unavailable
            </CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-stone-600">{error}</CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="w-full space-y-4">
      <ProviderOrdersTable
        orders={ordersResult.items}
        updatingOrderId={updatingOrderId}
        onUpdateStatus={handleUpdateStatus}
      />

      <div className="flex items-center justify-between rounded-[24px] border border-[#eadfd2] bg-white px-5 py-4 shadow-sm">
        <p className="text-sm text-stone-600">
          Page {ordersResult.page} of {totalPages}
        </p>

        <div className="flex gap-2">
          <Button
            type="button"
            variant="outline"
            size="sm"
            disabled={currentPage <= 1}
            onClick={() => setCurrentPage((page) => Math.max(1, page - 1))}
          >
            Previous
          </Button>
          <Button
            type="button"
            variant="outline"
            size="sm"
            disabled={currentPage >= totalPages}
            onClick={() => setCurrentPage((page) => page + 1)}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}
