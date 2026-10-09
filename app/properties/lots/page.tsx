import { PropertiesView } from "@/components/properties/PropertiesView";
import type { SearchParams } from "@/lib/filter-options";
import { buildMetadata } from "@/lib/seo/metadata";

export const metadata = buildMetadata({
  title: "Lots for Sale in Iloilo and Palawan",
  description: "Residential lots for sale in Iloilo, with select lots in Palawan.",
  path: "/properties/lots",
});

export default async function LotsPage({ searchParams }: { searchParams: Promise<SearchParams> }) {
  return (
    <PropertiesView
      searchParams={await searchParams}
      title="Lots for sale"
      basePath="/properties/lots"
      presetType="lots"
    />
  );
}
