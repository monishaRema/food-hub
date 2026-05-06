import Link from "next/link";
import { ShieldCheck, UserRound } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { UserStatus } from "@/constants";
import {
  formatDateTime,
  formatDisplayValue,
  formatEnumLabel,
} from "@/lib/utils/format";
import type { AuthUser, UserStatusType } from "@/types/user";

function getStatusClasses(status?: UserStatusType) {
  if (status === UserStatus.ACTIVE) {
    return "bg-emerald-100 text-emerald-700 ring-emerald-200";
  }

  if (status === UserStatus.SUSPENDED) {
    return "bg-red-100 text-red-700 ring-red-200";
  }

  return "bg-stone-200 text-stone-700 ring-stone-300";
}

function DetailItem({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-[#eadfd2] bg-white/80 p-4 shadow-sm">
      <p className="text-xs font-medium uppercase tracking-[0.2em] text-stone-500">
        {label}
      </p>
      <p className="mt-2 wrap-break-word text-sm font-semibold text-stone-900">
        {value}
      </p>
    </div>
  );
}

export function DashboardProfile({ user }: { user: AuthUser }) {
  return (
    <div className="space-y-6">
      <section className="overflow-hidden rounded-[32px] border border-[#eadfd2] bg-[#f7f1e9] shadow-sm">
        <div className="bg-[radial-gradient(circle_at_top_left,rgba(249,115,22,0.18),transparent_38%),linear-gradient(135deg,rgba(255,255,255,0.72),rgba(247,241,233,0.94))] p-6 sm:p-8">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
              <div className="flex size-28 shrink-0 items-center justify-center overflow-hidden rounded-[28px] border border-white/70 bg-white shadow-sm">
                {user.image ? (
                  <img
                    loading="eager"
                    src={user.image}
                    alt={user.name}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <span className="flex size-20 items-center justify-center rounded-[24px] bg-[#fff2e8] text-[#f97316]">
                    <UserRound className="size-10" />
                  </span>
                )}
              </div>

              <div className="space-y-3">
                <p className="text-xs font-semibold uppercase tracking-[0.28em] text-stone-500">
                  FoodHub account
                </p>
                <div>
                  <h1 className="text-3xl font-semibold tracking-tight text-stone-900 sm:text-4xl">
                    {user.name}
                  </h1>
                  <p className="mt-2 max-w-2xl text-sm leading-6 text-stone-600">
                    This profile is rendered from your current backend session
                    so the dashboard reflects the latest account details on each
                    request.
                  </p>
                </div>
                <div className="flex flex-wrap gap-3">
                  <span className="inline-flex items-center rounded-full bg-white px-4 py-2 text-sm font-semibold text-stone-700 ring-1 ring-[#eadfd2]">
                    Role: {formatEnumLabel(user.role)}
                  </span>
                  <span
                    className={`inline-flex items-center rounded-full px-4 py-2 text-sm font-semibold ring-1 ${getStatusClasses(user.status)}`}
                  >
                    Status: {formatDisplayValue(formatEnumLabel(user.status))}
                  </span>
                </div>
              </div>
            </div>

            
          </div>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
       
        <DetailItem label="Full name" value={user.name} />
        <DetailItem label="Email address" value={user.email} />
        <DetailItem label="Role" value={formatEnumLabel(user.role)} />
        <DetailItem
          label="Account status"
          value={formatDisplayValue(formatEnumLabel(user.status))}
        />
        <DetailItem
          label="Phone number"
          value={formatDisplayValue(user.phone)}
        />
        
        <DetailItem label="Created at" value={formatDateTime(user.createdAt)} />
        <DetailItem label="Updated at" value={formatDateTime(user.updatedAt)} />
      </section>
    </div>
  );
}

export function DashboardProfileError({ message }: { message: string }) {
  return (
    <Card className="overflow-hidden rounded-[28px] border border-[#eadfd2] bg-[#f7f1e9] shadow-sm">
      <CardHeader className="space-y-3">
        <div className="flex size-14 items-center justify-center rounded-2xl bg-[#f97316] text-white">
          <ShieldCheck className="size-7" />
        </div>
        <CardTitle className="text-2xl font-semibold text-stone-900">
          Profile unavailable
        </CardTitle>
        <CardDescription className="max-w-xl text-sm leading-6 text-stone-600">
          {message}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Button asChild className="bg-[#f97316] text-white hover:bg-[#ea6b12]">
          <Link href="/dashboard">Try again</Link>
        </Button>
      </CardContent>
    </Card>
  );
}

export function DashboardProfileSkeleton() {
  return (
    <div className="space-y-6">
      <div className="rounded-[28px] border border-[#eadfd2] bg-[#f7f1e9] p-6 shadow-sm">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center">
          <Skeleton className="size-28 rounded-3xl bg-[#eadfd2]" />
          <div className="flex-1 space-y-3">
            <Skeleton className="h-4 w-28 bg-[#eadfd2]" />
            <Skeleton className="h-10 w-52 bg-[#eadfd2]" />
            <Skeleton className="h-5 w-72 bg-[#eadfd2]" />
            <div className="flex gap-3">
              <Skeleton className="h-8 w-24 rounded-full bg-[#eadfd2]" />
              <Skeleton className="h-8 w-24 rounded-full bg-[#eadfd2]" />
            </div>
          </div>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {Array.from({ length: 8 }).map((_, index) => (
          <Skeleton key={index} className="h-24 rounded-2xl bg-[#f1e5d7]" />
        ))}
      </div>
    </div>
  );
}
