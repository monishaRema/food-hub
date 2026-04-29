import { CreateMealForm } from "@/features/provider/components/createMealForm";
import MealTable from "@/features/provider/components/mealTable";

import { getCategories } from "@/lib/api/category";
import { getProviderMeals } from "@/lib/api/provider.server";

export default async function ProviderMealsPage() {
  const [categories, meals] = await Promise.all([
    getCategories(),
    getProviderMeals(),
  ]);

   console.log(meals)
  return (
    <div className="flex w-full items-center justify-center px-6">
      <div className="w-full max-w-5xl space-y-4">
         <MealTable meals={meals}></MealTable>
        <CreateMealForm categories={categories} />
      </div>
    </div>
  );
}
