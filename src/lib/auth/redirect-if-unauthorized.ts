import "server-only";

import { redirect } from "next/navigation";

import { isUnauthorizedError } from "@/lib/api/errors";

export function redirectIfUnauthorized(error: unknown, nextPath: string) {
  if (!isUnauthorizedError(error)) {
    return;
  }

  const params = new URLSearchParams({
    next: nextPath,
    reason: "session-expired",
  });

  redirect(`/auth/login?${params.toString()}`);
}
