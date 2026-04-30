import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { DietaryType } from "@/constants";
import { formatPrice } from "@/lib/utils/format";
import type { FeaturedMeal, Meal } from "@/types/meal";
import Image from "next/image";
import Link from "next/link";

interface CardImageProps {
  meal: FeaturedMeal | Meal;
  mode?: "default" | "provider";
}

export function CardImage({ meal, mode = "default" }: CardImageProps) {
  const dietaryStyles = {
    VEG: "bg-green-100 text-green-700 border-green-300",
    NON_VEG: "bg-red-100 text-red-700 border-red-300",
    VEGAN: "bg-emerald-100 text-emerald-700 border-emerald-300",
  } as const;

  return (
    <Card className="relative mx-auto w-full max-w-sm overflow-hidden pt-0">
      <CardAction className="absolute top-2 left-2 z-21">
        {meal.isFeatured ? (
          <Badge variant="secondary" className="bg-amber-500 text-white">
            Featured
          </Badge>
        ) : null}
      </CardAction>
      {meal.dietary && (
        <CardAction className="absolute top-2 right-2 z-21">
          <Badge variant="secondary" className={dietaryStyles[meal.dietary]}>
            {meal.dietary}
          </Badge>
        </CardAction>
      )}

      <div className="absolute inset-0 z-30 aspect-video bg-black/15" />
      <Link href={`/meals/${meal.id}`} className="block">
        {meal.image ? (
          <Image
            src={meal.image}
            alt={meal.name}
            width={300}
            height={250}
            className="relative z-20 aspect-video w-full object-cover transition duration-300 hover:scale-[1.02]"
          />
        ) : (
          <div className="relative z-20 flex aspect-video w-full items-center justify-center bg-stone-200 text-sm text-stone-600">
            No image available
          </div>
        )}
      </Link>
      <CardHeader>
        <CardAction>
          <Badge variant="secondary" className="bg-slate-800 text-white">
            {meal.category?.name}
          </Badge>
        </CardAction>
        <CardTitle className="text-xl font-bold">
          <Link
            href={`/meals/${meal.id}`}
            className="transition hover:text-[#ff8b2b]"
          >
            {meal.name}
          </Link>
        </CardTitle>
        <CardDescription>
          {meal.excerpt ?? `${meal.category?.name ?? "Meal"} by FoodHub`}
        </CardDescription>
        <p className="mt-2 text-sm font-semibold text-orange-500">
          {formatPrice(meal.price)}
        </p>
      </CardHeader>
      <CardFooter>
        {mode === "provider" ? (
          <Button className="h-10 w-full text-md font-bold">Add to cart</Button>
        ) : (
          <Link href={`/meals/${meal.id}`} className="w-full">
            <Button className="h-10 w-full text-md font-bold">
              View Meal
            </Button>
          </Link>
        )}
      </CardFooter>
    </Card>
  );
}
