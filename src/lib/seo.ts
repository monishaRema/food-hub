import { env } from "@/env";

export const SITE_NAME = "FoodHub";
export const DEFAULT_SITE_DESCRIPTION =
  "Discover local meals, browse trusted food providers, and order fresh dishes from one streamlined FoodHub experience.";

const siteUrl = new URL(env.FRONTEND_BASE_URL);

export function getSiteUrl() {
  return siteUrl;
}

export function absoluteUrl(path = "/") {
  return new URL(path, siteUrl).toString();
}

export function normalizeDescription(
  value: string | null | undefined,
  fallback = DEFAULT_SITE_DESCRIPTION,
) {
  const normalized = value?.replace(/\s+/g, " ").trim();

  if (!normalized) {
    return fallback;
  }

  return normalized.length > 160
    ? `${normalized.slice(0, 157).trimEnd()}...`
    : normalized;
}

export function toAbsoluteImageUrl(image: string | null | undefined) {
  if (!image) {
    return undefined;
  }

  try {
    return new URL(image, siteUrl).toString();
  } catch {
    return undefined;
  }
}
