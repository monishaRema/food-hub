"use server"

import { cookies } from "next/headers";

import { env } from "@/env";
import { apiFetchServer } from "@/lib/api/apiFetchServer";
import type { LoginType, RegisterUser } from "@/lib/schema/auth.schema";
import type { AuthUser } from "@/types/user";

export async function registerUserAction (data: RegisterUser) {

  const user = await apiFetchServer<AuthUser>(`/api/auth/register`, {
              method: "POST",
              data: data,
              cache: "no-store"
            });

  return user

}

type LoginActionResult =
  | {
      success: true;
    }
  | {
      success: false;
      message: string;
    };

type LoginResponse = {
  user?: AuthUser;
  accessToken?: string;
  refreshToken?: string;
};

function shouldUseSecureCookies() {
  try {
    return new URL(env.FRONTEND_BASE_URL).protocol === "https:";
  } catch {
    return false;
  }
}

function getTokenMaxAge(token: string) {
  try {
    const [, payload] = token.split(".");

    if (!payload) {
      return undefined;
    }

    const normalizedPayload = payload.replace(/-/g, "+").replace(/_/g, "/");
    const decodedPayload = JSON.parse(
      Buffer.from(normalizedPayload, "base64").toString("utf-8"),
    ) as { exp?: number };

    if (!decodedPayload.exp) {
      return undefined;
    }

    const maxAge = decodedPayload.exp - Math.floor(Date.now() / 1000);

    return maxAge > 0 ? maxAge : undefined;
  } catch {
    return undefined;
  }
}

export async function loginAction(data: LoginType): Promise<LoginActionResult> {
  const result = await apiFetchServer<LoginResponse>("/api/auth/login", {
    method: "POST",
    data,
    cache: "no-store",
  });
  const cookieStore = await cookies();
  const accessToken = result.data?.accessToken;
  const refreshToken = result.data?.refreshToken;

  if (!accessToken || !refreshToken) {
    return {
      success: false,
      message: "Login succeeded but the backend did not return auth tokens.",
    };
  }

  const accessTokenMaxAge = getTokenMaxAge(accessToken);
  const refreshTokenMaxAge = getTokenMaxAge(refreshToken);
  const secureCookies = shouldUseSecureCookies();

  cookieStore.set("access-token", accessToken, {
    httpOnly: true,
    secure: secureCookies,
    sameSite: "lax",
    path: "/",
    ...(accessTokenMaxAge ? { maxAge: accessTokenMaxAge } : {}),
  });

  cookieStore.set("refresh-token", refreshToken, {
    httpOnly: true,
    secure: secureCookies,
    sameSite: "lax",
    path: "/",
    ...(refreshTokenMaxAge ? { maxAge: refreshTokenMaxAge } : {}),
  });

  return {
    success: true,
  };
}
