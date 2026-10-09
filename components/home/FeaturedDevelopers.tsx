import Link from "next/link";
import { ArrowRight } from "@/components/ui/Icons";
import { FEATURED_DEVELOPERS } from "@/lib/sample-data";
import { SectionHeading } from "./SectionHeading";

// Monograms stand in until real developer logos come from the Portal's developers table.
export function FeaturedDevelopers() {
  return (
    <section aria-labelledby="developers-heading" className="border-y border-white/[0.06] bg-ink-800 py-24">
      <div className="container-site">
        <SectionHeading
          id="developers-heading"
          eyebrow="Featured developers"
          title="Projects from developers"
          accent="we work with."
          link={{ href: "/properties", label: "Browse all developers" }}
        />

        <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {FEATURED_DEVELOPERS.map((d) => (
            <li key={d.slug}>
              <Link
                href={`/properties?developer=${d.slug}`}
                className="group flex h-full flex-col rounded-xl border border-white/[0.07] bg-ink p-5 transition-colors hover:border-brand/50"
              >
                <span className="grid h-14 w-14 place-items-center rounded-lg border border-white/10 bg-ink-700 font-serif text-xl text-white transition-colors group-hover:border-brand/60 group-hover:text-brand-soft">
                  {d.initials}
                </span>
                <span className="mt-6 font-semibold text-white">{d.name}</span>
                <span className="mt-1 text-sm text-zinc-500">
                  {d.projects} projects · {d.areas.join(", ")}
                </span>
                <span className="mt-auto inline-flex items-center gap-1.5 pt-6 text-xs font-semibold text-zinc-400 group-hover:text-white">
                  View projects
                  <ArrowRight className="h-3.5 w-3.5 text-brand transition-transform group-hover:translate-x-0.5" />
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
