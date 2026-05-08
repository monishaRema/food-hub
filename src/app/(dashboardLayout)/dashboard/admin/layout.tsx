import { UserRole } from "@/constants";
import { requireRole } from "@/lib/auth/server-auth";

export default async function AdminDashboardLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  await requireRole([UserRole.ADMIN], "/dashboard/admin");

  return children;
}
