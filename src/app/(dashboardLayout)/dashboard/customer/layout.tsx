import { UserRole } from "@/constants";
import { requireRole } from "@/lib/auth/server-auth";

export default async function CustomerDashboardLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  await requireRole([UserRole.CUSTOMER], "/dashboard/customer");

  return children;
}
