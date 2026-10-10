import Image, { type StaticImageData } from "next/image";
import Link from "next/link";
import condoImg from "@/public/images/types/condo.jpg";
import houseImg from "@/public/images/types/house.jpg";
import lotImg from "@/public/images/types/lot.jpg";
import {
  ArrowRight,
  BuildingIcon,
  HomeIcon,
  LandIcon,
} from "@/components/ui/Icons";
import { formatPesoShort } from "@/lib/format";
import { typeSummaries } from "@/lib/listings";
import { SectionHeading } from "./SectionHeading";

const COPY: Record<
  string,
  {
    icon: typeof BuildingIcon;
    title: string;
    text: string;
    fit: string[];
    img: StaticImageData;
    pos: string;
    alt: string;
  }
> = {
  condominiums: {
    icon: BuildingIcon,
    title: "Condominiums",
    text: "Studios to 2-bedroom units close to offices, malls, and schools, with amenities handled by the building.",
    fit: ["First-time buyers", "Young professionals", "Rental investors"],
    img: condoImg,
    pos: "18% 40%",
    alt: "High-rise condominium tower with balconies",
  },
  "house-and-lot": {
    icon: HomeIcon,
    title: "House & Lot",
    text: "Homes inside subdivisions with room to grow, for families who want their own space and a quieter street.",
    fit: ["Growing families", "Upgrading from a condo"],
    img: houseImg,
    pos: "50% 45%",
    alt: "House with a landscaped front lawn",
  },
  lots: {
    icon: LandIcon,
    title: "Lots",
    text: "Residential lots to build on now or hold as a long-term investment, in Iloilo and select areas outside it.",
    fit: ["Building your own home", "Long-term investors"],
    img: lotImg,
    pos: "50% 50%",
    alt: "Aerial view of residential lots and roads",
  },
};

export function ExploreByType() {
  const types = typeSummaries();
  return (
    <section
      aria-labelledby="types-heading"
      className="border-y border-white/[0.06] bg-ink-800 py-24 sm:py-32"
    >
      <div className="container-site">
        <SectionHeading
          id="types-heading"
          eyebrow="Explore by property type"
          title="Condos, house and lot, and lots"
          accent="for sale in Iloilo."
        />

        <ul className="mt-12 grid gap-5 md:grid-cols-3">
          {types.map((t) => {
            const c = COPY[t.slug];
            const Icon = c.icon;
            return (
              <li key={t.slug}>
                <Link
                  href={`/properties/${t.slug}`}
                  className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-white/[0.07] bg-ink transition-colors hover:border-brand/50"
                >
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <Image
                      src={c.img}
                      alt={c.alt}
                      fill
                      placeholder="blur"
                      sizes="(min-width: 768px) 33vw, 100vw"
                      style={{ objectPosition: c.pos }}
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.05]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/10 to-transparent" />
                    <span className="absolute bottom-4 left-5 grid h-11 w-11 place-items-center rounded-xl border border-white/15 bg-ink/70 text-brand-soft backdrop-blur">
                      <Icon className="h-5 w-5" />
                    </span>
                  </div>
                  <div className="flex flex-1 flex-col px-7 pb-7 pt-4">
                    <h3 className="text-xl font-semibold text-white">
                      {c.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-zinc-400">
                      {c.text}
                    </p>
                    <ul className="mt-5 flex flex-wrap gap-1.5">
                      {c.fit.map((f) => (
                        <li
                          key={f}
                          className="rounded-full border border-white/10 px-2.5 py-1 text-xs text-zinc-300"
                        >
                          {f}
                        </li>
                      ))}
                    </ul>
                    <span aria-hidden className="min-h-8 flex-1" />
                    <div className="flex items-end justify-between gap-4 border-t border-white/[0.07] pt-5">
                      <span>
                        <span className="block text-[0.7rem] text-zinc-500">
                          Starting at
                        </span>
                        <span className="text-lg font-semibold text-white">
                          {t.from ? formatPesoShort(t.from) : "Ask us"}
                        </span>
                      </span>
                      <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-white">
                        Browse {c.title.toLowerCase()}
                        <ArrowRight className="h-4 w-4 text-brand transition-transform group-hover:translate-x-0.5" />
                      </span>
                    </div>
                  </div>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
