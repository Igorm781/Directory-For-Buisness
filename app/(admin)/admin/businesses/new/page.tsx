"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { ArrowLeft, Clock, Save, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { addBusiness, fetchBusinesses, fetchFloors } from "@/lib/actions";
import { Floor } from "@/lib/types";

export default function AddBusinessPage() {
  const router = useRouter();
  const [nextOrder, setNextOrder] = useState(1);
  const [loading, setLoading] = useState(false);
  const [floors, setFloors] = useState<Floor[]>([]);

  useEffect(() => {
    fetchBusinesses().then(businesses => {
      const max = businesses.length > 0 ? Math.max(...businesses.map(b => b.display_order)) : 0;
      setNextOrder(max + 1);
    });
    fetchFloors().then(setFloors);
  }, []);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.currentTarget);

    const mon = formData.get("hours_mon") as string;
    const tue = formData.get("hours_tue") as string;
    const wed = formData.get("hours_wed") as string;
    const thu = formData.get("hours_thu") as string;
    const fri = formData.get("hours_fri") as string;
    const sat = formData.get("hours_sat") as string;
    const sun = formData.get("hours_sun") as string;

    const hoursObj: Record<string, string> = {};
    if (mon) hoursObj.mon = mon;
    if (tue) hoursObj.tue = tue;
    if (wed) hoursObj.wed = wed;
    if (thu) hoursObj.thu = thu;
    if (fri) hoursObj.fri = fri;
    if (sat) hoursObj.sat = sat;
    if (sun) hoursObj.sun = sun;
    
    await addBusiness({
      name: formData.get("name") as string,
      category: (formData.get("category") as string) || null,
      is_active: formData.get("status") === "active" || formData.get("status") === "featured",
      is_featured: formData.get("status") === "featured",
      display_order: nextOrder,
      logo_url: null,
      description: (formData.get("description") as string) || null,
      phone: (formData.get("phone") as string) || null,
      email: (formData.get("email") as string) || null,
      website: (formData.get("website") as string) || null,
      suite_id: null,
      location: (formData.get("location") as string) || null,
      floor_id: (formData.get("floor_id") as string) || null,
      hours: Object.keys(hoursObj).length > 0 ? hoursObj : null,
    });
    
    router.push("/admin");
  }

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <div className="mb-6">
        <Link href="/admin" className="inline-flex items-center text-sm font-semibold text-gray-400 hover:text-blue-400 transition-colors">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Dashboard
        </Link>
      </div>

      <form onSubmit={handleSubmit} className="rounded-xl border border-[#1d1f2e] bg-[#111219]/60 p-8 md:p-10 shadow-xl space-y-8 backdrop-blur-md">
        
        {/* Form Header mimicking edit details screenshot */}
        <div className="flex items-center justify-between border-b border-[#1d1f2e] pb-6">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-white">Add Business Details</h1>
            <p className="text-sm text-gray-400 mt-1">Directly create listing information.</p>
          </div>
          <div className="flex gap-3">
            <Link href="/admin">
              <Button variant="outline" type="button" disabled={loading} className="border-[#1d1f2e] bg-[#111219] text-gray-300 hover:bg-[#1c1e28] hover:text-white">
                <X className="mr-2 h-4 w-4" />
                Cancel
              </Button>
            </Link>
            <Button type="submit" disabled={loading} className="bg-blue-600 hover:bg-blue-700 text-white shadow-[0_0_15px_rgba(37,99,235,0.2)]">
              <Save className="mr-2 h-4 w-4" />
              Save Changes
            </Button>
          </div>
        </div>

        {/* Section 1: Business Information fields aligned exactly like screenshot */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          <div className="space-y-2">
            <Label htmlFor="name" className="text-gray-300 font-semibold">Company Name</Label>
            <Input id="name" name="name" placeholder="American Dental Consultants" required className="bg-[#0b0c13]/50 border-[#1d1f2e] text-white focus:ring-blue-500" />
          </div>

          <div className="space-y-2">
            <Label htmlFor="category" className="text-gray-300 font-semibold">Industry / Category</Label>
            <Input id="category" name="category" placeholder="Dental" className="bg-[#0b0c13]/50 border-[#1d1f2e] text-white focus:ring-blue-500" />
          </div>

          <div className="space-y-2 md:col-span-2">
            <Label htmlFor="description" className="text-gray-300 font-semibold">Description</Label>
            <textarea
              id="description"
              name="description"
              placeholder="Welcome to company, located in Suite..."
              rows={4}
              className="flex w-full rounded-md border border-[#1d1f2e] bg-[#0b0c13]/50 px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 text-white"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="location" className="text-gray-300 font-semibold">Location (Suite / Area)</Label>
            <Input id="location" name="location" placeholder="101" className="bg-[#0b0c13]/50 border-[#1d1f2e] text-white focus:ring-blue-500" />
          </div>

          <div className="space-y-2">
            <Label htmlFor="floor_id" className="text-gray-300 font-semibold">Floor (For Kiosk Filtering)</Label>
            <select id="floor_id" name="floor_id" className="flex h-10 w-full items-center justify-between rounded-md border border-[#1d1f2e] bg-[#0b0c13]/50 px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 text-white">
              <option value="">No Floor</option>
              {floors.map(f => <option key={f.id} value={f.id}>{f.label || `Floor ${f.number}`}</option>)}
            </select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone" className="text-gray-300 font-semibold">Phone Number</Label>
            <Input id="phone" name="phone" placeholder="617-123-4567" className="bg-[#0b0c13]/50 border-[#1d1f2e] text-white focus:ring-blue-500" />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email" className="text-gray-300 font-semibold">Email Address</Label>
            <Input id="email" name="email" type="email" placeholder="contact@company.demo" className="bg-[#0b0c13]/50 border-[#1d1f2e] text-white focus:ring-blue-500" />
          </div>

          <div className="space-y-2">
            <Label htmlFor="website" className="text-gray-300 font-semibold">Website URL</Label>
            <Input id="website" name="website" placeholder="https://company.demo" className="bg-[#0b0c13]/50 border-[#1d1f2e] text-white focus:ring-blue-500" />
          </div>

          <div className="space-y-2">
            <Label htmlFor="status" className="text-gray-300 font-semibold">Status</Label>
            <select id="status" name="status" className="flex h-10 w-full items-center justify-between rounded-md border border-[#1d1f2e] bg-[#0b0c13]/50 px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 text-white">
              <option value="active">Active</option>
              <option value="featured">Featured</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>

        </div>

        {/* Section 2: Business Hours split exactly like screenshot */}
        <div className="border-t border-[#1d1f2e] pt-8 space-y-6">
          <h3 className="font-bold text-white flex items-center gap-2">
            <Clock className="h-5 w-5 text-blue-500" />
            Business Hours
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            
            <div className="space-y-1.5">
              <Label htmlFor="hours_mon" className="text-gray-400 font-medium">Monday</Label>
              <Input id="hours_mon" name="hours_mon" placeholder="9am - 5pm" className="bg-[#0b0c13]/50 border-[#1d1f2e] text-white focus:ring-blue-500" />
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="hours_tue" className="text-gray-400 font-medium">Tuesday</Label>
              <Input id="hours_tue" name="hours_tue" placeholder="9am - 5pm" className="bg-[#0b0c13]/50 border-[#1d1f2e] text-white focus:ring-blue-500" />
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="hours_wed" className="text-gray-400 font-medium">Wednesday</Label>
              <Input id="hours_wed" name="hours_wed" placeholder="9am - 5pm" className="bg-[#0b0c13]/50 border-[#1d1f2e] text-white focus:ring-blue-500" />
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="hours_thu" className="text-gray-400 font-medium">Thursday</Label>
              <Input id="hours_thu" name="hours_thu" placeholder="9am - 5pm" className="bg-[#0b0c13]/50 border-[#1d1f2e] text-white focus:ring-blue-500" />
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="hours_fri" className="text-gray-400 font-medium">Friday</Label>
              <Input id="hours_fri" name="hours_fri" placeholder="9am - 5pm" className="bg-[#0b0c13]/50 border-[#1d1f2e] text-white focus:ring-blue-500" />
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="hours_sat" className="text-gray-400 font-medium">Saturday</Label>
              <Input id="hours_sat" name="hours_sat" placeholder="e.g. Closed" className="bg-[#0b0c13]/50 border-[#1d1f2e] text-white focus:ring-blue-500" />
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="hours_sun" className="text-gray-400 font-medium">Sunday</Label>
              <Input id="hours_sun" name="hours_sun" placeholder="e.g. Closed" className="bg-[#0b0c13]/50 border-[#1d1f2e] text-white focus:ring-blue-500" />
            </div>

          </div>
        </div>

      </form>
    </div>
  );
}
