"use client";

import {
  createContext,
  useContext,
  useEffect,
  useEffectEvent,
  useState,
} from "react";
import type { AuthUser } from "@/types/user";

type AuthContextValue = {
  user: AuthUser | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  setUser: (user: AuthUser | null) => void;
  refetchUser: () => Promise<void>;
};

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const refetchUser = useEffectEvent(async () => {
    setIsLoading(true);

    try {
      const res = await fetch("/api/auth/me", {
        credentials: "include",
      });

      const result = await res.json();

      if (!res.ok || !result.success) {
        setUser(null);
        return;
      }

      setUser(result.data);
    } catch {
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  });

  useEffect(() => {
    void refetchUser();
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
