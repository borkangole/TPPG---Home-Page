import Image from "next/image";
import Link from "next/link";
import glassFacade from "@/public/images/glass-facade.jpg";
import { ArrowRight } from "@/components/ui/Icons";

type Cta = { href: string; label: string };
type Props = {
  title?: string;
  accent?: string;
  text?: string;
  primary?: Cta;
  secondary?: Cta;
};

export function FinalCta({
  title = "Let’s find the right property",
  accent = "for you.",
  text = "Browse condos, house and lot, and lots, or tell a property specialist what you’re looking for.",
  primary = { href: "/properties", label: "Explore Properties" },
  secondary = { href: "/contact", label: "Talk to an Agent" },
}: Props) {
  return (
    <section aria-labelledby="cta-heading" className="pb-24 sm:pb-32">
      <div className="container-site">
        <div className="grain relative isolate overflow-hidden rounded-2xl border border-white/[0.08] px-6 py-16 text-center sm:px-12 sm:py-24">
          <Image src={glassFacade} alt="" fill placeholder="blur" sizes="(min-width: 1216px) 1216px, 100vw" className="-z-20 object-cover" />
          <div className="absolute inset-0 -z-10 bg-ink/85" />
          <div className="absolute left-1/2 top-full -z-10 h-[28rem] w-[40rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand/30 blur-[120px]" />

          <h2 id="cta-heading" className="mx-auto max-w-3xl text-3xl font-bold leading-tight tracking-tight text-white sm:text-5xl">
            {title}{" "}
            <span className="font-serif font-normal italic text-brand-soft">{accent}</span>
          </h2>
          <p className="mx-auto mt-5 max-w-xl leading-relaxed text-zinc-300">
            {text}
          </p>
          <div className="mt-9 flex flex-wrap justify-center gap-3">
            <Link href={primary.href} className="btn-primary">
              {primary.label}
              <ArrowRight />
            </Link>
            <Link href={secondary.href} className="btn-ghost bg-ink/40 backdrop-blur">
              {secondary.label}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
