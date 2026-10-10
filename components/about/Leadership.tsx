import Image from "next/image";
import { LEADERS, type Leader } from "@/lib/about";

function Portrait({ leader, size }: { leader: Leader; size: "lg" | "md" }) {
  const lg = size === "lg";
  return (
    <figure className={`mx-auto w-full ${lg ? "max-w-[20rem]" : "max-w-[16.5rem]"}`}>
      <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-white shadow-[0_24px_60px_-20px_rgba(0,0,0,0.7)] ring-1 ring-white/10">
        <Image
          src={leader.photo}
          alt={`${leader.name}, ${leader.role} of The Premier Property Group`}
          fill
          placeholder="blur"
          sizes={lg ? "320px" : "264px"}
          className="object-cover"
        />
        <div className="absolute inset-x-0 bottom-0 h-1 bg-brand" />
      </div>
      <figcaption className="mt-5 text-center">
        <p className="eyebrow">{leader.role}</p>
        <p className={`mt-1.5 font-semibold text-white ${lg ? "text-2xl" : "text-lg"}`}>{leader.name}</p>
      </figcaption>
    </figure>
  );
}

export function Leadership() {
  const [ceo, ...managers] = LEADERS;
  return (
    <section aria-labelledby="leaders-heading" className="py-24 sm:py-32">
      <div className="container-site">
        <div className="mx-auto max-w-2xl text-center">
          <p className="eyebrow">Leadership</p>
          <h2 id="leaders-heading" className="mt-4 text-3xl font-bold leading-tight tracking-tight text-white sm:text-[2.6rem]">
            The people{" "}
            <span className="font-serif font-normal italic text-brand-soft">leading TPPG.</span>
          </h2>
        </div>

        <div className="mt-16">
          <Portrait leader={ceo} size="lg" />

          {/* Org-chart connector (desktop only) */}
          <div aria-hidden className="mx-auto hidden h-14 w-full max-w-[36rem] sm:block">
            <div className="mx-auto h-1/2 w-px bg-gradient-to-b from-brand/0 to-brand/70" />
            <div className="h-1/2 border-x border-t border-brand/70" style={{ marginInline: "calc(25% - 0.5px)" }} />
          </div>

          <div className="mx-auto mt-14 grid max-w-[36rem] gap-14 sm:mt-0 sm:grid-cols-2 sm:gap-8">
            {managers.map((m) => (
              <Portrait key={m.name} leader={m} size="md" />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
