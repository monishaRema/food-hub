import "server-only";

import { headers } from "next/headers";

import { ApiError, UnauthorizedError } from "@/lib/api/errors";
import type { ApiFetchOptions, ApiSearchParamValue } from "@/lib/api/types";
import type { ApiResponse } from "@/types/api";

function getApiBaseUrl() {
  const apiBaseUrl =
    process.env.NEXT_PUBLIC_API_BASE_URL ??
    process.env.API_URL ??
    process.env.NEXT_PUBLIC_API_URL;

  if (!apiBaseUrl) {
    throw new Error("Missing API base URL. Set NEXT_PUBLIC_API_BASE_URL.");
  }

  return apiBaseUrl;
}

function appendSearchParam(
  url: URL,
  key: string,
  value: ApiSearchParamValue,
) {
  if (value === undefined || value === null || value === "") {
    return;
  }

  url.searchParams.append(key, String(value));
}

function buildUrl(path: string, searchParams?: ApiFetchOptions["searchParams"]) {
  const url = new URL(path, getApiBaseUrl());

  if (!searchParams) {
    return url;
  }

  for (const [key, rawValue] of Object.entries(searchParams)) {
    if (Array.isArray(rawValue)) {
      for (const value of rawValue) {
        appendSearchParam(url, key, value);
      }

      continue;
    }

    appendSearchParam(url, key, rawValue);
  }

  return url;
}

async function parseResponse<T>(response: Response): Promise<T> {
  const text = await response.text();
  const payload = text ? (JSON.parse(text) as ApiResponse<T>) : null;

  if (!payload) {
    throw new ApiError("The server returned an empty response.", response.status);
  }

  if (!response.ok) {
    if (response.status === 401) {
      throw new UnauthorizedError(
        payload.message || "You need to sign in to continue.",
        payload.errorDetails ?? [],
      );
    }

    throw new ApiError(
      payload.message || `Request failed with status ${response.status}.`,
      response.status,
      payload.errorDetails ?? [],
    );
  }

  return payload.data as T;
}

export async function apiFetch<T>(
  path: string,
  options: ApiFetchOptions = {},
): Promise<T> {
  const {
    method = "GET",
    body,
    headers: initHeaders,
    searchParams,
    cache,
    next,
    forwardCookies = false,
  } = options;

  const requestHeaders = new Headers(initHeaders);

  if (body !== undefined && !requestHeaders.has("Content-Type")) {
    requestHeaders.set("Content-Type", "application/json");
  }

  if (forwardCookies) {
    const requestHeadersStore = await headers();
    const cookieHeader = requestHeadersStore.get("cookie");

    if (cookieHeader) {
      requestHeaders.set("cookie", cookieHeader);
    }
  }

  const response = await fetch(buildUrl(path, searchParams), {
    method,
    headers: requestHeaders,
    body: body === undefined ? undefined : JSON.stringify(body),
    cache,
    next,
  });

  return parseResponse<T>(response);
}
