import { firstParam, parseFilters, type SearchParams } from "@/lib/filter-options";
import { ALL_PROPERTIES, activeFilterChips, filterProperties, getProperty, getUnits } from "@/lib/listings";
import { PropertiesExplorer } from "./PropertiesExplorer";

type Props = {
  searchParams: SearchParams;
  title: string;
  basePath: string;
  /** Category pages (e.g. /properties/condominiums) preset the type filter. */
  presetType?: string;
};

/** Server wrapper: reads the URL, filters listings, and hands data to the client explorer. */
export function PropertiesView({ searchParams, title, basePath, presetType }: Props) {
  const filters = parseFilters(searchParams);
  if (presetType && !filters.type) filters.type = presetType;

  const properties = filterProperties(filters);

  const selectedSlug = firstParam(searchParams.property);
  const selected = selectedSlug ? getProperty(selectedSlug) : null;
  const extra = selected && !properties.some((p) => p.slug === selected.slug) ? selected : null;

  const unitsBySlug = Object.fromEntries(
    [...properties, ...(extra ? [extra] : [])].map((p) => [p.slug, getUnits(p.slug)]),
  );

  return (
    <PropertiesExplorer
      title={title}
      basePath={basePath}
      presetType={presetType}
      properties={properties}
      extra={extra}
      unitsBySlug={unitsBySlug}
      filters={filters}
      chips={activeFilterChips(filters)}
      total={ALL_PROPERTIES.length}
      initial={{
        view: firstParam(searchParams.view) === "gallery" ? "gallery" : "map",
        property: selected?.slug ?? null,
        unit: selected ? firstParam(searchParams.unit) || null : null,
      }}
    />
  );
}
