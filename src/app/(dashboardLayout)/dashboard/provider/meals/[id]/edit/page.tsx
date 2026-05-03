import { ProviderMealEditClient } from "@/features/provider/components/provider-meal-edit-client";

export default async function EditProviderMealPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return <ProviderMealEditClient mealId={id} />;
}
