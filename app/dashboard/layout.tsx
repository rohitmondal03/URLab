import { type Metadata } from "next";
import DashboardLayoutWrapper from "@/components/dashboard/layout/dashboard-layout-wrapper";

export const metadata: Metadata = ({
  title: "Dashboard"
})

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return <DashboardLayoutWrapper>{children}</DashboardLayoutWrapper>;
}
