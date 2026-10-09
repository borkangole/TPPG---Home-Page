import { buildMetadata } from "@/lib/seo/metadata";

export const metadata = buildMetadata({
  title: "About The Premier Property Group",
  description: "Learn about TPPG, a real estate sales organization serving buyers in Iloilo.",
  path: "/about",
});

export default function AboutPage() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-16">
      <h1 className="text-2xl font-bold">About TPPG</h1>
    </section>
  );
}
