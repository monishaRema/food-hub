"use client";

import { ShoppingCart } from "lucide-react";

import { Button } from "@/components/ui/button";
import { useCart } from "@/providers/CartProvider";
import type { CartMealInput } from "@/types/order";

export function AddToCartButton({
  meal,
  className,
}: {
  meal: CartMealInput;
  className?: string;
}) {
  const { addToCart } = useCart();

  const isDisabled = !meal.providerId;

  return (
    <Button
      type="button"
      className={className}
      disabled={isDisabled}
      onClick={() => {
        if (!isDisabled) {
          addToCart(meal);
        }
      }}
    >
      <ShoppingCart className="size-4" />
      Add to cart
    </Button>
  );
}
