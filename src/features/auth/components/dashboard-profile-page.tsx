import { DashboardProfile, DashboardProfileError } from "@/features/auth/components/dashboard-profile";
import { getCurrentUser } from "@/lib/api/user.server";
import { redirectIfUnauthorized } from "@/lib/auth/redirect-if-unauthorized";

export async function DashboardProfilePage({
  nextPath,
}: {
  nextPath: string;
}) {
  try {
    const user = await getCurrentUser();

    if (!user) {
      return (
        <DashboardProfileError
          message="We could not load your account details at the moment."
        />
      );
    }

    return <DashboardProfile user={user} />;
  } catch (error) {
    redirectIfUnauthorized(error, nextPath);

    return (
      <DashboardProfileError
        message={
          error instanceof Error
            ? error.message
            : "We could not load your account details at the moment."
        }
      />
    );
  }
}
