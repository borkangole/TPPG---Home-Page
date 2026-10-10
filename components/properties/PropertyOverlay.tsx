"use client";

import { useEffect, useMemo, useRef } from "react";
import { createPortal } from "react-dom";
import { InquiryForm } from "@/components/contact/InquiryForm";
import { ArrowRight, CloseIcon, DirectionsIcon, MapIcon, PhoneIcon, PinIcon } from "@/components/ui/Icons";
import { CONTACT } from "@/lib/contact";
import { formatPeso, typeLabel } from "@/lib/format";
import { describeProperty, getGallery } from "@/lib/property-media";
import type { FeaturedProperty, SampleUnit } from "@/lib/sample-data";
import { PropertyGallery } from "./PropertyGallery";

type Props = {
  property: FeaturedProperty;
  units: SampleUnit[];
  /** "inquire" opens with the inquiry form in view and focused. */
  focus: "details" | "inquire";
  selectedUnit: string | null;
  onUnit: (id: string) => void;
  onClose: () => void;
  onShowOnMap: () => void;
};

const FOCUSABLE = 'a[href], button:not([disabled]), input:not([disabled]), textarea, select, [tabindex]:not([tabindex="-1"])';

export function PropertyOverlay({ property: p, units, focus, selectedUnit, onUnit, onClose, onShowOnMap }: Props) {
  const panelRef = useRef<HTMLDivElement>(null);
  const formWrapRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const photos = useMemo(() => getGallery(p), [p]);
  const unitName = units.find((u) => u.id === selectedUnit)?.name ?? null;
  // Keep the latest onClose without re-running the setup effect (which would steal focus).
  const closeRef = useRef(onClose);
  useEffect(() => {
    closeRef.current = onClose;
  }, [onClose]);

  // Lock page scroll, remember focus, and close on Escape.
  useEffect(() => {
    const prevFocus = document.activeElement as HTMLElement | null;
    const { overflow, paddingRight } = document.body.style;
    const sbw = window.innerWidth - document.documentElement.clientWidth;
    document.body.style.overflow = "hidden";
    if (sbw > 0) document.body.style.paddingRight = `${sbw}px`;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        closeRef.current();
      }
      if (e.key === "Tab" && panelRef.current) {
        const els = [...panelRef.current.querySelectorAll<HTMLElement>(FOCUSABLE)].filter((el) => el.offsetParent !== null);
        if (!els.length) return;
        const first = els[0];
        const last = els[els.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = overflow;
      document.body.style.paddingRight = paddingRight;
      prevFocus?.focus?.({ preventScroll: true });
    };
  }, []);

  // Initial focus: the inquiry form, or the dialog itself.
  useEffect(() => {
    if (focus === "inquire") {
      formWrapRef.current?.scrollIntoView({ block: "start" });
      formWrapRef.current?.querySelector<HTMLElement>('input[name="name"]')?.focus({ preventScroll: true });
    } else {
      scrollRef.current?.scrollTo({ top: 0 });
      panelRef.current?.focus({ preventScroll: true });
    }
  }, [focus, p.slug]);

  const goToForm = () => {
    formWrapRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    setTimeout(() => formWrapRef.current?.querySelector<HTMLElement>('input[name="name"]')?.focus({ preventScroll: true }), 350);
  };

  const facts = [
    { label: "Starting at", value: formatPeso(p.startingTcp) },
    { label: "Monthly DP", value: formatPeso(p.monthlyDp) },
    { label: p.type === "Lot" ? "Lot area" : "Bedrooms", value: p.type === "Lot" ? p.area : p.bedrooms ?? "—" },
    { label: "Size", value: p.area },
  ];

  const details = [
    { label: "Property type", value: typeLabel(p.type) },
    { label: "Selling status", value: p.sellingStatus === "RFO" ? "Ready for occupancy" : "Pre-selling" },
    { label: "Developer", value: p.developer },
    { label: "Location", value: p.location },
    { label: "Unit types", value: p.bedrooms ?? "Lot only" },
    { label: "Available units", value: units.length ? `${units.length} listed` : "Ask a specialist" },
  ];

  const directions = `https://www.google.com/maps/dir/?api=1&destination=${p.lat},${p.lng}`;

  return createPortal(
    <div className="fixed inset-0 z-[2000]">
      <div aria-hidden className="tppg-fade-in absolute inset-0 bg-black/75 backdrop-blur-sm" onClick={onClose} />

      {/* Centres the panel; its height follows its content, capped to the screen. */}
      <div className="pointer-events-none absolute inset-0 flex sm:items-center sm:justify-center sm:p-4 xl:short:py-2">
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="overlay-title"
        tabIndex={-1}
        className="tppg-pop-in pointer-events-auto relative flex h-full w-full flex-col overflow-hidden bg-ink-800 focus:outline-none focus-visible:ring-0 sm:h-auto sm:max-h-full sm:max-w-[1560px] sm:rounded-2xl sm:border sm:border-white/[0.08] sm:shadow-2xl"
      >
        {/* Header */}
        <header className="flex shrink-0 items-start gap-4 border-b border-white/[0.07] px-5 py-4 sm:px-8 xl:short:py-3">
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap gap-1.5 text-[0.7rem] font-semibold">
              <span className={`rounded-full px-2 py-0.5 ${p.sellingStatus === "RFO" ? "bg-white text-ink" : "bg-brand text-white"}`}>
                {p.sellingStatus === "RFO" ? "Ready for occupancy" : "Pre-selling"}
              </span>
              <span className="rounded-full border border-white/15 px-2 py-0.5 text-zinc-200">{typeLabel(p.type)}</span>
            </div>
            <h2 id="overlay-title" className="mt-1.5 truncate text-xl font-semibold text-white sm:text-2xl">
              {p.name}
            </h2>
            <p className="mt-0.5 flex items-center gap-1.5 text-sm text-zinc-400">
              <PinIcon className="h-3.5 w-3.5 shrink-0 text-brand" />
              <span className="truncate">
                {p.location} · by {p.developer}
              </span>
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close property view"
            className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-white/10 text-zinc-300 transition-colors hover:border-white/30 hover:text-white"
          >
            <CloseIcon />
          </button>
        </header>

        {/* Body */}
        {/* Body. Below xl: one column (form beside it on lg). From xl: three columns sized to fit one screen;
            the body scrolls only when the screen is shorter than the content. */}
        <div ref={scrollRef} className="min-h-0 flex-1 overflow-y-auto overscroll-contain">
          <div className="grid gap-10 px-5 pb-28 pt-6 sm:px-8 sm:pt-8 lg:grid-cols-[minmax(0,1fr)_22.5rem] lg:pb-10 xl:grid-cols-[minmax(0,1.05fr)_minmax(0,1fr)_23rem] xl:gap-8 xl:py-6 xl:short:py-4">
            {/* Column A: photos, key facts, location */}
            <div className="min-w-0 lg:col-start-1 lg:row-start-1">
              <PropertyGallery photos={photos} keyboard />

              <dl className="mt-6 grid grid-cols-2 gap-px xl:short:mt-4 overflow-hidden rounded-xl border border-white/[0.07] bg-white/[0.07] sm:grid-cols-4">
                {facts.map((f) => (
                  <div key={f.label} className="min-w-0 bg-ink px-4 py-3.5 xl:px-3.5 xl:short:py-2.5">
                    <dt className="text-[0.7rem] text-zinc-500">{f.label}</dt>
                    <dd className="mt-1 text-lg font-semibold text-white xl:whitespace-nowrap xl:text-[0.95rem]">{f.value}</dd>
                  </div>
                ))}
              </dl>

              <section className="mt-6 xl:short:mt-4" aria-labelledby="ov-location">
                <h3 id="ov-location" className="sr-only">
                  Location
                </h3>
                <div className="flex flex-col gap-4 rounded-xl border border-white/[0.07] bg-ink p-4 sm:flex-row xl:short:p-3 sm:items-center sm:justify-between">
                  <p className="flex items-start gap-2.5 text-sm text-zinc-300">
                    <PinIcon className="mt-0.5 h-4 w-4 shrink-0 text-brand" />
                    <span>
                      <span className="block font-medium text-white">{p.location}</span>
                      {p.region}, Philippines
                    </span>
                  </p>
                  <div className="flex gap-2">
                    <button type="button" onClick={onShowOnMap} className="btn-ghost whitespace-nowrap px-3.5 py-2.5">
                      <MapIcon />
                      Show on map
                    </button>
                    <a href={directions} target="_blank" rel="noopener noreferrer" className="btn-ghost whitespace-nowrap px-3.5 py-2.5">
                      <DirectionsIcon />
                      Directions
                    </a>
                  </div>
                </div>
              </section>
            </div>

            {/* Column B: description, details, units */}
            <div className="min-w-0 lg:col-start-1 lg:row-start-2 xl:col-start-2 xl:row-start-1">
              <section aria-labelledby="ov-about">
                <h3 id="ov-about" className="text-lg font-semibold text-white">
                  About this property
                </h3>
                <p className="mt-3 text-[0.95rem] leading-relaxed text-zinc-300 xl:short:mt-2 xl:short:text-sm">{describeProperty(p)}</p>
              </section>

              <section className="mt-8 xl:short:mt-5" aria-labelledby="ov-details">
                <h3 id="ov-details" className="text-lg font-semibold text-white">
                  Property details
                </h3>
                <dl className="mt-3 grid grid-cols-2 gap-x-6">
                  {details.map((d) => (
                    <div key={d.label} className="border-b border-white/[0.07] py-2.5 xl:short:py-2">
                      <dt className="text-xs text-zinc-500">{d.label}</dt>
                      <dd className="mt-0.5 text-sm font-medium text-white">{d.value}</dd>
                    </div>
                  ))}
                </dl>
              </section>

              <section className="mt-8 xl:short:mt-5" aria-labelledby="ov-units">
                <div className="flex items-end justify-between gap-4">
                  <h3 id="ov-units" className="text-lg font-semibold text-white">
                    Available units
                  </h3>
                  {units.length > 0 && <p className="text-xs text-zinc-500">Select a unit to include it in your inquiry</p>}
                </div>
                {units.length ? (
                  <div className="mt-3 overflow-x-auto rounded-xl border border-white/[0.07]">
                    <table className="w-full min-w-[26rem] text-left text-sm">
                      <thead className="bg-ink text-[0.7rem] uppercase tracking-wider text-zinc-500">
                        <tr>
                          <th className="px-4 py-2.5 font-medium">Unit</th>
                          <th className="px-4 py-2.5 font-medium">Type</th>
                          <th className="px-4 py-2.5 text-right font-medium">Size</th>
                          <th className="px-4 py-2.5 text-right font-medium">Price</th>
                        </tr>
                      </thead>
                      <tbody>
                        {units.map((u) => {
                          const active = u.id === selectedUnit;
                          return (
                            <tr
                              key={u.id}
                              tabIndex={0}
                              aria-selected={active}
                              onClick={() => onUnit(u.id)}
                              onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && (e.preventDefault(), onUnit(u.id))}
                              className={`cursor-pointer border-t border-white/[0.06] transition-colors focus:outline-none focus-visible:bg-white/[0.05] ${
                                active ? "bg-brand/10 text-white" : "text-zinc-300 hover:bg-white/[0.03]"
                              }`}
                            >
                              <td className={`px-4 py-2.5 font-medium ${active ? "border-l-2 border-brand" : "border-l-2 border-transparent"}`}>
                                {u.name}
                              </td>
                              <td className="px-4 py-2.5">{u.bedrooms}</td>
                              <td className="px-4 py-2.5 text-right">{u.sqm} sqm</td>
                              <td className="px-4 py-2.5 text-right font-medium text-white">{formatPeso(u.tcp)}</td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <p className="mt-3 text-sm text-zinc-400">Unit availability changes often. Ask a property specialist for the latest list.</p>
                )}
              </section>

            </div>

            {/* Right column: inquiry */}
            <aside
              ref={formWrapRef}
              aria-labelledby="ov-inquire"
              className="scroll-mt-4 lg:sticky lg:top-0 lg:col-start-2 lg:row-span-2 lg:row-start-1 lg:self-start xl:col-start-3 xl:row-span-1"
            >
              <div className="overflow-hidden rounded-2xl border border-brand/30 bg-ink shadow-[0_30px_60px_-30px_rgba(0,0,0,0.8)]">
                <div className="border-b border-white/[0.07] bg-gradient-to-br from-brand/[0.12] to-transparent px-5 py-4 sm:px-6 xl:short:py-3">
                  <h3 id="ov-inquire" className="text-lg font-semibold text-white">
                    Inquire about this property
                  </h3>
                  <p className="mt-1 text-[0.8rem] leading-snug text-zinc-400 xl:short:hidden">A TPPG specialist will reply with prices, availability, and viewing schedules.</p>
                  {unitName && (
                    <p className="mt-2.5 inline-flex items-center gap-1.5 rounded-full border border-brand/40 bg-brand/10 px-3 py-1 text-xs font-medium text-brand-soft">
                      Unit: {unitName}
                    </p>
                  )}
                </div>
                <InquiryForm key={p.slug} variant="property" property={{ slug: p.slug, name: p.name }} unitName={unitName} />
              </div>
              <a
                href={CONTACT.phone.href}
                className="group mt-3 flex items-center justify-center gap-2 text-sm text-zinc-400 hover:text-white xl:short:hidden"
              >
                <PhoneIcon className="h-4 w-4 text-brand" />
                Prefer to talk? <span className="font-semibold text-white">Call us</span>
                <ArrowRight className="h-3.5 w-3.5 text-brand transition-transform group-hover:translate-x-0.5" />
              </a>
            </aside>
          </div>
        </div>

        {/* Mobile: quick jump to the form */}
        <div className="absolute inset-x-0 bottom-0 border-t border-white/[0.08] bg-ink/95 p-3 backdrop-blur lg:hidden">
          <button type="button" onClick={goToForm} className="btn-primary w-full py-3.5">
            Inquire about this property
          </button>
        </div>
      </div>
      </div>
    </div>,
    document.body,
  );
}
