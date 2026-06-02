"use client";

import { ReactNode, useState } from "react";
import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { Menu, Building2 } from "lucide-react";

export default function AdminLayout({ children }: { children: ReactNode }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex flex-col md:flex-row h-screen bg-[#08090d] text-[#f3f4f6] font-sans overflow-hidden">
      
      {/* Mobile Top Navigation Header */}
      <div className="md:hidden flex items-center justify-between px-6 h-16 bg-[#0b0c13] border-b border-[#1d1f2e] shrink-0">
        <div className="flex items-center gap-2">
          <Building2 className="h-6 w-6 text-blue-500" />
          <span className="font-semibold text-white tracking-tight">Admin Panel</span>
        </div>
        <button
          onClick={() => setIsSidebarOpen(true)}
          className="p-2 -mr-2 text-gray-400 hover:text-white rounded-lg hover:bg-[#1c1e28] transition-colors"
          aria-label="Open menu"
        >
          <Menu className="h-6 w-6" />
        </button>
      </div>

      {/* Mobile Sidebar Navigation Drawer Overlay */}
      {isSidebarOpen && (
        <div className="md:hidden fixed inset-0 z-40 flex">
          {/* Backdrop overlay */}
          <div 
            className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity" 
            onClick={() => setIsSidebarOpen(false)}
          />
          
          {/* Drawer container */}
          <div className="relative flex w-full max-w-xs flex-1 flex-col bg-[#0b0c13] focus:outline-none transition-transform duration-300">
            <AdminSidebar onClose={() => setIsSidebarOpen(false)} />
          </div>
        </div>
      )}

      {/* Desktop Permanent Sidebar Navigation */}
      <div className="hidden md:flex md:w-64 md:flex-col md:shrink-0 md:h-full">
        <AdminSidebar />
      </div>

      {/* Main Content Area */}
      <div className="flex-1 overflow-auto bg-[#08090d]">
        {children}
      </div>
    </div>
  );
}
