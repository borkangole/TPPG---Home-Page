import Image from "next/image";
import Link from "next/link";
import skyline from "@/public/images/skyline.jpg";
import { ArrowRight, PinIcon } from "@/components/ui/Icons";
import { formatPesoShort } from "@/lib/format";
import { locationSummaries } from "@/lib/listings";
import { SectionHeading } from "./SectionHeading";

/** Short, buyer-oriented notes per area (also useful local copy for search engines). */
const NOTES: Record<string, string> = {
  "iloilo-city": "The city proper: business districts, schools, and hospitals within reach.",
  mandurriao: "Home to Iloilo Business Park and SM City Iloilo.",
  jaro: "An established residential district with heritage landmarks.",
  molo: "A historic district close to the city center and the coast.",
  "la-paz": "Known for its public market and La Paz batchoy.",
  pavia: "A growing town just north of Iloilo City.",
  oton: "A coastal town west of the city, with more room for homes and lots.",
  cebu: "Select condominiums in Cebu City.",
  palawan: "Select lots in Palawan.",
};

const countLabel = (n: number) => (n ? `${n} ${n === 1 ? "listing" : "listings"}` : "Ask a specialist");

export function ExploreByLocation() {
  const { iloilo, other } = locationSummaries();
  const [city, ...areas] = iloilo; // "iloilo-city" is first in LOCATIONS

  return (
    <section aria-labelledby="locations-heading" className="py-24 sm:py-32">
      <div className="container-site">
        <SectionHeading
          id="locations-heading"
          eyebrow="Explore by location"
          title="Find property in Iloilo"
          accent="by neighborhood."
          link={{ href: "/properties?location=iloilo", label: "All Iloilo properties" }}
        />

        <div className="mt-12 grid gap-4 lg:grid-cols-12">
          {/* Iloilo City, featured */}
          <Link
            href={`/properties?location=${city.slug}`}
            className="group relative isolate flex min-h-[18rem] flex-col justify-end overflow-hidden rounded-2xl border border-white/[0.07] p-7 lg:col-span-5 lg:row-span-2"
          >
            <Image
              src={skyline}
              alt="Iloilo City skyline"
              fill
              placeholder="blur"
              sizes="(min-width: 1024px) 40vw, 100vw"
              className="-z-20 object-cover object-[50%_70%] transition-transform duration-700 group-hover:scale-[1.04]"
            />
            <div className="absolute inset-0 -z-10 bg-gradient-to-t from-ink via-ink/60 to-ink/10" />
            <p className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.16em] text-brand-soft">
              <PinIcon className="h-3.5 w-3.5" />
              Iloilo
            </p>
            <h3 className="mt-2 font-serif text-4xl text-white">{city.name}</h3>
            <p className="mt-2 max-w-sm text-sm leading-relaxed text-zinc-300">{NOTES[city.slug]}</p>
            <div className="mt-5 flex items-center justify-between gap-4 border-t border-white/15 pt-4 text-sm">
              <span className="text-zinc-300">
                <span className="font-semibold text-white">{countLabel(city.count)}</span>
                {city.from && <> · from {formatPesoShort(city.from)}</>}
              </span>
              <span className="inline-flex items-center gap-1.5 font-semibold text-white">
                Explore
                <ArrowRight className="h-4 w-4 text-brand transition-transform group-hover:translate-x-0.5" />
              </span>
            </div>
          </Link>

          {/* Other Iloilo areas */}
          <ul className="grid gap-4 sm:grid-cols-2 lg:col-span-7 lg:grid-cols-3">
            {areas.map((a) => (
              <li key={a.slug}>
                <Link
                  href={`/properties?location=${a.slug}`}
                  className="group flex h-full flex-col rounded-xl border border-white/[0.07] bg-ink-800 p-5 transition-colors hover:border-brand/50"
                >
                  <span className="flex items-center justify-between gap-2">
                    <h3 className="font-semibold text-white">{a.name}</h3>
                    <ArrowRight className="h-4 w-4 text-brand opacity-0 transition-all group-hover:translate-x-0.5 group-hover:opacity-100" />
                  </span>
                  <p className="mt-1.5 text-[0.82rem] leading-relaxed text-zinc-400">{NOTES[a.slug]}</p>
                  <span aria-hidden className="min-h-4 flex-1" />
                  <p className="text-xs">
                    <span className={a.count ? "font-semibold text-white" : "text-zinc-500"}>{countLabel(a.count)}</span>
                    {a.from && <span className="text-zinc-500"> · from {formatPesoShort(a.from)}</span>}
                  </p>
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Beyond Iloilo */}
        <div className="mt-4 flex flex-col gap-4 rounded-2xl border border-white/[0.07] bg-ink-800 p-5 sm:flex-row sm:items-center sm:p-6">
          <p className="shrink-0 text-sm font-semibold text-white sm:w-48">
            Also outside Iloilo
            <span className="mt-0.5 block text-xs font-normal text-zinc-500">Select projects</span>
          </p>
          <ul className="grid flex-1 gap-3 sm:grid-cols-2">
            {other.map((r) => (
              <li key={r.slug}>
                <Link
                  href={`/properties?location=${r.slug}`}
                  className="group flex items-center justify-between gap-4 rounded-lg border border-white/[0.07] bg-ink px-4 py-3 transition-colors hover:border-brand/50"
                >
                  <span>
                    <span className="block font-semibold text-white">{r.name}</span>
                    <span className="text-xs text-zinc-400">{NOTES[r.slug]}</span>
                  </span>
                  <span className="shrink-0 text-right text-xs">
                    <span className="block font-semibold text-white">{countLabel(r.count)}</span>
                    {r.from && <span className="text-zinc-500">from {formatPesoShort(r.from)}</span>}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
