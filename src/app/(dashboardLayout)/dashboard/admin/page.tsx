import {
  DashboardProfile,
  DashboardProfileError,
} from "@/features/auth/components/dashboard-profile";

import { redirectIfUnauthorized } from "@/lib/auth/redirect-if-unauthorized";
import { getCurrentUser } from "@/lib/api/user";

export default async function adminDashboardPage() {
  try {
    const user = await getCurrentUser();

    return <DashboardProfile user={user} />;
  } catch (error) {
    redirectIfUnauthorized(error, "/dashboard/admin");

    const message =
      error instanceof Error
        ? error.message
        : "We could not load your account details at the moment.";

    return <DashboardProfileError message={message} />;
  }
}
