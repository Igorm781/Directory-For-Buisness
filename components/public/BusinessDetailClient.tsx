"use client";

import Link from "next/link";
import { ArrowLeft, Clock, Globe, Mail, MapPin, Phone } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { formatHours } from "@/lib/utils";
import { Business } from "@/lib/types";

interface BusinessDetailClientProps {
  initialBusiness: Business;
}

export function BusinessDetailClient({ initialBusiness }: BusinessDetailClientProps) {
  const business = initialBusiness;
  const formattedHours = formatHours(business.hours);

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-800 font-sans">
      <header className="bg-white border-b border-slate-200">
        <div className="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link
            href="/"
            className="inline-flex items-center text-sm font-medium text-slate-500 hover:text-blue-600 transition-colors"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Directory
          </Link>
        </div>
      </header>

      <main className="flex-1 w-full max-w-4xl mx-auto px-6 py-12 relative">
        <div className="bg-white border border-slate-200/80 rounded-2xl shadow-md overflow-hidden">
          <div className="p-8 md:p-12">
            <div className="flex flex-col md:flex-row gap-8 items-start">
              {business.logo_url ? (
                <div className="w-32 h-32 rounded-2xl overflow-hidden border border-slate-200 bg-slate-50 shrink-0 flex items-center justify-center">
                  <img src={business.logo_url} alt={business.name} className="w-full h-full object-cover" />
                </div>
              ) : (
                <div className="w-32 h-32 rounded-2xl bg-slate-100 flex items-center justify-center border border-slate-200 shrink-0">
                  <span className="text-4xl font-bold text-blue-600">{business.name.charAt(0)}</span>
                </div>
              )}

              <div className="flex-1">
                <h1 className="text-4xl font-bold tracking-tight text-slate-900 mb-2">{business.name}</h1>
                {business.category && (
                  <Badge variant="secondary" className="mb-6 bg-slate-100 text-blue-600 border border-blue-100 hover:bg-slate-100">
                    {business.category}
                  </Badge>
                )}

                {business.description && (
                  <p className="text-lg text-slate-650 mb-8 leading-relaxed">{business.description}</p>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-4">
                    <h3 className="font-semibold text-slate-900 flex items-center">
                      <MapPin className="mr-2 h-5 w-5 text-blue-500" />
                      Location
                    </h3>
                    {(business.location || business.suite) && (
                      <div className="pl-7">
                        <p className="text-lg font-medium text-slate-800">
                          {business.location || `Suite ${business.suite?.number}`}
                        </p>
                        {business.suite?.floor && (
                          <p className="text-slate-400 text-sm mt-0.5">
                            {business.suite.floor.label || `Floor ${business.suite.floor.number}`}
                          </p>
                        )}
                      </div>
                    )}
                  </div>

                  <div className="space-y-4">
                    <h3 className="font-semibold text-slate-900 flex items-center">
                      <Clock className="mr-2 h-5 w-5 text-blue-500" />
                      Hours
                    </h3>
                    {formattedHours && formattedHours.length > 0 ? (
                      <ul className="pl-7 space-y-1.5">
                        {formattedHours.map((h) => (
                          <li key={h.day} className="flex justify-between text-slate-700 max-w-[200px] text-sm">
                            <span className="font-semibold text-slate-450">{h.day}</span>
                            <span className="text-slate-800">{h.time}</span>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p className="pl-7 text-slate-400 text-sm">Hours not listed.</p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-slate-50/50 p-8 md:px-12 border-t border-slate-150 grid grid-cols-1 sm:grid-cols-3 gap-6">
            {business.phone ? (
              <a
                href={`tel:${business.phone}`}
                className="flex flex-col items-center justify-center p-4 rounded-xl bg-white border border-slate-200 hover:border-blue-500/40 transition-colors hover:shadow-sm"
              >
                <Phone className="h-6 w-6 text-blue-500 mb-2" />
                <span className="font-medium text-slate-900">{business.phone}</span>
                <span className="text-xs text-slate-450 mt-1">Call</span>
              </a>
            ) : (
              <div className="flex flex-col items-center justify-center p-4 rounded-xl bg-slate-50 border border-dashed border-slate-200 opacity-40">
                <Phone className="h-6 w-6 text-slate-400 mb-2" />
                <span className="font-medium text-slate-400 text-sm">No Phone</span>
              </div>
            )}
            {business.email ? (
              <a
                href={`mailto:${business.email}`}
                className="flex flex-col items-center justify-center p-4 rounded-xl bg-white border border-slate-200 hover:border-blue-500/40 transition-colors hover:shadow-sm"
              >
                <Mail className="h-6 w-6 text-blue-500 mb-2" />
                <span className="font-medium text-slate-900 truncate w-full text-center">{business.email}</span>
                <span className="text-xs text-slate-455 mt-1">Email</span>
              </a>
            ) : (
              <div className="flex flex-col items-center justify-center p-4 rounded-xl bg-slate-50 border border-dashed border-slate-200 opacity-40">
                <Mail className="h-6 w-6 text-slate-400 mb-2" />
                <span className="font-medium text-slate-400 text-sm">No Email</span>
              </div>
            )}
            {business.website ? (
              <a
                href={business.website}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center justify-center p-4 rounded-xl bg-white border border-slate-200 hover:border-blue-500/40 transition-colors hover:shadow-sm"
              >
                <Globe className="h-6 w-6 text-blue-500 mb-2" />
                <span className="font-medium text-slate-900 truncate w-full text-center">
                  {business.website.replace(/^https?:\/\//, "")}
                </span>
                <span className="text-xs text-slate-455 mt-1">Website</span>
              </a>
            ) : (
              <div className="flex flex-col items-center justify-center p-4 rounded-xl bg-slate-50 border border-dashed border-slate-200 opacity-40">
                <Globe className="h-6 w-6 text-slate-400 mb-2" />
                <span className="font-medium text-slate-400 text-sm">No Website</span>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
