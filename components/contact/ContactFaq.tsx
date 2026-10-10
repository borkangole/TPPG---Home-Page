import Link from "next/link";
import { ArrowRight, PlusIcon } from "@/components/ui/Icons";
import { CONTACT_FAQ } from "@/lib/contact";

export function ContactFaq() {
  return (
    <section aria-labelledby="faq-heading" className="py-24 sm:py-32">
      <div className="container-site grid gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-4">
          <p className="eyebrow">FAQ</p>
          <h2 id="faq-heading" className="mt-4 text-3xl font-bold leading-tight tracking-tight text-white sm:text-[2.6rem]">
            Frequently asked{" "}
            <span className="font-serif font-normal italic text-brand-soft">questions.</span>
          </h2>
          <p className="mt-5 leading-relaxed text-zinc-400">Can’t find what you’re looking for? Ask us directly.</p>
          <Link
            href="#inquire"
            className="group mt-6 inline-flex items-center gap-2 text-sm font-semibold text-white hover:text-brand-soft"
          >
            Send an inquiry
            <ArrowRight className="h-4 w-4 text-brand transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>

        <div className="divide-y divide-white/[0.08] border-y border-white/[0.08] lg:col-span-8">
          {CONTACT_FAQ.map((f, i) => (
            <details key={f.q} className="group" open={i === 0}>
              <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-6 text-left text-lg font-semibold text-white transition-colors hover:text-brand-soft [&::-webkit-details-marker]:hidden">
                {f.q}
                <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full border border-white/15 text-zinc-300 transition-all group-open:rotate-45 group-open:border-brand group-open:bg-brand group-open:text-white">
                  <PlusIcon />
                </span>
              </summary>
              <p className="-mt-1 max-w-2xl pb-6 pr-14 leading-relaxed text-zinc-400">{f.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
