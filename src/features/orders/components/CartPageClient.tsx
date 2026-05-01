"use client";

import Image from "next/image";
import Link from "next/link";
import { startTransition, useState } from "react";
import { useRouter } from "next/navigation";
import { Minus, Plus, ShoppingCart, Trash2 } from "lucide-react";
import { toast } from "sonner";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { createOrderAction } from "@/features/orders/actions/create-order-action";
import { buildLoginRedirectPath } from "@/lib/auth/login-redirect";
import { formatPrice } from "@/lib/utils/format";
import { useCart } from "@/providers/CartProvider";

function CartImage({
  src,
  alt,
  fallback,
}: {
  src?: string;
  alt: string;
  fallback: string;
}) {
  if (src) {
    return (
      <div className="relative h-16 w-16 overflow-hidden rounded-2xl bg-stone-100">
        <Image src={src} alt={alt} fill sizes="64px" className="object-cover" />
      </div>
    );
  }

  return (
    <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[#fff2e8] text-sm font-semibold text-[#f97316]">
      {fallback}
    </div>
  );
}

function getFallbackLabel(name: string) {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("");
}

export function CartPageClient() {
  const router = useRouter();
  const {
    items,
    subtotal,
    itemCount,
    isHydrated,
    clearCart,
    decreaseQuantity,
    increaseQuantity,
    removeItem,
  } = useCart();
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [deliveryAddress, setDeliveryAddress] = useState("");
  const [contactPhone, setContactPhone] = useState("");

  async function handleCheckout() {
    if (items.length === 0) {
      toast.error("Your cart is empty.");
      return;
    }

    if (!deliveryAddress.trim()) {
      toast.error("Delivery address is required.");
      return;
    }

    if (!contactPhone.trim()) {
      toast.error("Contact phone is required.");
      return;
    }

    setIsCheckingOut(true);
    const toastId = toast.loading("Placing your order");

    try {
      const result = await createOrderAction({
        deliveryAddress,
        contactPhone,
        items: items.map((item) => ({
          mealId: item.mealId,
          quantity: item.quantity,
        })),
      });

      if (!result.success) {
        if (result.reason === "unauthorized") {
          router.replace(buildLoginRedirectPath("/cart"));
          return;
        }

        toast.error(result.message, { id: toastId });
        return;
      }

      clearCart();
      toast.success("Order created successfully.", { id: toastId });
      startTransition(() => {
        router.push("/dashboard/my-orders");
        router.refresh();
      });
    } finally {
      setIsCheckingOut(false);
    }
  }

  if (!isHydrated) {
    return (
      <Card className="rounded-[28px] border border-[#eadfd2] bg-white shadow-sm">
        <CardHeader>
          <CardTitle className="text-2xl text-stone-900">Loading cart</CardTitle>
          <CardDescription className="text-sm text-stone-600">
            Restoring your saved cart items.
          </CardDescription>
        </CardHeader>
      </Card>
    );
  }

  return (
    <div className="space-y-8">
      <section className="rounded-[28px] border border-[#eadfd2] bg-[#f7f1e9] p-6 shadow-sm sm:p-8">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div className="space-y-2">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-stone-500">
              Cart Summary
            </p>
            <h2 className="text-2xl font-semibold tracking-tight text-stone-900">
              Review your selected meals
            </h2>
            <p className="max-w-2xl text-sm leading-6 text-stone-600">
              Your cart is stored locally for convenience, while the backend
              validates prices, meal availability, and provider consistency at checkout.
            </p>
          </div>

          <div className="inline-flex items-center rounded-full bg-white px-4 py-2 text-sm font-semibold text-stone-700 ring-1 ring-[#eadfd2]">
            <ShoppingCart className="mr-2 size-4 text-[#f97316]" />
            {itemCount} {itemCount === 1 ? "item" : "items"}
          </div>
        </div>
      </section>

      {items.length === 0 ? (
        <Card className="rounded-[28px] border border-dashed border-[#e4d7ca] bg-white/75 shadow-sm">
          <CardHeader>
            <CardTitle className="text-2xl text-stone-900">Your cart is empty</CardTitle>
            <CardDescription className="max-w-xl text-sm leading-6 text-stone-600">
              Browse providers and add meals from one kitchen to start your order.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button asChild className="bg-[#f97316] text-white hover:bg-[#ea6b12]">
              <Link href="/providers">Browse providers</Link>
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_340px]">
          <div className="overflow-hidden rounded-[28px] border border-[#eadfd2] bg-white shadow-sm">
            <div className="border-b border-[#f1e5d7] px-6 py-5">
              <h3 className="text-xl font-semibold text-stone-900">Cart items</h3>
              <p className="mt-1 text-sm text-stone-600">
                Quantity changes are saved locally until you place the order.
              </p>
            </div>

            <Table>
              <TableHeader>
                <TableRow className="border-[#f1e5d7] bg-stone-50/80 hover:bg-stone-50/80">
                  <TableHead className="px-6 py-4">Meal</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>Quantity</TableHead>
                  <TableHead className="text-right">Total</TableHead>
                  <TableHead className="px-6 text-right">Remove</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {items.map((item) => (
                  <TableRow key={item.mealId} className="border-[#f7ede2] hover:bg-[#fffaf5]">
                    <TableCell className="px-6 py-4">
                      <div className="flex min-w-[260px] items-center gap-4">
                        <CartImage
                          src={item.image}
                          alt={item.name}
                          fallback={getFallbackLabel(item.name)}
                        />
                        <div className="min-w-0">
                          <p className="font-medium text-stone-900">{item.name}</p>
                          <p className="mt-1 text-xs text-stone-500">
                            Meal ID: {item.mealId}
                          </p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="text-stone-700">
                      {formatPrice(item.price)}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Button
                          type="button"
                          size="icon"
                          variant="outline"
                          className="border-[#eadfd2]"
                          onClick={() => decreaseQuantity(item.mealId)}
                        >
                          <Minus className="size-4" />
                        </Button>
                        <Badge
                          variant="outline"
                          className="min-w-10 justify-center border-[#eadfd2] bg-white px-3 py-1 text-stone-700"
                        >
                          {item.quantity}
                        </Badge>
                        <Button
                          type="button"
                          size="icon"
                          variant="outline"
                          className="border-[#eadfd2]"
                          onClick={() => increaseQuantity(item.mealId)}
                        >
                          <Plus className="size-4" />
                        </Button>
                      </div>
                    </TableCell>
                    <TableCell className="text-right font-semibold text-stone-900">
                      {formatPrice(item.price * item.quantity)}
                    </TableCell>
                    <TableCell className="px-6 text-right">
                      <Button
                        type="button"
                        size="sm"
                        variant="outline"
                        className="border-[#eadfd2] text-red-700 hover:bg-red-50 hover:text-red-800"
                        onClick={() => removeItem(item.mealId)}
                      >
                        <Trash2 className="size-4" />
                        Remove
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          <Card className="h-fit rounded-[28px] border border-[#eadfd2] bg-white shadow-sm">
            <CardHeader className="bg-amber-50">
              <CardTitle className="text-2xl text-stone-900">Checkout</CardTitle>
              <CardDescription className="text-sm leading-6 text-stone-600">
                The backend will recalculate pricing and validate every meal before creating the real order.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-5 pt-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <label
                    htmlFor="deliveryAddress"
                    className="text-sm font-medium text-stone-700"
                  >
                    Delivery address
                  </label>
                  <Input
                    id="deliveryAddress"
                    value={deliveryAddress}
                    onChange={(event) => setDeliveryAddress(event.target.value)}
                    placeholder="Apartment, street, area"
                    className="h-11 border-[#eadfd2] bg-white focus-visible:ring-[#f97316]/20"
                  />
                </div>
                <div className="space-y-2">
                  <label
                    htmlFor="contactPhone"
                    className="text-sm font-medium text-stone-700"
                  >
                    Contact phone
                  </label>
                  <Input
                    id="contactPhone"
                    value={contactPhone}
                    onChange={(event) => setContactPhone(event.target.value)}
                    placeholder="+974 5555 1234"
                    className="h-11 border-[#eadfd2] bg-white focus-visible:ring-[#f97316]/20"
                  />
                </div>
              </div>

              <div className="space-y-3 rounded-[24px] border border-[#eadfd2] bg-[#fffaf5] p-5">
                <div className="flex items-center justify-between text-sm text-stone-600">
                  <span>Items</span>
                  <span>{itemCount}</span>
                </div>
                <div className="flex items-center justify-between text-sm text-stone-600">
                  <span>Provider</span>
                  <span className="truncate pl-4 text-right">{items[0]?.providerId}</span>
                </div>
                <div className="flex items-center justify-between border-t border-[#eadfd2] pt-3 text-base font-semibold text-stone-900">
                  <span>Estimated subtotal</span>
                  <span>{formatPrice(subtotal)}</span>
                </div>
              </div>

              <div className="flex flex-col gap-3">
                <Button
                  type="button"
                  className="h-11 bg-[#f97316] text-white hover:bg-[#ea6b12]"
                  disabled={isCheckingOut}
                  onClick={() => void handleCheckout()}
                >
                  {isCheckingOut ? "Placing order..." : "Checkout"}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  className="h-11 border-[#eadfd2] bg-transparent"
                  disabled={isCheckingOut}
                  onClick={clearCart}
                >
                  Clear cart
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
