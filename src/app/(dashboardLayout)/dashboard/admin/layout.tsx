import { RoleGuard } from "@/features/auth/components/RoleGuard";

export default function AdminDashboardLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return <RoleGuard allowedRole="ADMIN">{children}</RoleGuard>;
}
