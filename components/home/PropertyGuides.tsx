import { GuideCard } from "@/components/guides/GuideCard";
import { GUIDES } from "@/lib/guides";
import { SectionHeading } from "./SectionHeading";

export function PropertyGuides() {
  return (
    <section aria-labelledby="guides-heading" className="py-24 sm:py-32">
      <div className="container-site">
        <SectionHeading
          id="guides-heading"
          eyebrow="Property guides"
          title="Know what you’re buying"
          accent="before you buy."
          link={{ href: "/guides", label: "All guides" }}
        />
        <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {GUIDES.slice(0, 4).map((g, i) => (
            <li key={g.slug}>
              <GuideCard guide={g} featured={i === 0} compact />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
