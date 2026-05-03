import { DashboardPageShell } from "@/components/shared/dashboard-page-shell";
import PaginationControls from "@/components/shared/pagination-control";
import UserTable from "@/features/admin/components/userTable";
import { querySearchSchema } from "@/lib/schema";
import { getUsers } from "@/lib/api/user.server";
import type { SearchParamsType } from "@/types";

export default async function AdminUsersPage({
  searchParams,
}: SearchParamsType) {
  const rawSearchParams = await searchParams;
  const query = querySearchSchema.parse(rawSearchParams);
  const users = await getUsers(query);
  const userItems = users.data ?? [];
  const totalItems = users.meta?.totalItems ?? userItems.length;

  return (
    <main className="space-y-8">
      <DashboardPageShell
        title="Manage Users"
        description="Review the people using FoodHub, monitor roles and statuses, and keep a close eye on account activity from one admin workspace."
      />

      <section className="rounded-[28px] border border-[#eadfd2] bg-[#f7f1e9] p-6 shadow-sm sm:p-8">
        <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
          <div className="space-y-2">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-stone-500">
              User Directory
            </p>
            <h2 className="text-2xl font-semibold tracking-tight text-stone-900">
              Browse platform accounts
            </h2>
            <p className="max-w-2xl text-sm leading-6 text-stone-600">
              The table below reflects paginated backend results, including user
              profile details, account roles, and current status values.
            </p>
          </div>

          <div className="inline-flex rounded-full bg-white px-4 py-2 text-sm font-semibold text-stone-700 ring-1 ring-[#eadfd2]">
            {totalItems} {totalItems === 1 ? "user" : "users"}
          </div>
        </div>

        <UserTable users={userItems} />
        {users.meta ? <PaginationControls meta={users.meta} /> : null}
      </section>
    </main>
  );
}
