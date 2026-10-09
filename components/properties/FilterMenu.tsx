"use client";

import { useEffect, useId, useRef, useState } from "react";
import { FilterIcon } from "@/components/ui/Icons";
import { Select } from "@/components/ui/Select";
import {
  BUDGET_OPTIONS,
  LOCATION_OPTIONS,
  STATUS_OPTIONS,
  TYPE_OPTIONS,
  type ListingFilters,
} from "@/lib/filter-options";

type Props = {
  filters: ListingFilters;
  onChange: (patch: Partial<ListingFilters>) => void;
  onClear: () => void;
};

/** "Filter by" button + popover. Each change applies immediately. */
export function FilterMenu({ filters, onChange, onClear }: Props) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const panelId = useId();

  useEffect(() => {
    if (!open) return;
    const onDown = (e: PointerEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("pointerdown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const count = (["location", "type", "budget", "status"] as const).filter((k) => filters[k]).length;

  return (
    <div ref={rootRef} className="relative shrink-0">
      <button
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen((v) => !v)}
        className={`inline-flex h-11 items-center gap-2 rounded-lg border px-3.5 text-sm font-semibold text-white transition-colors ${
          open || count ? "border-brand/60 bg-ink-700" : "border-white/10 bg-ink-700 hover:border-white/25"
        }`}
      >
        <FilterIcon />
        Filter by
        {count > 0 && (
          <span className="grid h-5 min-w-5 place-items-center rounded-full bg-brand px-1.5 text-[0.7rem] leading-none">
            {count}
          </span>
        )}
      </button>

      {open && (
        <div
          id={panelId}
          role="dialog"
          aria-label="Filter properties"
          className="absolute right-0 top-full z-50 mt-2 w-[min(20rem,calc(100vw-2.5rem))] rounded-xl border border-white/10 bg-ink-800 p-4 shadow-2xl shadow-black/60"
        >
          <div className="space-y-3">
            <Select label="Location" value={filters.location} options={LOCATION_OPTIONS} onChange={(v) => onChange({ location: v })} />
            <Select label="Property type" value={filters.type} options={TYPE_OPTIONS} onChange={(v) => onChange({ type: v })} />
            <Select label="Budget" value={filters.budget} options={BUDGET_OPTIONS} onChange={(v) => onChange({ budget: v })} />
            <Select label="Selling status" value={filters.status} options={STATUS_OPTIONS} onChange={(v) => onChange({ status: v })} />
          </div>
          <div className="mt-4 flex items-center justify-between border-t border-white/[0.07] pt-3">
            <button type="button" onClick={onClear} className="text-sm text-zinc-400 hover:text-white">
              Clear all
            </button>
            <button type="button" onClick={() => setOpen(false)} className="btn-primary py-2">
              Done
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
