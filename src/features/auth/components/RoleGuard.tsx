"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

import { useAuth } from "@/providers/AuthProvider";
import type { UserRoleType } from "@/types/user";

type RoleGuardProps = {
  allowedRole: UserRoleType;
  children: React.ReactNode;
};

export function RoleGuard({ allowedRole, children }: RoleGuardProps) {
  const router = useRouter();
  const { user, isLoading } = useAuth();

  useEffect(() => {
    if (isLoading) {
      return;
    }

    if (!user) {
      router.replace("/auth/login");
      return;
    }

    if (user.role !== allowedRole) {
      router.replace("/dashboard");
    }
  }, [allowedRole, isLoading, router, user]);

  if (isLoading || !user || user.role !== allowedRole) {
    return null;
  }

  return children;
}
