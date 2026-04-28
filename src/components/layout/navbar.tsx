"use client";

import { Menu, ShoppingCart, UtensilsCrossed } from "lucide-react";

import { Accordion } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { env } from "@/env";
import Link from "next/link";

interface MenuItem {
  title: string;
  url: string;
  description?: string;
  icon?: React.ReactNode;
  items?: MenuItem[];
}

interface Navbar1Props {
  className?: string;
  logo?: {
    url: string;
    src: string;
    alt: string;
    title: string;
    className?: string;
  };
  menu?: MenuItem[];
  auth?: {
    login: {
      title: string;
      url: string;
    };
    signup: {
      title: string;
      url: string;
    };
  };
}

const Navbar = ({
  logo = {
    url: env.NEXT_PUBLIC_BASE_URL,
    src: "/assets/logo.png",
    alt: "logo",
    title: "FoodHub",
  },
  menu = [
    { title: "Home", url: "/" },
    {
      title: "Providers",
      url: "/providers",
    },
    {
      title: "Meals",
      url: "/meals",
    },
  ],
  auth = {
    login: { title: "Login", url: "/auth/login" },
    signup: { title: "Sign up", url: "/auth/signup" },
  },
  className,
}: Navbar1Props) => {
  return (
    <section
      className={cn(
        "border-b border-border/60 bg-[#f7f1e9] text-foreground",
        className
      )}
    >
      <div className="container mx-auto px-6 py-4">
        {/* Desktop Menu */}
        <nav className="hidden items-center justify-between lg:flex">
          <div className="flex items-center gap-6">
            {/* Logo */}
            <Link href={logo.url} className="flex items-center gap-2">
              <span className="flex size-9 items-center justify-center rounded-xl bg-[#f97316] text-white shadow-sm">
                <UtensilsCrossed className="size-4" />
              </span>
              <span className="text-2xl font-semibold tracking-tight">
                {logo.title}
              </span>
            </Link>
            <div className="flex items-center">
              <NavigationMenu>
                <NavigationMenuList>
                  {menu.map((item) => renderMenuItem(item))}
                </NavigationMenuList>
              </NavigationMenu>
            </div>
          </div>
          <div className="flex gap-2">
            <Button
              asChild
              variant="outline"
              size="icon"
              className="border-border/70 bg-transparent hover:bg-[#efe4d7]"
            >
              <Link href="/orders" aria-label="My orders">
                <ShoppingCart className="size-4" />
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="sm"
              className="border-border/70 bg-transparent hover:bg-[#efe4d7]"
            >
              <Link href={auth.login.url}>{auth.login.title}</Link>
            </Button>
            <Button
              asChild
              size="sm"
              className="bg-[#f97316] text-white hover:bg-[#ea6b12]"
            >
              <Link href={auth.signup.url}>{auth.signup.title}</Link>
            </Button>
          </div>
        </nav>

        {/* Mobile Menu */}
        <div className="block lg:hidden">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link href={logo.url} className="flex items-center gap-2">
              <span className="flex size-9 items-center justify-center rounded-xl bg-[#f97316] text-white shadow-sm">
                <UtensilsCrossed className="size-4" />
              </span>
              <span className="text-2xl font-semibold tracking-tight">
                {logo.title}
              </span>
            </Link>
            <Sheet>
              <SheetTrigger asChild>
                <Button
                  variant="outline"
                  size="icon"
                  className="border-border/70 bg-transparent hover:bg-[#efe4d7]"
                >
                  <Menu className="size-4" />
                </Button>
              </SheetTrigger>
              <SheetContent className="overflow-y-auto bg-[#f7f1e9]">
                <SheetHeader>
                  <SheetTitle>
                    <Link href={logo.url} className="flex items-center gap-2">
                      <span className="flex size-9 items-center justify-center rounded-xl bg-[#f97316] text-white shadow-sm">
                        <UtensilsCrossed className="size-4" />
                      </span>

                      <span className="text-2xl font-semibold tracking-tight">
                        {logo.title}
                      </span>
                    </Link>
                  </SheetTitle>
                </SheetHeader>
                <div className="flex flex-col gap-6 p-4">
                  <Accordion
                    type="single"
                    collapsible
                    className="flex w-full flex-col gap-4"
                  >
                    {menu.map((item) => renderMobileMenuItem(item))}
                  </Accordion>

                  <div className="flex flex-col gap-3">
                    <Button
                      asChild
                      variant="outline"
                      className="border-border/70 bg-transparent hover:bg-[#efe4d7]"
                    >
                      <Link href="/orders" className="flex items-center gap-2">
                        <ShoppingCart className="size-4" />
                        <span>My orders</span>
                      </Link>
                    </Button>
                    <Button
                      asChild
                      variant="outline"
                      className="border-border/70 bg-transparent hover:bg-[#efe4d7]"
                    >
                      <Link href={auth.login.url}>{auth.login.title}</Link>
                    </Button>
                    <Button
                      asChild
                      className="bg-[#f97316] text-white hover:bg-[#ea6b12]"
                    >
                      <Link href={auth.signup.url}>{auth.signup.title}</Link>
                    </Button>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </section>
  );
};

const renderMenuItem = (item: MenuItem) => {
  if (item.items) {
    return (
      <NavigationMenuItem key={item.title}>
        <NavigationMenuTrigger>{item.title}</NavigationMenuTrigger>
      </NavigationMenuItem>
    );
  }

  return (
    <NavigationMenuItem key={item.title}>
      <NavigationMenuLink
        asChild
        className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-transparent px-4 py-2 text-sm font-medium transition-colors hover:bg-[#efe4d7] hover:text-foreground"
      >
        <Link href={item.url}>{item.title}</Link>
      </NavigationMenuLink>
    </NavigationMenuItem>
  );
};

const renderMobileMenuItem = (item: MenuItem) => {
  return (
    <Link key={item.title} href={item.url} className="text-md font-semibold">
      {item.title}
    </Link>
  );
};

export { Navbar };
