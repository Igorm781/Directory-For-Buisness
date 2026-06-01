import { notFound } from "next/navigation";
import { fetchBusinesses } from "@/lib/actions";
import { BusinessDetailClient } from "@/components/public/BusinessDetailClient";

export default async function BusinessDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const businesses = await fetchBusinesses();
  const business = businesses.find((b) => b.slug === slug);

  if (!business || !business.is_active) {
    notFound();
  }

  return (
    <BusinessDetailClient initialBusiness={business} />
  );
}
