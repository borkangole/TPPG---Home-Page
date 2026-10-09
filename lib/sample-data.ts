/**
 * SAMPLE DATA ONLY. Fictional developers and properties for layout work.
 * Replace with Supabase public views (supabase/public_views.sql) when data is wired.
 */
import type { StaticImageData } from "next/image";
import balconies from "@/public/images/balconies.jpg";
import glassFacade from "@/public/images/glass-facade.jpg";
import heroTowers from "@/public/images/hero-towers.jpg";
import skyline from "@/public/images/skyline.jpg";

export type FeaturedDeveloper = {
  slug: string;
  name: string;
  initials: string;
  projects: number;
  areas: string[];
};

export type FeaturedProperty = {
  slug: string;
  name: string;
  developer: string;
  location: string;
  region: "Iloilo" | "Cebu" | "Palawan";
  areas: string[]; // Iloilo area slugs (lib/seo/site.ts LOCATIONS) for filtering
  lat: number;
  lng: number;
  type: "Condo" | "House and Lot" | "Lot";
  sellingStatus: "RFO" | "Pre-selling";
  image: StaticImageData | string;
  imagePosition?: string; // CSS object-position for cropping
  startingTcp: number;
  monthlyDp: number;
  bedrooms: string | null;
  area: string;
};

export const FEATURED_DEVELOPERS: FeaturedDeveloper[] = [
  { slug: "meridian-estates", name: "Meridian Estates", initials: "ME", projects: 4, areas: ["Mandurriao", "Jaro"] },
  { slug: "casa-verde-homes", name: "Casa Verde Homes", initials: "CV", projects: 3, areas: ["Pavia", "Oton"] },
  { slug: "northpoint-land", name: "Northpoint Land", initials: "NL", projects: 2, areas: ["Iloilo City"] },
  { slug: "ilaya-development", name: "Ilaya Development", initials: "ID", projects: 5, areas: ["Oton", "Molo"] },
  { slug: "harborview-properties", name: "Harborview Properties", initials: "HP", projects: 2, areas: ["Molo", "La Paz"] },
];

export const FEATURED_PROPERTIES: FeaturedProperty[] = [
  {
    slug: "the-arden-residences",
    name: "The Arden Residences",
    developer: "Meridian Estates",
    location: "Mandurriao, Iloilo City",
    region: "Iloilo",
    areas: ["iloilo-city", "mandurriao"],
    lat: 10.7212,
    lng: 122.5398,
    type: "Condo",
    sellingStatus: "Pre-selling",
    image: balconies,
    startingTcp: 3_450_000,
    monthlyDp: 18_900,
    bedrooms: "Studio – 2 BR",
    area: "24–56 sqm",
  },
  {
    slug: "casa-verde-pavia",
    name: "Casa Verde Pavia",
    developer: "Casa Verde Homes",
    location: "Pavia, Iloilo",
    region: "Iloilo",
    areas: ["pavia"],
    lat: 10.7765,
    lng: 122.5437,
    type: "House and Lot",
    sellingStatus: "RFO",
    image: skyline,
    imagePosition: "50% 85%",
    startingTcp: 4_980_000,
    monthlyDp: 22_500,
    bedrooms: "3 BR",
    area: "88 sqm floor",
  },
  {
    slug: "northpoint-tower",
    name: "Northpoint Tower",
    developer: "Northpoint Land",
    location: "Iloilo Business Park, Mandurriao",
    region: "Iloilo",
    areas: ["iloilo-city", "mandurriao"],
    lat: 10.7131,
    lng: 122.5467,
    type: "Condo",
    sellingStatus: "RFO",
    image: heroTowers,
    startingTcp: 2_890_000,
    monthlyDp: 15_200,
    bedrooms: "1 BR",
    area: "28 sqm",
  },
  {
    slug: "harborview-suites",
    name: "Harborview Suites",
    developer: "Harborview Properties",
    location: "Molo, Iloilo City",
    region: "Iloilo",
    areas: ["iloilo-city", "molo"],
    lat: 10.6968,
    lng: 122.5452,
    type: "Condo",
    sellingStatus: "Pre-selling",
    image: glassFacade,
    imagePosition: "20% 50%",
    startingTcp: 3_120_000,
    monthlyDp: 16_800,
    bedrooms: "Studio – 1 BR",
    area: "22–34 sqm",
  },
  {
    slug: "lahug-heights",
    name: "Lahug Heights",
    developer: "Northpoint Land",
    location: "Lahug, Cebu City",
    region: "Cebu",
    areas: [],
    lat: 10.3318,
    lng: 123.8993,
    type: "Condo",
    sellingStatus: "RFO",
    image: balconies,
    imagePosition: "50% 95%",
    startingTcp: 3_680_000,
    monthlyDp: 19_800,
    bedrooms: "1 BR",
    area: "32 sqm",
  },
  {
    slug: "bacuit-bay-lots",
    name: "Bacuit Bay Lots",
    developer: "Ilaya Development",
    location: "El Nido, Palawan",
    region: "Palawan",
    areas: [],
    lat: 11.1838,
    lng: 119.3936,
    type: "Lot",
    sellingStatus: "Pre-selling",
    image: skyline,
    imagePosition: "15% 70%",
    startingTcp: 1_850_000,
    monthlyDp: 9_600,
    bedrooms: null,
    area: "200 sqm lot",
  },
  {
    slug: "meridian-park-jaro",
    name: "Meridian Park",
    developer: "Meridian Estates",
    location: "Jaro, Iloilo City",
    region: "Iloilo",
    areas: ["iloilo-city", "jaro"],
    lat: 10.7325,
    lng: 122.5605,
    type: "House and Lot",
    sellingStatus: "Pre-selling",
    image: balconies,
    startingTcp: 6_250_000,
    monthlyDp: 29_400,
    bedrooms: "4 BR",
    area: "120 sqm floor",
  },
  {
    slug: "ilaya-lots-oton",
    name: "Ilaya Heights Lots",
    developer: "Ilaya Development",
    location: "Oton, Iloilo",
    region: "Iloilo",
    areas: ["oton"],
    lat: 10.6935,
    lng: 122.478,
    type: "Lot",
    sellingStatus: "Pre-selling",
    image: skyline,
    imagePosition: "50% 85%",
    startingTcp: 1_250_000,
    monthlyDp: 8_400,
    bedrooms: null,
    area: "150 sqm lot",
  },
];

