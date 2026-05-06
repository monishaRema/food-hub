"use server"

import { apiFetchServer } from "@/lib/api/apiFetchServer";
import { cookies } from "next/headers";
import type { LoginType, RegisterUser } from "@/lib/schema/auth.schema";
import type { AuthUser, LoggedInUser } from "@/types/user";

export async function registerUserAction (data: RegisterUser) {

  const user = await apiFetchServer<AuthUser>(`/auth/register`, {
              method: "POST",
              data: data,
              cache: "no-store"
            });

  return user

}


export async function loginAction(data: LoginType) {
  const result = await apiFetchServer<LoggedInUser>(
    `/auth/login`,
    {
      method: "POST",
      data,
      cache: "no-store",
    }
  );

  const cookieStore = await cookies();

 if ( !result.data) {
    return {
      success: false,
      message: "Login failed",
    };
  }

  const { user, accessToken, refreshToken } = result.data;

  if (!accessToken || !refreshToken || !user) {
    return {
      success: false,
      message: "Invalid login response from server",
    };
  }


  cookieStore.set("accessToken", result.data.accessToken, {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 15,
  });

  cookieStore.set("refreshToken", result.data.refreshToken, {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });

  return {
      success: true,
      message: "Login successful",
      user: result.data.user
    }
}
