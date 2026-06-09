"use server";

import { getSupabaseServer } from "./supabase";
import { Business, Building } from "./types";
import { revalidatePath } from "next/cache";
import { slugify } from "./utils";

export async function fetchBuilding() {
  const supabase = await getSupabaseServer();
  const { data, error } = await supabase.from("buildings").select("*").limit(1).single();
  if (error) {
    console.error("fetchBuilding error:", error);
    return {} as Building;
  }
  return data;
}

export async function fetchFloors() {
  const supabase = await getSupabaseServer();
  const { data, error } = await supabase.from("floors").select("*").order("display_order");
  if (error) {
    console.error("fetchFloors error:", error);
    return [];
  }
  return data;
}

export async function fetchSuites() {
  const supabase = await getSupabaseServer();
  const { data, error } = await supabase.from("suites").select("*");
  if (error) {
    console.error("fetchSuites error:", error);
    return [];
  }
  return data;
}

export async function fetchBusinesses() {
  const supabase = await getSupabaseServer();
  const { data, error } = await supabase
    .from("businesses")
    .select("*, suite:suites(*, floor:floors(*)), floor:floors(*)")
    .order("display_order");

  if (error) {
    console.error("fetchBusinesses error:", error);
    return [];
  }

  // Map floor_id and location manually for floor filters
  return (data || []).map((b: any) => {
    let suiteObj = b.suite;
    if (!suiteObj && b.floor_id) {
      suiteObj = {
        id: "",
        floor_id: b.floor_id,
        number: b.location || "",
        created_at: "",
        floor: b.floor || { id: b.floor_id }
      };
    }
    return { ...b, suite: suiteObj };
  });
}

export async function addBusiness(data: Omit<Business, "id" | "slug" | "created_at" | "updated_at">) {
  const supabase = await getSupabaseServer();
  
  // Auth check
  const { data: { user }, error: authError } = await supabase.auth.getUser();
  if (authError || !user) {
    throw new Error("Unauthorized");
  }

  const id = `bus${Date.now()}`;
  const slug = slugify(`${data.name}-${Date.now()}`);
  
  const { data: newBusiness, error } = await supabase
    .from("businesses")
    .insert([{
      ...data,
      id,
      slug,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    }])
    .select()
    .single();

  if (error) {
    console.error("addBusiness error:", error);
    throw error;
  }

  revalidatePath("/");
  revalidatePath("/admin");
  return newBusiness;
}

export async function updateBusiness(id: string, data: Partial<Omit<Business, "id" | "slug" | "created_at" | "updated_at">>) {
  const supabase = await getSupabaseServer();

  // Auth check
  const { data: { user }, error: authError } = await supabase.auth.getUser();
  if (authError || !user) {
    throw new Error("Unauthorized");
  }

  const { error } = await supabase
    .from("businesses")
    .update({
      ...data,
      updated_at: new Date().toISOString()
    })
    .eq("id", id);

  if (error) {
    console.error("updateBusiness error:", error);
    throw error;
  }

  revalidatePath("/");
  revalidatePath("/admin");
}

export async function deleteBusiness(id: string) {
  const supabase = await getSupabaseServer();

  // Auth check
  const { data: { user }, error: authError } = await supabase.auth.getUser();
  if (authError || !user) {
    throw new Error("Unauthorized");
  }

  const { error } = await supabase
    .from("businesses")
    .delete()
    .eq("id", id);

  if (error) {
    console.error("deleteBusiness error:", error);
    throw error;
  }

  revalidatePath("/");
  revalidatePath("/admin");
}

export async function updateBuilding(data: Partial<Building>) {
  const supabase = await getSupabaseServer();

  // Auth check
  const { data: { user }, error: authError } = await supabase.auth.getUser();
  if (authError || !user) {
    throw new Error("Unauthorized");
  }

  const { error } = await supabase
    .from("buildings")
    .update(data)
    .eq("id", "b1"); // Update default building

  if (error) {
    console.error("updateBuilding error:", error);
    throw error;
  }

  revalidatePath("/");
  revalidatePath("/admin");
}

export async function signInAction(email: string, password: string) {
  const adminEmail = process.env.ADMIN_EMAIL;
  const adminPassword = process.env.ADMIN_PASSWORD;

  if (adminEmail && adminPassword) {
    if (email !== adminEmail || password !== adminPassword) {
      return { error: "Invalid email or password. Please try again." };
    }
  }

  const supabase = await getSupabaseServer();
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    // If user does not exist in Auth, try to automatically sign them up
    if (error.message.includes("Invalid login credentials") || error.status === 400) {
      try {
        const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
          email,
          password,
        });

        if (signUpError) {
          return { error: signUpError.message };
        }

        // Try signing in again
        const { data: retryData, error: retryError } = await supabase.auth.signInWithPassword({
          email,
          password,
        });

        if (retryError) {
          if (signUpData.user && !signUpData.session) {
            return { error: "Admin account registered. Please check your email inbox to confirm and activate sign in." };
          }
          return { error: retryError.message };
        }

        return { success: true };
      } catch (signUpFail) {
        return { error: error.message };
      }
    }
    return { error: error.message };
  }

  return { success: true };
}

export async function signOutAction() {
  const supabase = await getSupabaseServer();
  const { error } = await supabase.auth.signOut();
  if (error) {
    console.error("signOutAction error:", error);
    throw error;
  }
  revalidatePath("/");
  revalidatePath("/admin");
}

