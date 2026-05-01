import "server-only";

import { cookies } from "next/headers";

import { env } from "@/env";
import {
  ApiError,
  type ApiErrorDetails,
  UnauthorizedError,
} from "@/lib/api/errors";
import type { ApiFetchMethod } from "@/lib/api/types";
import type { ApiFetchResult, ApiResponse } from "@/types/api";

type ServerApiFetchOptions = {
  method?: ApiFetchMethod;
  data?: unknown;
  cache?: RequestCache;
  tags?: string[];
  revalidate?: number | false;
};

type RefreshResponse = {
  success: boolean;
  message: string;
  data: {
    accessToken: string;
  };
};

async function parseJson<T>(response: Response): Promise<ApiFetchResult<T>> {
  const contentType = response.headers.get("content-type");

  if (!contentType?.includes("application/json")) {
    throw new ApiError(
      `Invalid response from server. Status: ${response.status}`,
      response.status,
    );
  }

  const result = (await response.json()) as Omit<ApiResponse<T>, "res">;

  if (!response.ok) {
    const errorDetails = result.errorDetails as ApiErrorDetails[] | undefined;

    if (response.status === 401) {
      throw new UnauthorizedError(result.message, errorDetails);
    }

    throw new ApiError(
      result.message || `Request failed with ${response.status}`,
      response.status,
      errorDetails,
    );
  }

  return {
    data: result.data,
    meta: result.meta ?? null,
  };
}

function buildCookieHeader(params: {
  accessToken?: string;
  refreshToken?: string;
}) {
  const cookieParts: string[] = [];

  if (params.accessToken) {
    cookieParts.push(`access-token=${params.accessToken}`);
  }

  if (params.refreshToken) {
    cookieParts.push(`refresh-token=${params.refreshToken}`);
  }

  return cookieParts.join("; ");
}

function buildNextOptions(params: {
  tags?: string[];
  revalidate?: number | false;
}) {
  const { tags, revalidate } = params;

  if (!tags && revalidate === undefined) {
    return {};
  }

  return {
    next: {
      ...(tags ? { tags } : {}),
      ...(revalidate !== undefined ? { revalidate } : {}),
    },
  };
}

export async function apiFetchServer<T>(
  endpoint: string,
  options: ServerApiFetchOptions = {},
): Promise<ApiFetchResult<T>> {
  const { method = "GET", data, cache, tags, revalidate } = options;

  const cookieStore = await cookies();

  const currentAccessToken = cookieStore.get("access-token")?.value;
  const currentRefreshToken = cookieStore.get("refresh-token")?.value;

  const makeRequest = async (cookieHeader: string) => {
    return fetch(`${env.API_URL}${endpoint}`, {
      method,
      headers: {
        "Content-Type": "application/json",
        ...(cookieHeader ? { Cookie: cookieHeader } : {}),
      },
      ...(data !== undefined ? { body: JSON.stringify(data) } : {}),
      ...(cache ? { cache } : {}),
      ...buildNextOptions({ tags, revalidate }),
    });
  };

  let response = await makeRequest(
    buildCookieHeader({
      accessToken: currentAccessToken,
      refreshToken: currentRefreshToken,
    }),
  );

  if (response.status !== 401) {
    return parseJson<T>(response);
  }

  if (!currentRefreshToken) {
    throw new UnauthorizedError("Refresh token missing");
  }

  const refreshResponse = await fetch(`${env.API_URL}/auth/refresh-token`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Cookie: buildCookieHeader({
        refreshToken: currentRefreshToken,
      }),
    },
    cache: "no-store",
  });

  if (!refreshResponse.ok) {
    throw new UnauthorizedError("Session expired. Please login again.");
  }

  const refreshData = (await refreshResponse.json()) as RefreshResponse;

  const newAccessToken = refreshData.data?.accessToken;

  if (!newAccessToken) {
    throw new UnauthorizedError("Access token missing from refresh response");
  }

  cookieStore.set("accessToken", newAccessToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 30,
  });

  response = await makeRequest(
    buildCookieHeader({
      accessToken: newAccessToken,
      refreshToken: currentRefreshToken,
    }),
  );

  return parseJson<T>(response);
}