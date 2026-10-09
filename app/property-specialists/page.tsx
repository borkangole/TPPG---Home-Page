import { buildMetadata } from "@/lib/seo/metadata";

export const metadata = buildMetadata({
  title: "Property Specialists in Iloilo",
  description: "Meet the TPPG property specialists who can help you find the right property.",
  path: "/property-specialists",
});

export default function SpecialistsPage() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-16">
      <h1 className="text-2xl font-bold">Property Specialists</h1>
    </section>
  );
}
