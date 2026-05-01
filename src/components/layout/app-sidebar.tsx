"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { useAuth } from "@/providers/AuthProvider";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import { UtensilsCrossed } from "lucide-react";
import { cn } from "@/lib/utils/utils";

type NavItem = {
  title: string;
  url: string;
};

type NavGroup = {
  title: string;
  items: NavItem[];
};

function getNavByRole(role?: string): NavGroup[] {
  if (role === "ADMIN") {
    return [
      {
        title: "Admin",
        items: [
          { title: "Dashboard", url: "/dashboard/admin" },
          { title: "View Users", url: "/dashboard/admin/users" },
          { title: "Categories", url: "/dashboard/admin/categories" },
          { title: "Create Category", url: "/dashboard/admin/create-category" },
          { title: "Orders", url: "/dashboard/admin/orders" },
          { title: "Providers", url: "/dashboard/admin/providers" },
          {title:"Home",url:"/"}
        ],
      },
    ];
  }

  if (role === "PROVIDER") {
    return [
      {
        title: "Provider",
        items: [
           { title: "Dashboard", url: "/dashboard/provider" },
          { title: "Meals", url: "/dashboard/providers/meals" },
          { title: "Create Meal", url: "/dashboard/providers/create-meals" },
          { title: "Orders", url: "/dashboard/providers/orders" },
           {title:"Home",url:"/"}
        ],
      },
    ];
  }

  return [
    {
      title: "Customer",
      items: [
        { title: "Dashboard", url: "/dashboard" },
        { title: "Become Provider", url: "/dashboard/become-provider" },
        { title: "My Orders", url: "/dashboard/my-orders" },
         {title:"Home",url:"/"}
      ],
    },
  ];
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { user, isLoading } = useAuth();
  const pathname = usePathname();

  const navMain = getNavByRole(user?.role);
  const isActivePath = (href: string) =>
    pathname === href || pathname.startsWith(`${href}/`);

  return (
    <Sidebar {...props}>
      <SidebarContent>
         <Link href="/" className="logo flex gap-5 p-5">
              <span className="flex size-9 items-center justify-center rounded-xl bg-[#f97316] text-white shadow-sm">
                <UtensilsCrossed className="size-4" />
              </span>

              <span className="text-2xl font-semibold tracking-tight">
                FoodHub
              </span>
            </Link>
        {isLoading ? (
          <SidebarGroup>
            <SidebarGroupLabel>Loading...</SidebarGroupLabel>
          </SidebarGroup>
        ) : (
          navMain.map((group) => (
            
            <SidebarGroup key={group.title}>
              <SidebarGroupLabel>{group.title}</SidebarGroupLabel>

              <SidebarGroupContent>
                <SidebarMenu>
                  {group.items.map((item) => (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton
                        asChild
                        isActive={isActivePath(item.url)}
                      >
                        <Link
                          href={item.url}
                          className={cn(
                            isActivePath(item.url) &&
                              "font-semibold text-[#f97316]",
                          )}
                        >
                          {item.title}
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          ))
        )}
      </SidebarContent>

      <SidebarRail />
    </Sidebar>
  );
}
