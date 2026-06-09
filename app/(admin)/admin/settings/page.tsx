"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { fetchBuilding, updateBuilding } from "@/lib/actions";
import { Building } from "@/lib/types";

export default function AdminSettingsPage() {
  const [building, setBuilding] = useState<Building | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchBuilding().then(setBuilding);
  }, []);

  async function handleSave(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.currentTarget);
    
    await updateBuilding({
      name: formData.get("name") as string,
      address: formData.get("address") as string,
    });
    setLoading(false);
  }

  if (!building) return <div className="p-8">Loading settings...</div>;

  return (
    <div className="p-4 sm:p-6 md:p-8 max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-bold tracking-tight text-white">Settings</h1>
        <p className="text-gray-400">Manage your building's directory settings.</p>
      </div>

      <form onSubmit={handleSave} className="rounded-xl border border-[#1d1f2e] bg-[#111219]/60 p-6 shadow-xl space-y-6">
        <div className="space-y-2">
          <Label htmlFor="name" className="text-gray-300">Building Name</Label>
          <Input id="name" name="name" defaultValue={building.name} required className="bg-[#0b0c13]/50 border-[#1d1f2e] text-white" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="address" className="text-gray-300">Address</Label>
          <Input id="address" name="address" defaultValue={building.address || ""} className="bg-[#0b0c13]/50 border-[#1d1f2e] text-white" />
        </div>
        <div className="space-y-2">
          <Label className="text-gray-300">Logo</Label>
          <div className="flex items-center gap-4">
            {building.logo_url && (
              <img src={building.logo_url} alt="" className="w-16 h-16 rounded-lg border border-[#1d1f2e] object-cover bg-[#0b0c13]" />
            )}
            <div>
              <input type="file" id="logoUpload" className="hidden" accept="image/*" />
              <Label htmlFor="logoUpload" className="cursor-pointer inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-semibold ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-[#1d1f2e] bg-[#111219] hover:bg-[#1c1e28] hover:text-white h-10 px-4 py-2 text-gray-300">
                Upload new logo
              </Label>
            </div>
          </div>
        </div>
        <div className="pt-4">
          <Button type="submit" disabled={loading} className="bg-blue-600 hover:bg-blue-700 text-white">Save Changes</Button>
        </div>
      </form>
    </div>
  );
}

