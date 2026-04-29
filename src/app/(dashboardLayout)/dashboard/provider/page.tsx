import {
  DashboardProfile,
  DashboardProfileError,
} from "@/features/auth/components/dashboard-profile";


import { getCurrentUser } from "@/lib/api/user";

export default async function providerDashboardPage() {
  try {
    const user = await getCurrentUser();

    return <DashboardProfile user={user} />;
  } catch (error) {
    const message =
      error instanceof Error
        ? error.message
        : "We could not load your account details at the moment.";

    return <DashboardProfileError message={message} />;
  }
}
