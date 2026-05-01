import { apiFetchServer } from "./apiFetchServer";
import { tags } from "@/constants/cache";
import type { AuthUser } from "@/types/user";

type GetUsersQuery = {
  page?: number;
  limit?: number;
};

export async function getUsers(query: GetUsersQuery = {}) {
  const searchParams = new URLSearchParams();

  if (query.page) {
    searchParams.set("page", String(query.page));
  }

  if (query.limit) {
    searchParams.set("limit", String(query.limit));
  }

  const endpoint = searchParams.size > 0
    ? `/admin/users?${searchParams.toString()}`
    : "/admin/users";

  return apiFetchServer<AuthUser[]>(endpoint, {
    tags: [tags.users],
  });
}

export async function getCurrentUser() {
  const response = await apiFetchServer<AuthUser>("/auth/me", {
    cache: "no-store",
  });

  return response.data;
}
