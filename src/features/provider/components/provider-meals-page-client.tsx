"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import MealTable from "@/features/provider/components/mealTable";
import { UnauthorizedError } from "@/lib/api/errors";
import { buildLoginRedirectPath } from "@/lib/auth/login-redirect";
import { deleteProviderMeal, getMealByProvider } from "@/lib/api/provider";
import type { Meal } from "@/types/meal";

export function ProviderMealsPageClient() {
  const router = useRouter();
  const [meals, setMeals] = useState<Meal[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [deletingMealId, setDeletingMealId] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    async function loadMeals() {
      try {
        const providerMeals = await getMealByProvider();

        if (!isMounted) {
          return;
        }

        setMeals(providerMeals);
        setError(null);
      } catch (err) {
        if (!isMounted) {
          return;
        }

        if (err instanceof UnauthorizedError) {
          router.replace(buildLoginRedirectPath("/dashboard/providers/meals"));
          return;
        }

        setError(
          err instanceof Error
            ? err.message
            : "We could not load your provider meals right now.",
        );
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }

    void loadMeals();

    return () => {
      isMounted = false;
    };
  }, [router]);

  async function handleDeleteMeal(meal: Meal) {
    const confirmed = window.confirm(
      `Delete "${meal.name ?? "this meal"}"? This action cannot be undone.`,
    );

    if (!confirmed) {
      return;
    }

    const toastId = toast.loading("Deleting meal");
    setDeletingMealId(meal.id);

    try {
      await deleteProviderMeal(meal.id);
      setMeals((currentMeals) =>
        currentMeals.filter((currentMeal) => currentMeal.id !== meal.id),
      );
      toast.success("Meal deleted successfully", { id: toastId });
    } catch (err) {
      if (err instanceof UnauthorizedError) {
        router.replace(buildLoginRedirectPath("/dashboard/providers/meals"));
        return;
      }

      toast.error(
        err instanceof Error ? err.message : "Unable to delete meal right now.",
        { id: toastId },
      );
    } finally {
      setDeletingMealId(null);
    }
  }

  if (isLoading) {
    return (
      <div className="w-full">
        <Card className="rounded-[28px] border border-[#eadfd2] bg-[#f7f1e9] shadow-sm">
          <CardHeader>
            <CardTitle className="text-2xl text-stone-900">Loading meals</CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-stone-600">
            Fetching your provider meals from the dashboard session.
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
              Provider meals unavailable
            </CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-stone-600">{error}</CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="w-full">
      <div className="w-full space-y-4">
        <MealTable
          meals={meals}
          deletingMealId={deletingMealId}
          onDeleteMeal={handleDeleteMeal}
        />
      </div>
    </div>
  );
}
