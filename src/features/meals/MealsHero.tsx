import Image from "next/image";

export default function MealsHero() {
  return (
    <section className="bg-[#f7f1e9] py-10 sm:py-20">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="overflow-hidden rounded-[22px] border border-[#ddd6cf] bg-[#f8f7f5] shadow-[0_8px_30px_rgba(15,23,42,0.05)]">
          <div className="grid min-h-[430px] grid-cols-1 lg:grid-cols-[1.2fr_1fr]">
            <div className="flex items-center px-6 py-10 sm:px-10 lg:px-12">
              <div className="max-w-xl space-y-4">
                <p className="text-sm text-stone-700 sm:text-base">
                  Order restaurant food, takeaway and groceries.
                </p>
                <h1 className="text-4xl font-semibold tracking-tight text-[#111331] sm:text-5xl lg:text-6xl">
                  <span className="block">Feast Your Senses,</span>
                  <span className="mt-2 block text-[#ff8b2b]">
                    Fast and Fresh
                  </span>
                </h1>
                <p className="text-lg mt-3 text-[#3f3f41]">
                  Enjoy a curated selection of freshly prepared meals crafted
                  for every taste. Discover flavors that balance quality, speed,
                  and convenience in every bite. Order fast, eat fresh, and
                  elevate your everyday dining experience.
                </p>
              </div>
            </div>

            <div className="relative min-h-[430px]">
              <div className="absolute inset-y-0 right-0 w-[72%] bg-[#ff922e]" />

              <div className="pointer-events-none absolute right-8 top-4 text-[72px] font-light leading-none text-transparent [-webkit-text-stroke:1.5px_rgba(255,255,255,0.8)] sm:right-12 sm:text-[86px]">
                1
              </div>
              <div className="pointer-events-none absolute right-8 top-[150px] text-[72px] font-light leading-none text-transparent [-webkit-text-stroke:1.5px_rgba(255,255,255,0.8)] sm:right-12 sm:text-[86px]">
                2
              </div>
              <div className="pointer-events-none absolute bottom-8 right-8 text-[72px] font-light leading-none text-transparent [-webkit-text-stroke:1.5px_rgba(255,255,255,0.8)] sm:right-12 sm:text-[86px]">
                3
              </div>

              <div className="absolute bottom-0 left-0 h-full w-full">
                <div className="absolute bottom-0 left-0 h-[76%] w-[58%] overflow-hidden rounded-tr-[14px] bg-white shadow-lg sm:w-[54%]">
                  <Image
                    src="/assets/meal.png"
                    alt="Person enjoying a freshly prepared meal"
                    fill
                    priority
                    className="object-cover"
                  />
                </div>
              </div>

              <div className="absolute right-4 top-14 z-10 w-[68%] rounded-2xl bg-white px-5 py-4 shadow-[0_12px_30px_rgba(15,23,42,0.12)] sm:right-6 sm:w-[60%]">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-[15px] font-semibold text-[#111331]">
                      Order
                      <span className="ml-0.5 text-[11px] text-[#ff8b2b]">
                        🛵
                      </span>
                    </p>
                  </div>
                  <span className="text-xs text-stone-400">now</span>
                </div>
              </div>

              <div className="absolute right-0 top-[190px] z-10 w-[68%] rounded-2xl bg-white px-5 py-4 shadow-[0_12px_30px_rgba(15,23,42,0.12)] sm:right-4 sm:w-[58%]">
                <div className="flex items-start justify-between gap-3">
                  <div className="space-y-3">
                    <p className="text-[15px] font-semibold text-[#111331]">
                      Order
                      <span className="ml-0.5 text-[11px] text-[#ff8b2b]">
                        🛵
                      </span>
                    </p>
                    <div className="flex justify-center">
                      <span className="inline-flex size-4 items-center justify-center rounded-[4px] bg-[#3f7d3a] text-[10px] text-white">
                        ✓
                      </span>
                    </div>
                  </div>
                  <span className="text-xs text-stone-400">now</span>
                </div>
              </div>

              <div className="absolute bottom-12 right-2 z-10 w-[70%] rounded-2xl bg-white px-5 py-4 shadow-[0_12px_30px_rgba(15,23,42,0.12)] sm:right-8 sm:w-[56%]">
                <div className="flex items-start justify-between gap-3">
                  <div className="space-y-1.5">
                    <p className="text-[15px] font-semibold text-[#111331]">
                      Order
                      <span className="ml-0.5 text-[11px] text-[#ff8b2b]">
                        🛵
                      </span>
                    </p>
                    <p className="text-sm font-semibold text-[#111331]">
                      Your rider&apos;s nearby
                      <span className="ml-1">🎉</span>
                    </p>
                    <p className="text-sm text-stone-600">
                      They&apos;re almost there - get ready!
                    </p>
                  </div>
                  <span className="pt-1 text-xs text-stone-400">now</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
