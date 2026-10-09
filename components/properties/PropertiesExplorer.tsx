"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useMemo, useRef, useState, useTransition } from "react";
import { SearchInput } from "@/components/home/SearchInput";
import type { MapPoint } from "@/components/map/PropertyMap";
import { ArrowRight, CloseIcon, GridIcon, MapIcon } from "@/components/ui/Icons";
import {
  FILTER_KEYS,
  hasActiveFilters,
  type ExplorerView,
  type FilterKey,
  type ListingFilters,
} from "@/lib/filter-options";
import { formatPesoShort } from "@/lib/format";
import type { FeaturedProperty, SampleUnit } from "@/lib/sample-data";
import { FilterMenu } from "./FilterMenu";
import { ListingCard } from "./ListingCard";
import { PropertyCard } from "./PropertyCard";
import { PropertyDetails } from "./PropertyDetails";

const PropertyMap = dynamic(() => import("@/components/map/PropertyMap"), {
  ssr: false,
  loading: () => (
    <div className="grid h-full w-full place-items-center bg-ink-800 text-sm text-zinc-500">Loading map…</div>
  ),
});

const QUICK_AREAS = [
  { slug: "iloilo-city", label: "Iloilo City" },
  { slug: "mandurriao", label: "Mandurriao" },
  { slug: "jaro", label: "Jaro" },
  { slug: "pavia", label: "Pavia" },
  { slug: "oton", label: "Oton" },
  { slug: "cebu", label: "Cebu" },
  { slug: "palawan", label: "Palawan" },
];

const toPoint = (p: FeaturedProperty): MapPoint => ({
  slug: p.slug,
  name: p.name,
  lat: p.lat,
  lng: p.lng,
  label: formatPesoShort(p.startingTcp),
});

type Props = {
  title: string;
  /** Current URL path (e.g. /properties or /properties/condominiums). */
  basePath: string;
  /** Type implied by a category path, so it is not repeated in that page's URL. */
  presetType?: string;
  properties: FeaturedProperty[];
  /** The selected property, when it is not part of the filtered list. */
  extra: FeaturedProperty | null;
  unitsBySlug: Record<string, SampleUnit[]>;
  filters: ListingFilters;
  chips: { key: FilterKey; label: string }[];
  total: number;
  initial: { view: ExplorerView; property: string | null; unit: string | null };
};

type UrlState = Partial<ListingFilters> & { view?: ExplorerView; property?: string | null; unit?: string | null };

