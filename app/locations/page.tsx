import Link from "next/link";
import { buildMetadata } from "@/lib/seo/metadata";
import { LOCATIONS } from "@/lib/seo/site";

export const metadata = buildMetadata({
  title: "Property Locations in Iloilo",
  description: "Explore properties for sale by area: Iloilo City, Mandurriao, Jaro, La Paz, Molo, Pavia, and Oton.",
  path: "/locations",
});

export default function LocationsPage() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-16">
      <h1 className="text-2xl font-bold">Locations</h1>
      <ul className="mt-4 list-disc pl-5">
        {LOCATIONS.map((l) => (
          <li key={l.slug}>
            <Link href={`/locations/${l.slug}`}>{l.name}</Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
