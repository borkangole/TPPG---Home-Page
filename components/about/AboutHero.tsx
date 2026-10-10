import Image from "next/image";
import skyline from "@/public/images/skyline.jpg";
import { REGIONS_SERVED, TEAM_SIZE } from "@/lib/about";

export function AboutHero() {
  return (
    <section className="grain relative isolate overflow-hidden pt-16">
      <div className="absolute inset-0 -z-10">
        <Image
          src={skyline}
          alt=""
          fill
          priority
          placeholder="blur"
          sizes="100vw"
          className="object-cover object-[50%_70%]"
        />
        <div className="absolute inset-0 bg-ink/80" />
        <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/80 to-ink/30" />
        <div className="absolute -left-40 top-1/3 h-[26rem] w-[26rem] rounded-full bg-brand/15 blur-[120px]" />
        <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-ink to-transparent" />
      </div>

      <div className="container-site pb-20 pt-20 sm:pb-28 sm:pt-28">
        <p className="eyebrow rise rise-1">About The Premier Property Group</p>
        <h1 className="rise rise-2 mt-5 max-w-4xl text-[2.6rem] font-bold leading-[1.04] tracking-tight text-white sm:text-6xl lg:text-7xl">
          Finding a home should feel{" "}
          <span className="font-serif font-normal italic text-brand-soft">exciting, not overwhelming.</span>
        </h1>
        <p className="rise rise-3 mt-7 max-w-2xl text-base leading-relaxed text-zinc-300 sm:text-lg">
          TPPG is a real estate sales organization that helps Filipino families and investors find condos, house
          and lot, and lots from trusted developers, mainly in Iloilo, with select projects in Cebu and Palawan.
        </p>

        <dl className="rise rise-4 mt-12 flex flex-wrap gap-x-10 gap-y-6 border-t border-white/10 pt-8 text-sm">
          <div>
            <dt className="text-zinc-500">Our team</dt>
            <dd className="mt-1 font-semibold text-white">{TEAM_SIZE}-strong and growing</dd>
          </div>
          <div>
            <dt className="text-zinc-500">Where we sell</dt>
            <dd className="mt-1 font-semibold text-white">{REGIONS_SERVED.join(" · ")}</dd>
          </div>
          <div>
            <dt className="text-zinc-500">Our goal</dt>
            <dd className="mt-1 font-semibold text-white">₱1 billion in sales by 2027</dd>
          </div>
        </dl>
      </div>
    </section>
  );
}
