// Guide article page. Content source (MDX or Supabase) to be decided.
export default async function GuidePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  return (
    <article className="mx-auto max-w-3xl px-4 py-16">
      <h1 className="text-2xl font-bold">Guide: {slug}</h1>
    </article>
  );
}
