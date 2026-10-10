import { GuideCard } from "@/components/guides/GuideCard";
import { GUIDES } from "@/lib/guides";
import { buildMetadata } from "@/lib/seo/metadata";
import { SITE } from "@/lib/seo/site";

export const metadata = buildMetadata({
  title: "Property Buying Guides for Iloilo Buyers",
  description:
    "Practical guides for buying a condo, house and lot, or lot in Iloilo: payment terms, pre-selling vs RFO, and the step-by-step buying process.",
  path: "/guides",
});

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  name: "Property Buying Guides",
  url: `${SITE.url}/guides`,
  hasPart: GUIDES.map((g) => ({ "@type": "Article", headline: g.title, url: `${SITE.url}/guides/${g.slug}` })),
};

export default function GuidesPage() {
  const [first, ...rest] = GUIDES;
  return (
    <section className="relative isolate overflow-hidden pt-16">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <div aria-hidden className="absolute -left-40 top-24 -z-10 h-[28rem] w-[28rem] rounded-full bg-brand/10 blur-[120px]" />
      <div className="container-site pb-24 pt-14 sm:pb-32 sm:pt-20">
        <p className="eyebrow rise rise-1">Property guides</p>
        <h1 className="rise rise-2 mt-5 max-w-3xl text-[2.5rem] font-bold leading-[1.05] tracking-tight text-white sm:text-5xl lg:text-6xl">
          Buy with confidence,{" "}
          <span className="font-serif font-normal italic text-brand-soft">one step at a time.</span>
        </h1>
        <p className="rise rise-3 mt-6 max-w-2xl leading-relaxed text-zinc-400 sm:text-lg">
          Plain-language guides for buying a condo, house and lot, or lot in Iloilo, written by the TPPG team.
        </p>

        <div className="mt-14 grid gap-5 lg:grid-cols-2">
          <GuideCard guide={first} featured headingLevel={2} />
          <div className="grid gap-5">
            {rest.map((g) => (
              <GuideCard key={g.slug} guide={g} headingLevel={2} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
