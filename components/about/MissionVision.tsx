import { MISSION, VISION } from "@/lib/about";

const VALUES = ["Honesty", "Expertise", "Care"];

export function MissionVision() {
  return (
    <section aria-labelledby="mv-heading" className="py-24 sm:py-32">
      <div className="container-site">
        <p className="eyebrow">Mission and vision</p>
        <h2 id="mv-heading" className="mt-4 max-w-4xl text-3xl font-bold leading-tight tracking-tight text-white sm:text-[2.6rem]">
          Where we’re going,{" "}
          <span className="font-serif font-normal italic text-brand-soft">and how we’ll get there.</span>
        </h2>

        <div className="mt-12 grid gap-5 lg:grid-cols-2">
          <article className="relative overflow-hidden rounded-2xl border border-brand/30 bg-gradient-to-br from-brand/[0.14] via-ink-800 to-ink-800 p-8 sm:p-10">
            <div aria-hidden className="absolute -right-16 -top-16 h-56 w-56 rounded-full bg-brand/20 blur-3xl" />
            <h3 className="text-sm font-semibold uppercase tracking-[0.16em] text-brand-soft">Our vision</h3>
            <p className="mt-6 font-serif text-6xl leading-none text-white sm:text-7xl">
              ₱1B<span className="ml-3 align-middle font-sans text-base font-medium text-zinc-400 sm:text-lg">by 2027</span>
            </p>
            <p className="mt-6 max-w-lg text-lg leading-relaxed text-zinc-200">{VISION}</p>
          </article>

          <article className="rounded-2xl border border-white/[0.08] bg-ink-800 p-8 sm:p-10">
            <h3 className="text-sm font-semibold uppercase tracking-[0.16em] text-brand-soft">Our mission</h3>
            <ul className="mt-6 flex flex-wrap gap-2">
              {VALUES.map((v) => (
                <li key={v} className="rounded-full border border-white/15 px-3.5 py-1.5 font-serif text-lg italic text-white">
                  {v}
                </li>
              ))}
            </ul>
            <p className="mt-6 max-w-lg text-lg leading-relaxed text-zinc-200">{MISSION}</p>
          </article>
        </div>
      </div>
    </section>
  );
}
