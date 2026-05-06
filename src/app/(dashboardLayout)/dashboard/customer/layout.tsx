import { RoleGuard } from "@/features/auth/components/RoleGuard";

export default function CustomerDashboardLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return <RoleGuard allowedRole="CUSTOMER">{children}</RoleGuard>;
}
