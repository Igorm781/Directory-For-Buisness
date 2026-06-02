import { Building2, Layers, Store, StoreIcon, Plus } from "lucide-react";
import { fetchBusinesses, fetchFloors, fetchSuites } from "@/lib/actions";
import { BusinessTable } from "@/components/admin/BusinessTable";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";

export default async function AdminDashboardPage() {
  const mockBusinesses = await fetchBusinesses();
  const mockFloors = await fetchFloors();
  const mockSuites = await fetchSuites();

  const stats = [
    { name: "Total Businesses", value: mockBusinesses.length, icon: Store },
    { name: "Active Businesses", value: mockBusinesses.filter(b => b.is_active).length, icon: StoreIcon },
    { name: "Total Floors", value: mockFloors.length, icon: Layers },
    { name: "Total Suites", value: mockSuites.length, icon: Building2 },
  ];

  return (
    <div className="p-4 sm:p-6 md:p-8 max-w-7xl mx-auto">
      <div className="sm:flex sm:items-center sm:justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-white">Dashboard & Businesses</h1>
          <p className="mt-1 text-sm text-gray-400">
            Overview of your building directory and company listings.
          </p>
        </div>
        <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none w-full sm:w-auto">
          <Link href="/admin/businesses/new" className="w-full block sm:inline-block">
            <Button className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white shadow-[0_0_15px_rgba(37,99,235,0.2)]">
              <Plus className="mr-2 h-4 w-4" />
              Add Business
            </Button>
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 mb-8">
        {stats.map((stat) => (
          <div key={stat.name} className="overflow-hidden rounded-xl bg-[#111219]/60 px-6 py-5 border border-[#1d1f2e] shadow-md relative group hover:border-blue-500/20 transition-all duration-300">
            <div className="flex items-center">
              <div className="flex-shrink-0 h-10 w-10 rounded-lg bg-[#1c1e28] flex items-center justify-center border border-[#2b2d3d]">
                <stat.icon className="h-5 w-5 text-blue-500" aria-hidden="true" />
              </div>
              <div className="ml-4 w-0 flex-1">
                <dl>
                  <dt className="truncate text-xs font-semibold text-gray-400 uppercase tracking-wider">{stat.name}</dt>
                  <dd className="mt-0.5">
                    <div className="text-2xl font-bold text-white text-glow">{stat.value}</div>
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        ))}
      </div>


      <BusinessTable businesses={mockBusinesses} />
    </div>
  );
}