export function PropertiesExplorer({ title, basePath, presetType, properties, extra, unitsBySlug, filters, chips, total, initial }: Props) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [view, setView] = useState<ExplorerView>(initial.view);
  const [selected, setSelected] = useState<string | null>(initial.property);
  const [unit, setUnit] = useState<string | null>(initial.unit);
  const [hovered, setHovered] = useState<string | null>(null);
  const mapWrapRef = useRef<HTMLDivElement>(null);

  // Re-sync whenever the server sends a new URL state (search suggestions, filter changes).
  useEffect(() => {
    setView(initial.view);
    setSelected(initial.property);
    setUnit(initial.unit);
  }, [initial]);

  const urlFor = useCallback(
    (next: UrlState, path: string) => {
      const merged = { ...filters, view, property: selected, unit, ...next };
      const sp = new URLSearchParams();
      for (const k of FILTER_KEYS) {
        if (!merged[k]) continue;
        if (k === "type" && path !== "/properties" && merged.type === presetType) continue;
        sp.set(k, merged[k] as string);
      }
      if (merged.view === "gallery") sp.set("view", "gallery");
      if (merged.property) sp.set("property", merged.property);
      if (merged.property && merged.unit) sp.set("unit", merged.unit);
      const qs = sp.toString();
      return qs ? `${path}?${qs}` : path;
    },
    [filters, view, selected, unit, presetType],
  );

  // Selection and view live in the URL too (shareable), without a server round-trip.
  const replaceUrl = (url: string) => window.history.replaceState(null, "", url);

  const select = useCallback(
    (slug: string) => {
      setSelected(slug);
      setUnit(null);
      setView("map");
      replaceUrl(urlFor({ property: slug, unit: null, view: "map" }, basePath));
      // On phones the map sits above the list: bring it into view.
      if (window.matchMedia("(max-width: 1023px)").matches) {
        setTimeout(() => mapWrapRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }), 60);
      }
    },
    [urlFor, basePath],
  );

  const clearSelection = () => {
    setSelected(null);
    setUnit(null);
    replaceUrl(urlFor({ property: null, unit: null }, basePath));
  };

  const chooseUnit = (id: string) => {
    setUnit(id);
    replaceUrl(urlFor({ unit: id }, basePath));
  };

  const changeView = (v: ExplorerView) => {
    setView(v);
    replaceUrl(urlFor({ view: v }, basePath));
  };

  // Filters change the result list, so they go through the server.
  const applyFilters = (patch: Partial<ListingFilters>) =>
    startTransition(() => router.replace(urlFor({ ...patch, property: null, unit: null }, "/properties"), { scroll: false }));

  const clearAll = () =>
    startTransition(() => router.replace(view === "gallery" ? "/properties?view=gallery" : "/properties", { scroll: false }));

  // Map data
  const fitPoints = useMemo(() => properties.map(toPoint), [properties]);
  const points = useMemo(() => (extra ? [...fitPoints, toPoint(extra)] : fitPoints), [fitPoints, extra]);
  const fitTo = hasActiveFilters(filters) ? "points" : "region";

  const selectedProperty =
    properties.find((p) => p.slug === selected) ?? (extra && extra.slug === selected ? extra : null);

  const countText = hasActiveFilters(filters)
    ? `${properties.length} of ${total} properties match`
    : `${total} properties`;

  const header = (
    <ResultsHeader
      title={title}
      countText={countText}
      filters={filters}
      chips={chips}
      onFilters={applyFilters}
      onClear={clearAll}
      wide={view === "gallery"}
    />
  );

  const empty = <EmptyResults onClear={clearAll} />;

  return (
    <section className={`flex flex-col pt-16 ${view === "map" ? "lg:h-[100svh]" : ""}`}>
      {/* Toolbar */}
      <div className="flex h-14 shrink-0 items-center justify-between gap-4 border-b border-white/[0.06] px-5 sm:px-8">
        <div role="group" aria-label="Choose view" className="flex rounded-full border border-white/10 bg-ink-800 p-1 text-sm font-semibold">
          {(
            [
              ["map", "Map View", MapIcon],
              ["gallery", "Gallery View", GridIcon],
            ] as const
          ).map(([v, label, Icon]) => (
            <button
              key={v}
              type="button"
              aria-pressed={view === v}
              onClick={() => changeView(v)}
              className={`inline-flex items-center gap-2 rounded-full px-4 py-1.5 transition-colors ${
                view === v ? "bg-brand text-white" : "text-zinc-400 hover:text-white"
              }`}
            >
              <Icon className="h-4 w-4" />
              {label}
            </button>
          ))}
        </div>
        <Link href="/contact" className="group hidden items-center gap-1.5 text-sm text-zinc-400 hover:text-white md:inline-flex">
          Need help choosing? <span className="font-semibold text-white">Talk to an agent</span>
          <ArrowRight className="h-4 w-4 text-brand transition-transform group-hover:translate-x-0.5" />
        </Link>
      </div>

      {view === "map" ? (
        <div className="grid min-h-0 flex-1 lg:grid-cols-[minmax(0,1.25fr)_minmax(0,1fr)]">
          {/* Left: list */}
          <aside aria-label="Property list" className="order-2 flex min-h-0 flex-col lg:order-1 lg:border-r lg:border-white/[0.06]">
            <div className="relative z-20 border-b border-white/[0.06] p-5">{header}</div>
            <div className={`min-h-0 flex-1 overflow-y-auto p-5 transition-opacity ${isPending ? "opacity-50" : ""}`}>
              {properties.length ? (
                <ul className="grid gap-4 sm:grid-cols-2">
                  {properties.map((p) => (
                    <li key={p.slug}>
                      <ListingCard
                        property={p}
                        selected={p.slug === selected}
                        onSelect={() => select(p.slug)}
                        onHover={setHovered}
                      />
                    </li>
                  ))}
                </ul>
              ) : (
                empty
              )}
            </div>
          </aside>

          {/* Right: map + details */}
          <div className="order-1 flex min-h-0 flex-col lg:order-2">
            <div ref={mapWrapRef} className="h-[46svh] min-h-[300px] scroll-mt-16 lg:h-auto lg:min-h-0 lg:flex-[1.1]">
              <PropertyMap
                points={points}
                fitPoints={fitPoints}
                fitTo={fitTo}
                selected={selected}
                hovered={hovered}
                onSelect={select}
              />
            </div>
            <div
              className={`border-t border-white/[0.06] bg-ink-800/50 lg:block lg:min-h-0 lg:flex-1 lg:overflow-y-auto ${
                selectedProperty ? "" : "hidden"
              }`}
            >
              {selectedProperty ? (
                <PropertyDetails
                  key={selectedProperty.slug}
                  property={selectedProperty}
                  units={unitsBySlug[selectedProperty.slug] ?? []}
                  selectedUnit={unit}
                  onUnit={chooseUnit}
                  onClose={clearSelection}
                />
              ) : (
                <DetailsEmpty onArea={(slug) => applyFilters({ location: slug })} />
              )}
            </div>
          </div>
        </div>
      ) : (
        <div className="container-site flex-1 py-8">
          {header}
          <div className={`mt-8 transition-opacity ${isPending ? "opacity-50" : ""}`}>
            {properties.length ? (
              <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {properties.map((p) => (
                  <li key={p.slug}>
                    <PropertyCard property={p} onSelect={() => select(p.slug)} />
                  </li>
                ))}
              </ul>
            ) : (
              empty
            )}
          </div>
        </div>
      )}
    </section>
  );
}

