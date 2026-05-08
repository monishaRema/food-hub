import { apiFetchServer } from "./apiFetchServer";
import { tags } from "@/constants/cache";
import type { AuthUser } from "@/types/user";
import { getCurrentUser } from "@/lib/auth/server-auth";
import { getQuery } from "../utils/query";
import { QuerySearchType } from "../schema";



export async function getUsers(params: QuerySearchType) {

  const query = getQuery(params)
  

  return apiFetchServer<AuthUser[]>(`/api/admin/users${query? `?${query}` : ""}`, {
    tags: [tags.users],
    forwardCookies: true,
  });
}
