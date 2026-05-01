import Image from "next/image";

import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  formatDateTime,
  formatDisplayValue,
  formatEnumLabel,
} from "@/lib/utils/format";
import type { AuthUser } from "@/types/user";

function getStatusBadgeClasses(status?: AuthUser["status"]) {
  if (status === "ACTIVE") {
    return "bg-emerald-100 text-emerald-700 ring-emerald-200";
  }

  if (status === "SUSPENDED") {
    return "bg-red-100 text-red-700 ring-red-200";
  }

  return "bg-stone-200 text-stone-700 ring-stone-300";
}

function getRoleBadgeClasses(role: AuthUser["role"]) {
  if (role === "ADMIN") {
    return "bg-[#fff2e8] text-[#f97316] ring-[#f4c9a6]";
  }

  if (role === "PROVIDER") {
    return "bg-sky-100 text-sky-700 ring-sky-200";
  }

  return "bg-stone-100 text-stone-700 ring-stone-200";
}

function getInitials(name?: string) {
  if (!name) {
    return "FH";
  }

  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("");
}

export default function UserTable({
  users,
}: {
  users: AuthUser[];
}) {
  return (
    <div className="overflow-hidden rounded-[28px] border border-[#eadfd2] bg-white shadow-sm">
      <div className="border-b border-[#f1e5d7] px-6 py-5">
        <h2 className="text-xl font-semibold text-stone-900">User accounts</h2>
        <p className="mt-1 text-sm text-stone-600">
          Review customer, provider, and admin accounts from the current
          backend page.
        </p>
      </div>

      <Table>
        <TableHeader>
          <TableRow className="border-[#f1e5d7] bg-stone-50/80 hover:bg-stone-50/80">
            <TableHead className="px-6 py-4">User</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Phone</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="px-6">Joined</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {users.length === 0 ? (
            <TableRow>
              <TableCell
                colSpan={6}
                className="px-6 py-10 text-center text-sm text-stone-500"
              >
                No users were returned for this page.
              </TableCell>
            </TableRow>
          ) : (
            users.map((user) => (
              <TableRow key={user.id} className="border-[#f7ede2] hover:bg-[#fffaf5]">
                <TableCell className="px-6 py-4">
                  <div className="flex min-w-[280px] items-center gap-4">
                    <div className="relative h-14 w-14 overflow-hidden rounded-2xl bg-stone-100">
                      {user.image ? (
                        <Image
                          src={user.image}
                          alt={user.name ?? "User image"}
                          fill
                          sizes="56px"
                          className="object-cover"
                        />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center bg-[#fff2e8] text-sm font-semibold text-[#f97316]">
                          {getInitials(user.name)}
                        </div>
                      )}
                    </div>

                    <div className="min-w-0">
                      <p className="font-medium text-stone-900">
                        {user.name ?? "Unnamed user"}
                      </p>
                     
                    </div>
                  </div>
                </TableCell>

                <TableCell className="text-stone-600">
                  {user.email}
                </TableCell>

                <TableCell>
                  <span className="text-sm text-stone-600">
                    {formatDisplayValue(user.phone)}
                  </span>
                </TableCell>

                <TableCell>
                  <Badge
                    variant="outline"
                    className={getRoleBadgeClasses(user.role)}
                  >
                    {formatEnumLabel(user.role)}
                  </Badge>
                </TableCell>

                <TableCell>
                  <Badge
                    variant="outline"
                    className={getStatusBadgeClasses(user.status)}
                  >
                    {formatDisplayValue(formatEnumLabel(user.status))}
                  </Badge>
                </TableCell>

                <TableCell className="px-6 text-sm text-stone-600">
                  {formatDateTime(user.createdAt)}
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}
