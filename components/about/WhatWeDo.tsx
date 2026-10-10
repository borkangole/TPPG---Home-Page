import { SERVICES } from "@/lib/about";

export function WhatWeDo() {
  return (
    <section aria-labelledby="wwd-heading" className="border-t border-white/[0.06] py-24 sm:py-32">
      <div className="container-site">
        <div className="grid gap-6 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <p className="eyebrow">What we do</p>
            <h2 id="wwd-heading" className="mt-4 text-3xl font-bold leading-tight tracking-tight text-white sm:text-[2.6rem]">
              From your first tour{" "}
              <span className="font-serif font-normal italic text-brand-soft">to the day you get your keys.</span>
            </h2>
          </div>
          <p className="leading-relaxed text-zinc-400 lg:col-span-5">
            We help you buy condos, house and lot, and lots from developers we work with directly. One property
            specialist stays with you through every step.
          </p>
        </div>

        <ol className="relative mt-14 grid gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          {/* Progress rail (desktop) */}
          <div aria-hidden className="absolute left-0 right-0 top-5 hidden h-px bg-gradient-to-r from-brand via-brand/40 to-white/10 lg:block" />
          {SERVICES.map((s, i) => (
            <li key={s.title} className="relative">
              <span className="relative grid h-10 w-10 place-items-center rounded-full border border-brand/60 bg-ink font-serif text-sm text-brand-soft">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-6 text-lg font-semibold text-white">{s.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-zinc-400">{s.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
