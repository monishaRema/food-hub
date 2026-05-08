import type { MetadataRoute } from "next";

import { getMeals } from "@/lib/api/meals.api";
import { getPublicProviders } from "@/lib/api/publicProvider";
import { absoluteUrl } from "@/lib/seo";

const staticRoutes: MetadataRoute.Sitemap = [
  {
    url: absoluteUrl("/"),
    lastModified: new Date(),
    changeFrequency: "daily",
    priority: 1,
  },
  {
    url: absoluteUrl("/meals"),
    lastModified: new Date(),
    changeFrequency: "daily",
    priority: 0.9,
  },
  {
    url: absoluteUrl("/providers"),
    lastModified: new Date(),
    changeFrequency: "daily",
    priority: 0.8,
  },
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  try {
    const [meals, providers] = await Promise.all([
      getMeals({ page: 1, limit: 200, sortBy: "updatedAt", sortOrder: "desc" }),
      getPublicProviders({
        page: 1,
        limit: 200,
        sortBy: "updatedAt",
        sortOrder: "desc",
      }),
    ]);

    const mealRoutes: MetadataRoute.Sitemap = (meals.data ?? []).map((meal) => ({
      url: absoluteUrl(`/meals/${meal.id}`),
      lastModified: meal.updatedAt ?? meal.createdAt ?? new Date().toISOString(),
      changeFrequency: "weekly",
      priority: 0.7,
    }));

    const providerRoutes: MetadataRoute.Sitemap = (providers.data ?? []).map(
      (provider) => ({
        url: absoluteUrl(`/providers/${provider.id}`),
        lastModified:
          provider.updatedAt ?? provider.createdAt ?? new Date().toISOString(),
        changeFrequency: "weekly",
        priority: 0.7,
      }),
    );

    return [...staticRoutes, ...mealRoutes, ...providerRoutes];
  } catch {
    return staticRoutes;
  }
}
