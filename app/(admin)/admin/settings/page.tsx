"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
    <div className="p-8 max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-bold tracking-tight text-white">Settings</h1>
        <p className="text-gray-400">Manage your building's directory settings.</p>
      </div>

      <Tabs defaultValue="building" className="w-full">
        <TabsList className="mb-8 bg-[#111219] border border-[#1d1f2e]">
          <TabsTrigger value="building" className="data-[state=active]:bg-[#1c1e28] data-[state=active]:text-white">Building Info</TabsTrigger>
          <TabsTrigger value="display" className="data-[state=active]:bg-[#1c1e28] data-[state=active]:text-white">Display & Kiosk</TabsTrigger>
        </TabsList>
        
        <TabsContent value="building">
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
        </TabsContent>
        
        <TabsContent value="display">
          <div className="rounded-xl border border-[#1d1f2e] bg-[#111219]/60 p-6 shadow-xl space-y-6">
            <h3 className="font-semibold text-white">Kiosk Mode</h3>
            <p className="text-sm text-gray-400 mb-4">Settings specific to the full-screen lobby display.</p>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 border border-[#1d1f2e] rounded-lg bg-[#0b0c13]/50">
                <div>
                  <Label className="text-base text-gray-200">Auto-scroll</Label>
                  <p className="text-sm text-gray-400">Automatically scroll the directory list</p>
                </div>
                <div className="h-6 w-11 rounded-full bg-blue-600 relative cursor-pointer shadow-[0_0_10px_rgba(37,99,235,0.3)]">
                  <div className="absolute right-1 top-1 h-4 w-4 rounded-full bg-white transition-transform"></div>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="speed" className="text-gray-300">Scroll Speed</Label>
                <Input id="speed" type="range" min="10" max="100" defaultValue="30" className="cursor-pointer bg-[#0b0c13]/50 accent-blue-500 border-none" />
              </div>
            </div>
            
            <div className="pt-4">
              <Button className="bg-blue-600 hover:bg-blue-700 text-white">Save Settings</Button>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
