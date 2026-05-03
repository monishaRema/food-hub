import { Button } from "@/components/ui/button";
import { EditMealForm } from "@/features/provider/components/editMealForm";
import { getCategories } from "@/lib/api/category.server";
import { getProviderMealById } from "@/lib/api/provider.server";
import { ParamsIdType } from "@/types";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default async function EditProviderMealPage({ params }: ParamsIdType) {
  const { id } = await params;

  const [meal, categories] = await Promise.all([
    getProviderMealById(id),
    getCategories(),
  ]);

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center gap-3">
        <Button asChild variant="outline" size="sm">
          <Link href={`/dashboard/provider/meals/${meal.data?.id}`}>
            <ArrowLeft />
            Back to meal
          </Link>
        </Button>
      </div>

      <EditMealForm meal={meal.data} categories={categories} />
    </div>
  );
}
