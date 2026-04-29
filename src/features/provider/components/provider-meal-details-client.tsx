"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, ShieldAlert } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ProviderMealDetails } from "@/features/provider/components/provider-meal-details";
import { ApiError, UnauthorizedError } from "@/lib/api/errors";
import { buildLoginRedirectPath } from "@/lib/auth/login-redirect";
import { getProviderMealById } from "@/lib/api/provider";
import type { Meal } from "@/types/meal";

export function ProviderMealDetailsClient({ mealId }: { mealId: string }) {
  const router = useRouter();
  const [meal, setMeal] = useState<Meal | null>(null);
  const [error, setError] = useState<{ status?: number; message: string } | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    async function loadMeal() {
      try {
        const providerMeal = await getProviderMealById(mealId);

        if (!isMounted) {
          return;
        }

        setMeal(providerMeal);
        setError(null);
      } catch (err) {
        if (!isMounted) {
          return;
        }

        if (err instanceof UnauthorizedError) {
          router.replace(buildLoginRedirectPath(`/dashboard/providers/meals/${mealId}`));
          return;
        }

        if (err instanceof ApiError) {
          setError({ status: err.status, message: err.message });
          return;
        }

        setError({
          message:
            err instanceof Error
              ? err.message
              : "We could not load this provider meal right now.",
        });
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }

    void loadMeal();

    return () => {
      isMounted = false;
    };
  }, [mealId, router]);

  if (isLoading) {
    return (
      <Card className="rounded-[28px] border border-[#eadfd2] bg-[#f7f1e9] shadow-sm">
        <CardHeader>
          <CardTitle className="text-2xl text-stone-900">Loading meal</CardTitle>
        </CardHeader>
        <CardContent className="text-sm text-stone-600">
          Fetching the current meal details from your dashboard session.
        </CardContent>
      </Card>
    );
  }

  if (error?.status === 403) {
    return (
      <div className="space-y-6">
        <Button asChild variant="outline" size="sm">
          <Link href="/dashboard/providers/meals">
            <ArrowLeft />
            Back to meals
          </Link>
        </Button>

        <Card className="overflow-hidden rounded-[32px] border border-[#eadfd2] bg-[#ffffff] pt-0 shadow-sm">
          <CardHeader className="space-y-4 bg-amber-50 py-5">
            <div className="flex size-14 items-center justify-center rounded-2xl bg-red-700 text-white shadow-sm">
              <ShieldAlert className="size-7" />
            </div>
            <div className="space-y-2">
              <CardTitle className="text-2xl font-semibold tracking-tight text-stone-900">
                Meal access denied
              </CardTitle>
              <CardDescription className="max-w-2xl text-sm leading-6 text-stone-600">
                {error.message}
              </CardDescription>
            </div>
          </CardHeader>
          <CardContent className="pt-6 text-sm leading-6 text-stone-600">
            The backend only allows providers to view their own meals. Please choose a
            meal from your current provider list.
          </CardContent>
        </Card>
      </div>
    );
  }

  if (error) {
    return (
      <Card className="rounded-[28px] border border-[#eadfd2] bg-[#f7f1e9] shadow-sm">
        <CardHeader>
          <CardTitle className="text-2xl text-stone-900">Meal unavailable</CardTitle>
        </CardHeader>
        <CardContent className="text-sm text-stone-600">{error.message}</CardContent>
      </Card>
    );
  }

  if (!meal) {
    return (
      <Card className="rounded-[28px] border border-[#eadfd2] bg-[#f7f1e9] shadow-sm">
        <CardHeader>
          <CardTitle className="text-2xl text-stone-900">Meal unavailable</CardTitle>
        </CardHeader>
        <CardContent className="text-sm text-stone-600">
          We could not find this meal in the current dashboard session.
        </CardContent>
      </Card>
    );
  }

  return <ProviderMealDetails meal={meal} />;
}
