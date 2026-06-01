import { Announcement } from "@/lib/types";

export function AnnouncementBanner({ announcement }: { announcement: Announcement | null }) {
  if (!announcement || !announcement.is_active) return null;

  return (
    <div className="bg-primary text-primary-foreground px-4 py-2 text-center text-sm font-medium">
      {announcement.content}
    </div>
  );
}
