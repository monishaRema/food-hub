import { ArrowRight } from "lucide-react";
import Link from "next/link";

import { CardImage } from "../meals/components/MealCard";
import type { Meal } from "@/types/meal";
import { MealList } from "../meals/components/MealList";

interface FeaturedSectionProps {
  meals: Meal[];
}

export default function FeaturedSection({ meals }: FeaturedSectionProps) {
  return (
    <section className="mt-18">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h2 className="text-4xl font-semibold tracking-tight text-stone-900">
            Featured meals
          </h2>
          <p className="mt-2 text-lg text-stone-600">
            A taste of what providers are serving today.
          </p>
        </div>

        <Link
          href="/meals"
          className="inline-flex items-center gap-2 text-sm font-semibold text-stone-900 transition-colors hover:text-[#ff6b2c]"
        >
          See all
          <ArrowRight className="size-4" />
        </Link>
      </div>

      <MealList meals={meals}></MealList>
     
    </section>
  );
}
