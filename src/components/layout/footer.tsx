import Link from "next/link";
import { UtensilsCrossed } from "lucide-react";

import { env } from "@/env";

const exploreLinks = [
  { label: "All meals", href: "/meals" },
  { label: "Providers", href: "/providers" },
];

const accountLinks = [
  { label: "Log in", href: "/auth/login" },
  { label: "Sign up", href: "/auth/signup" },
  { label: "Cart", href: "/cart" },
];

export default function Footer() {
  return (
    <footer className="border-t border-border/60 bg-[#f7f1e9] text-foreground">
      <div className="container mx-auto px-6 py-12">
        <div className="grid gap-10 md:grid-cols-[minmax(0,1.6fr)_220px_220px] md:gap-16">
          <div className="max-w-md space-y-4">
            <Link href={env.NEXT_PUBLIC_BASE_URL} className="inline-flex items-center gap-3">
              <span className="flex size-9 items-center justify-center rounded-xl bg-[#f97316] text-white shadow-sm">
                <UtensilsCrossed className="size-4" />
              </span>
              <span className="text-2xl font-semibold tracking-tight">FoodHub</span>
            </Link>
            <p className="text-base leading-7 text-muted-foreground">
              Discover meals from local providers and order with cash on
              delivery.
            </p>
          </div>

          <FooterColumn title="Explore" links={exploreLinks} />
          <FooterColumn title="Account" links={accountLinks} />
        </div>
      </div>

      <div className="border-t border-border/60 px-6 py-5">
        <p className="text-center text-sm text-muted-foreground">
          &copy; 2026 FoodHub. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

interface FooterColumnProps {
  title: string;
  links: Array<{
    label: string;
    href: string;
  }>;
}

function FooterColumn({ title, links }: FooterColumnProps) {
  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold tracking-tight">{title}</h2>
      <nav className="flex flex-col gap-3">
        {links.map((link) => (
          <Link
            key={link.label}
            href={link.href}
            className="w-fit text-base text-muted-foreground transition-colors hover:text-foreground"
          >
            {link.label}
          </Link>
        ))}
      </nav>
    </div>
  );
}
