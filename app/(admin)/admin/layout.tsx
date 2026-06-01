import { ReactNode } from "react";
import { AdminSidebar } from "@/components/admin/AdminSidebar";

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex h-screen bg-[#08090d] text-[#f3f4f6] font-sans">
      <AdminSidebar />
      <div className="flex-1 overflow-auto bg-[#08090d]">
        {children}
      </div>
    </div>
  );
}
