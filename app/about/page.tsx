import { Achievements } from "@/components/about/Achievements";
import { AboutHero } from "@/components/about/AboutHero";
import { DeveloperPartners } from "@/components/about/DeveloperPartners";
import { FinalCta } from "@/components/about/FinalCta";
import { Leadership } from "@/components/about/Leadership";
import { MissionVision } from "@/components/about/MissionVision";
import { OurStory } from "@/components/about/OurStory";
import { SpecialistsBand } from "@/components/about/SpecialistsBand";
import { WhatWeDo } from "@/components/about/WhatWeDo";
import { AWARDS, LEADERS, MISSION, REGIONS_SERVED, TEAM_SIZE } from "@/lib/about";
import { buildMetadata } from "@/lib/seo/metadata";
import { SITE } from "@/lib/seo/site";

export const metadata = buildMetadata({
  title: "About Us | Real Estate Brokerage in Iloilo",
  description: `Meet The Premier Property Group: a ${TEAM_SIZE}-strong team of property specialists led by CEO & Broker Shienna Rose Cordero, selling condos, house and lot, and lots in Iloilo, Cebu, and Palawan.`,
  path: "/about",
});

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "RealEstateAgent",
  name: SITE.name,
  alternateName: SITE.shortName,
  url: `${SITE.url}/about`,
  description: MISSION,
  areaServed: REGIONS_SERVED.map((name) => ({ "@type": "AdministrativeArea", name })),
  numberOfEmployees: { "@type": "QuantitativeValue", value: TEAM_SIZE },
  employee: LEADERS.map((l) => ({ "@type": "Person", name: l.name, jobTitle: l.role })),
  award: AWARDS.map((a) => `${a.title}, ${a.by}${a.year ? ` (${a.year})` : ""}`),
};

export default function AboutPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <AboutHero />
      <Leadership />
      <OurStory />
      <MissionVision />
      <WhatWeDo />
      <SpecialistsBand />
      <DeveloperPartners />
      <Achievements />
      <FinalCta />
    </>
  );
}
