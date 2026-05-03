import { CreateMealForm } from "@/features/provider/components/createMealForm";
import { getCategories } from "@/lib/api/category.server";

export default async function ProviderMealsPage() {
  const categories = await getCategories();

  return (
    <div className="flex w-full items-center justify-center px-6">
      <div className="w-full max-w-5xl space-y-4">
        <CreateMealForm categories={categories} />
      </div>
    </div>
  );
}
