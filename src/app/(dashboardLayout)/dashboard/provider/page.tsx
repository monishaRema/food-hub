import { DashboardProfileClient } from "@/features/auth/components/dashboard-profile-client";

export default function providerDashboardPage() {
  return <DashboardProfileClient nextPath="/dashboard/provider" />;
}
