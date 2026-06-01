import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function slugify(str: string) {
  return str
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");
}

export function formatHours(hours: Record<string, string> | null) {
  if (!hours) return null;
  const days = ["mon", "tue", "wed", "thu", "fri", "sat", "sun"];
  const formatted: { day: string; time: string }[] = [];
  
  for (const day of days) {
    if (hours[day]) {
      formatted.push({
        day: day.charAt(0).toUpperCase() + day.slice(1),
        time: hours[day]
      });
    }
  }
  return formatted;
}
