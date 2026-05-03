import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Star } from "lucide-react";

import { Badge } from "@/components/ui/badge";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { isApiError, isUnauthorizedError } from "@/lib/api/errors";
import { AddToCartButton } from "@/features/orders/components/AddToCartButton";
import { checkReviewEligibility, getSingleMeal } from "@/lib/api/meals.api";
import { formatDate, formatEnumLabel, formatPrice } from "@/lib/utils/format";
import { ParamsIdType } from "@/types";
import { ReviewForm } from "@/features/meals/components/ReviewForm";

export default async function MealSinglePage({
  params,
}: ParamsIdType) {
  const { id } = await params;

  try {
    const meal = await getSingleMeal(id);
    let reviewEligibility: Awaited<ReturnType<typeof checkReviewEligibility>> | null = null;

    try {
      reviewEligibility = await checkReviewEligibility(id);
    } catch (error) {
      if (!isUnauthorizedError(error)) {
        throw error;
      }
    }

    const averageRating = meal.reviews.length > 0 ? 
        (
            meal.reviews.reduce((total, review) => total + review.rating, 0) /
            meal.reviews.length
          ).toFixed(1)
        : null;

    return (
      <main className="bg-[radial-gradient(circle_at_top,rgba(249,115,22,0.14),transparent_26%),linear-gradient(180deg,#fcf7f1_0%,#f9f4ee_42%,#f7f1e9_100%)] py-10 sm:py-14">
        <div className="container mx-auto space-y-8 px-4 sm:px-6">
          <Link
            href="/meals"
            className="inline-flex items-center gap-2 text-sm font-semibold text-stone-700 transition hover:text-[#ff8b2b]"
          >
            <ArrowLeft className="size-4" />
            Back to meals
          </Link>

          <section className="overflow-hidden rounded-[28px] border border-[#e6d7c7] bg-[#f8f7f5] shadow-[0_12px_40px_rgba(15,23,42,0.06)]">
            <div className="grid gap-0 lg:grid-cols-[1.05fr_0.95fr]">
              <div className="relative min-h-90 bg-[#f3e6d7] lg:min-h-155">
                {meal.image ? (
                  <Image
                    src={meal.image}
                    alt={meal.name}
                    fill
                    priority
                    className="object-cover"
                  />
                ) : (
                  <div className="flex h-full min-h-90 items-center justify-center text-sm text-stone-500">
                    No meal image available
                  </div>
                )}

                <div className="absolute inset-0 bg-linear-to-t from-[#111331]/38 via-transparent to-transparent" />
                <div className="absolute left-5 top-5 flex flex-wrap gap-2">
                  {meal.isFeatured ? (
                    <Badge className="bg-[#ff8b2b] text-white hover:bg-[#ff8b2b]">
                      Featured
                    </Badge>
                  ) : null}
                  <Badge
                    variant="secondary"
                    className="bg-white/90 text-[#111331]"
                  >
                    {meal.category.name}
                  </Badge>
                </div>
              </div>

              <div className="flex flex-col justify-between bg-[#f8f7f5]">
                <div className="space-y-8 px-6 py-8 sm:px-8 sm:py-10">
                  <div className="space-y-4">
                    <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[#ff8b2b]">
                      FoodHub meal
                    </p>
                    <h1 className="text-4xl font-semibold tracking-tight text-[#111331] sm:text-5xl">
                      {meal.name}
                    </h1>
                    <p className="max-w-2xl text-base leading-7 text-stone-600">
                      {meal.excerpt}
                    </p>
                  </div>

                  <div className="flex flex-wrap items-center gap-3">
                    <Badge
                      variant="secondary"
                      className="bg-[#fff1e4] text-[#c86512]"
                    >
                      {formatEnumLabel(meal.dietary)}
                    </Badge>
                    <Badge
                      variant="secondary"
                      className="bg-[#eef6eb] text-[#2f6b37]"
                    >
                      {formatEnumLabel(meal.availability)}
                    </Badge>
                    {averageRating ? (
                      <Badge
                        variant="secondary"
                        className="bg-[#fff6d8] text-[#8a6200]"
                      >
                        <Star className="mr-1 size-3.5 fill-current" />
                        {averageRating} rating
                      </Badge>
                    ) : null}
                  </div>

                  <div className="grid gap-4 sm:grid-cols-3">
                    <Card className="border-[#eadfd2] bg-white py-0 shadow-none">
                      <CardHeader className="pb-2 pt-5">
                        <CardTitle className="text-sm font-medium text-stone-500">
                          Price
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="pb-5">
                        <p className="text-2xl font-semibold text-[#111331]">
                          {formatPrice(meal.price)}
                        </p>
                      </CardContent>
                    </Card>

                    <Card className="border-[#eadfd2] bg-white py-0 shadow-none">
                      <CardHeader className="pb-2 pt-5">
                        <CardTitle className="text-sm font-medium text-stone-500">
                          Provider
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="pb-5">
                        <Link href={`/providers/${meal.providerId}`} className="text-lg font-semibold text-[#111331] hover:text-orange-500">
                          {meal.provider.shopName}
                        </Link>
                      </CardContent>
                    </Card>

                    <Card className="border-[#eadfd2] bg-white py-0 shadow-none">
                      <CardHeader className="pb-2 pt-5">
                        <CardTitle className="text-sm font-medium text-stone-500">
                          Reviews
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="pb-5">
                        <p className="text-2xl font-semibold text-[#111331]">
                          {meal.reviews.length}
                        </p>
                      </CardContent>
                    </Card>
                  </div>

                  <div className="rounded-[24px] border border-[#eadfd2] bg-white p-6">
                    <h2 className="text-xl font-semibold text-[#111331]">
                      About this meal
                    </h2>
                    <p className="mt-3 text-base leading-7 text-stone-600">
                      {meal.details}
                    </p>
                  </div>
                </div>

                <div className="border-t border-[#eadfd2] bg-white/70 px-6 py-5 sm:px-8">
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <p className="text-sm text-stone-500">
                        Added on {formatDate(meal.createdAt)}
                      </p>
                      <p className="mt-1 text-sm text-stone-500">
                        Last updated {formatDate(meal.updatedAt)}
                      </p>
                    </div>
                    <div className="flex flex-col gap-3 sm:flex-row">
                      <AddToCartButton
                        meal={{
                          mealId: meal.id,
                          providerId: meal.providerId,
                          name: meal.name,
                          image: meal.image,
                          price: meal.price,
                        }}
                        className="h-11 bg-[#f97316] px-6 text-white hover:bg-[#ea6b12]"
                      />
                      <Button
                        asChild
                        variant="outline"
                        className="h-11 border-[#eadfd2] bg-white"
                      >
                        <Link href="/cart">View cart</Link>
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="rounded-[28px] border border-[#e6d7c7] bg-[#f8f7f5] p-6 shadow-[0_12px_30px_rgba(15,23,42,0.04)] sm:p-8">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[#ff8b2b]">
                  Reviews
                </p>
                <h2 className="mt-2 text-3xl font-semibold tracking-tight text-[#111331]">
                  What customers are saying
                </h2>
              </div>
              {averageRating ? (
                <div className="rounded-full bg-white px-4 py-2 text-sm font-semibold text-stone-700 ring-1 ring-[#eadfd2]">
                  Average rating: {averageRating}/5
                </div>
              ) : null}
            </div>

            {meal.reviews.length > 0 ? (
              <div className="mt-8 grid gap-4 lg:grid-cols-2">
                {meal.reviews.map((review) => (
                  <div
                    key={review.id}
                    className="rounded-[24px] border border-[#eadfd2] bg-white p-5"
                  >
                    <div className="flex items-center justify-between gap-3">
                      <div className="flex items-center gap-1 text-[#ff8b2b]">
                        {Array.from({ length: 5 }).map((_, index) => (
                          <Star
                            key={`${review.id}-${index}`}
                            className={`size-4 ${
                              index < review.rating ? "fill-current" : ""
                            }`}
                          />
                        ))}
                      </div>
                      <p className="text-sm text-stone-500">
                        {formatDate(review.createdAt)}
                      </p>
                    </div>
                    <p className="mt-4 text-sm leading-7 text-stone-600">
                      {review.content}
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <div className="mt-8 rounded-[24px] border border-dashed border-[#eadfd2] bg-white/70 px-6 py-12 text-center text-sm text-stone-500">
                No reviews yet for this meal.
              </div>
            )}

          </section>
          <section>
            {reviewEligibility?.eligibility && reviewEligibility.orderId ? (
              <ReviewForm mealId={meal.id} orderId={reviewEligibility.orderId} />
            ) : (
              <div className="rounded-[24px] border border-dashed border-[#eadfd2] bg-white/70 px-6 py-10 text-center text-sm text-stone-500">
                <h3 className="text-2xl font-bold">Review the meal</h3>
                {reviewEligibility?.message ?? "You need a delivered order for this meal before you can leave a review."}
              </div>
            )}
          </section>
          
        </div>
      </main>
    );
  } catch (error) {
    if (isApiError(error) && error.status === 404) {
      notFound();
    }

    throw error;
  }
}
