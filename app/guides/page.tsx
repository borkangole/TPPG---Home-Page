import { buildMetadata } from "@/lib/seo/metadata";

export const metadata = buildMetadata({
  title: "Property Guides for Iloilo Buyers",
  description: "Buying and investment guides for condos, house and lot, and lots in Iloilo.",
  path: "/guides",
});

export default function GuidesPage() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-16">
      <h1 className="text-2xl font-bold">Property Guides</h1>
    </section>
  );
}
