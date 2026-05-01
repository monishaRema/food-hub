"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { toast } from "sonner";

import type { CartItem, CartMealInput } from "@/types/order";

const CART_STORAGE_KEY = "foodhub-cart";

type CartContextValue = {
  items: CartItem[];
  itemCount: number;
  subtotal: number;
  providerId: string | null;
  isHydrated: boolean;
  addToCart: (meal: CartMealInput) => boolean;
  increaseQuantity: (mealId: string) => void;
  decreaseQuantity: (mealId: string) => void;
  removeItem: (mealId: string) => void;
  clearCart: () => void;
};

const CartContext = createContext<CartContextValue | null>(null);

function readCartFromStorage(): CartItem[] {
  if (typeof window === "undefined") {
    return [];
  }

  try {
    const storedValue = window.localStorage.getItem(CART_STORAGE_KEY);

    if (!storedValue) {
      return [];
    }

    const parsedValue = JSON.parse(storedValue) as unknown;

    if (!Array.isArray(parsedValue)) {
      return [];
    }

    return parsedValue.filter((item): item is CartItem => {
      if (!item || typeof item !== "object") {
        return false;
      }

      const candidate = item as Partial<CartItem>;

      return (
        typeof candidate.mealId === "string" &&
        typeof candidate.providerId === "string" &&
        typeof candidate.name === "string" &&
        typeof candidate.quantity === "number" &&
        candidate.quantity > 0 &&
        typeof candidate.price === "number"
      );
    });
  } catch {
    return [];
  }
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    setItems(readCartFromStorage());
    setIsHydrated(true);
  }, []);

  useEffect(() => {
    if (!isHydrated) {
      return;
    }

    window.localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
  }, [isHydrated, items]);

  const providerId = items[0]?.providerId ?? null;

  const itemCount = useMemo(
    () => items.reduce((total, item) => total + item.quantity, 0),
    [items],
  );

  const subtotal = useMemo(
    () => items.reduce((total, item) => total + item.price * item.quantity, 0),
    [items],
  );

  const addToCart = (meal: CartMealInput) => {
    let wasAdded = false;
    let didIncreaseExisting = false;
    let didReject = false;

    setItems((currentItems) => {
      if (
        currentItems.length > 0 &&
        currentItems[0]?.providerId !== meal.providerId
      ) {
        didReject = true;
        return currentItems;
      }

      const existingItem = currentItems.find((item) => item.mealId === meal.mealId);

      if (existingItem) {
        didIncreaseExisting = true;
        wasAdded = true;

        return currentItems.map((item) =>
          item.mealId === meal.mealId
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        );
      }

      wasAdded = true;

      return [
        ...currentItems,
        {
          mealId: meal.mealId,
          providerId: meal.providerId,
          name: meal.name,
          image: meal.image ?? "",
          price: meal.price,
          quantity: 1,
        },
      ];
    });

    if (didReject) {
      toast.error("You can only order from one provider at a time.");
      return false;
    }

    if (wasAdded) {
      toast.success(
        didIncreaseExisting
          ? "Meal quantity updated in your cart."
          : "Meal added to your cart.",
      );
    }

    return wasAdded;
  };

  const increaseQuantity = (mealId: string) => {
    setItems((currentItems) =>
      currentItems.map((item) =>
        item.mealId === mealId ? { ...item, quantity: item.quantity + 1 } : item,
      ),
    );
  };

  const decreaseQuantity = (mealId: string) => {
    setItems((currentItems) =>
      currentItems.map((item) =>
        item.mealId === mealId
          ? { ...item, quantity: Math.max(1, item.quantity - 1) }
          : item,
      ),
    );
  };

  const removeItem = (mealId: string) => {
    setItems((currentItems) =>
      currentItems.filter((item) => item.mealId !== mealId),
    );
  };

  const clearCart = () => {
    setItems([]);
  };

  return (
    <CartContext.Provider
      value={{
        items,
        itemCount,
        subtotal,
        providerId,
        isHydrated,
        addToCart,
        increaseQuantity,
        decreaseQuantity,
        removeItem,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error("useCart must be used inside CartProvider");
  }

  return context;
}
