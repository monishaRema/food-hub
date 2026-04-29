"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import {
  DashboardProfile,
  DashboardProfileError,
  DashboardProfileSkeleton,
} from "@/features/auth/components/dashboard-profile";
import { UnauthorizedError } from "@/lib/api/errors";
import { getCurrentUser } from "@/lib/api/user";
import { buildLoginRedirectPath } from "@/lib/auth/login-redirect";
import type { AuthUser } from "@/types/user";

export function DashboardProfileClient({
  nextPath,
}: {
  nextPath: string;
}) {
  const router = useRouter();
  const [user, setUser] = useState<AuthUser | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    async function loadUser() {
      try {
        const currentUser = await getCurrentUser();

        if (!isMounted) {
          return;
        }

        setUser(currentUser);
        setError(null);
      } catch (err) {
        if (!isMounted) {
          return;
        }

        if (err instanceof UnauthorizedError) {
          router.replace(buildLoginRedirectPath(nextPath));
          return;
        }

        setError(
          err instanceof Error
            ? err.message
            : "We could not load your account details at the moment.",
        );
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }

    void loadUser();

    return () => {
      isMounted = false;
    };
  }, [nextPath, router]);

  if (isLoading) {
    return <DashboardProfileSkeleton />;
  }

  if (error || !user) {
    return (
      <DashboardProfileError
        message={error ?? "We could not load your account details at the moment."}
      />
    );
  }

  return <DashboardProfile user={user} />;
}
