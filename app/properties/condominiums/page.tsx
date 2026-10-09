import { PropertiesView } from "@/components/properties/PropertiesView";
import type { SearchParams } from "@/lib/filter-options";
import { buildMetadata } from "@/lib/seo/metadata";

export const metadata = buildMetadata({
  title: "Condominiums for Sale in Iloilo",
  description: "Pre-selling and ready-for-occupancy condos for sale, mostly in Iloilo, with select projects in Cebu.",
  path: "/properties/condominiums",
});

export default async function CondominiumsPage({ searchParams }: { searchParams: Promise<SearchParams> }) {
  return (
    <PropertiesView
      searchParams={await searchParams}
      title="Condominiums for sale"
      basePath="/properties/condominiums"
      presetType="condominiums"
    />
  );
}
