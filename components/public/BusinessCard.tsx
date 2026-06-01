import { Business } from "@/lib/types";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Phone, Mail, Globe, MapPin } from "lucide-react";
import Link from "next/link";

export function BusinessCard({ business, isKiosk }: { business: Business; isKiosk?: boolean }) {
  return (
    <Link href={`/business/${business.slug}`}>
      <Card className={`group overflow-hidden transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_0_20px_rgba(37,99,235,0.12)] border-[#1d1f2e] hover:border-blue-500/40 cursor-pointer h-full flex flex-col bg-[#111219]/60 backdrop-blur-sm ${business.is_featured ? 'border-blue-500/30 bg-[#121422]/60' : ''}`}>
        <CardContent className={`p-6 flex-1 flex flex-col ${isKiosk ? 'p-8' : ''}`}>
          <div className="flex items-start justify-between gap-4 mb-4">
            <div className="flex items-center gap-4">
              {business.logo_url ? (
                <div className={`shrink-0 rounded-xl overflow-hidden border border-[#1d1f2e] bg-[#08090d] flex items-center justify-center ${isKiosk ? 'w-20 h-20' : 'w-16 h-16'}`}>
                  <img src={business.logo_url} alt={business.name} className="w-full h-full object-cover" />
                </div>
              ) : (
                <div className={`shrink-0 rounded-xl bg-[#1c1e28] flex items-center justify-center border border-[#1d1f2e] ${isKiosk ? 'w-20 h-20' : 'w-16 h-16'}`}>
                  <span className="text-xl font-bold text-blue-400">{business.name.charAt(0)}</span>
                </div>
              )}
              <div>
                <h3 className={`font-semibold tracking-tight text-white group-hover:text-blue-400 transition-colors duration-200 ${isKiosk ? 'text-2xl' : 'text-lg'}`}>
                  {business.name}
                </h3>
                {business.category && (
                  <Badge variant="secondary" className="mt-1 font-medium bg-[#1c1e28] text-blue-400 border border-blue-500/10 hover:bg-[#1c1e28]">
                    {business.category}
                  </Badge>
                )}
              </div>
            </div>
          </div>
          
          {business.description && (
            <p className={`text-gray-400 line-clamp-2 mb-6 flex-1 ${isKiosk ? 'text-lg' : 'text-sm'}`}>
              {business.description}
            </p>
          )}

          <div className="mt-auto space-y-3">
            {(business.location || business.suite) && (
              <div className={`flex items-center text-gray-300 ${isKiosk ? 'text-lg' : 'text-sm'}`}>
                <MapPin className={`mr-2 shrink-0 text-blue-400 ${isKiosk ? 'h-5 w-5' : 'h-4 w-4'}`} />
                <span className="font-medium text-gray-200">
                  {business.location || `Suite ${business.suite?.number}`}
                </span>
                {business.suite?.floor && (
                  <span className="text-gray-500 ml-1">· {business.suite.floor.label || `Floor ${business.suite.floor.number}`}</span>
                )}
              </div>
            )}
            
            <div className={`flex items-center gap-4 text-gray-400 ${isKiosk ? 'text-base' : 'text-xs'}`}>
              {business.phone && (
                <div className="flex items-center">
                  <Phone className="mr-1.5 h-3.5 w-3.5 text-blue-400" />
                  {business.phone}
                </div>
              )}
              {business.email && (
                <div className="flex items-center">
                  <Mail className="mr-1.5 h-3.5 w-3.5 text-blue-400" />
                  Email
                </div>
              )}
              {business.website && (
                <div className="flex items-center">
                  <Globe className="mr-1.5 h-3.5 w-3.5 text-blue-400" />
                  Website
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