export type SampleUnit = {
  id: string;
  propertySlug: string;
  name: string;
  bedrooms: string;
  sqm: number;
  tcp: number;
};

/** SAMPLE units for search suggestions. Replace with the public_units view. */
export const SAMPLE_UNITS: SampleUnit[] = [
  { id: "arden-512", propertySlug: "the-arden-residences", name: "Unit 512", bedrooms: "Studio", sqm: 24, tcp: 3_450_000 },
  { id: "arden-1207", propertySlug: "the-arden-residences", name: "Unit 1207", bedrooms: "1 Bedroom", sqm: 36, tcp: 4_800_000 },
  { id: "arden-805", propertySlug: "the-arden-residences", name: "Unit 805", bedrooms: "2 Bedroom", sqm: 56, tcp: 6_900_000 },
  { id: "np-1503", propertySlug: "northpoint-tower", name: "Unit 1503", bedrooms: "1 Bedroom", sqm: 28, tcp: 2_890_000 },
  { id: "np-902", propertySlug: "northpoint-tower", name: "Unit 902", bedrooms: "1 Bedroom", sqm: 30, tcp: 3_050_000 },
  { id: "hv-310", propertySlug: "harborview-suites", name: "Unit 310", bedrooms: "Studio", sqm: 22, tcp: 3_120_000 },
  { id: "hv-720", propertySlug: "harborview-suites", name: "Unit 720", bedrooms: "1 Bedroom", sqm: 34, tcp: 4_150_000 },
  { id: "cv-b4l12", propertySlug: "casa-verde-pavia", name: "Block 4 Lot 12", bedrooms: "3 Bedroom", sqm: 88, tcp: 4_980_000 },
  { id: "mp-b2l7", propertySlug: "meridian-park-jaro", name: "Block 2 Lot 7", bedrooms: "4 Bedroom", sqm: 120, tcp: 6_250_000 },
  { id: "il-b5l3", propertySlug: "ilaya-lots-oton", name: "Block 5 Lot 3", bedrooms: "Lot only", sqm: 150, tcp: 1_250_000 },
];
