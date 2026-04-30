import Image from "next/image";
import Link from "next/link";
import { Store } from "lucide-react";

import PaginationControls from "@/components/shared/pagination-control";
import { getPublicProviders } from "@/lib/api/publicProvider";
import { providerQuerySchema } from "@/lib/schema";
import type { SearchParamsType } from "@/types";

export default async function ProvidersPage({
  searchParams,
}: SearchParamsType) {
  const rawSearchParams = await searchParams;
  const query = providerQuerySchema.parse(rawSearchParams);
  const providers = await getPublicProviders(query);
  const providerItems = providers.data ?? [];

  return (
    <main className="bg-[radial-gradient(circle_at_top,rgba(249,115,22,0.12),transparent_22%),linear-gradient(180deg,#fcf7f1_0%,#f9f4ee_42%,#f7f1e9_100%)] py-14">
      <section className="container mx-auto px-4 sm:px-6">
        <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[#ff8b2b]">
              FoodHub providers
            </p>
            <h1 className="mt-3 text-4xl font-semibold tracking-tight text-[#111331] sm:text-5xl">
              Popular Restaurants
            </h1>
          </div>

          <p className="max-w-xl text-sm leading-7 text-stone-600 sm:text-base">
            Discover trusted local kitchens and browse the shops serving fresh
            meals near you.
          </p>
        </div>

        {providerItems.length > 0 ? (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-6">
            {providerItems.map((provider) => (
              <Link
                key={provider.id}
                href={`/providers/${provider.id}`}
                className="group overflow-hidden rounded-[18px] border border-[#eadfd2] bg-white shadow-sm transition duration-200 hover:-translate-y-1 hover:shadow-[0_14px_30px_rgba(15,23,42,0.08)]"
              >
                <div className="relative flex aspect-[1.08/1] items-center justify-center overflow-hidden bg-[#fff8f2]">
                  {provider.shopImage ? (
                    <Image
                      src={provider.shopImage}
                      alt={provider.shopName}
                      fill
                      className="object-cover transition duration-300 group-hover:scale-[1.03]"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center bg-[linear-gradient(135deg,#fff4e8_0%,#ffe1bd_100%)]">
                      <div className="flex size-24 items-center justify-center rounded-full bg-white text-[#ff8b2b] shadow-sm">
                        <Store className="size-11" strokeWidth={1.8} />
                      </div>
                    </div>
                  )}
                </div>

                <div className="bg-[#ff972f] px-4 py-4 text-center">
                  <h2 className="truncate text-lg font-semibold tracking-tight text-white">
                    {provider.shopName}
                  </h2>
                  <p className="mt-1 line-clamp-1 text-xs text-white/80">
                    {provider.address}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="rounded-[24px] border border-dashed border-[#e4d7ca] bg-white/70 px-6 py-16 text-center text-sm text-stone-500">
            No providers available right now.
          </div>
        )}

        {providers.meta ? <PaginationControls meta={providers.meta} /> : null}
      </section>
    </main>
  );
}
