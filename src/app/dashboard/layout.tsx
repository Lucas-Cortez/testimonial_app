import { DashboardHeader } from "@/components/common/DashboardHeader";

export default function DashboardLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <div>
      <DashboardHeader />
      {children}
    </div>
  );
}
