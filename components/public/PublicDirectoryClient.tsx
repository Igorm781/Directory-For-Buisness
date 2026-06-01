"use client";

import { useMemo } from "react";
import Link from "next/link";
import { Building, Business, Floor } from "@/lib/types";
import { WeatherWidget } from "@/components/public/WeatherWidget";

interface Props {
  building: Building;
  floors: Floor[];
  businesses: Business[];
}

export function PublicDirectoryClient({ building, floors, businesses }: Props) {
  const { floor1Businesses, floor2Businesses, basementBusinesses } = useMemo(() => {
    // 1. Sort active businesses alphanumerically by location
    const activeBusinesses = businesses
      .filter(b => b.is_active)
      .sort((a, b) => {
        const locA = a.location || a.suite?.number || "";
        const locB = b.location || b.suite?.number || "";
        return locA.localeCompare(locB, undefined, { numeric: true, sensitivity: 'base' });
      });

    // 2. Identify floors based on floor number or labels
    const floor1Obj = floors.find(f => f.number === 1 || f.label?.toLowerCase().includes("floor 1") || f.label?.toLowerCase().includes("first"));
    const floor2Obj = floors.find(f => f.number === 2 || f.label?.toLowerCase().includes("floor 2") || f.label?.toLowerCase().includes("second"));
    const basementObj = floors.find(f => f.number === 0 || f.label?.toLowerCase().includes("basement"));

    // 3. Filter businesses by floor
    const f1 = activeBusinesses.filter(b => b.floor_id === floor1Obj?.id || b.suite?.floor_id === floor1Obj?.id);
    const f2 = activeBusinesses.filter(b => b.floor_id === floor2Obj?.id || b.suite?.floor_id === floor2Obj?.id);
    const bs = activeBusinesses.filter(b => b.floor_id === basementObj?.id || b.suite?.floor_id === basementObj?.id);

    return {
      floor1Businesses: f1,
      floor2Businesses: f2,
      basementBusinesses: bs
    };
  }, [businesses, floors]);

  // Split basement businesses into two columns
  const { basementCol1, basementCol2 } = useMemo(() => {
    const half = Math.ceil(basementBusinesses.length / 2);
    return {
      basementCol1: basementBusinesses.slice(0, half),
      basementCol2: basementBusinesses.slice(half)
    };
  }, [basementBusinesses]);

  return (
    <div className="min-h-screen bg-[#08090d] text-[#f3f4f6] flex flex-col lg:flex-row p-6 md:p-12 lg:p-16 gap-12 lg:gap-16 selection:bg-blue-500/20">
      
      {/* Left/Center Column (Directory) */}
      <div className="flex-1 flex flex-col justify-between space-y-12">
        
        {/* Top Half: First Floor & Second Floor side-by-side */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 flex-1">
          
          {/* Column 1: First Floor */}
          <div className="md:border-r border-[#1d1f2e]/60 md:pr-10 flex flex-col">
            <div className="flex items-center gap-4 mb-8">
              <span className="text-6xl md:text-7xl font-extrabold text-slate-300 leading-none select-none">1</span>
              <div className="border-l border-slate-700/80 h-10 pl-4 flex items-center">
                <span className="text-sm font-bold tracking-widest text-slate-400 uppercase">First Floor</span>
              </div>
            </div>
            
            <div className="flex-1 space-y-2">
              {floor1Businesses.map((business) => (
                <Link 
                  key={business.id} 
                  href={`/business/${business.slug}`} 
                  className="flex items-baseline py-1.5 group hover:opacity-80 transition-opacity"
                >
                  <span className="w-16 md:w-20 shrink-0 font-bold text-slate-200 text-lg md:text-xl group-hover:text-blue-400 transition-colors">
                    {business.location || business.suite?.number}
                  </span>
                  <span className="text-slate-300 text-lg md:text-xl group-hover:text-white transition-colors">
                    {business.name}
                    {business.category && (
                      <span className="text-slate-500 font-medium"> - {business.category}</span>
                    )}
                  </span>
                </Link>
              ))}
              {floor1Businesses.length === 0 && (
                <span className="text-slate-500 text-sm">No businesses listed on this floor.</span>
              )}
            </div>
          </div>

          {/* Column 2: Second Floor */}
          <div className="md:pl-6 flex flex-col">
            <div className="flex items-center gap-4 mb-8">
              <span className="text-6xl md:text-7xl font-extrabold text-slate-300 leading-none select-none">2</span>
              <div className="border-l border-slate-700/80 h-10 pl-4 flex items-center">
                <span className="text-sm font-bold tracking-widest text-slate-400 uppercase">Second Floor</span>
              </div>
            </div>
            
            <div className="flex-1 space-y-2">
              {floor2Businesses.map((business) => (
                <Link 
                  key={business.id} 
                  href={`/business/${business.slug}`} 
                  className="flex items-baseline py-1.5 group hover:opacity-80 transition-opacity"
                >
                  <span className="w-16 md:w-20 shrink-0 font-bold text-slate-200 text-lg md:text-xl group-hover:text-blue-400 transition-colors">
                    {business.location || business.suite?.number}
                  </span>
                  <span className="text-slate-300 text-lg md:text-xl group-hover:text-white transition-colors">
                    {business.name}
                    {business.category && (
                      <span className="text-slate-500 font-medium"> - {business.category}</span>
                    )}
                  </span>
                </Link>
              ))}
              {floor2Businesses.length === 0 && (
                <span className="text-slate-500 text-sm">No businesses listed on this floor.</span>
              )}
            </div>
          </div>

        </div>

        {/* Bottom Half: Basement Level (spanning the left area width) */}
        <div className="border-t border-[#1d1f2e]/60 pt-10 flex flex-col">
          <div className="flex items-center gap-4 mb-8">
            <span className="text-6xl md:text-7xl font-extrabold text-slate-300 leading-none select-none">B</span>
            <div className="border-l border-slate-700/80 h-10 pl-4 flex items-center">
              <span className="text-sm font-bold tracking-widest text-slate-400 uppercase">Basement Level</span>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 md:gap-x-24 gap-y-2">
            {/* Column 1 of basement businesses */}
            <div className="space-y-2">
              {basementCol1.map((business) => (
                <Link 
                  key={business.id} 
                  href={`/business/${business.slug}`} 
                  className="flex items-baseline py-1.5 group hover:opacity-80 transition-opacity"
                >
                  <span className="w-16 md:w-20 shrink-0 font-bold text-slate-200 text-lg md:text-xl group-hover:text-blue-400 transition-colors">
                    {business.location || business.suite?.number}
                  </span>
                  <span className="text-slate-300 text-lg md:text-xl group-hover:text-white transition-colors">
                    {business.name}
                    {business.category && (
                      <span className="text-slate-500 font-medium"> - {business.category}</span>
                    )}
                  </span>
                </Link>
              ))}
            </div>

            {/* Column 2 of basement businesses */}
            <div className="space-y-2">
              {basementCol2.map((business) => (
                <Link 
                  key={business.id} 
                  href={`/business/${business.slug}`} 
                  className="flex items-baseline py-1.5 group hover:opacity-80 transition-opacity"
                >
                  <span className="w-16 md:w-20 shrink-0 font-bold text-slate-200 text-lg md:text-xl group-hover:text-blue-400 transition-colors">
                    {business.location || business.suite?.number}
                  </span>
                  <span className="text-slate-300 text-lg md:text-xl group-hover:text-white transition-colors">
                    {business.name}
                    {business.category && (
                      <span className="text-slate-500 font-medium"> - {business.category}</span>
                    )}
                  </span>
                </Link>
              ))}
            </div>
          </div>
          {basementBusinesses.length === 0 && (
            <span className="text-slate-500 text-sm">No businesses listed on this floor.</span>
          )}
        </div>

      </div>

      {/* Right Column: Weather Widget (full height) */}
      <div className="w-full lg:w-80 xl:w-96 shrink-0 lg:border-l border-[#1d1f2e]/60 lg:pl-10 xl:pl-12 flex flex-col justify-start">
        <div className="flex items-center gap-4 mb-8">
          <div className="h-10 flex items-center">
            <span className="text-sm font-bold tracking-widest text-[#2563eb] uppercase">Malden Weather</span>
          </div>
        </div>
        <div className="flex-1 flex flex-col">
          <WeatherWidget />
        </div>
      </div>

    </div>
  );
}
