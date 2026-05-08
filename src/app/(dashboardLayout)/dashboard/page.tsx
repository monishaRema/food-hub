import { redirect } from "next/navigation";

import {
  getDashboardPathForRole,
  requireUser,
} from "@/lib/auth/server-auth";

export default async function DashboardRedirectPage() {
  const user = await requireUser("/dashboard");

  redirect(getDashboardPathForRole(user.role));
}
