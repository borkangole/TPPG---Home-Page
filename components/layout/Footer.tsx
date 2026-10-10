import Link from "next/link";
import { ChatIcon, MailIcon, PhoneIcon, PinIcon } from "@/components/ui/Icons";
import { CONTACT, OFFICE_MAPS_URL } from "@/lib/contact";
import { LOCATIONS, PROPERTY_TYPES } from "@/lib/seo/site";
import { Logo } from "./Logo";
import { PORTAL_URL } from "./nav";

const COLUMNS: { title: string; links: { href: string; label: string }[] }[] = [
  {
    title: "Properties",
    links: [
      { href: "/properties", label: "All properties" },
      ...PROPERTY_TYPES.map((t) => ({ href: `/properties/${t.slug}`, label: t.name })),
      { href: "/properties?status=pre-selling", label: "Pre-selling" },
      { href: "/properties?status=rfo", label: "Ready for occupancy" },
    ],
  },
  {
    title: "Locations",
    links: [
      ...LOCATIONS.slice(0, 5).map((l) => ({ href: `/properties?location=${l.slug}`, label: l.name })),
      { href: "/properties?location=cebu", label: "Cebu" },
      { href: "/properties?location=palawan", label: "Palawan" },
    ],
  },
  {
    title: "Company",
    links: [
      { href: "/about", label: "About us" },
      { href: "/property-specialists", label: "Property specialists" },
      { href: "/guides", label: "Property guides" },
      { href: "/contact", label: "Contact us" },
    ],
  },
];

export function Footer() {
  const o = CONTACT.office;
  return (
    <footer className="border-t border-white/[0.06] bg-ink">
      <div className="container-site grid gap-12 py-16 lg:grid-cols-12 lg:gap-8">
        {/* Brand + contact */}
        <div className="lg:col-span-4">
          <Logo size="footer" />
          <p className="mt-5 max-w-xs text-sm leading-relaxed text-zinc-400">
            Condos, house and lot, and lots for sale, mainly in Iloilo with select projects in Cebu and Palawan.
          </p>
          <ul className="mt-6 space-y-3 text-sm">
            <li>
              <a href={OFFICE_MAPS_URL} target="_blank" rel="noopener noreferrer" className="group flex gap-3 text-zinc-300 hover:text-white">
                <PinIcon className="mt-0.5 h-4 w-4 shrink-0 text-brand" />
                <span>
                  {o.building}, {o.street}
                  <br />
                  {o.city}
                </span>
              </a>
            </li>
            <li className="flex flex-wrap gap-2 pt-1">
              {[
                { href: CONTACT.phone.href, label: "Call us", icon: PhoneIcon, title: CONTACT.phone.display },
                { href: CONTACT.email.href, label: "Email us", icon: MailIcon, title: CONTACT.email.display },
                { href: CONTACT.messenger.href, label: "Message us", icon: ChatIcon, title: CONTACT.messenger.label, external: true },
              ].map(({ icon: Icon, ...c }) => (
                <a
                  key={c.label}
                  href={c.href}
                  title={c.title}
                  {...(c.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                  className="inline-flex items-center gap-2 rounded-full border border-white/10 px-3.5 py-2 text-xs font-semibold text-zinc-200 transition-colors hover:border-brand/60 hover:text-white"
                >
                  <Icon className="h-3.5 w-3.5 text-brand" />
                  {c.label}
                </a>
              ))}
            </li>
          </ul>
        </div>

        {/* Link columns */}
        <nav aria-label="Footer" className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:col-span-8 lg:pl-8">
          {COLUMNS.map((col) => (
            <div key={col.title}>
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-zinc-500">{col.title}</p>
              <ul className="mt-4 space-y-2.5 text-sm">
                {col.links.map((l) => (
                  <li key={l.href}>
                    <Link href={l.href} className="text-zinc-300 transition-colors hover:text-white">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>
      </div>

      <div className="border-t border-white/[0.06]">
        <div className="container-site flex flex-col gap-3 py-6 text-xs text-zinc-500 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} The Premier Property Group. All rights reserved.</p>
          <ul className="flex flex-wrap gap-x-6 gap-y-2">
            <li>
              <Link href="/privacy" className="hover:text-white">
                Privacy notice
              </Link>
            </li>
            <li>
              <a href={PORTAL_URL} className="hover:text-white">
                Agent login
              </a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
