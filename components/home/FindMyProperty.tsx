"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import { InquiryForm } from "@/components/contact/InquiryForm";
import { Select } from "@/components/ui/Select";
import { ArrowRight, CompassIcon, PinIcon } from "@/components/ui/Icons";
import { BUDGET_OPTIONS, LOCATION_OPTIONS, TYPE_OPTIONS, optionLabel } from "@/lib/filter-options";
import { formatPeso, typeLabel } from "@/lib/format";
import { matchesBasic } from "@/lib/match";
import type { FeaturedProperty } from "@/lib/sample-data";

const PURPOSES = [
  { value: "live", label: "To live in" },
  { value: "invest", label: "To invest" },
  { value: "both", label: "Both" },
] as const;

type Purpose = (typeof PURPOSES)[number]["value"];

function Chips<T extends string>({
  legend,
  value,
  options,
  onChange,
}: {
  legend: string;
  value: T;
  options: readonly { value: T; label: string }[];
  onChange: (v: T) => void;
}) {
  return (
    <fieldset>
      <legend className="mb-2 text-xs font-medium text-zinc-400">{legend}</legend>
      <div className="flex flex-wrap gap-2">
        {options.map((o) => (
          <label
            key={o.value || "any"}
            className={`cursor-pointer rounded-full border px-3.5 py-1.5 text-sm transition-colors has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-brand ${
              value === o.value ? "border-brand bg-brand text-white" : "border-white/10 text-zinc-300 hover:border-white/25 hover:text-white"
            }`}
          >
            <input type="radio" className="sr-only" checked={value === o.value} onChange={() => onChange(o.value)} />
            {o.label}
          </label>
        ))}
      </div>
    </fieldset>
  );
}

