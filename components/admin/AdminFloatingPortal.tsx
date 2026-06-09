"use client";

import { LogOut, LayoutDashboard } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signOutAction } from "@/lib/actions";

export function AdminFloatingPortal() {
  const router = useRouter();

  async function handleSignOut() {
    try {
      await signOutAction();
      router.push("/login");
      router.refresh();
    } catch (error) {
      console.error("Failed to sign out:", error);
    }
  }

  return (
    <div className="fixed bottom-6 left-6 z-50 flex items-center gap-3 bg-[#111219]/90 backdrop-blur-md border border-[#1d1f2e] px-4 py-2.5 rounded-xl shadow-[0_0_20px_rgba(0,0,0,0.4)] text-white hover:border-blue-500/20 transition-all font-sans">
      <Link
        href="/admin"
        className="flex items-center gap-1.5 text-xs font-bold text-gray-300 hover:text-white transition-colors"
      >
        <LayoutDashboard className="h-3.5 w-3.5 text-blue-500" />
        Admin Panel
      </Link>
      <span className="h-4 w-px bg-slate-800" />
      <button
        onClick={handleSignOut}
        className="flex items-center gap-1.5 text-xs font-bold text-red-400 hover:text-red-350 transition-colors cursor-pointer bg-transparent border-none p-0"
      >
        <LogOut className="h-3.5 w-3.5" />
        Sign Out
      </button>
    </div>
  );
}
