import type {Meal } from "@/types/meal";
import { CardImage } from "./MealCard";

interface MealListProps {
  meals: Meal[];
}

export function MealList({ meals }: MealListProps) {
  if (meals.length !== 0) {
    return (
      <div className="mt-6 grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
        {meals.map((meal) => (
          <CardImage key={meal.id} meal={meal} />
        ))}
      </div>
    );
  }

  return (
    <div className="mt-6 rounded-[28px] border border-dashed border-[#e7d7c7] bg-white/45 px-6 py-12 text-center text-sm text-stone-500">
      No meals available yet. Make sure the API is running and reachable.
    </div>
  );
}
