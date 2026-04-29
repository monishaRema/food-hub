export function buildLoginRedirectPath(nextPath: string) {
  const params = new URLSearchParams({
    next: nextPath,
    reason: "session-expired",
  });

  return `/auth/login?${params.toString()}`;
}
