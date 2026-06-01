import { fetchBuilding, fetchBusinesses, fetchFloors } from "@/lib/actions";
import { PublicDirectoryClient } from "@/components/public/PublicDirectoryClient";
import { Suspense } from "react";

export default async function PublicDirectoryPage() {
  const building = await fetchBuilding();
  const floors = await fetchFloors();
  const businesses = await fetchBusinesses();

  return (
    <Suspense fallback={<div className="p-8 text-center text-muted-foreground">Loading directory...</div>}>
      <PublicDirectoryClient building={building} floors={floors} businesses={businesses} />
    </Suspense>
  );
}
