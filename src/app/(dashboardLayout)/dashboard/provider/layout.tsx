import { UserRole } from "@/constants";
import { requireRole } from "@/lib/auth/server-auth";

export default async function ProviderDashboardLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  await requireRole([UserRole.PROVIDER], "/dashboard/provider");

  return children;
}
