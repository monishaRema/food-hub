import { ProviderMealDetailsClient } from "@/features/provider/components/provider-meal-details-client";

export default async function ProviderMealPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return <ProviderMealDetailsClient mealId={id} />;
}
