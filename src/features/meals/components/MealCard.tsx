import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import type { FeaturedMeal, Meal } from "@/types/meal"
import Image from "next/image"
import Link from "next/link"

interface CardImageProps {
  meal: FeaturedMeal | Meal;
}

function formatPrice(price: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 2,
  }).format(price)
}

export function CardImage({ meal }: CardImageProps) {
  return (
    <Card className="relative mx-auto w-full max-w-sm pt-0">
      <div className="absolute inset-0 z-30 aspect-video bg-black/35" />
      {meal.image ? (
        <Image
          src={meal.image}
          alt={meal.name}
          width={300}
          height={250}
          className="relative z-20 aspect-video w-full object-cover"
        />
      ) : (
        <div className="relative z-20 flex aspect-video w-full items-center justify-center bg-stone-200 text-sm text-stone-600">
          No image available
        </div>
      )}
      <CardHeader>
        <CardAction>
          {meal.isFeatured ? <Badge variant="secondary" className="bg-amber-500 text-white">Featured</Badge> : null}
        </CardAction>
        <CardTitle>{meal.name}</CardTitle>
        <CardDescription>
          {meal.excerpt ?? `${meal.category?.name ?? "Meal"} by FoodHub`}
        </CardDescription>
        <p className="mt-2 text-sm font-semibold text-orange-500">
          {formatPrice(meal.price)}
        </p>
      </CardHeader>
      <CardFooter>
        <Link href={`/meals/${meal.id}`} className="w-full">
          <Button className="w-full h-10 text-md font-bold" >View Meal</Button>
        </Link>
      </CardFooter>
    </Card>
  )
}
