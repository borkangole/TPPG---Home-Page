import { DEVELOPERS } from "@/lib/developers";
import { RotatingLogoGrid } from "./RotatingLogoGrid";
import { SectionHeading } from "./SectionHeading";

// The eight shown first on the homepage; the rest rotate in.
const LEAD = ["ayala-land", "smdc", "megaworld", "cebu-landmasters", "vista-land", "rockwell-land", "avida", "camella"];
const ORDERED = [
  ...LEAD.map((s) => DEVELOPERS.find((d) => d.slug === s)!).filter(Boolean),
  ...DEVELOPERS.filter((d) => !LEAD.includes(d.slug)),
];

export function FeaturedDevelopers() {
  return (
    <section aria-labelledby="developers-heading" className="border-y border-white/[0.06] bg-ink-800 py-24">
      <div className="container-site">
        <SectionHeading
          id="developers-heading"
          eyebrow="Featured developers"
          title="Projects from developers"
          accent="we work with."
          link={{ href: "/about#partners", label: `See all ${DEVELOPERS.length} developers` }}
        />
        <div className="mt-12">
          <RotatingLogoGrid developers={ORDERED} />
        </div>
      </div>
    </section>
  );
}
