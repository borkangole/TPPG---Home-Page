/**
 * Filter options and URL parsing shared by the hero search, the Properties page,
 * and the server. No data imports here, so it is safe to use in client components.
 */
import { LOCATIONS, PROPERTY_TYPES } from "@/lib/seo/site";

export type Option = { value: string; label: string };
export type OptionGroup = { label: string; options: Option[] };

export const LOCATION_OPTIONS: (Option | OptionGroup)[] = [
  { value: "", label: "All locations" },
  {
    label: "Iloilo",
    options: [{ value: "iloilo", label: "All of Iloilo" }, ...LOCATIONS.map((l) => ({ value: l.slug, label: l.name }))],
  },
  { value: "cebu", label: "Cebu" },
  { value: "palawan", label: "Palawan" },
];

export const TYPE_OPTIONS: Option[] = [
  { value: "", label: "Any type" },
  ...PROPERTY_TYPES.map((t) => ({ value: t.slug, label: t.name })),
];

export const BUDGET_OPTIONS: Option[] = [
  { value: "", label: "Any budget" },
  { value: "0-2000000", label: "Under ₱2M" },
  { value: "2000000-4000000", label: "₱2M – ₱4M" },
  { value: "4000000-6000000", label: "₱4M – ₱6M" },
  { value: "6000000-", label: "₱6M and up" },
];

export const STATUS_OPTIONS: Option[] = [
  { value: "", label: "Any status" },
  { value: "rfo", label: "Ready for occupancy" },
  { value: "pre-selling", label: "Pre-selling" },
];

export const FILTER_KEYS = ["q", "location", "type", "budget", "status", "developer"] as const;
export type FilterKey = (typeof FILTER_KEYS)[number];
export type ListingFilters = Record<FilterKey, string>;
export type ExplorerView = "map" | "gallery";

export type SearchParams = Record<string, string | string[] | undefined>;

export const firstParam = (v: string | string[] | undefined) => ((Array.isArray(v) ? v[0] : v) ?? "").trim().slice(0, 80);

export function parseFilters(sp: SearchParams): ListingFilters {
  return Object.fromEntries(FILTER_KEYS.map((k) => [k, firstParam(sp[k])])) as ListingFilters;
}

export const hasActiveFilters = (f: ListingFilters) => FILTER_KEYS.some((k) => f[k]);

const flat = (options: (Option | OptionGroup)[]): Option[] =>
  options.flatMap((o) => ("options" in o ? o.options : [o]));

export function optionLabel(options: (Option | OptionGroup)[], value: string): string {
  return flat(options).find((o) => o.value === value)?.label ?? value;
}
