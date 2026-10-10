/**
 * Photos and copy for the full property view.
 * SAMPLE: every property reuses the four stock photos (its own image first) and a generated
 * description. Replace with each project's real photo set and write-up from Supabase.
 */
import type { StaticImageData } from "next/image";
import balconies from "@/public/images/balconies.jpg";
import glassFacade from "@/public/images/glass-facade.jpg";
import heroTowers from "@/public/images/hero-towers.jpg";
import skyline from "@/public/images/skyline.jpg";
import { formatPeso, typeLabel } from "@/lib/format";
import type { FeaturedProperty } from "@/lib/sample-data";

export type GalleryPhoto = { src: StaticImageData | string; alt: string; position?: string };

const STOCK: { src: StaticImageData; caption: string }[] = [
  { src: balconies, caption: "Building exterior" },
  { src: heroTowers, caption: "Towers" },
  { src: glassFacade, caption: "Facade detail" },
  { src: skyline, caption: "Skyline view" },
];

export function getGallery(p: FeaturedProperty): GalleryPhoto[] {
  const own: GalleryPhoto = { src: p.image, alt: `${p.name}, ${typeLabel(p.type)} in ${p.location}`, position: p.imagePosition };
  // Compare by file path: the property arrives from the server as a serialized copy.
  const ownSrc = typeof p.image === "string" ? p.image : p.image.src;
  const rest = STOCK.filter((s) => s.src.src !== ownSrc).map((s) => ({ src: s.src, alt: `${p.name}: ${s.caption.toLowerCase()}` }));
  return [own, ...rest];
}

export function describeProperty(p: FeaturedProperty): string {
  const status = p.sellingStatus === "RFO" ? "ready for occupancy" : "now pre-selling";
  const what =
    p.type === "Lot"
      ? `residential lots of about ${p.area.replace(" lot", "")}`
      : `${p.type === "Condo" ? "condominium units" : "house and lot homes"}${p.bedrooms ? ` from ${p.bedrooms}` : ""}, ${p.area}`;
  return `${p.name} by ${p.developer} offers ${what} in ${p.location}. The project is ${status}, with prices starting at ${formatPeso(
    p.startingTcp,
  )} and monthly downpayments from ${formatPeso(p.monthlyDp)}. Talk to a TPPG property specialist for the latest available units, payment terms, and a site visit.`;
}
