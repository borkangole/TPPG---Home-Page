"use client";

import Image from "next/image";
import { PinIcon } from "@/components/ui/Icons";
import { formatPeso, typeLabel } from "@/lib/format";
import type { FeaturedProperty } from "@/lib/sample-data";

type Props = {
  property: FeaturedProperty;
  selected: boolean;
  onSelect: () => void;
  onHover: (slug: string | null) => void;
};

/** Compact card for the list beside the map. Selecting it shows details and zooms the map. */
export function ListingCard({ property: p, selected, onSelect, onHover }: Props) {
  return (
    <button
      type="button"
      data-slug={p.slug}
      aria-pressed={selected}
      onClick={onSelect}
      onMouseEnter={() => onHover(p.slug)}
      onMouseLeave={() => onHover(null)}
      onFocus={() => onHover(p.slug)}
      onBlur={() => onHover(null)}
      className={`group flex h-full w-full flex-col overflow-hidden rounded-xl border text-left transition-colors ${
        selected ? "border-brand bg-ink-700 ring-1 ring-brand" : "border-white/[0.07] bg-ink-800 hover:border-white/25"
      }`}
    >
      <span className="relative block aspect-[16/10] w-full overflow-hidden">
        <Image
          src={p.image}
          alt=""
          fill
          sizes="(min-width: 1280px) 24vw, (min-width: 1024px) 28vw, (min-width: 640px) 50vw, 100vw"
          placeholder={typeof p.image !== "string" ? "blur" : "empty"}
          style={{ objectPosition: p.imagePosition ?? "center" }}
          className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.04]"
        />
        <span
          className={`absolute left-3 top-3 rounded-full px-2 py-0.5 text-[0.65rem] font-semibold ${
            p.sellingStatus === "RFO" ? "bg-white text-ink" : "bg-brand text-white"
          }`}
        >
          {p.sellingStatus === "RFO" ? "Ready for occupancy" : "Pre-selling"}
        </span>
      </span>

      <span className="flex flex-1 flex-col p-4">
        <span className="flex items-center gap-1 text-[0.7rem] text-zinc-400">
          <PinIcon className="h-3 w-3 shrink-0 text-brand" />
          <span className="truncate">{p.location}</span>
        </span>
        <span className="mt-1 font-semibold text-white">{p.name}</span>
        <span className="truncate text-xs text-zinc-500">
          {typeLabel(p.type)} · {p.developer}
        </span>
        <span aria-hidden className="min-h-3 flex-1" />
        <span className="flex items-end justify-between gap-3 border-t border-white/[0.07] pt-3">
          <span>
            <span className="block text-[0.65rem] text-zinc-500">Starting at</span>
            <span className="font-semibold text-white">{formatPeso(p.startingTcp)}</span>
          </span>
          <span className="text-right">
            <span className="block text-[0.65rem] text-zinc-500">Monthly DP</span>
            <span className="text-sm text-zinc-200">{formatPeso(p.monthlyDp)}</span>
          </span>
        </span>
      </span>
    </button>
  );
}
