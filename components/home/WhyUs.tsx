import Image from "next/image";
import Link from "next/link";
import balconies from "@/public/images/balconies.jpg";
import { ArrowRight } from "@/components/ui/Icons";

const POINTS = [
  {
    title: "Curated properties",
    text: "Selected condos, house and lot, and lots from developers we work with directly.",
  },
  {
    title: "Property specialists",
    text: "A trained specialist matches you with options that fit your plans, not just the listing of the week.",
  },
  {
    title: "Guidance on your budget",
    text: "Clear breakdowns of TCP, reservation fee, downpayment, and monthly terms before you commit.",
  },
  {
    title: "Complete information",
    text: "Unit sizes, construction status, turnover dates, and location details in one place.",
  },
];

export function WhyUs() {
  return (
    <section id="about" aria-labelledby="why-heading" className="py-24 sm:py-32">
      <div className="container-site grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
        {/* Image */}
        <div className="relative lg:col-span-5">
          <div className="relative aspect-[4/5] overflow-hidden rounded-2xl border border-white/[0.07]">
            <Image
              src={balconies}
              alt="Modern condominium balconies against a clear sky"
              fill
              placeholder="blur"
              sizes="(min-width: 1024px) 40vw, 100vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/10 to-transparent" />
            <p className="absolute bottom-6 left-6 right-6 font-serif text-2xl leading-snug text-white">
              Serving buyers, families, and investors in Iloilo and beyond.
            </p>
          </div>
          <div className="absolute -right-4 -top-4 -z-10 hidden h-full w-full rounded-2xl border border-brand/30 lg:block" />
        </div>

        {/* Copy */}
        <div className="lg:col-span-7">
          <p className="eyebrow">Why TPPG</p>
          <h2 id="why-heading" className="mt-4 text-3xl font-bold leading-tight tracking-tight text-white sm:text-[2.6rem]">
            Guidance from your first viewing{" "}
            <span className="font-serif font-normal italic text-brand-soft">to turnover.</span>
          </h2>
          <p className="mt-5 max-w-2xl leading-relaxed text-zinc-400">
            The Premier Property Group is a real estate sales organization with properties mainly in Iloilo and select projects in Cebu and Palawan. Our property specialists help
            you compare options, understand the payment terms, and handle viewing, reservation, and paperwork, so
            buying a property feels less like guesswork.
          </p>

          <ol className="mt-10 grid gap-px overflow-hidden rounded-xl border border-white/[0.07] bg-white/[0.07] sm:grid-cols-2">
            {POINTS.map((p, i) => (
              <li key={p.title} className="bg-ink p-6">
                <span className="font-serif text-sm text-brand">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="mt-3 font-semibold text-white">{p.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-zinc-400">{p.text}</p>
              </li>
            ))}
          </ol>

          <Link
            href="/about"
            className="group mt-8 inline-flex items-center gap-2 text-sm font-semibold text-white hover:text-brand-soft"
          >
            More about TPPG
            <ArrowRight className="h-4 w-4 text-brand transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
