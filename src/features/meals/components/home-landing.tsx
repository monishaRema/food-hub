import Link from "next/link";
import {
  ArrowRight,
  BadgeCheck,
  Search,
  Sparkles,
  Truck,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const highlights = [
  {
    icon: Search,
    title: "Browse easily",
    description: "Search and filter meals across providers.",
  },
  {
    icon: Truck,
    title: "Cash on delivery",
    description: "Pay when your order arrives at your door.",
  },
  {
    icon: BadgeCheck,
    title: "Trusted vendors",
    description: "Quality menus from verified providers.",
  },
];

const heroDishes = [
  {
    title: "Pasta bowl",
    accent: "from-[#d68631] to-[#f6c04b]",
    plate: "bg-[#fff4dd]",
    garnish: "bg-[#df5b2a]",
    position: "left-6 top-6",
  },
  {
    title: "Fresh rolls",
    accent: "from-[#f8df8b] to-[#f5b549]",
    plate: "bg-[#fff7e7]",
    garnish: "bg-[#77a84c]",
    position: "right-10 top-8",
  },
  {
    title: "Spicy noodles",
    accent: "from-[#9b321d] to-[#f0782c]",
    plate: "bg-[#fff2e5]",
    garnish: "bg-[#2e8b57]",
    position: "left-10 bottom-8",
  },
  {
    title: "Garden salad",
    accent: "from-[#78b548] to-[#f2d35d]",
    plate: "bg-[#fff8ea]",
    garnish: "bg-[#ea6d2f]",
    position: "right-26 bottom-16",
  },
];

function HeroDish({
  title,
  accent,
  plate,
  garnish,
  position,
}: (typeof heroDishes)[number]) {
  return (
    <div
      className={`absolute ${position} flex h-34 w-34 items-center justify-center rounded-[2rem] bg-white/70 p-3 shadow-[0_20px_40px_rgba(249,115,22,0.16)] backdrop-blur`}
    >
      <div
        className={`relative flex h-full w-full items-center justify-center rounded-[1.7rem] ${plate} ring-1 ring-white/80`}
      >
        <div
          className={`h-22 w-22 rounded-full bg-gradient-to-br ${accent} shadow-inner`}
        />
        <div className={`absolute left-5 top-6 h-3 w-3 rounded-full ${garnish}`} />
        <div className="absolute right-5 top-8 h-2.5 w-2.5 rounded-full bg-white/75" />
        <div className="absolute bottom-7 right-7 h-3 w-3 rounded-full bg-[#fbe7a1]" />
      </div>
      <span className="absolute -bottom-3 rounded-full bg-white px-3 py-1 text-xs font-medium text-stone-700 shadow-sm">
        {title}
      </span>
    </div>
  );
}

function FeatureCard({
  icon: Icon,
  title,
  description,
}: (typeof highlights)[number]) {
  return (
    <Card className="rounded-[28px] border border-[#eedfd0] bg-white py-0 shadow-[0_10px_30px_rgba(33,24,17,0.05)]">
      <CardContent className="p-6">
        <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-2xl bg-[#fff2e8] text-[#ff6b2c]">
          <Icon className="size-4" />
        </div>
        <h3 className="text-xl font-semibold tracking-tight text-stone-900">
          {title}
        </h3>
        <p className="mt-2 text-sm leading-6 text-stone-600">{description}</p>
      </CardContent>
    </Card>
  );
}

export function HomeLanding() {
  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top,rgba(249,115,22,0.14),transparent_26%),linear-gradient(180deg,#fcf7f1_0%,#f9f4ee_42%,#f7f1e9_100%)]">
      <div className="mx-auto max-w-7xl px-6 py-12 sm:py-16 lg:px-10 lg:py-18">
        <section className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(420px,520px)] lg:items-center">
          <div className="max-w-2xl space-y-8">
            <div className="inline-flex items-center gap-2 rounded-full bg-white/70 px-4 py-2 text-sm text-stone-700 ring-1 ring-[#f1dfcf] backdrop-blur">
              <Sparkles className="size-3.5 text-[#ff6b2c]" />
              <span>Fresh meals, every day</span>
            </div>

            <div className="space-y-5">
              <h1 className="max-w-xl text-5xl font-semibold tracking-tight text-stone-900 sm:text-6xl">
                Discover &amp; order{" "}
                <span className="text-[#ff6b2c]">delicious meals</span>
              </h1>
              <p className="max-w-xl text-lg leading-8 text-stone-600">
                Browse menus from local providers, add to cart, and get it
                delivered with cash on delivery.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <Button
                asChild
                size="lg"
                className="h-12 rounded-2xl bg-[#ff6b2c] px-6 text-white hover:bg-[#f15d1a]"
              >
                <Link href="/meals">
                  Browse meals
                  <ArrowRight className="size-4" />
                </Link>
              </Button>

              <Button
                asChild
                variant="outline"
                size="lg"
                className="h-12 rounded-2xl border-[#ddcec1] bg-white/75 px-6 text-stone-800 hover:bg-white"
              >
                <Link href="/providers">View providers</Link>
              </Button>
            </div>
          </div>

          <div className="relative mx-auto h-[330px] w-full max-w-[520px] overflow-hidden rounded-[2rem] border border-[#f1dfcf] bg-[linear-gradient(135deg,#f4c75b_0%,#ffd764_42%,#f3bb42_100%)] shadow-[0_30px_70px_rgba(249,115,22,0.2)] sm:h-[420px]">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.72),transparent_24%),radial-gradient(circle_at_bottom_right,rgba(255,255,255,0.55),transparent_30%)]" />
            <div className="absolute right-[-3.5rem] bottom-[-3.5rem] h-52 w-52 rounded-full border-[18px] border-[#f8eee0] bg-[radial-gradient(circle_at_30%_30%,#ffecd0_0%,#ffb54f_24%,#d36b2c_55%,#8f341b_100%)] shadow-[inset_0_0_0_8px_rgba(255,255,255,0.25)]" />
            <div className="absolute right-11 bottom-10 h-28 w-28 rounded-full border-[10px] border-[#f8eee0] bg-[radial-gradient(circle_at_35%_35%,#fff6da_0%,#9dd169_22%,#5e9235_48%,#f0aa52_92%)]" />
            {heroDishes.map((dish) => (
              <HeroDish key={dish.title} {...dish} />
            ))}
          </div>
        </section>

        <section className="mt-18 grid gap-4 md:grid-cols-3">
          {highlights.map((highlight) => (
            <FeatureCard key={highlight.title} {...highlight} />
          ))}
        </section>

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

          <div className="mt-6 rounded-[28px] border border-dashed border-[#e7d7c7] bg-white/45 px-6 py-12 text-center text-sm text-stone-500">
            No meals available yet. Make sure the API is running and reachable.
          </div>
        </section>
      </div>
    </main>
  );
}
