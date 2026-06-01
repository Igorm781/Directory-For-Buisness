import { Building } from "@/lib/types";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

interface DirectoryHeaderProps {
  building: Building;
  searchQuery: string;
  onSearchChange: (val: string) => void;
  isKiosk?: boolean;
}

export function DirectoryHeader({ building, searchQuery, onSearchChange, isKiosk }: DirectoryHeaderProps) {
  return (
    <header className="sticky top-0 z-10 bg-[#0b0c13]/80 backdrop-blur-md border-b border-[#1d1f2e]">
      <div className={`mx-auto w-full max-w-7xl px-6 py-4 flex flex-col md:flex-row md:items-center justify-between gap-4 ${isKiosk ? 'md:py-8' : ''}`}>
        <div className="flex items-center gap-4">
          {building.logo_url && (
            <img src={building.logo_url} alt={building.name} className="h-12 w-12 rounded-lg border border-[#1d1f2e] object-cover" />
          )}
          <div>
            <h1 className={`font-semibold tracking-tight text-white ${isKiosk ? 'text-4xl' : 'text-2xl'}`}>
              {building.name}
            </h1>
            <p className="text-gray-400 text-sm mt-0.5">{building.address}</p>
          </div>
        </div>
        {/* Search bar removed for TV display kiosk */}
      </div>
    </header>
  );
}
