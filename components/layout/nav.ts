export const NAV_LINKS = [
  { href: "/properties", label: "Properties" },
  { href: "/about", label: "About Us" },
  { href: "/contact", label: "Contact Us" },
] as const;

export const PORTAL_URL = process.env.NEXT_PUBLIC_PORTAL_URL ?? "#";
