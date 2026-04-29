"use client";

import Image from "next/image";
import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formatEnumLabel } from "@/lib/utils/format";
import type { Meal } from "@/types/meal";

function formatPrice(price?: string | number) {
  if (price === undefined || price === null || price === "") {
    return "Not available";
  }

  const numericPrice =
    typeof price === "number" ? price : Number.parseFloat(price);

  if (Number.isNaN(numericPrice)) {
    return String(price);
  }

  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 2,
  }).format(numericPrice);
}

function getAvailabilityVariant(availability?: Meal["availability"]) {
  return availability === "AVAILABLE" ? "default" : "outline";
}

function getDietaryVariant(dietary?: Meal["dietary"]) {
  return dietary === "VEGAN" ? "default" : "secondary";
}

export default function MealTable({
  meals,
  deletingMealId,
  onDeleteMeal,
}: {
  meals: Meal[];
  deletingMealId?: string | null;
  onDeleteMeal?: (meal: Meal) => void | Promise<void>;
}) {
  return (
    <div className="overflow-hidden rounded-[28px] border border-[#eadfd2] bg-white shadow-sm">
      <div className="border-b border-[#f1e5d7] px-6 py-5">
        <h2 className="text-xl font-semibold text-stone-900">Your meals</h2>
        <p className="mt-1 text-sm text-stone-600">
          Review the meals currently available on your provider menu.
        </p>
      </div>

      <Table>
        <TableHeader>
          <TableRow className="border-[#f1e5d7] bg-stone-50/80 hover:bg-stone-50/80">
            <TableHead className="px-6 py-4">Meal</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Dietary</TableHead>
            <TableHead>Availability</TableHead>
            <TableHead>Featured</TableHead>
            <TableHead className="text-right">Price</TableHead>
            <TableHead className="px-6">Actions</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {meals.length === 0 ? (
            <TableRow>
              <TableCell
                colSpan={7}
                className="px-6 py-10 text-center text-sm text-stone-500"
              >
                No meals found for this provider yet.
              </TableCell>
            </TableRow>
          ) : (
            meals.map((meal) => (
              <TableRow key={meal.id} className="border-[#f7ede2] hover:bg-[#fffaf5]">
                <TableCell className="px-6 py-4">
                  <div className="flex min-w-[280px] items-center gap-4">
                    <div className="relative h-14 w-14 overflow-hidden rounded-2xl bg-stone-100">
                      {meal.image ? (
                        <Image
                          src={meal.image}
                          alt={meal.name ?? "Meal image"}
                          fill
                          sizes="56px"
                          className="object-cover"
                        />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center text-xs text-stone-400">
                          No image
                        </div>
                      )}
                    </div>

                    <div className="min-w-0">
                      <p className="font-medium text-stone-900">
                        {meal.name ?? "Untitled meal"}
                      </p>
                    </div>
                  </div>
                </TableCell>

                <TableCell className="text-stone-600">
                  {meal.category?.name ?? meal.categoryId ?? "Not set"}
                </TableCell>

                <TableCell>
                  <Badge variant={getDietaryVariant(meal.dietary)}>
                    {formatEnumLabel(meal.dietary)}
                  </Badge>
                </TableCell>

                <TableCell>
                  <Badge variant={getAvailabilityVariant(meal.availability)}>
                    {formatEnumLabel(meal.availability)}
                  </Badge>
                </TableCell>

                <TableCell>
                  <Badge variant={meal.isFeatured ? "default" : "outline"}>
                    {meal.isFeatured ? "Featured" : "Standard"}
                  </Badge>
                </TableCell>

                <TableCell className="text-right font-medium text-stone-900">
                  {formatPrice(meal.price)}
                </TableCell>

                <TableCell className="px-6">
                  <div className="flex flex-wrap justify-end gap-2">
                    <Button asChild variant="outline" size="sm">
                      <Link href={`/dashboard/providers/meals/${meal.id}`}>View</Link>
                    </Button>
                    <Button asChild variant="outline" size="sm">
                      <Link href={`/dashboard/providers/meals/${meal.id}/edit`}>Edit</Link>
                    </Button>
                    <Button
                      type="button"
                      className="bg-red-700 text-white hover:bg-red-800"
                      size="sm"
                      disabled={!onDeleteMeal || deletingMealId === meal.id}
                      onClick={() => void onDeleteMeal?.(meal)}
                    >
                      {deletingMealId === meal.id ? "Deleting..." : "Delete"}
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}
