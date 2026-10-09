import Image from "next/image";
import Link from "next/link";
import heroImage from "@/public/images/hero-towers.jpg";
import { ArrowRight } from "@/components/ui/Icons";
import { SearchBar } from "./SearchBar";

const POPULAR = [
  { href: "/properties/condominiums?location=mandurriao", label: "Condos in Mandurriao" },
  { href: "/properties/house-and-lot?location=pavia", label: "House & Lot in Pavia" },
  { href: "/properties?location=cebu", label: "Properties in Cebu" },
  { href: "/properties?location=palawan", label: "Properties in Palawan" },
];

export function Hero() {
  return (
    <section className="grain relative isolate flex min-h-[100svh] flex-col pt-16">
      {/* Background photo + overlays (clipped here so search suggestions can overflow the section) */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
      <Image
        src={heroImage}
        alt=""
        fill
        priority
        placeholder="blur"
        sizes="100vw"
        className="-z-20 object-cover object-center"
      />
      <div className="absolute inset-0 -z-10 bg-ink/75" />
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-ink via-ink/70 to-transparent" />
      <div className="absolute -left-40 bottom-24 -z-10 h-[28rem] w-[28rem] rounded-full bg-brand/15 blur-[120px]" />
      <div className="absolute inset-x-0 bottom-0 -z-10 h-2/3 bg-gradient-to-t from-ink via-ink/60 to-transparent" />
      </div>

      <div className="container-site flex flex-1 flex-col justify-center pb-10 pt-16 lg:pt-20">
        <div className="max-w-3xl">
          <p className="eyebrow rise rise-1">The Premier Property Group</p>

          <h1 className="rise rise-2 mt-5 text-[2.75rem] font-bold leading-[1.02] tracking-tight text-white sm:text-6xl lg:text-[5.25rem]">
            Find your next property{" "}
            <span className="block font-serif font-normal italic text-brand-soft">in Iloilo and beyond.</span>
          </h1>

          <p className="rise rise-3 mt-6 max-w-xl text-base leading-relaxed text-zinc-300 sm:text-lg">
            Condos, house and lot, and lots from trusted developers, mostly in Iloilo with select projects in
            Cebu and Palawan. A TPPG property specialist guides you from first viewing to turnover.
          </p>
        </div>

        <div className="rise rise-4 relative z-20 mt-10 lg:mt-14">
          <SearchBar />

          <div className="mt-5 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <ul className="flex flex-wrap items-center gap-x-2 gap-y-2 text-sm">
              <li className="mr-1 text-zinc-500">Popular:</li>
              {POPULAR.map((p) => (
                <li key={p.href}>
                  <Link
                    href={p.href}
                    className="inline-block rounded-full border border-white/10 px-3 py-1 text-zinc-300 transition-colors hover:border-brand/60 hover:text-white"
                  >
                    {p.label}
                  </Link>
                </li>
              ))}
            </ul>
            <Link
              href="/contact"
              className="group inline-flex items-center gap-2 text-sm font-medium text-zinc-300 hover:text-white"
            >
              Not sure where to start? Talk to a property specialist
              <ArrowRight className="h-4 w-4 text-brand transition-transform group-hover:translate-x-0.5" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
