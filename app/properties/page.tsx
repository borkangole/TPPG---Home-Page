import { PropertiesView } from "@/components/properties/PropertiesView";
import type { SearchParams } from "@/lib/filter-options";
import { buildMetadata } from "@/lib/seo/metadata";

export const metadata = buildMetadata({
  title: "Properties for Sale in Iloilo, Cebu & Palawan",
  description: "Browse condos, house and lot, and lots for sale in Iloilo, Cebu, and Palawan on a map or as a gallery.",
  path: "/properties",
});

export default async function PropertiesPage({ searchParams }: { searchParams: Promise<SearchParams> }) {
  return (
    <PropertiesView
      searchParams={await searchParams}
      title="Properties for sale"
      basePath="/properties"
    />
  );
}
