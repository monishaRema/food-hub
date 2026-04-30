import PaginationControls from "@/components/shared/pagination-control";
import { MealList } from "@/features/meals/components/MealList";
import MealsHero from "@/features/meals/components/MealsHero";
import { getMeals } from "@/lib/api/meals.api";
import { SearchParamsType } from "@/types";
import { mealPageQuerySchema } from "@/lib/schema";

export default async function MealPage({ searchParams }: SearchParamsType) {
  const rawSearchParams = await searchParams;
  const query = mealPageQuerySchema.parse(rawSearchParams);
  const meals = await getMeals(query);
  const mealItems = meals.data ?? [];

  return (
    <main>
      <MealsHero />
      <section className="bg-[radial-gradient(circle_at_top,rgba(249,115,22,0.14),transparent_26%),linear-gradient(180deg,#fcf7f1_0%,#f9f4ee_42%,#f7f1e9_100%)] py-25">
        <div className="container mx-auto px-6">
          <h2 className="mb-10 text-center text-4xl font-semibold tracking-tight text-[#111331] sm:text-5xl lg:text-6xl">
            <span>Browse Our </span>
            <span className="text-[#ff8b2b]">Delicious Food</span>
          </h2>
          <MealList meals={mealItems} />
          {meals.meta ? <PaginationControls meta={meals.meta} /> : null}
        </div>
      </section>
    </main>
  );
}
