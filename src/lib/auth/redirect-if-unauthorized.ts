import "server-only";

import { redirect } from "next/navigation";

import { isUnauthorizedError } from "@/lib/api/errors";
import { buildLoginRedirectPath } from "@/lib/auth/login-redirect";

export function redirectIfUnauthorized(error: unknown, nextPath: string) {
  if (!isUnauthorizedError(error)) {
    return;
  }

  redirect(buildLoginRedirectPath(nextPath));
}
