import { PropertiesView } from "@/components/properties/PropertiesView";
import type { SearchParams } from "@/lib/filter-options";
import { buildMetadata } from "@/lib/seo/metadata";

export const metadata = buildMetadata({
  title: "House and Lot for Sale in Iloilo",
  description: "House and lot packages for sale in Iloilo from trusted developers.",
  path: "/properties/house-and-lot",
});

export default async function HouseAndLotPage({ searchParams }: { searchParams: Promise<SearchParams> }) {
  return (
    <PropertiesView
      searchParams={await searchParams}
      title="House and lot for sale"
      basePath="/properties/house-and-lot"
      presetType="house-and-lot"
    />
  );
}
