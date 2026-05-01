import { CartPageClient } from "@/features/orders/components/CartPageClient";

export default function CartPage() {
  return (
    <main className="bg-[radial-gradient(circle_at_top,rgba(249,115,22,0.12),transparent_22%),linear-gradient(180deg,#fcf7f1_0%,#f9f4ee_42%,#f7f1e9_100%)] py-14">
      <section className="container mx-auto px-4 sm:px-6">
        <CartPageClient />
      </section>
    </main>
  );
}
