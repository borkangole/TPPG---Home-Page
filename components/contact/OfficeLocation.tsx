"use client";

import dynamic from "next/dynamic";
import { ClockIcon, DirectionsIcon, ExternalIcon, PinIcon } from "@/components/ui/Icons";
import { CONTACT, OFFICE_DIRECTIONS_URL, OFFICE_MAPS_URL } from "@/lib/contact";

const OfficeMap = dynamic(() => import("./OfficeMap"), {
  ssr: false,
  loading: () => <div className="h-full w-full animate-pulse bg-ink-800" />,
});

export function OfficeLocation() {
  const o = CONTACT.office;
  return (
    <section aria-labelledby="office-heading" className="border-y border-white/[0.06] bg-ink-800 py-24 sm:py-32">
      <div className="container-site">
        <div className="grid gap-6 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <p className="eyebrow">Office location</p>
            <h2 id="office-heading" className="mt-4 text-3xl font-bold leading-tight tracking-tight text-white sm:text-[2.6rem]">
              Visit us at{" "}
              <span className="font-serif font-normal italic text-brand-soft">{o.building}.</span>
            </h2>
          </div>
          <p className="leading-relaxed text-zinc-400 lg:col-span-5">
            Drop by to talk through your options in person. For a quicker meeting, send an inquiry first so a
            specialist can prepare listings for you.
          </p>
        </div>

        <div className="relative mt-12 overflow-hidden rounded-2xl border border-white/[0.08]">
          <div className="h-[22rem] sm:h-[28rem] lg:h-[32rem]">
            <OfficeMap lat={o.lat} lng={o.lng} label={`${o.name}, ${o.building}`} />
          </div>

          {/* Info card: floats over the map on larger screens, sits below it on mobile */}
          <div className="relative z-[1000] border-t border-white/[0.08] bg-ink p-6 sm:absolute sm:left-5 sm:top-5 sm:w-[23rem] sm:rounded-xl sm:border sm:bg-ink/90 sm:shadow-2xl sm:backdrop-blur-md">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-brand-soft">TPPG Office</p>
            <p className="mt-2 text-lg font-semibold text-white">{o.building}</p>
            <address className="mt-3 flex gap-2.5 text-sm not-italic leading-relaxed text-zinc-300">
              <PinIcon className="mt-0.5 h-4 w-4 shrink-0 text-brand" />
              <span>
                {o.street}
                <br />
                {o.city}
              </span>
            </address>
            <div className="mt-4 flex gap-2.5 text-sm text-zinc-300">
              <ClockIcon className="mt-0.5 h-4 w-4 shrink-0 text-brand" />
              <dl className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-1">
                {o.hours.map((h) => (
                  <div key={h.days} className="contents">
                    <dt className="text-zinc-400">{h.days}</dt>
                    <dd className="text-white">{h.time}</dd>
                  </div>
                ))}
              </dl>
            </div>
            <div className="mt-6 flex gap-2">
              <a href={OFFICE_DIRECTIONS_URL} target="_blank" rel="noopener noreferrer" className="btn-primary flex-1 whitespace-nowrap px-3 py-2.5">
                <DirectionsIcon />
                Directions
              </a>
              <a href={OFFICE_MAPS_URL} target="_blank" rel="noopener noreferrer" className="btn-ghost flex-1 whitespace-nowrap px-3 py-2.5">
                <ExternalIcon />
                Google Maps
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
