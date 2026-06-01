# Gemini Developer Guide - Lobby Kiosk Directory

This file provides an overview of the Lobby Kiosk Business Directory application, details the enhancements implemented, and outlines key design conventions and coding guidelines for future models.

---

## 🏢 Project Overview

This application is a **Public Lobby Kiosk and Business Directory** designed to run on full-screen kiosk displays (TVs) and tablets in building lobbies.

### Tech Stack
- **Framework**: Next.js (App Router, utilizing Server Components and Server Actions)
- **Styling**: Tailwind CSS v4, styled in a premium dark dashboard neon-indigo theme
- **Icons**: Lucide React
- **Database**: Supabase database connection managed via `@supabase/ssr` (`lib/supabase.ts`) and Server Actions (`lib/actions.ts`).

---

## 🛠️ Work Done So Far

We completed a comprehensive structural and visual overhaul of the kiosk directory and admin panels:

### 1. Kiosk Visual & Layout Adjustments (Single-Page Floor Directory & Weather)
- **Single-Page Layout**: Redesigned the home page (`PublicDirectoryClient.tsx`) to fit entirely on one screen without scrolling:
  - **Left/Center Directory**: Displays First Floor and Second Floor side-by-side on the top row (divided by a vertical line), and Basement Level on the bottom row (divided by a horizontal line, split into two columns).
  - **Right-Hand Sidebar**: Spans the full height of the page, embedding the Live Weather Widget.
- **Floor Filters & Headers Removal**: Completely removed the floor filter buttons ("All Floors", "Floor 1", etc.) and the building header to maximize vertical viewport space for TV display kiosk use.
- **Inline Industry Formatting**: Each business listing formats dynamically as `<Suite> <Name> - <Category>` (e.g. `101 American Dental Consultants - Dental`).
- **Announcement Banner Removal**: Completely disabled the cafeteria/banner alerts.
- **Live Weather Integration**: Embedded a custom weather widget (`WeatherWidget.tsx`) on the right side of the directory. It queries the Open-Meteo API for Malden, MA coordinates and displays current temperature/conditions alongside a 6-hour hourly forecast. Correlates night-time hours (8:00 PM to 6:00 AM) to label clear skies as "Clear" and render moon/cloud-moon icons instead of sun-based icons.

### 2. High-Contrast Dark Theme
- **Global Theme Variables**: Enforced a default dark neon-indigo dashboard style in `globals.css` using `#08090d` for backgrounds, `#0b0c13` for sidebars, `#111219` for cards, and `#2563eb` for neon-blue accents.
- **Concentric Hover Glows**: Configured cards and inputs to scale up, light up active borders, and cast subtle blue glow shadows (`shadow-[0_0_15px_rgba(37,99,235,0.15)]`) upon hover.
- **Modern Typography**: Imported and set `"Plus Jakarta Sans"` as the default sans-serif font family.

### 3. Business Details & Hours Editors (Admin Panel)
- **Read-Only Public Details**: Simplified the public business details view (`BusinessDetailClient.tsx`) to be strictly read-only, making it suitable for TV displays.
- **Admin Panel Configuration Forms**: Overhauled both the Add Business (`new/page.tsx`) and Customize Business (`[id]/edit/page.tsx`) forms. These forms now feature a modern two-section layout ("Business Details" and "Business Hours") where administrators can edit Company Name, Industry, Description, Location, Floor, Phone, Email, Website, Status, and day-by-day operating hours.

### 4. Manual Location Customization
- **Flexible Location Entry**: Replaced rigid pre-defined suite dropdown selections with a manual **Location** text input box (e.g., *"Suite 101"*, *"Lobby Area"*).
- **Floor Mapping Compatibility**: Added a separate **Floor** select dropdown. If a business does not use a fixed `suite_id` but has a `floor_id` and a manual `location`, `fetchBusinesses()` dynamically builds a mock suite mapping so that the public kiosk's floor filters work perfectly.

### 5. Admin Authentication & Overhaul
- **Sign In Panel**: Reconfigured `/login` to check against `admin@gmail.com` with password `123Password`, prompting validation warnings on failure and routing to `/admin` on success.
- **Dashboard Overhaul**: Restyled the admin sidebar, overview stats widgets, business table (`BusinessTable.tsx`), and settings forms (`settings/page.tsx`) to match the dark neon-indigo styling.

---

## 📌 Guidelines for Future Models

When working on this project, please adhere to the following conventions:

### 🎨 Theme & Aesthetic System
- **Theme**: Do not introduce light-colored panels or backgrounds. All pages (public and admin) must use the dark variables:
  - Backgrounds: `#08090d`
  - Encapsulated containers / cards: `#111219`
  - Accents/Foci: `#2563eb` (Neon Blue)
- **Borders & Dividers**: Use `#1d1f2e` for structural borders.
- **Font**: Use the primary `--font-sans` variable (mapped to `Plus_Jakarta_Sans`) for UI text and headings.

### 💾 Data Model Conventions
- **Business Model**: The `Business` interface has optional fields `location?: string | null` and `floor_id?: string | null`.
- **Suite Fallback**: Keep the layout backward-compatible. If `business.location` is set, render it directly. If not, fallback to displaying `business.suite` details.

### 🔀 Routing & Actions
- **Route Groups**: Route groups separate permissions:
  - `(public)` contains root directory and business slugs.
  - `(admin)` contains the logins and dashboard options.
- **Mutations**: Write database updates inside `lib/actions.ts` using `"use server"` actions, and ensure they invoke `revalidatePath("/")` and `revalidatePath("/admin")` to refresh next.js cache dynamically.
