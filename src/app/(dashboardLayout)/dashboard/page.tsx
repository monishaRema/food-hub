"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

import { useAuth } from "@/providers/AuthProvider";

export default function DashboardPage() {
  const router = useRouter();
  const { user, isLoading } = useAuth();

  useEffect(() => {
    if (isLoading) return;

    if (!user) {
      router.replace("/auth/login");
      return;
    }

    if (user.role === "ADMIN") {
      router.replace("/dashboard/admin");
      return;
    }

    if (user.role === "PROVIDER") {
      router.replace("/dashboard/provider");
      return;
    }

    if (user.role === "CUSTOMER") {
      router.replace("/dashboard/customer");
      return;
    }

    router.replace("/auth/login");
  }, [user, isLoading, router]);

  return null;
}
