"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { env } from "@/env";
import type { AuthUser } from "@/types/user";

type AuthContextValue = {
  user: AuthUser | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  setUser: (user: AuthUser) => void;
  refetchUser: () => Promise<void>;
};

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const refetchUser = async () => {
    setIsLoading(true);

    try {
      let res = await fetch(`${env.NEXT_PUBLIC_API_URL}/auth/me`, {
        credentials: "include",
      });

      if (res.status === 401) {
        const refreshRes = await fetch(
          `${env.NEXT_PUBLIC_API_URL}/auth/refresh-token`,
          {
            method: "POST",
            credentials: "include",
          },
        );

        if (!refreshRes.ok) {
          setUser(null);
          return;
        }

        res = await fetch(`${env.NEXT_PUBLIC_API_URL}/auth/me`, {
          credentials: "include",
        });
      }

      const result = await res.json();

      if (!res.ok || !result.success) {
        setUser(null);
        return;
      }

      setUser(result.data.user);
    } catch {
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    refetchUser();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        isAuthenticated: !!user,
        setUser,
        refetchUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider");
  }

  return context;
}
