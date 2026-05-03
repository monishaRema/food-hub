import PaginationControls from "@/components/shared/pagination-control";
import MealTable from "@/features/provider/components/mealTable";
import { isApiError } from "@/lib/api/errors";
import { getProviderMeals } from "@/lib/api/provider.server";
import { querySearchSchema } from "@/lib/schema";
import { SearchParamsType } from "@/types";

export default async function ProviderMealsPage({
  searchParams,
}: SearchParamsType) {
  const rawQuery = await searchParams;
  const query = querySearchSchema.parse(rawQuery);

  try {
    const meals = await getProviderMeals(query);

    return (
      <section className="py-10">
        <div className="container mx-auto px-6">
          <MealTable meals={meals.data} />
          {meals.meta ? <PaginationControls meta={meals.meta} /> : null}
        </div>
      </section>
    );
  } catch (error) {
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