/** Four quick questions → live matches from the listings, plus a "have a specialist shortlist for me" request. */
export function FindMyProperty({ properties }: { properties: FeaturedProperty[] }) {
  const [purpose, setPurpose] = useState<Purpose>("live");
  const [type, setType] = useState("");
  const [location, setLocation] = useState("");
  const [budget, setBudget] = useState("");
  const [askOpen, setAskOpen] = useState(false);

  const matches = useMemo(
    // Keep the curated (featured) order so Iloilo projects lead.
    () => properties.filter((p) => matchesBasic(p, { type, location, budget })),
    [properties, type, location, budget],
  );

  const qs = new URLSearchParams(Object.entries({ type, location, budget }).filter(([, v]) => v)).toString();
  const allHref = qs ? `/properties?${qs}` : "/properties";

  const summary = [
    `Purpose: ${PURPOSES.find((p) => p.value === purpose)?.label}`,
    `Type: ${optionLabel(TYPE_OPTIONS, type)}`,
    `Location: ${optionLabel(LOCATION_OPTIONS, location)}`,
    `Budget: ${optionLabel(BUDGET_OPTIONS, budget)}`,
  ].join(" · ");

  const showAsk = askOpen || matches.length === 0;

  return (
    <section id="find-my-property" aria-labelledby="fmp-heading" className="scroll-mt-20 py-24 sm:py-32">
      <div className="container-site">
        <div className="overflow-hidden rounded-3xl border border-white/[0.08] bg-ink-800">
          <div className="grid grid-cols-1 lg:grid-cols-12">
            {/* Questions */}
            <div className="relative border-b border-white/[0.07] p-6 sm:p-10 lg:col-span-5 lg:border-b-0 lg:border-r">
              <div aria-hidden className="absolute -left-20 -top-20 h-64 w-64 rounded-full bg-brand/15 blur-[100px]" />
              <p className="eyebrow relative flex items-center gap-2">
                <CompassIcon className="h-4 w-4" />
                Find my property
              </p>
              <h2 id="fmp-heading" className="relative mt-4 text-3xl font-bold leading-tight tracking-tight text-white sm:text-4xl">
                Not sure where to start?{" "}
                <span className="font-serif font-normal italic text-brand-soft">Answer four questions.</span>
              </h2>
              <p className="relative mt-4 text-sm leading-relaxed text-zinc-400">
                We’ll show matching properties right away. You can also have a property specialist put together a
                shortlist for you.
              </p>

              <div className="relative mt-8 space-y-6">
                <Chips legend="1. What is the property for?" value={purpose} options={PURPOSES} onChange={setPurpose} />
                <Chips legend="2. Property type" value={type} options={TYPE_OPTIONS} onChange={setType} />
                <div className="grid gap-4 sm:grid-cols-2">
                  <Select label="3. Location" value={location} options={LOCATION_OPTIONS} onChange={setLocation} />
                  <Select label="4. Budget (starting price)" value={budget} options={BUDGET_OPTIONS} onChange={setBudget} />
                </div>
              </div>
            </div>

            {/* Results */}
            <div className="flex flex-col p-6 sm:p-10 lg:col-span-7">
              <div className="flex items-end justify-between gap-4">
                <p aria-live="polite" className="text-lg font-semibold text-white">
                  {matches.length ? (
                    <>
                      <span className="font-serif text-3xl text-brand">{matches.length}</span>{" "}
                      {matches.length === 1 ? "property matches" : "properties match"}
                    </>
                  ) : (
                    "No exact matches yet"
                  )}
                </p>
                {matches.length > 0 && (
                  <Link href={allHref} className="group inline-flex shrink-0 items-center gap-1.5 text-sm font-semibold text-white hover:text-brand-soft">
                    See all on the map
                    <ArrowRight className="h-4 w-4 text-brand transition-transform group-hover:translate-x-0.5" />
                  </Link>
                )}
              </div>

              {matches.length > 0 ? (
                <ul className="mt-5 divide-y divide-white/[0.07] overflow-hidden rounded-xl border border-white/[0.07] bg-ink">
                  {matches.slice(0, 3).map((p) => (
                    <li key={p.slug}>
                      <Link
                        href={`/properties?property=${p.slug}&full=1`}
                        className="group flex items-center gap-4 p-3 transition-colors hover:bg-white/[0.03] sm:p-4"
                      >
                        <span className="relative h-16 w-20 shrink-0 overflow-hidden rounded-lg sm:h-[4.5rem] sm:w-24">
                          <Image
                            src={p.image}
                            alt=""
                            fill
                            sizes="96px"
                            style={{ objectPosition: p.imagePosition ?? "center" }}
                            className="object-cover"
                          />
                        </span>
                        <span className="min-w-0 flex-1">
                          <span className="block truncate font-semibold text-white">{p.name}</span>
                          <span className="mt-0.5 flex items-center gap-1 truncate text-xs text-zinc-400">
                            <PinIcon className="h-3 w-3 shrink-0 text-brand" />
                            {p.location} · {typeLabel(p.type)}
                          </span>
                        </span>
                        <span className="shrink-0 text-right">
                          <span className="block text-[0.7rem] text-zinc-500">From</span>
                          <span className="text-sm font-semibold text-white sm:text-base">{formatPeso(p.startingTcp)}</span>
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="mt-3 text-sm leading-relaxed text-zinc-400">
                  None of our listed projects fit these answers exactly, but new units open often. Leave your details and
                  a specialist will look for options that fit.
                </p>
              )}

              <span aria-hidden className="min-h-6 flex-1" />

              {/* Specialist shortlist */}
              <div className="mt-6 rounded-xl border border-brand/30 bg-gradient-to-br from-brand/[0.1] to-transparent p-5 sm:p-6">
                {showAsk ? (
                  <>
                    <p className="font-semibold text-white">Get a shortlist from a property specialist</p>
                    <p className="mt-1 text-xs text-zinc-400">{summary}</p>
                    <div className="mt-4">
                      <InquiryForm variant="brief" brief={{ message: `Find My Property: ${summary}`, source: "find_my_property" }} />
                    </div>
                  </>
                ) : (
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <p className="font-semibold text-white">Want a specialist to shortlist for you?</p>
                      <p className="mt-1 text-sm text-zinc-400">We’ll send options with prices and payment terms.</p>
                    </div>
                    <button type="button" onClick={() => setAskOpen(true)} className="btn-primary shrink-0">
                      Get my shortlist
                      <ArrowRight />
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
