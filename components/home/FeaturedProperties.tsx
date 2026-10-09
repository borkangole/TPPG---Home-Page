import { PropertyCard } from "@/components/properties/PropertyCard";
import { FEATURED_PROPERTIES } from "@/lib/sample-data";
import { SectionHeading } from "./SectionHeading";

export function FeaturedProperties() {
  return (
    <section aria-labelledby="featured-heading" className="py-24 sm:py-32">
      <div className="container-site">
        <SectionHeading
          id="featured-heading"
          eyebrow="Featured properties"
          title="Homes and investments"
          accent="worth a closer look."
          link={{ href: "/properties", label: "View all properties" }}
        />

        <ul className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {/* Iloilo leads; one each from Cebu and Palawan. The full list stays searchable. */}
          {FEATURED_PROPERTIES.slice(0, 6).map((p) => (
            <li key={p.slug}>
              <PropertyCard property={p} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
