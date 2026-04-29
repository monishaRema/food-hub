"use client";

import * as React from "react";
import Link from "next/link";

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
          { title: "View Users", url: "/dashboard/admin/users" },
          { title: "Categories", url: "/dashboard/admin/categories" },
          { title: "Orders", url: "/dashboard/admin/orders" },
          { title: "Providers", url: "/dashboard/admin/providers" },
        ],
      },
    ];
  }

  if (role === "PROVIDER") {
    return [
      {
        title: "Provider",
        items: [
          { title: "Meals", url: "/dashboard/providers/meals" },
          { title: "Orders", url: "/dashboard/providers/orders" },
        ],
      },
    ];
  }

  return [
    {
      title: "Customer",
      items: [
        { title: "Become Provider", url: "/dashboard/become-provider" },
        { title: "My Orders", url: "/dashboard/my-orders" },
      ],
    },
  ];
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { user, isLoading } = useAuth();

  const navMain = getNavByRole(user?.role);

  return (
    <Sidebar {...props}>
      <SidebarContent>
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
                      <SidebarMenuButton asChild>
                        <Link href={item.url}>{item.title}</Link>
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
