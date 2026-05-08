import "server-only";

import { cache } from "react";
import { redirect } from "next/navigation";

import { UserRole } from "@/constants";
import { UnauthorizedError } from "@/lib/api/errors";
import { apiFetchServer } from "@/lib/api/apiFetchServer";
import { buildLoginRedirectPath } from "@/lib/auth/login-redirect";
import type { AuthUser, UserRoleType } from "@/types/user";

export const getCurrentUser = cache(async (): Promise<AuthUser | null> => {
  try {
    const response = await apiFetchServer<AuthUser>("/api/auth/me", {
      cache: "no-store",
      forwardCookies: true,
    });

    return response.data ?? null;
  } catch (error) {
    if (error instanceof UnauthorizedError) {
      return null;
    }

    throw error;
  }
});

export function getDashboardPathForRole(role: UserRoleType) {
  if (role === UserRole.ADMIN) {
    return "/dashboard/admin";
  }

  if (role === UserRole.PROVIDER) {
    return "/dashboard/provider";
  }

  return "/dashboard/customer";
}

export async function requireUser(nextPath = "/dashboard") {
  const user = await getCurrentUser();

  if (!user) {
    redirect(buildLoginRedirectPath(nextPath));
  }

  return user;
}

export async function requireRole(
  allowedRoles: UserRoleType[],
  nextPath = "/dashboard",
) {
  const user = await requireUser(nextPath);

  if (allowedRoles.includes(user.role)) {
    return user;
  }

  redirect(getDashboardPathForRole(user.role));
}
