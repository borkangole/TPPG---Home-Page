import { FinalCta } from "@/components/about/FinalCta";
import { ContactFaq } from "@/components/contact/ContactFaq";
import { ContactIntro } from "@/components/contact/ContactIntro";
import { OfficeLocation } from "@/components/contact/OfficeLocation";
import { CONTACT, CONTACT_FAQ } from "@/lib/contact";
import { firstParam, type SearchParams } from "@/lib/filter-options";
import { getProperty } from "@/lib/listings";
import { buildMetadata } from "@/lib/seo/metadata";
import { SITE } from "@/lib/seo/site";

export const metadata = buildMetadata({
  title: "Contact Us | Talk to a Property Specialist in Iloilo",
  description:
    "Send an inquiry, call, or visit The Premier Property Group in Iloilo Business Park. A property specialist will help you find condos, house and lot, and lots.",
  path: "/contact",
});

const o = CONTACT.office;
const jsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "RealEstateAgent",
    name: SITE.name,
    url: `${SITE.url}/contact`,
    telephone: CONTACT.phone.display,
    email: CONTACT.email.display,
    address: {
      "@type": "PostalAddress",
      streetAddress: `${o.building}, ${o.street}`,
      addressLocality: "Iloilo City",
      addressRegion: "Iloilo",
      postalCode: "5000",
      addressCountry: "PH",
    },
    geo: { "@type": "GeoCoordinates", latitude: o.lat, longitude: o.lng },
  },
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: CONTACT_FAQ.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  },
];

export default async function ContactPage({ searchParams }: { searchParams: Promise<SearchParams> }) {
  const sp = await searchParams;
  const slug = firstParam(sp.property);
  const p = slug ? getProperty(slug) : null;

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <ContactIntro property={p ? { slug: p.slug, name: `${p.name}, ${p.location}` } : null} />
      <OfficeLocation />
      <ContactFaq />
      <FinalCta
        title="Your next property starts"
        accent="with a conversation."
        text="Let TPPG help you explore your options, from your first question to the day you get your keys."
        primary={{ href: "#inquire", label: "Send an inquiry" }}
        secondary={{ href: "/properties", label: "Browse properties" }}
      />
    </>
  );
}
