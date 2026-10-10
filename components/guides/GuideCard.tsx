import Link from "next/link";
import { ArrowRight, BookIcon } from "@/components/ui/Icons";
import { readingMinutes, type Guide } from "@/lib/guides";

/** Guide teaser. `featured` renders a larger card with an accent background. */
export function GuideCard({
  guide: g,
  featured = false,
  compact = false,
  headingLevel = 3,
}: {
  guide: Guide;
  featured?: boolean;
  /** Same size as regular cards (used in rows); featured only changes the accent. */
  compact?: boolean;
  headingLevel?: 2 | 3;
}) {
  const big = featured && !compact;
  const H = headingLevel === 2 ? "h2" : "h3";
  return (
    <article
      className={`group relative flex h-full flex-col overflow-hidden rounded-2xl border transition-colors ${
        featured
          ? `border-brand/30 bg-gradient-to-br from-brand/[0.14] via-ink-800 to-ink-800 hover:border-brand/60 ${big ? "p-7 sm:p-9" : "p-6"}`
          : "border-white/[0.07] bg-ink-800 p-6 hover:border-white/20"
      }`}
    >
      {featured && <div aria-hidden className="absolute -right-16 -top-16 h-56 w-56 rounded-full bg-brand/20 blur-3xl" />}
      <div className="relative flex items-center justify-between gap-3 text-xs">
        <span className="font-semibold text-brand-soft">{g.category}</span>
        <span className="text-zinc-500">{readingMinutes(g)} min read</span>
      </div>
      {big && (
        <span className="relative mt-8 grid h-14 w-14 place-items-center rounded-xl border border-brand/40 bg-ink/60 text-brand-soft">
          <BookIcon className="h-7 w-7" />
        </span>
      )}
      <H className={`relative font-semibold leading-snug text-white ${big ? "mt-6 text-2xl sm:text-[1.7rem]" : "mt-4 text-lg"}`}>
        <Link href={`/guides/${g.slug}`} className="after:absolute after:inset-0">
          {g.title}
        </Link>
      </H>
      <p className={`relative mt-3 leading-relaxed text-zinc-400 ${big ? "text-[0.95rem]" : "text-sm"}`}>{g.description}</p>
      <span aria-hidden className="min-h-5 flex-1" />
      <span className="relative inline-flex items-center gap-1.5 text-sm font-semibold text-white">
        Read the guide
        <ArrowRight className="h-4 w-4 text-brand transition-transform group-hover:translate-x-0.5" />
      </span>
    </article>
  );
}
