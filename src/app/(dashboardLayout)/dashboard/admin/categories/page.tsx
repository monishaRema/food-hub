import { DashboardPageShell } from "@/components/shared/dashboard-page-shell";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getCategories } from "@/lib/api/category.server";
import { formatDate } from "@/lib/utils/format";

type CategoryCardItem = {
  id: string;
  name: string;
  createdAt?: string;
};

export default async function AdminCategoriesPage() {
  const categories = (await getCategories()) as CategoryCardItem[];

  return (
    <main className="space-y-8">
      <DashboardPageShell
        title="Meal Categories"
        description="Keep your FoodHub catalog organized with clear category labels for every menu item. Review the available categories below and use them to maintain a tidy, easy-to-browse storefront experience."
      />

      <section className="rounded-[28px] border border-[#eadfd2] bg-[#f7f1e9] p-6 shadow-sm sm:p-8">
        <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
          <div className="space-y-2">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-stone-500">
              Category Directory
            </p>
            <h2 className="text-2xl font-semibold tracking-tight text-stone-900">
              Browse existing meal categories
            </h2>
            <p className="max-w-2xl text-sm leading-6 text-stone-600">
              Each card highlights the category name and the date it was added
              so the admin team can quickly scan the current setup.
            </p>
          </div>

          <div className="inline-flex rounded-full bg-white px-4 py-2 text-sm font-semibold text-stone-700 ring-1 ring-[#eadfd2]">
            {categories.length} {categories.length === 1 ? "category" : "categories"}
          </div>
        </div>

        {categories.length === 0 ? (
          <div className="rounded-[24px] border border-dashed border-[#e4d7ca] bg-white/70 px-6 py-12 text-center text-sm text-stone-500">
            No categories are available yet.
          </div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {categories.map((category) => (
              <Card
                key={category.id}
                className="rounded-[24px] border border-[#eadfd2] bg-white py-0 shadow-[0_10px_28px_rgba(33,24,17,0.05)]"
              >
                <CardHeader className="bg-amber-50 py-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#f97316]">
                    Category
                  </p>
                  <CardTitle className="text-xl font-semibold tracking-tight text-stone-900">
                    {category.name}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2 py-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-stone-500">
                    Created At
                  </p>
                  <p className="text-sm font-medium text-stone-700">
                    {formatDate(category.createdAt)}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
