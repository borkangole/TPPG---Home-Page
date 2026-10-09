import type { MetadataRoute } from "next";
import { LOCATIONS, PROPERTY_TYPES, SITE } from "@/lib/seo/site";

// Static routes now. Property detail and guide URLs get added once data is wired.
export default function sitemap(): MetadataRoute.Sitemap {
  const staticPaths = [
    "/",
    "/properties",
    ...PROPERTY_TYPES.map((t) => `/properties/${t.slug}`),
    "/locations",
    ...LOCATIONS.map((l) => `/locations/${l.slug}`),
    "/guides",
    "/about",
    "/property-specialists",
    "/contact",
  ];
  return staticPaths.map((path) => ({
    url: `${SITE.url}${path}`,
    lastModified: new Date(),
  }));
}
