import { formatPesoShort } from "@/lib/format";
import { FEATURED_DEVELOPERS, FEATURED_PROPERTIES, SAMPLE_UNITS } from "@/lib/sample-data";
import { LOCATIONS, REGIONS } from "@/lib/seo/site";
import { norm } from "@/lib/text";
import type { SearchGroup, SearchItem } from "@/types/search";

/**
 * Catalog search used by /api/search.
 * Today it searches SAMPLE data. When Supabase is connected, replace the four
 * source lists below with queries on the public views; the return shape stays the same.
 */

/** Every word the user typed must appear somewhere in the haystack. Lower score = better. */
function score(title: string, haystack: string, tokens: string[]): number | null {
  const hay = norm(`${title} ${haystack}`);
  if (!tokens.every((t) => hay.includes(t))) return null;
  const t = norm(title);
  if (t.startsWith(tokens[0])) return 0;
  if (t.split(" ").some((w) => w.startsWith(tokens[0]))) return 1;
  return 2;
}

function rank<T extends { s: number; item: SearchItem }>(rows: T[], limit: number): SearchItem[] {
  return rows
    .sort((a, b) => a.s - b.s || a.item.title.localeCompare(b.item.title))
    .slice(0, limit)
    .map((r) => r.item);
}

const propertiesIn = (placeName: string) =>
  FEATURED_PROPERTIES.filter((p) => norm(p.location).includes(norm(placeName))).length;

const placeItem = (slug: string, name: string): SearchItem => {
  const n = propertiesIn(name);
  return {
    id: `place-${slug}`,
    kind: "place",
    title: name,
    subtitle: n > 0 ? `Area · ${n} ${n === 1 ? "property" : "properties"}` : "Area in Iloilo",
    href: `/properties?location=${slug}`,
  };
};

const regionItem = (slug: string, name: string): SearchItem => {
  const n = FEATURED_PROPERTIES.filter((p) => p.region === name).length;
  return {
    id: `region-${slug}`,
    kind: "place",
    title: name,
    subtitle: `Region · ${n} ${n === 1 ? "property" : "properties"}`,
    href: `/properties?location=${slug}`,
  };
};

const developerItem = (d: (typeof FEATURED_DEVELOPERS)[number]): SearchItem => ({
  id: `dev-${d.slug}`,
  kind: "developer",
  title: d.name,
  subtitle: `Developer · ${d.projects} projects`,
  href: `/properties?developer=${d.slug}`,
});

export function searchCatalog(raw: string): SearchGroup[] {
  const q = norm(raw);

  // Nothing typed yet: offer quick picks.
  if (!q) {
    return [
      {
        label: "Popular areas",
        kind: "place",
        items: [
          ...LOCATIONS.slice(0, 3).map((l) => placeItem(l.slug, l.name)),
          ...REGIONS.filter((r) => r.slug !== "iloilo").map((r) => regionItem(r.slug, r.name)),
        ],
      },
      { label: "Featured developers", kind: "developer", items: FEATURED_DEVELOPERS.slice(0, 3).map(developerItem) },
    ];
  }

  const tokens = q.split(" ");
  const groups: SearchGroup[] = [];

  const properties = FEATURED_PROPERTIES.flatMap((p) => {
    const s = score(p.name, `${p.developer} ${p.location} ${p.type}`, tokens);
    return s === null
      ? []
      : [
          {
            s,
            item: {
              id: `prop-${p.slug}`,
              kind: "property" as const,
              title: p.name,
              subtitle: `${p.type === "Condo" ? "Condominium" : p.type} · ${p.location}`,
              href: `/properties?property=${p.slug}`,
            },
          },
        ];
  });

  const places = [
    ...REGIONS.flatMap((r) => {
      const s = score(r.name, "", tokens);
      return s === null ? [] : [{ s, item: regionItem(r.slug, r.name) }];
    }),
    ...LOCATIONS.flatMap((l) => {
      const s = score(l.name, "", tokens);
      return s === null ? [] : [{ s, item: placeItem(l.slug, l.name) }];
    }),
  ];

  const units = SAMPLE_UNITS.flatMap((u) => {
    const prop = FEATURED_PROPERTIES.find((p) => p.slug === u.propertySlug);
    if (!prop) return [];
    const s = score(u.name, `${u.bedrooms} ${prop.name} ${prop.location}`, tokens);
    return s === null
      ? []
      : [
          {
            s,
            item: {
              id: `unit-${u.id}`,
              kind: "unit" as const,
              title: `${u.name} · ${u.bedrooms}`,
              subtitle: `${prop.name} · ${u.sqm} sqm · ${formatPesoShort(u.tcp)}`,
              href: `/properties?property=${u.propertySlug}&unit=${u.id}`,
            },
          },
        ];
  });

  const developers = FEATURED_DEVELOPERS.flatMap((d) => {
    const s = score(d.name, d.areas.join(" "), tokens);
    return s === null ? [] : [{ s, item: developerItem(d) }];
  });

  const push = (label: string, kind: SearchGroup["kind"], items: SearchItem[]) =>
    items.length && groups.push({ label, kind, items });

  push("Properties", "property", rank(properties, 4));
  push("Places", "place", rank(places, 4));
  push("Units", "unit", rank(units, 4));
  push("Developers", "developer", rank(developers, 3));

  return groups;
}
