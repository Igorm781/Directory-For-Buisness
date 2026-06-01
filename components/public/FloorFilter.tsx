import { Floor } from "@/lib/types";
import { cn } from "@/lib/utils";

interface FloorFilterProps {
  floors: Floor[];
  activeFloorId: string | null;
  onFloorSelect: (id: string | null) => void;
  isKiosk?: boolean;
}

export function FloorFilter({ floors, activeFloorId, onFloorSelect, isKiosk }: FloorFilterProps) {
  return (
    <div className="flex flex-wrap items-center gap-2 mb-8">
      <button
        onClick={() => onFloorSelect(null)}
        className={cn(
          "rounded-full px-5 py-2 font-semibold transition-all duration-200 border",
          isKiosk ? "text-lg px-7 py-3" : "text-sm",
          activeFloorId === null
            ? "bg-blue-600 text-white border-blue-500 shadow-[0_0_15px_rgba(37,99,235,0.25)]"
            : "bg-[#1c1e28] text-gray-300 border-[#1d1f2e] hover:bg-blue-600/10 hover:text-white hover:border-blue-500/20"
        )}
      >
        All Floors
      </button>
      
      {floors.sort((a, b) => a.display_order - b.display_order).map(floor => (
        <button
          key={floor.id}
          onClick={() => onFloorSelect(floor.id)}
          className={cn(
            "rounded-full px-5 py-2 font-semibold transition-all duration-200 border",
            isKiosk ? "text-lg px-7 py-3" : "text-sm",
            activeFloorId === floor.id
              ? "bg-blue-600 text-white border-blue-500 shadow-[0_0_15px_rgba(37,99,235,0.25)]"
              : "bg-[#1c1e28] text-gray-300 border-[#1d1f2e] hover:bg-blue-600/10 hover:text-white hover:border-blue-500/20"
          )}
        >
          {floor.label || `Floor ${floor.number}`}
        </button>
      ))}
    </div>
  );
}
