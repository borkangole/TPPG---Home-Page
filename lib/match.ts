/**
 * Location / type / budget matching shared by the Properties page (server) and the homepage
 * "Find My Property" matcher (client). Pure: no data imports.
 */
import { LOCATIONS, PROPERTY_TYPES, REGIONS } from "@/lib/seo/site";
import type { FeaturedProperty } from "@/lib/sample-data";

export type BasicFilters = { location?: string; type?: string; budget?: string };

export function matchesBasic(p: FeaturedProperty, f: BasicFilters): boolean {
  if (f.location) {
    const region = REGIONS.find((r) => r.slug === f.location);
    const area = LOCATIONS.find((l) => l.slug === f.location);
    if (region && p.region !== region.name) return false;
    if (area && !p.areas.includes(area.slug)) return false;
  }
  if (f.type) {
    const type = PROPERTY_TYPES.find((t) => t.slug === f.type);
    if (type && p.type !== type.dbValue) return false;
  }
  if (f.budget) {
    const [minRaw, maxRaw] = f.budget.split("-");
    const min = Number(minRaw) || 0;
    const max = maxRaw ? Number(maxRaw) || Infinity : Infinity;
    if (p.startingTcp < min || p.startingTcp > max) return false;
  }
  return true;
}
