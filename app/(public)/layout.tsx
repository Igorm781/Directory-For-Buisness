import { ReactNode } from "react";

export default async function PublicLayout({ children }: { children: ReactNode }) {
  // We keep the layout shell very minimal so that the kiosk mode 
  // can take up the full screen easily.
  return (
    <main className="flex-1 bg-gray-50/50 relative">
      {children}
    </main>
  );
}

