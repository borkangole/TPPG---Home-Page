import { buildMetadata } from "@/lib/seo/metadata";

export const metadata = buildMetadata({
  title: "Contact TPPG",
  description: "Send an inquiry to The Premier Property Group and talk to a property specialist.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-16">
      <h1 className="text-2xl font-bold">Contact</h1>
    </section>
  );
}
