import { FinalCta } from "@/components/about/FinalCta";
import { SpecialistsBand } from "@/components/about/SpecialistsBand";
import { ExploreByLocation } from "@/components/home/ExploreByLocation";
import { ExploreByType } from "@/components/home/ExploreByType";
import { FeaturedDevelopers } from "@/components/home/FeaturedDevelopers";
import { FeaturedProperties } from "@/components/home/FeaturedProperties";
import { FindMyProperty } from "@/components/home/FindMyProperty";
import { Hero } from "@/components/home/Hero";
import { PropertyGuides } from "@/components/home/PropertyGuides";
import { WhyUs } from "@/components/home/WhyUs";
import { CONTACT } from "@/lib/contact";
import { ALL_PROPERTIES } from "@/lib/listings";
import { buildMetadata } from "@/lib/seo/metadata";
import { REGIONS, SITE } from "@/lib/seo/site";

export const metadata = buildMetadata({
  title: "Real Estate in Iloilo, Cebu & Palawan | TPPG",
  description:
    "Condos, house and lot, and lots for sale, mostly in Iloilo with select projects in Cebu and Palawan. Compare prices and talk to a TPPG property specialist.",
  path: "/",
});

const o = CONTACT.office;
const jsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "RealEstateAgent",
    "@id": `${SITE.url}/#organization`,
    name: SITE.name,
    alternateName: SITE.shortName,
    url: SITE.url,
    logo: `${SITE.url}/icon.png`,
    description: SITE.description,
    areaServed: REGIONS.map((r) => ({ "@type": "AdministrativeArea", name: r.name })),
    address: {
      "@type": "PostalAddress",
      streetAddress: `${o.building}, ${o.street}`,
      addressLocality: "Iloilo City",
      addressRegion: "Iloilo",
      postalCode: "5000",
      addressCountry: "PH",
    },
  },
  {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE.name,
    url: SITE.url,
    publisher: { "@id": `${SITE.url}/#organization` },
    potentialAction: {
      "@type": "SearchAction",
      target: { "@type": "EntryPoint", urlTemplate: `${SITE.url}/properties?q={search_term_string}` },
      "query-input": "required name=search_term_string",
    },
  },
];

/**
 * Homepage, buyer-first order:
 * 1 Hero & search · 2 Featured properties · 3 By type · 4 By location · 5 Find my property ·
 * 6 Why TPPG · 7 Developers · 8 Guides · 9 Specialists · 10 Final CTA · (11 Footer in layout)
 */
export default function HomePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Hero />
      <FeaturedProperties />
      <ExploreByType />
      <ExploreByLocation />
      <FindMyProperty properties={ALL_PROPERTIES} />
      <WhyUs />
      <FeaturedDevelopers />
      <PropertyGuides />
      <SpecialistsBand />
      <FinalCta
        title="Ready to find your"
        accent="next property?"
        text="Browse listings on the map, or tell a property specialist what you need and we’ll take it from there."
        primary={{ href: "/properties", label: "Explore properties" }}
        secondary={{ href: "/contact", label: "Talk to an agent" }}
      />
    </>
  );
}
