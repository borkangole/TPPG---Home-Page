import type { MetadataRoute } from "next";
import { GUIDES } from "@/lib/guides";
import { LOCATIONS, PROPERTY_TYPES, SITE } from "@/lib/seo/site";

// Static routes and guides. Property detail URLs get added once data is wired.
export default function sitemap(): MetadataRoute.Sitemap {
  const staticPaths = [
    "/",
    "/properties",
    ...PROPERTY_TYPES.map((t) => `/properties/${t.slug}`),
    "/locations",
    ...LOCATIONS.map((l) => `/locations/${l.slug}`),
    "/guides",
    ...GUIDES.map((g) => `/guides/${g.slug}`),
    "/about",
    "/property-specialists",
    "/contact",
    "/privacy",
  ];
  return staticPaths.map((path) => ({
    url: `${SITE.url}${path}`,
    lastModified: new Date(),
  }));
}
