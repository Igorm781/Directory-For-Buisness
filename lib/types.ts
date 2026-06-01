export interface Building {
  id: string;
  name: string;
  address: string | null;
  logo_url: string | null;
  created_at: string;
}

export interface Floor {
  id: string;
  building_id: string;
  number: number;
  label: string | null;
  display_order: number;
  created_at: string;
}

export interface Suite {
  id: string;
  floor_id: string;
  number: string;
  created_at: string;
}

export interface Business {
  id: string;
  suite_id: string | null;
  location?: string | null;
  floor_id?: string | null;
  name: string;
  slug: string;
  description: string | null;
  logo_url: string | null;
  category: string | null;
  phone: string | null;
  email: string | null;
  website: string | null;
  hours: Record<string, string> | null;
  is_active: boolean;
  is_featured: boolean;
  display_order: number;
  created_at: string;
  updated_at: string;
  
  // Joined fields for convenience in UI
  suite?: Suite & { floor?: Floor };
}

export interface Setting {
  id: string;
  key: string;
  value: any;
  updated_at: string;
}

export interface Announcement {
  id: string;
  content: string;
  is_active: boolean;
  start_date: string | null;
  end_date: string | null;
  created_at: string;
}
