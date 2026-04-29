import { AppSidebar } from "@/components/layout/app-sidebar";
import { DashboardPageShell } from "@/components/shared/dashboard-page-shell";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { UtensilsCrossed } from "lucide-react";

export default function dashboardLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="flex w-full">
      <SidebarProvider>
        <AppSidebar />
        <main className="w-full min-w-0 flex-1 px-6 py-6">
          <div className="mb-10">
          <div className="flex gap-2 items-center mb-2">
            <SidebarTrigger className="text-orange-600 " />
            <span className="text-sm">Toggle Sidebar</span>
          </div>
          <DashboardPageShell
            title="Dashboard"
            description="Welcome to your FoodHub dashboard. Use the sidebar to move between tools."
          />
          </div>
          {children}
        </main>
      </SidebarProvider>
    </div>
  );
}
