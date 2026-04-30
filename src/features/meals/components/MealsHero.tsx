import Image from "next/image";

export default function MealsHero() {
  return (
    <section className="bg-[#f7f1e9] py-10 sm:py-20">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="overflow-hidden rounded-[22px] border border-[#ddd6cf] bg-[#f8f7f5] shadow-[0_8px_30px_rgba(15,23,42,0.05)]">
          <div className="grid min-h-107 grid-cols-1 lg:grid-cols-[1.2fr_1fr]">
            <div className="flex items-center px-6 py-30 sm:px-10 lg:px-12">
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

            <div className="relative min-h-107 overflow-hidden">
              <Image
                src="/assets/meal.png"
                alt="Person enjoying a freshly prepared meal"
                fill
                priority
                className="object-cover object-center"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
