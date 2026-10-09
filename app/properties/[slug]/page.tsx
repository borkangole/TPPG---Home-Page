// Property detail page. Will fetch from the public property view and
// use generateMetadata + JSON-LD structured data per property.
export default async function PropertyDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  return (
    <section className="mx-auto max-w-6xl px-4 py-16">
      <h1 className="text-2xl font-bold">Property: {slug}</h1>
    </section>
  );
}
