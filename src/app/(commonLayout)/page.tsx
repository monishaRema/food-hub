import type { Metadata } from "next";

import FeaturedSection from "@/features/home/featured";
import HeroSection from "@/features/home/hero";
import HighlightSection from "@/features/home/highlights";
import { getFeaturedMeal } from "@/lib/api/meals.api";
import { DEFAULT_SITE_DESCRIPTION } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Discover local meals and trusted food providers",
  description: DEFAULT_SITE_DESCRIPTION,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Discover local meals and trusted food providers",
    description: DEFAULT_SITE_DESCRIPTION,
    url: "/",
  },
  twitter: {
    title: "Discover local meals and trusted food providers",
    description: DEFAULT_SITE_DESCRIPTION,
  },
};

export default async function Home() {
  const featuredMeals = await getFeaturedMeal({ page: "1", limit: "4" });
  return (
    <main>
      <HeroSection></HeroSection>
      <section className="py-15 bg-[radial-gradient(circle_at_top,rgba(249,115,22,0.14),transparent_26%),linear-gradient(180deg,#fcf7f1_0%,#f9f4ee_42%,#f7f1e9_100%)]">
        <div className="container mx-auto px-6">
          <HighlightSection></HighlightSection>
          <FeaturedSection meals={featuredMeals}></FeaturedSection>
        </div>
      </section>
    </main>
  );
}
