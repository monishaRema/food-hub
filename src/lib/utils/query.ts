import { QuerySearchType } from "../schema";

export function getQuery (params:QuerySearchType) {
  const searchParams = new URLSearchParams();

  if (params.page !== undefined)
    searchParams.set("page", String(params.page));

  if (params.limit !== undefined)
    searchParams.set("limit", String(params.limit));

  const query = searchParams.toString();

  return query
}