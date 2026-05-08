import { requireUser } from "@/lib/auth/server-auth";

export default async function DashboardRoutesLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  await requireUser("/dashboard");

  return children;
}