function ResultsHeader({
  title,
  countText,
  filters,
  chips,
  onFilters,
  onClear,
  wide,
}: {
  title: string;
  countText: string;
  filters: ListingFilters;
  chips: { key: FilterKey; label: string }[];
  onFilters: (patch: Partial<ListingFilters>) => void;
  onClear: () => void;
  wide: boolean;
}) {
  const search = (
    <form
      role="search"
      aria-label="Search properties"
      className="min-w-0 flex-1"
      onSubmit={(e) => {
        e.preventDefault();
        const q = String(new FormData(e.currentTarget).get("q") ?? "").trim();
        onFilters({ q });
      }}
    >
      <SearchInput key={filters.q} variant="compact" defaultValue={filters.q} />
    </form>
  );

  return (
    <div>
      <div className={wide ? "flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between" : ""}>
        <div className="flex items-start justify-between gap-3">
          <div>
            <h1 className={`font-semibold text-white ${wide ? "text-2xl sm:text-3xl" : "text-lg"}`}>{title}</h1>
            <p className="mt-0.5 text-xs text-zinc-500" aria-live="polite">
              {countText}
            </p>
          </div>
          {!wide && <FilterMenu filters={filters} onChange={onFilters} onClear={onClear} />}
        </div>
        <div className={`flex items-center gap-3 ${wide ? "w-full lg:max-w-xl" : "mt-4"}`}>
          {search}
          {wide && <FilterMenu filters={filters} onChange={onFilters} onClear={onClear} />}
        </div>
      </div>

      {chips.length > 0 && (
        <div className="mt-3 flex flex-wrap items-center gap-2">
          {chips.map((c) => (
            <button
              key={c.key}
              type="button"
              onClick={() => onFilters({ [c.key]: "" })}
              aria-label={`Remove filter ${c.label}`}
              className="inline-flex items-center gap-1.5 rounded-full border border-brand/40 bg-brand/10 py-1 pl-3 pr-2 text-xs font-medium text-brand-soft hover:border-brand"
            >
              {c.label}
              <CloseIcon className="h-3.5 w-3.5" />
            </button>
          ))}
          <button type="button" onClick={onClear} className="text-xs text-zinc-400 underline-offset-2 hover:text-white hover:underline">
            Clear all
          </button>
        </div>
      )}
    </div>
  );
}

function DetailsEmpty({ onArea }: { onArea: (slug: string) => void }) {
  return (
    <div className="flex h-full flex-col justify-center p-6">
      <p className="eyebrow">Property details</p>
      <h2 className="mt-2 text-xl font-semibold text-white">Select a property</h2>
      <p className="mt-2 max-w-md text-sm leading-relaxed text-zinc-400">
        Choose a property from the list or tap a price on the map to see its prices, available units, and exact location.
      </p>
      <p className="mt-6 text-xs text-zinc-500">Or jump to an area</p>
      <div className="mt-2 flex flex-wrap gap-2">
        {QUICK_AREAS.map((a) => (
          <button
            key={a.slug}
            type="button"
            onClick={() => onArea(a.slug)}
            className="rounded-full border border-white/10 px-3 py-1 text-sm text-zinc-300 transition-colors hover:border-brand/60 hover:text-white"
          >
            {a.label}
          </button>
        ))}
      </div>
    </div>
  );
}

function EmptyResults({ onClear }: { onClear: () => void }) {
  return (
    <div className="rounded-xl border border-dashed border-white/10 p-8 text-center">
      <p className="font-semibold text-white">No properties match these filters</p>
      <p className="mt-1 text-sm text-zinc-400">Try a wider budget or a different area, or let a specialist search for you.</p>
      <div className="mt-5 flex flex-wrap justify-center gap-3">
        <button type="button" onClick={onClear} className="btn-ghost">
          Clear filters
        </button>
        <Link href="/contact" className="btn-primary">
          Talk to an agent
        </Link>
      </div>
    </div>
  );
}
