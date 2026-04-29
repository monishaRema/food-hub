import { apiFetchServer } from "@/lib/api/apiFetchServer";

import type { AuthUser } from "@/types/user";

export async function getCurrentUser() {
  return apiFetchServer<AuthUser>("/auth/me", {
    cache: "no-store",
  });
}
