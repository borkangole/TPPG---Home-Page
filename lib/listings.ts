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

export const ALL_PROPERTIES = FEATURED_PROPERTIES;

export function filterProperties(f: ListingFilters): FeaturedProperty[] {
  const tokens = norm(f.q).split(" ").filter(Boolean);
  const region = REGIONS.find((r) => r.slug === f.location);
  const area = LOCATIONS.find((l) => l.slug === f.location);
  const type = PROPERTY_TYPES.find((t) => t.slug === f.type);
  const developer = FEATURED_DEVELOPERS.find((d) => d.slug === f.developer);
  const [minRaw, maxRaw] = f.budget.split("-");
  const min = Number(minRaw) || 0;
  const max = maxRaw ? Number(maxRaw) || Infinity : Infinity;

  return ALL_PROPERTIES.filter((p) => {
    if (tokens.length) {
      const hay = norm(`${p.name} ${p.developer} ${p.location} ${p.region} ${p.type}`);
      if (!tokens.every((t) => hay.includes(t))) return false;
    }
    if (region && p.region !== region.name) return false;
    if (area && !p.areas.includes(area.slug)) return false;
    if (type && p.type !== type.dbValue) return false;
    if (developer && p.developer !== developer.name) return false;
    if (f.budget && (p.startingTcp < min || p.startingTcp > max)) return false;
    if (f.status === "rfo" && p.sellingStatus !== "RFO") return false;
    if (f.status === "pre-selling" && p.sellingStatus !== "Pre-selling") return false;
    return true;
  });
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
