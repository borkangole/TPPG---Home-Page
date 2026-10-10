import { DeveloperLogo } from "@/components/ui/DeveloperLogo";
import { PARTNERS } from "@/lib/about";

export function DeveloperPartners() {
  return (
    <section
      id="partners"
      aria-labelledby="partners-heading"
      className="scroll-mt-16 border-y border-white/[0.06] bg-ink-800 py-24 sm:py-32"
    >
      <div className="container-site">
        <div className="grid gap-6 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <p className="eyebrow">Our developers and partners</p>
            <h2 id="partners-heading" className="mt-4 text-3xl font-bold leading-tight tracking-tight text-white sm:text-[2.6rem]">
              {PARTNERS.length} developers.{" "}
              <span className="font-serif font-normal italic text-brand-soft">One team that knows them all.</span>
            </h2>
          </div>
          <p className="leading-relaxed text-zinc-400 lg:col-span-5">
            We sell for some of the country’s most established developers, alongside the Iloilo builders who know
            the city best, so you can compare projects side by side in one conversation.
          </p>
        </div>

        <ul className="mt-12 grid grid-cols-3 gap-px overflow-hidden rounded-2xl border border-white/[0.07] bg-white/[0.07] lg:grid-cols-7">
          {PARTNERS.map((p) => (
            <li
              key={p.slug}
              className="group flex h-24 items-center justify-center bg-ink-800 px-3 transition-colors hover:bg-ink-700 sm:h-28 sm:px-5"
            >
              <DeveloperLogo
                developer={p}
                scale={0.85}
                maxWidth={150}
                className="opacity-70 transition-opacity duration-300 group-hover:opacity-100"
              />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
