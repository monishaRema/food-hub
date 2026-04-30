import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MapPin, Store } from "lucide-react";

import PaginationControls from "@/components/shared/pagination-control";
import { Badge } from "@/components/ui/badge";
import { MealList } from "@/features/meals/components/MealList";
import { isApiError } from "@/lib/api/errors";
import { mealPageQuerySchema } from "@/lib/schema";
import {
  getMealsByProvider,
  getSingleProvider,
} from "@/lib/api/publicProvider";
import type { ParamsIdType, SearchParamsType } from "@/types";

type ProviderSinglePageProps = ParamsIdType & SearchParamsType;

export default async function ProviderSinglePage({
  params,
  searchParams,
}: ProviderSinglePageProps) {
  const { id } = await params;
  const rawSearchParams = await searchParams;
  const query = mealPageQuerySchema.parse(rawSearchParams);

  try {
    const [provider, meals] = await Promise.all([
      getSingleProvider(id),
      getMealsByProvider(id, query),
    ]);

    const mealItems = meals.data ?? [];

    return (
      <main className="bg-[radial-gradient(circle_at_top,rgba(249,115,22,0.12),transparent_22%),linear-gradient(180deg,#fcf7f1_0%,#f9f4ee_42%,#f7f1e9_100%)] py-14">
        <section className="container mx-auto space-y-10 px-4 sm:px-6">
          <Link
            href="/providers"
            className="inline-flex text-sm font-semibold text-stone-700 transition hover:text-[#ff8b2b]"
          >
            Back to providers
          </Link>

          <div className="overflow-hidden rounded-[28px] border border-[#eadfd2] bg-[#f8f7f5] shadow-[0_12px_40px_rgba(15,23,42,0.06)]">
            <div className="grid gap-0 lg:grid-cols-[0.92fr_1.08fr]">
              <div className="relative min-h-[320px] overflow-hidden bg-[#fff3e6] lg:min-h-[460px]">
                {provider.shopImage ? (
                  <Image
                    src={provider.shopImage}
                    alt={provider.shopName}
                    fill
                    priority
                    className="object-cover"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center bg-[linear-gradient(135deg,#fff4e8_0%,#ffd6a8_100%)]">
                    <div className="flex size-36 items-center justify-center rounded-full bg-white text-[#ff8b2b] shadow-sm">
                      <Store className="size-16" strokeWidth={1.7} />
                    </div>
                  </div>
                )}
                <div className="absolute inset-0 bg-linear-to-t from-[#111331]/18 via-transparent to-transparent" />
              </div>

              <div className="flex flex-col justify-between bg-[#f8f7f5] px-6 py-8 sm:px-8 sm:py-10">
                <div className="space-y-6">
                  <div className="space-y-3">
                    <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[#ff8b2b]">
                      Featured provider
                    </p>
                    <h1 className="text-4xl font-semibold tracking-tight text-[#111331] sm:text-5xl">
                      {provider.shopName}
                    </h1>
                    <p className="max-w-2xl text-base leading-7 text-stone-600">
                      Explore fresh meals from this local kitchen and add your
                      favorites straight from the provider menu.
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-3">
                    <Badge
                      variant="secondary"
                      className="bg-[#fff1e4] px-3 py-1 text-[#c86512]"
                    >
                      Popular provider
                    </Badge>
                    <Badge
                      variant="secondary"
                      className="bg-white px-3 py-1 text-stone-700 ring-1 ring-[#eadfd2]"
                    >
                      {meals.meta?.totalItems ?? mealItems.length} meals
                    </Badge>
                  </div>

                  <div className="rounded-[24px] border border-[#eadfd2] bg-white p-6">
                    <div className="flex items-start gap-3">
                      <div className="mt-0.5 rounded-full bg-[#fff1e4] p-2 text-[#ff8b2b]">
                        <MapPin className="size-4" />
                      </div>
                      <div>
                        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-stone-500">
                          Address
                        </p>
                        <p className="mt-2 text-base leading-7 text-stone-700">
                          {provider.address}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-8 border-t border-[#eadfd2] pt-5 text-sm text-stone-500">
                  Browse the menu below and add items to your cart from this
                  provider page.
                </div>
              </div>
            </div>
          </div>

          <section>
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[#ff8b2b]">
                  Provider menu
                </p>
                <h2 className="mt-2 text-3xl font-semibold tracking-tight text-[#111331] sm:text-4xl">
                  Meals from {provider.shopName}
                </h2>
              </div>
            </div>

            <MealList meals={mealItems} mode="provider" />
            {meals.meta ? <PaginationControls meta={meals.meta} /> : null}
          </section>
        </section>
      </main>
    );
  } catch (error) {
    if (isApiError(error) && error.status === 404) {
      notFound();
    }

    if (error instanceof Error && error.message === "Provider not found.") {
      notFound();
    }

    throw error;
  }
}
