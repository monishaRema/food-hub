"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { deleteMealAction } from "../actions/delete-meal.action";
import { UnauthorizedError } from "@/lib/api/errors";
import { buildLoginRedirectPath } from "@/lib/auth/login-redirect";

export default function MealTableActionButtons({ mealId }: { mealId: string }) {
  const router = useRouter();

  async function handleDeleteMeal(mealId: string) {
    const confirmed = window.confirm(
      "Delete meal? This action cannot be undone.",
    );

    if (!confirmed) {
      return;
    }

    const toastId = toast.loading("Deleting meal");

    try {
      await deleteMealAction(mealId);
      toast.success("Meal deleted successfully", { id: toastId });
      router.refresh();
    } catch (err) {
      if (err instanceof UnauthorizedError) {
        router.replace(buildLoginRedirectPath("/dashboard/provider/meals"));
        return;
      }

      toast.error(
        err instanceof Error ? err.message : "Unable to delete meal right now.",
        { id: toastId },
      );
    }
  }
  return (
    <div className="flex flex-wrap justify-end gap-2">
      <Button asChild variant="outline" size="sm">
        <Link href={`/dashboard/provider/meals/${mealId}`}>View</Link>
      </Button>
      <Button asChild variant="outline" size="sm">
        <Link href={`/dashboard/provider/meals/${mealId}/edit`}>Edit</Link>
      </Button>
      <Button
        type="button"
        className="bg-red-700 text-white hover:bg-red-800"
        size="sm"
        onClick={() => handleDeleteMeal(mealId)}
      >
        Delete
      </Button>
    </div>
  );
}
