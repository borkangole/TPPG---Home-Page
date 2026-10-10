import { AwardIcon } from "@/components/ui/Icons";
import { AWARDS, PARTNERS, REGIONS_SERVED, TEAM_SIZE } from "@/lib/about";

const STATS = [
  { value: String(TEAM_SIZE), label: "Agents, leaders, and professionals" },
  { value: String(PARTNERS.length), label: "Developer partners" },
  { value: String(REGIONS_SERVED.length), label: `Regions: ${REGIONS_SERVED.join(", ")}` },
  { value: String(AWARDS.length), label: "Developer awards and recognitions" },
];

export function Achievements() {
  return (
    <section aria-labelledby="awards-heading" className="py-24 sm:py-32">
      <div className="container-site">
        <p className="eyebrow">Achievements</p>
        <h2 id="awards-heading" className="mt-4 max-w-3xl text-3xl font-bold leading-tight tracking-tight text-white sm:text-[2.6rem]">
          Recognized by the developers{" "}
          <span className="font-serif font-normal italic text-brand-soft">we work with.</span>
        </h2>

        <ul className="mt-12 divide-y divide-white/[0.07] border-y border-white/[0.07]">
          {AWARDS.map((a) => (
            <li key={a.title + a.by} className="grid grid-cols-[4.5rem_1fr] items-center gap-5 py-6 sm:grid-cols-[6rem_1fr_auto] sm:gap-8">
              <div className="flex h-16 w-16 flex-col items-center justify-center rounded-xl border border-brand/40 bg-brand/[0.08] sm:h-20 sm:w-20">
                {a.rank ? (
                  <>
                    <span className="text-[0.6rem] font-semibold uppercase tracking-[0.14em] text-brand-soft">Top</span>
                    <span className="font-serif text-3xl leading-none text-white sm:text-4xl">{a.rank}</span>
                  </>
                ) : (
                  <AwardIcon className="h-8 w-8 text-brand-soft" />
                )}
              </div>
              <div>
                <p className="text-lg font-semibold text-white sm:text-xl">{a.title}</p>
                <p className="mt-1 text-sm text-zinc-400">
                  {a.by}
                  {a.year && <span className="text-zinc-500 sm:hidden"> · {a.year}</span>}
                </p>
              </div>
              {a.year && <p className="hidden font-serif text-2xl text-zinc-500 sm:block">{a.year}</p>}
            </li>
          ))}
        </ul>

        <dl className="mt-14 grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-white/[0.07] bg-white/[0.07] lg:grid-cols-4">
          {STATS.map((s) => (
            <div key={s.label} className="bg-ink p-6 sm:p-8">
              <dt className="sr-only">{s.label}</dt>
              <dd>
                <span className="block font-serif text-5xl text-white">{s.value}</span>
                <span className="mt-2 block text-sm text-zinc-400">{s.label}</span>
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
