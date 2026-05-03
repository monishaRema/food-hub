import { apiFetchServer } from "./apiFetchServer";
import { tags } from "@/constants/cache";
import type { AuthUser } from "@/types/user";
import { getQuery } from "../utils/query";
import { QuerySearchType } from "../schema";



export async function getUsers(params: QuerySearchType) {

  const query = getQuery(params)
  

  return apiFetchServer<AuthUser[]>(`/admin/users${query? `?${query}` : ""}`, {
    tags: [tags.users],
  });
}

export async function getCurrentUser() {
  const response = await apiFetchServer<AuthUser>("/auth/me", {
    cache: "no-store",
  });

  return response.data;
}