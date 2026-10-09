export const SITE = {
  name: "The Premier Property Group",
  shortName: "TPPG",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  description:
    "Condos, house and lot, and lots for sale, mostly in Iloilo with select projects in Cebu and Palawan. Talk to a TPPG property specialist.",
  locale: "en_PH",
} as const;

// Regions we sell in. Iloilo is the main market; Cebu and Palawan are secondary.
export const REGIONS = [
  { slug: "iloilo", name: "Iloilo" },
  { slug: "cebu", name: "Cebu" },
  { slug: "palawan", name: "Palawan" },
] as const;

// Iloilo area pages (slug -> display name). Content comes later.
export const LOCATIONS = [
  { slug: "iloilo-city", name: "Iloilo City" },
  { slug: "mandurriao", name: "Mandurriao" },
  { slug: "jaro", name: "Jaro" },
  { slug: "la-paz", name: "La Paz" },
  { slug: "molo", name: "Molo" },
  { slug: "pavia", name: "Pavia" },
  { slug: "oton", name: "Oton" },
] as const;

export const PROPERTY_TYPES = [
  { slug: "condominiums", name: "Condominiums", dbValue: "Condo" },
  { slug: "house-and-lot", name: "House & Lot", dbValue: "House and Lot" },
  { slug: "lots", name: "Lots", dbValue: "Lot" },
] as const;
