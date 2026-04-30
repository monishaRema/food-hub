import { MealList } from "@/features/meals/components/MealList";
import MealsHero from "@/features/meals/MealsHero";
import { getMeals } from "@/lib/api/meals.api";

export default async function MealPage() {
  const meals = await getMeals();

  return (
    <main>
      <MealsHero></MealsHero>
      <section className="py-25 bg-[radial-gradient(circle_at_top,rgba(249,115,22,0.14),transparent_26%),linear-gradient(180deg,#fcf7f1_0%,#f9f4ee_42%,#f7f1e9_100%)]">
        <div className="container mx-auto px-6">
          <h2 className=" text-center mb-10 text-4xl font-semibold tracking-tight text-[#111331] sm:text-5xl lg:text-6xl">
                  <span className="">Browse Our </span>
                  <span className=" text-[#ff8b2b]">
                    Delicious Food
                  </span>
                </h2>
          <MealList meals={meals}></MealList>
        </div>
      </section>
    </main>
  );
}
