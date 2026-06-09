import { ReactNode } from "react";
import { getSupabaseServer } from "@/lib/supabase";
import { AdminFloatingPortal } from "@/components/admin/AdminFloatingPortal";

export default async function PublicLayout({ children }: { children: ReactNode }) {
  // We keep the layout shell very minimal so that the kiosk mode 
  // can take up the full screen easily.
  const supabase = await getSupabaseServer();
  const { data: { user } } = await supabase.auth.getUser();
  const isAdmin = !!user;

  return (
    <main className="flex-1 bg-gray-50/50 relative">
      {children}
      {isAdmin && <AdminFloatingPortal />}
    </main>
  );
}

