import { DashboardHeader } from "@/components/dashboard/layout/dashboard-header";
import { DashboardSidebarContent } from "@/components/dashboard/layout/dashboard-sidebar-content";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen w-full bg-background relative">
      {/* Desktop Sidebar */}
      <aside className="hidden lg:block sticky top-0 left-0 w-64 h-screen shrink-0 z-10 transition-all duration-300">
        <DashboardSidebarContent />
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-h-screen min-w-0">
        {/* Header of dashboard */}
        <DashboardHeader />

        <main className="flex-1 p-4 md:p-8 relative">
          {children}
        </main>
      </div>
    </div>
  )
}
