import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function HeroSection() {
  return (
    <section className="py-25 bg-[radial-gradient(circle_at_top,rgba(249,115,22,0.14),transparent_26%),linear-gradient(180deg,#fcf7f1_0%,#f9f4ee_42%,#f7f1e9_100%)]">
      <div className="container mx-auto px-6">
        <div className="grid gap-10 grid-cols-1 lg:grid-cols-2 lg:items-center">
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
                className="h-12 rounded-xl bg-orange-500 px-6 text-white hover:bg-slate-900"
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
                className="h-12 rounded-xl border-[#ddcec1] bg-white/75 px-6 text-stone-800 hover:bg-orange-500 hover:text-white"
              >
                <Link href="/providers">View providers</Link>
              </Button>
            </div>
          </div>

          <div className="image-container relative max-w-3xl min-h-100 rounded-2xl overflow-hidden">
            <Image loading="eager" src={"/assets/hero-food.jpg"} alt="Burger" fill={true} className="object-contain " >

            </Image>
          </div>
        </div>
      </div>
    </section>
  );
}
