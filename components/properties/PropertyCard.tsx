import Image from "next/image";
import Link from "next/link";
import { AreaIcon, ArrowRight, BedIcon, PinIcon } from "@/components/ui/Icons";
import { formatPeso } from "@/lib/format";
import type { FeaturedProperty } from "@/lib/sample-data";

const TYPE_LABEL: Record<FeaturedProperty["type"], string> = {
  Condo: "Condominium",
  "House and Lot": "House & Lot",
  Lot: "Lot",
};

type PropertyCardProps = {
  property: FeaturedProperty;
  /** Where the card links. Defaults to the Properties map with this property selected. */
  href?: string;
  /** If given, clicking the card calls this instead of navigating (used inside the Properties page). */
  onSelect?: () => void;
};

export function PropertyCard({ property: p, href, onSelect }: PropertyCardProps) {
  const isStaticImage = typeof p.image !== "string";

  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-xl border border-white/[0.07] bg-ink-700 transition-colors hover:border-white/20">
      <div className="relative aspect-[4/3] overflow-hidden">
        <Image
          src={p.image}
          alt={`${p.name}, ${TYPE_LABEL[p.type]} in ${p.location}`}
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          placeholder={isStaticImage ? "blur" : "empty"}
          style={{ objectPosition: p.imagePosition ?? "center" }}
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink-700/60 to-transparent" />
        <span
          className={`absolute left-4 top-4 rounded-full px-2.5 py-1 text-[0.7rem] font-semibold ${
            p.sellingStatus === "RFO" ? "bg-white text-ink" : "bg-brand text-white"
          }`}
        >
          {p.sellingStatus === "RFO" ? "Ready for occupancy" : "Pre-selling"}
        </span>
        <span className="absolute right-4 top-4 rounded-full bg-ink/70 px-2.5 py-1 text-[0.7rem] font-medium text-white backdrop-blur">
          {TYPE_LABEL[p.type]}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <p className="flex items-center gap-1.5 text-xs text-zinc-400">
          <PinIcon className="h-3.5 w-3.5 text-brand" />
          {p.location}
        </p>
        <h3 className="mt-2 text-lg font-semibold text-white">
          <Link
            href={href ?? `/properties?property=${p.slug}`}
            onClick={
              onSelect
                ? (e) => {
                    e.preventDefault();
                    onSelect();
                  }
                : undefined
            }
            className="after:absolute after:inset-0"
          >
            {p.name}
          </Link>
        </h3>
        <p className="text-sm text-zinc-500">by {p.developer}</p>

        <div className="mt-5 flex items-end justify-between gap-4 border-t border-white/[0.07] pt-4">
          <div>
            <p className="text-[0.7rem] text-zinc-500">Starting at</p>
            <p className="text-xl font-semibold tracking-tight text-white">{formatPeso(p.startingTcp)}</p>
          </div>
          <div className="text-right">
            <p className="text-[0.7rem] text-zinc-500">Monthly DP</p>
            <p className="text-sm font-medium text-zinc-200">{formatPeso(p.monthlyDp)}</p>
          </div>
        </div>

        <div className="mt-4 flex items-center justify-between text-xs text-zinc-400">
          <div className="flex items-center gap-4">
            {p.bedrooms && (
              <span className="flex items-center gap-1.5">
                <BedIcon className="h-4 w-4 text-zinc-500" />
                {p.bedrooms}
              </span>
            )}
            <span className="flex items-center gap-1.5">
              <AreaIcon className="h-4 w-4 text-zinc-500" />
              {p.area}
            </span>
          </div>
          <span className="flex items-center gap-1 font-semibold text-white">
            View
            <ArrowRight className="h-3.5 w-3.5 text-brand transition-transform group-hover:translate-x-0.5" />
          </span>
        </div>
      </div>
    </article>
  );
}
