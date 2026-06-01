import { Business } from "@/lib/types";
import { BusinessCard } from "./BusinessCard";

export function BusinessGrid({ businesses, isKiosk }: { businesses: Business[]; isKiosk?: boolean }) {
  if (businesses.length === 0) {
    return (
      <div className="py-20 text-center">
        <h3 className="text-lg font-semibold text-gray-900">No businesses found</h3>
        <p className="text-muted-foreground mt-2">Try adjusting your search or floor filter.</p>
      </div>
    );
  }

  return (
    <div className={`grid gap-6 ${isKiosk ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8' : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'}`}>
      {businesses.map(business => (
        <BusinessCard key={business.id} business={business} isKiosk={isKiosk} />
      ))}
    </div>
  );
}
