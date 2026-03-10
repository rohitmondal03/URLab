import DashboardLayoutWrapper from "@/components/dashboard/(landing)/dashboard-layout-wrapper";
import { Metadata } from "next";

export const metadata: Metadata = ({
  title: "Dashboard"
})

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return <DashboardLayoutWrapper>{children}</DashboardLayoutWrapper>;
}
