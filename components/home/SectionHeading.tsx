import Link from "next/link";
import { ArrowRight } from "@/components/ui/Icons";

type Props = {
  id: string;
  eyebrow: string;
  title: string;
  accent?: string;
  link?: { href: string; label: string };
};

export function SectionHeading({ id, eyebrow, title, accent, link }: Props) {
  return (
    <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
      <div className="max-w-3xl">
        <p className="eyebrow">{eyebrow}</p>
        <h2 id={id} className="mt-4 text-3xl font-bold leading-tight tracking-tight text-white sm:text-[2.6rem]">
          {title}
          {accent && (
            <>
              {" "}
              <span className="font-serif font-normal italic text-brand-soft">{accent}</span>
            </>
          )}
        </h2>
      </div>
      {link && (
        <Link
          href={link.href}
          className="group inline-flex shrink-0 items-center gap-2 text-sm font-semibold text-white hover:text-brand-soft"
        >
          {link.label}
          <ArrowRight className="h-4 w-4 text-brand transition-transform group-hover:translate-x-0.5" />
        </Link>
      )}
    </div>
  );
}
