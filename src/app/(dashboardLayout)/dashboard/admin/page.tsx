import { DashboardProfileClient } from "@/features/auth/components/dashboard-profile-client";

export default function adminDashboardPage() {
  return <DashboardProfileClient nextPath="/dashboard/admin" />;
}
