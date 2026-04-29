import { AppSidebar } from "@/components/layout/app-sidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";

export default function dashboardLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="flex">
    

    <SidebarProvider>
      <AppSidebar />
      <main className="px-6 py-10">
        <SidebarTrigger />
        {children}
      </main>
    </SidebarProvider>
    </div>

    
  );
}


