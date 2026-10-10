import Image from "next/image";
import teamPhoto from "@/public/images/team/tppg-team.jpg";
import { STORY } from "@/lib/about";

export function OurStory() {
  return (
    <section aria-labelledby="story-heading" className="border-y border-white/[0.06] bg-ink-800 py-24 sm:py-32">
      <div className="container-site grid gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-5">
          <p className="eyebrow">Our story</p>
          <h2 id="story-heading" className="mt-4 text-3xl font-bold leading-tight tracking-tight text-white sm:text-[2.6rem]">
            It started with three people{" "}
            <span className="font-serif font-normal italic text-brand-soft">and one belief.</span>
          </h2>
        </div>

        <div className="lg:col-span-7">
          <p className="font-serif text-2xl leading-snug text-white sm:text-[1.75rem]">{STORY[0]}</p>
          {STORY.slice(1).map((p) => (
            <p key={p} className="mt-6 text-lg leading-relaxed text-zinc-400">
              {p}
            </p>
          ))}
        </div>

        {/* Team photo */}
        <figure className="relative overflow-hidden rounded-2xl border border-white/[0.08] bg-ink shadow-[0_40px_80px_-40px_rgba(0,0,0,0.8)] lg:col-span-12 lg:mt-4">
          <div className="relative aspect-[3/2] sm:aspect-[16/9] lg:aspect-[2/1]">
            <Image
              src={teamPhoto}
              alt={`The TPPG team: agents, leaders, and professionals of The Premier Property Group`}
              fill
              placeholder="blur"
              sizes="(min-width: 1216px) 1216px, 100vw"
              className="object-cover object-[50%_35%]"
            />
            <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-ink/85 to-transparent" />
            <figcaption className="absolute bottom-4 left-5 right-5 flex items-end justify-between gap-4 sm:bottom-6 sm:left-8 sm:right-8">
              <span className="font-serif text-xl italic text-white sm:text-2xl">The TPPG family</span>
              <span className="hidden text-xs font-semibold uppercase tracking-[0.16em] text-zinc-300 sm:block">
                Strong and growing
              </span>
            </figcaption>
          </div>
        </figure>
      </div>
    </section>
  );
}
