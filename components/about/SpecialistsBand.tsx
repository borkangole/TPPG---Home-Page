import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "@/components/ui/Icons";
import { LEADERS, TEAM_SIZE } from "@/lib/about";

export function SpecialistsBand() {
  return (
    <section aria-labelledby="specialists-heading" className="pb-24 sm:pb-32">
      <div className="container-site">
        <div className="relative overflow-hidden rounded-2xl border border-white/[0.08] bg-ink-800 px-6 py-12 sm:px-12 sm:py-16">

          <div className="relative grid gap-10 lg:grid-cols-12 lg:items-center">
            <div className="lg:col-span-7">
              <p className="eyebrow">Our property specialists</p>
              <h2
                id="specialists-heading"
                className="mt-4 text-3xl font-bold leading-tight tracking-tight text-white sm:text-[2.6rem]"
              >
                A {TEAM_SIZE}-strong team,{" "}
                <span className="font-serif font-normal italic text-brand-soft">ready when you are.</span>
              </h2>
              <p className="mt-5 max-w-xl leading-relaxed text-zinc-400">
                Our agents know the projects, the neighborhoods, and the paperwork. Whether you’re buying your first
                home or adding to your investments, there’s a specialist who can help.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link href="/property-specialists" className="btn-primary">
                  Meet our specialists
                  <ArrowRight />
                </Link>
                <Link href="/contact" className="btn-ghost">
                  Talk to an agent
                </Link>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="flex items-center">
                <ul className="flex -space-x-4">
                  {LEADERS.map((l) => (
                    <li key={l.name} className="relative h-20 w-20 overflow-hidden rounded-full bg-white ring-4 ring-ink-800 sm:h-24 sm:w-24">
                      <Image src={l.photo} alt={l.name} fill sizes="96px" className="object-cover object-top" />
                    </li>
                  ))}
                </ul>
                <span className="relative -ml-4 grid h-20 w-20 place-items-center rounded-full bg-brand font-semibold text-white ring-4 ring-ink-800 sm:h-24 sm:w-24 sm:text-lg">
                  +{TEAM_SIZE - LEADERS.length}
                </span>
              </div>
              <p className="mt-5 text-sm text-zinc-400">
                Led by {LEADERS.map((l) => l.name.split(" ")[0]).join(", ").replace(/, ([^,]*)$/, " and $1")}, with{" "}
                {TEAM_SIZE - LEADERS.length} more agents and professionals across Iloilo, Cebu, and Palawan.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
