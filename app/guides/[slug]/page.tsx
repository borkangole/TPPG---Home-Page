import Link from "next/link";
import { notFound } from "next/navigation";
import { GuideCard } from "@/components/guides/GuideCard";
import { ArrowRight } from "@/components/ui/Icons";
import { GUIDES, formatGuideDate, getGuide, readingMinutes, type Block } from "@/lib/guides";
import { buildMetadata } from "@/lib/seo/metadata";
import { SITE } from "@/lib/seo/site";

type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return GUIDES.map((g) => ({ slug: g.slug }));
}

export async function generateMetadata({ params }: Params) {
  const g = getGuide((await params).slug);
  if (!g) return {};
  const meta = buildMetadata({ title: g.title, description: g.description, path: `/guides/${g.slug}` });
  return { ...meta, openGraph: { ...meta.openGraph, type: "article", publishedTime: g.published } };
}

const anchor = (heading: string) =>
  heading
    .toLowerCase()
    .replace(/^\d+\.\s*/, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

function BlockView({ b }: { b: Block }) {
  switch (b.type) {
    case "p":
      return <p className="mt-4 leading-[1.8] text-zinc-300">{b.text}</p>;
    case "ul":
      return (
        <ul className="mt-4 space-y-2.5">
          {b.items.map((i) => (
            <li key={i} className="flex gap-3 leading-relaxed text-zinc-300">
              <span aria-hidden className="mt-[0.6rem] h-1.5 w-1.5 shrink-0 rounded-full bg-brand" />
              {i}
            </li>
          ))}
        </ul>
      );
    case "ol":
      return (
        <ol className="mt-4 space-y-3">
          {b.items.map((i, n) => (
            <li key={i.title} className="flex gap-3 text-zinc-300">
              <span className="font-serif text-brand">{n + 1}.</span>
              <span>
                <strong className="text-white">{i.title}</strong> {i.text}
              </span>
            </li>
          ))}
        </ol>
      );
    case "table":
      return (
        <figure className="mt-5 overflow-hidden rounded-xl border border-white/[0.08]">
          <figcaption className="border-b border-white/[0.08] bg-ink-800 px-5 py-3 text-sm font-semibold text-white">{b.caption}</figcaption>
          <table className="w-full text-sm">
            <tbody>
              {b.rows.map(([k, v]) => (
                <tr key={k} className="border-b border-white/[0.06] last:border-0">
                  <th scope="row" className="px-5 py-3 text-left font-normal text-zinc-400">
                    {k}
                  </th>
                  <td className="px-5 py-3 text-right font-semibold text-white">{v}</td>
                </tr>
              ))}
            </tbody>
          </table>
          {b.note && <p className="border-t border-white/[0.08] bg-ink-800 px-5 py-3 text-xs text-zinc-500">{b.note}</p>}
        </figure>
      );
    case "tip":
      return (
        <p className="mt-5 rounded-xl border border-brand/30 bg-brand/[0.08] px-5 py-4 text-sm leading-relaxed text-brand-soft">
          {b.text}
        </p>
      );
  }
}

export default async function GuidePage({ params }: Params) {
  const g = getGuide((await params).slug);
  if (!g) notFound();

  const url = `${SITE.url}/guides/${g.slug}`;
  const related = GUIDES.filter((x) => x.slug !== g.slug).slice(0, 3);
  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: g.title,
      description: g.description,
      datePublished: g.published,
      dateModified: g.published,
      mainEntityOfPage: url,
      author: { "@type": "Organization", name: SITE.name, url: SITE.url },
      publisher: { "@type": "Organization", name: SITE.name, logo: { "@type": "ImageObject", url: `${SITE.url}/icon.png` } },
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: SITE.url },
        { "@type": "ListItem", position: 2, name: "Guides", item: `${SITE.url}/guides` },
        { "@type": "ListItem", position: 3, name: g.title, item: url },
      ],
    },
  ];

  return (
    <div className="pt-16">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <article className="container-site pb-20 pt-12 sm:pt-16">
        <nav aria-label="Breadcrumb" className="text-sm text-zinc-500">
          <ol className="flex flex-wrap items-center gap-2">
            <li>
              <Link href="/" className="hover:text-white">
                Home
              </Link>
            </li>
            <li aria-hidden>/</li>
            <li>
              <Link href="/guides" className="hover:text-white">
                Guides
              </Link>
            </li>
            <li aria-hidden>/</li>
            <li className="text-zinc-300">{g.category}</li>
          </ol>
        </nav>

        <header className="mt-8 max-w-3xl">
          <p className="eyebrow">{g.category}</p>
          <h1 className="mt-4 text-3xl font-bold leading-tight tracking-tight text-white sm:text-[2.75rem] sm:leading-[1.1]">{g.title}</h1>
          <p className="mt-5 text-sm text-zinc-500">
            By the TPPG team · <time dateTime={g.published}>{formatGuideDate(g.published)}</time> · {readingMinutes(g)} min read
          </p>
        </header>

        <div className="mt-12 grid gap-12 lg:grid-cols-12">
          <aside className="lg:col-span-3">
            <nav aria-label="On this page" className="lg:sticky lg:top-24">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-zinc-500">On this page</p>
              <ul className="mt-4 space-y-2.5 border-l border-white/10 text-sm">
                {g.sections.map((s) => (
                  <li key={s.heading}>
                    <a href={`#${anchor(s.heading)}`} className="-ml-px block border-l border-transparent pl-4 text-zinc-400 hover:border-brand hover:text-white">
                      {s.heading}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </aside>

          <div className="max-w-2xl lg:col-span-9">
            <p className="font-serif text-xl leading-relaxed text-white sm:text-[1.35rem]">{g.intro}</p>
            {g.sections.map((s) => (
              <section key={s.heading} id={anchor(s.heading)} className="scroll-mt-24 pt-10">
                <h2 className="text-xl font-semibold text-white sm:text-2xl">{s.heading}</h2>
                {s.blocks.map((b, i) => (
                  <BlockView key={i} b={b} />
                ))}
              </section>
            ))}

            <div className="mt-14 flex flex-col gap-5 rounded-2xl border border-white/[0.08] bg-ink-800 p-6 sm:flex-row sm:items-center sm:justify-between sm:p-8">
              <div>
                <p className="text-lg font-semibold text-white">{g.cta.title}</p>
                <p className="mt-1 text-sm text-zinc-400">{g.cta.text}</p>
              </div>
              <Link href={g.cta.href} className="btn-primary shrink-0">
                {g.cta.label}
                <ArrowRight />
              </Link>
            </div>

            <p className="mt-8 text-xs leading-relaxed text-zinc-500">
              This guide is general information, not legal or financial advice. Terms vary by developer and lender; a TPPG
              property specialist can confirm the details for any property.
            </p>
          </div>
        </div>
      </article>

      <section aria-labelledby="related-heading" className="border-t border-white/[0.06] bg-ink-800/50 py-20">
        <div className="container-site">
          <h2 id="related-heading" className="text-2xl font-semibold text-white">
            More guides
          </h2>
          <ul className="mt-8 grid gap-5 md:grid-cols-3">
            {related.map((r) => (
              <li key={r.slug}>
                <GuideCard guide={r} />
              </li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  );
}
