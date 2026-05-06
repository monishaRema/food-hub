"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

import { useAuth } from "@/providers/AuthProvider";

export default function AuthLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const router = useRouter();
  const { user, isLoading } = useAuth();

  useEffect(() => {
    if (isLoading || !user) {
      return;
    }

    router.replace("/dashboard");
  }, [isLoading, router, user]);

  if (isLoading || user) {
    return null;
  }

  return children;
}
