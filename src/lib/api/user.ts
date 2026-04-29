import { apiFetch } from "@/lib/api/apiFetch";
import type { AuthUser } from "@/types/user";

export async function getCurrentUser() {
  return apiFetch<AuthUser>("/auth/me");
}
