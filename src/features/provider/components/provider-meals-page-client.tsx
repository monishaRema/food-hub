"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import MealTable from "@/features/provider/components/mealTable";
import { UnauthorizedError } from "@/lib/api/errors";
import { buildLoginRedirectPath } from "@/lib/auth/login-redirect";
import { getMealByProvider } from "@/lib/api/provider";
import type { Meal } from "@/types/meal";

export function ProviderMealsPageClient() {
  const router = useRouter();
  const [meals, setMeals] = useState<Meal[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

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
        <MealTable meals={meals} />
      </div>
    </div>
  );
}
