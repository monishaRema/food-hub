"use client";

import { useAuth } from "@/providers/AuthProvider";
import { useRouter } from "next/navigation";
import { env } from "@/env";
import { toast } from "sonner";

export function useLogout() {
  const { setUser } = useAuth();
  const router = useRouter();

  return async function logout() {
    const toastId = toast.loading("Logging out");

    try {
      const res = await fetch(`${env.NEXT_PUBLIC_API_URL}/auth/logout`, {
        method: "POST",
        credentials: "include",
      });

      const result = await res.json();

      if (!res.ok || !result.success) {
        throw new Error(result.message || "Logout failed");
      }

      setUser(null);

      toast.success("Logout successful", { id: toastId });

      router.push("/auth/login");
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Something went wrong";

      toast.error(message, { id: toastId });
    }
  };
}