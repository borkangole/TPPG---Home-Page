/**
 * Server-side listing queries for the Properties page.
 * Today they read SAMPLE data. When Supabase is connected, replace the bodies with
 * queries on the public views; keep the same function signatures.
 */
import {
  FEATURED_DEVELOPERS,
  FEATURED_PROPERTIES,
  SAMPLE_UNITS,
  type FeaturedProperty,
  type SampleUnit,
} from "@/lib/sample-data";
import {
  BUDGET_OPTIONS,
  LOCATION_OPTIONS,
  STATUS_OPTIONS,
  TYPE_OPTIONS,
  optionLabel,
  type FilterKey,
  type ListingFilters,
} from "@/lib/filter-options";
import { LOCATIONS, PROPERTY_TYPES, REGIONS } from "@/lib/seo/site";
import { norm } from "@/lib/text";
import { matchesBasic } from "@/lib/match";

export const ALL_PROPERTIES = FEATURED_PROPERTIES;

export function filterProperties(f: ListingFilters): FeaturedProperty[] {
  const tokens = norm(f.q).split(" ").filter(Boolean);
  const developer = FEATURED_DEVELOPERS.find((d) => d.slug === f.developer);

  return ALL_PROPERTIES.filter((p) => {
    if (tokens.length) {
      const hay = norm(`${p.name} ${p.developer} ${p.location} ${p.region} ${p.type}`);
      if (!tokens.every((t) => hay.includes(t))) return false;
    }
    if (!matchesBasic(p, f)) return false;
    if (developer && p.developer !== developer.name) return false;
    if (f.status === "rfo" && p.sellingStatus !== "RFO") return false;
    if (f.status === "pre-selling" && p.sellingStatus !== "Pre-selling") return false;
    return true;
  });
}

/** Count and lowest starting price per property type (homepage "Explore by type"). */
export function typeSummaries() {
  return PROPERTY_TYPES.map((t) => {
    const list = ALL_PROPERTIES.filter((p) => p.type === t.dbValue);
    return { ...t, count: list.length, from: list.length ? Math.min(...list.map((p) => p.startingTcp)) : null };
  });
}

/** Count and lowest starting price per location (homepage "Explore by location"). */
export function locationSummaries() {
  const summarize = (slug: string, name: string) => {
    const list = ALL_PROPERTIES.filter((p) => matchesBasic(p, { location: slug }));
    return { slug, name, count: list.length, from: list.length ? Math.min(...list.map((p) => p.startingTcp)) : null };
  };
  return {
    iloilo: LOCATIONS.map((l) => summarize(l.slug, l.name)),
    other: REGIONS.filter((r) => r.slug !== "iloilo").map((r) => summarize(r.slug, r.name)),
  };
}

export const getProperty = (slug: string) => ALL_PROPERTIES.find((p) => p.slug === slug) ?? null;

export const getUnits = (slug: string): SampleUnit[] => SAMPLE_UNITS.filter((u) => u.propertySlug === slug);

/** Human labels for the active filters, shown as removable chips. */
export function activeFilterChips(f: ListingFilters): { key: FilterKey; label: string }[] {
  const chips: { key: FilterKey; label: string }[] = [];
  if (f.q) chips.push({ key: "q", label: `“${f.q}”` });
  if (f.location) chips.push({ key: "location", label: optionLabel(LOCATION_OPTIONS, f.location) });
  if (f.type) chips.push({ key: "type", label: optionLabel(TYPE_OPTIONS, f.type) });
  if (f.budget) chips.push({ key: "budget", label: optionLabel(BUDGET_OPTIONS, f.budget) });
  if (f.status) chips.push({ key: "status", label: optionLabel(STATUS_OPTIONS, f.status) });
  if (f.developer) {
    const d = FEATURED_DEVELOPERS.find((x) => x.slug === f.developer);
    chips.push({ key: "developer", label: d?.name ?? f.developer });
  }
  return chips;
}
