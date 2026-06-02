"use client";

import { Business } from "@/lib/types";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { MoreHorizontal } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { deleteBusiness } from "@/lib/actions";
import { useRouter } from "next/navigation";
import { useState } from "react";

export function BusinessTable({ businesses }: { businesses: Business[] }) {
  const router = useRouter();
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const businessToDelete = businesses.find(b => b.id === deleteId);

  return (
    <>
      {/* Desktop Table View */}
      <div className="hidden md:block rounded-xl border border-[#1d1f2e] bg-[#111219]/60 shadow-xl overflow-hidden backdrop-blur-md">
        <Table>
          <TableHeader className="bg-[#0b0c13]/85 border-b border-[#1d1f2e]">
            <TableRow>
              <TableHead className="w-[50px] font-semibold text-gray-400 uppercase tracking-wider text-xs">#</TableHead>
              <TableHead className="font-semibold text-gray-400 uppercase tracking-wider text-xs">Company Name</TableHead>
              <TableHead className="font-semibold text-gray-400 uppercase tracking-wider text-xs">Industry</TableHead>
              <TableHead className="font-semibold text-gray-400 uppercase tracking-wider text-xs">Location</TableHead>
              <TableHead className="font-semibold text-gray-400 uppercase tracking-wider text-xs">Status</TableHead>
              <TableHead className="text-right"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {businesses.map((business, i) => (
              <TableRow key={business.id} className="hover:bg-[#1c1e28]/50 border-b border-[#1d1f2e]/60 transition-colors">
                <TableCell className="font-bold text-gray-400">{business.display_order}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-3">
                    {business.logo_url ? (
                      <img src={business.logo_url} alt="" className="h-8 w-8 rounded-md bg-[#0b0c13] border border-[#1d1f2e] object-cover" />
                    ) : (
                      <div className="h-8 w-8 rounded-md bg-[#1c1e28] border border-[#1d1f2e] flex items-center justify-center text-xs font-semibold text-blue-400">
                        {business.name.charAt(0)}
                      </div>
                    )}
                    <span className="font-semibold text-white">{business.name}</span>
                  </div>
                </TableCell>
                <TableCell className="text-gray-300 font-medium">{business.category || "-"}</TableCell>
                <TableCell className="text-gray-300 font-medium">
                  {business.location || (business.suite ? `Suite ${business.suite.number}` : "-")}
                </TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    {business.is_active ? (
                      <Badge variant="outline" className="bg-emerald-500/10 text-emerald-400 border-emerald-500/20 font-medium px-2.5 py-0.5">
                        Active
                      </Badge>
                    ) : (
                      <Badge variant="outline" className="bg-gray-500/10 text-gray-400 border-gray-500/20 font-medium px-2.5 py-0.5">
                        Inactive
                      </Badge>
                    )}
                    {business.is_featured && (
                      <Badge variant="outline" className="bg-amber-500/10 text-amber-400 border-amber-500/20 font-medium px-2.5 py-0.5">
                        Featured
                      </Badge>
                    )}
                  </div>
                </TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger className="text-gray-400 hover:text-white transition-colors p-2 flex items-center justify-center rounded-md outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2">
                      <MoreHorizontal className="h-5 w-5" />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => router.push(`/admin/businesses/${business.id}/edit`)}>
                        Customize
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        className="text-red-400 focus:text-red-400 focus:bg-red-500/10 cursor-pointer"
                        onClick={() => setDeleteId(business.id)}
                      >
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Mobile Card Grid Layout */}
      <div className="grid grid-cols-1 gap-4 md:hidden">
        {businesses.map((business) => (
          <div key={business.id} className="bg-[#111219]/60 rounded-xl p-5 border border-[#1d1f2e] hover:border-blue-500/20 transition-all duration-300 relative">
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-center gap-3">
                {business.logo_url ? (
                  <img src={business.logo_url} alt="" className="h-10 w-10 rounded-md bg-[#0b0c13] border border-[#1d1f2e] object-cover" />
                ) : (
                  <div className="h-10 w-10 rounded-md bg-[#1c1e28] border border-[#1d1f2e] flex items-center justify-center text-sm font-semibold text-blue-400">
                    {business.name.charAt(0)}
                  </div>
                )}
                <div className="min-w-0">
                  <h3 className="font-semibold text-white text-base leading-tight truncate">{business.name}</h3>
                  <p className="text-xs text-gray-400 mt-0.5">{business.category || "No Category"}</p>
                </div>
              </div>
              
              <DropdownMenu>
                <DropdownMenuTrigger className="text-gray-400 hover:text-white p-1.5 rounded-lg hover:bg-[#1c1e28] transition-colors outline-none shrink-0">
                  <MoreHorizontal className="h-5 w-5" />
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => router.push(`/admin/businesses/${business.id}/edit`)}>
                    Customize
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    className="text-red-400 focus:text-red-400 focus:bg-red-500/10 cursor-pointer"
                    onClick={() => setDeleteId(business.id)}
                  >
                    Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            
            <div className="mt-4 pt-3 border-t border-[#1d1f2e]/60 flex items-center justify-between text-xs text-gray-300">
              <div className="flex items-center gap-1.5">
                <span className="text-gray-500">Location:</span>
                <span className="font-medium text-white">{business.location || (business.suite ? `Suite ${business.suite.number}` : "-")}</span>
              </div>
              <div className="flex gap-1.5">
                {business.is_active ? (
                  <Badge variant="outline" className="bg-emerald-500/10 text-emerald-400 border-emerald-500/20 font-medium px-2 py-0.5 text-[10px]">
                    Active
                  </Badge>
                ) : (
                  <Badge variant="outline" className="bg-gray-500/10 text-gray-400 border-gray-500/20 font-medium px-2 py-0.5 text-[10px]">
                    Inactive
                  </Badge>
                )}
                {business.is_featured && (
                  <Badge variant="outline" className="bg-amber-500/10 text-amber-400 border-amber-500/20 font-medium px-2 py-0.5 text-[10px]">
                    Featured
                  </Badge>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      <AlertDialog open={!!deleteId} onOpenChange={(open) => !open && setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete the business "{businessToDelete?.name}" from the directory. This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              className="bg-red-600 hover:bg-red-700 focus:ring-red-600"
              onClick={async () => {
                if (!deleteId) return;
                const id = deleteId;
                setDeleteId(null);
                await deleteBusiness(id);
              }}
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}



