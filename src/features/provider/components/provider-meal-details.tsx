import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, PencilLine, Salad, Tag, Wallet } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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

function DetailItem({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-[#eadfd2] bg-white/80 p-4 shadow-sm">
      <p className="text-xs font-medium uppercase tracking-[0.2em] text-stone-500">
        {label}
      </p>
      <p className="mt-2 text-sm font-semibold text-stone-900">{value}</p>
    </div>
  );
}

export function ProviderMealDetails({ meal }: { meal: Meal }) {
  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center gap-3">
        <Button asChild variant="outline" size="sm">
          <Link href="/dashboard/providers/meals">
            <ArrowLeft />
            Back to meals
          </Link>
        </Button>

        <Button asChild size="sm">
          <Link href={`/dashboard/providers/meals/${meal.id}/edit`}>
            <PencilLine />
            Edit meal
          </Link>
        </Button>
      </div>

      <Card className="overflow-hidden rounded-[32px] border border-[#eadfd2] bg-[#ffffff] pt-0 shadow-sm">
        <CardHeader className="space-y-4 bg-amber-50 py-5">
          <div className="flex items-start justify-between gap-4">
            <div className="space-y-2">
              <CardTitle className="text-2xl font-semibold tracking-tight text-stone-900">
                {meal.name ?? "Untitled meal"}
              </CardTitle>
              <CardDescription className="max-w-2xl text-sm leading-6 text-stone-600">
                Review the current provider meal details from the backend.
              </CardDescription>
            </div>

            <div className="flex flex-wrap gap-2">
              <Badge variant={meal.availability === "AVAILABLE" ? "default" : "outline"}>
                {formatEnumLabel(meal.availability)}
              </Badge>
              <Badge variant={meal.isFeatured ? "default" : "secondary"}>
                {meal.isFeatured ? "Featured" : "Standard"}
              </Badge>
            </div>
          </div>
        </CardHeader>

        <CardContent className="space-y-6 pt-6">
          <div className="grid gap-6 lg:grid-cols-[240px_1fr]">
            <div className="relative aspect-square overflow-hidden rounded-[28px] border border-[#eadfd2] bg-stone-100">
              {meal.image ? (
                <Image
                  src={meal.image}
                  alt={meal.name ?? "Meal image"}
                  fill
                  sizes="(max-width: 1024px) 100vw, 240px"
                  className="object-cover"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center text-sm text-stone-400">
                  No image
                </div>
              )}
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <DetailItem label="Category" value={meal.category?.name ?? "Not set"} />
              <DetailItem label="Dietary" value={formatEnumLabel(meal.dietary)} />
              <DetailItem label="Price" value={formatPrice(meal.price)} />
              <DetailItem label="Availability" value={formatEnumLabel(meal.availability)} />
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            <div className="rounded-[28px] border border-[#eadfd2] bg-[#fffaf5] p-5">
              <div className="mb-3 flex items-center gap-2 text-stone-700">
                <Salad className="size-4" />
                <span className="text-sm font-semibold">Meal summary</span>
              </div>
              <p className="text-sm leading-6 text-stone-600">
                {meal.excerpt || "No short summary available for this meal yet."}
              </p>
            </div>

            <div className="rounded-[28px] border border-[#eadfd2] bg-[#fffaf5] p-5">
              <div className="mb-3 flex items-center gap-2 text-stone-700">
                <Tag className="size-4" />
                <span className="text-sm font-semibold">Description</span>
              </div>
              <p className="text-sm leading-6 text-stone-600">
                {meal.details || "No detailed description available for this meal yet."}
              </p>
            </div>

            <div className="rounded-[28px] border border-[#eadfd2] bg-[#fffaf5] p-5">
              <div className="mb-3 flex items-center gap-2 text-stone-700">
                <Wallet className="size-4" />
                <span className="text-sm font-semibold">Next step</span>
              </div>
              <p className="text-sm leading-6 text-stone-600">
                Use the edit action when you're ready to update availability or meal details.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
