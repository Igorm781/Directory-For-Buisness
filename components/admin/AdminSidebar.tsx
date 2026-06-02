"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Building2, LayoutDashboard, Settings, X } from "lucide-react";
import { cn } from "@/lib/utils";

const navigation = [
  { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { name: "Settings", href: "/admin/settings", icon: Settings },
];

interface AdminSidebarProps {
  onClose?: () => void;
}

export function AdminSidebar({ onClose }: AdminSidebarProps) {
  const pathname = usePathname();

  return (
    <div className="flex h-full w-full flex-col bg-[#0b0c13] border-r border-[#1d1f2e]">
      <div className="flex h-16 shrink-0 items-center justify-between px-6 border-b border-[#1d1f2e]">
        <div className="flex items-center">
          <Building2 className="h-6 w-6 text-blue-500 mr-2" />
          <span className="font-semibold tracking-tight text-white">Admin Panel</span>
        </div>
        {onClose && (
          <button 
            onClick={onClose}
            className="md:hidden p-1.5 text-gray-400 hover:text-white rounded-lg hover:bg-[#1c1e28] transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        )}
      </div>
      <div className="flex flex-1 flex-col overflow-y-auto pt-4 px-3">
        <nav className="flex-1 space-y-1">
          {navigation.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => onClose?.()}
                className={cn(
                  isActive 
                    ? "bg-[#1c1e28] text-white border border-[#2b2d3d] shadow-[0_0_15px_rgba(59,130,246,0.02)]" 
                    : "text-gray-400 hover:bg-[#111219]/40 hover:text-gray-200",
                  "group flex items-center rounded-xl px-3 py-2.5 text-sm font-semibold transition-all border border-transparent"
                )}
              >
                <item.icon
                  className={cn(
                    isActive ? "text-blue-500" : "text-gray-500 group-hover:text-gray-300",
                    "mr-3 h-5 w-5 shrink-0"
                  )}
                  aria-hidden="true"
                />
                {item.name}
              </Link>
            );
          })}
        </nav>
      </div>
      <div className="border-t border-[#1d1f2e] p-4">
        <Link 
          href="/" 
          onClick={() => onClose?.()}
          className="text-sm font-semibold text-gray-400 hover:text-blue-400 transition-colors"
        >
          View Public Directory
        </Link>
      </div>
    </div>
  );
}
