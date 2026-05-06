import { RoleGuard } from "@/features/auth/components/RoleGuard";

export default function ProviderDashboardLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return <RoleGuard allowedRole="PROVIDER">{children}</RoleGuard>;
}
