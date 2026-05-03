import { ProviderMealDetails } from "@/features/provider/components/provider-meal-details";
import { getProviderMealById } from "@/lib/api/provider.server";
import { ParamsIdType } from "@/types";

export default async function ProviderMealPage({
  params,
}: ParamsIdType) {
  const { id } = await params;
  const meal = await getProviderMealById(id)

  return <ProviderMealDetails meal={meal.data} />;
}
