import { FeaturedDevelopers } from "@/components/home/FeaturedDevelopers";
import { FeaturedProperties } from "@/components/home/FeaturedProperties";
import { Hero } from "@/components/home/Hero";
import { WhyUs } from "@/components/home/WhyUs";
import { buildMetadata } from "@/lib/seo/metadata";

export const metadata = buildMetadata({
  title: "Real Estate in Iloilo, Cebu & Palawan | TPPG",
  description:
    "Condos, house and lot, and lots for sale, mostly in Iloilo with select projects in Cebu and Palawan. Talk to a TPPG property specialist.",
  path: "/",
});

export default function HomePage() {
  return (
    <>
      <Hero />
      <WhyUs />
      <FeaturedDevelopers />
      <FeaturedProperties />
    </>
  );
}
