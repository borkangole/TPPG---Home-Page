"use client";

import Image from "next/image";
import { useEffect } from "react";
import { CloseIcon, DirectionsIcon, ExpandIcon, PinIcon } from "@/components/ui/Icons";
import { formatPeso, typeLabel } from "@/lib/format";
import type { FeaturedProperty, SampleUnit } from "@/lib/sample-data";

type Props = {
  property: FeaturedProperty;
  units: SampleUnit[];
  selectedUnit: string | null;
  onUnit: (id: string) => void;
  onClose: () => void;
  /** Open the full property overlay, optionally straight to the inquiry form. */
  onOpen: (focus: "details" | "inquire") => void;
};

function Fact({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="bg-ink-800 px-4 py-3">
      <dt className="text-[0.7rem] text-zinc-500">{label}</dt>
      <dd className="mt-0.5 font-semibold text-white">{value}</dd>
    </div>
  );
}

export function PropertyDetails({ property: p, units, selectedUnit, onUnit, onClose, onOpen }: Props) {
  // Bring a searched-for unit into view.
  useEffect(() => {
    if (selectedUnit) document.getElementById(`unit-row-${selectedUnit}`)?.scrollIntoView({ block: "nearest" });
  }, [selectedUnit]);

  return (
    <article aria-labelledby="details-title" className="p-5 sm:p-6">
      <div className="flex items-start gap-4">
        <button
          type="button"
          onClick={() => onOpen("details")}
          aria-label={`View photos of ${p.name}`}
          className="group relative hidden h-24 w-32 shrink-0 overflow-hidden rounded-lg border border-white/[0.07] sm:block"
        >
          <Image
            src={p.image}
            alt={`${p.name}, ${typeLabel(p.type)} in ${p.location}`}
            fill
            sizes="128px"
            placeholder={typeof p.image !== "string" ? "blur" : "empty"}
            style={{ objectPosition: p.imagePosition ?? "center" }}
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
          <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent px-2 pb-1.5 pt-4 text-left text-[0.65rem] font-semibold text-white">
            View photos
          </span>
        </button>
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap gap-1.5 text-[0.7rem] font-semibold">
            <span
              className={`rounded-full px-2 py-0.5 ${p.sellingStatus === "RFO" ? "bg-white text-ink" : "bg-brand text-white"}`}
            >
              {p.sellingStatus === "RFO" ? "Ready for occupancy" : "Pre-selling"}
            </span>
            <span className="rounded-full border border-white/15 px-2 py-0.5 text-zinc-200">{typeLabel(p.type)}</span>
          </div>
          <h2 id="details-title" className="mt-2 text-xl font-semibold leading-tight text-white">
            {p.name}
          </h2>
          <p className="mt-1 flex items-center gap-1.5 text-sm text-zinc-400">
            <PinIcon className="h-3.5 w-3.5 shrink-0 text-brand" />
            <span className="truncate">
              {p.location} · by {p.developer}
            </span>
          </p>
        </div>
        <button
          type="button"
          onClick={onClose}
          aria-label="Close property details"
          className="grid h-9 w-9 shrink-0 place-items-center rounded-md border border-white/10 text-zinc-400 transition-colors hover:border-white/25 hover:text-white"
        >
          <CloseIcon className="h-4 w-4" />
        </button>
      </div>

      <dl className="mt-5 grid grid-cols-2 gap-px overflow-hidden rounded-lg border border-white/[0.07] bg-white/[0.07] sm:grid-cols-4">
        <Fact label="Starting at" value={formatPeso(p.startingTcp)} />
        <Fact label="Monthly DP" value={formatPeso(p.monthlyDp)} />
        <Fact label="Bedrooms" value={p.bedrooms ?? "—"} />
        <Fact label="Size" value={p.area} />
      </dl>

      <section className="mt-6" aria-labelledby="units-title">
        <h3 id="units-title" className="text-sm font-semibold text-white">
          Available units
        </h3>
        {units.length ? (
          <div className="mt-3 overflow-x-auto">
            <table className="w-full min-w-[22rem] text-left text-sm">
              <thead className="text-[0.7rem] uppercase tracking-wider text-zinc-500">
                <tr>
                  <th className="pb-2 pl-2 font-medium">Unit</th>
                  <th className="pb-2 font-medium">Type</th>
                  <th className="pb-2 text-right font-medium">Size</th>
                  <th className="pb-2 pr-2 text-right font-medium">Price</th>
                </tr>
              </thead>
              <tbody>
                {units.map((u) => {
                  const active = u.id === selectedUnit;
                  return (
                    <tr
                      key={u.id}
                      id={`unit-row-${u.id}`}
                      tabIndex={0}
                      aria-selected={active}
                      onClick={() => onUnit(u.id)}
                      onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && (e.preventDefault(), onUnit(u.id))}
                      className={`cursor-pointer border-t border-white/[0.06] transition-colors focus:outline-none focus-visible:bg-white/[0.05] ${
                        active ? "bg-brand/10 text-white" : "text-zinc-300 hover:bg-white/[0.03]"
                      }`}
                    >
                      <td className={`py-2.5 pl-2 font-medium ${active ? "border-l-2 border-brand" : "border-l-2 border-transparent"}`}>
                        {u.name}
                      </td>
                      <td className="py-2.5">{u.bedrooms}</td>
                      <td className="py-2.5 text-right">{u.sqm} sqm</td>
                      <td className="py-2.5 pr-2 text-right font-medium text-white">{formatPeso(u.tcp)}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="mt-2 text-sm text-zinc-400">
            Unit availability changes often. Ask a property specialist for the latest list.
          </p>
        )}
      </section>

      <div className="mt-6 flex flex-wrap gap-3">
        <button type="button" onClick={() => onOpen("details")} className="btn-primary">
          <ExpandIcon />
          View full property
        </button>
        <button type="button" onClick={() => onOpen("inquire")} className="btn-ghost border-brand/50 hover:border-brand">
          Inquire about this property
        </button>
        <a
          href={`https://www.google.com/maps/search/?api=1&query=${p.lat},${p.lng}`}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-ghost"
        >
          <DirectionsIcon />
          Get directions
        </a>
      </div>
    </article>
  );
}
